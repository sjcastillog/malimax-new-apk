import { WorkflowActionI, WorkflowI } from "@/common/interface";
import {
  WorkflowTwoActionI,
  WorkflowTwoI,
} from "@/core/container-two/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createWorkflowContainerTwoSlice } from "./workflow-container-two.store";
import { createWorkflowSlice } from "./workflow.store";

export const useWorkflowStoreTwoExtraOne = create<
  WorkflowTwoI & WorkflowTwoActionI & WorkflowI & WorkflowActionI
>()(
  persist(
    (...a) => ({
      ...createWorkflowSlice(...a),
      ...createWorkflowContainerTwoSlice(...a),
      _hasHydrated: false,
    }),
    {
      name: "workflow-two-extra-one-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) return;

          if (state) state._hasHydrated = true;
        };
      },
    },
  ),
);
