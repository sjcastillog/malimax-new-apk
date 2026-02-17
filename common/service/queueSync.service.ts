import { saveContainerOne } from "@/core/container-one/actions";
import { saveContainerTwo } from "@/core/container-two/actions";
import { saveContainerThree } from "@/core/container-three/actions";

import { checkInternetQuality } from "@/helpers";
import { workflowDB } from "../storage/database";

const MAX_RETRIES = 3;

export class QueueSyncService {
  static async sendItem(id: string, workflowType: "one" | "two" | "three"): Promise<boolean> {
    try {
      const item = await workflowDB.getQueueById(id);

      if (!item) {
        return false;
      }

      const hasInternet = await checkInternetQuality();
      if (!hasInternet) {
        throw new Error("Sin conexión a internet");
      }

      await workflowDB.updateQueueStatus(id, "processing");

      const dataToSend = {
        ...item.workflowData,
        ...item.photosData,
      };

      if(workflowType === "one") {
        await saveContainerOne(dataToSend);
      } else if(workflowType === "two") {
        await saveContainerTwo(dataToSend);
      } else if(workflowType === "three") { 
        await saveContainerThree(dataToSend);
      }

      await workflowDB.updateQueueStatus(id, "success");

      return true;
    } catch (error: any) {
      const errorMessage = error?.message || "Error desconocido";

      const item = await workflowDB.getQueueById(id);

      if (!item) {
        return false;
      }

      if (item.retries >= MAX_RETRIES - 1) {
        await workflowDB.updateQueueStatus(id, "failed", errorMessage);
      } else {
        await workflowDB.updateQueueStatus(id, "pending", errorMessage, true);
      }

      return false;
    }
  }

  static async sendAllPending(type: "one" | "two" | "three"): Promise<{
    success: number;
    failed: number;
    total: number;
  }> {
    if (type !== "one" && type !== "two" && type !== "three") {
      throw new Error("Tipo de envío no reconocido");
    }
    try {
      const hasInternet = await checkInternetQuality();
      if (!hasInternet) {
        throw new Error("Sin conexión a internet");
      }

      const pendingItems = await workflowDB.getPendingQueue(type);

      if (pendingItems.length === 0) {
        return { success: 0, failed: 0, total: 0 };
      }

      let successCount = 0;
      let failedCount = 0;

      for (const item of pendingItems) {
        const result = await this.sendItem(item.id, type);

        if (result) {
          successCount++;
        } else {
          failedCount++;
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      return {
        success: successCount,
        failed: failedCount,
        total: pendingItems.length,
      };
    } catch (error) {
      throw error;
    }
  }

  static async retryFailedItem(id: string, type: "one" | "two" | "three"): Promise<boolean> {
    try {
      await workflowDB.retryQueueItem(id);

      return await this.sendItem(id, type);
    } catch (error) {
      return false;
    }
  }

  static async getQueueStats(workflowType?: "one" | "two" | "three"): Promise<{
    total: number;
    pending: number;
    failed: number;
    success: number;
  }> {
    try {
      return await workflowDB.getQueueCount(workflowType);
    } catch (error) {
      return { total: 0, pending: 0, failed: 0, success: 0 };
    }
  }

  static async cleanSuccessfulItems(): Promise<number> {
    try {
      const allItems = await workflowDB.getAllQueue();
      const successfulItems = allItems.filter(
        (item) => item.status === "success"
      );

      for (const item of successfulItems) {
        await workflowDB.removeFromQueue(item.id);
      }

      return successfulItems.length;
    } catch (error) {
      return 0;
    }
  }
}
