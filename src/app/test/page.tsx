// app/test/page.tsx
//
// Drop this file in at app/test/page.tsx. The hero background, grid pattern,
// and section padding are untouched. What changed from the previous pass:
//
//   1. The left-column typing text no longer runs its own independent list
//      of "problem phrases" — it now types out the label of whichever
//      failure reason is currently highlighted on the right, so the two
//      sides are driven by the exact same state and always agree.
//   2. Above that typed label, the percentage for the active reason slides
//      in from the left each time the active reason changes.
//   3. The bar chart on the right has no card, no background, no border —
//      it's just the bars sitting directly on the hero's navy background.
//
// Merging into the real homepage later just means lifting the two blocks
// below (percent+caption, and the chart) into HeroSection in app/page.tsx.

'use client';

import React, { useEffect, useState } from 'react';

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

// =====================================================
// SEQUENTIAL TYPING / CYCLING HOOK
// Owns which reason is "active". Types that reason's label
// forward (no delete, no cursor), holds it, then advances —
// looping forever. Both sides of the hero read from this
// same hook instance, so the percent, the caption, and the
// highlighted bar always change together.
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
// LEFT SIDE — percent (slides in from the left) with the
// typed reason label directly beneath it.
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
      <style>{`
        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .percent-slide-in {
          animation: slideInFromLeft 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

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
// RIGHT SIDE — bar chart, no card, no background.
// =====================================================
const FailureReasonsChart = ({ activeIndex }: { activeIndex: number }) => {
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
            <div
              key={reason.label}
              className="flex flex-col items-center justify-end h-full flex-1"
            >
              <div className="w-full flex items-end h-full">
                <div
                  className={`w-full rounded-t-sm transition-all ease-out ${
                    isActive
                      ? 'bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.45)]'
                      : 'bg-[#28466b]'
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
// HERO SECTION — background, grid pattern, and section
// spacing are unchanged. Left and right now read from the
// same synced state.
// =====================================================
const HeroSectionWithChart = () => {
  const { activeIndex, displayText } = useSequentialTyping(
    FAILURE_REASONS.map((r) => r.label)
  );

  return (
    <section className="relative bg-[#0A1E3D] min-h-[500px] sm:min-h-[600px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background pattern — unchanged */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="blog-grid"
              patternUnits="userSpaceOnUse"
              width="5"
              height="5"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blog-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 lg:space-y-10">
            <h2 className="text-xl sm:text-2xl text-white">
              Running a startup means making irreversible decisions with incomplete information.
            </h2>

            <FailureReasonCallout activeIndex={activeIndex} displayText={displayText} />
          </div>

          <div className="relative h-64 sm:h-80 lg:h-[450px] flex items-center justify-center lg:justify-end">
            <FailureReasonsChart activeIndex={activeIndex} />
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// TEST PAGE
// Every new animation/visualisation for the site gets
// added below, one section at a time.
// =====================================================
export default function TestPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSectionWithChart />
    </main>
  );
}