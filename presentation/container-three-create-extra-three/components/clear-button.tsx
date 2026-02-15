import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useWorkflowStoreThreeExtraThree } from "../store";

export const ButtonClean = () => {
  const [isCleaning, setIsCleaning] = useState(false);
  const onClear = useWorkflowStoreThreeExtraThree((state) => state.onClear);

  const handlePress = () => {
    Alert.alert(
      "Limpiar",
      "¿Seguro que quieres limpiar el formulario?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí, limpiar",
          onPress: async () => {
            setIsCleaning(true);
            await onClear();
            Alert.alert("✅ Limpiado", "Todos los campos fueron limpiados");
            setIsCleaning(false);
          },
          style: "default",
        },
      ],
      { cancelable: true },
    );
  };

  if (isCleaning) {
    return (
      <View>
        <ActivityIndicator size="large" color="#000080" />
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.btnLimpiar} onPress={handlePress}>
      <Text style={styles.btnSimularText}>🗑️ Limpiar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnLimpiar: {
    backgroundColor: "red",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    width: "33%",
  },

  btnSimularText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
});
