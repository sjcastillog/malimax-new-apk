import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CheckContenedorSection } from "./validation/libs/CheckContenedorSection";
import { SelloExportadorSection } from "./validation/libs/SelloExportadorSection";
import { SelloNavieraSection } from "./validation/libs/SelloNavieraSection";
import {
  GpsSection,
  MaquinariaSection,
  SelloOtrosSection,
} from "./validation/libs/SellosOtrosSection";

export const FotosScreenThree = () => {
  return (
    <ScrollView style={styles.container}>
      <CheckContenedorSection />
      <SelloNavieraSection />
      <SelloExportadorSection />
      <SelloOtrosSection />
      <GpsSection />
      <MaquinariaSection />
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
