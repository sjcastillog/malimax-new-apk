import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";

const LoginScreen = () => {
  const { login } = useAuthStore();
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");
  const primaryColor = useThemeColor({}, "primary");
  const secondaryColor = useThemeColor({}, "secondary");
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    user: "",
    password: "",
  });

  const onLogin = async () => {
    const { user, password } = form;

    if (user.trim().length === 0 || password.trim().length === 0) {
      Alert.alert(
        "Campos incompletos",
        "Por favor ingrese usuario y contraseña",
      );
      return;
    }

    setIsPosting(true);

    try {
      const wasSuccessful = await login(user.trim(), password);

      if (wasSuccessful) {
        router.replace("/home");
      } else {
        Alert.alert(
          "Error de autenticación",
          "Usuario o contraseña incorrectos. Por favor intente nuevamente.",
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Ocurrió un error al iniciar sesión. Por favor intente más tarde.",
      );
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1" style={{ backgroundColor }}>
          {/* Header con gradiente y logo flotante */}
          <View className="relative" style={{ height: height * 0.4 }}>
            <View
              className="absolute inset-0 rounded-b-[40px] overflow-hidden"
              style={{ backgroundColor: secondaryColor }}
            >
              <View className="absolute inset-0 opacity-20">
                <View className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full" />
                <View className="absolute bottom-20 left-5 w-24 h-24 bg-white rounded-full" />
              </View>
            </View>

            <View className="flex-1 items-center justify-center pt-8">
              <View className="bg-transparent rounded-3xl p-1">
                <Image
                  source={require("@/assets/images/logo-puce.png")}
                  className="w-52 h-52"
                  resizeMode="contain"
                />
              </View>

              <ThemedText
                type="title"
                className="text-black text-center font-bold"
              >
                Bienvenido
              </ThemedText>
            </View>
          </View>

          {/* Card de formulario */}
          <View className="flex-1 px-6 -mt-8">
            <View
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <ThemedText
                type="subtitle"
                className="text-center mb-6 font-semibold"
              >
                Iniciar Sesión
              </ThemedText>

              <View className="mb-5">
                <ThemedText className="mb-2 ml-1 text-sm font-medium opacity-60">
                  Usuario
                </ThemedText>
                <ThemedTextInput
                  placeholder="Tu usuario"
                  keyboardType="default"
                  autoCapitalize="none"
                  icon="person-outline"
                  value={form.user}
                  onChangeText={(value) => setForm({ ...form, user: value })}
                  editable={!isPosting}
                />
              </View>

              <View className="mb-6">
                <ThemedText className="mb-2 ml-1 text-sm font-medium opacity-60">
                  Contraseña
                </ThemedText>
                <ThemedTextInput
                  placeholder="Tu contraseña"
                  secureTextEntry
                  autoCapitalize="none"
                  icon="lock-closed-outline"
                  value={form.password}
                  onChangeText={(value) =>
                    setForm({ ...form, password: value })
                  }
                  editable={!isPosting}
                  onSubmitEditing={onLogin}
                  returnKeyType="done"
                />
              </View>

              <ThemedButton
                icon="log-in-outline"
                onPress={onLogin}
                loading={isPosting}
                variant="solid"
                isDark={isDark}
              >
                Iniciar Sesión
              </ThemedButton>
            </View>

            {/* Footer */}
            <View className="items-center mt-8 mb-6">
              <Text
                className="text-2xl opacity-40 text-secondary font-bold"
                // color="secondary"
              >
                MALIMAX ©
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
