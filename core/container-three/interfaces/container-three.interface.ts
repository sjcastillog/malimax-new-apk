export interface WorkflowImageI {
  id: number | null;
  src: string;
  comment: string;
  uuid: string;
  model: string;
  type: string;
  order: number;
}

export interface WorkflowContainerThreeI {
  // ============================================
  // CONTROL
  // ============================================
  id: number | null;
  timeStampSave: string;
  hourSaveUser: string;

  // ============================================
  // DATOS DEL PROCESO 2 (READONLY - vienen del proceso anterior)
  // ============================================
  container: string | null;
  client: string | null;
  clientId: number | null;
  clientIdentification: string | null;

  // ============================================
  // DATOS DEL PROCESO 3
  // ============================================
  entryPort: string | null;

  // ============================================
  // GENERALES
  // ============================================
  coordinates: string;
  observation: string | null;
  hourInit: string;
  hourEnd: string;

  // ============================================
  // FOTOS ESTÁTICAS - CONTENEDOR PANORÁMICO
  // ============================================
  containerPanoramicPhoto: string;
  containerPanoramicComment: string | null;
  containerPanoramicCoordinates: string;

  // ============================================
  // FOTOS ESTÁTICAS - NAVIERA (3 fotos)
  // ============================================
  navieraBottlePhoto: string;
  navieraBottleComment: string | null;
  navieraWirePhoto: string;
  navieraWireComment: string | null;
  navieraLabelPhoto: string;
  navieraLabelComment: string | null;

  // ============================================
  // FOTOS ESTÁTICAS - EXPORTADOR (3 fotos)
  // ============================================
  exporterBottlePhoto: string;
  exporterBottleComment: string | null;
  exporterWirePhoto: string;
  exporterWireComment: string | null;
  exporterLabelPhoto: string;
  exporterLabelComment: string | null;

  // ============================================
  // FOTOS ESTÁTICAS - OTRO (3 fotos)
  // ============================================
  otherBottlePhoto: string;
  otherBottleComment: string | null;
  otherWirePhoto: string;
  otherWireComment: string | null;
  otherLabelPhoto: string;
  otherLabelComment: string | null;

  // ============================================
  // FOTOS ESTÁTICAS - GPS (2 fotos)
  // ============================================
  gpsPhoto: string;
  gpsComment: string | null;
  gpsStampPhoto: string;
  gpsStampComment: string | null;

  // ============================================
  // IMÁGENES DINÁMICAS
  // ============================================
  images: WorkflowImageI[];
  imagesDelete: number[] | null;

  // ============================================
  // CONTROL
  // ============================================
  _hasHydrated: boolean;
}

export interface WorkflowContainerThreeActionI {
  // ============================================
  // SETTERS BÁSICOS
  // ============================================
  setId: (id: number | null) => void;
  setContainer: (container: string | null) => void;
  setClient: (client: string | null) => void;
  setClientId: (clientId: number | null) => void;
  setClientIdentification: (clientIdentification: string | null) => void;

  // ============================================
  // SETTERS DEL PROCESO 3
  // ============================================
  setEntryPort: (entryPort: string | null) => void;

  // ============================================
  // SETTERS GENERALES
  // ============================================
  setCoordinates: (coordinates: string) => void;
  setObservation: (observation: string | null) => void;
  setHourInit: (hourInit: string) => void;
  setHourEnd: (hourEnd: string) => void;

  // ============================================
  // SETTERS DE FOTOS ESTÁTICAS - PANORÁMICO
  // ============================================
  setContainerPanoramicPhoto: (photo: string) => void;
  setContainerPanoramicComment: (comment: string | null) => void;
  setContainerPanoramicCoordinates: (coordinates: string) => void;

  // ============================================
  // SETTERS DE FOTOS ESTÁTICAS - NAVIERA
  // ============================================
  setNavieraBottlePhoto: (photo: string) => void;
  setNavieraBottleComment: (comment: string | null) => void;
  setNavieraWirePhoto: (photo: string) => void;
  setNavieraWireComment: (comment: string | null) => void;
  setNavieraLabelPhoto: (photo: string) => void;
  setNavieraLabelComment: (comment: string | null) => void;

  // ============================================
  // SETTERS DE FOTOS ESTÁTICAS - EXPORTADOR
  // ============================================
  setExporterBottlePhoto: (photo: string) => void;
  setExporterBottleComment: (comment: string | null) => void;
  setExporterWirePhoto: (photo: string) => void;
  setExporterWireComment: (comment: string | null) => void;
  setExporterLabelPhoto: (photo: string) => void;
  setExporterLabelComment: (comment: string | null) => void;

  // ============================================
  // SETTERS DE FOTOS ESTÁTICAS - OTRO
  // ============================================
  setOtherBottlePhoto: (photo: string) => void;
  setOtherBottleComment: (comment: string | null) => void;
  setOtherWirePhoto: (photo: string) => void;
  setOtherWireComment: (comment: string | null) => void;
  setOtherLabelPhoto: (photo: string) => void;
  setOtherLabelComment: (comment: string | null) => void;

  // ============================================
  // SETTERS DE FOTOS ESTÁTICAS - GPS
  // ============================================
  setGpsPhoto: (photo: string) => void;
  setGpsComment: (comment: string | null) => void;
  setGpsStampPhoto: (photo: string) => void;
  setGpsStampComment: (comment: string | null) => void;

  // ============================================
  // MANEJO DE IMÁGENES DINÁMICAS
  // ============================================
  getImages: () => WorkflowImageI[];
  setImages: (images: WorkflowImageI[]) => void;
  getOneImage: (uuid: string) => WorkflowImageI;
  addImage: (type: string) => void;
  addImageDelete: (id: number) => void;
  removeImage: (uuid: string) => Promise<void>;
  updateImage: (uuid: string, field: string, value: any) => Promise<void>;

  // ============================================
  // MÉTODOS HELPER
  // ============================================
  getOnlyPhotos: () => { [key: string]: string };
  getValues: () => any;
  setValues: (data: any) => void;
  onClear: () => Promise<void>;
  onClearNext: (container?: string) => void;
}

export interface WorkflowContainerThreeRequiredI {
  container: string | null;
  clientId: number | null;
  entryPort: string | null;
  containerPanoramicPhoto: string;
  coordinates: string;
  observation: string | null;
  hourInit: string;
  hourEnd: string;
  images: WorkflowImageI[];
  imagesDelete: number[] | null;
}

export interface WorkflowThreeForNextProcessI {
  clientId: number;
  client: string;
  clientIdentification: string;
  container: string;
}
