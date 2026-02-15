import {
  ObjPostI,
  ServiceResponseI,
} from "@/common/interface/libs/response.interface";
import {
  createContainerOne,
  getContainerOneById,
} from "@/core/container-one/actions";
import { WorkflowContainerOneI } from "@/core/container-one/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useContainerOne = (containerOneId: number) => {
  const queryClient = useQueryClient();

  const containerOneQuery = useQuery({
    queryKey: ["container", "one", containerOneId],
    queryFn: () => getContainerOneById(containerOneId),
    staleTime: 1000 * 60 * 60 * 24, // 1 hora
  });

  // Mutación
  const containerOneMutation = useMutation({
    mutationFn: async (data: WorkflowContainerOneI) =>
      createContainerOne({
        ...data,
      }),

    onSuccess(data: ServiceResponseI<ObjPostI>) {
      queryClient.invalidateQueries({
        queryKey: ["containers", "one", "infinite"],
      });
      queryClient.invalidateQueries({
        queryKey: ["container", "one", data.data!.id!],
      });

      Alert.alert(
        "Proceso 1 guardado",
        `${data.data!.id} se guardo correctamente`,
      );
    },
  });

  // Mantener el ID del containerOneo en caso de ser uno nuevo

  return {
    containerOneQuery,
    containerOneMutation,
  };
};
