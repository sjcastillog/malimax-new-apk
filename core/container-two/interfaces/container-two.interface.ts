export interface WorkflowImageI {
  id: number | null;
  src: string;
  comment: string;
  uuid: string;
  model: string;
  type: string;
  order: number;
}

export interface WorkflowContainerTwoI {
  // ============================================
  // CONTROL
  // ============================================
  id: number | null;
  timeStampSave: string;
  hourSaveUser: string;

  // ============================================
  // DATOS DEL PROCESO 1 (READONLY)
  // ============================================
  container: string | null;
  client: string | null;
  clientId: number | null;
  clientIdentification: string | null;

  // ============================================
  // DATOS DEL PROCESO 2
  // ============================================
  product: string;
  presentation: string;
  numberPallet: string | null;
  numberPresentation: string | null;
  numberSampling: string | null;

  // ============================================
  // GENERALES
  // ============================================
  coordinates: string;
  observation: string | null;
  hourInit: string;
  hourEnd: string;

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

export interface WorkflowContainerTwoActionI {
  // ============================================
  // SETTERS BÁSICOS
  // ============================================
  setId: (id: number | null) => void;
  setContainer: (container: string | null) => void;
  setClient: (client: string | null) => void;
  setClientId: (clientId: number | null) => void;
  setClientIdentification: (clientIdentification: string | null) => void;

  // ============================================
  // SETTERS DEL PROCESO 2
  // ============================================
  setProduct: (product: string) => void;
  setPresentation: (presentation: string) => void;
  setNumberPallet: (numberPallet: string | null) => void;
  setNumberPresentation: (numberPresentation: string | null) => void;
  setNumberSampling: (numberSampling: string | null) => void;

  // ============================================
  // SETTERS GENERALES
  // ============================================
  setCoordinates: (coordinates: string) => void;
  setObservation: (observation: string | null) => void;
  setHourInit: (hourInit: string) => void;
  setHourEnd: (hourEnd: string) => void;

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
  getValues: () => any;
  setValues: (data: any) => void;
  onClear: () => Promise<void>;
  onClearNext: (container?: string) => void;
}

export interface WorkflowContainerTwoRequiredI {
  container: string | null;
  clientId: number | null;
  product: string;
  presentation: string;
  numberPallet: string | null;
  numberPresentation: string | null;
  numberSampling: string | null;
  coordinates: string;
  observation: string | null;
  hourInit: string;
  hourEnd: string;
  images: WorkflowImageI[];
  imagesDelete: number[] | null;
}

export interface WorkflowTwoForNextProcessI {
  clientId: number;
  client: string;
  clientIdentification: string;
}
