import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PhotoWithComment } from "./PhotoWithComment";

export const ContainerFullSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📦 CONTENEDOR FULL</Text>
      </View>

      {/* Foto Panorámica */}
      <ContainerPanoramicPhoto />

      {/* Sección Naviera */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🏢 SELLO NAVIERA</Text>
        </View>
        <NavieraBottlePhoto />
        <NavieraWirePhoto />
        <NavieraLabelPhoto />
      </View>

      {/* Sección Exportador */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🚢 EXPORTADOR</Text>
        </View>
        <ExporterBottlePhoto />
        <ExporterWirePhoto />
        <ExporterLabelPhoto />
      </View>

      {/* Sección Otros */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>📋 OTROS</Text>
        </View>
        <OtherBottlePhoto />
        <OtherWirePhoto />
        <OtherLabelPhoto />
      </View>

      {/* Sección GPS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>📡 GPS</Text>
        </View>
        <GpsPhoto />
        <GpsStampPhoto />
      </View>
    </View>
  );
};

// FOTO PANORÁMICA CONTENEDOR
const ContainerPanoramicPhoto = () => (
  <PhotoWithComment
    photoIdKey="containerPanoramicPhoto"
    commentKey="containerPanoramicComment"
    label="FOTO PANORÁMICA"
    commentPlaceholder="Comentario sobre la panorámica del contenedor"
  />
);

// FOTOS NAVIERA
const NavieraBottlePhoto = () => (
  <PhotoWithComment
    photoIdKey="navieraBottlePhoto"
    commentKey="navieraBottleComment"
    label="BOTELLA NAVIERA"
    commentPlaceholder="Comentario sobre la botella"
  />
);

const NavieraWirePhoto = () => (
  <PhotoWithComment
    photoIdKey="navieraWirePhoto"
    commentKey="navieraWireComment"
    label="CABLE NAVIERA"
    commentPlaceholder="Comentario sobre el cable"
  />
);

const NavieraLabelPhoto = () => (
  <PhotoWithComment
    photoIdKey="navieraLabelPhoto"
    commentKey="navieraLabelComment"
    label="ETIQUETA NAVIERA"
    commentPlaceholder="Comentario sobre la etiqueta"
  />
);

// FOTOS EXPORTADOR
const ExporterBottlePhoto = () => (
  <PhotoWithComment
    photoIdKey="exporterBottlePhoto"
    commentKey="exporterBottleComment"
    label="BOTELLA EXPORTADOR"
    commentPlaceholder="Comentario sobre la botella"
  />
);

const ExporterWirePhoto = () => (
  <PhotoWithComment
    photoIdKey="exporterWirePhoto"
    commentKey="exporterWireComment"
    label="CABLE EXPORTADOR"
    commentPlaceholder="Comentario sobre el cable"
  />
);

const ExporterLabelPhoto = () => (
  <PhotoWithComment
    photoIdKey="exporterLabelPhoto"
    commentKey="exporterLabelComment"
    label="ETIQUETA EXPORTADOR"
    commentPlaceholder="Comentario sobre la etiqueta"
  />
);

// FOTOS OTRO
const OtherBottlePhoto = () => (
  <PhotoWithComment
    photoIdKey="otherBottlePhoto"
    commentKey="otherBottleComment"
    label="BOTELLA OTRO"
    commentPlaceholder="Comentario sobre la botella"
  />
);

const OtherWirePhoto = () => (
  <PhotoWithComment
    photoIdKey="otherWirePhoto"
    commentKey="otherWireComment"
    label="CABLE OTRO"
    commentPlaceholder="Comentario sobre el cable"
  />
);

const OtherLabelPhoto = () => (
  <PhotoWithComment
    photoIdKey="otherLabelPhoto"
    commentKey="otherLabelComment"
    label="ETIQUETA OTRO"
    commentPlaceholder="Comentario sobre la etiqueta"
  />
);

// FOTOS GPS
const GpsPhoto = () => (
  <PhotoWithComment
    photoIdKey="gpsPhoto"
    commentKey="gpsComment"
    label="FOTO GPS"
    commentPlaceholder="Comentario sobre el dispositivo GPS"
  />
);

const GpsStampPhoto = () => (
  <PhotoWithComment
    photoIdKey="gpsStampPhoto"
    commentKey="gpsStampComment"
    label="SELLO GPS"
    commentPlaceholder="Comentario sobre el sello GPS"
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
  section: {
    marginTop: 16,
    borderTopWidth: 2,
    borderTopColor: "#52c41a",
    borderStyle: "dashed",
    paddingTop: 8,
  },
  sectionHeader: {
    backgroundColor: "#f6ffed",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#52c41a",
  },
  sectionTitle: {
    color: "#52c41a",
    fontSize: 13,
    fontWeight: "bold",
  },
});