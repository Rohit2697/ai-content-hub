'use client';

import { useArticleFormStore } from "@/hooks/useArticleFormStore";
import { Editor } from "@tiptap/react";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";
import PreviewArticle from "./PreviewArticle";
import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import TiptapEditor from "./TiptapEditor";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";


interface ArticleFormProps {
    setRedirectTime: Dispatch<SetStateAction<number>>;
    setSuccessAlert: Dispatch<SetStateAction<boolean>>;
    setErrorMessage: Dispatch<SetStateAction<string>>;
    setEditorInstace: Dispatch<SetStateAction<Editor | null>>
    setLoading: Dispatch<SetStateAction<boolean>>
    loading: boolean
}
export default function ArticleForm({ loading, setLoading, setSuccessAlert, setErrorMessage, setEditorInstace, setRedirectTime }: ArticleFormProps) {
    const { articleData, setArticleData } = useArticleFormStore()
    const [preview, setPreview] = useState(false)

    const router = useRouter()
    const onChangeContent = (post: string) => {
        setArticleData({ ...articleData, content: post })
    };
    const handleEditorReady = useCallback((editor: Editor) => {
        setEditorInstace(editor)
    }, [])

    const onChangeImageLink = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const url = URL.createObjectURL(e.target.files?.[0]);
            setArticleData({ ...articleData, imageUrl: url, coverimage: e.target.files?.[0] })
        }
    };

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setArticleData({ ...articleData, title: e.target.value })
    };

    const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setArticleData({ ...articleData, description: e.target.value })
    };

    const onChangetags = (e: ChangeEvent<HTMLInputElement>) => {
        setArticleData({ ...articleData, tags: e.target.value })
    };

    const onPreviewClick = () => {
        // setPreviewProps({ title, slug, description, content, tags, coverImage: imageUrl, setPreview });
        setPreview(true);
    };

    const postArticle = async () => {
        setLoading(true)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (!articleData.title || !articleData.content || !articleData.description) {
            setLoading(false)
            setErrorMessage('Required Fields are Missing');

            return;
        }
        const formData = new FormData();
        formData.append('title', articleData.title);
        formData.append('content', articleData.content);
        formData.append('description', articleData.description);
        formData.append('file', articleData.coverimage || '');
        formData.append('tags', articleData.tags);
        formData.append('slug', articleData.title.toLocaleLowerCase().split(' ').join('-'));
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
            setSuccessAlert(true);
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

    if (preview) {
        return <PreviewArticle setPreview={setPreview} />
    }
    return (<div className={cn("space-y-6 ", loading ? "opacity-50 pointer-events-none" : "opacity-100")}>
        <div>
            <label htmlFor="image-link" className="block text-lg font-semibold text-violet-700 mb-2">
                Choose Cover Image
            </label>
            <input
                id="image-link"
                type="file"
                onChange={onChangeImageLink}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 text-gray-500"
            />
        </div>

        {articleData.imageUrl && (
            <Image
                src={articleData.imageUrl}
                alt={articleData.coverimage?.name || 'Preview Image'}
                className="w-full rounded-lg"
                width={800}
                height={400}
            />
        )}

        <div>
            <Label htmlFor="tags" className="text-lg font-semibold text-violet-700">Tags</Label>
            <Input
                id="tags"
                placeholder="Provide tags separated by ','"
                className="rounded border-gray-300 shadow-sm focus:ring-violet-500 focus:border-violet-500"
                onChange={onChangetags}
                value={articleData.tags}
            />
        </div>

        <div>
            <Label htmlFor="title" className="text-lg font-semibold text-violet-700">
                Title <span className="text-red-500">*</span>
            </Label>
            <Input
                id="title"
                placeholder="Enter post title"
                className="rounded border-gray-300 shadow-sm focus:ring-violet-500 focus:border-violet-500"
                onChange={onChangeTitle}
                value={articleData.title}
                required
            />
        </div>

        <div>
            <Label htmlFor="description" className="text-lg font-semibold text-violet-700">
                Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
                id="description"
                value={articleData.description}
                onChange={onChangeDescription}
                className="rounded border-gray-300 shadow-sm focus:ring-violet-500 focus:border-violet-500"
                placeholder="Enter description or generate using AI"
                required
            />
        </div>

        <div>
            <Label htmlFor="content" className="text-lg font-semibold text-violet-700">
                Content <span className="text-red-500">*</span>
            </Label>
            <div id="content" className="rounded border border-gray-300 p-2 focus-within:ring-2 focus-within:ring-violet-500">
                <TiptapEditor content={articleData.content} onChange={onChangeContent} onEditorReady={handleEditorReady} />
            </div>
        </div>

        <div className="flex gap-4 justify-end">
            <Button onClick={onPreviewClick} className="bg-violet-600 hover:bg-violet-700 text-white rounded px-6 py-2 shadow" variant="default">
                Preview
            </Button>
            <Button onClick={postArticle} className="bg-violet-600 hover:bg-violet-700 text-white rounded px-6 py-2 shadow" variant="default">
                Submit
            </Button>
        </div>
    </div>)
}