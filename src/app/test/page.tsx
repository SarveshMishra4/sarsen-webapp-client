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
// ADDITIONAL DIAGRAM COMPONENTS (previously defined)
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
// HERO VERSIONS — existing and new
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

// Newly added versions
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
    </main>
  );
}