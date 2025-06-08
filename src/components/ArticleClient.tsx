'use client';
import { Article } from '@/app/articles/article-type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { timestampToDateTimeString } from '@/lib/utils';
import { Spinner } from './ui/spinner';
import SummarizerModal from './SummerizeModel';
import ErrorAlert from './ErrorAlert';
import { useUserStore } from '@/hooks/useUserStore';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

type ArticleClientProps = {
  id: string;

};

export default function ArticleClient({ id }: ArticleClientProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [imageUrl, setImageURL] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [summarizingError, setSummarizingError] = useState('')
  const [isOwner, setIsowner] = useState(false)
  const { user } = useUserStore()
  const router = useRouter()
  useEffect(() => {

    if (!user) {
      return router.push('/login')
    }
    const fetchArticle = async () => {
      const res = await fetch(`/api/article/${id}`);
      if (!res.ok) {
        return;
      }
      const post: { article: Article } = await res.json();
      setArticle(post.article);
      let ImageURL = ""
      if (post.article.coverImage) {
        const byteArray = new Uint8Array(post.article.coverImage); // from number[]
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        const urlCreator = window.URL || window.webkitURL;
        ImageURL = urlCreator.createObjectURL(blob);
      }

      setIsowner(post.article.createdBy === user.user_id)
      setImageURL(ImageURL);
      setTags(post.article.tags ? post.article.tags : []);
    };
    fetchArticle();
    return () => URL.revokeObjectURL(imageUrl);
  }, [id]);

  if (!article)
    return (
      <Spinner size="large" className="text-violet-600" />

    );

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 bg-gradient-to-b from-violet-50 to-white rounded-lg shadow-lg">
      {summarizingError && <ErrorAlert message={summarizingError} setError={setSummarizingError} />}
      <h1 className="text-4xl font-extrabold mb-6 text-violet-700 border-b-4 border-violet-300 pb-3">
        {article.title}
      </h1>

      <div className="text-violet-600 text-sm mb-6 font-semibold flex flex-wrap gap-2">
        <span>By {article.author}</span>
        <span>·</span>
        <span>{timestampToDateTimeString(parseInt(article.date))}</span>
        <span>·</span>
        <span>{article.readingTime}</span>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-end mb-6 gap-2">
        {isOwner && <Button variant="default" className='bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition'>Delete</Button>}
        {isOwner && <Button variant="default" className='bg-violet-600 text-white px-4 py-2 rounded-md shadow hover:bg-violet-700 transition'>Edit</Button>}

        <SummarizerModal article_id={id} content={article.content} setError={setSummarizingError} />
      </div>
      {article.coverImage && (
        <Image
          src={imageUrl}
          alt={article.slug}
          className="w-full rounded-lg mb-6 border border-violet-100 shadow"
          width={800}
          height={400}
        />
      )}

      <p className="text-lg text-gray-700 mb-6 bg-violet-50 p-4 rounded border-l-4 border-violet-400 shadow-sm">{article.description}</p>

      <article className="prose prose-lg max-w-none text-violet-900">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </main>
  );
}
