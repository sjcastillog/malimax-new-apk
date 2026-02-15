import { PHOTOS_DIR } from "@/common/constants";
import { File } from "expo-file-system";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWorkflowStoreOneZero } from "../store"; // Ajusta la ruta según tu estructura

interface WorkflowSimulatorEmptyProps {
  onComplete?: () => void;
  disabled?: boolean;
}

export const WorkflowSimulatorEmpty: React.FC<WorkflowSimulatorEmptyProps> = ({
  onComplete,
  disabled = false,
}) => {
  const [isSimulating, setIsSimulating] = useState(false);

  const {
    setContainer,
    setClientId,
    setClient,
    setTypeContainer,
    setNaviera,
    setSize,
    setCompanyTransport,
    setEntryPort,
    setOpenedBy,
    setOpenedWas,
    setObservation,
    setCoordinates,
    setClientIdentification,
    setLabelSerial,
    setPlateVehicle,
    setDriverName,
    setDriverIdentification,
    setHourInit,
    setHourEnd,
    setStartProcess,
    setEndProcess,
    setAddress,
    setCity,
    setTypeReview,
    setStorageName,
    setPhoto,
    setEmptyPanoramicComment,
    setEmptyStampNavieraComment,
    setEmptyOtherStampComment,
    setEmptyAditionalStampComment,
    setEmptySatelliteLockStampComment,
    setEmptySatelliteLockComment,
    setEmptyFloorComment,
    setEmptyRoofComment,
    setEmptyMirrorCoverComment,
    setEmptyInternalComment1,
    setEmptyInternalComment2,
    setEmptyInternalComment3,
    setEmptyInternalComment4,
    setEmptyInternalComment5,
    setEmptyInternalComment6,
    setExitOtherStampComment,
    setExitSatelliteLockStampComment,
    setExitPanoramicComment,
    setExitStampNavieraComment,
    setExitEngineryComment1,
    setExitEngineryComment2,
  } = useWorkflowStoreOneZero();

  const createPlaceholderImage = async (
    photoKey: string,
  ): Promise<{ uri: string; filename: string }> => {
    const base64Image =
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==";

    const filename = `sim_${photoKey}_${Date.now()}.jpg`;
    const filepath = `${PHOTOS_DIR}${filename}`;

    try {
      const file = new File(filepath);
      await file.write(base64Image, { encoding: "base64" });

      return { uri: filepath, filename };
    } catch (error) {
      console.error(`Error creando foto simulada ${photoKey}:`, error);
      throw error;
    }
  };

  const simulateWorkflow = async () => {
    try {
      setIsSimulating(true);

      // 1. DATOS BÁSICOS
      const containerNumber = `SIMU${Date.now().toString().slice(-6)}`;
      setContainer(containerNumber);
      setClientId(1);
      setClient("Cliente Simulado S.A.");
      setTypeContainer("20 STD");
      setNaviera("MAERSK");
      setSize("20");
      setCompanyTransport("Transportes Rápidos Express");
      setEntryPort("Guayaquil");
      setOpenedBy("Juan Supervisor");
      setOpenedWas("Sí");
      setObservation("Inspección simulada para testing");
      setCoordinates("-2.1894, -79.8891");
      setClientIdentification(`RUC${Date.now().toString().slice(-10)}`);
      setLabelSerial(`LS${Date.now().toString().slice(-6)}`);
      setPlateVehicle(`GYE-${Date.now().toString().slice(-4)}`);
      setDriverName("Carlos Conductor Pérez");
      setDriverIdentification("0912345678");
      setAddress("Av. Principal 123, Bodega 5");
      setCity("Guayaquil");
      setTypeReview("Inspección Completa");
      setStorageName("Bodega Central A1");

      // 2. HORARIOS
      const now = new Date();
      const startTime = "08:00";
      const endTime = "08:45";
      const processStart = "08:05";
      const processEnd = "08:40";

      setHourInit(startTime);
      setHourEnd(endTime);
      setStartProcess(processStart);
      setEndProcess(processEnd);

      // 3. COMENTARIOS PARA FOTOS
      setEmptyPanoramicComment("Contenedor en buen estado general");
      setEmptyStampNavieraComment("Sello naviera verificado OK");
      setEmptyOtherStampComment("Sello adicional en puerta");
      setEmptyAditionalStampComment("Etiqueta adicional legible");
      setEmptySatelliteLockStampComment("Candado satelital activo");
      setEmptySatelliteLockComment("Dispositivo GPS funcionando");
      setEmptyFloorComment("Piso limpio sin daños");
      setEmptyRoofComment("Techo en condiciones normales");
      setEmptyMirrorCoverComment("Espejo sin fracturas");
      setEmptyInternalComment1("Pared derecha OK");
      setEmptyInternalComment2("Pared izquierda sin abolladuras");
      setEmptyInternalComment3("Panel interior limpio");
      setEmptyInternalComment4("Sin oxidación visible");
      setEmptyInternalComment5("Estructura interna correcta");
      setEmptyInternalComment6("Sin olores anormales");
      setExitOtherStampComment("Sello salida verificado");
      setExitSatelliteLockStampComment("Candado salida OK");
      setExitPanoramicComment("Contenedor cerrado correctamente");
      setExitStampNavieraComment("Sello naviera salida colocado");
      setExitEngineryComment1("Maquinaria funcionando");
      setExitEngineryComment2("Sistema refrigeración OK");

      // 4. GENERAR TODAS LAS FOTOS REQUERIDAS
      const photosToGenerate = [
        // FOTOS VACIO EXTERNO
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

        // FOTOS VACIO INTERNO
        "emptyFloorPhoto",
        "emptyRoofPhoto",
        "emptyMirrorCoverPhoto",
        "emptyInternalPhoto1",
        "emptyInternalPhoto2",
        "emptyInternalPhoto3",
        "emptyInternalPhoto4",
        "emptyInternalPhoto5",
        "emptyInternalPhoto6",

        // FOTOS FULL/EXIT
        "exitOtherStampPhoto",
        "exitPanoramicPhoto",
        "exitStampNavieraPhoto",
        "exitSatelliteLockStampPhoto",
        "exitEngineryPhoto1",
        "exitEngineryPhoto2",
      ];

      // Generar y asignar cada foto
      for (let i = 0; i < photosToGenerate.length; i++) {
        const photoKey = photosToGenerate[i];

        try {
          const { uri, filename } = await createPlaceholderImage(photoKey);
          await setPhoto(photoKey, uri, filename);
        } catch (error) {
          console.error(`❌ Error en foto ${photoKey}:`, error);
        }

        // Delay cada 10 fotos para no saturar
        if (i % 10 === 0 && i > 0) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }

      Alert.alert(
        "✅ Simulación Completa",
        `Workflow simulado exitosamente!\n\nContenedor: ${containerNumber}\nFotos: ${photosToGenerate.length}`,
        [{ text: "OK", onPress: () => onComplete?.() }],
      );
    } catch (error) {
      console.error("❌ Error en simulación:", error);
      Alert.alert("❌ Error", "Error durante la simulación");
    } finally {
      setIsSimulating(false);
    }
  };

  const handlePress = () => {
    Alert.alert(
      "Simular Workflow Completo",
      "¿Llenar automáticamente todos los campos con datos de prueba?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí, simular",
          onPress: simulateWorkflow,
          style: "default",
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.btnSimular,
        (disabled || isSimulating) && styles.buttonDisabled,
      ]}
      onPress={handlePress}
      disabled={disabled || isSimulating}
      activeOpacity={0.7}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.buttonIcon}>▶️</Text>
        <Text style={styles.btnSimularText}>
          {isSimulating ? "Simulando" : "Simular"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnSimular: {
    backgroundColor: "#52c41a",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    width: "33%",
  },
  btnSimularText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonIcon: {
    fontSize: 16,
  },
});

export default WorkflowSimulatorEmpty;
