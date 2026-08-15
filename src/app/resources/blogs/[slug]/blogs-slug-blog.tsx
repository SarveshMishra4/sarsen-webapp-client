// resources/blogs/[slug]/blog.tsx
//
// Pure rendering component, no client-side state needed, so this stays a
// server component (no 'use client') for a faster page.
//
// Changes from the original static mock:
//   - cover image, author image now render real Cloudinary URLs
//   - content is sanitized HTML from the backend (dangerouslySetInnerHTML),
//     not a naive split-on-newline of plain text
//   - any <table> in that HTML gets wrapped in a horizontally-scrollable
//     container so wide tables don't break mobile layout
//   - keyword chips added (visible tags beyond the one colored badge)
//   - gallery section added, only rendered if images[] is non-empty
//   - report card added, only rendered if `report` is present
//   - no commenting section — never was one, never will be, per the spec

import React from 'react';

interface BlogImage {
  url: string;
  altText?: string;
  order: number;
}

interface BlogReport {
  mockupImageUrl: string;
  name: string;
  description: string;
  authors: string[];
  releaseDate: string;
}

interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  keywords: string[];
  coverImageUrl: string;
  authorName: string;
  authorTitle?: string;
  authorImageUrl?: string;
  publishedAt?: string;
  readTimeMinutes: number;
  images: BlogImage[];
  report?: BlogReport;
}

interface BlogDetailProps {
  post: BlogPost;
}

// Wraps every <table>...</table> block in the sanitized HTML with a
// horizontally-scrollable div, so wide tables scroll instead of breaking
// the mobile layout. Safe here because `content` has already been through
// server-side sanitize-html — this is a presentation wrapper, not a trust
// boundary.
function wrapTablesForScroll(html: string): string {
  return html.replace(
    /<table[\s\S]*?<\/table>/g,
    match => `<div class="overflow-x-auto my-6">${match}</div>`
  );
}

export default function BlogDetail({ post }: BlogDetailProps) {
  const processedContent = wrapTablesForScroll(post.content);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#0A1E3D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blog-grid" patternUnits="userSpaceOnUse" width="40" height="40">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#93C5FD" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blog-grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                  {post.tag}
                </span>
                {post.keywords?.map(kw => (
                  <span
                    key={kw}
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{ backgroundColor: 'rgba(147,197,253,0.12)', color: '#93C5FD', border: '1px solid rgba(147,197,253,0.2)' }}
                  >
                    {kw}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white">{post.title}</h1>

              <p className="text-lg text-gray-300 max-w-lg">{post.excerpt}</p>

              <div className="flex items-center gap-4 pt-4">
                {post.authorImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.authorImageUrl} alt={post.authorName} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#132B47] flex items-center justify-center text-white font-bold text-xl">
                    {post.authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-medium text-white">{post.authorName}</p>
                  {post.authorTitle && <p className="text-sm text-gray-400">{post.authorTitle}</p>}
                  <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                    {post.publishedAt && (
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    )}
                    <span>·</span>
                    <span>{post.readTimeMinutes} min read</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-full aspect-[4/3] rounded-md overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className="prose prose-lg prose-headings:font-serif prose-a:text-blue-600 max-w-none
                     [&_table]:border-collapse [&_table]:w-full
                     [&_td]:border [&_td]:border-gray-300 [&_td]:px-3 [&_td]:py-2
                     [&_th]:border [&_th]:border-gray-300 [&_th]:px-3 [&_th]:py-2 [&_th]:bg-gray-100"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />

        {/* Gallery — only if images exist */}
        {post.images && post.images.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...post.images]
                .sort((a, b) => a.order - b.order)
                .map((img, idx) => (
                  <div key={img.url + idx} className="aspect-square rounded-md overflow-hidden border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.altText || `${post.title} — image ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Report card — only if a report is attached */}
        {post.report && (
          <div className="mt-12 rounded-md overflow-hidden" style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.15)' }}>
            <div className="grid sm:grid-cols-[160px_1fr] gap-6 p-6">
              <div className="w-full aspect-[3/4] rounded-md overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.report.mockupImageUrl} alt={post.report.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xs font-medium text-blue-300 mb-2">Related Report</p>
                <h4 className="text-lg font-medium text-white mb-2">{post.report.name}</h4>
                <p className="text-sm text-gray-400 mb-3">{post.report.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{post.report.authors.join(', ')}</span>
                  <span>·</span>
                  <span>{new Date(post.report.releaseDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer — no comments, per spec */}
        <hr className="my-12 border-gray-200" />
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Published by {post.authorName}</span>
          <div className="flex gap-4">
            <button className="hover:text-[#0A1E3D] transition">Share on LinkedIn</button>
            <button className="hover:text-[#0A1E3D] transition">Share on Twitter</button>
          </div>
        </div>
      </article>
    </main>
  );
}
