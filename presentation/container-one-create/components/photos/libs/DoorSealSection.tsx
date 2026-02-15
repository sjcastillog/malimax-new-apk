import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PhotoWithComment } from "./PhotoWithComment";

export const DoorSealsSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          🔒 PUERTA CONTENEDOR SIN APERTURAR
        </Text>
      </View>

      <PanoramicPhoto />

      <SealNavieraPhoto />

      <SealAdicionalPhoto />

      <OtherSealPhoto />

      <SatelliteLockPhoto />

      <SatelliteLockSealPhoto />
    </View>
  );
};

const PanoramicPhoto = () => (
  <PhotoWithComment
    photoIdKey="emptyPanoramicPhoto"
    commentKey="emptyPanoramicComment"
    label="FOTO PANORÁMICA"
    commentPlaceholder="Comentario sobre la foto panorámica"
  />
);

const SealNavieraPhoto = () => (
  <PhotoWithComment
    photoIdKey="emptyStampNavieraPhoto"
    commentKey="emptyStampNavieraComment"
    label="SELLO NAVIERA"
    commentPlaceholder="Comentario sobre el sello de la naviera"
  />
);

const SealAdicionalPhoto = () => (
  <PhotoWithComment
    photoIdKey="emptyAditionalStampPhoto"
    commentKey="emptyAditionalStampComment"
    label="SELLO ADICIONAL"
    commentPlaceholder="Comentario sobre el sello adicional"
  />
);

const OtherSealPhoto = () => (
  <PhotoWithComment
    photoIdKey="emptyOtherStampPhoto"
    commentKey="emptyOtherStampComment"
    label="OTRO SELLO"
    commentPlaceholder="Comentario sobre otro sello"
  />
);

const SatelliteLockPhoto = () => (
  <PhotoWithComment
    photoIdKey="emptySatelliteLockPhoto"
    commentKey="emptySatelliteLockComment"
    label="CANDADO SATELITAL"
    commentPlaceholder="Comentario sobre el candado satelital"
  />
);

const SatelliteLockSealPhoto = () => (
  <PhotoWithComment
    photoIdKey="emptySatelliteLockStampPhoto"
    commentKey="emptySatelliteLockStampComment"
    label="SELLO CANDADO GPS"
    commentPlaceholder="Comentario sobre el sello del GPS"
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
