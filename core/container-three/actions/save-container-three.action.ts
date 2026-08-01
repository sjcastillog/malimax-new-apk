import { ObjPostI, ServiceResponseI } from "@/common/interface";
import { puceApi } from "@/core/api/puceApi";
import { WorkflowContainerThreeI } from "../interfaces";

export const saveContainerThree = async (
  formData: Partial<WorkflowContainerThreeI>,
): Promise<ObjPostI> => {
  const { data } = await puceApi.post<ServiceResponseI<ObjPostI>>(
    "/malimax-three/",
    formData,
  );

  return data.data as ObjPostI;
};
