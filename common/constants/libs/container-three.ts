import * as Yup from "yup";

// Límites de caracteres basados en el modelo de base de datos THREE
const CHAR_LIMITS = {
  // VARCHAR(100)
  container: 100,
  coordinates: 100,
  dateCorrection: 100,
  duration: 100,
  date: 100,
  labelSerial: 100,
  startProcess: 100,
  endProcess: 100,
  timeStampSave: 100,

  // VARCHAR(500)
  observation: 500,
  address: 500,

  // Todas las fotos/videos/comentarios - VARCHAR(500)
  photos: 500,
  videos: 500,
  comments: 500,

  // VARCHAR(255)
  companyTransport: 255,
  openedBy: 255,
  typeContainer: 255,
  naviera: 255,
  entryPort: 255,
  driverName: 255,
  city: 255,
  typeReview: 255,
  storageName: 255,

  // VARCHAR(80)
  size: 80,

  // VARCHAR(25)
  plateVehicle: 25,
  driverIdentification: 25,

  // VARCHAR(10)
  hourInit: 10,
  hourEnd: 10,
  hourSave: 10,

  // VARCHAR(5)
  openedWas: 5,

  // VARCHAR(160)
  containerPanoramicCoordinates: 160,
};

export const photosToGenerateThree = [
  // CONTENEDOR
  { key: "containerPanoramicPhoto", label: "Panorámica Contenedor" },
  { key: "containerPanoramicCheck", label: "Panorámica Validación" },

  // NAVIERA
  { key: "navieraBottlePhoto", label: "Botella Naviera" },
  { key: "navieraBottleCheck", label: "Botella Naviera Validación" },
  { key: "navieraWirePhoto", label: "Cable Naviera" },
  { key: "navieraWireCheck", label: "Cable Naviera Validación" },
  { key: "navieraLabelPhoto", label: "Etiqueta Naviera" },
  { key: "navieraLabelCheck", label: "Etiqueta Naviera Validación" },

  // EXPORTADOR
  { key: "exporterBottlePhoto", label: "Botella Exportador" },
  { key: "exporterBottleCheck", label: "Botella Exportador Validación" },
  { key: "exporterWirePhoto", label: "Cable Exportador" },
  { key: "exporterWireCheck", label: "Cable Exportador Validación" },
  { key: "exporterLabelPhoto", label: "Etiqueta Exportador" },
  { key: "exporterLabelCheck", label: "Etiqueta Exportador Validación" },

  // OTRO
  { key: "otherBottlePhoto", label: "Botella Otro" },
  { key: "otherBottleCheck", label: "Botella Otro Validación" },
  { key: "otherWirePhoto", label: "Cable Otro" },
  { key: "otherWireCheck", label: "Cable Otro Validación" },
  { key: "otherLabelPhoto", label: "Etiqueta Otro" },
  { key: "otherLabelCheck", label: "Etiqueta Otro Validación" },

  // GPS
  { key: "gpsPhoto", label: "GPS" },
  { key: "gpsCheck", label: "GPS Validación" },
  { key: "gpsStampPhoto", label: "Sello GPS" },
  { key: "gpsStampCheck", label: "Sello GPS Validación" },

  // INGENIERÍA
  { key: "engineryPhoto1", label: "Ingeniería 1" },
  { key: "engineryCheck1", label: "Ingeniería 1 Validación" },
  { key: "engineryPhoto2", label: "Ingeniería 2" },
  { key: "engineryCheck2", label: "Ingeniería 2 Validación" },
];

const optionalString = (min: number, max: number, label: string) =>
  Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .min(min, `${label} debe tener al menos ${min} caracteres`)
    .max(max, `${label} no puede tener más de ${max} caracteres`)
    .trim()
    .label(label);

export const validationSchemaThree = Yup.object({
  // ============================================
  // CAMPOS OBLIGATORIOS
  // ============================================

  container: Yup.string()
    .required("El Número de Contenedor es requerido")
    .min(5, "El Número de Contenedor debe tener al menos 5 caracteres")
    .max(
      CHAR_LIMITS.container,
      `El Número de Contenedor no puede tener más de ${CHAR_LIMITS.container} caracteres`,
    )
    .trim()
    .label("Número de Contenedor"),

  labelSerial: Yup.string()
    .required("El Número de Etiqueta es requerido")
    .min(2, "El Número de Etiqueta debe tener al menos 2 caracteres")
    .max(
      CHAR_LIMITS.labelSerial,
      `El Número de Etiqueta no puede tener más de ${CHAR_LIMITS.labelSerial} caracteres`,
    )
    .trim()
    .label("Número de Etiqueta"),

  containerPanoramicPhoto: Yup.string()
    .required("Foto panorámica del contenedor es requerida")
    .max(
      CHAR_LIMITS.photos,
      `Ruta de foto no puede tener más de ${CHAR_LIMITS.photos} caracteres`,
    )
    .label("Foto panorámica contenedor"),

  // ============================================
  // CAMPOS OPCIONALES - DATOS BÁSICOS
  // ============================================

  coordinates: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.coordinates,
      `Coordenadas no puede tener más de ${CHAR_LIMITS.coordinates} caracteres`,
    )
    .trim()
    .label("Coordenadas"),

  // ============================================
  // CAMPOS OPCIONALES - CONTENEDOR
  // ============================================

  companyTransport: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .min(3, "Compañía de Transporte debe tener al menos 3 caracteres")
    .max(
      CHAR_LIMITS.companyTransport,
      `Compañía de Transporte no puede tener más de ${CHAR_LIMITS.companyTransport} caracteres`,
    )
    .trim()
    .label("Compañía de Transporte"),

  openedBy: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .min(2, "Abierto Por debe tener al menos 2 caracteres")
    .max(
      CHAR_LIMITS.openedBy,
      `Abierto Por no puede tener más de ${CHAR_LIMITS.openedBy} caracteres`,
    )
    .trim()
    .label("Abierto Por"),

  openedWas: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.openedWas,
      `Fue Abierto no puede tener más de ${CHAR_LIMITS.openedWas} caracteres`,
    )
    .trim()
    .label("Fue Abierto"),

  typeContainer: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .min(3, "Tipo de Contenedor debe tener al menos 3 caracteres")
    .max(
      CHAR_LIMITS.typeContainer,
      `Tipo de Contenedor no puede tener más de ${CHAR_LIMITS.typeContainer} caracteres`,
    )
    .trim()
    .label("Tipo de Contenedor"),

  naviera: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .min(3, "Naviera debe tener al menos 3 caracteres")
    .max(
      CHAR_LIMITS.naviera,
      `Naviera no puede tener más de ${CHAR_LIMITS.naviera} caracteres`,
    )
    .trim()
    .label("Naviera"),

  entryPort: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .min(2, "Puerto de Ingreso debe tener al menos 2 caracteres")
    .max(
      CHAR_LIMITS.entryPort,
      `Puerto de Ingreso no puede tener más de ${CHAR_LIMITS.entryPort} caracteres`,
    )
    .trim()
    .label("Puerto de Ingreso"),

  size: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.size,
      `Tamaño no puede tener más de ${CHAR_LIMITS.size} caracteres`,
    )
    .trim()
    .label("Tamaño"),

  // ============================================
  // CAMPOS OPCIONALES - CONDUCTOR
  // ============================================

  plateVehicle: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .min(5, "Placa Vehicular debe tener al menos 5 caracteres")
    .max(
      CHAR_LIMITS.plateVehicle,
      `Placa Vehicular no puede tener más de ${CHAR_LIMITS.plateVehicle} caracteres`,
    )
    .trim()
    .label("Placa Vehicular"),

  driverName: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .min(5, "Nombre del Conductor debe tener al menos 5 caracteres")
    .max(
      CHAR_LIMITS.driverName,
      `Nombre del Conductor no puede tener más de ${CHAR_LIMITS.driverName} caracteres`,
    )
    .trim()
    .label("Nombre del Conductor"),

  driverIdentification: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .min(10, "Cédula del Conductor debe tener al menos 10 caracteres")
    .max(
      CHAR_LIMITS.driverIdentification,
      `Cédula del Conductor no puede tener más de ${CHAR_LIMITS.driverIdentification} caracteres`,
    )
    .trim()
    .label("Cédula del Conductor"),

  // ============================================
  // CAMPOS OPCIONALES - UBICACIÓN
  // ============================================

  address: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .min(5, "Dirección debe tener al menos 5 caracteres")
    .max(
      CHAR_LIMITS.address,
      `Dirección no puede tener más de ${CHAR_LIMITS.address} caracteres`,
    )
    .trim()
    .label("Dirección"),

  city: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .min(2, "Ciudad debe tener al menos 2 caracteres")
    .max(
      CHAR_LIMITS.city,
      `Ciudad no puede tener más de ${CHAR_LIMITS.city} caracteres`,
    )
    .trim()
    .label("Ciudad"),

  typeReview: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .min(2, "Tipo de Revisión debe tener al menos 2 caracteres")
    .max(
      CHAR_LIMITS.typeReview,
      `Tipo de Revisión no puede tener más de ${CHAR_LIMITS.typeReview} caracteres`,
    )
    .trim()
    .label("Tipo de Revisión"),

  storageName: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .min(2, "Nombre de Patio/Acopio debe tener al menos 2 caracteres")
    .max(
      CHAR_LIMITS.storageName,
      `Nombre de Patio/Acopio no puede tener más de ${CHAR_LIMITS.storageName} caracteres`,
    )
    .trim()
    .label("Nombre de Patio/Acopio"),

  // ============================================
  // CAMPOS OPCIONALES - HORAS
  // ============================================

  startProcess: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.startProcess,
      `Hora de inicio no puede tener más de ${CHAR_LIMITS.startProcess} caracteres`,
    )
    .trim()
    .label("Hora Inicio de Proceso"),

  endProcess: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.endProcess,
      `Hora de fin no puede tener más de ${CHAR_LIMITS.endProcess} caracteres`,
    )
    .trim()
    .label("Hora Fin de Proceso"),

  hourInit: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.hourInit,
      `Hora de inicio no puede tener más de ${CHAR_LIMITS.hourInit} caracteres`,
    )
    .trim()
    .label("Hora Inicio"),

  hourEnd: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.hourEnd,
      `Hora de fin no puede tener más de ${CHAR_LIMITS.hourEnd} caracteres`,
    )
    .trim()
    .label("Hora Fin"),

  // ============================================
  // CAMPOS OPCIONALES - OBSERVACIONES
  // ============================================

  observation: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.observation,
      `Observación no puede tener más de ${CHAR_LIMITS.observation} caracteres`,
    )
    .trim()
    .label("Observación"),

  // ============================================
  // COMENTARIOS - max 500 caracteres
  // ============================================

  containerPanoramicComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.comments,
      `Comentario no puede tener más de ${CHAR_LIMITS.comments} caracteres`,
    )
    .trim()
    .label("Comentario Panorámica Contenedor"),

  containerPanoramicCoordinates: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.containerPanoramicCoordinates,
      `Coordenadas no puede tener más de ${CHAR_LIMITS.containerPanoramicCoordinates} caracteres`,
    )
    .trim()
    .label("Coordenadas Panorámica Contenedor"),

  navieraBottleComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.comments,
      `Comentario no puede tener más de ${CHAR_LIMITS.comments} caracteres`,
    )
    .trim()
    .label("Comentario Botella Naviera"),

  navieraWireComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.comments,
      `Comentario no puede tener más de ${CHAR_LIMITS.comments} caracteres`,
    )
    .trim()
    .label("Comentario Cable Naviera"),

  navieraLabelComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.comments,
      `Comentario no puede tener más de ${CHAR_LIMITS.comments} caracteres`,
    )
    .trim()
    .label("Comentario Etiqueta Naviera"),

  exporterBottleComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.comments,
      `Comentario no puede tener más de ${CHAR_LIMITS.comments} caracteres`,
    )
    .trim()
    .label("Comentario Botella Exportador"),

  exporterWireComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.comments,
      `Comentario no puede tener más de ${CHAR_LIMITS.comments} caracteres`,
    )
    .trim()
    .label("Comentario Cable Exportador"),

  exporterLabelComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.comments,
      `Comentario no puede tener más de ${CHAR_LIMITS.comments} caracteres`,
    )
    .trim()
    .label("Comentario Etiqueta Exportador"),

  otherBottleComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.comments,
      `Comentario no puede tener más de ${CHAR_LIMITS.comments} caracteres`,
    )
    .trim()
    .label("Comentario Botella Otro"),

  otherWireComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.comments,
      `Comentario no puede tener más de ${CHAR_LIMITS.comments} caracteres`,
    )
    .trim()
    .label("Comentario Cable Otro"),

  otherLabelComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.comments,
      `Comentario no puede tener más de ${CHAR_LIMITS.comments} caracteres`,
    )
    .trim()
    .label("Comentario Etiqueta Otro"),

  gpsComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.comments,
      `Comentario no puede tener más de ${CHAR_LIMITS.comments} caracteres`,
    )
    .trim()
    .label("Comentario GPS"),

  gpsStampComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.comments,
      `Comentario no puede tener más de ${CHAR_LIMITS.comments} caracteres`,
    )
    .trim()
    .label("Comentario Sello GPS"),

  engineryComment1: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.comments,
      `Comentario no puede tener más de ${CHAR_LIMITS.comments} caracteres`,
    )
    .trim()
    .label("Comentario Ingeniería 1"),

  engineryComment2: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.comments,
      `Comentario no puede tener más de ${CHAR_LIMITS.comments} caracteres`,
    )
    .trim()
    .label("Comentario Ingeniería 2"),

  engineryVideoComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.comments,
      `Comentario no puede tener más de ${CHAR_LIMITS.comments} caracteres`,
    )
    .trim()
    .label("Comentario Video Ingeniería"),

  doorVideoComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.comments,
      `Comentario no puede tener más de ${CHAR_LIMITS.comments} caracteres`,
    )
    .trim()
    .label("Comentario Video Puerta"),

  // ============================================
  // FOTOS - max 500 caracteres
  // ============================================

  containerPanoramicCheck: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.photos,
      `Ruta de foto no puede tener más de ${CHAR_LIMITS.photos} caracteres`,
    )
    .label("Foto Panorámica Validación"),

  // ... (resto de fotos con mismo patrón)

  // ============================================
  // VIDEOS - max 500 caracteres
  // ============================================

  engineryVideo: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.videos,
      `Ruta de video no puede tener más de ${CHAR_LIMITS.videos} caracteres`,
    )
    .label("Video Ingeniería"),

  engineryVideoCheck: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.videos,
      `Ruta de video no puede tener más de ${CHAR_LIMITS.videos} caracteres`,
    )
    .label("Video Ingeniería Validación"),

  doorVideo: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.videos,
      `Ruta de video no puede tener más de ${CHAR_LIMITS.videos} caracteres`,
    )
    .label("Video Puerta"),

  doorVideoCheck: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(
      CHAR_LIMITS.videos,
      `Ruta de video no puede tener más de ${CHAR_LIMITS.videos} caracteres`,
    )
    .label("Video Puerta Validación"),
});

export const initialWorkflowStateThree = {
  // CONTROL
  id: null,
  step: "Formulario",
  createdByAdmin: null,

  // CLIENTE
  client: null,
  clientId: null,
  clientIdentification: null,

  // DATOS BÁSICOS
  container: null,
  labelSerial: null,
  coordinates: "",

  // APERTURA
  openedBy: "",
  openedWas: "No",

  // HORAS
  hourInit: "",
  hourEnd: "",
  startProcess: "",
  endProcess: "",

  // UBICACIÓN
  address: "",
  city: "",
  typeReview: "",
  storageName: "",
  entryPort: null,

  // CONTENEDOR
  typeContainer: null,
  naviera: null,
  size: null,

  // CONDUCTOR
  driverName: "",
  driverIdentification: "",
  plateVehicle: "",
  companyTransport: null,

  // OBSERVACIONES
  observation: "",

  // FOTOS CONTENEDOR
  containerPanoramicPhoto: "",
  containerPanoramicStatus: false,
  containerPanoramicCheck: "",
  containerPanoramicB64Check: "",
  containerPanoramicComment: "",
  containerPanoramicCoordinates: "",

  // FOTOS NAVIERA
  navieraBottlePhoto: "",
  navieraBottleComment: "",
  navieraBottleStatus: false,
  navieraBottleCheck: "",
  navieraBottleB64Check: "",

  navieraWirePhoto: "",
  navieraWireComment: "",
  navieraWireStatus: false,
  navieraWireCheck: "",
  navieraWireB64Check: "",

  navieraLabelPhoto: "",
  navieraLabelComment: "",
  navieraLabelStatus: false,
  navieraLabelCheck: "",
  navieraLabelB64Check: "",

  // FOTOS EXPORTADOR
  exporterBottlePhoto: "",
  exporterBottleComment: "",
  exporterBottleStatus: false,
  exporterBottleCheck: "",
  exporterBottleB64Check: "",

  exporterWirePhoto: "",
  exporterWireComment: "",
  exporterWireStatus: false,
  exporterWireCheck: "",
  exporterWireB64Check: "",

  exporterLabelPhoto: "",
  exporterLabelComment: "",
  exporterLabelStatus: false,
  exporterLabelCheck: "",
  exporterLabelB64Check: "",

  // FOTOS OTRO
  otherBottlePhoto: "",
  otherBottleComment: "",
  otherBottleStatus: false,
  otherBottleCheck: "",
  otherBottleB64Check: "",

  otherWirePhoto: "",
  otherWireComment: "",
  otherWireStatus: false,
  otherWireCheck: "",
  otherWireB64Check: "",

  otherLabelPhoto: "",
  otherLabelComment: "",
  otherLabelStatus: false,
  otherLabelCheck: "",
  otherLabelB64Check: "",

  // FOTOS GPS
  gpsPhoto: "",
  gpsComment: "",
  gpsStatus: false,
  gpsCheck: "",
  gpsB64Check: "",

  gpsStampPhoto: "",
  gpsStampStatus: false,
  gpsStampComment: "",
  gpsStampCheck: "",
  gpsStampB64Check: "",

  // FOTOS INGENIERÍA
  engineryPhoto1: "",
  engineryComment1: "",
  engineryStatus1: false,
  engineryCheck1: "",
  engineryB64Check1: "",

  engineryPhoto2: "",
  engineryComment2: "",
  engineryStatus2: false,
  engineryCheck2: "",
  engineryB64Check2: "",

  // VIDEOS
  engineryVideo: "",
  engineryVideoStatus: false,
  engineryVideoCheck: "",
  engineryVideoB64Check: "",
  engineryVideoComment: "",

  doorVideo: "",
  doorVideoStatus: false,
  doorVideoCheck: "",
  doorVideoB64Check: "",
  doorVideoComment: "",

  // CONTROL
  _hasHydrated: false,

  // OTHERS
  timeStampSave: "",
  firstTakePhoto: "",
  hourSaveUser: "",
};

export const photoKeysThree = [
  // CONTENEDOR
  "containerPanoramicPhoto",
  "containerPanoramicCheck",

  // NAVIERA
  "navieraBottlePhoto",
  "navieraBottleCheck",
  "navieraWirePhoto",
  "navieraWireCheck",
  "navieraLabelPhoto",
  "navieraLabelCheck",

  // EXPORTADOR
  "exporterBottlePhoto",
  "exporterBottleCheck",
  "exporterWirePhoto",
  "exporterWireCheck",
  "exporterLabelPhoto",
  "exporterLabelCheck",

  // OTRO
  "otherBottlePhoto",
  "otherBottleCheck",
  "otherWirePhoto",
  "otherWireCheck",
  "otherLabelPhoto",
  "otherLabelCheck",

  // GPS
  "gpsPhoto",
  "gpsCheck",
  "gpsStampPhoto",
  "gpsStampCheck",

  // INGENIERÍA
  "engineryPhoto1",
  "engineryCheck1",
  "engineryPhoto2",
  "engineryCheck2",
] as const;

export const videoKeysThree = [
  "engineryVideo",
  "engineryVideoCheck",
  "doorVideo",
  "doorVideoCheck",
] as const;

export const commentKeysThree = [
  // CONTENEDOR
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

  // INGENIERÍA
  "engineryComment1",
  "engineryComment2",
  "engineryVideoComment",
  "doorVideoComment",
] as const;

class PhotosHelper {
  static async cleanupWorkflowMultimedia(
    state: any,
    photoKeys: readonly string[],
    videoKeys: readonly string[],
  ) {
    const { File } = await import("expo-file-system");
    const PHOTOS_DIR = ""; // Importar de tu constante

    // Limpiar fotos
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

    // Limpiar videos
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

// Helper para validar longitud de campos antes de enviar
export const validateFieldLengthsThree = (
  data: Record<string, any>,
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  // Validar campos de texto
  if (data.container && data.container.length > CHAR_LIMITS.container) {
    errors.push(`Contenedor excede ${CHAR_LIMITS.container} caracteres`);
  }

  if (data.labelSerial && data.labelSerial.length > CHAR_LIMITS.labelSerial) {
    errors.push(`Etiqueta Serial excede ${CHAR_LIMITS.labelSerial} caracteres`);
  }

  if (data.observation && data.observation.length > CHAR_LIMITS.observation) {
    errors.push(`Observación excede ${CHAR_LIMITS.observation} caracteres`);
  }

  if (
    data.companyTransport &&
    data.companyTransport.length > CHAR_LIMITS.companyTransport
  ) {
    errors.push(
      `Compañía de Transporte excede ${CHAR_LIMITS.companyTransport} caracteres`,
    );
  }

  if (
    data.plateVehicle &&
    data.plateVehicle.length > CHAR_LIMITS.plateVehicle
  ) {
    errors.push(`Placa excede ${CHAR_LIMITS.plateVehicle} caracteres`);
  }

  if (data.driverName && data.driverName.length > CHAR_LIMITS.driverName) {
    errors.push(
      `Nombre del Conductor excede ${CHAR_LIMITS.driverName} caracteres`,
    );
  }

  if (
    data.driverIdentification &&
    data.driverIdentification.length > CHAR_LIMITS.driverIdentification
  ) {
    errors.push(
      `Cédula del Conductor excede ${CHAR_LIMITS.driverIdentification} caracteres`,
    );
  }

  if (data.city && data.city.length > CHAR_LIMITS.city) {
    errors.push(`Ciudad excede ${CHAR_LIMITS.city} caracteres`);
  }

  if (data.address && data.address.length > CHAR_LIMITS.address) {
    errors.push(`Dirección excede ${CHAR_LIMITS.address} caracteres`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Exportar constantes
export { CHAR_LIMITS };
