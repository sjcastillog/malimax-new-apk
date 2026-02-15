import { ClientProducerFarmI } from "@/common/interface";
import { getAllClientProducerFarms } from "@/core/client-producer-farm/actions/get-all-client-producers";
import { checkInternetQuality } from "@/helpers";
import { QueryCacheHelper } from "@/helpers/libs/queries-cache";
import { useQuery } from "@tanstack/react-query";

export const useClientProducerFarm = (producerId: number | null) => {
  const cacheKey = `clientProducerFarm_${producerId}`;

  const clientProducerFarmQuery = useQuery({
    queryKey: ["clientProducerFarm", producerId],
    queryFn: async () => {
      if (!producerId) {
        return [];
      }

      const cachedData =
        await QueryCacheHelper.getCache<ClientProducerFarmI[]>(cacheKey);

      const hasInternet = await checkInternetQuality();

      if (hasInternet) {
        try {
          const freshData = await getAllClientProducerFarms(producerId);
          await QueryCacheHelper.setCache(cacheKey, freshData);
          return freshData;
        } catch (error) {
          console.error("Error fetching fresh data:", error);
          if (cachedData) {
            console.log("Using cached data after fetch error");
            return cachedData;
          }
          return [];
        }
      }

      if (cachedData) {
        console.log("Using cached data (offline mode)");
        return cachedData;
      }

      return [];
    },
    // enabled: !!producerId,
    // staleTime: 1000 * 60 * 60 * 24 * 7,
    // retry: false,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    enabled: !!producerId,

    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    placeholderData: (previousData) => previousData,
  });

  return { clientProducerFarmQuery };
};
