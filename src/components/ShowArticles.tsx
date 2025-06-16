'use client';
import React, { useEffect } from 'react';
import ArticleCard from './ArticleCard';
import { Article } from '@/app/articles/article-type';
import { useArticleFormStore } from '@/hooks/useArticleFormStore';

import NoArticle from './NoArticle';

const ShowArticles = ({ articles }: { articles: Article[] }) => {

    const { clearArticleData } = useArticleFormStore()
    useEffect(() => clearArticleData(), [])
    if (!articles.length) {
        return <NoArticle />;
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article, index) => (
                <ArticleCard key={index} {...article} />
            ))}
        </div>
    );

}

export default ShowArticles;
