
//import NoArtilce from '@/components/NoArtilce';

import Heading from '@/components/Heading';
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
      <Heading />
      <ShowArticles articles={newArticles} />
    </>


  );
}
