import {
  ObjPostI,
  ServiceResponseI,
} from "@/common/interface/libs/response.interface";
import { puceApi } from "@/core/api/puceApi";
import { WorkflowContainerThreeI } from "../interfaces";

export const createContainerThree = (
  container: Partial<WorkflowContainerThreeI>,
) => {
  return createContainer(container);
};

async function createContainer(container: Partial<WorkflowContainerThreeI>) {
  try {
    const { data } = await puceApi.post<ServiceResponseI<ObjPostI>>(
      `/malimax-three`,
      { container },
    );

    return data;
  } catch (error) {
    throw new Error("Error al guardar el Malimax 3");
  }
}
