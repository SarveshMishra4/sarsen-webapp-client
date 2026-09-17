// app/fundraising-readiness/fundraisingReadinessClient.tsx
'use client';

import { useRef, useState } from 'react';
import {
  QUESTIONS,
  CATEGORY_META,
  STAGE_LABELS,
  generateReport,
  hasCompleteAnswers,
  type AnswerValue,
  type Category,
  type FundraisingReport,
} from './fundraisingReadinessEngine';

// =====================================================
// BRAND CONSTANTS — identical to the other Sarsen tools
// =====================================================
const BRAND = '#0A1E3D';
const TINT = '#EEF2F9';
const ADVANCE_DELAY_MS = 550;

const BAR_COUNT: Record<AnswerValue, number> = { 0: 0, 1: 1, 4: 2, 7: 3, 10: 4 };

function scoreColor(score: number): { bg: string; text: string; band: string } {
  if (score < 3) return { bg: 'bg-red-50', text: 'text-red-700', band: 'Low' };
  if (score < 5) return { bg: 'bg-orange-50', text: 'text-orange-700', band: 'Leaning Low' };
  if (score < 7) return { bg: 'bg-yellow-50', text: 'text-yellow-700', band: 'Moderate' };
  if (score < 8.5) return { bg: 'bg-green-50', text: 'text-green-700', band: 'Leaning High' };
  return { bg: 'bg-emerald-50', text: 'text-emerald-700', band: 'High' };
}

// -----------------------------------------------------
// HEADER BACKGROUND PATTERN — identical to the other Sarsen tools' header.
// -----------------------------------------------------
function HeaderBackgroundPattern() {
  return (
    <div className="absolute inset-0 opacity-20">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="fundraising-grid" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fundraising-grid)" />
      </svg>
    </div>
  );
}

// -----------------------------------------------------
// RADAR CHART — 6 category scores at a glance. Plain SVG, no library.
// -----------------------------------------------------
const CATEGORY_ORDER: Category[] = ['traction', 'ask', 'diligence', 'experience', 'process', 'outreach'];

function RadarChart({ scores }: { scores: Record<Category, number> }) {
  const size = 340;
  const center = size / 2;
  const maxR = 118;
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

  const axes = CATEGORY_ORDER.map((key, i) => ({ key, angle: -Math.PI / 2 + i * ((2 * Math.PI) / CATEGORY_ORDER.length) }));
  const point = (angle: number, r: number) => `${(center + r * Math.cos(angle)).toFixed(1)},${(center + r * Math.sin(angle)).toFixed(1)}`;
  const dataPoints = axes.map((a) => point(a.angle, (scores[a.key] / 10) * maxR)).join(' ');

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto max-w-sm mx-auto" role="img" aria-label="Radar chart of all six readiness categories">
      {gridLevels.map((level) => (
        <polygon key={level} points={axes.map((a) => point(a.angle, level * maxR)).join(' ')} fill="none" stroke="#E2E8F0" strokeWidth={1} />
      ))}
      {axes.map((a) => (
        <line key={a.key} x1={center} y1={center} x2={center + maxR * Math.cos(a.angle)} y2={center + maxR * Math.sin(a.angle)} stroke="#E2E8F0" strokeWidth={1} />
      ))}
      <polygon points={dataPoints} fill="#0A1E3D2E" stroke={BRAND} strokeWidth={2} />
      {axes.map((a) => {
        const r = (scores[a.key] / 10) * maxR;
        return <circle key={`${a.key}-dot`} cx={center + r * Math.cos(a.angle)} cy={center + r * Math.sin(a.angle)} r={3} fill={BRAND} />;
      })}
      {axes.map((a) => {
        const labelR = maxR + 30;
        const x = center + labelR * Math.cos(a.angle);
        const y = center + labelR * Math.sin(a.angle);
        return (
          <text key={a.key} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight={600} fill="#374151">
            {CATEGORY_META[a.key].label.split(' ')[0].split('/')[0]}
          </text>
        );
      })}
    </svg>
  );
}

// -----------------------------------------------------
// STAGE DIAL — where the 4 possible stages sit, with the recommended one highlighted.
// -----------------------------------------------------
function StageDial({ recommendedStage, mismatch }: { recommendedStage: 0 | 1 | 2 | 3; mismatch: boolean }) {
  const stages: (0 | 1 | 2 | 3)[] = [0, 1, 2, 3];
  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {stages.map((s) => {
          const active = s === recommendedStage;
          return (
            <div
              key={s}
              className={`text-center rounded-md py-3 px-1 border-2 transition-all ${active ? 'border-[#0A1E3D]' : 'border-gray-200'}`}
              style={active ? { backgroundColor: TINT } : undefined}
            >
              <p className={`text-xs sm:text-sm font-semibold ${active ? 'text-[#0A1E3D]' : 'text-gray-400'}`}>{STAGE_LABELS[s]}</p>
            </div>
          );
        })}
      </div>
      {mismatch && (
        <p className="text-xs text-orange-600 font-medium mt-2.5">
          Your traction signals point in more than one direction — see the "Inconsistent Stage Signals" flag below.
        </p>
      )}
    </div>
  );
}

// =====================================================
// MAIN COMPONENT
// =====================================================
type Phase = 'intro' | 'questions' | 'results';

export default function FundraisingReadinessClient() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [companyName, setCompanyName] = useState('');
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [advancing, setAdvancing] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const totalQ = QUESTIONS.length;
  const q = QUESTIONS[currentQ];
  const currentAnswer = answers[q?.id];

  function scrollTop() {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleStart() {
    setPhase('questions');
    scrollTop();
  }

  function handleAnswer(value: AnswerValue) {
    if (advancing) return;
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
    setAdvancing(true);

    window.setTimeout(() => {
      if (currentQ < totalQ - 1) {
        setCurrentQ((prev) => prev + 1);
      } else {
        setPhase('results');
      }
      scrollTop();
      setAdvancing(false);
    }, ADVANCE_DELAY_MS);
  }

  function resetAll() {
    setAnswers({});
    setCurrentQ(0);
    setPhase('intro');
    setCompanyName('');
    scrollTop();
  }

  // =====================================================
  // PHASE: INTRO
  // =====================================================
  if (phase === 'intro') {
    return (
      <main className="min-h-screen bg-[#F0F4F8]" ref={topRef}>
        <section className="relative bg-[#0A1E3D] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <HeaderBackgroundPattern />
          <div className="relative max-w-4xl mx-auto">
            <p className="text-blue-400 text-sm font-medium tracking-wide mb-4">Fundraising Readiness &amp; Investor-Stage Fit</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">Are You Actually Ready to Raise — And From Whom?</h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed">
              28 questions across traction, your ask, diligence readiness, experience, process, and outreach strategy.
              None of them ask you directly "how much are you raising" or "are you ready" — the answer to both is
              derived from how the pieces underneath actually hold together.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm">
              <label className="block text-base font-medium text-[#0A1E3D] mb-1.5">Company Name (optional)</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Northwind Labs"
                className="w-full border-2 border-gray-200 bg-white rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:border-[#0A1E3D] text-base mb-6"
              />

              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6 flex-wrap">
                <span><strong className="text-[#0A1E3D]">28 Questions</strong> — about 8–10 minutes</span>
                <span><strong className="text-[#0A1E3D]">Nothing Sent Anywhere</strong> — scored on this device</span>
              </div>

              <button
                type="button"
                onClick={handleStart}
                className="w-full bg-[#0A1E3D] hover:opacity-90 text-white py-3.5 px-6 rounded-md font-medium text-base transition-all"
              >
                Begin Assessment
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // =====================================================
  // PHASE: QUESTIONS
  // =====================================================
  if (phase === 'questions') {
    const progress = Math.round((Object.keys(answers).length / totalQ) * 100);

    return (
      <main className="min-h-screen bg-[#F0F4F8]" ref={topRef}>
        <style>{`
          @keyframes slideInRight { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
          .slide-in-right { animation: slideInRight 0.26s ease-out; }
        `}</style>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-16">
          <div className="w-full flex items-center justify-between mb-2 px-1">
            <span className="text-sm text-gray-500 font-medium">{CATEGORY_META[q.category].label}</span>
            <span className="text-sm text-gray-600 font-semibold">{progress}% Completed</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full mb-6 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: BRAND }} />
          </div>

          <div key={q.id} className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm mb-6 slide-in-right">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 leading-[1.05] tracking-tight">{q.text}</h2>
            <p className="text-base text-gray-500 leading-relaxed mb-8">{q.helpText}</p>

            <div className="flex flex-col gap-3 sm:gap-3.5">
              {q.options.map((opt) => {
                const isSelected = currentAnswer === opt.value;
                const bars = BAR_COUNT[opt.value];
                const locked = advancing && !isSelected;

                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleAnswer(opt.value)}
                    disabled={advancing}
                    aria-pressed={isSelected}
                    className={`group flex items-start gap-3.5 sm:gap-4 text-left w-full rounded-lg border-2 px-4 sm:px-5 py-3.5 sm:py-4 transition-all duration-150 active:scale-[0.99] ${
                      isSelected ? '' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    } ${locked ? 'opacity-40' : ''}`}
                    style={isSelected ? { borderColor: BRAND, backgroundColor: TINT, boxShadow: `0 0 0 1px ${BRAND}22` } : undefined}
                  >
                    <div className="flex-shrink-0 flex items-end pt-1.5" aria-hidden="true">
                      <div className="flex items-end gap-[3px] h-5">
                        {[0, 1, 2, 3].map((i) => (
                          <span
                            key={i}
                            className="w-[3px] rounded-full transition-colors duration-150"
                            style={{ height: `${7 + i * 4}px`, backgroundColor: i < bars ? BRAND : '#E2E8F0' }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold mb-1 transition-colors duration-150" style={{ color: isSelected ? BRAND : '#1F2937' }}>
                        {opt.title}
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed">{opt.description}</p>
                    </div>

                    <span
                      className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md border-2 mt-0.5 transition-all duration-150 ${
                        isSelected ? '' : 'border-gray-300 bg-white group-hover:border-gray-400'
                      }`}
                      style={isSelected ? { backgroundColor: BRAND, borderColor: BRAND } : undefined}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // PHASE: RESULTS
  // =====================================================
  if (!hasCompleteAnswers(answers)) {
    return (
      <main className="min-h-screen bg-[#F0F4F8] flex items-center justify-center px-4">
        <p className="text-gray-500">Results will appear once every question has been answered.</p>
      </main>
    );
  }

  const report: FundraisingReport = generateReport(answers);
  const overallColor = scoreColor(report.overallReadiness);
  const likelihoodColor = scoreColor(report.likelihood.score);
  const redFlags = report.flags.filter((f) => f.type === 'red');
  const greenFlags = report.flags.filter((f) => f.type === 'green');

  return (
    <main className="min-h-screen bg-[#F0F4F8]" ref={topRef}>
      <section className="relative bg-[#0A1E3D] pt-20 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <HeaderBackgroundPattern />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-blue-400 text-sm font-medium tracking-wide mb-3">{companyName || 'Your Company'} · Fundraising Readiness</p>
          <h1 className="text-3xl sm:text-4xl text-white mb-3">Recommended Stage: {STAGE_LABELS[report.stage.recommendedStage]}</h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Based on your traction signals — not on which stage you were planning to pitch.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* STAGE + INVESTOR TYPES */}
          <div className="bg-white border border-gray-200 rounded-md p-6 sm:p-7 shadow-sm">
            <p className="text-lg font-semibold text-[#0A1E3D] mb-4">Where This Points</p>
            <StageDial recommendedStage={report.stage.recommendedStage} mismatch={report.stage.positioningMismatch} />
            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-2">Who to raise from</p>
                <ul className="text-sm text-gray-700 space-y-1.5">
                  {report.investorTypes.map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#0A1E3D] flex-shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-2">How to reach them</p>
                <p className="text-sm text-gray-700 leading-relaxed">{report.outreachNote}</p>
              </div>
            </div>
          </div>

          {/* SCORES */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className={`rounded-md p-6 ${overallColor.bg}`}>
              <p className="text-sm font-semibold text-[#0A1E3D] mb-1">Overall Fundraising Readiness</p>
              <p className={`text-4xl font-bold mb-1 ${overallColor.text}`}>{report.overallReadiness.toFixed(1)}<span className="text-lg font-medium">/10</span></p>
              <p className={`text-sm font-medium ${overallColor.text}`}>{report.readinessBand}</p>
            </div>
            <div className={`rounded-md p-6 ${likelihoodColor.bg}`}>
              <p className="text-sm font-semibold text-[#0A1E3D] mb-1">Likelihood of a Successful Raise</p>
              <p className={`text-4xl font-bold mb-1 ${likelihoodColor.text}`}>{report.likelihood.score.toFixed(1)}<span className="text-lg font-medium">/10</span></p>
              <p className={`text-sm font-medium ${likelihoodColor.text}`}>{report.likelihood.band}</p>
            </div>
          </div>

          {/* RADAR CHART */}
          <div>
            <p className="text-lg font-semibold text-[#0A1E3D] mb-1">Readiness Profile at a Glance</p>
            <p className="text-sm text-gray-500 mb-4">All six categories plotted together — the shape matters as much as any single score.</p>
            <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
              <RadarChart scores={report.categoryScores} />
            </div>
          </div>

          {/* CATEGORY BREAKDOWN */}
          <div>
            <p className="text-lg font-semibold text-[#0A1E3D] mb-1">Category Breakdown</p>
            <p className="text-sm text-gray-500 mb-4">All scores are out of 10.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CATEGORY_ORDER.map((c) => {
                const cc = scoreColor(report.categoryScores[c]);
                return (
                  <div key={c} className={`rounded-md p-3.5 ${cc.bg}`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-semibold text-[#0A1E3D]">{CATEGORY_META[c].label}</p>
                      <p className={`text-sm font-bold ${cc.text}`}>{report.categoryScores[c].toFixed(1)}</p>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/70 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${report.categoryScores[c] * 10}%`, backgroundColor: BRAND }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5 leading-snug">{CATEGORY_META[c].description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FLAGS */}
          {redFlags.length > 0 && (
            <div>
              <p className="text-lg font-semibold text-[#0A1E3D] mb-1">Red Flags</p>
              <p className="text-sm text-gray-500 mb-4">Worth addressing before — or during — your first investor conversations.</p>
              <div className="border-2 border-red-200 bg-red-50 rounded-md p-4 sm:p-5">
                {redFlags.map((f, i) => (
                  <div key={f.title} className={i > 0 ? 'mt-4 pt-4 border-t border-red-200' : ''}>
                    <p className="text-base font-semibold text-red-800 mb-1.5">{f.title}</p>
                    <p className="text-sm text-red-800 leading-relaxed">{f.statement}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {greenFlags.length > 0 && (
            <div>
              <p className="text-lg font-semibold text-[#0A1E3D] mb-1">Green Flags</p>
              <p className="text-sm text-gray-500 mb-4">What's already working in your favor.</p>
              <div className="border-2 border-emerald-200 bg-emerald-50 rounded-md p-4 sm:p-5">
                {greenFlags.map((f, i) => (
                  <div key={f.title} className={i > 0 ? 'mt-4 pt-4 border-t border-emerald-200' : ''}>
                    <p className="text-base font-semibold text-emerald-800 mb-1.5">{f.title}</p>
                    <p className="text-sm text-emerald-800 leading-relaxed">{f.statement}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={resetAll}
            className="w-full py-3 px-6 rounded-md font-medium text-sm border-2 border-gray-200 text-gray-600 hover:border-gray-300 transition-all"
          >
            Start Over
          </button>
        </div>
      </section>
    </main>
  );
}
