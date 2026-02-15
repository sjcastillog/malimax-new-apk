import {
  getContainerCompleteById
} from "@/core/container-complete/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useContainerComplete = (containerOneId: number) => {
  const queryClient = useQueryClient();

  const containerCompleteQuery = useQuery({
    queryKey: ["container", "complete", containerOneId],
    queryFn: () => getContainerCompleteById(containerOneId),
    staleTime: 1000 * 60 * 60 * 24, // 1 hora
  });


  return {
    containerCompleteQuery,
  };
};
