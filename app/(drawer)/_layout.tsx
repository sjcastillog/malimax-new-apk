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
  const primaryColor = useThemeColor({}, "primary");

  // Colores más vibrantes y modernos
  const activeColor = isDark ? "#10B981" : "#3B82F6";
  const inactiveColor = isDark ? "#64748B" : "#94A3B8";
  const activeBackgroundColor = isDark
    ? "rgba(16, 185, 129, 0.12)"
    : "rgba(59, 130, 246, 0.08)";

  return (
    <Drawer
      drawerContent={CustomDrawer}
      screenOptions={{
        overlayColor: "rgba(0,0,0,0.6)",
        drawerActiveTintColor: activeColor,
        drawerInactiveTintColor: inactiveColor,
        drawerActiveBackgroundColor: activeBackgroundColor,
        sceneStyle: {
          backgroundColor,
        },
        drawerStyle: {
          backgroundColor,
          width: 320,
        },
        headerStyle: {
          backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: isDark ? "#F1F5F9" : "#1E293B",
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "700",
          letterSpacing: 0.3,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
          marginLeft: 0,
          letterSpacing: 0.2,
        },
        drawerItemStyle: {
          borderRadius: 16,
          paddingHorizontal: 12,
          paddingVertical: 6,
          marginHorizontal: 16,
          marginVertical: 3,
        },
      }}
    >
      <Drawer.Screen
        name="(stack)"
        options={{
          headerShown: false,
          drawerLabel: "Inicio",
          title: "Inicio",
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size + 2}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="diagnostics/index"
        options={{
          drawerLabel: "Diagnóstico",
          title: "Diagnóstico",
          headerTitle: "🩺 Diagnóstico",
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "fitness" : "fitness-outline"}
              size={size + 2}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="configuration/index"
        options={{
          drawerLabel: "Configuración",
          title: "Configuración",
          headerTitle: "⚙️ Configuración",
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size + 2}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="reset-screen/index"
        options={{
          drawerLabel: "Reiniciar",
          drawerItemStyle: { display: "none" },
          title: "Reiniciar",
          headerTitle: "🔄 Reiniciar",
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "refresh-circle" : "refresh-circle-outline"}
              size={size + 2}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="logout/index"
        options={{
          drawerLabel: "Cerrar Sesión",
          title: "Cerrar Sesión",
          headerTitle: "👋 Salir",
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "exit" : "exit-outline"}
              size={size + 2}
              color={color}
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
