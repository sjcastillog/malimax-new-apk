import { ClientProducerI, ServiceResponseI } from "@/common/interface";
import { puceApi } from "@/core/api/puceApi";

export const getAllClientProducers = async (
  client: number|null
): Promise<ClientProducerI[] | null> => {
  try {
    const { data } = await puceApi.get<ServiceResponseI<ClientProducerI[]>>(
      `/client-producer/all-no-pagination/${client}`
    );
    return data?.data ?? [];
  } catch (error) {
    return null;
  }
};
