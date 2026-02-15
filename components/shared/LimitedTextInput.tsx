import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";

interface LimitedTextInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  maxLength: number;
  label?: string;
  showCounter?: boolean;
  warningThreshold?: number; // Porcentaje para mostrar warning (default: 0.8)
}

export const LimitedTextInput: React.FC<LimitedTextInputProps> = ({
  value,
  onChangeText,
  maxLength,
  label,
  showCounter = true,
  warningThreshold = 0.8,
  ...props
}) => {
  const currentLength = value?.length || 0;
  const percentage = currentLength / maxLength;
  const isWarning = percentage >= warningThreshold;
  const isError = percentage >= 1;

  const getCounterColor = () => {
    if (isError) return "#ff4d4f"; // Rojo
    if (isWarning) return "#faad14"; // Naranja
    return "#999"; // Gris
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        style={[
          styles.input,
          props.style,
          isError && styles.inputError,
          isWarning && styles.inputWarning,
        ]}
      />

      {showCounter && (
        <View style={styles.counterContainer}>
          <Text style={[styles.counter, { color: getCounterColor() }]}>
            {currentLength} / {maxLength}
          </Text>
          {isError && <Text style={styles.errorText}>⚠️ Límite alcanzado</Text>}
          {isWarning && !isError && (
            <Text style={styles.warningText}>⚠️ Cerca del límite</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  inputWarning: {
    borderColor: "#faad14",
    backgroundColor: "#fffbf0",
  },
  inputError: {
    borderColor: "#ff4d4f",
    backgroundColor: "#fff2f0",
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    paddingHorizontal: 4,
  },
  counter: {
    fontSize: 11,
    fontWeight: "500",
  },
  warningText: {
    fontSize: 10,
    color: "#faad14",
    fontWeight: "600",
  },
  errorText: {
    fontSize: 10,
    color: "#ff4d4f",
    fontWeight: "600",
  },
});
