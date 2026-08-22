'use client';

// =====================================================
// businessHeatMapConfig.tsx
//
// Single source of truth for the Business Heat Map's question bank,
// answer options, canvas areas, scoring logic, and the heatmap visual itself.
//
// WHY THIS FILE EXISTS:
// This content used to live only inside business-heatmap/page.tsx (the
// public-facing tool). The admin panel's Leads screen needs the exact same
// question text, area labels, and scoring visual to show a founder's
// answers in a readable way instead of raw `q1: 5` pairs — so this was
// extracted out into its own file that both sides import from.
//
// IMPORTANT: this only covers the Business Heat Map lead magnet. If a
// future lead magnet needs a similar "readable admin view," it should get
// its own config file following this same pattern — don't try to
// generalize this one across lead magnet types.
//
// ===================== UPDATE (this revision) =====================
// The question bank has been fully replaced with the 15 finalized
// founder-diagnostic questions (idea stage through pre-Series A). Two
// structural changes came with it:
//
// 1. Each question now carries its own `options` array (5 entries) instead
//    of a shared global `scores` dictionary + `SCALE` label set. Every
//    option has a short `title` (the heading shown on the button) and a
//    `description` (the "choose this if..." explanation). This replaces
//    the old generic Critical / Weak / Developing / Healthy / Strong labels,
//    which were the same across every question — the new labels are
//    specific to what's actually being asked.
// 2. Answer values are now 1 / 4 / 7 / 10 / 0. The 0 is the "I don't know /
//    haven't looked into this" option. Per instruction, an unaware answer
//    is scored as a plain 0 — not a negative number, and not excluded from
//    the average like an unanswered question would be. It's a real,
//    counted answer that happens to be the lowest one.
//
// The 9-box heatmap grid (CANVAS_AREAS) and the 9-box module breakdown
// grid in CanvasHeatmap were NOT restructured — same number of boxes, same
// bento layout, same visual pattern as before. Only which questions feed
// into which box changed, documented inline below.
//
// scaleLabel() has been replaced with optionLabel(qId, value), since a
// label now depends on which question it belongs to, not just the number.
// If the admin panel imports scaleLabel() directly, that call site needs
// to be updated to optionLabel() as part of this change.
//
// Keep this in sync with the backend's leadmagnet.constants.ts
// (QUESTION_TO_CANVAS_AREA, ANSWER_SCALE_VALUES) if questions are ever
// added, removed, or rescored — there is still no shared import between
// client/ and server/, so both sides are maintained by hand.
// =====================================================

// =====================================================
// TYPES
// =====================================================
export type AnswerValue = 0 | 1 | 4 | 7 | 10;

export type AnswerOption = {
  value: AnswerValue;
  title: string;
  description: string;
};

export type Question = {
  id: string;
  module: string; // Sarsen package this question sells into — shown above the question text
  canvasArea: string; // which of the 9 heatmap boxes this question feeds
  text: string;
  helpText: string; // support text shown under the question, before the options
  options: AnswerOption[];
};

// The score assigned when a founder selects "I don't know / haven't looked
// into this." Fixed at 0 per instruction — counted in every average, never
// negative, never excluded.
export const DONT_KNOW_VALUE: AnswerValue = 0;

// =====================================================
// QUESTION BANK — 15 finalized questions
// =====================================================
export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    module: 'Validation',
    canvasArea: 'value_proposition',
    text: 'Where does your idea currently stand in terms of real-world testing?',
    helpText: "Whether you're pre-idea or approaching Series A, this is about what you've actually done to test the idea against reality — not how much you believe in it.",
    options: [
      { value: 1, title: 'Still a hypothesis', description: "Choose this if no one outside your own head or team has reacted to the idea yet — it hasn't left the whiteboard." },
      { value: 4, title: 'Informally discussed', description: "Choose this if you've had casual chats with potential customers, but haven't tracked or documented what they actually said." },
      { value: 7, title: 'Structured interviews done', description: "Choose this if you've run structured problem interviews with 10+ prospects and can point to documented patterns in what you heard." },
      { value: 10, title: 'Evidence-backed demand', description: 'Choose this if you have documented proof — interviews, pre-orders, waitlist signups, or LOIs — that a specific segment will pay to solve this.' },
      { value: 0, title: "Haven't validated this", description: "Choose this if you haven't systematically tested this idea against real customers at all." },
    ],
  },
  {
    id: 'q2',
    module: 'Validation',
    canvasArea: 'customer_relationships',
    text: 'Which best describes how customers actually behave after using your product?',
    helpText: "This isn't about how customers say they feel — it's about what they actually do after they've used the product, which is the clearest signal of fit at any stage.",
    options: [
      { value: 1, title: 'No customers yet', description: "Choose this if you don't have paying customers yet, or it's too early to say how they behave." },
      { value: 4, title: 'One-time buyers', description: "Choose this if a few customers have paid once, but you don't track whether they come back." },
      { value: 7, title: 'Some organic return', description: 'Choose this if you track retention, and some customers return or use the product repeatedly without you prompting them.' },
      { value: 10, title: 'Retained and referring', description: 'Choose this if customers return unprompted, refer others, and would genuinely be upset if you disappeared.' },
      { value: 0, title: 'Never tracked this', description: "Choose this if you've never tracked retention or repeat usage at all." },
    ],
  },
  {
    id: 'q3',
    module: 'Validation',
    canvasArea: 'customer_segments',
    text: 'How many customer segments have you clearly identified and prioritized?',
    helpText: "A segment is only real if you can describe who's in it and why they'd choose you — not just a demographic guess.",
    options: [
      { value: 1, title: 'Targeting everyone', description: "Choose this if you're targeting 'everyone' — there's no defined segment yet." },
      { value: 4, title: 'One broad segment', description: "Choose this if you have one segment in mind, but it isn't narrowly defined." },
      { value: 7, title: '2–3 defined segments', description: "Choose this if you've defined 2–3 specific segments with clear characteristics." },
      { value: 10, title: 'Data-prioritized segments', description: "Choose this if you've defined and prioritized 2–3+ segments using real data — willingness to pay, size, accessibility." },
      { value: 0, title: 'Never structured this', description: "Choose this if you've never formally worked through customer segmentation." },
    ],
  },
  {
    id: 'q4',
    module: 'Go To Market',
    canvasArea: 'key_resources',
    text: 'How many competitors — direct or indirect — can you name and describe right now?',
    helpText: "Count on your fingers, literally. If you can't name five without pausing, that's the honest answer, not a weakness to hide.",
    options: [
      { value: 1, title: "Can't name one", description: 'Choose this if you can\'t name a single direct competitor right now.' },
      { value: 4, title: 'Know 1–2 loosely', description: "Choose this if you can name 1–2 competitors, but haven't studied them in any detail." },
      { value: 7, title: 'Know 3–4 well', description: 'Choose this if you can name 3–4 competitors and know their pricing and positioning.' },
      { value: 10, title: 'Mapped 5+ competitors', description: 'Choose this if you can name 5+ competitors, direct and indirect, and have mapped their strengths and weaknesses against yours.' },
      { value: 0, title: 'Never scanned the market', description: "Choose this if you've never done a structured competitive scan at all." },
    ],
  },
  {
    id: 'q5',
    module: 'Foundation',
    canvasArea: 'key_resources',
    text: 'If a well-funded competitor decided to copy you tomorrow, what would actually stop them?',
    helpText: 'This is the question investors ask early and often. Answer based on what\'s actually true today, not what you plan to build.',
    options: [
      { value: 1, title: 'Nothing stops them', description: 'Choose this if nothing structurally stops a well-funded competitor from outspending and out-marketing you within months.' },
      { value: 4, title: 'Survivable, not durable', description: "Choose this if you'd survive short-term, but have no durable advantage protecting you over 2–3 years." },
      { value: 7, title: 'One real advantage', description: 'Choose this if you have one structural advantage — data, relationships, brand, IP — that would take 12+ months to replicate.' },
      { value: 10, title: 'Multiple compounding advantages', description: 'Choose this if you have several compounding advantages that would be hard to replicate at any funding level.' },
      { value: 0, title: 'Never stress-tested this', description: "Choose this if you've never actually worked through this scenario for your business." },
    ],
  },
  {
    id: 'q6',
    module: 'Go To Market',
    canvasArea: 'value_proposition',
    text: 'Is your USP clearly defined, and have you tested it with real customers?',
    helpText: "A USP only counts if it changes a customer's decision — not just if it sounds good in a pitch.",
    options: [
      { value: 1, title: 'No clear USP', description: "Choose this if you can't state your USP in one sentence." },
      { value: 4, title: 'Stated, not tested', description: "Choose this if you have a USP statement, but haven't tested whether customers actually value it." },
      { value: 7, title: 'Tested, mixed signal', description: "Choose this if you've tested your USP messaging with customers and gotten mixed-to-positive reactions." },
      { value: 10, title: 'Proven to drive choice', description: 'Choose this if you have evidence — conversion data, customer quotes — that this USP is why customers choose you.' },
      { value: 0, title: 'Never articulated one', description: "Choose this if you've never actually written down a clear one-line USP." },
    ],
  },
  {
    id: 'q7',
    module: 'Go To Market',
    canvasArea: 'channels',
    text: 'How many customer acquisition channels have you actually tested and validated?',
    helpText: "Tested means you have real numbers, not a plan you intend to run.",
    options: [
      { value: 1, title: 'No defined channel', description: 'Choose this if customers arrive randomly or inconsistently, with no defined channel driving them.' },
      { value: 4, title: 'One channel, untested', description: "Choose this if you've identified one channel, but haven't tested it at any real scale." },
      { value: 7, title: '1–2 channels with CAC', description: 'Choose this if 1–2 channels are tested with a measurable cost of acquisition.' },
      { value: 10, title: 'Predictable, repeatable channels', description: 'Choose this if 2+ channels are validated with predictable, repeatable acquisition cost and conversion data.' },
      { value: 0, title: 'Never mapped channels', description: "Choose this if you haven't mapped acquisition channels systematically at all." },
    ],
  },
  {
    id: 'q8',
    module: 'Foundation',
    canvasArea: 'revenue_streams',
    text: 'How many active, monetizing revenue streams does your business currently have?',
    helpText: "Active means money is actually moving today — not a revenue model you've sketched out on paper.",
    options: [
      { value: 1, title: 'Not monetizing yet', description: "Choose this if you have one theoretical revenue stream that isn't generating revenue yet." },
      { value: 4, title: 'One active stream', description: 'Choose this if you have one active revenue stream generating some revenue.' },
      { value: 7, title: '2+ streams, one dominant', description: 'Choose this if you have 2+ revenue streams active, with one clearly dominant.' },
      { value: 10, title: 'Diversified revenue', description: 'Choose this if you have multiple active, diversified revenue streams, reducing reliance on any single one.' },
      { value: 0, title: 'Never mapped this', description: "Choose this if you haven't mapped potential revenue streams beyond your current one." },
    ],
  },
  {
    id: 'q9',
    module: 'Fundraising Readiness',
    canvasArea: 'cost_structure',
    text: 'Do you have an actual financial model — not just a running expense tracker?',
    helpText: 'A model looks forward; a tracker only looks backward. Answer based on what you actually have built.',
    options: [
      { value: 1, title: 'No model at all', description: 'Choose this if decisions are made on bank balance instinct, with no financial model in place.' },
      { value: 4, title: 'Tracking, not modeling', description: 'Choose this if you have a basic spreadsheet tracking expenses, but nothing forward-looking.' },
      { value: 7, title: '12-month model built', description: 'Choose this if you have a 12-month financial model in Excel or Sheets with stated assumptions.' },
      { value: 10, title: 'Multi-year scenario model', description: 'Choose this if you have a multi-year model with best/base/worst case scenarios, updated regularly.' },
      { value: 0, title: 'Never built one', description: "Choose this if you've never built a financial model of any kind." },
    ],
  },
  {
    id: 'q10',
    module: 'Fundraising Readiness',
    canvasArea: 'cost_structure',
    text: 'Where are you in the actual fundraising process right now?',
    helpText: "This one's naturally hard to overstate — real investor conversations tend to keep founders honest. Answer based on where things stand today, not where you hope they'll be.",
    options: [
      { value: 1, title: "Haven't started", description: "Choose this if you haven't approached any investor yet." },
      { value: 4, title: 'Informal conversations only', description: 'Choose this if you\'ve had informal conversations, but have no structured pitch deck or data room.' },
      { value: 7, title: 'Pitched with feedback', description: "Choose this if you've pitched multiple investors with a structured deck and received specific, actionable feedback." },
      { value: 10, title: 'Actively in process', description: 'Choose this if you\'re actively in process — term sheets or serious follow-up conversations are underway.' },
      { value: 0, title: 'No timeline yet', description: "Choose this if you haven't thought through a fundraising timeline at all." },
    ],
  },
  {
    id: 'q11',
    module: 'Operations & Scalability',
    canvasArea: 'key_partners',
    text: "What does your team's advisory support and prior team-building experience look like?",
    helpText: "Be honest about whether an 'advisor' is actively involved, or just a name on your website — this is about real engagement, not titles.",
    options: [
      { value: 1, title: 'No support system', description: 'Choose this if you have no advisors, and no founder has built or led a team before.' },
      { value: 4, title: 'Some experience, no advisors', description: 'Choose this if you have no formal advisors, but a founder has some prior hiring or managing experience.' },
      { value: 7, title: 'Informal advisors in place', description: 'Choose this if you have 1–2 informal advisors or mentors, plus some founder team-building experience.' },
      { value: 10, title: 'Structured support, proven team builders', description: 'Choose this if you have a structured advisory setup AND founders with proven experience building and leading teams.' },
      { value: 0, title: 'Never thought about it', description: "Choose this if you haven't thought about advisors formally at all." },
    ],
  },
  {
    id: 'q12',
    module: 'Foundation',
    canvasArea: 'key_activities',
    text: 'Do you have a defined plan for when and how you\'d pivot?',
    helpText: "This isn't about planning to fail — it's about knowing your own decision points before you're under pressure to make them.",
    options: [
      { value: 1, title: 'No pivot thinking', description: "Choose this if you haven't considered pivoting even if things stall — there are no defined triggers." },
      { value: 4, title: 'Vague intention only', description: "Choose this if you have a general sense of 'if this doesn't work we'll pivot,' but nothing documented." },
      { value: 7, title: 'Specific triggers defined', description: 'Choose this if specific metrics or timelines are defined that would trigger a pivot conversation.' },
      { value: 10, title: 'Documented framework, reviewed', description: 'Choose this if you have a documented pivot/persist framework, reviewed with the team on a set schedule.' },
      { value: 0, title: 'Never considered this', description: "Choose this if you've never thought about this formally at all." },
    ],
  },
  {
    id: 'q13',
    module: 'Scale & Expansion',
    canvasArea: 'key_activities',
    text: 'How clearly have you defined and tracked the metrics that actually drive growth?',
    helpText: 'The goal here is one clear number you and your team actually check — not a dashboard nobody opens.',
    options: [
      { value: 1, title: 'No real metrics', description: "Choose this if you don't track anything specific beyond 'are we making money.'" },
      { value: 4, title: 'Basic tracking, no North Star', description: 'Choose this if you track basic metrics like revenue and users, but have no defined North Star metric.' },
      { value: 7, title: 'North Star plus KPIs', description: 'Choose this if you have a North Star metric plus 2–3 supporting KPIs, tracked periodically.' },
      { value: 10, title: 'Dashboard tied to decisions', description: 'Choose this if you have a full dashboard reviewed weekly or monthly, and it\'s tied directly to decisions you make.' },
      { value: 0, title: "Haven't defined what matters", description: "Choose this if you haven't defined which metrics matter for your business yet." },
    ],
  },
  {
    id: 'q14',
    module: 'Foundation',
    canvasArea: 'key_activities',
    text: 'How specific and measurable is your target for the next 6 months?',
    helpText: "A target only counts if you'd know, without debate, whether you hit it or not.",
    options: [
      { value: 1, title: 'No target set', description: 'Choose this if you have no specific target set for the next 6 months.' },
      { value: 4, title: 'Direction, no numbers', description: "Choose this if you have a general direction, like 'grow revenue,' but no specific numbers attached." },
      { value: 7, title: 'Specific numeric target', description: 'Choose this if you have a specific numeric target set — revenue, users, or similar — for 6 months out.' },
      { value: 10, title: 'Broken into milestones', description: 'Choose this if your numeric target is broken into monthly milestones with clear ownership.' },
      { value: 0, title: "Haven't set one", description: "Choose this if you haven't set a target for the next 6 months at all." },
    ],
  },
  {
    id: 'q15',
    module: 'Turnaround & Stabilisation',
    canvasArea: 'cost_structure',
    text: 'How well do you understand the regulatory requirements that apply to your business?',
    helpText: "Even if your sector feels lightly regulated, answer based on what you've actually checked — not what you assume.",
    options: [
      { value: 1, title: 'Haven\'t looked into it', description: "Choose this if you haven't looked into regulatory requirements for your business yet." },
      { value: 4, title: 'Aware, not mapped', description: "Choose this if you're aware requirements exist, but haven't mapped them specifically." },
      { value: 7, title: 'Requirements mapped', description: "Choose this if you've mapped the key regulatory requirements and know what's needed for compliance." },
      { value: 10, title: 'Strategy in place', description: 'Choose this if a regulatory strategy is in place — you\'re compliant, or on a clear path, with expert input.' },
      { value: 0, title: 'Not sure it applies', description: "Choose this if you're not sure regulatory requirements are applicable to your business at all." },
    ],
  },
];

// =====================================================
// Quick lookup used by the admin Q&A view: (question id, numeric answer)
// -> the option's heading. Replaces the old scaleLabel(value) — labels are
// now per-question, so the question id is required to resolve one.
// =====================================================
export function optionLabel(qId: string, value: number): string {
  const q = QUESTIONS.find((q) => q.id === qId);
  const opt = q?.options.find((o) => o.value === value);
  return opt?.title ?? String(value);
}

// =====================================================
// ===================== UPDATE (this revision) =====================
// The old CANVAS_AREAS / 9-box "Business Model Canvas" heatmap and the
// separate "modules" breakdown grid have been retired — per review they
// weren't the most useful cut of the same 15 answers. In their place,
// CanvasHeatmap now runs the full weighted diagnostic engine
// (./businessDiagnosticEngine.ts, a TypeScript port of the Python
// early_stage_business_diagnostic algorithm) and renders its 19 outputs:
//
//   1 mega score (single overall number, contradiction-adjusted)
//   9 "Current Business Condition" outputs
//   9 "Future / Execution Readiness" outputs
//   + the engine's diagnostic statements (contradictions, primary
//     constraint, and an overall assessment)
//
// QUESTIONS, AnswerValue, DONT_KNOW_VALUE, and optionLabel above are
// UNCHANGED — the 15 raw inputs collected from the founder are untouched.
// Only what happens to those answers after submission (the processing and
// the output) has changed. The card style, score-color legend, and overall
// page structure (score circle -> grids -> priorities) are kept as close
// to the original visual language as possible.
// =====================================================
import {
  diagnose,
  hasCompleteAnswers,
  CURRENT_OUTPUTS,
  FUTURE_OUTPUTS,
  type CurrentOutputKey,
  type FutureOutputKey,
  type OutputKey,
} from './businessDiagnosticEngine';

// =====================================================
// ===================== UPDATE (this revision) =====================
// Two presentation-only changes, both scoped to CanvasHeatmap and its
// helpers below. Nothing above this line (QUESTIONS, AnswerValue,
// DONT_KNOW_VALUE, optionLabel, canvasArea wiring) was touched.
//
// 1. BENTO GRID — REPLACES the previous weight-driven version. Sizing by
//    raw OUTPUT_WEIGHTS produced an uneven, gap-prone layout (empty white
//    space, five differently-sized cells fighting for the same row).
//    This version instead hand-picks exactly TWO "featured" outputs per
//    section — chosen on business judgement, not the engine's internal
//    weighting — and gives 9 cells simple column-span classes, letting
//    ordinary CSS grid auto-flow place them. Cards only ever widen
//    HORIZONTALLY (two columns + the gap between them); no card spans
//    two rows. The 4-column layout only kicks in at md (laptop) and up;
//    sm (tablet) is 2 columns and mobile is a single stacked column.
// 2. CRITICAL INDICATOR — the earlier "border-interrupt" text label sat
//    on a filled background chip, which read as an odd floating box
//    rather than a clean interruption. That's removed. Critical cards
//    now get (a) a plain small red "CRITICAL" text mark with NO
//    background box, sitting inline in the card's own header, and (b) a
//    soft pulsing glow on the card's border (CSS animation, disabled
//    under prefers-reduced-motion) so critical cards visually draw the
//    eye through motion rather than a static badge. The legend's
//    corner-bracket band swatches are unchanged from the previous
//    revision.
//
// ===================== UPDATE (latest revision) =====================
// MEGA SCORE CARD — redesigned so the raw number does not sit alone as
// if it were the answer. The card now uses the same background color
// system as the other score cards: Critical gets a red border; all other
// bands get only a background color. The left side contains the heading
// "Overall Score" and a description making clear that the number by
// itself is not enough. The right side contains a circular dial/gauge
// that visually shows complete business strength on the same
// Critical–Weak–Developing–Healthy–Strong color scale.
//
// ===================== UPDATE (this revision) =====================
// CONCLUSION section now matches the Immediate Priorities visual:
// a single bordered/tinted box containing stacked statements with
// bullet markers, instead of the previous borderless stacking.
//
// TEXT SIZE inside Bento cards: description and band label slightly
// increased (description 11px -> 12px base, featured 14px on sm+;
// band label 12px -> 14px non-featured, 14px -> 16px featured).
// No box sizes or headings were changed.
//
// ===================== UPDATE (this revision) =====================
// SCORES ROUNDED: individual card scores and the mega score dial now
// show Math.round(score) instead of raw decimals.
//
// UNIFORM CARD TEXT: removed the `featured` size distinction. All cards
// now use the same heading size (text-sm), description size (text-xs
// sm:text-sm), band label size (text-base), and score circle size
// (w-11 h-11 text-base) — the previous "featured" sizes, applied
// consistently. This ensures every card's text is similar and slightly
// larger than the old non-featured cards.
//
// ===================== UPDATE (this revision) =====================
// LINE HEIGHT in bento cards reduced by 25% (leading-relaxed -> leading-[1.21875]).
//
// LEGEND TEXT size now matches bento description text: text-xs sm:text-sm.
//
// CONCLUSION STATEMENT text now uses text-base sm:text-sm to be larger
// on mobile and consistent with other text behaviour.
// =====================================================

// =====================================================
// SCORE -> COLOR
// Unchanged utility — still used for every grid card, on the engine's
// 0-10 output scale.
// =====================================================
// ===================== UPDATE (this revision) =====================
// New thresholds, per instruction:
//   score < 5  -> Critical (darker red, AND flagged with a visible
//                 exclamation marker on the card — not color alone)
//   score < 6  -> Weak (red — everything below 6 must read as red)
//   score >= 6 -> Developing / Healthy / Strong bands unchanged from before
// Critical and Weak are both red, but two different shades, so "below 6
// is red" holds while Critical still visually stands apart. `critical`
// is returned so callers (OutputCell) know to add the pulse instead of
// relying on shade alone.
// =====================================================
export function scoreToColor(score: number | null): { bg: string; border: string; text: string; badge: string; label: string; critical: boolean } {
  if (score === null) return { bg: 'bg-gray-100', border: 'border-gray-200', text: 'text-gray-500', badge: 'bg-gray-200 text-gray-600', label: 'Not scored', critical: false };
  if (score < 5) return { bg: 'bg-red-200', border: 'border-red-400', text: 'text-red-900', badge: 'bg-red-300 text-red-900', label: 'Critical', critical: true };
  if (score < 6) return { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-800', badge: 'bg-red-200 text-red-800', label: 'Weak', critical: false };
  if (score <= 7) return { bg: 'bg-yellow-100', border: 'border-yellow-200', text: 'text-yellow-800', badge: 'bg-yellow-200 text-yellow-800', label: 'Developing', critical: false };
  if (score <= 9) return { bg: 'bg-green-100', border: 'border-green-200', text: 'text-green-800', badge: 'bg-green-200 text-green-800', label: 'Healthy', critical: false };
  return { bg: 'bg-emerald-100', border: 'border-emerald-200', text: 'text-emerald-800', badge: 'bg-emerald-200 text-emerald-800', label: 'Strong', critical: false };
}

// -----------------------------------------------------
// CRITICAL — pulsing border glow, grid cards and the mega score card.
// The mega score card now uses the same critical border treatment as the
// grid cards; non-critical bands use only background color, no border.
// -----------------------------------------------------
const CRITICAL_PULSE_CLASS = 'critical-pulse-border';

// -----------------------------------------------------
// LEGEND — solid filled square swatch. Outline is reserved for the
// Critical entry only (passed in via the `outline` prop), so a border
// on a legend swatch consistently means "this is the critical band"
// rather than being decorative on every entry.
// -----------------------------------------------------
function LegendSwatch({ color, outline }: { color: string; outline?: boolean }) {
  return (
    <span
      className={`inline-block w-3 h-3 rounded-sm flex-shrink-0 ${outline ? 'border-2 border-red-500' : ''}`}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
}

// =====================================================
// BENTO LAYOUT — horizontal-only widening, natural auto-flow
// =====================================================
const CURRENT_WIDE: ReadonlySet<CurrentOutputKey> = new Set(['market_acceptance', 'business_model_strength', 'management_quality']);
const FUTURE_WIDE: ReadonlySet<FutureOutputKey> = new Set(['fundability', 'growth_readiness', 'executeability']);

function OutputCell({
  label,
  description,
  score,
  wide,
}: {
  label: string;
  description: string;
  score: number;
  wide: boolean;
}) {
  const c = scoreToColor(score);
  const spanClass = wide ? 'sm:col-span-2 md:col-span-2' : '';
  return (
    <div
      className={`${c.bg} border-2 ${c.critical ? `border-red-500 ${CRITICAL_PULSE_CLASS}` : c.border} rounded-md p-3 flex flex-col justify-between transition-colors duration-300 ${spanClass}`}
    >
      <div>
        <p className="text-sm font-semibold text-[#0A1E3D] mb-0.5">{label}</p>
        <p className="text-xs sm:text-sm text-[#0A1E3D] leading-[1.21875] hidden sm:block">{description}</p>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className={`inline-flex items-center justify-center rounded-full font-bold ${c.badge} w-11 h-11 text-base`}>
          {Math.round(score)}
        </span>
        <span className={`font-semibold ${c.text} text-base`}>{c.label}</span>
      </div>
    </div>
  );
}

// -----------------------------------------------------
// STRENGTH DIAL — circular gauge for the mega score card.
// It shows the same 0–10 number, the current band label, and a colored
// progress arc using the same red/yellow/green color system as the rest
// of the cards. This makes the "complete business strength" visible
// without relying on the raw score alone.
// -----------------------------------------------------
function StrengthDial({ score }: { score: number | null }) {
  const c = scoreToColor(score);

  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const progress = score === null ? 0 : Math.min(Math.max(score / 10, 0), 1);
  const dashOffset = circumference * (1 - progress);

  let strokeColor = '#9ca3af'; // gray for unscored
  if (score !== null) {
    if (score < 5) strokeColor = '#b91c1c'; // critical darker red
    else if (score < 6) strokeColor = '#dc2626'; // weak red
    else if (score <= 7) strokeColor = '#eab308'; // developing yellow
    else if (score <= 9) strokeColor = '#16a34a'; // healthy green
    else strokeColor = '#059669'; // strong emerald
  }

  return (
    <div className="relative w-28 h-28" role="img" aria-label={`Business strength: ${c.label}`}>
      <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="8"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-[#0A1E3D] leading-none">
          {score !== null ? Math.round(score) : '—'}
        </span>
        <span className="text-[11px] font-semibold text-[#0A1E3D] mt-1">
          {c.label}
        </span>
      </div>
    </div>
  );
}

export function CanvasHeatmap({ answers }: { answers: Record<string, number> }) {
  if (!hasCompleteAnswers(answers)) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-sm text-gray-500">
        Results will appear once every question has been answered.
      </div>
    );
  }

  const result = diagnose(answers);
  const megaColor = scoreToColor(result.mega.megaScore);

  const priorities = (Object.keys(result.combined) as OutputKey[])
    .sort((a, b) => result.combined[a] - result.combined[b])
    .slice(0, 3);

  function outputMeta(key: OutputKey) {
    return (CURRENT_OUTPUTS as Record<string, { label: string; description: string }>)[key]
      ?? (FUTURE_OUTPUTS as Record<string, { label: string; description: string }>)[key];
  }

  return (
    <div className="space-y-8">
      <style>{`
        @keyframes criticalPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.45); }
          50% { box-shadow: 0 0 0 6px rgba(220, 38, 38, 0); }
        }
        .critical-pulse-border { animation: criticalPulse 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .critical-pulse-border { animation: none; }
        }
      `}</style>

      {/* MEGA SCORE CARD — same color system as the other cards.
          Critical gets a red border; all other bands get only a
          background color. The raw number is intentionally moved into
          the dial on the right, not left alone. */}
      <div
        className={`rounded-md p-5 sm:p-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-left ${megaColor.bg} ${megaColor.critical ? `border-2 border-red-500 ${CRITICAL_PULSE_CLASS}` : ''}`}
      >
        <div className="flex-1">
          <p className="text-2xl font-semibold text-[#0A1E3D] mb-2">
            Overall Score
          </p>
          <p className="text-sm text-[#0A1E3D] leading-relaxed">
            Your score alone won&apos;t tell you much. Look at the dial to see your complete business strength.
          </p>
        </div>

        <div className="flex-shrink-0">
          <StrengthDial score={result.mega.megaScore} />
        </div>
      </div>

      {/* Shown once, visibly — every numeric score on this page (mega score
          and every grid cell below) is on the same 0–10 scale. Centered
          under the bento grids. */}
      <p className="text-xs font-semibold text-gray-[#0A1E3D]  -mt-4 text-center">
        All scores below are out of 10
      </p>

      {/* CURRENT BUSINESS CONDITION — 9 outputs */}
      <div>
        <p className="text-lg font-semibold text-[#0A1E3D] mb-1">Current Business Condition</p>
        <p className="text-sm text-[#0A1E3D] leading-relaxed mb-3">
          Where the business stands today, across the dimensions that determine structural health.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 sm:auto-rows-[minmax(120px,auto)] gap-1.5">
          {(Object.keys(CURRENT_OUTPUTS) as CurrentOutputKey[]).map((key) => (
            <OutputCell
              key={key}
              label={CURRENT_OUTPUTS[key].label}
              description={CURRENT_OUTPUTS[key].description}
              score={result.current[key]}
              wide={CURRENT_WIDE.has(key)}
            />
          ))}
        </div>
      </div>

      {/* LEGEND — solid filled swatches, outline reserved for Critical
          only, whole row centered under the bento grids. */}
      {/* <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-center">
        {[
          { label: 'Critical (below 5)', color: '#b91c1c', outline: true },
          { label: 'Weak (below 6)', color: '#dc2626' },
          { label: 'Developing', color: '#eab308' },
          { label: 'Healthy', color: '#16a34a' },
          { label: 'Strong', color: '#059669' },
        ].map((item) => (
          <span key={item.label} className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#0A1E3D]">
            <LegendSwatch color={item.color} outline={item.outline} />
            {item.label}
          </span>
        ))}
        <span className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#0A1E3D]">
          <span className={`inline-block w-3 h-3 rounded-sm border-2 border-red-500 ${CRITICAL_PULSE_CLASS}`} />
          Critical cards pulse — not color alone
        </span>
      </div> */}

      {/* FUTURE / EXECUTION READINESS — 9 outputs */}
      <div>
        <p className="text-lg font-semibold text-[#0A1E3D] mb-1">Future &amp; Execution Readiness</p>
        <p className="text-sm text-[#0A1E3D] leading-relaxed mb-3">
          How ready the business is to convert today&apos;s foundation into what comes next.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 sm:auto-rows-[minmax(120px,auto)] gap-1.5">
          {(Object.keys(FUTURE_OUTPUTS) as FutureOutputKey[]).map((key) => (
            <OutputCell
              key={key}
              label={FUTURE_OUTPUTS[key].label}
              description={FUTURE_OUTPUTS[key].description}
              score={result.future[key]}
              wide={FUTURE_WIDE.has(key)}
            />
          ))}
        </div>
      </div>

      {/* IMMEDIATE PRIORITIES — lowest 3 of all 18 outputs, all inside one
          single bordered/tinted box, each priority separated by a thin
          divider. */}
      {priorities.length > 0 && (
        <div>
          <p className="text-lg font-semibold text-[#0A1E3D] mb-1">Immediate Priorities</p>
          <p className="text-sm text-[#0A1E3D] leading-relaxed mb-4">
            The areas that require the most immediate attention based on the gaps identified in your diagnostic.
          </p>
          <div className="border-2 border-[#0A1E3D] bg-[#EEF2F9] rounded-md p-4 sm:p-5">
            {priorities.map((key, i) => {
              const meta = outputMeta(key);
              return (
                <div
                  key={key}
                  className={i > 0 ? 'mt-4 pt-4' : ''}
                >
                  <p className="text-base font-semibold text-[#0A1E3D] mb-1.5">{meta.label}</p>
                  <p className="text-sm text-[#0A1E3D] leading-relaxed flex items-start gap-2">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#0A1E3D] flex-shrink-0" aria-hidden="true" />
                    <span>{meta.description}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CONCLUSION — contradictions, primary constraint, and overall
          assessment, presented in the same bordered/tinted box as
          Immediate Priorities. */}
      {result.statements.length > 0 && (
        <div>
          <p className="text-lg font-semibold text-[#0A1E3D] mb-1">Conclusion</p>
          <p className="text-sm text-[#0A1E3D] leading-relaxed mb-4">
            What the pattern across your answers means, and the overall read on where things stand.
          </p>
          <div className="border-2 border-[#0A1E3D] bg-[#EEF2F9] rounded-md p-4 sm:p-5">
            {result.statements.map((s, i) => (
              <div
                key={`${s.title}-${i}`}
                className={i > 0 ? 'mt-4 pt-4' : ''}
              >
                <p className="text-base font-semibold text-[#0A1E3D] mb-1.5">{s.title}</p>
                <p className="text-sm text-[#0A1E3D] leading-relaxed flex items-start gap-2">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#0A1E3D] flex-shrink-0" aria-hidden="true" />
                  <span>{s.statement}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}