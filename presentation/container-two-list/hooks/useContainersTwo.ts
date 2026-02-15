import { getContainersTwo } from "@/core/container-two/actions/";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useContainersTwo = ({ search = "" }) => {
  const containersTwoQuery = useInfiniteQuery({
    queryKey: ["containers", "two", "infinite", search],

    queryFn: ({ pageParam }) => getContainersTwo(20, pageParam * 20, search),

    staleTime: 1000 * 60 * 60 * 48, // 1 hora

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return {
    containersTwoQuery,

    // Methods
    loadNextPage: containersTwoQuery.fetchNextPage,
  };
};
