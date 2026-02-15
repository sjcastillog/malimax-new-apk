import { PHOTOS_DIR } from "@/common/constants";
import { workflowDB } from "@/common/storage/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Directory, File } from "expo-file-system";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface StorageInfo {
  asyncStorage: {
    totalKeys: number;
    usedKB: number;
    maxKB: number;
    percentage: number;
    workflows: {
      one: number;
      two: number;
      three: number;
    };
  };
  fileSystem: {
    photosDir: string;
    totalFiles: number;
    totalSizeMB: number;
    videoFiles: number;
    imageFiles: number;
  };
  database: any;
}

export default function DebugDB() {
  const [info, setInfo] = useState<StorageInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;

      const workflowKeys = {
        one: keys.filter((k) => k.includes("one")).length,
        two: keys.filter((k) => k.includes("two")).length,
        three: keys.filter((k) => k.includes("three")).length,
      };

      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        totalSize += value?.length || 0;
      }

      const usedKB = totalSize / 1024;
      const maxKB = 6 * 1024;

      return {
        totalKeys: keys.length,
        usedKB: parseFloat(usedKB.toFixed(2)),
        maxKB,
        percentage: parseFloat(((usedKB / maxKB) * 100).toFixed(2)),
        workflows: workflowKeys,
      };
    } catch (err) {
      throw new Error(`AsyncStorage: ${err}`);
    }
  };

  const checkFileSystem = async () => {
    try {
      const dir = new Directory(PHOTOS_DIR);

      if (!dir.exists) {
        await dir.create();
        return {
          photosDir: PHOTOS_DIR,
          totalFiles: 0,
          totalSizeMB: 0,
          videoFiles: 0,
          imageFiles: 0,
        };
      }

      const items = await dir.list();
      let totalSize = 0;
      let videoCount = 0;
      let imageCount = 0;
      let validFiles = 0;

      for (const item of items) {
        try {
          // Verificar si es un archivo
          const isFile = "md5" in item || item.uri.includes(".");
          if (!isFile) continue;

          // Crear File explícito
          const file = new File(item.uri);

          if (file.exists) {
            const size = file.size || 0;
            totalSize += size;
            validFiles++;

            // Obtener nombre del archivo
            const fileName = file.uri.split("/").pop() || "";

            if (fileName.match(/\.(mp4|mov|avi)$/i)) videoCount++;
            if (fileName.match(/\.(jpg|jpeg|png|gif)$/i)) imageCount++;
          }
        } catch (fileErr) {
          console.warn(`Error procesando item:`, fileErr);
        }
      }

      return {
        photosDir: PHOTOS_DIR,
        totalFiles: validFiles,
        totalSizeMB: parseFloat((totalSize / (1024 * 1024)).toFixed(2)),
        videoFiles: videoCount,
        imageFiles: imageCount,
      };
    } catch (err) {
      console.error("Error en checkFileSystem:", err);
      throw new Error(`FileSystem: ${err}`);
    }
  };

  const checkDatabase = async () => {
    try {
      await workflowDB.init();
      const health = await workflowDB.checkDatabaseHealth();
      return health;
    } catch (err) {
      return { error: String(err), isHealthy: false };
    }
  };

  const runDiagnostics = async () => {
    setLoading(true);
    setError(null);
    setInfo(null);

    try {
      const [asyncStorage, fileSystem, database] = await Promise.all([
        checkAsyncStorage(),
        checkFileSystem(),
        checkDatabase(),
      ]);

      setInfo({
        asyncStorage,
        fileSystem,
        database,
      });
    } catch (err) {
      console.error("Error en runDiagnostics:", err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const cleanupOldFiles = async () => {
    Alert.alert(
      "🗑️ Limpiar Archivos",
      "¿Eliminar fotos y videos de hace más de 30 días?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, limpiar",
          style: "destructive",
          onPress: async () => {
            try {
              const dir = new Directory(PHOTOS_DIR);

              if (!dir.exists) {
                Alert.alert("ℹ️ Info", "No hay archivos para limpiar");
                return;
              }

              const fileObjects = await dir.list();
              let deletedCount = 0;
              const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

              for (const item of fileObjects) {
                try {
                  // Verificar si es un archivo (no directorio)
                  // Los objetos File tienen la propiedad md5
                  const isFile = "md5" in item || item.uri.includes(".");

                  if (!isFile) continue;

                  // Crear objeto File explícitamente para asegurar propiedades
                  const file = new File(item.uri);

                  if (file.exists) {
                    // Verificar si tiene modificationTime
                    const modTime = file.modificationTime;

                    if (modTime && modTime < thirtyDaysAgo) {
                      await file.delete();
                      deletedCount++;
                    }
                  }
                } catch (fileErr) {
                  console.warn(`Error eliminando archivo:`, fileErr);
                }
              }

              Alert.alert(
                "✅ Limpieza Completa",
                deletedCount > 0
                  ? `Se eliminaron ${deletedCount} archivo(s) antiguo(s)`
                  : "No se encontraron archivos antiguos para eliminar",
              );
              runDiagnostics();
            } catch (err) {
              Alert.alert("❌ Error", String(err));
            }
          },
        },
      ],
    );
  };

  const clearAsyncStorage = async () => {
    Alert.alert(
      "⚠️ Limpiar AsyncStorage",
      "¿Eliminar TODOS los workflows guardados?\n\nEsta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, limpiar",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert("✅ Limpieza Completa", "AsyncStorage vaciado");
              runDiagnostics();
            } catch (err) {
              Alert.alert("❌ Error", String(err));
            }
          },
        },
      ],
    );
  };

  const getStatusColor = (percentage: number) => {
    if (percentage < 50) return "bg-green-500";
    if (percentage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusEmoji = (percentage: number) => {
    if (percentage < 50) return "✅";
    if (percentage < 80) return "⚠️";
    return "🔴";
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-4">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-800">
            🔍 Diagnóstico del Sistema
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            Estado del almacenamiento y base de datos
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="gap-3 mb-6">
          <TouchableOpacity
            onPress={runDiagnostics}
            disabled={loading}
            className="bg-blue-600 p-4 rounded-xl flex-row items-center justify-center"
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-white font-semibold text-base mr-2">
                  Verificar Sistema
                </Text>
                <Text className="text-xl">🔄</Text>
              </>
            )}
          </TouchableOpacity>

          {info && (
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={cleanupOldFiles}
                className="flex-1 bg-orange-500 p-3 rounded-xl"
                activeOpacity={0.8}
              >
                <Text className="text-white font-semibold text-center text-sm">
                  🗑️ Limpiar Archivos
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={clearAsyncStorage}
                className="flex-1 bg-red-500 p-3 rounded-xl"
                activeOpacity={0.8}
              >
                <Text className="text-white font-semibold text-center text-sm">
                  ⚠️ Reset Storage
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Error Display */}
        {error && (
          <View className="bg-red-100 border border-red-300 p-4 rounded-xl mb-4">
            <Text className="text-red-700 font-semibold mb-2">❌ Error</Text>
            <Text className="text-red-600 text-xs font-mono">{error}</Text>
          </View>
        )}

        {/* Info Display */}
        {info && (
          <View className="gap-4 mb-20">
            {/* AsyncStorage Card */}
            <View className="bg-white rounded-xl p-5 shadow-sm">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-bold text-gray-800">
                  💾 AsyncStorage
                </Text>
                <Text className="text-2xl">
                  {getStatusEmoji(info.asyncStorage.percentage)}
                </Text>
              </View>

              {/* Progress Bar */}
              <View className="mb-4">
                <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <View
                    className={`h-full ${getStatusColor(
                      info.asyncStorage.percentage,
                    )}`}
                    style={{ width: `${info.asyncStorage.percentage}%` }}
                  />
                </View>
                <Text className="text-xs text-gray-500 mt-1 text-center">
                  {info.asyncStorage.usedKB} KB / {info.asyncStorage.maxKB} KB (
                  {info.asyncStorage.percentage}%)
                </Text>
              </View>

              <View className="gap-2">
                <InfoRow
                  label="Total Keys"
                  value={info.asyncStorage.totalKeys}
                />
                <InfoRow
                  label="One Workflows"
                  value={info.asyncStorage.workflows.one}
                  icon="📦"
                />
                <InfoRow
                  label="Two Workflows"
                  value={info.asyncStorage.workflows.two}
                  icon="📦"
                />
                <InfoRow
                  label="Three Workflows"
                  value={info.asyncStorage.workflows.three}
                  icon="🚛"
                />
              </View>
            </View>

            {/* File System Card */}
            <View className="bg-white rounded-xl p-5 shadow-sm">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-bold text-gray-800">
                  📁 Sistema de Archivos
                </Text>
                <Text className="text-2xl">📊</Text>
              </View>

              <View className="gap-2">
                <InfoRow
                  label="Total Archivos"
                  value={info.fileSystem.totalFiles}
                />
                <InfoRow
                  label="Tamaño Total"
                  value={`${info.fileSystem.totalSizeMB} MB`}
                />
                <InfoRow
                  label="Imágenes"
                  value={info.fileSystem.imageFiles}
                  icon="🖼️"
                />
                <InfoRow
                  label="Videos"
                  value={info.fileSystem.videoFiles}
                  icon="🎥"
                />
                <View className="mt-2 p-2 bg-gray-50 rounded-lg">
                  <Text className="text-xs text-gray-500 font-mono">
                    {info.fileSystem.photosDir}
                  </Text>
                </View>
              </View>
            </View>

            {/* Database Card */}
            <View className="bg-white rounded-xl p-5 shadow-sm">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-bold text-gray-800">
                  🗄️ Base de Datos
                </Text>
                <Text className="text-2xl">
                  {info.database?.isHealthy ? "✅" : "❌"}
                </Text>
              </View>

              <View className="bg-gray-50 p-3 rounded-lg">
                <ScrollView horizontal>
                  <Text className="font-mono text-xs text-gray-700">
                    {JSON.stringify(info.database, null, 2)}
                  </Text>
                </ScrollView>
              </View>
            </View>

            {/* Summary Card */}
            <View className="bg-blue-600 rounded-xl p-5 shadow-sm">
              <Text className="text-white font-bold text-lg mb-3">
                📈 Resumen
              </Text>
              <View className="gap-2">
                <SummaryRow
                  label="Estado General"
                  value={
                    info.asyncStorage.percentage < 80
                      ? "Excelente ✅"
                      : "Revisar ⚠️"
                  }
                />
                <SummaryRow
                  label="Workflows Totales"
                  value={
                    info.asyncStorage.workflows.one +
                    info.asyncStorage.workflows.two +
                    info.asyncStorage.workflows.three
                  }
                />
                <SummaryRow
                  label="Espacio Disponible"
                  value={`${(
                    info.asyncStorage.maxKB - info.asyncStorage.usedKB
                  ).toFixed(0)} KB`}
                />
              </View>
            </View>
          </View>
        )}

        {/* Initial State */}
        {!info && !loading && !error && (
          <View className="items-center justify-center py-20">
            <Text className="text-6xl mb-4">🔍</Text>
            <Text className="text-gray-400 text-center text-base">
              Presiona "Verificar Sistema" para comenzar
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper Components
const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: string;
}) => (
  <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
    <Text className="text-gray-600 text-sm">
      {icon && `${icon} `}
      {label}
    </Text>
    <Text className="text-gray-800 font-semibold">{value}</Text>
  </View>
);

const SummaryRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <View className="flex-row justify-between items-center">
    <Text className="text-white text-sm opacity-90">{label}</Text>
    <Text className="text-white font-bold">{value}</Text>
  </View>
);
