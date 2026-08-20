'use client';

// =====================================================
// businessHeatMapConfig.tsx
//
// Single source of truth for the Business Heat Map's question bank,
// answer scale, canvas areas, scoring logic, and the heatmap visual itself.
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
// Keep this in sync with the backend's leadmagnet.constants.ts
// (QUESTION_TO_CANVAS_AREA, ANSWER_SCALE_VALUES) if questions are ever
// added, removed, or rescored — there is still no shared import between
// client/ and server/, so both sides are maintained by hand.
// =====================================================

// =====================================================
// QUESTION BANK
// =====================================================
export const QUESTIONS = [
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
// 5-POINT ANSWER SCALE
// =====================================================
export const SCALE: {
  value: 1 | 3 | 5 | 7 | 10;
  label: string;
  active: string;
  idle: string;
  dot: string;
}[] = [
    { value: 1, label: 'Critical', active: 'bg-red-600 text-white border-red-600', idle: 'border-red-200 text-red-700 hover:bg-red-50', dot: 'bg-red-500' },
    { value: 3, label: 'Weak', active: 'bg-amber-500 text-white border-amber-500', idle: 'border-amber-200 text-amber-700 hover:bg-amber-50', dot: 'bg-amber-500' },
    { value: 5, label: 'Developing', active: 'bg-yellow-400 text-yellow-900 border-yellow-400', idle: 'border-yellow-200 text-yellow-700 hover:bg-yellow-50', dot: 'bg-yellow-400' },
    { value: 7, label: 'Healthy', active: 'bg-green-600 text-white border-green-600', idle: 'border-green-200 text-green-700 hover:bg-green-50', dot: 'bg-green-500' },
    { value: 10, label: 'Strong', active: 'bg-emerald-600 text-white border-emerald-600', idle: 'border-emerald-200 text-emerald-700 hover:bg-emerald-50', dot: 'bg-emerald-500' },
  ];

// Quick lookup used by the admin Q&A view: numeric answer -> word label.
export function scaleLabel(value: number): string {
  return SCALE.find((s) => s.value === value)?.label ?? String(value);
}

// =====================================================
// CANVAS AREA DEFINITIONS
// =====================================================
export const CANVAS_AREAS: Record<string, { label: string; description: string }> = {
  value_proposition: { label: 'Value Proposition', description: 'The core problem you solve and why customers choose you' },
  customer_segments: { label: 'Customer Segments', description: 'Who you serve and how well you understand them' },
  channels: { label: 'Channels', description: 'How customers discover and choose you' },
  customer_relationships: { label: 'Customer Relationships', description: 'How you retain, grow, and delight customers' },
  revenue_streams: { label: 'Revenue Streams', description: 'How you monetise the value you deliver' },
  key_resources: { label: 'Key Resources', description: 'The assets that make your model work' },
  key_activities: { label: 'Key Activities', description: 'What you must do best to deliver value' },
  key_partners: { label: 'Key Partners', description: 'Who you depend on and how that relationship works' },
  cost_structure: { label: 'Cost Structure', description: 'What you spend and how efficiently' },
};

// =====================================================
// HELPERS
// =====================================================
export function getAreaScore(areaKey: string, answers: Record<string, number>): number | null {
  const relevant = QUESTIONS.filter((q) => q.canvasArea === areaKey);
  const scored = relevant.filter((q) => answers[q.id] !== undefined);
  if (scored.length === 0) return null;
  return Math.round((scored.reduce((sum, q) => sum + answers[q.id], 0) / scored.length) * 10) / 10;
}

export function scoreToColor(score: number | null): { bg: string; border: string; text: string; badge: string; label: string } {
  if (score === null) return { bg: 'bg-gray-100', border: 'border-gray-200', text: 'text-gray-500', badge: 'bg-gray-200 text-gray-600', label: 'Not scored' };
  if (score <= 3) return { bg: 'bg-red-100', border: 'border-red-200', text: 'text-red-800', badge: 'bg-red-200 text-red-800', label: 'Critical' };
  if (score <= 5) return { bg: 'bg-amber-100', border: 'border-amber-200', text: 'text-amber-800', badge: 'bg-amber-200 text-amber-800', label: 'Weak' };
  if (score <= 7) return { bg: 'bg-yellow-100', border: 'border-yellow-200', text: 'text-yellow-800', badge: 'bg-yellow-200 text-yellow-800', label: 'Developing' };
  if (score <= 9) return { bg: 'bg-green-100', border: 'border-green-200', text: 'text-green-800', badge: 'bg-green-200 text-green-800', label: 'Healthy' };
  return { bg: 'bg-emerald-100', border: 'border-emerald-200', text: 'text-emerald-800', badge: 'bg-emerald-200 text-emerald-800', label: 'Strong' };
}

// =====================================================
// CANVAS HEATMAP / REPORT
// Extracted verbatim from business-heatmap/page.tsx — identical visual,
// now reusable from both the public results page and the admin panel.
// =====================================================
export function CanvasHeatmap({ answers }: { answers: Record<string, number> }) {
  const areaScores: Record<string, number | null> = {};
  for (const key of Object.keys(CANVAS_AREAS)) {
    areaScores[key] = getAreaScore(key, answers);
  }

  const allScored = Object.values(areaScores).filter((s): s is number => s !== null);
  const overallAvg = allScored.length > 0
    ? Math.round((allScored.reduce((a, b) => a + b, 0) / allScored.length) * 10) / 10
    : null;

  const circleColor = overallAvg === null ? '#9CA3AF'
    : overallAvg <= 3 ? '#dc2626'
      : overallAvg <= 5 ? '#d97706'
        : overallAvg <= 7 ? '#ca8a04'
          : overallAvg <= 9 ? '#16a34a'
            : '#059669';

  const modules = [
    { label: 'Market', ids: ['q1', 'q3'] },
    { label: 'Competitive Advantage', ids: ['q5', 'q6'] },
    { label: 'Business Model', ids: ['q7', 'q8', 'q9'] },
    { label: 'Financial Health', ids: ['q11', 'q12'] },
    { label: 'Product & PMF', ids: ['q14'] },
    { label: 'Team', ids: ['q17'] },
    { label: 'Risk', ids: ['q19'] },
    { label: 'Operations', ids: ['q20'] },
    { label: 'Monetisation', ids: ['q22'] },
  ];

  const priorities = Object.entries(areaScores)
    .filter(([, score]) => score !== null)
    .sort(([, a], [, b]) => (a as number) - (b as number))
    .slice(0, 3) as [string, number][];

  function CanvasCell({ areaKey, className = '' }: { areaKey: string; className?: string }) {
    const score = areaScores[areaKey];
    const c = scoreToColor(score);

    return (
      <div className={`${c.bg} border ${c.border} rounded-md p-4 flex flex-col justify-between transition-all duration-300 ${className}`}>
        <div>
          <p className="text-sm font-semibold text-[#0A1E3D] mb-1">{CANVAS_AREAS[areaKey].label}</p>
          <p className="text-xs text-[#0A1E3D] leading-relaxed hidden sm:block">{CANVAS_AREAS[areaKey].description}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-base font-bold ${c.badge}`}>{score ?? '—'}</span>
          {score !== null && <span className={`text-sm font-semibold ${c.text}`}>{c.label}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {overallAvg !== null && (
        <div className="bg-white border border-gray-200 rounded-md px-6 py-5 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0" style={{ background: circleColor }}>
            {overallAvg}
          </div>
          <div>
            <p className="text-2xl text-[#0A1E3D] mb-1">Overall strategic health</p>
            <p className="text-lg font-medium text-[#0A1E3D]">
              {overallAvg <= 3 ? 'Critical — fundamental rethinking required before any growth decision'
                : overallAvg <= 5 ? 'Weak — significant structural gaps that limit scalability'
                  : overallAvg <= 7 ? 'Developing — workable foundation, but moat-building is urgent'
                    : overallAvg <= 9 ? 'Healthy — solid base, continue building with discipline'
                      : 'Strong — scale with confidence'}
            </p>
          </div>
        </div>
      )}

      <div>
        <p className="text-lg font-semibold text-[#0A1E3D] mb-3">Business Health Map</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1.5">
          <CanvasCell areaKey="key_partners" />
          <CanvasCell areaKey="key_activities" />
          <CanvasCell areaKey="value_proposition" />
          <CanvasCell areaKey="customer_relationships" />
          <CanvasCell areaKey="customer_segments" />
          <div className="lg:col-span-2"><CanvasCell areaKey="cost_structure" className="h-full" /></div>
          <div><CanvasCell areaKey="channels" className="h-full" /></div>
          <div className="lg:col-span-2"><CanvasCell areaKey="revenue_streams" className="h-full" /></div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 pt-1">
        {SCALE.map((item) => (
          <span key={item.label} className="inline-flex items-center gap-1.5 text-xs text-[#0A1E3D]">
            <span className={`w-2 h-2 rounded-full ${item.dot}`} />
            {item.label}
          </span>
        ))}
      </div>

      <div>
        <p className="text-lg font-semibold text-[#0A1E3D] mb-1">Business breakdown</p>
        <p className="text-sm text-[#0A1E3D] leading-relaxed mb-4">
          A view of the core business dimensions that determine the strength, scalability, and resilience of your venture.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {modules.map((mod, index) => {
            const scored = mod.ids.filter((id) => answers[id] !== undefined);
            const avg = scored.length > 0
              ? Math.round((scored.reduce((sum, id) => sum + answers[id], 0) / scored.length) * 10) / 10
              : null;
            const c = scoreToColor(avg);
            const isLast = index === modules.length - 1;
            const bentoClass = index === 0 || index === 1 || isLast ? 'sm:col-span-1 lg:col-span-2' : '';

            return (
              <div key={mod.label} className={`${bentoClass} ${c.bg} border ${c.border} rounded-md px-4 py-3.5 flex items-center justify-between min-h-[64px]`}>
                <div className="min-w-0 pr-3">
                  <span className="text-sm font-semibold text-[#0A1E3D]">{mod.label}</span>
                </div>
                <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold flex-shrink-0 ${c.badge}`}>
                  {avg ?? '—'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {priorities.length > 0 && (
        <div>
          <p className="text-lg font-semibold text-[#0A1E3D] mb-1">Immediate Priorities</p>
          <p className="text-sm text-[#0A1E3D] leading-relaxed mb-4">
            The areas that require the most immediate attention based on the gaps identified in your diagnostic.
          </p>
          <div className="flex flex-col gap-5">
            {priorities.map(([key]) => (
              <div key={key} className="flex items-start gap-1">
                <div className="min-w-0">
                  <p className="text-base font-semibold text-[#0A1E3D] mb-1">{CANVAS_AREAS[key].label}</p>
                  <p className="text-sm text-[#0A1E3D] leading-relaxed">{CANVAS_AREAS[key].description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
