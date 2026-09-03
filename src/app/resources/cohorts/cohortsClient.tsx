// app/cohorts/cohortsClient.tsx
'use client';

// =============================================================
// src/app/cohorts/cohortsClient.tsx
//
// Cohorts hub — lists all cohorts.
// On click, shows an interest modal instead of payment.
// All seat indicators removed.
// =============================================================

import React, { useState, FC } from 'react';
import {
  ALL_COHORTS,
  FEATURED_EVENT,
  ALL_TAGS,
  getTagStyle,
  type Cohort,
  type EventTeaser,
} from './[slug]/data';

// ─────────────────────────────────────────────────────────────
// COHORT INTEREST MODAL (replaces application modal)
// ─────────────────────────────────────────────────────────────

interface CohortInterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  cohortTitle: string;
}

const CohortInterestModal: FC<CohortInterestModalProps> = ({ isOpen, onClose, cohortTitle }) => {
  if (!isOpen) return null;

  const handleRequestInvite = () => {
    const subject = `Cohort Interest: ${cohortTitle}`;
    const body = `I am interested in the "${cohortTitle}" cohort. Please send me more details.`;
    window.location.href = `mailto:contact@sarsenpartners.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-md shadow-2xl overflow-hidden">
          {/* Modal Header */}
          <div className="bg-[#002855] px-8 py-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-blue-200 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8  flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-blue-200 text-sm font-medium ">Join a Cohort</span>
            </div>
            <h2 className="text-xl text-white">{cohortTitle}</h2>
          </div>

          {/* Modal Body */}
          <div className="px-8 py-8">
            <p className="text-gray-700 mb-6">
              If you want to participate in this cohort, please email us with the specification details at{' '}
              <a href="mailto:contact@sarsenpartners.com" className="text-blue-600 underline">
                contact@sarsenpartners.com
              </a>.
            </p>
            <button
              onClick={handleRequestInvite}
              className="w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Request Invite
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              We’ll respond within 5 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// HERO SECTION (unchanged except removed unused elements)
// ─────────────────────────────────────────────────────────────

const HeroSection: FC = () => (
  <section
    className="relative overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8"
    style={{ backgroundColor: '#0A1E3D', minHeight: '520px' }}
  >
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
        <defs>
          <pattern id="dots" patternUnits="userSpaceOnUse" width="24" height="24">
            <circle cx="2" cy="2" r="1" fill="#93C5FD" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <div
        className="absolute -top-32 right-0 w-[700px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(59,130,246,0.22) 0%, transparent 60%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(96,165,250,0.10) 0%, transparent 65%)' }}
      />
    </div>

    <div className="max-w-7xl mx-auto relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white">
              Build with a
              <span className="block text-blue-300">Cohort.</span>
            </h1>
            <p className="text-base sm:text-lg max-w-md text-gray-400">
              Structured programmes for founders at specific inflection points like Fundraising,
              Scaling, Sector-Specific Challenges. Peer Accountability, Expert Input, and Real
              Work Done in Real Time.
            </p>
          </div>
        </div>

        {/* RIGHT — visual */}
        <div
          className="relative hidden lg:flex items-center justify-end"
          style={{ height: '420px' }}
          aria-hidden="true"
        >
          <img src="/assets/resources/Cohorts Head.svg" alt="" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// TAG FILTER BAR — consistent blue palette, no per‑tag colours
// ─────────────────────────────────────────────────────────────

const TagFilterBar: FC<{ activeTag: string; onTagChange: (t: string) => void }> = ({
  activeTag, onTagChange,
}) => (
  <div
    className="flex gap-2 overflow-x-auto overflow-visible py-2"
    style={{ scrollbarWidth: 'none' } as React.CSSProperties}
    role="toolbar"
    aria-label="Filter cohorts by type"
  >
    {ALL_TAGS.map((tag) => {
      const isActive = tag === activeTag;
      return (
        <button
          key={tag}
          type="button"
          onClick={() => onTagChange(tag)}
          className="flex-shrink-0 px-4 py-2 rounded-md text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={
            isActive
              ? {
                  backgroundColor: '#132B47',   // dark blue
                  color: '#93C5FD',            // light blue
                  border: '1px solid rgba(59,130,246,0.40)',
                }
              : {
                  backgroundColor: '#DBEAFE',   // light blue
                  color: '#1E40AF',            // dark blue
                  border: '1px solid transparent',
                  opacity: 0.65,
                }
          }
          aria-pressed={isActive}
        >
          {tag}
        </button>
      );
    })}
  </div>
);

// ─────────────────────────────────────────────────────────────
// FEATURED COHORT CARD (no seat indicators)
// ─────────────────────────────────────────────────────────────

const FeaturedCohortCard: FC<{ cohort: Cohort; onOpen: (c: Cohort) => void }> = ({
  cohort, onOpen,
}) => {
  const ts = getTagStyle(cohort.tag);

  return (
    <article
      onClick={() => onOpen(cohort)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(cohort)}
      className="group cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.10)' }}
      aria-label={`Apply for cohort: ${cohort.title}`}
    >
      {/* Header gradient */}
      <div
        className="relative h-44 sm:h-52 px-8 sm:px-10 flex items-end pb-7 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #132B47 0%, #0A1E3D 65%)' }}
      >
        <div className="absolute inset-0 flex items-center justify-end pr-10" aria-hidden="true">
          {[3, 2, 1].map((l) => (
            <div
              key={l}
              className="absolute rounded-md"
              style={{
                width: `${80 + l * 20}px`, height: `${100 + l * 25}px`,
                right: `${20 + (3 - l) * 12}px`, top: '50%',
                transform: 'translateY(-50%)',
                border: `1px solid rgba(59,130,246,${0.05 * l})`,
                backgroundColor: `rgba(19,43,71,${0.04 * l})`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 flex items-center gap-3 flex-wrap">
          <span className="px-3 py-1 rounded-md text-xs font-semibold" style={{ backgroundColor: ts.bg, color: ts.text }}>
            {cohort.tag}
          </span>
          <span
            className="px-3 py-1 rounded-md text-xs font-medium"
            style={{ backgroundColor: 'rgba(59,130,246,0.08)', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.14)' }}
          >
            {cohort.cohortNumber}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 sm:px-10 py-6 sm:py-8">
        <h2
          className="mb-3 group-hover:text-blue-300 transition-colors duration-200 text-white"
          style={{ fontSize: 'clamp(1.1rem,2.5vw,1.6rem)' }}
        >
          {cohort.title}
        </h2>
        <p className="text-sm font-medium mb-4 text-blue-300">✦ {cohort.outcome}</p>
        <p className="text-sm mb-6 max-w-3xl text-gray-400">
          {cohort.excerpt}
        </p>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs text-blue-400">{cohort.startDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-gray-500">{cohort.duration}</span>
            </div>
            <span className="px-2.5 py-1 rounded-md text-xs bg-[#132B47] text-blue-300">
              {cohort.format}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium group-hover:gap-3 transition-all duration-200 text-blue-300">
            Request Invite
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
};

// ─────────────────────────────────────────────────────────────
// STANDARD COHORT CARD (no seat indicators)
// ─────────────────────────────────────────────────────────────

const CohortCard: FC<{ cohort: Cohort; onOpen: (c: Cohort) => void; animIndex: number }> = ({
  cohort, onOpen, animIndex,
}) => {
  const ts = getTagStyle(cohort.tag);

  return (
    <article
      onClick={() => onOpen(cohort)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(cohort)}
      className="group cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      style={{
        backgroundColor: '#0A1E3D',
        border: '1px solid rgba(59,130,246,0.08)',
        animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${animIndex * 45}ms both`,
      }}
      aria-label={`Apply for cohort: ${cohort.title}`}
    >
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${ts.text}35, transparent)` }} />

      {/* Header band */}
      <div
        className="relative h-28 px-5 flex items-end pb-4 overflow-hidden"
        style={{ background: 'linear-gradient(155deg, #132B47 0%, #0A1E3D 100%)' }}
      >
        <div className="absolute top-3 right-3 opacity-10" aria-hidden="true">
          <div className="w-10 h-12 rounded-md border border-blue-400" />
          <div className="w-10 h-12 rounded-md border border-blue-400 absolute top-1.5 left-1.5" />
        </div>
        <div className="relative z-10 flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold" style={{ backgroundColor: ts.bg, color: ts.text }}>
            {cohort.tag}
          </span>
        </div>
        <div className="absolute top-4 right-4 z-10 opacity-25 group-hover:opacity-70 transition-opacity" aria-hidden="true">
          
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <h3
          className="font-medium mb-1.5 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 text-white"
          style={{ fontSize: '0.9rem' }}
        >
          {cohort.title}
        </h3>
        <p className="text-xs font-medium mb-2 text-blue-300">✦ {cohort.outcome}</p>
        <p className="text-xs mb-4 line-clamp-2 text-gray-400">
          {cohort.excerpt}
        </p>
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 flex-shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-blue-400">{cohort.startDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-gray-500">{cohort.duration} · {cohort.format}</span>
          </div>
        </div>
        
      </div>
    </article>
  );
};

// ─────────────────────────────────────────────────────────────
// EVENT ADVERTISEMENT STRIP — increased height to match cohort cards
// ─────────────────────────────────────────────────────────────

const EventAdvertStrip: FC<{ onEventClick: (title: string) => void }> = ({ onEventClick }) => {
  return (
    <div
      className="my-12 rounded-md overflow-hidden"
      style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.12)' }}
    >
      <div className="px-6 sm:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center"
              style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}
            >
              <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-blue-300">Upcoming Event</p>
              <p className="text-sm text-gray-400">A room worth being in</p>
            </div>
          </div>
          <a
            href="/resources/events"
            className="text-xs font-medium flex items-center gap-1 text-blue-300 hover:opacity-80 transition-opacity"
          >
            All Events
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Event card — now with more padding */}
        <div
          onClick={() => onEventClick(FEATURED_EVENT.title)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onEventClick(FEATURED_EVENT.title)}
          className="group cursor-pointer rounded-md overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{ backgroundColor: '#132B47', border: '1px solid rgba(59,130,246,0.10)' }}
          aria-label={`View event: ${FEATURED_EVENT.title}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-8 p-8 sm:p-10">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span
                  className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold"
                  style={{ backgroundColor: 'rgba(59,130,246,0.12)', color: '#93C5FD' }}
                >
                  {FEATURED_EVENT.tag}
                </span>
              </div>
              <p
                className="text-base font-medium mb-4 group-hover:text-blue-300 transition-colors duration-200 text-white"
              >
                {FEATURED_EVENT.title}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-blue-400">{FEATURED_EVENT.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs text-gray-500">{FEATURED_EVENT.location}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-md bg-[#0A1E3D] text-blue-300">
                  {FEATURED_EVENT.format}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 group-hover:gap-3"
                style={{ backgroundColor: 'rgba(59,130,246,0.10)', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.20)' }}
              >
                Register Now
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────────

export default function CohortsClient(): React.JSX.Element {
  const [activeTag, setActiveTag] = useState<string>('All');
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);

  const filteredCohorts =
    activeTag === 'All'
      ? ALL_COHORTS
      : ALL_COHORTS.filter((c) => c.tag === activeTag);

  const featured    = filteredCohorts[0];
  const rest        = filteredCohorts.slice(1);
  const beforeStrip = rest.slice(0, 3);
  const afterStrip  = rest.slice(3);

  const openInterestModal = (cohort: Cohort) => setSelectedCohort(cohort);
  const closeInterestModal = () => setSelectedCohort(null);

  return (
    <>
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.35s cubic-bezier(0.22,1,0.36,1) both; }
        *::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
        html { scroll-behavior: smooth; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <main className="min-h-screen bg-white">
        <HeroSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

          {/* Filter bar + count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <TagFilterBar activeTag={activeTag} onTagChange={setActiveTag} />
            <p className="text-sm flex-shrink-0 text-gray-500">
              {filteredCohorts.length}{' '}
              {filteredCohorts.length !== 1 ? 'cohorts' : 'cohort'}
              {activeTag !== 'All' && (
                <span className="text-blue-600"> in {activeTag}</span>
              )}
            </p>
          </div>

          {/* Featured cohort */}
          {featured && (
            <div className="mb-8">
              <FeaturedCohortCard cohort={featured} onOpen={openInterestModal} />
            </div>
          )}

          {/* First 3 grid cards */}
          {beforeStrip.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {beforeStrip.map((cohort, i) => (
                <CohortCard key={cohort.id} cohort={cohort} onOpen={openInterestModal} animIndex={i} />
              ))}
            </div>
          )}

          {/* Event ad strip */}
          {filteredCohorts.length > 0 && (
            <EventAdvertStrip
              onEventClick={(_title) => { /* navigate to /events if needed */ }}
            />
          )}

          {/* Remaining grid cards */}
          {afterStrip.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {afterStrip.map((cohort, i) => (
                <CohortCard key={cohort.id} cohort={cohort} onOpen={openInterestModal} animIndex={i + beforeStrip.length} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredCohorts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-4xl mb-4">🎓</p>
              <p className="text-lg mb-1 text-gray-900">
                No cohorts in &ldquo;{activeTag}&rdquo; right now
              </p>
              <p className="text-sm text-gray-500">
                Try a different type or{' '}
                <button
                  type="button"
                  className="underline text-blue-600"
                  onClick={() => setActiveTag('All')}
                >
                  view all cohorts
                </button>.
              </p>
            </div>
          )}

          {filteredCohorts.length > 0 && (
            <div className="flex justify-center py-12">
              <p className="text-sm text-gray-500">
                All {filteredCohorts.length} cohort{filteredCohorts.length !== 1 ? 's' : ''} shown.
              </p>
            </div>
          )}

        </div>
      </main>

      {/* Interest Modal */}
      {selectedCohort && (
        <CohortInterestModal
          isOpen={true}
          onClose={closeInterestModal}
          cohortTitle={selectedCohort.title}
        />
      )}
    </>
  );
}