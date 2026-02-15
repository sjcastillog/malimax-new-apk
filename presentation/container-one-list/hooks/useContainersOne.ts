import { getContainersOne } from "@/core/container-one/actions/";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useContainersOne = ({ search = "" }) => {
  const containersOneQuery = useInfiniteQuery({
    queryKey: ["containers", "one", "infinite", search],

    queryFn: ({ pageParam }) => getContainersOne(20, pageParam * 20, search),

    staleTime: 1000 * 60 * 60 * 48, // 1 hora

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return {
    containersOneQuery,

    // Methods
    loadNextPage: containersOneQuery.fetchNextPage,
  };
};
