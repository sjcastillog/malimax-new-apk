import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ValidationItemSection } from "./ValidationItemSection";

export const SelloNavieraSection = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>🏢 SELLO NAVIERA</Text>
      </View>

      {/* Botella Naviera */}
      <ValidationItemSection
        photoIdKey="navieraBottleCheckPhoto"
        validationPhotoKey="navieraBottlePhoto"
        statusKey="navieraBottleStatus"
        commentKey="navieraBottleComment"
        label="SELLO BOTELLA NAVIERA"
        isVideo={false}
      />

      {/* Cable Naviera */}
      <ValidationItemSection
        photoIdKey="navieraWireCheckPhoto"
        validationPhotoKey="navieraWirePhoto"
        statusKey="navieraWireStatus"
        commentKey="navieraWireComment"
        label="SELLO CABLE NAVIERA"
        isVideo={false}
      />

      {/* Etiqueta Naviera */}
      <ValidationItemSection
        photoIdKey="navieraLabelCheckPhoto"
        validationPhotoKey="navieraLabelPhoto"
        statusKey="navieraLabelStatus"
        commentKey="navieraLabelComment"
        label="SELLO ETIQUETA NAVIERA"
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
