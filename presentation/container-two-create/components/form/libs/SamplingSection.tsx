import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useWorkflowStoreTwoZero } from "../../../store";

export const SamplingSection = () => {
  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 DATOS DE MUESTREO Y CANTIDAD</Text>
      </View>
      <NumberPalletField />
      <NumberPresentationField />
      <NumberSamplingField />
    </>
  );
};

const NumberPalletField = () => {
  const numberPallet = useWorkflowStoreTwoZero((state) => state.numberPallet);
  const setNumberPallet = useWorkflowStoreTwoZero(
    (state) => state.setNumberPallet,
  );

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>Número de Pallets</Text>
      <TextInput
        style={styles.input}
        value={numberPallet || ""}
        onChangeText={setNumberPallet}
        placeholder="Ej: 1260"
        placeholderTextColor="#999"
        keyboardType="numeric"
        maxLength={50}
      />
    </View>
  );
};

const NumberPresentationField = () => {
  const numberPresentation = useWorkflowStoreTwoZero(
    (state) => state.numberPresentation,
  );
  const setNumberPresentation = useWorkflowStoreTwoZero(
    (state) => state.setNumberPresentation,
  );

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>Número de Presentaciones</Text>
      <TextInput
        style={styles.input}
        value={numberPresentation || ""}
        onChangeText={setNumberPresentation}
        placeholder="Ej: 22680 (cajas, sacos, etc.)"
        placeholderTextColor="#999"
        keyboardType="numeric"
        maxLength={50}
      />
      <Text style={styles.hint}>
        Cantidad total de unidades (cajas, sacos, bultos, etc.)
      </Text>
    </View>
  );
};

const NumberSamplingField = () => {
  const numberSampling = useWorkflowStoreTwoZero(
    (state) => state.numberSampling,
  );
  const setNumberSampling = useWorkflowStoreTwoZero(
    (state) => state.setNumberSampling,
  );

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>Número de Muestreo</Text>
      <TextInput
        style={styles.input}
        value={numberSampling || ""}
        onChangeText={setNumberSampling}
        placeholder="Ej: 50"
        placeholderTextColor="#999"
        keyboardType="numeric"
        maxLength={50}
      />
      <Text style={styles.hint}>
        Cantidad de muestras tomadas durante la inspección
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
