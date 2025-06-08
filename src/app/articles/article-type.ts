import { Dispatch, SetStateAction } from "react";
export type ArticleCardProps = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  date: string;
};
export type PreviewArticleProps = {
  slug?: string; // Usually same as id, used for routing
  title?: string; // Article headline
  description?: string; // Short summary
  content?: string; // Full article body
  tags?: string; // List of tags/categories
  // Estimated reading time (e.g. "5 min read")
  coverImage?: string; // Optional image path or URL
  setPreview: Dispatch<SetStateAction<boolean>>;
};

export type Article = {
  id: string; // UUID
  slug: string; // Usually same as id, used for routing
  title: string; // Article headline
  description: string; // Short summary
  content: string; // Full article body
  tags: string[]; // List of tags/categories
  author: string; // Author's name
  date: string; // Date in ISO or readable format (e.g. "2024-04-24")
  readingTime: string; // Estimated reading time (e.g. "5 min read")
  coverImage: Uint8Array<ArrayBufferLike> | null; // Optional image path or URL
  summery?: string | null;
  createdBy: string;
};
export interface CreateArticleRequest {
  title: string;
  description: string;
  content: string;
  tags: string;
  coverImage: File;
}
