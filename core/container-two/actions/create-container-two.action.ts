import {
  ObjPostI,
  ServiceResponseI,
} from "@/common/interface/libs/response.interface";
import { puceApi } from "@/core/api/puceApi";
import { WorkflowTwoI } from "../interfaces";

export const createContainerTwo = (container: Partial<WorkflowTwoI>) => {
  return createContainer(container);
};

async function createContainer(container: Partial<WorkflowTwoI>) {
  try {
    const { data } = await puceApi.post<ServiceResponseI<ObjPostI>>(
      `/workflow-two`,
      { container },
    );

    return data;
  } catch (error) {
    throw new Error("Error al guardar el Contenedor Vacio");
  }
}
