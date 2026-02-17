import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  DynamicPhotosSection,
  ExporterSealsSection,
  GpsSection,
  NavieraSealsSection,
  OtherSealsSection,
  PanoramicSection,
} from "./photos/";

export const FotosScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* 1. FOTO PANORÁMICA */}
      <PanoramicSection />

      {/* 2. PRECINTOS NAVIERA */}
      <NavieraSealsSection />

      {/* 3. PRECINTOS EXPORTADOR */}
      <ExporterSealsSection />

      {/* 4. PRECINTOS ADICIONALES */}
      <OtherSealsSection />

      {/* 5. GPS */}
      <GpsSection />

      {/* 6. FOTOS DINÁMICAS */}
      <DynamicPhotosSection />

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
