import { ServiceResponseI } from "@/common/interface";
import { puceApi } from "@/core/api/puceApi";

interface Client {
  id: number;
  name: string;
  identification: string;
}

export const getAllClients = async (): Promise<Client[] | null> => {
  try {
    const { data } = await puceApi.get<ServiceResponseI<Client[]>>(
      `/clients/all-no-pagination/`,
      { params: { malimax: true } },
    );
    return data?.data ?? [];
  } catch (error) {
    return null;
  }
};
