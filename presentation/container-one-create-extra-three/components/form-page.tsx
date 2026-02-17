import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CanLeaderSection } from "./form/libs/CanLeaderSection";
import { ClientSection } from "./form/libs/ClientSection";
import { ContainerDetailsSection } from "./form/libs/ContainerDetailsSection";
import { ContainerSection } from "./form/libs/ContainerSection";
import { DateSection } from "./form/libs/DateSection";
import { DriverSection } from "./form/libs/DriverSection";
import { InspectionSection } from "./form/libs/InspectionSection";
import { ObservationSection } from "./form/libs/ObservationSection";
import { SupervisorsSection } from "./form/libs/SupervisorsSection";
import { TypeServiceSection } from "./form/libs/TypeServiceSection";

export const ContainerFormScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* SECCIÓN 1: DATOS BÁSICOS DEL CONTENEDOR */}
      <ContainerSection />

      {/* SELECCIÓN DE CLIENTE */}
      <ClientSection />

      {/* SECCIÓN 2: TIPO DE SERVICIO Y FECHA */}
      <TypeServiceSection />
      <DateSection />

      {/* SECCIÓN 3: CAN(ES) Y GUÍA(S) */}
      <CanLeaderSection />

      {/* SECCIÓN 4: DETALLES DEL CONTENEDOR */}
      <ContainerDetailsSection />

      {/* SECCIÓN 5: SUPERVISORES Y ASOCIADOS */}
      <SupervisorsSection />

      {/* SECCIÓN 6: INSPECCIÓN */}
      <InspectionSection />

      {/* SECCIÓN 7: INFORMACIÓN DEL CONDUCTOR */}
      <DriverSection />

      {/* SECCIÓN 8: OBSERVACIONES */}
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
