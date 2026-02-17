import {
  initialWorkflowStateThree,
  photoKeysThree,
  PHOTOS_DIR,
} from "@/common/constants";
import {
  WorkflowContainerThreeActionI,
  WorkflowContainerThreeI,
  WorkflowImageI,
} from "@/core/container-three/interfaces";
import { File } from "expo-file-system";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { StateCreator } from "zustand";

export const createWorkflowContainerThreeSlice: StateCreator<
  WorkflowContainerThreeI & WorkflowContainerThreeActionI,
  [],
  []
> = (set, get) => ({
  ...initialWorkflowStateThree,

  // ============================================
  // SETTERS BÁSICOS
  // ============================================
  setId: (id) => set(() => ({ id })),

  setContainer: (container) => {
    const elContainer = get().container;
    if (elContainer === "" || elContainer === null) {
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

  // ============================================
  // SETTERS DEL PROCESO 3
  // ============================================
  setEntryPort: (entryPort) =>
    set(() => ({ entryPort: entryPort?.toUpperCase() })),

  // ============================================
  // SETTERS GENERALES
  // ============================================
  setCoordinates: (coordinates) => set(() => ({ coordinates })),

  setObservation: (observation) => set(() => ({ observation })),

  setHourInit: (hourInit) => set(() => ({ hourInit })),

  setHourEnd: (hourEnd) => set(() => ({ hourEnd })),

  // ============================================
  // SETTERS DE FOTOS ESTÁTICAS - PANORÁMICO
  // ============================================
  setContainerPanoramicPhoto: (photo) =>
    set(() => ({ containerPanoramicPhoto: photo })),

  setContainerPanoramicComment: (comment) =>
    set(() => ({ containerPanoramicComment: comment })),

  setContainerPanoramicCoordinates: (coordinates) =>
    set(() => ({ containerPanoramicCoordinates: coordinates })),

  // ============================================
  // SETTERS DE FOTOS ESTÁTICAS - NAVIERA
  // ============================================
  setNavieraBottlePhoto: (photo) => set(() => ({ navieraBottlePhoto: photo })),

  setNavieraBottleComment: (comment) =>
    set(() => ({ navieraBottleComment: comment })),

  setNavieraWirePhoto: (photo) => set(() => ({ navieraWirePhoto: photo })),

  setNavieraWireComment: (comment) =>
    set(() => ({ navieraWireComment: comment })),

  setNavieraLabelPhoto: (photo) => set(() => ({ navieraLabelPhoto: photo })),

  setNavieraLabelComment: (comment) =>
    set(() => ({ navieraLabelComment: comment })),

  // ============================================
  // SETTERS DE FOTOS ESTÁTICAS - EXPORTADOR
  // ============================================
  setExporterBottlePhoto: (photo) =>
    set(() => ({ exporterBottlePhoto: photo })),

  setExporterBottleComment: (comment) =>
    set(() => ({ exporterBottleComment: comment })),

  setExporterWirePhoto: (photo) => set(() => ({ exporterWirePhoto: photo })),

  setExporterWireComment: (comment) =>
    set(() => ({ exporterWireComment: comment })),

  setExporterLabelPhoto: (photo) => set(() => ({ exporterLabelPhoto: photo })),

  setExporterLabelComment: (comment) =>
    set(() => ({ exporterLabelComment: comment })),

  // ============================================
  // SETTERS DE FOTOS ESTÁTICAS - OTRO
  // ============================================
  setOtherBottlePhoto: (photo) => set(() => ({ otherBottlePhoto: photo })),

  setOtherBottleComment: (comment) =>
    set(() => ({ otherBottleComment: comment })),

  setOtherWirePhoto: (photo) => set(() => ({ otherWirePhoto: photo })),

  setOtherWireComment: (comment) => set(() => ({ otherWireComment: comment })),

  setOtherLabelPhoto: (photo) => set(() => ({ otherLabelPhoto: photo })),

  setOtherLabelComment: (comment) =>
    set(() => ({ otherLabelComment: comment })),

  // ============================================
  // SETTERS DE FOTOS ESTÁTICAS - GPS
  // ============================================
  setGpsPhoto: (photo) => set(() => ({ gpsPhoto: photo })),

  setGpsComment: (comment) => set(() => ({ gpsComment: comment })),

  setGpsStampPhoto: (photo) => set(() => ({ gpsStampPhoto: photo })),

  setGpsStampComment: (comment) => set(() => ({ gpsStampComment: comment })),

  // ============================================
  // MANEJO DE IMÁGENES DINÁMICAS
  // ============================================
  getImages: () => get().images,

  setImages: (images) => set(() => ({ images })),

  getOneImage: (uuid) => {
    const items_ = get().images;
    return items_.find((el) => el.uuid === uuid)!;
  },

  addImage: (type: string) => {
    const newId = uuidv4();
    set((state) => ({
      images: [
        ...state.images,
        {
          id: null,
          src: "",
          comment: "",
          uuid: newId,
          model: "container-exit",
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
  // GETTERS
  // ============================================
  getOnlyPhotos: () => {
    const state = get();
    const photos: { [key: string]: string } = {};

    // Recoger todas las fotos estáticas
    for (const key of photoKeysThree) {
      const photoValue = state[key as keyof WorkflowContainerThreeI];
      if (photoValue && typeof photoValue === "string") {
        photos[key] = photoValue;
      }
    }

    return photos;
  },

  getValues: () => ({
    id: get().id,
    container: get().container,
    client: get().client,
    clientId: get().clientId,
    clientIdentification: get().clientIdentification,
    entryPort: get().entryPort,
    coordinates: get().coordinates,
    observation: get().observation,
    hourInit: get().hourInit,
    hourEnd: get().hourEnd,

    // FOTOS PANORÁMICO
    containerPanoramicPhoto: get().containerPanoramicPhoto,
    containerPanoramicComment: get().containerPanoramicComment,
    containerPanoramicCoordinates: get().containerPanoramicCoordinates,

    // FOTOS NAVIERA
    navieraBottlePhoto: get().navieraBottlePhoto,
    navieraBottleComment: get().navieraBottleComment,
    navieraWirePhoto: get().navieraWirePhoto,
    navieraWireComment: get().navieraWireComment,
    navieraLabelPhoto: get().navieraLabelPhoto,
    navieraLabelComment: get().navieraLabelComment,

    // FOTOS EXPORTADOR
    exporterBottlePhoto: get().exporterBottlePhoto,
    exporterBottleComment: get().exporterBottleComment,
    exporterWirePhoto: get().exporterWirePhoto,
    exporterWireComment: get().exporterWireComment,
    exporterLabelPhoto: get().exporterLabelPhoto,
    exporterLabelComment: get().exporterLabelComment,

    // FOTOS OTRO
    otherBottlePhoto: get().otherBottlePhoto,
    otherBottleComment: get().otherBottleComment,
    otherWirePhoto: get().otherWirePhoto,
    otherWireComment: get().otherWireComment,
    otherLabelPhoto: get().otherLabelPhoto,
    otherLabelComment: get().otherLabelComment,

    // FOTOS GPS
    gpsPhoto: get().gpsPhoto,
    gpsComment: get().gpsComment,
    gpsStampPhoto: get().gpsStampPhoto,
    gpsStampComment: get().gpsStampComment,

    // IMÁGENES DINÁMICAS
    images: get().images,
    imagesDelete: get().imagesDelete,

    timeStampSave: get().timeStampSave,
    hourSaveUser: get().hourSaveUser,
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

    // Eliminar fotos estáticas
    for (const key of photoKeysThree) {
      const photoFilename = state[key as keyof WorkflowContainerThreeI];
      if (photoFilename && typeof photoFilename === "string") {
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
      ...initialWorkflowStateThree,
    }));
  },

  // ============================================
  // LIMPIEZA PARA SIGUIENTE PROCESO (mantener datos básicos)
  // ============================================
  onClearNext: (container?: string) => {
    const currentClient = get().client;
    const currentClientId = get().clientId;
    const currentClientIdentification = get().clientIdentification;

    set(() => ({
      ...initialWorkflowStateThree,
      container: container || get().container,
      client: currentClient,
      clientId: currentClientId,
      clientIdentification: currentClientIdentification,
    }));
  },
});
