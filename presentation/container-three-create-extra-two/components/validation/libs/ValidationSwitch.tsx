import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

interface ValidationSwitchProps {
  status: boolean;
  setStatus: (value: boolean) => void;
}

export const ValidationSwitch: React.FC<ValidationSwitchProps> = ({
  status,
  setStatus,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.switchRow}>
        <View
          style={[
            styles.labelContainer,
            styles.errorLabelContainer,
            !status && styles.activeLabelContainer,
          ]}
        >
          <Text
            style={[
              styles.labelText,
              styles.errorText,
              !status && styles.activeLabelText,
            ]}
          >
            ERROR 🆘
          </Text>
        </View>

        <Switch
          value={status}
          onValueChange={setStatus}
          trackColor={{ false: "#ff4d4f", true: "#52c41a" }}
          thumbColor={status ? "#fff" : "#fff"}
          ios_backgroundColor="#ff4d4f"
          style={styles.switch}
        />

        <View
          style={[
            styles.labelContainer,
            styles.successLabelContainer,
            status && styles.activeLabelContainer,
          ]}
        >
          <Text
            style={[
              styles.labelText,
              styles.successText,
              status && styles.activeLabelText,
            ]}
          >
            CORRECTO ✅
          </Text>
        </View>
      </View>

      <View style={styles.statusIndicator}>
        {status ? (
          <View style={styles.statusSuccess}>
            <Text style={styles.statusText}>✓ Validación Correcta</Text>
          </View>
        ) : (
          <View style={styles.statusError}>
            <Text style={styles.statusText}>⚠ Error Detectado</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 8,
  },
  labelContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 100,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  errorLabelContainer: {
    backgroundColor: "#fff1f0",
  },
  successLabelContainer: {
    backgroundColor: "#f6ffed",
  },
  activeLabelContainer: {
    borderColor: "#000080",
    backgroundColor: "#e6f7ff",
  },
  labelText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff4d4f",
  },
  successText: {
    color: "#52c41a",
  },
  activeLabelText: {
    color: "#000080",
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  statusIndicator: {
    marginTop: 12,
    alignItems: "center",
  },
  statusSuccess: {
    backgroundColor: "#f6ffed",
    borderWidth: 1,
    borderColor: "#b7eb8f",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  statusError: {
    backgroundColor: "#fff1f0",
    borderWidth: 1,
    borderColor: "#ffccc7",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
});