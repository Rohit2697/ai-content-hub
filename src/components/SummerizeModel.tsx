// components/SummarizerModal.tsx
'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';
import { useRouter } from 'next/navigation';

export default function SummarizerModal({ content, setError, article_id }: { article_id: string, content: string, setError: React.Dispatch<React.SetStateAction<string>> }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSummerizing, setIsSummerizing] = useState(false)
  const [summary, setSummary] = useState("")
  const router = useRouter()
  const handleSummerizing = async () => {
    setError('')
    if (summary) {
      setIsOpen(true)
      return
    }
    setIsSummerizing(true)
    //setSummary('')
    if (!content) {
      setError('Content is missing!')
      setIsSummerizing(false)
      return
    }
    try {
      const res = await fetch('/api/article/summary', {
        method: "POST",
        body: JSON.stringify({ content, article_id })
      })
      if (res.status == 401) {
        router.push('/login')
        return
      }
      if (!res.ok) {
        const data = await res.json()
        setError(data.message || 'Unable to generate Summary!')
        setIsSummerizing(false)
        return
      }
      const data = await res.json()

      setIsSummerizing(false)
      setSummary(data.summary.replace(/\\n/g, "\n"))
      setIsOpen(true)

    } catch {
      setError('Something Went Wrong!')
      setIsSummerizing(false)
      return
    }
  }

  return (
    <>
      <Button
        onClick={handleSummerizing}
        className="bg-violet-600 text-white px-4 py-2 rounded-md shadow hover:bg-violet-700 transition"
      >
        {isSummerizing ? (
          <div className="flex items-center gap-2">
            <Spinner size="small" /> Summarizing...
          </div>
        ) : (
          'Summarize Article'
        )}

      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative animate-fade-in">
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-violet-700 mb-4">
              Article Summary
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto p-4 bg-violet-50 rounded-md border border-violet-200">
              {summary}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
