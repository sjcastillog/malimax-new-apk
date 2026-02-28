import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useWorkflowStoreOneZero } from "../../../store";
import { useTypesService } from "@/common/hooks/libs/useTypesService";

interface TypeServiceI {
  id: number;
  value: string;
  label: string;
}
export const TypeServiceSection = () => {
  const typeService = useWorkflowStoreOneZero((state) => state.typeService);
  const setTypeService = useWorkflowStoreOneZero(
    (state) => state.setTypeService,
  );
  const { typesServiceQuery } = useTypesService();
  const typeServiceOptions = React.useMemo(() => {
    return (typesServiceQuery.data ?? []).map((el) => ({
      id: el.id,
      value: el.name,
      label: el.name,
    }));
  }, [typesServiceQuery.data]);

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>Tipo de Servicio</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={setTypeService}
          items={typeServiceOptions}
          value={typeService}
          placeholder={{
            label: "Seleccione tipo de servicio",
            value: null,
            color: "#999", // ✨ Color del placeholder
          }}
          style={{
            ...pickerStyles,
            placeholder: {
              color: "#999",
              fontSize: 14,
              fontWeight: "400", // ✨ Normal weight para placeholder
            },
          }}
          useNativeAndroidPickerStyle={false}
          // Icon={() => (
          //   <Ionicons
          //     name="chevron-down"
          //     size={20}
          //     color="#666"
          //     style={styles.icon}
          //   />
          // )}
        />
      </View>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  icon: {
    position: "absolute",
    right: 12,
    top: 2,
  },
});

const pickerStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 14,
    fontWeight: "400", // ✨ Normal weight
    color: "#000",
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingRight: 40, // Espacio para el icono
  },
  inputIOS: {
    fontSize: 14,
    fontWeight: "400", // ✨ Normal weight
    color: "#000",
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingRight: 40, // Espacio para el icono
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});
