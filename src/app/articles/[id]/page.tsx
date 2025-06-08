// app/articles/[id]/page.tsx or .ts

import ArticleClient from '@/components/ArticleClient';

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
};

export default async function ArticlePage(props: ArticlePageProps) {
  const { id } = await props.params
  return <ArticleClient id={id} />;
}
