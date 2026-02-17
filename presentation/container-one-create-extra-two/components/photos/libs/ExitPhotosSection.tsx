import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PhotoWithComment } from "./PhotoWithComment";

export const ExitPhotosSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🚪 CONTENEDOR REVISADO / SALIDA</Text>
      </View>
      <ExitPanoramicPhoto />
      <ExitTemporarySealingPhoto />
    </View>
  );
};

const ExitPanoramicPhoto = () => (
  <PhotoWithComment
    photoIdKey="exitPanoramicPhoto"
    commentKey="exitPanoramicComment"
    label="FOTO PANORÁMICA (SALIDA)"
    commentPlaceholder="Comentario sobre la foto panorámica de salida"
  />
);

// ✨ NUEVA FOTO DE SELLADO TEMPORAL
const ExitTemporarySealingPhoto = () => (
  <PhotoWithComment
    photoIdKey="exitTemporarySealingPhoto"
    commentKey="exitTemporarySealingComment"
    label="SELLADO TEMPORAL"
    commentPlaceholder="Comentario sobre el sellado temporal"
  />
);

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
});
