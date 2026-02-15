import { ObjPostI, ServiceResponseI } from "@/common/interface/libs/response.interface";
import { puceApi } from "@/core/api/puceApi";
import { WorkflowTruckRequiredI } from "../interfaces/truck.interface";

export const createTruck = (
  truck: Partial<WorkflowTruckRequiredI>
) => {
  return createTruckIntern(truck);
};

async function createTruckIntern(
  truck: Partial<WorkflowTruckRequiredI>
) {
  try {
    const { data } = await puceApi.post<ServiceResponseI<ObjPostI>>(
      `/workflow-truck`,
      { truck }
    );

    return data;
  } catch (error) {
    throw new Error("Error al guardar el Contenedor Vacio");
  }
}
