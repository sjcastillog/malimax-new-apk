import { puceApi } from "@/core/api/puceApi";
import { ServiceResponseI } from "@/core/auth/interface";

export const generateWfOnePdfReportbyId = async (
  id: number,
): Promise<ServiceResponseI<any>> => {
  try {
    const { data } = await puceApi.get<ServiceResponseI<any>>(
      `/malimax-one/generate-pdf-report/${id}`,
    );

    return data;
  } catch (err) {
    throw new Error(`malimax with id ${id} not found`);
  }
};
