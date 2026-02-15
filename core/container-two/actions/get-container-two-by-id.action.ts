import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";
import { type WorkflowTwoI } from "../interfaces";

export const getContainerTwoById = async (
  id: number,
): Promise<WorkflowTwoI> => {
  try {
    const { data } = await puceApi.get<ServiceResponseI<WorkflowTwoI>>(
      `/workflow-two/${id}`,
    );
    return data.data!;
  } catch (error) {
    throw new Error(`product with id ${id} not found`);
  }
};
