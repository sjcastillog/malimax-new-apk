import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useWorkflowStoreTwoZero } from "../../../store";

export const ProductSection = () => {
  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🍌 INFORMACIÓN DEL PRODUCTO</Text>
      </View>
      <ProductField />
      <PresentationField />
    </>
  );
};

const ProductField = () => {
  const product = useWorkflowStoreTwoZero((state) => state.product);
  const setProduct = useWorkflowStoreTwoZero((state) => state.setProduct);

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>
        Producto <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        value={product}
        onChangeText={(text) => setProduct(text.toUpperCase())}
        placeholder="Ej: BANANO CAVENDISH"
        placeholderTextColor="#999"
        maxLength={255}
      />
    </View>
  );
};

const PresentationField = () => {
  const presentation = useWorkflowStoreTwoZero((state) => state.presentation);
  const setPresentation = useWorkflowStoreTwoZero(
    (state) => state.setPresentation,
  );

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>
        Presentación <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        value={presentation}
        onChangeText={(text) => setPresentation(text.toUpperCase())}
        placeholder="Ej: CAJAS DE 18.14 KG"
        placeholderTextColor="#999"
        maxLength={255}
      />
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
  required: {
    color: "#ff4d4f",
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
});
