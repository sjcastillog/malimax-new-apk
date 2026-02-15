import { getWorkflowOneByContainerForNextProcess } from "@/core/container-one/actions";
import { Ionicons } from "@expo/vector-icons";
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
import { useWorkflowStoreTwoZero } from "../../../store";

export const ContainerSection = () => {
  const container = useWorkflowStoreTwoZero((state) => state.container);
  const setContainer = useWorkflowStoreTwoZero((state) => state.setContainer);
  const startProcess = useWorkflowStoreTwoZero((state) => state.startProcess);
  const setStartProcess = useWorkflowStoreTwoZero(
    (state) => state.setStartProcess,
  );
  const client = useWorkflowStoreTwoZero((state) => state.client);
  const setClient = useWorkflowStoreTwoZero((state) => state.setClient);

  // Setters para cargar datos del proceso ONE
  const setCity = useWorkflowStoreTwoZero((state) => state.setCity);
  const setAddress = useWorkflowStoreTwoZero((state) => state.setAddress);
  const setTypeReview = useWorkflowStoreTwoZero((state) => state.setTypeReview);
  const setStorageName = useWorkflowStoreTwoZero(
    (state) => state.setStorageName,
  );
  const setDriverName = useWorkflowStoreTwoZero((state) => state.setDriverName);
  const setDriverIdentification = useWorkflowStoreTwoZero(
    (state) => state.setDriverIdentification,
  );
  const setPlateVehicle = useWorkflowStoreTwoZero(
    (state) => state.setPlateVehicle,
  );
  const setCompanyTransport = useWorkflowStoreTwoZero(
    (state) => state.setCompanyTransport,
  );
  const setNaviera = useWorkflowStoreTwoZero((state) => state.setNaviera);
  const setTypeContainer = useWorkflowStoreTwoZero(
    (state) => state.setTypeContainer,
  );
  const setSize = useWorkflowStoreTwoZero((state) => state.setSize);
  const setEntryPort = useWorkflowStoreTwoZero((state) => state.setEntryPort);

  // Setters para fotos de validación
  const setEmptyPanoramicValidationPhoto = useWorkflowStoreTwoZero(
    (state) => state.setEmptyPanoramicValidationPhoto,
  );
  const setEmptyStampNavieraValidationPhoto = useWorkflowStoreTwoZero(
    (state) => state.setEmptyStampNavieraValidationPhoto,
  );
  const setEmptyOtherStampValidationPhoto = useWorkflowStoreTwoZero(
    (state) => state.setEmptyOtherStampValidationPhoto,
  );
  const setEmptySatelliteLockValidationPhoto = useWorkflowStoreTwoZero(
    (state) => state.setEmptySatelliteLockValidationPhoto,
  );
  const setExitEngineryValidationPhoto1 = useWorkflowStoreTwoZero(
    (state) => state.setExitEngineryValidationPhoto1,
  );
  const setExitEngineryValidationPhoto2 = useWorkflowStoreTwoZero(
    (state) => state.setExitEngineryValidationPhoto2,
  );
  const setExitDoorValidationVideo = useWorkflowStoreTwoZero(
    (state) => state.setExitDoorValidationVideo,
  );
  const setExitEngineryValidationVideo = useWorkflowStoreTwoZero(
    (state) => state.setExitEngineryValidationVideo,
  );

  const [loading, setLoading] = useState(false);

  const handleStartProcess = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("es-EC", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setStartProcess(timeString);
  };

  const handleBlurContainer = () => {
    if (!container) return;
    // Limpiar el valor del contenedor
    let value = container;
    value = value.replace(/\s+/g, ""); // Eliminar espacios
    value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Eliminar tildes
    value = value.replace(/[^a-zA-Z0-9]/g, ""); // Solo alfanuméricos
    value = value.toUpperCase();
    setContainer(value);
  };

  const handleSearchWorkflowOne = async () => {
    if (!container) {
      Alert.alert("Error", "No se ha ingresado un Número de contenedor");
      return;
    }

    try {
      setLoading(true);

      const datawf = await getWorkflowOneByContainerForNextProcess(container);

      if (!datawf) {
        Alert.alert("Info", "No se encontraron datos para este contenedor");
        return;
      }

      // Cargar datos básicos
      setCity(datawf.city || "");
      setAddress(datawf.address || "");
      setTypeReview(datawf.typeReview || "");
      setStorageName(datawf.storageName || "");
      setDriverName(datawf.driverName || "");
      setDriverIdentification(datawf.driverIdentification || "");
      setPlateVehicle(datawf.plateVehicle || "");
      setCompanyTransport(datawf.companyTransport || null);
      setNaviera(datawf.naviera || null);
      setTypeContainer(datawf.typeContainer || null);
      setSize(datawf.size || null);
      setEntryPort(datawf.entryPort || "");

      // Cargar fotos de validación desde el proceso ONE
      setEmptyPanoramicValidationPhoto(datawf.emptyPanoramicCheckPhoto || "");
      setEmptyStampNavieraValidationPhoto(
        datawf.emptyStampNavieraCheckPhoto || "",
      );
      setEmptyOtherStampValidationPhoto(datawf.emptyOtherStampCheckPhoto || "");
      setEmptySatelliteLockValidationPhoto(
        datawf.emptySatelliteLockCheckPhoto || "",
      );
      setExitEngineryValidationPhoto1(datawf.exitEngineryCheckPhoto1 || "");
      setExitEngineryValidationPhoto2(datawf.exitEngineryCheckPhoto2 || "");
      setExitDoorValidationVideo(datawf.exitDoorCheckVideo || "");
      setExitEngineryValidationVideo(datawf.exitEngineryCheckVideo || "");

      Alert.alert("Éxito", "Datos cargados correctamente del proceso anterior");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al buscar el contenedor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Botón Inicio de Proceso */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartProcess}
        >
          <Text style={styles.startButtonText}>Inicio de Proceso</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.timeInput, !startProcess && styles.timeInputEmpty]}
          value={startProcess}
          editable={false}
          placeholder="--:--:--"
          placeholderTextColor="#999"
        />
      </View>

      {/* Input Contenedor con botón de búsqueda */}
      <View style={styles.formGroup}>
        <Text style={[styles.label, !startProcess && styles.labelDisabled]}>
          N° Contenedor {!startProcess && "⚠️"}
        </Text>
        <View style={styles.inputRow}>
          <TextInput
            style={[
              styles.inputWithButton,
              !startProcess && styles.inputDisabled,
            ]}
            value={container || ""}
            onChangeText={(text) => setContainer(text.toUpperCase().trim())}
            onBlur={handleBlurContainer}
            placeholder="Ingrese número de contenedor"
            placeholderTextColor="#999"
            editable={!!startProcess}
          />
          <TouchableOpacity
            style={[
              styles.searchButton,
              (!startProcess || loading) && styles.searchButtonDisabled,
            ]}
            onPress={handleSearchWorkflowOne}
            disabled={!startProcess || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="search" size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  startButton: {
    flex: 1,
    backgroundColor: "#000080",
    borderRadius: 6,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  timeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#52c41a",
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#52c41a",
    backgroundColor: "#f6ffed",
    textAlign: "center",
  },
  timeInputEmpty: {
    borderColor: "#d9d9d9",
    color: "#999",
    backgroundColor: "#fafafa",
  },
  formGroup: {
    marginBottom: 0,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  labelDisabled: {
    color: "#ff4d4f",
  },
  inputRow: {
    flexDirection: "row",
    gap: 8,
  },
  inputWithButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  inputDisabled: {
    backgroundColor: "#f5f5f5",
    borderColor: "#e8e8e8",
    color: "#999",
  },
  searchButton: {
    backgroundColor: "#1890ff",
    borderRadius: 6,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonDisabled: {
    backgroundColor: "#d9d9d9",
  },
});
