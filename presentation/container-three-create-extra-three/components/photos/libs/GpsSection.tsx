import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PhotoWithComment } from "./PhotoWithComment";

export const GpsSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📡 DISPOSITIVO GPS</Text>
      </View>

      <PhotoWithComment
        photoIdKey="gpsPhoto"
        commentKey="gpsComment"
        label="DISPOSITIVO GPS"
        commentPlaceholder="Comentario sobre el dispositivo GPS (estado, señal, instalación)"
      />

      <PhotoWithComment
        photoIdKey="gpsStampPhoto"
        commentKey="gpsStampComment"
        label="SELLO GPS"
        commentPlaceholder="Comentario sobre el sello del dispositivo GPS"
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
