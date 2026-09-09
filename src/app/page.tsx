// app/page.tsx
'use client';

import Link from 'next/dist/client/link';
import React, { useState, useEffect, useRef } from 'react';
import { apiRequest } from '@/services/api';

// =====================================================
// DATA — LEFT PANEL ONLY. Independent of the chart on the
// right (which stays fixed to the 4 lifecycle stages).
// Add/remove as many items as you like — the loop below
// will cycle through however many entries are here, then
// wrap back to the first. These are illustrative — swap
// in your own figures/sources.
// =====================================================
const LEFT_PANEL_INSIGHTS = [
  { label: 'of Startups Fail Because There is No Real Market Need', value: 42 },
  { label: 'of Startups Run Out of Cash Before Finding Traction', value: 29 },
  { label: 'of Emerging Businesses Get Outcompeted on Execution Not Idea', value: 23 },
  { label: 'of   Emerging Businesses Struggle With the Wrong Team Composition', value: 23 },
  { label: 'of Startups Fail From Pricing That Never Gets Tested', value: 18 },
  { label: 'of Emerging Businesses Stall Because Positioning Is Unclear', value: 35 },
  { label: 'of Businesses Lose Momentum Chasing Too Many Priorities', value: 31 },
  { label: 'of Businesses Never Separate Founder Effort From Systems', value: 27 },
  { label: 'of Emerging Businesses Overestimate their Actual Runway', value: 24 },
  { label: 'of Businesses Delay Hard Calls Until It is Too Late', value: 38 },
  { label: 'of Products Scale Before Product-Market Fit is Proven', value: 22 },
  { label: 'of Startups Depend Entirely on Founder-Led Sales', value: 33 },
  { label: 'of Emerging Businesses Ignore Unit Economics Until It Hurts', value: 26 },
  { label: 'of Businesses Confuse Being Busy With Moving Forward', value: 30 },
  { label: 'of Products Underestimate Customer Acquisition Cost', value: 28 },
  { label: 'of Businesses Raise Capital Without a Clear Use For It', value: 20 },
  { label: 'of Products Are Built For a Customer That Does Not Exist', value: 25 },
  { label: 'of Larger Businesses Let Culture Drift As Headcount Grows', value: 19 },
  { label: 'of Businesses Treat Strategy As a One-Time Exercise', value: 34 },
  { label: 'of Businesses Wait Too Long to Bring in Outside Perspective', value: 40 },
];

// =====================================================
// GRAPH DATA — used only by the chart on the right. Kept
// separate from LEFT_PANEL_INSIGHTS on purpose so the two
// sides never have to stay in sync.
// =====================================================
const LIFECYCLE_STAGES = [
  { label: 'Introduction', value: 10 },
  { label: 'Growth', value: 35 },
  { label: 'Maturity', value: 40 },
  { label: 'Decline', value: 15 },
];

// =====================================================
// LOOPING TYPING / STAGE HOOK
// Types each item's label forward, holds briefly, then
// moves to the next item — wrapping back to the first once
// it reaches the end, so it runs indefinitely.
// =====================================================
const useLoopingStageSequence = (
  stages: { label: string; value: number }[],
  typingSpeed = 55,
  holdDuration = 650,
  gapDuration = 200
) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let charCount = 0;
    let typingTimer: ReturnType<typeof setTimeout>;
    let holdTimer: ReturnType<typeof setTimeout>;

    setDisplayText('');

    const typeNextChar = () => {
      charCount += 1;
      setDisplayText(stages[activeIndex].label.slice(0, charCount));

      if (charCount < stages[activeIndex].label.length) {
        typingTimer = setTimeout(typeNextChar, typingSpeed);
      } else {
        holdTimer = setTimeout(() => {
          setActiveIndex((prev) => (prev + 1) % stages.length);
        }, holdDuration);
      }
      // wraps via modulo above, so this keeps going forever
    };

    typingTimer = setTimeout(typeNextChar, gapDuration);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(holdTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, stages, typingSpeed, holdDuration, gapDuration]);

  return { activeIndex, displayText };
};

// =====================================================
// LEFT SIDE — identical pattern to before: percent slides
// in from the left, label types out beneath it (no cursor).
// =====================================================
const LifecycleCallout = ({
  activeIndex,
  displayText,
}: {
  activeIndex: number;
  displayText: string;
}) => {
  return (
    <div className="space-y-2">
      <style>{`
        @keyframes slideInFromLeftPLC {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .percent-slide-in-plc {
          animation: slideInFromLeftPLC 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      <div key={`percent-${activeIndex}`} className="percent-slide-in-plc">
        <span className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-blue-300">
          {LEFT_PANEL_INSIGHTS[activeIndex].value}%
        </span>
      </div>

      <div className="h-8 sm:h-9">
        <p className="text-xl sm:text-2xl text-white/80">{displayText}</p>
      </div>
    </div>
  );
};

// =====================================================
// RIGHT SIDE — the line draws once, the dot travels the
// curve once, and both freeze at the end point. Fully
// static/independent of the left panel's data loop.
// =====================================================
const ProductLifecycleChartOnce = () => {
  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineOnce {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-once {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineOnce 3.2s ease-in-out forwards;
        }
      `}</style>

      <svg viewBox="0 0 400 210" className="w-full h-auto">
        <path
          id="plc-path-once"
          d="M 20 190 C 70 185, 90 170, 110 150 C 140 110, 160 70, 200 55 C 230 45, 270 42, 300 55 C 330 68, 350 100, 380 150"
          fill="none"
          stroke="#ffffff"
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          className="draw-line-once"
        />
        <circle r={5} fill="#ffffff" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.9))' }}>
          <animateMotion dur="3.2s" repeatCount="1" fill="freeze" rotate="auto">
            <mpath href="#plc-path-once" />
          </animateMotion>
        </circle>
      </svg>

      <div className="flex justify-between sm:text-sm text-white/50 mt-2 px-1">
        <span>Introduction</span>
        <span>Growth</span>
        <span>Maturity</span>
        <span>Decline</span>
      </div>

      <p className="text-white/70 text-base text-center mt-6">
        Sarsen Strengthens Businesses At Every Stage
      </p>
    </div>
  );
};

// =====================================================
// HERO SECTION — background, grid pattern, and the two-
// column layout. Responsive across mobile (base), tablet
// (sm), and laptop/desktop (lg).
// =====================================================
export const ProductLifecycleHero = () => {
  const { activeIndex, displayText } = useLoopingStageSequence(LEFT_PANEL_INSIGHTS);

  return (
    <section className="relative bg-[#0A1E3D] min-h-[500px] sm:min-h-[600px] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid-plc-hero"
              patternUnits="userSpaceOnUse"
              width="5"
              height="5"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-plc-hero)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <h2 className="text-xl  text-white">
              Potential Creates Possibilities. Strategy Brings Growth. Results Prove It.
            </h2>
            <LifecycleCallout activeIndex={activeIndex} displayText={displayText} />
          </div>

          <div className="relative h-56 sm:h-72 lg:h-[420px] flex items-center justify-center lg:justify-end">
            <ProductLifecycleChartOnce />
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// PIONEERS WE ENDORSE — AUTO-SCROLLING MARQUEE
// Infinite ticker of globally recognised company logos/names
// Below the strip: data-privacy statement using "Sarsen"
// =====================================================
const PioneersStrip = () => {
  const pioneers: { name: string; description: string }[] = [
    { name: 'Ather Energy', description: 'Turned category scepticism into category leadership' },
    { name: 'Shrey Sports', description: 'Priced on trust before the market priced them at all' },
    { name: 'Gyan Dairy', description: 'Made backward integration a regional moat' },
    { name: 'Faasos', description: 'Rebuilt the unit economics before rebuilding the brand' },
    { name: 'Binghatti Properties', description: 'Used design as a land‑acquisition strategy' },
    { name: 'Mashreq', description: 'Ran digital transformation as a margin decision' },
    { name: 'Evian', description: 'Turned provenance into a global pricing lever' },
    { name: 'Bro Code', description: 'Built distribution loyalty before building distribution' },
  ];

  const doubled = [...pioneers, ...pioneers];

  return (
    <section className="bg-[#F0F4F8] py-10 sm:py-12 overflow-hidden">
      {/* Centered heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0A1E3D]">
          Same Principles Across Businesses & Sectors
        </h3>
        <p className="text-gray-600">
          The Businesses That Understand Strategy Exponentially Increase the Impact of Execution.
        </p>
      </div>

      {/* Marquee wrapper */}
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-24 z-10 bg-gradient-to-r from-[#F0F4F8] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-24 z-10 bg-gradient-to-l from-[#F0F4F8] to-transparent" />

        <div
          className="flex gap-4 sm:gap-6"
          style={{
            width: 'max-content',
            animation: 'marqueeScroll 40s linear infinite',
          }}
        >
          {doubled.map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 bg-white border border-gray-200 rounded-md px-5 py-3 sm:px-7 sm:py-4 shadow-sm flex flex-col items-center justify-center min-w-[200px] sm:min-w-[240px]"
            >
              <span className="text-[#0A1E3D] font-semibold text-sm sm:text-xl whitespace-nowrap">
                {p.name}
              </span>
              <span className="text-gray-500 text-[10px] sm:text-sm mt-1 text-center max-w-[180px] sm:max-w-[220px] leading-tight">
                {p.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Centered Privacy Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
        <div className="flex flex-row items-center justify-center gap-3 bg-transparent rounded-md px-5 py-4 sm:px-7 sm:py-5">
          <span className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-transparent flex items-center justify-center">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="#0A1E3D"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-center">
            <span className="font-semibold text-[#0A1E3D]">At Sarsen</span>, Every Engagement
            is Governed by Strict Professional Confidentiality.
          </p>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// REPORT SECTION COMPONENT (updated)
// Now sends the modal form to POST /report-interest via apiRequest,
// following the same pattern as ContactFormSection.
//
// SETUP: add this import to the top of app/page.tsx:
//   import { apiRequest } from '@/services/api';
// Then replace the existing `const ReportSection = () => { ... }`
// block in app/page.tsx with everything below.
// =====================================================
const ReportSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    describesYou: '',
    businessStage: '',
    uncertainty: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await apiRequest('POST', '/report-interest', {
        body: formData,
      });

      setSubmitted(true);
    } catch (err: any) {
      // err.message comes directly from the backend — always human readable
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    // Reset after the closing animation settles so the form is fresh next open
    setTimeout(() => {
      setSubmitted(false);
      setError('');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        describesYou: '',
        businessStage: '',
        uncertainty: '',
      });
    }, 300);
  };

  return (
    <>
      <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <div className="space-y-6">

              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800">
                Indian Startup Ecosystem Report 2026
              </h2>

              <div className="space-y-4">
                <p className="text-gray-700 text-base sm:text-lg">
                  Comprehensive Analysis of India's Startup Landscape covering Funding Trends,
                  Sectorwise Growth Patterns, Emerging Opportunities across Tiers, and Strategic Insights for Founders and Investors.
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  Based on Data from more than 5000 Startups, Investor Interviews, and Ground-Level
                  Research across 15 Startup Hubs Pan India. Essential Reading for Founders, Investors & Advisors.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                  </svg>
                  <span>252 Pages</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2z" />
                  </svg>
                  <span>Last Updated: April 2026</span>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="bg-white rounded-md shadow-2xl overflow-hidden max-w-md w-full transform transition-transform duration-300 hover:scale-105">
                <div className="bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] h-64 sm:h-72 md:h-80 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 overflow-hidden rounded-t-md rounded-b-none">
                    <img
                      src="/assets/home/Report 2026.webp"
                      alt="Report 2026"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                <div className="p-6 bg-white">
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3.5 px-6 rounded-md transition-all duration-300 font-medium text-base flex items-center justify-center gap-2"
                  >
                    Request Full Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 overflow-y-auto"
          onClick={closeModal}
        >
          <div className="flex items-end sm:items-center justify-center min-h-full px-4 sm:py-8">
            <div
              className="bg-white max-w-lg w-full rounded-md p-6 sm:p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>

              {!submitted ? (
                <>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    Request the full report
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    We&apos;ll email you the report and use responses to improve future research.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[#0A1E3D] mb-1">
                        Full Name
                      </label>
                      <input
                        required
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0A1E3D]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0A1E3D] mb-1">
                        Work Email
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0A1E3D]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0A1E3D] mb-1">
                        Phone Number
                      </label>
                      <input
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0A1E3D]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0A1E3D] mb-1">
                        Which best describes you?
                      </label>
                      <select
                        required
                        name="describesYou"
                        value={formData.describesYou}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-[#0A1E3D] focus:outline-none focus:ring-1 focus:ring-[#0A1E3D]"
                      >
                        <option value="" disabled>Select an option</option>
                        <option>Founder or Co-founder</option>
                        <option>CXO or Leadership</option>
                        <option>Early Employee</option>
                        <option>Investor or Advisor</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0A1E3D] mb-1">
                        Current business stage
                      </label>
                      <select
                        required
                        name="businessStage"
                        value={formData.businessStage}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-[#0A1E3D] focus:outline-none focus:ring-1 focus:ring-[#0A1E3D]"
                      >
                        <option value="" disabled>Select an option</option>
                        <option>Pre-idea / Exploring</option>
                        <option>Idea validated, No Revenue</option>
                        <option>Early revenue</option>
                        <option>Scaling</option>
                        <option>Preparing to Raise Capital</option>
                        <option>Post-Fundraise</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0A1E3D] mb-1">
                        Biggest Uncertainty Right Now
                      </label>
                      <select
                        required
                        name="uncertainty"
                        value={formData.uncertainty}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-[#0A1E3D] focus:outline-none focus:ring-1 focus:ring-[#0A1E3D]"
                      >
                        <option value="" disabled>Select an option</option>
                        <option>Product</option>
                        <option>Customer Profile</option>
                        <option>Pricing</option>
                        <option>Fundraising</option>
                        <option>Scalability</option>
                        <option>Unsure or Something Else</option>
                      </select>
                    </div>

                    {error && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Email me the report'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    Check your email
                  </h3>
                  <p className="text-gray-600">
                    Your copy will be sent shortly. In case you need Help with your Business
                    Apply for our Strategic Diagnostic &amp; Direction Program.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// =====================================================
// VISUAL — STAIRCASE DIAGRAM (SCROLL-TRIGGERED STAGGERED SLIDE-UP)
// Used inside "We Drive Progress Through Strategy" section.
// Each step appears one after the other from bottom to top
// when the section scrolls into view.
// =====================================================
const StaircaseDiagram = () => {
  const steps = [
    'Progress',
    'Drive Results',
    'Focus the Effort',
    'Find the Constraint',
    'Map the Drivers',
    'Diagnose the Business',
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the diagram is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-md">
      <div className="flex flex-col items-center xl:items-start space-y-3">
        {steps.map((label, index) => {
          const widthPct = 100 - (steps.length - 1 - index) * 10;
          // Bottom step (index 5) has delay 0ms, top step (index 0) gets 750ms
          const delay = (steps.length - 1 - index) * 150;

          return (
            <div
              key={label}
              className="flex items-center justify-center rounded-md border-2 border-white bg-[#0A1E3D] text-white font-medium px-4 py-2"
              style={{
                width: `${widthPct}%`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`,
              }}
            >
              <span className="text-sm sm:text-base">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// =====================================================
// COMPANY HELPS SECTION
// =====================================================
const CompanyHelpsSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const expertiseAreas = [
    {
      title: "When Sales Effort Isn't Turning Into Predictable Revenue",
      description:
        "Founders often assume growth problems are marketing problems. In reality, the issue is usually unclear positioning, fragile pricing, or a sales process that only works when the founder is involved. We redesign how revenue is generated — from who you sell to, how you price, and how deals actually close — so growth stops being dependent on hustle and starts becoming repeatable.",
    },
    {
      title: 'When Cash Feels Tight Despite Decent Revenue',
      description:
        "Many businesses don't fail because they aren't profitable on paper — they fail because cash timing, burn structure, and growth decisions are misaligned. We help founders understand where money is actually leaking, how long the business can realistically operate, and whether raising capital, slowing down, or restructuring is the right move — before the situation becomes urgent.",
    },
    {
      title: 'When the Business Runs on You Instead of Systems',
      description:
        "If decisions, approvals, and problem-solving keep flowing back to the founder, scale becomes impossible. We design operating systems — roles, processes, metrics, and accountability — so the business can function without constant intervention, reducing chaos, delays, and silent burnout inside teams.",
    },
    {
      title: 'When Direction Feels Unclear or Reactive',
      description:
        'Many teams stay busy without moving meaningfully forward. Initiatives change every quarter, priorities shift, and long-term direction remains vague. We help founders step out of reactive decision-making and build a clear strategic direction — deciding what not to pursue as deliberately as what to focus on.',
    },
    {
      title: "When You're Unsure If the Product Is the Real Problem",
      description:
        "Founders often sense something is wrong but can't tell whether it's the product, the customer, the market, or the messaging. We help isolate whether the issue is product-market fit, positioning, or execution — so teams stop rebuilding blindly and start fixing the right constraint.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const section = sectionRef.current;
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
        const scrollProgress =
          (windowHeight - sectionTop) / (windowHeight + sectionHeight);
        const cardIndex = Math.min(
          Math.floor(scrollProgress * expertiseAreas.length),
          expertiseAreas.length - 1
        );
        setActiveCard(cardIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [expertiseAreas.length]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0A1E3D] py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[28rem_1fr] gap-6 sm:gap-8 lg:gap-8 items-center">
            {/* LEFT — Staircase Diagram. On mobile this drops below the
                description (order-2); on desktop it sits on the left
                (order-1 / first grid column). Column is fixed at 28rem
                (matching the diagram's own max-w-md) so the diagram
                renders at full, undistorted width, and the gap to the
                right stays constant regardless of screen width. */}
            <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
              <StaircaseDiagram />
            </div>

            {/* RIGHT — Heading + description. On mobile this comes first
                (order-1); on desktop it sits on the right (order-2 /
                second grid column), taking up the remaining space. */}
            <div className="order-1 lg:order-2 max-w-4xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
                We Drive Progress Through Strategy.
              </h2>
              <p className="text-gray-300 text-base sm:text-lg">
               Businesses rarely have One Single Problem. Growth.. Revenue.. Customers.. Margins.. People.. Systems.. & Capital are Connected. Our Work is to Decipher those Connections, Identify Actual Constraints, And Help Our Clients Capture the Greatest Opportunities.
              </p>
            </div>
          </div>
        </div>

{/* Commented this Because This Section Defined For What We Do .... Kind of Indication When To Call Us */}
        {/* <div className="relative min-h-[250px] sm:min-h-[300px]">
          {expertiseAreas.map((area, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${index === activeCard ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
              <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-md p-6 sm:p-8 lg:p-12 border border-blue-800/30 hover:border-blue-700/50 transition-all duration-300 h-full overflow-y-auto">
                <h3 className="text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium mb-4 sm:mb-6">
                  {area.title}
                </h3>
                <p className="text-gray-300 text-base lg:text-lg">
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {expertiseAreas.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCard(index)}
              className={`transition-all duration-300 rounded-full ${index === activeCard
                  ? 'bg-blue-500 w-12 h-3'
                  : 'bg-blue-800/50 w-3 h-3 hover:bg-blue-700/50'
                }`}
              aria-label={`View service ${index + 1}`}
            />
          ))}
        </div> */}

        <div className="mt-16 sm:mt-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-gray-300 text-base sm:text-lg mb-2">
We Start By Absorbing The Complete Context.<br></br>

Engagements Begin with Analysing the Situation From Every Relevant Angle, Bringing Together Internal Data, External Forces, Market Dynamics, Customer Behaviour, Competition, And Economics To Understand the Complete Picture.
              </p>
              <p className="text-gray-500 text-base">
                Engagements are Structured to Develop the Capacity of Execution thus creating No Dependency.
              </p>
            </div>

            <div className="flex-shrink-0">
              <button className="bg-[#132B47] border border-2 border-gray-300 text-white hover:bg-white hover:text-[#0A1E3D] px-8 py-4 rounded-md transition-all duration-300 font-medium text-base shadow-lg hover:shadow-xl flex items-center gap-3 group">
                <Link href="/services" className="flex items-center gap-2">
                  <span className="font-medium">Learn More</span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// TESTIMONIALS SECTION
// The quote card now uses the exact hero blue (#0A1E3D)
// with the same diagonal-line pattern as the hero section.
// The quote glyph and all text inside this card are white
// or grey so they read on the dark background.
// =====================================================
const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

const entrepreneurs = [
  {
    id: 1,
    name: 'Naval Ravikant',
    title: 'Founder at AngelList',
    quote:
      'Play Long-Term Games with Long-Term People. Specific Knowledge is found by pursuing your genuine Curiosity and Passion rather than whatever is hot right now. Building anything great requires careful Strategic Thinking combined with Relentless Execution.',
    image: '/assets/home/naval.jpeg',
    handle: '@naval',
  },

  {
    id: 2,
    name: 'Paul Graham',
    title: 'Co-founder at Y Combinator',
    quote:
      "The way to get Startup Ideas is not to try to think of Startup Ideas. It's to look for Problems, preferably Problems you have yourself. The best Ideas seem obvious in Retrospect, but finding them requires deep Strategic Insight into Market Needs.",
    image: '/assets/home/Paul.webp',
    handle: '@paulg',
  },

  {
    id: 3,
    name: 'Peter Thiel',
    title: 'Co-founder at PayPal & Palantir',
    quote:
      "Competition is for Losers. If you want to create Lasting Value, build a Monopoly. But building something truly valuable requires intense Focus on a Specific Problem and Strategic Positioning that others haven't thought of.",
    image: '/assets/home/Peter.webp',
    handle: '@peterthiel',
  },

  {
    id: 4,
    name: 'Reid Hoffman',
    title: 'Co-founder at LinkedIn',
    quote:
      "An Entrepreneur is someone who Leaps off a Cliff and Builds a Plane on the Way Down. But the smartest Entrepreneurs don't merely Build. They Strategize, they Plan, they seek Counsel from those who've did before.",
    image: '/assets/home/Reid.png',
    handle: '@reidhoffman',
  },

  {
    id: 5,
    name: 'Marc Andreessen',
    title: 'Co-founder at Andreessen Horowitz',
    quote:
      'Software is Eating the World, but Strategy guides where it Bites. The Difference between Success and Failure often comes down to making the Right Strategic Decisions at the Right Time with the Right Guidance.',
    image: '/assets/home/Marc.png',
    handle: '@pmarca',
  },

  {
    id: 6,
    name: 'Brian Chesky',
    title: 'Co-founder at Airbnb',
    quote:
      'Build something 100 People Love, Not Something 1 Million People Kind of Like. This requires Deep Customer Understanding and Strategic Focus. Something that benefits Immensely from Experienced Guidance and External Perspective.',
    image: '/assets/home/Brian.webp',
    handle: '@bchesky',
  },
];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % entrepreneurs.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [entrepreneurs.length]);

  const person = entrepreneurs[activeIndex];

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-fadeUp {
          animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-6">
            Accomplished Entrepreneurs Understand This
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
Exceptional Founders Understands That Strategy Determines Where Execution Takes You.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div key={`card-${activeIndex}`} className="animate-slideInLeft">
              <div className="relative overflow-hidden bg-[#0A1E3D] rounded-md p-6 sm:p-8 lg:p-10 border border-blue-900/30">
                {/* Same diagonal grid pattern used in the hero section */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern
                        id="grid-testimonial-quote"
                        patternUnits="userSpaceOnUse"
                        width="5"
                        height="5"
                        patternTransform="rotate(45)"
                      >
                        <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" strokeWidth="0.75" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-testimonial-quote)" />
                  </svg>
                </div>

                <div className="relative z-10">
                  {/* Updated quotation symbol */}
                  <div className="mb-5">
                    <img
                      src="/assets/home/Quoted.svg"
                      alt="Quote Icon"
                      width={52}
                      height={38}
                      className="rotate-180 scale-y-[-1]"
                    />
                  </div>
                  <blockquote className="text-white text-sm sm:text-base lg:text-lg mb-6">
                    {person.quote}
                  </blockquote>
                  <div className="pt-4">
                    <p className="text-white font-semibold text-base sm:text-lg mb-1">{person.name}</p>
                    <p className="text-gray-300 text-xs sm:text-sm">{person.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end gap-8">
            <div key={`profile-${activeIndex}`} className="animate-fadeUp w-full max-w-xs">
              <div className="bg-white rounded-md border border-gray-200 shadow-sm px-5 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 border-2 border-gray-200">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.style.background =
                            'linear-gradient(135deg, #3B82F6, #1D4ED8)';
                          target.parentElement.innerHTML = `<span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:white;font-weight:700;font-size:1.1rem;">${person.name
                            .split(' ')
                            .map((n: string) => n[0])
                            .join('')}</span>`;
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold text-sm sm:text-base">{person.name}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-0.5">{person.title}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {entrepreneurs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-300 rounded-full ${index === activeIndex
                      ? 'bg-blue-500 w-8 h-3'
                      : 'bg-gray-300 w-3 h-3 hover:bg-gray-400'
                    }`}
                  aria-label={`View entrepreneur ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// FREE RESOURCES SECTION — DATA
// Each resource now carries the same fields used by the
// tool cards on /tools (tag, format, complexity, useCase)
// so the same thumbnail design can be reused here. If a
// resource has a `url`, the card links straight to the
// actual tool; if it doesn't, clicking opens the same
// access-request modal used on the tools page.
// =====================================================
interface ResourceItem {
  id: number;
  title: string;
  excerpt: string;
  tag: string;
  format: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  useCase: string;
  url?: string;
}

const RESOURCES: ResourceItem[] = [
  {
    id: 1,
    title: 'Startup Valuation Calculator',
    excerpt:
      "Calculate your company's valuation using multiple methodologies - DCF, comparable analysis, and revenue multiples.",
    tag: 'Valuation',
    format: 'Excel + Web App',
    complexity: 'Advanced',
    useCase: 'Pre-fundraise valuation benchmarking',
    url: '/tools',
  },
  {
    id: 2,
    title: 'Team Psychometric Assessment',
    excerpt:
      'Evaluate team dynamics, leadership styles, and cultural fit. Identify strengths and gaps in your team.',
    tag: 'People',
    format: 'Online Tool',
    complexity: 'Intermediate',
    useCase: 'Leadership team composition audit',
  },
  {
    id: 3,
    title: 'Cash Flow Forecasting Tool',
    excerpt:
      "Project your 13-week cash runway with scenario planning. See when you'll need funding or reach profitability.",
    tag: 'Finance',
    format: 'Excel Template',
    complexity: 'Intermediate',
    useCase: 'Short-term liquidity management',
  },
  {
    id: 4,
    title: 'Market Sizing Framework',
    excerpt:
      'Calculate TAM, SAM, and SOM for your business with templates to present to investors.',
    tag: 'Strategy',
    format: 'Slides + Guide',
    complexity: 'Beginner',
    useCase: 'Pitch deck market sizing slide',
    url: '/tools',
  },
  {
    id: 5,
    title: 'Financial Model Template',
    excerpt:
      'Pre-built Excel model with P&L, balance sheet, and cash flow projections for startups.',
    tag: 'Finance',
    format: 'Excel Template',
    complexity: 'Advanced',
    useCase: '3-statement fundraising model',
  },
  {
    id: 6,
    title: 'Pitch Deck Framework',
    excerpt:
      'Comprehensive slide-by-slide guide for creating investor-ready pitch decks that convert.',
    tag: 'Fundraising',
    format: 'Slides Template',
    complexity: 'Beginner',
    useCase: 'Series seed/A pitch deck construction',
  },
];

// Same tag / complexity palette used on /tools so the
// thumbnail reads identically on both pages.
const RESOURCE_TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Valuation:   { bg: '#DBEAFE', text: '#1E40AF' },
  Finance:     { bg: '#E0F2FE', text: '#0369A1' },
  Metrics:     { bg: '#E6F0FF', text: '#1E3A8A' },
  Strategy:    { bg: '#DBEAFE', text: '#1E40AF' },
  Revenue:     { bg: '#E0F2FE', text: '#0369A1' },
  Fundraising: { bg: '#E6F0FF', text: '#1E3A8A' },
  People:      { bg: '#E0E7FF', text: '#3730A3' },
  Operations:  { bg: '#DBEAFE', text: '#1E40AF' },
};

const RESOURCE_COMPLEXITY_COLORS: Record<ResourceItem['complexity'], { bg: string; text: string; dot: string }> = {
  Beginner:     { bg: '#DBEAFE', text: '#1E40AF', dot: '#3B82F6' },
  Intermediate: { bg: '#E0F2FE', text: '#0369A1', dot: '#2563EB' },
  Advanced:     { bg: '#E6F0FF', text: '#1E3A8A', dot: '#1E3A8A' },
};

const getResourceTagStyle = (tag: string): { bg: string; text: string } =>
  RESOURCE_TAG_COLORS[tag] ?? { bg: '#DBEAFE', text: '#1E40AF' };

const getResourceComplexityStyle = (c: ResourceItem['complexity']) =>
  RESOURCE_COMPLEXITY_COLORS[c];

// =====================================================
// RESOURCE ACCESS MODAL — same pattern as the tools page's
// PartnerAuthModal, used when a resource has no direct url.
// =====================================================
interface ResourceAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle: string;
}

const ResourceAuthModal = ({ isOpen, onClose, resourceTitle }: ResourceAuthModalProps) => {
  const [formData, setFormData] = useState({ partnerId: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData({ partnerId: '', password: '' });
      setError('');
      setSuccess(false);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (formData.partnerId && formData.password) {
        setSuccess(true);
        setLoading(false);
      } else {
        setError('Invalid Partner ID or password. Please try again.');
        setLoading(false);
      }
    }, 1000);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-md"
        style={{ animation: 'modalIn 0.3s cubic-bezier(0.22,1,0.36,1) both' }}
      >
        <div className="bg-white rounded-md shadow-2xl overflow-hidden">

          <div className="px-8 py-6 relative border-b border-gray-200">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-semibold text-gray-800">Request Access</h2>
            <p className="text-sm text-gray-600 mt-1">
              Enter your partner credentials to access: <span className="font-medium text-gray-700">{resourceTitle}</span>
            </p>
          </div>

          <div className="px-8 py-8">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-3">
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Partner ID</label>
                  <input
                    type="text"
                    value={formData.partnerId}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData((p) => ({ ...p, partnerId: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                    placeholder="e.g. SSP-2024-XXXX"
                    required
                    autoComplete="username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData((p) => ({ ...p, password: e.target.value }))
                      }
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 text-sm ${
                    loading ? 'opacity-75 cursor-not-allowed' : 'shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Authenticating…
                    </>
                  ) : 'Access Tool'}
                </button>

                <p className="text-center text-xs text-gray-400 pt-1">
                  Don&apos;t have a Partner ID?{' '}
                  <a href="#" className="text-blue-600 hover:underline">Request Access</a>
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Access Granted</h3>
                <p className="text-gray-500 text-sm">
                  Opening <span className="font-medium text-gray-700">{resourceTitle}</span>…
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-sm mt-4 text-gray-400">
          Partner access is monitored and logged for security purposes.
        </p>
      </div>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// =====================================================
// RESOURCE CARD — same thumbnail design as the ToolCard
// used on /tools: dark navy header with a faint grid,
// tag + complexity badges, a lock icon, and a footer with
// the format badge and an arrow. If the resource has a
// `url`, the whole card is a Link to the actual tool;
// otherwise clicking opens the ResourceAuthModal.
// =====================================================
interface ResourceCardProps {
  resource: ResourceItem;
  onOpen: (title: string) => void;
}

const ResourceCard = ({ resource, onOpen }: ResourceCardProps) => {
  const tagStyle = getResourceTagStyle(resource.tag);
  const complexityStyle = getResourceComplexityStyle(resource.complexity);

  const cardInner = (
    <>
      <div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, ${tagStyle.text}30, transparent)` }}
      />

      <div
        className="relative h-28 px-5 flex items-end pb-4 overflow-hidden"
        style={{ background: 'linear-gradient(155deg, #132B47 0%, #0A1E3D 100%)' }}
      >
        <div className="absolute inset-0 overflow-hidden opacity-[0.04]" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 200 112">
            {Array.from({ length: 6 }, (_, i) => (
              <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="112" stroke="#93C5FD" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 3 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 40} x2="200" y2={i * 40} stroke="#93C5FD" strokeWidth="0.5" />
            ))}
          </svg>
        </div>

        <div className="relative z-10 flex items-center gap-2 flex-wrap">
          <span
            className="px-2.5 py-1 rounded-md text-xs font-semibold"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {resource.tag}
          </span>
          <span
            className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs"
            style={{ backgroundColor: complexityStyle.bg, color: complexityStyle.text }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: complexityStyle.dot }} />
            {resource.complexity}
          </span>
        </div>

        <div
          className="absolute top-4 right-4 z-10 opacity-25 group-hover:opacity-70 transition-opacity"
          aria-hidden="true"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="#9CA3AF" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>

      <div className="px-5 py-4">
        <p className="text-xs mb-1 font-medium text-blue-300">{resource.useCase}</p>
        <h3
          className="font-medium mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 text-white"
          style={{ fontSize: '0.9rem' }}
        >
          {resource.title}
        </h3>
        <p className="text-xs mb-4 line-clamp-2 text-gray-400">{resource.excerpt}</p>

        <div className="flex items-center justify-between pt-3">
          <span
            className="text-xs px-2 py-0.5 rounded-md"
            style={{ backgroundColor: '#132B47', color: '#93C5FD' }}
          >
            {resource.format}
          </span>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
            style={{ backgroundColor: 'rgba(59,130,246,0.06)' }}
            aria-hidden="true"
          >
            <svg className="w-3 h-3" fill="none" stroke="#93C5FD" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );

  const commonClassName =
    'group cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-[340px] flex-shrink-0 block';
  const commonStyle = { backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.08)' };

  if (resource.url) {
    return (
      <Link
        href={resource.url}
        className={commonClassName}
        style={commonStyle}
        aria-label={`Open resource: ${resource.title}`}
      >
        {cardInner}
      </Link>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(resource.title)}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(resource.title)}
      className={commonClassName}
      style={commonStyle}
      aria-label={`Access resource: ${resource.title}`}
    >
      {cardInner}
    </div>
  );
};

// =====================================================
// FREE RESOURCES SECTION
// Scroll buttons now sit above the cards, right-aligned,
// with appropriate spacing. Heading/text take full width.
// =====================================================
const FreeResourcesSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [resourceModal, setResourceModal] = useState<{ open: boolean; title: string }>({
    open: false,
    title: '',
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      const newPosition =
        direction === 'left' ? scrollPosition - scrollAmount : scrollPosition + scrollAmount;
      scrollContainerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollContainerRef.current
    ? scrollPosition <
    scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10
    : true;

  const openResourceModal = (title: string) => setResourceModal({ open: true, title });
  const closeResourceModal = () => setResourceModal({ open: false, title: '' });

  return (
    <section className="bg-[#E8EEF2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading and text take full width */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4">Free Resources</h2>
          <p className="text-gray-600 text-base sm:text-lg text-justify max-w-3xl">
            We Build Research, Publications, Tools, And Frameworks For Founders, Operators, Angel Investors, Venture Capital & Private Equity Investors, And Corporations.
            <br /><br />
            Built To Help Decision-Makers Understand Markets, Evaluate Opportunities, Test Assumptions, And Navigate The Decisions That Shape Performance.
          </p>
        </div>

        {/* Scroll buttons above cards, right-aligned with spacing */}
        <div className="hidden sm:flex justify-end gap-2 mb-4 sm:mb-6">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`rounded-md p-3 bg-white shadow-md transition-all duration-300 ${
              canScrollLeft
                ? 'hover:bg-gray-100 cursor-pointer opacity-100'
                : 'opacity-30 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`rounded-md p-3 bg-white shadow-md transition-all duration-300 ${
              canScrollRight
                ? 'hover:bg-gray-100 cursor-pointer opacity-100'
                : 'opacity-30 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={(e) => setScrollPosition((e.target as HTMLDivElement).scrollLeft)}
          >
            {RESOURCES.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} onOpen={openResourceModal} />
            ))}
          </div>
        </div>

<div className="flex justify-end mt-8">
  <Link
    href="/resources"
    style={{ color: "#0A1E3D" }}
    className="bg-white px-5 sm:px-8 py-2.5 sm:py-4 border-2 border-[#0A1E3D] rounded-md hover:!text-white hover:bg-[#0A1E3D] hover:shadow-xl transition-all duration-300 font-medium flex items-center gap-2 group text-sm sm:text-base"
  >
    <span>More Resources</span>
  </Link>
</div>
      </div>

      <ResourceAuthModal
        isOpen={resourceModal.open}
        onClose={closeResourceModal}
        resourceTitle={resourceModal.title}
      />
    </section>
  );
};

// =====================================================
// STORY & PROCESS SECTION
// =====================================================
const StoryProcessSection = () => {
  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
            Our Approach.  Your Control.
          </h2>
          <div className="text-justify">
            <p className="text-gray-300 text-base sm:text-lg mb-4">
              A Good Strategy Is Not A Fixed Plan For An Uncertain Future. It Anticipates Multiple Possibilities And Evolves As Reality Unfolds.
Founders, Operators, And Investors Must Evolve Their Approach As Markets, Customers, Competition, And Capital Dynamics Change.
            </p>
            <p className="text-gray-400 text-sm sm:text-base">
              At Sarsen we Develop Strategies That are Not Static. They React to Reality, Anticipate What Comes Next, And Evolve as the Business Changes.
We Take Complete Responsibility For the Quality Of Our Work while the Business, the Decisions, And Ultimately the Complete Control Remain With Our Clients.
            </p>
          </div>
        </div>

        <div className="mb-8 items-center text-center">
          <h3 className="text-2xl sm:text-3xl text-white mb-8">The Process</h3>
        </div>

        <div className="bg-[#132B47] rounded-md p-4 sm:p-6 lg:p-12 overflow-x-auto border border-blue-900/30">
          <img
            src="/assets/home/Methedology.svg"
            alt=""
            className="h-48 sm:h-64 mx-auto max-w-full"
          />
        </div>

        <div className="pt-4">
          <div className="text-center">
            <h4 className="text-white text-base sm:text-lg lg:text-xl font-medium mb-2">
              Designed for Founder-Led Execution
            </h4>
            <p className="text-gray-400 text-xs sm:text-sm">
              We step in to clarify decisions, not to run your business. The goal is independence,
              not ongoing consulting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// MAIN HOMEPAGE COMPONENT
// =====================================================
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <ProductLifecycleHero />
      <PioneersStrip />
      <ReportSection />
      <CompanyHelpsSection />
      <TestimonialsSection />
      <FreeResourcesSection />
      <StoryProcessSection />
    </main>
  );
}