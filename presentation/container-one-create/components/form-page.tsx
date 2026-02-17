import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CanLeaderSection } from "./form/libs/CanLeaderSection";
import { ClientSection } from "./form/libs/ClientSection"; // ✨ NUEVO
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
      {/* INICIO DE PROCESO + CONTENEDOR */}
      <ContainerSection />

      {/* SELECCIÓN DE CLIENTE */}
      <ClientSection />

      {/* TIPO DE SERVICIO */}
      <TypeServiceSection />

      {/* FECHA */}
      <DateSection />

      {/* CAN + LEADER */}
      <CanLeaderSection />

      {/* DETALLES DEL CONTENEDOR */}
      <ContainerDetailsSection />

      {/* SUPERVISORES */}
      <SupervisorsSection />

      {/* INSPECCIÓN */}
      <InspectionSection />

      {/* CONDUCTOR */}
      <DriverSection />

      {/* OBSERVACIONES */}
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
