import { ClientBoxI, ServiceResponseI } from "@/common/interface";
import { puceApi } from "@/core/api/puceApi";

export const getAllClientBoxes = async (
  client: number | null
): Promise<ClientBoxI[] | null> => {
  try {
    const { data } = await puceApi.get<ServiceResponseI<ClientBoxI[]>>(
      `/client-box/all-no-pagination/${client}`
    );
    return data?.data ?? [];
  } catch (error) {
    return null;
  }
};
