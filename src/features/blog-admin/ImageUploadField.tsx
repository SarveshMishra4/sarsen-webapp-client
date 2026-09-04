'use client';

import React, { useRef, useState } from 'react';
import { uploadBlogImage } from '@/services/blog.service';

type UploadFolder = 'blog-covers' | 'blog-gallery' | 'blog-authors' | 'blog-reports';

interface SingleImageUploadProps {
  mode?: 'single';
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: UploadFolder;
  token: string;
}

interface MultiImageUploadProps {
  mode: 'multi';
  label: string;
  value: { url: string; altText?: string; order: number }[];
  onChange: (images: { url: string; altText?: string; order: number }[]) => void;
  folder: UploadFolder;
  token: string;
}

export function ImageUploadField(props: SingleImageUploadProps | MultiImageUploadProps) {
  const { label, folder, token } = props;
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError('');
    try {
      if (props.mode === 'multi') {
        const uploaded = await Promise.all(
          Array.from(files).map(file => uploadBlogImage(file, folder, token))
        );
        const newImages = uploaded.map((u, i) => ({
          url: u.url,
          order: props.value.length + i,
        }));
        props.onChange([...props.value, ...newImages]);
      } else {
        const result = await uploadBlogImage(files[0], folder, token);
        props.onChange(result.url);
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      {props.mode === 'multi' ? (
        <div className="space-y-3">
          {props.value.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {props.value.map((img, idx) => (
                <div
                  key={img.url + idx}
                  className="relative aspect-square rounded-md overflow-hidden border border-gray-200 group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.altText || ''} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => props.onChange(props.value.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="text-sm px-4 py-2 border border-dashed border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            {uploading ? 'Uploading…' : '+ Add gallery images'}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          {props.value ? (
            <div className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-200 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={props.value} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => props.onChange('')}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center px-2">
              No image
            </div>
          )}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="text-sm px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {uploading ? 'Uploading…' : props.value ? 'Replace image' : 'Upload image'}
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={props.mode === 'multi'}
        onChange={e => handleFiles(e.target.files)}
        className="hidden"
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}