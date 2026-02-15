import ContainerCompleteList from "@/presentation/container-complete-list/components/ContainerCompleteList";
import { useContainersComplete } from "@/presentation/container-complete-list/hooks/useContainersComplete";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const ContainerComplete = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [search, setSearch] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");

  const textColor = useThemeColor({}, "text");
  const primaryColor = useThemeColor({}, "primary");
  const secondaryColor = useThemeColor({}, "secondary");
  const inputBg = isDark ? "#1F2937" : "#F3F4F6";

  const { containersCompleteQuery, loadNextPage } = useContainersComplete({ search });
  const debounceTimeout = React.useRef<number | null>(null);

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchInput(text);

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        setSearch(text);
      }, 1000);
    },
    [search]
  );

  React.useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchInput("");
    setSearch("");
  }, [search]);

  const handleRefresh = () => {
    containersCompleteQuery.refetch();
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View style={styles.header}>
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: inputBg, borderColor: primaryColor },
          ]}
        >
          <Ionicons name="search" size={20} coloÏr={textColor} opacity={0.5} />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Buscar por número o proveedor"
            placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
            value={searchInput}
            onChangeText={handleSearchChange}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (search.length > 0) {
              handleClearSearch();
              return;
            }
            handleRefresh();
          }}
          style={[styles.refreshButton, { backgroundColor: `${primaryColor}` }]}
          activeOpacity={0.7}
        >
          <Ionicons
            name={search.length > 0 ? "close-circle" : "refresh"}
            size={20}
            color={isDark ? secondaryColor : "white"}
            opacity={0.5}
          />
        </TouchableOpacity>
      </View>
        <ContainerCompleteList
          containers={
            containersCompleteQuery.data?.pages.flatMap((page) => page) ?? []
          }
          loadNextPage={loadNextPage}
          dark={isDark}
          loading={containersCompleteQuery.isLoading}
        />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 25,
  },
  header: {
    marginBottom: 8,
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingTop: 5,
    gap: 5,
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 5,
  },
  searchContainer: {
    maxWidth: "90%",
    minWidth: "90%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 4,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
    gap: 8,
  },
  footerText: {
    fontSize: 14,
    opacity: 0.6,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: "center",
  },
});
export default ContainerComplete;
