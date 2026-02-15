import { WorkflowContainerOneI } from "@/core/container-one/interfaces";
import { WorkflowThreeI } from "@/core/container-three/interfaces";
import { WorkflowTwoI } from "@/core/container-two/interfaces";

export interface WorkflowContainerI {
  id?: number;
  container: string;
  statusWorkflow?: string;
  statusWorkflowId: number | null;
  statusWorkflowCode?: string;
  statusWorkflowColor?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  statusContainer?: string;
  statusContainerId: number | null;
  statusContainerCode?: string;
  statusContainerColor?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  client?: string;
  clientId: number | null;
  userCreation: string;
  createdAt: Date | string;
  containerOneId: number;
  containerTwoId: number;
  containerThreeId: number;
  processType?: string;
  hour?: string;
  subRows?: any[];
}

export interface WorkflowAllDataI {
  id: number;
  wfOne: WorkflowContainerOneI;
  wfTwo: WorkflowTwoI;
  wfThree: WorkflowThreeI;
}