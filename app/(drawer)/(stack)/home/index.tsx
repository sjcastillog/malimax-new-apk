import { workflowDB } from "@/common/storage/database";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import CardDashboard from "@/presentation/dashboard/components/CardDashboard";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const index = () => {
  const {
    user,
    token,
    processOne,
    processTwo,
    processThree,
    processReports,
    malimaxOne,
    malimaxTwo,
    malimaxThree,
    malimaxReports,
  } = useAuthStore();
  const [dbReady, setDbReady] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    const initializeDB = async () => {
      try {
        await workflowDB.init();

        const health = await workflowDB.checkDatabaseHealth();

        if (health.healthy) {
          setDbReady(true);
        } else {
          Alert.alert("⚠️ Base de datos con problemas:", health.error);
          setDbError(health.error || "Error desconocido");
          // Aún así permitir continuar
          setDbReady(true);
        }
      } catch (error: any) {
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";
        setDbError(errorMessage);
        Alert.alert("❌ Error al inicializar DB:", errorMessage);

        setDbReady(true);
      }
    };

    initializeDB();
  }, []);

  const handleResetDatabase = () => {
    Alert.alert(
      "⚠️ Resetear Base de Datos",
      "Esto eliminará TODOS los datos locales guardados (incluidas fotos). ¿Estás seguro?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Resetear",
          style: "destructive",
          onPress: async () => {
            try {
              await workflowDB.resetDatabase();
              await workflowDB.init();

              await workflowDB.checkDatabaseHealth();

              setDbError(null);

              Alert.alert("✅ Éxito", "Base de datos reseteada correctamente");
            } catch (resetError) {
              console.error("❌ Error al resetear:", resetError);
              Alert.alert("❌ Error", "No se pudo resetear la base de datos");
            }
          },
        },
      ],
    );
  };

  if (!token) return <Redirect href="/auth/login" />;

  if (!dbReady) {
    return (
      <SafeAreaView className="flex-1 bg-gray-200">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="mt-4 text-gray-600">
            Inicializando base de datos...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <ScrollView className="flex-1">
        <View className="px-3 pb-6">
          {/* Mostrar advertencia si hay error de DB */}
          {dbError && (
            <View className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-4">
              <Text className="text-yellow-800 font-semibold mb-2">
                ⚠️ Advertencia de Base de Datos
              </Text>
              <Text className="text-yellow-700 text-sm mb-3">{dbError}</Text>
              <TouchableOpacity
                onPress={handleResetDatabase}
                className="bg-yellow-600 px-4 py-2 rounded-md"
              >
                <Text className="text-white text-center font-semibold">
                  Resetear Base de Datos
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-2xl font-bold text-gray-800">
                Bienvenido,{" "}
                <Text className="text-primary font-work-black">
                  {user?.firstName}
                </Text>
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                Selecciona un proceso para comenzar
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "space-between",
            }}
          >
            {processOne && (
              <View style={{ width: "48%" }}>
                <CardDashboard
                  title="Malimax 1"
                  icon="file-tray-outline"
                  route="/container-one"
                />
              </View>
            )}
            {processTwo && (
              <View style={{ width: "48%" }}>
                <CardDashboard
                  title="Malimax 2"
                  icon="file-tray-full-outline"
                  route="/container-two"
                />
              </View>
            )}
            {processThree && (
              <View style={{ width: "48%" }}>
                <CardDashboard
                  title="Malimax 3"
                  icon="subway-outline"
                  route="/container-three"
                />
              </View>
            )}
            {processReports && (
              <View style={{ width: "48%" }}>
                <CardDashboard
                  title="Consolidado"
                  icon="document-text-outline"
                  route="/container-complete"
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
