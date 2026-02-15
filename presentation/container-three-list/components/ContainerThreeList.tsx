import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";

import { WorkflowThreeI } from "@/core/container-three/interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { ContainerThreeListCard } from "./ContainerThreeListCard";

interface Props {
  containers: WorkflowThreeI[];
  loadNextPage: () => void;
  dark: boolean;
  loading: boolean;
}

const ContainerThreeList = ({
  containers,
  loadNextPage,
  dark,
  loading,
}: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 200));

    queryClient.invalidateQueries({
      queryKey: ["containers", "three", "infinite"],
    });

    setIsRefreshing(false);
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80%",
        }}
      >
        <ActivityIndicator size={30} />
      </View>
    );
  }

  return (
    <FlatList
      data={containers}
      numColumns={1}
      keyExtractor={(item, index) => `vacio-${item.id}-${index}`}
      renderItem={({ item }) => (
        <ContainerThreeListCard container={item} dark={dark} />
      )}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.8}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 100,
    paddingTop: 8,
  },
});

export default ContainerThreeList;
