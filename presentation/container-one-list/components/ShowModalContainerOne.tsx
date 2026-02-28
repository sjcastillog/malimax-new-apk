import VideoReproductorComponent from "@/components/shared/VideoReproductor";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
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
import { useContainerOne } from "../hooks/useContainerOne";

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

interface ShowContainerOneModalProps {
  visible: boolean;
  onClose: () => void;
  containerId: number;
  containerNumber: string;
  dark: boolean; // ✨ DARK MODE
}

const { width, height } = Dimensions.get("window");
const IMAGE_SIZE = (width - 64) / 2;

const fieldTitles: Record<string, string> = {
  // FOTOS VACIO EXTERNO
  emptyPanoramicPhoto: "Panorámica Vacío",
  emptyStampNavieraPhoto: "Sello Naviera Vacío",
  emptyOtherStampPhoto: "Otro Sello Vacío",
  emptySatelliteLockStampPhoto: "Sello Candado Satelital",
  emptySatelliteLockPhoto: "Candado Satelital",
  emptyAditionalStampPhoto: "Sello Adicional",
  emptySideRightPhoto: "Lado Derecho",
  emptySideLeftPhoto: "Lado Izquierdo",
  emptySideUpPhoto: "Lado Superior",
  emptySideDownPhoto: "Lado Inferior",
  emptyFrontPhoto: "Frente",
  emptyRearPhoto: "Posterior",
  emptyEirPhoto: "EIR",
  emptyPreviousInspectionDocumentPhoto: "Doc. Inspección Previa",
  emptyPlatePhoto: "Placa Vehículo",
  emptyDriverIdentificationPhoto: "CI Conductor",

  // FOTOS VACIO INTERNO
  emptyFloorPhoto: "Piso Interno",
  emptyRoofPhoto: "Techo Interno",
  emptyMirrorCoverPhoto: "Tapa Espejo",
  emptyInternalPhoto1: "Foto Interna 1",
  emptyInternalPhoto2: "Foto Interna 2",
  emptyInternalPhoto3: "Foto Interna 3",
  emptyInternalPhoto4: "Foto Interna 4",
  emptyInternalPhoto5: "Foto Interna 5",
  emptyInternalPhoto6: "Foto Interna 6",

  // MAQUINARIA
  engineryPhoto1: "Maquinaria 1",
  engineryPhoto2: "Maquinaria 2",

  // EXIT
  exitOtherStampPhoto: "Otro Sello Salida",
  exitPanoramicPhoto: "Panorámica Salida",
  exitStampNavieraPhoto: "Sello Naviera Salida",
  exitSatelliteLockStampPhoto: "Candado Satelital Salida",
  exitEngineryPhoto1: "Maquinaria Salida 1",
  exitEngineryPhoto2: "Maquinaria Salida 2",
  exitTemporarySealingPhoto: "Sellado Temporal",
};

const commentFields: Record<string, string> = {
  emptyPanoramicPhoto: "emptyPanoramicComment",
  emptyStampNavieraPhoto: "emptyStampNavieraComment",
  emptyOtherStampPhoto: "emptyOtherStampComment",
  emptySatelliteLockStampPhoto: "emptySatelliteLockStampComment",
  emptySatelliteLockPhoto: "emptySatelliteLockComment",
  emptyAditionalStampPhoto: "emptyAditionalStampComment",
  emptyFloorPhoto: "emptyFloorComment",
  emptyRoofPhoto: "emptyRoofComment",
  emptyMirrorCoverPhoto: "emptyMirrorCoverComment",
  emptyInternalPhoto1: "emptyInternalComment1",
  emptyInternalPhoto2: "emptyInternalComment2",
  emptyInternalPhoto3: "emptyInternalComment3",
  emptyInternalPhoto4: "emptyInternalComment4",
  emptyInternalPhoto5: "emptyInternalComment5",
  emptyInternalPhoto6: "emptyInternalComment6",
  engineryPhoto1: "engineryComment1",
  engineryPhoto2: "engineryComment2",
  exitOtherStampPhoto: "exitOtherStampComment",
  exitSatelliteLockStampPhoto: "exitSatelliteLockStampComment",
  exitPanoramicPhoto: "exitPanoramicComment",
  exitStampNavieraPhoto: "exitStampNavieraComment",
  exitEngineryPhoto1: "exitEngineryComment1",
  exitEngineryPhoto2: "exitEngineryComment2",
  exitTemporarySealingPhoto: "exitTemporarySealingComment",
};

export const ShowContainerOneModal = ({
  visible,
  onClose,
  containerId,
  containerNumber,
  dark, // ✨ DARK MODE PROP
}: ShowContainerOneModalProps) => {
  const { containerOneQuery } = useContainerOne(containerId);

  const [activeTab, setActiveTab] = useState<"form" | "photos" | "videos">(
    "form",
  );
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);

  const [selectedImage, setSelectedImage] = useState<PhotoItem | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // ✨ COLORES SEGÚN MODO
  const backgroundColor = dark ? "#000000" : "#FFFFFF";
  const textColor = dark ? "#FFFFFF" : "#000000";
  const primaryColor = dark ? "#91caff" : "#000080";
  const secondaryColor = "#52c41a";
  const cardBg = dark ? "#1C1C1E" : "#F9F9F9";
  const borderColor = dark ? "#38383A" : "#E5E5EA";
  const sectionBg = dark ? "#1C1C1E" : "#fafafa";
  const fieldBg = dark ? "#2C2C2E" : "#FFFFFF";

  useEffect(() => {
    if (containerOneQuery.data) {
      const data = containerOneQuery.data;
      const photoArray: PhotoItem[] = [];
      const videoArray: VideoItem[] = [];

      // Procesar todas las fotos
      Object.entries(data).forEach(([key, value]) => {
        if (key.includes("Photo") && value && typeof value === "string") {
          const commentField = commentFields[key] as any;
          const comment = commentField ? (data as any)[commentField] : null;

          photoArray.push({
            uri: value,
            title: fieldTitles[key] || key,
            alt: key,
            comment: comment,
          });
        }
      });

      // Agregar imágenes dinámicas
      if (data.images && Array.isArray(data.images)) {
        data.images.forEach((img: any, index: number) => {
          if (img.src) {
            photoArray.push({
              uri: img.src,
              title: `Foto Adicional ${index + 1}`,
              comment: img.comment || null,
            });
          }
        });
      }

      if ((data as any)["videoMalimax1"]) {
        videoArray.push({
          uri: (data as any)["videoMalimax1"],
          title: "Video Proceso",
        });
      }

      setPhotos(photoArray);
      setVideos(videoArray);
    }
  }, [containerOneQuery.data]);

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
      <View style={styles.photoOverlay}>
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
        <View style={[styles.container, { backgroundColor }]}>
          {/* HEADER */}
          <View style={[styles.header, { borderBottomColor: borderColor }]}>
            <View style={styles.headerContent}>
              <Text style={[styles.headerTitle, { color: textColor }]}>
                Contenedor N°{" "}
                <Text style={{ color: primaryColor }}>{containerNumber}</Text>
              </Text>
              <Text
                style={[
                  styles.headerSubtitle,
                  { color: textColor, opacity: 0.6 },
                ]}
              >
                Malimax 1
              </Text>
            </View>

            <View style={styles.headerActions}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={28} color="#ff4d4f" />
              </TouchableOpacity>
            </View>
          </View>

          {/* TABS */}
          <View
            style={[styles.tabContainer, { borderBottomColor: borderColor }]}
          >
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "form" && {
                  borderBottomColor: primaryColor,
                  borderBottomWidth: 3,
                },
              ]}
              onPress={() => setActiveTab("form")}
            >
              <Ionicons
                name="document-text-outline"
                size={20}
                color={activeTab === "form" ? primaryColor : textColor}
                style={{ opacity: activeTab === "form" ? 1 : 0.5 }}
              />
              <Text
                style={[
                  styles.tabText,
                  { color: textColor },
                  activeTab === "form" && {
                    color: primaryColor,
                    fontWeight: "700",
                  },
                ]}
              >
                Formulario
              </Text>
            </TouchableOpacity>

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
                name="images-outline"
                size={20}
                color={activeTab === "photos" ? primaryColor : textColor}
                style={{ opacity: activeTab === "photos" ? 1 : 0.5 }}
              />
              <Text
                style={[
                  styles.tabText,
                  { color: textColor },
                  activeTab === "photos" && {
                    color: primaryColor,
                    fontWeight: "700",
                  },
                ]}
              >
                Fotos ({photos.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
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
                color={activeTab === "videos" ? primaryColor : textColor}
                style={{ opacity: activeTab === "videos" ? 1 : 0.5 }}
              />
              <Text
                style={[
                  styles.tabText,
                  { color: textColor },
                  activeTab === "videos" && {
                    color: primaryColor,
                    fontWeight: "700",
                  },
                ]}
              >
                Videos ({videos.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* CONTENT */}
          {containerOneQuery.isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={primaryColor} />
              <Text style={[styles.loadingText, { color: textColor }]}>
                Cargando...
              </Text>
            </View>
          ) : containerOneQuery.isError ? (
            <View style={styles.loadingContainer}>
              <Ionicons name="alert-circle" size={48} color="#ff4d4f" />
              <Text style={[styles.loadingText, { color: textColor }]}>
                Error al cargar datos
              </Text>
            </View>
          ) : (
            <>
              {activeTab === "form" && (
                <FormTab
                  data={containerOneQuery.data}
                  dark={dark}
                  textColor={textColor}
                  sectionBg={sectionBg}
                  fieldBg={fieldBg}
                  borderColor={borderColor}
                  primaryColor={primaryColor}
                />
              )}
              {activeTab === "photos" && (
                <FlatList
                  data={photos}
                  renderItem={renderPhotoItem}
                  keyExtractor={(item, index) => `photo-${index}`}
                  numColumns={2}
                  contentContainerStyle={styles.listContent}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                      <Ionicons name="images" size={64} color={borderColor} />
                      <Text style={[styles.emptyText, { color: textColor }]}>
                        No hay fotos disponibles
                      </Text>
                    </View>
                  }
                />
              )}
              {activeTab === "videos" && (
                <FlatList
                  data={videos}
                  renderItem={renderVideoItem}
                  keyExtractor={(item, index) => `video-${index}`}
                  numColumns={1}
                  contentContainerStyle={styles.listContent}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                      <Ionicons name="videocam" size={64} color={borderColor} />
                      <Text style={[styles.emptyText, { color: textColor }]}>
                        No hay videos disponibles
                      </Text>
                    </View>
                  }
                />
              )}
            </>
          )}
        </View>
      </Modal>

      {/* MODAL FULLSCREEN IMAGEN */}
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

              <View style={styles.imageViewerHeader}>
                <Text style={styles.imageViewerTitle}>
                  {selectedImage.title}
                </Text>
              </View>

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

// ============================================
// COMPONENTE DEL TAB DE FORMULARIO
// ============================================
interface FormTabProps {
  data: any;
  dark: boolean;
  textColor: string;
  sectionBg: string;
  fieldBg: string;
  borderColor: string;
  primaryColor: string;
}

const FormTab = ({
  data,
  dark,
  textColor,
  sectionBg,
  fieldBg,
  borderColor,
  primaryColor,
}: FormTabProps) => {
  if (!data) return null;

  return (
    <ScrollView
      style={styles.formContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* INFORMACIÓN GENERAL */}
      <View
        style={[styles.section, { backgroundColor: sectionBg, borderColor }]}
      >
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>
          📦 INFORMACIÓN GENERAL
        </Text>
      </View>
      <FormField
        label="Contenedor"
        value={data.container}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Cliente"
        value={data.client}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="RUC/Identificación"
        value={data.clientIdentification}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Tipo de Servicio"
        value={data.typeService}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Fecha"
        value={data.date}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />

      {/* DETALLES DEL CONTENEDOR */}
      <View
        style={[styles.section, { backgroundColor: sectionBg, borderColor }]}
      >
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>
          🚢 DETALLES DEL CONTENEDOR
        </Text>
      </View>
      <FormField
        label="Tipo de Contenedor"
        value={data.typeContainer}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Naviera"
        value={data.naviera}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Tamaño"
        value={data.size}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Puerto de Ingreso"
        value={data.entryPort}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Compañía de Transporte"
        value={data.companyTransport}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />

      {/* UBICACIÓN */}
      <View
        style={[styles.section, { backgroundColor: sectionBg, borderColor }]}
      >
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>
          📍 UBICACIÓN
        </Text>
      </View>
      <FormField
        label="Ciudad"
        value={data.city}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Dirección"
        value={data.address}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Patio/Acopio"
        value={data.storageName}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Lugar de Trabajo"
        value={data.workplace}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Coordenadas"
        value={data.coordinates}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />

      {/* SUPERVISIÓN */}
      <View
        style={[styles.section, { backgroundColor: sectionBg, borderColor }]}
      >
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>
          👥 SUPERVISIÓN
        </Text>
      </View>
      <FormField
        label="CAN"
        value={data.can ?? ""}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Guía/Leader"
        value={data.leader ?? ""}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Supervisor Exportador"
        value={data.exporterSupervisor}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="ID Supervisor"
        value={data.exporterSupervisorIdentification}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Asociado"
        value={data.associated}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="ID Asociado"
        value={data.associatedIdentification}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Otros"
        value={data.others}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="ID Otros"
        value={data.othersIdentification}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />

      {/* INSPECCIÓN */}
      <View
        style={[styles.section, { backgroundColor: sectionBg, borderColor }]}
      >
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>
          🔍 INSPECCIÓN
        </Text>
      </View>
      <FormField
        label="¿Fue inspeccionado?"
        value={data.inspectedWas}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Inspeccionado por"
        value={data.inspectedBy}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Tipo de Revisión"
        value={data.typeReview}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />

      {/* CONDUCTOR */}
      <View
        style={[styles.section, { backgroundColor: sectionBg, borderColor }]}
      >
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>
          🚗 CONDUCTOR
        </Text>
      </View>
      <FormField
        label="Nombre"
        value={data.driverName}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Identificación"
        value={data.driverIdentification}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Placa"
        value={data.plateVehicle}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />

      {/* HORARIOS */}
      <View
        style={[styles.section, { backgroundColor: sectionBg, borderColor }]}
      >
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>
          ⏰ HORARIOS
        </Text>
      </View>
      <FormField
        label="Inicio de Proceso"
        value={data.startProcess}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Fin de Proceso"
        value={data.endProcess}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Hora Inicio"
        value={data.hourInit}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />
      <FormField
        label="Hora Fin"
        value={data.hourEnd}
        textColor={textColor}
        fieldBg={fieldBg}
        borderColor={borderColor}
      />

      {/* OBSERVACIONES */}
      {data.observation && (
        <>
          <View
            style={[
              styles.section,
              { backgroundColor: sectionBg, borderColor },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: primaryColor }]}>
              📝 OBSERVACIONES
            </Text>
          </View>
          <View
            style={[
              styles.observationContainer,
              { backgroundColor: fieldBg, borderBottomColor: borderColor },
            ]}
          >
            <Text style={[styles.observationText, { color: textColor }]}>
              {data.observation}
            </Text>
          </View>
        </>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

interface FormFieldProps {
  label: string;
  value: any;
  textColor: string;
  fieldBg: string;
  borderColor: string;
}

const FormField = ({
  label,
  value,
  textColor,
  fieldBg,
  borderColor,
}: FormFieldProps) => {
  if (!value) return null;

  return (
    <View
      style={[
        styles.formField,
        { backgroundColor: fieldBg, borderBottomColor: borderColor },
      ]}
    >
      <Text style={[styles.fieldLabel, { color: textColor, opacity: 0.6 }]}>
        {label}
      </Text>
      <Text style={[styles.fieldValue, { color: textColor }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  videoTitleContainer: { padding: 12, borderTopWidth: 1 },
  videoTitle: { fontSize: 14, fontWeight: "600", textAlign: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
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
    paddingHorizontal: 8,
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 6,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    gap: 16,
  },
  emptyText: {
    fontSize: 14,
  },

  // FORMULARIO
  formContainer: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
  },
  formField: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 13,
    fontWeight: "500",
  },
  observationContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  observationText: {
    fontSize: 13,
    lineHeight: 20,
  },

  // FOTOS
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
    backgroundColor: "rgba(0,0,0,0.7)",
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
    backgroundColor: "#52c41a",
    borderRadius: 10,
    padding: 4,
    marginLeft: 4,
  },

  // IMAGE VIEWER
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
    backgroundColor: "rgba(0, 0, 0, 0.85)",
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
});
