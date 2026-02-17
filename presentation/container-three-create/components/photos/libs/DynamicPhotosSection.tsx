import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWorkflowStoreThreeZero } from "../../../store";
import { DynamicPhotoCard } from "./DynamicPhotoCard";

export const DynamicPhotosSection = () => {
  const images = useWorkflowStoreThreeZero((state) => state.images);
  const addImage = useWorkflowStoreThreeZero((state) => state.addImage);

  const handleAddPhoto = () => {
    addImage("exit"); // Tipo: exit (proceso de salida)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📸 FOTOS ADICIONALES DE SALIDA</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddPhoto}>
            <Text style={styles.addButtonText}>+ Agregar Foto</Text>
          </TouchableOpacity>
          <Text style={styles.hint}>
            Agrega fotos adicionales del proceso de salida, inspección final,
            documentación, etc.
          </Text>
        </View>

        {images.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📷</Text>
            <Text style={styles.emptyText}>
              No hay fotos adicionales.{"\n"}
              Presiona "Agregar Foto" para empezar.
            </Text>
          </View>
        ) : (
          <View style={styles.photosList}>
            {images.map((image, index) => (
              <DynamicPhotoCard
                key={image.uuid}
                image={image}
                index={index + 1}
              />
            ))}
          </View>
        )}
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
  content: {
    paddingHorizontal: 16,
  },
  addButtonContainer: {
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#52c41a",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  hint: {
    fontSize: 11,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
    fontStyle: "italic",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderStyle: "dashed",
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    color: "#999",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  photosList: {
    gap: 12,
  },
});
