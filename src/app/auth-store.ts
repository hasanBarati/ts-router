import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "@/shared/lib/zustand";

type AuthState = {
  userInfo: null,
  setUserInfo: (user: any) => void;
};

export const useAuthStore = createStore<AuthState>(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (user) => set({ userInfo: user }),
    }),
    {
      name: "food-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);


