import {
  ObjPostI,
  ServiceResponseI,
} from "@/common/interface/libs/response.interface";
import {
  createContainerTwo,
  getContainerTwoById,
} from "@/core/container-two/actions";
import { WorkflowTwoI } from "@/core/container-two/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useContainerTwo = (containerEmptyId: number) => {
  const queryClient = useQueryClient();

  const containerTwoQuery = useQuery({
    queryKey: ["container", "two", containerEmptyId],
    queryFn: () => getContainerTwoById(containerEmptyId),
    staleTime: 1000 * 60 * 60 * 24, // 1 hora
  });

  // Mutación
  const containerTwoMutation = useMutation({
    mutationFn: async (data: WorkflowTwoI) =>
      createContainerTwo({
        ...data,
      }),

    onSuccess(data: ServiceResponseI<ObjPostI>) {
      queryClient.invalidateQueries({
        queryKey: ["containers", "two", "infinite"],
      });
      queryClient.invalidateQueries({
        queryKey: ["container", "two", data.data!.id!],
      });

      Alert.alert(
        "Proceso 1 guardado",
        `${data.data!.id} se guardo correctamente`,
      );
    },
  });

  // Mantener el ID del containerEmptyo en caso de ser uno nuevo

  return {
    containerTwoQuery,
    containerTwoMutation,
  };
};
