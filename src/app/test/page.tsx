// app/test/page.tsx
//
// A running gallery of hero visualisation options — six versions of the
// same "why startups fail" hero, stacked on this one test page so they're
// easy to scroll through and compare. Every version shares:
//   - the same hero shell (bg-[#0A1E3D], the diagonal grid pattern, padding)
//   - the same left-side callout: a percentage that slides in from the left,
//     with the reason label typed out beneath it (no cursor)
//   - the same FAILURE_REASONS data
//
// Only the right-side visual changes between versions. Each version runs
// its own independent timer, so they cycle at their own pace rather than
// all switching in lockstep.
//
// Small numbered labels at the top-left of each section are dev scaffolding
// for this gallery page only — they're not part of the real homepage copy
// and should be dropped whichever version you pick for production.

'use client';

import React, { useEffect, useMemo, useState } from 'react';

// =====================================================
// DATA — Top cited reasons startups fail
// (CB Insights, "The Top 20 Reasons Startups Fail")
// =====================================================
const FAILURE_REASONS = [
  { label: 'No Market Need', value: 42 },
  { label: 'Ran Out of Cash', value: 29 },
  { label: 'Not the Right Team', value: 23 },
  { label: 'Got Outcompeted', value: 19 },
  { label: 'Pricing & Cost Issues', value: 18 },
];

const TOTAL_VALUE = FAILURE_REASONS.reduce((sum, r) => sum + r.value, 0);

// Precomputed angle ranges for the donut/pie versions
let cumulativeAngle = 0;
const REASON_ARCS = FAILURE_REASONS.map((reason) => {
  const startAngle = (cumulativeAngle / TOTAL_VALUE) * 360;
  cumulativeAngle += reason.value;
  const endAngle = (cumulativeAngle / TOTAL_VALUE) * 360;
  return {
    ...reason,
    startAngle,
    endAngle,
    midAngle: (startAngle + endAngle) / 2,
  };
});

// =====================================================
// SVG ARC MATH — shared by the donut and pie versions
// =====================================================
const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const describeSlice = (
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number
) => {
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);

  if (innerR <= 0) {
    return [
      `M ${cx} ${cy}`,
      `L ${outerStart.x} ${outerStart.y}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
      'Z',
    ].join(' ');
  }

  const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
};

// =====================================================
// SEQUENTIAL TYPING / CYCLING HOOK
// Types the active reason's label forward (no delete, no
// cursor), holds it, then advances — looping forever.
// =====================================================
const useSequentialTyping = (
  labels: string[],
  typingSpeed = 55,
  holdDuration = 1600,
  gapDuration = 250
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
      setDisplayText(labels[activeIndex].slice(0, charCount));

      if (charCount < labels[activeIndex].length) {
        typingTimer = setTimeout(typeNextChar, typingSpeed);
      } else {
        holdTimer = setTimeout(() => {
          setActiveIndex((prev) => (prev + 1) % labels.length);
        }, holdDuration);
      }
    };

    typingTimer = setTimeout(typeNextChar, gapDuration);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(holdTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, labels, typingSpeed, holdDuration, gapDuration]);

  return { activeIndex, displayText };
};

// =====================================================
// LEFT SIDE — reused by every version. Percent slides in
// from the left; the label types out beneath it.
// =====================================================
const FailureReasonCallout = ({
  activeIndex,
  displayText,
}: {
  activeIndex: number;
  displayText: string;
}) => {
  return (
    <div className="space-y-2">
      <div key={`percent-${activeIndex}`} className="percent-slide-in">
        <span className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-blue-300">
          {FAILURE_REASONS[activeIndex].value}%
        </span>
      </div>

      {/* Reserved height so the layout doesn't shift as the label types out */}
      <div className="h-8 sm:h-9">
        <p className="text-xl sm:text-2xl text-white/80">{displayText}</p>
      </div>
    </div>
  );
};

// =====================================================
// HERO SHELL — background, grid pattern, and section
// spacing shared by every version. `devLabel` is gallery
// scaffolding only, not production copy.
// =====================================================
const HeroShell = ({
  devLabel,
  children,
}: {
  devLabel: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[500px] sm:min-h-[600px] py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/10 first:border-t-0">
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id={`grid-${devLabel.replace(/\s+/g, '-')}`}
              patternUnits="userSpaceOnUse"
              width="5"
              height="5"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${devLabel.replace(/\s+/g, '-')})`} />
        </svg>
      </div>

      <span className="absolute top-5 left-4 sm:left-6 lg:left-8 text-[11px] tracking-wide text-white/30 uppercase">
        {devLabel}
      </span>

      <div className="relative max-w-7xl mx-auto">{children}</div>
    </section>
  );
};

// A single grid layout used inside every HeroShell
const HeroGrid = ({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) => (
  <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
    <div className="space-y-8 lg:space-y-10">
      <h2 className="text-xl sm:text-2xl text-white">
        Running a startup means making irreversible decisions with incomplete information.
      </h2>
      {left}
    </div>
    <div className="relative h-64 sm:h-80 lg:h-[450px] flex items-center justify-center lg:justify-end">
      {right}
    </div>
  </div>
);

// =====================================================
// VERSION 1 — solid vertical bars (the original pass)
// =====================================================
const SolidBarChart = ({ activeIndex }: { activeIndex: number }) => {
  const [mounted, setMounted] = useState(false);
  const maxValue = Math.max(...FAILURE_REASONS.map((r) => r.value));

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full max-w-md">
      <div className="flex items-end justify-between gap-3 sm:gap-4 h-48 sm:h-64">
        {FAILURE_REASONS.map((reason, index) => {
          const isActive = index === activeIndex;
          const heightPct = mounted ? (reason.value / maxValue) * 100 : 0;

          return (
            <div key={reason.label} className="flex flex-col items-center justify-end h-full flex-1">
              <div className="w-full flex items-end h-full">
                <div
                  className={`w-full rounded-t-sm transition-all ease-out ${
                    isActive ? 'bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.45)]' : 'bg-[#28466b]'
                  }`}
                  style={{
                    height: `${heightPct}%`,
                    transitionDuration: '900ms',
                    transitionProperty: 'height, background-color, box-shadow',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// =====================================================
// VERSION 2 — outlined bars: white stroke, filled with the
// same navy as the hero background (no hatching/pattern).
// The active bar is called out with a brighter blue outline
// and glow instead of a fill change.
// =====================================================
const OutlineBarChart = ({ activeIndex }: { activeIndex: number }) => {
  const [mounted, setMounted] = useState(false);
  const maxValue = Math.max(...FAILURE_REASONS.map((r) => r.value));

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full max-w-md">
      <div className="flex items-end justify-between gap-3 sm:gap-4 h-48 sm:h-64">
        {FAILURE_REASONS.map((reason, index) => {
          const isActive = index === activeIndex;
          const heightPct = mounted ? (reason.value / maxValue) * 100 : 0;

          return (
            <div key={reason.label} className="flex flex-col items-center justify-end h-full flex-1">
              <div className="w-full flex items-end h-full">
                <div
                  className="w-full rounded-t-sm"
                  style={{
                    height: `${heightPct}%`,
                    backgroundColor: '#0A1E3D',
                    border: isActive ? '2.5px solid #60a5fa' : '1.5px solid rgba(255,255,255,0.55)',
                    boxShadow: isActive ? '0 0 16px rgba(96,165,250,0.55)' : 'none',
                    transition: 'height 900ms ease-out, border-color 700ms ease, box-shadow 700ms ease',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// =====================================================
// VERSION 3 & 4 — exploding donut / pie chart. Every slice
// is outlined in white with a blue fill; the whole chart
// turns slowly and continuously, and only the slice for the
// reason currently shown on the left pulls outward.
// =====================================================
const WedgeChart = ({
  activeIndex,
  variant,
}: {
  activeIndex: number;
  variant: 'donut' | 'pie';
}) => {
  const cx = 100;
  const cy = 100;
  const outerR = 82;
  const innerR = variant === 'donut' ? 46 : 0;
  const explodeDistance = variant === 'donut' ? 10 : 15;

  return (
    <div className="w-48 h-48 sm:w-64 sm:h-64">
      <style>{`
        @keyframes wedgeSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .wedge-spin-${variant} {
          transform-origin: 100px 100px;
          animation: wedgeSpin 55s linear infinite;
        }
      `}</style>

      <svg viewBox="0 0 200 200" className="w-full h-full">
        <g className={`wedge-spin-${variant}`}>
          {REASON_ARCS.map((arc, index) => {
            const isActive = index === activeIndex;
            const midRad = ((arc.midAngle - 90) * Math.PI) / 180;
            const distance = isActive ? explodeDistance : 0;
            const dx = Math.cos(midRad) * distance;
            const dy = Math.sin(midRad) * distance;

            return (
              <path
                key={arc.label}
                d={describeSlice(cx, cy, innerR, outerR, arc.startAngle, arc.endAngle)}
                stroke="#ffffff"
                strokeWidth={1.5}
                fill={isActive ? 'rgba(96,165,250,0.9)' : 'rgba(96,165,250,0.32)'}
                style={{
                  transform: `translate(${dx}px, ${dy}px)`,
                  transition: 'transform 700ms ease, fill 700ms ease',
                  filter: isActive ? 'drop-shadow(0 0 8px rgba(96,165,250,0.75))' : 'none',
                }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

// =====================================================
// VERSION 5 — horizontal pill bars. Rows fill outward from
// the left, active row glows.
// =====================================================
const HorizontalPillChart = ({ activeIndex }: { activeIndex: number }) => {
  const [mounted, setMounted] = useState(false);
  const maxValue = Math.max(...FAILURE_REASONS.map((r) => r.value));

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full max-w-md space-y-4">
      {FAILURE_REASONS.map((reason, index) => {
        const isActive = index === activeIndex;
        const widthPct = mounted ? (reason.value / maxValue) * 100 : 0;

        return (
          <div key={reason.label} className="h-3 sm:h-3.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                isActive ? 'bg-blue-400 shadow-[0_0_14px_rgba(96,165,250,0.6)]' : 'bg-white/35'
              }`}
              style={{
                width: `${widthPct}%`,
                transition: 'width 900ms ease-out, background-color 700ms ease, box-shadow 700ms ease',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

// =====================================================
// VERSION 6 — radial progress ring. The ring redraws to the
// active reason's value each cycle (scaled against a fixed
// ceiling so the fullest reason never quite closes the ring).
// =====================================================
const RadialProgressRing = ({ activeIndex }: { activeIndex: number }) => {
  const scaleCeiling = 50;
  const r = 80;
  const circumference = 2 * Math.PI * r;
  const value = FAILURE_REASONS[activeIndex].value;
  const offset = useMemo(
    () => circumference - (value / scaleCeiling) * circumference,
    [circumference, value]
  );

  return (
    <div className="w-48 h-48 sm:w-64 sm:h-64">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={12} />
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="#60a5fa"
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 100 100)"
          style={{
            transition: 'stroke-dashoffset 900ms ease-out',
            filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.55))',
          }}
        />
      </svg>
    </div>
  );
};

// =====================================================
// SIX HERO VERSIONS — each owns its own timer so they
// cycle independently.
// =====================================================
const labels = FAILURE_REASONS.map((r) => r.label);

const HeroVersion1 = () => {
  const { activeIndex, displayText } = useSequentialTyping(labels);
  return (
    <HeroShell devLabel="Version 1 — Vertical bar chart">
      <HeroGrid
        left={<FailureReasonCallout activeIndex={activeIndex} displayText={displayText} />}
        right={<SolidBarChart activeIndex={activeIndex} />}
      />
    </HeroShell>
  );
};

const HeroVersion2 = () => {
  const { activeIndex, displayText } = useSequentialTyping(labels);
  return (
    <HeroShell devLabel="Version 2 — Outlined bar chart">
      <HeroGrid
        left={<FailureReasonCallout activeIndex={activeIndex} displayText={displayText} />}
        right={<OutlineBarChart activeIndex={activeIndex} />}
      />
    </HeroShell>
  );
};

const HeroVersion3 = () => {
  const { activeIndex, displayText } = useSequentialTyping(labels);
  return (
    <HeroShell devLabel="Version 3 — Exploding donut chart">
      <HeroGrid
        left={<FailureReasonCallout activeIndex={activeIndex} displayText={displayText} />}
        right={<WedgeChart activeIndex={activeIndex} variant="donut" />}
      />
    </HeroShell>
  );
};

const HeroVersion4 = () => {
  const { activeIndex, displayText } = useSequentialTyping(labels);
  return (
    <HeroShell devLabel="Version 4 — Exploding pie chart">
      <HeroGrid
        left={<FailureReasonCallout activeIndex={activeIndex} displayText={displayText} />}
        right={<WedgeChart activeIndex={activeIndex} variant="pie" />}
      />
    </HeroShell>
  );
};

const HeroVersion5 = () => {
  const { activeIndex, displayText } = useSequentialTyping(labels);
  return (
    <HeroShell devLabel="Version 5 — Horizontal pill bars">
      <HeroGrid
        left={<FailureReasonCallout activeIndex={activeIndex} displayText={displayText} />}
        right={<HorizontalPillChart activeIndex={activeIndex} />}
      />
    </HeroShell>
  );
};

const HeroVersion6 = () => {
  const { activeIndex, displayText } = useSequentialTyping(labels);
  return (
    <HeroShell devLabel="Version 6 — Radial progress ring">
      <HeroGrid
        left={<FailureReasonCallout activeIndex={activeIndex} displayText={displayText} />}
        right={<RadialProgressRing activeIndex={activeIndex} />}
      />
    </HeroShell>
  );
};

// =====================================================
// TEST PAGE — every version, stacked for comparison
// =====================================================
export default function TestPage() {
  return (
    <main className="min-h-screen bg-white">
      <style>{`
        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .percent-slide-in {
          animation: slideInFromLeft 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      <HeroVersion1 />
      <HeroVersion2 />
      <HeroVersion3 />
      <HeroVersion4 />
      <HeroVersion5 />
      <HeroVersion6 />
    </main>
  );
}