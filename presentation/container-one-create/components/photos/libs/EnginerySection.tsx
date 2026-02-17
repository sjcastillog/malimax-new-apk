import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PhotoWithComment } from "./PhotoWithComment";

export const EngineryPhotosSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🔧 MAQUINARIA</Text>
      </View>
      <View style={styles.content}>
        <EngineryPhoto1 />
        <EngineryPhoto2 />
      </View>
    </View>
  );
};

const EngineryPhoto1 = () => (
  <PhotoWithComment
    photoIdKey="engineryPhoto1"
    commentKey="engineryComment1"
    label="MAQUINARIA 1"
    commentPlaceholder="Comentario sobre la maquinaria 1"
  />
);

const EngineryPhoto2 = () => (
  <PhotoWithComment
    photoIdKey="engineryPhoto2"
    commentKey="engineryComment2"
    label="MAQUINARIA 2"
    commentPlaceholder="Comentario sobre la maquinaria 2"
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
