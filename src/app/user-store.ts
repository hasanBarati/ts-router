import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "@/shared/lib/zustand";

type AuthState = {
  userInfo: {
    isSuperAdmin: boolean;
    perms: string[];
    permissionArray: { permission: string[] }[];
    hublist: [];
  } | null;
  setUserInfo: (user: {
    isSuperAdmin: boolean;
    perms: string[];
    permissionArray: { permission: string[] }[];
    hublist: [];
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
