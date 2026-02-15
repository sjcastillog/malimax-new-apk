import { initialWorkflowStateThree, PHOTOS_DIR } from "@/common/constants";
import {
  WorkflowThreeActionI,
  WorkflowThreeI,
} from "@/core/container-three/interfaces";
import { File } from "expo-file-system";
import moment from "moment";
import { StateCreator } from "zustand";

export const createWorkflowContainerThreeSlice: StateCreator<
  WorkflowThreeI & WorkflowThreeActionI,
  [],
  []
> = (set, get) => ({
  ...initialWorkflowStateThree,

  setPhoto: async (field: string, uri: string, filename?: string) => {
    try {
      const oldPhotoFilename = (get() as any)[field];

      // Eliminar foto anterior si existe
      if (oldPhotoFilename) {
        const oldPhotoPath = `${PHOTOS_DIR}${oldPhotoFilename}`;
        try {
          const oldFile = new File(oldPhotoPath);
          if (oldFile.exists) {
            await oldFile.delete();
          }
        } catch (error) {
          console.error("⚠️ Error eliminando foto anterior:", error);
        }
      }

      if (!uri) {
        set({ [field]: "" });
        return;
      }

      // Guardar el filename en el estado
      set({ [field]: filename });

      // Lógica especial: Si es la foto panorámica del contenedor, guardar coordenadas
      if (field === "containerPanoramicPhoto") {
        const coordinates = get().coordinates;
        set({ containerPanoramicCoordinates: coordinates });
      }

      return;
    } catch (error) {
      console.error("❌ Error en setPhoto:", error);
      throw error;
    }
  },

  setCoordinates: (coordinates) => {
    set(() => ({ coordinates }));
  },

  setOpenedBy: (openedBy) => {
    set(() => ({ openedBy }));
  },

  setOpenedWas: (openedWas) => {
    set(() => ({ openedWas }));
  },

  setObservation: (observation) => {
    set(() => ({ observation }));
  },

  setTypeContainer: (typeContainer) => {
    set(() => ({ typeContainer }));
  },

  setSize: (size) => {
    set(() => ({ size }));
  },

  setNaviera: (naviera) => {
    set(() => ({ naviera }));
  },

  setCompanyTransport: (companyTransport) => {
    set(() => ({ companyTransport }));
  },

  setCreatedByAdmin: (createdByAdmin) => {
    set(() => ({ createdByAdmin }));
  },

  setEntryPort: (entryPort) => {
    set(() => ({ entryPort }));
  },

  // ============================================
  // SETTERS DE CONTENEDOR
  // ============================================

  setContainerPanoramicPhoto: (containerPanoramicPhoto) =>
    set(() => ({ containerPanoramicPhoto })),

  setContainerPanoramicStatus: (containerPanoramicStatus) =>
    set(() => ({ containerPanoramicStatus })),

  setContainerPanoramicCheck: (containerPanoramicCheck) =>
    set(() => ({ containerPanoramicCheck })),

  setContainerPanoramicB64Check: (containerPanoramicB64Check) =>
    set(() => ({ containerPanoramicB64Check })),

  setContainerPanoramicComment: (containerPanoramicComment) =>
    set(() => ({ containerPanoramicComment })),

  setContainerPanoramicCoordinates: (containerPanoramicCoordinates) =>
    set(() => ({ containerPanoramicCoordinates })),

  // ============================================
  // SETTERS DE NAVIERA
  // ============================================

  setNavieraBottlePhoto: (navieraBottlePhoto) =>
    set(() => ({ navieraBottlePhoto })),

  setNavieraBottleComment: (navieraBottleComment) =>
    set(() => ({ navieraBottleComment })),

  setNavieraBottleStatus: (navieraBottleStatus) =>
    set(() => ({ navieraBottleStatus })),

  setNavieraBottleCheck: (navieraBottleCheck) =>
    set(() => ({ navieraBottleCheck })),

  setNavieraBottleB64Check: (navieraBottleB64Check) =>
    set(() => ({ navieraBottleB64Check })),

  setNavieraWirePhoto: (navieraWirePhoto) => set(() => ({ navieraWirePhoto })),

  setNavieraWireComment: (navieraWireComment) =>
    set(() => ({ navieraWireComment })),

  setNavieraWireStatus: (navieraWireStatus) =>
    set(() => ({ navieraWireStatus })),

  setNavieraWireCheck: (navieraWireCheck) => set(() => ({ navieraWireCheck })),

  setNavieraWireB64Check: (navieraWireB64Check) =>
    set(() => ({ navieraWireB64Check })),

  setNavieraLabelPhoto: (navieraLabelPhoto) =>
    set(() => ({ navieraLabelPhoto })),

  setNavieraLabelComment: (navieraLabelComment) =>
    set(() => ({ navieraLabelComment })),

  setNavieraLabelStatus: (navieraLabelStatus) =>
    set(() => ({ navieraLabelStatus })),

  setNavieraLabelCheck: (navieraLabelCheck) =>
    set(() => ({ navieraLabelCheck })),

  setNavieraLabelB64Check: (navieraLabelB64Check) =>
    set(() => ({ navieraLabelB64Check })),

  // ============================================
  // SETTERS DE EXPORTADOR
  // ============================================

  setExporterBottlePhoto: (exporterBottlePhoto) =>
    set(() => ({ exporterBottlePhoto })),

  setExporterBottleComment: (exporterBottleComment) =>
    set(() => ({ exporterBottleComment })),

  setExporterBottleStatus: (exporterBottleStatus) =>
    set(() => ({ exporterBottleStatus })),

  setExporterBottleCheck: (exporterBottleCheck) =>
    set(() => ({ exporterBottleCheck })),

  setExporterBottleB64Check: (exporterBottleB64Check) =>
    set(() => ({ exporterBottleB64Check })),

  setExporterWirePhoto: (exporterWirePhoto) =>
    set(() => ({ exporterWirePhoto })),

  setExporterWireComment: (exporterWireComment) =>
    set(() => ({ exporterWireComment })),

  setExporterWireStatus: (exporterWireStatus) =>
    set(() => ({ exporterWireStatus })),

  setExporterWireCheck: (exporterWireCheck) =>
    set(() => ({ exporterWireCheck })),

  setExporterWireB64Check: (exporterWireB64Check) =>
    set(() => ({ exporterWireB64Check })),

  setExporterLabelPhoto: (exporterLabelPhoto) =>
    set(() => ({ exporterLabelPhoto })),

  setExporterLabelComment: (exporterLabelComment) =>
    set(() => ({ exporterLabelComment })),

  setExporterLabelStatus: (exporterLabelStatus) =>
    set(() => ({ exporterLabelStatus })),

  setExporterLabelCheck: (exporterLabelCheck) =>
    set(() => ({ exporterLabelCheck })),

  setExporterLabelB64Check: (exporterLabelB64Check) =>
    set(() => ({ exporterLabelB64Check })),

  // ============================================
  // SETTERS DE OTRO
  // ============================================

  setOtherBottlePhoto: (otherBottlePhoto) => set(() => ({ otherBottlePhoto })),

  setOtherBottleComment: (otherBottleComment) =>
    set(() => ({ otherBottleComment })),

  setOtherBottleStatus: (otherBottleStatus) =>
    set(() => ({ otherBottleStatus })),

  setOtherBottleCheck: (otherBottleCheck) => set(() => ({ otherBottleCheck })),

  setOtherBottleB64Check: (otherBottleB64Check) =>
    set(() => ({ otherBottleB64Check })),

  setOtherWirePhoto: (otherWirePhoto) => set(() => ({ otherWirePhoto })),

  setOtherWireComment: (otherWireComment) => set(() => ({ otherWireComment })),

  setOtherWireStatus: (otherWireStatus) => set(() => ({ otherWireStatus })),

  setOtherWireCheck: (otherWireCheck) => set(() => ({ otherWireCheck })),

  setOtherWireB64Check: (otherWireB64Check) =>
    set(() => ({ otherWireB64Check })),

  setOtherLabelPhoto: (otherLabelPhoto) => set(() => ({ otherLabelPhoto })),

  setOtherLabelComment: (otherLabelComment) =>
    set(() => ({ otherLabelComment })),

  setOtherLabelStatus: (otherLabelStatus) => set(() => ({ otherLabelStatus })),

  setOtherLabelCheck: (otherLabelCheck) => set(() => ({ otherLabelCheck })),

  setOtherLabelB64Check: (otherLabelB64Check) =>
    set(() => ({ otherLabelB64Check })),

  // ============================================
  // SETTERS DE GPS
  // ============================================

  setGpsPhoto: (gpsPhoto) => set(() => ({ gpsPhoto })),

  setGpsComment: (gpsComment) => set(() => ({ gpsComment })),

  setGpsStatus: (gpsStatus) => set(() => ({ gpsStatus })),

  setGpsCheck: (gpsCheck) => set(() => ({ gpsCheck })),

  setGpsB64Check: (gpsB64Check) => set(() => ({ gpsB64Check })),

  setGpsStampPhoto: (gpsStampPhoto) => set(() => ({ gpsStampPhoto })),

  setGpsStampStatus: (gpsStampStatus) => set(() => ({ gpsStampStatus })),

  setGpsStampComment: (gpsStampComment) => set(() => ({ gpsStampComment })),

  setGpsStampCheck: (gpsStampCheck) => set(() => ({ gpsStampCheck })),

  setGpsStampB64Check: (gpsStampB64Check) => set(() => ({ gpsStampB64Check })),

  // ============================================
  // SETTERS DE INGENIERÍA
  // ============================================

  setEngineryPhoto1: (engineryPhoto1) => set(() => ({ engineryPhoto1 })),

  setEngineryComment1: (engineryComment1) => set(() => ({ engineryComment1 })),

  setEngineryStatus1: (engineryStatus1) => set(() => ({ engineryStatus1 })),

  setEngineryCheck1: (engineryCheck1) => set(() => ({ engineryCheck1 })),

  setEngineryB64Check1: (engineryB64Check1) =>
    set(() => ({ engineryB64Check1 })),

  setEngineryPhoto2: (engineryPhoto2) => set(() => ({ engineryPhoto2 })),

  setEngineryComment2: (engineryComment2) => set(() => ({ engineryComment2 })),

  setEngineryStatus2: (engineryStatus2) => set(() => ({ engineryStatus2 })),

  setEngineryCheck2: (engineryCheck2) => set(() => ({ engineryCheck2 })),

  setEngineryB64Check2: (engineryB64Check2) =>
    set(() => ({ engineryB64Check2 })),

  // ============================================
  // SETTERS DE VIDEOS
  // ============================================

  setEngineryVideo: async (file) => {
    if (!file) {
      set(() => ({ engineryVideo: "" }));
      return;
    }
    set(() => ({ engineryVideo: file as string }));
  },

  setEngineryVideoStatus: (engineryVideoStatus) =>
    set(() => ({ engineryVideoStatus })),

  setEngineryVideoCheck: (engineryVideoCheck) =>
    set(() => ({ engineryVideoCheck })),

  setEngineryVideoB64Check: (engineryVideoB64Check) =>
    set(() => ({ engineryVideoB64Check })),

  setEngineryVideoComment: (engineryVideoComment) =>
    set(() => ({ engineryVideoComment })),

  setDoorVideo: async (file) => {
    if (!file) {
      set(() => ({ doorVideo: "" }));
      return;
    }
    set(() => ({ doorVideo: file as string }));
  },

  setDoorVideoStatus: (doorVideoStatus) => set(() => ({ doorVideoStatus })),

  setDoorVideoCheck: (doorVideoCheck) => set(() => ({ doorVideoCheck })),

  setDoorVideoB64Check: (doorVideoB64Check) =>
    set(() => ({ doorVideoB64Check })),

  setDoorVideoComment: (doorVideoComment) => set(() => ({ doorVideoComment })),

  // ============================================
  // SETTERS GENERALES
  // ============================================

  setId: (id) => set(() => ({ id })),

  setHourInit: (hourInit) => set(() => ({ hourInit })),

  setHourEnd: (hourEnd) => set(() => ({ hourEnd })),

  setStartProcess: (startProcess) => set(() => ({ startProcess })),

  setEndProcess: (endProcess) => set(() => ({ endProcess })),

  setAddress: (address) => set(() => ({ address })),

  setCity: (city) => set(() => ({ city })),

  setTypeReview: (typeReview) => set(() => ({ typeReview })),

  setStorageName: (storageName) => set(() => ({ storageName })),

  setContainer: (container) => {
    const elContainer = get().container;
    if (elContainer !== "" || elContainer !== null) {
      const now = moment();
      const hourGenerate = now.format("HH:mm:ss");
      set(() => ({ container, hourInit: hourGenerate }));
    } else {
      set(() => ({ container }));
    }
  },

 setWorkflowTwoData: async (datawf: any) => {
    set(() => ({
      city: datawf.city,
      size: datawf.size,
      entryPort: datawf.entryPort,
      naviera: datawf.naviera,
      companyTransport: datawf.companyTransport,
      address: datawf.address,
      typeReview: datawf.typeReview,
      storageName: datawf.storageName,
      driverName: datawf.driverName,
      driverIdentification: datawf.driverIdentification,
      plateVehicle: datawf.plateVehicle,
      typeContainer: datawf.typeContainer,
      containerPanoramicCheck: datawf.containerPanoramicCheck,
      navieraBottleCheck: datawf.navieraBottleCheck,
      navieraWireCheck: datawf.navieraWireCheck,
      navieraLabelCheck: datawf.navieraLabelCheck,
      exporterBottleCheck: datawf.exporterBottleCheck,
      exporterWireCheck: datawf.exporterWireCheck,
      exporterLabelCheck: datawf.exporterLabelCheck,
      otherBottleCheck: datawf.otherBottleCheck,
      otherWireCheck: datawf.otherWireCheck,
      otherLabelCheck: datawf.otherLabelCheck,
      gpsCheck: datawf.gpsCheck,
      gpsStampCheck: datawf.gpsStampCheck,
      engineryCheck1: datawf.engineryCheck1,
      engineryCheck2: datawf.engineryCheck2,
      engineryVideoCheck: datawf.engineryVideoCheck,
      doorVideoCheck: datawf.doorVideoCheck,
    }));

    await Promise.all([
      get().setContainerPanoramicB64Check(datawf.containerPanoramicCheck),
      get().setNavieraBottleB64Check(datawf.navieraBottleCheck),
      get().setNavieraWireB64Check(datawf.navieraWireCheck),
      get().setNavieraLabelB64Check(datawf.navieraLabelCheck),
      get().setExporterBottleB64Check(datawf.exporterBottleCheck),
      get().setExporterWireB64Check(datawf.exporterWireCheck),
      get().setExporterLabelB64Check(datawf.exporterLabelCheck),
      get().setOtherBottleB64Check(datawf.otherBottleCheck),
      get().setOtherWireB64Check(datawf.otherWireCheck),
      get().setOtherLabelB64Check(datawf.otherLabelCheck),
      get().setGpsB64Check(datawf.gpsCheck),
      get().setGpsStampB64Check(datawf.gpsStampCheck),
      get().setEngineryB64Check1(datawf.engineryCheck1),
      get().setEngineryB64Check2(datawf.engineryCheck2),
      get().setEngineryVideoB64Check(datawf.engineryVideoCheck),
      get().setDoorVideoB64Check(datawf.doorVideoCheck),
    ]);
  },
  setClient: (client) => set(() => ({ client })),

  setClientId: (clientId) => set(() => ({ clientId })),

  setClientIdentification: (clientIdentification) =>
    set(() => ({ clientIdentification })),

  setLabelSerial: (labelSerial) => set(() => ({ labelSerial })),

  setPlateVehicle: (plateVehicle) => set(() => ({ plateVehicle })),

  setDriverName: (driverName) => set(() => ({ driverName })),

  setDriverIdentification: (driverIdentification) =>
    set(() => ({ driverIdentification })),

  getOnlyPhotos: () => ({
    containerPanoramicPhoto: get().containerPanoramicPhoto,
    containerPanoramicCheck: get().containerPanoramicCheck,
    navieraBottlePhoto: get().navieraBottlePhoto,
    navieraBottleCheck: get().navieraBottleCheck,
    navieraWirePhoto: get().navieraWirePhoto,
    navieraWireCheck: get().navieraWireCheck,
    navieraLabelPhoto: get().navieraLabelPhoto,
    navieraLabelCheck: get().navieraLabelCheck,
    exporterBottlePhoto: get().exporterBottlePhoto,
    exporterBottleCheck: get().exporterBottleCheck,
    exporterWirePhoto: get().exporterWirePhoto,
    exporterWireCheck: get().exporterWireCheck,
    exporterLabelPhoto: get().exporterLabelPhoto,
    exporterLabelCheck: get().exporterLabelCheck,
    otherBottlePhoto: get().otherBottlePhoto,
    otherBottleCheck: get().otherBottleCheck,
    otherWirePhoto: get().otherWirePhoto,
    otherWireCheck: get().otherWireCheck,
    otherLabelPhoto: get().otherLabelPhoto,
    otherLabelCheck: get().otherLabelCheck,
    gpsPhoto: get().gpsPhoto,
    gpsCheck: get().gpsCheck,
    gpsStampPhoto: get().gpsStampPhoto,
    gpsStampCheck: get().gpsStampCheck,
    engineryPhoto1: get().engineryPhoto1,
    engineryCheck1: get().engineryCheck1,
    engineryPhoto2: get().engineryPhoto2,
    engineryCheck2: get().engineryCheck2,
  }),

  getValues: () => ({
    coordinates: get().coordinates,
    observation: get().observation,
    container: get().container,
    createdByAdmin: get().createdByAdmin,
    typeContainer: get().typeContainer,
    naviera: get().naviera,
    size: get().size,
    companyTransport: get().companyTransport,
    entryPort: get().entryPort,
    openedBy: get().openedBy,
    openedWas: get().openedWas,
    clientId: get().clientId,
    client: get().client,
    labelSerial: get().labelSerial,
    plateVehicle: get().plateVehicle,
    driverName: get().driverName,
    driverIdentification: get().driverIdentification,
    hourInit: get().hourInit,
    hourEnd: get().hourEnd,
    startProcess: get().startProcess,
    endProcess: get().endProcess,
    address: get().address,
    city: get().city,
    typeReview: get().typeReview,
    storageName: get().storageName,
    // Contenedor
    containerPanoramicPhoto: get().containerPanoramicPhoto,
    containerPanoramicStatus: get().containerPanoramicStatus,
    containerPanoramicCheck: get().containerPanoramicCheck,
    containerPanoramicB64Check: get().containerPanoramicB64Check,
    containerPanoramicComment: get().containerPanoramicComment,
    containerPanoramicCoordinates: get().containerPanoramicCoordinates,
    // Naviera
    navieraBottlePhoto: get().navieraBottlePhoto,
    navieraBottleComment: get().navieraBottleComment,
    navieraBottleStatus: get().navieraBottleStatus,
    navieraBottleCheck: get().navieraBottleCheck,
    navieraBottleB64Check: get().navieraBottleB64Check,
    navieraWirePhoto: get().navieraWirePhoto,
    navieraWireComment: get().navieraWireComment,
    navieraWireStatus: get().navieraWireStatus,
    navieraWireCheck: get().navieraWireCheck,
    navieraWireB64Check: get().navieraWireB64Check,
    navieraLabelPhoto: get().navieraLabelPhoto,
    navieraLabelComment: get().navieraLabelComment,
    navieraLabelStatus: get().navieraLabelStatus,
    navieraLabelCheck: get().navieraLabelCheck,
    navieraLabelB64Check: get().navieraLabelB64Check,
    // Exportador
    exporterBottlePhoto: get().exporterBottlePhoto,
    exporterBottleComment: get().exporterBottleComment,
    exporterBottleStatus: get().exporterBottleStatus,
    exporterBottleCheck: get().exporterBottleCheck,
    exporterBottleB64Check: get().exporterBottleB64Check,
    exporterWirePhoto: get().exporterWirePhoto,
    exporterWireComment: get().exporterWireComment,
    exporterWireStatus: get().exporterWireStatus,
    exporterWireCheck: get().exporterWireCheck,
    exporterWireB64Check: get().exporterWireB64Check,
    exporterLabelPhoto: get().exporterLabelPhoto,
    exporterLabelComment: get().exporterLabelComment,
    exporterLabelStatus: get().exporterLabelStatus,
    exporterLabelCheck: get().exporterLabelCheck,
    exporterLabelB64Check: get().exporterLabelB64Check,
    // Otro
    otherBottlePhoto: get().otherBottlePhoto,
    otherBottleComment: get().otherBottleComment,
    otherBottleStatus: get().otherBottleStatus,
    otherBottleCheck: get().otherBottleCheck,
    otherBottleB64Check: get().otherBottleB64Check,
    otherWirePhoto: get().otherWirePhoto,
    otherWireComment: get().otherWireComment,
    otherWireStatus: get().otherWireStatus,
    otherWireCheck: get().otherWireCheck,
    otherWireB64Check: get().otherWireB64Check,
    otherLabelPhoto: get().otherLabelPhoto,
    otherLabelComment: get().otherLabelComment,
    otherLabelStatus: get().otherLabelStatus,
    otherLabelCheck: get().otherLabelCheck,
    otherLabelB64Check: get().otherLabelB64Check,
    // GPS
    gpsPhoto: get().gpsPhoto,
    gpsComment: get().gpsComment,
    gpsStatus: get().gpsStatus,
    gpsCheck: get().gpsCheck,
    gpsB64Check: get().gpsB64Check,
    gpsStampPhoto: get().gpsStampPhoto,
    gpsStampStatus: get().gpsStampStatus,
    gpsStampComment: get().gpsStampComment,
    gpsStampCheck: get().gpsStampCheck,
    gpsStampB64Check: get().gpsStampB64Check,
    // Ingeniería
    engineryPhoto1: get().engineryPhoto1,
    engineryComment1: get().engineryComment1,
    engineryStatus1: get().engineryStatus1,
    engineryCheck1: get().engineryCheck1,
    engineryB64Check1: get().engineryB64Check1,
    engineryPhoto2: get().engineryPhoto2,
    engineryComment2: get().engineryComment2,
    engineryStatus2: get().engineryStatus2,
    engineryCheck2: get().engineryCheck2,
    engineryB64Check2: get().engineryB64Check2,
    // Videos
    engineryVideo: get().engineryVideo,
    engineryVideoStatus: get().engineryVideoStatus,
    engineryVideoCheck: get().engineryVideoCheck,
    engineryVideoB64Check: get().engineryVideoB64Check,
    engineryVideoComment: get().engineryVideoComment,
    doorVideo: get().doorVideo,
    doorVideoStatus: get().doorVideoStatus,
    doorVideoCheck: get().doorVideoCheck,
    doorVideoB64Check: get().doorVideoB64Check,
    doorVideoComment: get().doorVideoComment,
  }),

  setValues: (ladata) => {
    set(ladata);
  },

  // ============================================
  // LIMPIEZA TOTAL
  // ============================================
  onClear: async () => {
    const state = get();

    // Lista de todos los campos de fotos
    const photoKeys = [
      state.containerPanoramicPhoto,
      state.containerPanoramicCheck,
      state.navieraBottlePhoto,
      state.navieraBottleCheck,
      state.navieraWirePhoto,
      state.navieraWireCheck,
      state.navieraLabelPhoto,
      state.navieraLabelCheck,
      state.exporterBottlePhoto,
      state.exporterBottleCheck,
      state.exporterWirePhoto,
      state.exporterWireCheck,
      state.exporterLabelPhoto,
      state.exporterLabelCheck,
      state.otherBottlePhoto,
      state.otherBottleCheck,
      state.otherWirePhoto,
      state.otherWireCheck,
      state.otherLabelPhoto,
      state.otherLabelCheck,
      state.gpsPhoto,
      state.gpsCheck,
      state.gpsStampPhoto,
      state.gpsStampCheck,
      state.engineryPhoto1,
      state.engineryCheck1,
      state.engineryPhoto2,
      state.engineryCheck2,
    ];

    // Eliminar fotos fijas
    for (const photoFilename of photoKeys) {
      if (photoFilename) {
        try {
          const photoPath = `${PHOTOS_DIR}${photoFilename}`;
          const fileToDelete = new File(photoPath);
          if (fileToDelete.exists) {
            await fileToDelete.delete();
          }
        } catch (error) {
          console.error("Error eliminando foto:", error);
        }
      }
    }

    // Eliminar videos
    const videoKeys = [
      state.engineryVideo,
      state.engineryVideoCheck,
      state.doorVideo,
      state.doorVideoCheck,
    ];

    for (const videoPath of videoKeys) {
      if (videoPath && !videoPath.startsWith("http")) {
        try {
          const fileToDelete = new File(videoPath);
          if (fileToDelete.exists) {
            await fileToDelete.delete();
          }
        } catch (error) {
          console.error("Error eliminando video:", error);
        }
      }
    }

    // Resetear todo el estado
    set(() => ({
      ...initialWorkflowStateThree,
    }));
  },
});