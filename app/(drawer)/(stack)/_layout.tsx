import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { router, Stack, useNavigation } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const StackLayout = () => {
  const navigation = useNavigation();

  const onHeaderLeftClick = (canGoBack: boolean | undefined) => {
    if (canGoBack) {
      router.back();
      return;
    }

    navigation.dispatch(DrawerActions.toggleDrawer);
  };

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: "white",
        },
        headerLeft: ({ tintColor, canGoBack }) => (
          <TouchableOpacity
            onPress={() => onHeaderLeftClick(canGoBack)}
            activeOpacity={0.6}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{ paddingRight: 20 }}
          >
            <Ionicons
              name={canGoBack ? "arrow-back-outline" : "grid-outline"}
              size={24}
              color={tintColor}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="home/index"
        options={{
          title: "Dashboard",
        }}
      />
      <Stack.Screen
        name="client/index"
        options={{
          title: "Nuevo Cliente",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-one/index"
        options={{
          title: "Contenedor Vacío",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-one/create/index"
        options={{
          headerShown: false,
          title: "Nuevo Cont. Vacío 🚚",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-one/extra-one/index"
        options={{
          headerShown: false,
          title: "Nuevo Cont. Vacío Extra 1🚚",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-one/extra-two/index"
        options={{
          headerShown: false,
          title: "Nuevo Cont. Vacío Extra 2 🚚",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-one/extra-three/index"
        options={{
          headerShown: false,
          title: "Nuevo Cont. Vacío Extra 3 🚚",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-one/list/index"
        options={{
          title: "Contenedor Vacío🚚",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-one/video/index"
        options={{
          title: "Video Cont. Vacío 📹",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-complete/index"
        options={{
          title: "Consolidado",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-one/queue/index"
        options={{
          title: "Cont. Vacíos Encolados ⏳",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-two/index"
        options={{
          title: "Proceso de Carga",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-two/create/index"
        options={{
          headerShown: false,
          title: "Nuevo Proc. de Carga 🚛",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-two/extra-one/index"
        options={{
          headerShown: false,
          title: "Nuevo Proc. de Carga Extra 1 🚛",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-two/extra-two/index"
        options={{
          headerShown: false,
          title: "Nuevo Proc. de Carga Extra 2 🚛",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-two/extra-three/index"
        options={{
          headerShown: false,
          title: "Nuevo Proc. de Carga Extra 3 🚛",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-two/list/index"
        options={{
          title: "Proceso de Carga 🚛",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-two/queue/index"
        options={{
          title: "Proc. de Carga Encolados ⏳",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-three/index"
        options={{
          title: "Malimax 3",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-three/create/index"
        options={{
          headerShown: false,
          title: "Sellado de Cont. 🚛",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-three/extra-one/index"
        options={{
          headerShown: false,
          title: "Nuevo Sellado de Cont. Extra 1 🚛",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-three/extra-two/index"
        options={{
          headerShown: false,
          title: "Nuevo Sellado de Cont. Extra 2 🚛",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-three/extra-three/index"
        options={{
          headerShown: false,
          title: "Nuevo Sellado de Cont. Extra 3 🚛",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-three/list/index"
        options={{
          title: "Sellado de Cont. 🚛",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="container-three/queue/index"
        options={{
          title: "Sellado de Cont. Encolados ⏳",
          animation: "flip",
        }}
      />
    </Stack>
  );
};

export default StackLayout;
