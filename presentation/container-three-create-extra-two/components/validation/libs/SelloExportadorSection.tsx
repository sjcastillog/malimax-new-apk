import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ValidationItemSection } from "./ValidationItemSection";

export const SelloExportadorSection = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>🚢 SELLO EXPORTADOR</Text>
      </View>

      {/* Botella Exportador */}
      <ValidationItemSection
        photoIdKey="exporterBottleCheckPhoto"
        validationPhotoKey="exporterBottlePhoto"
        statusKey="exporterBottleStatus"
        commentKey="exporterBottleComment"
        label="SELLO BOTELLA EXPORTADOR"
        isVideo={false}
      />

      {/* Cable Exportador */}
      <ValidationItemSection
        photoIdKey="exporterWireCheckPhoto"
        validationPhotoKey="exporterWirePhoto"
        statusKey="exporterWireStatus"
        commentKey="exporterWireComment"
        label="SELLO CABLE EXPORTADOR"
        isVideo={false}
      />

      {/* Etiqueta Exportador */}
      <ValidationItemSection
        photoIdKey="exporterLabelCheckPhoto"
        validationPhotoKey="exporterLabelPhoto"
        statusKey="exporterLabelStatus"
        commentKey="exporterLabelComment"
        label="SELLO ETIQUETA EXPORTADOR"
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
