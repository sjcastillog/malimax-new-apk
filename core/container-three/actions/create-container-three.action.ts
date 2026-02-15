import {
  ObjPostI,
  ServiceResponseI,
} from "@/common/interface/libs/response.interface";
import { puceApi } from "@/core/api/puceApi";
import { WorkflowThreeI } from "../interfaces";

export const createContainerThree = (container: Partial<WorkflowThreeI>) => {
  return createContainer(container);
};

async function createContainer(container: Partial<WorkflowThreeI>) {
  try {
    const { data } = await puceApi.post<ServiceResponseI<ObjPostI>>(
      `/workflow-three`,
      { container },
    );

    return data;
  } catch (error) {
    throw new Error("Error al guardar el Contenedor Vacio");
  }
}
