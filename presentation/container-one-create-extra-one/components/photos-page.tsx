import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  DocumentsSection,
  DoorSealsSection,
  DynamicPhotosSection,
  ExitPhotosSection,
  ExteriorPhotosSection,
  InteriorPhotosSection,
} from "./photos";

export const FotosScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <DocumentsSection />

      <DoorSealsSection />

      <ExteriorPhotosSection />

      <InteriorPhotosSection />

      <ExitPhotosSection />

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
