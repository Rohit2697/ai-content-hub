
//import NoArtilce from '@/components/NoArtilce';

import ShowArticles from '@/components/ShowArticles';
import { db } from '@/db';

export default async function Home() {

  const articles = await db.post.findMany({
    orderBy: {
      date: 'desc',
    },
  });

  const newArticles = articles.map((article) => {
    return { ...article, tags: article.tags ? JSON.parse(article.tags) as string[] : [] };
  })

  return (
    <>
      <h1 className="text-4xl font-extrabold mb-10 text-violet-700 border-b-4 border-violet-300 pb-2">
        Latest Articles
      </h1>
      <ShowArticles articles={newArticles} />
    </>


  );
}
