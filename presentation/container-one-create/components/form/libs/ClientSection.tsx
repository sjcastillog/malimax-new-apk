import { useClients } from "@/common/hooks";
import { ClientI } from "@/common/interface";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useWorkflowStoreOneZero } from "../../../store";

export const ClientSection = () => {
  const client = useWorkflowStoreOneZero((state) => state.client);
  const clientIdentification = useWorkflowStoreOneZero(
    (state) => state.clientIdentification,
  );
  const setClient = useWorkflowStoreOneZero((state) => state.setClient);
  const setClientId = useWorkflowStoreOneZero((state) => state.setClientId);
  const setClientIdentification = useWorkflowStoreOneZero(
    (state) => state.setClientIdentification,
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { clientsQuery } = useClients();

  const handleSelectClient = (selectedClient: ClientI) => {
    setClient(selectedClient.name);
    setClientId(selectedClient.id);
    setClientIdentification(selectedClient.identification);
    setModalVisible(false);
    setSearchQuery("");
  };

  const handleClearClient = () => {
    Alert.alert(
      "Limpiar Cliente",
      "¿Estás seguro de que deseas limpiar el cliente seleccionado?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpiar",
          style: "destructive",
          onPress: () => {
            setClient(null);
            setClientId(null);
            setClientIdentification(null);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👤 INFORMACIÓN DEL CLIENTE</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>
          Cliente <Text style={styles.required}>*</Text>
        </Text>

        {client ? (
          // CLIENTE SELECCIONADO
          <View style={styles.selectedClientContainer}>
            <View style={styles.selectedClientInfo}>
              <Text style={styles.selectedClientName}>{client}</Text>
              <Text style={styles.selectedClientId}>
                RUC: {clientIdentification || "N/A"}
              </Text>
            </View>
            <View style={styles.selectedClientActions}>
              <TouchableOpacity
                style={styles.changeButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.changeButtonText}>🔄 Cambiar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClearClient}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // NO HAY CLIENTE SELECCIONADO
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.selectButtonText}>📋 Seleccionar Cliente</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* MODAL DE SELECCIÓN */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* HEADER */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Cliente</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* BÚSQUEDA */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Buscar por nombre o RUC..."
                placeholderTextColor="#999"
              />
            </View>

            {/* LISTA DE CLIENTES */}
            {clientsQuery.isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000080" />
                <Text style={styles.loadingText}>Cargando clientes...</Text>
              </View>
            ) : (
              <FlatList
                data={clientsQuery.data ?? []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.clientItem}
                    onPress={() => handleSelectClient(item)}
                  >
                    <View style={styles.clientItemContent}>
                      <Text style={styles.clientItemName}>{item.name}</Text>
                      <Text style={styles.clientItemId}>
                        RUC: {item.identification}
                      </Text>
                    </View>
                    <Text style={styles.clientItemArrow}>›</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      {searchQuery
                        ? "No se encontraron clientes"
                        : "No hay clientes disponibles"}
                    </Text>
                  </View>
                }
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
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
  required: {
    color: "#ff4d4f",
  },

  // CLIENTE SELECCIONADO
  selectedClientContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6f7ff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#91d5ff",
    padding: 12,
  },
  selectedClientInfo: {
    flex: 1,
  },
  selectedClientName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  selectedClientId: {
    fontSize: 12,
    color: "#666",
  },
  selectedClientActions: {
    flexDirection: "row",
    gap: 8,
  },
  changeButton: {
    backgroundColor: "#1890ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  changeButtonText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: "#ff4d4f",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  // BOTÓN SELECCIONAR
  selectButton: {
    backgroundColor: "#000080",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  selectButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#666",
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
  },
  clientItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  clientItemContent: {
    flex: 1,
  },
  clientItemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  clientItemId: {
    fontSize: 12,
    color: "#666",
  },
  clientItemArrow: {
    fontSize: 24,
    color: "#999",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
  },
});
