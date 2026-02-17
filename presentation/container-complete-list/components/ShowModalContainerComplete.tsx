import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import { Ionicons } from "@expo/vector-icons";
import { useContainerOne } from "../../container-one-list/hooks";
import { getContainerOneById } from "@/core/container-one/actions";
import { getContainerTwoById } from "@/core/container-two/actions";
import { getContainerThreeById } from "@/core/container-three/actions";
import { generateWfOnePdfReportbyId } from "@/core/container-one/actions";
import { Directory, File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";

interface PhotoItem {
  uri: string;
  title: string;
  comment?: string | null;
  processType: "process1" | "process2" | "process3";
}

interface ShowContainerCompleteModalProps {
  visible: boolean;
  onClose: () => void;
  containerId: number;
  containerNumber: string;
  dark: boolean;
}

const { width, height } = Dimensions.get("window");
const IMAGE_SIZE = (width - 64) / 2;

const fieldTitles: Record<string, string> = {
  // PROCESO 1
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
  emptyFloorPhoto: "Piso Interno",
  emptyRoofPhoto: "Techo Interno",
  emptyMirrorCoverPhoto: "Tapa Espejo",
  emptyInternalPhoto1: "Foto Interna 1",
  emptyInternalPhoto2: "Foto Interna 2",
  emptyInternalPhoto3: "Foto Interna 3",
  emptyInternalPhoto4: "Foto Interna 4",
  emptyInternalPhoto5: "Foto Interna 5",
  emptyInternalPhoto6: "Foto Interna 6",
  exitOtherStampPhoto: "Otro Sello Salida",
  exitPanoramicPhoto: "Panorámica Salida P1",
  exitStampNavieraPhoto: "Sello Naviera Salida",
  exitSatelliteLockStampPhoto: "Sello Candado Satelital Salida",
  exitEngineryPhoto1: "Maquinaria 1 P1",
  exitEngineryPhoto2: "Maquinaria 2 P1",
  engineryPhoto1: "Maquinaria 1",
  engineryPhoto2: "Maquinaria 2",
  exitTemporarySealingPhoto: "Sellado Temporal",

  // PROCESO 3
  containerPanoramicPhoto: "Panorámica Contenedor P3",
  navieraBottlePhoto: "Botella Naviera P3",
  navieraWirePhoto: "Cable Naviera P3",
  navieraLabelPhoto: "Etiqueta Naviera P3",
  exporterBottlePhoto: "Botella Exportador P3",
  exporterWirePhoto: "Cable Exportador P3",
  exporterLabelPhoto: "Etiqueta Exportador P3",
  otherBottlePhoto: "Botella Otro P3",
  otherWirePhoto: "Cable Otro P3",
  otherLabelPhoto: "Etiqueta Otro P3",
  gpsPhoto: "GPS P3",
  gpsStampPhoto: "Sello GPS P3",
};

const commentFields: Record<string, string> = {
  // PROCESO 1
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
  exitOtherStampPhoto: "exitOtherStampComment",
  exitSatelliteLockStampPhoto: "exitSatelliteLockStampComment",
  exitPanoramicPhoto: "exitPanoramicComment",
  exitStampNavieraPhoto: "exitStampNavieraComment",
  exitEngineryPhoto1: "exitEngineryComment1",
  exitEngineryPhoto2: "exitEngineryComment2",
  engineryPhoto1: "engineryComment1",
  engineryPhoto2: "engineryComment2",
  exitTemporarySealingPhoto: "exitTemporarySealingComment",

  // PROCESO 3
  containerPanoramicPhoto: "containerPanoramicComment",
  navieraBottlePhoto: "navieraBottleComment",
  navieraWirePhoto: "navieraWireComment",
  navieraLabelPhoto: "navieraLabelComment",
  exporterBottlePhoto: "exporterBottleComment",
  exporterWirePhoto: "exporterWireComment",
  exporterLabelPhoto: "exporterLabelComment",
  otherBottlePhoto: "otherBottleComment",
  otherWirePhoto: "otherWireComment",
  otherLabelPhoto: "otherLabelComment",
  gpsPhoto: "gpsComment",
  gpsStampPhoto: "gpsStampComment",
};

export const ShowContainerCompleteModal = ({
  visible,
  onClose,
  containerId,
  containerNumber,
  dark,
}: ShowContainerCompleteModalProps) => {
  const { containerOneQuery } = useContainerOne(containerId);

  const [activeMainTab, setActiveMainTab] = useState<"form" | "photos">("form");
  const [activeProcessTab, setActiveProcessTab] = useState<"all" | "process1" | "process2" | "process3">("all");
  const [dataOne, setDataOne] = useState<any>(null);
  const [dataTwo, setDataTwo] = useState<any>(null);
  const [dataThree, setDataThree] = useState<any>(null);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<PhotoItem | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // ✨ COLORES SEGÚN MODO
  const backgroundColor = dark ? "#000000" : "#FFFFFF";
  const textColor = dark ? "#FFFFFF" : "#000000";
  const primaryColor = dark ? "#91caff" : "#000080";
  const cardBg = dark ? "#1C1C1E" : "#F9F9F9";
  const borderColor = dark ? "#38383A" : "#E5E5EA";
  const sectionBg = dark ? "#1C1C1E" : "#fafafa";
  const fieldBg = dark ? "#2C2C2E" : "#FFFFFF";

  useEffect(() => {
    if (containerOneQuery.data) {
      loadCompleteData();
    }
  }, [containerOneQuery.data]);

  const loadCompleteData = async () => {
    try {
      const photoArray: PhotoItem[] = [];

      // CARGAR PROCESO 1
      const process1 = await getContainerOneById(containerOneQuery.data!.id!);
      setDataOne(process1);

      if (process1) {
        // Fotos estáticas del proceso 1
        Object.entries(process1).forEach(([key, value]) => {
          if (key.includes("Photo") && value && typeof value === "string") {
            const commentField = commentFields[key] as any;
            const comment = commentField ? process1[commentField] : null;

            photoArray.push({
              uri: value,
              title: fieldTitles[key] || key,
              comment: comment,
              processType: "process1",
            });
          }
        });

        // Fotos dinámicas del proceso 1
        if (process1.images && Array.isArray(process1.images)) {
          process1.images.forEach((img: any, index: number) => {
            if (img.src) {
              photoArray.push({
                uri: img.src,
                title: `Foto Adicional P1 ${index + 1}`,
                comment: img.comment || null,
                processType: "process1",
              });
            }
          });
        }

        // CARGAR PROCESO 2 (si existe)
        try {
          const process2 = await getContainerTwoById(process1.malimaxTwoId!);
          setDataTwo(process2);

          if (process2 && process2.images && Array.isArray(process2.images)) {
            process2.images.forEach((img: any, index: number) => {
              if (img.src) {
                photoArray.push({
                  uri: img.src,
                  title: `Foto de Carga ${index + 1}`,
                  comment: img.comment || null,
                  processType: "process2",
                });
              }
            });
          }

          // CARGAR PROCESO 3 (si existe)
          if (process2) {
            try {
              const process3 = await getContainerThreeById(process1.malimaxThreeId!);
              setDataThree(process3);

              if (process3) {
                // Fotos estáticas del proceso 3
                Object.entries(process3).forEach(([key, value]) => {
                  if (key.includes("Photo") && value && typeof value === "string") {
                    const commentField = commentFields[key] as any;
                    const comment = commentField ? process3[commentField] : null;

                    photoArray.push({
                      uri: value,
                      title: fieldTitles[key] || key,
                      comment: comment,
                      processType: "process3",
                    });
                  }
                });

                // Fotos dinámicas del proceso 3
                if (process3.images && Array.isArray(process3.images)) {
                  process3.images.forEach((img: any, index: number) => {
                    if (img.src) {
                      photoArray.push({
                        uri: img.src,
                        title: `Foto de Salida ${index + 1}`,
                        comment: img.comment || null,
                        processType: "process3",
                      });
                    }
                  });
                }
              }
            } catch (error) {
              console.log("Proceso 3 no existe aún");
            }
          }
        } catch (error) {
          console.log("Proceso 2 no existe aún");
        }
      }

      setPhotos(photoArray);
    } catch (error) {
      console.error("Error loading complete data:", error);
      Alert.alert("Error", "No se pudieron cargar los datos completos");
    }
  };

  const handleGeneratePdf = async () => {
    if (!containerOneQuery.data?.id) {
      Alert.alert("Error", "No hay datos disponibles");
      return;
    }

    setIsGeneratingPdf(true);

    try {
      // EL BACKEND GENERA UN PDF COMPLETO CON LOS 3 PROCESOS
      const { data: pdfBase64 } = await generateWfOnePdfReportbyId(containerOneQuery.data.id);

      if (!pdfBase64) {
        throw new Error("No se recibió el PDF del servidor");
      }

      const cleanBase64 = pdfBase64.replace(/^data:application\/pdf;base64,/, "").trim();

      const fileName = `Reporte-Completo-${containerNumber}-${Date.now()}.pdf`;
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
        "PDF completo generado con los 3 procesos. Usa el menú de compartir para guardarlo donde desees.",
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

  const filteredPhotos =
    activeProcessTab === "all"
      ? photos
      : photos.filter((photo) => photo.processType === activeProcessTab);

  const renderPhotoItem = ({ item }: { item: PhotoItem }) => (
    <TouchableOpacity
      style={[styles.photoCard, { backgroundColor: cardBg, borderColor }]}
      onPress={() => setSelectedImage(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.uri }} style={styles.photo} resizeMode="cover" />
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

      <View style={[styles.processBadge, getProcessBadgeColor(item.processType)]}>
        <Text style={styles.processBadgeText}>
          {item.processType === "process1" ? "P1" : item.processType === "process2" ? "P2" : "P3"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const getProcessBadgeColor = (processType: string) => {
    switch (processType) {
      case "process1":
        return { backgroundColor: "#007AFF" };
      case "process2":
        return { backgroundColor: "#34C759" };
      case "process3":
        return { backgroundColor: "#FF9500" };
      default:
        return { backgroundColor: "#8E8E93" };
    }
  };

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
                Contenedor N° <Text style={{ color: primaryColor }}>{containerNumber}</Text>
              </Text>
              <Text style={[styles.headerSubtitle, { color: textColor, opacity: 0.6 }]}>
                Vista Completa - 3 Procesos
              </Text>
            </View>

            <View style={styles.headerActions}>
              {/* BOTÓN PDF ÚNICO */}
              <TouchableOpacity
                onPress={handleGeneratePdf}
                disabled={isGeneratingPdf}
                style={[
                  styles.pdfButton,
                  {
                    backgroundColor: isGeneratingPdf ? borderColor : primaryColor,
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
                <Ionicons name="close" size={28} color="#ff4d4f" />
              </TouchableOpacity>
            </View>
          </View>

          {/* TABS PRINCIPALES: FORMULARIO / FOTOS */}
          <View style={[styles.mainTabContainer, { borderBottomColor: borderColor }]}>
            <TouchableOpacity
              style={[
                styles.mainTab,
                activeMainTab === "form" && {
                  borderBottomColor: primaryColor,
                  borderBottomWidth: 3,
                },
              ]}
              onPress={() => setActiveMainTab("form")}
            >
              <Ionicons
                name="document-text-outline"
                size={20}
                color={activeMainTab === "form" ? primaryColor : textColor}
                style={{ opacity: activeMainTab === "form" ? 1 : 0.5 }}
              />
              <Text
                style={[
                  styles.mainTabText,
                  { color: textColor },
                  activeMainTab === "form" && {
                    color: primaryColor,
                    fontWeight: "700",
                  },
                ]}
              >
                Formularios
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.mainTab,
                activeMainTab === "photos" && {
                  borderBottomColor: primaryColor,
                  borderBottomWidth: 3,
                },
              ]}
              onPress={() => setActiveMainTab("photos")}
            >
              <Ionicons
                name="images-outline"
                size={20}
                color={activeMainTab === "photos" ? primaryColor : textColor}
                style={{ opacity: activeMainTab === "photos" ? 1 : 0.5 }}
              />
              <Text
                style={[
                  styles.mainTabText,
                  { color: textColor },
                  activeMainTab === "photos" && {
                    color: primaryColor,
                    fontWeight: "700",
                  },
                ]}
              >
                Fotos ({photos.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* TABS SECUNDARIOS (Solo en vista de fotos) */}
          {activeMainTab === "photos" && (
            <View style={[styles.processTabContainer, { borderBottomColor: borderColor }]}>
              <TouchableOpacity
                style={[
                  styles.processTab,
                  activeProcessTab === "all" && {
                    borderBottomColor: primaryColor,
                    borderBottomWidth: 2,
                  },
                ]}
                onPress={() => setActiveProcessTab("all")}
              >
                <Text
                  style={[
                    styles.processTabText,
                    { color: textColor },
                    activeProcessTab === "all" && {
                      color: primaryColor,
                      fontWeight: "700",
                    },
                  ]}
                >
                  Todas ({photos.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.processTab,
                  activeProcessTab === "process1" && {
                    borderBottomColor: "#007AFF",
                    borderBottomWidth: 2,
                  },
                ]}
                onPress={() => setActiveProcessTab("process1")}
              >
                <Text
                  style={[
                    styles.processTabText,
                    { color: textColor },
                    activeProcessTab === "process1" && {
                      color: "#007AFF",
                      fontWeight: "700",
                    },
                  ]}
                >
                  P1 ({photos.filter((p) => p.processType === "process1").length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.processTab,
                  activeProcessTab === "process2" && {
                    borderBottomColor: "#34C759",
                    borderBottomWidth: 2,
                  },
                ]}
                onPress={() => setActiveProcessTab("process2")}
              >
                <Text
                  style={[
                    styles.processTabText,
                    { color: textColor },
                    activeProcessTab === "process2" && {
                      color: "#34C759",
                      fontWeight: "700",
                    },
                  ]}
                >
                  P2 ({photos.filter((p) => p.processType === "process2").length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.processTab,
                  activeProcessTab === "process3" && {
                    borderBottomColor: "#FF9500",
                    borderBottomWidth: 2,
                  },
                ]}
                onPress={() => setActiveProcessTab("process3")}
              >
                <Text
                  style={[
                    styles.processTabText,
                    { color: textColor },
                    activeProcessTab === "process3" && {
                      color: "#FF9500",
                      fontWeight: "700",
                    },
                  ]}
                >
                  P3 ({photos.filter((p) => p.processType === "process3").length})
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* CONTENT */}
          {containerOneQuery.isLoading || !dataOne ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={primaryColor} />
              <Text style={[styles.loadingText, { color: textColor }]}>Cargando...</Text>
            </View>
          ) : containerOneQuery.isError ? (
            <View style={styles.loadingContainer}>
              <Ionicons name="alert-circle" size={48} color="#ff4d4f" />
              <Text style={[styles.loadingText, { color: textColor }]}>Error al cargar datos</Text>
            </View>
          ) : (
            <>
              {activeMainTab === "form" && (
                <CompleteFormTab
                  dataOne={dataOne}
                  dataTwo={dataTwo}
                  dataThree={dataThree}
                  dark={dark}
                  textColor={textColor}
                  sectionBg={sectionBg}
                  fieldBg={fieldBg}
                  borderColor={borderColor}
                  primaryColor={primaryColor}
                />
              )}
              {activeMainTab === "photos" && (
                <FlatList
                  data={filteredPhotos}
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
                <Text style={styles.imageViewerTitle}>{selectedImage.title}</Text>
                <View style={[styles.fullscreenProcessBadge, getProcessBadgeColor(selectedImage.processType)]}>
                  <Text style={styles.fullscreenProcessText}>
                    {selectedImage.processType === "process1"
                      ? "Proceso 1"
                      : selectedImage.processType === "process2"
                        ? "Proceso 2"
                        : "Proceso 3"}
                  </Text>
                </View>
              </View>

              {selectedImage.comment && (
                <View style={styles.imageViewerCommentContainer}>
                  <View style={styles.imageViewerCommentHeader}>
                    <Ionicons name="chatbox" size={16} color="#FFFFFF" />
                    <Text style={styles.imageViewerCommentLabel}>Comentario:</Text>
                  </View>
                  <Text style={styles.imageViewerCommentText}>{selectedImage.comment}</Text>
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
// COMPONENTE DEL TAB DE FORMULARIOS COMPLETOS
// ============================================
interface CompleteFormTabProps {
  dataOne: any;
  dataTwo: any;
  dataThree: any;
  dark: boolean;
  textColor: string;
  sectionBg: string;
  fieldBg: string;
  borderColor: string;
  primaryColor: string;
}

const CompleteFormTab = ({
  dataOne,
  dataTwo,
  dataThree,
  dark,
  textColor,
  sectionBg,
  fieldBg,
  borderColor,
  primaryColor,
}: CompleteFormTabProps) => {
  return (
    <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
      {/* PROCESO 1 */}
      {dataOne && (
        <>
          <View style={[styles.processSeparator, { backgroundColor: "#007AFF" }]}>
            <Text style={styles.processSeparatorText}>📦 PROCESO 1 - INSPECCIÓN VACÍO</Text>
          </View>

          <View style={[styles.section, { backgroundColor: sectionBg, borderColor }]}>
            <Text style={[styles.sectionTitle, { color: primaryColor }]}>INFORMACIÓN GENERAL</Text>
          </View>
          <FormField label="Contenedor" value={dataOne.container} textColor={textColor} fieldBg={fieldBg} borderColor={borderColor} />
          <FormField label="Cliente" value={dataOne.client} textColor={textColor} fieldBg={fieldBg} borderColor={borderColor} />
          <FormField label="RUC" value={dataOne.clientIdentification} textColor={textColor} fieldBg={fieldBg} borderColor={borderColor} />
          <FormField label="Tipo de Servicio" value={dataOne.typeService} textColor={textColor} fieldBg={fieldBg} borderColor={borderColor} />
          <FormField label="Fecha" value={dataOne.date} textColor={textColor} fieldBg={fieldBg} borderColor={borderColor} />

          <View style={[styles.section, { backgroundColor: sectionBg, borderColor }]}>
            <Text style={[styles.sectionTitle, { color: primaryColor }]}>UBICACIÓN</Text>
          </View>
          <FormField label="Ciudad" value={dataOne.city} textColor={textColor} fieldBg={fieldBg} borderColor={borderColor} />
          <FormField label="Dirección" value={dataOne.address} textColor={textColor} fieldBg={fieldBg} borderColor={borderColor} />
          <FormField label="Patio/Acopio" value={dataOne.storageName} textColor={textColor} fieldBg={fieldBg} borderColor={borderColor} />

          {dataOne.observation && (
            <>
              <View style={[styles.section, { backgroundColor: sectionBg, borderColor }]}>
                <Text style={[styles.sectionTitle, { color: primaryColor }]}>OBSERVACIONES</Text>
              </View>
              <View style={[styles.observationContainer, { backgroundColor: fieldBg, borderBottomColor: borderColor }]}>
                <Text style={[styles.observationText, { color: textColor }]}>{dataOne.observation}</Text>
              </View>
            </>
          )}
        </>
      )}

      {/* PROCESO 2 */}
      {dataTwo && (
        <>
          <View style={[styles.processSeparator, { backgroundColor: "#34C759" }]}>
            <Text style={styles.processSeparatorText}>🍌 PROCESO 2 - LLENADO</Text>
          </View>

          <View style={[styles.section, { backgroundColor: sectionBg, borderColor }]}>
            <Text style={[styles.sectionTitle, { color: primaryColor }]}>PRODUCTO</Text>
          </View>
          <FormField label="Producto" value={dataTwo.product} textColor={textColor} fieldBg={fieldBg} borderColor={borderColor} />
          <FormField label="Presentación" value={dataTwo.presentation} textColor={textColor} fieldBg={fieldBg} borderColor={borderColor} />

          <View style={[styles.section, { backgroundColor: sectionBg, borderColor }]}>
            <Text style={[styles.sectionTitle, { color: primaryColor }]}>MUESTREO</Text>
          </View>
          <FormField label="Número de Pallets" value={dataTwo.numberPallet} textColor={textColor} fieldBg={fieldBg} borderColor={borderColor} />
          <FormField label="Número de Presentaciones" value={dataTwo.numberPresentation} textColor={textColor} fieldBg={fieldBg} borderColor={borderColor} />
          <FormField label="Número de Muestreo" value={dataTwo.numberSampling} textColor={textColor} fieldBg={fieldBg} borderColor={borderColor} />

          {dataTwo.observation && (
            <>
              <View style={[styles.section, { backgroundColor: sectionBg, borderColor }]}>
                <Text style={[styles.sectionTitle, { color: primaryColor }]}>OBSERVACIONES</Text>
              </View>
              <View style={[styles.observationContainer, { backgroundColor: fieldBg, borderBottomColor: borderColor }]}>
                <Text style={[styles.observationText, { color: textColor }]}>{dataTwo.observation}</Text>
              </View>
            </>
          )}
        </>
      )}

      {/* PROCESO 3 */}
      {dataThree && (
        <>
          <View style={[styles.processSeparator, { backgroundColor: "#FF9500" }]}>
            <Text style={styles.processSeparatorText}>🚢 PROCESO 3 - SALIDA</Text>
          </View>

          <View style={[styles.section, { backgroundColor: sectionBg, borderColor }]}>
            <Text style={[styles.sectionTitle, { color: primaryColor }]}>INFORMACIÓN</Text>
          </View>
          <FormField label="Puerto de Ingreso" value={dataThree.entryPort} textColor={textColor} fieldBg={fieldBg} borderColor={borderColor} />
          <FormField label="Coordenadas" value={dataThree.coordinates} textColor={textColor} fieldBg={fieldBg} borderColor={borderColor} />

          {dataThree.observation && (
            <>
              <View style={[styles.section, { backgroundColor: sectionBg, borderColor }]}>
                <Text style={[styles.sectionTitle, { color: primaryColor }]}>OBSERVACIONES</Text>
              </View>
              <View style={[styles.observationContainer, { backgroundColor: fieldBg, borderBottomColor: borderColor }]}>
                <Text style={[styles.observationText, { color: textColor }]}>{dataThree.observation}</Text>
              </View>
            </>
          )}
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

const FormField = ({ label, value, textColor, fieldBg, borderColor }: FormFieldProps) => {
  if (!value) return null;

  return (
    <View style={[styles.formField, { backgroundColor: fieldBg, borderBottomColor: borderColor }]}>
      <Text style={[styles.fieldLabel, { color: textColor, opacity: 0.6 }]}>{label}</Text>
      <Text style={[styles.fieldValue, { color: textColor }]}>{value}</Text>
    </View>
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
  mainTabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  mainTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 6,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  mainTabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  processTabContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  processTab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  processTabText: {
    fontSize: 12,
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
  processSeparator: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  processSeparatorText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
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
  processBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  processBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
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
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  imageViewerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    flex: 1,
  },
  fullscreenProcessBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  fullscreenProcessText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
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