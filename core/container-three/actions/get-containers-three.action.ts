import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";
import { type WorkflowThreeI } from "../interfaces";

export const getContainersThree = async (
  limit = 20,
  offset = 0,
  search = "",
): Promise<WorkflowThreeI[]> => {
  try {
    const { data } = await puceApi.get<ServiceResponseI<WorkflowThreeI[]>>(
      "/workflow-three/infinite",
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
