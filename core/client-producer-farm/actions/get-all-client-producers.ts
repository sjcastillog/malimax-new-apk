import {
  ClientProducerFarmI,
  ServiceResponseI
} from "@/common/interface";
import { puceApi } from "@/core/api/puceApi";

export const getAllClientProducerFarms = async (
  producer: number | null
): Promise<ClientProducerFarmI[] | null> => {
  try {
    const { data } = await puceApi.get<ServiceResponseI<ClientProducerFarmI[]>>(
      `/client-producer-farm/all-no-pagination/${producer}`
    );
    return data?.data ?? [];
  } catch (error) {
    return null;
  }
};
