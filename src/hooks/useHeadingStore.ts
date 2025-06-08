import { create } from "zustand";

interface HeadigStoreProps {
  heading: string;
  setHeading: (heading: string) => void;
  clearHeading: () => void;
}

export const useHeadingStore = create<HeadigStoreProps>((set) => ({
  heading: "Latest Articles",
  setHeading: (heading) => set({ heading }),
  clearHeading: () => set({ heading: "" }),
}));
