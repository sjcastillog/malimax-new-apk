import VideoReproductorComponent from "@/components/shared/VideoReproductor";
import { generateWfTwoPdfReportbyId } from "@/core/container-two/actions";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Directory, File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useContainerTwo } from "../hooks";

interface PhotoItem {
  uri: string;
  title: string;
  alt?: string;
  comment?: string | null;
}

interface VideoItem {
  uri: string;
  title: string;
}

interface ShowContainerTwoModalProps {
  visible: boolean;
  onClose: () => void;
  containerId: number;
  containerNumber: string;
  dark: boolean;
}

const { width, height } = Dimensions.get("window");
const IMAGE_SIZE = (width - 64) / 2;

const fieldTitles: Record<string, string> = {
  // VALIDACIÓN - FOTOS
  emptyPanoramicCheckPhoto: "Panorámica Validación",
  emptyPanoramicValidationPhoto: "Panorámica Original",
  emptyStampNavieraCheckPhoto: "Sello Naviera Validación",
  emptyStampNavieraValidationPhoto: "Sello Naviera Original",
  emptyOtherStampCheckPhoto: "Otro Sello Validación",
  emptyOtherStampValidationPhoto: "Otro Sello Original",
  emptySatelliteLockCheckPhoto: "Candado GPS Validación",
  emptySatelliteLockValidationPhoto: "Candado GPS Original",
  exitEngineryCheckPhoto1: "Ingeniería 1 Validación",
  exitEngineryValidationPhoto1: "Ingeniería 1 Original",
  exitEngineryCheckPhoto2: "Ingeniería 2 Validación",
  exitEngineryValidationPhoto2: "Ingeniería 2 Original",

  // CARGA
  chargingProcessPhoto1: "Proceso de Carga 1",
  chargingProcessPhoto2: "Proceso de Carga 2",

  // CONTENEDOR
  containerPanoramicPhoto: "Panorámica Contenedor",

  // NAVIERA
  navieraBottlePhoto: "Botella Naviera",
  navieraWirePhoto: "Cable Naviera",
  navieraLabelPhoto: "Etiqueta Naviera",

  // EXPORTADOR
  exporterBottlePhoto: "Botella Exportador",
  exporterWirePhoto: "Cable Exportador",
  exporterLabelPhoto: "Etiqueta Exportador",

  // OTRO
  otherBottlePhoto: "Botella Otro",
  otherWirePhoto: "Cable Otro",
  otherLabelPhoto: "Etiqueta Otro",

  // GPS
  gpsPhoto: "GPS",
  gpsStampPhoto: "Sello GPS",
};

const commentFields: Record<string, string> = {
  // VALIDACIÓN
  emptyPanoramicCheckPhoto: "emptyPanoramicCheckComment",
  emptyStampNavieraCheckPhoto: "emptyStampNavieraCheckComment",
  emptyOtherStampCheckPhoto: "emptyOtherStampCheckComment",
  emptySatelliteLockCheckPhoto: "emptySatelliteLockCheckComment",
  exitEngineryCheckPhoto1: "exitEngineryCheckComment1",
  exitEngineryCheckPhoto2: "exitEngineryCheckComment2",

  // CARGA
  chargingProcessPhoto1: "chargingProcessComment1",
  chargingProcessPhoto2: "chargingProcessComment2",

  // CONTENEDOR
  containerPanoramicPhoto: "containerPanoramicComment",

  // NAVIERA
  navieraBottlePhoto: "navieraBottleComment",
  navieraWirePhoto: "navieraWireComment",
  navieraLabelPhoto: "navieraLabelComment",

  // EXPORTADOR
  exporterBottlePhoto: "exporterBottleComment",
  exporterWirePhoto: "exporterWireComment",
  exporterLabelPhoto: "exporterLabelComment",

  // OTRO
  otherBottlePhoto: "otherBottleComment",
  otherWirePhoto: "otherWireComment",
  otherLabelPhoto: "otherLabelComment",

  // GPS
  gpsPhoto: "gpsComment",
  gpsStampPhoto: "gpsStampComment",
};

export const ShowContainerTwoModal = ({
  visible,
  onClose,
  containerId,
  containerNumber,
  dark,
}: ShowContainerTwoModalProps) => {
  const { containerTwoQuery } = useContainerTwo(containerId);

  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<PhotoItem | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const backgroundColor = useThemeColor(
    { light: "#FFFFFF", dark: "#000000" },
    "background",
  );
  const primaryColor = useThemeColor({}, "primary");
  const secondaryColor = useThemeColor({}, "secondary");
  const textColor = useThemeColor(
    { light: "#000000", dark: "#FFFFFF" },
    "text",
  );
  const cardBg = useThemeColor(
    { light: "#F9F9F9", dark: "#1C1C1E" },
    "background",
  );
  const borderColor = useThemeColor(
    { light: "#E5E5EA", dark: "#38383A" },
    "border",
  );

  useEffect(() => {
    if (containerTwoQuery.data) {
      const data = containerTwoQuery.data;
      const photoArray: PhotoItem[] = [];
      const videoArray: VideoItem[] = [];

      // Procesar todas las fotos
      Object.entries(data).forEach(([key, value]) => {
        if (key.includes("Photo") && value && typeof value === "string") {
          const commentField = commentFields[key] as any;
          const comment = commentField ? data[commentField] : null;

          photoArray.push({
            uri: value,
            title: fieldTitles[key] || key.replace(/([A-Z])/g, " $1").trim(), // Fallback más legible
            alt: key,
            comment: comment,
          });
        }
      });

      // Procesar videos
      if (data.chargingProcessVideo) {
        videoArray.push({
          uri: data.chargingProcessVideo,
          title: "Video Proceso de Carga",
        });
      }
      if (data.exitDoorVideo) {
        videoArray.push({
          uri: data.exitDoorVideo,
          title: "Video Puerta Salida",
        });
      }
      if (data.exitEngineryVideo) {
        videoArray.push({
          uri: data.exitEngineryVideo,
          title: "Video Maquinaria Salida",
        });
      }
      if (data.exitDoorCheckVideo) {
        videoArray.push({
          uri: data.exitDoorCheckVideo,
          title: "Video Puerta Validación",
        });
      }
      if (data.exitDoorValidationVideo) {
        videoArray.push({
          uri: data.exitDoorValidationVideo,
          title: "Video Puerta Original",
        });
      }
      if (data.exitEngineryCheckVideo) {
        videoArray.push({
          uri: data.exitEngineryCheckVideo,
          title: "Video Maquinaria Validación",
        });
      }
      if (data.exitEngineryValidationVideo) {
        videoArray.push({
          uri: data.exitEngineryValidationVideo,
          title: "Video Maquinaria Original",
        });
      }

      setPhotos(photoArray);
      setVideos(videoArray);
    }
  }, [containerTwoQuery.data]);

  const handleGeneratePdf = async () => {
    setIsGeneratingPdf(true);

    try {
      const { data: pdfBase64 } = await generateWfTwoPdfReportbyId(containerId);

      if (!pdfBase64) {
        throw new Error("No se recibió el PDF del servidor");
      }

      const cleanBase64 = pdfBase64
        .replace(/^data:application\/pdf;base64,/, "")
        .trim();

      const fileName = `Reporte-Proceso-2-${containerNumber}-${Date.now()}.pdf`;
      const cacheDir = new Directory(Paths.cache);
      const pdfFile = new File(cacheDir, fileName);

      await pdfFile.write(cleanBase64, { encoding: "base64" });

      const canShare = await Sharing.isAvailableAsync();

      if (!canShare) {
        throw new Error("La función de compartir no está disponible");
      }

      await Sharing.shareAsync(pdfFile.uri, {
        mimeType: "application/pdf",
        dialogTitle: "Guardar o Compartir PDF",
        UTI: "com.adobe.pdf",
      });

      Alert.alert(
        "¡Éxito!",
        "PDF generado. Usa el menú de compartir para guardarlo donde desees.",
        [{ text: "OK" }],
      );
    } catch (error) {
      console.error("❌ Error:", error);
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "No se pudo generar el PDF",
        [{ text: "OK" }],
      );
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const renderPhotoItem = ({ item }: { item: PhotoItem }) => (
    <TouchableOpacity
      style={[styles.photoCard, { backgroundColor: cardBg, borderColor }]}
      onPress={() => setSelectedImage(item)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.photo}
        resizeMode="cover"
      />
      <View
        style={[styles.photoOverlay, { backgroundColor: "rgba(0,0,0,0.6)" }]}
      >
        <Text style={styles.photoTitle} numberOfLines={2}>
          {item.title}
        </Text>
        {item.comment && (
          <View style={styles.commentBadge}>
            <Ionicons name="chatbox" size={10} color="#FFFFFF" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderVideoItem = ({ item }: { item: VideoItem }) => (
    <View style={[styles.videoCard, { backgroundColor: cardBg, borderColor }]}>
      <VideoReproductorComponent videoSource={item.uri} />
      <View
        style={[styles.videoTitleContainer, { borderTopColor: borderColor }]}
      >
        <Text style={[styles.videoTitle, { color: textColor }]}>
          {item.title}
        </Text>
      </View>
    </View>
  );

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withSpring(1);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else if (scale.value > 5) {
        scale.value = withSpring(5);
      }
      savedScale.value = scale.value;
    });

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = savedTranslateX.value + event.translationX;
      translateY.value = savedTranslateY.value + event.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const resetZoom = () => {
    scale.value = withTiming(1);
    savedScale.value = 1;
    translateX.value = withTiming(0);
    translateY.value = withTiming(0);
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
  };

  return (
    <>
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={onClose}
      >
        <ThemedView style={[styles.container, { backgroundColor }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: borderColor }]}>
            <View style={styles.headerContent}>
              <ThemedText style={styles.headerTitle}>
                Contenedor N°{" "}
                <Text style={{ color: dark ? secondaryColor : primaryColor }}>
                  {containerNumber}
                </Text>
              </ThemedText>
              <ThemedText style={styles.headerSubtitle}>
                Inspección Proceso 2
              </ThemedText>
            </View>
            {/* Botones de acción */}
            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={handleGeneratePdf}
                disabled={isGeneratingPdf}
                style={[
                  styles.pdfButton,
                  {
                    backgroundColor: isGeneratingPdf
                      ? "#ccc"
                      : dark
                        ? secondaryColor
                        : primaryColor,
                  },
                ]}
              >
                {isGeneratingPdf ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Ionicons name="document-text" size={22} color="#FFFFFF" />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={28} color="red" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tabs */}
          <View
            style={[styles.tabContainer, { borderBottomColor: borderColor }]}
          >
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "photos" && {
                  borderBottomColor: primaryColor,
                  borderBottomWidth: 3,
                },
              ]}
              onPress={() => setActiveTab("photos")}
            >
              <Ionicons
                name="images"
                size={20}
                color={
                  activeTab === "photos"
                    ? dark
                      ? secondaryColor
                      : primaryColor
                    : textColor
                }
              />
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === "photos" && {
                    color: dark ? secondaryColor : primaryColor,
                    fontWeight: "700",
                  },
                ]}
              >
                Fotos ({photos.length})
              </ThemedText>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "videos" && {
                  borderBottomColor: primaryColor,
                  borderBottomWidth: 3,
                },
              ]}
              onPress={() => setActiveTab("videos")}
            >
              <Ionicons
                name="videocam"
                size={20}
                color={
                  activeTab === "videos"
                    ? dark
                      ? secondaryColor
                      : primaryColor
                    : textColor
                }
              />
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === "videos" && {
                    color: dark ? secondaryColor : primaryColor,
                    fontWeight: "700",
                  },
                ]}
              >
                Videos ({videos.length})
              </ThemedText>
            </TouchableOpacity> */}
          </View>

          {/* Content */}
          {containerTwoQuery.isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={primaryColor} />
              <ThemedText style={styles.loadingText}>Cargando...</ThemedText>
            </View>
          ) : containerTwoQuery.isError ? (
            <View style={styles.loadingContainer}>
              <Ionicons name="alert-circle" size={48} color="red" />
              <ThemedText style={styles.loadingText}>
                Error al cargar datos
              </ThemedText>
            </View>
          ) : (
            <FlatList
              data={activeTab === "photos" ? photos : videos}
              renderItem={
                activeTab === "photos" ? renderPhotoItem : renderVideoItem
              }
              keyExtractor={(item, index) => `${activeTab}-${index}`}
              numColumns={activeTab === "photos" ? 2 : 1}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons
                    name={activeTab === "photos" ? "images" : "videocam"}
                    size={64}
                    color={borderColor}
                  />
                  <ThemedText style={styles.emptyText}>
                    No hay {activeTab === "photos" ? "fotos" : "videos"}{" "}
                    disponibles
                  </ThemedText>
                </View>
              }
            />
          )}
        </ThemedView>
      </Modal>

      {/* Modal para ver imagen en fullscreen con comentario */}
      {selectedImage && (
        <Modal
          visible={!!selectedImage}
          transparent
          animationType="fade"
          onRequestClose={() => {
            resetZoom();
            setSelectedImage(null);
          }}
        >
          <GestureHandlerRootView style={styles.imageViewerContainer}>
            <View style={styles.imageViewerContainer}>
              <GestureDetector gesture={composedGesture}>
                <Animated.View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Animated.Image
                    source={{ uri: selectedImage.uri }}
                    style={[styles.fullscreenImage, animatedStyle]}
                    resizeMode="contain"
                  />
                </Animated.View>
              </GestureDetector>

              {/* Header con título */}
              <View style={styles.imageViewerHeader}>
                <Text style={styles.imageViewerTitle}>
                  {selectedImage.title}
                </Text>
              </View>

              {/* Comentario si existe */}
              {selectedImage.comment && (
                <View style={styles.imageViewerCommentContainer}>
                  <View style={styles.imageViewerCommentHeader}>
                    <Ionicons name="chatbox" size={16} color="#FFFFFF" />
                    <Text style={styles.imageViewerCommentLabel}>
                      Comentario:
                    </Text>
                  </View>
                  <Text style={styles.imageViewerCommentText}>
                    {selectedImage.comment}
                  </Text>
                </View>
              )}

              {/* Botón cerrar */}
              <TouchableOpacity
                style={styles.imageViewerClose}
                onPress={() => {
                  resetZoom();
                  setSelectedImage(null);
                }}
              >
                <Ionicons name="close-circle" size={40} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </GestureHandlerRootView>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.6,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pdfButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  closeButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    opacity: 0.6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
  },
  listContent: {
    padding: 16,
  },
  photoCard: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    margin: 8,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  photoOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  photoTitle: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
    flex: 1,
  },
  commentBadge: {
    backgroundColor: "rgba(52, 199, 89, 0.9)",
    borderRadius: 10,
    padding: 4,
    marginLeft: 4,
  },
  videoCard: {
    width: width - 32,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  videoTitleContainer: {
    padding: 12,
    borderTopWidth: 1,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  imageViewerContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageViewerHeader: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 70,
    zIndex: 10,
  },
  imageViewerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  imageViewerCommentContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 12,
    padding: 16,
    zIndex: 10,
  },
  imageViewerCommentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  imageViewerCommentLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  imageViewerCommentText: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
  },
  imageViewerClose: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
  },
  fullscreenImage: {
    width: width,
    height: height,
  },
  fullscreenStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  fullscreenStatusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});
