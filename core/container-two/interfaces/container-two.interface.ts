export interface WorkflowImageI {
  id: number | null;
  src: string;
  comment: string;
  uuid: string;
  model: string;
  type: string;
  order: number;
}

export type types =
  | "aditional"
  | "intern"
  | "process"
  | "naviera"
  | "exporter"
  | "other";

export interface WorkflowTwoI {
  id?: number | null;
  _hasHydrated: boolean;
  container: string | null;
  createdByAdmin?: boolean | null;
  client?: string | null;
  clientId: number | null;
  clientIdentification?: string | null;
  openedWas: string;
  openedBy: string;
  timeStampSave?: string;
  hourSaveUser?: string;
  range?: string;

  labelSerial: string | null;
  plateVehicle: string;
  driverName: string;
  driverIdentification: string;
  coordinates: string;
  images: WorkflowImageI[];
  imagesDelete?: number[];
  // step?: string;
  hourInit: string;
  hourEnd: string;
  startProcess: string;
  endProcess: string;
  address: string;
  city: string;
  typeReview: string;
  storageName: string;
  typeContainer: string | null;
  naviera: string | null;
  size: string | null;
  companyTransport: string | null;
  observation: string | null;
  // FOTOS VACIO EXTERNO
  emptyPanoramicCheckPhoto: string;
  emptyPanoramicCheckB64Photo?: string;
  emptyPanoramicValidationPhoto: string;
  emptyPanoramicCheckStatus: boolean | null;
  emptyPanoramicCheckComment: string | null;
  emptyStampNavieraCheckPhoto: string;
  emptyStampNavieraCheckB64Photo?: string;
  emptyStampNavieraValidationPhoto: string;
  emptyStampNavieraCheckComment: string | null;
  emptyStampNavieraCheckStatus: boolean | null;
  emptyOtherStampCheckPhoto: string;
  emptyOtherStampCheckB64Photo?: string;
  emptyOtherStampValidationPhoto: string;
  emptyOtherStampCheckComment: string | null;
  emptyOtherStampCheckStatus: boolean | null;
  emptySatelliteLockCheckPhoto: string;
  emptySatelliteLockCheckB64Photo?: string;
  emptySatelliteLockValidationPhoto: string;
  emptySatelliteLockCheckComment: string | null;
  emptySatelliteLockCheckStatus: boolean | null;
  exitEngineryCheckPhoto1: string;
  exitEngineryCheckB64Photo1?: string;
  exitEngineryValidationPhoto1: string;
  exitEngineryCheckComment1: string | null;
  exitEngineryCheckStatus1: boolean | null;
  exitEngineryCheckPhoto2: string;
  exitEngineryCheckB64Photo2?: string;
  exitEngineryValidationPhoto2: string;
  exitEngineryCheckComment2: string | null;
  exitEngineryCheckStatus2: boolean | null;
  exitDoorCheckVideo: string;
  exitDoorCheckB64Video?: string;
  exitDoorValidationVideo: string;
  exitDoorCheckComment: string | null;
  exitDoorCheckStatus: boolean | null;
  exitEngineryCheckVideo: string;
  exitEngineryCheckB64Video?: string;
  exitEngineryValidationVideo: string;
  exitEngineryCheckComment: string | null;
  exitEngineryCheckStatus: boolean | null;

  chargingProcessPhoto1: string;
  chargingProcessComment1: string;
  chargingProcessPhoto2: string;
  chargingProcessComment2: string;
  chargingProcessVideo: string;

  containerPanoramicPhoto: string;
  containerPanoramicComment: string;
  containerPanoramicCoordinates: string;

  navieraBottlePhoto: string;
  navieraBottleComment: string;
  navieraWirePhoto: string;
  navieraWireComment: string;
  navieraLabelPhoto: string;
  navieraLabelComment: string;

  exporterBottlePhoto: string;
  exporterBottleComment: string;
  exporterWirePhoto: string;
  exporterWireComment: string;
  exporterLabelPhoto: string;
  exporterLabelComment: string;

  otherBottlePhoto: string;
  otherBottleComment: string;
  otherWirePhoto: string;
  otherWireComment: string;
  otherLabelPhoto: string;
  otherLabelComment: string;

  gpsPhoto: string;
  gpsComment: string;
  gpsStampPhoto: string;
  gpsStampComment: string;

  entryPort: string;
  exitDoorVideo: string;
  exitEngineryVideo: string;

  statusWorkflowId?: number | null;
  statusWorkflowCode?: string;
  statusWorkflow?: string;
  statusWorkflowColor?: string;
}

export interface WorkflowTwoActionI {
  getImages: () => WorkflowTwoI["images"];
  setId: (id: WorkflowTwoI["id"]) => void;
  setPhoto: (field: string, uri: string, filename?: string) => Promise<void>;
  setCreatedByAdmin: (createdByAdmin: WorkflowTwoI["createdByAdmin"]) => void;
  setObservation: (observation: WorkflowTwoI["observation"]) => void;

  setCoordinates: (coordinates: WorkflowTwoI["coordinates"]) => void;
  setTypeContainer: (typeContainer: WorkflowTwoI["typeContainer"]) => void;
  setNaviera: (naviera: WorkflowTwoI["naviera"]) => void;
  setSize: (size: WorkflowTwoI["size"]) => void;
  setCompanyTransport: (
    companyTransport: WorkflowTwoI["companyTransport"],
  ) => void;
  setOpenedBy: (openedBy: WorkflowTwoI["openedBy"]) => void;
  setOpenedWas: (openedWas: WorkflowTwoI["openedWas"]) => void;

  setEmptyPanoramicCheckPhoto: (
    emptyPanoramicCheckPhoto: WorkflowTwoI["emptyPanoramicCheckPhoto"],
  ) => void;
  setEmptyPanoramicCheckB64Photo: (
    emptyPanoramicCheckB64Photo: WorkflowTwoI["emptyPanoramicCheckB64Photo"],
  ) => void;
  setEmptyPanoramicValidationPhoto: (
    emptyPanoramicValidationPhoto: WorkflowTwoI["emptyPanoramicValidationPhoto"],
  ) => void;
  setEmptyPanoramicCheckStatus: (
    emptyPanoramicCheckStatus: WorkflowTwoI["emptyPanoramicCheckStatus"],
  ) => void;
  setEmptyPanoramicCheckComment: (
    emptyPanoramicCheckComment: WorkflowTwoI["emptyPanoramicCheckComment"],
  ) => void;
  setEmptyStampNavieraCheckPhoto: (
    emptyStampNavieraCheckPhoto: WorkflowTwoI["emptyStampNavieraCheckPhoto"],
  ) => void;
  setEmptyStampNavieraCheckB64Photo: (
    emptyStampNavieraCheckB64Photo: WorkflowTwoI["emptyStampNavieraCheckB64Photo"],
  ) => void;
  setEmptyStampNavieraValidationPhoto: (
    emptyStampNavieraValidationPhoto: WorkflowTwoI["emptyStampNavieraValidationPhoto"],
  ) => void;
  setEmptyStampNavieraCheckComment: (
    emptyStampNavieraCheckComment: WorkflowTwoI["emptyStampNavieraCheckComment"],
  ) => void;
  setEmptyStampNavieraCheckStatus: (
    emptyStampNavieraCheckStatus: WorkflowTwoI["emptyStampNavieraCheckStatus"],
  ) => void;
  setEmptyOtherStampCheckPhoto: (
    emptyOtherStampCheckPhoto: WorkflowTwoI["emptyOtherStampCheckPhoto"],
  ) => void;
  setEmptyOtherStampCheckB64Photo: (
    emptyOtherStampCheckB64Photo: WorkflowTwoI["emptyOtherStampCheckB64Photo"],
  ) => void;
  setEmptyOtherStampValidationPhoto: (
    emptyOtherStampValidationPhoto: WorkflowTwoI["emptyOtherStampValidationPhoto"],
  ) => void;
  setEmptyOtherStampCheckComment: (
    emptyOtherStampCheckComment: WorkflowTwoI["emptyOtherStampCheckComment"],
  ) => void;
  setEmptyOtherStampCheckStatus: (
    emptyOtherStampCheckStatus: WorkflowTwoI["emptyOtherStampCheckStatus"],
  ) => void;
  setEmptySatelliteLockCheckPhoto: (
    emptySatelliteLockCheckPhoto: WorkflowTwoI["emptySatelliteLockCheckPhoto"],
  ) => void;
  setEmptySatelliteLockCheckB64Photo: (
    emptySatelliteLockCheckB64Photo: WorkflowTwoI["emptySatelliteLockCheckB64Photo"],
  ) => void;
  setEmptySatelliteLockValidationPhoto: (
    emptySatelliteLockValidationPhoto: WorkflowTwoI["emptySatelliteLockValidationPhoto"],
  ) => void;
  setEmptySatelliteLockCheckComment: (
    emptySatelliteLockCheckComment: WorkflowTwoI["emptySatelliteLockCheckComment"],
  ) => void;
  setEmptySatelliteLockCheckStatus: (
    emptySatelliteLockCheckStatus: WorkflowTwoI["emptySatelliteLockCheckStatus"],
  ) => void;
  setExitEngineryCheckPhoto1: (
    exitEngineryCheckPhoto1: WorkflowTwoI["exitEngineryCheckPhoto1"],
  ) => void;
  setExitEngineryCheckB64Photo1: (
    exitEngineryCheckB64Photo1: WorkflowTwoI["exitEngineryCheckB64Photo1"],
  ) => void;
  setExitEngineryValidationPhoto1: (
    exitEngineryValidationPhoto1: WorkflowTwoI["exitEngineryValidationPhoto1"],
  ) => void;
  setExitEngineryCheckComment1: (
    exitEngineryCheckComment1: WorkflowTwoI["exitEngineryCheckComment1"],
  ) => void;
  setExitEngineryCheckStatus1: (
    exitEngineryCheckStatus1: WorkflowTwoI["exitEngineryCheckStatus1"],
  ) => void;
  setExitEngineryCheckPhoto2: (
    exitEngineryCheckPhoto2: WorkflowTwoI["exitEngineryCheckPhoto2"],
  ) => void;
  setExitEngineryCheckB64Photo2: (
    exitEngineryCheckB64Photo2: WorkflowTwoI["exitEngineryCheckB64Photo2"],
  ) => void;
  setExitEngineryValidationPhoto2: (
    exitEngineryValidationPhoto2: WorkflowTwoI["exitEngineryValidationPhoto2"],
  ) => void;
  setExitEngineryCheckComment2: (
    exitEngineryCheckComment2: WorkflowTwoI["exitEngineryCheckComment2"],
  ) => void;
  setExitEngineryCheckStatus2: (
    exitEngineryCheckStatus2: WorkflowTwoI["exitEngineryCheckStatus2"],
  ) => void;
  setExitDoorCheckVideo: (
    exitDoorCheckVideo: WorkflowTwoI["exitDoorCheckVideo"],
  ) => void;
  setExitDoorCheckB64Video: (
    exitDoorCheckB64Video: WorkflowTwoI["exitDoorCheckB64Video"],
  ) => void;
  setExitDoorValidationVideo: (
    exitDoorValidationVideo: WorkflowTwoI["exitDoorValidationVideo"],
  ) => void;
  setExitDoorCheckComment: (
    exitDoorCheckComment: WorkflowTwoI["exitDoorCheckComment"],
  ) => void;
  setExitDoorCheckStatus: (
    exitDoorCheckStatus: WorkflowTwoI["exitDoorCheckStatus"],
  ) => void;
  setExitEngineryCheckVideo: (
    exitEngineryCheckVideo: WorkflowTwoI["exitEngineryCheckVideo"],
  ) => void;
  setExitEngineryCheckB64Video: (
    exitEngineryCheckB64Video: WorkflowTwoI["exitEngineryCheckB64Video"],
  ) => void;
  setExitEngineryValidationVideo: (
    exitEngineryValidationVideo: WorkflowTwoI["exitEngineryValidationVideo"],
  ) => void;
  setExitEngineryCheckComment: (
    exitEngineryCheckComment: WorkflowTwoI["exitEngineryCheckComment"],
  ) => void;
  setExitEngineryCheckStatus: (
    exitEngineryCheckStatus: WorkflowTwoI["exitEngineryCheckStatus"],
  ) => void;

  setChargingProcessPhoto1: (
    chargingProcessPhoto1: WorkflowTwoI["chargingProcessPhoto1"],
  ) => void;
  setChargingProcessComment1: (
    chargingProcessComment1: WorkflowTwoI["chargingProcessComment1"],
  ) => void;
  setChargingProcessPhoto2: (
    chargingProcessPhoto2: WorkflowTwoI["chargingProcessPhoto2"],
  ) => void;
  setChargingProcessComment2: (
    chargingProcessComment2: WorkflowTwoI["chargingProcessComment2"],
  ) => void;
  setChargingProcessVideo: (
    chargingProcessVideo: WorkflowTwoI["chargingProcessVideo"],
  ) => void;

  setContainerPanoramicPhoto: (
    containerPanoramicPhoto: WorkflowTwoI["containerPanoramicPhoto"],
  ) => void;
  setContainerPanoramicComment: (
    containerPanoramicComment: WorkflowTwoI["containerPanoramicComment"],
  ) => void;
  setContainerPanoramicCoordinates: (
    containerPanoramicCoordinates: WorkflowTwoI["containerPanoramicCoordinates"],
  ) => void;

  setNavieraBottlePhoto: (
    navieraBottlePhoto: WorkflowTwoI["navieraBottlePhoto"],
  ) => void;
  setNavieraBottleComment: (
    navieraBottleComment: WorkflowTwoI["navieraBottleComment"],
  ) => void;
  setNavieraWirePhoto: (
    navieraWirePhoto: WorkflowTwoI["navieraWirePhoto"],
  ) => void;
  setNavieraWireComment: (
    navieraWireComment: WorkflowTwoI["navieraWireComment"],
  ) => void;
  setNavieraLabelPhoto: (
    navieraLabelPhoto: WorkflowTwoI["navieraLabelPhoto"],
  ) => void;
  setNavieraLabelComment: (
    navieraLabelComment: WorkflowTwoI["navieraLabelComment"],
  ) => void;

  setExporterBottlePhoto: (
    exporterBottlePhoto: WorkflowTwoI["exporterBottlePhoto"],
  ) => void;
  setExporterBottleComment: (
    exporterBottleComment: WorkflowTwoI["exporterBottleComment"],
  ) => void;
  setExporterWirePhoto: (
    exporterWirePhoto: WorkflowTwoI["exporterWirePhoto"],
  ) => void;
  setExporterWireComment: (
    exporterWireComment: WorkflowTwoI["exporterWireComment"],
  ) => void;
  setExporterLabelPhoto: (
    exporterLabelPhoto: WorkflowTwoI["exporterLabelPhoto"],
  ) => void;
  setExporterLabelComment: (
    exporterLabelComment: WorkflowTwoI["exporterLabelComment"],
  ) => void;

  setOtherBottlePhoto: (
    otherBottlePhoto: WorkflowTwoI["otherBottlePhoto"],
  ) => void;
  setOtherBottleComment: (
    otherBottleComment: WorkflowTwoI["otherBottleComment"],
  ) => void;
  setOtherWirePhoto: (otherWirePhoto: WorkflowTwoI["otherWirePhoto"]) => void;
  setOtherWireComment: (
    otherWireComment: WorkflowTwoI["otherWireComment"],
  ) => void;
  setOtherLabelPhoto: (
    otherLabelPhoto: WorkflowTwoI["otherLabelPhoto"],
  ) => void;
  setOtherLabelComment: (
    otherLabelComment: WorkflowTwoI["otherLabelComment"],
  ) => void;

  setGpsPhoto: (gpsPhoto: WorkflowTwoI["gpsPhoto"]) => void;
  setGpsComment: (gpsComment: WorkflowTwoI["gpsComment"]) => void;
  setGpsStampPhoto: (gpsStampPhoto: WorkflowTwoI["gpsStampPhoto"]) => void;
  setGpsStampComment: (
    gpsStampComment: WorkflowTwoI["gpsStampComment"],
  ) => void;

  setEntryPort: (entryPort: WorkflowTwoI["entryPort"]) => void;
  setExitDoorVideo: (exitDoorVideo: WorkflowTwoI["exitDoorVideo"]) => void;
  setExitEngineryVideo: (
    exitEngineryVideo: WorkflowTwoI["exitEngineryVideo"],
  ) => void;

  setHourInit: (hourInit: WorkflowTwoI["hourInit"]) => void;
  setHourEnd: (hourEnd: WorkflowTwoI["hourEnd"]) => void;
  setStartProcess: (startProcess: WorkflowTwoI["startProcess"]) => void;
  setEndProcess: (endProcess: WorkflowTwoI["endProcess"]) => void;
  setAddress: (address: WorkflowTwoI["address"]) => void;
  setCity: (city: WorkflowTwoI["city"]) => void;
  setTypeReview: (typeReview: WorkflowTwoI["typeReview"]) => void;
  setStorageName: (storageName: WorkflowTwoI["storageName"]) => void;
  setClient: (client: WorkflowTwoI["client"]) => void;
  setClientId: (clientId: WorkflowTwoI["clientId"]) => void;
  setClientIdentification: (
    clientIdentification: WorkflowTwoI["clientIdentification"],
  ) => void;
  setContainer: (container: WorkflowTwoI["container"]) => void;
  setLabelSerial: (labelSerial: WorkflowTwoI["labelSerial"]) => void;
  setPlateVehicle: (plateVehicle: WorkflowTwoI["plateVehicle"]) => void;
  setDriverName: (driverName: WorkflowTwoI["driverName"]) => void;
  setDriverIdentification: (
    driverIdentification: WorkflowTwoI["driverIdentification"],
  ) => void;
  setImages: (images: WorkflowTwoI["images"]) => void;
  addImageDelete: (id: number) => void;
  addImage: (type: types) => void;
  removeImage: (uuid: string) => void;
  updateImage: (uuid: string, field: string, value: string) => void;
  getValues: () => Partial<WorkflowTwoI>;
  setValues: (data: WorkflowTwoI) => void;
  onClear: () => void;
  // setStep?: (step: WorkflowTwoI["step"]) => void;
  // resetSteps?: () => void;
  getOneImage: (uuid: string) => WorkflowImageI;
  getOnlyPhotos: () => { [key: string]: string };
}

export interface WorkflowTwoForNextProcessI {
  containerPanoramicCheck: string;
  navieraBottleCheck: string;
  navieraWireCheck: string;
  navieraLabelCheck: string;
  exporterBottleCheck: string;
  exporterWireCheck: string;
  exporterLabelCheck: string;
  otherBottleCheck: string;
  otherWireCheck: string;
  otherLabelCheck: string;
  gpsCheck: string;
  gpsStampCheck: string;
  engineryCheck1: string;
  engineryCheck2: string;
  engineryVideoCheck: string;
  doorVideoCheck: string;
  entryPort: string;
  city: string;
  address: string;
  typeReview: string;
  storageName: string;
  driverName: string;
  driverIdentification: string;
  plateVehicle: string;
  typeContainer: string;
  naviera: string;
  size: string;
  companyTransport: string;
}
