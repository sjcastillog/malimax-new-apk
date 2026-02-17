import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useWorkflowStoreOneExtraThree } from "../../../store";
import { DynamicPhotoCard } from "./DynamicPhotoCard";

interface DynamicPhotosListProps {
  type: "aditional" | "intern";
}

export const DynamicPhotosList: React.FC<DynamicPhotosListProps> = ({
  type,
}) => {
  const images = useWorkflowStoreOneExtraThree((state) => state.images);

  // Filtrar solo las imágenes del tipo especificado
  const filteredImages = images.filter((img) => img.type === type);

  if (filteredImages.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No hay fotos adicionales. Presiona "Agregar" para añadir.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {filteredImages.map((image) => (
        <DynamicPhotoCard key={image.uuid} image={image} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
  },
  emptyText: {
    color: "#999",
    fontSize: 13,
    textAlign: "center",
  },
});
