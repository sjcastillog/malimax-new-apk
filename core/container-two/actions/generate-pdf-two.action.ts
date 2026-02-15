import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";

export const generateWfTwoPdfReportbyId = async (
  id: number
): Promise<ServiceResponseI<any>> => {
  try {


    const { data } = await puceApi.get<ServiceResponseI<any>>(
      `/workflow-two/generate-pdf-report/${id}`
    );

    return data;
  } catch (err) {
       throw new Error(`workflow with id ${id} not found`);

  }
};