import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ContainerSection, EntryPortSection, ObservationSection } from "./form";

export const ContainerFormScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* SECCIÓN 1: DATOS DEL PROCESO 2 (READONLY) */}
      <ContainerSection />

      {/* SECCIÓN 2: PUERTO DE INGRESO */}
      <EntryPortSection />

      {/* SECCIÓN 3: OBSERVACIONES */}
      <ObservationSection />

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
