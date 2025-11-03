import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "@/shared/lib/zustand";
import type { UserType } from "@/shared/types/global";



type AuthState = {
  userInfo: UserType | null;
  setUserInfo: (user: UserType) => void;
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
