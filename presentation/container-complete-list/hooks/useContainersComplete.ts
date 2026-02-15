import { getContainersComplete } from "@/core/container-complete/actions/";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useContainersComplete = ({ search = "" }) => {
  const containersCompleteQuery = useInfiniteQuery({
    queryKey: ["containers", "complete", "infinite", search],

    queryFn: ({ pageParam }) => getContainersComplete(20, pageParam * 20, search),

    staleTime: 1000 * 60 * 60 * 48, // 1 hora

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return {
    containersCompleteQuery,

    // Methods
    loadNextPage: containersCompleteQuery.fetchNextPage,
  };
};
