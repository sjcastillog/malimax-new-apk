import { initialWorkflowStateOne, PHOTOS_DIR } from "@/common/constants";
import {
  WorkflowContainerOneActionI,
  WorkflowContainerOneI,
  WorkflowImageI,
} from "@/core/container-one/interfaces";
import { File } from "expo-file-system";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { StateCreator } from "zustand";

export const createWorkflowContainerOneSlice: StateCreator<
  WorkflowContainerOneI & WorkflowContainerOneActionI,
  [],
  []
> = (set, get) => ({
  ...initialWorkflowStateOne,

  // ============================================
  // MÉTODO GENÉRICO PARA TODAS LAS FOTOS
  // ============================================
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

      // Lógica especial: Si es la foto panorámica, guardar coordenadas
      if (field === "emptyPanoramicPhoto") {
        const coordinates = get().coordinates;
        set({ emptyPanoramicCoordinates: coordinates });
      }

      return;
    } catch (error) {
      console.error("❌ Error en setPhoto:", error);
      throw error;
    }
  },

  // ============================================
  // MÉTODOS GENERALES
  // ============================================
  getImages: () => get().images,

  setCoordinates: (coordinates) => {
    set(() => ({ coordinates }));
  },

  setObservation: (observation) => {
    set(() => ({ observation }));
  },

  setEmptyPanoramicCoordinates: (emptyPanoramicCoordinates) => {
    set(() => ({ emptyPanoramicCoordinates }));
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
  // NUEVOS SETTERS DE LA WEB
  // ============================================
  setTypeService: (typeService) => {
    set(() => ({ typeService }));
  },

  setDate: (date) => {
    set(() => ({ date }));
  },

  setCan: (can) => {
    set(() => ({ can }));
  },

  setLeader: (leader) => {
    set(() => ({ leader }));
  },

  setExporterSupervisor: (exporterSupervisor) => {
    set(() => ({ exporterSupervisor }));
  },

  setExporterSupervisorIdentification: (exporterSupervisorIdentification) => {
    set(() => ({ exporterSupervisorIdentification }));
  },

  setAssociated: (associated) => {
    set(() => ({ associated }));
  },

  setAssociatedIdentification: (associatedIdentification) => {
    set(() => ({ associatedIdentification }));
  },

  setOthers: (others) => {
    set(() => ({ others }));
  },

  setOthersIdentification: (othersIdentification) => {
    set(() => ({ othersIdentification }));
  },

  setWorkplace: (workplace) => {
    set(() => ({ workplace }));
  },

  // RENOMBRADO: openedWas/openedBy → inspectedWas/inspectedBy
  setInspectedBy: (inspectedBy) => {
    set(() => ({ inspectedBy }));
  },

  setInspectedWas: (inspectedWas) => {
    set(() => ({ inspectedWas }));
  },

  // ============================================
  // SETTERS DE COMENTARIOS (FOTOS EXISTENTES)
  // ============================================
  setEmptyPanoramicComment: (emptyPanoramicComment) => {
    set(() => ({ emptyPanoramicComment }));
  },

  setEmptyStampNavieraComment: (emptyStampNavieraComment) =>
    set(() => ({ emptyStampNavieraComment })),

  setEmptyOtherStampComment: (emptyOtherStampComment) =>
    set(() => ({ emptyOtherStampComment })),

  setEmptyAditionalStampComment: (emptyAditionalStampComment) =>
    set(() => ({ emptyAditionalStampComment })),

  setEmptySatelliteLockStampComment: (emptySatelliteLockStampComment) =>
    set(() => ({ emptySatelliteLockStampComment })),

  setEmptySatelliteLockComment: (emptySatelliteLockComment) =>
    set(() => ({ emptySatelliteLockComment })),

  setEmptyFloorComment: (emptyFloorComment) =>
    set(() => ({ emptyFloorComment })),

  setEmptyRoofComment: (emptyRoofComment) => set(() => ({ emptyRoofComment })),

  setEmptyMirrorCoverComment: (emptyMirrorCoverComment) =>
    set(() => ({ emptyMirrorCoverComment })),

  setEmptyInternalComment1: (emptyInternalComment1) =>
    set(() => ({ emptyInternalComment1 })),

  setEmptyInternalComment2: (emptyInternalComment2) =>
    set(() => ({ emptyInternalComment2 })),

  setEmptyInternalComment3: (emptyInternalComment3) =>
    set(() => ({ emptyInternalComment3 })),

  setEmptyInternalComment4: (emptyInternalComment4) =>
    set(() => ({ emptyInternalComment4 })),

  setEmptyInternalComment5: (emptyInternalComment5) =>
    set(() => ({ emptyInternalComment5 })),

  setEmptyInternalComment6: (emptyInternalComment6) =>
    set(() => ({ emptyInternalComment6 })),

  setExitOtherStampComment: (exitOtherStampComment) =>
    set(() => ({ exitOtherStampComment })),

  setExitSatelliteLockStampComment: (exitSatelliteLockStampComment) =>
    set(() => ({ exitSatelliteLockStampComment })),

  setExitPanoramicComment: (exitPanoramicComment) =>
    set(() => ({ exitPanoramicComment })),

  setExitStampNavieraComment: (exitStampNavieraComment) =>
    set(() => ({ exitStampNavieraComment })),

  setExitEngineryComment1: (exitEngineryComment1) =>
    set(() => ({ exitEngineryComment1 })),

  setExitEngineryComment2: (exitEngineryComment2) =>
    set(() => ({ exitEngineryComment2 })),

  // ============================================
  // NUEVOS SETTERS DE COMENTARIOS (MAQUINARIA Y SELLADO TEMPORAL)
  // ============================================
  setEngineryComment1: (engineryComment1) => set(() => ({ engineryComment1 })),

  setEngineryComment2: (engineryComment2) => set(() => ({ engineryComment2 })),

  setExitTemporarySealingComment: (exitTemporarySealingComment) =>
    set(() => ({ exitTemporarySealingComment })),

  // ============================================
  // SETTERS DE VIDEOS
  // ============================================
  setEmptyInternalVideo: async (file) => {
    if (!file) {
      set(() => ({ emptyInternalVideo: "" }));
      return;
    }
    set(() => ({ emptyInternalVideo: file as string }));
  },

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
  // SETTERS BÁSICOS
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

  // ============================================
  // MANEJO DE IMÁGENES DINÁMICAS
  // ============================================
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
          model: "container-empty",
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

  // ============================================
  // MÉTODO HELPER: getOnlyPhotos
  // ============================================
  getOnlyPhotos: () => ({
    // FOTOS EXTERNAS
    emptyAditionalStampPhoto: get().emptyAditionalStampPhoto,
    emptyPanoramicPhoto: get().emptyPanoramicPhoto,
    emptyStampNavieraPhoto: get().emptyStampNavieraPhoto,
    emptyOtherStampPhoto: get().emptyOtherStampPhoto,
    emptySatelliteLockStampPhoto: get().emptySatelliteLockStampPhoto,
    emptySatelliteLockPhoto: get().emptySatelliteLockPhoto,
    emptySideRightPhoto: get().emptySideRightPhoto,
    emptySideLeftPhoto: get().emptySideLeftPhoto,
    emptySideUpPhoto: get().emptySideUpPhoto,
    emptySideDownPhoto: get().emptySideDownPhoto,
    emptyFrontPhoto: get().emptyFrontPhoto,
    emptyRearPhoto: get().emptyRearPhoto,
    emptyEirPhoto: get().emptyEirPhoto,
    emptyPreviousInspectionDocumentPhoto:
      get().emptyPreviousInspectionDocumentPhoto,
    emptyPlatePhoto: get().emptyPlatePhoto,
    emptyDriverIdentificationPhoto: get().emptyDriverIdentificationPhoto,

    // FOTOS INTERNAS
    emptyFloorPhoto: get().emptyFloorPhoto,
    emptyRoofPhoto: get().emptyRoofPhoto,
    emptyMirrorCoverPhoto: get().emptyMirrorCoverPhoto,
    emptyInternalPhoto1: get().emptyInternalPhoto1,
    emptyInternalPhoto2: get().emptyInternalPhoto2,
    emptyInternalPhoto3: get().emptyInternalPhoto3,
    emptyInternalPhoto4: get().emptyInternalPhoto4,
    emptyInternalPhoto5: get().emptyInternalPhoto5,
    emptyInternalPhoto6: get().emptyInternalPhoto6,

    // NUEVAS FOTOS DE MAQUINARIA ✨
    engineryPhoto1: get().engineryPhoto1,
    engineryPhoto2: get().engineryPhoto2,

    // FOTOS SALIDA
    exitOtherStampPhoto: get().exitOtherStampPhoto,
    exitPanoramicPhoto: get().exitPanoramicPhoto,
    exitStampNavieraPhoto: get().exitStampNavieraPhoto,
    exitSatelliteLockStampPhoto: get().exitSatelliteLockStampPhoto,
    exitEngineryPhoto1: get().exitEngineryPhoto1,
    exitEngineryPhoto2: get().exitEngineryPhoto2,

    // NUEVA FOTO DE SELLADO TEMPORAL ✨
    exitTemporarySealingPhoto: get().exitTemporarySealingPhoto,
  }),

  // ============================================
  // MÉTODO HELPER: getValues
  // ============================================
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

    // NUEVOS CAMPOS ✨
    typeService: get().typeService,
    date: get().date,
    can: get().can,
    leader: get().leader,
    exporterSupervisor: get().exporterSupervisor,
    exporterSupervisorIdentification: get().exporterSupervisorIdentification,
    associated: get().associated,
    associatedIdentification: get().associatedIdentification,
    others: get().others,
    othersIdentification: get().othersIdentification,
    workplace: get().workplace,

    // RENOMBRADO ✨
    inspectedBy: get().inspectedBy,
    inspectedWas: get().inspectedWas,

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

    // FOTOS Y COMENTARIOS (EXISTENTES)
    emptyAditionalStampPhoto: get().emptyAditionalStampPhoto,
    emptyAditionalStampComment: get().emptyAditionalStampComment,
    emptyPanoramicPhoto: get().emptyPanoramicPhoto,
    emptyPanoramicComment: get().emptyPanoramicComment,
    emptyPanoramicCoordinates: get().emptyPanoramicCoordinates,
    emptyStampNavieraPhoto: get().emptyStampNavieraPhoto,
    emptyStampNavieraComment: get().emptyStampNavieraComment,
    emptyOtherStampPhoto: get().emptyOtherStampPhoto,
    emptyOtherStampComment: get().emptyOtherStampComment,
    emptySatelliteLockStampPhoto: get().emptySatelliteLockStampPhoto,
    emptySatelliteLockStampComment: get().emptySatelliteLockStampComment,
    emptySatelliteLockPhoto: get().emptySatelliteLockPhoto,
    emptySatelliteLockComment: get().emptySatelliteLockComment,
    emptySideRightPhoto: get().emptySideRightPhoto,
    emptySideLeftPhoto: get().emptySideLeftPhoto,
    emptySideUpPhoto: get().emptySideUpPhoto,
    emptySideDownPhoto: get().emptySideDownPhoto,
    emptyFrontPhoto: get().emptyFrontPhoto,
    emptyRearPhoto: get().emptyRearPhoto,
    emptyEirPhoto: get().emptyEirPhoto,
    emptyPreviousInspectionDocumentPhoto:
      get().emptyPreviousInspectionDocumentPhoto,
    emptyPlatePhoto: get().emptyPlatePhoto,
    emptyDriverIdentificationPhoto: get().emptyDriverIdentificationPhoto,
    emptyFloorPhoto: get().emptyFloorPhoto,
    emptyRoofPhoto: get().emptyRoofPhoto,
    emptyMirrorCoverPhoto: get().emptyMirrorCoverPhoto,
    emptyInternalPhoto1: get().emptyInternalPhoto1,
    emptyInternalPhoto2: get().emptyInternalPhoto2,
    emptyInternalPhoto3: get().emptyInternalPhoto3,
    emptyInternalPhoto4: get().emptyInternalPhoto4,
    emptyInternalPhoto5: get().emptyInternalPhoto5,
    emptyInternalPhoto6: get().emptyInternalPhoto6,
    emptyFloorComment: get().emptyFloorComment,
    emptyRoofComment: get().emptyRoofComment,
    emptyMirrorCoverComment: get().emptyMirrorCoverComment,
    emptyInternalComment1: get().emptyInternalComment1,
    emptyInternalComment2: get().emptyInternalComment2,
    emptyInternalComment3: get().emptyInternalComment3,
    emptyInternalComment4: get().emptyInternalComment4,
    emptyInternalComment5: get().emptyInternalComment5,
    emptyInternalComment6: get().emptyInternalComment6,
    emptyInternalVideo: get().emptyInternalVideo,

    // NUEVAS FOTOS Y COMENTARIOS DE MAQUINARIA ✨
    engineryPhoto1: get().engineryPhoto1,
    engineryComment1: get().engineryComment1,
    engineryPhoto2: get().engineryPhoto2,
    engineryComment2: get().engineryComment2,

    exitOtherStampPhoto: get().exitOtherStampPhoto,
    exitPanoramicPhoto: get().exitPanoramicPhoto,
    exitStampNavieraPhoto: get().exitStampNavieraPhoto,
    exitSatelliteLockStampPhoto: get().exitSatelliteLockStampPhoto,
    exitEngineryPhoto1: get().exitEngineryPhoto1,
    exitEngineryPhoto2: get().exitEngineryPhoto2,
    exitOtherStampComment: get().exitOtherStampComment,
    exitSatelliteLockStampComment: get().exitSatelliteLockStampComment,
    exitPanoramicComment: get().exitPanoramicComment,
    exitStampNavieraComment: get().exitStampNavieraComment,
    exitEngineryComment1: get().exitEngineryComment1,
    exitEngineryComment2: get().exitEngineryComment2,
    exitDoorVideo: get().exitDoorVideo,
    exitEngineryVideo: get().exitEngineryVideo,

    // NUEVA FOTO Y COMENTARIO DE SELLADO TEMPORAL ✨
    exitTemporarySealingPhoto: get().exitTemporarySealingPhoto,
    exitTemporarySealingComment: get().exitTemporarySealingComment,
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

    // Lista de todos los campos de fotos (ACTUALIZADA CON NUEVAS FOTOS ✨)
    const photoKeys = [
      state.emptyAditionalStampPhoto,
      state.emptyPanoramicPhoto,
      state.emptyStampNavieraPhoto,
      state.emptyOtherStampPhoto,
      state.emptySatelliteLockStampPhoto,
      state.emptySatelliteLockPhoto,
      state.emptySideRightPhoto,
      state.emptySideLeftPhoto,
      state.emptySideUpPhoto,
      state.emptySideDownPhoto,
      state.emptyFrontPhoto,
      state.emptyRearPhoto,
      state.emptyEirPhoto,
      state.emptyPreviousInspectionDocumentPhoto,
      state.emptyPlatePhoto,
      state.emptyDriverIdentificationPhoto,
      state.emptyFloorPhoto,
      state.emptyRoofPhoto,
      state.emptyMirrorCoverPhoto,
      state.emptyInternalPhoto1,
      state.emptyInternalPhoto2,
      state.emptyInternalPhoto3,
      state.emptyInternalPhoto4,
      state.emptyInternalPhoto5,
      state.emptyInternalPhoto6,
      state.engineryPhoto1, // ✨ NUEVO
      state.engineryPhoto2, // ✨ NUEVO
      state.exitOtherStampPhoto,
      state.exitPanoramicPhoto,
      state.exitStampNavieraPhoto,
      state.exitSatelliteLockStampPhoto,
      state.exitEngineryPhoto1,
      state.exitEngineryPhoto2,
      state.exitTemporarySealingPhoto, // ✨ NUEVO
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
      ...initialWorkflowStateOne,
    }));
  },
});
