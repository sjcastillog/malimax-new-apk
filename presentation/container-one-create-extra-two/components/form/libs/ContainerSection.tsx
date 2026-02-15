import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useWorkflowStoreOneExtraTwo } from "../../../store";

export const ContainerSection = () => {
  const container = useWorkflowStoreOneExtraTwo((state) => state.container);
  const setContainer = useWorkflowStoreOneExtraTwo(
    (state) => state.setContainer,
  );
  const startProcess = useWorkflowStoreOneExtraTwo(
    (state) => state.startProcess,
  );
  const setStartProcess = useWorkflowStoreOneExtraTwo(
    (state) => state.setStartProcess,
  );
  const client = useWorkflowStoreOneExtraTwo((state) => state.client);
  const setClient = useWorkflowStoreOneExtraTwo((state) => state.setClient);

  const handleStartProcess = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("es-EC", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setStartProcess(timeString);

    // Aquí podrías setear el cliente si tienes lógica para obtenerlo
    // if (!client) setClient(elClient);
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
          style={styles.startButton}
          onPress={handleStartProcess}
        >
          <Text style={styles.startButtonText}>Inicio de Proceso</Text>
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
  startButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
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
