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
 *
 * ADDED (Raise Capital only):
 *   • ListApproachSection   – "Your investor list is the worst fundraising strategy"
 *   • SCurveSection         – Day 0 (lower-left) → Day 21 (upper-right) S-curve
 *   • ProgramStructureSection – the 3 program phases from the brochure
 *   • LearningBentoSection  – founder fundraising mistakes + how Sarsen works
 * All existing sections are kept unchanged.
 * ─────────────────────────────────────────────────────────────────
 */

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  FC,
} from 'react';
import PurchaseModal from './PurchaseModal';
import type { RaiseCapitalData, SCurveStage } from './raise-capital.data';

// ════════════════════════════════════════════════════════════════
// SHARED ICONS — tick / cross with a FIXED icon size, so the tick
// never renders at the SVG file's natural (oversized) dimensions.
// ════════════════════════════════════════════════════════════════

const TickBox: FC<{ size?: number; bg?: string; marginTop?: number }> = ({
  size = 18,
  bg = 'rgba(255,255,255,0.12)',
  marginTop = 1,
}) => {
  const icon = Math.round(size * 0.6);
  return (
    <span
      aria-hidden="true"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        borderRadius: '3px',
        background: bg,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: `${marginTop}px`,
      }}
    >
      <img
        src="/assets/about/Tick.svg"
        alt=""
        width={icon}
        height={icon}
        style={{ width: `${icon}px`, height: `${icon}px`, maxWidth: 'none', display: 'block', objectFit: 'contain' }}
      />
    </span>
  );
};

const CrossBox: FC<{ size?: number }> = ({ size = 18 }) => (
  <span
    aria-hidden="true"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      minWidth: `${size}px`,
      borderRadius: '3px',
      background: 'rgba(248,113,113,0.12)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      marginTop: '1px',
    }}
  >
    <svg width={Math.round(size / 2)} height={Math.round(size / 2)} viewBox="0 0 10 10" fill="none" stroke="#FCA5A5" strokeWidth={1.8} strokeLinecap="round">
      <path d="M2 2l6 6M8 2l-6 6" />
    </svg>
  </span>
);

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

              {/* Program name (from brochure) */}
              {service.programName && (
                <p className="text-lg sm:text-xl text-blue-300">
                  {service.programName}
                </p>
              )}

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
// NEW — YOUR INVESTOR LIST IS THE WORST FUNDRAISING STRATEGY
// (brochure page 1: "Results will look like this")
// ════════════════════════════════════════════════════════════════

const ListApproachSection: FC<{ service: RaiseCapitalData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  const results = service.listApproachResults;
  if (!results || results.length === 0) return null;

  return (
    <section className="svc-py-72" style={{ backgroundColor: '#0A1E3D' }}>
      <style>{`
        .rc-results-banner {
          background: #0F2647;
          border-radius: 10px;
          padding: 32px;
          margin-bottom: 40px;
        }
        .rc-results-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .rc-result-card {
          border: 1.5px solid rgba(255,255,255,0.16);
          border-radius: 10px;
          padding: 24px 28px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .rc-result-card:hover {
          border-color: rgba(147,197,253,0.5);
          transform: translateY(-2px);
        }
        .rc-result-card.rc-align-right { text-align: right; }
        @media (max-width: 640px) {
          .rc-results-banner { padding: 22px; margin-bottom: 28px; }
          .rc-results-grid { grid-template-columns: 1fr; gap: 14px; }
          .rc-result-card.rc-align-right { text-align: left; }
          .rc-result-card { padding: 20px; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rc-results-banner">
          <p style={{
            fontSize: 'clamp(1.3rem, 2vw, 1.75rem)',
            fontWeight: 500,
            color: '#E8EEF5',
            margin: '0 0 10px',
            lineHeight: 1.25,
          }}>
            Your investor list is the worst fundraising strategy.
          </p>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#7A9ABE', margin: 0, maxWidth: '640px' }}>
            Building a list of investors, emailing them, and expecting a cheque at the end is almost certainly a recipe for failure.
          </p>
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '13px',
          fontWeight: 500,
          color: `rgba(${rgb},0.6)`,
          marginBottom: '24px',
        }}>
          Results will look like this
        </p>

        <div className="rc-results-grid">
          {results.map((r, i) => (
            <div key={r.title} className={`rc-result-card${i % 2 === 0 ? ' rc-align-right' : ''}`}>
              <p style={{ fontSize: '18px', fontWeight: 500, color: '#E2EBF5', margin: '0 0 8px' }}>
                {r.title}
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#7A9ABE', margin: 0 }}>
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════════════
// NEW — S-CURVE: DAY 0 (LOWER-LEFT END) → DAY 21 (UPPER-RIGHT END)
//
// • The line + dots are SVG (they scale with the viewBox).
// • ALL text is HTML positioned on top of the SVG in percentages,
//   so font sizes stay readable on phone, tablet and laptop.
// • Line thickness is set in CSS: thick on desktop, thinner on
//   tablet, a simple line on phones.
// ════════════════════════════════════════════════════════════════

const S_CURVE_PATH =
  'M 30,480 ' +
  'C 160,482 260,478 340,462 ' +
  'C 420,446 470,400 520,330 ' +
  'C 570,255 610,170 670,120 ' +
  'C 730,72 820,62 970,60';

const SC_VB_W = 1000;
const SC_VB_H = 560;

interface Pt { x: number; y: number; }

interface SCurveGeo {
  stages: (Pt & { r: number })[];
  start: Pt;
  end: Pt;
  brackets: { d: string; label: string; lx: number; ly: number; angle: number }[];
  gapCircle: { cx: number; cy: number; r: number } | null;
  fading: { x1: number; x2: number; y: number } | null;
}

type OverlayAlign =
  | 'below' | 'above' | 'right' | 'left' | 'center'
  | 'belowStart' | 'belowEnd' | 'aboveEnd';

const OVERLAY_TRANSFORM: Record<OverlayAlign, string> = {
  below: 'translate(-50%, 0)',
  above: 'translate(-50%, -100%)',
  right: 'translate(0, -50%)',
  left: 'translate(-100%, -50%)',
  center: 'translate(-50%, -50%)',
  belowStart: 'translate(0, 0)',
  belowEnd: 'translate(-100%, 0)',
  aboveEnd: 'translate(-100%, -100%)',
};

const OVERLAY_TEXT_ALIGN: Record<OverlayAlign, React.CSSProperties['textAlign']> = {
  below: 'center',
  above: 'center',
  right: 'left',
  left: 'right',
  center: 'center',
  belowStart: 'left',
  belowEnd: 'right',
  aboveEnd: 'right',
};

/** HTML text pinned to a point in SVG user units. */
const ScOverlay: FC<{
  x: number;
  y: number;
  align: OverlayAlign;
  text: string;
  className: string;
  rotate?: number;
  delay?: number;
}> = ({ x, y, align, text, className, rotate, delay }) => (
  <div
    className={`rc-sc-ov ${className}`}
    style={{
      left: `${(x / SC_VB_W) * 100}%`,
      top: `${(y / SC_VB_H) * 100}%`,
      transform: OVERLAY_TRANSFORM[align] + (rotate !== undefined ? ` rotate(${rotate}deg)` : ''),
      textAlign: OVERLAY_TEXT_ALIGN[align],
      animationDelay: delay !== undefined ? `${delay}s` : undefined,
    }}
  >
    {text.split('\n').map((ln, i) => (
      <span key={i} style={{ display: 'block' }}>{ln}</span>
    ))}
  </div>
);

const stageOverlay = (stage: SCurveStage, p: Pt & { r: number }) => {
  const gap = p.r + 10;
  const nx = stage.nudgeX ?? 0;
  const ny = stage.nudgeY ?? 0;
  switch (stage.place) {
    case 'below': return { x: p.x + nx, y: p.y + gap + ny, align: 'below' as const };
    case 'above': return { x: p.x + nx, y: p.y - gap + ny, align: 'above' as const };
    case 'left':  return { x: p.x - gap + nx, y: p.y + ny, align: 'left' as const };
    case 'right':
    default:      return { x: p.x + gap + nx, y: p.y + ny, align: 'right' as const };
  }
};

const SCurveSection: FC<{ service: RaiseCapitalData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  const data = service.sCurve;

  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [geo, setGeo] = useState<SCurveGeo | null>(null);
  const [inView, setInView] = useState(false);

  // Measure the real path so dots and labels sit exactly on the line
  useEffect(() => {
    const p = pathRef.current;
    if (!p || !data || typeof p.getTotalLength !== 'function') return;

    const L = p.getTotalLength();
    const at = (f: number): Pt => {
      const q = p.getPointAtLength(L * Math.min(1, Math.max(0, f)));
      return { x: q.x, y: q.y };
    };
    const frame = (f: number) => {
      const a = at(f - 0.004);
      const b = at(f + 0.004);
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      const tx = dx / len;
      const ty = dy / len;
      // normal pointing to the upper-left side of the curve
      return { tx, ty, nx: ty, ny: -tx };
    };

    const stages = data.stages.map((s, i) => ({ ...at(s.at), r: 7 + i * 1.2 }));

    const brackets = data.brackets.map(({ from, to, label }) => {
      const off = 44;
      const pts: string[] = [];
      for (let i = 0; i <= 28; i++) {
        const f = from + ((to - from) * i) / 28;
        const q = at(f);
        const n = frame(f);
        pts.push(`${(q.x + n.nx * off).toFixed(1)},${(q.y + n.ny * off).toFixed(1)}`);
      }
      const fm = (from + to) / 2;
      const qm = at(fm);
      const nm = frame(fm);
      return {
        d: 'M ' + pts.join(' L '),
        label,
        lx: qm.x + nm.nx * (off + 16),
        ly: qm.y + nm.ny * (off + 16),
        angle: (Math.atan2(nm.ty, nm.tx) * 180) / Math.PI,
      };
    });

    const gapCircle = stages[0] ? { cx: stages[0].x, cy: stages[0].y - 58, r: 58 } : null;
    const fading = stages[1] ? { x1: stages[1].x, x2: 830, y: stages[1].y } : null;

    setGeo({ stages, start: at(0), end: at(1), brackets, gapCircle, fading });
  }, [data]);

  // Start the drawing animation when the curve scrolls into view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return; }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!data) return null;

  return (
    <section className="svc-py-80 rc-sc-section" style={{ backgroundColor: '#061528' }}>
      <style>{`
        .rc-sc-section { overflow-x: clip; }

        .rc-sc-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          grid-template-areas:
            "head  end"
            "curve curve"
            "start note";
          gap: 28px 48px;
          align-items: end;
        }
        .rc-sc-head  { grid-area: head; align-self: start; }
        .rc-sc-end   { grid-area: end; justify-self: end; max-width: 460px; width: 100%; }
        .rc-sc-curve { grid-area: curve; min-width: 0; }
        .rc-sc-start { grid-area: start; max-width: 460px; width: 100%; align-self: start; }
        .rc-sc-note  { grid-area: note; align-self: start; justify-self: end; max-width: 420px; }

        .rc-sc-card {
          border: 1.5px solid rgba(255,255,255,0.16);
          border-radius: 10px;
          padding: 24px 26px;
          background: #0A1E3D;
        }
        .rc-sc-card.rc-sc-card-end {
          border-color: rgba(147,197,253,0.45);
          background: linear-gradient(145deg, rgba(96,165,250,0.10) 0%, rgba(96,165,250,0.02) 100%);
        }

        /* Curve figure: SVG + HTML text layer of identical size */
        .rc-sc-figure { position: relative; width: 100%; }
        .rc-sc-figure svg { display: block; width: 100%; height: auto; overflow: visible; }

        /* Line thickness — desktop / laptop */
        .rc-sc-main  { stroke-width: 14px; }
        .rc-sc-glow  { stroke-width: 30px; }
        .rc-sc-fade  { stroke-width: 1.5px; }
        .rc-sc-guide { stroke-width: 1.2px; }

        /* HTML text layer */
        .rc-sc-ov {
          position: absolute;
          white-space: nowrap;
          pointer-events: none;
          line-height: 1.3;
          letter-spacing: 0.06em;
        }
        .rc-sc-lbl   { font-size: clamp(10px, 1.05vw, 13px); font-weight: 600; color: #93C5FD; }
        .rc-sc-small { font-size: clamp(9px, 0.9vw, 11px);   font-weight: 600; color: #93C5FD; }
        .rc-sc-fadel { font-size: clamp(9px, 0.95vw, 12px);  font-weight: 600; color: rgba(147,197,253,0.7); }
        .rc-sc-day   { font-size: clamp(11px, 1.1vw, 14px);  font-weight: 700; color: #E2EBF5; }
        .rc-sc-ctitle{ font-size: clamp(13px, 2vw, 24px);    font-weight: 700; color: #E2EBF5; letter-spacing: 0.04em; line-height: 1.25; }
        .rc-sc-brk   { font-size: clamp(9px, 0.95vw, 12px);  font-weight: 600; color: #93C5FD; letter-spacing: 0.12em; }

        /* Animation */
        @keyframes rcScDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes rcScPop  { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }
        @keyframes rcScFade { from { opacity: 0; } to { opacity: 1; } }

        .rc-sc-line { stroke-dasharray: 1; stroke-dashoffset: 1; }
        .rc-sc-play .rc-sc-line { animation: rcScDraw 2.6s ease-in-out forwards; }

        .rc-sc-dot, .rc-sc-ov, .rc-sc-extra { opacity: 0; }
        .rc-sc-play .rc-sc-dot   { animation: rcScPop 0.4s ease-out both; transform-box: fill-box; transform-origin: center; }
        .rc-sc-play .rc-sc-ov    { animation: rcScFade 0.5s ease-out both; }
        .rc-sc-play .rc-sc-extra { animation: rcScFade 0.8s ease-out both; }

        .rc-sc-mobile { display: none; }

        @media (prefers-reduced-motion: reduce) {
          .rc-sc-line { stroke-dashoffset: 0; animation: none !important; }
          .rc-sc-dot, .rc-sc-ov, .rc-sc-extra { opacity: 1; animation: none !important; }
        }

        /* ── Tablet (≤1024px) ─────────────────────────────────── */
        @media (max-width: 1024px) {
          .rc-sc-main { stroke-width: 9px; }
          .rc-sc-glow { stroke-width: 20px; }
          .rc-sc-fade { stroke-width: 2px; }
          .rc-sc-guide { stroke-width: 1.6px; }
        }

        /* ── Small tablet (≤900px): stack the layout ──────────── */
        @media (max-width: 900px) {
          .rc-sc-layout {
            grid-template-columns: minmax(0, 1fr);
            grid-template-areas: "head" "start" "curve" "end" "note";
            gap: 24px;
          }
          .rc-sc-end, .rc-sc-start, .rc-sc-note {
            justify-self: stretch;
            max-width: none;
          }
        }

        /* ── Phone (≤640px): simple line, list instead of labels ─ */
        @media (max-width: 640px) {
          .rc-sc-main { stroke-width: 5px; }
          .rc-sc-glow { display: none; }
          .rc-sc-fade { stroke-width: 3px; }
          .rc-sc-hide-sm { display: none; }
          .rc-sc-mobile { display: block; }
          .rc-sc-card { padding: 20px; }
          .rc-sc-day { font-size: 10px; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rc-sc-layout">

          {/* Heading — top-left (the empty space of the S) */}
          <div className="rc-sc-head">
            <span style={{ fontSize: '13px', fontWeight: 500, color: `rgba(${rgb},0.6)` }}>
              {data.eyebrow}
            </span>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              color: '#E2EBF5',
              margin: '16px 0 14px',
            }}>
              {data.heading}<br />
              <span style={{ color: '#93C5FD' }}>{data.headingAccent}</span>
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#5A7EA0', maxWidth: '460px', margin: 0 }}>
              {data.intro}
            </p>
          </div>

          {/* UPPER-RIGHT END — where you finish */}
          <div className="rc-sc-end">
            <div className="rc-sc-card rc-sc-card-end">
              <EndCardHeader day={data.end.day} caption={data.end.caption} highlight />
              <p style={{ fontSize: '18px', fontWeight: 500, color: '#E8EEF5', margin: '0 0 14px', lineHeight: 1.3 }}>
                {data.end.title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {data.end.points.map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <TickBox size={18} bg="rgba(147,197,253,0.15)" />
                    <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: '#C8DAEA', margin: 0 }}>{pt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* THE CURVE */}
          <div className="rc-sc-curve">
            <div
              ref={wrapRef}
              className={`rc-sc-figure${inView ? ' rc-sc-play' : ''}`}
              role="img"
              aria-label={`S-curve from ${data.start.day}: ${data.start.title}, to ${data.end.day}: ${data.end.title}`}
            >
              <svg viewBox={`0 0 ${SC_VB_W} ${SC_VB_H}`} aria-hidden="true">
                <defs>
                  <linearGradient id="rc-sc-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2F6BC4" />
                    <stop offset="45%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#93C5FD" />
                  </linearGradient>
                  <radialGradient id="rc-sc-pearl" cx="38%" cy="32%" r="70%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="55%" stopColor="#E2E8F0" />
                    <stop offset="100%" stopColor="#94A3B8" />
                  </radialGradient>
                </defs>

                {/* Fading signal — the investor-list route */}
                {geo?.fading && (
                  <line
                    x1={geo.fading.x1}
                    y1={geo.fading.y}
                    x2={geo.fading.x2}
                    y2={geo.fading.y}
                    stroke="rgba(147,197,253,0.45)"
                    strokeDasharray="2 5"
                    strokeLinecap="round"
                    className="rc-sc-extra rc-sc-fade"
                    style={{ animationDelay: '1.2s' }}
                  />
                )}

                {/* Readiness gap circle (mirrors the "hype cycle" loop) */}
                {geo?.gapCircle && (
                  <circle
                    cx={geo.gapCircle.cx}
                    cy={geo.gapCircle.cy}
                    r={geo.gapCircle.r}
                    fill="none"
                    stroke="rgba(147,197,253,0.55)"
                    strokeDasharray="2 4"
                    className="rc-sc-extra rc-sc-guide rc-sc-hide-sm"
                    style={{ animationDelay: '0.6s' }}
                  />
                )}

                {/* Align / Accelerate brackets along the steep part */}
                {geo?.brackets.map((b, i) => (
                  <path
                    key={b.label}
                    d={b.d}
                    fill="none"
                    stroke="rgba(147,197,253,0.55)"
                    strokeDasharray="2 4"
                    className="rc-sc-extra rc-sc-guide rc-sc-hide-sm"
                    style={{ animationDelay: `${1.4 + i * 0.5}s` }}
                  />
                ))}

                {/* Soft glow under the main curve */}
                <path
                  d={S_CURVE_PATH}
                  fill="none"
                  stroke="rgba(59,130,246,0.18)"
                  strokeLinecap="round"
                  pathLength={1}
                  className="rc-sc-line rc-sc-glow"
                />
                {/* Main curve (also measured for dot placement) */}
                <path
                  ref={pathRef}
                  d={S_CURVE_PATH}
                  fill="none"
                  stroke="url(#rc-sc-grad)"
                  strokeLinecap="round"
                  pathLength={1}
                  className="rc-sc-line rc-sc-main"
                />

                {/* Stage dots */}
                {geo?.stages.map((p, i) => (
                  <circle
                    key={data.stages[i].label}
                    cx={p.x}
                    cy={p.y}
                    r={p.r}
                    fill="url(#rc-sc-pearl)"
                    className="rc-sc-dot"
                    style={{
                      animationDelay: `${0.3 + data.stages[i].at * 2.4}s`,
                      filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.45))',
                    }}
                  />
                ))}
              </svg>

              {/* ── HTML text layer ── */}
              <ScOverlay
                x={330} y={210} align="center"
                text={data.centerTitle}
                className="rc-sc-ctitle rc-sc-hide-sm"
                delay={0.4}
              />

              {geo && (
                <>
                  <ScOverlay
                    x={geo.start.x} y={geo.start.y + 24} align="belowStart"
                    text={data.start.day.toUpperCase()}
                    className="rc-sc-day"
                    delay={0.2}
                  />
                  <ScOverlay
                    x={geo.end.x} y={geo.end.y + 22} align="belowEnd"
                    text={data.end.day.toUpperCase()}
                    className="rc-sc-day"
                    delay={2.6}
                  />

                  {geo.fading && (
                    <ScOverlay
                      x={geo.fading.x2} y={geo.fading.y + 16} align="belowEnd"
                      text={data.fadingLabel}
                      className="rc-sc-fadel rc-sc-hide-sm"
                      delay={1.3}
                    />
                  )}

                  {geo.gapCircle && (
                    <ScOverlay
                      x={geo.gapCircle.cx} y={geo.gapCircle.cy} align="center"
                      text={data.gapCircleLabel}
                      className="rc-sc-small rc-sc-hide-sm"
                      delay={0.7}
                    />
                  )}

                  {geo.brackets.map((b, i) => (
                    <ScOverlay
                      key={b.label}
                      x={b.lx} y={b.ly} align="center"
                      rotate={b.angle}
                      text={b.label}
                      className="rc-sc-brk rc-sc-hide-sm"
                      delay={1.5 + i * 0.5}
                    />
                  ))}

                  {geo.stages.map((p, i) => {
                    const s = data.stages[i];
                    const pos = stageOverlay(s, p);
                    return (
                      <ScOverlay
                        key={s.label}
                        x={pos.x} y={pos.y} align={pos.align}
                        text={s.label}
                        className="rc-sc-lbl rc-sc-hide-sm"
                        delay={0.4 + s.at * 2.4}
                      />
                    );
                  })}
                </>
              )}
            </div>

            {/* Phone: stage list instead of labels on the curve */}
            <ol className="rc-sc-mobile" style={{ listStyle: 'none', padding: 0, margin: '20px 0 0' }}>
              {data.stages.map((s, i) => (
                <li key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '7px 0' }}>
                  <span style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: 'rgba(147,197,253,0.15)', color: '#93C5FD',
                    fontSize: '12px', fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', color: '#C8DAEA' }}>
                    {s.label.replace(/\n/g, ' ')}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* LOWER-LEFT END — where you start */}
          <div className="rc-sc-start">
            <div className="rc-sc-card">
              <EndCardHeader day={data.start.day} caption={data.start.caption} />
              <p style={{ fontSize: '18px', fontWeight: 500, color: '#E8EEF5', margin: '0 0 14px', lineHeight: 1.3 }}>
                {data.start.title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {data.start.points.map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CrossBox />
                    <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: '#8BAAC8', margin: 0 }}>{pt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Note on the fading line */}
          <div className="rc-sc-note">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <svg width="40" height="4" aria-hidden="true">
                <line x1="1" y1="2" x2="39" y2="2" stroke="rgba(147,197,253,0.6)" strokeWidth={1.5} strokeDasharray="2 4" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#93C5FD' }}>Investor-list route</span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#5A7EA0', margin: 0 }}>
              {data.fadingNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const EndCardHeader: FC<{ day: string; caption: string; highlight?: boolean }> = ({ day, caption, highlight }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      borderRadius: '6px',
      padding: '4px 10px',
      background: highlight ? 'rgba(147,197,253,0.18)' : 'rgba(255,255,255,0.08)',
      fontSize: '11px',
      fontWeight: 600,
      color: highlight ? '#BFDBFE' : '#C8D8EA',
    }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: highlight ? '#93C5FD' : '#7A9ABE' }} />
      {day}
    </span>
    <span style={{ fontSize: '12px', color: '#5A7EA0' }}>{caption}</span>
  </div>
);

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
                  <TickBox size={20} bg={`rgba(${rgb},0.12)`} marginTop={1} />
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
// NEW — PROGRAM STRUCTURE (brochure page 3)
// ════════════════════════════════════════════════════════════════

const ProgramStructureSection: FC<{ service: RaiseCapitalData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  const phases = service.programStructure;
  if (!phases || phases.length === 0) return null;

  return (
    <section className="svc-py-72" style={{ backgroundColor: '#0A1E3D' }}>
      <style>{`
        .rc-phase-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .rc-phase-card {
          border: 1.5px solid rgba(255,255,255,0.14);
          border-radius: 10px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s, transform 0.2s;
        }
        .rc-phase-card:hover {
          border-color: rgba(147,197,253,0.45);
          transform: translateY(-2px);
        }
        @media (max-width: 1024px) {
          .rc-phase-grid { grid-template-columns: repeat(2, 1fr); }
          .rc-phase-card:last-child { grid-column: span 2; }
        }
        @media (max-width: 720px) {
          .rc-phase-grid { grid-template-columns: 1fr; gap: 14px; }
          .rc-phase-card:last-child { grid-column: span 1; }
        }
        @media (max-width: 640px) {
          .rc-phase-card { padding: 22px; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '13px', fontWeight: 500, color: `rgba(${rgb},0.6)` }}>
            Program structure
          </span>
        </div>
        <h2 style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          fontWeight: 300,
          lineHeight: 1.2,
          color: '#E2EBF5',
          marginBottom: '40px',
        }}>
          How the {service.programName || 'program'}<br />
          <span style={{ color: '#93C5FD' }}>runs, phase by phase.</span>
        </h2>

        <div className="rc-phase-grid">
          {phases.map((ph) => (
            <div key={ph.step} className="rc-phase-card">
              <span style={{
                alignSelf: 'flex-start',
                borderRadius: '6px',
                padding: '4px 10px',
                background: 'rgba(147,197,253,0.12)',
                fontSize: '11px',
                fontWeight: 600,
                color: '#BFDBFE',
                marginBottom: '18px',
              }}>
                {ph.step}
              </span>
              <p style={{ fontSize: '18px', fontWeight: 500, color: '#E8EEF5', margin: '0 0 10px', lineHeight: 1.3 }}>
                {ph.title}
              </p>
              <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: '#7A9ABE', margin: '0 0 18px' }}>
                {ph.description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: ph.callout ? '22px' : 0 }}>
                {ph.points.map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: '#93C5FD', marginTop: '8px', flexShrink: 0,
                    }} />
                    <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#C8DAEA', margin: 0 }}>{pt}</p>
                  </div>
                ))}
              </div>

              {ph.callout && (
                <div style={{
                  marginTop: 'auto',
                  borderRadius: '8px',
                  background: '#0F2647',
                  padding: '16px 18px',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: '2rem', fontWeight: 300, color: '#E2EBF5', lineHeight: 1 }}>
                    {ph.callout.stat}
                  </span>
                  <p style={{ fontSize: '12.5px', lineHeight: 1.6, color: '#7A9ABE', margin: 0 }}>
                    {ph.callout.text}
                  </p>
                </div>
              )}
            </div>
          ))}
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
  const ac = service.accentColor;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

  const updateState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
    setProgress(max > 0 ? el.scrollLeft / max : 1);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateState();

    // Vertical mouse wheel → horizontal scroll (only while there is room to move,
    // so the page still scrolls normally once the row reaches either end)
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = el.scrollLeft >= max - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('scroll', updateState, { passive: true });
    window.addEventListener('resize', updateState);
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', updateState);
      window.removeEventListener('resize', updateState);
    };
  }, [updateState]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.roadmap-card');
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  // Click-and-drag with the mouse (touch keeps native swipe)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { active: true, moved: false, startX: e.clientX, startScroll: el.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = scrollerRef.current;
    if (!d.active || !el) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
      el.setPointerCapture(e.pointerId);
    }
    if (d.moved) el.scrollLeft = d.startScroll - dx;
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = scrollerRef.current;
    if (!d.active) return;
    d.active = false;
    if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    setDragging(false);
  };
  // Block the click that follows a drag
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollByCard(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByCard(-1); }
  };

  const showControls = canPrev || canNext;

  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      style={{ backgroundColor: '#0A1E3D' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="roadmap-head">
          <div>
            <p className="text-sm mb-3 text-blue-300/70">
              How we work together
            </p>
            <h2
              className="leading-tight text-white"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
            >
              Customer service<br />
              <span style={{ color: ac }}>roadmap.</span>
            </h2>
          </div>

          {showControls && (
            <div className="roadmap-arrows">
              <button
                type="button"
                aria-label="Previous step"
                onClick={() => scrollByCard(-1)}
                disabled={!canPrev}
                className="roadmap-arrow"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button
                type="button"
                aria-label="Next step"
                onClick={() => scrollByCard(1)}
                disabled={!canNext}
                className="roadmap-arrow"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          )}
        </div>

        {/* Horizontal scroll: swipe (touch), drag / wheel / arrows (mouse), ← → keys */}
        <div
          ref={scrollerRef}
          className={`roadmap-scroll${dragging ? ' is-dragging' : ''}`}
          tabIndex={0}
          role="region"
          aria-label="Customer service roadmap steps"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          onKeyDown={onKeyDown}
          onDragStart={(e) => e.preventDefault()}
        >
          {service.customerServiceRoadmap.map((step, i) => (
            <div key={step.step} className="roadmap-card">
              {/* Progress indicator – using a colored bar instead of numbers */}
              <div style={{
                width: '40px',
                height: '4px',
                background: ac,
                borderRadius: '2px',
                marginBottom: '20px',
                opacity: Math.min(1, 0.7 + (i * 0.1)),
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
                margin: 0,
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {showControls && (
          <div className="roadmap-progress" aria-hidden="true">
            <div style={{ width: `${Math.max(12, progress * 100)}%` }} />
          </div>
        )}
      </div>
      <style>{`
        .roadmap-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 40px;
        }
        .roadmap-arrows { display: flex; gap: 10px; flex-shrink: 0; }
        .roadmap-arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(147,197,253,0.35);
          background: transparent;
          color: #C8DAEA;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, opacity 0.2s;
        }
        .roadmap-arrow:hover:not(:disabled) {
          background: rgba(147,197,253,0.12);
          border-color: rgba(147,197,253,0.7);
        }
        .roadmap-arrow:disabled { opacity: 0.3; cursor: default; }
        .roadmap-arrow:focus-visible { outline: 2px solid #93C5FD; outline-offset: 2px; }

        .roadmap-scroll {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 6px 0 10px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-snap-type: x mandatory;
          scroll-padding-left: 0;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-x pan-y;
          cursor: grab;
          user-select: none;
          -webkit-user-select: none;
        }
        .roadmap-scroll:focus-visible { outline: 2px solid rgba(147,197,253,0.6); outline-offset: 4px; border-radius: 6px; }
        .roadmap-scroll.is-dragging { cursor: grabbing; scroll-snap-type: none; }
        .roadmap-scroll.is-dragging .roadmap-card { pointer-events: none; }
        .roadmap-scroll::-webkit-scrollbar { display: none; }

        .roadmap-card {
          flex: 0 0 280px;
          background: #0F2647;
          border-radius: 6px;
          padding: 24px;
          scroll-snap-align: start;
          transition: transform 0.2s, background 0.2s;
        }
        @media (hover: hover) {
          .roadmap-card:hover { transform: translateY(-4px); background: #143256; }
        }

        .roadmap-progress {
          margin-top: 18px;
          height: 3px;
          border-radius: 2px;
          background: rgba(147,197,253,0.12);
          overflow: hidden;
        }
        .roadmap-progress > div {
          height: 100%;
          background: #93C5FD;
          border-radius: 2px;
          transition: width 0.15s linear;
        }

        @media (max-width: 1024px) {
          .roadmap-card { flex-basis: 260px; }
        }
        @media (max-width: 640px) {
          .roadmap-head { margin-bottom: 28px; }
          .roadmap-arrows { display: none; }
          .roadmap-scroll { gap: 14px; }
          .roadmap-card { flex-basis: 80%; padding: 20px; }
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
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          <div
            className="md:col-span-2 rounded-md p-6 sm:p-8"
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
// NEW — LEARNING BENTO: GENERAL MISTAKES FOUNDERS MAKE WHILE
// FUNDRAISING + HOW SARSEN WORKS (flat fee, associate, referral)
// ════════════════════════════════════════════════════════════════

const LearningBentoSection: FC<{ service: RaiseCapitalData }> = ({ service }) => {
  const rgb = service.accentColorRgb;
  const cards = service.learningPoints;
  if (!cards || cards.length === 0) return null;

  return (
    <section className="svc-py-72" style={{ backgroundColor: '#061528' }}>
      <style>{`
        .rc-bento {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 20px;
        }
        .rc-bento-card {
          border: 1.5px solid rgba(255,255,255,0.14);
          border-radius: 10px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s, transform 0.2s;
        }
        .rc-bento-card:hover {
          border-color: rgba(147,197,253,0.45);
          transform: translateY(-2px);
        }
        .rc-bento-hero  { grid-column: span 4; grid-row: span 2; background: #0A1E3D; }
        .rc-bento-tall  { grid-column: span 2; grid-row: span 2; background: #0A1E3D; }
        .rc-bento-small { grid-column: span 2; background: #0F2647; border-color: transparent; }

        @media (max-width: 1024px) {
          .rc-bento { grid-template-columns: repeat(2, 1fr); }
          .rc-bento-hero { grid-column: span 2; grid-row: auto; }
          .rc-bento-tall { grid-column: span 2; grid-row: auto; }
          .rc-bento-small { grid-column: span 1; }
          .rc-bento-small:last-child { grid-column: span 2; }
        }
        @media (max-width: 640px) {
          .rc-bento { grid-template-columns: 1fr; gap: 14px; }
          .rc-bento-hero, .rc-bento-tall, .rc-bento-small,
          .rc-bento-small:last-child { grid-column: span 1; }
          .rc-bento-card { padding: 22px; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '13px', fontWeight: 500, color: `rgba(${rgb},0.6)` }}>
            Before you raise
          </span>
        </div>
        <h2 style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          fontWeight: 300,
          lineHeight: 1.2,
          color: '#E2EBF5',
          marginBottom: '40px',
        }}>
          Mistakes founders make<br />
          <span style={{ color: '#93C5FD' }}>while fundraising.</span>
        </h2>

        <div className="rc-bento">
          {cards.map((c) => {
            const isMistake = c.tone === 'mistake';
            return (
              <div key={c.id} className={`rc-bento-card rc-bento-${c.size}`}>
                <span style={{
                  alignSelf: 'flex-start',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  background: isMistake ? 'rgba(248,113,113,0.12)' : 'rgba(147,197,253,0.12)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: isMistake ? '#FCA5A5' : '#BFDBFE',
                  marginBottom: '18px',
                }}>
                  <span style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: isMistake ? '#FCA5A5' : '#93C5FD',
                  }} />
                  {c.eyebrow}
                </span>

                <p style={{
                  fontSize: c.size === 'hero' ? 'clamp(1.3rem, 2vw, 1.75rem)' : c.size === 'tall' ? '1.3rem' : '17px',
                  fontWeight: c.size === 'small' ? 500 : 400,
                  color: '#E8EEF5',
                  margin: '0 0 12px',
                  lineHeight: 1.25,
                }}>
                  {c.title}
                </p>

                <p style={{
                  fontSize: c.size === 'small' ? '13px' : '14px',
                  lineHeight: 1.7,
                  color: '#7A9ABE',
                  margin: 0,
                  maxWidth: c.size === 'hero' ? '620px' : undefined,
                }}>
                  {c.body}
                </p>

                {c.points && c.points.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                    {c.points.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <CrossBox />
                        <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#C8DAEA', margin: 0 }}>{pt}</p>
                      </div>
                    ))}
                  </div>
                )}

                {c.callout && (
                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '24px',
                  }}>
                    <div style={{
                      borderRadius: '8px',
                      background: '#0F2647',
                      padding: '14px 18px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}>
                      <TickBox size={20} bg="rgba(147,197,253,0.15)" marginTop={2} />
                      <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#E2EBF5', margin: 0 }}>
                        {c.callout}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
        <div className="rc-cta-grid">
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
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TickBox size={16} bg={`rgba(${rgb},0.15)`} marginTop={0} />
                  <span style={{ fontSize: '12.5px', color: '#7A9ABE', lineHeight: 1.4 }}>{t}</span>
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

        /* Final CTA grid */
        .rc-cta-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 48px;
          align-items: center;
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
          .svc-trust-grid {
            grid-template-columns: repeat(2, 1fr);
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

          .rc-cta-grid {
            grid-template-columns: 1fr;
            gap: 24px;
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
            <LearningBentoSection service={service} />
            <ExcerptSection service={service} />
            <ListApproachSection service={service} />
            <SCurveSection service={service} />
            <CoreServicesSection service={service} />
            <DeliverablesSection service={service} />
            <ProgramStructureSection service={service} />
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