'use client';

// RichTextEditor.tsx
//
// Requires these packages:
//   npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link
//               @tiptap/extension-table @tiptap/extension-image
//
// Tiptap v3: Table, TableRow, TableCell and TableHeader are all
// named exports from @tiptap/extension-table.
//
// UPDATED: now exposes Heading (H2/H3/H4) and Insert Image buttons, on top
// of the original Bold/Link/Table. StarterKit already secretly includes
// heading support — it just wasn't exposed in the toolbar before. Image
// insertion is a genuinely new extension, and reuses the same
// uploadBlogImage() function ImageUploadField.tsx already uses, so there's
// only one upload code path in the whole app, not two.
//
// The backend sanitizer (blog.constants.ts SANITIZE_ALLOWED_TAGS) is the
// actual enforcement layer — this toolbar just keeps the admin from
// producing content types the public page doesn't know how to render.

import React, { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
} from '@tiptap/extension-table';
import { uploadBlogImage } from '@/services/blog.service';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  token: string; // needed for the Insert Image button's upload call
}

export function RichTextEditor({
  value,
  onChange,
  token,
}: RichTextEditorProps) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const imageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
        },
      }),
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    immediatelyRender: false,
  });

  // Sync external value changes (e.g. loading a post into the edit form)
  // without fighting the user's own typing.
  useEffect(() => {
    if (
      editor &&
      value !== editor.getHTML() &&
      !editor.isFocused
    ) {
      editor.commands.setContent(value || '');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt(
      'Enter URL (include https:// for external links):'
    );

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  };

  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({
        rows: 3,
        cols: 3,
        withHeaderRow: true,
      })
      .run();
  };

  const handleImageFile = async (file: File) => {
    setUploadingImage(true);
    setUploadError('');

    try {
      // Reuses the 'blog-gallery' Cloudinary folder — same folder already
      // used for the gallery upload field, no new folder/endpoint needed.
      const result = await uploadBlogImage(
        file,
        'blog-gallery',
        token
      );

      // Tiptap's Image node is block-level by default: wherever the cursor
      // is, it ends the current paragraph, drops the image on its own
      // line, and typing continues in a new paragraph below it. This is
      // what places the image "between paragraphs" rather than inline
      // mid-sentence.
      editor
        .chain()
        .focus()
        .setImage({
          src: result.url,
          alt: '',
        })
        .run();
    } catch (err: any) {
      setUploadError(
        err.message || 'Image upload failed'
      );
    } finally {
      setUploadingImage(false);

      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 px-3 py-2">
        <ToolbarButton
          active={editor.isActive('bold')}
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          label="Bold"
        >
          <strong>B</strong>
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive('heading', { level: 2 })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
          label="Heading 2 — major sections"
        >
          H2
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive('heading', { level: 3 })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 3 })
              .run()
          }
          label="Heading 3 — sub-sections"
        >
          H3
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive('heading', { level: 4 })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 4 })
              .run()
          }
          label="Heading 4 — fine detail"
        >
          H4
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive('link')}
          onClick={setLink}
          label="Insert link"
        >
          Link
        </ToolbarButton>

        <ToolbarButton
          onClick={insertTable}
          label="Insert table"
        >
          Table
        </ToolbarButton>

        {editor.isActive('table') && (
          <>
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().addRowAfter().run()
              }
              label="Add row"
            >
              +Row
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                editor.chain().focus().deleteRow().run()
              }
              label="Delete row"
            >
              −Row
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                editor.chain().focus().addColumnAfter().run()
              }
              label="Add column"
            >
              +Col
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                editor.chain().focus().deleteColumn().run()
              }
              label="Delete column"
            >
              −Col
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                editor.chain().focus().deleteTable().run()
              }
              label="Delete table"
            >
              Delete Table
            </ToolbarButton>
          </>
        )}

        <ToolbarButton
          onClick={() => imageInputRef.current?.click()}
          label="Insert image at cursor position"
        >
          {uploadingImage ? 'Uploading…' : 'Insert Image'}
        </ToolbarButton>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) =>
            e.target.files?.[0] &&
            handleImageFile(e.target.files[0])
          }
        />
      </div>

      {uploadError && (
        <p className="text-xs text-red-500 px-3 pt-2">
          {uploadError}
        </p>
      )}

      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none px-4 py-3 min-h-[240px] focus:outline-none
                   [&_.ProseMirror]:min-h-[220px] [&_.ProseMirror]:outline-none
                   [&_table]:border-collapse [&_td]:border [&_td]:border-gray-300 [&_td]:px-2 [&_td]:py-1
                   [&_th]:border [&_th]:border-gray-300 [&_th]:px-2 [&_th]:py-1 [&_th]:bg-gray-100
                   [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_h3]:font-semibold
                   [&_h4]:text-base [&_h4]:font-semibold
                   [&_img]:rounded [&_img]:my-3 [&_img]:max-w-full"
      />
    </div>
  );
}

function ToolbarButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
      }`}
    >
      {children}
    </button>
  );
}