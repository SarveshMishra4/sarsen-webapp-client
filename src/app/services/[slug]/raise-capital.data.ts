// ================================================================
// raise-capital.data.ts
// INDEPENDENT content + types for the Raise Capital page.
//
// Edit this file (and RaiseCapitalPage.tsx) freely — nothing here is
// shared with the other services' content or layout.
//
// It is still registered in data.tsx (ALL_SERVICES_DATA) so that the
// hub page, getServiceBySlug(), SEO metadata etc. keep working.
//
// PAYMENT NOTE: the purchase modal only reads these fields:
//   backendId, packageNumber, title, tag, accentColor, accentColorRgb,
//   price, priceDisplay, duration, deliveryFormat, coreServices,
//   deliverables, flexibleServices, maxFlexibleSelections, questions
// If you change the structure later, keep those (or map them) when
// passing the object to <PurchaseModal />.
//
// NEW (page-only) FIELDS — not read by the purchase modal:
//   programName, listApproachResults, sCurve, programStructure,
//   learningPoints
// ================================================================

export type QuestionType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'multiselect'
  | 'number';

export interface QuestionOption { value: string; label: string; }

export interface ServiceQuestion {
  id: string;
  label: string;
  type: QuestionType;
  placeholder?: string;
  options?: QuestionOption[];
  required: boolean;
  helpText?: string;
}

export interface FlexibleServiceOption { id: string; label: string; description: string; }
export interface CustomerServiceStep { step: number; title: string; description: string; }

// ── New page-only types ─────────────────────────────────────────

/** "Results will look like this" cards (brochure page 1). */
export interface ListApproachResult { title: string; description: string; }

/** A labelled point placed ON the S-curve. `at` = 0 → 1 along the curve. */
export interface SCurveStage {
  label: string;                                   // use \n for a line break
  at: number;
  place: 'below' | 'above' | 'right' | 'left';
  nudgeX?: number;
  nudgeY?: number;
}

/** The two ends of the S-curve (lower-left = start, upper-right = end). */
export interface SCurveEnd {
  day: string;
  caption: string;
  title: string;
  points: string[];
}

export interface SCurveData {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  intro: string;
  centerTitle: string;                             // big label in the empty top-left of the S
  start: SCurveEnd;                                // LOWER-LEFT end
  end: SCurveEnd;                                  // UPPER-RIGHT end
  stages: SCurveStage[];
  gapCircleLabel: string;
  brackets: { from: number; to: number; label: string }[];
  fadingLabel: string;
  fadingNote: string;
}

/** Program structure phases (brochure pages 2–3). */
export interface ProgramPhase {
  step: string;
  title: string;
  description: string;
  points: string[];
  callout?: { stat: string; text: string };
}

/** Bento cards: founder fundraising mistakes + how Sarsen works. */
export interface LearningCard {
  id: string;
  tone: 'mistake' | 'policy';
  size: 'hero' | 'tall' | 'small';
  eyebrow: string;
  title: string;
  body: string;
  points?: string[];
  callout?: string;
}

export interface RaiseCapitalData {
  id: number;
  backendId: string;
  slug: string;
  packageNumber: string;
  title: string;
  programName: string;
  tagline: string;
  tag: string;
  accentColor: string;
  accentColorRgb: string;
  targetedFor: string;
  problemStatement: string;
  excerpt: string;
  price: number;
  priceDisplay: string;
  duration: string;
  deliveryFormat: string;
  coreServices: string[];
  flexibleServices: FlexibleServiceOption[] | null;
  maxFlexibleSelections: number | null;
  deliverables: string[];
  outcome: string;
  impactIndices: string[];
  customerServiceRoadmap: CustomerServiceStep[];
  googleSheetsNote: string;
  questions: ServiceQuestion[];

  // page-only content
  listApproachResults: ListApproachResult[];
  sCurve: SCurveData;
  programStructure: ProgramPhase[];
  learningPoints: LearningCard[];
}

export const RAISE_CAPITAL_DATA: RaiseCapitalData =
{
  id: 8,
  backendId: '6b07d936ca0caf6143024ab0',   // TODO: paste _id of the new Service document created in the backend
  slug: 'raise-capital',
  packageNumber: 'Package 3.007',
  title: 'Raise Capital',
  programName: 'Align & Accelerate Program',
  tagline: 'An investor list is not a fundraising strategy. A calculated plan is.',
  tag: 'Fundraising',
  accentColor: '#ffffff',
  accentColorRgb: '255,255,255',
  targetedFor: 'Founders raising equity, grants or alternative funding who are tired of guessing – and want a calculated ask, the right investors, a story backed by numbers, and a pipeline that keeps moving after the first meeting.',
  problemStatement: 'Most founders build a list, send cold emails, and wait. What comes back is silence, “you are too early”, or a first meeting that goes nowhere. Investors don’t back a vision on its own – they back calculated numbers. In 21 days, we rebuild your raise from zero: the right amount, the right investors, a story that holds up under questioning, and terms you fully understand before you sign.',
  excerpt: 'In 21 days you go from “how much should we raise?” to walking into investor meetings with a calculated answer. Your fund size is tied to real milestones, every rupee is allocated line by line, and you know your valuation and dilution before anyone asks. You get Investor Access to the 25 most relevant investors and Grants Access to the 5 most relevant grants – plus an investor-ready deck, a due-diligence file, and the term sheet knowledge to protect your ownership.',
  price: 780000,            // Rs. 7,800 (stored in paise) — must match the Service document in MongoDB
  priceDisplay: 'Rs. 7800',
  duration: '3 Weeks',
  deliveryFormat: '4-6 Sessions',

  coreServices: [
    'Fund Sizing Against Your Milestones',
    'Line-by-Line Allocation of Funds',
    'Valuation & Dilution Scenarios',
    'Readiness Scorecard & Gap Plan',
    'Equity vs Alternative Funding Comparison',
    'Investor Access – 25 Most Relevant Investors (by Domain, Stage & Cheque Size)',
    'Grants Access – 5 Most Relevant Government or Private Sector Grants',
  ],
  flexibleServices: null,
  maxFlexibleSelections: null,

  deliverables: [
    'Calculated Business Model & Fund Allocation Plan',
    'Investor-Ready Deck, Narrative & Tailored Investor Q&A Responses',
    'Due-Diligence Evidence File & Data Room',
    'Term Sheet, Dilution & Investor Rights Negotiation Guide',
  ],
  outcome: 'Funding-ready in 21 days – with a calculated plan, the right investors and a pipeline that moves.',
  impactIndices: ['Capital Readiness Score', 'Investor Pipeline Strength', 'Narrative Clarity Index'],

  customerServiceRoadmap: [
    { step: 1, title: 'Investor-Style Demo Discussion', description: 'Pitch to us the way you would to an investor. We question you as they would, find the gaps before they do, and size exactly how much capital you need.' },
    { step: 2, title: 'Calculated Business Model', description: 'Your vision turned into numbers investors trust – fund size, line-by-line allocation, valuation and dilution scenarios, all built from scratch.' },
    { step: 3, title: 'Investor Access & Grants Access', description: 'The 25 investors most likely to back you, and the 5 grants you are best placed to win – matched to your domain, stage and cheque size. No more cold lists.' },
    { step: 4, title: 'Narrative, Deck & Evidence', description: 'A deck and story that line up with your numbers, ready answers to the questions investors will ask, and proof for every claim you make.' },
    { step: 5, title: 'Term Sheet Readiness', description: 'Know what every clause means before you sign. Negotiate dilution and investor rights with confidence, and spot the terms that quietly cost founders their ownership.' },
    { step: 6, title: 'Pipeline Handover', description: 'A clear outreach plan and next steps for every investor in your pipeline – so meetings move forward instead of going cold.' },
  ],
  googleSheetsNote: 'Fundraising is completed within 21 days. Actual disbursement timelines may depend on investor due diligence, approval processes, and the timelines of the funding party – particularly for government grants and similar funding routes.',

  questions: [
    {
      id: 'founder_name',
      label: 'Your full name',
      type: 'text',
      placeholder: 'e.g. Alex Willman',
      required: true,
    },
    {
      id: 'business_name',
      label: 'Business name',
      type: 'text',
      placeholder: 'e.g. Nimbus Logistics',
      required: true,
    },
    {
      id: 'capital_target',
      label: 'How much capital are you looking to raise, and for what?',
      type: 'textarea',
      placeholder: 'e.g. Rs. 2 Cr to expand sales team and build version 2 of the product.',
      required: true,
    },
    {
      id: 'funding_route',
      label: 'Which funding routes are you considering? (Select all that apply)',
      type: 'multiselect',
      required: true,
      options: [
        { value: 'Angel investors', label: 'Angel investors' },
        { value: 'Venture capital', label: 'Venture capital' },
        { value: 'Government grants', label: 'Government grants' },
        { value: 'Private sector grants', label: 'Private sector grants' },
        { value: 'Debt / alternative funding', label: 'Debt / alternative funding' },
        { value: 'Not sure yet', label: 'Not sure yet' },
      ],
      helpText: 'Select all that apply.',
    },
    {
      id: 'raise_status',
      label: 'Where are you in your fundraising journey?',
      type: 'radio',
      required: true,
      options: [
        { value: 'Not started – building a plan', label: 'Not started – building a plan' },
        { value: 'Have an investor list but no responses', label: 'Have an investor list but no responses' },
        { value: 'Getting meetings but no commitment', label: 'Getting meetings but no commitment' },
        { value: 'Have a term sheet to review', label: 'Have a term sheet to review' },
      ],
    },
    {
      id: 'current_metrics',
      label: 'What are your current key numbers? (revenue, growth, burn, users)',
      type: 'textarea',
      placeholder: 'e.g. Rs. 15L monthly revenue, 10% MoM growth, Rs. 8L monthly burn.',
      required: false,
      helpText: 'Optional – rough numbers are fine.',
    },
  ],

  // ── Brochure page 1: why the investor-list approach fails ──────
  listApproachResults: [
    { title: 'Wrong Investors', description: 'Many on your list won’t fit your sector, stage or cheque size.' },
    { title: 'Silent Inboxes', description: 'Cold emails or LinkedIn messages with no warm route or reason to answer get ignored.' },
    { title: 'Response – You Are Too Early', description: 'You fail to spark investor interest because you don’t know their expectations.' },
    { title: 'Funds Never Arrive', description: 'Your vision means nothing to investors without clear and calculated numbers.' },
  ],

  // ── S-curve: lower-left = where you start, upper-right = day 21 ─
  sCurve: {
    eyebrow: 'The Raise Capital curve',
    heading: 'From stuck to funding-ready.',
    headingAccent: 'In 21 days.',
    intro: 'Most raises stall in the valley, right after the first few meetings. The Align & Accelerate Program takes you out of it and up the curve – one calculated step at a time, in 21 days.',
    centerTitle: 'ALIGN &\nACCELERATE\nPROGRAM',
    start: {
      day: 'Day 0',
      caption: 'Lower end of the curve – where most founders start',
      title: 'Stuck before the first cheque',
      points: [
        'You cannot identify who your right investors are',
        'No calculated financial model behind your ask',
        'No strong business model that holds under questioning',
        'You don’t know how to approach investors',
        'Investors stop replying after the first meeting – deals go cold',
      ],
    },
    end: {
      day: 'Day 21',
      caption: 'Upper end of the curve – where you finish',
      title: 'Funding-ready, with investors at the table',
      points: [
        'The 25 most relevant investors identified – through Investor Access',
        'Business recalculated from scratch',
        'Financial model fixed',
        'Business model fixed',
        'Term sheet terms and conditions already clear to you',
        'A growth plan that is clear to you – and to investors',
        'Investors ready with a cheque for you',
      ],
    },
    stages: [
      { label: 'DEMO\nDISCUSSION', at: 0.15, place: 'below' },
      { label: 'VALLEY OF\nDEATH', at: 0.30, place: 'below' },
      { label: 'CALCULATED\nREBUILD', at: 0.42, place: 'right', nudgeY: -10 },
      { label: 'INVESTOR &\nGRANTS ACCESS', at: 0.54, place: 'right' },
      { label: 'NARRATIVE &\nEVIDENCE', at: 0.66, place: 'right' },
      { label: 'TERM SHEET\nCLARITY', at: 0.78, place: 'right', nudgeY: 16 },
      { label: 'FUNDING\nREADY', at: 0.92, place: 'above' },
    ],
    gapCircleLabel: 'READINESS\nGAP ANALYSIS',
    brackets: [
      { from: 0.33, to: 0.56, label: 'ALIGN' },
      { from: 0.59, to: 0.86, label: 'ACCELERATE' },
    ],
    fadingLabel: 'INVESTOR-LIST\nROUTE FADES',
    fadingNote: 'The dotted line is the list-and-email route. It reaches the valley and stays flat – wrong investors, silent inboxes, “you are too early”. The curve is what a calculated raise looks like.',
  },

  // ── Brochure pages 2–3: program structure ──────────────────────
  programStructure: [
    {
      step: 'Phase 01',
      title: 'Demo Discussion: Assessing the Situation',
      description: 'Bring your pitch deck and fundraising narrative. Our experts conduct a live investor-style discussion to identify the gaps in your approach.',
      points: [
        'Real-time pitch simulation',
        'Investor-style discussion & questioning',
        'Business model & revenue stream evaluation',
        'Unit economics & financial analysis',
        'Market & positioning analysis',
        'Fundraising narrative & strategy evaluation',
        'Investor readiness gap analysis',
      ],
    },
    {
      step: 'Phase 02',
      title: 'Landscape Analysis & Investor Access',
      description: 'Receive comprehensive business, sector, competitor and investor analysis, along with an investor report and Investor Access to relevant potential investors.',
      points: [
        'Complete business analysis',
        'Sector and market analysis',
        'Competitor analysis',
        'Investor analysis and compatibility',
        'Investor report and Investor Access',
        'Grants Access – government or private sector grants',
      ],
    },
    {
      step: 'Phase 03',
      title: 'Term Sheet & Beyond',
      description: 'Prepare to negotiate the terms of investment, protect your interests, and understand the long-term implications of accepting capital.',
      points: [
        'Term sheet evaluation',
        'Equity dilution and valuation negotiation',
        'Investor rights and obligations',
        'Deal-breakers and negotiation strategy',
        'Post-investment considerations',
      ],
      callout: {
        stat: '88%',
        text: 'of VC-backed founders receive zero exit value (Wharton research). Know the terms that could cost you your ownership and future returns.',
      },
    },
  ],

  // ── Bento: general mistakes founders make while fundraising ────
  learningPoints: [
    {
      id: 'mistake-capital-why',
      tone: 'mistake',
      size: 'hero',
      eyebrow: 'Mistake 01',
      title: 'Raising without a calculated “why”',
      body: 'Investors don’t fund a number – they fund the reasoning behind it. Most founders arrive without a clear cap table and without a clear allocation of funds, planning to decide how to spend the money once it lands. Investors read that instantly, and they don’t invest.',
      points: [
        'No clear cap table – ownership and post-round dilution are unclear',
        'No line-by-line allocation of funds tied to milestones',
        'Allocation reverse-engineered after the raise, instead of actually calculated before it',
      ],
      callout: 'Allocation of funds must come from reason. Calculate first – then raise.',
    },
    {
      id: 'mistake-success-fee',
      tone: 'mistake',
      size: 'tall',
      eyebrow: 'Mistake 02',
      title: 'Attaching a success fee to the raise',
      body: 'Many founders believe their advisors should be paid a success fee once the investment happens. The market doesn’t appreciate it. In surveys of investors, success fees are seen as a red flag – a sign that part of their capital leaves the company on day one instead of funding growth.',
    },
    {
      id: 'policy-flat-fee',
      tone: 'policy',
      size: 'small',
      eyebrow: 'How Sarsen charges',
      title: 'A flat fee, paid upfront',
      body: 'Because success fees work against you at the investor’s table, Sarsen charges one flat fee upfront for the program – never a percentage of your raise.',
    },
    {
      id: 'policy-associate',
      tone: 'policy',
      size: 'small',
      eyebrow: 'Before you begin',
      title: 'Be guided by one of our associates',
      body: 'This program is recommended once you have been guided by one of our associates, after they have understood your needs.',
    },
    {
      id: 'policy-referral',
      tone: 'policy',
      size: 'small',
      eyebrow: 'Admission',
      title: 'Referrals are preferred',
      body: 'We may decline inbound requests for this program. It is better to come with a referral code from one of the members at Sarsen.',
    },
  ],
};