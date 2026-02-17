import { getAllCatalogueChildrenbyParentCode } from "@/core/catalogue/actions/get-all-catalogue-children-by-parent-code";
import { useWorkflowStoreOneExtraOne } from "../../../store";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface TypeServiceI {
  id: number;
  value: string;
  label: string;
}
export const TypeServiceSection = () => {
  const code = process.env.EXPO_PUBLIC_TYPE_SERVICES_MALIMAX_CODE ?? "TYPE";
  const [typeServiceOptions, setTypeServiceOptions] = useState<TypeServiceI[]>(
    [],
  );
  const typeService = useWorkflowStoreOneExtraOne((state) => state.typeService);
  const setTypeService = useWorkflowStoreOneExtraOne(
    (state) => state.setTypeService,
  );

  useEffect(() => {
    handleGetLeaders();
  }, []);

  const handleGetLeaders = async () => {
    try {
      const response = await getAllCatalogueChildrenbyParentCode(code);
      if (!response) return;
      setTypeServiceOptions(
        response.map((el) => ({ id: el.id, value: el.name, label: el.name })),
      );
    } catch (error: any) {
      console.error("Error cargando CAN:", error);
      Alert.alert("Error", "No se pudieron cargar los Tipos de Servicio");
    }
  };

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
