import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { DynamicPhotosSection } from "./photos";

export const FotosScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* SOLO FOTOS DINÁMICAS */}
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
