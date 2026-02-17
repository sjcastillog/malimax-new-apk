import { PHOTOS_DIR } from "@/common/constants";
import { File } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
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
import * as MediaLibrary from "expo-media-library";

interface PhotoWithCommentProps {
  photoIdKey: string;
  commentKey: string;
  label: string;
  commentPlaceholder: string;
}

export const PhotoWithComment: React.FC<PhotoWithCommentProps> = ({
  photoIdKey,
  commentKey,
  label,
  commentPlaceholder,
}) => {
  const store = useWorkflowStoreThreeZero();
  const photoFilename = store[photoIdKey as keyof typeof store] as string;
  const comment = store[commentKey as keyof typeof store] as string;

  // Obtener los setters dinámicamente
  const setPhotoKey = `set${photoIdKey.charAt(0).toUpperCase()}${photoIdKey.slice(1)}`;
  const setCommentKey = `set${commentKey.charAt(0).toUpperCase()}${commentKey.slice(1)}`;

  const setPhoto = store[setPhotoKey as keyof typeof store] as (
    value: string,
  ) => void;
  const setComment = store[setCommentKey as keyof typeof store] as (
    value: string | null,
  ) => void;

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
      const filename = `${photoIdKey}_${Date.now()}.jpg`;
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
        setPhoto(filename);

        if (hasMediaPermission) {
          try {
            const asset = await MediaLibrary.createAssetAsync(filepath);

            let album = await MediaLibrary.getAlbumAsync("malimax");
            if (album === null) {
              await MediaLibrary.createAlbumAsync("malimax", asset, false);
            } else {
              await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            }
          } catch (galleryError) {
            console.warn("No se pudo guardar en galería:", galleryError);
          }
        }
      } catch (error) {
        console.error("Error guardando foto:", error);
        Alert.alert("Error", "No se pudo guardar la foto");
      }
    }
  };

  const photoUri = photoFilename ? `${PHOTOS_DIR}${photoFilename}` : null;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>

      <View style={styles.photoContainer}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photo} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={styles.placeholderText}>Sin foto</Text>
          </View>
        )}
        <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
          <Text style={styles.cameraButtonText}>
            {photoUri ? "📷 Cambiar" : "📷 Tomar"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.commentContainer}>
        <Text style={styles.commentLabel}>Comentario (opcional)</Text>
        <TextInput
          style={styles.commentInput}
          value={comment || ""}
          onChangeText={setComment}
          placeholder={commentPlaceholder}
          placeholderTextColor="#999"
          multiline
          maxLength={500}
        />
        <Text style={styles.charCount}>{comment?.length || 0} / 500</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  labelContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000",
  },
  photoContainer: {
    marginBottom: 12,
  },
  photo: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  placeholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderText: {
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
    color: "#666",
    marginBottom: 6,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    padding: 10,
    fontSize: 13,
    backgroundColor: "#fff",
    minHeight: 60,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 11,
    color: "#999",
    textAlign: "right",
    marginTop: 4,
  },
});
