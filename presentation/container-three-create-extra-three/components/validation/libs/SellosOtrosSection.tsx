import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ValidationItemSection } from "./ValidationItemSection";

export const SelloOtrosSection = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>📋 OTROS SELLOS</Text>
      </View>

      {/* Botella Otro */}
      <ValidationItemSection
        photoIdKey="otherBottleCheckPhoto"
        validationPhotoKey="otherBottlePhoto"
        statusKey="otherBottleStatus"
        commentKey="otherBottleComment"
        label="SELLO BOTELLA OTRO"
        isVideo={false}
      />

      {/* Cable Otro */}
      <ValidationItemSection
        photoIdKey="otherWireCheckPhoto"
        validationPhotoKey="otherWirePhoto"
        statusKey="otherWireStatus"
        commentKey="otherWireComment"
        label="SELLO CABLE OTRO"
        isVideo={false}
      />

      {/* Etiqueta Otro */}
      <ValidationItemSection
        photoIdKey="otherLabelCheckPhoto"
        validationPhotoKey="otherLabelPhoto"
        statusKey="otherLabelStatus"
        commentKey="otherLabelComment"
        label="SELLO ETIQUETA OTRO"
        isVideo={false}
      />
    </View>
  );
};

export const GpsSection = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>📡 GPS</Text>
      </View>

      {/* GPS */}
      <ValidationItemSection
        photoIdKey="gpsCheckPhoto"
        validationPhotoKey="gpsPhoto"
        statusKey="gpsStatus"
        commentKey="gpsComment"
        label="GPS"
        isVideo={false}
      />

      {/* Sello GPS */}
      <ValidationItemSection
        photoIdKey="gpsStampCheckPhoto"
        validationPhotoKey="gpsStampPhoto"
        statusKey="gpsStampStatus"
        commentKey="gpsStampComment"
        label="SELLO GPS"
        isVideo={false}
      />
    </View>
  );
};

export const MaquinariaSection = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>⚙️ MAQUINARIA</Text>
      </View>

      {/* Maquinaria 1 */}
      <ValidationItemSection
        photoIdKey="engineryCheckPhoto1"
        validationPhotoKey="engineryPhoto1"
        statusKey="engineryStatus1"
        commentKey="engineryComment1"
        label="FOTO MAQUINARIA 1"
        isVideo={false}
      />

      {/* Maquinaria 2 */}
      <ValidationItemSection
        photoIdKey="engineryCheckPhoto2"
        validationPhotoKey="engineryPhoto2"
        statusKey="engineryStatus2"
        commentKey="engineryComment2"
        label="FOTO MAQUINARIA 2"
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
