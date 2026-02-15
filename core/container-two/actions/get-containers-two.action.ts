import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";
import { type WorkflowTwoI } from "../interfaces";

export const getContainersTwo = async (
  limit = 20,
  offset = 0,
  search = "",
): Promise<WorkflowTwoI[]> => {
  try {
    const { data } = await puceApi.get<ServiceResponseI<WorkflowTwoI[]>>(
      "/workflow-two/infinite",
      {
        params: {
          limit,
          offset,
          search,
        },
      },
    );

    return data.data!;
  } catch (error) {
    throw new Error("Unable to load containers");
  }
};
