'use client'
import React, { useEffect, useState } from 'react';
import { Spinner } from './ui/spinner';
import { Editor } from '@tiptap/react';
import SaveArticleAlert from './SaveArticleAlert';
import ErrorAlert from './ErrorAlert';
import ArticleForm from './ArticleForm';
import { useRouter } from 'next/navigation';
import { Article } from '@/app/articles/article-type';
import { useUserStore } from '@/hooks/useUserStore';
import { useArticleFormStore } from '@/hooks/useArticleFormStore';

const EditArticleCmp = ({ id }: { id: string }) => {
    const [initializing, setInitializing] = useState(true)
    const [loading, setLoading] = useState(false)
    const [successAlert, setSuccessAlert] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const setEditorInstace = useState<Editor | null>(null)[1]
    const [redirectTime, setRedirectTime] = useState(3);
    const router = useRouter()
    const { user } = useUserStore()
    const { articleData, setArticleData } = useArticleFormStore()
    useEffect(() => {
        if (articleData.title) return
        const fetchArticle = async () => {
            const res = await fetch(`/api/article/${id}`);
            if (!res.ok) {
                return;
            }
            const post: { article: Article } = await res.json();


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


        };
        fetchArticle();
        return () => {

            if (articleData.imageUrl)
                URL.revokeObjectURL(articleData.imageUrl)
        };
    }, [id, articleData, user, setArticleData]);


    useEffect(() => {
        setInitializing(false)
    }, [])
    useEffect(() => {
        if (redirectTime === 0 && successAlert) {
            router.push(`/articles/${id}`)
        }
    }, [redirectTime, successAlert, router, id])
    const editArticle = async ({ title, description, content, coverimage, tags }:
        { title: string, content: string, description: string, tags: string, coverimage: File | null }
    ) => {
        setLoading(true)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (!title || !content || !description) {
            setLoading(false)
            setErrorMessage('Required Fields are Missing');

            return;
        }
        const formData = new FormData();
        formData.append('id', id);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('description', description);
        formData.append('file', coverimage || '');
        formData.append('tags', tags);
        formData.append('slug', title.toLocaleLowerCase().split(' ').join('-'));
        try {
            const res = await fetch(`/api/article/edit/${id}`, {
                method: 'POST',
                body: formData,
            });
            setLoading(false)
            if (res.status == 401) {
                router.push('/login')
                return
            }
            if (!res.ok) {
                const data = await res.json()
                setErrorMessage(data.message || 'Unable to update article')
            }
            setSuccessAlert('Article updated successfully!');
            const countdownInterval = setInterval(() => {
                setRedirectTime((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdownInterval);
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch {
            setLoading(false)
            setErrorMessage('Something went wrong');
        }

    };

    if (initializing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white px-4">
                <Spinner size="large" className="text-violet-600" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 bg-white rounded-lg shadow-md">
            {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 rounded-lg px-4">
                    <Spinner size="large" className="text-violet-600" />
                </div>
            )}

            {successAlert && <SaveArticleAlert redirectTime={redirectTime} message={successAlert} />}
            {errorMessage && <ErrorAlert message={errorMessage} setError={setErrorMessage} />}

            <div className="mb-6">
                <ArticleForm
                    loading={loading}
                    setEditorInstace={setEditorInstace}
                    articleVariant="Edit"
                    articleAction={editArticle}
                />
            </div>
        </div>
    );

}

export default EditArticleCmp;
