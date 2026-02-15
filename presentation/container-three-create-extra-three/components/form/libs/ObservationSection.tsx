import { LimitedTextInput } from "@/components/shared/LimitedTextInput";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useWorkflowStoreThreeExtraThree } from "../../../store";

export const ObservationSection = () => {
  const observation = useWorkflowStoreThreeExtraThree(
    (state) => state.observation,
  );
  const setObservation = useWorkflowStoreThreeExtraThree(
    (state) => state.setObservation,
  );

  return (
    <View style={styles.container}>
      <LimitedTextInput
        label="Observaciones Generales"
        value={observation || ""}
        onChangeText={setObservation}
        maxLength={500}
        placeholder="Ingrese observaciones, comentarios o notas adicionales..."
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
