import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PhotoWithComment } from "./PhotoWithComment";

export const ExitPhotosSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          🚚 CONTENEDOR REVISADO RUMBO A FINCA
        </Text>
      </View>

      <ExitOtherSealPhoto />
      <ExitPanoramicPhoto />
      <ExitNavieraSealPhoto />
      <ExitSatelliteLockSealPhoto />
      <ExitEngineryPhoto1 />
      <ExitEngineryPhoto2 />
    </View>
  );
};

const ExitOtherSealPhoto = () => (
  <PhotoWithComment
    photoIdKey="exitOtherStampPhoto"
    commentKey="exitOtherStampComment"
    label="OTRO SELLO"
    commentPlaceholder="Comentario sobre otro sello"
  />
);

const ExitPanoramicPhoto = () => (
  <PhotoWithComment
    photoIdKey="exitPanoramicPhoto"
    commentKey="exitPanoramicComment"
    label="FOTO PANORÁMICA"
    commentPlaceholder="Comentario sobre la panorámica de salida"
  />
);

const ExitNavieraSealPhoto = () => (
  <PhotoWithComment
    photoIdKey="exitStampNavieraPhoto"
    commentKey="exitStampNavieraComment"
    label="SELLO NAVIERA"
    commentPlaceholder="Comentario sobre el sello de la naviera"
  />
);

const ExitSatelliteLockSealPhoto = () => (
  <PhotoWithComment
    photoIdKey="exitSatelliteLockStampPhoto"
    commentKey="exitSatelliteLockStampComment"
    label="SELLO CANDADO GPS"
    commentPlaceholder="Comentario sobre el sello del GPS"
  />
);

const ExitEngineryPhoto1 = () => (
  <PhotoWithComment
    photoIdKey="exitEngineryPhoto1"
    commentKey="exitEngineryComment1"
    label="INGENIERÍA 1"
    commentPlaceholder="Comentario sobre ingeniería 1"
  />
);

const ExitEngineryPhoto2 = () => (
  <PhotoWithComment
    photoIdKey="exitEngineryPhoto2"
    commentKey="exitEngineryComment2"
    label="INGENIERÍA 2"
    commentPlaceholder="Comentario sobre ingeniería 2"
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
});
