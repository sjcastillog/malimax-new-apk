import {
  authCheckStatus,
  authLogin,
  clearAuthCache,
} from "@/core/auth/actions/auth-actions";
import { UsersLoginDataResponseI } from "@/core/auth/interface";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import { create } from "zustand";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";
export type AuthModule =
  | "MODULE_MALIMAX_ONE_00010001"
  | "MODULE_MALIMAX_TWO_00020001"
  | "MODULE_MALIMAX_TRHEE_00030001"
  | "MODULE_MALIMAX_REPORTS_00030001"
  | "MODULE_WORKFLOW_ONE_00010001"
  | "MODULE_WORKFLOW_TWO_00020001"
  | "MODULE_WORKFLOW_TRHEE_00030001"
  | "MODULE_WORKFLOW_REPORTS_00040001";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: UsersLoginDataResponseI;
  isOfflineMode: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  changeStatus: (
    token?: string,
    user?: UsersLoginDataResponseI,
    isFromCache?: boolean,
  ) => Promise<boolean>;
  processOne: boolean;
  processTwo: boolean;
  processThree: boolean;
  processReports: boolean;
  malimaxOne: boolean;
  malimaxTwo: boolean;
  malimaxThree: boolean;
  malimaxReports: boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,
  isOfflineMode: false,
  processOne: false,
  processTwo: false,
  processThree: false,
  processReports: false,
  malimaxOne: false,
  malimaxTwo: false,
  malimaxThree: false,
  malimaxReports: false,

  changeStatus: async (
    token?: string,
    user?: UsersLoginDataResponseI,
    isFromCache: boolean = false,
  ) => {
    if (!token || !user) {
      set({
        status: "unauthenticated",
        token: undefined,
        user: undefined,
        isOfflineMode: false,
      });
      await SecureStorageAdapter.deleteItem("token");
      return false;
    }
    const modules = <AuthModule[]>[];
    for (const module of user.modules) {
      modules.push(module.code);
      if (module.children && module.children.length > 0) {
        for (const child of module.children) {
          modules.push(child.code);
        }
      }
    }
    set({
      status: "authenticated",
      token: token,
      user: user,
      isOfflineMode: isFromCache,
      processOne: modules.includes("MODULE_WORKFLOW_ONE_00010001"),
      processTwo: modules.includes("MODULE_WORKFLOW_TWO_00020001"),
      processThree: modules.includes("MODULE_WORKFLOW_TRHEE_00030001"),
      processReports: modules.includes("MODULE_WORKFLOW_REPORTS_00040001"),
      malimaxOne: modules.includes("MODULE_MALIMAX_ONE_00010001"),
      malimaxTwo: modules.includes("MODULE_MALIMAX_TWO_00020001"),
      malimaxThree: modules.includes("MODULE_MALIMAX_TRHEE_00030001"),
      malimaxReports: modules.includes("MODULE_MALIMAX_REPORTS_00030001"),
    });

    await SecureStorageAdapter.setItem("token", token);
    return true;
  },

  login: async (user: string, password: string) => {
    const resp = await authLogin(user, password);
    return get().changeStatus(resp?.token, resp?.user.user, false);
  },

  checkStatus: async () => {
    const resp = await authCheckStatus();

    if (!resp) {
      get().logout();
      return;
    }

    const isFromCache = resp.user.cachedAt !== undefined;

    get().changeStatus(resp?.token, resp?.user.user, isFromCache);
  },

  logout: async () => {
    await SecureStorageAdapter.deleteItem("token");
    await clearAuthCache();
    set({
      status: "unauthenticated",
      token: undefined,
      user: undefined,
      isOfflineMode: false,
      processOne: false,
      processTwo: false,
      processThree: false,
      processReports: false,
      malimaxOne: false,
      malimaxTwo: false,
      malimaxThree: false,
      malimaxReports: false,
    });
  },
}));
