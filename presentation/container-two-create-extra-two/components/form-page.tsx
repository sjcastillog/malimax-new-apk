import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ContainerSection } from "./form/libs/ContainerSection";
import { ObservationSection } from "./form/libs/ObservationSection";
import { ProductSection } from "./form/libs/ProductSection";
import { SamplingSection } from "./form/libs/SamplingSection";

export const ContainerFormScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* SECCIÓN 1: DATOS DEL PROCESO 1 (READONLY) */}
      <ContainerSection />

      {/* SECCIÓN 2: INFORMACIÓN DEL PRODUCTO */}
      <ProductSection />

      {/* SECCIÓN 3: DATOS DE MUESTREO */}
      <SamplingSection />

      {/* SECCIÓN 4: OBSERVACIONES */}
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
