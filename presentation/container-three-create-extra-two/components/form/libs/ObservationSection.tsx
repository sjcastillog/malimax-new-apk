import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useWorkflowStoreThreeExtraTwo } from "../../../store";

export const ObservationSection = () => {
  const observation = useWorkflowStoreThreeExtraTwo((state) => state.observation);
  const setObservation = useWorkflowStoreThreeExtraTwo(
    (state) => state.setObservation,
  );

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 OBSERVACIONES</Text>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Observaciones Generales</Text>
        <TextInput
          style={styles.textarea}
          value={observation || ""}
          onChangeText={setObservation}
          placeholder="Escribe aquí cualquier observación sobre el proceso de salida, verificación de precintos, GPS, etc..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          maxLength={500}
          textAlignVertical="top"
        />
        <Text style={styles.charCount}>{observation?.length || 0} / 500</Text>
      </View>
    </>
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
  textarea: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
    minHeight: 100,
    color: "#000",
  },
  charCount: {
    fontSize: 11,
    color: "#999",
    textAlign: "right",
    marginTop: 4,
  },
});
