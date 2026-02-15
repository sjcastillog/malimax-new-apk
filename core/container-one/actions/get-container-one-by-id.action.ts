import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";
import { type WorkflowContainerOneI } from "../interfaces";

export const getContainerOneById = async (
  id: number,
): Promise<WorkflowContainerOneI> => {
  try {
    const { data } = await puceApi.get<ServiceResponseI<WorkflowContainerOneI>>(
      `/workflow-one/${id}`,
    );
    return data.data!;
  } catch (error) {
    throw new Error(`workflow with id ${id} not found`);
  }
};
