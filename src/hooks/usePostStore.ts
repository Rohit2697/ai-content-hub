import { create } from "zustand";
import { Article } from "@/app/articles/article-type";

interface PostStore {
  posts: Article[];
  setPosts: (posts: Article[]) => void;
  clearPosts: () => void;
}
export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  clearPosts: () => set({ posts: [] }),
}));
