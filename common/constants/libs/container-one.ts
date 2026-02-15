import * as Yup from "yup";

export const photosToGenerateOne = [
  // DOCUMENTOS
  { key: "emptyEirPhoto", label: "EIR" },
  { key: "emptyPlatePhoto", label: "Placa" },
  { key: "emptyPreviousInspectionDocumentPhoto", label: "Doc. Inspección" },
  { key: "emptyDriverIdentificationPhoto", label: "C.I. Conductor" },

  // PUERTA SIN APERTURAR
  { key: "emptyPanoramicPhoto", label: "Foto Panorámica" },
  { key: "emptyStampNavieraPhoto", label: "Sello Naviera" },
  { key: "emptyAditionalStampPhoto", label: "Sello Adicional" },
  { key: "emptyOtherStampPhoto", label: "Otro Sello" },
  { key: "emptySatelliteLockPhoto", label: "Candado Satelital" },
  { key: "emptySatelliteLockStampPhoto", label: "Sello Candado GPS" },

  // FOTOS EXTERNAS
  { key: "emptySideRightPhoto", label: "Lado Derecho" },
  { key: "emptySideLeftPhoto", label: "Lado Izquierdo" },
  { key: "emptySideUpPhoto", label: "Arriba" },
  { key: "emptySideDownPhoto", label: "Abajo" },
  { key: "emptyFrontPhoto", label: "Frontal" },
  { key: "emptyRearPhoto", label: "Posterior" },

  // FOTOS INTERNAS
  { key: "emptyFloorPhoto", label: "Piso" },
  { key: "emptyRoofPhoto", label: "Techo" },
  { key: "emptyMirrorCoverPhoto", label: "Tapa Espejo" },
  { key: "emptyInternalPhoto1", label: "Interna 1" },
  { key: "emptyInternalPhoto2", label: "Interna 2" },
  { key: "emptyInternalPhoto3", label: "Interna 3" },
  { key: "emptyInternalPhoto4", label: "Interna 4" },
  { key: "emptyInternalPhoto5", label: "Interna 5" },
  { key: "emptyInternalPhoto6", label: "Interna 6" },

  // FOTOS SALIDA/REVISADO
  { key: "exitOtherStampPhoto", label: "Otro Sello (Salida)" },
  { key: "exitPanoramicPhoto", label: "Panorámica (Salida)" },
  { key: "exitStampNavieraPhoto", label: "Sello Naviera (Salida)" },
  { key: "exitSatelliteLockStampPhoto", label: "Sello Candado GPS (Salida)" },
  { key: "exitEngineryPhoto1", label: "Ingeniería 1" },
  { key: "exitEngineryPhoto2", label: "Ingeniería 2" },
];

const optionalString = (min: number, max: number, label: string) =>
  Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .min(min, `${label} debe tener al menos ${min} caracteres`)
    .max(max, `${label} no puede tener más de ${max} caracteres`)
    .label(label);

export const validationSchemaOne = Yup.object({
  container: Yup.string()
    .required("El Número de Contenedor es requerido")
    .min(5, "El Número de Contenedor debe tener al menos 5 caracteres")
    .max(100, "El Número de Contenedor no puede tener más de 100 caracteres")
    .label("Número de Contenedor"),

  labelSerial: Yup.string()
    .required("El Número de Etiqueta es requerido")
    .min(2, "El Número de Etiqueta debe tener al menos 2 caracteres")
    .max(100, "El Número de Etiqueta no puede tener más de 100 caracteres")
    .label("Número de Etiqueta"),

  emptyPanoramicPhoto: Yup.string()
    .required("Foto panorámica es requerida")
    .max(500, "Ruta de foto muy larga")
    .label("Foto panorámica"),

  // ============================================
  // CAMPOS OPCIONALES - DATOS BÁSICOS
  // ============================================

  coordinates: optionalString(1, 100, "Coordenadas"),
  duration: optionalString(1, 100, "Duración"),
  dateCorrection: optionalString(1, 100, "Fecha de Corrección"),

  // ============================================
  // CAMPOS OPCIONALES - CONTENEDOR
  // ============================================

  companyTransport: optionalString(3, 200, "Compañía de Transporte"),
  openedBy: optionalString(2, 200, "Abierto Por"),
  openedWas: optionalString(2, 5, "Fue Abierto"),
  typeContainer: optionalString(3, 200, "Tipo de Contenedor"),
  naviera: optionalString(3, 200, "Naviera"),
  entryPort: optionalString(2, 200, "Puerto de Ingreso"),

  size: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(80, "Tamaño no puede tener más de 80 caracteres")
    .label("Tamaño"),

  // ============================================
  // CAMPOS OPCIONALES - CONDUCTOR
  // ============================================

  plateVehicle: optionalString(5, 20, "Placa Vehicular"),
  driverName: optionalString(5, 255, "Nombre del Conductor"),
  driverIdentification: optionalString(10, 25, "Cédula del Conductor"),

  // ============================================
  // CAMPOS OPCIONALES - UBICACIÓN
  // ============================================

  address: optionalString(5, 500, "Dirección"),
  city: optionalString(2, 200, "Ciudad"),
  typeReview: optionalString(2, 200, "Tipo de Revisión"),
  storageName: optionalString(2, 250, "Nombre de Patio/Acopio"),

  // ============================================
  // CAMPOS OPCIONALES - HORAS
  // ============================================

  startProcess: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(100, "Hora de inicio muy larga")
    .label("Hora Inicio de Proceso"),

  endProcess: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(100, "Hora de fin muy larga")
    .label("Hora Fin de Proceso"),

  hourInit: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(10, "Hora de inicio muy larga")
    .label("Hora Inicio"),

  hourEnd: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(10, "Hora de fin muy larga")
    .label("Hora Fin"),

  // ============================================
  // CAMPOS OPCIONALES - OBSERVACIONES
  // ============================================

  observation: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Observación no puede tener más de 500 caracteres")
    .label("Observación"),

  // ============================================
  // COMENTARIOS - max 500 caracteres
  // ============================================

  emptyPanoramicComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Foto Panorámica"),

  emptyPanoramicCoordinates: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Coordenadas muy largas")
    .label("Coordenadas Panorámica"),

  emptyAditionalStampComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Sello Adicional"),

  emptyStampNavieraComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Sello Naviera"),

  emptyOtherStampComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Otro Sello"),

  emptySatelliteLockStampComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Sello Candado Satelital"),

  emptySatelliteLockComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Candado Satelital"),

  emptyFloorComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Piso"),

  emptyRoofComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Techo"),

  emptyMirrorCoverComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Tapa Espejo"),

  emptyInternalComment1: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Interno 1"),

  emptyInternalComment2: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Interno 2"),

  emptyInternalComment3: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Interno 3"),

  emptyInternalComment4: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Interno 4"),

  emptyInternalComment5: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Interno 5"),

  emptyInternalComment6: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Interno 6"),

  exitOtherStampComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Otro Sello Salida"),

  exitSatelliteLockStampComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Sello Candado Salida"),

  exitPanoramicComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Panorámica Salida"),

  exitStampNavieraComment: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Sello Naviera Salida"),

  exitEngineryComment1: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Ingeniería 1"),

  exitEngineryComment2: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Comentario muy largo")
    .label("Comentario Ingeniería 2"),

  // ============================================
  // FOTOS - max 500 caracteres (excepto photo6)
  // ============================================

  emptyAditionalStampPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Sello Adicional"),

  emptyStampNavieraPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Sello Naviera"),

  emptyOtherStampPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Otro Sello"),

  emptySatelliteLockStampPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Sello Candado Satelital"),

  emptySatelliteLockPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Candado Satelital"),

  emptySideRightPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Lado Derecho"),

  emptySideLeftPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Lado Izquierdo"),

  emptySideUpPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Arriba"),

  emptySideDownPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Abajo"),

  emptyFrontPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Frontal"),

  emptyRearPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Posterior"),

  emptyEirPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto EIR"),

  emptyPreviousInspectionDocumentPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Documento Inspección"),

  emptyPlatePhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Placa"),

  emptyDriverIdentificationPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto C.I. Conductor"),

  emptyFloorPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Piso"),

  emptyRoofPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Techo"),

  emptyMirrorCoverPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Tapa Espejo"),

  emptyInternalPhoto1: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Interna 1"),

  emptyInternalPhoto2: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Interna 2"),

  emptyInternalPhoto3: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Interna 3"),

  emptyInternalPhoto4: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Interna 4"),

  emptyInternalPhoto5: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Interna 5"),

  // ⚠️ Nota: emptyInternalPhoto6 tiene max 100 en BD (diferente a las demás)
  emptyInternalPhoto6: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(100, "Ruta de foto muy larga")
    .label("Foto Interna 6"),

  exitOtherStampPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Otro Sello Salida"),

  exitPanoramicPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Panorámica Salida"),

  exitStampNavieraPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Sello Naviera Salida"),

  exitSatelliteLockStampPhoto: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Sello Candado Salida"),

  exitEngineryPhoto1: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Ingeniería 1"),

  exitEngineryPhoto2: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de foto muy larga")
    .label("Foto Ingeniería 2"),

  // ============================================
  // VIDEOS - max 500 caracteres
  // ============================================

  emptyInternalVideo: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de video muy larga")
    .label("Video Interno"),

  exitDoorVideo: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de video muy larga")
    .label("Video Puerta Salida"),

  exitEngineryVideo: Yup.string()
    .transform((value) => (value?.trim() === "" ? undefined : value))
    .max(500, "Ruta de video muy larga")
    .label("Video Ingeniería Salida"),
});

export const initialWorkflowStateOne = {
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
  observation: null,

  // IMÁGENES
  quantityImages: 8,
  images: [],
  imagesDelete: [],

  // FOTOS VACIO EXTERNO
  emptyPanoramicPhoto: "",
  emptyPanoramicComment: null,
  emptyPanoramicCoordinates: "",
  emptyStampNavieraPhoto: "",
  emptyStampNavieraComment: null,
  emptyOtherStampPhoto: "",
  emptyOtherStampComment: null,
  emptySatelliteLockStampPhoto: "",
  emptySatelliteLockStampComment: null,
  emptySatelliteLockPhoto: "",
  emptySatelliteLockComment: null,
  emptyAditionalStampPhoto: "",
  emptyAditionalStampComment: null,
  emptySideRightPhoto: "",
  emptySideLeftPhoto: "",
  emptySideUpPhoto: "",
  emptySideDownPhoto: "",
  emptyFrontPhoto: "",
  emptyRearPhoto: "",
  emptyEirPhoto: "",
  emptyPreviousInspectionDocumentPhoto: "",
  emptyPlatePhoto: "",
  emptyDriverIdentificationPhoto: "",

  // FOTOS VACIO INTERNO
  emptyFloorPhoto: "",
  emptyRoofPhoto: "",
  emptyMirrorCoverPhoto: "",
  emptyInternalPhoto1: "",
  emptyInternalPhoto2: "",
  emptyInternalPhoto3: "",
  emptyInternalPhoto4: "",
  emptyInternalPhoto5: "",
  emptyInternalPhoto6: "",
  emptyFloorComment: null,
  emptyRoofComment: null,
  emptyMirrorCoverComment: null,
  emptyInternalComment1: null,
  emptyInternalComment2: null,
  emptyInternalComment3: null,
  emptyInternalComment4: null,
  emptyInternalComment5: null,
  emptyInternalComment6: null,
  emptyInternalVideo: "",

  // FOTOS FULL/SALIDA
  exitOtherStampPhoto: "",
  exitPanoramicPhoto: "",
  exitStampNavieraPhoto: "",
  exitSatelliteLockStampPhoto: "",
  exitEngineryPhoto1: "",
  exitEngineryPhoto2: "",
  exitOtherStampComment: null,
  exitSatelliteLockStampComment: null,
  exitPanoramicComment: null,
  exitStampNavieraComment: null,
  exitEngineryComment1: null,
  exitEngineryComment2: null,
  exitDoorVideo: "",
  exitEngineryVideo: "",

  // CONTROL
  _hasHydrated: false,

  // OTHERS
  timeStampSave: "",
  firstTakePhoto: "",
  hourSaveUser: "",
};

export const photoKeysOne = [
  // DOCUMENTOS
  "emptyEirPhoto",
  "emptyPlatePhoto",
  "emptyPreviousInspectionDocumentPhoto",
  "emptyDriverIdentificationPhoto",

  // PUERTA SIN APERTURAR
  "emptyPanoramicPhoto",
  "emptyStampNavieraPhoto",
  "emptyAditionalStampPhoto",
  "emptyOtherStampPhoto",
  "emptySatelliteLockPhoto",
  "emptySatelliteLockStampPhoto",

  // FOTOS EXTERNAS
  "emptySideRightPhoto",
  "emptySideLeftPhoto",
  "emptySideUpPhoto",
  "emptySideDownPhoto",
  "emptyFrontPhoto",
  "emptyRearPhoto",

  // FOTOS INTERNAS
  "emptyFloorPhoto",
  "emptyRoofPhoto",
  "emptyMirrorCoverPhoto",
  "emptyInternalPhoto1",
  "emptyInternalPhoto2",
  "emptyInternalPhoto3",
  "emptyInternalPhoto4",
  "emptyInternalPhoto5",
  "emptyInternalPhoto6",

  // FOTOS SALIDA
  "exitOtherStampPhoto",
  "exitPanoramicPhoto",
  "exitStampNavieraPhoto",
  "exitSatelliteLockStampPhoto",
  "exitEngineryPhoto1",
  "exitEngineryPhoto2",
] as const;

export const videoKeysOne = [
  "emptyInternalVideo",
  "exitDoorVideo",
  "exitEngineryVideo",
] as const;

export const commentKeysOne = [
  "emptyPanoramicComment",
  "emptyStampNavieraComment",
  "emptyOtherStampComment",
  "emptySatelliteLockStampComment",
  "emptySatelliteLockComment",
  "emptyAditionalStampComment",
  "emptyFloorComment",
  "emptyRoofComment",
  "emptyMirrorCoverComment",
  "emptyInternalComment1",
  "emptyInternalComment2",
  "emptyInternalComment3",
  "emptyInternalComment4",
  "emptyInternalComment5",
  "emptyInternalComment6",
  "exitOtherStampComment",
  "exitSatelliteLockStampComment",
  "exitPanoramicComment",
  "exitStampNavieraComment",
  "exitEngineryComment1",
  "exitEngineryComment2",
] as const;

export class PhotosHelper {
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
