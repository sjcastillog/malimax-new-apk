import { PHOTOS_DIR } from "@/common/constants";
import { File } from "expo-file-system";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWorkflowStoreTwoExtraThree } from "../store";

interface WorkflowSimulatorTwoProps {
  onComplete?: () => void;
  disabled?: boolean;
}

export const WorkflowSimulatorTwo: React.FC<WorkflowSimulatorTwoProps> = ({
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
    // Validación comments
    setEmptyPanoramicCheckComment,
    setEmptyStampNavieraCheckComment,
    setEmptyOtherStampCheckComment,
    setEmptySatelliteLockCheckComment,
    setExitEngineryCheckComment1,
    setExitEngineryCheckComment2,
    setExitDoorCheckComment,
    setExitEngineryCheckComment,
    // Carga comments
    setChargingProcessComment1,
    setChargingProcessComment2,
    // Contenedor comments
    setContainerPanoramicComment,
    setContainerPanoramicCoordinates,
    // Naviera comments
    setNavieraBottleComment,
    setNavieraWireComment,
    setNavieraLabelComment,
    // Exportador comments
    setExporterBottleComment,
    setExporterWireComment,
    setExporterLabelComment,
    // Otro comments
    setOtherBottleComment,
    setOtherWireComment,
    setOtherLabelComment,
    // GPS comments
    setGpsComment,
    setGpsStampComment,
    // Status setters
    setEmptyPanoramicCheckStatus,
    setEmptyStampNavieraCheckStatus,
    setEmptyOtherStampCheckStatus,
    setEmptySatelliteLockCheckStatus,
    setExitEngineryCheckStatus1,
    setExitEngineryCheckStatus2,
    setExitDoorCheckStatus,
    setExitEngineryCheckStatus,
  } = useWorkflowStoreTwoExtraThree();

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
      const containerNumber = `FULL${Date.now().toString().slice(-6)}`;
      setContainer(containerNumber);
      setClientId(1);
      setClient("Cliente Validación S.A.");
      setTypeContainer("40 HC");
      setNaviera("MSC");
      setSize("40");
      setCompanyTransport("Transportes Express Validación");
      setEntryPort("Guayaquil");
      setOpenedBy("Pedro Supervisor");
      setOpenedWas("No");
      setObservation("Validación de proceso FULL - Simulado para testing");
      setCoordinates("-2.1894, -79.8891");
      setClientIdentification(`RUC${Date.now().toString().slice(-10)}`);
      setLabelSerial(`VAL${Date.now().toString().slice(-6)}`);
      setPlateVehicle(`GYE-${Date.now().toString().slice(-4)}`);
      setDriverName("Roberto Conductor López");
      setDriverIdentification("0987654321");
      setAddress("Av. Marítima 456, Zona Portuaria");
      setCity("Guayaquil");
      setTypeReview("Validación FULL");
      setStorageName("Puerto Central B2");

      // 2. HORARIOS
      const startTime = "09:00";
      const endTime = "09:45";
      const processStart = "09:05";
      const processEnd = "09:40";

      setHourInit(startTime);
      setHourEnd(endTime);
      setStartProcess(processStart);
      setEndProcess(processEnd);

      // 3. COMENTARIOS DE VALIDACIÓN
      setEmptyPanoramicCheckComment("Validación panorámica OK");
      setEmptyStampNavieraCheckComment("Sello naviera validado");
      setEmptyOtherStampCheckComment("Sello adicional verificado");
      setEmptySatelliteLockCheckComment("Candado GPS validado");
      setExitEngineryCheckComment1("Ingeniería 1 conforme");
      setExitEngineryCheckComment2("Ingeniería 2 aprobada");
      setExitDoorCheckComment("Video puerta validado");
      setExitEngineryCheckComment("Video ingeniería OK");

      // 4. COMENTARIOS DE CARGA
      setChargingProcessComment1("Proceso de carga supervisado");
      setChargingProcessComment2("Mercancía asegurada correctamente");

      // 5. COMENTARIOS DE CONTENEDOR
      setContainerPanoramicComment("Contenedor lleno verificado");
      setContainerPanoramicCoordinates("-2.1894, -79.8891");

      // 6. COMENTARIOS NAVIERA
      setNavieraBottleComment("Botella naviera colocada");
      setNavieraWireComment("Cable naviera tensado");
      setNavieraLabelComment("Etiqueta naviera legible");

      // 7. COMENTARIOS EXPORTADOR
      setExporterBottleComment("Botella exportador OK");
      setExporterWireComment("Cable exportador verificado");
      setExporterLabelComment("Etiqueta exportador correcta");

      // 8. COMENTARIOS OTRO
      setOtherBottleComment("Botella adicional instalada");
      setOtherWireComment("Cable adicional asegurado");
      setOtherLabelComment("Etiqueta adicional visible");

      // 9. COMENTARIOS GPS
      setGpsComment("Dispositivo GPS activo");
      setGpsStampComment("Sello GPS verificado");

      // 10. STATUS - TODOS EN TRUE (APROBADOS)
      setEmptyPanoramicCheckStatus(true);
      setEmptyStampNavieraCheckStatus(true);
      setEmptyOtherStampCheckStatus(true);
      setEmptySatelliteLockCheckStatus(true);
      setExitEngineryCheckStatus1(true);
      setExitEngineryCheckStatus2(true);
      setExitDoorCheckStatus(true);
      setExitEngineryCheckStatus(true);

      // 11. GENERAR TODAS LAS FOTOS REQUERIDAS
      const photosToGenerate = [
        // VALIDACIÓN (12 fotos)
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

        // CARGA (2 fotos)
        "chargingProcessPhoto1",
        "chargingProcessPhoto2",

        // CONTENEDOR (1 foto)
        "containerPanoramicPhoto",

        // NAVIERA (3 fotos)
        "navieraBottlePhoto",
        "navieraWirePhoto",
        "navieraLabelPhoto",

        // EXPORTADOR (3 fotos)
        "exporterBottlePhoto",
        "exporterWirePhoto",
        "exporterLabelPhoto",

        // OTRO (3 fotos)
        "otherBottlePhoto",
        "otherWirePhoto",
        "otherLabelPhoto",

        // GPS (2 fotos)
        "gpsPhoto",
        "gpsStampPhoto",
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
        "✅ Simulación Completa - PROCESO TWO",
        `Workflow TWO (FULL) simulado exitosamente!\n\nContenedor: ${containerNumber}\nFotos: ${photosToGenerate.length}\nStatus: Todos aprobados`,
        [{ text: "OK", onPress: () => onComplete?.() }],
      );
    } catch (error) {
      console.error("❌ Error en simulación TWO:", error);
      Alert.alert("❌ Error", "Error durante la simulación del proceso TWO");
    } finally {
      setIsSimulating(false);
    }
  };

  const handlePress = () => {
    Alert.alert(
      "Simular Proceso 2",
      "¿Llenar automáticamente todos los campos del proceso FULL con datos de prueba?",
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

export default WorkflowSimulatorTwo;
