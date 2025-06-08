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
export default function PostArticleForm() {
  const [redirectTime, setRedirectTime] = useState(5);
  const [successAlert, setSuccessAlert] = useState(false);



  const [initializing, setInitializing] = useState(true)
  const [errorMessage, setErrorMessage] = useState('');

  const [loading, setLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false);

  const [editorInstace, setEditorInstace] = useState<Editor | null>(null)
  const router = useRouter()
  useEffect(() => {
    setInitializing(false)
  }, [])

  useEffect(() => {
    if (redirectTime === 0 && successAlert) {
      router.push('/')
    }
  }, [redirectTime, successAlert, router])



  if (initializing) {
    return (<div className="min-h-screen flex items-center justify-center bg-white">
      <Spinner size="large" className="text-violet-600" />
    </div>)
  }
  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-10 bg-white rounded-xl shadow-md">
      {loading && <div className="absolute inset-0 z-10 flex items-center justify-center  bg-opacity-60 rounded-xl">
        <Spinner size="large" className="text-violet-600" />
      </div>}
      {successAlert && <SaveArticleAlert redirectTime={redirectTime} />}
      {errorMessage && <ErrorAlert message={errorMessage} setError={setErrorMessage} />}
      <div className="mb-6">
        <Button
          onClick={() => setShowDialog(true)}
          className="bg-violet-600 hover:bg-violet-700 text-white rounded px-4 py-2 shadow"
        >
          ✨ Generate Article with AI
        </Button>
        {showDialog && <PromptDialogue
          editorInstace={editorInstace}
          showDialog={showDialog}
          setShowDialog={setShowDialog} />}
      </div>
      <ArticleForm
        loading={loading}
        setEditorInstace={setEditorInstace}
        setErrorMessage={setErrorMessage}
        setLoading={setLoading}
        setRedirectTime={setRedirectTime}
        setSuccessAlert={setSuccessAlert} />
    </div>
  );
}
