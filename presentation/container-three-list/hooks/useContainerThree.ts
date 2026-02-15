import {
  ObjPostI,
  ServiceResponseI,
} from "@/common/interface/libs/response.interface";
import {
  createContainerThree,
  getContainerThreeById,
} from "@/core/container-three/actions";
import { WorkflowThreeI } from "@/core/container-three/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useContainerThree = (containerEmptyId: number) => {
  const queryClient = useQueryClient();

  const containerThreeQuery = useQuery({
    queryKey: ["container", "three", containerEmptyId],
    queryFn: () => getContainerThreeById(containerEmptyId),
    staleTime: 1000 * 60 * 60 * 24, // 1 hora
  });

  // Mutación
  const containerThreeMutation = useMutation({
    mutationFn: async (data: WorkflowThreeI) =>
      createContainerThree({
        ...data,
      }),

    onSuccess(data: ServiceResponseI<ObjPostI>) {
      queryClient.invalidateQueries({
        queryKey: ["containers", "three", "infinite"],
      });
      queryClient.invalidateQueries({
        queryKey: ["container", "three", data.data!.id!],
      });

      Alert.alert(
        "Proceso 1 guardado",
        `${data.data!.id} se guardo correctamente`,
      );
    },
  });

  // Mantener el ID del containerEmptyo en caso de ser uno nuevo

  return {
    containerThreeQuery,
    containerThreeMutation,
  };
};
