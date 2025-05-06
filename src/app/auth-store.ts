import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "@/shared/lib/zustand";

type AuthState = {
  setUserInfo: (user: any) => void;
};

export const useAuthStore = createStore<AuthState>(
  persist(
    (set) => ({
      setUserInfo: (user) => set(user),
    }),
    {
      name: "food-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);


