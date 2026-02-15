import { initialWorkflowStateTwo, PHOTOS_DIR } from "@/common/constants";
import {
  WorkflowTwoActionI,
  WorkflowTwoI,
  WorkflowImageI,
} from "@/core/container-two/interfaces";
import { File } from "expo-file-system";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { StateCreator } from "zustand";

export const createWorkflowContainerTwoSlice: StateCreator<
  WorkflowTwoI & WorkflowTwoActionI,
  [],
  []
> = (set, get) => ({
  ...initialWorkflowStateTwo,

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

  getImages: () => get().images,

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
  // SETTERS DE VALIDACIÓN - FOTOS CHECK
  // ============================================

  setEmptyPanoramicCheckPhoto: (emptyPanoramicCheckPhoto) =>
    set(() => ({ emptyPanoramicCheckPhoto })),

  setEmptyPanoramicCheckB64Photo: (emptyPanoramicCheckB64Photo) =>
    set(() => ({ emptyPanoramicCheckB64Photo })),

  setEmptyPanoramicValidationPhoto: (emptyPanoramicValidationPhoto) =>
    set(() => ({ emptyPanoramicValidationPhoto })),

  setEmptyPanoramicCheckStatus: (emptyPanoramicCheckStatus) =>
    set(() => ({ emptyPanoramicCheckStatus })),

  setEmptyPanoramicCheckComment: (emptyPanoramicCheckComment) =>
    set(() => ({ emptyPanoramicCheckComment })),

  setEmptyStampNavieraCheckPhoto: (emptyStampNavieraCheckPhoto) =>
    set(() => ({ emptyStampNavieraCheckPhoto })),

  setEmptyStampNavieraCheckB64Photo: (emptyStampNavieraCheckB64Photo) =>
    set(() => ({ emptyStampNavieraCheckB64Photo })),

  setEmptyStampNavieraValidationPhoto: (emptyStampNavieraValidationPhoto) =>
    set(() => ({ emptyStampNavieraValidationPhoto })),

  setEmptyStampNavieraCheckComment: (emptyStampNavieraCheckComment) =>
    set(() => ({ emptyStampNavieraCheckComment })),

  setEmptyStampNavieraCheckStatus: (emptyStampNavieraCheckStatus) =>
    set(() => ({ emptyStampNavieraCheckStatus })),

  setEmptyOtherStampCheckPhoto: (emptyOtherStampCheckPhoto) =>
    set(() => ({ emptyOtherStampCheckPhoto })),

  setEmptyOtherStampCheckB64Photo: (emptyOtherStampCheckB64Photo) =>
    set(() => ({ emptyOtherStampCheckB64Photo })),

  setEmptyOtherStampValidationPhoto: (emptyOtherStampValidationPhoto) =>
    set(() => ({ emptyOtherStampValidationPhoto })),

  setEmptyOtherStampCheckComment: (emptyOtherStampCheckComment) =>
    set(() => ({ emptyOtherStampCheckComment })),

  setEmptyOtherStampCheckStatus: (emptyOtherStampCheckStatus) =>
    set(() => ({ emptyOtherStampCheckStatus })),

  setEmptySatelliteLockCheckPhoto: (emptySatelliteLockCheckPhoto) =>
    set(() => ({ emptySatelliteLockCheckPhoto })),

  setEmptySatelliteLockCheckB64Photo: (emptySatelliteLockCheckB64Photo) =>
    set(() => ({ emptySatelliteLockCheckB64Photo })),

  setEmptySatelliteLockValidationPhoto: (emptySatelliteLockValidationPhoto) =>
    set(() => ({ emptySatelliteLockValidationPhoto })),

  setEmptySatelliteLockCheckComment: (emptySatelliteLockCheckComment) =>
    set(() => ({ emptySatelliteLockCheckComment })),

  setEmptySatelliteLockCheckStatus: (emptySatelliteLockCheckStatus) =>
    set(() => ({ emptySatelliteLockCheckStatus })),

  setExitEngineryCheckPhoto1: (exitEngineryCheckPhoto1) =>
    set(() => ({ exitEngineryCheckPhoto1 })),

  setExitEngineryCheckB64Photo1: (exitEngineryCheckB64Photo1) =>
    set(() => ({ exitEngineryCheckB64Photo1 })),

  setExitEngineryValidationPhoto1: (exitEngineryValidationPhoto1) =>
    set(() => ({ exitEngineryValidationPhoto1 })),

  setExitEngineryCheckComment1: (exitEngineryCheckComment1) =>
    set(() => ({ exitEngineryCheckComment1 })),

  setExitEngineryCheckStatus1: (exitEngineryCheckStatus1) =>
    set(() => ({ exitEngineryCheckStatus1 })),

  setExitEngineryCheckPhoto2: (exitEngineryCheckPhoto2) =>
    set(() => ({ exitEngineryCheckPhoto2 })),

  setExitEngineryCheckB64Photo2: (exitEngineryCheckB64Photo2) =>
    set(() => ({ exitEngineryCheckB64Photo2 })),

  setExitEngineryValidationPhoto2: (exitEngineryValidationPhoto2) =>
    set(() => ({ exitEngineryValidationPhoto2 })),

  setExitEngineryCheckComment2: (exitEngineryCheckComment2) =>
    set(() => ({ exitEngineryCheckComment2 })),

  setExitEngineryCheckStatus2: (exitEngineryCheckStatus2) =>
    set(() => ({ exitEngineryCheckStatus2 })),

  setExitDoorCheckVideo: (exitDoorCheckVideo) =>
    set(() => ({ exitDoorCheckVideo })),

  setExitDoorCheckB64Video: (exitDoorCheckB64Video) =>
    set(() => ({ exitDoorCheckB64Video })),

  setExitDoorValidationVideo: (exitDoorValidationVideo) =>
    set(() => ({ exitDoorValidationVideo })),

  setExitDoorCheckComment: (exitDoorCheckComment) =>
    set(() => ({ exitDoorCheckComment })),

  setExitDoorCheckStatus: (exitDoorCheckStatus) =>
    set(() => ({ exitDoorCheckStatus })),

  setExitEngineryCheckVideo: (exitEngineryCheckVideo) =>
    set(() => ({ exitEngineryCheckVideo })),

  setExitEngineryCheckB64Video: (exitEngineryCheckB64Video) =>
    set(() => ({ exitEngineryCheckB64Video })),

  setExitEngineryValidationVideo: (exitEngineryValidationVideo) =>
    set(() => ({ exitEngineryValidationVideo })),

  setExitEngineryCheckComment: (exitEngineryCheckComment) =>
    set(() => ({ exitEngineryCheckComment })),

  setExitEngineryCheckStatus: (exitEngineryCheckStatus) =>
    set(() => ({ exitEngineryCheckStatus })),

  // ============================================
  // SETTERS DE CARGA
  // ============================================

  setChargingProcessPhoto1: (chargingProcessPhoto1) =>
    set(() => ({ chargingProcessPhoto1 })),

  setChargingProcessComment1: (chargingProcessComment1) =>
    set(() => ({ chargingProcessComment1 })),

  setChargingProcessPhoto2: (chargingProcessPhoto2) =>
    set(() => ({ chargingProcessPhoto2 })),

  setChargingProcessComment2: (chargingProcessComment2) =>
    set(() => ({ chargingProcessComment2 })),

  setChargingProcessVideo: async (file) => {
    if (!file) {
      set(() => ({ chargingProcessVideo: "" }));
      return;
    }
    set(() => ({ chargingProcessVideo: file as string }));
  },

  // ============================================
  // SETTERS DE CONTENEDOR
  // ============================================

  setContainerPanoramicPhoto: (containerPanoramicPhoto) =>
    set(() => ({ containerPanoramicPhoto })),

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

  setNavieraWirePhoto: (navieraWirePhoto) => set(() => ({ navieraWirePhoto })),

  setNavieraWireComment: (navieraWireComment) =>
    set(() => ({ navieraWireComment })),

  setNavieraLabelPhoto: (navieraLabelPhoto) =>
    set(() => ({ navieraLabelPhoto })),

  setNavieraLabelComment: (navieraLabelComment) =>
    set(() => ({ navieraLabelComment })),

  // ============================================
  // SETTERS DE EXPORTADOR
  // ============================================

  setExporterBottlePhoto: (exporterBottlePhoto) =>
    set(() => ({ exporterBottlePhoto })),

  setExporterBottleComment: (exporterBottleComment) =>
    set(() => ({ exporterBottleComment })),

  setExporterWirePhoto: (exporterWirePhoto) =>
    set(() => ({ exporterWirePhoto })),

  setExporterWireComment: (exporterWireComment) =>
    set(() => ({ exporterWireComment })),

  setExporterLabelPhoto: (exporterLabelPhoto) =>
    set(() => ({ exporterLabelPhoto })),

  setExporterLabelComment: (exporterLabelComment) =>
    set(() => ({ exporterLabelComment })),

  // ============================================
  // SETTERS DE OTRO
  // ============================================

  setOtherBottlePhoto: (otherBottlePhoto) => set(() => ({ otherBottlePhoto })),

  setOtherBottleComment: (otherBottleComment) =>
    set(() => ({ otherBottleComment })),

  setOtherWirePhoto: (otherWirePhoto) => set(() => ({ otherWirePhoto })),

  setOtherWireComment: (otherWireComment) => set(() => ({ otherWireComment })),

  setOtherLabelPhoto: (otherLabelPhoto) => set(() => ({ otherLabelPhoto })),

  setOtherLabelComment: (otherLabelComment) =>
    set(() => ({ otherLabelComment })),

  // ============================================
  // SETTERS DE GPS
  // ============================================

  setGpsPhoto: (gpsPhoto) => set(() => ({ gpsPhoto })),

  setGpsComment: (gpsComment) => set(() => ({ gpsComment })),

  setGpsStampPhoto: (gpsStampPhoto) => set(() => ({ gpsStampPhoto })),

  setGpsStampComment: (gpsStampComment) => set(() => ({ gpsStampComment })),

  // ============================================
  // SETTERS DE VIDEOS SALIDA
  // ============================================

  setExitDoorVideo: async (file) => {
    if (!file) {
      set(() => ({ exitDoorVideo: "" }));
      return;
    }
    set(() => ({ exitDoorVideo: file as string }));
  },

  setExitEngineryVideo: async (file) => {
    if (!file) {
      set(() => ({ exitEngineryVideo: "" }));
      return;
    }
    set(() => ({ exitEngineryVideo: file as string }));
  },

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

  setClient: (client) => set(() => ({ client })),

  setClientId: (clientId) => set(() => ({ clientId })),

  setClientIdentification: (clientIdentification) =>
    set(() => ({ clientIdentification })),

  setLabelSerial: (labelSerial) => set(() => ({ labelSerial })),

  setPlateVehicle: (plateVehicle) => set(() => ({ plateVehicle })),

  setDriverName: (driverName) => set(() => ({ driverName })),

  setDriverIdentification: (driverIdentification) =>
    set(() => ({ driverIdentification })),

  setImages: (images) => set(() => ({ images })),

  getOneImage: (uuid) => {
    const items_ = get().images;
    return items_.find((el) => el.uuid === uuid)!;
  },

  addImage: (type: any) => {
    const newId = uuidv4();
    console.log(newId);
    set((state) => ({
      images: [
        ...state.images,
        {
          id: null,
          src: "",
          comment: "",
          uuid: newId,
          model: "container-two",
          type,
          order: state.images.length + 1,
        },
      ],
    }));
  },

  addImageDelete: (id) => {
    const itemsDelete_ = get().imagesDelete || [];
    if (!itemsDelete_.includes(id)) {
      set(() => ({ imagesDelete: [...itemsDelete_, id] }));
    }
  },

  removeImage: async (uuid) => {
    const items_ = get().images;
    const itemsDelete_ = get().imagesDelete || [];
    const fill = items_.find((el) => el.uuid === uuid);
    const arrnew = items_.filter((el) => el.uuid !== uuid);

    // Eliminar archivo físico si existe
    if (fill && fill.src) {
      try {
        const photoPath = `${PHOTOS_DIR}${fill.src}`;
        const fileToDelete = new File(photoPath);
        if (fileToDelete.exists) {
          await fileToDelete.delete();
        }
      } catch (error) {
        console.error("Error eliminando imagen dinámica:", error);
      }
    }

    // Agregar a la lista de eliminados si tiene ID
    if (fill?.id && !itemsDelete_.includes(fill.id)) {
      itemsDelete_.push(fill.id);
    }

    set(() => ({
      images: arrnew,
      imagesDelete: itemsDelete_,
    }));
  },

  updateImage: async (uuid, field, value) => {
    set((state) => {
      const items_ = state.images;
      const arrnew: WorkflowImageI[] = [];

      for (const x of items_) {
        if (x.uuid === uuid) {
          const obj = {
            ...x,
            [field]: value,
          };
          arrnew.push(obj);
        } else {
          arrnew.push(x);
        }
      }
      return {
        images: arrnew,
      };
    });
  },

  getOnlyPhotos: () => ({
    emptyPanoramicCheckPhoto: get().emptyPanoramicCheckPhoto,
    emptyPanoramicValidationPhoto: get().emptyPanoramicValidationPhoto,
    emptyStampNavieraCheckPhoto: get().emptyStampNavieraCheckPhoto,
    emptyStampNavieraValidationPhoto: get().emptyStampNavieraValidationPhoto,
    emptyOtherStampCheckPhoto: get().emptyOtherStampCheckPhoto,
    emptyOtherStampValidationPhoto: get().emptyOtherStampValidationPhoto,
    emptySatelliteLockCheckPhoto: get().emptySatelliteLockCheckPhoto,
    emptySatelliteLockValidationPhoto: get().emptySatelliteLockValidationPhoto,
    exitEngineryCheckPhoto1: get().exitEngineryCheckPhoto1,
    exitEngineryValidationPhoto1: get().exitEngineryValidationPhoto1,
    exitEngineryCheckPhoto2: get().exitEngineryCheckPhoto2,
    exitEngineryValidationPhoto2: get().exitEngineryValidationPhoto2,
    chargingProcessPhoto1: get().chargingProcessPhoto1,
    chargingProcessPhoto2: get().chargingProcessPhoto2,
    containerPanoramicPhoto: get().containerPanoramicPhoto,
    navieraBottlePhoto: get().navieraBottlePhoto,
    navieraWirePhoto: get().navieraWirePhoto,
    navieraLabelPhoto: get().navieraLabelPhoto,
    exporterBottlePhoto: get().exporterBottlePhoto,
    exporterWirePhoto: get().exporterWirePhoto,
    exporterLabelPhoto: get().exporterLabelPhoto,
    otherBottlePhoto: get().otherBottlePhoto,
    otherWirePhoto: get().otherWirePhoto,
    otherLabelPhoto: get().otherLabelPhoto,
    gpsPhoto: get().gpsPhoto,
    gpsStampPhoto: get().gpsStampPhoto,
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
    images: get().images,
    imagesDelete: get().imagesDelete,
    hourInit: get().hourInit,
    hourEnd: get().hourEnd,
    startProcess: get().startProcess,
    endProcess: get().endProcess,
    address: get().address,
    city: get().city,
    typeReview: get().typeReview,
    storageName: get().storageName,
    // Validación
    emptyPanoramicCheckPhoto: get().emptyPanoramicCheckPhoto,
    emptyPanoramicCheckB64Photo: get().emptyPanoramicCheckB64Photo,
    emptyPanoramicValidationPhoto: get().emptyPanoramicValidationPhoto,
    emptyPanoramicCheckStatus: get().emptyPanoramicCheckStatus,
    emptyPanoramicCheckComment: get().emptyPanoramicCheckComment,
    emptyStampNavieraCheckPhoto: get().emptyStampNavieraCheckPhoto,
    emptyStampNavieraCheckB64Photo: get().emptyStampNavieraCheckB64Photo,
    emptyStampNavieraValidationPhoto: get().emptyStampNavieraValidationPhoto,
    emptyStampNavieraCheckComment: get().emptyStampNavieraCheckComment,
    emptyStampNavieraCheckStatus: get().emptyStampNavieraCheckStatus,
    emptyOtherStampCheckPhoto: get().emptyOtherStampCheckPhoto,
    emptyOtherStampCheckB64Photo: get().emptyOtherStampCheckB64Photo,
    emptyOtherStampValidationPhoto: get().emptyOtherStampValidationPhoto,
    emptyOtherStampCheckComment: get().emptyOtherStampCheckComment,
    emptyOtherStampCheckStatus: get().emptyOtherStampCheckStatus,
    emptySatelliteLockCheckPhoto: get().emptySatelliteLockCheckPhoto,
    emptySatelliteLockCheckB64Photo: get().emptySatelliteLockCheckB64Photo,
    emptySatelliteLockValidationPhoto: get().emptySatelliteLockValidationPhoto,
    emptySatelliteLockCheckComment: get().emptySatelliteLockCheckComment,
    emptySatelliteLockCheckStatus: get().emptySatelliteLockCheckStatus,
    exitEngineryCheckPhoto1: get().exitEngineryCheckPhoto1,
    exitEngineryCheckB64Photo1: get().exitEngineryCheckB64Photo1,
    exitEngineryValidationPhoto1: get().exitEngineryValidationPhoto1,
    exitEngineryCheckComment1: get().exitEngineryCheckComment1,
    exitEngineryCheckStatus1: get().exitEngineryCheckStatus1,
    exitEngineryCheckPhoto2: get().exitEngineryCheckPhoto2,
    exitEngineryCheckB64Photo2: get().exitEngineryCheckB64Photo2,
    exitEngineryValidationPhoto2: get().exitEngineryValidationPhoto2,
    exitEngineryCheckComment2: get().exitEngineryCheckComment2,
    exitEngineryCheckStatus2: get().exitEngineryCheckStatus2,
    exitDoorCheckVideo: get().exitDoorCheckVideo,
    exitDoorCheckB64Video: get().exitDoorCheckB64Video,
    exitDoorValidationVideo: get().exitDoorValidationVideo,
    exitDoorCheckComment: get().exitDoorCheckComment,
    exitDoorCheckStatus: get().exitDoorCheckStatus,
    exitEngineryCheckVideo: get().exitEngineryCheckVideo,
    exitEngineryCheckB64Video: get().exitEngineryCheckB64Video,
    exitEngineryValidationVideo: get().exitEngineryValidationVideo,
    exitEngineryCheckComment: get().exitEngineryCheckComment,
    exitEngineryCheckStatus: get().exitEngineryCheckStatus,
    // Carga
    chargingProcessPhoto1: get().chargingProcessPhoto1,
    chargingProcessComment1: get().chargingProcessComment1,
    chargingProcessPhoto2: get().chargingProcessPhoto2,
    chargingProcessComment2: get().chargingProcessComment2,
    chargingProcessVideo: get().chargingProcessVideo,
    // Contenedor
    containerPanoramicPhoto: get().containerPanoramicPhoto,
    containerPanoramicComment: get().containerPanoramicComment,
    containerPanoramicCoordinates: get().containerPanoramicCoordinates,
    // Naviera
    navieraBottlePhoto: get().navieraBottlePhoto,
    navieraBottleComment: get().navieraBottleComment,
    navieraWirePhoto: get().navieraWirePhoto,
    navieraWireComment: get().navieraWireComment,
    navieraLabelPhoto: get().navieraLabelPhoto,
    navieraLabelComment: get().navieraLabelComment,
    // Exportador
    exporterBottlePhoto: get().exporterBottlePhoto,
    exporterBottleComment: get().exporterBottleComment,
    exporterWirePhoto: get().exporterWirePhoto,
    exporterWireComment: get().exporterWireComment,
    exporterLabelPhoto: get().exporterLabelPhoto,
    exporterLabelComment: get().exporterLabelComment,
    // Otro
    otherBottlePhoto: get().otherBottlePhoto,
    otherBottleComment: get().otherBottleComment,
    otherWirePhoto: get().otherWirePhoto,
    otherWireComment: get().otherWireComment,
    otherLabelPhoto: get().otherLabelPhoto,
    otherLabelComment: get().otherLabelComment,
    // GPS
    gpsPhoto: get().gpsPhoto,
    gpsComment: get().gpsComment,
    gpsStampPhoto: get().gpsStampPhoto,
    gpsStampComment: get().gpsStampComment,
    // Videos
    exitDoorVideo: get().exitDoorVideo,
    exitEngineryVideo: get().exitEngineryVideo,
  }),

  setValues: (ladata) => {
    set(ladata);
    set(() => ({ imagesDelete: [] }));
  },

  // ============================================
  // LIMPIEZA TOTAL
  // ============================================
  onClear: async () => {
    const state = get();

    // Lista de todos los campos de fotos
    const photoKeys = [
      state.emptyPanoramicCheckPhoto,
      state.emptyPanoramicValidationPhoto,
      state.emptyStampNavieraCheckPhoto,
      state.emptyStampNavieraValidationPhoto,
      state.emptyOtherStampCheckPhoto,
      state.emptyOtherStampValidationPhoto,
      state.emptySatelliteLockCheckPhoto,
      state.emptySatelliteLockValidationPhoto,
      state.exitEngineryCheckPhoto1,
      state.exitEngineryValidationPhoto1,
      state.exitEngineryCheckPhoto2,
      state.exitEngineryValidationPhoto2,
      state.chargingProcessPhoto1,
      state.chargingProcessPhoto2,
      state.containerPanoramicPhoto,
      state.navieraBottlePhoto,
      state.navieraWirePhoto,
      state.navieraLabelPhoto,
      state.exporterBottlePhoto,
      state.exporterWirePhoto,
      state.exporterLabelPhoto,
      state.otherBottlePhoto,
      state.otherWirePhoto,
      state.otherLabelPhoto,
      state.gpsPhoto,
      state.gpsStampPhoto,
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
      state.chargingProcessVideo,
      state.exitDoorVideo,
      state.exitEngineryVideo,
      state.exitDoorCheckVideo,
      state.exitDoorValidationVideo,
      state.exitEngineryCheckVideo,
      state.exitEngineryValidationVideo,
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

    // Eliminar imágenes dinámicas
    const images_ = get().images;
    for (const img of images_) {
      if (img.src) {
        try {
          const photoPath = `${PHOTOS_DIR}${img.src}`;
          const fileToDelete = new File(photoPath);
          if (fileToDelete.exists) {
            await fileToDelete.delete();
          }
        } catch (error) {
          console.error("Error eliminando imagen dinámica:", error);
        }
      }
    }

    // Resetear todo el estado
    set(() => ({
      ...initialWorkflowStateTwo,
    }));
  },
});