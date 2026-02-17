import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useWorkflowStoreOneExtraTwo } from "../../../store";

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
  const exporterSupervisor = useWorkflowStoreOneExtraTwo(
    (state) => state.exporterSupervisor,
  );
  const exporterSupervisorIdentification = useWorkflowStoreOneExtraTwo(
    (state) => state.exporterSupervisorIdentification,
  );
  const setExporterSupervisor = useWorkflowStoreOneExtraTwo(
    (state) => state.setExporterSupervisor,
  );
  const setExporterSupervisorIdentification = useWorkflowStoreOneExtraTwo(
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
  const associated = useWorkflowStoreOneExtraTwo((state) => state.associated);
  const associatedIdentification = useWorkflowStoreOneExtraTwo(
    (state) => state.associatedIdentification,
  );
  const setAssociated = useWorkflowStoreOneExtraTwo((state) => state.setAssociated);
  const setAssociatedIdentification = useWorkflowStoreOneExtraTwo(
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
  const others = useWorkflowStoreOneExtraTwo((state) => state.others);
  const othersIdentification = useWorkflowStoreOneExtraTwo(
    (state) => state.othersIdentification,
  );
  const setOthers = useWorkflowStoreOneExtraTwo((state) => state.setOthers);
  const setOthersIdentification = useWorkflowStoreOneExtraTwo(
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
  const workplace = useWorkflowStoreOneExtraTwo((state) => state.workplace);
  const setWorkplace = useWorkflowStoreOneExtraTwo((state) => state.setWorkplace);

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
