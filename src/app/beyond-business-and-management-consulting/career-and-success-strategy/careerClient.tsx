// src/app/beyond-business-and-management/career-and-success-strategy/careerClient.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { apiRequest } from '@/services/api';

// =====================================================
// HOOK — fires once when an element scrolls into view.
// =====================================================
const useInViewOnce = <T extends HTMLElement>(threshold = 0.25) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return { ref, inView };
};

// =====================================================
// SHARED — Diagonal line pattern overlay (site-wide motif).
// Each instance needs a unique id.
// =====================================================
const DiagonalPattern = ({ id, opacity = 'opacity-20' }: { id: string; opacity?: string }) => (
  <div className={`absolute inset-0 ${opacity} pointer-events-none`}>
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id={id}
          patternUnits="userSpaceOnUse"
          width="5"
          height="5"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" strokeWidth="0.75" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  </div>
);

const ChevronIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// =====================================================
// HERO VISUAL — TRAJECTORY CHART
// Two paths from the same starting point:
//  - a flat dashed "drift" line (no strategy)
//  - a solid strategic curve that draws once, with a dot
//    travelling to the summit and freezing there.
// =====================================================
const TrajectoryChart = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Chart space 0..300 x 0..220
  const strategicPath = 'M 30 190 C 90 185, 120 150, 160 115 S 230 45, 270 30';
  const driftPath = 'M 30 190 C 100 182, 180 172, 270 165';

  const milestones = [
    { x: 30, label: 'Today' },
    { x: 110, label: 'Year 5' },
    { x: 190, label: 'Year 10' },
    { x: 270, label: 'Year 15' },
  ];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes trajDraw {
          from { stroke-dashoffset: 400; }
          to   { stroke-dashoffset: 0; }
        }
        .traj-line {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: trajDraw 2.6s ease-out 0.3s forwards;
        }
        .traj-dot {
          offset-path: path('${strategicPath}');
          offset-distance: 0%;
          animation: trajTravel 2.6s ease-out 0.3s forwards;
        }
        @keyframes trajTravel {
          from { offset-distance: 0%; }
          to   { offset-distance: 100%; }
        }
        @keyframes summitPulse {
          0%, 100% { opacity: 0.25; r: 10; }
          50%      { opacity: 0.6;  r: 14; }
        }
        .traj-summit {
          opacity: 0;
          animation: summitPulse 2.4s ease-in-out 3s infinite;
        }
      `}</style>

      {mounted && (
        <svg viewBox="0 0 300 220" className="w-full h-auto" role="img" aria-label="Two career paths from the same starting point: a flat path without strategy and a rising path with strategy">
          {/* Baseline + milestone ticks */}
          <line x1="30" y1="205" x2="270" y2="205" stroke="#ffffff" strokeOpacity={0.3} strokeWidth={1} />
          {milestones.map((m) => (
            <g key={m.label}>
              <line x1={m.x} y1="201" x2={m.x} y2="209" stroke="#ffffff" strokeOpacity={0.5} strokeWidth={1} />
              <text x={m.x} y="218" fill="#93C5FD" fontSize="8.5" textAnchor="middle">{m.label}</text>
            </g>
          ))}

          {/* Drift path (no strategy) */}
          <path d={driftPath} fill="none" stroke="#ffffff" strokeOpacity={0.35} strokeWidth={1.5} strokeDasharray="4 5" />
          <text x="272" y="160" fill="#ffffff" fillOpacity={0.5} fontSize="8" textAnchor="end">Without a Strategy</text>

          {/* Strategic path */}
          <path d={strategicPath} fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" className="traj-line" />
          <text x="262" y="20" fill="#ffffff" fontSize="8.5" textAnchor="end">With a Strategy</text>

          {/* Shared starting point */}
          <circle cx="30" cy="190" r="4" fill="#60a5fa" />

          {/* Summit halo + travelling dot */}
          <circle cx="270" cy="30" r="10" fill="#60a5fa" className="traj-summit" />
          <circle r="4.5" fill="#ffffff" className="traj-dot" style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.85))' }} />
        </svg>
      )}

      <p className="text-white/70 text-base text-center mt-4">
        Same Start. Different Destination.
      </p>
    </div>
  );
};

// =====================================================
// HERO SECTION
// =====================================================
const CareerHeroSection = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[400px] sm:min-h-[500px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <DiagonalPattern id="career-hero-grid" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN */}
          <div className="space-y-6">
            <p className="text-blue-300 text-sm sm:text-base tracking-widest uppercase">
              Sarsen Beyond · Career & Success
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white">
              Career & Success Strategy
            </h1>

            <p className="text-lg sm:text-xl text-gray-300">
              Where You Start Does Not Decide Where You Finish. Your Strategy Does. For Executives, Athletes, Actors, Artists, Public Figures and Anyone with an Ambition Worth Planning For.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a
                href="#enquiry"
                className="w-full sm:w-auto bg-white !text-[#0A1E3D] hover:bg-blue-50 px-6 sm:px-8 py-4 rounded-md transition-all duration-300 font-medium text-base shadow-lg hover:shadow-xl text-center"
              >
                Start Your Strategy
              </a>
              <a
                href="#framework"
                className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:!text-[#0A1E3D] text-white px-6 sm:px-8 py-4 rounded-md transition-all duration-300 font-medium text-base text-center"
              >
                How It Works
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <TrajectoryChart />
          </div>

        </div>
      </div>
    </section>
  );
};

// =====================================================
// WHO IT'S FOR
// =====================================================
const WhoSection = () => {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.15);

  const audiences = [
    {
      title: 'Executives & Aspiring CEOs',
      body: 'A Deliberate Path to the C-Suite, Whether That is Five Years Away or Fifteen.',
      focus: ['Role and Industry Sequencing', 'Sponsorship and Board Visibility', 'Leadership Capability Gaps'],
    },
    {
      title: 'Athletes',
      body: 'Maximising the Peak Years and Planning What Comes After Them, Long Before They End.',
      focus: ['Brand and Endorsement Strategy', 'Post-Career Transition', 'Ventures and Investments'],
    },
    {
      title: 'Actors & Artists',
      body: 'Building a Body of Work and a Public Identity that Compound Rather than Fade.',
      focus: ['Positioning and Project Choices', 'Audience and Brand Building', 'Long-Term Creative Direction'],
    },
    {
      title: 'Public Figures & Politicians',
      body: 'Personal Strategy for People in Public Life: Reputation, Positioning and Long-Term Standing.',
      focus: ['Personal Positioning', 'Reputation and Perception', 'Career Timing and Transitions'],
    },
    {
      title: 'High-Ambition Individuals',
      body: 'Founders, Professionals and Rising Talent with a Destination in Mind and No Clear Map Yet.',
      focus: ['Defining the Destination', 'Skill and Network Building', 'Decisions at Crossroads'],
    },
  ];

  return (
    <section id="who" className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4">
            Built for People Who Intend to Go Further
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            Different Arenas, Same Truth: Lasting Success is Rarely Accidental. It is Designed, Sequenced and Executed.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {audiences.map((a, i) => (
            <div
              key={a.title}
              className="bg-white rounded-md shadow-lg p-6 hover:shadow-xl transition-all duration-500 flex flex-col"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <span className="text-3xl text-[#0A1E3D]/20 mb-4">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">{a.title}</h3>
              <p className="text-gray-600 text-sm mb-5 flex-1">{a.body}</p>

              <ul className="space-y-2 border-t border-gray-200 pt-4">
                {a.focus.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#0A1E3D]">
                    <ChevronIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// =====================================================
// THE STRATEGY GAP — WITHOUT vs WITH
// =====================================================
const StrategyGapSection = () => {
  const rows = [
    { without: 'Reacting to Opportunities as They Appear', with: 'Choosing Opportunities that Serve the Destination' },
    { without: 'Hoping the Right People Notice', with: 'Building the Network and Sponsors Deliberately' },
    { without: 'A Reputation Shaped by Others', with: 'A Reputation Shaped on Purpose' },
    { without: 'Big Decisions Made Under Pressure', with: 'Big Decisions Made Against a Plan' },
    { without: 'Peaks Followed by Uncertainty', with: 'Each Stage Setting Up the Next' },
  ];

  return (
    <section className="bg-[#d4dce5] pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-md shadow-2xl overflow-hidden">

          <div className="p-6 sm:p-8 lg:p-10 border-b border-gray-200">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 mb-3">
              Talent is Common. Strategy is Rare.
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl">
              Many Capable People Plateau Not for Lack of Ability, but for Lack of a Plan. The Difference Shows Up in Thousands of Small Choices.
            </p>
          </div>

          <div className="grid grid-cols-2">
            <div className="px-4 sm:px-8 lg:px-10 py-4 bg-gray-50 text-xs sm:text-sm tracking-widest uppercase text-gray-500">
              Without a Strategy
            </div>
            <div className="relative px-4 sm:px-8 lg:px-10 py-4 bg-[#0A1E3D] text-xs sm:text-sm tracking-widest uppercase text-white overflow-hidden">
              <DiagonalPattern id="career-gap-grid" opacity="opacity-10" />
              <span className="relative">With a Strategy</span>
            </div>

            {rows.map((r) => (
              <React.Fragment key={r.with}>
                <div className="px-4 sm:px-8 lg:px-10 py-4 sm:py-5 border-t border-gray-200 text-gray-500 text-sm sm:text-base">
                  {r.without}
                </div>
                <div className="px-4 sm:px-8 lg:px-10 py-4 sm:py-5 border-t border-gray-200 text-[#0A1E3D] text-sm sm:text-base flex items-start gap-2">
                  <ChevronIcon className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>{r.with}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

// =====================================================
// FRAMEWORK — ASCENDING STAIRCASE (scroll-triggered)
// Steps rise from bottom-left to top-right, one after
// another, echoing the homepage staircase motif.
// =====================================================
const SuccessStaircase = () => {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.25);

  const steps = [
    { title: 'Define the Destination', body: 'A Specific, Ambitious and Honest Picture of Where You Intend to Be.' },
    { title: 'Diagnose the Starting Point', body: 'Strengths, Gaps, Assets and Constraints, Assessed Without Flattery.' },
    { title: 'Map the Path', body: 'The Sequence of Roles, Moves and Milestones that Connects the Two.' },
    { title: 'Build the Capital', body: 'Capability, Network, Reputation and Financial Foundations Built Ahead of Need.' },
    { title: 'Execute & Recalibrate', body: 'Regular Reviews as Life, Markets and Opportunities Change.' },
  ];

  return (
    <div ref={ref}>
      {/* Desktop — ascending staircase */}
      <div className="hidden lg:flex items-end gap-4 h-[380px]">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="flex-1 transition-all duration-700 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: `${i * 180}ms`,
            }}
          >
            <div
              className={`rounded-md border-2 border-white p-5 flex flex-col ${
                i === steps.length - 1 ? 'bg-white text-[#0A1E3D]' : 'bg-[#132B47] text-white'
              }`}
              style={{ height: `${180 + i * 50}px` }}
            >
              <span className={`text-2xl mb-3 ${i === steps.length - 1 ? 'text-[#0A1E3D]/40' : 'text-white/30'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h4 className="text-lg mb-2">{s.title}</h4>
              <p className={`text-sm ${i === steps.length - 1 ? 'text-[#0A1E3D]/70' : 'text-gray-400'}`}>{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile / tablet — stacked list */}
      <div className="lg:hidden space-y-4">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className={`rounded-md border-2 border-white p-5 transition-all duration-500 ${
              i === steps.length - 1 ? 'bg-white text-[#0A1E3D]' : 'bg-[#132B47] text-white'
            }`}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-20px)',
              transitionDelay: `${i * 150}ms`,
              marginLeft: `${i * 4}%`,
            }}
          >
            <div className="flex items-start gap-4">
              <span className={`text-xl ${i === steps.length - 1 ? 'text-[#0A1E3D]/40' : 'text-white/30'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h4 className="text-lg mb-1">{s.title}</h4>
                <p className={`text-sm ${i === steps.length - 1 ? 'text-[#0A1E3D]/70' : 'text-gray-400'}`}>{s.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FrameworkSection = () => {
  return (
    <section id="framework" className="bg-[#0A1E3D] py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            The Sarsen Success Architecture
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
            The Same Discipline We Bring to Company Strategy, Applied to a Single Life and Career. Five Steps, Revisited Continuously.
          </p>
        </div>

        <SuccessStaircase />
      </div>
    </section>
  );
};

// =====================================================
// ROADMAP — ILLUSTRATIVE 15-YEAR PATH TO CEO
// =====================================================
const RoadmapSection = () => {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.25);

  const phases = [
    {
      years: 'Years 0–3',
      title: 'Foundation',
      points: ['Choose the Industry and Function that Lead to the Top', 'Build a Visible Record of Results', 'Identify Mentors and Early Sponsors'],
    },
    {
      years: 'Years 3–7',
      title: 'Acceleration',
      points: ['Take P&L or Line Responsibility Early', 'Gain International or Cross-Functional Exposure', 'Fill Capability Gaps Deliberately'],
    },
    {
      years: 'Years 7–11',
      title: 'Leadership',
      points: ['Lead a Business Unit or Region', 'Build Board-Level Visibility and Relationships', 'Shape an External Reputation in Your Industry'],
    },
    {
      years: 'Years 11–15',
      title: 'Summit',
      points: ['Position for C-Suite Succession', 'Prepare for Investor, Board and Public Scrutiny', 'Step Into the Role Ready to Lead'],
    },
  ];

  return (
    <section id="roadmap" className="bg-[#F0F4F8] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#0A1E3D]/50 text-xs tracking-widest uppercase mb-3">An Illustrative Roadmap</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4">
            A Fortune 500 CEO in 15 Years
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            An Ambition Like This Looks Impossible as One Leap and Achievable as a Sequence. Every Real Roadmap is Built Around the Individual, but the Logic Looks Like This.
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Progress connector — desktop */}
          <div className="hidden lg:block absolute top-[11px] left-0 right-0 h-[2px] bg-[#0A1E3D]/15">
            <div
              className="h-full bg-[#0A1E3D] transition-all ease-out"
              style={{ width: inView ? '100%' : '0%', transitionDuration: '1600ms' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((p, i) => (
              <div
                key={p.title}
                className="relative transition-all duration-500"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${i * 250}ms`,
                }}
              >
                <div className={`hidden lg:block w-6 h-6 rounded-full border-2 border-[#0A1E3D] mb-6 relative z-10 ${i === phases.length - 1 ? 'bg-[#0A1E3D]' : 'bg-white'}`} />

                <div className={`rounded-md shadow-lg p-6 h-full ${i === phases.length - 1 ? 'relative bg-[#0A1E3D] text-white overflow-hidden' : 'bg-white'}`}>
                  {i === phases.length - 1 && <DiagonalPattern id="career-roadmap-grid" opacity="opacity-10" />}
                  <div className="relative">
                    <p className={`text-sm mb-1 ${i === phases.length - 1 ? 'text-blue-300' : 'text-[#0A1E3D]/50'}`}>{p.years}</p>
                    <h3 className={`text-xl sm:text-2xl mb-4 ${i === phases.length - 1 ? 'text-white' : 'text-gray-800'}`}>{p.title}</h3>
                    <ul className="space-y-2">
                      {p.points.map((pt) => (
                        <li key={pt} className={`flex items-start gap-2 text-sm ${i === phases.length - 1 ? 'text-white/80' : 'text-gray-600'}`}>
                          <ChevronIcon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${i === phases.length - 1 ? 'text-blue-400' : 'text-[#0A1E3D]'}`} />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-10 max-w-2xl mx-auto">
          The Same Thinking Applies to an Athlete Planning Life After Sport, an Actor Building a Lasting Career, or a Public Figure Shaping Their Long-Term Standing.
        </p>

      </div>
    </section>
  );
};

// =====================================================
// PILLARS — WHAT WE WORK ON
// =====================================================
const PillarsSection = () => {
  const pillars = [
    {
      title: 'Positioning & Personal Brand',
      body: 'What You Stand For, How You are Known, and Why That Matters to the People Who Decide Your Next Move.',
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    },
    {
      title: 'Reputation & Perception',
      body: 'Understanding How You are Seen Today, and Deliberately Shaping How You Will be Seen Tomorrow.',
      icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    },
    {
      title: 'Network & Sponsorship',
      body: 'The Relationships, Advocates and Rooms that Open Doors Talent Alone Cannot.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      title: 'Capability Building',
      body: 'The Skills and Experiences the Destination Demands, Acquired Before They are Tested.',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    },
    {
      title: 'Decisions at Crossroads',
      body: 'Independent Counsel When an Offer, Role, Project or Opportunity Could Change Your Trajectory.',
      icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
    },
    {
      title: 'Transitions & Legacy',
      body: 'Moving Between Careers, Arenas or Stages, and Building Something that Outlasts the Current Peak.',
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    },
  ];

  return (
    <section id="pillars" className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4">
            What We Work on With You
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            The Levers that Move a Career, Combined Around Your Destination.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="w-full bg-white rounded-md shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#0A1E3D]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#0A1E3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={p.icon} />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">{p.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Principles strip */}
        <div className="mt-10 relative bg-[#0A1E3D] rounded-md p-6 sm:p-8 text-white shadow-xl overflow-hidden">
          <DiagonalPattern id="career-principles-grid" />
          <div className="relative grid sm:grid-cols-3 gap-6">
            {[
              { title: 'Confidential', body: 'Who You are and What You are Planning Stays Between Us.' },
              { title: 'Honest', body: 'We Tell You What You Need to Hear, Not What You Want to Hear.' },
              { title: 'Long-Term', body: 'We Plan in Years and Decades, Not Just the Next Move.' },
            ].map((pr) => (
              <div key={pr.title} className="border-l-2 border-blue-400 pl-4">
                <h4 className="text-lg">{pr.title}</h4>
                <p className="text-white/70 text-sm mt-1">{pr.body}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

// =====================================================
// ENQUIRY FORM SECTION
// Same backend contract as the Contact page:
// POST /contact with { name, email, message }.
// =====================================================
const CareerEnquirySection = () => {
  const emptyForm = {
    name: '',
    email: '',
    phone: '',
    profile: '',
    horizon: '',
    current: '',
    message: '',
  };

  const [formData, setFormData] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const enrichedMessage = [
      '[Career & Success Strategy Enquiry]',
      formData.message,
      formData.profile ? `Profile: ${formData.profile}` : '',
      formData.current ? `Current Position: ${formData.current}` : '',
      formData.horizon ? `Time Horizon: ${formData.horizon}` : '',
      formData.phone ? `Phone: ${formData.phone}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await apiRequest('POST', '/contact', {
        body: {
          name: formData.name,
          email: formData.email,
          message: enrichedMessage,
        },
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData(emptyForm);
      }, 5000);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800';
  const labelClass = 'block text-md font-medium text-[#0A1E3D] mb-2';

  return (
    <section id="enquiry" className="bg-[#F0F4F8] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-md shadow-2xl p-6 sm:p-8 lg:p-10">

          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 mb-3">
              Tell Us Where You Intend to Be
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Share Where You are Today and Where You Want to Go. Everything You Tell Us is Held in Strict Confidence.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="career-name" className={labelClass}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input id="career-name" name="name" type="text" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="Alex Doe" />
              </div>
              <div>
                <label htmlFor="career-email" className={labelClass}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input id="career-email" name="email" type="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="alex@email.com" />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <label htmlFor="career-phone" className={labelClass}>Phone Number</label>
                <input id="career-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+91 98765 43210" />
              </div>
              <div>
                <label htmlFor="career-profile" className={labelClass}>I Am</label>
                <select id="career-profile" name="profile" value={formData.profile} onChange={handleChange} className={`${inputClass} bg-white`}>
                  <option value="">Select</option>
                  <option value="Executive / Professional">An Executive or Professional</option>
                  <option value="Athlete">An Athlete</option>
                  <option value="Actor / Artist">An Actor or Artist</option>
                  <option value="Public Figure / Politician">A Public Figure or Politician</option>
                  <option value="Founder / Entrepreneur">A Founder or Entrepreneur</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="career-horizon" className={labelClass}>Time Horizon</label>
                <select id="career-horizon" name="horizon" value={formData.horizon} onChange={handleChange} className={`${inputClass} bg-white`}>
                  <option value="">Select</option>
                  <option value="Under 2 years">Under 2 Years</option>
                  <option value="2–5 years">2–5 Years</option>
                  <option value="5–10 years">5–10 Years</option>
                  <option value="10+ years">10+ Years</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="career-current" className={labelClass}>Where You are Today</label>
              <input id="career-current" name="current" type="text" value={formData.current} onChange={handleChange} className={inputClass} placeholder="e.g. Senior Manager, Consumer Goods, 8 Years Experience" />
            </div>

            <div>
              <label htmlFor="career-message" className={labelClass}>
                Where You Want to Be <span className="text-red-500">*</span>
              </label>
              <textarea
                id="career-message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                placeholder="For Example : I Want to Become the CEO of a Fortune 500 Company Within 15 Years and Need a Clear Plan for the Roles, Skills and Relationships That Will Get Me There."
              />
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-4 px-6 rounded-md transition-all duration-300 font-medium text-base shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Sending</span>
                </>
              ) : (
                <span>Start Your Strategy</span>
              )}
            </button>

            {submitted && (
              <div className="relative bg-[#0A1E3D] border-2 p-4 rounded-md overflow-hidden">
                <DiagonalPattern id="career-success-grid" />
                <div className="relative flex items-center justify-center text-center">
                  <p className="text-white font-medium">Message Received</p>
                </div>
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  );
};

// =====================================================
// FAQ SECTION
// =====================================================
const CareerFAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Who Career & Success Strategy is For',
      answer:
        'High-Ambition Individuals in Any Arena: Executives Aiming for the C-Suite, Athletes, Actors, Artists, Public Figures, Politicians, Founders and Rising Professionals. What They Share is a Destination Worth Planning For.',
    },
    {
      question: 'Whether Your Starting Point Matters',
      answer:
        'It Matters for the Plan, Not for the Possibility. Where You Start Shapes the Route, the Sequence and the Time It Takes. It Does Not Decide Where You Can Finish. That is What the Strategy is For.',
    },
    {
      question: 'How This Differs from Coaching or Management',
      answer:
        'Coaches Usually Focus on Performance and Mindset, and Managers or Agents on the Next Deal. We Focus on the Long-Term Strategy: the Destination, the Path, and the Decisions that Connect Them, with the Same Rigour We Apply to Company Strategy.',
    },
    {
      question: 'Whether We Guarantee Outcomes',
      answer:
        'No. Nobody Honest Can Guarantee a Career Outcome. What We Provide is a Rigorous Strategy, Clear Thinking at Critical Moments, and a Plan that Significantly Improves Your Odds of Getting Where You Intend to Go.',
    },
    {
      question: 'How Long an Engagement Lasts',
      answer:
        'It Usually Begins with a Focused Strategy Engagement to Define the Destination and Map the Path. Many Clients then Continue with Periodic Reviews and Counsel at Key Decision Points over Several Years.',
    },
    {
      question: 'Confidentiality',
      answer:
        'Complete. Your Identity, Your Ambitions and Everything Discussed are Held in Strict Confidence. For Many of Our Clients, Discretion is Non-Negotiable, and We Treat it That Way.',
    },
  ];

  return (
    <section className="bg-[#0A1E3D] py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Inside the Practice
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
            Answers to Common Questions About Career & Success Strategy.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="bg-[#132B47] rounded-md overflow-hidden transition-all duration-300 border border-blue-900/30 hover:border-blue-700/50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 sm:px-6 md:px-8 py-5 sm:py-6 flex items-center justify-between text-left hover:bg-[#1a3a5c] transition-colors duration-300 group"
                aria-expanded={openIndex === index}
              >
                <span className="text-white font-medium pr-4 text-sm sm:text-base lg:text-lg group-hover:text-blue-300 transition-colors duration-300">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-400 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-4 sm:px-6 md:px-8 pb-5 sm:pb-6 text-gray-300 text-sm sm:text-base">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// =====================================================
// FINAL CTA SECTION
// =====================================================
const CareerFinalCTASection = () => {
  return (
    <section className="bg-[#0A1E3D] border-t border-blue-900/40 py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <circle cx="200" cy="200" r="300" fill="#4A90E2" />
          <circle cx="800" cy="800" r="400" fill="#2B7AB8" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
          Ambition Needs a Strategy
        </h2>

        <p className="text-gray-300 text-base sm:text-md lg:text-lg mb-10 sm:mb-12 max-w-3xl mx-auto">
          You Already Know Where You Want to Go. Let Us Help You Build the Plan That Gets You There, No Matter Where You are Starting From.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <a
            href="#enquiry"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-md transition-all duration-300 font-medium text-base sm:text-lg shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
          >
            <span>Start Your Strategy</span>
          </a>
          <a
            href="/contact"
            className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:!text-[#0A1E3D] text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-md transition-all duration-300 font-medium text-base sm:text-lg flex items-center justify-center gap-3"
          >
            <span>Contact Us</span>
          </a>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// MAIN CAREER CLIENT COMPONENT
// =====================================================
export default function CareerClient() {
  return (
    <main className="min-h-screen">
      <CareerHeroSection />
      <WhoSection />
      <StrategyGapSection />
      <FrameworkSection />
      <RoadmapSection />
      <PillarsSection />
      <CareerEnquirySection />
      <CareerFAQSection />
      <CareerFinalCTASection />
    </main>
  );
}
