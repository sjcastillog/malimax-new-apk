import { initialWorkflowStateTwo, PHOTOS_DIR } from "@/common/constants";
import {
  WorkflowContainerTwoActionI,
  WorkflowContainerTwoI,
  WorkflowImageI,
} from "@/core/container-two/interfaces";
import { File } from "expo-file-system";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { StateCreator } from "zustand";

export const createWorkflowContainerTwoSlice: StateCreator<
  WorkflowContainerTwoI & WorkflowContainerTwoActionI,
  [],
  []
> = (set, get) => ({
  ...initialWorkflowStateTwo,

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
  // SETTERS DEL PROCESO 2
  // ============================================
  setProduct: (product) => set(() => ({ product })),

  setPresentation: (presentation) => set(() => ({ presentation })),

  setNumberPallet: (numberPallet) => set(() => ({ numberPallet })),

  setNumberPresentation: (numberPresentation) =>
    set(() => ({ numberPresentation })),

  setNumberSampling: (numberSampling) => set(() => ({ numberSampling })),

  // ============================================
  // SETTERS GENERALES
  // ============================================
  setCoordinates: (coordinates) => set(() => ({ coordinates })),

  setObservation: (observation) => set(() => ({ observation })),

  setHourInit: (hourInit) => set(() => ({ hourInit })),

  setHourEnd: (hourEnd) => set(() => ({ hourEnd })),

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
          model: "container-full",
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
  // MÉTODOS HELPER
  // ============================================
  getValues: () => ({
    id: get().id,
    container: get().container,
    client: get().client,
    clientId: get().clientId,
    clientIdentification: get().clientIdentification,
    product: get().product,
    presentation: get().presentation,
    numberPallet: get().numberPallet,
    numberPresentation: get().numberPresentation,
    numberSampling: get().numberSampling,
    coordinates: get().coordinates,
    observation: get().observation,
    hourInit: get().hourInit,
    hourEnd: get().hourEnd,
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

  // ============================================
  // LIMPIEZA PARA SIGUIENTE PROCESO (mantener datos básicos)
  // ============================================
  onClearNext: (container?: string) => {
    const currentClient = get().client;
    const currentClientId = get().clientId;
    const currentClientIdentification = get().clientIdentification;

    set(() => ({
      ...initialWorkflowStateTwo,
      container: container || get().container,
      client: currentClient,
      clientId: currentClientId,
      clientIdentification: currentClientIdentification,
    }));
  },
});
