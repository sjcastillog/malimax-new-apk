import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";
import { type WorkflowContainerThreeI } from "../interfaces";

export const getContainerThreeById = async (
  id: number,
): Promise<WorkflowContainerThreeI> => {
  try {
    const { data } = await puceApi.get<
      ServiceResponseI<WorkflowContainerThreeI>
    >(`/malimax-three/${id}`);
    return data.data!;
  } catch (error) {
    throw new Error(`malimax with id ${id} not found`);
  }
};
