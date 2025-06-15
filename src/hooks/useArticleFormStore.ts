import { create } from "zustand";

interface ArticleFormData {
  title: string;
  content: string;
  description: string;
  coverimage: File | null;
  tags: string;
  imageUrl?: string;
  isGenerating?: boolean;
}

interface ArticleFormStrore {
  articleData: ArticleFormData;
  setArticleData: (articleData: ArticleFormData) => void;
  clearArticleData: () => void;
}
const initialPayLoad = {
  title: "",
  description: "",
  content: "",
  coverimage: null,
  tags: "",
};
export const useArticleFormStore = create<ArticleFormStrore>((set) => ({
  articleData: initialPayLoad,
  setArticleData: (articleData: ArticleFormData) =>
    set({ articleData: { ...articleData } }),
  clearArticleData: () =>
    set({
      articleData: initialPayLoad,
    }),
}));
