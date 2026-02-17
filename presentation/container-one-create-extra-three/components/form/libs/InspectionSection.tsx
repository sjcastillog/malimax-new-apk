import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useWorkflowStoreOneExtraThree } from "../../../store";

export const InspectionSection = () => {
  const inspectedWas = useWorkflowStoreOneExtraThree((state) => state.inspectedWas);
  const setInspectedWas = useWorkflowStoreOneExtraThree(
    (state) => state.setInspectedWas,
  );
  const inspectedBy = useWorkflowStoreOneExtraThree((state) => state.inspectedBy);
  const setInspectedBy = useWorkflowStoreOneExtraThree(
    (state) => state.setInspectedBy,
  );

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>¿Contenedor fue Inspeccionado?</Text>

      {/* Botones de selección modernos */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            inspectedWas === "No" && styles.toggleButtonActive,
          ]}
          onPress={() => setInspectedWas("No")}
        >
          <Text
            style={[
              styles.toggleText,
              inspectedWas === "No" && styles.toggleTextActive,
            ]}
          >
            ✓ No
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            styles.toggleButtonWarning,
            inspectedWas === "Si" && styles.toggleButtonWarningActive,
          ]}
          onPress={() => setInspectedWas("Si")}
        >
          <Text
            style={[
              styles.toggleText,
              inspectedWas === "Si" && styles.toggleTextWarningActive,
            ]}
          >
            ⚠️ Sí
          </Text>
        </TouchableOpacity>
      </View>

      {/* Campo condicional */}
      {inspectedWas === "Si" && (
        <View style={styles.conditionalContainer}>
          <View style={styles.alertBox}>
            <Text style={styles.alertIcon}>⚠️</Text>
            <Text style={styles.alertText}>
              Se requiere información adicional
            </Text>
          </View>

          <Text style={styles.label}>¿Quién inspeccionó el contenedor?</Text>
          <TextInput
            style={[styles.input, styles.highlightInput]}
            value={inspectedBy}
            onChangeText={(text) => setInspectedBy(text.toUpperCase())}
            placeholder="Nombre completo de la persona"
            placeholderTextColor="#999"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formGroup: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  toggleContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#d9d9d9",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  toggleButtonActive: {
    borderColor: "#52c41a",
    backgroundColor: "#f6ffed",
  },
  toggleButtonWarning: {
    borderColor: "#d9d9d9",
  },
  toggleButtonWarningActive: {
    borderColor: "#fa8c16",
    backgroundColor: "#fff7e6",
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  toggleTextActive: {
    color: "#52c41a",
  },
  toggleTextWarningActive: {
    color: "#fa8c16",
  },
  conditionalContainer: {
    marginTop: 16,
  },
  alertBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff7e6",
    borderLeftWidth: 4,
    borderLeftColor: "#fa8c16",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  alertIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  alertText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fa8c16",
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  highlightInput: {
    borderColor: "#ffa940",
    borderWidth: 2,
  },
});
