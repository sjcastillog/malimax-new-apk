import { ObjPostI, ServiceResponseI } from "@/common/interface";
import { puceApi } from "@/core/api/puceApi";
import { WorkflowContainerTwoI } from "../interfaces";

export const saveContainerTwo = async (
  formData: Partial<WorkflowContainerTwoI>,
): Promise<string | null> => {
  try {
    const { data } = await puceApi.post<ServiceResponseI<ObjPostI>>(
      "/malimax-two/",
      formData,
    );

    if (data.message) return data.message;
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
