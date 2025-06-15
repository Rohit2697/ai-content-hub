'use client';
import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { Article } from '@/app/articles/article-type';
import { usePostStore } from '@/hooks/usePostStore';
import NoArtilce from './NoArtilce';

import { Spinner } from './ui/spinner';
import { useArticleFormStore } from '@/hooks/useArticleFormStore';
//import { useHeadingStore } from '@/hooks/useHeadingStore';
const ShowArticles = ({ articles }: { articles: Article[] }) => {
    const { posts, setPosts } = usePostStore()
    const { clearArticleData } = useArticleFormStore()
    const [loading, setLoading] = useState(true)
    const [initializing, setInitializing] = useState(false)
    //const { heading } = useHeadingStore()

    useEffect(() => { setInitializing(true) }, [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => clearArticleData(), [])
    useEffect(() => {
        if (articles.length) {
            setPosts(articles)
        }
        setLoading(false)
    }, [articles, setPosts])

    if (!initializing) return null
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Spinner size="large" className="text-violet-600" />
            </div>
        );
    }

    if (!posts.length) {
        return <NoArtilce />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((article, index) => (
                <ArticleCard key={index} {...article} />
            ))}
        </div>
    );

}

export default ShowArticles;
