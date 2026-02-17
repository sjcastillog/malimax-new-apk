import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  DocumentsSection,
  DoorSealsSection,
  ExitPhotosSection,
  ExteriorPhotosSection,
  InteriorPhotosSection,
} from "./photos";

export const FotosScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* 1. DOCUMENTOS */}
      <DocumentsSection />

      {/* 2. PUERTA SIN APERTURAR + MAQUINARIA */}
      <DoorSealsSection />

      {/* 3. FOTOS EXTERNAS + ADICIONALES DINÁMICAS */}
      <ExteriorPhotosSection />

      {/* 4. FOTOS INTERNAS + ADICIONALES DINÁMICAS */}
      <InteriorPhotosSection />

      {/* 5. SALIDA + SELLADO TEMPORAL */}
      <ExitPhotosSection />

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
