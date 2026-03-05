'use client';

// =============================================================
// src/app/resources/cohorts/[slug]/page.tsx
//
// Individual cohort page.
// Reads cohort by slug from data.ts.
// Clicking "Apply Now" opens CohortApplicationModal with
// this cohort's unique questions.
// =============================================================

import React, { useState, FC, use } from 'react';
import { notFound } from 'next/navigation';
import { getCohortBySlug, getTagStyle, type Cohort } from './data';
import CohortApplicationModal from './cohort';

// ─────────────────────────────────────────────────────────────
// NEXT.JS PAGE PROPS
// ─────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ─────────────────────────────────────────────────────────────
// SMALL HELPER COMPONENTS
// ─────────────────────────────────────────────────────────────

const SeatsUrgencyPill: FC<{ seats: string }> = ({ seats }) => {
  const num = parseInt(seats);
  const urgent = !isNaN(num) && num <= 8;
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: urgent ? '#DBEAFE' : '#F3F4F6',
        color: urgent ? '#1E40AF' : '#4B5563',
        border: `1px solid ${urgent ? '#93C5FD' : '#E5E7EB'}`,
      }}
    >
      {urgent && '🔥 '}{seats}
    </span>
  );
};

const MetaRow: FC<{ icon: React.ReactNode; label: string; value: string }> = ({
  icon, label, value,
}) => (
  <div className="flex items-start gap-3">
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
      style={{ backgroundColor: '#EFF6FF' }}
    >
      {icon}
    </div>
    <div>
      <p className="text-xs tracking-widest uppercase text-gray-500">{label}</p>
      <p className="text-sm font-medium mt-0.5 text-gray-900">{value}</p>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────

export default function CohortPage({ params }: PageProps) {
  // Unwrap the params Promise
  const { slug } = use(params);
  const cohort = getCohortBySlug(slug);

  // 404 if slug doesn't match any cohort
  if (!cohort) notFound();

  const [modalOpen, setModalOpen] = useState(false);
  const tagStyle = getTagStyle(cohort.tag);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        *::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>

      <main className="min-h-screen bg-white">
        {/* ── HERO ──────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-16"
          style={{ backgroundColor: '#0A1E3D' }}
        >
          {/* Background texture */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
              <defs>
                <pattern id="dots" patternUnits="userSpaceOnUse" width="24" height="24">
                  <circle cx="2" cy="2" r="1" fill="#93C5FD" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
            <div
              className="absolute -top-32 right-0 w-[700px] h-[600px]"
              style={{ background: 'radial-gradient(ellipse at top right, rgba(59,130,246,0.22) 0%, transparent 60%)' }}
            />
          </div>

          <div
            className="max-w-4xl mx-auto relative"
            style={{ animation: 'fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both' }}
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8 text-xs text-gray-400">
              <a href="/cohorts" className="hover:text-white transition-colors">
                Cohorts
              </a>
              <span className="text-gray-600">/</span>
              <span className="text-blue-300">{cohort.cohortNumber}</span>
            </nav>

            {/* Tags row */}
            <div className="flex items-center gap-3 flex-wrap mb-6">
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
              >
                {cohort.tag}
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs"
                style={{
                  backgroundColor: 'rgba(59,130,246,0.08)',
                  color: '#93C5FD',
                  border: '1px solid rgba(59,130,246,0.14)',
                }}
              >
                {cohort.cohortNumber}
              </span>
              <SeatsUrgencyPill seats={cohort.seats} />
            </div>

            {/* Title */}
            <h1
              className="font-light leading-tight mb-4 text-white"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              {cohort.title}
            </h1>

            {/* Outcome */}
            <p className="text-base font-medium mb-6 text-blue-300">
              ✦ {cohort.outcome}
            </p>

            {/* Excerpt */}
            <p className="text-base leading-relaxed mb-10 max-w-2xl text-gray-400">
              {cohort.excerpt}
            </p>

            {/* CTA buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ backgroundColor: '#0A1E3D', color: '#ffffff', border: '1px solid rgba(59,130,246,0.3)' }}
              >
                Apply for {cohort.cohortNumber}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <span className="text-sm font-medium text-blue-300">
                {cohort.priceDisplay}
              </span>
            </div>
          </div>
        </section>

        {/* ── DETAIL GRID ───────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {/* Start date */}
            <MetaRow
              icon={
                <svg className="w-4 h-4" fill="none" stroke="#3B82F6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              label="Starts"
              value={cohort.startDate}
            />
            {/* Duration */}
            <MetaRow
              icon={
                <svg className="w-4 h-4" fill="none" stroke="#3B82F6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label="Duration"
              value={cohort.duration}
            />
            {/* Format */}
            <MetaRow
              icon={
                <svg className="w-4 h-4" fill="none" stroke="#3B82F6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              }
              label="Format"
              value={cohort.format}
            />
            {/* Sector */}
            <MetaRow
              icon={
                <svg className="w-4 h-4" fill="none" stroke="#3B82F6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              label="Sector"
              value={cohort.sector}
            />
            {/* Seats */}
            <MetaRow
              icon={
                <svg className="w-4 h-4" fill="none" stroke="#3B82F6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              label="Availability"
              value={cohort.seats}
            />
            {/* Fee */}
            <MetaRow
              icon={
                <svg className="w-4 h-4" fill="none" stroke="#3B82F6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label="Programme Fee"
              value={cohort.priceDisplay}
            />
          </div>

          {/* ── What you will work on ─────────────────────── */}
          <div
            className="rounded-2xl p-8 mb-8 bg-white border border-gray-200"
          >
            <h2 className="text-lg font-light mb-4 text-gray-900">
              What you will work on
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              {cohort.excerpt}
            </p>
          </div>

          {/* ── Application overview ─────────────────────── */}
          <div
            className="rounded-2xl p-8 mb-12 bg-white border border-gray-200"
          >
            <h2 className="text-lg font-light mb-6 text-gray-900">
              Application process
            </h2>
            <div className="space-y-4">
              {cohort.applicationSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold bg-blue-100 text-blue-800"
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {step.stepTitle}
                    </p>
                    {step.stepSubtitle && (
                      <p className="text-xs mt-0.5 text-gray-500">
                        {step.stepSubtitle}
                      </p>
                    )}
                    <p className="text-xs mt-1 text-gray-400">
                      {step.fields.length} question{step.fields.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              ))}
              {/* Coupon + Pay step */}
              <div className="flex items-start gap-4">
                <div
                  className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold bg-blue-100 text-blue-800"
                >
                  {cohort.applicationSteps.length + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Review &amp; Payment
                  </p>
                  <p className="text-xs mt-0.5 text-gray-500">
                    Apply a coupon code if you have one, then complete payment via Razorpay.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sticky bottom CTA ────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div>
              <p className="text-xl font-light text-gray-900">
                {cohort.priceDisplay}
              </p>
              <p className="text-xs mt-0.5 text-gray-500">
                {cohort.seats} · {cohort.startDate}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{ backgroundColor: '#0A1E3D', color: '#ffffff' }}
            >
              Apply for {cohort.cohortNumber}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

        </section>
      </main>

      {/* Application modal — uses this cohort's unique questions */}
      <CohortApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        cohort={cohort}
      />
    </>
  );
}