import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PhotoButton } from "./PhotoButton";

export const ExteriorPhotosSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📦 FOTOS EXTERNAS</Text>
      </View>

      <View style={styles.photoGrid}>
        <PhotoButton photoIdKey="emptySideRightPhoto" label="LADO DERECHO" />
        <PhotoButton photoIdKey="emptySideLeftPhoto" label="LADO IZQUIERDO" />
        <PhotoButton photoIdKey="emptySideUpPhoto" label="ARRIBA" />
        <PhotoButton photoIdKey="emptySideDownPhoto" label="ABAJO" />
        <PhotoButton photoIdKey="emptyFrontPhoto" label="FRONTAL" />
        <PhotoButton photoIdKey="emptyRearPhoto" label="POSTERIOR" />
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
