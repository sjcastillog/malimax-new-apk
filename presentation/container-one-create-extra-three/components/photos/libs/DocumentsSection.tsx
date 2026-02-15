import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PhotoButton } from "./PhotoButton";

export const DocumentsSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📄 DOCUMENTOS</Text>
      </View>

      <View style={styles.photoGrid}>
        <PhotoButton photoIdKey="emptyEirPhoto" label="EIR" />
        <PhotoButton photoIdKey="emptyPlatePhoto" label="PLACA" />
        <PhotoButton
          photoIdKey="emptyPreviousInspectionDocumentPhoto"
          label="DOC. INSPECCIÓN"
        />
        <PhotoButton
          photoIdKey="emptyDriverIdentificationPhoto"
          label="C.I. CONDUCTOR"
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
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
    gap: 8,
  },
});
