import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PhotoWithComment } from "./PhotoWithComment";

export const InteriorPhotosSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🏠 CONTENEDOR INTERIOR</Text>
      </View>

      <FloorPhoto />
      <RoofPhoto />
      <MirrorCoverPhoto />
      <InternalPhoto1 />
      <InternalPhoto2 />
      <InternalPhoto3 />
      <InternalPhoto4 />
      <InternalPhoto5 />
      <InternalPhoto6 />
    </View>
  );
};

const FloorPhoto = () => (
  <PhotoWithComment
    photoIdKey="emptyFloorPhoto"
    commentKey="emptyFloorComment"
    label="PISO"
    commentPlaceholder="Estado del piso del contenedor"
  />
);

const RoofPhoto = () => (
  <PhotoWithComment
    photoIdKey="emptyRoofPhoto"
    commentKey="emptyRoofComment"
    label="TECHO"
    commentPlaceholder="Estado del techo del contenedor"
  />
);

const MirrorCoverPhoto = () => (
  <PhotoWithComment
    photoIdKey="emptyMirrorCoverPhoto"
    commentKey="emptyMirrorCoverComment"
    label="TAPA ESPEJO"
    commentPlaceholder="Estado de la tapa del espejo"
  />
);

const InternalPhoto1 = () => (
  <PhotoWithComment
    photoIdKey="emptyInternalPhoto1"
    commentKey="emptyInternalComment1"
    label="INTERNA 1"
    commentPlaceholder="Comentario foto interna 1"
  />
);

const InternalPhoto2 = () => (
  <PhotoWithComment
    photoIdKey="emptyInternalPhoto2"
    commentKey="emptyInternalComment2"
    label="INTERNA 2"
    commentPlaceholder="Comentario foto interna 2"
  />
);

const InternalPhoto3 = () => (
  <PhotoWithComment
    photoIdKey="emptyInternalPhoto3"
    commentKey="emptyInternalComment3"
    label="INTERNA 3"
    commentPlaceholder="Comentario foto interna 3"
  />
);

const InternalPhoto4 = () => (
  <PhotoWithComment
    photoIdKey="emptyInternalPhoto4"
    commentKey="emptyInternalComment4"
    label="INTERNA 4"
    commentPlaceholder="Comentario foto interna 4"
  />
);

const InternalPhoto5 = () => (
  <PhotoWithComment
    photoIdKey="emptyInternalPhoto5"
    commentKey="emptyInternalComment5"
    label="INTERNA 5"
    commentPlaceholder="Comentario foto interna 5"
  />
);

const InternalPhoto6 = () => (
  <PhotoWithComment
    photoIdKey="emptyInternalPhoto6"
    commentKey="emptyInternalComment6"
    label="INTERNA 6"
    commentPlaceholder="Comentario foto interna 6"
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
