// common/constants/initial-states/workflow-three-initial.ts

import * as Yup from "yup";

// ============================================
// ESTADO INICIAL
// ============================================
export const initialWorkflowStateThree = {
  // CONTROL
  id: null,
  timeStampSave: "",
  hourSaveUser: "",
  _hasHydrated: false,

  // DATOS DEL PROCESO 2 (READONLY - vienen del proceso anterior)
  container: null,
  client: null,
  clientId: null,
  clientIdentification: null,

  // DATOS DEL PROCESO 3
  entryPort: null,

  // GENERALES
  coordinates: "",
  observation: null,
  hourInit: "",
  hourEnd: "",

  // FOTOS ESTÁTICAS - PANORÁMICO
  containerPanoramicPhoto: "",
  containerPanoramicComment: null,
  containerPanoramicCoordinates: "",

  // FOTOS ESTÁTICAS - NAVIERA
  navieraBottlePhoto: "",
  navieraBottleComment: null,
  navieraWirePhoto: "",
  navieraWireComment: null,
  navieraLabelPhoto: "",
  navieraLabelComment: null,

  // FOTOS ESTÁTICAS - EXPORTADOR
  exporterBottlePhoto: "",
  exporterBottleComment: null,
  exporterWirePhoto: "",
  exporterWireComment: null,
  exporterLabelPhoto: "",
  exporterLabelComment: null,

  // FOTOS ESTÁTICAS - OTRO
  otherBottlePhoto: "",
  otherBottleComment: null,
  otherWirePhoto: "",
  otherWireComment: null,
  otherLabelPhoto: "",
  otherLabelComment: null,

  // FOTOS ESTÁTICAS - GPS
  gpsPhoto: "",
  gpsComment: null,
  gpsStampPhoto: "",
  gpsStampComment: null,

  // IMÁGENES DINÁMICAS
  images: [],
  imagesDelete: [],
};

// ============================================
// FOTOS ESTÁTICAS (12 fotos)
// ============================================
export const photosToGenerateThree = [
  // PANORÁMICO
  { key: "containerPanoramicPhoto", label: "Panorámica Contenedor" },

  // NAVIERA
  { key: "navieraBottlePhoto", label: "Botella Naviera" },
  { key: "navieraWirePhoto", label: "Cable Naviera" },
  { key: "navieraLabelPhoto", label: "Etiqueta Naviera" },

  // EXPORTADOR
  { key: "exporterBottlePhoto", label: "Botella Exportador" },
  { key: "exporterWirePhoto", label: "Cable Exportador" },
  { key: "exporterLabelPhoto", label: "Etiqueta Exportador" },

  // OTRO
  { key: "otherBottlePhoto", label: "Botella Otro" },
  { key: "otherWirePhoto", label: "Cable Otro" },
  { key: "otherLabelPhoto", label: "Etiqueta Otro" },

  // GPS
  { key: "gpsPhoto", label: "GPS" },
  { key: "gpsStampPhoto", label: "Sello GPS" },
];

export const photoKeysThree = [
  // PANORÁMICO
  "containerPanoramicPhoto",

  // NAVIERA
  "navieraBottlePhoto",
  "navieraWirePhoto",
  "navieraLabelPhoto",

  // EXPORTADOR
  "exporterBottlePhoto",
  "exporterWirePhoto",
  "exporterLabelPhoto",

  // OTRO
  "otherBottlePhoto",
  "otherWirePhoto",
  "otherLabelPhoto",

  // GPS
  "gpsPhoto",
  "gpsStampPhoto",
] as const;

export const commentKeysThree = [
  // PANORÁMICO
  "containerPanoramicComment",

  // NAVIERA
  "navieraBottleComment",
  "navieraWireComment",
  "navieraLabelComment",

  // EXPORTADOR
  "exporterBottleComment",
  "exporterWireComment",
  "exporterLabelComment",

  // OTRO
  "otherBottleComment",
  "otherWireComment",
  "otherLabelComment",

  // GPS
  "gpsComment",
  "gpsStampComment",
] as const;

// ============================================
// VALIDACIÓN
// ============================================
const optionalString = (min: number, max: number, label: string) =>
  Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .min(min, `${label} debe tener al menos ${min} caracteres`)
    .max(max, `${label} no puede tener más de ${max} caracteres`)
    .label(label);

export const validationSchemaThree = Yup.object({
  // ============================================
  // CAMPOS OBLIGATORIOS
  // ============================================
  container: Yup.string()
    .required("El Número de Contenedor es requerido")
    .min(5, "El Número de Contenedor debe tener al menos 5 caracteres")
    .max(100, "El Número de Contenedor no puede tener más de 100 caracteres")
    .label("Número de Contenedor"),

  containerPanoramicPhoto: Yup.string()
    .required("La foto panorámica del contenedor es requerida")
    .max(500, "Ruta de foto muy larga")
    .label("Foto Panorámica"),

  // ============================================
  // CAMPOS OPCIONALES
  // ============================================
  entryPort: optionalString(2, 200, "Puerto de Ingreso"),

  coordinates: optionalString(1, 100, "Coordenadas"),

  containerPanoramicCoordinates: optionalString(
    1,
    160,
    "Coordenadas Panorámica",
  ),

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

  // ============================================
  // COMENTARIOS DE FOTOS - max 500 caracteres
  // ============================================
  containerPanoramicComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Panorámica"),

  // NAVIERA
  navieraBottleComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Botella Naviera"),

  navieraWireComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Cable Naviera"),

  navieraLabelComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Etiqueta Naviera"),

  // EXPORTADOR
  exporterBottleComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Botella Exportador"),

  exporterWireComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Cable Exportador"),

  exporterLabelComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Etiqueta Exportador"),

  // OTRO
  otherBottleComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Botella Otro"),

  otherWireComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Cable Otro"),

  otherLabelComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Etiqueta Otro"),

  // GPS
  gpsComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario GPS"),

  gpsStampComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Sello GPS"),

  // ============================================
  // FOTOS OPCIONALES - max 500 caracteres
  // ============================================
  navieraBottlePhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Botella Naviera"),

  navieraWirePhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Cable Naviera"),

  navieraLabelPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Etiqueta Naviera"),

  exporterBottlePhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Botella Exportador"),

  exporterWirePhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Cable Exportador"),

  exporterLabelPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Etiqueta Exportador"),

  otherBottlePhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Botella Otro"),

  otherWirePhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Cable Otro"),

  otherLabelPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Etiqueta Otro"),

  gpsPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto GPS"),

  gpsStampPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Sello GPS"),
});

// ============================================
// HELPER PARA LIMPIAR FOTOS
// ============================================
export class PhotosHelperThree {
  static async cleanupWorkflowMultimedia(
    state: any,
    photoKeys: readonly string[],
  ) {
    const { File } = await import("expo-file-system");
    const PHOTOS_DIR = ""; // Importar de tu constante

    // Limpiar fotos estáticas
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
  }
}