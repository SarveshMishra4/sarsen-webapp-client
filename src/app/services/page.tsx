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
      'The Package runs a rigorous, data-driven diagnostic across your entire Business : Mapping Your Model, Value Chain, Control Levers, and Bottlenecks with Mathematical Precision. Every Insight is Calculated. Every Recommendation is Derived from Structured Analysis.',
    tag: 'Foundation',
    targetedFor: 'Founders and operators who are overwhelmed, unclear about how their business actually works, or lack a structured understanding of priorities and control levers.',
    coreServicesCount: 10,
    flexibleServicesCount: null,
    deliverables: ['Business Nature & Control Handbook', 'Direction & Growth Stages Document', '90-Day Action One-Pager'],
    outcome: 'The founder achieves clarity, control, and confidence — grounded in objective analysis rather than gut feel.',
    impactIndices: ['Founder Clarity Index'],
    featured: true,
  },
  {
    id: 1,
    slug: 'idea-to-product',
    packageNumber: 'Package 1',
    title: 'Idea-to-Validation',
    tagline: 'Kill weak ideas early. Commit to the right one.',
    excerpt:
      'The graveyard of failed ventures is filled with ideas that felt right. Feeling is not a validation framework. This package applies structured analytical logic to map the full problem universe your idea operates in — scoring each problem by criticality, frequency, and addressability. Market size is reality-checked against defensible data. The idea itself is put through a rigorous kill-or-commit decision framework designed to surface fatal flaws before you spend time, money, or focus on them. What survives is not the idea you fell in love with — it is the idea that the evidence supports. You leave with a locked ICP definition, a sharpened value proposition, and a 90-day validation plan built to generate proof, not hope.',
    tag: 'Validation',
    targetedFor: 'Idea-stage or pre-revenue founders and operators evaluating new business directions.',
    coreServicesCount: 7,
    flexibleServicesCount: 2,
    deliverables: ['Idea Validation Decision Matrix', 'ICP & Problem Definition Sheet', '90-Day Validation Plan'],
    outcome: 'Commitment to one validated idea — or a decisive, evidence-backed exit from the wrong one.',
    impactIndices: ['Idea Confidence Score', 'Problem Clarity Index'],
  },
  {
    id: 2,
    slug: 'idea-to-product',
    packageNumber: 'Package 2',
    title: 'Product–Market Fit Clarity',
    tagline: 'Certainty on product direction.',
    excerpt:
      'Product–market fit is not a feeling. It is a measurable state — and most businesses that think they have it, do not. This package is built on the principle that every iteration cycle has a cost: in capital, in time, and in organisational focus. We study your product deeply, calculate who your true ICP is with precision, and develop a strategy that pre-calculates your next multiple iteration cycles before you execute even one. The result is a PMF roadmap so sharp that what takes others five to seven cycles to learn, you compress into a fraction of that — achieving fit faster, spending less, and arriving at a scalable product position with structural confidence. We lock the ICP, eliminate non-ICP noise polluting your signal, and produce a data-backed pivot-or-persist decision that removes ambiguity from the most consequential choice in your product journey.',
    tag: 'PMF',
    targetedFor: 'Businesses with users or early revenue that cannot definitively determine whether they have achieved product–market fit.',
    coreServicesCount: 7,
    flexibleServicesCount: 3,
    deliverables: ['PMF Scorecard', 'ICP Lock Document', 'Pivot/Persist Decision Memo'],
    outcome: 'Certainty on product direction — achieved in a fraction of the time and capital others spend to get there.',
    impactIndices: ['PMF Readiness Score', 'Retention Signal Strength'],
  },
  {
    id: 3,
    slug: 'go-to-market',
    packageNumber: 'Package 3',
    title: 'Go-To-Market Strategy',
    tagline: 'Repeatable customer acquisition, not random sales.',
    excerpt:
      'A product without a system to sell it is just inventory. This package begins where most GTM engagements refuse to go — with a deep study of both the product and the market in parallel, not in sequence. We identify the most probable ideal customer profiles through structured analysis, map every viable acquisition channel, and then apply ruthless prioritisation logic to determine where your effort compounds fastest. We define the right sales motion for your specific context, diagnose funnel leakage with precision, and structure your messaging and positioning around what your ICP actually responds to. As execution progresses, we reinforce the financial model underneath your GTM engine — progressively calibrated to extract maximum revenue efficiency from every channel you operate in. You leave with a 90-day execution plan, not a strategy deck that collects dust.',
    tag: 'GTM',
    targetedFor: 'Businesses with a validated product but inconsistent, unpredictable, or founder-dependent sales.',
    coreServicesCount: 7,
    flexibleServicesCount: 3,
    deliverables: ['GTM Strategy Document', 'Funnel & Channel Sheets', '90-Day GTM Plan'],
    outcome: 'A repeatable, focused customer acquisition system — replacing randomness with compounding precision.',
    impactIndices: ['CAC Clarity Index', 'Funnel Efficiency Score'],
  },
  {
    id: 4,
    slug: 'optimization-scalability',
    packageNumber: 'Package 4',
    title: 'Operations & Scalability',
    tagline: 'Stop being the bottleneck in your own business.',
    excerpt:
      'Revenue growth without operational infrastructure does not produce scale — it produces chaos with a larger number attached to it. This package runs an end-to-end diagnostic of your operations: mapping every process, identifying every cost leak, and specifically locating the points where the business depends on a single person to function. Founder dependency is measured, not assumed. Scalability is assessed across systems, roles, and decision-making architecture — producing a clear picture of exactly what breaks first if you grow at the rate you are targeting. What follows is a structural redesign: org architecture, role design, and an operational blueprint built not just for where you are, but for the next stage of complexity you are about to enter.',
    tag: 'Operations',
    targetedFor: 'Revenue-stage businesses facing operational chaos, unsustainable founder dependency, or growth that is outpacing internal systems.',
    coreServicesCount: 6,
    flexibleServicesCount: 3,
    deliverables: ['Operations Diagnostic Report', 'Org & Role Design Sheet', 'Scalability Scorecard'],
    outcome: 'Reduced founder dependency, operational clarity, and a business that can grow without breaking.',
    impactIndices: ['Founder Dependency Ratio', 'Operational Efficiency Score'],
  },
  {
    id: 5,
    slug: 'funding-readiness',
    packageNumber: 'Package 5',
    title: 'Fundraising Readiness',
    tagline: 'Raise from a position of preparation, not hope.',
    excerpt:
      'Investors do not fund potential — they fund evidence. This package begins with a rigorous analysis of your business as it currently stands: metrics cleaned, narratives stress-tested, and valuation anchored in defensible logic rather than aspiration. We study the funding landscape to identify the most probable categories of investors for your stage, sector, and traction profile — and then research alternative investment pathways most businesses never consider. We help you build and organise your data room with the precision investors actually expect. We prepare you for every likely line of questioning. By the time you enter a room with an investor, you are not pitching — you are presenting a structured case built on data, and responding to scrutiny with confidence because you have already done the work they are about to test you on.',
    tag: 'Fundraising',
    targetedFor: 'Founders and leadership teams planning to raise capital and wanting to enter the process fully prepared.',
    coreServicesCount: 5,
    flexibleServicesCount: 3,
    deliverables: ['Fundraising Readiness Report', 'Investor Metrics Dashboard', 'Data Room Structure'],
    outcome: 'A prepared, confident, and data-sharp fundraising posture — built to hold up under serious investor scrutiny.',
    impactIndices: ['Investor Readiness Score', 'Narrative Clarity Index'],
  },
  {
    id: 6,
    slug: 'turnaround-stabilisation',
    packageNumber: 'Package 6',
    title: 'Turnaround & Stabilisation',
    tagline: 'Immediate control when the runway is short.',
    excerpt:
      'When the business is under existential pressure, the priority is not strategy — it is survival. This package is engineered for exactly that moment. We run a survival viability assessment to determine what is worth saving and what is consuming resources it cannot justify. Cash runway is stress-tested against multiple scenarios. A cost compression strategy is built around what can actually be cut without destroying core function. A 30–90 day turnaround plan is constructed with a single objective: regaining control. There are no flexible services in this package by design. Scope creep is a luxury of stability — and this package is for situations where stability has not yet been restored. Every decision is prioritised by impact on survival, and every action is sequenced to buy time while structural recovery becomes possible.',
    tag: 'Turnaround',
    targetedFor: 'Businesses facing acute survival risk, runway compression, or a critical loss of operational and financial control.',
    coreServicesCount: 5,
    flexibleServicesCount: null,
    deliverables: ['Survival Decision Memo', '30–90 Day Turnaround Plan'],
    outcome: 'Immediate control over cash, priorities, and the decisions that determine whether the business survives.',
    impactIndices: ['Runway Extension Metric', 'Focus Compression Score'],
  },
  {
    id: 7,
    slug: 'scale-expansion',
    packageNumber: 'Package 7',
    title: 'Scale & Expansion Strategy',
    tagline: 'Scale without breaking what you built.',
    excerpt:
      'Aggressive growth is not an achievement if the systems underneath it fail to keep pace. Most businesses discover their structural limits only after they have already committed to growth — and by then, the cost of fixing them mid-scale is enormous. This package is designed to prevent that. We run a comprehensive scale readiness diagnostic that maps every capacity constraint, identifies expansion risks before they become execution failures, and models the capital requirements your growth trajectory actually demands. Organisational architecture and capability gaps are designed for the stage you are moving into, not the stage you are leaving. What you receive is not optimism about growth — it is a structurally honest assessment of what you can scale, at what pace, and what needs to be built before you push the accelerator.',
    tag: 'Scale',
    targetedFor: 'Businesses preparing for aggressive growth, geographic expansion, or a significant step-up in operational complexity.',
    coreServicesCount: 5,
    flexibleServicesCount: 3,
    deliverables: ['Scale Readiness Scorecard', 'Expansion Decision Memo', 'Capability & Org Design Blueprint'],
    outcome: 'A business that scales with structural integrity — growing fast without the systems failing underneath it.',
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
    <div className="max-w-7xl mx-auto relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT */}
        <div className="space-y-7">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white">
              Structured
              <span className="block text-blue-300">Strategy.</span>
            </h1>
            <p className="text-base sm:text-lg max-w-md text-gray-400">The founders who move faster are not the ones who seek more advice. They are the ones who find the right system. Every engagement at Sarsen begins with understanding the full truth of where you are.
            </p>
          </div>
        </div>

        {/* RIGHT — visual */}
        <div
          className="relative hidden lg:flex items-center justify-end"
          style={{ height: '420px' }}
          aria-hidden="true"
        >
          <img src="/assets/resources/Strategy Head.svg" alt="" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  </section>
);

// =====================================================
// GLOBAL DELIVERY RULES BANNER — kept as is (border only)
// =====================================================

const DeliveryRulesBanner: FC = () => (
  <div
    className="border-y bg-white"
    style={{ borderColor: '#E5E7EB' }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
        <p className="text-xs font-medium st  text-gray-500">
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
// TAG FILTER BAR — fixed clipping, rounded-md
// =====================================================

interface TagFilterBarProps {
  activeTag: string;
  onTagChange: (tag: string) => void;
}

const TagFilterBar: FC<TagFilterBarProps> = ({ activeTag, onTagChange }) => (
  <div
    className="flex gap-2 overflow-x-auto overflow-visible py-2"
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
          className="flex-shrink-0 px-4 py-2 rounded-md text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
      className="group cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="absolute rounded-md"
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
          className="absolute right-8 top-1/2 -translate-y-1/2  select-none"
          style={{ fontSize: '8rem', color: 'rgba(59,130,246,0.06)', lineHeight: 1 }}
          aria-hidden="true"
        >
          {service.packageNumber.split(' ')[1]}
        </div>

        <div className="relative z-10 flex items-center gap-3 flex-wrap">
          <span
            className="px-3 py-1 rounded-md text-xs font-semibold"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {service.tag}
          </span>
          
          <span
            className="px-3 py-1 rounded-md text-xs font-medium"
            style={{ backgroundColor: 'rgba(59,130,246,0.08)', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.14)' }}
          >
            Compulsory Entry
          </span>
        </div>
      </div>

      <div className="px-8 sm:px-10 py-6 sm:py-8">
        <p className="text-xs st  mb-2 text-blue-300/70">
          {service.tagline}
        </p>
        <h2
          className="  mb-3 group-hover:text-blue-300 transition-colors duration-200 text-white"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)' }}
        >
          {service.title}
        </h2>
        <p className="text-sm  mb-6 max-w-3xl text-gray-400">
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
      className="group cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 flex flex-col"
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
          className="absolute right-4 top-1/2 -translate-y-1/2  select-none"
          style={{ fontSize: '4.5rem', color: 'rgba(59,130,246,0.07)', lineHeight: 1 }}
          aria-hidden="true"
        >
          {service.packageNumber.split(' ')[1]}
        </div>

        <div className="relative z-10 flex items-center gap-2 flex-wrap">
          <span
            className="px-2.5 py-1 rounded-md text-xs font-semibold"
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
          className="font-medium  mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 text-white"
          style={{ fontSize: '0.9rem' }}
        >
          {service.title}
        </h3>
        <p className="text-xs  mb-4 line-clamp-3 text-gray-400">
          {service.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.deliverables.map((d) => (
            <span
              key={d}
              className="px-2 py-0.5 rounded-md text-xs"
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
    className="my-12 rounded-md overflow-hidden bg-white border border-gray-200"
  >
    <div className="px-6 sm:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center bg-blue-50"
          >
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium st  text-gray-500">
              The Package Journey
            </p>
            <p className="text-sm  text-gray-600">
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
                  className="px-2 py-0.5 rounded-md text-xs font-semibold mb-1"
                  style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
                >
                  {service.tag}
                </span>
                <p
                  className="text-xs  group-hover:opacity-100 transition-opacity text-gray-500"
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
                <span className="text-blue-600"> in {activeTag}</span>
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

          {/* Package Journey Strip */}
          {showJourneyStrip && (
            <PackageJourneyStrip services={ALL_SERVICES} />
          )}

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
              <p className="text-lg  mb-1 text-gray-900">
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