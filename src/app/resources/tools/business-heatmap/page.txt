'use client';

import { useState, useRef, FormEvent } from 'react';
import { QUESTIONS, SCALE, CanvasHeatmap } from './businessHeatMapConfig';

// =====================================================
// CONFIG
// =====================================================
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// QUESTIONS, SCALE, CANVAS_AREAS, getAreaScore, scoreToColor, and
// CanvasHeatmap now live in ./businessHeatMapConfig.tsx — extracted so the
// admin panel can render the exact same question text, scale labels, and
// heatmap visual when reviewing a submission. See that file's header
// comment for details. Nothing below this point changed in behavior.

// =====================================================
// HELPERS
// =====================================================
function isValidEmail(value: string): boolean {
  // Simple, permissive check — the backend does the authoritative validation.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// =====================================================
// MAIN COMPONENT
// =====================================================
export default function StrategyDiagnostic() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQ, setCurrentQ] = useState(0);

  const [phase, setPhase] = useState<'intro' | 'questions' | 'email' | 'results'>('intro');

  const [companyName, setCompanyName] = useState('');
  const [founderName, setFounderName] = useState('');
  const [industry, setIndustry] = useState('');
  const [introTouched, setIntroTouched] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totalQ = QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / totalQ) * 100);

  const q = QUESTIONS[currentQ];
  const currentAnswer = answers[q?.id];

  function handleAnswer(qId: string, value: number) {
    setAnswers((prev) => ({ ...prev, [qId]: value }));

    if (currentQ < totalQ - 1) {
      setCurrentQ(currentQ + 1);
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setPhase('email');
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleStart(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIntroTouched(true);

    if (!companyName.trim() || !founderName.trim() || !industry.trim()) {
      return;
    }

    setPhase('questions');
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Reconnected to the backend: sends founder/company/industry/email plus
  // the raw per-question answers, and only advances to results on success.
  async function handleEmailSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmailTouched(true);

    if (!isValidEmail(email)) {
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch(`${API_URL}/leadmagnets/business-heat-map`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          founderName: founderName.trim(),
          companyName: companyName.trim(),
          industry: industry.trim(),
          answers,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || 'Something went wrong. Please try again.');
      }

      setPhase('results');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function resetAll() {
    setAnswers({});
    setCurrentQ(0);
    setEmail('');
    setEmailTouched(false);
    setSubmitError(null);
    setPhase('intro');
  }

  // =====================================================
  // INTRO
  // =====================================================
  if (phase === 'intro') {
    const showErrors = introTouched;

    return (
      <main className="min-h-screen bg-[#F0F4F8]">
        <section className="bg-[#0A1E3D] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">Diagnose Your Venture</h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-4xl">
              Answer a few Questions to Analyse Your Business the Way an Expert Would based on Frameworks used by Top-Tier Operators & Investors Globally.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <form onSubmit={handleStart} className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm mb-10">
              <h3 className="text-xl text-gray-800 font-semibold mb-6">Begin your diagnostic</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-medium text-[#0A1E3D] mb-1.5">Founder Name</label>
                  <input
                    type="text"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    placeholder="e.g. Priya Menon"
                    className={`w-full border rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 text-sm ${showErrors && !founderName.trim() ? 'border-red-300 focus:ring-red-400' : 'border-gray-300 focus:ring-[#0A1E3D]'
                      }`}
                  />
                  {showErrors && !founderName.trim() && <p className="text-xs text-red-600 mt-1">Enter Your Name</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0A1E3D] mb-1.5">Business Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. SpaceX or Freshworks"
                    className={`w-full border rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 text-sm ${showErrors && !companyName.trim() ? 'border-red-300 focus:ring-red-400' : 'border-gray-300 focus:ring-[#0A1E3D]'
                      }`}
                  />
                  {showErrors && !companyName.trim() && <p className="text-xs text-red-600 mt-1">Enter Your Business Name</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0A1E3D] mb-1.5">Sector or Domain</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Healthcare or Fintech"
                    className={`w-full border rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 text-sm ${showErrors && !industry.trim() ? 'border-red-300 focus:ring-red-400' : 'border-gray-300 focus:ring-[#0A1E3D]'
                      }`}
                  />
                  {showErrors && !industry.trim() && <p className="text-xs text-red-600 mt-1">Enter Your Sector or Domain</p>}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pt-5 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
                  <div>
                    <span className="text-[#0A1E3D] font-semibold">A few Focused Questions</span>
                    <span className="text-gray-500 ml-1">Across the Areas that Decide whether a Business Scales or Collapses</span>
                  </div>
                  <div>
                    <span className="text-[#0A1E3D] font-semibold">Under 5 Minutes</span>
                    <span className="text-gray-500 ml-1">to Complete</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3.5 px-7 rounded-md transition-all duration-300 font-medium text-base flex items-center justify-center gap-2 group whitespace-nowrap"
                >
                  <span>Start diagnostic</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'Business Heatmap', body: 'Every Aspect of Your Business Rated, So You can See Structural Health at a Glance.' },
                  { title: 'Multi-Dimensional Coverage', body: 'Across Business Fundamentals, Strategic Directions and Operational Challenges.' },
                  { title: 'Your Highest-Priority Areas', body: 'Ranked as per Severity so the Decisions Made are the Right One, Not the Most Visible One.' },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-md p-5 hover:shadow-sm transition-shadow duration-300">
                    <h3 className="text-[#0A1E3D] font-semibold text-base mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // =====================================================
  // EMAIL GATE
  // =====================================================
  if (phase === 'email') {
    const emailError = emailTouched && !isValidEmail(email) ? 'Enter a valid email address' : null;

    return (
      <main className="min-h-screen bg-[#F0F4F8]" ref={topRef}>
        <section className="bg-[#0A1E3D] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-blue-400 text-sm font-medium tracking-wide mb-4">{companyName} · Diagnostic complete</p>
            <h1 className="text-3xl sm:text-4xl text-white mb-4 leading-tight">One last step, {founderName.split(' ')[0] || 'there'}</h1>
            <p className="text-gray-300 text-base leading-relaxed">Enter Your Email so we can Save the Results for You to Revisit them Later.</p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <form onSubmit={handleEmailSubmit} className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm">
              <label className="block text-sm font-medium text-[#0A1E3D] mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                placeholder="you@company.com"
                autoFocus
                className={`w-full border rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 text-sm mb-1 ${emailError ? 'border-red-300 focus:ring-red-400' : 'border-gray-300 focus:ring-[#0A1E3D]'
                  }`}
              />

              {emailError && <p className="text-xs text-red-600 mb-3">{emailError}</p>}
              {!emailError && <div className="mb-3" />}

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3 mb-4">
                  <p className="text-sm text-red-700">{submitError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3.5 px-6 rounded-md transition-all duration-300 font-medium text-base flex items-center justify-center gap-2 ${submitting ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#0A1E3D] hover:bg-[#132B47] text-white'
                  }`}
              >
                {submitting ? 'Saving your results…' : 'See my results'}
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  // =====================================================
  // RESULTS
  // =====================================================
  if (phase === 'results') {
    return (
      <main className="min-h-screen bg-[#F0F4F8]">
        <section className="bg-[#0A1E3D] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto flex items-start justify-between gap-4">
            <div>
              <p className="text-blue-400 text-sm font-medium tracking-wide mb-4">{companyName} · Diagnostic Results</p>
              <h1 className="text-3xl sm:text-4xl text-white mb-3">Your Business Health Map</h1>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm mb-8">
              <CanvasHeatmap answers={answers} />
            </div>

            <div className="bg-[#0A1E3D] rounded-md p-8 sm:p-10">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-white text-xl sm:text-2xl font-medium mb-3 leading-snug">
                    {founderName.split(' ')[0] || 'Founder'}! You have merely scratched the surface.
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-base">
                    We&apos;ve diagnosed {companyName}. A preliminary diagnostic reveals key areas where strategic shifts could materially change {companyName}&apos;s direction.
                    But this is only the beginning — 94% of founders who participated in our Business Diagnostic &amp; Direction have reported substantial, visible changes in their business in as little as 45 days.
                  </p>
                </div>


                <div className="flex md:justify-end">
                  <button
                    onClick={() => {
                      window.location.href = '/services/business-diagnostic-direction';
                    }}
                    className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 text-white py-3.5 px-8 rounded-md transition-all duration-300 font-medium text-sm sm:text-base flex items-center justify-center gap-2 whitespace-nowrap w-full md:w-auto"
                  >
                    Book Your Session
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // =====================================================
  // QUESTIONS
  // =====================================================
  return (
    <main className="min-h-screen bg-[#F0F4F8]" ref={topRef}>
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(28px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slide-in-right { animation: slideInRight 0.28s ease-out; }
      `}</style>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        <div className="w-full flex items-center justify-between mb-5 px-1">
          <span className="text-sm text-gray-500 font-medium">Business diagnostic</span>
          <span className="text-sm text-gray-600 font-semibold">{progress}% completed</span>
        </div>

        <div key={q.id} className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm mb-6 slide-in-right">
          <p className="text-sm text-gray-500 mb-3">{q.module}</p>
          <h2 className="text-2xl sm:text-3xl text-gray-800 mb-3 leading-snug">{q.text}</h2>
          <p className="text-base text-gray-500 leading-relaxed mb-8">{q.helpText}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
            {SCALE.map((item) => {
              const isSelected = currentAnswer === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => handleAnswer(q.id, item.value)}
                  className={`flex flex-col items-center justify-center gap-1 py-4 px-2 rounded-md border text-center transition-all duration-150 ${isSelected ? `${item.active} shadow-sm scale-[1.02]` : `bg-white ${item.idle}`
                    }`}
                >
                  <span className="text-base font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>

          {currentAnswer !== undefined && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed">{q.scores[currentAnswer as keyof typeof q.scores]}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-2.5 mt-7" aria-label="Question progress">
          {QUESTIONS.map((question, index) => {
            const answered = answers[question.id] !== undefined;
            const isCurrent = index === currentQ;

            return (
              <span
                key={question.id}
                aria-label={`Question ${index + 1}${answered ? ', answered' : ''}`}
                className={`rounded-full transition-all duration-300 ${isCurrent ? 'w-3 h-3 bg-[#0A1E3D] ring-4 ring-[#0A1E3D]/10' : answered ? 'w-2.5 h-2.5 bg-[#0A1E3D]' : 'w-2.5 h-2.5 bg-gray-300'
                  }`}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}