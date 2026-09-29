'use client';

// =====================================================================
// sectionIntroCardsPreview.tsx
//
// STANDALONE TEST / REVIEW FILE — not wired into the live diagnostic.
// Drop this in as its own route (e.g. app/business-heatmap/test/page.tsx)
// to view every "why this section matters" intro card in isolation, in
// motion, with a Replay button on each so you can review, edit copy, and
// comment without re-running the full 15-question flow.
//
// THE LOGIC, CORRECTED PER YOUR NOTES:
//   1. One card per MODULE (7 total) — not one per line-diagram-reused-
//      everywhere. Each has its own distinct shape + motion, matched to
//      what that section is actually measuring.
//   2. Copy is forward-looking: "why are we about to ask you this / what
//      does this reveal" — not a recap of answers already given.
//   3. In the live flow this card appears BEFORE a section's questions
//      start, not after they finish.
//
// WHY 7 CARDS AND NOT 11:
//   The question bank's `module` field isn't contiguous — Foundation
//   alone covers Q5, Q8, Q12 and Q14 as four separate, non-adjacent
//   runs. Rather than show four identical "why Foundation matters"
//   cards with the same diagram scattered through the flow, each module
//   gets ONE diagram + ONE explanation, reused every time that theme's
//   questions come back around. The "Appears Before" line on each card
//   lists every question index it will actually precede, so you can see
//   the full picture here.
//
// TO WIRE INTO businessHeatmapClient.tsx LATER:
//   Replace SECTION_END_INDICES / post-section logic with a
//   SECTION_START_INDICES check (index 0, or QUESTIONS[i].module !==
//   QUESTIONS[i-1].module) and show the matching card from
//   MODULE_INTRO_CARDS below BEFORE rendering QUESTIONS[i], holding
//   until Continue is tapped. Not done in this file — this file is
//   purely for reviewing the 7 designs first.
// =====================================================================

import React, { useState } from 'react';

const BRAND = '#0A1E3D';
const ACCENT = '#2563eb';
const AMBER = '#d97706';

// ---------------------------------------------------------------------
// Shared keyframes, used across all 7 diagrams so each one doesn't need
// its own bespoke animation plumbing. Per-element timing is controlled
// with inline `animationDelay` / CSS custom properties at the call site.
// ---------------------------------------------------------------------
function GlobalDiagramStyles() {
  return (
    <style>{`
      @keyframes diagDraw {
        from { stroke-dashoffset: 1; }
        to   { stroke-dashoffset: 0; }
      }
      .diag-draw {
        stroke-dasharray: 1;
        stroke-dashoffset: 1;
        animation: diagDraw 0.9s ease-out both;
        animation-delay: var(--delay, 0s);
      }

      @keyframes diagPop {
        from { opacity: 0; transform: scale(0.35); }
        to   { opacity: 1; transform: scale(1); }
      }
      .diag-pop {
        opacity: 0;
        animation: diagPop 0.35s cubic-bezier(0.2, 0.8, 0.3, 1.3) both;
        animation-delay: var(--delay, 0s);
        transform-box: fill-box;
        transform-origin: center;
      }

      @keyframes diagPulse {
        0%, 100% { opacity: 0.7; }
        50%      { opacity: 1; }
      }
      .diag-pulse {
        animation: diagPulse 2s ease-in-out infinite;
        animation-delay: var(--delay, 0s);
      }

      @keyframes diagGrowUp {
        from { transform: scaleY(0); }
        to   { transform: scaleY(1); }
      }
      .diag-grow-up {
        transform: scaleY(0);
        transform-box: fill-box;
        transform-origin: bottom;
        animation: diagGrowUp 0.5s cubic-bezier(0.2, 0.8, 0.3, 1) both;
        animation-delay: var(--delay, 0s);
      }

      @keyframes diagFlowCurve {
        0%   { transform: translate(0, 0); opacity: 1; }
        55%  { transform: translate(var(--dxMid, 0px), var(--dyMid, 70px)); opacity: 1; }
        100% { transform: translate(var(--dxEnd, 0px), var(--dyEnd, 140px)); opacity: var(--endOpacity, 1); }
      }
      .diag-fall {
        animation: diagFlowCurve 1.3s cubic-bezier(0.4, 0, 0.2, 1) both;
        animation-delay: var(--delay, 0s);
      }

      @keyframes diagRadiate {
        0%   { transform: scale(0.2); opacity: 0.8; }
        100% { transform: scale(1.7); opacity: 0; }
      }
      .diag-radiate {
        transform-box: fill-box;
        transform-origin: center;
        animation: diagRadiate 2.4s ease-out infinite;
        animation-delay: var(--delay, 0s);
      }

      @keyframes diagSweep {
        from { transform: translateX(0); }
        to   { transform: translateX(300px); }
      }
      .diag-sweep {
        animation: diagSweep 1.4s ease-in-out both;
        animation-delay: var(--delay, 0s);
      }

      @keyframes diagFadeUp {
        from { opacity: 0; transform: translateY(6px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .diag-fade-up { animation: diagFadeUp 0.4s ease-out both; }

      @media (prefers-reduced-motion: reduce) {
        .diag-draw, .diag-radiate, .diag-sweep { animation: none !important; }
        .diag-draw { stroke-dashoffset: 0; }
      }
    `}</style>
  );
}

// =====================================================================
// 1. VALIDATION — "does reality confirm the idea?"
// Three signals (customer, market, problem) converge on one point and
// resolve into a single confirmed mark. Convergence = validation.
// =====================================================================
function ValidationDiagram() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-auto">
      <path d="M 40,36 C 110,28 150,58 198,98" fill="none" stroke={BRAND} strokeWidth={2}
        strokeLinecap="round" pathLength={1} className="diag-draw" style={{ ['--delay' as any]: '0s' }} />
      <path d="M 40,164 C 110,172 150,142 198,102" fill="none" stroke={BRAND} strokeWidth={2}
        strokeLinecap="round" pathLength={1} className="diag-draw" style={{ ['--delay' as any]: '0.15s' }} />
      <path d="M 360,100 C 300,58 250,142 204,100" fill="none" stroke={BRAND} strokeWidth={2}
        strokeLinecap="round" pathLength={1} className="diag-draw" style={{ ['--delay' as any]: '0.3s' }} />

      <circle cx="40" cy="36" r="4" fill={BRAND} className="diag-pop" style={{ ['--delay' as any]: '0s' }} />
      <circle cx="40" cy="164" r="4" fill={BRAND} className="diag-pop" style={{ ['--delay' as any]: '0.15s' }} />
      <circle cx="360" cy="100" r="4" fill={BRAND} className="diag-pop" style={{ ['--delay' as any]: '0.3s' }} />

      <circle cx="200" cy="100" r="9" fill="none" stroke={ACCENT} strokeWidth={2}
        className="diag-pop diag-pulse" style={{ ['--delay' as any]: '1.05s' }} />
      <path d="M 194,100 L 199,106 L 209,92" fill="none" stroke={ACCENT} strokeWidth={2.5}
        strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="diag-draw"
        style={{ ['--delay' as any]: '1.2s' }} />
    </svg>
  );
}

// =====================================================================
// 2. GO TO MARKET — "does it convert, and keep converting?"
// A funnel outline draws in, then a run of prospects flows down through
// it — some fall away partway (drop-off), the rest make it to the
// narrow exit as customers. Narrowing = the funnel doing its job.
// =====================================================================
function GoToMarketDiagram() {
  // Each dot flows along a gentle curve toward the narrow exit — the
  // mid-point drifts inward before straightening, rather than falling
  // straight down, so the motion itself reads as a converging flow.
  const dots = [
    { x: 90, dxMid: 20, dyMid: 70, dxEnd: 55, dyEnd: 130, endOpacity: 0, delay: 1.1 },   // drops off
    { x: 150, dxMid: 10, dyMid: 70, dxEnd: 20, dyEnd: 145, endOpacity: 1, delay: 1.25 }, // makes it through
    { x: 200, dxMid: 0, dyMid: 70, dxEnd: 0, dyEnd: 145, endOpacity: 1, delay: 1.15 },   // makes it through
    { x: 250, dxMid: -14, dyMid: 65, dxEnd: -35, dyEnd: 128, endOpacity: 0, delay: 1.35 }, // drops off
    { x: 310, dxMid: -10, dyMid: 70, dxEnd: -20, dyEnd: 145, endOpacity: 1, delay: 1.2 }, // makes it through
  ];
  return (
    <svg viewBox="0 0 400 200" className="w-full h-auto">
      <path
        d="M 55,25 C 60,85 90,135 165,175 L 235,175 C 310,135 340,85 345,25"
        fill="none" stroke={BRAND} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        pathLength={1} className="diag-draw" style={{ ['--delay' as any]: '0s' }}
      />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={30} r="4" fill={ACCENT} className="diag-pop diag-fall"
          style={{
            ['--delay' as any]: `${d.delay}s`,
            ['--dxMid' as any]: `${d.dxMid}px`,
            ['--dyMid' as any]: `${d.dyMid}px`,
            ['--dxEnd' as any]: `${d.dxEnd}px`,
            ['--dyEnd' as any]: `${d.dyEnd}px`,
            ['--endOpacity' as any]: d.endOpacity,
          }} />
      ))}
    </svg>
  );
}

// =====================================================================
// 3. FOUNDATION — "can it carry the weight of growth?"
// Four blocks rise bottom-up, widest at the base, narrowing toward the
// top — literal foundation-first construction. If it's stacked out of
// order, it topples; here it rises in the right sequence.
// =====================================================================
function FoundationDiagram() {
  const blocks = [
    { y: 148, x: 90, w: 220, delay: 0 },
    { y: 112, x: 120, w: 160, delay: 0.22 },
    { y: 76, x: 145, w: 110, delay: 0.44 },
    { y: 40, x: 165, w: 70, delay: 0.66 },
  ];
  return (
    <svg viewBox="0 0 400 200" className="w-full h-auto">
      <line x1="40" y1="188" x2="360" y2="188" stroke="#E2E8F0" strokeWidth={2} />
      {blocks.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height="28" rx="3" fill={i === 0 ? BRAND : ACCENT}
          opacity={i === 0 ? 1 : 0.85 - i * 0.08} className="diag-grow-up"
          style={{ ['--delay' as any]: `${b.delay}s` }} />
      ))}
    </svg>
  );
}

// =====================================================================
// 4. FUNDRAISING READINESS — "do the numbers survive scrutiny?"
// A bar chart rises, then a scan line sweeps across it left to right —
// an investor pulling on the thread of every figure in sequence.
// =====================================================================
function FundraisingDiagram() {
  const bars = [
    { x: 60, h: 60, delay: 0 },
    { x: 120, h: 95, delay: 0.12 },
    { x: 180, h: 70, delay: 0.24 },
    { x: 240, h: 120, delay: 0.36 },
    { x: 300, h: 85, delay: 0.48 },
  ];
  return (
    <svg viewBox="0 0 400 200" className="w-full h-auto" style={{ overflow: 'hidden' }}>
      <line x1="40" y1="170" x2="360" y2="170" stroke="#E2E8F0" strokeWidth={2} />
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={170 - b.h} width="26" height={b.h} rx="2" fill={BRAND}
          className="diag-grow-up" style={{ ['--delay' as any]: `${b.delay}s` }} />
      ))}
      <g className="diag-pop diag-sweep" style={{ ['--delay' as any]: '1s' }}>
        <rect x="30" y="20" width="14" height="160" fill={ACCENT} opacity="0.12" />
        <line x1="37" y1="20" x2="37" y2="180" stroke={ACCENT} strokeWidth={1.5} />
      </g>
    </svg>
  );
}

// =====================================================================
// 5. OPERATIONS & SCALABILITY — "does it still work at 10x volume?"
// One node branches into three, those branch further into faint,
// still-multiplying nodes trailing off the edge — a process that has
// to keep working as it forks, not just at the single-node scale.
// =====================================================================
function OperationsDiagram() {
  const level1 = [50, 100, 150];
  const level2 = [20, 55, 90, 110, 145, 180];
  return (
    <svg viewBox="0 0 400 200" className="w-full h-auto">
      {level1.map((y, i) => (
        <path key={`l1-${i}`} d={`M 60,100 C 120,100 140,${y} 200,${y}`} fill="none" stroke={BRAND}
          strokeWidth={1.75} strokeLinecap="round" pathLength={1} className="diag-draw"
          style={{ ['--delay' as any]: `${i * 0.15}s` }} />
      ))}
      {level2.map((y, i) => {
        const fromX = 200;
        const fromY = level1[Math.floor(i / 2)];
        return (
          <path key={`l2-${i}`} d={`M ${fromX},${fromY} C 260,${fromY} 280,${y} 340,${y}`} fill="none"
            stroke={ACCENT} strokeWidth={1.25} strokeLinecap="round" opacity={0.55} pathLength={1}
            className="diag-draw" style={{ ['--delay' as any]: `${0.55 + i * 0.08}s` }} />
        );
      })}
      <circle cx="60" cy="100" r="7" fill={BRAND} className="diag-pop" style={{ ['--delay' as any]: '0s' }} />
      {level1.map((y, i) => (
        <circle key={`n1-${i}`} cx="200" cy={y} r="5.5" fill={BRAND} className="diag-pop"
          style={{ ['--delay' as any]: `${0.15 + i * 0.15}s` }} />
      ))}
      {level2.map((y, i) => (
        <circle key={`n2-${i}`} cx="340" cy={y} r="3.5" fill={ACCENT} opacity={0.75} className="diag-pop"
          style={{ ['--delay' as any]: `${0.7 + i * 0.08}s` }} />
      ))}
    </svg>
  );
}

// =====================================================================
// 6. SCALE & EXPANSION — "can it grow without breaking what works?"
// Rings radiate outward from a fixed, steady center. The center never
// moves — growth is the ring expanding, not the core losing shape.
// =====================================================================
function ScaleDiagram() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-auto">
      {[0, 0.8, 1.6].map((delay, i) => (
        <circle key={i} cx="200" cy="100" r="22" fill="none" stroke={ACCENT} strokeWidth={2}
          className="diag-radiate" style={{ ['--delay' as any]: `${delay}s` }} />
      ))}
      <circle cx="200" cy="100" r="10" fill={BRAND} className="diag-pop diag-pulse"
        style={{ ['--delay' as any]: '0.1s' }} />
    </svg>
  );
}

// =====================================================================
// 7. TURNAROUND & STABILISATION — "does it need steadying first?"
// A jagged, erratic line on the left resolves into one flat, steady
// line on the right — the business has to stop swinging before any
// growth push means anything.
// =====================================================================
function TurnaroundDiagram() {
  // One continuous flowing curve whose swings shrink toward zero, then
  // hands off to a flat, steady line — turbulence easing into calm,
  // rather than a jagged, geometric zigzag.
  return (
    <svg viewBox="0 0 400 200" className="w-full h-auto">
      <path
        d="M 20,100 C 35,55 50,145 68,100 C 85,60 100,130 118,100 C 130,78 140,112 152,100 C 160,92 168,104 178,100"
        fill="none" stroke={AMBER} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        pathLength={1} className="diag-draw" style={{ ['--delay' as any]: '0s' }} />
      <path d="M 178,100 C 250,100 310,100 380,100" fill="none" stroke={BRAND} strokeWidth={2}
        strokeLinecap="round" pathLength={1} className="diag-draw" style={{ ['--delay' as any]: '0.85s' }} />
      <circle cx="380" cy="100" r="5" fill={BRAND} className="diag-pop diag-pulse"
        style={{ ['--delay' as any]: '1.6s' }} />
    </svg>
  );
}

// =====================================================================
// Card content — the copy answers "why is this section here / what does
// it reveal", written BEFORE the founder answers anything in it.
// =====================================================================
type ModuleCard = {
  module: string;
  appearsBefore: string; // question indices this module's runs precede, in the real flow
  why: string;
  diagramNote: string; // plain description of the metaphor, for your review/comments
  Diagram: React.FC;
};

const MODULE_INTRO_CARDS: ModuleCard[] = [
  {
    module: 'Validation',
    appearsBefore: 'Q1 – Q3',
    why: 'This Section Reveals Whether Real Customers — Not Just the Founder — Have Confirmed the Problem is Worth Solving. If They Have Not, Nothing That Comes After This Can Be Trusted.',
    diagramNote: 'Three curved signal flows sweep in from different sources and converge into a confirmed mark.',
    Diagram: ValidationDiagram,
  },
  {
    module: 'Go To Market',
    appearsBefore: 'Q4, Q6 – Q7',
    why: 'This Section Reveals Whether the Business Can Reach, Convert and Keep Customers Reliably — Not as a One-Off Win, But as a Motion That Repeats.',
    diagramNote: 'A curved funnel tapers inward; prospects flow along curved paths through it — some drop off, the rest convert.',
    Diagram: GoToMarketDiagram,
  },
  {
    module: 'Foundation',
    appearsBefore: 'Q5, Q8, Q12, Q14',
    why: 'This Section Reveals Whether the Structural Basics Can Carry the Weight of Growth, or Whether They Buckle the Moment Pressure Increases.',
    diagramNote: 'Blocks rise bottom-up, widest at the base — built in the order that actually holds weight.',
    Diagram: FoundationDiagram,
  },
  {
    module: 'Fundraising Readiness',
    appearsBefore: 'Q9 – Q10',
    why: 'This Section Reveals Whether the Numbers — and the Story Behind Them — Can Survive an Investor Actually Pulling on the Thread.',
    diagramNote: 'A bar chart rises, then a scan line sweeps across it — every figure getting checked in turn.',
    Diagram: FundraisingDiagram,
  },
  {
    module: 'Operations & Scalability',
    appearsBefore: 'Q11',
    why: 'This Section Reveals Whether What Works Today, at Small Volume, Still Works Once Team Size, Complexity or Demand Multiply.',
    diagramNote: 'One node branches into many along curved connectors, and those branch further — flow tested as it forks, not just at single scale.',
    Diagram: OperationsDiagram,
  },
  {
    module: 'Scale & Expansion',
    appearsBefore: 'Q13',
    why: 'This Section Reveals What It Takes to Push Growth Further Without Breaking the Parts of the Business That Already Work.',
    diagramNote: 'Rings expand outward from a center that never moves — growth without the core losing shape.',
    Diagram: ScaleDiagram,
  },
  {
    module: 'Turnaround & Stabilisation',
    appearsBefore: 'Q15',
    why: 'This Section Reveals Whether the Business Needs to Be Steadied First — Before Any Push for Growth Would Even Mean Anything.',
    diagramNote: 'A flowing curve with shrinking swings settles into one flat, steady line — stability has to come before the next push.',
    Diagram: TurnaroundDiagram,
  },
];

// =====================================================================
// Preview page
// =====================================================================
export default function SectionIntroCardsPreview() {
  const [replayTokens, setReplayTokens] = useState<Record<string, number>>({});

  function replay(moduleKey: string) {
    setReplayTokens((prev) => ({ ...prev, [moduleKey]: (prev[moduleKey] ?? 0) + 1 }));
  }

  function replayAll() {
    setReplayTokens((prev) => {
      const next = { ...prev };
      MODULE_INTRO_CARDS.forEach((c) => {
        next[c.module] = (next[c.module] ?? 0) + 1;
      });
      return next;
    });
  }

  return (
    <main className="min-h-screen bg-[#F0F4F8] py-12 px-4 sm:px-6">
      <GlobalDiagramStyles />
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-1">Preview / Review Only — Not Wired Into the Live Flow</p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">Section Intro Cards</h1>
          <p className="text-base text-gray-500 leading-relaxed mb-4">
            7 cards, one per module, each with its own diagram and its own explanation of why that section
            is being asked — shown here in the order they&apos;d first appear in the real 15-question flow.
          </p>
          <button
            type="button"
            onClick={replayAll}
            className="bg-[#0A1E3D] hover:bg-[#132B47] text-white py-2.5 px-5 rounded-md transition-all duration-300 font-medium text-sm"
          >
            Replay All
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {MODULE_INTRO_CARDS.map((card) => {
            const token = replayTokens[card.module] ?? 0;
            const Diagram = card.Diagram;
            return (
              <div
                key={card.module}
                className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm diag-fade-up"
              >
                <div className="flex items-start justify-between gap-4 mb-1">
                  <p className="text-sm text-gray-500">Appears Before · {card.appearsBefore}</p>
                  <button
                    type="button"
                    onClick={() => replay(card.module)}
                    className="text-sm font-medium text-[#0A1E3D] hover:underline flex-shrink-0"
                  >
                    Replay
                  </button>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 leading-[1.05] tracking-tight">
                  {card.module}
                </h2>
                <p className="text-base text-gray-500 leading-relaxed mb-6">{card.why}</p>

                <div key={token}>
                  <Diagram />
                </div>

                {/* Dev note only — remove before shipping. Kept here so it's
                    easy to comment on the metaphor choice per diagram. */}
                <p className="text-xs text-gray-400 italic mt-3">{card.diagramNote}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}