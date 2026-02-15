import CustomDrawer from "@/components/shared/CustomDrawer";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { useColorScheme } from "react-native";

const DrawerLayout = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = useThemeColor({}, "background");

  const activeColor = isDark ? "#CAD226" : "#0E3B5F";
  const inactiveColor = isDark ? "#9CA3AF" : "#6B7280";

  return (
    <Drawer
      drawerContent={CustomDrawer}
      screenOptions={{
        overlayColor: "rgba(0,0,0,0.5)",
        drawerActiveTintColor: activeColor,
        drawerInactiveTintColor: inactiveColor,
        drawerActiveBackgroundColor: isDark
          ? "rgba(202, 210, 38, 0.15)"
          : "rgba(14, 59, 95, 0.1)",
        sceneStyle: {
          backgroundColor,
        },
        drawerStyle: {
          backgroundColor,
        },
        headerStyle: {
          backgroundColor,
        },
        headerShadowVisible: false,
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "600",
          marginLeft: -16,
        },
        drawerItemStyle: {
          borderRadius: 12,
          paddingHorizontal: 10,
          paddingVertical: 4,
          marginHorizontal: 12,
          marginVertical: 4,
        },
      }}
    >
      <Drawer.Screen
        name="(stack)"
        options={{
          headerShown: false,
          drawerLabel: "Dashboard",
          title: "Dashboard 📱",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="grid-outline"
              size={size}
              color={color}
              className="mr-4"
            />
          ),
        }}
      />

      <Drawer.Screen
        name="configuration/index"
        options={{
          drawerLabel: "Configuración",
          title: "Configuración ⚙️",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="person-circle-outline"
              size={size}
              color={color}
              className="mr-4"
            />
          ),
        }}
      />
       <Drawer.Screen
        name="reset-screen/index"
        options={{
          drawerLabel: "Configuración",
          drawerItemStyle: { display: "none" },
          title: "Configuración ⚙️",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="person-circle-outline"
              size={size}
              color={color}
              className="mr-4"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="diagnostics/index"
        options={{
          drawerLabel: "Diagnóstico",
          title: "Diagnóstico 🩺",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="fitness-outline"
              size={size}
              color={color}
              className="mr-4"
            />
          ),
        }}
      />

      <Drawer.Screen
        name="logout/index"
        options={{
          drawerLabel: "Cerrar Sesión",
          title: "Cerrar Sesión ⚠️",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="log-out-outline"
              size={size}
              color={color}
              className="mr-4"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="index"
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
