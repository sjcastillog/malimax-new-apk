import { ObjPostI, ServiceResponseI } from "@/common/interface";
import { puceApi } from "@/core/api/puceApi";
import { WorkflowContainerOneRequiredI } from "../interfaces";

export const saveContainerOne = async (
  formData: Partial<WorkflowContainerOneRequiredI>,
): Promise<ObjPostI> => {
  const { data } = await puceApi.post<ServiceResponseI<ObjPostI>>(
    "/malimax-one/",
    formData,
  );

  return data.data as ObjPostI;
};
