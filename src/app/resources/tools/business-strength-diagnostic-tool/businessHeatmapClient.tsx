// app/business-heatmap/businessHeatmapClient.tsx
'use client';

import { useState, useRef, useEffect, useCallback, FormEvent, ReactNode } from 'react';
import { QUESTIONS, DONT_KNOW_VALUE, CanvasHeatmap } from './businessHeatMapConfig';

// =====================================================
// CONFIG
// =====================================================
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// QUESTIONS, CANVAS_AREAS, getAreaScore, scoreToColor, and CanvasHeatmap
// now live in ./businessHeatMapConfig.tsx — extracted so the admin panel
// can render the exact same question text, option labels, and heatmap
// visual when reviewing a submission. See that file's header comment for
// details.
//
// UPDATE (this revision): the old shared SCALE (Critical/Weak/Developing/
// Healthy/Strong buttons, same across every question) is gone. Each
// question now supplies its own `options` array — heading + explanation
// per option — rendered as a stacked list below instead of a row of small
// buttons, so a founder can read every option before picking one.
//
// UPDATE (this revision): added a single-line "who uses this" trust
// signal under the hero copy on the intro screen. It names one example
// user without implying exclusivity — see TRUST_LINE below. Swap the
// placeholder name/firm for the real, approved ones before publishing.

// UPDATE (this revision): six capture-only cards were added AFTER the 15
// scored questions (capital invested, time invested, funds raised [with
// conditional follow-ups], areas you need help in, problems faced, next
// financial goal). They live in their own `profile` state and are sent to
// the backend as a separate `profile` object. Capital, time and funding
// use dropdowns; the "areas you need help in" card is a Yes-only tick (select / unselect). They are never merged into
// `answers`, so they cannot influence scoring, the heatmap, or the result.

// UPDATE (this revision): "live generation" effect. From the disclaimer screen
// onwards (the intro form is untouched), text is revealed progressively as if
// an AI were writing it in front of the founder: headings, help text, every
// option's title and description, dropdown/textarea placeholders, and the
// result-page copy. Cards and options fade in as their text starts. There is
// no cursor. Tune it with the STREAM_* constants below. Founders who have
// "reduce motion" switched on in their OS see everything instantly. All of it
// is presentation-only: no scoring, answers or payload fields are affected.

// =====================================================
// TRUST LINE (intro screen only)
// =====================================================
// PLACEHOLDER — replace with the real, approved name/title/firm before
// shipping. Keep the phrasing to "used by ... including ..." so it reads
// as one example among many, not an exclusive partnership or an
// endorsement of the tool by the firm itself.
const TRUST_LINE = {
  enabled: true, // flip to false to hide this line entirely
  name: 'Michael Dorrell', // e.g. "Jordan Alvarez"
  title: 'Founder & Investor', // e.g. "Partner"
  firm: 'Stonepeak Partners', // e.g. "Meridian Growth Partners"
};

// =====================================================
// HELPERS
// =====================================================
function isValidEmail(value: string): boolean {
  // Simple, permissive check — the backend does the authoritative validation.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// -----------------------------------------------------
// Presentation-only answer-option styling.
// Purely visual — does not touch AnswerValue, scoring, or any field coming
// from businessHeatMapConfig.
//
// One consistent brand colour is used everywhere in the option card: the
// signal tower's filled bars, the selected border, the selected tint, the
// selected title text, and the tick. Only the number of filled bars
// changes per option — that's what carries the "how far along" meaning,
// not colour. "I don't know" reuses the exact same tower with zero bars
// filled — no separate icon, no extra mark — so an unaware answer is
// unmistakably "no signal" at a glance.
// -----------------------------------------------------
const BRAND_COLOR = '#0A1E3D'; // used for tower fill, selected state, and the tick — everywhere, consistently
const SELECTED_TINT = '#EEF2F9'; // one consistent light wash behind a selected option

const BAR_COUNT: Record<number, number> = {
  1: 1,
  4: 2,
  7: 3,
  10: 4,
  [DONT_KNOW_VALUE]: 0, // don't know — no bars filled, no signal
};

// How long the tick stays visible, alone, before we auto-advance to the
// next question. Gives the founder a clear beat to register their choice
// instead of the screen jumping the instant they tap.
const ADVANCE_DELAY_MS = 650;

// =====================================================
// "LIVE GENERATION" EFFECT
// =====================================================
// How it works: one clock per screen counts how many characters have been
// "generated" so far. Every piece of text on that screen takes the next slot
// in order (createSeq().next(text)), so the screen writes itself top to
// bottom, one piece after another. The not-yet-written part of each text is
// kept in the layout but made invisible, so nothing jumps or re-wraps while it
// types. The clock restarts whenever the screen/question changes, and wakes up
// again if new text appears later on the same screen (e.g. the funding
// follow-ups).
const STREAM_CHARS_PER_SECOND = 700; // lower = slower, higher = faster
const STREAM_TICK_MS = 30; // how often new text is revealed
const STREAM_GAP_CHARS = 4; // tiny pause between one text and the next

type StreamSeg = { visible: string; rest: string; started: boolean };

// Renders a partially written text. The full text is also exposed (visually
// hidden) so screen readers read it once, instead of every half-typed state.
function Stream({ s }: { s: StreamSeg }) {
  return (
    <>
      <span className="sr-only">{s.visible + s.rest}</span>
      <span aria-hidden="true">
        {s.visible}
        <span className="invisible">{s.rest}</span>
      </span>
    </>
  );
}

function createSeq(revealed: number, totalRef: { current: number }) {
  let offset = 0;
  totalRef.current = 0;

  return {
    // Takes the next slot in the sequence for `text`.
    next(text: string): StreamSeg {
      const start = offset;
      offset += text.length + STREAM_GAP_CHARS;
      totalRef.current = offset;
      const n = Math.max(0, Math.min(text.length, Math.floor(revealed - start)));
      return { visible: text.slice(0, n), rest: text.slice(n), started: revealed > start };
    },
    // Leaves a silent gap (counted in characters), e.g. while a visual wipes in.
    pause(chars: number) {
      offset += chars;
      totalRef.current = offset;
    },
    // True once everything written so far in this screen has finished.
    reached(): boolean {
      return revealed >= offset;
    },
  };
}

function useStreamClock(key: string) {
  const [state, setState] = useState<{ key: string; n: number }>({ key, n: 0 });
  const [reduced, setReduced] = useState(false);
  const nRef = useRef(0);
  const totalRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const keyRef = useRef(key);
  keyRef.current = key;

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (timerRef.current !== null) return;
    timerRef.current = setInterval(() => {
      // A little jitter so it reads like real generation, not a metronome.
      nRef.current += ((STREAM_CHARS_PER_SECOND * STREAM_TICK_MS) / 1000) * (0.6 + Math.random() * 0.8);
      setState({ key: keyRef.current, n: nRef.current });
      if (nRef.current >= totalRef.current) stop();
    }, STREAM_TICK_MS);
  }, [stop]);

  // New screen / question: start writing from the top again.
  useEffect(() => {
    stop();
    nRef.current = 0;
    setState({ key, n: 0 });
    if (!reduced) start();
    return stop;
  }, [key, reduced, start, stop]);

  // Text that appears later on the same screen extends the total: wake the
  // clock if it had already finished.
  useEffect(() => {
    if (!reduced && nRef.current < totalRef.current) start();
  });

  const revealed = reduced ? Infinity : state.key === key ? state.n : 0;
  return { revealed, totalRef };
}

// Fade + rise for UI that "appears" as the text reaches it. `invisible` also
// keeps it unclickable and un-tabbable until then.
const fadeIn = (on: boolean) =>
  `transition-all duration-500 ease-out ${on ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-2'}`;

// =====================================================
// EXTRA PROFILE CARDS — capture-only (no role in scoring or results)
// =====================================================
// Order of the extra cards, shown after the 15 scored questions. The two
// free-text cards are deliberately last, and the "areas you need help in"
// card sits right before them. All six are mandatory.
const EXTRA_STEPS = ['capital', 'time', 'funding', 'areas', 'problems', 'goal'] as const;
type ExtraStep = (typeof EXTRA_STEPS)[number];

// Every extra card is mandatory: Continue stays disabled until it is answered.
const MAX_TEXT_LENGTH = 2000;

// Amounts are shown as "Rs. <number>". Edit the labels here to change currency/ranges.
const CAPITAL_OPTIONS = [
  'Nothing Yet',
  'Under Rs. 1 Lakh',
  'Rs. 1 – 5 Lakh',
  'Rs. 5 – 25 Lakh',
  'Rs. 25 Lakh – Rs. 1 Crore',
  'Above Rs. 1 Crore',
];

const TIME_OPTIONS = [
  'Less than 3 Months',
  '3 – 6 Months',
  '6 – 12 Months',
  '1 – 2 Years',
  '2 – 3 Years',
  'More than 3 Years',
];

const FUNDING_SOURCE_OPTIONS = [
  'Friends & Family',
  'My Own Savings',
  'Angel Investor',
  'Venture Capital',
  'Other', // always last
];

const FUNDING_AMOUNT_OPTIONS = [
  'Under Rs. 5 Lakh',
  'Rs. 5 – 25 Lakh',
  'Rs. 25 Lakh – Rs. 1 Crore',
  'Rs. 1 – 5 Crore',
  'Above Rs. 5 Crore',
];

// The six areas mirror the six dimensions in the Strategy Diagnostic &
// Direction brochure (Customer, Market, Positioning, Business Model,
// Economics, Funds & Finances), worded in plain language.
const HELP_AREAS = [
  {
    id: 'customer',
    title: 'Finding Your Right Customers',
    description: 'Pinpointing your ideal customer and the best channels to reach them.',
  },
  {
    id: 'market',
    title: 'Calculating and Capturing Your Market',
    description: 'Identifying your best sub-niche in your market and developing the right strategy to enter and capture it.',
  },
  {
    id: 'positioning',
    title: 'Standing Out from Competitors',
    description: 'Developing a clear advantage and reason customers should choose you over alternatives.',
  },
  {
    id: 'business_model',
    title: 'Developing Your Revenue Model',
    description: 'Establishing multiple feasible revenue streams and developing a pivot strategy.',
  },
  {
    id: 'economics',
    title: 'Getting Your Unit Economics Right',
    description: 'Establishing clear economics for your business to achieve higher revenue and stronger margins, strengthening profitability.',
  },
  {
    id: 'finances',
    title: 'Planning Finances and Raising Funds',
    description: 'Identifying your financial needs, planning your numbers, and connecting with the most appropriate investors.',
  },
] as const;

type Profile = {
  capitalInvested: string | null;
  timeInvested: string | null;
  raisedFunds: boolean | null;
  fundingSource: string | null;
  fundingSourceOther: string;
  fundingAmount: string | null;
  helpAreas: Record<string, boolean>; // every area is present; true = selected, at least one is required
  problems: string;
  nextFinancialGoal: string;
};

const INITIAL_PROFILE: Profile = {
  capitalInvested: null,
  timeInvested: null,
  raisedFunds: null,
  fundingSource: null,
  fundingSourceOther: '',
  fundingAmount: null,
  helpAreas: Object.fromEntries(HELP_AREAS.map((a) => [a.id, false])),
  problems: '',
  nextFinancialGoal: '',
};

const PROBLEMS_PLACEHOLDER = `What is holding your business back right now.

For example: where sales are getting stuck, what isn't working with customers, money or team challenges, or decisions you keep putting off.

Be as detailed as you can. The more specific you are, the more useful results will be.`;

const GOAL_PLACEHOLDER = `The next financial milestone you are working towards, and by when.

For example: reaching Rs. 10 Lakh in monthly revenue within 12 months, becoming profitable, or raising a funding round of a particular size.`;

// Native dropdown, styled to match the text inputs. Native <select> keeps
// the OS picker on phones, which is the easiest way to answer on mobile.
function SelectField({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  ariaLabel: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="w-full appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-11 py-3.5 text-base focus:outline-none focus:ring-1 focus:ring-[#0A1E3D] focus:border-[#0A1E3D]"
        style={{ color: value ? BRAND_COLOR : '#9CA3AF' }}
      >
        <option value="" disabled>
          {placeholder || '\u00A0'}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ color: BRAND_COLOR }}>
            {opt}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

function TickBox({ selected }: { selected: boolean }) {
  return (
    <span
      className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md border-2 transition-all duration-150 ${selected ? '' : 'border-gray-300 bg-white group-hover:border-gray-400'
        }`}
      style={selected ? { backgroundColor: BRAND_COLOR, borderColor: BRAND_COLOR } : undefined}
      aria-hidden="true"
    >
      {selected && (
        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </span>
  );
}

// Field wrappers used on the capture-only cards. Each fades in when its turn
// comes and writes its placeholder out live.
function StreamSelect({
  seg,
  ...props
}: {
  seg: StreamSeg;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  ariaLabel: string;
}) {
  return (
    <div className={fadeIn(seg.started)}>
      <SelectField {...props} placeholder={seg.visible} />
    </div>
  );
}

function StreamInput({
  seg,
  value,
  onChange,
}: {
  seg: StreamSeg;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={`mt-3 ${fadeIn(seg.started)}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={seg.visible}
        maxLength={120}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0A1E3D] text-base"
      />
    </div>
  );
}

function StreamTextarea({
  seg,
  value,
  onChange,
  rows,
}: {
  seg: StreamSeg;
  value: string;
  onChange: (value: string) => void;
  rows: number;
}) {
  return (
    <div className={fadeIn(seg.started)}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={seg.visible}
        maxLength={MAX_TEXT_LENGTH}
        rows={rows}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0A1E3D] text-base leading-relaxed resize-y"
      />
    </div>
  );
}

// Whole row is one tap target. It only has a "Yes" state: tap to select
// (tick appears), tap again to unselect. There is no "No" button.
function HelpAreaRow({
  title,
  description,
  selected,
  onToggle,
}: {
  title: ReactNode;
  description: ReactNode;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`group flex items-center gap-3 sm:gap-5 text-left w-full rounded-lg border-2 px-4 sm:px-5 py-3.5 sm:py-4 transition-all duration-150 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${selected ? 'shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
        }`}
      style={
        (selected
          ? { borderColor: BRAND_COLOR, backgroundColor: SELECTED_TINT, boxShadow: `0 0 0 1px ${BRAND_COLOR}22` }
          : { '--tw-ring-color': BRAND_COLOR }) as any
      }
    >
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold mb-1 transition-colors duration-150" style={{ color: selected ? BRAND_COLOR : '#1F2937' }}>
          {title}
        </p>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
      <span
        className={`flex-shrink-0 flex items-center gap-2 rounded-lg border-2 px-2.5 py-1.5 text-sm font-semibold transition-all duration-150 ${selected ? '' : 'border-gray-200 bg-white text-gray-500 group-hover:border-gray-300'
          }`}
        style={selected ? { borderColor: BRAND_COLOR, backgroundColor: '#fff', color: BRAND_COLOR } : undefined}
        aria-hidden="true"
      >
        Yes
        <TickBox selected={selected} />
      </span>
    </button>
  );
}

function ContinueButton({ disabled, onClick, label = 'Continue' }: { disabled?: boolean; onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full mt-8 py-3.5 px-6 rounded-md transition-all duration-300 font-medium text-base flex items-center justify-center gap-2 ${disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#0A1E3D] hover:bg-[#132B47] text-white'
        }`}
    >
      {label}
    </button>
  );
}

// =====================================================
// MAIN COMPONENT
// =====================================================
export default function BusinessHeatmapClient() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [advancing, setAdvancing] = useState(false);

  const [phase, setPhase] = useState<'intro' | 'disclaimer' | 'questions' | 'email' | 'results'>('intro');

  const [companyName, setCompanyName] = useState('');
  const [founderName, setFounderName] = useState('');
  const [industry, setIndustry] = useState('');
  const [introTouched, setIntroTouched] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Capture-only answers (never sent into scoring — see header note).
  const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE);

  // "Live generation" clock: one per screen (and one per question). The intro
  // screen never calls seq.next(), so it is unaffected.
  const streamKey = phase === 'questions' ? `q-${currentQ}` : phase;
  const stream = useStreamClock(streamKey);
  const seq = createSeq(stream.revealed, stream.totalRef);

  // Steps = the 15 scored questions, then the extra capture-only cards.
  const totalQ = QUESTIONS.length;
  const totalSteps = totalQ + EXTRA_STEPS.length;
  const stepsDone = currentQ + (advancing ? 1 : 0);
  const progress = Math.round((stepsDone / totalSteps) * 100);

  const isScoredStep = currentQ < totalQ;
  const extraStep: ExtraStep | null = isScoredStep ? null : EXTRA_STEPS[currentQ - totalQ];

  const q = QUESTIONS[currentQ]; // undefined once we're past the scored questions
  const currentAnswer = answers[q?.id];

  function updateProfile(patch: Partial<Profile>) {
    setProfile((prev) => ({ ...prev, ...patch }));
  }

  function handleAnswer(qId: string, value: number) {
    if (advancing) return; // a tick is already showing — ignore taps until it advances

    setAnswers((prev) => ({ ...prev, [qId]: value }));
    setAdvancing(true);

    window.setTimeout(() => {
      moveToNextStep();
      setAdvancing(false);
    }, ADVANCE_DELAY_MS);
  }

  function moveToNextStep() {
    if (currentQ < totalSteps - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setPhase('email');
    }
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleStart(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIntroTouched(true);

    if (!companyName.trim() || !founderName.trim() || !industry.trim()) {
      return;
    }

    setPhase('disclaimer');
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // =====================================================
  // BACKEND SUBMISSION — enabled
  // =====================================================
  // Sends founder/company/industry/email plus the raw per‑question answers
  // to the backend, and only advances to results on success.
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
          // Capture-only extras. The backend must treat these as plain data
          // to store — they take no part in scoring.
          profile: {
            capitalInvested: profile.capitalInvested,
            timeInvested: profile.timeInvested,
            raisedFunds: profile.raisedFunds,
            fundingSource: profile.raisedFunds ? profile.fundingSource : null,
            fundingSourceOther: profile.raisedFunds ? profile.fundingSourceOther.trim() : '',
            fundingAmount: profile.raisedFunds ? profile.fundingAmount : null,
            helpAreas: profile.helpAreas,
            problems: profile.problems.trim(),
            nextFinancialGoal: profile.nextFinancialGoal.trim(),
          },
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
    setProfile(INITIAL_PROFILE);
    setCurrentQ(0);
    setAdvancing(false);
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
        <section className="relative bg-[#0A1E3D] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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

          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">Check the Health of Your Business</h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-4xl">
              Answer a Few Questions to Analyse Your Business the Way an Expert Would based on Frameworks used by Top-Tier Operators & Investors Globally.
            </p>

            {/* ---------------------------------------------------------
                TRUST LINE
                Single-line, low-key credibility signal. Deliberately NOT
                a testimonial card: no photo, no quote, no border, no
                background — just text that sits quietly under the hero
                copy in the existing type scale. Phrasing names one
                example user ("including ...") rather than claiming
                exclusivity in either direction (not "the only tool he
                uses", not "our exclusive partner").
                Toggle via TRUST_LINE.enabled above.
            --------------------------------------------------------- */}
            {TRUST_LINE.enabled && (
              <p className="text-gray-400 text-sm mt-5 flex items-center gap-2 flex-wrap">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400" aria-hidden="true" />
                Used by Founders, Operators & Investors like {''}
                <span className="text-gray-200 font-medium">{TRUST_LINE.name}</span>— {TRUST_LINE.title} at
                <span className="text-gray-200 font-medium">{TRUST_LINE.firm}</span>.
              </p>
            )}
          </div>
        </section>

        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <form onSubmit={handleStart} className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm mb-10">
              <h3 className="text-xl text-gray-800 font-semibold mb-6">Begin Your Diagnosis</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <div>
                  <label className="block text-base font-medium text-[#0A1E3D] mb-1.5">Founder Name</label>
                  <input
                    type="text"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    placeholder="e.g. Adam Doe"
                    className={`w-full border rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 text-base ${showErrors && !founderName.trim() ? 'border-red-300 focus:ring-red-400' : 'border-gray-300 focus:ring-[#0A1E3D]'
                      }`}
                  />
                  {showErrors && !founderName.trim() && <p className="text-sm text-red-600 mt-1">Enter Your Name</p>}
                </div>

                <div>
                  <label className="block text-base font-medium text-[#0A1E3D] mb-1.5">Business Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. SpaceX or Freshworks"
                    className={`w-full border rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 text-base ${showErrors && !companyName.trim() ? 'border-red-300 focus:ring-red-400' : 'border-gray-300 focus:ring-[#0A1E3D]'
                      }`}
                  />
                  {showErrors && !companyName.trim() && <p className="text-sm text-red-600 mt-1">Enter Your Business Name</p>}
                </div>

                <div>
                  <label className="block text-base font-medium text-[#0A1E3D] mb-1.5">Sector or Domain</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Healthcare or Fintech"
                    className={`w-full border rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 text-base ${showErrors && !industry.trim() ? 'border-red-300 focus:ring-red-400' : 'border-gray-300 focus:ring-[#0A1E3D]'
                      }`}
                  />
                  {showErrors && !industry.trim() && <p className="text-sm text-red-600 mt-1">Enter Your Sector or Domain</p>}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pt-5 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-base">
                  <div>
                    <span className="text-[#0A1E3D] font-semibold">Few Focused Questions</span>
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
                  <span>Start Diagnosis</span>
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
  // DISCLAIMER — shown once, right after the intro form,
  // before the first question
  // =====================================================
  if (phase === 'disclaimer') {
    return (
      <main className="min-h-screen bg-[#F0F4F8]" ref={topRef}>
        <section className="bg-[#0A1E3D] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-blue-400 text-sm font-medium tracking-wide mb-4">
              <Stream s={seq.next(`${companyName || 'Your business'} · Before You Begin`)} />
            </p>
            <h1 className="text-3xl sm:text-4xl text-white mb-4 leading-tight">
              <Stream s={seq.next(`Please Focus, ${founderName.split(' ')[0] || 'founder'}`)} />
            </h1>
            <p className="text-gray-300 text-base leading-relaxed">
              <Stream s={seq.next('The Accuracy of the Model Depends on Honest and Clear Answers.')} />
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm mb-8">
              <div className="flex gap-4 sm:gap-5 pb-6 mb-6 border-b border-gray-100">
                <span className="flex-shrink-0 w-8 h-8  text-[#0A1E3D]  text-sm font-semibold flex items-center justify-center">
                  ●
                </span>
                <div>
                  <h3 className="text-[#0A1E3D] font-semibold text-base mb-1">
                    <Stream s={seq.next('Read Every Option Before You Choose')} />
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    <Stream
                      s={seq.next(
                        `Each Question has 5 Distinct Options. Read all of them Before Choosing One. Right Option is the One that Most Honestly reflects where ${companyName || 'your business'} Stands Today.`
                      )}
                    />
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-5">
                <span className="flex-shrink-0 w-8 h-8 text-[#0A1E3D]  text-sm font-semibold flex items-center justify-center">
                  ●
                </span>
                <div>
                  <h3 className="text-[#0A1E3D] font-semibold text-base mb-1">
                    <Stream s={seq.next('Be Honest to Yourself')} />
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    <Stream
                      s={seq.next(
                        `Answer based on where ${companyName || 'Your Business'} actually Stands Today, Not Where You Imagine It to Be. `
                      )}
                    />
                    <strong>
                      <Stream s={seq.next('You can only Shape Tomorrow once You Understand Today Clearly.')} />
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            <div className={fadeIn(seq.reached())}>
              <button
                onClick={() => {
                  setPhase('questions');
                  topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3.5 px-7 rounded-md transition-all duration-300 font-medium text-base flex items-center justify-center gap-2 group"
              >
                <span>Yes, Let&apos;s Begin</span>
              </button>
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
            <p className="text-blue-400 text-sm font-medium tracking-wide mb-4">
              <Stream s={seq.next(`${companyName} · Diagnostic Complete`)} />
            </p>
            <h1 className="text-3xl sm:text-4xl text-white mb-4 leading-tight">
              <Stream s={seq.next(`One last step, ${founderName.split(' ')[0] || 'there'}`)} />
            </h1>
            <p className="text-gray-300 text-base leading-relaxed">
              <Stream s={seq.next('Enter Your Email so we can Send You the Results.')} />
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <form onSubmit={handleEmailSubmit} className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm">
              <label className="block text-sm font-medium text-[#0A1E3D] mb-1.5">
                <Stream s={seq.next('Email address')} />
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                placeholder={seq.next('you@company.com').visible}
                autoFocus
                className={`w-full border rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 text-sm mb-1 ${emailError ? 'border-red-300 focus:ring-red-400' : 'border-gray-300 focus:ring-[#0A1E3D]'
                  }`}
              />

              {emailError && <p className="text-sm text-red-600 mb-3">{emailError}</p>}
              {!emailError && <div className="mb-3" />}

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3 mb-4">
                  <p className="text-sm text-red-700">{submitError}</p>
                </div>
              )}

              <div className={fadeIn(seq.reached())}>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-3.5 px-6 rounded-md transition-all duration-300 font-medium text-base flex items-center justify-center gap-2 ${submitting ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#0A1E3D] hover:bg-[#132B47] text-white'
                    }`}
                >
                  {submitting ? 'Saving Your Results…' : 'See My Results'}
                </button>
              </div>
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
    const sEyebrow = seq.next(`${companyName} · Diagnostic Results`);
    const sTitle = seq.next('Your Business Health Map');

    // The heatmap wipes in once the title is written; the closing pitch waits
    // a beat so it starts writing while the heatmap is still revealing.
    const heatmapOn = seq.reached();
    seq.pause(Math.round(STREAM_CHARS_PER_SECOND * 0.9));
    const ctaOn = seq.reached();

    const sCtaHeading = seq.next(
      `${founderName.split(' ')[0] || 'Founder'} ! You Have Clarity. Now, Let’s Turn It Into Growth.`
    );
    const sCtaBody = seq.next(
      `We've Diagnosed the Health of ${companyName}. Our Approach is shaped by Experience across Startups, Corporations, Private Equity and Venture Capital. Through our Strategic Diagnostic & Direction, we bring that Experience to ${companyName}, its Context and its Challenges to help you address what matters most. `
    );
    const sCtaProof = seq.next('94% of our Founders reported seeing Meaningful Results even as early as 90 days.');

    return (
      <main className="min-h-screen bg-[#F0F4F8]">
        <section className="bg-[#0A1E3D] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto flex items-start justify-between gap-4">
            <div>
              <p className="text-blue-400 text-sm font-medium tracking-wide mb-4">
                <Stream s={sEyebrow} />
              </p>
              <h1 className="text-3xl sm:text-4xl text-white mb-3">
                <Stream s={sTitle} />
              </h1>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div
              className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm mb-8"
              style={{
                clipPath: heatmapOn ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
                transition: 'clip-path 1.2s ease-out',
              }}
            >
              <CanvasHeatmap answers={answers} />
            </div>

            <div className={`bg-[#0A1E3D] rounded-md p-8 sm:p-10 ${fadeIn(ctaOn)}`}>
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-white text-xl sm:text-2xl font-medium mb-3 leading-snug">
                    <Stream s={sCtaHeading} />
                  </h3>
                  <p className="text-gray-300 text-sm">
                    <Stream s={sCtaBody} />
                    <strong>
                      <Stream s={sCtaProof} />
                    </strong>
                  </p>
                </div>

                <div className={`flex md:justify-end ${fadeIn(seq.reached())}`}>
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
          <span className="text-sm text-gray-500 font-medium">Business Diagnostic</span>
          <span className="text-sm text-gray-600 font-semibold">{progress}% Completed</span>
        </div>

        {isScoredStep && q && (
          <div key={q.id} className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm mb-6 slide-in-right">
            <p className="text-sm text-gray-500 mb-3">
              <Stream s={seq.next(q.module)} />
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 leading-[1.03] tracking-tight">
              <Stream s={seq.next(q.text)} />
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-8">
              <Stream s={seq.next(q.helpText)} />
            </p>

            <div className="flex flex-col gap-3 sm:gap-3.5">
              {[...q.options]
                .sort((a, b) => {
                  if (a.value === DONT_KNOW_VALUE) return -1;
                  if (b.value === DONT_KNOW_VALUE) return 1;
                  return a.value - b.value;
                })
                .map((opt) => {
                  const isSelected = currentAnswer === opt.value;
                  const bars = BAR_COUNT[opt.value];
                  const locked = advancing && !isSelected;
                  const sTitle = seq.next(opt.title);
                  const sDesc = seq.next(opt.description);

                  return (
                    <div key={opt.value} className={fadeIn(sTitle.started)}>
                      <button
                        type="button"
                        onClick={() => handleAnswer(q.id, opt.value)}
                        disabled={advancing}
                        aria-pressed={isSelected}
                        className={`group flex items-start gap-3.5 sm:gap-4 text-left w-full rounded-lg border-2 px-4 sm:px-5 py-3.5 sm:py-4 transition-all duration-150 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isSelected ? 'shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                          } ${locked ? 'opacity-40' : ''}`}
                        style={
                          (isSelected
                            ? { borderColor: BRAND_COLOR, backgroundColor: SELECTED_TINT, boxShadow: `0 0 0 1px ${BRAND_COLOR}22` }
                            : { '--tw-ring-color': BRAND_COLOR }) as any
                        }
                      >
                        {/* Signal-strength tower: same navy fill for every option, only
                      the bar count changes. "Don't know" reuses the exact same
                      tower with zero bars filled — a plain "no signal" reading,
                      no separate icon. */}
                        <div className="flex-shrink-0 flex items-end pt-1.5" aria-hidden="true">
                          <div className="flex items-end gap-[3px] h-5">
                            {[0, 1, 2, 3].map((i) => (
                              <span
                                key={i}
                                className="w-[3px] rounded-full transition-colors duration-150"
                                style={{
                                  height: `${7 + i * 4}px`,
                                  backgroundColor: i < bars ? BRAND_COLOR : '#E2E8F0',
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p
                            className="text-base font-semibold mb-1 transition-colors duration-150"
                            style={{ color: isSelected ? BRAND_COLOR : '#1F2937' }}
                          >
                            <Stream s={sTitle} />
                          </p>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            <Stream s={sDesc} />
                          </p>
                        </div>

                        {/* Selection tick — same consistent colour for every option,
                      a smoothed-corner square rather than a circle */}
                        <span
                          className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md border-2 mt-0.5 transition-all duration-150 ${isSelected ? '' : 'border-gray-300 bg-white group-hover:border-gray-400'
                            }`}
                          style={isSelected ? { backgroundColor: BRAND_COLOR, borderColor: BRAND_COLOR } : undefined}
                          aria-hidden="true"
                        >
                          {isSelected && (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* =====================================================
            EXTRA CARDS — same card shell/width as the scored questions
            ===================================================== */}
        {extraStep === 'capital' && (
          <div key="capital" className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm mb-6 slide-in-right">
            <p className="text-sm text-gray-500 mb-3">
              <Stream s={seq.next('About Your Journey')} />
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 leading-[1.03] tracking-tight">
              <Stream s={seq.next('How Much Capital Have You Invested So Far ?')} />
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-8">
              <Stream s={seq.next('Include everything put into the business till now: your own money, funds raised, and any other money spent.')} />
            </p>
            <StreamSelect
              seg={seq.next('Select an option')}
              ariaLabel="Capital invested"
              value={profile.capitalInvested ?? ''}
              onChange={(v) => updateProfile({ capitalInvested: v })}
              options={CAPITAL_OPTIONS}
            />
            <div className={fadeIn(seq.reached())}>
              <ContinueButton disabled={!profile.capitalInvested} onClick={moveToNextStep} />
            </div>
          </div>
        )}

        {extraStep === 'time' && (
          <div key="time" className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm mb-6 slide-in-right">
            <p className="text-sm text-gray-500 mb-3">
              <Stream s={seq.next('About Your Journey')} />
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 leading-[1.03] tracking-tight">
              <Stream s={seq.next('How Much Time Have You Invested So Far ?')} />
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-8">
              <Stream s={seq.next('Roughly how long have you been working on this business, from the day you started on it.')} />
            </p>
            <StreamSelect
              seg={seq.next('Select an option')}
              ariaLabel="Time invested"
              value={profile.timeInvested ?? ''}
              onChange={(v) => updateProfile({ timeInvested: v })}
              options={TIME_OPTIONS}
            />
            <div className={fadeIn(seq.reached())}>
              <ContinueButton disabled={!profile.timeInvested} onClick={moveToNextStep} />
            </div>
          </div>
        )}

        {extraStep === 'funding' && (
          <div key="funding" className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm mb-6 slide-in-right">
            <p className="text-sm text-gray-500 mb-3">
              <Stream s={seq.next('About Your Journey')} />
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 leading-[1.03] tracking-tight">
              <Stream s={seq.next('Have You Raised Any Initial Funds ?')} />
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-8">
              <Stream s={seq.next('Money that came into the business from someone other than customers. Choose No if you have not raised any yet.')} />
            </p>

            <StreamSelect
              seg={seq.next('Select an option')}
              ariaLabel="Raised initial funds"
              value={profile.raisedFunds === null ? '' : profile.raisedFunds ? 'Yes' : 'No'}
              onChange={(v) =>
                v === 'Yes'
                  ? updateProfile({ raisedFunds: true })
                  : updateProfile({ raisedFunds: false, fundingSource: null, fundingSourceOther: '', fundingAmount: null })
              }
              options={['Yes', 'No']}
            />

            {/* Step 2 — appears (and writes itself out) only after "Yes" */}
            {profile.raisedFunds === true && (
              <div className="mt-6">
                <label className="block text-base font-medium text-[#0A1E3D] mb-1.5">
                  <Stream s={seq.next('Where Did the Funds Come From ?')} />
                </label>
                <StreamSelect
                  seg={seq.next('Select an option')}
                  ariaLabel="Source of funds"
                  value={profile.fundingSource ?? ''}
                  onChange={(v) =>
                    updateProfile({
                      fundingSource: v,
                      fundingSourceOther: v === 'Other' ? profile.fundingSourceOther : '',
                    })
                  }
                  options={FUNDING_SOURCE_OPTIONS}
                />

                {profile.fundingSource === 'Other' && (
                  <StreamInput
                    seg={seq.next('Please tell us the source')}
                    value={profile.fundingSourceOther}
                    onChange={(v) => updateProfile({ fundingSourceOther: v })}
                  />
                )}
              </div>
            )}

            {/* Step 3 — appears only after a source has been chosen */}
            {profile.raisedFunds === true && profile.fundingSource && (
              <div className="mt-6">
                <label className="block text-base font-medium text-[#0A1E3D] mb-1.5">
                  <Stream s={seq.next('How Much Have You Raised in Total ?')} />
                </label>
                <StreamSelect
                  seg={seq.next('Select an option')}
                  ariaLabel="Total funds raised"
                  value={profile.fundingAmount ?? ''}
                  onChange={(v) => updateProfile({ fundingAmount: v })}
                  options={FUNDING_AMOUNT_OPTIONS}
                />
              </div>
            )}

            <div className={fadeIn(seq.reached())}>
              <ContinueButton
                disabled={
                  profile.raisedFunds === null ||
                  (profile.raisedFunds === true &&
                    (!profile.fundingSource ||
                      (profile.fundingSource === 'Other' && !profile.fundingSourceOther.trim()) ||
                      !profile.fundingAmount))
                }
                onClick={moveToNextStep}
              />
            </div>
          </div>
        )}

        {extraStep === 'areas' && (
          <div key="areas" className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm mb-6 slide-in-right">
            <p className="text-sm text-gray-500 mb-3">
              <Stream s={seq.next('Where You Need Help')} />
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 leading-[1.03] tracking-tight">
              <Stream s={seq.next('Which Areas Do You Need Help In ?')} />
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-8">
              <Stream s={seq.next('Tap Yes on every area where you would like expert support. Select at least one. Tap again to unselect.')} />
            </p>

            <div className="flex flex-col gap-3 sm:gap-3.5">
              {HELP_AREAS.map((area) => {
                const sTitle = seq.next(area.title);
                const sDesc = seq.next(area.description);
                return (
                  <div key={area.id} className={fadeIn(sTitle.started)}>
                    <HelpAreaRow
                      title={<Stream s={sTitle} />}
                      description={<Stream s={sDesc} />}
                      selected={profile.helpAreas[area.id] === true}
                      onToggle={() =>
                        updateProfile({ helpAreas: { ...profile.helpAreas, [area.id]: !profile.helpAreas[area.id] } })
                      }
                    />
                  </div>
                );
              })}
            </div>

            <div className={fadeIn(seq.reached())}>
              <ContinueButton
                disabled={!Object.values(profile.helpAreas).some(Boolean)}
                onClick={moveToNextStep}
              />
            </div>
          </div>
        )}

        {extraStep === 'problems' && (
          <div key="problems" className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm mb-6 slide-in-right">
            <p className="text-sm text-gray-500 mb-3">
              <Stream s={seq.next('Your Challenges')} />
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 leading-[1.03] tracking-tight">
              <Stream s={seq.next('What Problems Are You Facing in Your Business ?')} />
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-6">
              <Stream s={seq.next('Describe them in your own words, in as much detail as you can.')} />
            </p>
            <StreamTextarea
              seg={seq.next(PROBLEMS_PLACEHOLDER)}
              value={profile.problems}
              onChange={(v) => updateProfile({ problems: v })}
              rows={9}
            />
            <p className="text-xs text-gray-400 text-right mt-1.5">{profile.problems.length} / {MAX_TEXT_LENGTH}</p>
            <div className={fadeIn(seq.reached())}>
              <ContinueButton disabled={!profile.problems.trim()} onClick={moveToNextStep} />
            </div>
          </div>
        )}

        {extraStep === 'goal' && (
          <div key="goal" className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm mb-6 slide-in-right">
            <p className="text-sm text-gray-500 mb-3">
              <Stream s={seq.next('Your Goals')} />
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 leading-[1.03] tracking-tight">
              <Stream s={seq.next('What Is Your Next Financial Goal for Your Business ?')} />
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-6">
              <Stream s={seq.next('Tell us what you are aiming for next, and roughly by when.')} />
            </p>
            <StreamTextarea
              seg={seq.next(GOAL_PLACEHOLDER)}
              value={profile.nextFinancialGoal}
              onChange={(v) => updateProfile({ nextFinancialGoal: v })}
              rows={7}
            />
            <p className="text-xs text-gray-400 text-right mt-1.5">{profile.nextFinancialGoal.length} / {MAX_TEXT_LENGTH}</p>
            <div className={fadeIn(seq.reached())}>
              <ContinueButton label="Finish" disabled={!profile.nextFinancialGoal.trim()} onClick={moveToNextStep} />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 mt-7" aria-label="Question progress">
          {Array.from({ length: totalSteps }, (_, index) => {
            const done = index < currentQ || (index === currentQ && advancing);
            const isCurrent = index === currentQ;

            return (
              <span
                key={index}
                aria-label={`Step ${index + 1}${done ? ', answered' : ''}`}
                className={`rounded-full transition-all duration-300 ${isCurrent ? 'w-3 h-3 bg-[#0A1E3D] ring-4 ring-[#0A1E3D]/10' : done ? 'w-2.5 h-2.5 bg-[#0A1E3D]' : 'w-2.5 h-2.5 bg-gray-300'
                  }`}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}