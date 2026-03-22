'use client';

import React, {
  useState,
  FC,
} from 'react';

// =====================================================
// TYPE DEFINITIONS
// =====================================================

interface Service {
  id: number;
  slug: string;
  packageNumber: string;
  title: string;
  tagline: string;
  excerpt: string;
  tag: string;
  targetedFor: string;
  coreServicesCount: number;
  flexibleServicesCount: number | null;
  deliverables: string[];
  outcome: string;
  impactIndices: string[];
  featured?: boolean;
}

// =====================================================
// SERVICES DATA — 8 packages from handbook
// =====================================================

const ALL_SERVICES: Service[] = [
  {
    id: 0,
    slug: 'business-diagnostic-direction',
    packageNumber: 'Package 0',
    title: 'Business Diagnostic & Direction',
    tagline: 'Compulsory Entry Package',
    excerpt:
      'The mandatory starting point. A 314-question diagnostic system that maps your business model, value chain, control levers, and bottlenecks in full — then translates that into a strategic direction for the next 12 months and a 3–5 year trajectory. For founders who are overwhelmed, unclear, or lack a structured understanding of their own priorities.',
    tag: 'Foundation',
    targetedFor: 'Founders who are overwhelmed, unclear about how their business actually works, or lack a structured understanding of priorities and control levers.',
    coreServicesCount: 10,
    flexibleServicesCount: null,
    deliverables: ['Business Nature & Control Handbook', 'Direction & Growth Stages Document', '90-Day Action One-Pager'],
    outcome: 'The founder achieves clarity, control, and confidence.',
    impactIndices: ['Founder Clarity Index'],
    featured: true,
  },
  {
    id: 1,
    slug: 'idea-to-validation',
    packageNumber: 'Package 1',
    title: 'Idea-to-Validation',
    tagline: 'Kill weak ideas early. Commit to the right one.',
    excerpt:
      'Structured validation logic for founders at the idea stage. Maps the problem universe, scores criticality and frequency, reality-checks market size, and runs a kill-or-commit decision framework. Produces an ICP definition, value proposition framing, and a 90-day validation plan.',
    tag: 'Validation',
    targetedFor: 'Idea-stage or pre-revenue founders.',
    coreServicesCount: 7,
    flexibleServicesCount: 2,
    deliverables: ['Idea Validation Decision Matrix', 'ICP & Problem Definition Sheet', '90-Day Validation Plan'],
    outcome: 'The founder commits to one validated idea or exits weak ideas early.',
    impactIndices: ['Idea Confidence Score', 'Problem Clarity Index'],
  },
  {
    id: 2,
    slug: 'product-market-fit-clarity',
    packageNumber: 'Package 2',
    title: 'Product–Market Fit Clarity',
    tagline: 'Certainty on product direction.',
    excerpt:
      'For founders with users or early revenue who cannot determine whether they have PMF. Locks the ICP, eliminates non-ICP noise, analyses retention signals and usage patterns, and produces a PMF scorecard and a clear pivot-or-persist decision. Structured specifically around Indian startup data and user behaviour.',
    tag: 'PMF',
    targetedFor: 'Founders with users or early revenue but unclear PMF.',
    coreServicesCount: 7,
    flexibleServicesCount: 3,
    deliverables: ['PMF Scorecard', 'ICP Lock Document', 'Pivot/Persist Decision Memo'],
    outcome: 'The founder gains certainty on product direction.',
    impactIndices: ['PMF Readiness Score', 'Retention Signal Strength'],
  },
  {
    id: 3,
    slug: 'go-to-market-strategy',
    packageNumber: 'Package 3',
    title: 'Go-To-Market Strategy',
    tagline: 'Repeatable customer acquisition, not random sales.',
    excerpt:
      'For startups with a product but inconsistent sales. Maps every viable GTM channel, prioritises ruthlessly, defines the right sales motion, diagnoses funnel leakage, structures messaging and positioning, and produces a 90-day execution plan. The difference between founders who close deals and founders who chase them.',
    tag: 'GTM',
    targetedFor: 'Startups with a product but inconsistent sales.',
    coreServicesCount: 7,
    flexibleServicesCount: 3,
    deliverables: ['GTM Strategy Document', 'Funnel & Channel Sheets', '90-Day GTM Plan'],
    outcome: 'Repeatable and focused customer acquisition system.',
    impactIndices: ['CAC Clarity Index', 'Funnel Efficiency Score'],
  },
  {
    id: 4,
    slug: 'operations-scalability',
    packageNumber: 'Package 4',
    title: 'Operations & Scalability',
    tagline: 'Stop being the bottleneck in your own business.',
    excerpt:
      'End-to-end process mapping, cost leak identification, founder bottleneck analysis, and a scalability readiness assessment. For revenue-stage startups facing operational chaos — where the founder is simultaneously the CEO, the decision-maker, and the single point of failure.',
    tag: 'Operations',
    targetedFor: 'Revenue-stage startups facing operational chaos.',
    coreServicesCount: 6,
    flexibleServicesCount: 3,
    deliverables: ['Operations Diagnostic Report', 'Org & Role Design Sheet', 'Scalability Scorecard'],
    outcome: 'Reduced founder dependency and operational clarity.',
    impactIndices: ['Founder Dependency Ratio', 'Operational Efficiency Score'],
  },
  {
    id: 5,
    slug: 'fundraising-readiness',
    packageNumber: 'Package 5',
    title: 'Fundraising Readiness',
    tagline: 'Raise from a position of preparation, not hope.',
    excerpt:
      'For founders planning to raise capital in the next 3–6 months. Runs a fundraising readiness diagnostic, cleans up investor metrics, structures the equity story and narrative, reality-checks valuation, and ensures the founder enters the fundraising process with the posture investors actually respond to.',
    tag: 'Fundraising',
    targetedFor: 'Founders planning to raise capital in 3–6 months.',
    coreServicesCount: 5,
    flexibleServicesCount: 3,
    deliverables: ['Fundraising Readiness Report', 'Investor Metrics Dashboard'],
    outcome: 'Prepared, confident, and realistic fundraising posture.',
    impactIndices: ['Investor Readiness Score', 'Narrative Clarity Index'],
  },
  {
    id: 6,
    slug: 'turnaround-stabilisation',
    packageNumber: 'Package 6',
    title: 'Turnaround & Stabilisation',
    tagline: 'Immediate control when the runway is short.',
    excerpt:
      'The emergency package. Survival viability assessment, cash runway stress testing, cost compression strategy, and a 30–90 day turnaround plan. For startups facing survival risk — where the priority is not growth, but control. No flexible services. No scope creep. Fixed by design because the situation demands it.',
    tag: 'Turnaround',
    targetedFor: 'Startups facing survival risk.',
    coreServicesCount: 5,
    flexibleServicesCount: null,
    deliverables: ['Survival Decision Memo', '30–90 Day Turnaround Plan'],
    outcome: 'Immediate control over cash and priorities.',
    impactIndices: ['Runway Extension Metric', 'Focus Compression Score'],
  },
  {
    id: 7,
    slug: 'scale-expansion-strategy',
    packageNumber: 'Package 7',
    title: 'Scale & Expansion Strategy',
    tagline: 'Scale without breaking what you built.',
    excerpt:
      'For founders preparing for aggressive growth. Diagnoses scale readiness, maps capacity constraints, identifies expansion risks, designs org and capability requirements, and models capital needs. Ensures that growth ambitions are matched by structural preparedness — so the company scales without the systems failing underneath it.',
    tag: 'Scale',
    targetedFor: 'Founders preparing for aggressive growth.',
    coreServicesCount: 5,
    flexibleServicesCount: 3,
    deliverables: ['Scale Readiness Scorecard', 'Expansion Decision Memo'],
    outcome: 'The founder scales without breaking systems.',
    impactIndices: ['Scale Readiness Index', 'Expansion Risk Score'],
  },
];

// =====================================================
// TAG COLOR MAP — blues from homepage palette
// =====================================================

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Foundation:  { bg: '#DBEAFE', text: '#1E40AF' },
  Validation:  { bg: '#E0F2FE', text: '#0369A1' },
  PMF:         { bg: '#E0E7FF', text: '#3730A3' },
  GTM:         { bg: '#DBEAFE', text: '#1E40AF' },
  Operations:  { bg: '#E6F0FF', text: '#1E3A8A' },
  Fundraising: { bg: '#E0F2FE', text: '#0369A1' },
  Turnaround:  { bg: '#E0E7FF', text: '#3730A3' },
  Scale:       { bg: '#DBEAFE', text: '#1E40AF' },
};

const getTagStyle = (tag: string) =>
  TAG_COLORS[tag] ?? { bg: '#DBEAFE', text: '#1E40AF' };

// =====================================================
// ALL FILTER TAGS
// =====================================================

const ALL_TAGS: string[] = [
  'All', 'Foundation', 'Validation', 'PMF', 'GTM',
  'Operations', 'Fundraising', 'Turnaround', 'Scale',
];

// =====================================================
// NAVIGATION HELPER
// =====================================================

const navigateToService = (slug: string): void => {
  window.location.href = `/services/${slug}`;
};

// =====================================================
// HERO SECTION — dark blue background
// =====================================================

const HeroSection: FC = () => (
  <section
    className="relative overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8"
    style={{ backgroundColor: '#0A1E3D', minHeight: '520px' }}
  >
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
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

        <div className="space-y-8">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{
              backgroundColor: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.16)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-blue-400" />
            <span className="text-xs font-medium tracking-widest  text-blue-300">
              Sarsen &amp; Company · Services
            </span>
          </div>

          <div className="space-y-4">
            <h1
              className="font-light leading-none tracking-tight text-white"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              Structured
              <br />
              <span className="text-blue-300">Strategy.</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed max-w-md font-light text-gray-400">
              Eight productised consulting packages — each scoped, repeatable, and built around a specific founder inflection point. Every engagement starts with Package 0.
            </p>
          </div>

          
        </div>

        <div
          className="relative hidden lg:flex items-center justify-end"
          style={{ height: '420px' }}
          aria-hidden="true"
        >
          <div className="relative w-full max-w-lg h-full flex items-center justify-center">
            <div className="relative">
              {[3, 2, 1].map((layer) => (
                <div
                  key={layer}
                  className="absolute rounded-xl"
                  style={{
                    width: '260px',
                    height: '300px',
                    top: layer * 8,
                    left: layer * 8,
                    backgroundColor: `rgba(19,43,71,${0.05 * layer})`,
                    border: `1px solid rgba(59,130,246,${0.04 * layer})`,
                  }}
                />
              ))}
              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  width: '260px',
                  height: '300px',
                  backgroundColor: '#132B47',
                  border: '1px solid rgba(59,130,246,0.20)',
                }}
              >
                <div
                  className="h-12 px-5 flex items-center justify-between"
                  style={{ backgroundColor: '#0A1E3D' }}
                >
                  <div className="w-16 h-2 rounded-full bg-blue-800/40" />
                  <div
                    className="text-sm px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: 'rgba(59,130,246,0.15)', color: '#93C5FD' }}
                  >
                    8 packages
                  </div>
                </div>
                <div className="px-5 pt-4 space-y-2.5">
                  {[
                    { num: '0', label: 'Diagnostic', color: '#3B82F6', w: '100%' },
                    { num: '1', label: 'Validation',  color: '#60A5FA', w: '80%'  },
                    { num: '2', label: 'PMF Clarity', color: '#93C5FD', w: '72%'  },
                    { num: '3', label: 'GTM',         color: '#3B82F6', w: '85%'  },
                    { num: '4', label: 'Operations',  color: '#60A5FA', w: '68%'  },
                    { num: '5', label: 'Fundraising', color: '#93C5FD', w: '90%'  },
                    { num: '6', label: 'Turnaround',  color: '#3B82F6', w: '60%'  },
                    { num: '7', label: 'Scale',       color: '#60A5FA', w: '78%'  },
                  ].map((row) => (
                    <div key={row.num} className="flex items-center gap-2.5">
                      <div
                        className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${row.color}18`, border: `1px solid ${row.color}30` }}
                      >
                        <span style={{ color: row.color, fontSize: '8px', fontWeight: 700 }}>{row.num}</span>
                      </div>
                      <div
                        className="rounded-full"
                        style={{ height: '5px', width: row.w, backgroundColor: `${row.color}25`, flex: 'none' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

// =====================================================
// GLOBAL DELIVERY RULES BANNER
// =====================================================

const DeliveryRulesBanner: FC = () => (
  <div
    className="border-y bg-white"
    style={{ borderColor: '#E5E7EB' }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
        <p className="text-xs font-medium tracking-widest  text-gray-500">
          Global Delivery Rules
        </p>
        {[
          { icon: '⬛', label: 'Core Services are mandatory and non-negotiable' },
          { icon: '◻', label: 'Flexible Services: max 2–3 per package' },
          { icon: '◈', label: 'No services outside the defined scope' },
          { icon: '→', label: 'Every package follows a chronological customer service roadmap' },
        ].map((rule) => (
          <div key={rule.label} className="flex items-center gap-2">
            <span className="text-gray-400 text-xs">{rule.icon}</span>
            <span className="text-xs text-gray-600">{rule.label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// =====================================================
// TAG FILTER BAR
// =====================================================

interface TagFilterBarProps {
  activeTag: string;
  onTagChange: (tag: string) => void;
}

const TagFilterBar: FC<TagFilterBarProps> = ({ activeTag, onTagChange }) => (
  <div
    className="flex gap-2 overflow-x-auto pb-1"
    style={{ scrollbarWidth: 'none' } as React.CSSProperties}
    role="toolbar"
    aria-label="Filter services by type"
  >
    {ALL_TAGS.map((tag) => {
      const isActive = tag === activeTag;
      const style    = tag === 'All'
        ? { bg: '#DBEAFE', text: '#1E40AF' }
        : getTagStyle(tag);

      return (
        <button
          key={tag}
          type="button"
          onClick={() => onTagChange(tag)}
          className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={
            isActive
              ? { backgroundColor: '#132B47', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.40)' }
              : { backgroundColor: style.bg, color: style.text, border: '1px solid transparent', opacity: 0.65 }
          }
          aria-pressed={isActive}
        >
          {tag}
        </button>
      );
    })}
  </div>
);

// =====================================================
// FEATURED SERVICE CARD — full width, Package 0
// Dark blue background with light text
// =====================================================

interface FeaturedServiceCardProps {
  service: Service;
}

const FeaturedServiceCard: FC<FeaturedServiceCardProps> = ({ service }) => {
  const tagStyle = getTagStyle(service.tag);

  return (
    <article
      onClick={() => navigateToService(service.slug)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigateToService(service.slug)}
      className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.12)' }}
      aria-label={`View package: ${service.title}`}
    >
      {/* Header */}
      <div
        className="relative h-44 sm:h-52 px-8 sm:px-10 flex items-end pb-7 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #132B47 0%, #0A1E3D 65%)' }}
      >
        <div className="absolute inset-0 flex items-center justify-end pr-10" aria-hidden="true">
          {[3, 2, 1].map((l) => (
            <div
              key={l}
              className="absolute rounded-xl"
              style={{
                width: `${80 + l * 20}px`,
                height: `${100 + l * 25}px`,
                right: `${20 + (3 - l) * 12}px`,
                top: '50%',
                transform: 'translateY(-50%)',
                border: `1px solid rgba(59,130,246,${0.05 * l})`,
                backgroundColor: `rgba(19,43,71,${0.04 * l})`,
              }}
            />
          ))}
        </div>

        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 font-light select-none"
          style={{ fontSize: '8rem', color: 'rgba(59,130,246,0.06)', lineHeight: 1 }}
          aria-hidden="true"
        >
          {service.packageNumber.split(' ')[1]}
        </div>

        <div className="relative z-10 flex items-center gap-3 flex-wrap">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {service.tag}
          </span>
          
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: 'rgba(59,130,246,0.08)', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.14)' }}
          >
            Compulsory Entry
          </span>
        </div>
      </div>

      <div className="px-8 sm:px-10 py-6 sm:py-8">
        <p className="text-xs tracking-widest  mb-2 text-blue-300/70">
          {service.tagline}
        </p>
        <h2
          className="font-light leading-snug mb-3 group-hover:text-blue-300 transition-colors duration-200 text-white"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)' }}
        >
          {service.title}
        </h2>
        <p className="text-sm leading-relaxed mb-6 max-w-3xl text-gray-400">
          {service.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {service.deliverables.map((d) => (
            <span
              key={d}
              className="px-2.5 py-1 rounded-md text-xs"
              style={{ backgroundColor: '#132B47', color: '#93C5FD' }}
            >
              {d}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-gray-400">
                {service.coreServicesCount} core services
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {service.outcome}
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 text-xs font-medium group-hover:gap-3 transition-all duration-200 text-blue-300"
          >
            View this package
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
};

// =====================================================
// STANDARD SERVICE CARD — 3-column grid
// Dark blue background with light text
// =====================================================

interface ServiceCardProps {
  service: Service;
  animIndex: number;
}

const ServiceCard: FC<ServiceCardProps> = ({ service, animIndex }) => {
  const tagStyle = getTagStyle(service.tag);

  return (
    <article
      onClick={() => navigateToService(service.slug)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigateToService(service.slug)}
      className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 flex flex-col"
      style={{
        backgroundColor: '#0A1E3D',
        border: '1px solid rgba(59,130,246,0.08)',
        animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${animIndex * 55}ms both`,
      }}
      aria-label={`View package: ${service.title}`}
    >
      <div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, ${tagStyle.text}40, transparent)` }}
      />

      <div
        className="relative h-28 px-5 flex items-end pb-4 overflow-hidden"
        style={{ background: 'linear-gradient(155deg, #132B47 0%, #0A1E3D 100%)' }}
      >
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 font-light select-none"
          style={{ fontSize: '4.5rem', color: 'rgba(59,130,246,0.07)', lineHeight: 1 }}
          aria-hidden="true"
        >
          {service.packageNumber.split(' ')[1]}
        </div>

        <div className="relative z-10 flex items-center gap-2 flex-wrap">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {service.tag}
          </span>
          
        </div>

        <div className="absolute top-4 right-4 z-10 opacity-20 group-hover:opacity-60 transition-opacity" aria-hidden="true">
          
        </div>
      </div>

      <div className="px-5 py-4 flex flex-col flex-1">
        <p className="text-sm   mb-1.5 text-blue-300/70">
          {service.tagline}
        </p>
        <h3
          className="font-medium leading-snug mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 text-white"
          style={{ fontSize: '0.9rem' }}
        >
          {service.title}
        </h3>
        <p className="text-xs leading-relaxed mb-4 line-clamp-3 text-gray-400">
          {service.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.deliverables.map((d) => (
            <span
              key={d}
              className="px-2 py-0.5 rounded text-xs"
              style={{ backgroundColor: '#132B47', color: '#93C5FD' }}
            >
              {d}
            </span>
          ))}
        </div>

        <p className="text-xs  mb-4 flex-1 text-gray-500">
          ✦ {service.outcome}
        </p>

        <div
          className="flex items-center justify-between pt-3 mt-auto"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">
              {service.coreServicesCount} Modules
            </span>
            
          </div>
          <span className="text-xs text-gray-500">
            {service.targetedFor.length > 30
              ? service.targetedFor.slice(0, 30) + '…'
              : service.targetedFor}
          </span>
        </div>
      </div>
    </article>
  );
};

// =====================================================
// PACKAGE JOURNEY STRIP — white background (already light)
// =====================================================

interface PackageJourneyStripProps {
  services: Service[];
}

const PackageJourneyStrip: FC<PackageJourneyStripProps> = ({ services }) => (
  <div
    className="my-12 rounded-2xl overflow-hidden bg-white border border-gray-200"
  >
    <div className="px-6 sm:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50"
          >
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium tracking-widest  text-gray-500">
              The Package Journey
            </p>
            <p className="text-sm font-light text-gray-600">
              Every engagement starts with Package 0 — then moves to where you need to go.
            </p>
          </div>
        </div>
      </div>

      <div
        className="flex items-start gap-0 overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'none' } as React.CSSProperties}
      >
        {services.map((service, i) => {
          const tagStyle = getTagStyle(service.tag);
          return (
            <React.Fragment key={service.id}>
              <div
                onClick={() => navigateToService(service.slug)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigateToService(service.slug)}
                className="group cursor-pointer flex-shrink-0 flex flex-col items-center text-center w-28 focus:outline-none"
                aria-label={`Go to ${service.title}`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-200 group-hover:scale-110"
                  style={{
                    backgroundColor: `${tagStyle.text}18`,
                    border: `1.5px solid ${tagStyle.text}35`,
                  }}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ color: tagStyle.text }}
                  >
                    {service.id}
                  </span>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-semibold mb-1"
                  style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
                >
                  {service.tag}
                </span>
                <p
                  className="text-xs leading-snug group-hover:opacity-100 transition-opacity text-gray-500"
                  style={{ fontSize: '10px' }}
                >
                  {service.title.split(':')[0].split('&')[0].trim()}
                </p>
              </div>
              {i < services.length - 1 && (
                <div className="flex-shrink-0 flex items-start pt-4 px-1">
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  </div>
);

// =====================================================
// PAGE ROOT COMPONENT
// =====================================================

export default function ServicesHubPage(): React.JSX.Element {
  const [activeTag, setActiveTag] = useState<string>('All');

  const filteredServices: Service[] =
    activeTag === 'All'
      ? ALL_SERVICES
      : ALL_SERVICES.filter((s) => s.tag === activeTag);

  const featured: Service | undefined = ALL_SERVICES[0];
  const gridServices: Service[]       = filteredServices.filter((s) => s.id !== 0);

  const showJourneyStrip = activeTag === 'All';

  const beforeStrip: Service[] = gridServices.slice(0, 3);
  const afterStrip:  Service[] = gridServices.slice(3);

  return (
    <>
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <main className="min-h-screen bg-white">

        {/* Hero */}
        <HeroSection />

        {/* Global Delivery Rules Banner */}
        {/* <DeliveryRulesBanner /> */}

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

          {/* Filter bar + count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <TagFilterBar activeTag={activeTag} onTagChange={setActiveTag} />
            <p className="text-sm flex-shrink-0 text-gray-500">
              {filteredServices.length}{' '}
              {filteredServices.length !== 1 ? 'packages' : 'package'}
              {activeTag !== 'All' && (
                <> in  className="text-blue-600"{activeTag}</>
              )}
            </p>
          </div>

          {/* Package 0 featured */}
          {(activeTag === 'All' || activeTag === 'Foundation') && featured && (
            <div className="mb-8">
              <FeaturedServiceCard service={featured} />
            </div>
          )}

          {/* First 3 grid cards */}
          {beforeStrip.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {beforeStrip.map((service, i) => (
                <ServiceCard key={service.id} service={service} animIndex={i} />
              ))}
            </div>
          )}

          {/* Package Journey Strip
          {showJourneyStrip && (
            <PackageJourneyStrip services={ALL_SERVICES} />
          )} */}

          {/* Remaining grid cards */}
          {afterStrip.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {afterStrip.map((service, i) => (
                <ServiceCard key={service.id} service={service} animIndex={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredServices.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-4xl mb-4">📦</p>
              <p className="text-lg font-light mb-1 text-gray-900">
                No packages in &ldquo;{activeTag}&rdquo;
              </p>
              <p className="text-sm text-gray-500">
                <button
                  type="button"
                  className="underline text-blue-600"
                  onClick={() => setActiveTag('All')}
                >
                  View all packages
                </button>
              </p>
            </div>
          )}

          {/* End note */}
          {filteredServices.length > 0 && (
            <div className="flex justify-center py-12">
              <p className="text-sm text-center max-w-md text-gray-500">
                All packages are scoped, repeatable, and delivered with a defined customer service roadmap.
                Every engagement begins with Package 0.
              </p>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
