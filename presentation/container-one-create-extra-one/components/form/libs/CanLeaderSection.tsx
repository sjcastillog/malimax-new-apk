import { CatalogueI } from "@/common/interface";
import { getAllCatalogueChildrenbyParentCode } from "@/core/catalogue/actions/get-all-catalogue-children-by-parent-code";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useWorkflowStoreOneExtraOne } from "../../../store";

export const CanLeaderSection = () => {
  return (
    <>
      <CanSelector />
      <LeaderSelector />
    </>
  );
};

const CanSelector = () => {
  const code = process.env.EXPO_PUBLIC_CANS_MALIMAX_CODE ?? "CAN";
  const can = useWorkflowStoreOneExtraOne((state) => state.can);
  const setCan = useWorkflowStoreOneExtraOne((state) => state.setCan);
  const [showModal, setShowModal] = useState(false);
  const [cans, setCans] = useState<CatalogueI[]>([]);

  useEffect(() => {
    handleGetCans();
  }, []);

  const handleGetCans = async () => {
    try {
      const response = await getAllCatalogueChildrenbyParentCode(code);
      if (!response) return;
      setCans(response);
    } catch (error: any) {
      console.error("Error cargando CAN:", error);
      Alert.alert("Error", "No se pudieron cargar los CAN");
    }
  };

  const toggleOption = (value: string) => {
    const currentValues = can || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setCan(newValues.length > 0 ? newValues : null);
  };

  const displayText =
    can && can.length > 0 ? can.join(", ") : "Seleccione CAN(es)";

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>CAN(es)</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowModal(true)}>
        <Text style={[styles.inputText, !can && styles.placeholder]}>
          {displayText}
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccione CAN(es)</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={cans}
              keyExtractor={(item) => `${item.id}-can`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => toggleOption(item.name)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      can?.includes(item.name) && styles.checkboxChecked,
                    ]}
                  >
                    {can?.includes(item.name) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.optionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.doneButtonText}>Listo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const LeaderSelector = () => {
  const code = process.env.EXPO_PUBLIC_LEADERS_MALIMAX_CODE ?? "LEADER";

  const [leaders, setLeaders] = useState<CatalogueI[]>([]);
  const leader = useWorkflowStoreOneExtraOne((state) => state.leader);
  const setLeader = useWorkflowStoreOneExtraOne((state) => state.setLeader);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    handleGetLeaders();
  }, []);

  const handleGetLeaders = async () => {
    try {
      const response = await getAllCatalogueChildrenbyParentCode(code);
      if (!response) return;
      setLeaders(response);
    } catch (error: any) {
      console.error("Error cargando CAN:", error);
      Alert.alert("Error", "No se pudieron cargar los CAN");
    }
  };

  const toggleOption = (value: string) => {
    const currentValues = leader || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setLeader(newValues.length > 0 ? newValues : null);
  };

  const displayText =
    leader && leader.length > 0 ? leader.join(", ") : "Seleccione Guía(s)";

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>Guía(s)</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowModal(true)}>
        <Text style={[styles.inputText, !leader && styles.placeholder]}>
          {displayText}
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccione Guía(s)</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={leaders}
              keyExtractor={(item) => `${item.id}-leader`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => toggleOption(item.name)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      leader?.includes(item.name) && styles.checkboxChecked,
                    ]}
                  >
                    {leader?.includes(item.name) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.optionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.doneButtonText}>Listo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    minHeight: 40,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 14,
    color: "#000",
  },
  placeholder: {
    color: "#999",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: "70%",
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  modalClose: {
    fontSize: 24,
    color: "#666",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#d9d9d9",
    borderRadius: 4,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#000080",
    borderColor: "#000080",
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  doneButton: {
    backgroundColor: "#000080",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
