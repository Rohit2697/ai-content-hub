'use client';
import { Article } from '@/app/articles/article-type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { timestampToDateTimeString } from '@/lib/utils';
import { Spinner } from './ui/spinner';
import SummarizerModal from './SummerizeModel';
import ErrorAlert from './ErrorAlert';
import { useUserStore } from '@/hooks/useUserStore';

import { Button } from './ui/button';
import { useArticleFormStore } from '@/hooks/useArticleFormStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ArticleClientProps = {
  id: string;

};

export default function ArticleClient({ id }: ArticleClientProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [imageUrl, setImageURL] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [summarizingError, setSummarizingError] = useState('')
  const [isOwner, setIsowner] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [deleting, setDeleting] = useState(false)
  const { user } = useUserStore()
  const router = useRouter()
  const { articleData, setArticleData, clearArticleData } = useArticleFormStore()
  useEffect(() => {
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
      const updateArticleData = {
        ...articleData,
        title: post.article.title,
        description: post.article.description,
        content: post.article.content,
        tags: post.article.tags.join(','),
        imageUrl: ImageURL

      }
      setArticleData(updateArticleData)
      setIsowner(post.article.createdBy === user?.user_id)
      setImageURL(ImageURL);
      setTags(post.article.tags ? post.article.tags : []);

    };
    fetchArticle();
    return () => URL.revokeObjectURL(imageUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);
  const handlearticleDelete = async () => {
    try {
      setDeleteError('')
      if (!article) return
      setDeleting(true)
      const res = await fetch(`/api/article/${article.id}`, {
        method: "DELETE"
      })
      setDeleting(false)
      if (res.status == 401) {
        router.push('/login')
        return;
      }
      if (!res.ok) {
        const data = await res.json()
        setDeleteError(data.message || 'Unable to delete')
        return
      }
      clearArticleData()
      router.push('/')
      return
    } catch {
      setDeleting(false)
      setDeleteError('Something went wrong')
    }
  }
  if (!article)
    return (
      <Spinner size="large" className="text-violet-600" />

    );

  return (
  <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 bg-gradient-to-b from-violet-50 to-white rounded-lg shadow-lg">
  {deleteError && <ErrorAlert message={deleteError} setError={setDeleteError} />}
  {summarizingError && <ErrorAlert message={summarizingError} setError={setSummarizingError} />}

  <h1 className="text-2xl sm:text-4xl font-extrabold mb-6 text-violet-700 border-b-4 border-violet-300 pb-3">
    {article.title}
  </h1>

  <div className="text-violet-600 text-xs sm:text-sm mb-6 font-semibold flex flex-wrap gap-2">
    <span>By {article.author}</span>
    <span>·</span>
    <span>{timestampToDateTimeString(parseInt(article.date))}</span>
    <span>·</span>
    <span>{article.readingTime}</span>
  </div>

  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
    {tags.map((tag) => (
      <span
        key={tag}
        className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
      >
        {tag}
      </span>
    ))}
  </div>

  <div className="flex flex-col sm:flex-row justify-end gap-2 mb-6">
    {isOwner && (
      <Button
        variant="default"
        className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition w-full sm:w-auto"
        onClick={handlearticleDelete}
      >
        {deleting ? (
          <div className="flex items-center gap-2">
            <Spinner size="small" /> Deleting...
          </div>
        ) : (
          'Delete'
        )}
      </Button>
    )}

    {isOwner && (
      <Link href={`/articles/edit/${article.id}`} className="w-full sm:w-auto">
        <Button
          variant="default"
          className="bg-violet-600 text-white px-4 py-2 rounded-md shadow hover:bg-violet-700 transition w-full sm:w-auto"
        >
          Edit
        </Button>
      </Link>
    )}

    <div className="w-full sm:w-auto">
      <SummarizerModal article_id={id} content={article.content} setError={setSummarizingError} />
    </div>
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

  <p className="text-base sm:text-lg text-gray-700 mb-6 bg-violet-50 p-4 rounded border-l-4 border-violet-400 shadow-sm">
    {article.description}
  </p>

  <article className="prose prose-sm sm:prose-lg max-w-none text-violet-900">
    <div dangerouslySetInnerHTML={{ __html: article.content }} />
  </article>
</main>

  );
}
