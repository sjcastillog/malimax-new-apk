import * as FileSystem from "expo-file-system/legacy";
import * as SQLite from "expo-sqlite";
import { PHOTOS_DIR } from "../constants";

type WorkflowType = "one" | "two" | "three";
type WorkflowNumber = "zero" | "one" | "two" | "three";
type WorkflowTable = `workflow_${WorkflowType}_${WorkflowNumber}`;

class WorkflowDatabase {
  private db: SQLite.SQLiteDatabase | null = null;
  private initializing: Promise<void> | null = null;
  private initialized: boolean = false;

  async init() {
    if (this.initialized && this.db) {
      return;
    }
    if (this.initializing) {
      await this.initializing;
      return;
    }

    this.initializing = this._init();
    await this.initializing;
    this.initializing = null;
  }

  private async _init() {
    try {
      this.db = await SQLite.openDatabaseAsync("workflow.db");

      await this.db.execAsync(`
         -- Tabla para cola offline
        CREATE TABLE IF NOT EXISTS offline_queue (
          id TEXT PRIMARY KEY,
          workflow_data TEXT NOT NULL,
          workflow_type TEXT NOT NULL,
          photos_data TEXT,
          timestamp INTEGER NOT NULL,
          retries INTEGER NOT NULL DEFAULT 0,
          status TEXT NOT NULL DEFAULT 'pending',
          error_message TEXT,
          container_number TEXT
        );

        -- Índice para cola offline
        CREATE INDEX IF NOT EXISTS idx_offline_queue_status ON offline_queue(status);
        CREATE INDEX IF NOT EXISTS idx_offline_queue_timestamp ON offline_queue(timestamp);
        CREATE INDEX IF NOT EXISTS idx_offline_queue_type ON offline_queue(workflow_type);
      `);

      this.initialized = true;
    } catch (error) {
      this.db = null;
      this.initialized = false;
      throw error;
    }
  }

  // ============================================
  // MÉTODO GENÉRICO PRINCIPAL
  // ============================================

  private getTableName(
    type: WorkflowType,
    number: WorkflowNumber,
  ): WorkflowTable {
    return `workflow_${type}_${number}` as WorkflowTable;
  }

  async saveField(
    key: string,
    value: any,
    type: WorkflowType,
    number: WorkflowNumber,
  ) {
    if (!this.db) {
      throw new Error("Base de datos no inicializada");
    }

    const tableName = this.getTableName(type, number);
    const valueStr = typeof value === "string" ? value : JSON.stringify(value);

    await this.db.runAsync(
      `INSERT OR REPLACE INTO ${tableName} (key, value, updated_at) VALUES (?, ?, ?)`,
      [key, valueStr, Date.now()],
    );
  }

  async getField(
    key: string,
    type: WorkflowType,
    number: WorkflowNumber,
  ): Promise<any> {
    if (!this.db) {
      throw new Error("Base de datos no inicializada");
    }

    const tableName = this.getTableName(type, number);

    const result: any = await this.db.getFirstAsync(
      `SELECT value FROM ${tableName} WHERE key = ?`,
      [key],
    );

    if (!result) return null;

    try {
      return JSON.parse(result.value);
    } catch {
      return result.value;
    }
  }

  async getAllFields(
    type: WorkflowType,
    number: WorkflowNumber,
  ): Promise<Record<string, any>> {
    const tableName = this.getTableName(type, number);

    const rows: any[] = await this.db!.getAllAsync(
      `SELECT key, value FROM ${tableName}`,
    );

    const data: Record<string, any> = {};
    for (const row of rows) {
      try {
        data[row.key] = JSON.parse(row.value);
      } catch {
        data[row.key] = row.value;
      }
    }

    return data;
  }

  async clearWorkflow(type: WorkflowType, number: WorkflowNumber) {
    const tableName = this.getTableName(type, number);

    await this.db!.runAsync(`DELETE FROM ${tableName}`);
    await this.db!.runAsync(
      "DELETE FROM photos WHERE workflow_type = ? AND workflow_number = ?",
      [type, number],
    );
  }

  async reset() {
    this.initialized = false;
    this.db = null;
    this.initializing = null;
    await this.init();
  }

  async resetDatabase() {
    try {
      // 1. Cerrar conexión actual SIN reinicializar
      if (this.db) {
        try {
          await this.db.closeAsync();
        } catch (error) {}
        this.db = null;
        this.initialized = false;
        this.initializing = null;
      }

      // 2. Eliminar archivo de base de datos
      const dbPath = `${FileSystem.documentDirectory}SQLite/workflow.db`;
      const dbInfo = await FileSystem.getInfoAsync(dbPath);

      if (dbInfo.exists) {
        await FileSystem.deleteAsync(dbPath);
      }

      // 3. Eliminar todas las fotos
      const photosInfo = await FileSystem.getInfoAsync(PHOTOS_DIR);

      if (photosInfo.exists) {
        await FileSystem.deleteAsync(PHOTOS_DIR, { idempotent: true });
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  // ============================================
  // ENCOLAR PROCESOS
  // ============================================

  async addToQueue(
    workflowData: any,
    photosData: any,
    workflowType: "one" | "two" | "three",
  ): Promise<string> {
    await this.init();

    if (!this.db) {
      throw new Error("Base de datos no inicializada");
    }

    try {
      const id = `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      await this.db.runAsync(
        `INSERT INTO offline_queue 
      (id, workflow_data, photos_data, workflow_type, timestamp, retries, status, container_number) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          JSON.stringify(workflowData),
          JSON.stringify(photosData),
          workflowType,
          Date.now(),
          0,
          "pending",
          workflowData.container || "Sin contenedor",
        ],
      );

      return id;
    } catch (error) {
      throw error;
    }
  }

  async getAllQueue(workflowType?: "one" | "two" | "three"): Promise<any[]> {
    await this.init();

    if (!this.db) {
      throw new Error("Base de datos no inicializada");
    }

    try {
      let query = "SELECT * FROM offline_queue";
      const params: any[] = [];

      // ✅ Si se proporciona workflowType, filtrar
      if (workflowType) {
        query += " WHERE workflow_type = ?";
        params.push(workflowType);
      }

      query += " ORDER BY timestamp DESC";

      const results = await this.db.getAllAsync<any>(query, params);

      return results.map((row) => ({
        id: row.id,
        workflowType: row.workflow_type,
        workflowData: JSON.parse(row.workflow_data),
        photosData: row.photos_data ? JSON.parse(row.photos_data) : null,
        timestamp: row.timestamp,
        retries: row.retries,
        status: row.status,
        errorMessage: row.error_message || undefined,
        containerNumber: row.container_number || undefined,
      }));
    } catch (error) {
      return [];
    }
  }

  async getPendingQueue(
    workflowType?: "one" | "two" | "three",
  ): Promise<any[]> {
    await this.init();

    if (!this.db) {
      throw new Error("Base de datos no inicializada");
    }

    try {
      let query = "SELECT * FROM offline_queue WHERE status = 'pending'";
      const params: any[] = ["pending"];

      // ✅ Si se proporciona workflowType, añadir al filtro
      if (workflowType) {
        query =
          "SELECT * FROM offline_queue WHERE status = ? AND workflow_type = ?";
        params.push(workflowType);
      }

      query += " ORDER BY timestamp ASC";

      const results = await this.db.getAllAsync<any>(query, params);

      return results.map((row) => ({
        id: row.id,
        workflowType: row.workflow_type, // ✅ Incluir en el resultado
        workflowData: JSON.parse(row.workflow_data),
        photosData: row.photos_data ? JSON.parse(row.photos_data) : null,
        timestamp: row.timestamp,
        retries: row.retries,
        status: row.status,
        errorMessage: row.error_message || undefined,
        containerNumber: row.container_number || undefined,
      }));
    } catch (error) {
      return [];
    }
  }

  async getQueueById(id: string): Promise<any | null> {
    await this.init();

    if (!this.db) {
      throw new Error("Base de datos no inicializada");
    }

    try {
      const result = await this.db.getFirstAsync<any>(
        "SELECT * FROM offline_queue WHERE id = ?",
        [id],
      );

      if (!result) return null;

      return {
        id: result.id,
        workflowType: result.workflow_type,
        workflowData: JSON.parse(result.workflow_data),
        photosData: result.photos_data ? JSON.parse(result.photos_data) : null,
        timestamp: result.timestamp,
        retries: result.retries,
        status: result.status,
        errorMessage: result.error_message || undefined,
        containerNumber: result.container_number || undefined,
      };
    } catch (error) {
      return null;
    }
  }

  async updateQueueStatus(
    id: string,
    status: "pending" | "processing" | "failed" | "success",
    errorMessage?: string,
    incrementRetries: boolean = false,
  ): Promise<void> {
    await this.init();

    if (!this.db) {
      throw new Error("Base de datos no inicializada");
    }

    try {
      if (incrementRetries) {
        await this.db.runAsync(
          `UPDATE offline_queue 
         SET status = ?, error_message = ?, retries = retries + 1 
         WHERE id = ?`,
          [status, errorMessage || null, id],
        );
      } else {
        await this.db.runAsync(
          `UPDATE offline_queue 
         SET status = ?, error_message = ? 
         WHERE id = ?`,
          [status, errorMessage || null, id],
        );
      }
    } catch (error) {}
  }

  async removeFromQueue(id: string): Promise<void> {
    await this.init();

    if (!this.db) {
      throw new Error("Base de datos no inicializada");
    }

    try {
      await this.db.runAsync("DELETE FROM offline_queue WHERE id = ?", [id]);
    } catch (error) {}
  }

  async clearQueue(): Promise<void> {
    await this.init();

    if (!this.db) {
      throw new Error("Base de datos no inicializada");
    }

    try {
      await this.db.runAsync("DELETE FROM offline_queue");
    } catch (error) {}
  }

  async getQueueCount(
    workflowType?: "one" | "two" | "three" ,
  ): Promise<{
    total: number;
    pending: number;
    failed: number;
    success: number;
  }> {
    if (!this.db) {
      throw new Error("Base de datos no inicializada");
    }

    try {
      const whereClause = workflowType
        ? ` WHERE workflow_type = '${workflowType}'`
        : "";

      const total = await this.db.getFirstAsync<{ count: number }>(
        `SELECT COUNT(*) as count FROM offline_queue${whereClause}`,
      );

      const pending = await this.db.getFirstAsync<{ count: number }>(
        `SELECT COUNT(*) as count FROM offline_queue WHERE status = 'pending'${workflowType ? ` AND workflow_type = '${workflowType}'` : ""}`,
      );

      const failed = await this.db.getFirstAsync<{ count: number }>(
        `SELECT COUNT(*) as count FROM offline_queue WHERE status = 'failed'${workflowType ? ` AND workflow_type = '${workflowType}'` : ""}`,
      );

      const success = await this.db.getFirstAsync<{ count: number }>(
        `SELECT COUNT(*) as count FROM offline_queue WHERE status = 'success'${workflowType ? ` AND workflow_type = '${workflowType}'` : ""}`,
      );

      return {
        total: total?.count || 0,
        pending: pending?.count || 0,
        failed: failed?.count || 0,
        success: success?.count || 0,
      };
    } catch (error) {
      return { total: 0, pending: 0, failed: 0, success: 0 };
    }
  }

  async retryQueueItem(id: string): Promise<void> {
    if (!this.db) {
      throw new Error("Base de datos no inicializada");
    }

    try {
      await this.db.runAsync(
        `UPDATE offline_queue 
       SET status = 'pending', retries = 0, error_message = NULL 
       WHERE id = ?`,
        [id],
      );
    } catch (error) {}
  }

  async checkDatabaseHealth(): Promise<{
    healthy: boolean;
    queueCount: number;
    error?: string;
  }> {
    try {
      if (!this.db) {
        await this.init();
      }

      const queueCount = await this.db!.getFirstAsync<{ count: number }>(
        "SELECT COUNT(*) as count FROM offline_queue",
      );

      return {
        healthy: true,
        queueCount: queueCount?.count || 0,
      };
    } catch (error) {
      console.error("❌ Database health check failed:", error);
      return {
        healthy: false,
        queueCount: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export const workflowDB = new WorkflowDatabase();
