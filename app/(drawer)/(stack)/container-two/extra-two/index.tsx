import { ButtonClean } from "@/presentation/container-two-create-extra-two/components/clear-button";
import { ContainerFormScreen } from "@/presentation/container-two-create-extra-two/components/form-page";
import { FotosScreen } from "@/presentation/container-two-create-extra-two/components/photos-page";
import { SaveButton } from "@/presentation/container-two-create-extra-two/components/save-button";
import WorkflowSimulator from "@/presentation/container-two-create-extra-two/components/simulator";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ContainerTwo = () => {
  const [option, setOption] = useState(0);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.subheader}>
          <View style={styles.headerButtons}>
            <ButtonClean />
            <WorkflowSimulator />
            <SaveButton />
          </View>
        </View>
        <SegmentedControl
          values={["Formulario", "Fotos", "Validación"]}
          selectedIndex={option}
          onChange={(event) => {
            setOption(event.nativeEvent.selectedSegmentIndex);
          }}
        />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}
      >
        <View
          style={{
            flex: 1,
            paddingTop: 0,
            paddingBottom: 5,
            paddingHorizontal: 5,
          }}
        >
          {option === 0 && <ContainerFormScreen />}
          {option === 1 && <FotosScreen />}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  subheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 5,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 0,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});

export default ContainerTwo;
