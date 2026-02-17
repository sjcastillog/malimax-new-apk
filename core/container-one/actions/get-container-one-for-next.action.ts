import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";
import { WorkflowOneForNextProcessI } from "../interfaces";

export const getWorkflowOneByContainerForNextProcess = async (
  container: string,
): Promise<WorkflowOneForNextProcessI> => {
  try {
    const { data } = await puceApi.get<
      ServiceResponseI<WorkflowOneForNextProcessI>
    >(`/malimax-one/by-container-for-next-process/${container}`);

    return data.data!;
  } catch (err) {
    throw new Error(`malimax with container ${container} not found`);
  }
};
