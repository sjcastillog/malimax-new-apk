import { ObjPostI, ServiceResponseI } from "@/common/interface";
import { puceApi } from "@/core/api/puceApi";
import { WorkflowTruckRequiredI } from "../interfaces/truck.interface";

export const saveTruck = async (
  formData: Partial<WorkflowTruckRequiredI>
): Promise<string | null> => {
  try {
    const { data } = await puceApi.post<ServiceResponseI<ObjPostI>>(
      "/workflow-truck/",
      formData
    );

    if (data.message) return data.message;
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
