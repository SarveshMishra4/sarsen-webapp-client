'use client';

import { useState, useRef, FormEvent } from 'react';

// =====================================================
// CONFIG
// =====================================================
// Set NEXT_PUBLIC_API_URL in your frontend's .env (e.g. http://localhost:4000
// in dev, your production API domain in prod).
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// =====================================================
// QUESTION BANK — 22 questions across 9 canvas areas
// =====================================================
const QUESTIONS = [
  {
    id: 'q1',
    module: 'Market Structure',
    canvasArea: 'customer_segments',
    text: 'How easy is it for new competitors to enter your market right now?',
    helpText: 'Consider capital requirements, regulatory barriers, and existing customer switching costs.',
    scores: {
      1: 'Market is nearly impenetrable — massive capital, heavy regulation, and deep lock-in make entry almost impossible',
      3: 'Significant barriers exist — meaningful investment or regulatory approval needed, though not insurmountable',
      5: 'Moderate barriers — funded startups can realistically enter within 12–18 months with the right team',
      7: 'Low barriers — a small team with standard resources can launch and compete within months',
      10: 'Zero barriers — anyone with a laptop and internet connection can enter and compete immediately',
    },
  },
  {
    id: 'q2',
    module: 'Market Structure',
    canvasArea: 'value_proposition',
    text: 'How strong is the threat from substitute solutions that solve the same customer problem differently?',
    helpText: 'Think about fundamentally different approaches — not just direct competitors.',
    scores: {
      1: 'No real substitutes — customers can only solve this problem your way',
      3: 'Weak substitutes exist but are significantly inferior in quality or convenience',
      5: 'Partial substitutes exist that solve parts of the problem adequately',
      7: 'Strong substitutes exist and customers actively consider them before choosing you',
      10: 'Multiple substitutes are actively preferred by significant segments — you are fighting for relevance',
    },
  },
  {
    id: 'q3',
    module: 'Market Opportunity',
    canvasArea: 'revenue_streams',
    text: 'How credible and well-constructed is your market size (TAM) claim?',
    helpText: 'Has it been triangulated from multiple sources with realistic share assumptions and bottom-up validation?',
    scores: {
      1: 'No credible TAM — vague borrowed numbers with no segmentation or validation whatsoever',
      3: 'A regional TAM is cited with basic segmentation but no realistic share calculation or bottom-up check',
      5: 'TAM is segmented and regionally adjusted with a penetration rate, but not fully triangulated',
      7: 'TAM triangulated from multiple sources with comparable company benchmarks validating the share assumption',
      10: 'Fully defensible — bottom-up, top-down, and competitor revenue cross-check all converge within 20–30%',
    },
  },
  {
    id: 'q4',
    module: 'Market Opportunity',
    canvasArea: 'value_proposition',
    text: 'How structural — versus temporary — is the market growth driving demand for your solution?',
    helpText: 'Structural = demographic, technological, or behavioural shifts. Temporary = one-off events or trends.',
    scores: {
      1: 'Growth appears entirely temporary — a one-time regulatory change or short-lived trend is driving it',
      3: 'Growth drivers are mixed — partly structural, partly cyclical or temporary',
      5: 'Mostly structural but one or two key assumptions need to hold for growth to continue',
      7: 'Clearly structural — demographic, technological, or behavioural shifts are the primary driver',
      10: 'Multi-factor structural growth — multiple independent forces all pointing in the same direction simultaneously',
    },
  },
  {
    id: 'q5',
    module: 'Competitive Advantage',
    canvasArea: 'key_resources',
    text: 'How rare and difficult to replicate are your most important competitive assets?',
    helpText: 'Consider technology, data, brand, network effects, relationships, or proprietary know-how.',
    scores: {
      1: 'All key assets are industry standard — any competitor has them or can acquire them trivially',
      3: 'Assets are common but not universal — competitors have equivalents and possession is not genuinely rare',
      5: 'Some assets are moderately rare — a well-funded competitor could develop equivalents within 12–24 months',
      7: 'Key assets are genuinely difficult to replicate — path dependency or compounding advantages protect them',
      10: 'Assets are virtually irreplicable — network effects, compounding data, or regulatory exclusivity create structural protection',
    },
  },
  {
    id: 'q6',
    module: 'Competitive Advantage',
    canvasArea: 'key_activities',
    text: 'How strong is your current product relative to competitors on the dimensions customers actually care about?',
    helpText: 'Not what you believe — what customers consistently choose when given a fair comparison.',
    scores: {
      1: 'Clearly inferior to at least one well-funded competitor on the primary dimensions driving customer choice',
      3: 'At parity with most competitors — no clear product advantage on the dimensions that matter most',
      5: 'Marginally better in one or two dimensions but not decisively ahead overall',
      7: 'Clearly better than most competitors on the primary customer value dimensions',
      10: 'Significantly superior across multiple dimensions — customers consistently choose you in fair comparisons',
    },
  },
  {
    id: 'q7',
    module: 'Business Model',
    canvasArea: 'value_proposition',
    text: 'How validated is your value proposition by actual customer behaviour — not surveys, but real purchase, retention, and referral?',
    helpText: 'Genuine product-market fit shows through customers returning, referring others, and being disappointed if you disappeared.',
    scores: {
      1: 'No validation — the value proposition is entirely theoretical with no customers having confirmed it with behaviour',
      3: 'A handful of early customers purchased but churn is high, suggesting the value proposition is not landing',
      5: 'Meaningful customers have purchased and some return, but the signal is not yet strong enough to confirm deep resonance',
      7: 'Retention above sector average, customers refer others, and feedback consistently echoes your articulated proposition',
      10: 'Clear PMF signals — customers return unprompted, refer actively, and would be genuinely disappointed if you disappeared',
    },
  },
  {
    id: 'q8',
    module: 'Business Model',
    canvasArea: 'channels',
    text: 'How effective and owned are your customer acquisition channels?',
    helpText: 'Owned channels = organic search, direct relationships, referral networks. Rented = paid ads, third-party platforms.',
    scores: {
      1: 'Channels are undefined or entirely rented — growth stops immediately without paid spend',
      3: 'Channels exist but are expensive and mostly rented — CAC is not supporting healthy unit economics',
      5: 'Functional mix of owned and rented channels — some owned progress but majority still rented',
      7: 'One or more channels working well with healthy CAC and meaningful owned channel development underway',
      10: 'Predominantly owned channels — organic, referral, and direct relationships drive the majority of acquisition',
    },
  },
  {
    id: 'q9',
    module: 'Business Model',
    canvasArea: 'customer_relationships',
    text: 'How well does your business manage the post-acquisition customer relationship — onboarding, retention, and expansion?',
    helpText: 'Is customer success a competitive advantage or an operational afterthought?',
    scores: {
      1: 'No structured customer relationship management — customers are acquired and left to figure it out independently',
      3: 'Basic support exists but onboarding is weak — many customers churn before experiencing full product value',
      5: 'Functional but inconsistent — quality varies significantly by team member or circumstance',
      7: 'Structured and consistent onboarding, responsive support, and a clear expansion motion',
      10: 'Customer success is a competitive advantage — systematised onboarding, proactive expansion, and measurably superior retention',
    },
  },
  {
    id: 'q10',
    module: 'Business Model',
    canvasArea: 'revenue_streams',
    text: 'How recurring, predictable, and growing are your revenue streams?',
    helpText: 'Recurring revenue from subscriptions or repeat purchases compounds. Transactional revenue requires constant reselling.',
    scores: {
      1: 'Entirely transactional — unpredictable, deal-by-deal, with no recurring base whatsoever',
      3: 'Mostly transactional with early signs of recurring revenue but no meaningful base established',
      5: 'Roughly equal transactional and recurring — moderate predictability but still concentrated',
      7: 'Predominantly recurring — majority from subscriptions or repeat purchases with reasonable forecast visibility',
      10: 'Highly recurring and expanding — contracted base, low churn, and growing from both new and existing customers',
    },
  },
  {
    id: 'q11',
    module: 'Financial Health',
    canvasArea: 'cost_structure',
    text: 'How healthy are your unit economics — the relationship between customer acquisition cost and lifetime value?',
    helpText: 'LTV:CAC above 3:1 is the baseline threshold. Payback period under 12 months is considered healthy.',
    scores: {
      1: 'Unit economics are structurally broken — the business cannot become profitable without fundamental model change',
      3: 'Significantly broken — high CAC, low LTV, and the path to improvement requires unvalidated assumptions',
      5: 'Weak but with a credible, time-bound path to improvement — not yet irreparable',
      7: 'Functional — recovering acquisition cost, positive contribution margin, and early improvement trends visible',
      10: 'Strong — LTV:CAC is healthy, contribution margin is high, payback period is short, and all trends improve',
    },
  },
  {
    id: 'q12',
    module: 'Financial Health',
    canvasArea: 'cost_structure',
    text: 'How strong is your gross margin, and is it improving as you scale?',
    helpText: 'Below 20% = commodity. 40–60% = services-heavy tech. Above 60% = healthy SaaS. Above 75% = best-in-class.',
    scores: {
      1: 'Below 20% — unsustainable without massive volume and no trajectory toward improvement',
      3: '20–40% — below average for technology, with no clear path toward improvement',
      5: '40–60% — adequate but not yet demonstrating the operating leverage of a scalable model',
      7: '60–75% — healthy and improving as the business demonstrates early operating leverage',
      10: 'Above 75% and widening — strong product economics with significant reinvestment capacity compounding',
    },
  },
  {
    id: 'q13',
    module: 'Financial Health',
    canvasArea: 'revenue_streams',
    text: 'How much runway do you have, based on a realistic forward-looking burn projection?',
    helpText: 'Below 6 months = existential crisis. 6–9 = dangerous. 9–12 = uncomfortable. 12–18 = adequate. Above 18 = strong.',
    scores: {
      1: 'Below 6 months — the business is in immediate financial distress with no strategic options',
      3: '6–9 months — dangerously short, cannot execute any initiative without simultaneously solving capital',
      5: '9–12 months — uncomfortable, fundraising must begin immediately to avoid distraction',
      7: '12–18 months — adequate runway to execute and fundraise from a position of reasonable strength',
      10: 'Above 18 months with a stress-tested runway calculation and clear milestone plan — operating from leverage',
    },
  },
  {
    id: 'q14',
    module: 'Product & PMF',
    canvasArea: 'key_activities',
    text: 'How strongly are customers retained at month 1, month 3, and month 6 after acquisition?',
    helpText: 'Retention is the single most reliable indicator of product-market fit. If customers don\'t return unprompted, no acquisition investment builds a sustainable business.',
    scores: {
      1: 'Below 20% retention at month 1 — the product is failing to deliver on its initial promise almost universally',
      3: '20–35% at month 1, continuing to decline — almost no durable retained core is forming',
      5: '35–50% at month 1 with some flattening by month 6 — a retained core is forming but below strong PMF levels',
      7: '50–70% at month 1 with meaningful flattening — majority retained and habit formation is visible',
      10: 'Above 70% at month 1, flattening quickly and holding high through month 6 — strong PMF, large durable retained core',
    },
  },
  {
    id: 'q15',
    module: 'Product & PMF',
    canvasArea: 'key_activities',
    text: 'What percentage of new customers arrive organically — through word of mouth, unprompted referral, or organic discovery?',
    helpText: 'Organic growth is the market telling you the product has genuine pull. Paid growth can look like traction. Organic growth is the real signal.',
    scores: {
      1: '0–5% organic — entirely dependent on paid channels, growth stops immediately if spend is removed',
      3: '5–15% organic — some signal exists but the business is overwhelmingly dependent on paid channels',
      5: '15–30% organic — meaningful contribution but paid channels still dominate acquisition',
      7: '30–50% organic — a major growth driver alongside paid, indicating genuine market pull is developing',
      10: 'Above 50% organic — the majority of customers arrive without paid incentive, clear evidence of real pull',
    },
  },
  {
    id: 'q16',
    module: 'Product & PMF',
    canvasArea: 'key_resources',
    text: 'Does growth compound — does each new customer make the product more valuable or lower the cost of acquiring the next?',
    helpText: 'A flywheel is a compounding growth mechanism. Without one, growth is linear and permanently capital-intensive.',
    scores: {
      1: 'No flywheel — growth is purely linear, every customer costs as much to acquire as the last',
      3: 'A flywheel is described but no evidence it is operating — entirely theoretical at this stage',
      5: 'Early evidence of compounding — the mechanism is visible in data but small enough to be explained by other factors',
      7: 'Clear flywheel evidence — CAC declining, organic acquisition increasing, or quality improving as a function of scale',
      10: 'Demonstrably spinning and accelerating — compounding is the primary driver of growth efficiency',
    },
  },
  {
    id: 'q17',
    module: 'Team',
    canvasArea: 'key_partners',
    text: 'How strong is the founder\'s domain expertise and direct experience of the problem being solved?',
    helpText: 'Insider knowledge means understanding the customer\'s pain, context, and workaround behaviours better than they can articulate themselves.',
    scores: {
      1: 'Founder identified the opportunity from outside through research — no direct personal experience of the problem',
      3: 'Some peripheral exposure but lacks the insider intuition that comes from deep personal experience',
      5: 'Meaningful exposure through work or research but not enough time inside the industry for differentiated insight',
      7: 'Directly experienced the problem as a practitioner or customer over a meaningful period, with genuine insider intuition',
      10: 'Years inside this exact problem — tried existing solutions, found them insufficient, has insights impossible for outsiders to replicate',
    },
  },
  {
    id: 'q18',
    module: 'Team',
    canvasArea: 'key_resources',
    text: 'How strong is the founder\'s track record of execution — shipping, selling, building teams, and iterating quickly under pressure?',
    helpText: 'Track record is the only objective evidence of future execution capability. Everything else is potential.',
    scores: {
      1: 'First attempt — no prior proof of taking anything from concept to paying customers or building any team',
      3: 'Weak track record — has started something before but did not reach meaningful validation or revenue',
      5: 'Moderate — has taken a product to paying customers but at small scale or in a very different domain',
      7: 'Strong — successfully taken one or more products from concept to meaningful revenue in a relevant context',
      10: 'Exceptional — has done this multiple times across different conditions, built strong teams, iterated decisively under pressure',
    },
  },
  {
    id: 'q19',
    module: 'Risk',
    canvasArea: 'customer_segments',
    text: 'How rigorously has the business defined and stress-tested best, base, and worst-case scenarios?',
    helpText: 'A business that can only succeed in its best case is not a business — it is a bet. Scenario thinking protects against being surprised.',
    scores: {
      1: 'No scenario thinking — operating on a single expected outcome with no genuine stress-testing of assumptions',
      3: 'Scenarios defined in broad terms but assumptions are unstated and worst case is unrealistically mild',
      5: 'Three scenarios defined with some specificity but worst case avoids the most uncomfortable failure modes',
      7: 'Credible scenarios with explicit assumptions, calibrated probabilities, and an honest worst case including existential risks',
      10: 'Rigorous and operationally integrated — updated as new evidence arrives, used to make specific capital and risk decisions',
    },
  },
  {
    id: 'q20',
    module: 'Operations',
    canvasArea: 'key_activities',
    text: 'How consistently and scalably does your delivery engine fulfil the core value proposition?',
    helpText: 'A broken delivery engine produces churn regardless of how strong your demand generation is.',
    scores: {
      1: 'Delivery is inconsistent, regularly fails expectations, or depends on 1–2 individuals whose absence causes immediate failure',
      3: 'Consistent for a small number of customers but breaks down under increased volume — not built for scale',
      5: 'Consistent at current volumes but not stress-tested at higher volumes — scaling architecture not yet defined',
      7: 'Consistent at current volumes with a clear, credible plan for maintaining quality as volume increases',
      10: 'Consistent at current volumes AND proven at higher — scaling architecture in place, quality maintained under load',
    },
  },
  {
    id: 'q21',
    module: 'Monetisation',
    canvasArea: 'revenue_streams',
    text: 'Is your pricing model structured to capture value at the moment and in the manner customers actually experience it?',
    helpText: 'Pricing aligned to value delivery minimises resistance. Mis-timed or mis-metered pricing leaves revenue on the table or kills conversion.',
    scores: {
      1: 'Severe disconnect — charging significantly before or after value is experienced, creating strong customer resistance',
      3: 'Moderate disconnect — pricing timing is imperfect, creating friction at purchase or renewal for a significant portion',
      5: 'Approximately aligned — broadly correct but specific segments or use cases experience meaningful pricing friction',
      7: 'Good alignment — majority of customers pay at or close to their value experience moment with minimal resistance',
      10: 'Exceptional — pricing precisely calibrated to moment, mechanism, and magnitude of value for each segment',
    },
  },
  {
    id: 'q22',
    module: 'Monetisation',
    canvasArea: 'revenue_streams',
    text: 'What percentage of the monetisable value you create are you currently capturing as revenue?',
    helpText: 'Most businesses leave 30–60% of available revenue uncaptured through pricing gaps, missing streams, or willingness-to-pay misalignment.',
    scores: {
      1: 'Below 40% captured — more than 60% is left uncaptured through pricing gaps and missing revenue streams',
      3: '40–55% captured — a significant gap exists representing a major near-term revenue opportunity',
      5: '55–70% captured — a meaningful gap closeable through pricing optimisation and activating missing streams',
      7: '70–85% captured — a modest gap closeable through targeted optimisation rather than structural change',
      10: 'Above 85% captured — monetisation is near-optimal; primary growth lever is acquisition and expansion',
    },
  },
];

// =====================================================
// CANVAS AREA DEFINITIONS
// =====================================================
const CANVAS_AREAS: Record<string, { label: string; description: string }> = {
  value_proposition: {
    label: 'Value Proposition',
    description: 'The core problem you solve and why customers choose you',
  },
  customer_segments: {
    label: 'Customer Segments',
    description: 'Who you serve and how well you understand them',
  },
  channels: {
    label: 'Channels',
    description: 'How customers discover and choose you',
  },
  customer_relationships: {
    label: 'Customer Relationships',
    description: 'How you retain, grow, and delight customers',
  },
  revenue_streams: {
    label: 'Revenue Streams',
    description: 'How you monetise the value you deliver',
  },
  key_resources: {
    label: 'Key Resources',
    description: 'The assets that make your model work',
  },
  key_activities: {
    label: 'Key Activities',
    description: 'What you must do best to deliver value',
  },
  key_partners: {
    label: 'Key Partners',
    description: 'Who you depend on and how that relationship works',
  },
  cost_structure: {
    label: 'Cost Structure',
    description: 'What you spend and how efficiently',
  },
};

// =====================================================
// HELPERS
// =====================================================
function getAreaScore(areaKey: string, answers: Record<string, number>): number | null {
  const relevant = QUESTIONS.filter((q) => q.canvasArea === areaKey);
  const scored = relevant.filter((q) => answers[q.id] !== undefined);
  if (scored.length === 0) return null;
  return Math.round((scored.reduce((sum, q) => sum + answers[q.id], 0) / scored.length) * 10) / 10;
}

function scoreToColor(score: number | null): {
  bg: string;
  border: string;
  text: string;
  badge: string;
  label: string;
} {
  if (score === null) return { bg: 'bg-gray-100', border: 'border-gray-200', text: 'text-gray-400', badge: 'bg-gray-200 text-gray-500', label: '—' };
  if (score <= 3)  return { bg: 'bg-red-50',    border: 'border-red-200',   text: 'text-red-800',   badge: 'bg-red-100 text-red-700',   label: 'Critical' };
  if (score <= 5)  return { bg: 'bg-amber-50',  border: 'border-amber-200', text: 'text-amber-800', badge: 'bg-amber-100 text-amber-700', label: 'Weak' };
  if (score <= 7)  return { bg: 'bg-yellow-50', border: 'border-yellow-200',text: 'text-yellow-800',badge: 'bg-yellow-100 text-yellow-700', label: 'Developing' };
  if (score <= 9)  return { bg: 'bg-green-50',  border: 'border-green-200', text: 'text-green-800', badge: 'bg-green-100 text-green-700', label: 'Healthy' };
  return             { bg: 'bg-emerald-50', border: 'border-emerald-200',text: 'text-emerald-800',badge: 'bg-emerald-100 text-emerald-700', label: 'Strong' };
}

function isValidEmail(value: string): boolean {
  // Simple, permissive check — the backend does the authoritative validation.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// =====================================================
// CANVAS HEATMAP
// =====================================================
function CanvasHeatmap({ answers }: { answers: Record<string, number> }) {
  const areaScores: Record<string, number | null> = {};
  for (const key of Object.keys(CANVAS_AREAS)) {
    areaScores[key] = getAreaScore(key, answers);
  }

  const allScored = Object.values(areaScores).filter((s): s is number => s !== null);
  const overallAvg = allScored.length > 0
    ? Math.round((allScored.reduce((a, b) => a + b, 0) / allScored.length) * 10) / 10
    : null;

  const overallColors = scoreToColor(overallAvg);

  const modules = [
    { label: 'Market',               ids: ['q1','q2','q3','q4'] },
    { label: 'Competitive Advantage', ids: ['q5','q6'] },
    { label: 'Business Model',        ids: ['q7','q8','q9','q10'] },
    { label: 'Financial Health',      ids: ['q11','q12','q13'] },
    { label: 'Product & PMF',         ids: ['q14','q15','q16'] },
    { label: 'Team',                  ids: ['q17','q18'] },
    { label: 'Risk',                  ids: ['q19'] },
    { label: 'Operations',            ids: ['q20'] },
    { label: 'Monetisation',          ids: ['q21','q22'] },
  ];

  // Top 3 weakest answered areas
  const priorities = Object.entries(areaScores)
    .filter(([, s]) => s !== null)
    .sort(([, a], [, b]) => (a as number) - (b as number))
    .slice(0, 3) as [string, number][];

  function CanvasCell({
    areaKey,
    className = '',
  }: {
    areaKey: string;
    className?: string;
  }) {
    const score = areaScores[areaKey];
    const c = scoreToColor(score);
    return (
      <div className={`${c.bg} border ${c.border} rounded-md p-3 flex flex-col justify-between transition-all duration-300 ${className}`}>
        <div>
          <p className={`text-[10px] font-semibold uppercase tracking-wider ${c.text} mb-1`}>
            {CANVAS_AREAS[areaKey].label}
          </p>
          <p className={`text-[10px] ${c.text} opacity-70 leading-tight hidden sm:block`}>
            {CANVAS_AREAS[areaKey].description}
          </p>
        </div>
        <div className="flex items-end justify-between mt-2">
          <span className={`text-xl font-semibold ${c.text}`}>{score ?? '—'}</span>
          {score !== null && (
            <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${c.badge}`}>{c.label}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Overall score banner */}
      {overallAvg && (
        <div className={`${overallColors.bg} border ${overallColors.border} rounded-md px-6 py-4 flex items-center gap-4`}>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-semibold flex-shrink-0`}
            style={{ background: overallAvg <= 3 ? '#dc2626' : overallAvg <= 5 ? '#d97706' : overallAvg <= 7 ? '#ca8a04' : overallAvg <= 9 ? '#16a34a' : '#059669' }}>
            {overallAvg}
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Overall strategic health</p>
            <p className={`text-sm font-medium ${overallColors.text}`}>
              {overallAvg <= 3 ? 'Critical — fundamental rethinking required before any growth decision'
                : overallAvg <= 5 ? 'Weak — significant structural gaps that limit scalability'
                : overallAvg <= 7 ? 'Developing — workable foundation, but moat-building is urgent'
                : overallAvg <= 9 ? 'Healthy — solid base, continue building with discipline'
                : 'Strong — scale with confidence'}
            </p>
          </div>
        </div>
      )}

      {/* The canvas grid */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Business Model Canvas — Health Map</p>

        {/* Row 1: key_partners | key_activities | value_proposition | customer_relationships | customer_segments */}
        <div className="grid grid-cols-5 gap-1.5 mb-1.5">
          <CanvasCell areaKey="key_partners" />
          <CanvasCell areaKey="key_activities" />
          <CanvasCell areaKey="value_proposition" />
          <CanvasCell areaKey="customer_relationships" />
          <CanvasCell areaKey="customer_segments" />
        </div>

        {/* Row 2: cost_structure spans 2 | spacer | revenue_streams spans 2 */}
        <div className="grid grid-cols-5 gap-1.5">
          <div className="col-span-2">
            <CanvasCell areaKey="cost_structure" className="h-full" />
          </div>
          {/* Channels fills the middle */}
          <div>
            <CanvasCell areaKey="channels" className="h-full" />
          </div>
          <div className="col-span-2">
            <CanvasCell areaKey="revenue_streams" className="h-full" />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Critical (1–3)',    bg: 'bg-red-100',    text: 'text-red-700' },
          { label: 'Weak (4–5)',        bg: 'bg-amber-100',  text: 'text-amber-700' },
          { label: 'Developing (6–7)', bg: 'bg-yellow-100', text: 'text-yellow-700' },
          { label: 'Healthy (8–9)',     bg: 'bg-green-100',  text: 'text-green-700' },
          { label: 'Strong (10)',       bg: 'bg-emerald-100',text: 'text-emerald-700' },
        ].map((item) => (
          <span key={item.label} className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${item.bg} ${item.text} font-medium`}>
            <span className={`w-2 h-2 rounded-full ${item.bg.replace('100','400')}`} />
            {item.label}
          </span>
        ))}
      </div>

      {/* Module breakdown */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Module breakdown</p>
        <div className="grid grid-cols-3 gap-2">
          {modules.map((mod) => {
            const scored = mod.ids.filter((id) => answers[id] !== undefined);
            const avg = scored.length > 0
              ? Math.round((scored.reduce((sum, id) => sum + answers[id], 0) / scored.length) * 10) / 10
              : null;
            const c = scoreToColor(avg);
            return (
              <div key={mod.label} className={`${c.bg} border ${c.border} rounded-md px-3 py-2.5 flex items-center justify-between`}>
                <span className={`text-xs font-medium ${c.text}`}>{mod.label}</span>
                <span className={`text-sm font-semibold ${c.text}`}>{avg ?? '—'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategic priorities */}
      {priorities.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Immediate priorities</p>
          <div className="space-y-2">
            {priorities.map(([key, score]) => {
              const c = scoreToColor(score);
              return (
                <div key={key} className={`flex items-center gap-3 p-3 rounded-md border ${c.border} ${c.bg}`}>
                  <span className={`text-lg font-semibold ${c.text} min-w-[2rem]`}>{score}</span>
                  <div>
                    <p className={`text-sm font-medium ${c.text}`}>{CANVAS_AREAS[key].label}</p>
                    <p className="text-xs text-gray-500">{CANVAS_AREAS[key].description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// =====================================================
// MAIN COMPONENT
// =====================================================
export default function StrategyDiagnostic() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQ, setCurrentQ] = useState(0);
  // NEW: 'email' phase inserted between the last question and results.
  const [phase, setPhase] = useState<'intro' | 'questions' | 'email' | 'results'>('intro');
  const [companyName, setCompanyName] = useState('');
  const topRef = useRef<HTMLDivElement>(null);

  // NEW: email capture + submission state
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
  }

  function goNext() {
    if (currentQ < totalQ - 1) {
      setCurrentQ(currentQ + 1);
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // CHANGED: last question now leads to the email gate, not straight to results.
      setPhase('email');
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function goPrev() {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // NEW: submits email + answers to the backend, then reveals results on success.
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
          companyName: companyName.trim() || undefined,
          answers,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || 'Something went wrong. Please try again.');
      }

      setPhase('results');
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
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

  // ── INTRO ───────────────────────────────────────
  if (phase === 'intro') {
    return (
      <main className="min-h-screen bg-[#F0F4F8]">
        {/* Hero — matches site's navy hero pattern */}
        <section className="bg-[#0A1E3D] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-blue-400 text-sm font-medium tracking-wide uppercase mb-4">Strategy Consulting · Sarsen</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Strategic Diagnostic
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              22 questions drawn from a structured 10-module framework. Each score carries a specific
              meaning — not a feeling, but a defined business reality. In under 15 minutes, see exactly
              where your business is structurally sound and where it is bleeding.
            </p>
          </div>
        </section>

        {/* Card body */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-start">

              {/* What you get */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl text-gray-800">What you will receive</h2>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Business Model Canvas — colour-coded',
                      body: 'Every block of your canvas rated green to red, so you see structural health at a glance rather than reading a report.',
                    },
                    {
                      title: 'Module-by-module scores',
                      body: 'Across market structure, competitive advantage, business model, financial health, product-market fit, team, risk, operations, and monetisation.',
                    },
                    {
                      title: 'Your three highest-priority areas',
                      body: 'Ranked by severity — so the first decision you make after this is the right one, not the most visible one.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-md p-5 hover:shadow-sm transition-shadow duration-300">
                      <h3 className="text-[#0A1E3D] font-semibold text-base mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start form */}
              <div className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm">
                <h3 className="text-xl text-gray-800 font-semibold mb-6">Begin your diagnostic</h3>

                <div className="space-y-5 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[#0A1E3D] mb-1.5">
                      Company name <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Nex"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0A1E3D] text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                  {[
                    ['22 questions', 'structured across 10 strategy modules'],
                    ['~15 minutes', 'to complete the full assessment'],
                    ['Instant results', 'right after you enter your email'],
                  ].map(([label, desc]) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-[#0A1E3D] font-semibold text-sm min-w-[120px]">{label}</span>
                      <span className="text-gray-500 text-sm">{desc}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setPhase('questions')}
                  className="w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3.5 px-6 rounded-md transition-all duration-300 font-medium text-base flex items-center justify-center gap-2 group"
                >
                  <span>Start diagnostic</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  Every engagement is governed by strict professional confidentiality.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // ── EMAIL GATE (NEW) ─────────────────────────────
  if (phase === 'email') {
    const emailError = emailTouched && !isValidEmail(email) ? 'Enter a valid email address' : null;

    return (
      <main className="min-h-screen bg-[#F0F4F8]" ref={topRef}>
        <section className="bg-[#0A1E3D] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-blue-400 text-sm font-medium tracking-wide uppercase mb-4">
              {companyName ? `${companyName} · ` : ''}Diagnostic complete
            </p>
            <h1 className="text-3xl sm:text-4xl text-white mb-4 leading-tight">
              One last step before your results
            </h1>
            <p className="text-gray-300 text-base leading-relaxed">
              Enter your email so we can save your results and you can revisit them later.
              No account, no password — just this.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <form
              onSubmit={handleEmailSubmit}
              className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm"
            >
              <label className="block text-sm font-medium text-[#0A1E3D] mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                placeholder="you@company.com"
                autoFocus
                className={`w-full border rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 text-sm mb-1 ${
                  emailError
                    ? 'border-red-300 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-[#0A1E3D]'
                }`}
              />
              {emailError && (
                <p className="text-xs text-red-600 mb-3">{emailError}</p>
              )}
              {!emailError && <div className="mb-3" />}

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3 mb-4">
                  <p className="text-sm text-red-700">{submitError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3.5 px-6 rounded-md transition-all duration-300 font-medium text-base flex items-center justify-center gap-2 ${
                  submitting
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#0A1E3D] hover:bg-[#132B47] text-white'
                }`}
              >
                {submitting ? 'Saving your results…' : 'See my results'}
              </button>

              <button
                type="button"
                onClick={() => setPhase('questions')}
                className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-4 transition-colors duration-200"
              >
                ← Back to questions
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  // ── RESULTS ─────────────────────────────────────
  if (phase === 'results') {
    return (
      <main className="min-h-screen bg-[#F0F4F8]">
        <section className="bg-[#0A1E3D] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <p className="text-blue-400 text-sm font-medium tracking-wide uppercase mb-4">
              {companyName ? `${companyName} · ` : ''}Diagnostic Results
            </p>
            <h1 className="text-3xl sm:text-4xl text-white mb-3">Your Business Model Health Map</h1>
            <p className="text-gray-400 text-sm">
              {answeredCount} of {totalQ} questions answered
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm mb-8">
              <CanvasHeatmap answers={answers} />
            </div>

            <div className="bg-[#0A1E3D] rounded-md p-6 sm:p-8">
              <h3 className="text-white text-lg font-medium mb-2">What happens next?</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                This diagnostic identifies structural constraints — the things that are actually
                limiting growth, not just the things that look broken on the surface. The areas
                scored below 5 are where strategic work should begin.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={resetAll}
                  className="flex-1 border border-blue-800 text-gray-300 hover:text-white hover:border-blue-600 py-3 px-6 rounded-md transition-all duration-300 font-medium text-sm"
                >
                  Start new assessment
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2">
                  Apply for a strategy engagement
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // ── QUESTIONS ────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#F0F4F8]" ref={topRef}>
      {/* Sticky progress bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              {companyName && (
                <span className="text-xs text-gray-400 font-medium">{companyName}</span>
              )}
              <span className="text-xs text-gray-500">
                Question {currentQ + 1} of {totalQ}
              </span>
              <span className="hidden sm:inline text-xs text-gray-400">·</span>
              <span className="hidden sm:inline text-xs font-medium text-[#0A1E3D]">{q.module}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{answeredCount} answered</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-gray-100 rounded-full">
            <div
              className="h-full bg-[#0A1E3D] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-16">
        {/* Module label */}
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">{q.module}</p>

        {/* Question text */}
        <h2 className="text-2xl sm:text-3xl text-gray-800 mb-3 leading-snug">{q.text}</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">{q.helpText}</p>

        {/* Score selector */}
        <div className="bg-white border border-gray-200 rounded-md p-5 sm:p-6 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400">Critical / broken</span>
            <span className="text-xs text-gray-400">Strong / exceptional</span>
          </div>
          <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
            {[1,2,3,4,5,6,7,8,9,10].map((v) => {
              const isSelected = currentAnswer === v;
              const colorClass =
                v <= 3 ? (isSelected ? 'bg-red-600 text-white border-red-600' : 'border-red-200 text-red-700 hover:bg-red-50')
                : v <= 5 ? (isSelected ? 'bg-amber-500 text-white border-amber-500' : 'border-amber-200 text-amber-700 hover:bg-amber-50')
                : v <= 7 ? (isSelected ? 'bg-yellow-400 text-yellow-900 border-yellow-400' : 'border-yellow-200 text-yellow-700 hover:bg-yellow-50')
                : v <= 9 ? (isSelected ? 'bg-green-600 text-white border-green-600' : 'border-green-200 text-green-700 hover:bg-green-50')
                : (isSelected ? 'bg-emerald-600 text-white border-emerald-600' : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50');
              return (
                <button
                  key={v}
                  onClick={() => handleAnswer(q.id, v)}
                  className={`aspect-square rounded-md border text-sm font-semibold transition-all duration-150 ${colorClass} ${isSelected ? 'shadow-sm scale-105' : ''}`}
                >
                  {v}
                </button>
              );
            })}
          </div>

          {/* Live descriptor */}
          {currentAnswer && (() => {
            const scoreKeys = Object.keys(q.scores).map(Number).sort((a, b) => a - b);
            let closest = scoreKeys[0];
            for (const k of scoreKeys) { if (currentAnswer >= k) closest = k; }
            const c = scoreToColor(currentAnswer);
            return (
              <div className={`mt-4 pt-4 border-t border-gray-100`}>
                <p className="text-xs text-gray-400 mb-1">Score {currentAnswer} — {c.label}</p>
                <p className={`text-sm ${c.text}`}>{q.scores[closest as keyof typeof q.scores]}</p>
              </div>
            );
          })()}
        </div>

        {/* Reference guide */}
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm mb-8">
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Score reference guide</p>
          </div>
          {Object.entries(q.scores).sort(([a],[b]) => Number(a) - Number(b)).map(([score, desc]) => {
            const sv = Number(score);
            const isActive = currentAnswer !== undefined && Math.abs(currentAnswer - sv) <= 1;
            const c = scoreToColor(sv);
            return (
              <button
                key={score}
                onClick={() => handleAnswer(q.id, sv)}
                className={`w-full text-left flex gap-3 px-5 py-3 border-b border-gray-100 last:border-b-0 transition-colors duration-150 ${isActive ? c.bg : 'hover:bg-gray-50'}`}
              >
                <span className={`text-sm font-semibold min-w-[1.5rem] ${isActive ? c.text : 'text-gray-300'}`}>{score}</span>
                <span className={`text-sm leading-relaxed ${isActive ? c.text : 'text-gray-500'}`}>{desc}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={goPrev}
            disabled={currentQ === 0}
            className={`px-5 py-3 rounded-md border text-sm font-medium transition-all duration-200 ${
              currentQ === 0
                ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800'
            }`}
          >
            ← Back
          </button>
          <button
            onClick={goNext}
            disabled={!currentAnswer}
            className={`flex-1 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 group ${
              currentAnswer
                ? 'bg-[#0A1E3D] hover:bg-[#132B47] text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>{currentQ === totalQ - 1 ? 'Continue' : 'Next question'}</span>
            {currentAnswer && (
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1 mt-6 flex-wrap">
          {QUESTIONS.map((question, i) => (
            <button
              key={question.id}
              onClick={() => setCurrentQ(i)}
              title={`Q${i + 1}: ${question.module}`}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === currentQ ? 'bg-[#0A1E3D] w-6'
                : answers[question.id] ? 'bg-[#0A1E3D]/40 w-3'
                : 'bg-gray-300 w-3'
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}