import { ClientI } from "@/common/interface";
import { getAllClients } from "@/core/clients/actions/get-all-clients";
import { checkInternetQuality } from "@/helpers";
import { QueryCacheHelper } from "@/helpers/libs/queries-cache";
import { useQuery } from "@tanstack/react-query";

export const useClients = () => {
  const cacheKey = `client_malimax`;

  const clientsQuery = useQuery({
    queryKey: [cacheKey],
    queryFn: async () => {
      const cachedData = await QueryCacheHelper.getCache<ClientI[]>(cacheKey);
      const hasInternet = await checkInternetQuality();

      if (hasInternet) {
        try {
          const freshData = await getAllClients();
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
    enabled: true,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    placeholderData: (previousData) => previousData,
  });

  return {
    clientsQuery,
  };
};
