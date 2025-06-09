'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import type { SetStateAction } from 'react';
import type { Dispatch } from 'react';
import { Spinner } from './ui/spinner';

import type { Editor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { useArticleFormStore } from '@/hooks/useArticleFormStore';
interface PromptDialogueProps {

    setShowDialog: Dispatch<SetStateAction<boolean>>;
    showDialog: boolean;
    editorInstace: Editor | null
}
const PromptDialogue = ({ editorInstace, setShowDialog, showDialog }: PromptDialogueProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState('')
    const [isGenerating, setIsGenerating] = useState(false);
    const [prompt, setPrompt] = useState('');
    const router = useRouter()
    const { articleData, setArticleData } = useArticleFormStore()
    useEffect(() => {
        if (showDialog && inputRef.current) {
            inputRef.current.focus();
            setError('')
        }
    }, [showDialog])
    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value)
        if (error) setError('')

    }
    const handleArticleGeneration = async () => {
        if (!prompt) return setError('Prompt can not be empty!')
 
        setIsGenerating(true)
        setError('')
        try {
            const res = await fetch('/api/article/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt })
            })
            if (res.status == 401) {
                router.push('/login')
                return
            }
            if (!res.ok) {
                const data = await res.json()
                setError(data.message || 'Article Generation failed please try again later')
                setIsGenerating(false)
                return
            }

            const data = await res.json() as {
                title: string;
                description: string;
                tags: string;
                content: string;
            }
            const updatedValue = { ...articleData, title: data.title, description: data.description, tags: data.tags, content: data.content }
            setArticleData(updatedValue)
         
            setIsGenerating(false)
            if (editorInstace) {
                editorInstace.commands.setContent(data.content)
            }

        } catch {
            setError('Something went wrong!')
            setIsGenerating(false)
        }


    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold text-violet-700 mb-4">Generate Article</h2>

                <Input
                    type="text"
                    ref={inputRef}
                    placeholder="Enter your prompt, e.g. 'Write an article about AI in healthcare'"
                    value={prompt}
                    onChange={handlePromptChange}
                    disabled={isGenerating}
                    className="mb-4 rounded border-gray-300 shadow-sm focus:ring-violet-500 focus:border-violet-500"
                />
                {error && (
                    <div className="text-sm text-red-600 mb-2">{error}</div>
                )}
                <div className="flex justify-end gap-2">
                    <Button variant="outline"
                        disabled={isGenerating}
                        onClick={() => {
                            setPrompt('')
                            setShowDialog(false)
                        }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleArticleGeneration}
                        disabled={isGenerating}
                        className="bg-violet-600 hover:bg-violet-700 text-white rounded px-6 py-2 shadow"
                    >
                        {isGenerating ? (
                            <div className="flex items-center gap-2">
                                <Spinner size="small" /> Generating...
                            </div>
                        ) : (
                            'Generate'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PromptDialogue;
