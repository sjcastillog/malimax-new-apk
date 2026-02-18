import { validationSchemaTwo } from "@/common/constants";
import { PHOTOS_DIR } from "@/common/constants/libs/photos";
import * as FileSystem from "expo-file-system/legacy";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSaveWorkflow } from "../hooks/useSaveWorkflow";
import { useWorkflowStoreTwoZero } from "../store";

export const SaveButton = () => {
  const { workflowMutation } = useSaveWorkflow();
  const storeState = useWorkflowStoreTwoZero((state) => state) as any;
  const onClearNext = useWorkflowStoreTwoZero((state) => state.onClear);

  const handleSave = async () => {
    try {
      // ============================================
      // 1. PREPARAR DATOS DEL FORMULARIO
      // ============================================
      const formData: Record<string, any> = {};
      for (const key in storeState) {
        if (typeof storeState[key] !== "function") {
          formData[key] = storeState[key];
        }
      }

      // ============================================
      // 2. VALIDAR CAMPOS OBLIGATORIOS
      // ============================================
      const requiredErrors: string[] = [];
      const optionalErrors: string[] = [];

      // CAMPOS OBLIGATORIOS
      const requiredFields = ["container", "product", "presentation"];

      for (const field of requiredFields) {
        try {
          await validationSchemaTwo.validateAt(field, formData);
        } catch (err: any) {
          requiredErrors.push(`❌ ${err.message}`);
        }
      }

      // Si faltan campos obligatorios, DETENER
      if (requiredErrors.length > 0) {
        Alert.alert(
          "Campos Obligatorios Faltantes",
          `Por favor completa los siguientes campos:\n\n${requiredErrors.join("\n")}`,
          [{ text: "Entendido", style: "default" }],
        );
        return;
      }

      // ============================================
      // 3. VALIDAR CAMPOS OPCIONALES (solo si tienen contenido)
      // ============================================
      const optionalFields = [
        "numberPallet",
        "numberPresentation",
        "numberSampling",
        "coordinates",
        "observation",
        "hourInit",
        "hourEnd",
      ];

      for (const field of optionalFields) {
        const value = formData[field];

        // Si el campo tiene contenido, validar las reglas
        if (value && String(value).trim() !== "") {
          try {
            await validationSchemaTwo.validateAt(field, formData);
          } catch (err: any) {
            optionalErrors.push(`❌ ${err.message}`);
          }
        }
      }

      // Si hay errores de validación en campos opcionales, DETENER
      if (optionalErrors.length > 0) {
        Alert.alert(
          "Errores de Validación",
          `Los siguientes campos tienen errores:\n\n${optionalErrors.join("\n")}`,
          [{ text: "Corregir", style: "default" }],
        );
        return;
      }

      // ============================================
      // 4. PROCESAR IMÁGENES DINÁMICAS
      // ============================================
      const dynamicImages = formData.images || [];

      // Verificar si hay al menos una imagen
      if (dynamicImages.length === 0) {
        Alert.alert(
          "Fotos Requeridas",
          "Debes agregar al menos una foto del proceso de llenado.",
          [{ text: "Entendido", style: "default" }],
        );
        return;
      }

      for (const image of dynamicImages) {
        if (image.src && typeof image.src === "string") {
          try {
            const photoPath = `${PHOTOS_DIR}${image.src}`;
            const fileInfo = await FileSystem.getInfoAsync(photoPath);

            if (fileInfo.exists) {
              const base64 = await FileSystem.readAsStringAsync(photoPath, {
                encoding: FileSystem.EncodingType.Base64,
              });

              if (base64) {
                image.src = `data:image/jpeg;base64,${base64}`;
              }
            }
          } catch (error) {
            console.warn("Error procesando imagen dinámica:", error);
          }
        }
      }

      // ============================================
      // 5. ENVIAR DATOS
      // ============================================
      await sendData(formData);
    } catch (error) {
      console.error("Error en handleSave:", error);
      Alert.alert("Error", "Ocurrió un error al preparar los datos");
    }
  };

  const sendData = async (formData: Record<string, any>) => {
    try {
      // Sanitizar datos (trim strings)
      const sanitizedData: Record<string, any> = {};

      for (const key in formData) {
        if (typeof formData[key] === "string") {
          sanitizedData[key] = formData[key].trim();
        } else {
          sanitizedData[key] = formData[key];
        }
      }

      // Agregar timestamp y hora de guardado
      const dateHelper = new Date();
      sanitizedData.timeStampSave = dateHelper;
      sanitizedData.hourSaveUser = dateHelper.toLocaleTimeString();
      const now = new Date();
      const timeString = now.toLocaleTimeString("es-EC", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      sanitizedData.hourEnd = timeString;

      await workflowMutation.mutateAsync({
        formData: sanitizedData,
      });

      // ============================================
      // MOSTRAR OPCIONES POST-GUARDADO
      // ============================================
      showPostSaveOptions();
    } catch (error) {
      console.error("Error en sendData:", error);
      Alert.alert(
        "Error al Guardar",
        "No se pudo guardar el workflow. Por favor, intenta nuevamente.",
      );
    }
  };

  const showPostSaveOptions = () => {
    Alert.alert(
      "✅ Guardado Exitoso",
      "El proceso 2 (Llenado) se ha guardado correctamente.\n\n¿Qué deseas hacer ahora?",
      [
        {
          text: "Limpiar Formulario",
          onPress: () => {
            onClearNext();
            Alert.alert(
              "Formulario Limpio",
              "Puedes iniciar un nuevo proceso 2",
              [{ text: "OK" }],
            );
          },
          style: "default",
        },
        {
          text: "Ir a Malimax 3",
          onPress: () => {
            onClearNext();
            router.push("/(drawer)/(stack)/container-three/create");
          },
          style: "default",
        },
        {
          text: "Quedarme Aquí",
          onPress: () => {
            // No hace nada, se queda en la pantalla actual
          },
          style: "cancel",
        },
      ],
      { cancelable: false },
    );
  };

  const handlePreSave = () => {
    Alert.alert(
      "¿Estás seguro?",
      "Si continúas no podrás editar la información después de guardar.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí, guardar",
          onPress: handleSave,
          style: "default",
        },
      ],
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.btnFinalizar,
        workflowMutation.isPending && styles.btnFinalizarDisabled,
      ]}
      onPress={handlePreSave}
      disabled={workflowMutation.isPending}
    >
      {workflowMutation.isPending ? (
        <Text style={styles.btnFinalizarText}>Guardando...</Text>
      ) : (
        <Text style={styles.btnFinalizarText}>✓ Finalizar</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnFinalizar: {
    backgroundColor: "#000080",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
  },
  btnFinalizarDisabled: {
    backgroundColor: "#91caff",
    opacity: 0.7,
  },
  btnFinalizarText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
});
