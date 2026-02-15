import {
  ClientBrandI,
  ServiceResponseI
} from "@/common/interface";
import { puceApi } from "@/core/api/puceApi";

export const getAllClientBrands = async (
  client: number | null
): Promise<ClientBrandI[] | null> => {
  try {
    const { data } = await puceApi.get<ServiceResponseI<ClientBrandI[]>>(
      `/client-brand/all-no-pagination/${client}`
    );
    return data?.data ?? [];
  } catch (error) {
    return null;
  }
};
