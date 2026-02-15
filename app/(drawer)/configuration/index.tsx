import { workflowDB } from "@/common/storage/database";

import { useWorkflowStoreOneExtraOne } from "@/presentation/container-one-create-extra-one/store";
import { useWorkflowStoreOneExtraThree } from "@/presentation/container-one-create-extra-three/store";
import { useWorkflowStoreOneExtraTwo } from "@/presentation/container-one-create-extra-two/store";
import { useWorkflowStoreOneZero } from "@/presentation/container-one-create/store";
import { useWorkflowStoreThreeExtraOne } from "@/presentation/container-three-create-extra-one/store";
import { useWorkflowStoreThreeExtraThree } from "@/presentation/container-three-create-extra-three/store";
import { useWorkflowStoreThreeExtraTwo } from "@/presentation/container-three-create-extra-two/store";
import { useWorkflowStoreThreeZero } from "@/presentation/container-three-create/store";
import { useWorkflowStoreTwoExtraOne } from "@/presentation/container-two-create-extra-one/store";
import { useWorkflowStoreTwoExtraThree } from "@/presentation/container-two-create-extra-three/store";
import { useWorkflowStoreTwoExtraTwo } from "@/presentation/container-two-create-extra-two/store";
import { useWorkflowStoreTwoZero } from "@/presentation/container-two-create/store";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, useColorScheme, View } from "react-native";

const ConfigurationScreen = () => {
  const colorScheme = useColorScheme();
  const queryClient = useQueryClient();
  const isDark = colorScheme === "dark";
  const [loading, setLoading] = useState(false);
  
  // PROCESO 1
  const onClearOneZero = useWorkflowStoreOneZero((state) => state.onClear);
  const onClearOneExtraOne = useWorkflowStoreOneExtraOne((state) => state.onClear);
  const onClearOneExtraTwo = useWorkflowStoreOneExtraTwo((state) => state.onClear);
  const onClearOneExtraThree = useWorkflowStoreOneExtraThree(
    (state) => state.onClear,
  );

  // PROCESO 2
  const onClearTwoZero = useWorkflowStoreTwoZero((state) => state.onClear);
  const onClearTwoExtraOne = useWorkflowStoreTwoExtraOne((state) => state.onClear);
  const onClearTwoExtraTwo = useWorkflowStoreTwoExtraTwo((state) => state.onClear);
  const onClearTwoExtraThree = useWorkflowStoreTwoExtraThree(
    (state) => state.onClear,
  );

  // PROCESO 3
  const onClearThreeZero = useWorkflowStoreThreeZero((state) => state.onClear);
  const onClearThreeExtraOne = useWorkflowStoreThreeExtraOne((state) => state.onClear);
  const onClearThreeExtraTwo = useWorkflowStoreThreeExtraTwo((state) => state.onClear);
  const onClearThreeExtraThree = useWorkflowStoreThreeExtraThree(
    (state) => state.onClear,
  );  



  const handleReset = async () => {
    try {
      setLoading(true);

      // 1. Limpiar stores (PROCESO 1)
      await onClearOneZero();
      await onClearOneExtraOne();
      await onClearOneExtraTwo();
      await onClearOneExtraThree();

      // 2. Limpiar stores (PROCESO 2)
      await onClearTwoZero();
      await onClearTwoExtraOne();
      await onClearTwoExtraTwo();
      await onClearTwoExtraThree();

      // 3. Limpiar stores (PROCESO 3)
      await onClearThreeZero();
      await onClearThreeExtraOne();
      await onClearThreeExtraTwo();      
      await onClearThreeExtraThree();

      // 2. Navegar a pantalla de reset (sin componentes que consulten BD)
      router.push("/(drawer)/reset-screen");

      // 3. Esperar navegación
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 4. Resetear BD
      await workflowDB.resetDatabase();

      // 5. Reinicializar
      await workflowDB.init();

      // 6. Volver al home
      router.replace("/(drawer)/configuration");
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al resetear");
    } finally {
      setLoading(false);
    }
  };

  const handlePreReset = () => {
    Alert.alert("¿Estás seguro?", "Esto reseteará la base de datos", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sí, resetear",
        onPress: async () => {
          handleReset();
        },
        style: "destructive",
      },
    ]);
  };

  const handleInvalidateQuerries = () => {
    Alert.alert("¿Estás seguro?", "Esto limpiara todas las queries", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sí, Invalidar",
        style: "destructive",
        onPress: () => {
          queryClient.invalidateQueries({
            queryKey: ["clientBox"],
          });
          queryClient.invalidateQueries({
            queryKey: ["clientBrand"],
          });
          queryClient.invalidateQueries({
            queryKey: ["clientProducer"],
          });
          queryClient.invalidateQueries({
            queryKey: ["clientProducerFarm"],
          });
          Alert.alert("✅ Hecho", "Todas las queries han sido invalidadas");
        },
      },
    ]);
  };
  return (
    <View style={{ flex: 1, padding: 16, gap: 20 }}>
      <ThemedButton
        icon="refresh-outline"
        onPress={handlePreReset}
        isDark={isDark}
        loading={loading}
        disabled={loading}
      >
        Resetear Base de Datos
      </ThemedButton>
      <ThemedButton
        icon="close-outline"
        onPress={handleInvalidateQuerries}
        isDark={isDark}
        loading={loading}
        disabled={loading}
      >
        Invalidar Queries
      </ThemedButton>
    </View>
  );
};

export default ConfigurationScreen;
