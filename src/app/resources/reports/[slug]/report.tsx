'use client';

import React, { FC, useState, useEffect } from 'react';
import type { Report } from './data';
import ReportAuthModal from './modal';

interface ReportPageProps {
  report: Report;
}

const ReportPage: FC<ReportPageProps> = ({ report }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  // ---------- Safe defaults ----------
  const tags = Array.isArray(report?.tags) ? report.tags : [];
  const contentSections = Array.isArray(report?.contentSections)
    ? report.contentSections
    : [];
  const whatItDoesntCover = Array.isArray(report?.whatItDoesntCover)
    ? report.whatItDoesntCover
    : [];
  const pdfUrl = typeof report?.pdfUrl === 'string' ? report.pdfUrl : '';
  const title = report?.title ?? '';
  const subtitle = report?.subtitle ?? '';
  const description = report?.description ?? '';
  const pages = report?.pages ?? 0;
  const fileSize = report?.fileSize ?? '';
  const publishDate = report?.publishDate ?? '';
  const featuredImagePlaceholder = report?.featuredImagePlaceholder ?? '';

  const formattedPublishDate = publishDate
    ? new Date(publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  // Debug log
  useEffect(() => {
    console.log('Report data:', report);
    console.log('Content sections:', contentSections);
  }, [report, contentSections]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleAuthSuccess = () => {
    if (!pdfUrl) return;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfUrl.split('/').pop() || 'report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadTriggered(true);
    setTimeout(() => {
      closeModal();
      setDownloadTriggered(false);
    }, 1500);
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
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              <defs>
                <pattern id="report-grid" patternUnits="userSpaceOnUse" width="40" height="40">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#93C5FD" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#report-grid)" />
            </svg>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left column */}
              <div className="space-y-6 animate-fade-up">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white">
                  {title}
                </h1>

                <p className="text-xl text-blue-300 font-light">
                  {subtitle}
                </p>

                <p className="text-base text-gray-400 max-w-xl">
                  {description}
                </p>

                <div className="flex items-center gap-6 text-sm text-gray-400 pt-2">
                  <span>{pages} pages</span>
                  <span>•</span>
                  <span>{fileSize}</span>
                  <span>•</span>
                  {formattedPublishDate && (
                    <span>Published {formattedPublishDate}</span>
                  )}
                </div>

                <button
                  onClick={openModal}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-md border border-white  hover:bg-white text-white hover:text-[#0A1E3D] font-medium transition-all shadow-lg hover:shadow-xl"
                >
                  Download Report
                </button>
              </div>

              {/* Right column */}
              <div className="relative animate-fade-up-delay-1">
                <div
                  className="w-full aspect-[4/3] rounded-md bg-[#132B47] border border-blue-900/30 flex items-center justify-center shadow-2xl"
                >
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-blue-400/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.105-1.79L9 2m0 0l5.447 2.724A2 2 0 0116 6.618v8.764a2 2 0 01-1.105 1.79L9 20m0 0V2" />
                    </svg>
                    <p className="text-blue-300/50 font-mono text-sm">SBG Visual Placeholder</p>
                    <p className="text-blue-400/30 text-xs mt-2">{featuredImagePlaceholder}</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {contentSections.map((section, idx) => (
            <section
              key={idx}
              className={`mb-10 ${
                idx === 0 ? 'animate-fade-up-delay-1' : 'animate-fade-up-delay-2'
              }`}
            >
              <h2 className="text-2xl font-medium mb-4 text-gray-900">
                {section.heading}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.text}
              </p>
            </section>
          ))}

          
        </article>
      </main>

      <ReportAuthModal
        isOpen={modalOpen}
        onClose={closeModal}
        resourceTitle={title}
        pdfUrl={pdfUrl}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default ReportPage;