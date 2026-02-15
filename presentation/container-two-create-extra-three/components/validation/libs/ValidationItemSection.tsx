import { PHOTOS_DIR } from "@/common/constants";
import { usePhotoUri } from "@/common/hooks";
import { File } from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useWorkflowStoreTwoExtraThree } from "../../../store";
import { ValidationSwitch } from "./ValidationSwitch";

const noImg = require("@/assets/images/no-image.jpg");

interface ValidationItemSectionProps {
  photoIdKey: string; // Foto de referencia del proceso anterior (B64)
  validationPhotoKey: string; // Foto de validación nueva
  statusKey: string; // Estado boolean (correcto/error)
  commentKey: string; // Comentario del error
  label: string; // Etiqueta del item
  isVideo: boolean; // Si es video o foto
}

export const ValidationItemSection: React.FC<ValidationItemSectionProps> = ({
  photoIdKey,
  validationPhotoKey,
  statusKey,
  commentKey,
  label,
  isVideo,
}) => {
  const [loading, setLoading] = useState(false);

  // Obtener valores del store
  const referencePhoto = useWorkflowStoreTwoExtraThree(
    (state) => (state as any)[photoIdKey],
  );
  const validationPhoto = useWorkflowStoreTwoExtraThree(
    (state) => (state as any)[validationPhotoKey],
  );
  const status = useWorkflowStoreTwoExtraThree((state) => (state as any)[statusKey]);
  const comment = useWorkflowStoreTwoExtraThree(
    (state) => (state as any)[commentKey],
  );

  // Obtener setters del store
  const setValidationPhoto = useWorkflowStoreTwoExtraThree((state) => {
    const setterName = `set${validationPhotoKey.charAt(0).toUpperCase()}${validationPhotoKey.slice(1)}`;
    return (state as any)[setterName];
  });

  const setStatus = useWorkflowStoreTwoExtraThree((state) => {
    const setterName = `set${statusKey.charAt(0).toUpperCase()}${statusKey.slice(1)}`;
    return (state as any)[setterName];
  });

  const setComment = useWorkflowStoreTwoExtraThree((state) => {
    const setterName = `set${commentKey.charAt(0).toUpperCase()}${commentKey.slice(1)}`;
    return (state as any)[setterName];
  });

  // Convertir referencias a URIs
  const referenceUri = usePhotoUri(referencePhoto);
  const validationUri = usePhotoUri(validationPhoto);

  const handleTakeValidationPhoto = async () => {
    setLoading(true);
    try {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (cameraPermission.status !== "granted") {
        Alert.alert("Permiso requerido", "Necesitamos acceso a la cámara");
        setLoading(false);
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 1280 } }],
          { compress: 0.85, format: ImageManipulator.SaveFormat.JPEG },
        );

        const filename = `val_${validationPhotoKey}_${Date.now()}.jpg`;
        const permanentUri = `${PHOTOS_DIR}${filename}`;

        const sourceFile = new File(manipulatedImage.uri);
        const destFile = new File(permanentUri);
        await sourceFile.copy(destFile);

        setValidationPhoto(filename);
      }
    } catch (error) {
      console.error("Error tomando foto de validación:", error);
      Alert.alert("Error", "No se pudo tomar la foto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header con label */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{label}</Text>
      </View>

      <View style={styles.content}>
        {/* Foto de referencia del proceso anterior */}
        <View style={styles.photoSection}>
          <Text style={styles.sectionLabel}>
            📸 Foto de Referencia (Proceso Anterior)
          </Text>
          <Image
            source={referenceUri ? { uri: referenceUri } : noImg}
            style={styles.referenceImage}
          />
        </View>

        {/* Switch de validación */}
        <View style={styles.switchSection}>
          <ValidationSwitch status={status} setStatus={setStatus} />
        </View>

        {/* Comentario de error (solo si status es false) */}
        {status === false && (
          <View style={styles.errorSection}>
            <Text style={styles.errorLabel}>⚠️ Indique cuál es el error</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Describa el error encontrado..."
              placeholderTextColor="#999"
              value={comment || ""}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
              maxLength={200}
            />
            <Text style={styles.charCount}>{comment?.length || 0}/200</Text>

            {/* Foto de validación del error */}
            {!isVideo && (
              <View style={styles.validationPhotoSection}>
                <Text style={styles.validationPhotoLabel}>
                  📷 Foto de Validación (Opcional)
                </Text>
                <View style={styles.validationPhotoRow}>
                  <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={handleTakeValidationPhoto}
                    disabled={loading}
                  >
                    <Text style={styles.cameraIcon}>
                      {loading ? "⏳" : "📷"}
                    </Text>
                  </TouchableOpacity>
                  <Image
                    source={validationUri ? { uri: validationUri } : noImg}
                    style={styles.validationPreview}
                  />
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    backgroundColor: "#000080",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
  },
  photoSection: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  referenceImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  switchSection: {
    marginBottom: 16,
    alignItems: "center",
  },
  errorSection: {
    backgroundColor: "#fff7e6",
    borderWidth: 1,
    borderColor: "#ffd591",
    borderRadius: 8,
    padding: 12,
  },
  errorLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#fa8c16",
    marginBottom: 8,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    padding: 10,
    fontSize: 13,
    backgroundColor: "#fff",
    minHeight: 100,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 11,
    color: "#999",
    textAlign: "right",
    marginTop: 4,
  },
  validationPhotoSection: {
    marginTop: 12,
  },
  validationPhotoLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  validationPhotoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cameraButton: {
    backgroundColor: "#1890ff",
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    fontSize: 24,
  },
  validationPreview: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
});
