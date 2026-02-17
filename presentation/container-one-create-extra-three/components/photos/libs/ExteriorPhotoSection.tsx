import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWorkflowStoreOneExtraThree } from "../../../store";
import { DynamicPhotosList } from "./DynamicPhotosList";
import { PhotoButton } from "./PhotoButton";

export const ExteriorPhotosSection = () => {
  const addImage = useWorkflowStoreOneExtraThree((state) => state.addImage);

  const handleAddExteriorPhoto = () => {
    addImage("aditional");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📦 FOTOS EXTERNAS</Text>
      </View>

      <View style={styles.grid}>
        <SideRightPhoto />
        <SideLeftPhoto />
        <SideUpPhoto />
        <SideDownPhoto />
        <FrontPhoto />
        <RearPhoto />
      </View>

      {/* SECCIÓN DE FOTOS ADICIONALES DINÁMICAS */}
      <View style={styles.dynamicSection}>
        <View style={styles.dynamicHeader}>
          <Text style={styles.dynamicTitle}>📸 Fotos Adicionales Externas</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddExteriorPhoto}
          >
            <Text style={styles.addButtonText}>+ Agregar</Text>
          </TouchableOpacity>
        </View>
        <DynamicPhotosList type="aditional" />
      </View>
    </View>
  );
};

const SideRightPhoto = () => (
  <PhotoButton photoIdKey="emptySideRightPhoto" label="LADO DERECHO" />
);

const SideLeftPhoto = () => (
  <PhotoButton photoIdKey="emptySideLeftPhoto" label="LADO IZQUIERDO" />
);

const SideUpPhoto = () => (
  <PhotoButton photoIdKey="emptySideUpPhoto" label="ARRIBA" />
);

const SideDownPhoto = () => (
  <PhotoButton photoIdKey="emptySideDownPhoto" label="ABAJO" />
);

const FrontPhoto = () => (
  <PhotoButton photoIdKey="emptyFrontPhoto" label="FRONTAL" />
);

const RearPhoto = () => (
  <PhotoButton photoIdKey="emptyRearPhoto" label="POSTERIOR" />
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
    gap: 8,
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
