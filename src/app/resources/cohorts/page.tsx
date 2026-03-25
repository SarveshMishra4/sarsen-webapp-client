'use client';

// =============================================================
// src/app/cohorts/page.tsx
//
// Cohorts hub — lists all cohorts.
// Imports all data + components from [slug]/ so everything
// lives in one place and the hub just consumes it.
//
// Updated to design language: blue palette, white background.
// All corners now use rounded-md (Tailwind medium).
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
import CohortApplicationModal from './[slug]/cohort';

// ─────────────────────────────────────────────────────────────
// HERO SECTION — updated to blue palette
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
          <div
            className="inline-flex items-center gap-2 rounded-md px-4 py-2"
            style={{ backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.16)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-blue-400" />
            <span className="text-xs font-medium sttext-blue-300">
              Sarsen &amp; Company · Cohorts
            </span>
          </div>

          <div className="space-y-4">
            <h1
              className="   text-white"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              Build with a<br />
              <span className="text-blue-300">Cohort.</span>
            </h1>
            <p className="text-base sm:text-lg  max-w-md  text-gray-400">
              Structured programmes for founders at specific inflection points — fundraising,
              scaling, sector-specific challenges. Peer accountability, expert input, and real
              work done in real time.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 pt-2">
            {[
              { value: '8',    label: 'Active programmes'  },
              { value: '340+', label: 'Founders graduated' },
              { value: '87%',  label: 'Raise within 9 mo.' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl  text-white">{stat.value}</p>
                <p className="text-xs stmt-0.5 text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — cohort card visual motif (blue tones) */}
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
// TAG FILTER BAR — updated to blue palette, fixed clipping
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
      const s = tag === 'All'
        ? { bg: '#DBEAFE', text: '#1E40AF' }
        : getTagStyle(tag);
      return (
        <button
          key={tag}
          type="button"
          onClick={() => onTagChange(tag)}
          className="flex-shrink-0 px-4 py-2 rounded-md text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={
            isActive
              ? { backgroundColor: '#132B47', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.40)' }
              : { backgroundColor: s.bg, color: s.text, border: '1px solid transparent', opacity: 0.65 }
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
// SEAT URGENCY PILL — updated to blue palette
// ─────────────────────────────────────────────────────────────

const SeatsUrgencyPill: FC<{ seats: string }> = ({ seats }) => {
  const num     = parseInt(seats);
  const urgent  = !isNaN(num) && num <= 8;
  return (
    <span
      className="px-3 py-1 rounded-md text-xs font-medium"
      style={{
        backgroundColor: urgent ? '#DBEAFE' : 'rgba(59,130,246,0.06)',
        color: urgent ? '#1E40AF' : '#93C5FD',
        border: `1px solid ${urgent ? '#93C5FD' : 'rgba(59,130,246,0.12)'}`,
      }}
    >
      {urgent && '🔥 '}{seats}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
// FEATURED COHORT CARD — updated to blue palette
// ─────────────────────────────────────────────────────────────

const FeaturedCohortCard: FC<{ cohort: Cohort; onOpen: (c: Cohort) => void }> = ({
  cohort, onOpen,
}) => {
  const ts          = getTagStyle(cohort.tag);
  const seatsUrgent = cohort.seats.includes('left') && parseInt(cohort.seats) <= 8;

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
          <SeatsUrgencyPill seats={cohort.seats} />
        </div>
      </div>

      {/* Body */}
      <div className="px-8 sm:px-10 py-6 sm:py-8">
        <h2
          className="  mb-3 group-hover:text-blue-300 transition-colors duration-200 text-white"
          style={{ fontSize: 'clamp(1.1rem,2.5vw,1.6rem)' }}
        >
          {cohort.title}
        </h2>
        <p className="text-sm font-medium mb-4 text-blue-300">✦ {cohort.outcome}</p>
        <p className="text-sm  mb-6 max-w-3xl text-gray-400">
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
          <div
            className="flex items-center gap-1.5 text-xs font-medium group-hover:gap-3 transition-all duration-200 text-blue-300"
          >
            Apply now
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
// COHORT CARD — grid item, updated to blue palette
// ─────────────────────────────────────────────────────────────

const CohortCard: FC<{ cohort: Cohort; onOpen: (c: Cohort) => void; animIndex: number }> = ({
  cohort, onOpen, animIndex,
}) => {
  const ts          = getTagStyle(cohort.tag);
  const seatsUrgent = cohort.seats.includes('left') && parseInt(cohort.seats) <= 6;

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
          <SeatsUrgencyPill seats={cohort.seats} />
        </div>
        <div className="absolute top-4 right-4 z-10 opacity-25 group-hover:opacity-70 transition-opacity" aria-hidden="true">
          <svg className="w-3.5 h-3.5" fill="none" stroke="#93C5FD" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <h3
          className="font-medium  mb-1.5 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 text-white"
          style={{ fontSize: '0.9rem' }}
        >
          {cohort.title}
        </h3>
        <p className="text-xs font-medium mb-2 text-blue-300">✦ {cohort.outcome}</p>
        <p className="text-xs  mb-4 line-clamp-2 text-gray-400">
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
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid rgba(59,130,246,0.07)' }}
        >
          <span className="text-xs px-2 py-0.5 rounded-md bg-[#132B47] text-blue-300">
            {cohort.sector}
          </span>
          <span className="text-xs text-gray-500">{cohort.cohortNumber}</span>
        </div>
      </div>
    </article>
  );
};

// ─────────────────────────────────────────────────────────────
// EVENT ADVERTISEMENT STRIP — updated to blue palette
// ─────────────────────────────────────────────────────────────

const EventAdvertStrip: FC<{ onEventClick: (title: string) => void }> = ({ onEventClick }) => {
  const seatsUrgent =
    FEATURED_EVENT.seats.includes('left') && parseInt(FEATURED_EVENT.seats) <= 15;

  return (
    <div
      className="my-12 rounded-md overflow-hidden"
      style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.12)' }}
    >
      <div className="px-6 sm:px-8 py-6 sm:py-8">
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
              <p className="text-xs font-medium sttext-blue-300">
                Upcoming Event
              </p>
              <p className="text-sm  text-gray-400">A room worth being in</p>
            </div>
          </div>
          <a
            href="/events"
            className="text-xs font-medium flex items-center gap-1 text-blue-300 hover:opacity-80 transition-opacity"
          >
            All Events
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Event card */}
        <div
          onClick={() => onEventClick(FEATURED_EVENT.title)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onEventClick(FEATURED_EVENT.title)}
          className="group cursor-pointer rounded-md overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{ backgroundColor: '#132B47', border: '1px solid rgba(59,130,246,0.10)' }}
          aria-label={`View event: ${FEATURED_EVENT.title}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span
                  className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold"
                  style={{ backgroundColor: 'rgba(59,130,246,0.12)', color: '#93C5FD' }}
                >
                  {FEATURED_EVENT.tag}
                </span>
                {seatsUrgent && (
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-md text-xs"
                    style={{ backgroundColor: 'rgba(59,130,246,0.14)', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.25)' }}
                  >
                    {FEATURED_EVENT.seats}
                  </span>
                )}
              </div>
              <p
                className="text-base font-medium  mb-3 group-hover:text-blue-300 transition-colors duration-200 text-white"
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
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium transition-all duration-200 group-hover:gap-3"
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

export default function CohortsHubPage(): React.JSX.Element {
  const [activeTag, setActiveTag]           = useState<string>('All');
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);

  const filteredCohorts =
    activeTag === 'All'
      ? ALL_COHORTS
      : ALL_COHORTS.filter((c) => c.tag === activeTag);

  const featured    = filteredCohorts[0];
  const rest        = filteredCohorts.slice(1);
  const beforeStrip = rest.slice(0, 3);
  const afterStrip  = rest.slice(3);

  const openModal  = (cohort: Cohort) => setSelectedCohort(cohort);
  const closeModal = ()               => setSelectedCohort(null);

  return (
    <>
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
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
              <FeaturedCohortCard cohort={featured} onOpen={openModal} />
            </div>
          )}

          {/* First 3 grid cards */}
          {beforeStrip.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {beforeStrip.map((cohort, i) => (
                <CohortCard key={cohort.id} cohort={cohort} onOpen={openModal} animIndex={i} />
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
                <CohortCard key={cohort.id} cohort={cohort} onOpen={openModal} animIndex={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredCohorts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-4xl mb-4">🎓</p>
              <p className="text-lg  mb-1 text-gray-900">
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

      {/* Application modal — passes full cohort object for per-cohort questions */}
      {selectedCohort && (
        <CohortApplicationModal
          isOpen={true}
          onClose={closeModal}
          cohort={selectedCohort}
        />
      )}
    </>
  );
}