// app/blog/[slug]/blog.tsx
'use client';

import React, { FC } from 'react';
import type { PublicBlogPost } from '@/services/blog.service';

interface BlogPageProps {
  post: PublicBlogPost;
}

const BlogPage: FC<BlogPageProps> = ({ post }) => {
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* Force deep-blue body text inside published blog content,
           overriding any inline styles baked in by the editor on save. */
        .blog-article-content,
        .blog-article-content p,
        .blog-article-content li,
        .blog-article-content td,
        .blog-article-content th,
        .blog-article-content span,
        .blog-article-content strong,
        .blog-article-content em,
        .blog-article-content blockquote,
        .blog-article-content h1,
        .blog-article-content h2,
        .blog-article-content h3,
        .blog-article-content h4 {
          color: #0A1E3D !important;
        }

        /* Force distinct heading sizes inside published blog content,
           overriding any inline font-size styles baked in by the editor
           on save (this is why H1–H4 were all rendering identically). */
        .blog-article-content h1 {
          font-size: 2.25rem !important;   /* ~36px */
          line-height: 1.2 !important;
          font-weight: 700 !important;
          margin-top: 2rem !important;
          margin-bottom: 1rem !important;
        }
        .blog-article-content h2 {
          font-size: 1.875rem !important;  /* ~30px */
          line-height: 1.25 !important;
          font-weight: 700 !important;
          margin-top: 1.75rem !important;
          margin-bottom: 0.875rem !important;
        }
        .blog-article-content h3 {
          font-size: 1.5rem !important;    /* ~24px */
          line-height: 1.3 !important;
          font-weight: 600 !important;
          margin-top: 1.5rem !important;
          margin-bottom: 0.75rem !important;
        }
        .blog-article-content h4 {
          font-size: 1.25rem !important;   /* ~20px */
          line-height: 1.35 !important;
          font-weight: 600 !important;
          margin-top: 1.25rem !important;
          margin-bottom: 0.625rem !important;
        }

        /* Rounded corners for every image inside the published blog content,
           matching the rounded-md treatment used on the hero cover image. */
        .blog-article-content img {
          border-radius: 0.5rem !important; /* ~8px, tweak to match rounded-md/rounded-lg as needed */
          overflow: hidden;
          display: block;
          max-width: 100%;
          height: auto;
        }
      `}</style>

      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-[#0A1E3D] text-white overflow-hidden">
          {/* Background pattern (subtle) — straight diagonal lines, not a grid.
              Spacing between lines is controlled by the pattern's width/height
              (currently 40); we'll adjust that value later to taste. */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="blog-grid"
                  patternUnits="userSpaceOnUse"
                  width="5"
                  height="5"
                  patternTransform="rotate(45)"
                >
                  <line x1="0" y1="0" x2="0" y2="40" stroke="#dcecff" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#blog-grid)" />
            </svg>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left column: text */}
              <div className="space-y-6 animate-fade-up">
                {/* Category tag — was a `tags` array in the old data, is a single
                    `tag` string from the real backend */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium px-3 py-1 rounded-md bg-blue-100 text-blue-800">
                    {post.tag}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl   text-white">
                  {post.title}
                </h1>

                <p className="text-lg text-gray-300 max-w-lg">
                  {post.excerpt}
                </p>

                {/* Author and meta */}
                <div className="flex items-center gap-4 pt-4">
                  {post.authorImageUrl ? (
                    <img
                      src={post.authorImageUrl}
                      alt={post.authorName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#132B47] flex items-center justify-center text-white font-bold text-xl">
                      {post.authorName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-white">{post.authorName}</p>
                    {post.authorTitle && (
                      <p className="text-sm text-gray-400">{post.authorTitle}</p>
                    )}
                    <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                      <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span>·</span>
                      <span>{post.readTimeMinutes} min read</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column: real cover image, replacing the old placeholder box
                  now that the admin dashboard actually uploads one */}
              <div className="relative animate-fade-up animation-delay-200">
                <div className="w-full aspect-[4/3] rounded-md overflow-hidden border border-blue-900/30 shadow-2xl">
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/*
            Confirmed via blog.constants.ts (SANITIZE_ALLOWED_TAGS: p, h2-h4,
            table, img, etc.) — content is sanitized HTML, already cleaned
            server-side on every save. Safe to render directly; nothing
            outside that allowlist can have survived sanitizeContent().
          */}
          <div
            className="blog-article-content prose prose-lg prose-headings:font-serif prose-headings:text-[#0A1E3D] prose-p:text-[#0A1E3D] prose-li:text-[#0A1E3D] prose-a:text-blue-600 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.authorBio && (
            <>
              <hr className="my-12 border-gray-200" />
              <div className="flex items-start gap-4">
                {post.authorImageUrl && (
                  <img
                    src={post.authorImageUrl}
                    alt={post.authorName}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-800">{post.authorName}</p>
                  <p className="text-sm text-gray-600 mt-1">{post.authorBio}</p>
                </div>
              </div>
            </>
          )}

          {/* Copyright / license notice */}
          <hr className="my-12 border-gray-200" />
          <div className="text-sm text-gray-500 leading-relaxed">
            <p>All rights reserved by Sarsen Partners.</p>
            <p>
              This content may be shared or used under a Creative Commons
              Attribution license — reuse is welcome with credit to Sarsen
              Partners. Sharing this article directly via its link does not
              require additional attribution.
            </p>
          </div>
        </article>
      </main>
    </>
  );
};

export default BlogPage;