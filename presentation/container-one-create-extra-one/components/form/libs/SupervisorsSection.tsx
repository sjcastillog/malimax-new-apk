import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useWorkflowStoreOneExtraOne } from "../../../store";

export const SupervisorsSection = () => {
  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👥 INFORMACIÓN DE SUPERVISORES</Text>
      </View>
      <ExporterSupervisor />
      <Associated />
      <Others />
      <Workplace />
    </>
  );
};

const ExporterSupervisor = () => {
  const exporterSupervisor = useWorkflowStoreOneExtraOne(
    (state) => state.exporterSupervisor,
  );
  const exporterSupervisorIdentification = useWorkflowStoreOneExtraOne(
    (state) => state.exporterSupervisorIdentification,
  );
  const setExporterSupervisor = useWorkflowStoreOneExtraOne(
    (state) => state.setExporterSupervisor,
  );
  const setExporterSupervisorIdentification = useWorkflowStoreOneExtraOne(
    (state) => state.setExporterSupervisorIdentification,
  );

  return (
    <>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Supervisor de Exportador</Text>
        <TextInput
          style={styles.input}
          value={exporterSupervisor || ""}
          onChangeText={(text) => setExporterSupervisor(text.toUpperCase())}
          placeholder="Nombre del supervisor"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Identificación</Text>
        <TextInput
          style={styles.input}
          value={exporterSupervisorIdentification || ""}
          onChangeText={setExporterSupervisorIdentification}
          placeholder="Número de identificación"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
      </View>
    </>
  );
};

const Associated = () => {
  const associated = useWorkflowStoreOneExtraOne((state) => state.associated);
  const associatedIdentification = useWorkflowStoreOneExtraOne(
    (state) => state.associatedIdentification,
  );
  const setAssociated = useWorkflowStoreOneExtraOne((state) => state.setAssociated);
  const setAssociatedIdentification = useWorkflowStoreOneExtraOne(
    (state) => state.setAssociatedIdentification,
  );

  return (
    <>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Asociado Neg.</Text>
        <TextInput
          style={styles.input}
          value={associated || ""}
          onChangeText={(text) => setAssociated(text.toUpperCase())}
          placeholder="Nombre del asociado"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Identificación</Text>
        <TextInput
          style={styles.input}
          value={associatedIdentification || ""}
          onChangeText={setAssociatedIdentification}
          placeholder="Número de identificación"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
      </View>
    </>
  );
};

const Others = () => {
  const others = useWorkflowStoreOneExtraOne((state) => state.others);
  const othersIdentification = useWorkflowStoreOneExtraOne(
    (state) => state.othersIdentification,
  );
  const setOthers = useWorkflowStoreOneExtraOne((state) => state.setOthers);
  const setOthersIdentification = useWorkflowStoreOneExtraOne(
    (state) => state.setOthersIdentification,
  );

  return (
    <>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Otro</Text>
        <TextInput
          style={styles.input}
          value={others || ""}
          onChangeText={(text) => setOthers(text.toUpperCase())}
          placeholder="Otra persona"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Identificación</Text>
        <TextInput
          style={styles.input}
          value={othersIdentification || ""}
          onChangeText={setOthersIdentification}
          placeholder="Número de identificación"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
      </View>
    </>
  );
};

const Workplace = () => {
  const workplace = useWorkflowStoreOneExtraOne((state) => state.workplace);
  const setWorkplace = useWorkflowStoreOneExtraOne((state) => state.setWorkplace);

  return (
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
});
