// common/constants/initial-states/workflow-two-initial.ts

import * as Yup from "yup";

// ============================================
// ESTADO INICIAL
// ============================================
export const initialWorkflowStateTwo = {
  // CONTROL
  id: null,
  timeStampSave: "",
  hourSaveUser: "",
  _hasHydrated: false,

  // DATOS DEL PROCESO 1 (READONLY - vienen del proceso anterior)
  container: null,
  client: null,
  clientId: null,
  clientIdentification: null,

  // DATOS DEL PROCESO 2
  product: "",
  presentation: "",
  numberPallet: null,
  numberPresentation: null,
  numberSampling: null,

  // GENERALES
  coordinates: "",
  observation: null,
  hourInit: "",
  hourEnd: "",

  // IMÁGENES DINÁMICAS
  images: [],
  imagesDelete: [],
};

// ============================================
// NO HAY FOTOS ESTÁTICAS EN ESTE PROCESO
// ============================================
export const photoKeysTwo = [] as const;
export const videoKeysTwo = [] as const;
export const commentKeysTwo = [] as const;

// ============================================
// VALIDACIÓN
// ============================================
const optionalString = (min: number, max: number, label: string) =>
  Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .min(min, `${label} debe tener al menos ${min} caracteres`)
    .max(max, `${label} no puede tener más de ${max} caracteres`)
    .label(label);

export const validationSchemaTwo = Yup.object({
  // CAMPOS OBLIGATORIOS
  container: Yup.string()
    .required("El Número de Contenedor es requerido")
    .min(5, "El Número de Contenedor debe tener al menos 5 caracteres")
    .max(100, "El Número de Contenedor no puede tener más de 100 caracteres")
    .label("Número de Contenedor"),

  product: Yup.string()
    .required("El Producto es requerido")
    .min(2, "El Producto debe tener al menos 2 caracteres")
    .max(255, "El Producto no puede tener más de 255 caracteres")
    .label("Producto"),

  presentation: Yup.string()
    .required("La Presentación es requerida")
    .min(2, "La Presentación debe tener al menos 2 caracteres")
    .max(255, "La Presentación no puede tener más de 255 caracteres")
    .label("Presentación"),

  // CAMPOS OPCIONALES
  numberPallet: optionalString(1, 50, "Número de Pallets"),
  numberPresentation: optionalString(1, 50, "Número de Presentaciones"),
  numberSampling: optionalString(1, 50, "Número de Muestreo"),
  coordinates: optionalString(1, 100, "Coordenadas"),

  observation: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Observación no puede tener más de 500 caracteres")
    .label("Observación"),

  hourInit: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(10, "Hora de inicio muy larga")
    .label("Hora Inicio"),

  hourEnd: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(10, "Hora de fin muy larga")
    .label("Hora Fin"),
});

// ============================================
// HELPER PARA LIMPIAR FOTOS
// ============================================
export class PhotosHelper {
  static async cleanupWorkflowMultimedia(
    state: any,
    photoKeys: readonly string[],
    videoKeys: readonly string[],
  ) {
    const { File } = await import("expo-file-system");
    const PHOTOS_DIR = ""; // Importar de tu constante

    // Limpiar fotos (aunque este proceso no tiene fotos estáticas)
    for (const key of photoKeys) {
      const photoFilename = state[key];
      if (photoFilename) {
        try {
          const photoPath = `${PHOTOS_DIR}${photoFilename}`;
          const fileToDelete = new File(photoPath);
          if (fileToDelete.exists) {
            await fileToDelete.delete();
          }
        } catch (error) {
          console.error(`Error eliminando foto ${key}:`, error);
        }
      }
    }

    // Limpiar videos (aunque este proceso no tiene videos)
    for (const key of videoKeys) {
      const videoPath = state[key];
      if (videoPath && !videoPath.startsWith("http")) {
        try {
          const fileToDelete = new File(videoPath);
          if (fileToDelete.exists) {
            await fileToDelete.delete();
          }
        } catch (error) {
          console.error(`Error eliminando video ${key}:`, error);
        }
      }
    }
  }
}