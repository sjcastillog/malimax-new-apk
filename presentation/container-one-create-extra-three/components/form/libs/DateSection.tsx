import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useWorkflowStoreOneExtraThree } from "../../../store";

export const DateSection = () => {
  const date = useWorkflowStoreOneExtraThree((state) => state.date);
  const setDate = useWorkflowStoreOneExtraThree((state) => state.setDate);
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      setDate(dateString);
    }
  };

  const formatDateDisplay = (dateString: string | null) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>Fecha</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <View pointerEvents="none">
          <TextInput
            style={styles.input}
            value={formatDateDisplay(date)}
            placeholder="Seleccione fecha"
            placeholderTextColor="#999"
            editable={false}
          />
        </View>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date ? new Date(date) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
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
  input: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
    color: "#000",
  },
});
