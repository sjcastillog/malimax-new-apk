import {
  ObjPostI,
  ServiceResponseI,
} from "@/common/interface/libs/response.interface";
import { puceApi } from "@/core/api/puceApi";
import { WorkflowContainerTwoI } from "../interfaces";

export const createContainerTwo = (
  container: Partial<WorkflowContainerTwoI>,
) => {
  return createContainer(container);
};

async function createContainer(container: Partial<WorkflowContainerTwoI>) {
  try {
    const { data } = await puceApi.post<ServiceResponseI<ObjPostI>>(
      `/malimax-two`,
      { container },
    );

    return data;
  } catch (error) {
    throw new Error("Error al guardar el Malimax 2");
  }
}
