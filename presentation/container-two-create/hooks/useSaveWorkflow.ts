import { workflowDB } from "@/common/storage/database";
import { saveContainerTwo } from "@/core/container-two/actions";
import { WorkflowTwoI } from "@/core/container-two/interfaces";
import { checkInternetQuality } from "@/helpers";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useRef } from "react";
import { Alert } from "react-native";

export const useSaveWorkflow = () => {
  const hasInternetRef = useRef(false);
  const { user } = useAuthStore();

  const clientId = user?.clientId ?? 1;

  const workflowMutation = useMutation({
    mutationFn: async (payload: {
      formData: Partial<WorkflowTwoI>;
      photosData: any;
    }) => {
      const dateHelper = new Date();
      payload.formData.clientId = clientId;
      payload.formData.timeStampSave =
        // payload.formData.firstTakePhoto ?? dateHelper.toISOString();
        payload.formData.hourSaveUser = dateHelper.toLocaleTimeString();
      const hasInternet = await checkInternetQuality();
      hasInternetRef.current = hasInternet;

      if (hasInternet) {
        try {
          const dataToSend = {
            ...payload.formData,
            ...payload.photosData,
          };
          const message = await saveContainerTwo(dataToSend);
          return { message, queued: false };
        } catch (error) {
          const queueId = await workflowDB.addToQueue(
            payload.formData,
            payload.photosData,
            "two", //
          );
          return {
            message: "Encolado para envío posterior",
            queued: true,
            queueId,
          };
        }
      } else {
        const queueId = await workflowDB.addToQueue(
          payload.formData,
          payload.photosData,
          "two", //
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
        Alert.alert(
          "✅ Guardado exitosamente",
          "Los datos se guardaron correctamente",
          [
            {
              text: "OK",
              onPress: () => {
                router.push("/container-two/list");
              },
            },
          ],
        );
      } else {
        Alert.alert(
          "✅ Proceso encolado",
          "El formulario se enviará cuando tengas conexión a internet",
          [
            {
              text: "OK",
              onPress: () => {
                router.push("/container-two/queue");
              },
            },
          ],
        );
      }
    },

    onError: (error) => {
      console.error("❌ Error en mutation:", error);
      Alert.alert("Error", "Ocurrió un error al guardar los datos");
    },
  });

  return {
    workflowMutation,
  };
};
