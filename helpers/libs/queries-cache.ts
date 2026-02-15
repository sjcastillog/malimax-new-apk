import { SecureStorageAdapter } from "../adapters/secure-storage.adapter";

const CACHE_PREFIX = "query_cache_";
const CACHE_TIMESTAMP_SUFFIX = "_timestamp";
const CACHE_KEYS_LIST = "query_cache_keys_list";

export class QueryCacheHelper {
  // Guardar datos en caché
  static async setCache<T>(key: string, data: T): Promise<void> {
    try {
      const cacheKey = `${CACHE_PREFIX}${key}`;
      const timestampKey = `${cacheKey}${CACHE_TIMESTAMP_SUFFIX}`;

      await SecureStorageAdapter.setItem(cacheKey, JSON.stringify(data));
      await SecureStorageAdapter.setItem(timestampKey, Date.now().toString());

      // ✅ Agregar key a la lista de keys
      await this.addKeyToList(key);
    } catch (error) {
      console.error("Error saving cache:", error);
    }
  }

  // Obtener datos del caché
  static async getCache<T>(key: string): Promise<T | null> {
    try {
      const cacheKey = `${CACHE_PREFIX}${key}`;
      const data = await SecureStorageAdapter.getItem(cacheKey);

      if (!data) return null;

      return JSON.parse(data) as T;
    } catch (error) {
      console.error("Error getting cache:", error);
      return null;
    }
  }

  // Limpiar caché específico
  static async clearCache(key: string): Promise<void> {
    const cacheKey = `${CACHE_PREFIX}${key}`;
    const timestampKey = `${cacheKey}${CACHE_TIMESTAMP_SUFFIX}`;

    await SecureStorageAdapter.deleteItem(cacheKey);
    await SecureStorageAdapter.deleteItem(timestampKey);

    // ✅ Remover de la lista
    await this.removeKeyFromList(key);
  }

  // Limpiar TODA la caché (Opción 1 - Usando lista de keys)
  static async clearAllCache(): Promise<void> {
    try {
      const keys = await this.getAllCacheKeys();

      console.log(`🗑️ Limpiando ${keys.length} items de caché...`);

      for (const key of keys) {
        await this.clearCache(key);
      }

      // Limpiar la lista también
      await SecureStorageAdapter.deleteItem(CACHE_KEYS_LIST);

      console.log("✅ Caché completamente limpiada");
    } catch (error) {
      console.error("Error clearing all cache:", error);
    }
  }

  // Limpiar toda la caché (Opción 2 - Más agresiva, limpia todo con el prefijo)
  static async clearAllCacheAggressive(): Promise<void> {
    try {
      // Lista de todas las keys conocidas (agrega las tuyas aquí)
      const knownKeys = [
        "clientBox",
        "clientBrand",
        "clientProducer",
        "clientProducerFarm",
      ];

      console.log(`🗑️ Limpiando caché agresivamente...`);

      // Limpiar keys conocidas
      for (const baseKey of knownKeys) {
        // Intentar limpiar múltiples variaciones (con diferentes IDs)
        for (let i = 0; i < 100; i++) {
          const key = `${baseKey}_${i}`;
          try {
            await this.clearCache(key);
          } catch (error) {
            // Ignorar errores si la key no existe
          }
        }
      }

      // Limpiar la lista de keys
      await SecureStorageAdapter.deleteItem(CACHE_KEYS_LIST);

      console.log("✅ Limpieza agresiva completada");
    } catch (error) {
      console.error("Error in aggressive cache clear:", error);
    }
  }

  // Obtener tamaño aproximado de la caché
  static async getCacheSize(): Promise<{ count: number; keys: string[] }> {
    try {
      const keys = await this.getAllCacheKeys();
      return {
        count: keys.length,
        keys: keys,
      };
    } catch (error) {
      console.error("Error getting cache size:", error);
      return { count: 0, keys: [] };
    }
  }

  // Obtener info detallada de la caché
  static async getCacheInfo(): Promise<Array<{ key: string; age: number }>> {
    try {
      const keys = await this.getAllCacheKeys();
      const info = [];

      for (const key of keys) {
        const cacheKey = `${CACHE_PREFIX}${key}`;
        const timestampKey = `${cacheKey}${CACHE_TIMESTAMP_SUFFIX}`;
        const timestamp = await SecureStorageAdapter.getItem(timestampKey);

        if (timestamp) {
          const age = Date.now() - parseInt(timestamp);
          info.push({
            key,
            age,
          });
        }
      }

      return info;
    } catch (error) {
      console.error("Error getting cache info:", error);
      return [];
    }
  }

  // Agregar key a la lista
  private static async addKeyToList(key: string): Promise<void> {
    try {
      const listStr = await SecureStorageAdapter.getItem(CACHE_KEYS_LIST);
      const list: string[] = listStr ? JSON.parse(listStr) : [];

      if (!list.includes(key)) {
        list.push(key);
        await SecureStorageAdapter.setItem(
          CACHE_KEYS_LIST,
          JSON.stringify(list)
        );
      }
    } catch (error) {
      console.error("Error adding key to list:", error);
    }
  }

  // Remover key de la lista
  private static async removeKeyFromList(key: string): Promise<void> {
    try {
      const listStr = await SecureStorageAdapter.getItem(CACHE_KEYS_LIST);
      if (!listStr) return;

      const list: string[] = JSON.parse(listStr);
      const filteredList = list.filter((k) => k !== key);

      await SecureStorageAdapter.setItem(
        CACHE_KEYS_LIST,
        JSON.stringify(filteredList)
      );
    } catch (error) {
      console.error("Error removing key from list:", error);
    }
  }

  // Obtener todas las keys de caché
  private static async getAllCacheKeys(): Promise<string[]> {
    try {
      const listStr = await SecureStorageAdapter.getItem(CACHE_KEYS_LIST);
      return listStr ? JSON.parse(listStr) : [];
    } catch (error) {
      console.error("Error getting all cache keys:", error);
      return [];
    }
  }
}
