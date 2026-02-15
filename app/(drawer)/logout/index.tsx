import CustomButton from "@/components/shared/CustomButton";
import { QueryCacheHelper } from "@/helpers/libs/queries-cache";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Text, View, useColorScheme } from "react-native";
import { useAuthStore } from "../../../presentation/auth/store/useAuthStore";

const LogoutIconButton = () => {
  const queryClient = useQueryClient();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const { logout } = useAuthStore();

  const cardBackground = isDark ? "#1F2937" : "#FFFFFF";
  const iconBackground = isDark
    ? "rgba(239, 68, 68, 0.2)"
    : "rgba(209, 71, 40, 0.1)";
  const iconColor = isDark ? "#EF4444" : "#d14728";

  const handleLogout = async () => {
    try {
      queryClient.removeQueries({
        queryKey: ["clientBox"],
      });
      queryClient.removeQueries({
        queryKey: ["clientBrand"],
      });
      queryClient.removeQueries({
        queryKey: ["clientProducerFarm"],
      });
      queryClient.removeQueries({
        queryKey: ["clientProducer"],
      });

      logout();
      await QueryCacheHelper.clearAllCache();
      router.push("/auth/login");
    } catch (error) {
      console.error("❌ Error al cerrar sesión:", error);
    }
  };

  return (
    <View
      className="flex-1 justify-center items-center px-6"
      style={{ backgroundColor }}
    >
      <View
        className="w-full max-w-sm p-8 rounded-3xl"
        style={{
          backgroundColor: cardBackground,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 8,
          borderWidth: isDark ? 1 : 0,
          borderColor: isDark ? "#374151" : "transparent",
          position: "relative",
          top: -30,
        }}
      >
        {/* Icono */}
        <View className="items-center mb-6">
          <View
            className="w-24 h-24 rounded-full items-center justify-center mb-5"
            style={{ backgroundColor: iconBackground }}
          >
            <Ionicons name="log-out-outline" size={48} color={iconColor} />
          </View>

          {/* Título */}
          <Text
            className="text-2xl font-bold text-center mb-3"
            style={{ color: textColor, letterSpacing: 0.3 }}
          >
            Cerrar sesión
          </Text>

          {/* Descripción */}
          <Text
            className="text-center text-base leading-6"
            style={{ color: textColor, opacity: 0.7 }}
          >
            ¿Estás seguro que deseas salir de tu cuenta?
          </Text>
        </View>

        {/* Botones */}
        <View className="gap-3 mt-2">
          <CustomButton
            color="secondary"
            onPress={handleLogout}
            className="w-full"
          >
            Sí, cerrar sesión
          </CustomButton>

          <CustomButton
            color="secondary"
            variant="text-only"
            onPress={() => router.back()}
            className="w-full"
          >
            Cancelar
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

export default LogoutIconButton;
