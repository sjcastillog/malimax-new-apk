import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";
import { type WorkflowContainerI } from "../interfaces";

export const getContainersComplete = async (
  limit = 20,
  offset = 0,
  search = "",
): Promise<WorkflowContainerI[]> => {
  try {
    const { data } = await puceApi.get<
      ServiceResponseI<WorkflowContainerI[]>
    >("/workflow-container/infinite", {
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
