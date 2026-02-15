import {
  generateWfCompletePdfReportbyId,
  getContainerCompleteById,
} from "@/core/container-complete/actions";
import { WorkflowAllDataI } from "@/core/container-complete/interfaces";
import { generateWfOnePdfReportbyId } from "@/core/container-one/actions";
import { generateWfThreePdfReportbyId } from "@/core/container-three/actions";
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
import { useContainerComplete } from "../hooks";

interface PhotoItem {
  uri: string;
  title: string;
  alt?: string;
  comment?: string | null;
  processType: "process1" | "process2" | "process3";
}

interface VideoItem {
  uri: string;
  title: string;
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

// Campos que pertenecen al PROCESO 1
const process1PhotoFields = [
  "emptyPanoramicPhoto",
  "emptyStampNavieraPhoto",
  "emptyOtherStampPhoto",
  "emptySatelliteLockStampPhoto",
  "emptySatelliteLockPhoto",
  "emptyAditionalStampPhoto",
  "emptySideRightPhoto",
  "emptySideLeftPhoto",
  "emptySideUpPhoto",
  "emptySideDownPhoto",
  "emptyFrontPhoto",
  "emptyRearPhoto",
  "emptyEirPhoto",
  "emptyPreviousInspectionDocumentPhoto",
  "emptyPlatePhoto",
  "emptyDriverIdentificationPhoto",
  "emptyFloorPhoto",
  "emptyRoofPhoto",
  "emptyMirrorCoverPhoto",
  "emptyInternalPhoto1",
  "emptyInternalPhoto2",
  "emptyInternalPhoto3",
  "emptyInternalPhoto4",
  "emptyInternalPhoto5",
  "emptyInternalPhoto6",
  "exitOtherStampPhoto",
  "exitPanoramicPhoto",
  "exitStampNavieraPhoto",
  "exitSatelliteLockStampPhoto",
  "exitEngineryPhoto1",
  "exitEngineryPhoto2",
];

// Campos que pertenecen al PROCESO 2
const process2PhotoFields = [
  "emptyPanoramicCheckPhoto",
  "emptyPanoramicValidationPhoto",
  "emptyStampNavieraCheckPhoto",
  "emptyStampNavieraValidationPhoto",
  "emptyOtherStampCheckPhoto",
  "emptyOtherStampValidationPhoto",
  "emptySatelliteLockCheckPhoto",
  "emptySatelliteLockValidationPhoto",
  "exitEngineryCheckPhoto1",
  "exitEngineryValidationPhoto1",
  "exitEngineryCheckPhoto2",
  "exitEngineryValidationPhoto2",
  "chargingProcessPhoto1",
  "chargingProcessPhoto2",
  "containerPanoramicPhoto",
  "navieraBottlePhoto",
  "navieraWirePhoto",
  "navieraLabelPhoto",
  "exporterBottlePhoto",
  "exporterWirePhoto",
  "exporterLabelPhoto",
  "otherBottlePhoto",
  "otherWirePhoto",
  "otherLabelPhoto",
  "gpsPhoto",
  "gpsStampPhoto",
];

// Campos que pertenecen al PROCESO 3
const process3PhotoFields = [
  "containerPanoramicCheck",
  "navieraBottleCheck",
  "navieraLabelCheck",
  "navieraWireCheck",
  "exporterBottleCheck",
  "exporterLabelCheck",
  "exporterWireCheck",
  "otherBottleCheck",
  "otherLabelCheck",
  "otherWireCheck",
  "gpsCheck",
  "gpsStampCheck",
  "engineryPhoto1",
  "engineryCheck1",
  "engineryPhoto2",
  "engineryCheck2",
];

const fieldTitles: Record<string, string> = {
  // PROCESO 1
  emptyPanoramicPhoto: "Panorámica Vacío",
  emptyStampNavieraPhoto: "Sello Naviera Vacío",
  emptyOtherStampPhoto: "Otro Sello Vacío",
  emptySatelliteLockStampPhoto: "Sello Candado Satelital Vacío",
  emptySatelliteLockPhoto: "Candado Satelital Vacío",
  emptyAditionalStampPhoto: "Sello Adicional Vacío",
  emptySideRightPhoto: "Lado Derecho Vacío",
  emptySideLeftPhoto: "Lado Izquierdo Vacío",
  emptySideUpPhoto: "Lado Superior Vacío",
  emptySideDownPhoto: "Lado Inferior Vacío",
  emptyFrontPhoto: "Frente Vacío",
  emptyRearPhoto: "Posterior Vacío",
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
  exitPanoramicPhoto: "Panorámica Salida",
  exitStampNavieraPhoto: "Sello Naviera Salida",
  exitSatelliteLockStampPhoto: "Sello Candado Satelital Salida",
  exitEngineryPhoto1: "Maquinaria 1",
  exitEngineryPhoto2: "Maquinaria 2",

  // PROCESO 2
  emptyPanoramicCheckPhoto: "Panorámica Check P2",
  emptyPanoramicValidationPhoto: "Panorámica Validación P2",
  emptyStampNavieraCheckPhoto: "Sello Naviera Check P2",
  emptyStampNavieraValidationPhoto: "Sello Naviera Validación P2",
  emptyOtherStampCheckPhoto: "Otro Sello Check P2",
  emptyOtherStampValidationPhoto: "Otro Sello Validación P2",
  emptySatelliteLockCheckPhoto: "Candado Satelital Check P2",
  emptySatelliteLockValidationPhoto: "Candado Satelital Validación P2",
  exitEngineryCheckPhoto1: "Maquinaria 1 Check P2",
  exitEngineryValidationPhoto1: "Maquinaria 1 Validación P2",
  exitEngineryCheckPhoto2: "Maquinaria 2 Check P2",
  exitEngineryValidationPhoto2: "Maquinaria 2 Validación P2",
  chargingProcessPhoto1: "Proceso Carga 1",
  chargingProcessPhoto2: "Proceso Carga 2",
  containerPanoramicPhoto: "Panorámica Contenedor",
  navieraBottlePhoto: "Botella Naviera",
  navieraWirePhoto: "Cable Naviera",
  navieraLabelPhoto: "Etiqueta Naviera",
  exporterBottlePhoto: "Botella Exportador",
  exporterWirePhoto: "Cable Exportador",
  exporterLabelPhoto: "Etiqueta Exportador",
  otherBottlePhoto: "Botella Otro",
  otherWirePhoto: "Cable Otro",
  otherLabelPhoto: "Etiqueta Otro",
  gpsPhoto: "GPS",
  gpsStampPhoto: "Sello GPS",

  // PROCESO 3
  containerPanoramicCheck: "Panorámica Check P3",
  navieraBottleCheck: "Botella Naviera Check P3",
  navieraLabelCheck: "Etiqueta Naviera Check P3",
  navieraWireCheck: "Cable Naviera Check P3",
  exporterBottleCheck: "Botella Exportador Check P3",
  exporterLabelCheck: "Etiqueta Exportador Check P3",
  exporterWireCheck: "Cable Exportador Check P3",
  otherBottleCheck: "Botella Otro Check P3",
  otherLabelCheck: "Etiqueta Otro Check P3",
  otherWireCheck: "Cable Otro Check P3",
  gpsCheck: "GPS Check P3",
  gpsStampCheck: "Sello GPS Check P3",
  engineryPhoto1: "Maquinaria 1 P3",
  engineryCheck1: "Maquinaria 1 Check P3",
  engineryPhoto2: "Maquinaria 2 P3",
  engineryCheck2: "Maquinaria 2 Check P3",
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

  // PROCESO 2
  emptyPanoramicCheckPhoto: "emptyPanoramicCheckComment",
  emptyStampNavieraCheckPhoto: "emptyStampNavieraCheckComment",
  emptyOtherStampCheckPhoto: "emptyOtherStampCheckComment",
  emptySatelliteLockCheckPhoto: "emptySatelliteLockCheckComment",
  exitEngineryCheckPhoto1: "exitEngineryCheckComment1",
  exitEngineryCheckPhoto2: "exitEngineryCheckComment2",
  chargingProcessPhoto1: "chargingProcessComment1",
  chargingProcessPhoto2: "chargingProcessComment2",
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

  // PROCESO 3
  containerPanoramicCheck: "containerPanoramicComment",
  navieraBottleCheck: "navieraBottleComment",
  navieraLabelCheck: "navieraLabelComment",
  navieraWireCheck: "navieraWireComment",
  exporterBottleCheck: "exporterBottleComment",
  exporterLabelCheck: "exporterLabelComment",
  exporterWireCheck: "exporterWireComment",
  otherBottleCheck: "otherBottleComment",
  otherLabelCheck: "otherLabelComment",
  otherWireCheck: "otherWireComment",
  gpsCheck: "gpsComment",
  gpsStampCheck: "gpsStampComment",
  engineryPhoto1: "engineryComment1",
  engineryCheck1: "engineryComment1",
  engineryPhoto2: "engineryComment2",
  engineryCheck2: "engineryComment2",
};

export const ShowContainerCompleteModal = ({
  visible,
  onClose,
  containerId,
  containerNumber,
  dark,
}: ShowContainerCompleteModalProps) => {
  const { containerCompleteQuery } = useContainerComplete(containerId);

  const [activeTab, setActiveTab] = useState<
    "all" | "process1" | "process2" | "process3"
  >("all");
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<PhotoItem | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [dataWf, setDataWf] = useState<WorkflowAllDataI | null>(null);
  const [pdfType, setPdfType] = useState<
    "complete" | "process1" | "process2" | "process3" | null
  >(null);

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
    if (containerCompleteQuery.data) {
      handleData();
    }
  }, [containerCompleteQuery.data]);

  const handleData = async () => {
    const allData = await getContainerCompleteById(
      containerCompleteQuery.data!.id!,
    );
    setDataWf(allData);
    const photoArray: PhotoItem[] = [];
    const videoArray: VideoItem[] = [];

    // Función para determinar el proceso
    const getProcessType = (
      key: string,
    ): "process1" | "process2" | "process3" => {
      if (process1PhotoFields.includes(key)) return "process1";
      if (process2PhotoFields.includes(key)) return "process2";
      if (process3PhotoFields.includes(key)) return "process3";
      return "process1"; // default
    };

    // Procesar fotos del PROCESO 1
    if (allData.wfOne) {
      Object.entries(allData.wfOne).forEach(([key, value]) => {
        if (key.includes("Photo") && value && typeof value === "string") {
          const commentField = commentFields[key] as keyof typeof allData.wfOne;
          const comment = commentField
            ? (allData.wfOne[commentField] as string)
            : null;

          photoArray.push({
            uri: value,
            title: fieldTitles[key] || key,
            alt: key,
            comment: comment,
            processType: "process1",
          });
        }
      });

      // Videos del proceso 1
      if (allData.wfOne.emptyInternalVideo) {
        videoArray.push({
          uri: allData.wfOne.emptyInternalVideo,
          title: "Video Interno Vacío",
          processType: "process1",
        });
      }
      if (allData.wfOne.exitDoorVideo) {
        videoArray.push({
          uri: allData.wfOne.exitDoorVideo,
          title: "Video Puerta Salida",
          processType: "process1",
        });
      }
      if (allData.wfOne.exitEngineryVideo) {
        videoArray.push({
          uri: allData.wfOne.exitEngineryVideo,
          title: "Video Maquinaria Salida",
          processType: "process1",
        });
      }
    }

    // Procesar fotos del PROCESO 2
    if (allData.wfTwo) {
      Object.entries(allData.wfTwo).forEach(([key, value]) => {
        if (key.includes("Photo") && value && typeof value === "string") {
          const commentField = commentFields[key] as keyof typeof allData.wfTwo;
          const comment = commentField
            ? (allData.wfTwo[commentField] as string)
            : null;

          photoArray.push({
            uri: value,
            title: fieldTitles[key] || key,
            alt: key,
            comment: comment,
            processType: "process2",
          });
        }
      });

      // Videos del proceso 2
      if (allData.wfTwo.exitDoorCheckVideo) {
        videoArray.push({
          uri: allData.wfTwo.exitDoorCheckVideo,
          title: "Video Puerta Check P2",
          processType: "process2",
        });
      }
      if (allData.wfTwo.exitDoorValidationVideo) {
        videoArray.push({
          uri: allData.wfTwo.exitDoorValidationVideo,
          title: "Video Puerta Validación P2",
          processType: "process2",
        });
      }
      if (allData.wfTwo.exitEngineryCheckVideo) {
        videoArray.push({
          uri: allData.wfTwo.exitEngineryCheckVideo,
          title: "Video Maquinaria Check P2",
          processType: "process2",
        });
      }
      if (allData.wfTwo.exitEngineryValidationVideo) {
        videoArray.push({
          uri: allData.wfTwo.exitEngineryValidationVideo,
          title: "Video Maquinaria Validación P2",
          processType: "process2",
        });
      }
      if (allData.wfTwo.chargingProcessVideo) {
        videoArray.push({
          uri: allData.wfTwo.chargingProcessVideo,
          title: "Video Proceso Carga",
          processType: "process2",
        });
      }
      if (allData.wfTwo.exitDoorVideo) {
        videoArray.push({
          uri: allData.wfTwo.exitDoorVideo,
          title: "Video Puerta P2",
          processType: "process2",
        });
      }
      if (allData.wfTwo.exitEngineryVideo) {
        videoArray.push({
          uri: allData.wfTwo.exitEngineryVideo,
          title: "Video Maquinaria P2",
          processType: "process2",
        });
      }
    }

    // Procesar fotos del PROCESO 3
    if (allData.wfThree) {
      Object.entries(allData.wfThree).forEach(([key, value]) => {
        if (key.includes("Photo") || key.includes("Check")) {
          if (value && typeof value === "string" && !key.includes("B64")) {
            const commentField = commentFields[
              key
            ] as keyof typeof allData.wfThree;
            const comment = commentField
              ? (allData.wfThree[commentField] as string)
              : null;

            photoArray.push({
              uri: value,
              title: fieldTitles[key] || key,
              alt: key,
              comment: comment,
              processType: "process3",
            });
          }
        }
      });

      // Videos del proceso 3
      if (allData.wfThree.engineryVideo) {
        videoArray.push({
          uri: allData.wfThree.engineryVideo,
          title: "Video Maquinaria P3",
          processType: "process3",
        });
      }
      if (allData.wfThree.doorVideo) {
        videoArray.push({
          uri: allData.wfThree.doorVideo,
          title: "Video Puerta P3",
          processType: "process3",
        });
      }
    }

    setPhotos(photoArray);
    setVideos(videoArray);
  };

  const handleGeneratePdf = async (
    type: "complete" | "process1" | "process2" | "process3",
  ) => {
    setIsGeneratingPdf(true);
    setPdfType(type);

    try {
      let pdfBase64: string | null = null;
      let fileName = "";

      switch (type) {
        case "complete":
          const { data } = await generateWfCompletePdfReportbyId(containerId);
          pdfBase64 = data;
          fileName = `Reporte-Completo-${containerNumber}.pdf`;
          break;

        case "process1":
          const { data: data1 } = await generateWfOnePdfReportbyId(
            dataWf?.wfOne.id!,
          );
          pdfBase64 = data1;
          fileName = `Reporte-Proceso-1-${containerNumber}.pdf`;
          break;

        case "process2":
          const { data: data2 } = await generateWfTwoPdfReportbyId(
            dataWf?.wfTwo.id!,
          );
          pdfBase64 = data2;
          fileName = `Reporte-Proceso-2-${containerNumber}.pdf`;
          break;

        case "process3":
          const { data: data3 } = await generateWfThreePdfReportbyId(
            dataWf?.wfThree.id!,
          );
          pdfBase64 = data3;
          fileName = `Reporte-Proceso-3-${containerNumber}.pdf`;
          break;
      }

      if (!pdfBase64) {
        throw new Error("No se recibió el PDF del servidor");
      }

      const cleanBase64 = pdfBase64
        .replace(/^data:application\/pdf;base64,/, "")
        .trim();

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
      console.error("Error al generar PDF:", error);
      Alert.alert(
        "Error",
        `No se pudo generar el PDF: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`,
        [{ text: "OK" }],
      );
    } finally {
      setIsGeneratingPdf(false);
      setPdfType(null);
    }
  };

  const filteredPhotos =
    activeTab === "all"
      ? photos
      : photos.filter((photo) => photo.processType === activeTab);

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

      <View
        style={[styles.processBadge, getProcessBadgeColor(item.processType)]}
      >
        <Text style={styles.processBadgeText}>
          {item.processType === "process1"
            ? "P1"
            : item.processType === "process2"
              ? "P2"
              : "P3"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const getProcessBadgeColor = (processType?: string) => {
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
                Inspección Completa (3 Procesos)
              </ThemedText>
            </View>

            <View style={styles.headerActions}>
              <View style={styles.pdfMenu}>
                <TouchableOpacity
                  onPress={() => handleGeneratePdf("complete")}
                  disabled={isGeneratingPdf}
                  style={[
                    styles.pdfButton,
                    styles.pdfButtonMain,
                    {
                      backgroundColor:
                        isGeneratingPdf && pdfType === "complete"
                          ? "#ccc"
                          : "#FF3B30",
                    },
                  ]}
                >
                  {isGeneratingPdf && pdfType === "complete" ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Ionicons name="documents" size={22} color="#FFFFFF" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleGeneratePdf("process1")}
                  disabled={isGeneratingPdf}
                  style={[
                    styles.pdfButtonSmall,
                    {
                      backgroundColor:
                        isGeneratingPdf && pdfType === "process1"
                          ? "#ccc"
                          : "#007AFF",
                    },
                  ]}
                >
                  {isGeneratingPdf && pdfType === "process1" ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.pdfButtonSmallText}>P1</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleGeneratePdf("process2")}
                  disabled={isGeneratingPdf}
                  style={[
                    styles.pdfButtonSmall,
                    {
                      backgroundColor:
                        isGeneratingPdf && pdfType === "process2"
                          ? "#ccc"
                          : "#34C759",
                    },
                  ]}
                >
                  {isGeneratingPdf && pdfType === "process2" ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.pdfButtonSmallText}>P2</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleGeneratePdf("process3")}
                  disabled={isGeneratingPdf}
                  style={[
                    styles.pdfButtonSmall,
                    {
                      backgroundColor:
                        isGeneratingPdf && pdfType === "process3"
                          ? "#ccc"
                          : "#FF9500",
                    },
                  ]}
                >
                  {isGeneratingPdf && pdfType === "process3" ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.pdfButtonSmallText}>P3</Text>
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={28} color="red" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tabs de filtro */}
          <View
            style={[styles.tabContainer, { borderBottomColor: borderColor }]}
          >
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "all" && {
                  borderBottomColor: primaryColor,
                  borderBottomWidth: 3,
                },
              ]}
              onPress={() => setActiveTab("all")}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === "all" && {
                    color: dark ? secondaryColor : primaryColor,
                    fontWeight: "700",
                  },
                ]}
              >
                Todas ({photos.length})
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "process1" && {
                  borderBottomColor: "#007AFF",
                  borderBottomWidth: 3,
                },
              ]}
              onPress={() => setActiveTab("process1")}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === "process1" && {
                    color: "#007AFF",
                    fontWeight: "700",
                  },
                ]}
              >
                P1 ({photos.filter((p) => p.processType === "process1").length})
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "process2" && {
                  borderBottomColor: "#34C759",
                  borderBottomWidth: 3,
                },
              ]}
              onPress={() => setActiveTab("process2")}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === "process2" && {
                    color: "#34C759",
                    fontWeight: "700",
                  },
                ]}
              >
                P2 ({photos.filter((p) => p.processType === "process2").length})
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "process3" && {
                  borderBottomColor: "#FF9500",
                  borderBottomWidth: 3,
                },
              ]}
              onPress={() => setActiveTab("process3")}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === "process3" && {
                    color: "#FF9500",
                    fontWeight: "700",
                  },
                ]}
              >
                P3 ({photos.filter((p) => p.processType === "process3").length})
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Content */}
          {containerCompleteQuery.isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={primaryColor} />
              <ThemedText style={styles.loadingText}>Cargando...</ThemedText>
            </View>
          ) : containerCompleteQuery.isError ? (
            <View style={styles.loadingContainer}>
              <Ionicons name="alert-circle" size={48} color="red" />
              <ThemedText style={styles.loadingText}>
                Error al cargar datos
              </ThemedText>
            </View>
          ) : (
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
                  <ThemedText style={styles.emptyText}>
                    No hay fotos disponibles
                  </ThemedText>
                </View>
              }
            />
          )}
        </ThemedView>
      </Modal>

      {/* Modal fullscreen */}
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
                <View
                  style={[
                    styles.fullscreenProcessBadge,
                    getProcessBadgeColor(selectedImage.processType),
                  ]}
                >
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
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    opacity: 0.6,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pdfMenu: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
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
  pdfButtonMain: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  pdfButtonSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  pdfButtonSmallText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 8,
  },
  tabText: {
    fontSize: 13,
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
});
