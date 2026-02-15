export interface WorkflowTruckI extends WorkflowTruckRequiredI {
  id?: number | null;
  client: string;
  producer: string;
  farm: string;
  zone: string;
  balerCode: string;
  box: string;
  brand: string;
  statusT?: number;
  producerShort?: string;
  farmShort?: string;
  _hasHydrated: boolean;
}

export interface WorkflowTruckRequiredI {
  container: string;
  clientId: number | null;
  producerId: number | null;
  farmId: number | null;
  magap: string;
  boxId: number | null;
  brandId: number | null;
  gancho: string;
  ganchoCi: string;
  calidad: string;
  calidadCi: string;
  driver: string;
  companyTransport: string;
  ciConductor: string;
  placa: string;
  observation: string;
  cajasEstiba: number | null;
  numCajas: number | null;
  date?: string;

  startProcess: string;
  closeProcess: string;
  endLoading: string;
  containerClose: string;
  containerOulet: string;
  hourSaveUser?: string;
  hourSaveServer?: string;

  photo1: string;
  photo2: string;
  photo3: string;
  photo4: string;
  photo5: string;
  photo6: string;
  photo7: string;
  photo8: string;
}

export interface WorkflowTruckActionI {
  // setPhoto1: (photo1: WorkflowTruckI["photo1"]) => void;
  // setPhoto2: (photo2: WorkflowTruckI["photo2"]) => void;
  // setPhoto3: (photo3: WorkflowTruckI["photo3"]) => void;
  // setPhoto4: (photo4: WorkflowTruckI["photo4"]) => void;
  // setPhoto5: (photo5: WorkflowTruckI["photo5"]) => void;
  // setPhoto6: (photo5: WorkflowTruckI["photo5"]) => void;
  // setPhoto7: (photo5: WorkflowTruckI["photo5"]) => void;
  // setPhoto8: (photo5: WorkflowTruckI["photo5"]) => void;

  setPhoto: (field: string, uri: string, filename: string) => Promise<void>;

  setStartProcess: (startProcess: WorkflowTruckI["startProcess"]) => void;
  setCloseProcess: (closeProcess: WorkflowTruckI["closeProcess"]) => void;
  setEndLoading: (endLoading: WorkflowTruckI["endLoading"]) => void;
  setContainerClose: (containerClose: WorkflowTruckI["containerClose"]) => void;
  setContainerOulet: (containerOulet: WorkflowTruckI["containerOulet"]) => void;

  setContainer: (container: WorkflowTruckI["container"]) => void;
  setClient: (client: WorkflowTruckI["client"]) => void;
  setClientId: (clientId: WorkflowTruckI["clientId"]) => void;
  setProducer: (producer: WorkflowTruckI["producer"]) => void;
  setProducerId: (producerId: WorkflowTruckI["producerId"]) => void;
  setFarm: (farm: WorkflowTruckI["farm"]) => void;
  setProducerShort: (producerShort: WorkflowTruckI["producerShort"]) => void;
  setFarmShort: (farmShort: WorkflowTruckI["farmShort"]) => void;
  setFarmId: (farmId: WorkflowTruckI["farmId"]) => void;
  setZone: (zone: WorkflowTruckI["zone"]) => void;
  setMagap: (magap: WorkflowTruckI["magap"]) => void;
  setBalerCode: (balerCode: WorkflowTruckI["balerCode"]) => void;
  setBox: (box: WorkflowTruckI["box"]) => void;
  setBoxId: (boxId: WorkflowTruckI["boxId"]) => void;
  setBrand: (brand: WorkflowTruckI["brand"]) => void;
  setBrandId: (brandId: WorkflowTruckI["brandId"]) => void;
  setId: (id: WorkflowTruckI["id"]) => void;
  setCiConductor: (ciConductor: WorkflowTruckI["ciConductor"]) => void;
  setPlaca: (placa: WorkflowTruckI["placa"]) => void;
  setCalidad: (calidad: WorkflowTruckI["calidad"]) => void;
  setCalidadCi: (calidadCi: WorkflowTruckI["calidadCi"]) => void;
  setGancho: (gancho: WorkflowTruckI["gancho"]) => void;
  setGanchoCi: (ganchoCi: WorkflowTruckI["ganchoCi"]) => void;
  setDriver: (driver: WorkflowTruckI["driver"]) => void;
  setObservation: (observation: WorkflowTruckI["observation"]) => void;
  setCompanyTransport: (
    companyTransport: WorkflowTruckI["companyTransport"]
  ) => void;
  setCajasEstiba: (cajasEstiba: WorkflowTruckI["cajasEstiba"]) => void;
  setNumCajas: (numCajas: WorkflowTruckI["numCajas"]) => void;

  getDataTruck: () => WorkflowTruckRequiredI;
  setDataTruck: (ladata: WorkflowTruckI) => void;
  getStatusT: () => void;
  onClear: () => Promise<void>;

  resetClient: () => void;
  resetProducer: () => void;
  resetFarm: () => void;
}
