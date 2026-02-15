import { ClientProducerI } from "@/common/interface";
import { getAllClientProducers } from "@/core/client-producer/actions/get-all-client-producers";
import { checkInternetQuality } from "@/helpers";
import { QueryCacheHelper } from "@/helpers/libs/queries-cache";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export const useClientProducer = () => {
  const { user } = useAuthStore();
  const clientId = user?.clientId ?? 1;
  const cacheKey = `clientProducer_${clientId}`;

  const clientProducerQuery = useQuery({
    queryKey: ["clientProducer", clientId],
    queryFn: async () => {
      if (!clientId) {
        return [];
      }

      const cachedData =
        await QueryCacheHelper.getCache<ClientProducerI[]>(cacheKey);

      const hasInternet = await checkInternetQuality();

      if (hasInternet) {
        try {
          const freshData = await getAllClientProducers(clientId);
          await QueryCacheHelper.setCache(cacheKey, freshData);
          return freshData;
        } catch (error) {
          if (cachedData) return cachedData;

          return [];
        }
      }

      if (cachedData) return cachedData;

      return [];
    },
    enabled: !!clientId,

    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    placeholderData: (previousData) => previousData,
  });

  return { clientProducerQuery };
};
