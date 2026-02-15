type TypeStep = "Formulario" | "Códigos" | "Fotos" | "Videos" | "Validación";
export interface WorkflowI {
  id?: number | null;
  step: string;
  activeKey?: string[];
}

export interface WorkflowActionI {
  setStep: (step: WorkflowI["step"]) => void;
  setActiveKey?: (activeKey: WorkflowI["activeKey"]) => void;
  resetSteps: () => void;
}
