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
import { useWorkflowStoreTwoZero } from "../../../store";
import { PhotoWithComment } from "./PhotoWithComment";

const noImg = require("@/assets/images/no-image.jpg");

export const ChargingProcessSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📦 PROCESO DE CARGA</Text>
      </View>

      <ChargingPhoto1 />
      <ChargingPhoto2 />
      <DynamicChargingPhotos />
    </View>
  );
};

const ChargingPhoto1 = () => (
  <PhotoWithComment
    photoIdKey="chargingProcessPhoto1"
    commentKey="chargingProcessComment1"
    label="FOTO CARGA 1"
    commentPlaceholder="Comentario sobre la carga 1"
  />
);

const ChargingPhoto2 = () => (
  <PhotoWithComment
    photoIdKey="chargingProcessPhoto2"
    commentKey="chargingProcessComment2"
    label="FOTO CARGA 2"
    commentPlaceholder="Comentario sobre la carga 2"
  />
);

const DynamicChargingPhotos = () => {
  const { images, addImage, removeImage } = useWorkflowStoreTwoZero();

  const handleAddImage = () => {
    addImage("process");
  };

  const handleDeleteImage = (uuid: string) => {
    Alert.alert("Eliminar Foto", "¿Estás seguro de eliminar esta foto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => removeImage(uuid),
      },
    ]);
  };

  const processImages = images.filter((img) => img.type === "process");

  return (
    <View style={styles.dynamicSection}>
      {processImages.map((image, index) => (
        <DynamicPhotoItem
          key={image.uuid}
          image={image}
          index={index}
          onDelete={() => handleDeleteImage(image.uuid)}
        />
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
        <Text style={styles.addButtonText}>+ Agregar Foto de Carga</Text>
      </TouchableOpacity>
    </View>
  );
};

interface DynamicPhotoItemProps {
  image: {
    uuid: string;
    src: string;
    comment: string;
  };
  index: number;
  onDelete: () => void;
}

const DynamicPhotoItem: React.FC<DynamicPhotoItemProps> = ({
  image,
  index,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);
  const updateImage = useWorkflowStoreTwoZero((state) => state.updateImage);
  const uri = usePhotoUri(image.src);

  const handleTakePhoto = async () => {
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
          { compress: 0.85, format: ImageManipulator.SaveFormat.JPEG }
        );

        const filename = `process_${image.uuid}_${Date.now()}.jpg`;
        const permanentUri = `${PHOTOS_DIR}${filename}`;

        const sourceFile = new File(manipulatedImage.uri);
        const destFile = new File(permanentUri);
        await sourceFile.copy(destFile);

        await updateImage(image.uuid, "src", filename);
      }
    } catch (error) {
      console.error("Error tomando foto:", error);
      Alert.alert("Error", "No se pudo tomar la foto");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateComment = (text: string) => {
    updateImage(image.uuid, "comment", text);
  };

  return (
    <View style={styles.photoItem}>
      <View style={styles.photoItemHeader}>
        <Text style={styles.photoItemLabel}>CARGA {index + 3}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>🗑️ Eliminar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.photoPreviewContainer}
        onPress={handleTakePhoto}
        disabled={loading}
      >
        <Image source={uri ? { uri } : noImg} style={styles.photoPreview} />
        <View style={styles.cameraOverlay}>
          <Text style={styles.cameraText}>
            {loading ? "⏳" : image.src ? "📷 Cambiar" : "📷 Tomar Foto"}
          </Text>
        </View>
      </TouchableOpacity>

      <TextInput
        style={styles.commentInput}
        placeholder="Comentario sobre la carga..."
        placeholderTextColor="#999"
        value={image.comment}
        onChangeText={handleUpdateComment}
        multiline
        numberOfLines={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    backgroundColor: "#A9A9A9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
  },
  headerText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  dynamicSection: {
    paddingHorizontal: 8,
  },
  photoItem: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  photoItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  photoItemLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#ff4d4f",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  photoPreviewContainer: {
    position: "relative",
    marginBottom: 8,
  },
  photoPreview: {
    width: "100%",
    height: 200,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  cameraOverlay: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(24, 144, 255, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  cameraText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    padding: 10,
    fontSize: 12,
    backgroundColor: "#fff",
    minHeight: 60,
    textAlignVertical: "top",
  },
  addButton: {
    backgroundColor: "#000080",
    borderRadius: 6,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#40a9ff",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});