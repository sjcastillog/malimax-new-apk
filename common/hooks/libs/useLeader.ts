import { CatalogueI } from "@/common/interface";
import { getAllCatalogueChildrenbyParentCode } from "@/core/catalogue/actions/get-all-catalogue-children-by-parent-code";
import { checkInternetQuality } from "@/helpers";
import { QueryCacheHelper } from "@/helpers/libs/queries-cache";
import { useQuery } from "@tanstack/react-query";

export const useLeaders = () => {
  const code = process.env.EXPO_PUBLIC_LEADERS_MALIMAX_CODE ?? "LEADER";

  const cacheKey = `leader_malimax`;

  const leadersQuery = useQuery({
    queryKey: [cacheKey],
    queryFn: async () => {
      const cachedData =
        await QueryCacheHelper.getCache<CatalogueI[]>(cacheKey);
      const hasInternet = await checkInternetQuality();

      if (hasInternet) {
        try {
          const freshData = await getAllCatalogueChildrenbyParentCode(code);
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
    leadersQuery,
  };
};
