import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useWorkflowStoreOneExtraOne } from "../../../store";

export const DriverSection = () => {
  const driverName = useWorkflowStoreOneExtraOne((state) => state.driverName);
  const setDriverName = useWorkflowStoreOneExtraOne(
    (state) => state.setDriverName,
  );
  const driverIdentification = useWorkflowStoreOneExtraOne(
    (state) => state.driverIdentification,
  );
  const setDriverIdentification = useWorkflowStoreOneExtraOne(
    (state) => state.setDriverIdentification,
  );
  const plateVehicle = useWorkflowStoreOneExtraOne(
    (state) => state.plateVehicle,
  );
  const setPlateVehicle = useWorkflowStoreOneExtraOne(
    (state) => state.setPlateVehicle,
  );
  const companyTransport = useWorkflowStoreOneExtraOne(
    (state) => state.companyTransport,
  );
  const setCompanyTransport = useWorkflowStoreOneExtraOne(
    (state) => state.setCompanyTransport,
  );

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚛 INFORMACIÓN DEL CONDUCTOR</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre Completo</Text>
        <TextInput
          style={styles.input}
          value={driverName}
          onChangeText={(text) => setDriverName(text.toUpperCase())}
          placeholder="Nombres del conductor"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Cédula de Identidad</Text>
        <TextInput
          style={styles.input}
          value={driverIdentification}
          onChangeText={setDriverIdentification}
          placeholder="Número de cédula"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Compañía de Transporte</Text>
        <TextInput
          style={styles.input}
          value={companyTransport || ""}
          onChangeText={(text) => setCompanyTransport(text.toUpperCase())}
          placeholder="Nombre de la compañía"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Placa Vehicular</Text>
        <TextInput
          style={styles.input}
          value={plateVehicle}
          onChangeText={(text) => setPlateVehicle(text.trim().toUpperCase())}
          placeholder="ABC-1234"
          placeholderTextColor="#999"
          autoCapitalize="characters"
        />
      </View>
    </>
  );
};

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
    color: "#fa8c16",
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
});
