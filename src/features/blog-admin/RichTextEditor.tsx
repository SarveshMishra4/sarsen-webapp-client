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
//
// FIX: the editable area was rendering near-invisible (white-on-white)
// text with no real heading hierarchy — it was relying only on Tailwind's
// `prose` defaults, which get overridden by the admin dashboard's own
// (dark-themed) inherited text color, exactly like the public blog page
// bug. Same fix here: explicit `!important` color/size rules scoped to
// this editor's ProseMirror content, so admins can actually see what
// they're writing and headings read as a real hierarchy while editing —
// matching the H1–H4 scale used on the published post itself.

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
      {/* Scoped, high-specificity overrides for the editable area. These
          use !important because this editor sits inside a dashboard whose
          inherited text color is white — the same root cause as the
          public blog page needing forced colors — and because Tiptap's
          own ProseMirror styles otherwise win over plain Tailwind prose
          classes. */}
      <style>{`
        .rte-content .ProseMirror {
          color: #111827 !important; /* gray-900 */
        }
        .rte-content .ProseMirror p,
        .rte-content .ProseMirror li,
        .rte-content .ProseMirror td,
        .rte-content .ProseMirror th,
        .rte-content .ProseMirror span,
        .rte-content .ProseMirror strong,
        .rte-content .ProseMirror em,
        .rte-content .ProseMirror blockquote {
          color: #111827 !important;
        }
        .rte-content .ProseMirror h1,
        .rte-content .ProseMirror h2,
        .rte-content .ProseMirror h3,
        .rte-content .ProseMirror h4 {
          color: #0A1E3D !important;
          font-family: inherit;
        }

        /* Heading hierarchy that mirrors the published post's H1–H4 scale,
           so what the admin sees while writing matches what readers see. */
        .rte-content .ProseMirror h1 {
          font-size: 1.875rem !important; /* ~30px, scaled down from the
                                              public 36px hero size since
                                              this is an editing surface */
          line-height: 1.25 !important;
          font-weight: 700 !important;
          margin-top: 1.25rem !important;
          margin-bottom: 0.625rem !important;
        }
        .rte-content .ProseMirror h2 {
          font-size: 1.5rem !important;   /* ~24px */
          line-height: 1.3 !important;
          font-weight: 700 !important;
          margin-top: 1.1rem !important;
          margin-bottom: 0.55rem !important;
        }
        .rte-content .ProseMirror h3 {
          font-size: 1.25rem !important;  /* ~20px */
          line-height: 1.35 !important;
          font-weight: 600 !important;
          margin-top: 1rem !important;
          margin-bottom: 0.5rem !important;
        }
        .rte-content .ProseMirror h4 {
          font-size: 1.0625rem !important; /* ~17px */
          line-height: 1.4 !important;
          font-weight: 600 !important;
          margin-top: 0.875rem !important;
          margin-bottom: 0.4375rem !important;
        }

        .rte-content .ProseMirror p {
          font-size: 0.9375rem !important; /* ~15px, prose-sm baseline */
          line-height: 1.6 !important;
          margin-top: 0.5rem !important;
          margin-bottom: 0.5rem !important;
        }

        .rte-content .ProseMirror a {
          color: #2563eb !important; /* blue-600 */
          text-decoration: underline !important;
        }

        /* Rounded corners on inserted images, matching the radius used on
           the published post so the editor preview is representative. */
        .rte-content .ProseMirror img {
          border-radius: 0.5rem !important;
          display: block;
          max-width: 100%;
          height: auto;
          margin: 0.75rem 0 !important;
        }

        .rte-content .ProseMirror table {
          border-collapse: collapse !important;
        }
        .rte-content .ProseMirror td,
        .rte-content .ProseMirror th {
          border: 1px solid #d1d5db !important; /* gray-300 */
          padding: 0.25rem 0.5rem !important;
          color: #111827 !important;
        }
        .rte-content .ProseMirror th {
          background-color: #f3f4f6 !important; /* gray-100 */
          font-weight: 600 !important;
        }

        .rte-content .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #9ca3af !important; /* gray-400 */
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>

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
        className="rte-content prose prose-sm max-w-none px-4 py-3 min-h-[240px] focus:outline-none
                   [&_.ProseMirror]:min-h-[220px] [&_.ProseMirror]:outline-none"
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