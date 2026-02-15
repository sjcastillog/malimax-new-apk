import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";
import { type WorkflowThreeI } from "../interfaces";

export const getContainerThreeById = async (
  id: number,
): Promise<WorkflowThreeI> => {
  try {
    const { data } = await puceApi.get<ServiceResponseI<WorkflowThreeI>>(
      `/workflow-three/${id}`,
    );
    return data.data!;
  } catch (error) {
    throw new Error(`product with id ${id} not found`);
  }
};
