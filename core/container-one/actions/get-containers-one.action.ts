import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";
import { type WorkflowContainerOneI } from "../interfaces";

export const getContainersOne = async (
  limit = 20,
  offset = 0,
  search = "",
): Promise<WorkflowContainerOneI[]> => {
  try {
    const { data } = await puceApi.get<
      ServiceResponseI<WorkflowContainerOneI[]>
    >("/workflow-one/infinite", {
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
