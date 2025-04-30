
import { create } from 'zustand';
import type { Item } from '../types/itemTypes';


interface DashboardState {
  items: Item[];
  setItems: (items: Item[]) => void;
}

export const useDashboardStore = create<DashboardState>(set => ({
  items: [],
  setItems: items => set({ items })
}));
