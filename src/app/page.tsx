
'use client';
import ErrorAlert from '@/components/ErrorAlert';
import Heading from '@/components/Heading';
import ShowArticles from '@/components/ShowArticles';
import ArticlecardSkeleton from '@/components/skeleton/articlecard-skeleton';
import { useArticleSkeleton } from '@/hooks/useArticleSkeleton';
import { useFetchStore } from '@/hooks/useFetchStore';
import { useHeadingStore } from '@/hooks/useHeadingStore';
import { usePostStore } from '@/hooks/usePostStore';
import { useEffect, useState } from 'react';

export default function Home() {
  const { posts, setPosts, clearPosts } = usePostStore()
  const [errorFethcing, setErrorFetching] = useState('')
  const [initializing, setInitializing] = useState(true)
  const [fetchingAllPosts, setFetchingAllPosts] = useState(false)
  const { clearHeading } = useHeadingStore()
  const { fetchAll } = useFetchStore()
  const { showSkeleton } = useArticleSkeleton()
  useEffect(() => { setInitializing(false) }, [])
  useEffect(() => {
    if (!fetchAll) return
    clearHeading()
    setFetchingAllPosts(true)
    const fethAllPosts = async () => {
      try {
        const res = await fetch('/api/article')
        if (!res.ok) {
          clearPosts()
          const data = await res.json()
          setFetchingAllPosts(false)
          setErrorFetching(data.message || "Unable to fetch articles!")
          return

        }
        const posts = await res.json()
        setPosts(posts)
        setFetchingAllPosts(false)
        return

      } catch {
        clearPosts()
        setFetchingAllPosts(false)
        setErrorFetching("Something Went Wrong!")
      }
    }
    fethAllPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAll, setPosts])

  if (initializing || fetchingAllPosts || showSkeleton) {
    return (
      <>
        <Heading />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <ArticlecardSkeleton />
          <ArticlecardSkeleton />
          <ArticlecardSkeleton />
        </div>
      </>

    )
  }
  return (
    <>
      {errorFethcing && <ErrorAlert message={errorFethcing} setError={setErrorFetching} />}
      <Heading />
      <ShowArticles articles={posts} />
    </>


  );
}
