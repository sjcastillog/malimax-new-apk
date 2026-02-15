import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useWorkflowStoreThreeExtraOne } from "../../../store";

export const ContainerDetailsSection = () => {
  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔒 VALIDACIÓN DE SELLO</Text>
      </View>
      <LabelSerial />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📦 DETALLE DE CONTENEDOR</Text>
      </View>
      <ContainerOpened />
      <NavieraTypeSize />
      <LocationDetails />
    </>
  );
};

const LabelSerial = () => {
  const labelSerial = useWorkflowStoreThreeExtraOne((state) => state.labelSerial);
  const setLabelSerial = useWorkflowStoreThreeExtraOne(
    (state) => state.setLabelSerial,
  );

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>N° Etiqueta / Serial</Text>
      <TextInput
        style={styles.input}
        value={labelSerial || ""}
        onChangeText={(text) => setLabelSerial(text.toUpperCase())}
        placeholder="Ingrese número de etiqueta"
        placeholderTextColor="#999"
      />
    </View>
  );
};

const ContainerOpened = () => {
  const openedWas = useWorkflowStoreThreeExtraOne((state) => state.openedWas);
  const setOpenedWas = useWorkflowStoreThreeExtraOne((state) => state.setOpenedWas);
  const openedBy = useWorkflowStoreThreeExtraOne((state) => state.openedBy);
  const setOpenedBy = useWorkflowStoreThreeExtraOne((state) => state.setOpenedBy);

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>¿Contenedor fue abierto?</Text>
      
      {/* Botones de selección modernos */}
      <View style={modernStyles.toggleContainer}>
        <TouchableOpacity
          style={[
            modernStyles.toggleButton,
            openedWas === "No" && modernStyles.toggleButtonActive,
          ]}
          onPress={() => setOpenedWas("No")}
        >
          <Text
            style={[
              modernStyles.toggleText,
              openedWas === "No" && modernStyles.toggleTextActive,
            ]}
          >
            ✓ No
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            modernStyles.toggleButton,
            modernStyles.toggleButtonWarning,
            openedWas === "Si" && modernStyles.toggleButtonWarningActive,
          ]}
          onPress={() => setOpenedWas("Si")}
        >
          <Text
            style={[
              modernStyles.toggleText,
              openedWas === "Si" && modernStyles.toggleTextWarningActive,
            ]}
          >
            ⚠️ Sí
          </Text>
        </TouchableOpacity>
      </View>

      {/* Campo condicional */}
      {openedWas === "Si" && (
        <View style={modernStyles.conditionalContainer}>
          <View style={modernStyles.alertBox}>
            <Text style={modernStyles.alertIcon}>⚠️</Text>
            <Text style={modernStyles.alertText}>
              Se requiere información adicional
            </Text>
          </View>
          
          <Text style={styles.label}>¿Quién abrió el contenedor?</Text>
          <TextInput
            style={[styles.input, modernStyles.highlightInput]}
            value={openedBy}
            onChangeText={setOpenedBy}
            placeholder="Nombre completo de la persona"
            placeholderTextColor="#999"
          />
        </View>
      )}
    </View>
  );
};

const NavieraTypeSize = () => {
  const naviera = useWorkflowStoreThreeExtraOne((state) => state.naviera);
  const setNaviera = useWorkflowStoreThreeExtraOne((state) => state.setNaviera);
  const typeContainer = useWorkflowStoreThreeExtraOne((state) => state.typeContainer);
  const setTypeContainer = useWorkflowStoreThreeExtraOne(
    (state) => state.setTypeContainer,
  );
  const size = useWorkflowStoreThreeExtraOne((state) => state.size);
  const setSize = useWorkflowStoreThreeExtraOne((state) => state.setSize);

  const containerTypes = [
    { label: "DRY", value: "DRY" },
    { label: "REEFER", value: "REEFER" },
    { label: "OPEN TOP", value: "OPEN TOP" },
    { label: "FLAT RACK", value: "FLAT RACK" },
    { label: "TANK", value: "TANK" },
  ];

  const containerSizes = [
    { label: '20"', value: "20" },
    { label: '40"', value: "40" },
    { label: '40" HC', value: "40HC" },
    { label: '45"', value: "45" },
  ];

  return (
    <>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Naviera</Text>
        <TextInput
          style={styles.input}
          value={naviera || ""}
          onChangeText={(text) => setNaviera(text.toUpperCase())}
          placeholder="Nombre de la naviera"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Tipo de Contenedor</Text>
          <RNPickerSelect
            onValueChange={setTypeContainer}
            items={containerTypes}
            value={typeContainer}
            placeholder={{ label: "Seleccione tipo", value: null }}
            style={compactPickerStyles}
          />
        </View>

        <View style={[styles.col, { flex: 0.5 }]}>
          <Text style={styles.label}>Tamaño</Text>
          <RNPickerSelect
            onValueChange={setSize}
            items={containerSizes}
            value={size}
            placeholder={{ label: "Pies", value: null }}
            style={compactPickerStyles}
          />
        </View>
      </View>
    </>
  );
};

const LocationDetails = () => {
  const city = useWorkflowStoreThreeExtraOne((state) => state.city);
  const setCity = useWorkflowStoreThreeExtraOne((state) => state.setCity);
  const address = useWorkflowStoreThreeExtraOne((state) => state.address);
  const setAddress = useWorkflowStoreThreeExtraOne((state) => state.setAddress);
  const typeReview = useWorkflowStoreThreeExtraOne((state) => state.typeReview);
  const setTypeReview = useWorkflowStoreThreeExtraOne((state) => state.setTypeReview);
  const storageName = useWorkflowStoreThreeExtraOne((state) => state.storageName);
  const setStorageName = useWorkflowStoreThreeExtraOne(
    (state) => state.setStorageName,
  );
  const entryPort = useWorkflowStoreThreeExtraOne((state) => state.entryPort);
  const setEntryPort = useWorkflowStoreThreeExtraOne((state) => state.setEntryPort);

  return (
    <>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>📍 Ciudad</Text>
          <TextInput
            style={styles.input}
            value={city || ""}
            onChangeText={(text) => setCity(text.toUpperCase())}
            placeholder="Ciudad"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.col}>
          <Text style={styles.label}>Tipo Revisión</Text>
          <TextInput
            style={styles.input}
            value={typeReview}
            onChangeText={(text) => setTypeReview(text.toUpperCase())}
            placeholder="Tipo de revisión"
            placeholderTextColor="#999"
          />
        </View>
      </View>

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
        <Text style={styles.label}>Puerto de Ingreso</Text>
        <TextInput
          style={styles.input}
          value={entryPort || ""}
          onChangeText={(text) => setEntryPort(text.toUpperCase())}
          placeholder="Puerto de ingreso"
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

// Estilos modernos para ContainerOpened
const modernStyles = StyleSheet.create({
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
  highlightInput: {
    borderColor: "#ffa940",
    borderWidth: 2,
  },
});

// Estilos compactos para los pickers
const compactPickerStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    backgroundColor: "#fff",
    paddingVertical: 1,
    paddingHorizontal: 10,
  },
  inputIOS: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    backgroundColor: "#fff",
    paddingVertical: 1,
    paddingHorizontal: 10,
  },
  placeholder: {
    color: "#999",
    fontSize: 13,
    fontWeight: "500",
  },
  iconContainer: {
    top: 8,
    right: 10,
  },
  viewContainer: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    backgroundColor: "#fff",
    minHeight: 38,
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
  row: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  col: {
    flex: 1,
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