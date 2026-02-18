import { workflowDB } from "@/common/storage/database";
import { saveContainerThree } from "@/core/container-three/actions";
import { WorkflowContainerThreeI } from "@/core/container-three/interfaces";
import { checkInternetQuality } from "@/helpers";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useRef } from "react";
import { Alert } from "react-native";

export const useSaveWorkflow = () => {
  const hasInternetRef = useRef(false);

  const workflowMutation = useMutation({
    mutationFn: async (payload: {
      formData: Partial<WorkflowContainerThreeI>;
      photosData: any;
    }) => {
      const dateHelper = new Date();

      // Asegurar timestamps
      payload.formData.timeStampSave = dateHelper.toISOString();
      payload.formData.hourSaveUser = dateHelper.toLocaleTimeString();

      // Verificar calidad de internet
      const hasInternet = await checkInternetQuality();
      hasInternetRef.current = hasInternet;

      if (hasInternet) {
        try {
          // Enviar datos (fotos estáticas + dinámicas)
          const dataToSend = {
            ...payload.formData,
            ...payload.photosData,
          };

          const message = await saveContainerThree(dataToSend);
          return { message, queued: false };
        } catch (error) {
          // Si falla, encolar
          const queueId = await workflowDB.addToQueue(
            payload.formData,
            payload.photosData,
            "three",
          );
          return {
            message: "Encolado para envío posterior",
            queued: true,
            queueId,
          };
        }
      } else {
        // Sin internet, encolar directamente
        const queueId = await workflowDB.addToQueue(
          payload.formData,
          payload.photosData,
          "three",
        );
        return {
          message: "Encolado para envío posterior",
          queued: true,
          queueId,
        };
      }
    },

    onSuccess: (data) => {
      if (hasInternetRef.current) {
        console.log("✅ Guardado exitosamente");
        // Alert.alert(
        //   "✅ Guardado exitosamente",
        //   "El proceso de salida se guardó correctamente",
        //   [
        //     {
        //       text: "OK",
        //       onPress: () => {
        //         router.push("/container-three/list");
        //       },
        //     },
        //   ],
        // );
      } else {
        Alert.alert(
          "✅ Proceso encolado",
          "El formulario se enviará cuando tengas conexión a internet",
          [
            {
              text: "OK",
              onPress: () => {
                router.push("/container-three/queue");
              },
            },
          ],
        );
      }
    },

    onError: (error) => {
      console.error("❌ Error en mutation:", error);
      Alert.alert(
        "Error",
        "Ocurrió un error al guardar los datos. Por favor, intenta nuevamente.",
      );
    },
  });

  return {
    workflowMutation,
  };
};
