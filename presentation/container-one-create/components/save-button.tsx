import { photosToGenerateOne, validationSchemaOne } from "@/common/constants";
import { PHOTOS_DIR } from "@/common/constants/libs/photos";
import * as FileSystem from "expo-file-system/legacy";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSaveWorkflow } from "../hooks/useSaveWorkflow";
import { useWorkflowStoreOneZero } from "../store";

export const SaveButton = () => {
  const { workflowMutation } = useSaveWorkflow();
  const storeState = useWorkflowStoreOneZero((state) => state) as any;
  const onClearNext = useWorkflowStoreOneZero((state) => state.onClear);

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

      // CAMPOS OBLIGATORIOS (según tu esquema de validación)
      const requiredFields = ["container", "emptyPanoramicPhoto"];

      for (const field of requiredFields) {
        try {
          await validationSchemaOne.validateAt(field, formData);
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
        // CAMPOS BÁSICOS
        "plateVehicle",
        "driverName",
        "driverIdentification",
        "typeContainer",
        "naviera",
        "companyTransport",
        "size",
        "address",
        "city",
        "typeReview",
        "storageName",
        "entryPort",
        "observation",

        // NUEVOS CAMPOS DE LA WEB ✨
        "typeService",
        "date",
        "exporterSupervisor",
        "exporterSupervisorIdentification",
        "associated",
        "associatedIdentification",
        "others",
        "othersIdentification",
        "workplace",
        "inspectedBy",
        "inspectedWas",

        // COMENTARIOS DE FOTOS
        "emptyPanoramicComment",
        "emptyStampNavieraComment",
        "emptyOtherStampComment",
        "emptyAditionalStampComment",
        "emptySatelliteLockStampComment",
        "emptySatelliteLockComment",
        "emptyFloorComment",
        "emptyRoofComment",
        "emptyMirrorCoverComment",
        "emptyInternalComment1",
        "emptyInternalComment2",
        "emptyInternalComment3",
        "emptyInternalComment4",
        "emptyInternalComment5",
        "emptyInternalComment6",
        "exitOtherStampComment",
        "exitSatelliteLockStampComment",
        "exitPanoramicComment",
        "exitStampNavieraComment",
        "exitEngineryComment1",
        "exitEngineryComment2",

        // NUEVOS COMENTARIOS ✨
        "engineryComment1",
        "engineryComment2",
        "exitTemporarySealingComment",
      ];

      for (const field of optionalFields) {
        const value = formData[field];

        // Si el campo tiene contenido, validar las reglas
        if (value && String(value).trim() !== "") {
          try {
            await validationSchemaOne.validateAt(field, formData);
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
      // 4. VALIDAR CAMPOS ESPECIALES: CAN y LEADER (arrays)
      // ============================================
      // Convertir arrays a strings para enviar al backend
      if (formData.can && Array.isArray(formData.can)) {
        formData.can = formData.can.join(",");
      }
      if (formData.leader && Array.isArray(formData.leader)) {
        formData.leader = formData.leader.join(",");
      }

      // ============================================
      // 5. PROCESAR FOTOS
      // ============================================
      const photosBase64: Record<string, string> = {};
      let processedPhotos = 0;
      let missingPhotos: string[] = [];

      for (const photo of photosToGenerateOne) {
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
          if (photo.key !== "emptyPanoramicPhoto") {
            missingPhotos.push(photo.label);
          }
        }
      }

      // ============================================
      // 6. PROCESAR IMÁGENES DINÁMICAS
      // ============================================
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

      // ============================================
      // 7. ADVERTIR SOBRE FOTOS FALTANTES (OPCIONAL)
      // ============================================
      if (missingPhotos.length > 0) {
        // Si faltan más de la mitad de las fotos, preguntar
        if (missingPhotos.length > photosToGenerateOne.length / 2) {
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

      // ============================================
      // 8. ENVIAR DATOS
      // ============================================
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
      // Agregar timestamp y hora de guardado
      const dateHelper = new Date();
      formData.timeStampSave = dateHelper;
      formData.hourSaveUser = dateHelper.toLocaleTimeString();
      const now = new Date();
      const timeString = now.toLocaleTimeString("es-EC", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      formData.hourEnd = timeString;

      await workflowMutation.mutateAsync({
        formData: formData,
        photosData: photosBase64,
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
      "El proceso 1 se ha guardado correctamente.\n\n¿Qué deseas hacer ahora?",
      [
        {
          text: "Limpiar Formulario",
          onPress: () => {
            onClearNext();
            Alert.alert(
              "Formulario Limpio",
              "Puedes iniciar un nuevo proceso 1",
              [{ text: "OK" }],
            );
          },
          style: "default",
        },
        {
          text: "Ir a Malimax 2",
          onPress: () => {
            onClearNext();
            router.push("/container-two/create");
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
