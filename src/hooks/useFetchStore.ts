import { create } from "zustand";

interface FetchStoreProps {
  fetchAll: boolean;
  setFetchAll: (value: boolean) => void;
  resetFetchALL: () => void;
}

export const useFetchStore = create<FetchStoreProps>((set) => ({
  fetchAll: true,
  setFetchAll: (value: boolean) => set({ fetchAll: value }),
  resetFetchALL: () => set({ fetchAll: true }),
}));
