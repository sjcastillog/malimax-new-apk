import { ObjPostI, ServiceResponseI } from "@/common/interface";
import { puceApi } from "@/core/api/puceApi";
import { WorkflowContainerTwoI } from "../interfaces";

export const saveContainerTwo = async (
  formData: Partial<WorkflowContainerTwoI>,
): Promise<ObjPostI> => {
  const { data } = await puceApi.post<ServiceResponseI<ObjPostI>>(
    "/malimax-two/",
    formData,
  );

  return data.data as ObjPostI;
};
