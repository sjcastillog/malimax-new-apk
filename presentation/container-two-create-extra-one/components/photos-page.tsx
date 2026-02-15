import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ChargingProcessSection,
  ContainerFullSection,
} from "./photos";

export const FotosScreenTwo = () => {
  return (
    <ScrollView style={styles.container}>
      <ChargingProcessSection />
      <ContainerFullSection />
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