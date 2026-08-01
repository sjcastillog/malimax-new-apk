import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const pickerOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  quality: 1,
  allowsEditing: false,
};

const CANCELED_RESULT: ImagePicker.ImagePickerResult = {
  canceled: true,
  assets: null,
};

const pickFromCamera = async (): Promise<ImagePicker.ImagePickerResult> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permiso requerido",
      "Necesitamos acceso a la cámara para tomar fotos. Por favor, habilita el permiso en la configuración de tu dispositivo.",
    );
    return CANCELED_RESULT;
  }

  return ImagePicker.launchCameraAsync(pickerOptions);
};

const pickFromGallery = async (): Promise<ImagePicker.ImagePickerResult> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permiso requerido",
      "Necesitamos acceso a tu galería para seleccionar fotos. Por favor, habilita el permiso en la configuración de tu dispositivo.",
    );
    return CANCELED_RESULT;
  }

  return ImagePicker.launchImageLibraryAsync(pickerOptions);
};

/**
 * Pregunta al usuario si quiere tomar una foto nueva o elegir una de la
 * galería, y devuelve el mismo tipo de resultado que
 * ImagePicker.launchCameraAsync, para no tener que tocar el código que
 * procesa la foto en cada pantalla.
 */
export const pickImagePrompt = (): Promise<ImagePicker.ImagePickerResult> => {
  return new Promise((resolve) => {
    Alert.alert(
      "Agregar foto",
      "¿Deseas tomar una foto o elegir una de la galería?",
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => resolve(CANCELED_RESULT),
        },
        {
          text: "Galería",
          onPress: () => resolve(pickFromGallery()),
        },
        {
          text: "Cámara",
          onPress: () => resolve(pickFromCamera()),
        },
      ],
      { cancelable: true, onDismiss: () => resolve(CANCELED_RESULT) },
    );
  });
};
