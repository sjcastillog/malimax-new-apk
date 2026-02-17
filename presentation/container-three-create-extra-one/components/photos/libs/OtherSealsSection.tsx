import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PhotoWithComment } from "./PhotoWithComment";

export const OtherSealsSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🔒 PRECINTOS ADICIONALES</Text>
      </View>

      <PhotoWithComment
        photoIdKey="otherBottlePhoto"
        commentKey="otherBottleComment"
        label="BOTELLA ADICIONAL"
        commentPlaceholder="Comentario sobre la botella del precinto adicional"
      />

      <PhotoWithComment
        photoIdKey="otherWirePhoto"
        commentKey="otherWireComment"
        label="CABLE ADICIONAL"
        commentPlaceholder="Comentario sobre el cable del precinto adicional"
      />

      <PhotoWithComment
        photoIdKey="otherLabelPhoto"
        commentKey="otherLabelComment"
        label="ETIQUETA ADICIONAL"
        commentPlaceholder="Comentario sobre la etiqueta del precinto adicional"
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
