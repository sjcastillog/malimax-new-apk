import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ValidationItemSection } from "./ValidationItemSection";

export const CheckContenedorSection = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>✅ CHECK CONTENEDOR</Text>
      </View>

      {/* Foto Panorámica */}
      <ValidationItemSection
        photoIdKey="containerPanoramicCheckPhoto"
        validationPhotoKey="containerPanoramicPhoto"
        statusKey="containerPanoramicStatus"
        commentKey="containerPanoramicComment"
        label="FOTO PANORÁMICA"
        isVideo={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    backgroundColor: "#000080",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 12,
  },
  headerText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
});