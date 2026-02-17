import { getAllCatalogueChildrenbyParentCode } from "@/core/catalogue/actions/get-all-catalogue-children-by-parent-code";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useWorkflowStoreOneExtraTwo } from "../../../store";

interface TypeServiceI {
  id: number;
  value: string;
  label: string;
}

export const ContainerDetailsSection = () => {
  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📦 DETALLE DE CONTENEDOR</Text>
      </View>
      <ContainerTypeField />
      <LocationDetails />
    </>
  );
};

const ContainerTypeField = () => {
  const code = process.env.EXPO_PUBLIC_CONTAINER_TYPES_CODE ?? "CONTAINER_TYPE";
  const typeContainer = useWorkflowStoreOneExtraTwo(
    (state) => state.typeContainer,
  );
  const setTypeContainer = useWorkflowStoreOneExtraTwo(
    (state) => state.setTypeContainer,
  );
  const [containerTypes, setTypeServiceOptions] = useState<TypeServiceI[]>([]);

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
      <Text style={styles.label}>Tipo de Contenedor</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={setTypeContainer}
          items={containerTypes}
          value={typeContainer}
          placeholder={{ label: "Seleccione tipo de contenedor", value: null }}
          style={pickerStyles}
          useNativeAndroidPickerStyle={false}
        />
      </View>
    </View>
  );
};

const LocationDetails = () => {
  const city = useWorkflowStoreOneExtraTwo((state) => state.city);
  const setCity = useWorkflowStoreOneExtraTwo((state) => state.setCity);
  const address = useWorkflowStoreOneExtraTwo((state) => state.address);
  const setAddress = useWorkflowStoreOneExtraTwo((state) => state.setAddress);
  const storageName = useWorkflowStoreOneExtraTwo((state) => state.storageName);
  const setStorageName = useWorkflowStoreOneExtraTwo(
    (state) => state.setStorageName,
  );
  const workplace = useWorkflowStoreOneExtraTwo((state) => state.workplace);
  const setWorkplace = useWorkflowStoreOneExtraTwo(
    (state) => state.setWorkplace,
  );

  return (
    <>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre de Patio o Acopio</Text>
        <TextInput
          style={styles.input}
          value={storageName}
          onChangeText={(text) => setStorageName(text.toUpperCase())}
          placeholder="Nombre del patio"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Lugar de Trabajo</Text>
        <TextInput
          style={styles.input}
          value={workplace || ""}
          onChangeText={(text) => setWorkplace(text.toUpperCase())}
          placeholder="Lugar donde se realiza la inspección"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>📍 Ciudad</Text>
        <TextInput
          style={styles.input}
          value={city || ""}
          onChangeText={(text) => setCity(text.toUpperCase())}
          placeholder="Ciudad"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={(text) => setAddress(text.toUpperCase())}
          placeholder="Dirección completa"
          placeholderTextColor="#999"
        />
      </View>
    </>
  );
};

const pickerStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingRight: 40,
  },
  inputIOS: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingRight: 40,
  },
  placeholder: {
    color: "#999",
    fontSize: 14,
    fontWeight: "400",
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fafafa",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000080",
  },
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
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
});
