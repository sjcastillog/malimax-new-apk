import { PHOTOS_DIR } from "@/common/constants";
import { WorkflowImageI } from "@/core/container-three/interfaces";
import { File } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useWorkflowStoreThreeZero } from "../../../store";

interface DynamicPhotoCardProps {
  image: WorkflowImageI;
  index: number;
}

export const DynamicPhotoCard: React.FC<DynamicPhotoCardProps> = ({
  image,
  index,
}) => {
  const updateImage = useWorkflowStoreThreeZero((state) => state.updateImage);
  const removeImage = useWorkflowStoreThreeZero((state) => state.removeImage);

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Se necesita acceso a la cámara");
      return;
    }
    const mediaPermission = await MediaLibrary.requestPermissionsAsync();
    const hasMediaPermission = mediaPermission.status === "granted";

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: false,
    });

    if (!result.canceled && result.assets[0]) {
      const filename = `exit_${image.uuid}_${Date.now()}.jpg`;
      const filepath = `${PHOTOS_DIR}${filename}`;

      try {
        const file = new File(filepath);
        const base64 = await fetch(result.assets[0].uri)
          .then((res) => res.blob())
          .then(
            (blob) =>
              new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64String = reader.result as string;
                  resolve(base64String.split(",")[1]);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              }),
          );

        await file.write(base64, { encoding: "base64" });
        await updateImage(image.uuid, "src", filename);
        if (hasMediaPermission) {
          try {
            const asset = await MediaLibrary.createAssetAsync(filepath);

            let album = await MediaLibrary.getAlbumAsync("malimax");
            if (album === null) {
              await MediaLibrary.createAlbumAsync("malimax", asset, true);
            } else {
              await MediaLibrary.addAssetsToAlbumAsync([asset], album, true);
            }
          } catch (galleryError: any) {
            console.warn("No se pudo guardar en galería:", galleryError);
          }
        }
      } catch (error) {
        console.error("Error guardando foto:", error);
        Alert.alert("Error", "No se pudo guardar la foto");
      }
    }
  };

  const handleRemove = () => {
    Alert.alert(
      "Eliminar foto",
      "¿Estás seguro de que deseas eliminar esta foto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => removeImage(image.uuid),
        },
      ],
    );
  };

  const handleCommentChange = (text: string) => {
    updateImage(image.uuid, "comment", text);
  };

  const photoUri = image.src ? `${PHOTOS_DIR}${image.src}` : null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Foto #{index} - Salida</Text>
        <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
          <Text style={styles.removeButtonText}>✕ Eliminar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.photoContainer}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photo} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>📷</Text>
            <Text style={styles.placeholderSubtext}>Sin foto</Text>
          </View>
        )}
        <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
          <Text style={styles.cameraButtonText}>
            {photoUri ? "📷 Cambiar Foto" : "📷 Tomar Foto"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.commentContainer}>
        <Text style={styles.commentLabel}>Comentario</Text>
        <TextInput
          style={styles.commentInput}
          value={image.comment || ""}
          onChangeText={handleCommentChange}
          placeholder="Describe lo que se observa en esta foto..."
          placeholderTextColor="#999"
          multiline
          maxLength={255}
        />
        <Text style={styles.charCount}>{image.comment?.length || 0} / 255</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    padding: 12,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  removeButton: {
    backgroundColor: "#ff4d4f",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  photoContainer: {
    marginBottom: 12,
  },
  photo: {
    width: "100%",
    height: 200,
    borderRadius: 6,
    marginBottom: 8,
  },
  placeholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderSubtext: {
    color: "#999",
    fontSize: 14,
  },
  cameraButton: {
    backgroundColor: "#000080",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  cameraButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  commentContainer: {
    marginTop: 8,
  },
  commentLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
    minHeight: 80,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 11,
    color: "#999",
    textAlign: "right",
    marginTop: 4,
  },
});
