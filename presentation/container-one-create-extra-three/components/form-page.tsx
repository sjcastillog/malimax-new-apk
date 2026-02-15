import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ContainerDetailsSection } from "./form/libs/ContainerDetailsSection";
import { ContainerSection } from "./form/libs/ContainerSection";
import { DriverSection } from "./form/libs/DriverSection";
import { ObservationSection } from "./form/libs/ObservationSection";

export const ContainerFormScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <ContainerSection />

      <ContainerDetailsSection />

      <DriverSection />

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
