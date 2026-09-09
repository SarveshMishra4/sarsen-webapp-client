// app/test/new-visuals/page.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';

// =====================================================
// DATA — Reuse from homepage (LEFT_PANEL_INSIGHTS)
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
// HOOK — Types label, holds, advances (same as homepage)
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
// LEFT CALLOUT — same as homepage
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
        @keyframes slideInFromLeftNew {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .percent-slide-in-new {
          animation: slideInFromLeftNew 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      <div key={`percent-${activeIndex}`} className="percent-slide-in-new">
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
// HERO SHELL & GRID — reusable container
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
// VISUAL 1 — POLAR AREA CHART (ROSE CHART)
// =====================================================
const PolarAreaChart = ({ activeIndex }: { activeIndex: number }) => {
  const [mounted, setMounted] = useState(false);
  const maxValue = Math.max(...LEFT_PANEL_INSIGHTS.map((r) => r.value));
  const angleStep = 360 / LEFT_PANEL_INSIGHTS.length;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const describeWedge = (
    cx: number,
    cy: number,
    startAngle: number,
    endAngle: number,
    radius: number
  ) => {
    const start = polarToCartesian(cx, cy, radius, startAngle);
    const end = polarToCartesian(cx, cy, radius, endAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
  };

  return (
    <div className="w-64 h-64 sm:w-80 sm:h-80">
      {mounted && (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {LEFT_PANEL_INSIGHTS.map((reason, index) => {
            const startAngle = index * angleStep;
            const endAngle = (index + 1) * angleStep;
            const baseRadius = (reason.value / maxValue) * 80;
            const radius = index === activeIndex ? baseRadius * 1.1 : baseRadius;

            return (
              <path
                key={reason.label}
                d={describeWedge(100, 100, startAngle, endAngle, radius)}
                fill={index === activeIndex ? 'rgba(96,165,250,0.9)' : 'rgba(96,165,250,0.3)'}
                stroke="#ffffff"
                strokeWidth={1}
                style={{
                  transition: 'fill 700ms ease, transform 700ms ease',
                  transform: `scale(${1})`,
                  transformOrigin: '100px 100px',
                  filter: index === activeIndex ? 'drop-shadow(0 0 8px rgba(96,165,250,0.75))' : 'none',
                }}
              />
            );
          })}
          <circle cx="100" cy="100" r="5" fill="#ffffff" opacity="0.5" />
        </svg>
      )}
    </div>
  );
};

// =====================================================
// VISUAL 2 — RADAR CHART (SPIDER CHART)
// =====================================================
const RadarChart = ({ activeIndex }: { activeIndex: number }) => {
  const [mounted, setMounted] = useState(false);
  const maxValue = Math.max(...LEFT_PANEL_INSIGHTS.map((r) => r.value));
  const angleStep = (2 * Math.PI) / LEFT_PANEL_INSIGHTS.length;
  const centerX = 100;
  const centerY = 100;
  const maxRadius = 70;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const getPoint = (index: number, radius: number) => {
    const angle = -Math.PI / 2 + index * angleStep;
    return { x: centerX + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) };
  };

  const points = LEFT_PANEL_INSIGHTS.map((reason, idx) => {
    const radius = (reason.value / maxValue) * maxRadius;
    return getPoint(idx, radius);
  });

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  const rings = [25, 50, 75].map((percent) => {
    const r = (percent / 100) * maxRadius;
    return <circle key={percent} cx={centerX} cy={centerY} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />;
  });

  const spokes = LEFT_PANEL_INSIGHTS.map((_, idx) => {
    const end = getPoint(idx, maxRadius);
    return (
      <line
        key={idx}
        x1={centerX}
        y1={centerY}
        x2={end.x}
        y2={end.y}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.5"
      />
    );
  });

  return (
    <div className="w-64 h-64 sm:w-80 sm:h-80">
      {mounted && (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {rings}
          {spokes}
          <polygon
            points={polygonPoints}
            fill="rgba(96,165,250,0.2)"
            stroke="#60a5fa"
            strokeWidth={1.5}
            style={{
              transition: 'all 700ms ease',
              opacity: 1,
              transform: `scale(${1})`,
              transformOrigin: `${centerX}px ${centerY}px`,
            }}
          />
          {points.map((p, idx) => (
            <circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r={idx === activeIndex ? 5 : 3}
              fill={idx === activeIndex ? '#60a5fa' : '#ffffff'}
              style={{
                transition: 'r 700ms ease, fill 700ms ease',
                filter: idx === activeIndex ? 'drop-shadow(0 0 6px rgba(96,165,250,0.9))' : 'none',
              }}
            />
          ))}
        </svg>
      )}
    </div>
  );
};

// =====================================================
// VISUAL 3 — STACKED HORIZONTAL BAR
// =====================================================
const StackedHorizontalBar = ({ activeIndex }: { activeIndex: number }) => {
  const [mounted, setMounted] = useState(false);
  const total = LEFT_PANEL_INSIGHTS.reduce((sum, r) => sum + r.value, 0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  let cumulativeWidth = 0;

  return (
    <div className="w-full max-w-md">
      <div className="relative h-8 sm:h-10 rounded-full overflow-hidden bg-white/10 flex">
        {mounted && LEFT_PANEL_INSIGHTS.map((reason, index) => {
          const widthPct = (reason.value / total) * 100;
          const leftPct = cumulativeWidth;
          cumulativeWidth += widthPct;

          const isActive = index === activeIndex;
          const activeOffset = isActive ? 4 : 0;

          return (
            <div
              key={reason.label}
              className={`absolute top-0 h-full rounded-full ${
                isActive ? 'bg-blue-400 shadow-[0_0_14px_rgba(96,165,250,0.6)]' : 'bg-white/35'
              }`}
              style={{
                left: `${leftPct}%`,
                width: `${widthPct}%`,
                transform: `translateY(${activeOffset}px)`,
                transition: 'background-color 700ms ease, transform 700ms ease, box-shadow 700ms ease',
                opacity: 1,
              }}
            />
          );
        })}
      </div>
      <p className="text-white/50 text-sm mt-3 text-center">
        Each segment represents its share of total failure reasons
      </p>
    </div>
  );
};

// =====================================================
// VISUAL 4 — SEGMENTED PROGRESS RING
// =====================================================
const SegmentedProgressRing = ({ activeIndex }: { activeIndex: number }) => {
  const [mounted, setMounted] = useState(false);
  const cx = 100;
  const cy = 100;
  const r = 80;
  const gapAngle = 4;
  const totalValue = LEFT_PANEL_INSIGHTS.reduce((sum, r) => sum + r.value, 0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const describeArc = (startAngle: number, endAngle: number, radius: number) => {
    const start = polarToCartesian(cx, cy, radius, startAngle);
    const end = polarToCartesian(cx, cy, radius, endAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  let cumulativeAngle = 0;
  const segments = LEFT_PANEL_INSIGHTS.map((reason) => {
    const startAngle = (cumulativeAngle / totalValue) * 360;
    cumulativeAngle += reason.value;
    const endAngle = (cumulativeAngle / totalValue) * 360;
    return { startAngle: startAngle + gapAngle / 2, endAngle: endAngle - gapAngle / 2 };
  });

  return (
    <div className="w-64 h-64 sm:w-80 sm:h-80">
      {mounted && (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {segments.map((seg, index) => {
            const isActive = index === activeIndex;
            const strokeWidth = isActive ? 14 : 10;
            return (
              <path
                key={index}
                d={describeArc(seg.startAngle, seg.endAngle, r)}
                fill="none"
                stroke={isActive ? '#60a5fa' : 'rgba(96,165,250,0.35)'}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                style={{
                  transition: 'stroke 700ms ease, stroke-width 700ms ease',
                  filter: isActive ? 'drop-shadow(0 0 8px rgba(96,165,250,0.8))' : 'none',
                  opacity: 1,
                }}
              />
            );
          })}
        </svg>
      )}
    </div>
  );
};

// =====================================================
// VISUAL 5 — BUBBLE CLUSTER
// =====================================================
const BubbleCluster = ({ activeIndex }: { activeIndex: number }) => {
  const [mounted, setMounted] = useState(false);
  const maxValue = Math.max(...LEFT_PANEL_INSIGHTS.map((r) => r.value));
  const spacing = 200 / (LEFT_PANEL_INSIGHTS.length + 1);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full max-w-md">
      <svg viewBox="0 0 400 120" className="w-full h-auto">
        {mounted && LEFT_PANEL_INSIGHTS.map((reason, index) => {
          const x = spacing * (index + 1);
          const baseRadius = (reason.value / maxValue) * 35;
          const radius = index === activeIndex ? baseRadius * 1.2 : baseRadius;
          const y = 60 + (index % 2 === 0 ? -5 : 5);

          return (
            <circle
              key={reason.label}
              cx={x}
              cy={y}
              r={radius}
              fill={index === activeIndex ? 'rgba(96,165,250,0.9)' : 'rgba(96,165,250,0.35)'}
              stroke="#ffffff"
              strokeWidth={1}
              style={{
                transition: 'r 700ms ease, fill 700ms ease',
                filter: index === activeIndex ? 'drop-shadow(0 0 10px rgba(96,165,250,0.9))' : 'none',
                transformOrigin: `${x}px ${y}px`,
              }}
            />
          );
        })}
      </svg>
      <p className="text-white/50 text-sm mt-3 text-center">
        Bubble size represents relative frequency
      </p>
    </div>
  );
};

// =====================================================
// ADDITIONAL DIAGRAM COMPONENTS
// =====================================================
const EngagementPathChart = () => {
  const stages = ['You Reach Out', 'We Respond', 'Discovery Call', 'Engagement Begins'];
  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineEngagement {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-engagement {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineEngagement 3s ease-in-out forwards;
        }
      `}</style>

      <svg viewBox="0 0 400 210" className="w-full h-auto">
        <path
          id="engagement-path"
          d="M 20 170 C 70 150, 100 110, 140 100 C 180 90, 210 95, 250 80 C 290 65, 330 55, 380 40"
          fill="none"
          stroke="#ffffff"
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          className="draw-line-engagement"
        />
        <circle r={5} fill="#ffffff" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.9))' }}>
          <animateMotion dur="3s" repeatCount="1" fill="freeze" rotate="auto">
            <mpath href="#engagement-path" />
          </animateMotion>
        </circle>
      </svg>

      <div className="flex justify-between text-[11px] sm:text-sm text-white/50 mt-2 px-1">
        {stages.map((s) => (
          <span key={s} className="text-center max-w-[80px]">{s}</span>
        ))}
      </div>

      <p className="text-white/70 text-base text-center mt-6">
        Every Conversation Has a Clear Next Step
      </p>
    </div>
  );
};

const PulseConnectDiagram = () => {
  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes pulseRing {
          0%   { r: 5; opacity: 0.9; }
          80%  { r: 22; opacity: 0; }
          100% { r: 22; opacity: 0; }
        }
        .pulse-ring-start { animation: pulseRing 2.6s ease-out infinite; }
        .pulse-ring-end   { animation: pulseRing 2.6s ease-out infinite 1.3s; }
      `}</style>

      <svg viewBox="0 0 400 140" className="w-full h-auto">
        <line x1="40" y1="70" x2="360" y2="70" stroke="rgba(255,255,255,0.25)" strokeWidth={1.5} strokeDasharray="4 6" />

        <circle cx="40" cy="70" r="5" fill="#ffffff" />
        <circle cx="40" cy="70" r="5" fill="#60a5fa" className="pulse-ring-start" />

        <circle cx="360" cy="70" r="5" fill="#ffffff" />
        <circle cx="360" cy="70" r="5" fill="#60a5fa" className="pulse-ring-end" />

        <circle r={5} fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.9))' }}>
          <animateMotion
            dur="2.6s"
            repeatCount="indefinite"
            keyPoints="0;1;0"
            keyTimes="0;0.5;1"
            calcMode="linear"
            path="M 40 70 L 360 70"
          />
        </circle>
      </svg>

      <div className="flex justify-between text-sm text-white/60 mt-3 px-2">
        <span>You</span>
        <span>Sarsen</span>
      </div>

      <p className="text-white/70 text-base text-center mt-6">
        We Respond to Every Enquiry Within 24 Hours
      </p>
    </div>
  );
};

const ResponseTimelineChart = () => {
  const milestones = [
    { t: '0h', label: 'Message Received', x: 30 },
    { t: '24h', label: 'Strategist Responds', x: 200 },
    { t: '48h', label: 'Call Scheduled', x: 370 },
  ];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineTimeline {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-timeline {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineTimeline 2.4s ease-in-out forwards;
        }
        @keyframes tickFadeIn {
          from { opacity: 0; transform: scale(0); }
          to   { opacity: 1; transform: scale(1); }
        }
        .tick-fade-1 { animation: tickFadeIn 0.4s ease-out 0s both; }
        .tick-fade-2 { animation: tickFadeIn 0.4s ease-out 1.1s both; }
        .tick-fade-3 { animation: tickFadeIn 0.4s ease-out 2.2s both; }
      `}</style>

      <svg viewBox="0 0 400 120" className="w-full h-auto">
        <path
          id="timeline-path"
          d="M 30 60 L 370 60"
          fill="none"
          stroke="#ffffff"
          strokeWidth={2}
          strokeLinecap="round"
          pathLength={1}
          className="draw-line-timeline"
        />
        {milestones.map((m, i) => (
          <circle
            key={m.t}
            cx={m.x}
            cy={60}
            r={5}
            fill="#60a5fa"
            className={`tick-fade-${i + 1}`}
            style={{ transformOrigin: `${m.x}px 60px` }}
          />
        ))}
        <circle r={5} fill="#ffffff" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.9))' }}>
          <animateMotion dur="2.4s" repeatCount="1" fill="freeze" rotate="auto">
            <mpath href="#timeline-path" />
          </animateMotion>
        </circle>
      </svg>

      <div className="flex justify-between text-white/50 mt-2 px-1">
        {milestones.map((m) => (
          <div key={m.t} className="text-center max-w-[110px]">
            <div className="text-white/80 text-sm font-medium">{m.t}</div>
            <div className="text-[11px] sm:text-xs">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ConvergingChannelsDiagram = () => {
  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineConverge {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-converge-1 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: drawLineConverge 1.1s ease-out 0s forwards; }
        .draw-line-converge-2 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: drawLineConverge 1.1s ease-out 0.3s forwards; }
        .draw-line-converge-3 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: drawLineConverge 1.1s ease-out 0.6s forwards; }
        @keyframes convergeGlow {
          0%, 100% { r: 5; opacity: 0.9; }
          50%      { r: 8; opacity: 1; }
        }
        .converge-glow { animation: convergeGlow 2.2s ease-in-out 1.6s infinite; }
      `}</style>

      <svg viewBox="0 0 400 200" className="w-full h-auto">
        <path d="M 20 40 C 120 40, 220 100, 340 100" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" pathLength={1} className="draw-line-converge-1" />
        <path d="M 20 100 L 340 100" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" pathLength={1} className="draw-line-converge-2" />
        <path d="M 20 160 C 120 160, 220 100, 340 100" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" pathLength={1} className="draw-line-converge-3" />

        <text x="10" y="35" fill="rgba(255,255,255,0.5)" fontSize="11">Email</text>
        <text x="10" y="95" fill="rgba(255,255,255,0.5)" fontSize="11">Call</text>
        <text x="10" y="165" fill="rgba(255,255,255,0.5)" fontSize="11">Form</text>

        <circle cx="340" cy="100" r="5" fill="#60a5fa" className="converge-glow" style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.8))' }} />
      </svg>

      <p className="text-white/70 text-base text-center mt-6">
        However You Reach Us, It Becomes One Conversation
      </p>
    </div>
  );
};

// =====================================================
// NEW: GLOBAL COVERAGE CLOCK
// =====================================================
const GlobalCoverageClock = () => {
  const cx = 100, cy = 100, r = 78;
  const sweepDuration = 18;

  const polarToCartesian = (angleDeg: number, radius = r) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  const offices = [
    { name: 'Abu Dhabi', angle: 0 },
    { name: 'Goa', angle: 22.5 },
    { name: 'Singapore', angle: 60 },
    { name: 'Boston', angle: 225 },
  ];

  const hourTicks = Array.from({ length: 24 }, (_, h) => {
    const angle = h * 15;
    const outer = polarToCartesian(angle, r);
    const inner = polarToCartesian(angle, r - (h % 6 === 0 ? 10 : 5));
    return { x1: outer.x, y1: outer.y, x2: inner.x, y2: inner.y, major: h % 6 === 0 };
  });

  return (
    <div className="w-64 h-64 sm:w-80 sm:h-80">
      <style>{`
        @keyframes coverageSweep {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .coverage-sweep {
          transform-origin: 100px 100px;
          animation: coverageSweep ${sweepDuration}s linear infinite;
        }
        @keyframes officePulse {
          0%, 88%, 100% { r: 3.5; opacity: 0.7; filter: drop-shadow(0 0 0 rgba(96,165,250,0)); }
          6%            { r: 6.5; opacity: 1;   filter: drop-shadow(0 0 8px rgba(96,165,250,0.9)); }
          14%           { r: 3.5; opacity: 0.7; filter: drop-shadow(0 0 0 rgba(96,165,250,0)); }
        }
      `}</style>

      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />

        {hourTicks.map((t, i) => (
          <line
            key={i}
            x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth={t.major ? 1.2 : 0.6}
          />
        ))}

        <g className="coverage-sweep">
          <line x1={cx} y1={cy} x2={cx} y2={cy - r} stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} />
          <circle cx={cx} cy={cy - r} r={4} fill="#ffffff" style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))' }} />
        </g>

        <circle cx={cx} cy={cy} r={3} fill="#ffffff" />

        {offices.map((o) => {
          const pos = polarToCartesian(o.angle);
          const labelPos = polarToCartesian(o.angle, r + 20);
          const delay = (o.angle / 360) * sweepDuration;
          return (
            <g key={o.name}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={3.5}
                fill="#60a5fa"
                style={{
                  animation: `officePulse ${sweepDuration}s ease-in-out ${delay}s infinite`,
                }}
              />
              <text
                x={labelPos.x}
                y={labelPos.y}
                fill="#93C5FD"
                fontSize="8.5"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {o.name}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="text-white/70 text-base text-center mt-4">
        Four Offices. One Continuous Day.
      </p>
    </div>
  );
};

// =====================================================
// NEW: REFINED COVERAGE CLOCK
// =====================================================
const RefinedCoverageClock = () => {
  const cx = 100, cy = 100, r = 78;
  const sweepDuration = 20;

  const polarToCartesian = (angleDeg: number, radius = r) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  const offices = [
    { name: 'Abu Dhabi', angle: 0 },
    { name: 'Goa', angle: 22.5 },
    { name: 'Singapore', angle: 60 },
    { name: 'Boston', angle: 225 },
  ];

  return (
    <div className="w-64 h-64 sm:w-80 sm:h-80">
      <style>{`
        @keyframes coverageSweepRefined {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .coverage-sweep-refined {
          transform-origin: 100px 100px;
          animation: coverageSweepRefined ${sweepDuration}s linear infinite;
        }
        @keyframes officePulseRefined {
          0%, 88%, 100% { r: 3; opacity: 0.6; }
          6%            { r: 6; opacity: 1; filter: drop-shadow(0 0 7px rgba(96,165,250,0.85)); }
          14%           { r: 3; opacity: 0.6; }
        }
      `}</style>

      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={1.5} />

        <g className="coverage-sweep-refined">
          <line
            x1={cx} y1={cy} x2={cx} y2={cy - r}
            stroke="#60a5fa"
            strokeWidth={1.5}
            strokeDasharray="3 4"
            strokeLinecap="round"
          />
          <circle
            cx={cx} cy={cy - r} r={7}
            fill="none"
            stroke="#60a5fa"
            strokeWidth={1.5}
            strokeDasharray="2 2.5"
            style={{ filter: 'drop-shadow(0 0 5px rgba(96,165,250,0.6))' }}
          />
        </g>

        <circle cx={cx} cy={cy} r={2.5} fill="#ffffff" />

        {offices.map((o) => {
          const pos = polarToCartesian(o.angle);
          const labelPos = polarToCartesian(o.angle, r + 20);
          const delay = (o.angle / 360) * sweepDuration;
          return (
            <g key={o.name}>
              <circle
                cx={pos.x} cy={pos.y} r={3}
                fill="#60a5fa"
                style={{ animation: `officePulseRefined ${sweepDuration}s ease-in-out ${delay}s infinite` }}
              />
              <text x={labelPos.x} y={labelPos.y} fill="#93C5FD" fontSize="8.5" textAnchor="middle" dominantBaseline="middle">
                {o.name}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="text-white/70 text-base text-center mt-4">
        Four Offices. One Continuous Day.
      </p>
    </div>
  );
};

// =====================================================
// NEW: HORIZONTAL TIMEZONE BAND
// =====================================================
const HorizontalTimezoneBand = () => {
  const travelDuration = 22;
  const offices = [
    { name: 'Abu Dhabi', x: 80 },
    { name: 'Goa', x: 102 },
    { name: 'Singapore', x: 140 },
    { name: 'Boston', x: 305 },
  ];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes bandTravel {
          from { offset-distance: 0%; }
          to   { offset-distance: 100%; }
        }
        .band-dot {
          offset-path: path('M 20 60 L 380 60');
          animation: bandTravel ${travelDuration}s linear infinite;
        }
        @keyframes markerGlow {
          0%, 92%, 100% { opacity: 0.45; r: 3; }
          6%            { opacity: 1; r: 5; filter: drop-shadow(0 0 6px rgba(96,165,250,0.8)); }
        }
      `}</style>

      <svg viewBox="0 0 400 100" className="w-full h-auto">
        <line x1="20" y1="60" x2="380" y2="60" stroke="rgba(255,255,255,0.65)" strokeWidth={1.5} />

        {offices.map((o) => {
          const delay = ((o.x - 20) / 360) * travelDuration;
          return (
            <g key={o.name}>
              <circle
                cx={o.x} cy={60} r={3}
                fill="#60a5fa"
                style={{ animation: `markerGlow ${travelDuration}s ease-in-out ${delay}s infinite` }}
              />
              <text x={o.x} y={80} fill="#93C5FD" fontSize="9" textAnchor="middle">{o.name}</text>
            </g>
          );
        })}

        <circle r={4} fill="#ffffff" className="band-dot" style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.7))' }} />
      </svg>

      <p className="text-white/70 text-base text-center mt-4">
        Somewhere in the World, We're Already Working
      </p>
    </div>
  );
};

// =====================================================
// NEW: MINIMAL ORBIT RING
// =====================================================
const MinimalOrbitRing = () => {
  const cx = 100, cy = 100, r = 70;
  const orbitDuration = 24;

  const polarToCartesian = (angleDeg: number, radius = r) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  const offices = [
    { name: 'Abu Dhabi', angle: 0 },
    { name: 'Goa', angle: 22.5 },
    { name: 'Singapore', angle: 60 },
    { name: 'Boston', angle: 225 },
  ];

  return (
    <div className="w-64 h-64 sm:w-80 sm:h-80">
      <style>{`
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .orbit-spin {
          transform-origin: 100px 100px;
          animation: orbitSpin ${orbitDuration}s linear infinite;
        }
      `}</style>

      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={1} />

        <g className="orbit-spin">
          <circle cx={cx} cy={cy - r} r={4} fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.8))' }} />
        </g>

        {offices.map((o) => {
          const pos = polarToCartesian(o.angle, r + 18);
          return (
            <text key={o.name} x={pos.x} y={pos.y} fill="rgba(147,197,253,0.75)" fontSize="8.5" textAnchor="middle" dominantBaseline="middle">
              {o.name}
            </text>
          );
        })}
      </svg>

      <p className="text-white/70 text-base text-center mt-4">
        Always Somewhere, Always On
      </p>
    </div>
  );
};

// =====================================================
// NEW: NETWORK PULSE DIAGRAM
// =====================================================
const NetworkPulseDiagram = () => {
  const nodes = [
    { name: 'Abu Dhabi', x: 80, y: 50 },
    { name: 'Goa', x: 60, y: 140 },
    { name: 'Singapore', x: 200, y: 160 },
    { name: 'Boston', x: 300, y: 60 },
  ];
  const edges = [
    { from: 0, to: 1, delay: 0 },
    { from: 1, to: 2, delay: 1.5 },
    { from: 2, to: 3, delay: 3 },
    { from: 3, to: 0, delay: 4.5 },
  ];
  const cycleDuration = 6;

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes edgePulseTravel {
          0%   { offset-distance: 0%; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes nodeLitUp {
          0%, 100% { r: 3; opacity: 0.55; }
          15%      { r: 5; opacity: 1; filter: drop-shadow(0 0 6px rgba(96,165,250,0.8)); }
        }
      `}</style>

      <svg viewBox="0 0 360 200" className="w-full h-auto">
        {edges.map((e, i) => {
          const a = nodes[e.from], b = nodes[e.to];
          return (
            <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
          );
        })}

        {edges.map((e, i) => {
          const a = nodes[e.from], b = nodes[e.to];
          const pathId = `edge-path-${i}`;
          return (
            <g key={i}>
              <path id={pathId} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} fill="none" stroke="none" />
              <circle r={3} fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 5px rgba(96,165,250,0.8))' }}>
                <animateMotion dur={`${cycleDuration}s`} begin={`${e.delay}s`} repeatCount="indefinite" fill="freeze">
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}

        {nodes.map((n, i) => (
          <g key={n.name}>
            <circle
              cx={n.x} cy={n.y} r={3}
              fill="#93C5FD"
              style={{ animation: `nodeLitUp ${cycleDuration}s ease-in-out ${edges[i].delay}s infinite` }}
            />
            <text x={n.x} y={n.y - 12} fill="rgba(147,197,253,0.75)" fontSize="9" textAnchor="middle">{n.name}</text>
          </g>
        ))}
      </svg>

      <p className="text-white/70 text-base text-center mt-4">
        One Team, Four Time Zones
      </p>
    </div>
  );
};

// =====================================================
// NEW: SLIDING COVERAGE WINDOW
// =====================================================
const SlidingCoverageWindow = () => {
  const travelDuration = 20;
  const offices = [
    { name: 'Abu Dhabi', x: 80 },
    { name: 'Goa', x: 102 },
    { name: 'Singapore', x: 140 },
    { name: 'Boston', x: 305 },
  ];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes windowSlide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(340px); }
        }
        .sliding-window {
          animation: windowSlide ${travelDuration}s ease-in-out infinite alternate;
        }
      `}</style>

      <svg viewBox="0 0 400 100" className="w-full h-auto">
        <line x1="20" y1="60" x2="380" y2="60" stroke="rgba(255,255,255,0.5)" strokeWidth={1} />

        <rect
          x="20" y="52" width="40" height="16" rx="8"
          fill="rgba(96,165,250,0.25)"
          stroke="rgba(96,165,250,0.6)"
          strokeWidth={1}
          className="sliding-window"
        />

        {offices.map((o) => (
          <g key={o.name}>
            <line x1={o.x} y1={54} x2={o.x} y2={66} stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
            <text x={o.x} y={82} fill="#93C5FD" fontSize="9" textAnchor="middle">{o.name}</text>
          </g>
        ))}
      </svg>

      <p className="text-white/70 text-base text-center mt-4">
        Coverage That Follows the Sun
      </p>
    </div>
  );
};

// =====================================================
// STAIRCASE DIAGRAM
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

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-end space-y-3">
        {mounted && steps.map((label, index) => {
          const widthPct = 100 - (steps.length - 1 - index) * 10;
          return (
            <div
              key={label}
              className="flex items-center justify-center rounded-md border-2 border-white bg-[#0A1E3D] text-white font-medium px-4 py-2"
              style={{
                width: `${widthPct}%`,
                opacity: 1,
                transform: 'translateX(0)',
                transition: 'opacity 500ms ease, transform 500ms ease',
              }}
            >
              <span className="text-sm sm:text-base">{label}</span>
            </div>
          );
        })}
      </div>
      <p className="text-white/50 text-sm mt-4 text-center">
        From diagnosis to measurable progress
      </p>
    </div>
  );
};

// =====================================================
// HERO VERSIONS — all existing and new
// =====================================================
const HeroVersionPolar = () => {
  const { activeIndex, displayText } = useLoopingStageSequence(LEFT_PANEL_INSIGHTS);
  return (
    <HeroShell devLabel="Version A — Polar Area Chart">
      <HeroGrid
        left={<LifecycleCallout activeIndex={activeIndex} displayText={displayText} />}
        right={<PolarAreaChart activeIndex={activeIndex} />}
      />
    </HeroShell>
  );
};

const HeroVersionRadar = () => {
  const { activeIndex, displayText } = useLoopingStageSequence(LEFT_PANEL_INSIGHTS);
  return (
    <HeroShell devLabel="Version B — Radar Chart">
      <HeroGrid
        left={<LifecycleCallout activeIndex={activeIndex} displayText={displayText} />}
        right={<RadarChart activeIndex={activeIndex} />}
      />
    </HeroShell>
  );
};

const HeroVersionStacked = () => {
  const { activeIndex, displayText } = useLoopingStageSequence(LEFT_PANEL_INSIGHTS);
  return (
    <HeroShell devLabel="Version C — Stacked Horizontal Bar">
      <HeroGrid
        left={<LifecycleCallout activeIndex={activeIndex} displayText={displayText} />}
        right={<StackedHorizontalBar activeIndex={activeIndex} />}
      />
    </HeroShell>
  );
};

const HeroVersionSegmented = () => {
  const { activeIndex, displayText } = useLoopingStageSequence(LEFT_PANEL_INSIGHTS);
  return (
    <HeroShell devLabel="Version D — Segmented Progress Ring">
      <HeroGrid
        left={<LifecycleCallout activeIndex={activeIndex} displayText={displayText} />}
        right={<SegmentedProgressRing activeIndex={activeIndex} />}
      />
    </HeroShell>
  );
};

const HeroVersionBubble = () => {
  const { activeIndex, displayText } = useLoopingStageSequence(LEFT_PANEL_INSIGHTS);
  return (
    <HeroShell devLabel="Version E — Bubble Cluster">
      <HeroGrid
        left={<LifecycleCallout activeIndex={activeIndex} displayText={displayText} />}
        right={<BubbleCluster activeIndex={activeIndex} />}
      />
    </HeroShell>
  );
};

const HeroVersionStaircase = () => {
  return (
    <HeroShell devLabel="Version F — Staircase Diagram">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">From diagnosis to measurable progress.</p>
            <p className="text-white/60 text-base">Each step builds on the one before it.</p>
          </div>
        }
        right={<StaircaseDiagram />}
      />
    </HeroShell>
  );
};

const HeroVersionEngagement = () => {
  return (
    <HeroShell devLabel="Version G — Engagement Path">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">Every conversation has a clear next step.</p>
            <p className="text-white/60 text-base">From first contact to engagement, the path is defined.</p>
          </div>
        }
        right={<EngagementPathChart />}
      />
    </HeroShell>
  );
};

const HeroVersionPulse = () => {
  return (
    <HeroShell devLabel="Version H — Pulse Connect">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">We respond within 24 hours.</p>
            <p className="text-white/60 text-base">Our connection is always active.</p>
          </div>
        }
        right={<PulseConnectDiagram />}
      />
    </HeroShell>
  );
};

const HeroVersionTimeline = () => {
  return (
    <HeroShell devLabel="Version I — Response Timeline">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">A predictable response process.</p>
            <p className="text-white/60 text-base">Know exactly when to expect our next move.</p>
          </div>
        }
        right={<ResponseTimelineChart />}
      />
    </HeroShell>
  );
};

const HeroVersionConverging = () => {
  return (
    <HeroShell devLabel="Version J — Converging Channels">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">All channels lead to one conversation.</p>
            <p className="text-white/60 text-base">Email, call, or form—it becomes a single thread.</p>
          </div>
        }
        right={<ConvergingChannelsDiagram />}
      />
    </HeroShell>
  );
};

const HeroVersionGlobalCoverage = () => {
  return (
    <HeroShell devLabel="Version K — Global Coverage Clock">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">Four offices, one continuous day.</p>
            <p className="text-white/60 text-base">While one sleeps, the others are already moving.</p>
          </div>
        }
        right={<GlobalCoverageClock />}
      />
    </HeroShell>
  );
};

const HeroVersionRefinedCoverage = () => {
  return (
    <HeroShell devLabel="Version L — Refined Coverage Clock">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">A cleaner look at global coverage.</p>
            <p className="text-white/60 text-base">Same data, refined visual.</p>
          </div>
        }
        right={<RefinedCoverageClock />}
      />
    </HeroShell>
  );
};

const HeroVersionHorizontalBand = () => {
  return (
    <HeroShell devLabel="Version M — Horizontal Timezone Band">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">Offices across the globe, on one line.</p>
            <p className="text-white/60 text-base">A moving dot shows our active hours.</p>
          </div>
        }
        right={<HorizontalTimezoneBand />}
      />
    </HeroShell>
  );
};

const HeroVersionMinimalOrbit = () => {
  return (
    <HeroShell devLabel="Version N — Minimal Orbit Ring">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">One orbit, always on.</p>
            <p className="text-white/60 text-base">A minimal representation of continuous coverage.</p>
          </div>
        }
        right={<MinimalOrbitRing />}
      />
    </HeroShell>
  );
};

const HeroVersionNetworkPulse = () => {
  return (
    <HeroShell devLabel="Version O — Network Pulse">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">A connected team, always moving.</p>
            <p className="text-white/60 text-base">Pulses travel between our global offices.</p>
          </div>
        }
        right={<NetworkPulseDiagram />}
      />
    </HeroShell>
  );
};

const HeroVersionSlidingWindow = () => {
  return (
    <HeroShell devLabel="Version P — Sliding Coverage Window">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">Coverage that follows the sun.</p>
            <p className="text-white/60 text-base">A sliding window highlights our active hours.</p>
          </div>
        }
        right={<SlidingCoverageWindow />}
      />
    </HeroShell>
  );
};

// =====================================================
// NEWLY ADDED COMPONENTS (from user request)
// =====================================================
const OriginTimelineDiagram = () => {
  const milestones = [
    { label: 'Founded', x: 30 },
    { label: 'First Mandate', x: 140 },
    { label: 'Regional Expansion', x: 260 },
    { label: 'Today', x: 370 },
  ];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineOrigin {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-origin {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineOrigin 3.2s ease-in-out forwards;
        }
        @keyframes originTickFade {
          from { opacity: 0; transform: scale(0); }
          to   { opacity: 1; transform: scale(1); }
        }
        .origin-tick-0 { animation: originTickFade 0.4s ease-out 0.1s both; }
        .origin-tick-1 { animation: originTickFade 0.4s ease-out 1.1s both; }
        .origin-tick-2 { animation: originTickFade 0.4s ease-out 2.1s both; }
        .origin-tick-3 { animation: originTickFade 0.4s ease-out 3.0s both; }
      `}</style>

      <svg viewBox="0 0 400 150" className="w-full h-auto">
        <path
          id="origin-path"
          d="M 30 100 C 80 100, 100 60, 140 60 C 190 60, 220 110, 260 90 C 310 68, 330 40, 370 40"
          fill="none"
          stroke="#ffffff"
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          className="draw-line-origin"
        />
        {milestones.map((m, i) => {
          const ys = [100, 60, 90, 40];
          return (
            <circle
              key={m.label}
              cx={m.x}
              cy={ys[i]}
              r={5}
              fill="#60a5fa"
              className={`origin-tick-${i}`}
              style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.8))' }}
            />
          );
        })}
      </svg>

      <div className="flex justify-between text-[11px] sm:text-sm text-white/50 mt-2 px-1">
        {milestones.map((m) => (
          <span key={m.label} className="text-center max-w-[80px]">{m.label}</span>
        ))}
      </div>

      <p className="text-white/70 text-base text-center mt-6">
        Every Stage Built Deliberately On The Last
      </p>
    </div>
  );
};

const HeroVersionOriginStory = () => {
  return (
    <HeroShell devLabel="Version Q — Origin Timeline">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">We Didn't Start With A Plan. We Started With A Problem.</p>
            <p className="text-white/60 text-base">Every stage since has been earned, not assumed.</p>
          </div>
        }
        right={<OriginTimelineDiagram />}
      />
    </HeroShell>
  );
};

const SignalThroughNoiseDiagram = () => {
  const noiseDots = [
    { x: 40, y: 40 }, { x: 90, y: 150 }, { x: 130, y: 60 }, { x: 170, y: 170 },
    { x: 210, y: 50 }, { x: 250, y: 140 }, { x: 300, y: 70 }, { x: 340, y: 160 },
    { x: 60, y: 100 }, { x: 190, y: 30 }, { x: 280, y: 30 }, { x: 360, y: 100 },
  ];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineSignal {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-signal {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineSignal 3s ease-in-out 0.6s forwards;
        }
        @keyframes noiseFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .noise-dot {
          animation: noiseFadeIn 1.2s ease-out both;
        }
      `}</style>

      <svg viewBox="0 0 400 200" className="w-full h-auto">
        {noiseDots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={3}
            fill="rgba(255,255,255,0.25)"
            className="noise-dot"
            style={{ animationDelay: `${i * 0.05}s` }}
          />
        ))}

        <path
          id="signal-path"
          d="M 20 100 L 380 100"
          fill="none"
          stroke="#60a5fa"
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          className="draw-line-signal"
          style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.6))' }}
        />

        <circle r={5} fill="#ffffff" style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.9))' }}>
          <animateMotion dur="3s" begin="0.6s" repeatCount="1" fill="freeze">
            <mpath href="#signal-path" />
          </animateMotion>
        </circle>
      </svg>

      <p className="text-white/70 text-base text-center mt-6">
        We Don't Add To The Noise. We Cut Through It.
      </p>
    </div>
  );
};

const HeroVersionClaritySignal = () => {
  return (
    <HeroShell devLabel="Version R — Signal Through Noise">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">Most Advice Adds Noise. We Add Clarity.</p>
            <p className="text-white/60 text-base">One clear line of reasoning, drawn through the mess.</p>
          </div>
        }
        right={<SignalThroughNoiseDiagram />}
      />
    </HeroShell>
  );
};

const DepthNotBreadthDiagram = () => {
  const layers = [
    { label: 'Symptoms', y: 40 },
    { label: 'Surface Metrics', y: 90 },
    { label: 'Root Cause', y: 140 },
    { label: 'Structural Constraint', y: 190 },
  ];

  return (
    <div className="w-64 sm:w-72">
      <style>{`
        @keyframes drawLineDepth {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-depth {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineDepth 3s ease-in-out forwards;
        }
        @keyframes depthLayerFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .depth-layer-0 { animation: depthLayerFade 0.5s ease-out 0.2s both; }
        .depth-layer-1 { animation: depthLayerFade 0.5s ease-out 1.0s both; }
        .depth-layer-2 { animation: depthLayerFade 0.5s ease-out 1.9s both; }
        .depth-layer-3 { animation: depthLayerFade 0.5s ease-out 2.7s both; }
        @keyframes depthGlow {
          0%, 100% { opacity: 0.6; r: 5; }
          50%      { opacity: 1; r: 7; }
        }
        .depth-end-glow { animation: depthGlow 2s ease-in-out 3s infinite; }
      `}</style>

      <svg viewBox="0 0 220 220" className="w-full h-auto">
        {layers.map((l, i) => (
          <g key={l.label} className={`depth-layer-${i}`}>
            <line x1="10" y1={l.y} x2="210" y2={l.y} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
            <text x="10" y={l.y - 6} fill="#93C5FD" fontSize="9">{l.label}</text>
          </g>
        ))}

        <path
          id="depth-path"
          d="M 40 20 L 40 200"
          fill="none"
          stroke="#60a5fa"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="4 4"
          pathLength={1}
          className="draw-line-depth"
        />

        <circle r={5} fill="#ffffff" style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))' }}>
          <animateMotion dur="3s" repeatCount="1" fill="freeze">
            <mpath href="#depth-path" />
          </animateMotion>
        </circle>

        <circle cx="40" cy="200" r={5} fill="#60a5fa" className="depth-end-glow" />
      </svg>

      <p className="text-white/70 text-base text-center mt-4">
        We Stop Where The Real Problem Starts
      </p>
    </div>
  );
};

const HeroVersionDepthNotBreadth = () => {
  return (
    <HeroShell devLabel="Version S — Depth Not Breadth">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">Symptoms Are Loud. Root Causes Are Quiet.</p>
            <p className="text-white/60 text-base">We go past the noise until we hit the constraint that actually matters.</p>
          </div>
        }
        right={<DepthNotBreadthDiagram />}
      />
    </HeroShell>
  );
};

const ConvergingExpertiseDiagram = () => {
  const sources = [
    { label: 'Finance', y: 30 },
    { label: 'Operations', y: 75 },
    { label: 'Strategy', y: 125 },
    { label: 'Technology', y: 170 },
  ];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineConvergeExp {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-converge-exp-0 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: drawLineConvergeExp 1.1s ease-out 0s forwards; }
        .draw-line-converge-exp-1 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: drawLineConvergeExp 1.1s ease-out 0.25s forwards; }
        .draw-line-converge-exp-2 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: drawLineConvergeExp 1.1s ease-out 0.5s forwards; }
        .draw-line-converge-exp-3 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: drawLineConvergeExp 1.1s ease-out 0.75s forwards; }
        @keyframes convergeExpGlow {
          0%, 100% { r: 5; opacity: 0.9; }
          50%      { r: 8; opacity: 1; }
        }
        .converge-exp-glow { animation: convergeExpGlow 2.2s ease-in-out 1.8s infinite; }
      `}</style>

      <svg viewBox="0 0 400 200" className="w-full h-auto">
        <path d="M 20 30 C 140 30, 220 90, 340 100" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" pathLength={1} className="draw-line-converge-exp-0" />
        <path d="M 20 75 C 140 75, 220 95, 340 100" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" pathLength={1} className="draw-line-converge-exp-1" />
        <path d="M 20 125 C 140 125, 220 105, 340 100" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" pathLength={1} className="draw-line-converge-exp-2" />
        <path d="M 20 170 C 140 170, 220 110, 340 100" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" pathLength={1} className="draw-line-converge-exp-3" />

        {sources.map((s) => (
          <text key={s.label} x="10" y={s.y - 5} fill="rgba(255,255,255,0.5)" fontSize="11">{s.label}</text>
        ))}

        <circle cx="340" cy="100" r="5" fill="#60a5fa" className="converge-exp-glow" style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.8))' }} />
        <text x="340" y="122" fill="#93C5FD" fontSize="10" textAnchor="middle">Sarsen</text>
      </svg>

      <p className="text-white/70 text-base text-center mt-6">
        One Team. Four Disciplines. No Blind Spots.
      </p>
    </div>
  );
};

const HeroVersionConvergingExpertise = () => {
  return (
    <HeroShell devLabel="Version T — Converging Expertise">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">Business Problems Don't Respect Departments. Neither Do We.</p>
            <p className="text-white/60 text-base">Finance, operations, strategy, and technology — brought to every engagement together.</p>
          </div>
        }
        right={<ConvergingExpertiseDiagram />}
      />
    </HeroShell>
  );
};

const RealGrowthLineDiagram = () => {
  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineRealGrowth {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-real-growth {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineRealGrowth 3.4s ease-in-out forwards;
        }
        .draw-line-trend {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineRealGrowth 3.4s ease-in-out 0.3s forwards;
        }
      `}</style>

      <svg viewBox="0 0 400 200" className="w-full h-auto">
        <path
          d="M 20 170 L 30 160"
          stroke="rgba(255,255,255,0.15)"
          fill="none"
        />
        <path
          id="trend-path"
          d="M 20 165 C 140 130, 260 90, 380 40"
          fill="none"
          stroke="rgba(96,165,250,0.5)"
          strokeWidth={1.5}
          strokeDasharray="3 5"
          strokeLinecap="round"
          pathLength={1}
          className="draw-line-trend"
        />
        <path
          id="real-growth-path"
          d="M 20 170 L 60 140 L 100 155 L 140 100 L 180 125 L 220 80 L 260 95 L 300 55 L 340 70 L 380 30"
          fill="none"
          stroke="#ffffff"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          className="draw-line-real-growth"
        />
        <circle r={5} fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.9))' }}>
          <animateMotion dur="3.4s" repeatCount="1" fill="freeze" rotate="auto">
            <mpath href="#real-growth-path" />
          </animateMotion>
        </circle>
      </svg>

      <div className="flex justify-between text-white/50 text-xs sm:text-sm mt-2 px-1">
        <span>Where You Start</span>
        <span>Where You're Headed</span>
      </div>

      <p className="text-white/70 text-base text-center mt-6">
        We Plan For The Dips, Not Just The Wins
      </p>
    </div>
  );
};

const HeroVersionRealGrowth = () => {
  return (
    <HeroShell devLabel="Version U — Real Growth Line">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">No Business Grows In A Straight Line. We Don't Pretend Otherwise.</p>
            <p className="text-white/60 text-base">The trend matters more than any single quarter.</p>
          </div>
        }
        right={<RealGrowthLineDiagram />}
      />
    </HeroShell>
  );
};

const DivergencePathDiagram = () => {
  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineDivergeGeneric {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-diverge-generic {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineDivergeGeneric 3s ease-in-out forwards;
        }
        .draw-line-diverge-sarsen {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineDivergeGeneric 3s ease-in-out 0.3s forwards;
        }
        @keyframes divergeLabelFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .diverge-label { animation: divergeLabelFade 0.6s ease-out 2.6s both; }
      `}</style>

      <svg viewBox="0 0 400 200" className="w-full h-auto">
        <path
          id="diverge-generic-path"
          d="M 20 100 C 100 100, 140 110, 180 120 C 240 132, 310 145, 380 155"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="4 5"
          pathLength={1}
          className="draw-line-diverge-generic"
        />
        <path
          id="diverge-sarsen-path"
          d="M 20 100 C 100 100, 140 90, 180 80 C 240 65, 310 40, 380 20"
          fill="none"
          stroke="#60a5fa"
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          className="draw-line-diverge-sarsen"
          style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.6))' }}
        />

        <circle cx="20" cy="100" r={5} fill="#ffffff" />

        <circle r={5} fill="rgba(255,255,255,0.6)">
          <animateMotion dur="3s" repeatCount="1" fill="freeze">
            <mpath href="#diverge-generic-path" />
          </animateMotion>
        </circle>
        <circle r={5} fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.9))' }}>
          <animateMotion dur="3s" begin="0.3s" repeatCount="1" fill="freeze">
            <mpath href="#diverge-sarsen-path" />
          </animateMotion>
        </circle>

        <text x="385" y="158" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="end" className="diverge-label">Generic Advice</text>
        <text x="385" y="15" fill="#93C5FD" fontSize="10" textAnchor="end" className="diverge-label">Working With Sarsen</text>
      </svg>

      <p className="text-white/70 text-base text-center mt-4">
        Same Starting Point. Different Trajectory.
      </p>
    </div>
  );
};

const HeroVersionDivergencePath = () => {
  return (
    <HeroShell devLabel="Version A — Divergence Path">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">Every Business Starts From The Same Point. Few End Up In The Same Place.</p>
            <p className="text-white/60 text-base">The difference isn't effort — it's the quality of the decisions along the way.</p>
          </div>
        }
        right={<DivergencePathDiagram />}
      />
    </HeroShell>
  );
};

const BalanceLineDiagram = () => {
  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineBalance {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-balance {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineBalance 2.4s ease-in-out forwards;
        }
        @keyframes balanceSettle {
          0%   { transform: rotate(-4deg); }
          50%  { transform: rotate(3deg); }
          100% { transform: rotate(0deg); }
        }
        .balance-beam {
          transform-origin: 200px 60px;
          animation: balanceSettle 2.4s ease-in-out forwards;
        }
        @keyframes balanceLabelFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .balance-label { animation: balanceLabelFade 0.6s ease-out 2.2s both; }
      `}</style>

      <svg viewBox="0 0 400 160" className="w-full h-auto">
        <line x1="200" y1="60" x2="200" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth={2} />
        <path d="M 190 120 L 210 120 L 200 135 Z" fill="rgba(255,255,255,0.4)" />

        <g className="balance-beam">
          <line
            id="balance-path"
            x1="60" y1="60" x2="340" y2="60"
            stroke="#ffffff"
            strokeWidth={2.5}
            strokeLinecap="round"
            pathLength={1}
            className="draw-line-balance"
          />
          <circle cx="60" cy="60" r={5} fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.8))' }} />
          <circle cx="340" cy="60" r={5} fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.8))' }} />
        </g>

        <circle cx="200" cy="60" r={4} fill="#ffffff" />

        <text x="60" y="40" fill="rgba(147,197,253,0.85)" fontSize="10" textAnchor="middle" className="balance-label">What's Right For You</text>
        <text x="340" y="40" fill="rgba(147,197,253,0.85)" fontSize="10" textAnchor="middle" className="balance-label">What's Easy For Us</text>
      </svg>

      <p className="text-white/70 text-base text-center mt-4">
        We Have Nothing To Sell But The Truth
      </p>
    </div>
  );
};

const HeroVersionBalanceLine = () => {
  return (
    <HeroShell devLabel="Version B — Balance Line">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">No Products To Push. No Retainers To Protect. Just The Right Call.</p>
            <p className="text-white/60 text-base">Independence isn't a value statement for us — it's the entire business model.</p>
          </div>
        }
        right={<BalanceLineDiagram />}
      />
    </HeroShell>
  );
};

const CompoundingCurveDiagram = () => {
  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineCompound {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-compound-flat {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineCompound 3s ease-in-out forwards;
        }
        .draw-line-compound-curve {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineCompound 3s ease-in-out 0.2s forwards;
        }
        @keyframes compoundGlowPulse {
          0%, 100% { r: 5; opacity: 0.9; }
          50%      { r: 8; opacity: 1; }
        }
        .compound-end-glow { animation: compoundGlowPulse 2s ease-in-out 3.2s infinite; }
      `}</style>

      <svg viewBox="0 0 400 200" className="w-full h-auto">
        <path
          id="compound-flat-path"
          d="M 20 160 L 380 100"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={1.5}
          strokeDasharray="4 5"
          strokeLinecap="round"
          pathLength={1}
          className="draw-line-compound-flat"
        />
        <path
          id="compound-curve-path"
          d="M 20 170 C 100 165, 180 150, 240 110 C 290 78, 330 40, 380 15"
          fill="none"
          stroke="#60a5fa"
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          className="draw-line-compound-curve"
          style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.6))' }}
        />

        <circle r={5} fill="#ffffff" opacity={0.7}>
          <animateMotion dur="3s" repeatCount="1" fill="freeze">
            <mpath href="#compound-flat-path" />
          </animateMotion>
        </circle>
        <circle r={5} fill="#60a5fa">
          <animateMotion dur="3s" begin="0.2s" repeatCount="1" fill="freeze">
            <mpath href="#compound-curve-path" />
          </animateMotion>
        </circle>

        <circle cx="380" cy="15" r={5} fill="#60a5fa" className="compound-end-glow" />
      </svg>

      <div className="flex justify-between text-white/50 text-xs sm:text-sm mt-2 px-1">
        <span>Engagement Begins</span>
        <span>Compounding Advantage</span>
      </div>

      <p className="text-white/70 text-base text-center mt-4">
        One Right Decision Makes The Next One Easier
      </p>
    </div>
  );
};

const HeroVersionCompoundingCurve = () => {
  return (
    <HeroShell devLabel="Version C — Compounding Curve">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">Good Decisions Don't Just Add Up. They Compound.</p>
            <p className="text-white/60 text-base">Clarity in one area makes every decision after it faster and better.</p>
          </div>
        }
        right={<CompoundingCurveDiagram />}
      />
    </HeroShell>
  );
};

const HandoffDiagram = () => {
  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineHandoff {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-handoff {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineHandoff 2.8s ease-in-out forwards;
        }
        @keyframes handoffMarkerPop {
          0%   { r: 0; opacity: 0; }
          55%  { r: 0; opacity: 0; }
          65%  { r: 7; opacity: 1; }
          100% { r: 5; opacity: 1; }
        }
        .handoff-marker { animation: handoffMarkerPop 2.8s ease-in-out forwards; }
        @keyframes handoffLabelFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .handoff-label { animation: handoffLabelFade 0.6s ease-out 2.4s both; }
      `}</style>

      <svg viewBox="0 0 400 140" className="w-full h-auto">
        <path
          id="handoff-path"
          d="M 30 70 L 370 70"
          fill="none"
          stroke="#ffffff"
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          className="draw-line-handoff"
        />

        <circle cx="30" cy="70" r={5} fill="#93C5FD" />
        <circle cx="370" cy="70" r={5} fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.8))' }} />

        <circle cx="200" cy="70" r={5} fill="#ffffff" className="handoff-marker" style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))' }} />

        <text x="30" y="50" fill="rgba(147,197,253,0.8)" fontSize="10" textAnchor="middle" className="handoff-label">Sarsen</text>
        <text x="200" y="50" fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle" className="handoff-label">Capability Transferred</text>
        <text x="370" y="50" fill="rgba(147,197,253,0.8)" fontSize="10" textAnchor="middle" className="handoff-label">Your Team</text>
      </svg>

      <p className="text-white/70 text-base text-center mt-4">
        The Goal Is Independence, Not An Ongoing Retainer
      </p>
    </div>
  );
};

const HeroVersionHandoff = () => {
  return (
    <HeroShell devLabel="Version D — Handoff Diagram">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">We Step In To Clarify Decisions. Not To Run Your Business.</p>
            <p className="text-white/60 text-base">Every engagement is designed to hand capability back to your team — not create a dependency on ours.</p>
          </div>
        }
        right={<HandoffDiagram />}
      />
    </HeroShell>
  );
};

const NarrowingRiskCorridorDiagram = () => {
  const scatterPaths = [
    "M 20 20 C 100 30, 200 60, 260 90",
    "M 20 50 C 100 55, 200 75, 260 95",
    "M 20 110 C 100 100, 200 100, 260 100",
    "M 20 150 C 100 130, 200 115, 260 105",
    "M 20 180 C 100 150, 200 120, 260 108",
  ];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineCorridorScatter {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-corridor-scatter {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineCorridorScatter 1.6s ease-in-out forwards;
        }
        .draw-line-corridor-final {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineCorridorScatter 1.8s ease-in-out 1.5s forwards;
        }
        @keyframes corridorLabelFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .corridor-label { animation: corridorLabelFade 0.6s ease-out 3s both; }
      `}</style>

      <svg viewBox="0 0 400 200" className="w-full h-auto">
        {scatterPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={1.5}
            strokeLinecap="round"
            pathLength={1}
            className="draw-line-corridor-scatter"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}

        <path
          id="corridor-final-path"
          d="M 260 100 L 380 100"
          fill="none"
          stroke="#60a5fa"
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          className="draw-line-corridor-final"
          style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.6))' }}
        />

        <circle cx="20" cy="100" r={4} fill="rgba(255,255,255,0.5)" />
        <circle r={5} fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.9))' }}>
          <animateMotion dur="1.8s" begin="1.5s" repeatCount="1" fill="freeze">
            <mpath href="#corridor-final-path" />
          </animateMotion>
        </circle>

        <text x="20" y="15" fill="rgba(255,255,255,0.4)" fontSize="10" className="corridor-label">Every Option Looks Plausible</text>
        <text x="380" y="120" fill="#93C5FD" fontSize="10" textAnchor="end" className="corridor-label">One Is Actually Right</text>
      </svg>

      <p className="text-white/70 text-base text-center mt-4">
        We Narrow The Field Before You Commit
      </p>
    </div>
  );
};

const HeroVersionNarrowingRisk = () => {
  return (
    <HeroShell devLabel="Version E — Narrowing Risk Corridor">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">The Danger Isn't Too Few Options. It's Too Many That Look Right.</p>
            <p className="text-white/60 text-base">We help you rule out the plausible ones fast, so the real decision gets your full attention.</p>
          </div>
        }
        right={<NarrowingRiskCorridorDiagram />}
      />
    </HeroShell>
  );
};

const AscendingCareerPathDiagram = () => {
  const milestones = [
    { label: 'You Join', x: 30, y: 150 },
    { label: 'You Own A Problem', x: 150, y: 105 },
    { label: 'You Lead An Engagement', x: 260, y: 65 },
    { label: 'You Shape The Firm', x: 370, y: 30 },
  ];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineAscend {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-ascend {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineAscend 3.2s ease-in-out forwards;
        }
        @keyframes ascendNodeFade {
          from { opacity: 0; transform: scale(0.4); }
          to   { opacity: 1; transform: scale(1); }
        }
        .ascend-node-0 { animation: ascendNodeFade 0.5s ease-out 0.1s both; }
        .ascend-node-1 { animation: ascendNodeFade 0.5s ease-out 1.1s both; }
        .ascend-node-2 { animation: ascendNodeFade 0.5s ease-out 2.1s both; }
        .ascend-node-3 { animation: ascendNodeFade 0.5s ease-out 3.0s both; }
      `}</style>

      <svg viewBox="0 0 400 190" className="w-full h-auto">
        <path
          id="ascend-path"
          d="M 30 150 C 80 150, 100 115, 150 105 C 200 95, 220 80, 260 65 C 300 50, 330 45, 370 30"
          fill="none"
          stroke="#60a5fa"
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          className="draw-line-ascend"
          style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.6))' }}
        />
        {milestones.map((m, i) => (
          <circle
            key={m.label}
            cx={m.x}
            cy={m.y}
            r={5}
            fill="#ffffff"
            className={`ascend-node-${i}`}
            style={{ transformOrigin: `${m.x}px ${m.y}px`, filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.7))' }}
          />
        ))}
      </svg>

      <div className="flex justify-between text-[10px] sm:text-xs text-white/60 mt-1 px-1">
        {milestones.map((m) => (
          <span key={m.label} className="text-center max-w-[90px]">{m.label}</span>
        ))}
      </div>

      <p className="text-white/70 text-base text-center mt-6">
        Real Ownership, From Day One
      </p>
    </div>
  );
};

const HeroVersionAscendingPath = () => {
  return (
    <HeroShell devLabel="Version A — Ascending Career Path">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">We Don't Hire For Tasks. We Hire For Trajectories.</p>
            <p className="text-white/60 text-base">Every person here is expected to grow into more responsibility — fast.</p>
          </div>
        }
        right={<AscendingCareerPathDiagram />}
      />
    </HeroShell>
  );
};

const RefinedNarrowingRiskCorridorDiagram = () => {
  const scatterPaths = [
    "M 20 20 C 100 30, 190 55, 260 90",
    "M 20 50 C 100 55, 190 75, 260 95",
    "M 20 110 C 100 100, 190 100, 260 100",
    "M 20 150 C 100 130, 190 115, 260 105",
    "M 20 180 C 100 150, 190 120, 260 108",
  ];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineCorridorScatterRefined {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-corridor-scatter-refined {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineCorridorScatterRefined 1.6s ease-in-out forwards;
        }
        .draw-line-corridor-final-refined {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineCorridorScatterRefined 1.8s ease-in-out 1.5s forwards;
        }
        @keyframes corridorLabelFadeRefined {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .corridor-label-refined { animation: corridorLabelFadeRefined 0.6s ease-out 3s both; }
        @keyframes corridorEndGlowRefined {
          0%, 100% { r: 5; opacity: 0.9; }
          50%      { r: 8; opacity: 1; }
        }
        .corridor-end-glow-refined { animation: corridorEndGlowRefined 2s ease-in-out 3.3s infinite; }
      `}</style>

      <svg viewBox="0 0 400 200" className="w-full h-auto">
        {scatterPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={1.75}
            strokeLinecap="round"
            pathLength={1}
            className="draw-line-corridor-scatter-refined"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}

        <path
          id="corridor-final-path-refined"
          d="M 260 100 C 300 100, 330 60, 380 40"
          fill="none"
          stroke="#60a5fa"
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          className="draw-line-corridor-final-refined"
          style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.6))' }}
        />

        <circle cx="20" cy="100" r={4} fill="rgba(255,255,255,0.6)" />

        <circle r={5} fill="#60a5fa" className="corridor-end-glow-refined" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.9))' }}>
          <animateMotion dur="1.8s" begin="1.5s" repeatCount="1" fill="freeze">
            <mpath href="#corridor-final-path-refined" />
          </animateMotion>
        </circle>

        <text x="20" y="15" fill="rgba(255,255,255,0.55)" fontSize="10" className="corridor-label-refined">Every Option Looks Plausible</text>
        <text x="380" y="60" fill="#93C5FD" fontSize="10" textAnchor="end" className="corridor-label-refined">One Is Actually Right</text>
      </svg>

      <p className="text-white/70 text-base text-center mt-4">
        We Narrow The Field Before You Commit
      </p>
    </div>
  );
};

const HeroVersionRefinedNarrowingRisk = () => {
  return (
    <HeroShell devLabel="Version F — Refined Narrowing Risk Corridor">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">The Danger Isn't Too Few Options. It's Too Many That Look Right.</p>
            <p className="text-white/60 text-base">We help you rule out the plausible ones fast, so the real decision gets your full attention.</p>
          </div>
        }
        right={<RefinedNarrowingRiskCorridorDiagram />}
      />
    </HeroShell>
  );
};

const ConnectedNetworkDiagram = () => {
  const nodes = [
    { label: 'You', x: 200, y: 100, isCenter: true },
    { label: 'Strategy', x: 90, y: 45 },
    { label: 'Finance', x: 320, y: 55 },
    { label: 'Operations', x: 70, y: 155 },
    { label: 'Research', x: 330, y: 150 },
  ];

  return (
    <div className="w-64 h-64 sm:w-80 sm:h-80">
      <style>{`
        @keyframes drawLineNetworkConn {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-network-conn {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineNetworkConn 1.4s ease-out forwards;
        }
        @keyframes networkNodePulse {
          0%, 100% { r: 5; opacity: 0.85; }
          50%      { r: 7; opacity: 1; }
        }
        .network-node-pulse { animation: networkNodePulse 3s ease-in-out infinite; }
      `}</style>

      <svg viewBox="0 0 400 200" className="w-full h-full">
        {nodes.filter((n) => !n.isCenter).map((n, i) => (
          <path
            key={n.label}
            d={`M 200 100 Q ${(200 + n.x) / 2} ${(100 + n.y) / 2 - 15}, ${n.x} ${n.y}`}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={1.75}
            strokeLinecap="round"
            pathLength={1}
            className="draw-line-network-conn"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}

        {nodes.map((n) => (
          <g key={n.label}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.isCenter ? 7 : 5}
              fill={n.isCenter ? '#60a5fa' : '#ffffff'}
              className={n.isCenter ? 'network-node-pulse' : ''}
              style={{ filter: n.isCenter ? 'drop-shadow(0 0 8px rgba(96,165,250,0.8))' : 'drop-shadow(0 0 4px rgba(255,255,255,0.6))' }}
            />
            <text
              x={n.x}
              y={n.isCenter ? n.y + 20 : n.y - 12}
              fill={n.isCenter ? '#93C5FD' : 'rgba(255,255,255,0.7)'}
              fontSize="10"
              textAnchor="middle"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const HeroVersionConnectedNetwork = () => {
  return (
    <HeroShell devLabel="Version B — Connected Network">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">Flat Structures. Direct Access. No Layers To Wait Behind.</p>
            <p className="text-white/60 text-base">Every discipline sits one conversation away — including the ones you haven't tried yet.</p>
          </div>
        }
        right={<ConnectedNetworkDiagram />}
      />
    </HeroShell>
  );
};

const HorizonBuildDiagram = () => {
  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineHorizonBuild {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-horizon-build {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineHorizonBuild 3.2s ease-in-out forwards;
        }
        @keyframes horizonMarkerTravel {
          0%   { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        .horizon-marker {
          offset-path: path('M 20 160 C 100 150, 160 120, 220 95 C 280 70, 330 45, 380 20');
          animation: horizonMarkerTravel 3.2s ease-in-out forwards;
        }
        @keyframes horizonGlowPulse {
          0%, 100% { r: 5; opacity: 0.9; }
          50%      { r: 7; opacity: 1; }
        }
        .horizon-end-glow { animation: horizonGlowPulse 2s ease-in-out 3.4s infinite; }
      `}</style>

      <svg viewBox="0 0 400 190" className="w-full h-auto">
        <path
          id="horizon-build-path"
          d="M 20 160 C 100 150, 160 120, 220 95 C 280 70, 330 45, 380 20"
          fill="none"
          stroke="#ffffff"
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          className="draw-line-horizon-build"
        />
        <circle r={5} fill="#60a5fa" className="horizon-marker" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.9))' }} />
        <circle cx="380" cy="20" r={5} fill="#60a5fa" className="horizon-end-glow" />
      </svg>

      <div className="flex justify-between text-white/50 text-xs sm:text-sm mt-2 px-1">
        <span>Where Businesses Are Today</span>
        <span>Where We're Taking Them</span>
      </div>

      <p className="text-white/70 text-base text-center mt-6">
        We're Not Maintaining The Present. We're Building The Next Version Of It.
      </p>
    </div>
  );
};

const HeroVersionHorizonBuild = () => {
  return (
    <HeroShell devLabel="Version C — Horizon Build">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">Every Engagement Is A Small Bet On What's Next.</p>
            <p className="text-white/60 text-base">Join us if you'd rather build the answer than wait for one.</p>
          </div>
        }
        right={<HorizonBuildDiagram />}
      />
    </HeroShell>
  );
};

const SkillSpiralDiagram = () => {
  const spiralPath = useMemo(() => {
    const turns = 3.2;
    const points: string[] = [];
    const steps = 120;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * turns * 2 * Math.PI;
      const radius = 6 + t * 74;
      const x = 100 + radius * Math.cos(angle);
      const y = 100 + radius * Math.sin(angle);
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return points.join(' ');
  }, []);

  return (
    <div className="w-64 h-64 sm:w-80 sm:h-80">
      <style>{`
        @keyframes drawLineSpiral {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-spiral {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineSpiral 3.4s ease-in-out forwards;
        }
        @keyframes spiralEndGlow {
          0%, 100% { r: 5; opacity: 0.9; }
          50%      { r: 7; opacity: 1; }
        }
        .spiral-end-glow { animation: spiralEndGlow 2s ease-in-out 3.6s infinite; }
      `}</style>

      <svg viewBox="0 0 200 200" className="w-full h-full">
        <path
          d={spiralPath}
          fill="none"
          stroke="#60a5fa"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          className="draw-line-spiral"
          style={{ filter: 'drop-shadow(0 0 5px rgba(96,165,250,0.5))' }}
        />
        <circle cx="100" cy="100" r={3} fill="#ffffff" opacity={0.7} />
        <circle cx="180" cy="100" r={5} fill="#60a5fa" className="spiral-end-glow" />
      </svg>

      <p className="text-white/70 text-base text-center mt-4">
        No Two Projects Teach You The Same Thing Twice
      </p>
    </div>
  );
};

const HeroVersionSkillSpiral = () => {
  return (
    <HeroShell devLabel="Version D — Skill Spiral">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">Every Engagement Is Different. That's Not A Bug — It's The Point.</p>
            <p className="text-white/60 text-base">You leave every project sharper than you entered it.</p>
          </div>
        }
        right={<SkillSpiralDiagram />}
      />
    </HeroShell>
  );
};

const BalancedWaveDiagram = () => {
  const wavePath = useMemo(() => {
    const points: string[] = [];
    const steps = 100;
    const amplitude = 30;
    const cycles = 3;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = 20 + t * 360;
      const y = 100 + amplitude * Math.sin(t * cycles * 2 * Math.PI);
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return points.join(' ');
  }, []);

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineWave {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-wave {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineWave 3s ease-in-out forwards;
        }
        @keyframes waveMarkerTravel {
          0%   { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        .wave-marker {
          animation: waveMarkerTravel 3s ease-in-out forwards;
        }
      `}</style>

      <svg viewBox="0 0 400 200" className="w-full h-auto">
        <path
          id="wave-path"
          d={wavePath}
          fill="none"
          stroke="#ffffff"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          className="draw-line-wave"
        />
        <circle r={5} fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.9))' }}>
          <animateMotion dur="3s" repeatCount="1" fill="freeze" rotate="auto">
            <mpath href="#wave-path" />
          </animateMotion>
        </circle>
      </svg>

      <p className="text-white/70 text-base text-center mt-6">
        Sustainable Highs, No Manufactured Urgency
      </p>
    </div>
  );
};

const HeroVersionBalancedWave = () => {
  return (
    <HeroShell devLabel="Version E — Balanced Wave">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">Deep Work Has A Rhythm. We Protect It.</p>
            <p className="text-white/60 text-base">Intense when it matters, sustainable always — burnout isn't a badge of honour here.</p>
          </div>
        }
        right={<BalancedWaveDiagram />}
      />
    </HeroShell>
  );
};

// =====================================================
// TEST PAGE — stack all versions
// =====================================================
export default function NewVisualsTestPage() {
  return (
    <main className="min-h-screen bg-white">
      <style>{`
        @keyframes slideInFromLeftNew {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .percent-slide-in-new {
          animation: slideInFromLeftNew 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      <HeroVersionPolar />
      <HeroVersionRadar />
      <HeroVersionStacked />
      <HeroVersionSegmented />
      <HeroVersionBubble />
      <HeroVersionStaircase />
      <HeroVersionEngagement />
      <HeroVersionPulse />
      <HeroVersionTimeline />
      <HeroVersionConverging />
      <HeroVersionGlobalCoverage />
      <HeroVersionRefinedCoverage />
      <HeroVersionHorizontalBand />
      <HeroVersionMinimalOrbit />
      <HeroVersionNetworkPulse />
      <HeroVersionSlidingWindow />
      <HeroVersionOriginStory />
      <HeroVersionClaritySignal />
      <HeroVersionDepthNotBreadth />
      <HeroVersionConvergingExpertise />
      <HeroVersionRealGrowth />
      <HeroVersionDivergencePath />
      <HeroVersionBalanceLine />
      <HeroVersionCompoundingCurve />
      <HeroVersionHandoff />
      <HeroVersionNarrowingRisk />
      <HeroVersionAscendingPath />
      <HeroVersionRefinedNarrowingRisk />
      <HeroVersionConnectedNetwork />
      <HeroVersionHorizonBuild />
      <HeroVersionSkillSpiral />
      <HeroVersionBalancedWave />
    </main>
  );
}