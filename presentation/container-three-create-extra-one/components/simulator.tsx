import { PHOTOS_DIR } from "@/common/constants";
import { File } from "expo-file-system";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWorkflowStoreThreeExtraOne } from "../store";

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
    // Datos del proceso 2 (readonly)
    setContainer,
    setClientId,
    setClient,
    setClientIdentification,

    // Datos del proceso 3
    setEntryPort,

    // Generales
    setCoordinates,
    setObservation,
    setHourInit,
    setHourEnd,

    // Setters de fotos estáticas
    setContainerPanoramicPhoto,
    setContainerPanoramicComment,
    setContainerPanoramicCoordinates,

    setNavieraBottlePhoto,
    setNavieraBottleComment,
    setNavieraWirePhoto,
    setNavieraWireComment,
    setNavieraLabelPhoto,
    setNavieraLabelComment,

    setExporterBottlePhoto,
    setExporterBottleComment,
    setExporterWirePhoto,
    setExporterWireComment,
    setExporterLabelPhoto,
    setExporterLabelComment,

    setOtherBottlePhoto,
    setOtherBottleComment,
    setOtherWirePhoto,
    setOtherWireComment,
    setOtherLabelPhoto,
    setOtherLabelComment,

    setGpsPhoto,
    setGpsComment,
    setGpsStampPhoto,
    setGpsStampComment,

    // Imágenes dinámicas
    addImage,
    updateImage,
  } = useWorkflowStoreThreeExtraOne();

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

      // ============================================
      // 1. DATOS DEL PROCESO 2 (READONLY - vienen del proceso anterior)
      // ============================================
      const containerNumber = `EXIT${Date.now().toString().slice(-6)}`;
      setContainer(containerNumber);
      setClientId(1);
      setClient("Cliente Exportador S.A.");
      setClientIdentification(`RUC${Date.now().toString().slice(-10)}`);

      // ============================================
      // 2. DATOS DEL PROCESO 3
      // ============================================
      setEntryPort("PUERTO DE GUAYAQUIL");

      // ============================================
      // 3. DATOS GENERALES
      // ============================================
      setCoordinates("-2.1894, -79.8891");
      setObservation(
        "Inspección de salida completada. Contenedor sellado correctamente. " +
          "Todos los precintos verificados y en buen estado. " +
          "Dispositivo GPS activo y funcionando.",
      );

      // ============================================
      // 4. HORARIOS
      // ============================================
      const now = new Date();
      const startTime = "14:00";
      const endTime = "15:00";

      setHourInit(startTime);
      setHourEnd(endTime);

      // ============================================
      // 5. COMENTARIOS DE FOTOS ESTÁTICAS
      // ============================================
      setContainerPanoramicComment(
        "Vista panorámica del contenedor sellado y listo para salida",
      );
      setContainerPanoramicCoordinates("-2.1894, -79.8891");

      setNavieraBottleComment(
        "Botella de precinto naviera instalada correctamente",
      );
      setNavieraWireComment("Cable de precinto naviera tensado y asegurado");
      setNavieraLabelComment(
        "Etiqueta de precinto naviera legible y verificada",
      );

      setExporterBottleComment("Botella de precinto exportador verificada");
      setExporterWireComment("Cable de precinto exportador en perfecto estado");
      setExporterLabelComment(
        "Etiqueta de precinto exportador correctamente adherida",
      );

      setOtherBottleComment("Botella de precinto adicional instalada");
      setOtherWireComment("Cable de precinto adicional asegurado");
      setOtherLabelComment("Etiqueta de precinto adicional visible");

      setGpsComment("Dispositivo GPS activo - señal estable");
      setGpsStampComment("Sello del dispositivo GPS verificado e intacto");

      // ============================================
      // 6. GENERAR 12 FOTOS ESTÁTICAS
      // ============================================
      const staticPhotos = [
        { key: "containerPanoramicPhoto", setter: setContainerPanoramicPhoto },
        { key: "navieraBottlePhoto", setter: setNavieraBottlePhoto },
        { key: "navieraWirePhoto", setter: setNavieraWirePhoto },
        { key: "navieraLabelPhoto", setter: setNavieraLabelPhoto },
        { key: "exporterBottlePhoto", setter: setExporterBottlePhoto },
        { key: "exporterWirePhoto", setter: setExporterWirePhoto },
        { key: "exporterLabelPhoto", setter: setExporterLabelPhoto },
        { key: "otherBottlePhoto", setter: setOtherBottlePhoto },
        { key: "otherWirePhoto", setter: setOtherWirePhoto },
        { key: "otherLabelPhoto", setter: setOtherLabelPhoto },
        { key: "gpsPhoto", setter: setGpsPhoto },
        { key: "gpsStampPhoto", setter: setGpsStampPhoto },
      ];

      for (const photo of staticPhotos) {
        const { filename } = await createPlaceholderImage(photo.key);
        photo.setter(filename);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      // ============================================
      // 7. CREAR 2 FOTOS DINÁMICAS
      // ============================================
      const dynamicPhotos = [
        {
          type: "exit",
          comment:
            "Inspección final del contenedor sellado antes de salida del patio",
        },
        {
          type: "exit",
          comment:
            "Verificación de documentación y precintos completos para despacho",
        },
      ];

      for (let i = 0; i < dynamicPhotos.length; i++) {
        // Agregar imagen vacía
        addImage(dynamicPhotos[i].type);

        // Esperar un momento para que se cree el uuid
        await new Promise((resolve) => setTimeout(resolve, 50));

        // Obtener el último uuid agregado
        const state = useWorkflowStoreThreeExtraOne.getState();
        const lastImage = state.images[state.images.length - 1];

        if (lastImage) {
          // Crear foto simulada
          const { filename } = await createPlaceholderImage(
            `dynamic_exit_${i + 1}`,
          );

          // Actualizar la imagen con la foto y el comentario
          await updateImage(lastImage.uuid, "src", filename);
          await updateImage(
            lastImage.uuid,
            "comment",
            dynamicPhotos[i].comment,
          );
        }

        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      Alert.alert(
        "✅ Simulación Completa - PROCESO 3",
        `Proceso de salida simulado exitosamente!\n\n` +
          `Contenedor: ${containerNumber}\n` +
          `Puerto: GUAYAQUIL\n` +
          `Fotos Estáticas: 12\n` +
          `Fotos Dinámicas: 2\n` +
          `Todos los precintos verificados ✓`,
        [{ text: "OK", onPress: () => onComplete?.() }],
      );
    } catch (error) {
      console.error("❌ Error en simulación PROCESO 3:", error);
      Alert.alert(
        "❌ Error",
        "Error durante la simulación del proceso de salida",
      );
    } finally {
      setIsSimulating(false);
    }
  };

  const handlePress = () => {
    Alert.alert(
      "Simular Proceso 3 - Salida",
      "¿Llenar automáticamente el formulario de salida con datos de prueba?\n\n" +
        "Esto incluye:\n" +
        "• Puerto de ingreso\n" +
        "• 12 fotos de precintos\n" +
        "• 2 fotos de inspección final\n" +
        "• Verificación de GPS",
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
          {isSimulating ? "Simulando..." : "Simular"}
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
