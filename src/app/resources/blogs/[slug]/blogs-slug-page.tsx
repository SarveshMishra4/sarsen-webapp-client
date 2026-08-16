// resources/blogs/[slug]/blog.tsx
//
// FINAL version — two-column "YouTube-style" layout. Article on the left,
// sticky sidebar on the right (Report card on top, Recommended Reading
// below it), running alongside the whole article and scrolling together.
// Author bio sits at the bottom of the LEFT column only, capped at the
// same reading width as the paragraphs above it — not stretched wide.
//
// Pure rendering component, no client-side state needed, so this stays a
// server component (no 'use client') for a faster page.

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

interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  coverImageUrl: string;
  tag: string;
  readTimeMinutes: number;
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
  authorBio?: string;
  publishedAt?: string;
  readTimeMinutes: number;
  images: BlogImage[];
  report?: BlogReport;
  relatedPosts?: RelatedPost[];
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
  const hasSidebar = !!post.report || !!(post.relatedPosts && post.relatedPosts.length > 0);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero — full-bleed masthead, widened to match the new page width */}
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

        <div className="relative max-w-[1560px] mx-auto px-6 sm:px-8 py-14 md:py-20">
          <div className="flex flex-wrap gap-2 mb-5">
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

          <h1 className="text-3xl md:text-5xl max-w-4xl mb-5 font-semibold">{post.title}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-6">{post.excerpt}</p>

          <div className="flex items-center gap-3">
            {post.authorImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.authorImageUrl} alt={post.authorName} className="w-11 h-11 rounded-full object-cover" />
            ) : (
              <div className="w-11 h-11 rounded-full bg-[#132B47] flex items-center justify-center font-bold">
                {post.authorName.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-medium text-sm">{post.authorName}</p>
              {post.authorTitle && <p className="text-xs text-gray-400">{post.authorTitle}</p>}
              <p className="text-xs text-gray-400">
                {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                {' · '}{post.readTimeMinutes} min read
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <div className="max-w-[1560px] mx-auto px-6 sm:px-8 -mt-8 relative z-10">
        <div className="w-full aspect-[21/9] rounded-md overflow-hidden shadow-2xl max-w-[900px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Two-column body: article left, sticky sidebar right */}
      <div className="max-w-[1560px] mx-auto px-6 sm:px-8 py-10 lg:py-16">
        <div className={hasSidebar ? 'grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-12 items-start' : ''}>

          {/* LEFT column — the article itself */}
          <div className="min-w-0">
            <div
              className="prose prose-lg max-w-[720px] prose-a:text-blue-600
                         [&_table]:border-collapse [&_table]:w-full
                         [&_td]:border [&_td]:border-gray-300 [&_td]:px-3 [&_td]:py-2
                         [&_th]:border [&_th]:border-gray-300 [&_th]:px-3 [&_th]:py-2 [&_th]:bg-gray-100
                         [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-[#0A1E3D]
                         [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[#0A1E3D]
                         [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-[#1E3A8A]
                         [&_img]:rounded-md [&_img]:my-8 [&_img]:w-full"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {post.images && post.images.length > 0 && (
              <div className="max-w-[720px] mt-10">
                <h3 className="text-base font-semibold text-gray-800 mb-3">Gallery</h3>
                <div className="grid grid-cols-3 gap-3">
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

            {/* Author bio — deliberately capped at the same reading width
                as the paragraphs above, NOT stretched to the full left column */}
            {post.authorBio && (
              <div className="max-w-[720px] mt-10 pt-7 border-t border-gray-200 flex gap-4 items-start">
                {post.authorImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.authorImageUrl}
                    alt={post.authorName}
                    className="rounded-full object-cover flex-shrink-0"
                    style={{ width: 52, height: 52 }}
                  />
                ) : (
                  <div
                    className="rounded-full bg-[#132B47] text-white flex items-center justify-center font-bold flex-shrink-0"
                    style={{ width: 52, height: 52 }}
                  >
                    {post.authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{post.authorName}</p>
                  {post.authorTitle && <p className="text-xs text-gray-500 mb-1.5">{post.authorTitle}</p>}
                  <p className="text-sm text-gray-600 max-w-md">{post.authorBio}</p>
                </div>
              </div>
            )}

            <div className="max-w-[720px] mt-6 pt-5 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
              <span>Published by {post.authorName}</span>
              <div className="flex gap-4">
                <button className="hover:text-[#0A1E3D] transition">Share on LinkedIn</button>
                <button className="hover:text-[#0A1E3D] transition">Share on Twitter</button>
              </div>
            </div>
          </div>

          {/* RIGHT column — sticky sidebar, report on top, recommendations
              below. Only rendered at all if there's actually something to
              show — otherwise the article stays a clean single column. */}
          {hasSidebar && (
            <div className="lg:sticky lg:top-6">
              {post.report && (
                <div className="rounded-lg overflow-hidden mb-7" style={{ backgroundColor: '#0A1E3D' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.report.mockupImageUrl} alt={post.report.name} className="w-full aspect-video object-cover" />
                  <div className="p-4">
                    <p className="text-[11px] font-semibold text-blue-300 uppercase tracking-wide mb-2">Related Report</p>
                    <p className="text-white font-semibold text-base mb-2 leading-snug">{post.report.name}</p>
                    <p className="text-gray-400 text-xs mb-2 leading-relaxed">{post.report.description}</p>
                    <p className="text-gray-500 text-xs">
                      {post.report.authors.join(', ')}
                      {' · '}
                      {new Date(post.report.releaseDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              )}

              {post.relatedPosts && post.relatedPosts.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">Recommended Reading</p>
                  <div className="divide-y divide-gray-100">
                    {post.relatedPosts.map(rp => (
                      <a key={rp._id} href={`/resources/blogs/${rp.slug}`} className="flex gap-3 py-3 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={rp.coverImageUrl} alt={rp.title} className="w-24 aspect-video rounded-md object-cover flex-shrink-0" />
                        <div>
                          <p className="text-[13px] font-medium text-gray-900 group-hover:text-blue-700 leading-snug">{rp.title}</p>
                          <p className="text-[11px] text-gray-400 mt-1">{rp.tag} · {rp.readTimeMinutes} min</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
