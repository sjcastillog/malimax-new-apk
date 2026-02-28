import { useClients } from "@/common/hooks";
import { Ionicons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type VideoType = "videoMalimax1" | "videoMalimax2" | "videoMalimax3";

type ContainerType = "proceso" | "malimax";

// Ajusta a tu interfaz de cliente real
interface ClientI {
  id: number;
  name: string;
  identification: string;
}

interface UploadVideoScreenProps {
  videoType: VideoType;
  containerType: ContainerType;
  title: string;
  subtitle?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  apiEndpoint: string;
  authToken?: string;
  onUploadSuccess?: (data: any) => void;
}

// ─── Componente ───────────────────────────────────────────────────────────────

const UploadVideoScreen = ({
  videoType,
  containerType,
  title,
  subtitle,
  iconName = "videocam",
  apiEndpoint,
  authToken,
  onUploadSuccess,
}: UploadVideoScreenProps) => {
  // ── Estado ──
  const [selectedClient, setSelectedClient] = useState<ClientI | null>(null);
  const [clientModalVisible, setClientModalVisible] = useState(false);
  const [clientSearch, setClientSearch] = useState("");

  const [containerNumber, setContainerNumber] = useState("");

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<{ duration: number } | null>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState<string>("");

  const { clientsQuery } = useClients();
  const { data: clients, isLoading: clientsLoading } = clientsQuery;

  const filteredClients = (clients ?? []).filter(
    (c: any) =>
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.identification.includes(clientSearch),
  );

  // ── Handlers cliente ──
  const handleSelectClient = (item: ClientI) => {
    setSelectedClient(item);
    setClientModalVisible(false);
    setClientSearch("");
  };

  const handleClearClient = () => {
    Alert.alert(
      "Limpiar Cliente",
      "¿Estás seguro de que deseas limpiar el cliente seleccionado?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpiar",
          style: "destructive",
          onPress: () => {
            setSelectedClient(null);
            setContainerNumber("");
            setSelectedVideo(null);
            setVideoInfo(null);
          },
        },
      ],
    );
  };

  // ── Handlers video ──
  const pickVideo = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permisos Requeridos",
          "Necesitamos acceso a tu galería para seleccionar videos.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 1,
      });

      if (result.canceled) return;
      if (!result.assets || result.assets.length === 0) {
        Alert.alert("Error", "No se pudo obtener el video seleccionado");
        return;
      }

      const video = result.assets[0];
      setSelectedVideo(video.uri);
      setVideoInfo({ duration: video.duration || 0 });
    } catch (error: any) {
      Alert.alert("Error", "No se pudo seleccionar el video");
    }
  };

  const clearVideo = () => {
    setSelectedVideo(null);
    setVideoInfo(null);
    setUploadProgress(0);
    setUploadSpeed("");
  };

  // ── Upload ──
  const uploadVideo = async () => {
    if (!selectedClient) {
      Alert.alert("Cliente Requerido", "Por favor selecciona un cliente");
      return;
    }
    if (!containerNumber || containerNumber.trim().length < 3) {
      Alert.alert(
        "Número de Contenedor Requerido",
        "Por favor ingresa un número de contenedor válido",
      );
      return;
    }
    if (!selectedVideo) {
      Alert.alert("Video Requerido", "Por favor selecciona un video");
      return;
    }

    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      Alert.alert(
        "Sin Conexión",
        "Necesitas conexión a Internet para subir el video.",
      );
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("video", {
        uri: selectedVideo,
        type: "video/mp4",
        name: `${videoType}_${containerNumber.trim()}_${Date.now()}.mp4`,
      } as any);
      formData.append("type", videoType);
      formData.append("containerType", containerType);
      formData.append("container", containerNumber.trim().toUpperCase());
      formData.append("clientId", String(selectedClient.id));

      const response = await uploadWithProgress(
        apiEndpoint,
        formData,
        authToken,
      );

      const onDone = () => {
        clearVideo();
        setContainerNumber("");
        setSelectedClient(null);
        onUploadSuccess?.(response);
      };

      if (response.existed === true) {
        Alert.alert(
          "Video Ya Registrado",
          `Este video ya fue subido el ${new Date(
            response.originalDate,
          ).toLocaleDateString()}.\n\nID: ${response.id}\nEstado: ${
            response.status === "active" ? "Activo" : "Inactivo"
          }`,
          [{ text: "OK", onPress: onDone }],
        );
      } else {
        Alert.alert("¡Éxito!", response.alert || "Video subido correctamente", [
          { text: "OK", onPress: onDone },
        ]);
      }
    } catch (error: any) {
      Alert.alert(
        "Error al Subir",
        error.message ||
          "No se pudo subir el video. Por favor intenta nuevamente.",
      );
    } finally {
      setUploading(false);
      setUploadSpeed("");
    }
  };

  const uploadWithProgress = (
    url: string,
    formData: FormData,
    token?: string,
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let startTime = Date.now();
      let lastLoaded = 0;

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          setUploadProgress(Math.round((event.loaded / event.total) * 100));
          const elapsed = (Date.now() - startTime) / 1000;
          const speed = (event.loaded - lastLoaded) / elapsed / 1024;
          setUploadSpeed(
            speed > 1024
              ? `${(speed / 1024).toFixed(1)} MB/s`
              : `${speed.toFixed(1)} KB/s`,
          );
          lastLoaded = event.loaded;
          startTime = Date.now();
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch {
            resolve({ success: true });
          }
        } else {
          reject(new Error(`Error ${xhr.status}: ${xhr.statusText}`));
        }
      });
      xhr.addEventListener("error", () =>
        reject(new Error("Error de red. Verifica tu conexión.")),
      );
      xhr.addEventListener("timeout", () =>
        reject(new Error("Timeout. El servidor tardó demasiado.")),
      );

      xhr.open("POST", url);
      if (token) xhr.setRequestHeader("Authorization", token);
      xhr.timeout = 600000;
      xhr.send(formData);
    });
  };

  const formatDuration = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  const canUpload =
    !!selectedClient &&
    containerNumber.trim().length >= 3 &&
    !!selectedVideo &&
    !uploading;

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      {/* <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name={iconName} size={40} color="#FFFFFF" />
        </View>
      </View> */}

      {/* ── PASO 1: Cliente ── */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>1</Text>
          </View>
          <Text style={styles.cardTitle}>CLIENTE</Text>
        </View>

        <View style={styles.cardBody}>
          {selectedClient ? (
            <View style={styles.selectedRow}>
              <View style={styles.selectedInfo}>
                <Text style={styles.selectedMain}>{selectedClient.name}</Text>
                <Text style={styles.selectedSub}>
                  RUC: {selectedClient.identification}
                </Text>
              </View>
              <View style={styles.selectedActions}>
                <TouchableOpacity
                  style={styles.changeButton}
                  onPress={() => setClientModalVisible(true)}
                  disabled={uploading}
                >
                  <Text style={styles.changeButtonText}>🔄 Cambiar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.clearRowButton}
                  onPress={handleClearClient}
                  disabled={uploading}
                >
                  <Text style={styles.clearRowButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setClientModalVisible(true)}
              disabled={uploading}
            >
              <Text style={styles.selectButtonText}>
                👤 Seleccionar Cliente
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ── PASO 2: Número de Contenedor (solo si hay cliente) ── */}
      {selectedClient && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>2</Text>
            </View>
            <Text style={styles.cardTitle}>NÚMERO DE CONTENEDOR</Text>
          </View>

          <View style={styles.cardBody}>
            <TextInput
              style={[
                styles.input,
                containerNumber.length > 0 && containerNumber.length >= 3
                  ? styles.inputValid
                  : containerNumber.length > 0
                    ? styles.inputInvalid
                    : null,
              ]}
              value={containerNumber}
              onChangeText={(t) => setContainerNumber(t.toUpperCase())}
              placeholder="Ej: ABCD1234567"
              placeholderTextColor="#999"
              autoCapitalize="characters"
              editable={!uploading}
            />
            {containerNumber.length > 0 && containerNumber.length < 3 && (
              <Text style={styles.inputHint}>Mínimo 3 caracteres</Text>
            )}
          </View>
        </View>
      )}

      {/* ── PASO 3: Video (solo si hay cliente y contenedor) ── */}
      {selectedClient && containerNumber.trim().length >= 3 && (
        <>
          {!selectedVideo ? (
            <TouchableOpacity
              style={styles.videoPicker}
              onPress={pickVideo}
              disabled={uploading}
              activeOpacity={0.7}
            >
              <View style={styles.videoPickerInner}>
                <View style={styles.stepBadgeAlt}>
                  <Text style={styles.stepBadgeText}>3</Text>
                </View>
                <Ionicons
                  name="folder-open"
                  size={52}
                  color="#000080"
                  style={{ marginTop: 8 }}
                />
                <Text style={styles.videoPickerText}>Seleccionar Video</Text>
                <Text style={styles.videoPickerSub}>
                  Toca para elegir desde tu galería
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepBadgeText}>3</Text>
                </View>
                <Text style={styles.cardTitle}>VIDEO SELECCIONADO</Text>
              </View>

              <View style={styles.videoPreviewContainer}>
                <Video
                  source={{ uri: selectedVideo }}
                  style={styles.videoPreview}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping={false}
                />
                {!uploading && (
                  <TouchableOpacity
                    style={styles.videoClearButton}
                    onPress={clearVideo}
                  >
                    <Ionicons name="close-circle" size={36} color="#FF3B30" />
                  </TouchableOpacity>
                )}
              </View>

              {videoInfo && videoInfo.duration > 0 && (
                <View style={styles.videoInfoRow}>
                  <Ionicons name="time-outline" size={18} color="#000080" />
                  <Text style={styles.videoInfoLabel}>Duración:</Text>
                  <Text style={styles.videoInfoValue}>
                    {formatDuration(videoInfo.duration)}
                  </Text>
                </View>
              )}
            </View>
          )}
        </>
      )}

      {/* ── Progress ── */}
      {uploading && (
        <View style={styles.card}>
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressText}>Subiendo video...</Text>
              <Text style={styles.progressPercentage}>{uploadProgress}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${uploadProgress}%` },
                ]}
              />
            </View>
            {uploadSpeed ? (
              <Text style={styles.speedText}>Velocidad: {uploadSpeed}</Text>
            ) : null}
            <View style={styles.progressHint}>
              <Ionicons name="alert-circle-outline" size={16} color="#FF9500" />
              <Text style={styles.progressHintText}>
                No cierres la aplicación mientras se sube
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* ── Botón Upload ── */}
      {selectedVideo && (
        <TouchableOpacity
          style={[
            styles.uploadButton,
            !canUpload && styles.uploadButtonDisabled,
          ]}
          onPress={uploadVideo}
          disabled={!canUpload}
          activeOpacity={0.8}
        >
          {uploading ? (
            <>
              <ActivityIndicator size="small" color="#FFFFFF" />
              <Text style={styles.uploadButtonText}>
                Subiendo {uploadProgress}%
              </Text>
            </>
          ) : (
            <>
              <Ionicons name="cloud-upload" size={24} color="#FFFFFF" />
              <Text style={styles.uploadButtonText}>Subir Video</Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {/* Info */}
      <View style={styles.infoContainer}>
        <Ionicons name="information-circle" size={24} color="#000080" />
        <View style={{ flex: 1 }}>
          <Text style={styles.infoTitle}>Recomendaciones:</Text>
          <Text style={styles.infoText}>
            • Verifica tu conexión a Internet{"\n"}• Videos grandes pueden
            tardar varios minutos{"\n"}• Mantén la app abierta durante la subida
          </Text>
        </View>
      </View>

      {/* ── Modal Cliente ── */}
      <Modal
        visible={clientModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setClientModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Cliente</Text>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => {
                  setClientModalVisible(false);
                  setClientSearch("");
                }}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={clientSearch}
                onChangeText={setClientSearch}
                placeholder="Buscar por nombre o RUC..."
                placeholderTextColor="#999"
              />
            </View>

            {clientsLoading ? (
              <View style={styles.modalLoading}>
                <ActivityIndicator size="large" color="#000080" />
                <Text style={styles.modalLoadingText}>
                  Cargando clientes...
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredClients}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.listItem}
                    onPress={() => handleSelectClient(item)}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.listItemMain}>{item.name}</Text>
                      <Text style={styles.listItemSub}>
                        RUC: {item.identification}
                      </Text>
                    </View>
                    <Text style={styles.listItemArrow}>›</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <View style={styles.modalEmpty}>
                    <Text style={styles.modalEmptyText}>
                      {clientSearch
                        ? "No se encontraron clientes"
                        : "No hay clientes disponibles"}
                    </Text>
                  </View>
                }
              />
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  content: { padding: 10, paddingBottom: 40 },

  // Header
  header: { alignItems: "center", marginBottom: 16, paddingTop: 5 },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: "#000080",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1A1A1A",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },

  // Card genérica
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fafafa",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000080",
    letterSpacing: 0.5,
  },
  cardBody: { padding: 16 },

  // Step badge
  stepBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#000080",
    alignItems: "center",
    justifyContent: "center",
  },
  stepBadgeAlt: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#000080",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  stepBadgeText: { color: "#fff", fontSize: 11, fontWeight: "bold" },

  // Fila seleccionado
  selectedRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6f7ff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#91d5ff",
    padding: 12,
  },
  selectedInfo: { flex: 1 },
  selectedMain: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  selectedSub: { fontSize: 12, color: "#666" },
  selectedActions: { flexDirection: "row", gap: 8 },
  changeButton: {
    backgroundColor: "#1890ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  changeButtonText: { color: "#fff", fontSize: 11, fontWeight: "bold" },
  clearRowButton: {
    backgroundColor: "#ff4d4f",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  clearRowButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },

  // Botón seleccionar vacío
  selectButton: {
    backgroundColor: "#000080",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  selectButtonText: { color: "#fff", fontSize: 15, fontWeight: "bold" },

  // Input contenedor
  input: {
    backgroundColor: "#F5F7FA",
    borderWidth: 2,
    borderColor: "#E1E8ED",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  inputValid: { borderColor: "#34C759", backgroundColor: "#F0FFF4" },
  inputInvalid: { borderColor: "#FF3B30", backgroundColor: "#FFF5F5" },
  inputHint: {
    marginTop: 6,
    fontSize: 12,
    color: "#FF3B30",
    fontWeight: "500",
  },

  // Video picker
  videoPicker: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#000080",
    borderStyle: "dashed",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  videoPickerInner: { padding: 36, alignItems: "center" },
  videoPickerText: {
    color: "#000080",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
  },
  videoPickerSub: { color: "#666", fontSize: 14, marginTop: 6 },

  // Video preview
  videoPreviewContainer: { position: "relative" },
  videoPreview: { width: "100%", height: 260, backgroundColor: "#000" },
  videoClearButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 2,
    elevation: 5,
  },
  videoInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
  },
  videoInfoLabel: { fontSize: 14, color: "#666", fontWeight: "500" },
  videoInfoValue: { fontSize: 14, color: "#1A1A1A", fontWeight: "700" },

  // Progress
  progressContainer: { padding: 20 },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  progressText: { fontSize: 15, fontWeight: "600", color: "#1A1A1A" },
  progressPercentage: { fontSize: 20, fontWeight: "bold", color: "#000080" },
  progressBarBg: {
    height: 12,
    backgroundColor: "#E1E8ED",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#000080",
    borderRadius: 6,
  },
  speedText: {
    fontSize: 13,
    color: "#34C759",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  progressHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E1E8ED",
  },
  progressHintText: { fontSize: 13, color: "#FF9500", fontWeight: "500" },

  // Upload button
  uploadButton: {
    backgroundColor: "#34C759",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 16,
    shadowColor: "#34C759",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  uploadButtonDisabled: {
    backgroundColor: "#A8A8A8",
    opacity: 0.6,
    shadowOpacity: 0.1,
  },
  uploadButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },

  // Info
  infoContainer: {
    flexDirection: "row",
    backgroundColor: "#E3F2FD",
    padding: 14,
    borderRadius: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: "#000080",
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000080",
    marginBottom: 6,
  },
  infoText: { fontSize: 13, color: "#000080", lineHeight: 22 },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#000" },
  modalClose: { padding: 8 },
  modalCloseText: { fontSize: 24, color: "#666" },
  searchContainer: { padding: 16 },
  searchInput: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  listItemMain: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  listItemSub: { fontSize: 12, color: "#666" },
  listItemArrow: { fontSize: 24, color: "#999" },
  modalLoading: { padding: 40, alignItems: "center" },
  modalLoadingText: { marginTop: 12, fontSize: 14, color: "#666" },
  modalEmpty: { padding: 40, alignItems: "center" },
  modalEmptyText: { fontSize: 14, color: "#999" },
});

export default UploadVideoScreen;
