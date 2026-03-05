'use client';

import React, { FC } from 'react';
import type { CaseStudy } from './data';

interface CaseStudyPageProps {
  study: CaseStudy;
}

const CaseStudyPage: FC<CaseStudyPageProps> = ({ study }) => {
  // Helper to render paragraphs from a string (split by double newline or just newline)
  const renderParagraphs = (text: string) => {
    return text.split('\n').map((para, idx) => {
      const trimmed = para.trim();
      if (!trimmed) return null;
      // Check if it's a bullet point (starting with - or •)
      if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
        return (
          <li key={idx} className="ml-5 list-disc text-gray-700 mb-1">
            {trimmed.substring(1).trim()}
          </li>
        );
      }
      return (
        <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
          {trimmed}
        </p>
      );
    });
  };

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
        .animate-fade-up-delay-1 {
          animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
        }
        .animate-fade-up-delay-2 {
          animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
        }
      `}</style>

      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-[#0A1E3D] text-white overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              <defs>
                <pattern id="case-grid" patternUnits="userSpaceOnUse" width="40" height="40">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#93C5FD" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#case-grid)" />
            </svg>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left column: text */}
              <div className="space-y-6 animate-fade-up">
                {/* Client and industry chips */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800"
                  >
                    {study.industry}
                  </span>
                  {study.services.map(service => (
                    <span
                      key={service}
                      className="text-xs font-medium px-3 py-1 rounded-full border border-gray-600 text-gray-300"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white">
                  {study.title}
                </h1>

                <p className="text-xl text-blue-300 font-light">
                  {study.subtitle}
                </p>

                <p className="text-base text-gray-400">
                  <span className="font-medium text-white">Client:</span> {study.client}
                </p>
              </div>

              {/* Right column: SVG Visual Placeholder */}
              <div className="relative animate-fade-up-delay-1">
                <div
                  className="w-full aspect-[4/3] rounded-2xl bg-[#132B47] border border-blue-900/30 flex items-center justify-center shadow-2xl"
                >
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-blue-400/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.105-1.79L9 2m0 0l5.447 2.724A2 2 0 0116 6.618v8.764a2 2 0 01-1.105 1.79L9 20m0 0V2" />
                    </svg>
                    <p className="text-blue-300/50 font-mono text-sm">SBG Visual Placeholder</p>
                    <p className="text-blue-400/30 text-xs mt-2">{study.featuredImagePlaceholder}</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Challenge */}
          <section className="mb-12 animate-fade-up-delay-1">
            <h2 className="text-2xl font-medium mb-4 text-gray-900">The Challenge</h2>
            <div className="prose prose-lg text-gray-700">{renderParagraphs(study.challenge)}</div>
          </section>

          {/* Approach */}
          <section className="mb-12 animate-fade-up-delay-1">
            <h2 className="text-2xl font-medium mb-4 text-gray-900">Our Approach</h2>
            <div className="prose prose-lg text-gray-700">{renderParagraphs(study.approach)}</div>
          </section>

          {/* Solution */}
          <section className="mb-12 animate-fade-up-delay-2">
            <h2 className="text-2xl font-medium mb-4 text-gray-900">The Solution</h2>
            <div className="prose prose-lg text-gray-700">{renderParagraphs(study.solution)}</div>
          </section>

          {/* Results */}
          <section className="mb-12 animate-fade-up-delay-2">
            <h2 className="text-2xl font-medium mb-4 text-gray-900">Results</h2>
            <ul className="space-y-2">
              {study.results.map((result, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-800">{result}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Testimonial (if exists) */}
          {study.testimonial && (
            <section className="mb-12 p-8 rounded-2xl bg-gray-50 border border-gray-200 animate-fade-up-delay-2">
              <svg className="w-8 h-8 text-gray-400 mb-2" fill="currentColor" viewBox="0 0 24 24">“</svg>
              <p className="text-lg italic text-gray-700 mb-4">{study.testimonial.quote}</p>
              <p className="font-medium text-gray-900">— {study.testimonial.author}</p>
              <p className="text-sm text-gray-500">{study.testimonial.authorTitle}</p>
            </section>
          )}

          {/* Related Insights (placeholder) */}
          {study.relatedInsights && study.relatedInsights.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Related insights:</p>
              <div className="flex flex-wrap gap-3">
                {study.relatedInsights.map(slug => (
                  <a
                    key={slug}
                    href={`/blog/${slug}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {slug.replace(/-/g, ' ')}
                  </a>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </>
  );
};

export default CaseStudyPage;