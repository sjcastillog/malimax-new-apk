export interface WorkflowImageI {
  id: number | null;
  src: string;
  comment: string;
  uuid: string;
  model: string;
  type: string;
  order: number;
}

export interface WorkflowContainerOneI {
  id: number | null;
  timeStampSave: string;
  firstTakePhoto: string;
  hourSaveUser: string;
  createdByAdmin: string | null;
  coordinates: string;
  container: string | null;
  client: string | null;
  clientId: number | null;
  observation: string | null;
  clientIdentification: string | null;
  typeService: string | null;
  date: string | null;
  can: string[] | null;
  leader: string[] | null;
  exporterSupervisor: string | null;
  exporterSupervisorIdentification: string | null;
  associated: string | null;
  associatedIdentification: string | null;
  others: string | null;
  othersIdentification: string | null;
  workplace: string | null;

  inspectedBy: string;
  inspectedWas: string;

  labelSerial: string | null;
  plateVehicle: string;
  driverName: string;
  driverIdentification: string;
  hourInit: string;
  hourEnd: string;
  startProcess: string;
  endProcess: string;
  address: string;
  city: string;
  typeReview: string;
  storageName: string;
  quantityImages: number;
  images: WorkflowImageI[];
  imagesDelete: number[] | null;
  typeContainer: string | null;
  naviera: string | null;
  size: string | null;
  companyTransport: string | null;
  entryPort: string | null;

  // ============================================
  // FOTOS VACIO EXTERNO
  // ============================================
  emptyPanoramicPhoto: string;
  emptyPanoramicComment: string | null;
  emptyPanoramicCoordinates: string;
  emptyStampNavieraPhoto: string;
  emptyStampNavieraComment: string | null;
  emptyOtherStampPhoto: string;
  emptyOtherStampComment: string | null;
  emptySatelliteLockStampPhoto: string;
  emptySatelliteLockStampComment: string | null;
  emptySatelliteLockPhoto: string;
  emptySatelliteLockComment: string | null;
  emptyAditionalStampPhoto: string;
  emptyAditionalStampComment: string | null;
  emptySideRightPhoto: string;
  emptySideLeftPhoto: string;
  emptySideUpPhoto: string;
  emptySideDownPhoto: string;
  emptyFrontPhoto: string;
  emptyRearPhoto: string;
  emptyEirPhoto: string;
  emptyPreviousInspectionDocumentPhoto: string;
  emptyPlatePhoto: string;
  emptyDriverIdentificationPhoto: string;

  // ============================================
  // FOTOS VACIO INTERNO
  // ============================================
  emptyFloorPhoto: string;
  emptyRoofPhoto: string;
  emptyMirrorCoverPhoto: string;
  emptyInternalPhoto1: string;
  emptyInternalPhoto2: string;
  emptyInternalPhoto3: string;
  emptyInternalPhoto4: string;
  emptyInternalPhoto5: string;
  emptyInternalPhoto6: string;
  emptyFloorComment: string | null;
  emptyRoofComment: string | null;
  emptyMirrorCoverComment: string | null;
  emptyInternalComment1: string | null;
  emptyInternalComment2: string | null;
  emptyInternalComment3: string | null;
  emptyInternalComment4: string | null;
  emptyInternalComment5: string | null;
  emptyInternalComment6: string | null;
  emptyInternalVideo: string;
  engineryPhoto1: string;
  engineryComment1: string | null;
  engineryPhoto2: string;
  engineryComment2: string | null;

  // ============================================
  // FOTOS SALIDA/EXIT
  // ============================================
  exitOtherStampPhoto: string;
  exitPanoramicPhoto: string;
  exitStampNavieraPhoto: string;
  exitSatelliteLockStampPhoto: string;
  exitEngineryPhoto1: string;
  exitEngineryPhoto2: string;
  exitOtherStampComment: string | null;
  exitSatelliteLockStampComment: string | null;
  exitPanoramicComment: string | null;
  exitStampNavieraComment: string | null;
  exitEngineryComment1: string | null;
  exitEngineryComment2: string | null;
  exitDoorVideo: string;
  exitEngineryVideo: string;
  exitTemporarySealingPhoto: string;
  exitTemporarySealingComment: string | null;

  // ============================================
  // CONTROL
  // ============================================
  _hasHydrated: boolean;
  statusWorkflow?: string;
  statusWorkflowId?: number | null;
  statusWorkflowCode?: string;
  statusWorkflowColor?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  statusContainer?: string;
  statusContainerId?: number | null;
  statusContainerCode?: string;
  statusContainerColor?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  createdAt?: any;
  malimaxTwoId?: number | null;
  malimaxThreeId?: number | null;
}

export interface WorkflowContainerOneActionI {
  setPhoto: (field: string, uri: string, filename?: string) => Promise<void>;
  setTypeService: (typeService: string | null) => void;
  setDate: (date: string | null) => void;
  setCan: (can: string[] | null) => void;
  setLeader: (leader: string[] | null) => void;
  setExporterSupervisor: (exporterSupervisor: string | null) => void;
  setExporterSupervisorIdentification: (
    exporterSupervisorIdentification: string | null,
  ) => void;
  setAssociated: (associated: string | null) => void;
  setAssociatedIdentification: (
    associatedIdentification: string | null,
  ) => void;
  setOthers: (others: string | null) => void;
  setOthersIdentification: (othersIdentification: string | null) => void;
  setWorkplace: (workplace: string | null) => void;

  setInspectedBy: (inspectedBy: string) => void;
  setInspectedWas: (inspectedWas: string) => void;
  setEngineryComment1: (engineryComment1: string | null) => void;
  setEngineryComment2: (engineryComment2: string | null) => void;
  setExitTemporarySealingComment: (
    exitTemporarySealingComment: string | null,
  ) => void;

  // ============================================
  // MÉTODOS GENERALES
  // ============================================
  getImages: () => WorkflowImageI[];
  setCoordinates: (coordinates: string) => void;
  setObservation: (observation: string | null) => void;
  setEmptyPanoramicCoordinates: (emptyPanoramicCoordinates: string) => void;
  setTypeContainer: (typeContainer: string | null) => void;
  setSize: (size: string | null) => void;
  setNaviera: (naviera: string | null) => void;
  setCompanyTransport: (companyTransport: string | null) => void;
  setCreatedByAdmin: (createdByAdmin: string | null) => void;
  setEntryPort: (entryPort: string | null) => void;

  // ============================================
  // SETTERS DE COMENTARIOS (solo texto)
  // ============================================
  setEmptyPanoramicComment: (emptyPanoramicComment: string | null) => void;
  setEmptyStampNavieraComment: (
    emptyStampNavieraComment: string | null,
  ) => void;
  setEmptyOtherStampComment: (emptyOtherStampComment: string | null) => void;
  setEmptyAditionalStampComment: (
    emptyAditionalStampComment: string | null,
  ) => void;
  setEmptySatelliteLockStampComment: (
    emptySatelliteLockStampComment: string | null,
  ) => void;
  setEmptySatelliteLockComment: (
    emptySatelliteLockComment: string | null,
  ) => void;
  setEmptyFloorComment: (emptyFloorComment: string | null) => void;
  setEmptyRoofComment: (emptyRoofComment: string | null) => void;
  setEmptyMirrorCoverComment: (emptyMirrorCoverComment: string | null) => void;
  setEmptyInternalComment1: (emptyInternalComment1: string | null) => void;
  setEmptyInternalComment2: (emptyInternalComment2: string | null) => void;
  setEmptyInternalComment3: (emptyInternalComment3: string | null) => void;
  setEmptyInternalComment4: (emptyInternalComment4: string | null) => void;
  setEmptyInternalComment5: (emptyInternalComment5: string | null) => void;
  setEmptyInternalComment6: (emptyInternalComment6: string | null) => void;
  setExitOtherStampComment: (exitOtherStampComment: string | null) => void;
  setExitSatelliteLockStampComment: (
    exitSatelliteLockStampComment: string | null,
  ) => void;
  setExitPanoramicComment: (exitPanoramicComment: string | null) => void;
  setExitStampNavieraComment: (exitStampNavieraComment: string | null) => void;
  setExitEngineryComment1: (exitEngineryComment1: string | null) => void;
  setExitEngineryComment2: (exitEngineryComment2: string | null) => void;

  // ============================================
  // SETTERS DE VIDEOS
  // ============================================
  setEmptyInternalVideo: (file: string | null) => Promise<void>;
  setExitDoorVideo: (file: string | null) => Promise<void>;
  setExitEngineryVideo: (file: string | null) => Promise<void>;

  // SETTERS BÁSICOS
  setId: (id: number | null) => void;
  setHourInit: (hourInit: string) => void;
  setHourEnd: (hourEnd: string) => void;
  setStartProcess: (startProcess: string) => void;
  setEndProcess: (endProcess: string) => void;
  setAddress: (address: string) => void;
  setCity: (city: string) => void;
  setTypeReview: (typeReview: string) => void;
  setStorageName: (storageName: string) => void;
  setContainer: (container: string | null) => void;
  setClient: (client: string | null) => void;
  setClientId: (clientId: number | null) => void;
  setClientIdentification: (clientIdentification: string | null) => void;
  setLabelSerial: (labelSerial: string | null) => void;
  setPlateVehicle: (plateVehicle: string) => void;
  setDriverName: (driverName: string) => void;
  setDriverIdentification: (driverIdentification: string) => void;

  // MANEJO DE IMÁGENES DINÁMICAS
  setImages: (images: WorkflowImageI[]) => void;
  getOneImage: (uuid: string) => WorkflowImageI;
  addImage: (type: any) => void;
  addImageDelete: (id: number) => void;
  removeImage: (uuid: string) => Promise<void>;
  updateImage: (uuid: string, field: string, value: any) => Promise<void>;

  // MÉTODOS HELPER
  getOnlyPhotos: () => any;
  getValues: () => any;
  setValues: (ladata: any) => void;
  onClear: () => Promise<void>;
}

export interface WorkflowContainerOneRequiredI {
  coordinates: string;
  observation: string | null;
  container: string | null;
  createdByAdmin: string | null;
  typeContainer: string | null;
  naviera: string | null;
  size: string | null;
  companyTransport: string | null;
  entryPort: string | null;
  typeService: string | null;
  date: string | null;
  can: string[] | null;
  leader: string[] | null;
  exporterSupervisor: string | null;
  exporterSupervisorIdentification: string | null;
  associated: string | null;
  associatedIdentification: string | null;
  others: string | null;
  othersIdentification: string | null;
  workplace: string | null;
  inspectedBy: string;
  inspectedWas: string;

  clientId: number | null;
  client: string | null;
  labelSerial: string | null;
  plateVehicle: string;
  driverName: string;
  driverIdentification: string;
  images: WorkflowImageI[];
  imagesDelete: number[] | null;
  hourInit: string;
  hourEnd: string;
  startProcess: string;
  endProcess: string;
  address: string;
  city: string;
  typeReview: string;
  storageName: string;

  // FOTOS VACIO EXTERNO
  emptyAditionalStampPhoto: string;
  emptyAditionalStampComment: string | null;
  emptyPanoramicPhoto: string;
  emptyPanoramicComment: string | null;
  emptyPanoramicCoordinates: string;
  emptyStampNavieraPhoto: string;
  emptyStampNavieraComment: string | null;
  emptyOtherStampPhoto: string;
  emptyOtherStampComment: string | null;
  emptySatelliteLockStampPhoto: string;
  emptySatelliteLockStampComment: string | null;
  emptySatelliteLockPhoto: string;
  emptySatelliteLockComment: string | null;
  emptySideRightPhoto: string;
  emptySideLeftPhoto: string;
  emptySideUpPhoto: string;
  emptySideDownPhoto: string;
  emptyFrontPhoto: string;
  emptyRearPhoto: string;
  emptyEirPhoto: string;
  emptyPreviousInspectionDocumentPhoto: string;
  emptyPlatePhoto: string;
  emptyDriverIdentificationPhoto: string;

  // FOTOS VACIO INTERNO
  emptyFloorPhoto: string;
  emptyRoofPhoto: string;
  emptyMirrorCoverPhoto: string;
  emptyInternalPhoto1: string;
  emptyInternalPhoto2: string;
  emptyInternalPhoto3: string;
  emptyInternalPhoto4: string;
  emptyInternalPhoto5: string;
  emptyInternalPhoto6: string;
  emptyFloorComment: string | null;
  emptyRoofComment: string | null;
  emptyMirrorCoverComment: string | null;
  emptyInternalComment1: string | null;
  emptyInternalComment2: string | null;
  emptyInternalComment3: string | null;
  emptyInternalComment4: string | null;
  emptyInternalComment5: string | null;
  emptyInternalComment6: string | null;
  emptyInternalVideo: string;

  // NUEVAS FOTOS DE MAQUINARIA
  engineryPhoto1: string;
  engineryComment1: string | null;
  engineryPhoto2: string;
  engineryComment2: string | null;

  // FOTOS SALIDA
  exitOtherStampPhoto: string;
  exitPanoramicPhoto: string;
  exitStampNavieraPhoto: string;
  exitSatelliteLockStampPhoto: string;
  exitEngineryPhoto1: string;
  exitEngineryPhoto2: string;
  exitOtherStampComment: string | null;
  exitSatelliteLockStampComment: string | null;
  exitPanoramicComment: string | null;
  exitStampNavieraComment: string | null;
  exitEngineryComment1: string | null;
  exitEngineryComment2: string | null;
  exitDoorVideo: string;
  exitEngineryVideo: string;

  // NUEVA FOTO DE SELLADO TEMPORAL
  exitTemporarySealingPhoto: string;
  exitTemporarySealingComment: string | null;
}

export interface WorkflowOneForNextProcessI {
  client: string;
  clientId: number;
  clientIdentification: string;
}
