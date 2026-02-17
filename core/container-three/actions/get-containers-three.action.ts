import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";
import { type WorkflowContainerThreeI } from "../interfaces";

export const getContainersThree = async (
  limit = 20,
  offset = 0,
  search = "",
): Promise<WorkflowContainerThreeI[]> => {
  try {
    const { data } = await puceApi.get<
      ServiceResponseI<WorkflowContainerThreeI[]>
    >("/malimax-three/infinite", {
      params: {
        limit,
        offset,
        search,
      },
    });

    return data.data!;
  } catch (error) {
    throw new Error("Unable to load containers");
  }
};
