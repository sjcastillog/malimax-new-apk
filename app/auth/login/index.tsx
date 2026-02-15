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
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";

const LoginScreen = () => {
  const { login } = useAuthStore();
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");
  const primaryColor = useThemeColor({}, "primary");
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
        "Por favor ingrese usuario y contraseña"
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
          "Usuario o contraseña incorrectos. Por favor intente nuevamente."
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Ocurrió un error al iniciar sesión. Por favor intente más tarde."
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
        <View className="flex-1 px-8" style={{ backgroundColor }}>
          {/* Header con Logo */}
          <View
            className="items-center justify-center"
            style={{ paddingTop: height * 0.12 }}
          >
            <View className="items-center mb-8">
              <Image
                source={require("@/assets/images/logo-puce.png")}
                className="w-36 h-36 mb-6 rounded-lg"
                resizeMode="contain"
              />

              <ThemedText
                type="subtitle"
                className="text-center mb-2"
                style={{ letterSpacing: 0.5 }}
              >
                SECURE CONTAINER 
              </ThemedText>

              <View
                className="w-16 h-1 rounded-full mb-4"
                style={{ backgroundColor: primaryColor }}
              />

              <ThemedText className="text-center opacity-50 text-sm">
                Ingrese sus credenciales para continuar
              </ThemedText>
            </View>
          </View>

          {/* Formulario */}
          <View className="mt-8">
            <View className="mb-4">
              <ThemedText className="mb-2 ml-1 font-semibold opacity-70">
                Usuario
              </ThemedText>
              <ThemedTextInput
                placeholder="Ingrese su usuario"
                keyboardType="default"
                autoCapitalize="none"
                icon="person-outline"
                value={form.user}
                onChangeText={(value) => setForm({ ...form, user: value })}
                editable={!isPosting}
              />
            </View>

            <View className="mb-6">
              <ThemedText className="mb-2 ml-1 font-semibold opacity-70">
                Contraseña
              </ThemedText>
              <ThemedTextInput
                placeholder="Ingrese su contraseña"
                secureTextEntry
                autoCapitalize="none"
                icon="lock-closed-outline"
                value={form.password}
                onChangeText={(value) => setForm({ ...form, password: value })}
                editable={!isPosting}
                onSubmitEditing={onLogin}
                returnKeyType="done"
              />
            </View>

            <ThemedButton
              icon="arrow-forward-outline"
              onPress={onLogin}
              loading={isPosting}
              variant="solid"
              isDark={isDark}
            >
              Ingresar
            </ThemedButton>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
