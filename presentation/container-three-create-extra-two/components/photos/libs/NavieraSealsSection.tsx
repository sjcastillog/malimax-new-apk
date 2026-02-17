import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PhotoWithComment } from "./PhotoWithComment";

export const NavieraSealsSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🔒 PRECINTOS NAVIERA</Text>
      </View>

      <PhotoWithComment
        photoIdKey="navieraBottlePhoto"
        commentKey="navieraBottleComment"
        label="BOTELLA NAVIERA"
        commentPlaceholder="Comentario sobre la botella del precinto naviera"
      />

      <PhotoWithComment
        photoIdKey="navieraWirePhoto"
        commentKey="navieraWireComment"
        label="CABLE NAVIERA"
        commentPlaceholder="Comentario sobre el cable del precinto naviera"
      />

      <PhotoWithComment
        photoIdKey="navieraLabelPhoto"
        commentKey="navieraLabelComment"
        label="ETIQUETA NAVIERA"
        commentPlaceholder="Comentario sobre la etiqueta del precinto naviera"
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
