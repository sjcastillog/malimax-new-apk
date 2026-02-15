import { ClientBrandI } from "@/common/interface";
import { getAllClientBrands } from "@/core/client-brand/actions/get-all-brands";
import { checkInternetQuality } from "@/helpers";
import { QueryCacheHelper } from "@/helpers/libs/queries-cache";
import { useQuery } from "@tanstack/react-query";

export const useClientBrand = (clientId: number | null) => {
  const cacheKey = `clientBrand_${clientId}`;

  const clientBrandQuery = useQuery({
    queryKey: ["clientBrand", clientId],
    queryFn: async () => {
      if (!clientId) {
        return [];
      }

      const cachedData = await QueryCacheHelper.getCache<ClientBrandI[]>(cacheKey);
      const hasInternet = await checkInternetQuality();

      if (hasInternet) {
        try {
          const freshData = await getAllClientBrands(clientId);
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
    clientBrandQuery,
  };
};