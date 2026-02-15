import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ContainerDetailsSection,
  ContainerSection,
  DriverSection,
  ObservationSection,
} from "./form";

export const ContainerFormScreenThree = () => {
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
