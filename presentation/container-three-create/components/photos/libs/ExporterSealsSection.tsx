import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PhotoWithComment } from "./PhotoWithComment";

export const ExporterSealsSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🔒 PRECINTOS EXPORTADOR</Text>
      </View>

      <PhotoWithComment
        photoIdKey="exporterBottlePhoto"
        commentKey="exporterBottleComment"
        label="BOTELLA EXPORTADOR"
        commentPlaceholder="Comentario sobre la botella del precinto exportador"
      />

      <PhotoWithComment
        photoIdKey="exporterWirePhoto"
        commentKey="exporterWireComment"
        label="CABLE EXPORTADOR"
        commentPlaceholder="Comentario sobre el cable del precinto exportador"
      />

      <PhotoWithComment
        photoIdKey="exporterLabelPhoto"
        commentKey="exporterLabelComment"
        label="ETIQUETA EXPORTADOR"
        commentPlaceholder="Comentario sobre la etiqueta del precinto exportador"
      />
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
});
