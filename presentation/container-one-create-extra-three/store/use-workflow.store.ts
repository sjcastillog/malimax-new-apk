import { WorkflowActionI, WorkflowI } from "@/common/interface";
import {
  WorkflowContainerOneActionI,
  WorkflowContainerOneI,
} from "@/core/container-one/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createWorkflowContainerOneSlice } from "./workflow-container-one.store";
import { createWorkflowSlice } from "./workflow.store";

export const useWorkflowStoreOneExtraThree = create<
  WorkflowContainerOneI &
    WorkflowContainerOneActionI &
    WorkflowI &
    WorkflowActionI
>()(
  persist(
    (...a) => ({
      ...createWorkflowSlice(...a),
      ...createWorkflowContainerOneSlice(...a),
      _hasHydrated: false,
    }),
    {
      name: "workflow-one-zero-storage",
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
