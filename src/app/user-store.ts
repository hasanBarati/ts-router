import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "@/shared/lib/zustand";
import type { selectResponse } from "@/shared/types/global";

type AuthState = {
  userInfo: {
    isSuperAdmin: boolean;
    perms: string[];
    permissionArray: { permission: string[] }[];
    hublist: [];
    selectEmployee: selectResponse;
    userinfo: selectResponse;
  } | null;
  setUserInfo: (user: {
    isSuperAdmin: boolean;
    perms: string[];
    permissionArray: { permission: string[] }[];
    hublist: [];
    selectEmployee: selectResponse;
    userinfo: selectResponse;
  }) => void;
};

export const useUserStore = createStore<AuthState>(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (user) => set({ userInfo: user }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
