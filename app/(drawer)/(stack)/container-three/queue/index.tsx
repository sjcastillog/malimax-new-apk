import { QueueSyncService } from "@/common/service/queueSync.service";
import { workflowDB } from "@/common/storage/database";
import { checkInternetQuality } from "@/helpers";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface QueueItem {
  id: string;
  workflowType: string;
  workflowData: any;
  photosData: any;
  timestamp: number;
  retries: number;
  status: "pending" | "processing" | "failed" | "success";
  errorMessage?: string;
  containerNumber?: string;
}

export default function FullQueueScreen() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sendingItem, setSendingItem] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    failed: 0,
    success: 0,
  });

  const loadQueue = async () => {
    try {
      const items = await workflowDB.getAllQueue("three");
      setQueue(items);

      const queueStats = await workflowDB.getQueueCount("three");
      setStats(queueStats);
    } catch (error) {
      console.error("Error cargando cola:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQueue();
  }, []);

  const handleSyncAll = async () => {
    try {
      const hasInternet = await checkInternetQuality();

      if (!hasInternet) {
        Alert.alert(
          "Sin Conexión",
          "No hay conexión a internet. Por favor, verifica tu conexión e intenta nuevamente.",
        );
        return;
      }

      Alert.alert(
        "Enviar Todos",
        `¿Deseas enviar ${stats.pending} formularios pendientes?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Sí, enviar",
            onPress: async () => {
              setSyncing(true);
              const result = await QueueSyncService.sendAllPending("three");
              setSyncing(false);

              if (result.total > 0) {
                Alert.alert(
                  "Sincronización Completa",
                  `✅ ${result.success} exitosos\n❌ ${result.failed} fallidos`,
                );
              } else {
                Alert.alert("Info", "No hay elementos para sincronizar");
              }

              await loadQueue();
            },
          },
        ],
      );
    } catch (error) {
      setSyncing(false);
      Alert.alert("Error", "Ocurrió un error al sincronizar");
    }
  };

  const handleSendItem = async (id: string) => {
    try {
      const hasInternet = await checkInternetQuality();

      if (!hasInternet) {
        Alert.alert(
          "Sin Conexión",
          "No hay conexión a internet. Por favor, verifica tu conexión e intenta nuevamente.",
        );
        return;
      }

      setSendingItem(id);
      const success = await QueueSyncService.sendItem(id, "three");
      setSendingItem(null);

      if (success) {
        Alert.alert("✅ Éxito", "Formulario enviado correctamente");
      } else {
        Alert.alert("❌ Error", "No se pudo enviar el formulario");
      }

      await loadQueue();
    } catch (error) {
      setSendingItem(null);
      Alert.alert("Error", "Ocurrió un error al enviar");
    }
  };

  const handleRetryItem = async (id: string) => {
    Alert.alert(
      "Reintentar",
      "¿Deseas reintentar el envío de este formulario?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, reintentar",
          onPress: async () => {
            await workflowDB.retryQueueItem(id);
            await loadQueue();
            Alert.alert("✅", "El formulario está listo para reenviar");
          },
        },
      ],
    );
  };

  const handleDeleteItem = async (id: string) => {
    Alert.alert(
      "Eliminar",
      "¿Estás seguro de eliminar este formulario de la cola?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await workflowDB.removeFromQueue(id);
            await loadQueue();
            Alert.alert("✅", "Formulario eliminado de la cola");
          },
        },
      ],
    );
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadQueue();
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#faad14";
      case "processing":
        return "#000080";
      case "failed":
        return "#ff4d4f";
      case "success":
        return "#52c41a";
      default:
        return "#999";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "processing":
        return "Enviando...";
      case "failed":
        return "Fallido";
      case "success":
        return "Exitoso";
      default:
        return status;
    }
  };

  const handleViewItem = (id: string) => {
    const item = queue.find((q) => q.id === id);
    if (!item) return;

    Alert.alert(
      "Ver Proceso",
      `Contenedor: ${item.containerNumber}\nProductor: ${item.workflowData.producer || "N/A"}\nFecha: ${new Date(item.timestamp).toLocaleString("es-ES")}`,
      [{ text: "OK" }],
    );
  };

  const handleResendItem = async (id: string) => {
    Alert.alert(
      "Reenviar Formulario",
      "¿Deseas reenviar este formulario al servidor?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, reenviar",
          onPress: async () => {
            try {
              const hasInternet = await checkInternetQuality();

              if (!hasInternet) {
                Alert.alert(
                  "Sin Conexión",
                  "No hay conexión a internet. Por favor, verifica tu conexión e intenta nuevamente.",
                );
                return;
              }

              setSendingItem(id);
              const success = await QueueSyncService.sendItem(id, "three");
              setSendingItem(null);

              if (success) {
                Alert.alert("✅ Éxito", "Formulario reenviado correctamente");
              } else {
                Alert.alert("❌ Error", "No se pudo reenviar el formulario");
              }

              await loadQueue();
            } catch (error) {
              setSendingItem(null);
              Alert.alert("Error", "Ocurrió un error al reenviar");
            }
          },
        },
      ],
    );
  };

  const renderItem = ({ item }: { item: QueueItem }) => {
    const isLoading = sendingItem === item.id;

    return (
      <View style={styles.queueItem}>
        {/* Header */}
        <View style={styles.queueItemHeader}>
          <View style={styles.headerLeft}>
            <Text style={styles.queueItemTitle}>
              {item.containerNumber || "Sin contenedor"}
            </Text>
            <Text style={styles.queueItemDate}>
              {new Date(item.timestamp).toLocaleString("es-ES", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${getStatusColor(item.status)}20` },
            ]}
          >
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(item.status) },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(item.status) },
              ]}
            >
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>

        {/* Info */}
        <View style={styles.queueItemInfo}>
          <Text style={styles.infoLabel}>Productor</Text>
          <Text style={styles.infoValue}>
            {item.workflowData.producer || "N/A"}
          </Text>
        </View>

        {item.retries > 0 && (
          <View style={styles.retriesContainer}>
            <Text style={styles.retriesText}>
              🔄 Reintentos: {item.retries}/3
            </Text>
          </View>
        )}

        {item.errorMessage && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>❌ {item.errorMessage}</Text>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actionsContainer}>
          {item.status === "pending" && (
            <TouchableOpacity
              style={[styles.actionButton, styles.sendButton]}
              onPress={() => handleSendItem(item.id)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Text style={styles.actionButtonText}>📤</Text>
                  <Text style={styles.actionButtonText}>Enviar</Text>
                </>
              )}
            </TouchableOpacity>
          )}

          {item.status === "failed" && (
            <TouchableOpacity
              style={[styles.actionButton, styles.retryButton]}
              onPress={() => handleRetryItem(item.id)}
            >
              <Text style={styles.actionButtonText}>🔄</Text>
              <Text style={styles.actionButtonText}>Reintentar</Text>
            </TouchableOpacity>
          )}

          {/* NUEVO: Botón Ver (solo para success) */}
          {item.status === "success" && (
            <TouchableOpacity
              style={[styles.actionButton, styles.viewButton]}
              onPress={() => handleViewItem(item.id)}
            >
              <Text style={styles.actionButtonText}>👁️</Text>
              <Text style={styles.actionButtonText}>Ver</Text>
            </TouchableOpacity>
          )}

          {/* NUEVO: Botón Reenviar (solo para success) */}
          {item.status === "success" && (
            <TouchableOpacity
              style={[styles.actionButton, styles.resendButton]}
              onPress={() => handleResendItem(item.id)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Text style={styles.actionButtonText}>🔄</Text>
                  <Text style={styles.actionButtonText}>Reenviar</Text>
                </>
              )}
            </TouchableOpacity>
          )}

          {item.status !== "processing" && (
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => handleDeleteItem(item.id)}
            >
              <Text style={styles.actionButtonText}>🗑️</Text>
              <Text style={styles.actionButtonText}>Eliminar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  if (isLoading)
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <ActivityIndicator size={30} color="#000080" />
      </View>
    );

  return (
    <View style={styles.container}>
      {/* Header con estadísticas */}
      <View style={styles.header}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: "#faad14" }]}>
              {stats.pending}
            </Text>
            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: "#ff4d4f" }]}>
              {stats.failed}
            </Text>
            <Text style={styles.statLabel}>Fallidos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: "#52c41a" }]}>
              {stats.success}
            </Text>
            <Text style={styles.statLabel}>Exitosos</Text>
          </View>
        </View>
      </View>

      {/* Botón enviar todos */}
      {stats.pending > 0 && (
        <TouchableOpacity
          style={[styles.syncButton, syncing && styles.syncButtonDisabled]}
          onPress={handleSyncAll}
          disabled={syncing}
        >
          {syncing ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.syncButtonText}>
              🔄 Enviar Todos ({stats.pending})
            </Text>
          )}
        </TouchableOpacity>
      )}

      {/* Lista */}
      <FlatList
        data={queue}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No hay formularios en cola</Text>
            <Text style={styles.emptySubtext}>
              Los formularios guardados sin conexión aparecerán aquí
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#000080",
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#000",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  syncButton: {
    backgroundColor: "#000080",
    padding: 15,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  syncButtonDisabled: {
    backgroundColor: "#91caff",
    opacity: 0.7,
  },
  syncButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    padding: 16,
  },
  queueItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  queueItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  queueItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  queueItemDate: {
    fontSize: 12,
    color: "#999",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  queueItemInfo: {
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 11,
    color: "#999",
    marginBottom: 2,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  retriesContainer: {
    backgroundColor: "#fff7e6",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  retriesText: {
    fontSize: 12,
    color: "#d48806",
    fontWeight: "600",
  },
  errorContainer: {
    backgroundColor: "#fff1f0",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 12,
    color: "#cf1322",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  sendButton: {
    backgroundColor: "#52c41a",
  },
  retryButton: {
    backgroundColor: "#faad14",
  },
  deleteButton: {
    backgroundColor: "#ff4d4f",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  viewButton: {
    backgroundColor: "#52c41a",
  },
  resendButton: {
    backgroundColor: "#722ed1",
  },
});
