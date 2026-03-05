'use client';

import React, { FC } from 'react';
import type { BlogPost } from './data';

interface BlogPageProps {
  post: BlogPost;
}

const BlogPage: FC<BlogPageProps> = ({ post }) => {
  // Accent color – we can use a consistent brand color, e.g., deep blue
  const accentColor = '#3B4C6B'; // or from props if you want per‑post colors
  const accentColorRgb = '59, 76, 107';

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
        <section className="relative bg-gradient-to-br from-[#020814] to-[#0F1A2F] text-white overflow-hidden">
          {/* Background pattern (subtle) */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="blog-grid" patternUnits="userSpaceOnUse" width="40" height="40">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#blog-grid)" />
            </svg>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left column: text */}
              <div className="space-y-6 animate-fade-up">
                {/* Breadcrumb / tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{ backgroundColor: `rgba(${accentColorRgb}, 0.15)`, color: '#B3C7E5' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight font-serif">
                  {post.title}
                </h1>

                <p className="text-lg text-gray-300 max-w-lg">
                  {post.excerpt}
                </p>

                {/* Author and meta */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-xl">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{post.author}</p>
                    {post.authorTitle && (
                      <p className="text-sm text-gray-400">{post.authorTitle}</p>
                    )}
                    <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                      <span>{new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span>·</span>
                      <span>{post.readTimeMinutes} min read</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column: SBG Visual Placeholder */}
              <div className="relative animate-fade-up animation-delay-200">
                <div
                  className="w-full aspect-[4/3] rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center shadow-2xl"
                  style={{ background: `linear-gradient(145deg, #1E2A3A, #0F1A2F)` }}
                >
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 font-mono text-sm">SBG Visual Placeholder</p>
                    <p className="text-gray-700 text-xs mt-2">{post.featuredImagePlaceholder || 'Image'}</p>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg prose-headings:font-serif prose-a:text-blue-600 max-w-none">
            {/* Render content with line breaks – if content is HTML, use dangerouslySetInnerHTML */}
            {post.content.split('\n').map((paragraph, idx) =>
              paragraph.trim() ? (
                <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ) : null
            )}
          </div>

          {/* Optional share / footer */}
          <hr className="my-12 border-gray-200" />
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Published by {post.author}</span>
            <div className="flex gap-4">
              {/* Placeholder for social share icons */}
              <button className="hover:text-blue-600 transition">Share on LinkedIn</button>
              <button className="hover:text-blue-600 transition">Share on Twitter</button>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export default BlogPage;