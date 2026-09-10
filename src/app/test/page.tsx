// components/resources-hub-hero-option-a.tsx
'use client';

import React from 'react';

/* ============================================================
   SHARED HERO SHELL & GRID
   (included here so this file is fully self-contained)
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
            <pattern
              id={gridId}
              patternUnits="userSpaceOnUse"
              width="5"
              height="5"
              patternTransform="rotate(45)"
            >
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

/* ============================================================
   RESOURCES HUB — Our Practice Branch Tree
   Root: "Our Practice"  →  five resource formats grown from it
   ============================================================ */

const PracticeBranchTree = () => {
  const rootX = 55;
  const rootY = 100;
  const leafX = 330;

  const leaves = [
    { name: 'Field Notes',   y: 25  },
    { name: 'Case Studies',  y: 65  },
    { name: 'Tools',         y: 105 },
    { name: 'Cohorts',       y: 145 },
    { name: 'Publications',  y: 185 },
  ];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes branchDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .branch-line-0 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: branchDraw 0.8s ease-out 0.15s forwards; }
        .branch-line-1 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: branchDraw 0.8s ease-out 0.35s forwards; }
        .branch-line-2 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: branchDraw 0.8s ease-out 0.55s forwards; }
        .branch-line-3 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: branchDraw 0.8s ease-out 0.75s forwards; }
        .branch-line-4 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: branchDraw 0.8s ease-out 0.95s forwards; }

        @keyframes leafReveal {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .branch-leaf-0 { animation: leafReveal 0.45s ease-out 0.85s both; }
        .branch-leaf-1 { animation: leafReveal 0.45s ease-out 1.05s both; }
        .branch-leaf-2 { animation: leafReveal 0.45s ease-out 1.25s both; }
        .branch-leaf-3 { animation: leafReveal 0.45s ease-out 1.45s both; }
        .branch-leaf-4 { animation: leafReveal 0.45s ease-out 1.65s both; }

        @keyframes rootPulse { 0%, 100% { r: 9; opacity: 0.9; } 50% { r: 12; opacity: 1; } }
        .branch-root-pulse { animation: rootPulse 2.4s ease-in-out 2s infinite; }
      `}</style>

      <svg viewBox="0 0 380 220" className="w-full h-auto">
        {/* Branch curves — root to each leaf */}
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

        {/* Leaf dot + label, sitting on the line, label end-anchored */}
        {leaves.map((leaf, i) => (
          <g
            key={`${leaf.name}-group`}
            className={`branch-leaf-${i}`}
            style={{ transformOrigin: `${leafX}px ${leaf.y}px` }}
          >
            <circle
              cx={leafX}
              cy={leaf.y}
              r={5.5}
              fill="#60a5fa"
              style={{ filter: 'drop-shadow(0 0 5px rgba(96,165,250,0.75))' }}
            />
            <text
              x={leafX - 14}
              y={leaf.y}
              fill="#93C5FD"
              fontSize="11"
              textAnchor="end"
              dominantBaseline="middle"
              style={{
                paintOrder: 'stroke',
                stroke: '#0A1E3D',
                strokeWidth: 4,
                strokeLinejoin: 'round',
              }}
            >
              {leaf.name}
            </text>
          </g>
        ))}

        {/* Root node */}
        <circle
          cx={rootX}
          cy={rootY}
          r={9}
          fill="#ffffff"
          className="branch-root-pulse"
          style={{
            transformOrigin: `${rootX}px ${rootY}px`,
            filter: 'drop-shadow(0 0 9px rgba(255,255,255,0.7))',
          }}
        />
        <text
          x={rootX}
          y={rootY + 28}
          fill="rgba(255,255,255,0.7)"
          fontSize="11"
          textAnchor="middle"
        >
          Our Practice
        </text>
        <text
          x={rootX}
          y={rootY + 43}
          fill="rgba(255,255,255,0.4)"
          fontSize="9"
          textAnchor="middle"
        >
          Where It All Comes From
        </text>
      </svg>

      <p className="text-white/70 text-base text-center mt-2">
        Every Resource Here Started As Work, Not As Content.
      </p>
    </div>
  );
};

/* ============================================================
   RESOURCES HUB — Hero export
   ============================================================ */

export const ResourcesHubHeroOptionA = () => (
  <ResourceHeroShell devLabel="Resources Hub — Our Practice, Mapped">
    <ResourceHeroGrid
      heading="Everything We Publish Starts As Work We've Actually Done."
      sub="Field notes, case studies, tools, cohorts, and publications — all grown out of the same practice, none of it written for the sake of writing."
      right={<PracticeBranchTree />}
    />
  </ResourceHeroShell>
);

export default ResourcesHubHeroOptionA;