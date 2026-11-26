'use client';

/**
 * RaiseCapitalPage.tsx
 * ─────────────────────────────────────────────────────────────────
 * INDEPENDENT layout for the Raise Capital service.
 *
 * Currently a copy of the standard service layout (same structure),
 * but it lives on its own: change anything here — sections, styles,
 * order, copy — without touching the other services.
 *
 * Content comes from ./raise-capital.data.ts
 * Payments  come from ./PurchaseModal (shared, unchanged flow).
 * ─────────────────────────────────────────────────────────────────
 */

import React, {
  useState,
  useCallback,
  useEffect,
  FC,
} from 'react';
import PurchaseModal from './PurchaseModal';
import type { RaiseCapitalData } from './raise-capital.data';

// ════════════════════════════════════════════════════════════════
// PAGE HERO — CLOSED LOOP DIAGRAM VISUAL
// ════════════════════════════════════════════════════════════════

const ClosedLoopDiagram: FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Baseline for both flat runs (with a slight hand-drawn wobble baked into the curve).
  const baseY = 150;
  // Flat 1: x 20 → 130   (length ~110)
  // Loop:   bigger circle, radius ~55, centered around (130, 95)
  //         built from 4 quarter-circle cubic curves (right half first, then left half),
  //         each with small offsets from the perfect geometry for a sketched feel
  // Flat 2: x 130 → 350  (length ~220 — roughly double flat 1)
  const pathD =
    'M 20,150 ' +
    'C 50,147 75,152 100,149 ' +
    'C 115,148 122,151 130,150 ' +
    'C 158,151 183,128 186,97 ' +
    'C 184,66 162,42 131,41 ' +
    'C 101,40 76,63 74,94 ' +
    'C 73,123 98,149 129,151 ' +
    'C 160,148 190,153 220,150 ' +
    'C 260,147 300,152 350,150';

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineClosedLoop {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .draw-line-closed-loop {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLineClosedLoop 3s ease-in-out forwards;
        }

        @keyframes loopDotPop {
          from { opacity: 0; transform: scale(0.3); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes loopDotPulse {
          0%, 100% { opacity: 0.75; }
          50%      { opacity: 1; }
        }

        .loop-dot-0 { animation: loopDotPop 0.35s ease-out 0.3s both, loopDotPulse 2.2s ease-in-out 0.65s infinite; transform-origin: 70px 149px; }
        .loop-dot-1 { animation: loopDotPop 0.35s ease-out 0.9s both, loopDotPulse 2.2s ease-in-out 1.25s infinite; transform-origin: 183px 100px; }
        .loop-dot-2 { animation: loopDotPop 0.35s ease-out 1.2s both, loopDotPulse 2.2s ease-in-out 1.55s infinite; transform-origin: 131px 41px; }
        .loop-dot-3 { animation: loopDotPop 0.35s ease-out 1.5s both, loopDotPulse 2.2s ease-in-out 1.85s infinite; transform-origin: 74px 94px; }
        .loop-dot-4 { animation: loopDotPop 0.35s ease-out 2.4s both, loopDotPulse 2.2s ease-in-out 2.75s infinite; transform-origin: 240px 149px; }

        .loop-label-0 { animation: loopDotPop 0.35s ease-out 0.35s both; }
        .loop-label-1 { animation: loopDotPop 0.35s ease-out 0.95s both; }
        .loop-label-2 { animation: loopDotPop 0.35s ease-out 1.25s both; }
        .loop-label-3 { animation: loopDotPop 0.35s ease-out 1.55s both; }
        .loop-label-4 { animation: loopDotPop 0.35s ease-out 2.45s both; }
      `}</style>

      {mounted && (
        <svg viewBox="0 0 400 210" className="w-full h-auto">
          <path
            d={pathD}
            fill="none"
            stroke="#ffffff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className="draw-line-closed-loop"
          />

          {/* Dot 1 — on the entry flat, just before the loop begins */}
          <circle cx="70" cy="149" r={4.5} fill="#60a5fa" className="loop-dot-0" style={{ filter: 'drop-shadow(0 0 5px rgba(96,165,250,0.8))' }} />
          <text x="70" y="169" fill="#93C5FD" fontSize="13" textAnchor="middle" className="loop-label-0">Assess</text>

          {/* Dot 2 — right half of the loop */}
          <circle cx="183" cy="100" r={4.5} fill="#60a5fa" className="loop-dot-1" style={{ filter: 'drop-shadow(0 0 5px rgba(96,165,250,0.8))' }} />
          <text x="200" y="104" fill="#93C5FD" fontSize="13" textAnchor="start" className="loop-label-1">Research</text>

          {/* Dot 3 — top of the loop */}
          <circle cx="131" cy="41" r={4.5} fill="#60a5fa" className="loop-dot-2" style={{ filter: 'drop-shadow(0 0 5px rgba(96,165,250,0.8))' }} />
          <text x="131" y="25" fill="#93C5FD" fontSize="13" textAnchor="middle" className="loop-label-2">Engineer</text>

          {/* Dot 4 — left half of the loop */}
          <circle cx="74" cy="94" r={4.5} fill="#60a5fa" className="loop-dot-3" style={{ filter: 'drop-shadow(0 0 5px rgba(96,165,250,0.8))' }} />
          <text x="57" y="98" fill="#93C5FD" fontSize="13" textAnchor="end" className="loop-label-3">Adapt</text>

          {/* Dot 5 — midway along the final flat extension */}
          <circle cx="240" cy="149" r={4.5} fill="#60a5fa" className="loop-dot-4" style={{ filter: 'drop-shadow(0 0 5px rgba(96,165,250,0.8))' }} />
          <text x="240" y="169" fill="#93C5FD" fontSize="13" textAnchor="middle" className="loop-label-4">Implement</text>
        </svg>
      )}

      <p className="text-white/70 text-base text-center mt-4">
        Full Circle. Strategy Engineered for Results.</p>
    </div>
  );
};

interface PageHeroProps {
  service: RaiseCapitalData;
  onBuy: () => void;
}

const PageHero: FC<PageHeroProps> = ({ service, onBuy }) => {
  const rgb = service.accentColorRgb;

  return (
    <section
      className="relative overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#0A1E3D', minHeight: '480px' }}
    >
      {/* Background pattern (exact same as blog page) */}
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

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <div className="space-y-7">
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
              </div>

              <p className="text-xs text-blue-300/70">
                {service.tagline}
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white">
                {service.title}
              </h1>

              <p className="text-base max-w-lg text-gray-400">
                {service.problemStatement}
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              {[
                { label: 'Duration', value: service.duration },
                { label: 'Format', value: service.deliveryFormat },
                { label: 'Outcome', value: service.outcome },
              ].map((m) => (
                <div key={m.label}>
                  <p className="text-xs mb-0.5 text-gray-500">{m.label}</p>
                  <p className="text-sm text-blue-300">{m.value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 flex-wrap pt-2">
              <button
                onClick={onBuy}
                className="group bg-white text-[#002855] hover:shadow-md transition-shadow w-full sm:w-auto justify-center"
                style={{
                  padding: '14px 32px',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                Get Started
              </button>
            </div>
          </div>

          <div
            className="relative h-56 sm:h-72 lg:h-[420px] flex items-center justify-center lg:justify-end"
            aria-hidden="true"
          >
            <ClosedLoopDiagram />
          </div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// CHALLENGE WE SOLVE – 80/20 SPLIT, RESPONSIVE STACK ON MOBILE
// ════════════════════════════════════════════════════════════════

const ExcerptSection: FC<{ service: RaiseCapitalData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  const ac = service.accentColor;

  return (
    <section
      className="svc-py-72"
      style={{
        backgroundColor: '#061528',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ marginBottom: '40px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 500,
            color: `rgba(${rgb},0.6)`,
          }}>
            The challenge we solve
          </span>
        </div>

        <div className="svc-flex-wrap">
          {/* Left excerpt */}
          <div className="svc-flex-left">
            <p style={{
              fontSize: 'clamp(1.15rem, 1.4vw + 0.8rem, 1.6rem)',
              fontWeight: 300,
              lineHeight: 1.35,
              color: '#C8D8EA',
              margin: 0,
            }}>
              {service.excerpt}
            </p>
          </div>

          {/* Right indices – no numbers, just bullet style */}
          <div className="svc-flex-right">
            <div style={{ marginBottom: '16px' }}>
              <span style={{
                fontSize: '13px',
                fontWeight: 500,
                color: ac,
              }}>
                Impact indices
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {service.impactIndices.map((idx, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: ac,
                    marginTop: '8px',
                    flexShrink: 0,
                  }} />
                  <p style={{ fontSize: '14px', lineHeight: 1.5, color: '#7A9ABE', margin: 0 }}>{idx}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// CORE SERVICES – RESPONSIVE GRID COLLAPSE ON MOBILE/TABLET
// ════════════════════════════════════════════════════════════════

const CoreServicesSection: FC<{ service: RaiseCapitalData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  const ac = service.accentColor;
  const services = service.coreServices;

  const cellBase: React.CSSProperties = {
    background: '#0F2647',
    borderRadius: '8px',
    padding: '28px',
    transition: 'background 0.2s, transform 0.2s',
    cursor: 'default',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const cellMuted: React.CSSProperties = {
    ...cellBase,
    background: '#0C2040',
  };

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = '#143256';
    e.currentTarget.style.transform = 'translateY(-2px)';
  };
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = (e.currentTarget as HTMLDivElement).dataset.originalBg || '#0F2647';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  const SvcText = ({ children }: { children: string }) => (
    <p style={{ fontSize: '14px', lineHeight: 1.5, color: '#C8DAEA', fontWeight: 400, margin: 0 }}>
      {children}
    </p>
  );

  return (
    <section className="svc-py-72" style={{ backgroundColor: '#0A1E3D' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ marginBottom: '48px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 500,
            color: `rgba(${rgb},0.6)`,
          }}>
            Core services — always included
          </span>
        </div>

        <div
          className="svc-core-grid lg:gap-6"
        >
          {/* Hero cell */}
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: '20px' }} className="lg:gap-6">
            <div
              style={{
                ...cellBase,
                gridRow: 'span 2',
                justifyContent: 'space-between',
                gap: 0,
                background: '#0F2647',
              }}
              data-original-bg="#0F2647"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  background: `rgba(${rgb},0.1)`,
                  fontSize: '11px',
                  fontWeight: 500,
                  color: ac,
                  marginBottom: '20px',
                }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: ac }} />
                  Mandatory
                </div>

                <h2 style={{
                  fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
                  fontWeight: 400,
                  lineHeight: 1.2,
                  color: '#E8EEF5',
                  marginBottom: '16px',
                }}>
                  What we do<br />
                  <span style={{ color: ac, fontWeight: 300 }}>in every engagement.</span>
                </h2>

                <p style={{
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: '#5A7EA0',
                }}>
                  Every client receives these services in full, in the defined sequence — without exception.
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '10px',
                paddingTop: '28px',
                marginTop: '28px',
              }}>
                <span style={{ fontSize: '40px', fontWeight: 300, color: ac, lineHeight: 1 }}>
                  {services.length}
                </span>
                <span style={{ fontSize: '16px', color: `rgba(${rgb},0.6)`, lineHeight: 1.5 }}>
                  Engagement Outcomes
                </span>
              </div>
            </div>
          </div>

          {/* Right 2x2 grid */}
          <div
            className="svc-core-right-grid lg:gap-6"
          >
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                style={idx % 2 === 1 ? { ...cellMuted } : { ...cellBase }}
                data-original-bg={idx % 2 === 1 ? '#0C2040' : '#0F2647'}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              >
                <SvcText>{services[idx]}</SvcText>
              </div>
            ))}
          </div>

          {/* Bottom row 3 items */}
          <div
            className="svc-core-bottom-grid lg:gap-6"
          >
            {[4, 5, 6].map((idx, i) => (
              <div
                key={idx}
                style={i % 2 === 1 ? { ...cellMuted } : { ...cellBase }}
                data-original-bg={i % 2 === 1 ? '#0C2040' : '#0F2647'}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              >
                <SvcText>{services[idx]}</SvcText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// DELIVERABLES – 80/20 PROPORTION, RESPONSIVE STACK ON MOBILE
// ════════════════════════════════════════════════════════════════

const DeliverablesSection: FC<{ service: RaiseCapitalData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  const ac = service.accentColor;

  return (
    <section
      className="svc-py-72"
      style={{
        backgroundColor: '#061528',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ marginBottom: '40px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 500,
            color: `rgba(${rgb},0.6)`,
          }}>
            Deliverables
          </span>
        </div>

        <div className="svc-flex-wrap">
          {/* Left – heading + count in single line */}
          <div className="svc-flex-left">
            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              color: '#E2EBF5',
              marginBottom: '24px',
            }}>
              Tangible outputs.<br />
              <span style={{ color: ac }}>Not conversations.</span>
            </h2>
            <p style={{
              fontSize: '14px',
              lineHeight: 1.7,
              color: '#4E6F8E',
              maxWidth: '480px',
              marginBottom: '32px',
            }}>
              Every engagement produces structured artefacts you own — documents, frameworks, and strategic assets that outlast the engagement.
            </p>

            {/* Single‑line count with label */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              flexWrap: 'wrap',
            }}>
              <span style={{
                fontSize: '3.5rem',
                fontWeight: 300,
                color: ac,
                lineHeight: 1,
              }}>
                {service.deliverables.length}
              </span>
              <span style={{
                fontSize: '16px',
                fontWeight: 400,
                color: `rgba(${rgb},0.7)`,
                lineHeight: 1.4,
              }}>
                Non‑negotiable deliverables
              </span>
            </div>
          </div>

          {/* Right – deliverable list */}
          <div className="svc-flex-right-wide">
            <div style={{ marginBottom: '16px' }}>
              <span style={{
                fontSize: '13px',
                fontWeight: 500,
                color: ac,
              }}>
                What you receive
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {service.deliverables.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '3px',
                    background: `rgba(${rgb},0.12)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}>
                    <img src="/assets/about/Tick.svg" alt="" />
                  </div>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: 1.5,
                    color: '#8BAAC8',
                    margin: 0,
                  }}>
                    {d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// FLEXIBLE SERVICES – already responsive via Tailwind grid classes
// ════════════════════════════════════════════════════════════════

const FlexibleServicesSection: FC<{ service: RaiseCapitalData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  if (!service.flexibleServices) return null;

  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      style={{ backgroundColor: '#0A1E3D' }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-sm mb-3 text-blue-300/70">
          Flexible services — choose up to {service.maxFlexibleSelections}
        </p>
        <h2
          className="leading-tight mb-2 text-white"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
        >
          Customise your<br />
          <span style={{ color: service.accentColor }}>engagement.</span>
        </h2>
        <p className="text-sm mb-10 max-w-lg text-gray-400">
          Select up to {service.maxFlexibleSelections} of the following services when you complete your intake form.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {service.flexibleServices.map((fs, i) => (
            <div
              key={fs.id}
              className="group cursor-default rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: '#0F2744',
                animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 50}ms both`,
              }}
            >
              <div className="px-5 py-5">
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center mb-4"
                  style={{ backgroundColor: `rgba(${rgb},0.10)` }}
                >
                  <svg className="w-4 h-4" fill="none" stroke={service.accentColor} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-sm font-medium mb-1 text-blue-300">{fs.label}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{fs.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// ROADMAP – HORIZONTAL SCROLLABLE, ALREADY MOBILE‑FRIENDLY
// ════════════════════════════════════════════════════════════════

const RoadmapSection: FC<{ service: RaiseCapitalData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  const ac = service.accentColor;

  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      style={{ backgroundColor: '#0A1E3D' }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-sm mb-3 text-blue-300/70">
          How we work together
        </p>
        <h2
          className="leading-tight mb-10 text-white"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
        >
          Customer service<br />
          <span style={{ color: ac }}>roadmap.</span>
        </h2>

        {/* Horizontal scroll container – no scrollbar visible */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="roadmap-scroll"
        >
          {service.customerServiceRoadmap.map((step, i) => (
            <div
              key={step.step}
              style={{
                flex: '0 0 280px',
                background: '#0F2647',
                borderRadius: '6px',
                padding: '24px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Progress indicator – using a colored bar instead of numbers */}
              <div style={{
                width: '40px',
                height: '4px',
                background: ac,
                borderRadius: '2px',
                marginBottom: '20px',
                opacity: 0.7 + (i * 0.1),
              }} />
              <p style={{
                fontSize: '16px',
                fontWeight: 500,
                color: '#C8DAEA',
                marginBottom: '12px',
              }}>
                {step.title}
              </p>
              <p style={{
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#7A9ABE',
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .roadmap-scroll::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 640px) {
          .roadmap-scroll > div {
            flex-basis: 240px !important;
          }
        }
      `}</style>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// TRUST STRIP – RESPONSIVE GRID COLLAPSE ON MOBILE/TABLET
// ════════════════════════════════════════════════════════════════

const FIRM_PILLARS = [
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: 'Structured methodology',
    detail: 'Proven frameworks, applied with rigour',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    label: 'Focused execution',
    detail: 'Defined scope, no scope creep, clear timelines',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    label: 'Outcome orientation',
    detail: 'Measured by decisions enabled, not hours billed',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Senior‑only teams',
    detail: 'No junior analysts on client‑facing work',
  },
];

const TrustStrip: FC<{ service: RaiseCapitalData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  const ac = service.accentColor;

  return (
    <section
      className="svc-py-64"
      style={{
        backgroundColor: '#071829',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ marginBottom: '40px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 500,
            color: `rgba(${rgb},0.6)`,
          }}>
            Why Sarsen Strategy Partners
          </span>
        </div>

        {/* No lines – each pillar stands independently with subtle rounded corners */}
        <div className="svc-trust-grid">
          {FIRM_PILLARS.map((p, i) => (
            <div
              key={i}
              style={{
                background: '#0F2647',
                borderRadius: '8px',
                padding: '28px 24px',
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#143256';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#0F2647';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                color: ac,
                marginBottom: '14px',
                opacity: 0.8,
              }}>
                {p.icon}
              </div>
              <p style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#C8D8EA',
                marginBottom: '6px',
              }}>
                {p.label}
              </p>
              <p style={{
                fontSize: '12px',
                lineHeight: 1.6,
                color: '#4E6F8E',
              }}>
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// TARGET BANNER – already responsive via Tailwind grid classes
// ════════════════════════════════════════════════════════════════

const TargetBanner: FC<{ service: RaiseCapitalData; onBuy: () => void }> = ({ service, onBuy }) => {
  const rgb = service.accentColorRgb;

  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      style={{ backgroundColor: '#0A1E3D' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-6">
          <div
            className="sm:col-span-2 rounded-md p-6 sm:p-8"
            style={{ backgroundColor: '#132B47' }}
          >
            <p className="text-sm mb-3 text-blue-300/70">
              Targeted for
            </p>
            <p className="text-lg text-white">
              {service.targetedFor}
            </p>

            {service.googleSheetsNote && (
              <div style={{
                marginTop: '20px',
                padding: '12px 16px',
                borderRadius: '6px',
                background: `rgba(${rgb},0.05)`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
              }}>
                <svg width="14" height="14" fill="none" stroke={service.accentColor} viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '2px', opacity: 0.7 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p style={{ fontSize: '12px', lineHeight: 1.6, color: '#5A7EA0', margin: 0 }}>
                  {service.googleSheetsNote}
                </p>
              </div>
            )}
          </div>

          <div
            className="rounded-md p-6 sm:p-8 flex flex-col justify-between"
            style={{
              background: `linear-gradient(145deg, rgba(${rgb},0.12) 0%, rgba(${rgb},0.04) 100%)`,
            }}
          >
            <div>
              <p className="text-sm mb-2 text-blue-300/70">
                Investment
              </p>
              <p className="text-3xl mb-1 text-white">
                {service.priceDisplay}
              </p>
              <p className="text-xs mb-2 text-gray-400">
                Taxes Included
              </p>

            </div>
            <button
              onClick={onBuy}
              className="bg-white text-[#002855] hover:shadow-md transition-shadow w-full flex items-center justify-center gap-1.5"
              style={{
                padding: '12px',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// FINAL CTA
// ════════════════════════════════════════════════════════════════

const FinalCTA: FC<{ service: RaiseCapitalData; onBuy: () => void }> = ({ service, onBuy }) => {
  const rgb = service.accentColorRgb;
  const ac = service.accentColor;

  return (
    <section
      className="svc-py-80"
      style={{
        backgroundColor: '#061528',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '48px',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ marginBottom: '20px' }}>
              <span style={{
                fontSize: '13px',
                fontWeight: 500,
                color: `rgba(${rgb},0.6)`,
              }}>
                Begin your engagement
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              color: '#E2EBF5',
              marginBottom: '16px',
              maxWidth: '560px',
            }}>
              Clarity is a strategic asset.<br />
              <span style={{ color: ac }}>Start building it today.</span>
            </h2>
            <p style={{
              fontSize: '14px',
              lineHeight: 1.7,
              color: '#4E6F8E',
              maxWidth: '480px',
            }}>
              Secure your engagement in under five minutes. Our team will reach out within 24 hours to schedule your first working session.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              marginTop: '28px',
            }}>
              {[
                'Secure payment via Razorpay',
                '24-hour response guarantee',
                'Structured engagement from day one',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `rgba(${rgb},0.15)`,
                  }}>
                    <img src="/assets/about/Tick.svg" alt="" />
                  </div>
                  <span style={{ fontSize: '12px', color: '#4E6F8E' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* <div style={{
            flexShrink: 0,
            padding: '36px',
            borderRadius: '6px',
            background: `rgba(${rgb},0.06)`,
            textAlign: 'center',
            minWidth: '240px',
          }}>
            <p style={{ fontSize: '11px', color: `rgba(${rgb},0.5)`, marginBottom: '8px' }}>
              Total investment
            </p>
            <p style={{ fontSize: '2rem', fontWeight: 300, color: '#E2EBF5', marginBottom: '4px' }}>
              {service.priceDisplay}
            </p>

            <button
              onClick={onBuy}
              style={{
                width: '100%',
                padding: '14px 24px',
                borderRadius: '6px',
                background: '#FFFFFF',
                color: '#002855',
                fontSize: '0.9rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              Begin
            </button>
            <p style={{ fontSize: '11px', color: '#2E4A63', marginTop: '12px' }}>
              Response within 24 hours
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// PAGE ROOT
// ════════════════════════════════════════════════════════════════

interface RaiseCapitalPageProps {
  service: RaiseCapitalData;
}

export default function RaiseCapitalPage({ service }: RaiseCapitalPageProps): React.JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        *::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
        html { scroll-behavior: smooth; }

        /* Improved placeholder visibility inside purchase modal */
        .purchase-modal input::placeholder,
        .purchase-modal textarea::placeholder {
          color: #475569; /* darker slate, more visible */
        }
        .purchase-modal select {
          color: #0A1E3D; /* ensure selected option text is dark blue */
        }

        /* ════════════════════════════════════════════════════════
           RESPONSIVE UTILITY CLASSES
           Base rules below mirror the ORIGINAL desktop/tablet inline
           values exactly, so laptop/tablet rendering is unchanged.
           Media queries only kick in on smaller viewports.
           ════════════════════════════════════════════════════════ */

        /* Section vertical padding */
        .svc-py-64 { padding: 64px 0; }
        .svc-py-72 { padding: 72px 0; }
        .svc-py-80 { padding: 80px 0; }

        /* 80/20 flex layouts (Excerpt & Deliverables sections) */
        .svc-flex-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 48px;
        }
        .svc-flex-left {
          flex: 1 1 70%;
          min-width: 280px;
        }
        .svc-flex-right {
          flex: 0 0 240px;
        }
        .svc-flex-right-wide {
          flex: 0 0 260px;
        }

        /* Core services grid */
        .svc-core-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .svc-core-right-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .svc-core-bottom-grid {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* Trust strip grid */
        .svc-trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        /* Purchase modal horizontal padding */
        .svc-modal-pad-h {
          padding-left: 32px;
          padding-right: 32px;
        }

        /* ── Tablet (≤1024px) ──────────────────────────────────── */
        @media (max-width: 1024px) {
          .svc-core-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ── Small tablet / large phone (≤768px) ───────────────── */
        @media (max-width: 768px) {
          .svc-trust-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .svc-flex-right,
          .svc-flex-right-wide {
            flex-basis: 220px;
          }
        }

        /* ── Mobile (≤640px) ────────────────────────────────────── */
        @media (max-width: 640px) {
          .svc-py-64,
          .svc-py-72,
          .svc-py-80 {
            padding: 40px 0;
          }

          .svc-flex-wrap {
            gap: 28px;
          }
          .svc-flex-left {
            flex: 1 1 100%;
            min-width: 0;
          }
          .svc-flex-right,
          .svc-flex-right-wide {
            flex: 1 1 100%;
          }

          .svc-core-right-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
          .svc-core-bottom-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .svc-trust-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .svc-modal-pad-h {
            padding-left: 20px;
            padding-right: 20px;
          }

          .svc-modal-footer {
            flex-wrap: wrap;
          }
          .svc-modal-actions {
            flex-direction: column-reverse;
          }
          .svc-modal-actions > button,
          .svc-modal-actions > a {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
        }

        /* ── Very small phones (≤420px) ─────────────────────────── */
        @media (max-width: 420px) {
          .svc-core-right-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main style={{ backgroundColor: "#0A1E3D", minHeight: "100vh" }}>
        {service && (
          <>
            <PageHero service={service} onBuy={openModal} />
            <ExcerptSection service={service} />
            <CoreServicesSection service={service} />
            <DeliverablesSection service={service} />
            {service.flexibleServices && <FlexibleServicesSection service={service} />}
            <RoadmapSection service={service} />
            <TrustStrip service={service} />
            <TargetBanner service={service} onBuy={openModal} />
            <FinalCTA service={service} onBuy={openModal} />
          </>
        )}
      </main>

      <PurchaseModal service={service} isOpen={modalOpen} onClose={closeModal} />
    </>
  );
}
