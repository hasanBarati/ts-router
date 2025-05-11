import { createStore } from "@/shared/lib/zustand";
import type { OrderFilters } from "./types";
import { useAuthStore } from "@/app/auth-store";
import { create } from "zustand";

interface OrderFilterState {
  filters: OrderFilters;
  setFilters: (updater: Partial<OrderFilters>) => void;
  resetFilters: () => void;
}

export const useOrderFilterStore = create<OrderFilterState>()((set) => {
  // خواندن userInfo در زمان ایجاد استور
  const authState = useAuthStore.getState();
  const initialHub = authState.userInfo?.selectHub ?? null;

  return {
    filters: {
      selectHub: initialHub,
      orderDate: null,
    },
    setFilters: (updater) =>
      set((state) => ({ filters: { ...state.filters, ...updater } })),
    resetFilters: () =>
      set(() => ({ filters: { selectHub: null, orderDate: null } })),
  };
});