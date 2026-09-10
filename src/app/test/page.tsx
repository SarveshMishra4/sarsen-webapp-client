// app/test/new-visuals/page.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';

// =====================================================
// COORDINATE ROUNDING — defence #1 against SSR/client
// drift in Math.cos/Math.sin outputs
// =====================================================
const roundCoord = (n: number): number => Math.round(n * 1000) / 1000;

// =====================================================
// DATA
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
// HOOK — Types label, holds, advances
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
// LEFT CALLOUT
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
// HERO SHELL & GRID
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
// VISUAL 1 — POLAR AREA CHART
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
    return {
      x: roundCoord(cx + r * Math.cos(rad)),
      y: roundCoord(cy + r * Math.sin(rad)),
    };
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
// VISUAL 2 — RADAR CHART
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
    return {
      x: roundCoord(centerX + radius * Math.cos(angle)),
      y: roundCoord(centerY + radius * Math.sin(angle)),
    };
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
    return {
      x: roundCoord(cx + r * Math.cos(rad)),
      y: roundCoord(cy + r * Math.sin(rad)),
    };
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
          const x = roundCoord(spacing * (index + 1));
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
// GLOBAL COVERAGE CLOCK
// =====================================================
const GlobalCoverageClock = () => {
  const [mounted, setMounted] = useState(false);
  const cx = 100, cy = 100, r = 78;
  const sweepDuration = 18;

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

      {mounted && (
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
                  style={{ animation: `officePulse ${sweepDuration}s ease-in-out ${delay}s infinite` }}
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
      )}

      <p className="text-white/70 text-base text-center mt-4">
        Four Offices. One Continuous Day.
      </p>
    </div>
  );
};

// =====================================================
// REFINED COVERAGE CLOCK
// =====================================================
const RefinedCoverageClock = () => {
  const [mounted, setMounted] = useState(false);
  const cx = 100, cy = 100, r = 78;
  const sweepDuration = 20;

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

      {mounted && (
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
      )}

      <p className="text-white/70 text-base text-center mt-4">
        Four Offices. One Continuous Day.
      </p>
    </div>
  );
};

// =====================================================
// HORIZONTAL TIMEZONE BAND
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
// MINIMAL ORBIT RING
// =====================================================
const MinimalOrbitRing = () => {
  const [mounted, setMounted] = useState(false);
  const cx = 100, cy = 100, r = 70;
  const orbitDuration = 24;

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

      {mounted && (
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
      )}

      <p className="text-white/70 text-base text-center mt-4">
        Always Somewhere, Always On
      </p>
    </div>
  );
};

// =====================================================
// NETWORK PULSE DIAGRAM
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
// SLIDING COVERAGE WINDOW
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
// HERO VERSIONS
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
// NEWLY ADDED COMPONENTS
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
        <path d="M 20 170 L 30 160" stroke="rgba(255,255,255,0.15)" fill="none" />
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
            d={`M 200 100 Q ${roundCoord((200 + n.x) / 2)} ${roundCoord((100 + n.y) / 2 - 15)}, ${n.x} ${n.y}`}
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
      points.push(`${i === 0 ? 'M' : 'L'} ${roundCoord(x)} ${roundCoord(y)}`);
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
      points.push(`${i === 0 ? 'M' : 'L'} ${roundCoord(x)} ${roundCoord(y)}`);
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

/* ============================================================
   RESOURCES ECOSYSTEM — page-specific hero diagrams
   ============================================================ */

const ResourceHeroShell = ({
  devLabel,
  children,
}: {
  devLabel: string;
  children: React.ReactNode;
}) => {
  const gridId = `grid-${devLabel.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`;
  return (
    <section className="relative bg-[#0A1E3D] min-h-[500px] sm:min-h-[600px] py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/10 first:border-t-0">
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={gridId} patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${gridId})`} />
        </svg>
      </div>

      <span className="absolute top-5 left-4 sm:left-6 lg:left-8 text-[11px] tracking-wide text-white/30 uppercase">
        {devLabel}
      </span>

      <div className="relative max-w-7xl mx-auto">{children}</div>
    </section>
  );
};

const ResourceHeroGrid = ({
  heading,
  sub,
  right,
}: {
  heading: string;
  sub?: string;
  right: React.ReactNode;
}) => (
  <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
    <div className="space-y-4 lg:space-y-5">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white leading-snug">{heading}</h2>
      {sub && <p className="text-white/60 text-base sm:text-lg">{sub}</p>}
    </div>
    <div className="relative h-64 sm:h-80 lg:h-[420px] flex items-center justify-center lg:justify-end">
      {right}
    </div>
  </div>
);

// ---------------- Resources Hub — Option A ----------------
const HubSpokeDiagram = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const cx = 150;
  const cy = 150;
  const radius = 105;
  const categories = [
    { name: 'Tools', angle: 315 },
    { name: 'Reports', angle: 45 },
    { name: 'Case Studies', angle: 135 },
    { name: 'Blog', angle: 225 },
  ];

  const polarToCartesian = (angleDeg: number, r: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: roundCoord(cx + r * Math.cos(rad)),
      y: roundCoord(cy + r * Math.sin(rad)),
    };
  };

  return (
    <div className="w-72 h-72 sm:w-80 sm:h-80">
      <style>{`
        @keyframes hubSpokeDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .hub-spoke-line-0 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: hubSpokeDraw 0.9s ease-out 0.2s forwards; }
        .hub-spoke-line-1 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: hubSpokeDraw 0.9s ease-out 0.55s forwards; }
        .hub-spoke-line-2 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: hubSpokeDraw 0.9s ease-out 0.9s forwards; }
        .hub-spoke-line-3 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: hubSpokeDraw 0.9s ease-out 1.25s forwards; }

        @keyframes hubNodePop { from { opacity: 0; transform: scale(0.3); } to { opacity: 1; transform: scale(1); } }
        .hub-node-0 { animation: hubNodePop 0.4s ease-out 1.05s both; }
        .hub-node-1 { animation: hubNodePop 0.4s ease-out 1.4s both; }
        .hub-node-2 { animation: hubNodePop 0.4s ease-out 1.75s both; }
        .hub-node-3 { animation: hubNodePop 0.4s ease-out 2.1s both; }

        @keyframes hubCenterPulse {
          0%, 100% { r: 8; opacity: 0.9; }
          50%      { r: 11; opacity: 1; }
        }
        .hub-center-pulse { animation: hubCenterPulse 2.4s ease-in-out 2.2s infinite; }
      `}</style>

      {mounted && (
        <svg viewBox="0 0 300 300" className="w-full h-full">
          {categories.map((c, i) => {
            const end = polarToCartesian(c.angle, radius);
            return (
              <line
                key={c.name}
                x1={cx}
                y1={cy}
                x2={end.x}
                y2={end.y}
                stroke="rgba(255,255,255,0.5)"
                strokeWidth={1.5}
                strokeLinecap="round"
                pathLength={1}
                className={`hub-spoke-line-${i}`}
              />
            );
          })}

          {categories.map((c, i) => {
            const pos = polarToCartesian(c.angle, radius);
            const labelPos = polarToCartesian(c.angle, radius + 24);
            return (
              <g key={c.name} className={`hub-node-${i}`} style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}>
                <circle cx={pos.x} cy={pos.y} r={6} fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.8))' }} />
                <text x={labelPos.x} y={labelPos.y} fill="#93C5FD" fontSize="11" textAnchor="middle" dominantBaseline="middle">
                  {c.name}
                </text>
              </g>
            );
          })}

          <circle
            cx={cx}
            cy={cy}
            r={8}
            fill="#ffffff"
            className="hub-center-pulse"
            style={{ transformOrigin: `${cx}px ${cy}px`, filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.7))' }}
          />
        </svg>
      )}

      <p className="text-white/70 text-base text-center mt-3">
        Four Formats. One Source Of Thinking.
      </p>
    </div>
  );
};

export const ResourcesHubHeroOptionA = () => (
  <ResourceHeroShell devLabel="Resources Hub — Option A: Hub & Spoke">
    <ResourceHeroGrid
      heading="One Place. Every Way We Share What We Know."
      sub="Tools, reports, case studies, and running commentary — all built from the same body of work."
      right={<HubSpokeDiagram />}
    />
  </ResourceHeroShell>
);

// ---------------- Resources Hub — Option B ----------------
const OrbitingCategoriesDiagram = () => {
  const cx = 150;
  const cy = 150;
  const rings = [
    { name: 'Tools', radius: 45, duration: 14, angle: 40 },
    { name: 'Reports', radius: 72, duration: 19, angle: 150 },
    { name: 'Case Studies', radius: 99, duration: 24, angle: 250 },
    { name: 'Blog', radius: 126, duration: 29, angle: 320 },
  ];

  const polarToCartesian = (angleDeg: number, r: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: roundCoord(cx + r * Math.cos(rad)),
      y: roundCoord(cy + r * Math.sin(rad)),
    };
  };

  return (
    <div className="w-72 h-72 sm:w-80 sm:h-80">
      <style>{`
        @keyframes orbitSpinCat { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .orbit-ring-0 { transform-origin: ${cx}px ${cy}px; animation: orbitSpinCat ${rings[0].duration}s linear infinite; }
        .orbit-ring-1 { transform-origin: ${cx}px ${cy}px; animation: orbitSpinCat ${rings[1].duration}s linear infinite; }
        .orbit-ring-2 { transform-origin: ${cx}px ${cy}px; animation: orbitSpinCat ${rings[2].duration}s linear infinite; }
        .orbit-ring-3 { transform-origin: ${cx}px ${cy}px; animation: orbitSpinCat ${rings[3].duration}s linear infinite; }

        @keyframes orbitLabelPulse { 0%, 88%, 100% { opacity: 0.5; } 6% { opacity: 1; } }
        .orbit-label-0 { animation: orbitLabelPulse ${rings[0].duration}s ease-in-out infinite; }
        .orbit-label-1 { animation: orbitLabelPulse ${rings[1].duration}s ease-in-out infinite; }
        .orbit-label-2 { animation: orbitLabelPulse ${rings[2].duration}s ease-in-out infinite; }
        .orbit-label-3 { animation: orbitLabelPulse ${rings[3].duration}s ease-in-out infinite; }
      `}</style>

      <svg viewBox="0 0 300 300" className="w-full h-full">
        {rings.map((r) => (
          <circle key={r.name} cx={cx} cy={cy} r={r.radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
        ))}

        {rings.map((r, i) => {
          const labelPos = polarToCartesian(r.angle, r.radius + 15);
          return (
            <text
              key={`${r.name}-label`}
              x={labelPos.x}
              y={labelPos.y}
              fill="#93C5FD"
              fontSize="10"
              textAnchor="middle"
              dominantBaseline="middle"
              className={`orbit-label-${i}`}
            >
              {r.name}
            </text>
          );
        })}

        {rings.map((r, i) => (
          <g key={`${r.name}-dot`} className={`orbit-ring-${i}`}>
            <circle cx={cx} cy={cy - r.radius} r={4.5} fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.85))' }} />
          </g>
        ))}

        <circle cx={cx} cy={cy} r={6} fill="#ffffff" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.7))' }} />
      </svg>

      <p className="text-white/70 text-base text-center mt-3">
        Different Formats, Same Point Of View
      </p>
    </div>
  );
};

export const ResourcesHubHeroOptionB = () => (
  <ResourceHeroShell devLabel="Resources Hub — Option B: Orbiting Categories">
    <ResourceHeroGrid
      heading="Everything We Publish Orbits One Way Of Thinking."
      sub="Tools, reports, case studies, and the blog — different formats, the same discipline behind every one of them."
      right={<OrbitingCategoriesDiagram />}
    />
  </ResourceHeroShell>
);

// ---------------- Tools ----------------
const useCountUp = (target: number, duration = 1200, delay = 0) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    let start: number | null = null;

    const timer = setTimeout(() => {
      const step = (ts: number) => {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        setValue(Math.round(progress * target));
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration, delay]);

  return value;
};

const ToolGaugeDiagram = () => {
  const [mounted, setMounted] = useState(false);
  const score = useCountUp(92, 1400, 1500);
  const cx = 110;
  const cy = 130;
  const r = 85;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const polarToCartesian = (angleDeg: number, radius: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: roundCoord(cx + radius * Math.cos(rad)),
      y: roundCoord(cy + radius * Math.sin(rad)),
    };
  };

  const describeArc = (startAngle: number, endAngle: number, radius: number) => {
    const start = polarToCartesian(startAngle, radius);
    const end = polarToCartesian(endAngle, radius);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  const toggles = ['Revenue', 'Cost Base', 'Team'];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes toggleThumbOn { from { transform: translateX(0); } to { transform: translateX(20px); } }
        @keyframes toggleTrackOn { from { background-color: rgba(255,255,255,0.15); } to { background-color: #60a5fa; } }
        .toggle-thumb-0 { animation: toggleThumbOn 0.35s ease-out 0.2s forwards; }
        .toggle-thumb-1 { animation: toggleThumbOn 0.35s ease-out 0.5s forwards; }
        .toggle-thumb-2 { animation: toggleThumbOn 0.35s ease-out 0.8s forwards; }
        .toggle-track-0 { animation: toggleTrackOn 0.35s ease-out 0.2s forwards; }
        .toggle-track-1 { animation: toggleTrackOn 0.35s ease-out 0.5s forwards; }
        .toggle-track-2 { animation: toggleTrackOn 0.35s ease-out 0.8s forwards; }

        @keyframes needleSettle {
          0%   { transform: rotate(-70deg); }
          55%  { transform: rotate(82deg); }
          100% { transform: rotate(72deg); }
        }
        .gauge-needle { animation: needleSettle 1.3s cubic-bezier(0.3, 0, 0.2, 1) 1.15s both; }

        @keyframes gaugeArcDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .gauge-arc-fill { stroke-dasharray: 1; stroke-dashoffset: 1; animation: gaugeArcDraw 1.3s ease-out 1.15s forwards; }

        @keyframes readoutFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .gauge-readout { animation: readoutFade 0.5s ease-out 1.3s both; }
      `}</style>

      {mounted && (
        <svg viewBox="0 0 220 170" className="w-full h-auto">
          <path d={describeArc(-90, 90, r)} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={10} strokeLinecap="round" />
          <path
            d={describeArc(-90, 72, r)}
            fill="none"
            stroke="#60a5fa"
            strokeWidth={10}
            strokeLinecap="round"
            pathLength={1}
            className="gauge-arc-fill"
            style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.6))' }}
          />

          {[-90, -45, 0, 45, 90].map((deg) => {
            const outer = polarToCartesian(deg, r + 8);
            const inner = polarToCartesian(deg, r - 2);
            return <line key={deg} x1={outer.x} y1={outer.y} x2={inner.x} y2={inner.y} stroke="rgba(255,255,255,0.25)" strokeWidth={1.5} />;
          })}

          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - (r - 15)}
            stroke="#ffffff"
            strokeWidth={2.5}
            strokeLinecap="round"
            className="gauge-needle"
            style={{ transformOrigin: `${cx}px ${cy}px`, filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.6))' }}
          />
          <circle cx={cx} cy={cy} r={5} fill="#ffffff" />

          <text x={cx} y={cy - 30} textAnchor="middle" fill="#ffffff" fontSize="26" fontWeight={600} className="gauge-readout">
            {score}
          </text>
          <text x={cx} y={cy - 12} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" letterSpacing={1} className="gauge-readout">
            DIAGNOSTIC SCORE
          </text>
        </svg>
      )}

      <div className="flex items-center justify-center gap-6 mt-2">
        {toggles.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <div className={`relative w-9 h-5 rounded-full toggle-track-${i}`} style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white toggle-thumb-${i}`} />
            </div>
            <span className="text-[10px] text-white/50">{label}</span>
          </div>
        ))}
      </div>

      <p className="text-white/70 text-base text-center mt-5">
        Answers, Not Just Frameworks
      </p>
    </div>
  );
};

export const ToolsHeroSection = () => (
  <ResourceHeroShell devLabel="Tools — Live Diagnostic Gauge">
    <ResourceHeroGrid
      heading="Turn A Few Inputs Into One Clear Number."
      sub="Every tool here is built to give you a direct read on where you stand — not another framework to interpret."
      right={<ToolGaugeDiagram />}
    />
  </ResourceHeroShell>
);

// ---------------- Reports ----------------
const ReportStackDiagram = () => {
  const [mounted, setMounted] = useState(false);
  const pageCount = 5;
  const bars = [38, 62, 45, 80, 55];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes pageFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .report-page-0 { animation: pageFadeIn 0.5s ease-out 0s both; }
        .report-page-1 { animation: pageFadeIn 0.5s ease-out 0.15s both; }
        .report-page-2 { animation: pageFadeIn 0.5s ease-out 0.3s both; }
        .report-page-3 { animation: pageFadeIn 0.5s ease-out 0.45s both; }
        .report-page-4 { animation: pageFadeIn 0.5s ease-out 0.6s both; }

        @keyframes scanTravel {
          0%   { transform: translateY(0); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(150px); opacity: 0; }
        }
        .report-scan-line { animation: scanTravel 2.4s ease-in-out 0.9s forwards; }

        @keyframes barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .report-bar-0 { transform-origin: bottom; animation: barGrow 0.6s cubic-bezier(0.22,1,0.36,1) 1.1s both; }
        .report-bar-1 { transform-origin: bottom; animation: barGrow 0.6s cubic-bezier(0.22,1,0.36,1) 1.35s both; }
        .report-bar-2 { transform-origin: bottom; animation: barGrow 0.6s cubic-bezier(0.22,1,0.36,1) 1.6s both; }
        .report-bar-3 { transform-origin: bottom; animation: barGrow 0.6s cubic-bezier(0.22,1,0.36,1) 1.85s both; }
        .report-bar-4 { transform-origin: bottom; animation: barGrow 0.6s cubic-bezier(0.22,1,0.36,1) 2.1s both; }
      `}</style>

      {mounted && (
        <svg viewBox="0 0 400 200" className="w-full h-auto">
          {Array.from({ length: pageCount }).map((_, i) => (
            <rect
              key={i}
              x={20 + i * 4}
              y={20 + i * 6}
              width={130}
              height={150}
              rx={4}
              fill="#132B47"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={1}
              className={`report-page-${i}`}
            />
          ))}

          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={40} y1={60 + i * 14} x2={130} y2={60 + i * 14} stroke="rgba(255,255,255,0.2)" strokeWidth={2} />
          ))}

          <rect
            x="16"
            y="18"
            width="142"
            height="4"
            rx="2"
            fill="#60a5fa"
            className="report-scan-line"
            style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.9))' }}
          />

          <g transform="translate(210, 0)">
            <line x1="0" y1="170" x2="170" y2="170" stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
            {bars.map((v, i) => (
              <rect
                key={i}
                x={10 + i * 32}
                y={170 - v}
                width={18}
                height={v}
                rx={2}
                fill={i === 3 ? '#60a5fa' : 'rgba(96,165,250,0.4)'}
                className={`report-bar-${i}`}
              />
            ))}
          </g>
        </svg>
      )}

      <p className="text-white/70 text-base text-center mt-6">
        Research Becomes A Position, Not Just A Page Count
      </p>
    </div>
  );
};

export const ReportsHeroSection = () => (
  <ResourceHeroShell devLabel="Reports — Document Stack & Extraction">
    <ResourceHeroGrid
      heading="Every Report Starts As Data. It Doesn't End There."
      sub="We go through thousands of data points so the report can hand you a small number of decisions."
      right={<ReportStackDiagram />}
    />
  </ResourceHeroShell>
);

// ---------------- Case Studies ----------------
const CaseProofDiagram = () => {
  const [mounted, setMounted] = useState(false);
  const cases = [
    { path: 'M 20 170 C 100 165, 180 150, 260 120 C 300 105, 330 90, 360 78', endX: 360, endY: 78, delay: 0, accent: false },
    { path: 'M 20 130 C 100 125, 180 105, 260 85 C 300 75, 330 55, 360 42', endX: 360, endY: 42, delay: 0.35, accent: false },
    { path: 'M 20 90 C 100 92, 180 80, 260 55 C 300 42, 330 25, 360 15', endX: 360, endY: 15, delay: 0.7, accent: true },
    { path: 'M 20 45 C 100 55, 180 65, 260 100 C 300 118, 330 128, 360 138', endX: 360, endY: 138, delay: 1.05, accent: false },
  ];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes caseLineDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .case-line-0 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: caseLineDraw 1.3s ease-in-out 0s forwards; }
        .case-line-1 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: caseLineDraw 1.3s ease-in-out 0.35s forwards; }
        .case-line-2 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: caseLineDraw 1.3s ease-in-out 0.7s forwards; }
        .case-line-3 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: caseLineDraw 1.3s ease-in-out 1.05s forwards; }

        @keyframes checkPop { 0% { opacity: 0; transform: scale(0.3); } 100% { opacity: 1; transform: scale(1); } }
        .case-check-0 { animation: checkPop 0.4s ease-out 1.2s both; }
        .case-check-1 { animation: checkPop 0.4s ease-out 1.55s both; }
        .case-check-2 { animation: checkPop 0.4s ease-out 1.9s both; }
        .case-check-3 { animation: checkPop 0.4s ease-out 2.25s both; }
      `}</style>

      {mounted && (
        <svg viewBox="0 0 380 190" className="w-full h-auto">
          {cases.map((c, i) => (
            <path
              key={i}
              d={c.path}
              fill="none"
              stroke={c.accent ? '#60a5fa' : 'rgba(255,255,255,0.45)'}
              strokeWidth={2}
              strokeLinecap="round"
              pathLength={1}
              className={`case-line-${i}`}
            />
          ))}

          {cases.map((c, i) => (
            <g key={`check-${i}`} className={`case-check-${i}`} style={{ transformOrigin: `${c.endX}px ${c.endY}px` }}>
              <circle
                cx={c.endX}
                cy={c.endY}
                r={8}
                fill={c.accent ? '#60a5fa' : '#132B47'}
                stroke="#ffffff"
                strokeWidth={1.2}
                style={{ filter: c.accent ? 'drop-shadow(0 0 7px rgba(96,165,250,0.8))' : 'none' }}
              />
              <path
                d={`M ${c.endX - 3.5} ${c.endY} L ${c.endX - 1} ${c.endY + 2.5} L ${c.endX + 3.5} ${c.endY - 3}`}
                fill="none"
                stroke="#ffffff"
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ))}

          <circle cx="20" cy="110" r={4} fill="rgba(255,255,255,0.4)" />
          <text x="20" y="185" fill="rgba(255,255,255,0.4)" fontSize="10">Starting Point</text>
          <text x="360" y="12" fill="#93C5FD" fontSize="10" textAnchor="end">Proven Outcome</text>
        </svg>
      )}

      <p className="text-white/70 text-base text-center mt-4">
        Different Businesses. Different Starting Lines. The Same Discipline.
      </p>
    </div>
  );
};

export const CaseStudiesHeroSection = () => (
  <ResourceHeroShell devLabel="Case Studies — Converging Proof Lines">
    <ResourceHeroGrid
      heading="Every Case Study Here Ends The Same Way: With A Result."
      sub="Different industries, different starting points — each one worked through to a verified outcome."
      right={<CaseProofDiagram />}
    />
  </ResourceHeroShell>
);

// ---------------- Blog ----------------
const IdeaStreamDiagram = () => {
  const [mounted, setMounted] = useState(false);
  const posts = [
    { x: 40, tag: 'Strategy' },
    { x: 130, tag: 'Growth' },
    { x: 220, tag: 'Leadership' },
    { x: 310, tag: 'Capital' },
  ];
  const travelDuration = 7;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes ideaNodeFade { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }
        .idea-node-0 { animation: ideaNodeFade 0.45s ease-out 0.3s both; transform-origin: 40px 100px; }
        .idea-node-1 { animation: ideaNodeFade 0.45s ease-out 0.55s both; transform-origin: 130px 100px; }
        .idea-node-2 { animation: ideaNodeFade 0.45s ease-out 0.8s both; transform-origin: 220px 100px; }
        .idea-node-3 { animation: ideaNodeFade 0.45s ease-out 1.05s both; transform-origin: 310px 100px; }
        .idea-tag-0 { animation: ideaNodeFade 0.45s ease-out 0.5s both; }
        .idea-tag-1 { animation: ideaNodeFade 0.45s ease-out 0.75s both; }
        .idea-tag-2 { animation: ideaNodeFade 0.45s ease-out 1.0s both; }
        .idea-tag-3 { animation: ideaNodeFade 0.45s ease-out 1.25s both; }

        @keyframes cursorTravel { 0% { offset-distance: 0%; } 100% { offset-distance: 100%; } }
        .idea-cursor {
          offset-path: path('M 20 100 L 360 100');
          animation: cursorTravel ${travelDuration}s linear infinite;
        }
        @keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        .idea-cursor-bar { animation: cursorBlink 0.9s steps(1) infinite; }
      `}</style>

      {mounted && (
        <svg viewBox="0 0 380 160" className="w-full h-auto">
          <line x1="20" y1="100" x2="360" y2="100" stroke="rgba(255,255,255,0.25)" strokeWidth={1.5} strokeDasharray="3 5" />

          {posts.map((p, i) => (
            <g key={p.tag}>
              <circle cx={p.x} cy={100} r={5} fill="#60a5fa" className={`idea-node-${i}`} style={{ filter: 'drop-shadow(0 0 5px rgba(96,165,250,0.7))' }} />
              <text x={p.x} y={80} fill="#93C5FD" fontSize="9.5" textAnchor="middle" className={`idea-tag-${i}`}>
                {p.tag}
              </text>
            </g>
          ))}

          <g className="idea-cursor">
            <line x1="0" y1="-9" x2="0" y2="9" stroke="#ffffff" strokeWidth={2} className="idea-cursor-bar" style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.8))' }} />
          </g>
        </svg>
      )}

      <p className="text-white/70 text-base text-center mt-6">
        Ideas, Published As We Test Them — Not After
      </p>
    </div>
  );
};

export const BlogHeroSection = () => (
  <ResourceHeroShell devLabel="Blog — Idea Stream">
    <ResourceHeroGrid
      heading="Thinking, Written Down Before It's Finished."
      sub="Shorter, faster, and closer to the actual work than a report — a running record of how we're thinking right now."
      right={<IdeaStreamDiagram />}
    />
  </ResourceHeroShell>
);

/* ============================================================
   SERVICE & LEGAL HERO DIAGRAMS
   (merged from service-and-legal-hero-diagrams.tsx)
   ============================================================ */

const useAnimatedNumber = (from: number, to: number, duration = 1200, delay = 0) => {
  const [value, setValue] = useState(from);
  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const timer = setTimeout(() => {
      const step = (ts: number) => {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        setValue(Math.round(from + (to - from) * progress));
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [from, to, duration, delay]);
  return value;
};

// ---------------- Services Hub — Option A: Diagnostic Branch Tree ----------------
const DiagnosticBranchTree = () => {
  const rootX = 55;
  const rootY = 100;
  const leaves = [
    { name: 'Validation', y: 15 },
    { name: 'Go-To-Market', y: 48 },
    { name: 'Operations', y: 81 },
    { name: 'Fundraising', y: 114 },
    { name: 'Turnaround', y: 147 },
    { name: 'Scale', y: 180 },
  ];
  const leafX = 330;

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes branchDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .branch-line-0 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: branchDraw 0.8s ease-out 0.15s forwards; }
        .branch-line-1 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: branchDraw 0.8s ease-out 0.35s forwards; }
        .branch-line-2 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: branchDraw 0.8s ease-out 0.55s forwards; }
        .branch-line-3 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: branchDraw 0.8s ease-out 0.75s forwards; }
        .branch-line-4 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: branchDraw 0.8s ease-out 0.95s forwards; }
        .branch-line-5 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: branchDraw 0.8s ease-out 1.15s forwards; }

        @keyframes leafPop { from { opacity: 0; transform: scale(0.3); } to { opacity: 1; transform: scale(1); } }
        .branch-leaf-0 { animation: leafPop 0.35s ease-out 0.85s both; }
        .branch-leaf-1 { animation: leafPop 0.35s ease-out 1.05s both; }
        .branch-leaf-2 { animation: leafPop 0.35s ease-out 1.25s both; }
        .branch-leaf-3 { animation: leafPop 0.35s ease-out 1.45s both; }
        .branch-leaf-4 { animation: leafPop 0.35s ease-out 1.65s both; }
        .branch-leaf-5 { animation: leafPop 0.35s ease-out 1.85s both; }

        @keyframes rootPulse { 0%, 100% { r: 9; opacity: 0.9; } 50% { r: 12; opacity: 1; } }
        .branch-root-pulse { animation: rootPulse 2.4s ease-in-out 2s infinite; }
      `}</style>

      <svg viewBox="0 0 380 220" className="w-full h-auto">
        {leaves.map((leaf, i) => (
          <path
            key={leaf.name}
            d={`M ${rootX} ${rootY} C ${rootX + 90} ${rootY}, ${rootX + 150} ${leaf.y}, ${leafX} ${leaf.y}`}
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth={1.5}
            strokeLinecap="round"
            pathLength={1}
            className={`branch-line-${i}`}
          />
        ))}

        {leaves.map((leaf, i) => (
          <g key={leaf.name} className={`branch-leaf-${i}`} style={{ transformOrigin: `${leafX}px ${leaf.y}px` }}>
            <circle cx={leafX} cy={leaf.y} r={5.5} fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 5px rgba(96,165,250,0.75))' }} />
            <text x={leafX + 12} y={leaf.y} fill="#93C5FD" fontSize="11" dominantBaseline="middle">
              {leaf.name}
            </text>
          </g>
        ))}

        <circle
          cx={rootX}
          cy={rootY}
          r={9}
          fill="#ffffff"
          className="branch-root-pulse"
          style={{ transformOrigin: `${rootX}px ${rootY}px`, filter: 'drop-shadow(0 0 9px rgba(255,255,255,0.7))' }}
        />
        <text x={rootX} y={rootY + 26} fill="rgba(255,255,255,0.55)" fontSize="10" textAnchor="middle">
          Diagnostic & Direction
        </text>
      </svg>

      <p className="text-white/70 text-base text-center mt-2">
        Every Engagement Starts In The Same Place. It Doesn't End There.
      </p>
    </div>
  );
};

export const ServicesHubHeroOptionA = () => (
  <ResourceHeroShell devLabel="Services Hub — Option A: Diagnostic Branch Tree">
    <ResourceHeroGrid
      heading="One Diagnostic. Six Ways It Can Lead From There."
      sub="Every package begins with understanding the full truth of where you are — then branches to the track that actually fits."
      right={<DiagnosticBranchTree />}
    />
  </ResourceHeroShell>
);

// ---------------- Services Hub — Option B: Track Selector ----------------
const TrackSelectorDiagram = () => {
  const tracks = ['Foundation', 'Validation', 'GTM', 'Operations', 'Fundraising', 'Turnaround', 'Scale'];
  const tileWidth = 50;
  const tileGap = 6;
  const startX = 16;

  return (
    <div className="w-full max-w-lg">
      <style>{`
        @keyframes trackTileFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .track-tile-0 { animation: trackTileFade 0.4s ease-out 0s both; }
        .track-tile-1 { animation: trackTileFade 0.4s ease-out 0.1s both; }
        .track-tile-2 { animation: trackTileFade 0.4s ease-out 0.2s both; }
        .track-tile-3 { animation: trackTileFade 0.4s ease-out 0.3s both; }
        .track-tile-4 { animation: trackTileFade 0.4s ease-out 0.4s both; }
        .track-tile-5 { animation: trackTileFade 0.4s ease-out 0.5s both; }
        .track-tile-6 { animation: trackTileFade 0.4s ease-out 0.6s both; }

        @keyframes selectorSlide {
          0%, 9%   { transform: translateX(0px); }
          14%, 23% { transform: translateX(${tileWidth + tileGap}px); }
          28%, 37% { transform: translateX(${(tileWidth + tileGap) * 2}px); }
          42%, 51% { transform: translateX(${(tileWidth + tileGap) * 3}px); }
          56%, 65% { transform: translateX(${(tileWidth + tileGap) * 4}px); }
          70%, 79% { transform: translateX(${(tileWidth + tileGap) * 5}px); }
          84%, 93% { transform: translateX(${(tileWidth + tileGap) * 6}px); }
          100%     { transform: translateX(0px); }
        }
        .track-selector-highlight { animation: selectorSlide 14s ease-in-out 1s infinite; opacity: 0; }
        @keyframes selectorFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .track-selector-highlight { animation: selectorSlide 14s ease-in-out 1s infinite, selectorFadeIn 0.4s ease-out 0.9s forwards; }
      `}</style>

      <svg viewBox="0 0 400 90" className="w-full h-auto">
        <rect
          x={startX - 2}
          y={30}
          width={tileWidth + 4}
          height={30}
          rx={8}
          fill="rgba(96,165,250,0.28)"
          stroke="#60a5fa"
          strokeWidth={1}
          className="track-selector-highlight"
          style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.5))' }}
        />

        {tracks.map((t, i) => (
          <g key={t} className={`track-tile-${i}`}>
            <rect
              x={startX + i * (tileWidth + tileGap)}
              y={30}
              width={tileWidth}
              height={30}
              rx={7}
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth={1}
            />
            <text
              x={startX + i * (tileWidth + tileGap) + tileWidth / 2}
              y={48}
              fill="#ffffff"
              fontSize="8.5"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {t}
            </text>
          </g>
        ))}
      </svg>

      <p className="text-white/70 text-base text-center mt-5">
        Wherever You Are Right Now, There's A Track Built For It
      </p>
    </div>
  );
};

export const ServicesHubHeroOptionB = () => (
  <ResourceHeroShell devLabel="Services Hub — Option B: Track Selector">
    <ResourceHeroGrid
      heading="Seven Stages Of A Business. One Package For Each."
      sub="From first diagnostic to full-scale expansion — find the stage you're actually in, not the one you assumed you were."
      right={<TrackSelectorDiagram />}
    />
  </ResourceHeroShell>
);

// ---------------- Foundation — Diagnostic Grid Scan ----------------
const DiagnosticGridScan = () => {
  const rows = 4;
  const cols = 4;
  const cellSize = 38;
  const gap = 6;
  const originX = 20;
  const originY = 20;
  const bottleneck = { r: 1, c: 2 };

  return (
    <div className="w-64 h-64 sm:w-72 sm:h-72">
      <style>{`
        @keyframes gridRowLight { from { fill: rgba(255,255,255,0.04); } to { fill: rgba(96,165,250,0.28); } }
        .grid-row-0 rect { animation: gridRowLight 0.4s ease-out 0s forwards; }
        .grid-row-1 rect { animation: gridRowLight 0.4s ease-out 0.3s forwards; }
        .grid-row-2 rect { animation: gridRowLight 0.4s ease-out 0.6s forwards; }
        .grid-row-3 rect { animation: gridRowLight 0.4s ease-out 0.9s forwards; }

        @keyframes scanTravelGrid {
          0%   { transform: translateY(0); opacity: 0; }
          6%   { opacity: 1; }
          94%  { opacity: 1; }
          100% { transform: translateY(${rows * (cellSize + gap)}px); opacity: 0; }
        }
        .grid-scan-line { animation: scanTravelGrid 1.3s ease-in-out 0.05s forwards; }

        @keyframes bottleneckPop { 0% { opacity: 0; transform: scale(0.4); } 100% { opacity: 1; transform: scale(1); } }
        .bottleneck-flag { animation: bottleneckPop 0.4s ease-out 1.5s both; }

        @keyframes bottleneckPulse { 0%, 100% { opacity: 0.85; } 50% { opacity: 1; } }
        .bottleneck-ring { animation: bottleneckPulse 1.8s ease-in-out 1.9s infinite; }
      `}</style>

      <svg viewBox="0 0 220 210" className="w-full h-full">
        {Array.from({ length: rows }).map((_, r) => (
          <g key={r} className={`grid-row-${r}`}>
            {Array.from({ length: cols }).map((_, c) => (
              <rect
                key={c}
                x={originX + c * (cellSize + gap)}
                y={originY + r * (cellSize + gap)}
                width={cellSize}
                height={cellSize}
                rx={3}
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth={1}
              />
            ))}
          </g>
        ))}

        <rect
          x={originX - 4}
          y={originY - 4}
          width={cols * (cellSize + gap) - gap + 8}
          height={4}
          rx={2}
          fill="#60a5fa"
          className="grid-scan-line"
          style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.9))' }}
        />

        <g className="bottleneck-flag">
          <rect
            x={originX + bottleneck.c * (cellSize + gap)}
            y={originY + bottleneck.r * (cellSize + gap)}
            width={cellSize}
            height={cellSize}
            rx={3}
            fill="rgba(96,165,250,0.85)"
            className="bottleneck-ring"
            style={{
              transformOrigin: `${originX + bottleneck.c * (cellSize + gap) + cellSize / 2}px ${
                originY + bottleneck.r * (cellSize + gap) + cellSize / 2
              }px`,
              filter: 'drop-shadow(0 0 10px rgba(96,165,250,0.9))',
            }}
          />
          <text
            x={originX + bottleneck.c * (cellSize + gap) + cellSize / 2}
            y={originY + bottleneck.r * (cellSize + gap) - 8}
            fill="#ffffff"
            fontSize="9"
            textAnchor="middle"
          >
            Bottleneck
          </text>
        </g>
      </svg>

      <p className="text-white/70 text-base text-center mt-2">
        Every Lever Mapped. The Real Constraint Found.
      </p>
    </div>
  );
};

export const ServiceFoundationHero = () => (
  <ResourceHeroShell devLabel="Foundation — Business Diagnostic & Direction">
    <ResourceHeroGrid
      heading="Clarity Doesn't Start With An Opinion. It Starts With A Map."
      sub="A rigorous, data-driven diagnostic across your model, value chain, and control levers — until the actual constraint is visible."
      right={<DiagnosticGridScan />}
    />
  </ResourceHeroShell>
);

// ---------------- Validation — Kill-Or-Commit Funnel ----------------
const ValidationFunnelDiagram = () => {
  const startPoints = [
    { x: 40, y: 20, id: 'v0', survives: false },
    { x: 100, y: 20, id: 'v1', survives: false },
    { x: 150, y: 15, id: 'v2', survives: true },
    { x: 200, y: 20, id: 'v3', survives: false },
    { x: 260, y: 20, id: 'v4', survives: false },
  ];
  const exitX = 150;
  const exitY = 195;

  return (
    <div className="w-full max-w-sm">
      <style>{`
        @keyframes ideaDotFade { 0% { opacity: 0; } 12% { opacity: 1; } 100% { opacity: 1; } }
        .idea-dot-fadein { animation: ideaDotFade 0.4s ease-out both; }

        @keyframes ideaDiscard { 0%, 78% { opacity: 1; } 100% { opacity: 0; } }
        .idea-discard { animation: ideaDiscard 1.7s ease-in 0.4s forwards; }

        @keyframes survivorGlow { 0%, 100% { r: 6; opacity: 0.9; } 50% { r: 8.5; opacity: 1; } }
        .idea-survivor-glow { animation: survivorGlow 2s ease-in-out 2.2s infinite; }
      `}</style>

      <svg viewBox="0 0 300 220" className="w-full h-auto">
        <path
          d={`M 20 15 L 280 15 L ${exitX + 14} 190 L ${exitX - 14} 190 Z`}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={1.2}
          strokeDasharray="4 5"
        />

        {startPoints.map((p, i) => {
          const pathId = `idea-path-${p.id}`;
          return (
            <g key={p.id}>
              <path id={pathId} d={`M ${p.x} ${p.y} Q ${(p.x + exitX) / 2} ${(p.y + exitY) / 2}, ${exitX} ${exitY}`} fill="none" stroke="none" />
              <circle
                r={p.survives ? 6 : 4}
                fill={p.survives ? '#60a5fa' : 'rgba(255,255,255,0.55)'}
                className={p.survives ? 'idea-dot-fadein' : 'idea-dot-fadein idea-discard'}
                style={{ animationDelay: `${i * 0.15}s`, filter: p.survives ? 'drop-shadow(0 0 6px rgba(96,165,250,0.8))' : 'none' }}
              >
                <animateMotion dur="1.9s" begin={`${0.5 + i * 0.15}s`} repeatCount="1" fill="freeze">
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}

        <circle cx={exitX} cy={exitY} r={6} fill="#60a5fa" className="idea-survivor-glow" style={{ filter: 'drop-shadow(0 0 10px rgba(96,165,250,0.9))' }} />
        <text x={exitX} y={exitY + 22} fill="#93C5FD" fontSize="10" textAnchor="middle">Validated Idea</text>
        <text x="20" y="10" fill="rgba(255,255,255,0.45)" fontSize="9">Candidate Ideas</text>
      </svg>

      <p className="text-white/70 text-base text-center mt-3">
        Not The Idea You Fell In Love With — The One The Evidence Supports
      </p>
    </div>
  );
};

export const ServiceValidationHero = () => (
  <ResourceHeroShell devLabel="Validation — Product–Market Fit">
    <ResourceHeroGrid
      heading="Most Ventures Don't Fail From Effort. They Fail From The Wrong Idea."
      sub="A rigorous kill-or-commit framework, applied before you spend the time, money, or focus — not after."
      right={<ValidationFunnelDiagram />}
    />
  </ResourceHeroShell>
);

// ---------------- Go-To-Market — Channels Into Compounding Revenue ----------------
const GtmChannelDiagram = () => {
  const channels = [
    { label: 'Paid', path: 'M 20 40 C 100 40, 140 90, 175 100', delay: 0 },
    { label: 'Referral', path: 'M 20 100 L 175 100', delay: 0.25 },
    { label: 'Outbound', path: 'M 20 160 C 100 160, 140 110, 175 100', delay: 0.5 },
  ];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes gtmChannelDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .gtm-channel-0 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: gtmChannelDraw 0.9s ease-out 0s forwards; }
        .gtm-channel-1 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: gtmChannelDraw 0.9s ease-out 0.25s forwards; }
        .gtm-channel-2 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: gtmChannelDraw 0.9s ease-out 0.5s forwards; }

        @keyframes gtmOutputDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .gtm-output-line { stroke-dasharray: 1; stroke-dashoffset: 1; animation: gtmOutputDraw 1.1s ease-in-out 1.1s forwards; }

        @keyframes gtmTipGlow { 0%, 100% { r: 5; opacity: 0.9; } 50% { r: 7.5; opacity: 1; } }
        .gtm-tip-glow { animation: gtmTipGlow 2s ease-in-out 2.3s infinite; }
      `}</style>

      <svg viewBox="0 0 400 200" className="w-full h-auto">
        {channels.map((c, i) => (
          <path key={c.label} d={c.path} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2} strokeLinecap="round" pathLength={1} className={`gtm-channel-${i}`} />
        ))}
        {channels.map((c) => (
          <text key={`${c.label}-label`} x="18" y={c.path.includes('40') ? 30 : c.path.includes('160') ? 178 : 96} fill="rgba(255,255,255,0.5)" fontSize="10">
            {c.label}
          </text>
        ))}

        <circle cx="175" cy="100" r={3.5} fill="rgba(255,255,255,0.7)" />

        <path
          id="gtm-output-path"
          d="M 175 100 C 230 100, 270 60, 320 35 C 340 24, 355 18, 375 10"
          fill="none"
          stroke="#60a5fa"
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          className="gtm-output-line"
          style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.6))' }}
        />
        <circle cx="375" cy="10" r={5} fill="#60a5fa" className="gtm-tip-glow" style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.9))' }} />
        <text x="375" y="28" fill="#93C5FD" fontSize="10" textAnchor="end">Revenue</text>
      </svg>

      <p className="text-white/70 text-base text-center mt-4">
        A Repeatable System, Not Three Separate Bets
      </p>
    </div>
  );
};

export const ServiceGoToMarketHero = () => (
  <ResourceHeroShell devLabel="Go-To-Market Strategy">
    <ResourceHeroGrid
      heading="A Product Without A System To Sell It Is Just Inventory."
      sub="The right channels, the right sales motion, and a funnel that compounds — not one that depends on the founder every time."
      right={<GtmChannelDiagram />}
    />
  </ResourceHeroShell>
);

// ---------------- Operations — From Tangled To Organised ----------------
const OperationsRestructureDiagram = () => {
  const scattered = [
    { x: 40, y: 40 },
    { x: 280, y: 40 },
    { x: 40, y: 180 },
    { x: 280, y: 180 },
    { x: 160, y: 25 },
    { x: 160, y: 195 },
  ];
  const center = { x: 160, y: 110 };

  const mid = [
    { x: 80, y: 90 },
    { x: 160, y: 90 },
    { x: 240, y: 90 },
  ];
  const leaves = [
    { x: 55, y: 165 },
    { x: 105, y: 165 },
    { x: 135, y: 165 },
    { x: 185, y: 165 },
    { x: 215, y: 165 },
    { x: 265, y: 165 },
  ];

  return (
    <div className="w-72 h-72 sm:w-80 sm:h-80">
      <style>{`
        @keyframes tangleFade { 0% { opacity: 0; } 15% { opacity: 1; } 62% { opacity: 1; } 82% { opacity: 0; } 100% { opacity: 0; } }
        .tangle-group { animation: tangleFade 3.2s ease-in-out 0s forwards; }

        @keyframes orgFadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        .org-group { opacity: 0; animation: orgFadeIn 0.9s ease-out 2.4s forwards; }
      `}</style>

      <svg viewBox="0 0 320 220" className="w-full h-full">
        <g className="tangle-group">
          {scattered.map((s, i) => (
            <line key={i} x1={center.x} y1={center.y} x2={s.x} y2={s.y} stroke="rgba(255,255,255,0.4)" strokeWidth={1.2} />
          ))}
          <line x1={scattered[0].x} y1={scattered[0].y} x2={scattered[3].x} y2={scattered[3].y} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
          <line x1={scattered[1].x} y1={scattered[1].y} x2={scattered[2].x} y2={scattered[2].y} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
          {scattered.map((s, i) => (
            <circle key={`s-${i}`} cx={s.x} cy={s.y} r={5} fill="rgba(255,255,255,0.6)" />
          ))}
          <circle cx={center.x} cy={center.y} r={8} fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.8))' }} />
          <text x={center.x} y={center.y + 22} fill="#93C5FD" fontSize="10" textAnchor="middle">Founder</text>
        </g>

        <g className="org-group">
          {mid.map((m, i) => (
            <line key={`root-${i}`} x1={160} y1={30} x2={m.x} y2={m.y} stroke="rgba(255,255,255,0.4)" strokeWidth={1.2} />
          ))}
          {leaves.map((l, i) => {
            const parent = mid[Math.floor(i / 2)];
            return <line key={`leaf-${i}`} x1={parent.x} y1={parent.y} x2={l.x} y2={l.y} stroke="rgba(255,255,255,0.25)" strokeWidth={1} />;
          })}

          <circle cx={160} cy={30} r={7} fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.7))' }} />
          {mid.map((m, i) => (
            <circle key={`mid-${i}`} cx={m.x} cy={m.y} r={5.5} fill="#ffffff" />
          ))}
          {leaves.map((l, i) => (
            <circle key={`leaf-dot-${i}`} cx={l.x} cy={l.y} r={4} fill="rgba(255,255,255,0.6)" />
          ))}
        </g>
      </svg>

      <p className="text-white/70 text-base text-center mt-2">
        Same Team. From Founder-Dependent To Self-Running.
      </p>
    </div>
  );
};

export const ServiceOperationsHero = () => (
  <ResourceHeroShell devLabel="Operations & Scalability">
    <ResourceHeroGrid
      heading="Revenue Growth Without Infrastructure Isn't Scale. It's Chaos With A Bigger Number."
      sub="We map every process, measure founder dependency, and rebuild the structure for the stage you're entering next."
      right={<OperationsRestructureDiagram />}
    />
  </ResourceHeroShell>
);

// ---------------- Fundraising — Metrics Into A Data Room ----------------
const FundraisingMetricsDiagram = () => {
  const cards = [
    { label: 'ARR', dx: -30, dy: -40, rot: -14 },
    { label: 'Churn', dx: 40, dy: -55, rot: 10 },
    { label: 'LTV:CAC', dx: -20, dy: 55, rot: 8 },
    { label: 'Runway', dx: 35, dy: 45, rot: -9 },
  ];
  const finalX = [20, 110, 200, 290];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes cardSettle0 { from { opacity: 0; transform: translate(${cards[0].dx}px, ${cards[0].dy}px) rotate(${cards[0].rot}deg); } to { opacity: 1; transform: translate(0,0) rotate(0deg); } }
        @keyframes cardSettle1 { from { opacity: 0; transform: translate(${cards[1].dx}px, ${cards[1].dy}px) rotate(${cards[1].rot}deg); } to { opacity: 1; transform: translate(0,0) rotate(0deg); } }
        @keyframes cardSettle2 { from { opacity: 0; transform: translate(${cards[2].dx}px, ${cards[2].dy}px) rotate(${cards[2].rot}deg); } to { opacity: 1; transform: translate(0,0) rotate(0deg); } }
        @keyframes cardSettle3 { from { opacity: 0; transform: translate(${cards[3].dx}px, ${cards[3].dy}px) rotate(${cards[3].rot}deg); } to { opacity: 1; transform: translate(0,0) rotate(0deg); } }
        .fund-card-0 { animation: cardSettle0 0.65s cubic-bezier(0.22,1,0.36,1) 0s both; }
        .fund-card-1 { animation: cardSettle1 0.65s cubic-bezier(0.22,1,0.36,1) 0.18s both; }
        .fund-card-2 { animation: cardSettle2 0.65s cubic-bezier(0.22,1,0.36,1) 0.36s both; }
        .fund-card-3 { animation: cardSettle3 0.65s cubic-bezier(0.22,1,0.36,1) 0.54s both; }

        @keyframes stampPop { 0% { opacity: 0; transform: scale(0.3) rotate(-16deg); } 100% { opacity: 1; transform: scale(1) rotate(-16deg); } }
        .fund-stamp { animation: stampPop 0.5s ease-out 1.55s both; }

        @keyframes stampGlow { 0%, 100% { opacity: 0.85; } 50% { opacity: 1; } }
        .fund-stamp-glow { animation: stampGlow 2.2s ease-in-out 2.1s infinite; }
      `}</style>

      <svg viewBox="0 0 380 170" className="w-full h-auto">
        {cards.map((c, i) => (
          <g key={c.label} className={`fund-card-${i}`} style={{ transformOrigin: `${finalX[i] + 35}px 85px` }}>
            <rect x={finalX[i]} y={60} width={70} height={50} rx={6} fill="#132B47" stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
            <text x={finalX[i] + 35} y={90} fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight={600}>
              {c.label}
            </text>
          </g>
        ))}

        <g className="fund-stamp fund-stamp-glow" style={{ transformOrigin: '350px 140px' }}>
          <circle cx="350" cy="140" r="20" fill="none" stroke="#60a5fa" strokeWidth={2} style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.7))' }} />
          <path d="M 342 140 L 348 146 L 359 132" fill="none" stroke="#60a5fa" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>

      <p className="text-white/70 text-base text-center mt-4">
        Investors Don't Fund Potential. They Fund Evidence.
      </p>
    </div>
  );
};

export const ServiceFundraisingHero = () => (
  <ResourceHeroShell devLabel="Fundraising Readiness">
    <ResourceHeroGrid
      heading="By The Time You're In The Room, You're Not Pitching. You're Presenting."
      sub="Metrics cleaned, the narrative stress-tested, and a data room built the way investors actually expect to see one."
      right={<FundraisingMetricsDiagram />}
    />
  </ResourceHeroShell>
);

// ---------------- Turnaround — Runway Stabilising ----------------
const TurnaroundRunwayDiagram = () => {
  const days = useAnimatedNumber(74, 21, 1900, 300);

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes runwayDrain {
          0%   { transform: scaleX(1); }
          68%  { transform: scaleX(0.28); }
          100% { transform: scaleX(0.28); }
        }
        .runway-fill { transform-origin: left center; animation: runwayDrain 2.1s cubic-bezier(0.4,0,0.2,1) 0.3s both; }

        @keyframes markerFade { from { opacity: 0; } to { opacity: 1; } }
        .runway-marker { animation: markerFade 0.4s ease-out 1.7s both; }

        @keyframes stabilizedPulse { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
        .runway-stabilized-glow { animation: stabilizedPulse 2s ease-in-out 2.1s infinite; }
      `}</style>

      <svg viewBox="0 0 380 60" className="w-full h-auto">
        <rect x="20" y="18" width="340" height="24" rx="12" fill="rgba(255,255,255,0.1)" />
        <g className="runway-fill">
          <rect x="20" y="18" width="340" height="24" rx="12" fill="#60a5fa" />
        </g>
        <line x1="115" y1="10" x2="115" y2="50" stroke="#ffffff" strokeWidth={1.5} className="runway-marker" />
        <text x="115" y="8" fill="#ffffff" fontSize="9" textAnchor="middle" className="runway-marker">Intervention</text>
        <circle cx="115" cy="30" r="4" fill="#ffffff" className="runway-marker runway-stabilized-glow" style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))' }} />
      </svg>

      <div className="flex items-baseline justify-center gap-2 mt-6">
        <span className="text-5xl font-semibold text-blue-300">{days}</span>
        <span className="text-white/60 text-base">Days Of Runway, Holding</span>
      </div>

      <p className="text-white/70 text-base text-center mt-4">
        The Priority Isn't Strategy. It's Survival.
      </p>
    </div>
  );
};

export const ServiceTurnaroundHero = () => (
  <ResourceHeroShell devLabel="Turnaround & Stabilisation">
    <ResourceHeroGrid
      heading="When The Runway Is Short, The Priority Is Control, Not Ambition."
      sub="A survival viability assessment, a compression strategy, and a 30–90 day plan with one objective: regaining control."
      right={<TurnaroundRunwayDiagram />}
    />
  </ResourceHeroShell>
);

// ---------------- Scale — Scaffolding Before The Curve ----------------
const ScaleScaffoldDiagram = () => {
  const struts = [30, 45, 65, 90, 120, 150];
  const baseY = 180;
  const startX = 30;
  const spacing = 60;

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes strutGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .strut-0 { transform-origin: bottom; animation: strutGrow 0.5s cubic-bezier(0.22,1,0.36,1) 0s both; }
        .strut-1 { transform-origin: bottom; animation: strutGrow 0.5s cubic-bezier(0.22,1,0.36,1) 0.12s both; }
        .strut-2 { transform-origin: bottom; animation: strutGrow 0.5s cubic-bezier(0.22,1,0.36,1) 0.24s both; }
        .strut-3 { transform-origin: bottom; animation: strutGrow 0.5s cubic-bezier(0.22,1,0.36,1) 0.36s both; }
        .strut-4 { transform-origin: bottom; animation: strutGrow 0.5s cubic-bezier(0.22,1,0.36,1) 0.48s both; }
        .strut-5 { transform-origin: bottom; animation: strutGrow 0.5s cubic-bezier(0.22,1,0.36,1) 0.6s both; }

        @keyframes scaleCurveDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .scale-curve { stroke-dasharray: 1; stroke-dashoffset: 1; animation: scaleCurveDraw 1.3s ease-in-out 1.1s forwards; }

        @keyframes scaleTipGlow { 0%, 100% { r: 5; opacity: 0.9; } 50% { r: 7.5; opacity: 1; } }
        .scale-tip-glow { animation: scaleTipGlow 2s ease-in-out 2.4s infinite; }
      `}</style>

      <svg viewBox="0 0 400 200" className="w-full h-auto">
        <line x1="20" y1={baseY} x2="380" y2={baseY} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />

        {struts.map((h, i) => (
          <rect
            key={i}
            x={startX + i * spacing}
            y={baseY - h}
            width={22}
            height={h}
            rx={2}
            fill="rgba(96,165,250,0.35)"
            className={`strut-${i}`}
          />
        ))}

        <path
          d={`M ${startX + 11} ${baseY - struts[0]} C ${startX + 80} ${baseY - struts[1]}, ${startX + 160} ${baseY - struts[3]}, ${startX + 250} ${
            baseY - struts[5]
          } C ${startX + 300} ${baseY - struts[5] - 25}, ${startX + 340} ${baseY - struts[5] - 55}, 380 ${baseY - struts[5] - 80}`}
          fill="none"
          stroke="#60a5fa"
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          className="scale-curve"
          style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.6))' }}
        />
        <circle cx="380" cy={baseY - struts[5] - 80} r={5} fill="#60a5fa" className="scale-tip-glow" style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.9))' }} />
      </svg>

      <p className="text-white/70 text-base text-center mt-2">
        The Curve Only Holds Because Of What's Built Underneath It
      </p>
    </div>
  );
};

export const ServiceScaleHero = () => (
  <ResourceHeroShell devLabel="Scale & Expansion Strategy">
    <ResourceHeroGrid
      heading="Aggressive Growth Isn't An Achievement If The Structure Underneath It Fails."
      sub="A scale-readiness diagnostic, capital modelling, and org design built for the stage you're moving into — not the one you're leaving."
      right={<ScaleScaffoldDiagram />}
    />
  </ResourceHeroShell>
);

// ---------------- Cohorts — Moving Together ----------------
const CohortJourneyDiagram = () => {
  const checkpoints = [
    { x: 20, label: 'Kickoff' },
    { x: 105, label: 'Diagnostic' },
    { x: 190, label: 'Strategy Sprint' },
    { x: 275, label: 'Execution' },
    { x: 360, label: 'Outcome' },
  ];
  const travelDuration = 4.8;
  const dotOffsets = [-7, -3, 0, 3, 7];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes cohortCheckpointPulse0 { 0%, 4%, 100% { r: 4.5; opacity: 0.55; } 2% { r: 8; opacity: 1; } }
        @keyframes cohortCheckpointPulse1 { 0%, 21%, 29%, 100% { r: 4.5; opacity: 0.55; } 25% { r: 8; opacity: 1; } }
        @keyframes cohortCheckpointPulse2 { 0%, 46%, 54%, 100% { r: 4.5; opacity: 0.55; } 50% { r: 8; opacity: 1; } }
        @keyframes cohortCheckpointPulse3 { 0%, 71%, 79%, 100% { r: 4.5; opacity: 0.55; } 75% { r: 8; opacity: 1; } }
        .cohort-checkpoint-0 { animation: cohortCheckpointPulse0 ${travelDuration}s ease-in-out infinite; }
        .cohort-checkpoint-1 { animation: cohortCheckpointPulse1 ${travelDuration}s ease-in-out infinite; }
        .cohort-checkpoint-2 { animation: cohortCheckpointPulse2 ${travelDuration}s ease-in-out infinite; }
        .cohort-checkpoint-3 { animation: cohortCheckpointPulse3 ${travelDuration}s ease-in-out infinite; }

        @keyframes cohortOutcomeGlow { 0%, 100% { opacity: 0.75; r: 6; } 50% { opacity: 1; r: 9; } }
        .cohort-checkpoint-outcome { animation: cohortOutcomeGlow 2s ease-in-out infinite; }
      `}</style>

      <svg viewBox="0 0 380 130" className="w-full h-auto">
        <line x1="20" y1="70" x2="360" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} strokeDasharray="3 5" />

        {checkpoints.slice(0, 4).map((c, i) => (
          <g key={c.label}>
            <circle cx={c.x} cy={70} r={4.5} fill="#93C5FD" className={`cohort-checkpoint-${i}`} />
            <text x={c.x} y={95} fill="rgba(147,197,253,0.8)" fontSize="9" textAnchor="middle">{c.label}</text>
          </g>
        ))}

        <g>
          <circle cx={360} cy={70} r={6} fill="#60a5fa" className="cohort-checkpoint-outcome" style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.8))' }} />
          <text x={360} y={95} fill="#93C5FD" fontSize="9" textAnchor="middle">Outcome</text>
        </g>

        {dotOffsets.map((offset, i) => (
          <circle key={i} r={3.5} fill="#ffffff" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.7))' }}>
            <animateMotion
              dur={`${travelDuration}s`}
              repeatCount="indefinite"
              path={`M 20 ${70 + offset} L 360 ${70 + offset}`}
            />
          </circle>
        ))}
      </svg>

      <p className="text-white/70 text-base text-center mt-2">
        One Cohort, Moving Through The Same Stages Together
      </p>
    </div>
  );
};

export const CohortsHero = () => (
  <ResourceHeroShell devLabel="Cohorts">
    <ResourceHeroGrid
      heading="A Small Group, Working Through The Same System At The Same Time."
      sub="Each cohort moves through diagnostic, strategy, and execution together — no one carrying the stage alone."
      right={<CohortJourneyDiagram />}
    />
  </ResourceHeroShell>
);

// ---------------- Terms & Conditions — Clauses & Seal ----------------
const TermsDocumentDiagram = () => {
  const clauses = [
    { y: 58, width: 118 },
    { y: 83, width: 100 },
    { y: 108, width: 122 },
    { y: 133, width: 90 },
    { y: 158, width: 108 },
  ];

  return (
    <div className="w-64 h-72 sm:w-72 sm:h-80">
      <style>{`
        @keyframes clauseFadeIn { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }
        .clause-0 { animation: clauseFadeIn 0.4s ease-out 0.3s both; }
        .clause-1 { animation: clauseFadeIn 0.4s ease-out 0.6s both; }
        .clause-2 { animation: clauseFadeIn 0.4s ease-out 0.9s both; }
        .clause-3 { animation: clauseFadeIn 0.4s ease-out 1.2s both; }
        .clause-4 { animation: clauseFadeIn 0.4s ease-out 1.5s both; }

        @keyframes checkFadeIn { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }
        .clause-check-0 { animation: checkFadeIn 0.3s ease-out 0.5s both; }
        .clause-check-1 { animation: checkFadeIn 0.3s ease-out 0.8s both; }
        .clause-check-2 { animation: checkFadeIn 0.3s ease-out 1.1s both; }
        .clause-check-3 { animation: checkFadeIn 0.3s ease-out 1.4s both; }
        .clause-check-4 { animation: checkFadeIn 0.3s ease-out 1.7s both; }

        @keyframes sealPop { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
        .terms-seal { animation: sealPop 0.5s ease-out 2s both; }

        @keyframes sealBreathe { 0%, 100% { opacity: 0.85; } 50% { opacity: 1; } }
        .terms-seal-glow { animation: sealBreathe 3s ease-in-out 2.5s infinite; }
      `}</style>

      <svg viewBox="0 0 260 220" className="w-full h-full">
        <rect x="20" y="15" width="170" height="190" rx="6" fill="#132B47" stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
        <rect x="34" y="30" width="90" height="8" rx="3" fill="rgba(255,255,255,0.35)" />

        {clauses.map((c, i) => (
          <g key={i}>
            <circle cx="35" cy={c.y} r={4} fill="none" stroke="#60a5fa" strokeWidth={1.4} className={`clause-check-${i}`} />
            <path
              d={`M ${32.5} ${c.y} L ${34.5} ${c.y + 2} L ${37.5} ${c.y - 2.5}`}
              fill="none"
              stroke="#60a5fa"
              strokeWidth={1.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`clause-check-${i}`}
            />
            <line x1="48" y1={c.y} x2={48 + c.width} y2={c.y} stroke="rgba(255,255,255,0.3)" strokeWidth={3} strokeLinecap="round" className={`clause-${i}`} />
          </g>
        ))}

        <g className="terms-seal terms-seal-glow" style={{ transformOrigin: '215px 175px' }}>
          <circle cx="215" cy="175" r="22" fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.6))' }} />
          <text x="215" y="181" fill="#0A1E3D" fontSize="16" fontWeight={700} textAnchor="middle">S</text>
        </g>
      </svg>

      <p className="text-white/70 text-base text-center mt-2">
        The Terms That Govern Every Engagement
      </p>
    </div>
  );
};

export const TermsConditionsHero = () => (
  <ResourceHeroShell devLabel="Terms & Conditions">
    <ResourceHeroGrid
      heading="The Same Discipline We Bring To Strategy, We Bring To The Fine Print."
      sub="Plain terms, clearly stated — read them in full below."
      right={<TermsDocumentDiagram />}
    />
  </ResourceHeroShell>
);

// =====================================================
// MINIMAL ORBIT RING — locations on the ring, no dial
// (Version N.1 — fixed label clipping by adding canvas
//  padding + proportional container scale-up. Ring radius,
//  stroke width, and dot sizes are UNCHANGED in pixel terms.)
// =====================================================
const NewMinimalOrbitRing = () => {
  const [mounted, setMounted] = useState(false);
  const cx = 120, cy = 120, r = 78; // r unchanged — only cx/cy shifted for the new canvas
  const orbitDuration = 24;

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

  const offices = [
    { name: 'Abu Dhabi', angle: 0 },
    { name: 'Goa', angle: 22.5 },
    { name: 'Singapore', angle: 60 },
    { name: 'Boston', angle: 225 },
  ];

  return (
    // Scaled up by the exact same 1.2x factor as the viewBox (200→240),
    // so the ring itself stays pixel-identical — this box just has more
    // margin around it for the labels.
    <div className="w-[19.2rem] h-[19.2rem] sm:w-96 sm:h-96">
      <style>{`
        @keyframes orbitSpinMinimal {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .orbit-spin-minimal {
          transform-origin: 120px 120px;
          animation: orbitSpinMinimal ${orbitDuration}s linear infinite;
        }

        @keyframes officePulseOnRing {
          0%, 88%, 100% {
            r: 3.5;
            opacity: 0.7;
            filter: drop-shadow(0 0 0 rgba(96,165,250,0));
          }
          6% {
            r: 6.5;
            opacity: 1;
            filter: drop-shadow(0 0 8px rgba(96,165,250,0.9));
          }
          14% {
            r: 3.5;
            opacity: 0.7;
            filter: drop-shadow(0 0 0 rgba(96,165,250,0));
          }
        }
      `}</style>

      {mounted && (
        <svg viewBox="0 0 240 240" className="w-full h-full">
          {/* The ring itself — stroke width untouched (1) */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={1}
          />

          {/* Fixed location dots, sitting on the ring, pulsing as the orbit passes */}
          {offices.map((o) => {
            const pos = polarToCartesian(o.angle);
            const labelPos = polarToCartesian(o.angle, r + 20);
            const delay = (o.angle / 360) * orbitDuration;
            return (
              <g key={o.name}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={3.5}
                  fill="#60a5fa"
                  style={{
                    animation: `officePulseOnRing ${orbitDuration}s ease-in-out ${delay}s infinite`,
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

          {/* The single revolving dot travelling the ring */}
          <g className="orbit-spin-minimal">
            <circle
              cx={cx}
              cy={cy - r}
              r={4}
              fill="#ffffff"
              style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.85))' }}
            />
          </g>
        </svg>
      )}

      <p className="text-white/70 text-base text-center mt-4">
        Always Somewhere, Always On
      </p>
    </div>
  );
};

// =====================================================
// HERO VERSION N — Minimal Orbit Ring
// Full hero shell: dark background, diagonal grid,
// dev label, left-side copy, ring on the right.
// =====================================================
const NewHeroVersionMinimalOrbit = () => {
  return (
    <HeroShell devLabel="Version N — Minimal Orbit Ring">
      <HeroGrid
        left={
          <div className="space-y-3">
            <p className="text-2xl sm:text-3xl text-blue-300">
              One orbit, always on.
            </p>
            <p className="text-white/60 text-base">
              A minimal representation of continuous coverage — a single
              revolving marker against fixed points around the globe.
            </p>
          </div>
        }
        right={<NewMinimalOrbitRing />}
      />
    </HeroShell>
  );
};

// =====================================================
// TEST PAGE — client-only mount (bulletproofs against
// any SSR/client hydration mismatch in the SVG diagrams)
// =====================================================
export default function NewVisualsTestPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Server renders an empty main; client fills it in after mount.
  // This guarantees there is NO SSR HTML for the SVGs, so React
  // has nothing to reconcile against — no hydration mismatch possible.
  if (!mounted) {
    return <main className="min-h-screen bg-white" />;
  }

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

      {/* Original test-page visuals */}
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
      <NewHeroVersionMinimalOrbit />
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

      {/* Resources ecosystem hero diagrams */}
      <ResourcesHubHeroOptionA />
      <ResourcesHubHeroOptionB />
      <ToolsHeroSection />
      <ReportsHeroSection />
      <CaseStudiesHeroSection />
      <BlogHeroSection />

      {/* Service & legal hero diagrams */}
      <ServicesHubHeroOptionA />
      <ServicesHubHeroOptionB />
      <ServiceFoundationHero />
      <ServiceValidationHero />
      <ServiceGoToMarketHero />
      <ServiceOperationsHero />
      <ServiceFundraisingHero />
      <ServiceTurnaroundHero />
      <ServiceScaleHero />
      <CohortsHero />
      <TermsConditionsHero />
    </main>
  );
}