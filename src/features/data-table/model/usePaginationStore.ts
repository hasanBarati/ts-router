import { create } from "zustand";

interface PaginationState {
  pageNumber: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  reset: () => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  pageNumber: 1,
  pageSize: 10,
  setPage: (page) => set({ pageNumber: page }),
  setPageSize: (size) =>
    set({
      pageSize: size,
      pageNumber: 1,
    }),
  reset: () =>
    set({
      pageNumber: 1,
      pageSize: 10,
    }),
}));