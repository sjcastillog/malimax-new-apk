import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useWorkflowStoreThreeExtraThree } from "../../../store";
import { PhotoWithComment } from "./PhotoWithComment";

export const PanoramicSection = () => {
  const coordinates = useWorkflowStoreThreeExtraThree(
    (state) => state.containerPanoramicCoordinates,
  );
  const setCoordinates = useWorkflowStoreThreeExtraThree(
    (state) => state.setContainerPanoramicCoordinates,
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📸 FOTO PANORÁMICA DEL CONTENEDOR</Text>
      </View>

      <PhotoWithComment
        photoIdKey="containerPanoramicPhoto"
        commentKey="containerPanoramicComment"
        label="FOTO PANORÁMICA"
        commentPlaceholder="Comentario sobre la vista panorámica del contenedor sellado"
      />

      <View style={styles.coordinatesContainer}>
        <Text style={styles.coordinatesLabel}>Coordenadas GPS (opcional)</Text>
        <TextInput
          style={styles.coordinatesInput}
          value={coordinates || ""}
          onChangeText={setCoordinates}
          placeholder="Ej: -2.1894, -79.8891"
          placeholderTextColor="#999"
          maxLength={160}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    backgroundColor: "#A9A9A9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
  },
  headerText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  coordinatesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  coordinatesLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginBottom: 6,
  },
  coordinatesInput: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    padding: 10,
    fontSize: 13,
    backgroundColor: "#fff",
  },
});
