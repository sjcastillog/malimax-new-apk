import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";
import { WorkflowAllDataI } from "../interfaces";

export const getContainerCompleteById = async (
  id: number,
): Promise<WorkflowAllDataI> => {
  try {
    const { data } = await puceApi.get<ServiceResponseI<WorkflowAllDataI>>(
      `/workflow-container/external-no-encrypt/${id}`,
    );
    return data.data!;
  } catch (error) {
    throw new Error(`workflow with id ${id} not found`);
  }
};
