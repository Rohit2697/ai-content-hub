'use client';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import SaveArticleAlert from './SaveArticleAlert';
import ErrorAlert from './ErrorAlert';
import { Spinner } from './ui/spinner';
import PromptDialogue from './PromptDialogue';
import type { Editor } from '@tiptap/react';
import ArticleForm from './ArticleForm';
import { useRouter } from 'next/navigation';
import { useArticleFormStore } from '@/hooks/useArticleFormStore';
export default function PostArticleForm() {
  const [redirectTime, setRedirectTime] = useState(3);
  const [successAlert, setSuccessAlert] = useState('');
  const [initializing, setInitializing] = useState(true)
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false);
  const [editorInstace, setEditorInstace] = useState<Editor | null>(null)
  const router = useRouter()
  const { clearArticleData } = useArticleFormStore()
  useEffect(() => {
    clearArticleData()
    setInitializing(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (redirectTime === 0 && successAlert) {
      router.push('/')
    }
  }, [redirectTime, successAlert, router])



  const postArticle = async ({ title, description, content, coverimage, tags }:
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
    formData.append('title', title);
    formData.append('content', content);
    formData.append('description', description);
    formData.append('file', coverimage || '');
    formData.append('tags', tags);
    formData.append('slug', title.toLocaleLowerCase().split(' ').join('-'));
    try {
      const res = await fetch('/api/article', {
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
        setErrorMessage(data.message || 'Unable to Save Article')
      }
      setSuccessAlert('Article saved successfully!');
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
    <div className="relative min-h-screen max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 bg-white rounded-xl shadow-md">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 rounded-xl px-4">
          <Spinner size="large" className="text-violet-600" />
        </div>
      )}

      {successAlert && (
        <SaveArticleAlert
          redirectTime={redirectTime}
          message={successAlert}
        />
      )}
      {errorMessage && (
        <ErrorAlert
          message={errorMessage}
          setError={setErrorMessage}
        />
      )}

      <div className="mb-6">
        <Button
          onClick={() => setShowDialog(true)}
          className="bg-violet-600 hover:bg-violet-700 text-white rounded px-4 py-2 shadow w-full sm:w-auto"
        >
          ✨ Generate Article with AI
        </Button>
        {showDialog && (
          <PromptDialogue
            editorInstace={editorInstace}
            showDialog={showDialog}
            setShowDialog={setShowDialog}
          />
        )}
      </div>

      <ArticleForm
        loading={loading}
        articleAction={postArticle}
        articleVariant="Save"
        setEditorInstace={setEditorInstace}
      />
    </div>
  );

}
