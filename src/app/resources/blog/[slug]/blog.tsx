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
      `}</style>

      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-[#0A1E3D] text-white overflow-hidden">
          {/* Background pattern (subtle) */}
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
              {/* Left column: text */}
              <div className="space-y-6 animate-fade-up">
                {/* Category tag — was a `tags` array in the old data, is a single
                    `tag` string from the real backend */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800">
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
            className="prose prose-lg prose-headings:font-serif prose-a:text-blue-600 max-w-none"
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

          {/* Optional share / footer */}
          <hr className="my-12 border-gray-200" />
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Published by {post.authorName}</span>
            <div className="flex gap-4">
              {/* Placeholder for social share icons */}
              <button className="hover:text-[#0A1E3D] transition">Share on LinkedIn</button>
              <button className="hover:text-[#0A1E3D] transition">Share on Twitter</button>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export default BlogPage;