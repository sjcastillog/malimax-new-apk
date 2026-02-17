import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useWorkflowStoreThreeZero } from "../../../store";

export const EntryPortSection = () => {
  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚢 DATOS DEL PROCESO 3</Text>
      </View>
      <EntryPortField />
    </>
  );
};

const EntryPortField = () => {
  const entryPort = useWorkflowStoreThreeZero((state) => state.entryPort);
  const setEntryPort = useWorkflowStoreThreeZero((state) => state.setEntryPort);

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>Puerto de Ingreso</Text>
      <TextInput
        style={styles.input}
        value={entryPort || ""}
        onChangeText={(text) => setEntryPort(text.toUpperCase())}
        placeholder="Ej: PUERTO DE GUAYAQUIL"
        placeholderTextColor="#999"
        maxLength={200}
      />
      <Text style={styles.hint}>
        Puerto de destino o ingreso del contenedor
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fafafa",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000080",
  },
  formGroup: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
    color: "#000",
  },
  hint: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
    fontStyle: "italic",
  },
});
