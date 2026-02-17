import { ObjPostI, ServiceResponseI } from "@/common/interface";
import { puceApi } from "@/core/api/puceApi";
import { WorkflowContainerOneRequiredI } from "../interfaces";

export const saveContainerOne = async (
  formData: Partial<WorkflowContainerOneRequiredI>,
): Promise<string | null> => {
  try {
    const { data } = await puceApi.post<ServiceResponseI<ObjPostI>>(
      "/malimax-one/",
      formData,
    );

    if (data.message) return data.message;
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
