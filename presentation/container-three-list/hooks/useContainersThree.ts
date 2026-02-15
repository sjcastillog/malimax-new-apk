import { getContainersThree } from "@/core/container-three/actions/";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useContainersThree = ({ search = "" }) => {
  const containersThreeQuery = useInfiniteQuery({
    queryKey: ["containers", "three", "infinite", search],

    queryFn: ({ pageParam }) => getContainersThree(20, pageParam * 20, search),

    staleTime: 1000 * 60 * 60 * 48, // 1 hora

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return {
    containersThreeQuery,

    // Methods
    loadNextPage: containersThreeQuery.fetchNextPage,
  };
};
