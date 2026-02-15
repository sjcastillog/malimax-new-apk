import {
  photosToGenerateTwo,
  validateFieldLengthsTwo,
  validationSchemaTwo,
} from "@/common/constants";
import { PHOTOS_DIR } from "@/common/constants/libs/photos";
import * as FileSystem from "expo-file-system/legacy";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSaveWorkflow } from "../hooks/useSaveWorkflow";
import { useWorkflowStoreTwoZero } from "../store";

export const SaveButton = () => {
  const { workflowMutation } = useSaveWorkflow();
  const storeState = useWorkflowStoreTwoZero((state) => state) as any;

  const handleSave = async () => {
    try {
      const formData: Record<string, any> = {};

      for (const key in storeState) {
        if (typeof storeState[key] !== "function") {
          formData[key] = storeState[key];
        }
      }

      const lengthValidation = validateFieldLengthsTwo(formData);
      if (!lengthValidation.isValid) {
        Alert.alert(
          "Límite de Caracteres Excedido",
          `Los siguientes campos exceden el límite permitido:\n\n• ${lengthValidation.errors.join("\n• ")}`,
          [{ text: "Entendido", style: "default" }],
        );
        return;
      }

      const requiredErrors: string[] = [];
      const optionalErrors: string[] = [];

      try {
        await validationSchemaTwo.validateAt("container", formData);
      } catch (err: any) {
        requiredErrors.push(`❌ ${err.message}`);
      }

      try {
        await validationSchemaTwo.validateAt("labelSerial", formData);
      } catch (err: any) {
        requiredErrors.push(`❌ ${err.message}`);
      }

      try {
        await validationSchemaTwo.validateAt(
          "containerPanoramicPhoto",
          formData,
        );
      } catch (err: any) {
        requiredErrors.push(`❌ ${err.message}`);
      }

      if (requiredErrors.length > 0) {
        Alert.alert(
          "Campos Obligatorios Faltantes",
          `Por favor completa los siguientes campos:\n\n${requiredErrors.join("\n")}`,
          [{ text: "Entendido", style: "default" }],
        );
        return;
      }

      const optionalFields = [
        "plateVehicle",
        "driverName",
        "driverIdentification",
        "typeContainer",
        "naviera",
        "companyTransport",
        "size",
        "city",
        "address",
        "observation",
      ];

      for (const field of optionalFields) {
        const value = formData[field];

        if (value && value.trim() !== "") {
          try {
            await validationSchemaTwo.validateAt(field, formData);
          } catch (err: any) {
            optionalErrors.push(`❌ ${err.message}`);
          }
        }
      }

      if (optionalErrors.length > 0) {
        Alert.alert(
          "Errores de Validación",
          `Los siguientes campos tienen errores:\n\n${optionalErrors.join("\n")}`,
          [{ text: "Corregir", style: "default" }],
        );
        return;
      }

      const photosBase64: Record<string, string> = {};
      let processedPhotos = 0;
      let missingPhotos: string[] = [];

      for (const photo of photosToGenerateTwo) {
        const filename = storeState[photo.key as keyof typeof storeState];

        if (filename && typeof filename === "string") {
          try {
            const photoPath = `${PHOTOS_DIR}${filename}`;
            const fileInfo = await FileSystem.getInfoAsync(photoPath);

            if (fileInfo.exists) {
              const base64 = await FileSystem.readAsStringAsync(photoPath, {
                encoding: FileSystem.EncodingType.Base64,
              });

              if (base64) {
                photosBase64[photo.key] = `data:image/jpeg;base64,${base64}`;
                processedPhotos++;
              } else {
                missingPhotos.push(photo.label);
              }
            } else {
              missingPhotos.push(photo.label);
            }
          } catch (error) {
            console.warn(`Error procesando foto ${photo.key}:`, error);
            missingPhotos.push(photo.label);
          }
        } else {
          // Solo agregar a missingPhotos si NO es la foto panorámica (ya validada)
          if (photo.key !== "containerPanoramicPhoto") {
            missingPhotos.push(photo.label);
          }
        }
      }

      const dynamicImages = formData.images || [];
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

      if (missingPhotos.length > 0) {
        if (missingPhotos.length > photosToGenerateTwo.length / 2) {
          Alert.alert(
            "Fotos Incompletas",
            `Faltan ${missingPhotos.length} fotos opcionales. ¿Deseas continuar de todas formas?`,
            [
              {
                text: "Cancelar",
                style: "cancel",
              },
              {
                text: "Continuar",
                onPress: async () => {
                  await sendData(formData, photosBase64);
                },
              },
            ],
          );
          return;
        }
      }

      await sendData(formData, photosBase64);
    } catch (error) {
      console.error("Error en handleSave:", error);
      Alert.alert("Error", "Ocurrió un error al preparar los datos");
    }
  };

  const sendData = async (
    formData: Record<string, any>,
    photosBase64: Record<string, string>,
  ) => {
    try {
      const sanitizedData: Record<string, any> = {};

      for (const key in formData) {
        if (typeof formData[key] === "string") {
          sanitizedData[key] = formData[key].trim();
        } else {
          sanitizedData[key] = formData[key];
        }
      }

      const dateHelper = new Date();
      sanitizedData.timeStampSave = dateHelper.toISOString();
      sanitizedData.hourSaveUser = dateHelper.toLocaleTimeString();

      await workflowMutation.mutateAsync({
        formData: sanitizedData,
        photosData: photosBase64,
      });

      Alert.alert("¡Éxito!", "El workflow se ha guardado correctamente", [
        { text: "OK", style: "default" },
      ]);
    } catch (error) {
      console.error("Error en sendData:", error);
      Alert.alert(
        "Error al Guardar",
        "No se pudo guardar el workflow. Por favor, intenta nuevamente.",
      );
    }
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
