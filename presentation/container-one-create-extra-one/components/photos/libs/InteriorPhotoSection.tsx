import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWorkflowStoreOneExtraOne } from "../../../store";
import { DynamicPhotosList } from "./DynamicPhotosList";
import { PhotoWithComment } from "./PhotoWithComment";

export const InteriorPhotosSection = () => {
  const addImage = useWorkflowStoreOneExtraOne((state) => state.addImage);

  const handleAddInteriorPhoto = () => {
    addImage("intern");
  };

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

      {/* SECCIÓN DE FOTOS ADICIONALES DINÁMICAS */}
      <View style={styles.dynamicSection}>
        <View style={styles.dynamicHeader}>
          <Text style={styles.dynamicTitle}>📸 Fotos Adicionales Internas</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddInteriorPhoto}
          >
            <Text style={styles.addButtonText}>+ Agregar</Text>
          </TouchableOpacity>
        </View>
        <DynamicPhotosList type="intern" />
      </View>
    </View>
  );
};

const FloorPhoto = () => (
  <PhotoWithComment
    photoIdKey="emptyFloorPhoto"
    commentKey="emptyFloorComment"
    label="PISO"
    commentPlaceholder="Comentario sobre el piso"
  />
);

const RoofPhoto = () => (
  <PhotoWithComment
    photoIdKey="emptyRoofPhoto"
    commentKey="emptyRoofComment"
    label="TECHO"
    commentPlaceholder="Comentario sobre el techo"
  />
);

const MirrorCoverPhoto = () => (
  <PhotoWithComment
    photoIdKey="emptyMirrorCoverPhoto"
    commentKey="emptyMirrorCoverComment"
    label="TAPA ESPEJO"
    commentPlaceholder="Comentario sobre la tapa del espejo"
  />
);

const InternalPhoto1 = () => (
  <PhotoWithComment
    photoIdKey="emptyInternalPhoto1"
    commentKey="emptyInternalComment1"
    label="INTERNA 1"
    commentPlaceholder="Comentario sobre foto interna 1"
  />
);

const InternalPhoto2 = () => (
  <PhotoWithComment
    photoIdKey="emptyInternalPhoto2"
    commentKey="emptyInternalComment2"
    label="INTERNA 2"
    commentPlaceholder="Comentario sobre foto interna 2"
  />
);

const InternalPhoto3 = () => (
  <PhotoWithComment
    photoIdKey="emptyInternalPhoto3"
    commentKey="emptyInternalComment3"
    label="INTERNA 3"
    commentPlaceholder="Comentario sobre foto interna 3"
  />
);

const InternalPhoto4 = () => (
  <PhotoWithComment
    photoIdKey="emptyInternalPhoto4"
    commentKey="emptyInternalComment4"
    label="INTERNA 4"
    commentPlaceholder="Comentario sobre foto interna 4"
  />
);

const InternalPhoto5 = () => (
  <PhotoWithComment
    photoIdKey="emptyInternalPhoto5"
    commentKey="emptyInternalComment5"
    label="INTERNA 5"
    commentPlaceholder="Comentario sobre foto interna 5"
  />
);

const InternalPhoto6 = () => (
  <PhotoWithComment
    photoIdKey="emptyInternalPhoto6"
    commentKey="emptyInternalComment6"
    label="INTERNA 6"
    commentPlaceholder="Comentario sobre foto interna 6"
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
  dynamicSection: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  dynamicHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  dynamicTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#52c41a",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
