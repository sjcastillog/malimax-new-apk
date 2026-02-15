import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";

export const generateWfCompletePdfReportbyId = async (
  id: number
): Promise<ServiceResponseI<any>> => {
  try {


    const { data } = await puceApi.get<ServiceResponseI<any>>(
      `/workflow-container/generate-pdf-report/${id}`
    );

    return data;
  } catch (err) {
       throw new Error(`workflow with id ${id} not found`);

  }
};