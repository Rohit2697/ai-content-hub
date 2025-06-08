'use client';
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorMenu from './EditorMenu';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import CodeBlock from '@tiptap/extension-code-block';
import Placeholder from '@tiptap/extension-placeholder';
import type { Editor } from '@tiptap/react';

interface TipTapEditorProps {
  content: string;
  onChange: (post: string) => void;
  onEditorReady?: (editor: Editor) => void

}

export default function TiptapEditor({ content, onChange, onEditorReady }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: 'list-disc ml-5' } },
        orderedList: { HTMLAttributes: { class: 'list-decimal ml-5' } },
      }),
      Placeholder.configure({ placeholder: 'Write something …' }),
      CodeBlock.configure({ languageClassPrefix: 'language-' }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
    ],
    content,
    editorProps: {
      attributes: {
        class: `min-h-[300px] p-4 rounded-xl border border-violet-300 shadow-sm bg-white prose prose-sm sm:prose lg:prose-lg focus:outline-none`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content)
    }
  }, [editor, content])
  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor)
    }
  }, [editor, onEditorReady])

  return (
    <div className="mb-6">
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
