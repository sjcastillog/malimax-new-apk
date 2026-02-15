import { getWorkflowTwoByContainerForNextProcess } from "@/core/container-two/actions";
import moment from "moment";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useWorkflowStoreThreeZero } from "../../../store";

export const ContainerSection = () => {
  const [loading, setLoading] = useState(false);

  const startProcess = useWorkflowStoreThreeZero((state) => state.startProcess);
  const setStartProcess = useWorkflowStoreThreeZero(
    (state) => state.setStartProcess,
  );

  const container = useWorkflowStoreThreeZero((state) => state.container);
  const setContainer = useWorkflowStoreThreeZero((state) => state.setContainer);

  const client = useWorkflowStoreThreeZero((state) => state.client);
  const setClient = useWorkflowStoreThreeZero((state) => state.setClient);

  // Método simplificado de carga
  const setWorkflowTwoData = useWorkflowStoreThreeZero(
    (state) => state.setWorkflowTwoData,
  );

  const handleStartProcess = () => {
    const currentTime = moment().format("HH:mm:ss");
    setStartProcess(currentTime);
    if (!client) {
      setClient("CLIENTE DEMO"); // TODO: Obtener de global state
    }
  };

  const handleSearchWorkflowTwo = async () => {
    if (!container) {
      Alert.alert("Error", "Debe ingresar un número de contenedor");
      return;
    }

    setLoading(true);
    try {
      const datawf = await getWorkflowTwoByContainerForNextProcess(container);

      if (!datawf) {
        Alert.alert("Info", "No se encontraron datos para este contenedor");
        return;
      }

      setWorkflowTwoData(datawf);

      Alert.alert("Éxito", "Datos del proceso TWO cargados correctamente", [
        { text: "OK" },
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message || "No se pudo cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = () => {
    if (!container) return;

    let value = container;
    // Eliminar espacios
    value = value.replace(/\s+/g, "");
    // Eliminar tildes
    value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Solo letras y números
    value = value.replace(/[^a-zA-Z0-9]/g, "");
    // Mayúsculas
    value = value.toUpperCase();

    setContainer(value);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          📋 REGISTRO DE VALIDACIÓN DE SELLO
        </Text>
      </View>

      {/* Inicio de Proceso */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartProcess}
        >
          <Text style={styles.startButtonText}>Inicio de Proceso</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.timeInput}
          value={startProcess || ""}
          editable={false}
          placeholder="--:--:--"
          placeholderTextColor="#999"
        />
      </View>

      {/* Búsqueda de Contenedor */}
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <View
            style={[
              styles.label,
              { backgroundColor: startProcess ? "#000080" : "#ff4d4f" },
            ]}
          >
            <Text
              style={[
                styles.labelText,
                { color: startProcess ? "#fff" : "#fff" },
              ]}
            >
              N° Contenedor
            </Text>
          </View>
          <TextInput
            style={styles.input}
            value={container || ""}
            onChangeText={(text) => setContainer(text.toUpperCase().trim())}
            onBlur={handleBlur}
            placeholder="Ingrese número de contenedor"
            placeholderTextColor="#999"
            editable={!!startProcess}
            autoCapitalize="characters"
          />
        </View>
        <TouchableOpacity
          style={[
            styles.searchButton,
            (!startProcess || loading) && styles.searchButtonDisabled,
          ]}
          onPress={handleSearchWorkflowTwo}
          disabled={!startProcess || loading}
        >
          <Text style={styles.searchIcon}>{loading ? "⏳" : "🔍"}</Text>
        </TouchableOpacity>
      </View>

      {/* Información del Cliente */}
      {client && (
        <View style={styles.clientInfo}>
          <Text style={styles.clientText}>👤 Cliente: {client}</Text>
          <Text style={styles.clientSubtext}>RUC: 0123456789001</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  header: {
    backgroundColor: "#A9A9A9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  headerText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 8,
  },
  startButton: {
    backgroundColor: "#000080",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    justifyContent: "center",
    minWidth: 140,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },
  timeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 12,
    fontWeight: "bold",
    color: "darkgreen",
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 4,
    overflow: "hidden",
  },
  label: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "center",
    minWidth: 110,
  },
  labelText: {
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 12,
  },
  searchButton: {
    backgroundColor: "#1890ff",
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  searchButtonDisabled: {
    backgroundColor: "#d9d9d9",
  },
  searchIcon: {
    fontSize: 20,
  },
  clientInfo: {
    backgroundColor: "#e6f7ff",
    borderWidth: 1,
    borderColor: "#91d5ff",
    borderRadius: 4,
    padding: 12,
    marginTop: 8,
  },
  clientText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#0050b3",
    marginBottom: 4,
  },
  clientSubtext: {
    fontSize: 12,
    color: "#0050b3",
  },
});
