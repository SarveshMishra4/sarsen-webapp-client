// app/beyond-business-and-management/political-consulting/politicalClient.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { apiRequest } from '@/services/api';

// =====================================================
// Small helper — rounds coordinates for crisp SVG output
// =====================================================
const roundCoord = (n: number) => Math.round(n * 100) / 100;

// =====================================================
// HOOK — fires once when an element scrolls into view.
// Used by the scroll-triggered diagrams on this page.
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
// SHARED — Diagonal line pattern overlay (same as Hero /
// Contact cards across the site). Each instance needs a
// unique id so multiple overlays never collide.
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

// =====================================================
// HERO VISUAL — THREE-NATION SIGNAL TRIANGLE
// India, Brazil and the United States sit on a ring.
// Signals flow from each nation into the central
// "Sarsen Lens", where they are deciphered.
// =====================================================
const GovernanceSignalTriangle = () => {
  const [mounted, setMounted] = useState(false);
  const cx = 120,
    cy = 120,
    r = 80;
  const cycle = 9; // seconds for one full pulse cycle across the three nations

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const polarToCartesian = (angleDeg: number, radius = r) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: roundCoord(cx + radius * Math.cos(rad)),
      y: roundCoord(cy + radius * Math.sin(rad)),
    };
  };

  const nations = [
    { name: 'India', angle: 0 },
    { name: 'Brazil', angle: 240 },
    { name: 'United States', angle: 120 },
  ];

  const points = nations.map((n) => polarToCartesian(n.angle));
  const trianglePath = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} Z`;

  return (
    <div className="w-[19.2rem] h-[19.2rem] sm:w-96 sm:h-96">
      <style>{`
        @keyframes govSignalFlow {
          from { stroke-dashoffset: 24; }
          to   { stroke-dashoffset: 0; }
        }
        .gov-signal-line {
          stroke-dasharray: 4 8;
          animation: govSignalFlow 1.6s linear infinite;
        }

        @keyframes govNodePulse {
          0%, 30%, 100% {
            r: 4;
            opacity: 0.75;
            filter: drop-shadow(0 0 0 rgba(96,165,250,0));
          }
          10% {
            r: 7;
            opacity: 1;
            filter: drop-shadow(0 0 8px rgba(96,165,250,0.9));
          }
        }

        @keyframes govLensBreath {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 0.8; }
        }
        .gov-lens-halo {
          animation: govLensBreath 3s ease-in-out infinite;
        }

        @keyframes govOrbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .gov-orbit {
          transform-origin: 120px 120px;
          animation: govOrbit 30s linear infinite;
        }
      `}</style>

      {mounted && (
        <svg viewBox="0 0 240 240" className="w-full h-full" role="img" aria-label="Signals from India, Brazil and the United States flowing into the Sarsen analytical lens">
          {/* Outer ring */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff" strokeOpacity={0.25} strokeWidth={1} />

          {/* Triangle connecting the three nations */}
          <path d={trianglePath} fill="none" stroke="#ffffff" strokeWidth={1.75} strokeLinejoin="round" />

          {/* Signal lines — nation → lens */}
          {points.map((p, i) => (
            <line
              key={`sig-${i}`}
              x1={p.x}
              y1={p.y}
              x2={cx}
              y2={cy}
              stroke="#60a5fa"
              strokeWidth={1.25}
              className="gov-signal-line"
            />
          ))}

          {/* Central lens */}
          <circle cx={cx} cy={cy} r={16} fill="#60a5fa" className="gov-lens-halo" opacity={0.4} />
          <circle cx={cx} cy={cy} r={9} fill="#0A1E3D" stroke="#ffffff" strokeWidth={1.75} />
          <circle cx={cx} cy={cy} r={3} fill="#ffffff" />

          {/* Nation nodes + labels */}
          {nations.map((n, i) => {
            const pos = points[i];
            const labelPos = polarToCartesian(n.angle, r + 18);
            const delay = (i / nations.length) * cycle;

            return (
              <g key={n.name}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={4}
                  fill="#60a5fa"
                  style={{ animation: `govNodePulse ${cycle}s ease-in-out ${delay}s infinite` }}
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  fill="#93C5FD"
                  fontSize="8.5"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {n.name}
                </text>
              </g>
            );
          })}

          {/* Slow observer dot travelling the ring */}
          <g className="gov-orbit">
            <circle
              cx={cx}
              cy={cy - r}
              r={3.5}
              fill="#ffffff"
              style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.85))' }}
            />
          </g>
        </svg>
      )}

      <p className="text-white/70 text-base text-center mt-4">
        Observe. Analyze. Decipher.
      </p>
    </div>
  );
};

// =====================================================
// HERO SECTION
// =====================================================
const GovernanceHeroSection = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[400px] sm:min-h-[500px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <DiagonalPattern id="gov-hero-grid" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN */}
          <div className="space-y-6">
            <p className="text-blue-300 text-sm sm:text-base tracking-widest uppercase">
              Sarsen Beyond · Governance
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white">
              Governance & Political Consulting
            </h1>

            <p className="text-lg sm:text-xl text-gray-300">
              Politics Shapes Markets, Policy Shapes Opportunity, and Governance Shapes Everything in Between. We Observe, Analyze and Decipher Governance and Political Systems Across India, Brazil and the United States.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a
                href="#enquiry"
                className="w-full sm:w-auto bg-white !text-[#0A1E3D] hover:bg-blue-50 px-6 sm:px-8 py-4 rounded-md transition-all duration-300 font-medium text-base shadow-lg hover:shadow-xl text-center"
              >
                Request a Briefing
              </a>
              <a
                href="#approach"
                className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:!text-[#0A1E3D] text-white px-6 sm:px-8 py-4 rounded-md transition-all duration-300 font-medium text-base text-center"
              >
                How We Decipher
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relative h-64 sm:h-80 lg:h-[450px] flex items-center justify-center lg:justify-end">
            <GovernanceSignalTriangle />
          </div>

        </div>
      </div>
    </section>
  );
};

// =====================================================
// APPROACH — OBSERVE / ANALYZE / DECIPHER
// =====================================================
const ApproachSection = () => {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.2);

  const pillars = [
    {
      step: '01',
      title: 'Observe',
      body: 'We Track Legislatures, Executives, Courts, Regulators, Parties and Public Discourse Continuously. Not Just the Headlines, but the Quiet Signals that Precede Them.',
      points: ['Legislative & Executive Agendas', 'Regulatory and Judicial Movement', 'Public and Media Discourse'],
    },
    {
      step: '02',
      title: 'Analyze',
      body: 'Observations are Structured, Weighted and Tested Against History, Data and Institutional Behaviour, so Noise is Separated from what Genuinely Moves Outcomes.',
      points: ['Institutional & Stakeholder Mapping', 'Electoral and Sentiment Data', 'Historical Pattern Comparison'],
    },
    {
      step: '03',
      title: 'Decipher',
      body: 'We Translate Analysis into What It Means for You: Likely Trajectories, Scenarios, Risks and the Decisions Worth Making Now rather than Later.',
      points: ['Scenarios and Probabilities', 'Risk and Opportunity Briefs', 'Decision-Ready Recommendations'],
    },
  ];

  return (
    <section id="approach" className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4">
            We Do Not Campaign. We Decipher.
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            Our Role is that of an Independent Observer and Analyst. We Bring the Same Rigour We Apply to Business Strategy to the Systems that Govern Nations.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="relative bg-white rounded-md shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-500"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl text-[#0A1E3D]/20">{p.step}</span>
                <div className="w-12 h-12 bg-[#0A1E3D]/10 rounded-full flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-[#0A1E3D]" />
                </div>
              </div>

              <h3 className="text-2xl text-gray-800 mb-3">{p.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-6">{p.body}</p>

              <ul className="space-y-2 border-t border-gray-200 pt-4">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-sm sm:text-base text-[#0A1E3D]">
                    <svg className="w-4 h-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>{pt}</span>
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
// GEOGRAPHIES — INDIA, BRAZIL, UNITED STATES
// =====================================================
const GeographiesSection = () => {
  const geographies = [
    {
      country: 'India',
      system: 'Federal Parliamentary Democracy',
      structure: '28 States · 8 Union Territories',
      observe: [
        'Centre–State Dynamics and Cooperative Federalism',
        'Policy Signalling Across Union and State Budgets',
        'Coalition Arithmetic and Regional Political Movements',
        'Regulatory Direction in State-Shaped Sectors',
      ],
    },
    {
      country: 'Brazil',
      system: 'Federal Presidential Republic',
      structure: '26 States · 1 Federal District',
      observe: [
        'Executive–Congress Negotiation in a Multi-Party System',
        'State-Level Governance and Fiscal Federalism',
        'Judicial and Regulatory Influence on Policy',
        'Public Sentiment in a Compulsory-Voting Electorate',
      ],
    },
    {
      country: 'United States',
      system: 'Federal Presidential Republic',
      structure: '50 States · Federal District',
      observe: [
        'Federal–State Regulatory Divergence',
        'Legislative Agenda and Congressional Dynamics',
        'Executive Action and Agency Rulemaking',
        'Courts as Shapers of Policy Outcomes',
      ],
    },
  ];

  return (
    <section id="geographies" className="bg-[#0A1E3D] py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Three Democracies. One Discipline.
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
            Among the World's Largest and Most Consequential Democracies. Each with its Own Institutions, Federal Tensions and Political Rhythms. We Study Each on its Own Terms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {geographies.map((g) => (
            <div
              key={g.country}
              className="bg-[#132B47] rounded-md border border-blue-900/30 hover:border-blue-700/50 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative p-6 sm:p-8 border-b border-blue-900/40">
                <DiagonalPattern id={`gov-geo-${g.country.replace(/\s/g, '')}`} opacity="opacity-10" />
                <div className="relative">
                  <h3 className="text-2xl sm:text-3xl text-white mb-2">{g.country}</h3>
                  <p className="text-blue-300 text-sm sm:text-base">{g.system}</p>
                  <p className="text-white/60 text-sm mt-1">{g.structure}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1">
                <p className="text-white/50 text-xs tracking-widest uppercase mb-4">What We Observe</p>
                <ul className="space-y-3">
                  {g.observe.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// =====================================================
// METHOD DIAGRAM — SIGNAL TO DECISION PIPELINE
// Stages light up one after another on scroll.
// Horizontal on desktop, vertical on mobile/tablet.
// =====================================================
const SignalToDecisionDiagram = () => {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.3);

  const stages = [
    { label: 'Signals', note: 'Raw political and governance inputs' },
    { label: 'Context', note: 'History, institutions and incentives' },
    { label: 'Patterns', note: 'What repeats, what is breaking' },
    { label: 'Scenarios', note: 'Plausible paths and their odds' },
    { label: 'Decisions', note: 'What you should do about it' },
  ];

  return (
    <div ref={ref} className="relative">
      {/* Connector — desktop */}
      <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-[2px] bg-[#0A1E3D]/15">
        <div
          className="h-full bg-[#0A1E3D] transition-all ease-out"
          style={{ width: inView ? '100%' : '0%', transitionDuration: '1400ms' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4">
        {stages.map((s, i) => (
          <div
            key={s.label}
            className="relative flex lg:flex-col items-center lg:text-center gap-4 lg:gap-0 transition-all duration-500"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: `${i * 220}ms`,
            }}
          >
            <div
              className={`relative z-10 w-16 h-16 flex-shrink-0 rounded-full border-2 flex items-center justify-center text-lg transition-colors duration-500 ${
                i === stages.length - 1
                  ? 'bg-[#0A1E3D] border-[#0A1E3D] text-white'
                  : 'bg-white border-[#0A1E3D] text-[#0A1E3D]'
              }`}
              style={{ transitionDelay: `${i * 220}ms` }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>

            <div className="lg:mt-4">
              <h4 className="text-lg sm:text-xl text-gray-800">{s.label}</h4>
              <p className="text-gray-600 text-sm mt-1">{s.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MethodSection = () => {
  return (
    <section className="bg-[#F0F4F8] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4">
            From Signal to Decision
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            Every Brief We Produce Moves Through the Same Disciplined Sequence, so Our Conclusions can be Traced Back to Evidence.
          </p>
        </div>

        <SignalToDecisionDiagram />
      </div>
    </section>
  );
};

// =====================================================
// CAPABILITIES — WHAT WE DECIPHER
// =====================================================
const CapabilitiesSection = () => {
  const capabilities = [
    {
      title: 'Policy & Regulatory Trajectory',
      body: 'Where Policy is Heading, How Fast, and Who is Driving it. Read Early Enough to Prepare rather than React.',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    },
    {
      title: 'Political Risk Mapping',
      body: 'Structured Assessment of the Political and Governance Risks that Could Affect an Investment, Market Entry or Operation.',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    },
    {
      title: 'Electoral & Sentiment Analysis',
      body: 'Independent Reading of Electoral Data, Public Opinion and Shifting Voter Priorities, Without Partisan Lens.',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      title: 'Institutional & Stakeholder Mapping',
      body: 'Who Holds Influence, How Decisions are Actually Made, and Where Institutional Friction is Likely to Emerge.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      title: 'Narrative & Discourse Analysis',
      body: 'How Issues are Framed in Media and Public Conversation, and How Those Narratives Influence Policy and Perception.',
      icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    },
    {
      title: 'Governance Scenario Planning',
      body: 'Plausible Futures Built Around Elections, Reforms and Transitions, with Clear Implications for Strategy.',
      icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    },
  ];

  return (
    <section id="capabilities" className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4">
            What We Decipher
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Focused Analytical Capabilities, Combined Around the Question You Actually Need Answered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {capabilities.map((c) => (
            <div
              key={c.title}
              className="w-full bg-white rounded-md shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#0A1E3D]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#0A1E3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={c.icon} />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">{c.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{c.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// =====================================================
// WHO WE SERVE + PRINCIPLES
// =====================================================
const AudienceAndPrinciplesSection = () => {
  const audiences = [
    'Businesses Entering or Expanding in India, Brazil or the United States',
    'Investors Assessing Political and Regulatory Exposure',
    'Leadership Teams in Policy-Sensitive Sectors',
    'Institutions, Foundations and Public-Sector Bodies',
    'Leaders in Public Life Seeking Independent Analysis',
  ];

  const principles = [
    { title: 'Non-Partisan', body: 'We Do Not Take Sides. Our Analysis is Independent of Party, Ideology or Candidate.' },
    { title: 'Evidence-Led', body: 'Every Conclusion is Traceable to Data, Institutional Record or Observed Behaviour.' },
    { title: 'Discreet', body: 'Engagements, Clients and Findings are Held in Strict Confidence.' },
  ];

  return (
    <section id="principles" className="bg-[#d4dce5] pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-16">

        {/* LEFT — Who we serve */}
        <div className="lg:col-span-3 bg-white rounded-md shadow-2xl p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 mb-3">
            Who Relies on Our Analysis
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-8">
            Anyone Whose Decisions Depend on Understanding Where Governance and Politics are Heading.
          </p>

          <ul className="divide-y divide-gray-200">
            {audiences.map((a, i) => (
              <li key={a} className="flex items-center gap-4 py-4">
                <span className="text-[#0A1E3D]/30 text-lg w-8 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[#0A1E3D] text-sm sm:text-base">{a}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — Principles */}
        <div className="lg:col-span-2 relative bg-[#0A1E3D] rounded-md p-6 sm:p-8 text-white shadow-xl overflow-hidden">
          <DiagonalPattern id="gov-principles-grid" />
          <div className="relative">
            <h3 className="text-xl sm:text-2xl mb-6">Our Principles</h3>
            <div className="space-y-6">
              {principles.map((p) => (
                <div key={p.title} className="border-l-2 border-blue-400 pl-4">
                  <h4 className="text-lg text-white">{p.title}</h4>
                  <p className="text-white/70 text-sm mt-1">{p.body}</p>
                </div>
              ))}
            </div>
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
const GovernanceEnquirySection = () => {
  const emptyForm = {
    name: '',
    email: '',
    organisation: '',
    geography: '',
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
      '[Governance & Political Consulting Enquiry]',
      formData.message,
      formData.geography ? `Geography of Interest: ${formData.geography}` : '',
      formData.organisation ? `Organisation: ${formData.organisation}` : '',
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
              Request a Governance Briefing
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Tell Us the Decision You are Facing and the Geography it Depends On. We Will Review it in Confidence Before Responding.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="gov-name" className={labelClass}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input id="gov-name" name="name" type="text" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="Alex Doe" />
              </div>

              <div>
                <label htmlFor="gov-email" className={labelClass}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input id="gov-email" name="email" type="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="alex@organisation.com" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="gov-organisation" className={labelClass}>
                  Organisation
                </label>
                <input id="gov-organisation" name="organisation" type="text" value={formData.organisation} onChange={handleChange} className={inputClass} placeholder="Your Organisation" />
              </div>

              <div>
                <label htmlFor="gov-geography" className={labelClass}>
                  Geography of Interest
                </label>
                <select id="gov-geography" name="geography" value={formData.geography} onChange={handleChange} className={`${inputClass} bg-white`}>
                  <option value="">Select a Geography</option>
                  <option value="India">India</option>
                  <option value="Brazil">Brazil</option>
                  <option value="United States">United States</option>
                  <option value="Multiple">More Than One</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="gov-message" className={labelClass}>
                What Do You Need Deciphered? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="gov-message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                placeholder="For Example : We are Evaluating a Market Entry and Need to Understand How Upcoming Regulatory Changes and the Political Calendar Could Affect Our Timeline."
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
                <span>Request a Briefing</span>
              )}
            </button>

            {submitted && (
              <div className="relative bg-[#0A1E3D] border-2 p-4 rounded-md overflow-hidden">
                <DiagonalPattern id="gov-success-grid" />
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
const GovernanceFAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What Governance & Political Consulting Means at Sarsen',
      answer:
        'We Observe, Analyze and Decipher Governance and Political Systems. Our Work Helps Organisations and Leaders Understand How Policy, Institutions, Elections and Public Sentiment are Likely to Affect Their Decisions. We Are Analysts, Not Campaigners.',
    },
    {
      question: 'The Geographies We Cover',
      answer:
        'Our Core Focus is India, Brazil and the United States. Each is Studied on its Own Terms: its Federal Structure, Institutions, Political Calendar and Public Discourse. Cross-Country Comparisons are Available Where a Decision Spans More Than One Market.',
    },
    {
      question: 'Our Position on Partisanship',
      answer:
        'We are Strictly Non-Partisan. We Do Not Endorse Parties or Candidates and Our Analysis is Not Shaped by Ideology. The Value of What We Deliver Depends Entirely on its Independence.',
    },
    {
      question: 'The Outputs of an Engagement',
      answer:
        'Depending on the Question, Outputs May Include Governance and Political Risk Briefs, Policy Trajectory Assessments, Stakeholder Maps, Scenario Plans, Sentiment Analyses or Ongoing Monitoring Reports. Each is Built to Support a Decision, Not to Fill a Shelf.',
    },
    {
      question: 'One-Time Briefings and Ongoing Monitoring',
      answer:
        'Both. Some Clients Need a Focused Briefing Ahead of a Specific Decision. Others Need Continuous Observation Through an Election Cycle or a Period of Reform. We Scope the Engagement Around What You Actually Need.',
    },
    {
      question: 'Confidentiality',
      answer:
        'All Engagements, Client Identities and Findings are Held in Strict Confidence. Discretion is Foundational to this Practice.',
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
            Answers to Common Questions About Our Governance & Political Consulting Work.
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
const GovernanceFinalCTASection = () => {
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
          When Governance Shapes the Outcome
        </h2>

        <p className="text-gray-300 text-base sm:text-md lg:text-lg mb-10 sm:mb-12 max-w-3xl mx-auto">
          Decisions Made Without Understanding the Political and Governance Landscape Carry Risks You Cannot See. Let Us Observe, Analyze and Decipher it for You.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <a
            href="#enquiry"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-md transition-all duration-300 font-medium text-base sm:text-lg shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
          >
            <span>Request a Briefing</span>
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
// MAIN GOVERNANCE CLIENT COMPONENT
// =====================================================
export default function PoliticalClient() {
  return (
    <main className="min-h-screen">
      <GovernanceHeroSection />
      <ApproachSection />
      <AudienceAndPrinciplesSection />
      <GeographiesSection />
      <MethodSection />
      <CapabilitiesSection />
      <GovernanceEnquirySection />
      <GovernanceFAQSection />
      <GovernanceFinalCTASection />
    </main>
  );
}
