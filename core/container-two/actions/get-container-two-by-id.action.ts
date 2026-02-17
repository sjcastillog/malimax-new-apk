import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";
import { type WorkflowContainerTwoI } from "../interfaces";

export const getContainerTwoById = async (
  id: number,
): Promise<WorkflowContainerTwoI> => {
  try {
    const { data } = await puceApi.get<ServiceResponseI<WorkflowContainerTwoI>>(
      `/malimax-two/${id}`,
    );
    return data.data!;
  } catch (error) {
    throw new Error(`malimax with id ${id} not found`);
  }
};
