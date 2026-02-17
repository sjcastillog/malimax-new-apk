import { PHOTOS_DIR } from "@/common/constants/libs/photos";
import { usePhotoUri } from "@/common/hooks";
import { ModalPhotoPreview } from "@/components/shared/ModalPhotoPreview";
import { File } from "expo-file-system/next";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useWorkflowStoreOneExtraTwo } from "../../../store";

const noImg = require("@/assets/images/no-image.jpg");

interface PhotoButtonProps {
  photoIdKey: string;
  label: string;
  fullWidth?: boolean;
  block?: boolean;
  onPhotoTaken?: (photo: string) => void;
}

export const PhotoButton: React.FC<PhotoButtonProps> = ({
  photoIdKey,
  label,
  fullWidth,
  onPhotoTaken,
  block = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const photoId = useWorkflowStoreOneExtraTwo(
    (state) => (state as any)[photoIdKey],
  );

  const setPhoto = useWorkflowStoreOneExtraTwo((state) => state.setPhoto);

  const uri = usePhotoUri(photoId);

  const handleTakePhoto = async () => {
    setLoading(true);

    try {
      // 1. Solicitar permiso de cámara
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (cameraPermission.status !== "granted") {
        Alert.alert(
          "Permiso requerido",
          "Necesitamos acceso a la cámara para tomar fotos. Por favor, habilita el permiso en la configuración de tu dispositivo.",
          [{ text: "OK" }],
        );
        setLoading(false);
        return;
      }

      // 2. Solicitar permiso de galería (opcional)
      const mediaPermission = await MediaLibrary.requestPermissionsAsync();
      const hasMediaPermission = mediaPermission.status === "granted";

      // 3. Tomar la foto
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        exif: false,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        // 4. Procesar la imagen (redimensionar y comprimir)
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 1280 } }],
          { compress: 0.85, format: ImageManipulator.SaveFormat.JPEG },
        );

        const filename = `${photoIdKey}_${Date.now()}.jpg`;
        const permanentUri = `${PHOTOS_DIR}${filename}`;

        // 5. Guardar en el directorio interno (SIEMPRE funciona)
        const sourceFile = new File(manipulatedImage.uri);
        const destFile = new File(permanentUri);
        await sourceFile.copy(destFile);

        // 6. Intentar guardar en galería (solo si hay permiso)
        if (hasMediaPermission) {
          try {
            const asset = await MediaLibrary.createAssetAsync(permanentUri);

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

        // 7. Actualizar el estado usando el método genérico setPhoto
        await setPhoto(photoIdKey, permanentUri, filename);

        // 8. Callback opcional
        if (onPhotoTaken) {
          onPhotoTaken(photoIdKey);
        }
      }
    } catch (error) {
      console.error("Error al tomar foto:", error);
      Alert.alert("Error", "No se pudo tomar la foto. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleImagePress = () => {
    if (uri) {
      setModalVisible(true);
    }
  };

  const handleModalVisible = (visible: boolean) => {
    setModalVisible(visible);
  };

  return (
    <View style={[styles.photoContainer, fullWidth && styles.fullWidth]}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#000080" />
        </View>
      )}

      <View
        style={[
          styles.photoButtonGroup,
          fullWidth && styles.photoButtonGroupFull,
        ]}
      >
        <TouchableOpacity
          style={styles.photoButton}
          onPress={handleTakePhoto}
          disabled={loading || block}
        >
          <Text
            style={[
              styles.photoButtonText,
              {
                fontSize: fullWidth ? 12 : 9,
                fontWeight: fullWidth ? "900" : "bold",
              },
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleTakePhoto}
          disabled={loading || block}
        >
          <Text style={styles.cameraIcon}>📷</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleImagePress} disabled={!uri}>
        <Image
          source={uri ? { uri } : noImg}
          style={[styles.photoPreview, fullWidth && styles.photoPreviewFull]}
        />
      </TouchableOpacity>

      <ModalPhotoPreview
        modalVisible={modalVisible}
        handleModalVisible={handleModalVisible}
        uri={uri}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    width: "48%",
    alignItems: "center",
    marginBottom: 8,
  },
  fullWidth: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 5,
  },
  photoButtonGroup: {
    flexDirection: "row",
    width: "100%",
  },
  photoButtonGroupFull: {
    width: "80%",
  },
  photoButton: {
    flex: 1,
    backgroundColor: "#000080",
    padding: 8,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 40,
  },
  photoButtonText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 12,
  },
  cameraButton: {
    backgroundColor: "#40a9ff",
    padding: 8,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderLeftWidth: 1,
    borderLeftColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
  cameraIcon: {
    fontSize: 18,
  },
  photoPreview: {
    width: 36,
    height: 36,
    borderRadius: 5,
    marginTop: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  photoPreviewFull: {
    marginTop: 0,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
