import { getLocationFromCoordinates } from "@/common/service/geocoding.service";
import * as Location from "expo-location";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useWorkflowStoreOneExtraThree } from "../../../store";

export const ContainerSection = () => {
  const container = useWorkflowStoreOneExtraThree((state) => state.container);
  const setContainer = useWorkflowStoreOneExtraThree((state) => state.setContainer);
  const startProcess = useWorkflowStoreOneExtraThree((state) => state.startProcess);
  const setStartProcess = useWorkflowStoreOneExtraThree(
    (state) => state.setStartProcess,
  );
  const setCoordinates = useWorkflowStoreOneExtraThree(
    (state) => state.setCoordinates,
  );
  const setCity = useWorkflowStoreOneExtraThree((state) => state.setCity);

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleStartProcess = async () => {
    try {
      setIsLoadingLocation(true);

      // 1. Obtener hora actual
      const now = new Date();
      const timeString = now.toLocaleTimeString("es-EC", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setStartProcess(timeString);

      // 2. Solicitar permisos de ubicación
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permiso Denegado",
          "Se necesita acceso a la ubicación para obtener la ciudad automáticamente.",
        );
        setIsLoadingLocation(false);
        return;
      }

      // 3. Obtener coordenadas GPS
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;
      const coordsString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

      // Guardar coordenadas
      setCoordinates(coordsString);

      // 4. Hacer geocoding reverso para obtener la ciudad
      try {
        const geocodeResult = await getLocationFromCoordinates(
          latitude,
          longitude,
        );

        if (geocodeResult) {
          // Guardar ciudad automáticamente
          setCity(geocodeResult.city.toUpperCase());

          Alert.alert(
            "✅ Ubicación Detectada",
            `Ciudad: ${geocodeResult.city}\n` +
              `País: ${geocodeResult.country}\n` +
              `Coordenadas: ${coordsString}`,
            [{ text: "OK" }],
          );
        } else {
          // Si no se pudo obtener la ciudad, solo guardar coordenadas
          Alert.alert(
            "⚠️ Ciudad No Detectada",
            `No se pudo determinar la ciudad automáticamente.\n\n` +
              `Coordenadas: ${coordsString}\n\n` +
              `Por favor ingresa la ciudad manualmente.`,
            [{ text: "OK" }],
          );
        }
      } catch (geocodeError) {
        console.error("Error en geocoding:", geocodeError);
        Alert.alert(
          "⚠️ Error al Obtener Ciudad",
          `Se obtuvieron las coordenadas pero no se pudo determinar la ciudad.\n\n` +
            `Coordenadas: ${coordsString}\n\n` +
            `Por favor ingresa la ciudad manualmente.`,
          [{ text: "OK" }],
        );
      }
    } catch (error: any) {
      console.error("Error obteniendo ubicación:", error);
      Alert.alert(
        "Error",
        "No se pudo obtener la ubicación. Asegúrate de tener el GPS activado.",
      );

      // Aún así setear la hora de inicio
      const now = new Date();
      const timeString = now.toLocaleTimeString("es-EC", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setStartProcess(timeString);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleBlurContainer = () => {
    if (!container) return;

    // Limpiar el valor del contenedor
    let value = container;
    value = value.replace(/\s+/g, ""); // Eliminar espacios
    value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Eliminar tildes
    value = value.replace(/[^a-zA-Z0-9]/g, ""); // Solo alfanuméricos
    value = value.toUpperCase();

    setContainer(value);
  };

  return (
    <View style={styles.container}>
      {/* Botón Inicio de Proceso */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.startButton,
            isLoadingLocation && styles.startButtonDisabled,
          ]}
          onPress={handleStartProcess}
          disabled={isLoadingLocation || !!startProcess}
        >
          {isLoadingLocation ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.startButtonText}>
                Obteniendo ubicación...
              </Text>
            </View>
          ) : (
            <Text style={styles.startButtonText}>
              {startProcess ? "✓ Proceso Iniciado" : "Inicio de Proceso"}
            </Text>
          )}
        </TouchableOpacity>
        <TextInput
          style={[styles.timeInput, !startProcess && styles.timeInputEmpty]}
          value={startProcess}
          editable={false}
          placeholder="--:--:--"
          placeholderTextColor="#999"
        />
      </View>

      {/* Input Contenedor */}
      <View style={styles.formGroup}>
        <Text style={[styles.label, !startProcess && styles.labelDisabled]}>
          N° Contenedor {!startProcess && "⚠️"}
        </Text>
        <TextInput
          style={[styles.input, !startProcess && styles.inputDisabled]}
          value={container || ""}
          onChangeText={(text) => setContainer(text.toUpperCase().trim())}
          onBlur={handleBlurContainer}
          placeholder="Ingrese número de contenedor"
          placeholderTextColor="#999"
          editable={!!startProcess}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  startButton: {
    flex: 1,
    backgroundColor: "#000080",
    borderRadius: 6,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  startButtonDisabled: {
    backgroundColor: "#91caff",
    opacity: 0.7,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#52c41a",
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#52c41a",
    backgroundColor: "#f6ffed",
    textAlign: "center",
  },
  timeInputEmpty: {
    borderColor: "#d9d9d9",
    color: "#999",
    backgroundColor: "#fafafa",
  },
  formGroup: {
    marginBottom: 0,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  labelDisabled: {
    color: "#ff4d4f",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  inputDisabled: {
    backgroundColor: "#f5f5f5",
    borderColor: "#e8e8e8",
    color: "#999",
  },
});
