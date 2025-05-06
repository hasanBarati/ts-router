
import { createStore } from '@/shared/lib/zustand';
import type { Item } from '../types/itemTypes';


interface DashboardState {
  items: Item[];
  setItems: (items: Item[]) => void;
  
}

export const useDashboardStore = createStore<DashboardState>(set => ({
  items: [],
  setItems: items => set({ items })
})

);
