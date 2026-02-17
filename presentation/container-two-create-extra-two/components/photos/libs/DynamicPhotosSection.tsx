import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWorkflowStoreTwoExtraTwo } from "../../../store";
import { DynamicPhotoCard } from "./DynamicPhotoCard";

export const DynamicPhotosSection = () => {
  const images = useWorkflowStoreTwoExtraTwo((state) => state.images);
  const addImage = useWorkflowStoreTwoExtraTwo((state) => state.addImage);

  const handleAddPhoto = () => {
    addImage("loading"); // Tipo: loading (proceso de carga)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📸 FOTOS DEL PROCESO DE LLENADO</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddPhoto}>
            <Text style={styles.addButtonText}>+ Agregar Foto</Text>
          </TouchableOpacity>
          <Text style={styles.hint}>
            Agrega fotos del proceso de carga y llenado del contenedor
          </Text>
        </View>

        {images.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📷</Text>
            <Text style={styles.emptyText}>
              No hay fotos agregadas.{"\n"}
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
