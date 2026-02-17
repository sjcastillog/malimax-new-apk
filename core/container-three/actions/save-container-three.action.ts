import { ObjPostI, ServiceResponseI } from "@/common/interface";
import { puceApi } from "@/core/api/puceApi";
import { WorkflowContainerThreeI } from "../interfaces";

export const saveContainerThree = async (
  formData: Partial<WorkflowContainerThreeI>,
): Promise<string | null> => {
  try {
    const { data } = await puceApi.post<ServiceResponseI<ObjPostI>>(
      "/malimax-three/",
      formData,
    );

    if (data.message) return data.message;
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
