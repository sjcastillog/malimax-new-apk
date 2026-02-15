import { WorkflowActionI, WorkflowI } from "@/common/interface";
import { StateCreator } from "zustand";

export const createWorkflowSlice: StateCreator<
  WorkflowI & WorkflowActionI,
  [],
  []
> = (set, get) => ({
  step: "Formulario",
  activeKey: ["1"],

  setStep: (step) => set(() => ({ step })),
  setActiveKey: (activeKey) => set(() => ({ activeKey })),
  resetSteps: () =>
    set(() => ({
      step: "Formulario",
    })),
});
