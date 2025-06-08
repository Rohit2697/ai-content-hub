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
    //const { heading } = useHeadingStore()
    useEffect(() => clearArticleData(), [])
    useEffect(() => {
        if (articles.length) {
            setPosts(articles)
        }
        setLoading(false)
    }, [articles, setPosts])
    if (loading) return <Spinner size="large" className='text-violet-600' />

    if (!posts.length) {
        return <NoArtilce />
    }
    console.log("article: ", articles);
    return (
        <>

            <div className="grid gap-8 md:grid-cols-2">
                {posts.map((article, index) => (
                    <ArticleCard key={index} {...article} />
                ))}
            </div>
        </>

    );
}

export default ShowArticles;
