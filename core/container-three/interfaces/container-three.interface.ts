export interface WorkflowImageI {
  id: number | null;
  src: string;
  comment: string;
  uuid: string;
  model: string;
  type: string;
  order: number;
}

export type TypeWorkflowStatus = "Válido" | "Pendiente" | "Anulado";

export interface WorkflowThreeI {
  _hasHydrated: boolean;
  firstTakePhoto?: string | null;
  id?: number | null;
  container: string | null;
  createdByAdmin?: boolean | null;
  client?: string | null;
  clientId: number | null;
  clientIdentification?: string | null;
  coordinates: string;
  openedWas: string;
  openedBy: string;
  timeStampSave?: string;
  hourSaveUser?: string;
  range?: string;

  labelSerial: string | null;
  plateVehicle: string;
  driverName: string;
  driverIdentification: string;
  // images?: ImageWorkflowTwoI[];
  // imagesDelete?: number[];
  // quantityImages?: number;
  // step?: string;
  hourInit: string;
  hourEnd: string;
  startProcess: string;
  endProcess: string;
  address: string;
  city: string;
  typeReview: string;
  storageName: string;
  observation: string;
  typeContainer: string | null;
  naviera: string | null;
  size: string | null;
  companyTransport: string | null;
  entryPort: string | null;

  containerPanoramicPhoto: string;
  containerPanoramicStatus: boolean;
  containerPanoramicCheck: string;
  containerPanoramicB64Check?: string;
  containerPanoramicComment: string;
  containerPanoramicCoordinates: string;

  navieraBottlePhoto: string;
  navieraBottleComment: string;
  navieraBottleStatus: boolean;
  navieraBottleCheck: string;
  navieraBottleB64Check?: string;

  navieraWirePhoto: string;
  navieraWireComment: string;
  navieraWireStatus: boolean;
  navieraWireCheck: string;
  navieraWireB64Check?: string;

  navieraLabelPhoto: string;
  navieraLabelComment: string;
  navieraLabelStatus: boolean;
  navieraLabelCheck: string;
  navieraLabelB64Check?: string;

  exporterBottlePhoto: string;
  exporterBottleComment: string;
  exporterBottleStatus: boolean;
  exporterBottleCheck: string;
  exporterBottleB64Check?: string;

  exporterWirePhoto: string;
  exporterWireComment: string;
  exporterWireStatus: boolean;
  exporterWireCheck: string;
  exporterWireB64Check?: string;

  exporterLabelPhoto: string;
  exporterLabelComment: string;
  exporterLabelStatus: boolean;
  exporterLabelCheck: string;
  exporterLabelB64Check?: string;

  otherBottlePhoto: string;
  otherBottleComment: string;
  otherBottleStatus: boolean;
  otherBottleCheck: string;
  otherBottleB64Check?: string;

  otherWirePhoto: string;
  otherWireComment: string;
  otherWireStatus: boolean;
  otherWireCheck: string;
  otherWireB64Check?: string;

  otherLabelPhoto: string;
  otherLabelComment: string;
  otherLabelStatus: boolean;
  otherLabelCheck: string;
  otherLabelB64Check?: string;

  gpsPhoto: string;
  gpsComment: string;
  gpsStatus: boolean;
  gpsCheck: string;
  gpsB64Check?: string;

  gpsStampPhoto: string;
  gpsStampStatus: boolean;
  gpsStampComment: string;
  gpsStampCheck: string;
  gpsStampB64Check?: string;

  engineryPhoto1: string;
  engineryComment1: string;
  engineryStatus1: boolean;
  engineryCheck1: string;
  engineryB64Check1?: string;

  engineryPhoto2: string;
  engineryComment2: string;
  engineryStatus2: boolean;
  engineryCheck2: string;
  engineryB64Check2?: string;

  engineryVideo: string;
  engineryVideoStatus: boolean;
  engineryVideoCheck: string;
  engineryVideoB64Check?: string;
  engineryVideoComment: string;

  doorVideo: string;
  doorVideoStatus: boolean;
  doorVideoCheck: string;
  doorVideoB64Check?: string;
  doorVideoComment: string;

  statusWorkflowId?: number | null;
  statusWorkflow?: TypeWorkflowStatus;
  statusWorkflowCode?: string;
  statusWorkflowColor?: string;

  status?: boolean;
  updatedAt?: string | Date;
  createdAt?: string | Date;
  userCreation?: number;
  userEdition?: number;
}

export interface WorkflowThreeActionI {
  setWorkflowTwoData: (datawf: any) => void;
  setId: (id: WorkflowThreeI["id"]) => void;
  setContainer: (container: WorkflowThreeI["container"]) => void;
  setCoordinates: (coordinates: WorkflowThreeI["coordinates"]) => void;
  setPhoto: (field: string, uri: string, filename?: string) => Promise<void>;

  setCreatedByAdmin: (createdByAdmin: WorkflowThreeI["createdByAdmin"]) => void;
  setClient: (client: WorkflowThreeI["client"]) => void;
  setClientId: (clientId: WorkflowThreeI["clientId"]) => void;
  setClientIdentification: (
    clientIdentification: WorkflowThreeI["clientIdentification"],
  ) => void;

  setLabelSerial: (labelSerial: WorkflowThreeI["labelSerial"]) => void;
  setPlateVehicle: (plateVehicle: WorkflowThreeI["plateVehicle"]) => void;
  setDriverName: (driverName: WorkflowThreeI["driverName"]) => void;
  setDriverIdentification: (
    driverIdentification: WorkflowThreeI["driverIdentification"],
  ) => void;
  setOpenedBy: (openedBy: WorkflowThreeI["openedBy"]) => void;
  setOpenedWas: (openedWas: WorkflowThreeI["openedWas"]) => void;

  // setStep: (step: WorkflowThreeI["step"]) => void;
  setHourInit: (hourInit: WorkflowThreeI["hourInit"]) => void;
  setHourEnd: (hourEnd: WorkflowThreeI["hourEnd"]) => void;
  setStartProcess: (startProcess: WorkflowThreeI["startProcess"]) => void;
  setEndProcess: (endProcess: WorkflowThreeI["endProcess"]) => void;
  setAddress: (address: WorkflowThreeI["address"]) => void;
  setCity: (city: WorkflowThreeI["city"]) => void;
  setTypeReview: (typeReview: WorkflowThreeI["typeReview"]) => void;
  setStorageName: (storageName: WorkflowThreeI["storageName"]) => void;
  setObservation: (observation: WorkflowThreeI["observation"]) => void;
  setTypeContainer: (typeContainer: WorkflowThreeI["typeContainer"]) => void;
  setNaviera: (naviera: WorkflowThreeI["naviera"]) => void;
  setSize: (size: WorkflowThreeI["size"]) => void;
  setCompanyTransport: (
    companyTransport: WorkflowThreeI["companyTransport"],
  ) => void;
  setEntryPort: (entryPort: WorkflowThreeI["entryPort"]) => void;
  // Container panoramic methods
  setContainerPanoramicPhoto: (
    containerPanoramicPhoto: WorkflowThreeI["containerPanoramicPhoto"],
  ) => void;
  setContainerPanoramicStatus: (
    containerPanoramicStatus: WorkflowThreeI["containerPanoramicStatus"],
  ) => void;
  setContainerPanoramicCheck: (
    containerPanoramicCheck: WorkflowThreeI["containerPanoramicCheck"],
  ) => void;
  setContainerPanoramicB64Check: (
    containerPanoramicB64Check: WorkflowThreeI["containerPanoramicB64Check"],
  ) => void;
  setContainerPanoramicComment: (
    containerPanoramicComment: WorkflowThreeI["containerPanoramicComment"],
  ) => void;
  setContainerPanoramicCoordinates: (
    containerPanoramicCoordinates: WorkflowThreeI["containerPanoramicCoordinates"],
  ) => void;

  // Naviera methods
  setNavieraBottlePhoto: (
    navieraBottlePhoto: WorkflowThreeI["navieraBottlePhoto"],
  ) => void;
  setNavieraBottleComment: (
    navieraBottleComment: WorkflowThreeI["navieraBottleComment"],
  ) => void;
  setNavieraBottleStatus: (
    navieraBottleStatus: WorkflowThreeI["navieraBottleStatus"],
  ) => void;
  setNavieraBottleCheck: (
    navieraBottleCheck: WorkflowThreeI["navieraBottleCheck"],
  ) => void;
  setNavieraBottleB64Check: (
    navieraBottleB64Check: WorkflowThreeI["navieraBottleB64Check"],
  ) => void;

  setNavieraWirePhoto: (
    navieraWirePhoto: WorkflowThreeI["navieraWirePhoto"],
  ) => void;
  setNavieraWireComment: (
    navieraWireComment: WorkflowThreeI["navieraWireComment"],
  ) => void;
  setNavieraWireStatus: (
    navieraWireStatus: WorkflowThreeI["navieraWireStatus"],
  ) => void;
  setNavieraWireCheck: (
    navieraWireCheck: WorkflowThreeI["navieraWireCheck"],
  ) => void;
  setNavieraWireB64Check: (
    navieraWireB64Check: WorkflowThreeI["navieraWireB64Check"],
  ) => void;

  setNavieraLabelPhoto: (
    navieraLabelPhoto: WorkflowThreeI["navieraLabelPhoto"],
  ) => void;
  setNavieraLabelComment: (
    navieraLabelComment: WorkflowThreeI["navieraLabelComment"],
  ) => void;
  setNavieraLabelStatus: (
    navieraLabelStatus: WorkflowThreeI["navieraLabelStatus"],
  ) => void;
  setNavieraLabelCheck: (
    navieraLabelCheck: WorkflowThreeI["navieraLabelCheck"],
  ) => void;
  setNavieraLabelB64Check: (
    navieraLabelB64Check: WorkflowThreeI["navieraLabelB64Check"],
  ) => void;

  // Exporter methods
  setExporterBottlePhoto: (
    exporterBottlePhoto: WorkflowThreeI["exporterBottlePhoto"],
  ) => void;
  setExporterBottleComment: (
    exporterBottleComment: WorkflowThreeI["exporterBottleComment"],
  ) => void;
  setExporterBottleStatus: (
    exporterBottleStatus: WorkflowThreeI["exporterBottleStatus"],
  ) => void;
  setExporterBottleCheck: (
    exporterBottleCheck: WorkflowThreeI["exporterBottleCheck"],
  ) => void;
  setExporterBottleB64Check: (
    exporterBottleB64Check: WorkflowThreeI["exporterBottleB64Check"],
  ) => void;

  setExporterWirePhoto: (
    exporterWirePhoto: WorkflowThreeI["exporterWirePhoto"],
  ) => void;
  setExporterWireComment: (
    exporterWireComment: WorkflowThreeI["exporterWireComment"],
  ) => void;
  setExporterWireStatus: (
    exporterWireStatus: WorkflowThreeI["exporterWireStatus"],
  ) => void;
  setExporterWireCheck: (
    exporterWireCheck: WorkflowThreeI["exporterWireCheck"],
  ) => void;
  setExporterWireB64Check: (
    exporterWireB64Check: WorkflowThreeI["exporterWireB64Check"],
  ) => void;

  setExporterLabelPhoto: (
    exporterLabelPhoto: WorkflowThreeI["exporterLabelPhoto"],
  ) => void;
  setExporterLabelComment: (
    exporterLabelComment: WorkflowThreeI["exporterLabelComment"],
  ) => void;
  setExporterLabelStatus: (
    exporterLabelStatus: WorkflowThreeI["exporterLabelStatus"],
  ) => void;
  setExporterLabelCheck: (
    exporterLabelCheck: WorkflowThreeI["exporterLabelCheck"],
  ) => void;
  setExporterLabelB64Check: (
    exporterLabelB64Check: WorkflowThreeI["exporterLabelB64Check"],
  ) => void;

  // Other methods
  setOtherBottlePhoto: (
    otherBottlePhoto: WorkflowThreeI["otherBottlePhoto"],
  ) => void;
  setOtherBottleComment: (
    otherBottleComment: WorkflowThreeI["otherBottleComment"],
  ) => void;
  setOtherBottleStatus: (
    otherBottleStatus: WorkflowThreeI["otherBottleStatus"],
  ) => void;
  setOtherBottleCheck: (
    otherBottleCheck: WorkflowThreeI["otherBottleCheck"],
  ) => void;
  setOtherBottleB64Check: (
    otherBottleB64Check: WorkflowThreeI["otherBottleB64Check"],
  ) => void;

  setOtherWirePhoto: (otherWirePhoto: WorkflowThreeI["otherWirePhoto"]) => void;
  setOtherWireComment: (
    otherWireComment: WorkflowThreeI["otherWireComment"],
  ) => void;
  setOtherWireStatus: (
    otherWireStatus: WorkflowThreeI["otherWireStatus"],
  ) => void;
  setOtherWireCheck: (otherWireCheck: WorkflowThreeI["otherWireCheck"]) => void;
  setOtherWireB64Check: (
    otherWireB64Check: WorkflowThreeI["otherWireB64Check"],
  ) => void;

  setOtherLabelPhoto: (
    otherLabelPhoto: WorkflowThreeI["otherLabelPhoto"],
  ) => void;
  setOtherLabelComment: (
    otherLabelComment: WorkflowThreeI["otherLabelComment"],
  ) => void;
  setOtherLabelStatus: (
    otherLabelStatus: WorkflowThreeI["otherLabelStatus"],
  ) => void;
  setOtherLabelCheck: (
    otherLabelCheck: WorkflowThreeI["otherLabelCheck"],
  ) => void;
  setOtherLabelB64Check: (
    otherLabelB64Check: WorkflowThreeI["otherLabelB64Check"],
  ) => void;

  // GPS methods
  setGpsPhoto: (gpsPhoto: WorkflowThreeI["gpsPhoto"]) => void;
  setGpsComment: (gpsComment: WorkflowThreeI["gpsComment"]) => void;
  setGpsStatus: (gpsStatus: WorkflowThreeI["gpsStatus"]) => void;
  setGpsCheck: (gpsCheck: WorkflowThreeI["gpsCheck"]) => void;
  setGpsB64Check: (gpsB64Check: WorkflowThreeI["gpsB64Check"]) => void;

  setGpsStampPhoto: (gpsStampPhoto: WorkflowThreeI["gpsStampPhoto"]) => void;
  setGpsStampStatus: (gpsStampStatus: WorkflowThreeI["gpsStampStatus"]) => void;
  setGpsStampComment: (
    gpsStampComment: WorkflowThreeI["gpsStampComment"],
  ) => void;
  setGpsStampCheck: (gpsStampCheck: WorkflowThreeI["gpsStampCheck"]) => void;
  setGpsStampB64Check: (
    gpsStampB64Check: WorkflowThreeI["gpsStampB64Check"],
  ) => void;

  // Enginery and door video methods
  setEngineryPhoto1: (engineryPhoto1: WorkflowThreeI["engineryPhoto1"]) => void;
  setEngineryComment1: (
    engineryComment1: WorkflowThreeI["engineryComment1"],
  ) => void;
  setEngineryStatus1: (
    engineryStatus1: WorkflowThreeI["engineryStatus1"],
  ) => void;
  setEngineryCheck1: (engineryCheck1: WorkflowThreeI["engineryCheck1"]) => void;
  setEngineryB64Check1: (
    engineryB64Check1: WorkflowThreeI["engineryB64Check1"],
  ) => void;

  setEngineryPhoto2: (engineryPhoto2: WorkflowThreeI["engineryPhoto2"]) => void;
  setEngineryComment2: (
    engineryComment2: WorkflowThreeI["engineryComment2"],
  ) => void;
  setEngineryStatus2: (
    engineryStatus2: WorkflowThreeI["engineryStatus2"],
  ) => void;
  setEngineryCheck2: (engineryCheck2: WorkflowThreeI["engineryCheck2"]) => void;
  setEngineryB64Check2: (
    engineryB64Check2: WorkflowThreeI["engineryB64Check2"],
  ) => void;

  setEngineryVideo: (engineryVideo: WorkflowThreeI["engineryVideo"]) => void;
  setEngineryVideoStatus: (
    engineryVideoStatus: WorkflowThreeI["engineryVideoStatus"],
  ) => void;
  setEngineryVideoCheck: (
    engineryVideoCheck: WorkflowThreeI["engineryVideoCheck"],
  ) => void;
  setEngineryVideoB64Check: (
    engineryVideoB64Check: WorkflowThreeI["engineryVideoB64Check"],
  ) => void;
  setEngineryVideoComment: (
    engineryVideoComment: WorkflowThreeI["engineryVideoComment"],
  ) => void;

  setDoorVideo: (doorVideo: WorkflowThreeI["doorVideo"]) => void;
  setDoorVideoStatus: (
    doorVideoStatus: WorkflowThreeI["doorVideoStatus"],
  ) => void;
  setDoorVideoCheck: (doorVideoCheck: WorkflowThreeI["doorVideoCheck"]) => void;
  setDoorVideoB64Check: (
    doorVideoB64Check: WorkflowThreeI["doorVideoB64Check"],
  ) => void;
  setDoorVideoComment: (
    doorVideoComment: WorkflowThreeI["doorVideoComment"],
  ) => void;

  // General methods
  getValues: () => Partial<WorkflowThreeI>;
  setValues: (data: WorkflowThreeI) => void;
  onClear: () => void;
  // resetSteps: () => void;
  getOnlyPhotos: () => { [key: string]: string };
}
