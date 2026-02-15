import * as Yup from "yup";

export const photosToGenerateFull = [
  { key: "siglasFPhoto", label: "Contenedor" },
  { key: "adhesivoPhoto", label: "Adhesivo Principal" },
  { key: "adhesivoBisagraPhoto1", label: "Adhesivo Bisagra 1" },
  { key: "adhesivoBisagraPhoto2", label: "Adhesivo Bisagra 2" },
  { key: "adhesivoBisagraPhoto3", label: "Adhesivo Bisagra 3" },
  { key: "adhesivoPuertaPhoto", label: "Adhesivo Puerta" },
  { key: "botellaExporPhoto", label: "Botella Exportador" },
  { key: "botellaNavieraPhoto", label: "Botella Naviera" },
  {
    key: "botellaVerificadoraRastreoPhoto",
    label: "Botella Verificadora Rastreo",
  },
  { key: "cableExporPhoto", label: "Cable Exportador" },
  { key: "cableVerificadoraPhoto", label: "Cable Verificadora" },
  { key: "evaluacionFrutaPhoto", label: "Evaluación Fruta" },
  { key: "guiaTransportePhoto", label: "Guía Transporte" },
  { key: "numRastreoSatelitalPhoto", label: "Número Rastreo Satelital" },
  { key: "tarjaCargaPhoto", label: "Tarja Carga Principal" },
  { key: "tarjaCargaPhotoOptional1", label: "Tarja Carga Opcional 1" },
  { key: "tarjaCargaPhotoOptional2", label: "Tarja Carga Opcional 2" },
  { key: "termografoPhoto", label: "Termógrafo" },
  { key: "cajasConsolidadasPhoto1", label: "Cajas Consolidadas 1" },
  { key: "cajasConsolidadasPhoto2", label: "Cajas Consolidadas 2" },
  { key: "cajasConsolidadasPhoto3", label: "Cajas Consolidadas 3" },
  { key: "cajasConsolidadasPhoto4", label: "Cajas Consolidadas 4" },
  { key: "cajasConsolidadasPhoto5", label: "Cajas Consolidadas 5" },
  { key: "cierreContenedorPhoto1", label: "Cierre Contenedor 1" },
  { key: "cierreContenedorPhoto2", label: "Cierre Contenedor 2" },
  { key: "cierreContenedorPhoto3", label: "Cierre Contenedor 3" },
  { key: "ventoleraIzquierdaPhoto", label: "Ventolera Izquierda" },
  { key: "ventoleraDerechaPhoto", label: "Ventolera Derecha" },
  { key: "panelIzquierdoPhoto", label: "Panel Izquierdo" },
  { key: "panelDerechoPhoto", label: "Panel Derecho" },
];

export const validationSchemaFull = Yup.object({
  container: Yup.string().required("N° Contenedor Requerido"),
  // clientId: Yup.string().required("Exportador Requerido"),
  producerId: Yup.string().required("Productor Requerido"),
  farmId: Yup.string().required("Hacienda Requerida"),
  magap: Yup.string().required("Magap Requerido"),
  boxId: Yup.string().required("Tipo de Caja Requerido"),
  brandId: Yup.string().required("Marca Requerido"),

  closeProcess: Yup.string().required("Hora Cierre de Proceso Requerido"),
  endLoading: Yup.string().required("Hora Fin de Carga Requerido"),
  containerClose: Yup.string().required("Hora Cierre de Contenedor Requerido"),
  containerOulet: Yup.string().required("Hora Salida de Contenedor Requerido"),

  numKit: Yup.string().required("Número de Kit Full"),
  adhesivo: Yup.string().required("Adhesivo requerido"),
  adhesivoBisagra: Yup.string().required("Adhesivo Bisagra requerido"),
  adhesivoBisagraPhoto1: Yup.string().required(
    "Adhesivo Bisagra Foto1 requerido"
  ),
  adhesivoBisagraPhoto2: Yup.string().required(
    "Adhesivo Bisagra Foto2 requerido"
  ),
  adhesivoBisagraPhoto3: Yup.string().required(
    "Adhesivo Bisagra Foto3 requerido"
  ),
  adhesivoPhoto: Yup.string().required("Adhesivo Foto requerido"),
  adhesivoPuerta: Yup.string().required("Adhesivo Puerta requerido"),
  adhesivoPuertaPhoto: Yup.string().required("Adhesivo Puerta Foto requerido"),
  botellaExpor: Yup.string().required("Botella Expor requerido"),
  botellaExporPhoto: Yup.string().required("Botella Expor Foto requerido"),
  botellaNaviera: Yup.string().required("BotellaNaviera requerido"),
  botellaNavieraPhoto: Yup.string().required("BotellaNaviera Foto requerido"),
  botellaVerificadoraRastreo: Yup.string().required(
    "BotellaVerificadoraRastreo requerido"
  ),
  botellaVerificadoraRastreoPhoto: Yup.string().required(
    "BotellaVerificadoraRastreo Foto requerido"
  ),
  cableExpor: Yup.string().required("Cable Expor requerido"),
  cableExporPhoto: Yup.string().required("Cable Expor Foto requerido"),
  cableVerificadora: Yup.string().required("Cable Verificadora requerido"),
  cableVerificadoraPhoto: Yup.string().required(
    "Cable Verificadora Foto requerido"
  ),
  evaluacionFruta: Yup.string().required("Evaluacion Fruta requerido"),
  evaluacionFrutaPhoto: Yup.string().required(
    "Evaluacion Fruta Foto requerido"
  ),
  guiaTransporte: Yup.string().required("Guia de Transporte requerido"),
  guiaTransportePhoto: Yup.string().required(
    "Guia de Transporte Foto requerido"
  ),
  numCajas: Yup.string().required("Numero de Cajas requerido"),
  numRastreoSatelital: Yup.string().required("Num Rastreo Satelital requerido"),
  numRastreoSatelitalPhoto: Yup.string().required(
    "Num Rastreo Satelital Foto requerido"
  ),
  siglasFPhoto: Yup.string().required("Foto Contenedor Full requerido"),
  tarjaCarga: Yup.string().required("Tarja Carga requerido"),
  tarjaCargaPhoto: Yup.string().required("Tarja Carga Foto requerido"),
  termografo: Yup.string().required("Termografo requerido"),
  termografoPhoto: Yup.string().required("Termografo Foto requerido"),
  cajasConsolidadasPhoto1: Yup.string().required(
    "Caja Consolidada Foto 1 requerido"
  ),
  cajasConsolidadasPhoto2: Yup.string().required(
    "Caja Consolidada Foto 2 requerido"
  ),
  cajasConsolidadasPhoto3: Yup.string().required(
    "Caja Consolidada Foto 3 requerido"
  ),
  cajasConsolidadasPhoto4: Yup.string().required(
    "Caja Consolidada Foto 4 requerido"
  ),
  cajasConsolidadasPhoto5: Yup.string().required(
    "Caja Consolidada Foto 5 requerido"
  ),
  cierreContenedorPhoto1: Yup.string().required(
    "Cierre Contenedor Foto 1 requerido"
  ),
  cierreContenedorPhoto2: Yup.string().required(
    "Cierre Contenedor Foto 2 requerido"
  ),
  cierreContenedorPhoto3: Yup.string().required(
    "Cierre Contenedor Foto 3 requerido"
  ),
  ventoleraIzquierdaPhoto: Yup.string().required(
    "Ventolera Izquierda Foto requerida"
  ),
  ventoleraDerechaPhoto: Yup.string().required(
    "Ventolera Derecha Foto requerida"
  ),
  panelIzquierdoPhoto: Yup.string().required("Panel Izquierdo Foto requerida"),
  panelDerechoPhoto: Yup.string().required("Panel Derecho Foto requerida"),
});

export const initialWorkflowStateFull = {
  firstTakePhoto: "",
  id: null,
  container: "",
  client: null,
  clientId: null,
  producer: null,
  producerId: null,
  farm: null,
  farmId: null,
  magap: "",
  zone: "",
  balerCode: "",
  brand: null,
  brandId: null,
  box: null,
  boxId: null,
  observation: "",
  producerOptional: null,
  farmOptional: null,
  farmOptionalZone: "",
  balerCodeOptional: "",
  brandOptional: null,
  boxOptional: null,
  magapOptional: null,
  numCajasOptional: null,
  cajasEstibaOptional: null,
  producerOptionalId: null,
  farmOptionalId: null,
  boxOptionalId: null,
  brandOptionalId: null,

  closeProcess: "",
  endLoading: "",
  containerClose: "",
  containerOulet: "",

  adhesivo: "",
  adhesivoBisagra: "",
  adhesivoBisagraPhoto1: "",
  adhesivoBisagraPhoto2: "",
  adhesivoBisagraPhoto3: "",
  adhesivoPhoto: "",
  adhesivoPuerta: "",
  adhesivoPuertaId: null,
  adhesivoPuertaPhoto: "",
  botellaExpor: "",
  botellaExporId: null,
  botellaExporPhoto: "",
  botellaNaviera: "",
  botellaNavieraPhoto: "",
  botellaVerificadoraRastreo: "",
  botellaVerificadoraRastreoPhoto: "",
  cableExpor: "",
  cableExporId: null,
  cableExporPhoto: "",
  cableVerificadora: "",
  cableVerificadoraPhoto: "",
  evaluacionFruta: "",
  evaluacionFrutaPhoto: "",
  guiaTransporte: "",
  guiaTransportePhoto: "",
  numCajas: null,
  cajasEstiba: null,
  numRastreoSatelital: "",
  numRastreoSatelitalPhoto: "",
  siglasFPhoto: "",
  tarjaCarga: "",
  tarjaCargaPhoto: "",
  tarjaCargaPhotoOptional1: "",
  tarjaCargaPhotoOptional2: "",
  termografo: "",
  termografoId: null,
  termografoPhoto: "",
  videoCajas: "",
  videoCierreContenedor: "",
  videoPanelExterior: "",
  statusCF: 0,
  processingVideoC: false,
  processingVideoCC: false,
  processingVideoPE: false,
  cajasConsolidadasPhoto1: "",
  cajasConsolidadasPhoto2: "",
  cajasConsolidadasPhoto3: "",
  cajasConsolidadasPhoto4: "",
  cajasConsolidadasPhoto5: "",
  cierreContenedorPhoto1: "",
  cierreContenedorPhoto2: "",
  cierreContenedorPhoto3: "",
  ventoleraDerechaPhoto: "",
  ventoleraIzquierdaPhoto: "",
  panelIzquierdoPhoto: "",
  panelDerechoPhoto: "",

  calidad: "",
  calidadCi: "",
  gancho: "",
  ganchoCi: "",
  driver: "",
  placa: "",
  companyTransport: "",
  numKit: "",
  producerShort: "",
  farmShort: "",
};

export const photoKeysFull = [
  "siglasFPhoto",
  "adhesivoPhoto",
  "adhesivoBisagraPhoto1",
  "adhesivoBisagraPhoto2",
  "adhesivoBisagraPhoto3",
  "adhesivoPuertaPhoto",
  "botellaExporPhoto",
  "botellaNavieraPhoto",
  "botellaVerificadoraRastreoPhoto",
  "cableExporPhoto",
  "cableVerificadoraPhoto",
  "evaluacionFrutaPhoto",
  "guiaTransportePhoto",
  "numRastreoSatelitalPhoto",
  "tarjaCargaPhoto",
  "tarjaCargaPhotoOptional1",
  "tarjaCargaPhotoOptional2",
  "termografoPhoto",
  "cajasConsolidadasPhoto1",
  "cajasConsolidadasPhoto2",
  "cajasConsolidadasPhoto3",
  "cajasConsolidadasPhoto4",
  "cajasConsolidadasPhoto5",
  "cierreContenedorPhoto1",
  "cierreContenedorPhoto2",
  "cierreContenedorPhoto3",
  "ventoleraDerechaPhoto",
  "ventoleraIzquierdaPhoto",
  "panelIzquierdoPhoto",
  "panelDerechoPhoto",
];

export const videoKeysFull = [
  "videoCajas",
  "videoCierreContenedor",
  "videoPanelExterior",
] as const;
