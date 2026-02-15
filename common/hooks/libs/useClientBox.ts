import { ClientBoxI } from "@/common/interface";
import { getAllClientBoxes } from "@/core/client-box/actions/get-all-box";
import { checkInternetQuality } from "@/helpers";
import { QueryCacheHelper } from "@/helpers/libs/queries-cache";
import { useQuery } from "@tanstack/react-query";

export const useClientBox = (clientId: number | null) => {
  const cacheKey = `clientBox_${clientId}`;

  const clientBoxQuery = useQuery({
    queryKey: ["clientBox", clientId],
    queryFn: async () => {
      if (!clientId) {
        return [];
      }

      const cachedData = await QueryCacheHelper.getCache<ClientBoxI[]>(cacheKey);
      const hasInternet = await checkInternetQuality();

      if (hasInternet) {
        try {
          const freshData = await getAllClientBoxes(clientId);
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

  return {
    clientBoxQuery,
  };
};