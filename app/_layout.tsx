import { PHOTOS_DIR } from "@/common/constants";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { useColorScheme } from "@/presentation/theme/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Crypto from "expo-crypto";
import { Directory } from "expo-file-system";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "./global.css";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const ensurePhotosDirectory = async () => {
  try {
    const photosDir = new Directory(PHOTOS_DIR);

    // Verificar si existe
    const exists = photosDir.exists;

    if (!exists) photosDir.create();
  } catch (error) {
    console.error("❌ Error creando directorio:", error);
  }
};

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [authReady, setAuthReady] = useState(false);
  const checkStatus = useAuthStore((state) => state.checkStatus);

  const [fontsLoaded, error] = useFonts({
    "WorkSans-Black": require("../assets/fonts/WorkSans-Black.ttf"),
    "WorkSans-Light": require("../assets/fonts/WorkSans-Light.ttf"),
    "WorkSans-Medium": require("../assets/fonts/WorkSans-Medium.ttf"),
  });

  if (typeof global.crypto === "undefined") {
    (global as any).crypto = {
      getRandomValues: <T extends ArrayBufferView | null>(array: T): T => {
        if (!array) return array;
        const bytes = Crypto.getRandomBytes(array.byteLength);
        (array as any).set(bytes);
        return array;
      },
    };
  }

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkStatus();
        await ensurePhotosDirectory();
      } catch (error: any) {
        Alert.alert(
          "Error",
          `No se pudo iniciar la aplicación
          ${error.toString()}`,
        );
      } finally {
        setAuthReady(true);
      }
    };
    initializeAuth();
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded && authReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, authReady]);

  if (!fontsLoaded || !authReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Slot />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
