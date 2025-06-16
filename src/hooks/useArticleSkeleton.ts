import { create } from "zustand";

interface ArticleSkeletonProps {
  showSkeleton: boolean;
  setShow: (value: boolean) => void;
  resetShow: () => void;
}

export const useArticleSkeleton = create<ArticleSkeletonProps>((set) => ({
  showSkeleton: false,
  setShow: (value: boolean) => set({ showSkeleton: value }),
  resetShow: () => set({ showSkeleton: false }),
}));
