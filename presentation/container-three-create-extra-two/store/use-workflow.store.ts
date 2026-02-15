import { WorkflowActionI, WorkflowI } from "@/common/interface";
import {
  WorkflowThreeActionI,
  WorkflowThreeI,
} from "@/core/container-three/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createWorkflowContainerThreeSlice } from "./workflow-container-three.store";
import { createWorkflowSlice } from "./workflow.store";

export const useWorkflowStoreThreeExtraTwo = create<
  WorkflowThreeI & WorkflowThreeActionI & WorkflowI & WorkflowActionI
>()(
  persist(
    (...a) => ({
      ...createWorkflowSlice(...a),
      ...createWorkflowContainerThreeSlice(...a),
      _hasHydrated: false,
    }),
    {
      name: "workflow-three-extra-two-storage",
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
