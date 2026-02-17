import { getWorkflowTwoByContainerForNextProcess } from "@/core/container-two/actions";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useWorkflowStoreThreeExtraThree } from "../../../store";

export const ContainerSection = () => {
  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📦 DATOS DEL PROCESO 2</Text>
        <Text style={styles.sectionSubtitle}>
          Busca el contenedor del proceso anterior
        </Text>
      </View>
      <ContainerSearchField />
      <ClientInfo />
    </>
  );
};

const ContainerSearchField = () => {
  const container = useWorkflowStoreThreeExtraThree((state) => state.container);
  const setContainer = useWorkflowStoreThreeExtraThree(
    (state) => state.setContainer,
  );
  const setClient = useWorkflowStoreThreeExtraThree((state) => state.setClient);
  const setClientId = useWorkflowStoreThreeExtraThree(
    (state) => state.setClientId,
  );
  const setClientIdentification = useWorkflowStoreThreeExtraThree(
    (state) => state.setClientIdentification,
  );

  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!container || container.trim() === "") {
      Alert.alert(
        "Campo Requerido",
        "Por favor ingresa un número de contenedor",
      );
      return;
    }

    try {
      setIsSearching(true);

      // Buscar datos del proceso 2
      const data = await getWorkflowTwoByContainerForNextProcess(container);

      if (!data) {
        Alert.alert(
          "No Encontrado",
          `No se encontró el contenedor "${container}" en el proceso 2.\n\n¿Deseas continuar de todas formas?`,
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Continuar",
              onPress: () => {
                // Mantener solo el contenedor
                setClient(null);
                setClientId(null);
                setClientIdentification(null);
              },
            },
          ],
        );
        return;
      }

      // Cargar datos del proceso 2
      setClient(data.client);
      setClientId(data.clientId);
      setClientIdentification(data.clientIdentification);

      Alert.alert(
        "✅ Datos Cargados",
        `Se cargaron los datos del contenedor:\n\n${data.client}\nRUC: ${data.clientIdentification}`,
      );
    } catch (error: any) {
      console.error("Error buscando contenedor:", error);
      Alert.alert("Error", error?.message || "No se pudo buscar el contenedor");
    } finally {
      setIsSearching(false);
    }
  };

  const handleBlur = () => {
    if (!container) return;

    // Limpiar y formatear el contenedor
    let value = container;

    // Eliminar espacios en blanco
    value = value.replace(/\s+/g, "");

    // Eliminar tildes/acentos
    value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Eliminar caracteres que no sean letras o números
    value = value.replace(/[^a-zA-Z0-9]/g, "");

    // Convertir a mayúsculas
    value = value.toUpperCase();

    setContainer(value);
  };

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>
        Número de Contenedor <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.input, styles.inputSearch]}
          value={container || ""}
          onChangeText={(text) => setContainer(text.toUpperCase())}
          onBlur={handleBlur}
          placeholder="Ingresa el número de contenedor"
          placeholderTextColor="#999"
          maxLength={100}
          editable={!isSearching}
        />
        <TouchableOpacity
          style={[
            styles.searchButton,
            isSearching && styles.searchButtonDisabled,
          ]}
          onPress={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.searchButtonText}>🔍 Buscar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ClientInfo = () => {
  const client = useWorkflowStoreThreeExtraThree((state) => state.client);
  const clientIdentification = useWorkflowStoreThreeExtraThree(
    (state) => state.clientIdentification,
  );

  if (!client) return null;

  return (
    <View style={styles.infoBox}>
      <View style={styles.infoHeader}>
        <Text style={styles.infoIcon}>ℹ️</Text>
        <Text style={styles.infoTitle}>Información del Cliente</Text>
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>Cliente:</Text>
        <Text style={styles.infoValue}>{client}</Text>
        <Text style={styles.infoLabel}>RUC/Identificación:</Text>
        <Text style={styles.infoValue}>{clientIdentification || "N/A"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#e6f7ff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#91d5ff",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0050b3",
  },
  sectionSubtitle: {
    fontSize: 11,
    color: "#096dd9",
    marginTop: 4,
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
  required: {
    color: "#ff4d4f",
  },
  searchContainer: {
    flexDirection: "row",
    gap: 8,
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
  inputSearch: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: "#1890ff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
  },
  searchButtonDisabled: {
    backgroundColor: "#91caff",
    opacity: 0.7,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  infoBox: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: "#e6f7ff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#91d5ff",
    padding: 12,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#0050b3",
  },
  infoContent: {
    gap: 4,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#666",
    marginTop: 4,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000",
  },
});
