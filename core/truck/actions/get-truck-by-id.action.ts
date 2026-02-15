import { puceApi } from '@/core/api/puceApi';
import { ServiceResponseI } from '@/core/auth/interface';
import { type WorkflowTruckI } from '../interfaces/truck.interface';


export const getTruckById = async (id: number): Promise<WorkflowTruckI> => {
  try {
    const { data } = await puceApi.get<ServiceResponseI<WorkflowTruckI>>(`/workflow-truck/${id}`);
    return data.data!
  } catch (error) {
    throw new Error(`product with id ${id} not found`);
  }
};
