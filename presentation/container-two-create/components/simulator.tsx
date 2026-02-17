import { PHOTOS_DIR } from "@/common/constants";
import { File } from "expo-file-system";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWorkflowStoreTwoZero } from "../store";

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
    // Datos del proceso 1 (readonly)
    setContainer,
    setClientId,
    setClient,
    setClientIdentification,

    // Datos del proceso 2
    setProduct,
    setPresentation,
    setNumberPallet,
    setNumberPresentation,
    setNumberSampling,

    // Generales
    setCoordinates,
    setObservation,
    setHourInit,
    setHourEnd,

    // Imágenes dinámicas
    addImage,
    updateImage,
  } = useWorkflowStoreTwoZero();

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
      // 1. DATOS DEL PROCESO 1 (READONLY - vienen del proceso anterior)
      // ============================================
      const containerNumber = `FULL${Date.now().toString().slice(-6)}`;
      setContainer(containerNumber);
      setClientId(1);
      setClient("Cliente Exportador S.A.");
      setClientIdentification(`RUC${Date.now().toString().slice(-10)}`);

      // ============================================
      // 2. DATOS DEL PROCESO 2 (LLENADO)
      // ============================================
      setProduct("BANANO CAVENDISH");
      setPresentation("CAJAS DE 18.14 KG");
      setNumberPallet("1260"); // Número de pallets
      setNumberPresentation("22680"); // Número de cajas
      setNumberSampling("50"); // Número de muestras tomadas

      // ============================================
      // 3. DATOS GENERALES
      // ============================================
      setCoordinates("-2.1894, -79.8891");
      setObservation(
        "Proceso de llenado supervisado. Mercancía en óptimas condiciones. " +
          "Temperatura controlada durante todo el proceso. " +
          "Etiquetado y documentación completa.",
      );

      // ============================================
      // 4. HORARIOS
      // ============================================
      const now = new Date();
      const startTime = "10:00";
      const endTime = "12:30";

      setHourInit(startTime);
      setHourEnd(endTime);

      // ============================================
      // 5. CREAR 5 FOTOS DINÁMICAS
      // ============================================
      const dynamicPhotos = [
        {
          type: "loading",
          comment:
            "Inicio del proceso de carga. Contenedor vacío verificado y aprobado para llenado.",
        },
        {
          type: "loading",
          comment:
            "Carga del primer lote de pallets. Distribución uniforme del peso.",
        },
        {
          type: "loading",
          comment: "Proceso de llenado al 50%. Control de temperatura activo.",
        },
        {
          type: "loading",
          comment:
            "Carga casi completa. Verificación de espacios y acomodación final.",
        },
        {
          type: "loading",
          comment:
            "Contenedor lleno al 100%. Sellado y aseguramiento de la carga completado.",
        },
      ];

      // Crear las 5 fotos dinámicas
      for (let i = 0; i < dynamicPhotos.length; i++) {
        // Agregar imagen vacía
        addImage(dynamicPhotos[i].type);

        // Esperar un momento para que se cree el uuid
        await new Promise((resolve) => setTimeout(resolve, 50));

        // Obtener el último uuid agregado
        const state = useWorkflowStoreTwoZero.getState();
        const lastImage = state.images[state.images.length - 1];

        if (lastImage) {
          // Crear foto simulada
          const { filename } = await createPlaceholderImage(`dynamic_${i + 1}`);

          // Actualizar la imagen con la foto y el comentario
          await updateImage(lastImage.uuid, "src", filename);
          await updateImage(
            lastImage.uuid,
            "comment",
            dynamicPhotos[i].comment,
          );
        }

        // Delay entre fotos
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      Alert.alert(
        "✅ Simulación Completa - PROCESO 2",
        `Proceso de llenado simulado exitosamente!\n\n` +
          `Contenedor: ${containerNumber}\n` +
          `Producto: BANANO CAVENDISH\n` +
          `Pallets: 1260\n` +
          `Cajas: 22680\n` +
          `Fotos: 5 fotos del proceso de carga`,
        [{ text: "OK", onPress: () => onComplete?.() }],
      );
    } catch (error) {
      console.error("❌ Error en simulación PROCESO 2:", error);
      Alert.alert(
        "❌ Error",
        "Error durante la simulación del proceso de llenado",
      );
    } finally {
      setIsSimulating(false);
    }
  };

  const handlePress = () => {
    Alert.alert(
      "Simular Proceso 2 - Llenado",
      "¿Llenar automáticamente el formulario de llenado con datos de prueba?\n\n" +
        "Esto incluye:\n" +
        "• Información del producto\n" +
        "• Datos de muestreo\n" +
        "• 5 fotos del proceso de carga\n" +
        "• Comentarios de supervisión",
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

export default WorkflowSimulatorTwo;
