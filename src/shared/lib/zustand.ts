import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";


export function createStore<T>(
  store: StateCreator<T, any, any>
) {
  return create<T>()(
    devtools(store, {
      enabled: true,
    })
  );
}