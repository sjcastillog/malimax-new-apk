import {
  ObjPostI,
  ServiceResponseI,
} from "@/common/interface/libs/response.interface";
import { puceApi } from "@/core/api/puceApi";
import { WorkflowContainerOneRequiredI } from "../interfaces";

export const createContainerOne = (
  container: Partial<WorkflowContainerOneRequiredI>,
) => {
  return createContainer(container);
};

async function createContainer(
  container: Partial<WorkflowContainerOneRequiredI>,
) {
  try {
    const { data } = await puceApi.post<ServiceResponseI<ObjPostI>>(
      `/malimax-one`,
      { container },
    );

    return data;
  } catch (error) {
    throw new Error("Error al guardar el Contenedor Vacio");
  }
}
