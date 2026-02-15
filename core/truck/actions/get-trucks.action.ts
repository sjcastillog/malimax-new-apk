import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";
import { type WorkflowTruckI } from "../interfaces/truck.interface";

export const getTrucks = async (
  limit = 20,
  offset = 0,
  search = ""
): Promise<WorkflowTruckI[]> => {
  try {
    const { data } = await puceApi.get<
      ServiceResponseI<WorkflowTruckI[]>
    >("/workflow-truck/infinite", {
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
