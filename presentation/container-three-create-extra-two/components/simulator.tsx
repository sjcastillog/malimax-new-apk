import { PHOTOS_DIR } from "@/common/constants";
import { File } from "expo-file-system";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWorkflowStoreThreeExtraTwo } from "../store";

interface WorkflowSimulatorThreeProps {
  onComplete?: () => void;
  disabled?: boolean;
}

export const WorkflowSimulatorThree: React.FC<WorkflowSimulatorThreeProps> = ({
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
    // Comentarios de fotos
    setContainerPanoramicComment,
    setNavieraBottleComment,
    setNavieraWireComment,
    setNavieraLabelComment,
    setExporterBottleComment,
    setExporterWireComment,
    setExporterLabelComment,
    setOtherBottleComment,
    setOtherWireComment,
    setOtherLabelComment,
    setGpsComment,
    setGpsStampComment,
    setEngineryComment1,
    setEngineryComment2,
    // Status de fotos
    setContainerPanoramicStatus,
    setNavieraBottleStatus,
    setNavieraWireStatus,
    setNavieraLabelStatus,
    setExporterBottleStatus,
    setExporterWireStatus,
    setExporterLabelStatus,
    setOtherBottleStatus,
    setOtherWireStatus,
    setOtherLabelStatus,
    setGpsStatus,
    setGpsStampStatus,
    setEngineryStatus1,
    setEngineryStatus2,
    // Status de videos
    setEngineryVideoStatus,
    setDoorVideoStatus,
  } = useWorkflowStoreThreeExtraTwo();

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
      const containerNumber = `VALID${Date.now().toString().slice(-6)}`;
      setContainer(containerNumber);
      setClientId(1);
      setClient("Cliente Validación Final S.A.");
      setTypeContainer("40 HC");
      setNaviera("MSC");
      setSize("40");
      setCompanyTransport("Transportes Validación Express");
      setEntryPort("Guayaquil");
      setOpenedBy("María Supervisora");
      setOpenedWas("No");
      setObservation("Validación final simulada - Contenedor aprobado");
      setCoordinates("-2.1894, -79.8891");
      setClientIdentification(`RUC${Date.now().toString().slice(-10)}`);
      setLabelSerial(`LBL${Date.now().toString().slice(-6)}`);
      setPlateVehicle(`GYE-${Date.now().toString().slice(-4)}`);
      setDriverName("Roberto Conductor Gómez");
      setDriverIdentification("0987654321");
      setAddress("Av. Validación 456, Sector B");
      setCity("Guayaquil");
      setTypeReview("Validación Final Completa");
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

      // 3. COMENTARIOS PARA FOTOS
      setContainerPanoramicComment("Vista panorámica validada OK");
      setNavieraBottleComment("Botella naviera verificada");
      setNavieraWireComment("Cable naviera sin daños");
      setNavieraLabelComment("Etiqueta naviera legible");
      setExporterBottleComment("Botella exportador OK");
      setExporterWireComment("Cable exportador correcto");
      setExporterLabelComment("Etiqueta exportador validada");
      setOtherBottleComment("Botella adicional verificada");
      setOtherWireComment("Cable adicional en buen estado");
      setOtherLabelComment("Etiqueta adicional legible");
      setGpsComment("GPS funcionando correctamente");
      setGpsStampComment("Sello GPS validado");
      setEngineryComment1("Ingeniería 1 aprobada");
      setEngineryComment2("Ingeniería 2 correcta");

      // 4. STATUS - TODAS LAS FOTOS APROBADAS (TRUE)
      setContainerPanoramicStatus(true);
      setNavieraBottleStatus(true);
      setNavieraWireStatus(true);
      setNavieraLabelStatus(true);
      setExporterBottleStatus(true);
      setExporterWireStatus(true);
      setExporterLabelStatus(true);
      setOtherBottleStatus(true);
      setOtherWireStatus(true);
      setOtherLabelStatus(true);
      setGpsStatus(true);
      setGpsStampStatus(true);
      setEngineryStatus1(true);
      setEngineryStatus2(true);
      setEngineryVideoStatus(true);
      setDoorVideoStatus(true);

      // 5. GENERAR TODAS LAS FOTOS REQUERIDAS (28 FOTOS)
      const photosToGenerate = [
        // CONTENEDOR (2)
        "containerPanoramicPhoto",
        "containerPanoramicCheck",

        // NAVIERA (6)
        "navieraBottlePhoto",
        "navieraBottleCheck",
        "navieraWirePhoto",
        "navieraWireCheck",
        "navieraLabelPhoto",
        "navieraLabelCheck",

        // EXPORTADOR (6)
        "exporterBottlePhoto",
        "exporterBottleCheck",
        "exporterWirePhoto",
        "exporterWireCheck",
        "exporterLabelPhoto",
        "exporterLabelCheck",

        // OTRO (6)
        "otherBottlePhoto",
        "otherBottleCheck",
        "otherWirePhoto",
        "otherWireCheck",
        "otherLabelPhoto",
        "otherLabelCheck",

        // GPS (4)
        "gpsPhoto",
        "gpsCheck",
        "gpsStampPhoto",
        "gpsStampCheck",

        // INGENIERÍA (4)
        "engineryPhoto1",
        "engineryCheck1",
        "engineryPhoto2",
        "engineryCheck2",
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
        `Validación Final simulada exitosamente!\n\nContenedor: ${containerNumber}\nFotos: ${photosToGenerate.length}\nStatus: Todos aprobados ✓`,
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
      "Simular Validación Final",
      "¿Llenar automáticamente todos los campos con datos de validación?",
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

export default WorkflowSimulatorThree;
