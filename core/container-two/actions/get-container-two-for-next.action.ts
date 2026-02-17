import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";
import { WorkflowTwoForNextProcessI } from "../interfaces";

export const getWorkflowTwoByContainerForNextProcess = async (
  container: string,
): Promise<WorkflowTwoForNextProcessI> => {
  try {
    const { data } = await puceApi.get<
      ServiceResponseI<WorkflowTwoForNextProcessI>
    >(`/malimax-two/by-container-for-next-process/${container}`);

    return data.data!;
  } catch (err) {
    throw new Error(`malimax with container ${container} not found`);
  }
};
