import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PhotoWithComment } from "./PhotoWithComment";

export const TemporarySealingSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🔒 SELLADO TEMPORAL</Text>
      </View>
      <View style={styles.content}>
        <TemporarySealingPhoto />
      </View>
    </View>
  );
};

const TemporarySealingPhoto = () => (
  <PhotoWithComment
    photoIdKey="exitTemporarySealingPhoto"
    commentKey="exitTemporarySealingComment"
    label="FOTO SELLADO TEMPORAL"
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
  content: {
    paddingHorizontal: 8,
  },
});
