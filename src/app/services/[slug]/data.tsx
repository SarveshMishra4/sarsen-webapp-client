// ================================================================
// services.data.ts
// Single source of truth for all Sarsen Strategy Partners
// productised consulting packages.
//
// This file is imported by:
//   - /services/[slug]/page.tsx  (individual service pages)
//   - /services/page.tsx         (hub page, if migrated)
//
// COUPON LOGIC NOTE:
// Base prices are defined here. Coupon validation and discount
// amounts are resolved server-side / from the database.
// The frontend sends the coupon code to the API, receives the
// discounted price back, and re-renders the price display.
// Discount percentages are NEVER hardcoded here.
//
// BACKEND LINK NOTE:
// backendId is the MongoDB _id of the corresponding Service
// document. It is used by the buy button to call
// POST /payments/create-order. All other content (descriptions,
// questions, deliverables, roadmap) lives here in the frontend
// and is never stored in the backend.
// ================================================================

export type QuestionType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'multiselect'
  | 'number';

export interface QuestionOption {
  value: string;           // now the human‑readable label (e.g., "Solo founder")
  label: string;
}

export interface ServiceQuestion {
  id: string;           // unique key, used as form field name
  label: string;        // question text shown to user
  type: QuestionType;
  placeholder?: string;
  options?: QuestionOption[];   // for select / radio / multiselect
  required: boolean;
  helpText?: string;            // small hint below the field
}

export interface FlexibleServiceOption {
  id: string;        // now the human‑readable label (e.g., "Competitive Landscape Simplification")
  label: string;
  description: string;
}

export interface CustomerServiceStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceData {
  id: number;
  backendId: string;    // MongoDB _id — used for payments/coupons API calls
  slug: string;
  packageNumber: string;
  title: string;
  tagline: string;
  tag: ServiceTag;
  accentColor: string;      // hex — used for theming the page
  accentColorRgb: string;   // rgb values only e.g. "99,102,241" for rgba()
  targetedFor: string;
  problemStatement: string; // longer narrative for the page hero
  excerpt: string;          // shorter card description (used in hub)
  price: number;            // base price in paise (× 100 for Razorpay)
  priceDisplay: string;     // human-readable e.g. "Rs. 49,000"
  duration: string;         // e.g. "2 weeks"
  deliveryFormat: string;   // e.g. "2 sessions + async work"

  coreServices: string[];
  flexibleServices: FlexibleServiceOption[] | null; // null = fixed scope
  maxFlexibleSelections: number | null;

  deliverables: string[];
  outcome: string;
  impactIndices: string[];

  customerServiceRoadmap: CustomerServiceStep[];
  googleSheetsNote: string;

  // Unique intake questions shown in the purchase modal
  questions: ServiceQuestion[];
}

export type ServiceTag =
  | 'Foundation'
  | 'Validation'
  | 'Product Market Fit'
  | 'Go to Market'
  | 'Operations'
  | 'Fundraising'
  | 'Turnaround'
  | 'Scale';

// ================================================================
// TAG → ACCENT MAP  (imported by layout for theming)
// ================================================================

export const TAG_ACCENTS: Record<ServiceTag, { hex: string; rgb: string; bgClass: string; label: string }> = {
  Foundation:          { hex: '#ffffff', rgb: '255,255,255', bgClass: 'white', label: 'Foundation' },
  Validation:          { hex: '#ffffff', rgb: '255,255,255', bgClass: 'white', label: 'Validation' },
  'Product Market Fit': { hex: '#ffffff', rgb: '255,255,255', bgClass: 'white', label: 'Product Market Fit' },
  'Go to Market':      { hex: '#ffffff', rgb: '255,255,255', bgClass: 'white', label: 'Go to Market' },
  Operations:          { hex: '#ffffff', rgb: '255,255,255', bgClass: 'white', label: 'Operations' },
  Fundraising:         { hex: '#ffffff', rgb: '255,255,255', bgClass: 'white', label: 'Fundraising' },
  Turnaround:          { hex: '#ffffff', rgb: '255,255,255', bgClass: 'white', label: 'Turnaround' },
  Scale:               { hex: '#ffffff', rgb: '255,255,255', bgClass: 'white', label: 'Scale' },
};

// ================================================================
// ALL SERVICES (Updated based on Sarsen Products Final.pdf)
// ================================================================

export const ALL_SERVICES_DATA: ServiceData[] = [

  // ──────────────────────────────────────────────────────────────
  // BUSINESS DIAGNOSTIC (Any Stage)
  // ──────────────────────────────────────────────────────────────
  {
    id: 0,
    backendId: '69b3c3d64ad479822f297e25',   // unchanged
    slug: 'business-diagnostic-direction',
    packageNumber: 'Package 0',
    title: 'Business Diagnostic & Direction',
    tagline: 'You know something is wrong. You don’t know what. We find it.',
    tag: 'Foundation',
    accentColor: '#ffffff',
    accentColorRgb: '255,255,255',
    targetedFor: 'Any stage business – from idea to scale.',
    problemStatement: 'Most founders run on instinct and incomplete information. They feel something is broken but cannot name it precisely. This package ends that ambiguity with a structured diagnostic.',
    excerpt: 'The mandatory starting point. A diagnostic system that maps your business model, control levers, and bottlenecks – then translates that into a clear strategic direction.',
    price: 780000,            // Rs. 7,800 (1.5× original)
    priceDisplay: 'Rs. 7800',
    duration: '7 days',
    deliveryFormat: '2–3 sessions + async diagnostic',

    coreServices: [
      'Full Business Diagnostic',
      'Business Model & Value Chain Mapping',
      'Control Lever Identification',
      'Bottleneck & Constraint Ranking',
      'Metric Hygiene & KPI Baseline',
      'Strategic Direction Selection',
      '90‑Day Action Plan',
    ],
    flexibleServices: null,
    maxFlexibleSelections: null,

    deliverables: [
      'Business Health & Control Handbook',
      'Direction & Growth Stages Document',
      '90‑Day Action One‑Pager',
    ],
    outcome: 'The founder achieves clarity, control, and confidence.',
    impactIndices: ['Founder Clarity Index'],

    customerServiceRoadmap: [
      { step: 1, title: 'Introduction & Context Call', description: '30‑minute call to understand your situation before the diagnostic begins.' },
      { step: 2, title: 'Diagnostic Data Collection', description: 'Structured diagnostic sent and completed.' },
      { step: 3, title: 'Diagnostic Analysis & Scoring', description: 'Internal analysis of responses, bottleneck ranking, and direction scoring.' },
      { step: 4, title: 'Direction & Control Session', description: '90‑minute session to walk through findings and decisions.' },
      { step: 5, title: 'Delivery of All Documents', description: 'All three deliverables sent and explained.' },
      { step: 6, title: '90‑Day Post‑Delivery Review', description: 'Progress vs plan review at the 90‑day mark.' },
    ],
    googleSheetsNote: 'Protected diagnostic workbook with scoring logic, bottleneck ranking, and decision outputs.',

    questions: [
      {
        id: 'founder_name',
        label: 'Your full name',
        type: 'text',
        placeholder: 'e.g. Priya Mehta',
        required: true,
      },
      {
        id: 'business_name',
        label: 'Business name',
        type: 'text',
        placeholder: 'e.g. Finora Technologies',
        required: true,
      },
      {
        id: 'business_stage',
        label: 'Which best describes your current stage?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Pre‑revenue / idea stage', label: 'Pre‑revenue / idea stage' },
          { value: 'Early revenue (< Rs. 25L ARR)', label: 'Early revenue (< Rs. 25L ARR)' },
          { value: 'Growing (Rs. 25L – Rs. 1Cr ARR)', label: 'Growing (Rs. 25L – Rs. 1Cr ARR)' },
          { value: 'Scaling (Rs. 1Cr+ ARR)', label: 'Scaling (Rs. 1Cr+ ARR)' },
        ],
      },
      {
        id: 'primary_problem',
        label: 'In one or two sentences, what feels most unclear or broken in your business right now?',
        type: 'textarea',
        placeholder: 'Be as direct as possible – this shapes how we approach your diagnostic.',
        required: true,
        helpText: 'There is no wrong answer. Honest context makes the diagnostic more precise.',
      },
      {
        id: 'founder_role',
        label: 'How many co‑founders does the business have?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Solo founder', label: 'Solo founder' },
          { value: '2 co‑founders', label: '2 co‑founders' },
          { value: '3 or more co‑founders', label: '3 or more co‑founders' },
        ],
      },
      {
        id: 'urgency',
        label: 'What is driving the timing of this engagement now?',
        type: 'textarea',
        placeholder: 'e.g. Approaching a fundraise, team is growing fast, revenue has plateaued…',
        required: false,
        helpText: 'Optional – helps us calibrate session pace and priority.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // IDEA TO PRODUCT (Pre‑Launch)
  // ──────────────────────────────────────────────────────────────
  {
    id: 1,
    backendId: '69b3c3e94ad479822f297e27',   // unchanged (was Idea‑to‑Validation)
    slug: 'idea-to-product',
    packageNumber: 'Package 1',
    title: 'Idea To Product',
    tagline: 'From concept to launch‑ready blueprint.',
    tag: 'Validation',
    accentColor: '#ffffff',
    accentColorRgb: '255,255,255',
    targetedFor: 'Pre‑launch founders with an idea but no product yet.',
    problemStatement: 'You have an idea but don’t know if it will work. You’re about to quit your job for this. Friends love it, but will strangers pay? This package turns your idea into a structured product plan.',
    excerpt: 'Market research, business model definition, product features, pricing, marketing channels, financial expectations, and organisation structure – all in 7 days.',
    price: 2080000,           // Rs. 20,800 (2× original)
    priceDisplay: 'Rs. 20800',
    duration: '7 days',
    deliveryFormat: '3–5 sessions + async work',

    coreServices: [
      'Market Research & Validation',
      'Business Model Definition',
      'Product Features & Scope',
      'Pricing Architecture',
      'Marketing Channel Identification',
      'Financial Expectation Mapping',
      'Organisation Structure for Launch',
      'Tools & Arsenal Setup',
    ],
    flexibleServices: null,
    maxFlexibleSelections: null,

    deliverables: [
      'Product & Launch Blueprint',
      'Financial Expectation Map',
      'Organisation Structure for Launch',
    ],
    outcome: 'A clear, actionable plan to build and launch your product.',
    impactIndices: ['Idea Confidence Score', 'Launch Readiness Index'],

    customerServiceRoadmap: [
      { step: 1, title: 'Idea Interrogation Session', description: '45–60 min – deeply understand your idea, assumptions, and goals.' },
      { step: 2, title: 'Market & Model Analysis', description: 'Market research, business model design, feature definition.' },
      { step: 3, title: 'Financial & Channel Planning', description: 'Pricing, financial expectations, marketing channels.' },
      { step: 4, title: 'Organisation & Tools', description: 'Define structure and toolset for launch.' },
      { step: 5, title: 'Blueprint Handoff', description: 'Final session to walk through the complete launch plan.' },
    ],
    googleSheetsNote: 'Market research templates, financial models, and channel scoring.',

    questions: [
      {
        id: 'founder_name',
        label: 'Your full name',
        type: 'text',
        placeholder: 'e.g. Arjun Sharma',
        required: true,
      },
      {
        id: 'idea_description',
        label: 'Describe your idea in 2–3 sentences',
        type: 'textarea',
        placeholder: 'What are you building, for whom, and what problem does it solve?',
        required: true,
        helpText: 'Be specific. Vague descriptions produce vague plans.',
      },
      {
        id: 'problem_source',
        label: 'How did you discover this problem?',
        type: 'radio',
        required: true,
        options: [
          { value: 'I experienced it personally', label: 'I experienced it personally' },
          { value: 'Through market research or reading', label: 'Through market research or reading' },
          { value: 'Through customer conversations', label: 'Through customer conversations' },
          { value: 'I worked in this industry', label: 'I worked in this industry' },
          { value: 'Other', label: 'Other' },
        ],
      },
      {
        id: 'validation_done',
        label: 'What validation, if any, have you done so far?',
        type: 'textarea',
        placeholder: 'e.g. 5 customer interviews, a landing page with 80 sign‑ups, a manual pilot…',
        required: false,
        helpText: 'None is fine – that’s what this package is for.',
      },
      {
        id: 'launch_timeline',
        label: 'When do you aim to launch?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Within 1 month', label: 'Within 1 month' },
          { value: '1–3 months', label: '1–3 months' },
          { value: '3–6 months', label: '3–6 months' },
          { value: '6+ months / flexible', label: '6+ months / flexible' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // GO TO MARKET (0→1)
  // ──────────────────────────────────────────────────────────────
  {
    id: 2,
    backendId: '69b3c4074ad479822f297e2b',   // unchanged (was Go‑To‑Market Strategy)
    slug: 'go-to-market',
    packageNumber: 'Package 2',
    title: 'Go To Market',
    tagline: 'You have a product. Now you need your first real customers.',
    tag: 'Go to Market',
    accentColor: '#ffffff',
    accentColorRgb: '255,255,255',
    targetedFor: 'Product‑ready, pre‑revenue or < Rs. 5L ARR startups.',
    problemStatement: 'Product is ready but sales are not coming. You don’t know which marketing channel to try. Most founders spend Rs. 30–80K on ads before understanding why their first 100 customers bought. This service gives you that understanding first.',
    excerpt: 'Precise customer profile, unit economics clarity, pricing architecture, sales & marketing playbook, feedback mechanism design, and supply chain basics.',
    price: 3040000,           // Rs. 30,400 (2× original)
    priceDisplay: 'Rs. 30400',
    duration: '7 days',
    deliveryFormat: '3–5 sessions + analysis',

    coreServices: [
      'Precise Customer Profile (ICP)',
      'Unit Economics Clarity',
      'Pricing Architecture',
      'Sales & Marketing Playbook',
      'Feedback Mechanism Design',
      'Supply Chain Basics',
    ],
    flexibleServices: null,
    maxFlexibleSelections: null,

    deliverables: [
      'Revenue Architecture Document',
      'Playbook & First 30 Days Plan',
      'Customer Profile & Feedback Dashboard',
    ],
    outcome: 'A repeatable GTM system that gets your first paying customers.',
    impactIndices: ['GTM Readiness Score', 'CAC Clarity Index'],

    customerServiceRoadmap: [
      { step: 1, title: 'Product & Customer Interrogation', description: '45–60 min – deep dive into your product, target customer, and current sales attempts.' },
      { step: 2, title: '7‑Day Analysis', description: 'We analyse your product, market, and potential channels.' },
      { step: 3, title: 'Revenue Architecture Session', description: '60–90 min – pricing, unit economics, and channel prioritisation.' },
      { step: 4, title: 'Playbook Handoff & First 30 Days', description: '60–90 min – walk through the GTM playbook and 30‑day execution plan.' },
    ],
    googleSheetsNote: 'Channel scoring, unit economics model, and 30‑day tracker.',

    questions: [
      {
        id: 'founder_name',
        label: 'Your full name',
        type: 'text',
        placeholder: 'e.g. Rohit Batra',
        required: true,
      },
      {
        id: 'product_description',
        label: 'What is your product and who is it for?',
        type: 'textarea',
        placeholder: 'e.g. A procurement SaaS for mid‑market manufacturing companies.',
        required: true,
      },
      {
        id: 'current_channels',
        label: 'Which channels have you tried so far?',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'Outbound email / cold outreach', label: 'Outbound email / cold outreach' },
          { value: 'LinkedIn', label: 'LinkedIn' },
          { value: 'Referrals / word of mouth', label: 'Referrals / word of mouth' },
          { value: 'Content / SEO', label: 'Content / SEO' },
          { value: 'Paid ads (Google / Meta)', label: 'Paid ads (Google / Meta)' },
          { value: 'Events / conferences', label: 'Events / conferences' },
          { value: 'None yet', label: 'None yet' },
        ],
        helpText: 'Select all that apply.',
      },
      {
        id: 'revenue_status',
        label: 'Current monthly revenue (if any)',
        type: 'text',
        placeholder: 'e.g. Rs. 0 / Rs. 25,000 / Rs. 1L',
        required: true,
      },
      {
        id: 'biggest_gap',
        label: 'What do you believe is the biggest gap between your product and your first sale?',
        type: 'textarea',
        placeholder: 'e.g. No one knows about us. Pricing feels wrong. Customers don’t trust us yet.',
        required: true,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // FUNDING READINESS (Pre‑Series A)
  // ──────────────────────────────────────────────────────────────
  {
    id: 3,
    backendId: '69b3c42a4ad479822f297e2f',   // unchanged (was Fundraising Readiness)
    slug: 'funding-readiness',
    packageNumber: 'Package 3',
    title: 'Funding Readiness',
    tagline: 'Business model surgery to make you fundable.',
    tag: 'Fundraising',
    accentColor: '#ffffff',
    accentColorRgb: '255,255,255',
    targetedFor: 'Founders seeking external capital (angel/seed) who are getting rejections.',
    problemStatement: 'Getting meetings but no term sheets. Investors say “come back with more traction”. We are not a pitch deck agency. We fix the weaknesses investors will find anyway – better to address them in our room.',
    excerpt: 'Investor targeting, ask & valuation framework, business model patch‑up, pitch strategy, Q&A prep, and due diligence data room.',
    price: 4160000,           // Rs. 41,600 (2× original)
    priceDisplay: 'Rs. 41600',
    duration: '10 days',
    deliveryFormat: '3–5 sessions + metrics work',

    coreServices: [
      'Investor Targeting Strategy',
      'Ask & Valuation Framework',
      'Business Model Patch‑Up',
      'Pitch Strategy (story structure)',
      'Investor Q&A Preparation',
      'Due Diligence Data Room Setup',
    ],
    flexibleServices: null,
    maxFlexibleSelections: null,

    deliverables: [
      'Fundraising Readiness Report',
      'Investor Metrics Dashboard',
      'Data Room Structure',
    ],
    outcome: 'Prepared, confident, and realistic fundraising posture.',
    impactIndices: ['Investor Readiness Score', 'Narrative Clarity Index'],

    customerServiceRoadmap: [
      { step: 1, title: 'Fundraising Goal & Timing Session', description: 'Understand raise target, stage, timeline, and investor target list.' },
      { step: 2, title: 'Metrics & Narrative Diagnostic', description: 'Audit current metrics, narrative, and investor positioning.' },
      { step: 3, title: 'Readiness & Valuation Analysis', description: 'Readiness scoring, valuation benchmarking, narrative structuring.' },
      { step: 4, title: 'Fundraising Readiness Delivery Session', description: 'Walk through report, gaps, and the narrative that will work for your stage.' },
      { step: 5, title: 'Final Q&A & Handover', description: 'Open questions, investor outreach plan, and next steps.' },
    ],
    googleSheetsNote: 'Metric dashboards, valuation and dilution models.',

    questions: [
      {
        id: 'founder_name',
        label: 'Your full name',
        type: 'text',
        placeholder: 'e.g. Ananya Singh',
        required: true,
      },
      {
        id: 'raise_target',
        label: 'How much are you planning to raise?',
        type: 'text',
        placeholder: 'e.g. Rs. 3 Cr at Rs. 20 Cr post‑money valuation',
        required: true,
      },
      {
        id: 'raise_stage',
        label: 'What stage is this raise?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Pre‑Seed', label: 'Pre‑Seed' },
          { value: 'Seed', label: 'Seed' },
          { value: 'Series A', label: 'Series A' },
          { value: 'Bridge / extension', label: 'Bridge / extension' },
        ],
      },
      {
        id: 'current_metrics',
        label: 'What are your current key metrics? (ARR, MoM growth, retention, burn)',
        type: 'textarea',
        placeholder: 'e.g. ARR Rs. 1.2Cr, 8% MoM growth, D30 retention 55%, burn Rs. 18L/month',
        required: true,
        helpText: 'Rough numbers are fine. Honesty here saves time later.',
      },
      {
        id: 'previous_raise',
        label: 'Have you raised external capital before?',
        type: 'radio',
        required: true,
        options: [
          { value: 'No – first raise', label: 'No – first raise' },
          { value: 'Yes – from angels / friends & family', label: 'Yes – from angels / friends & family' },
          { value: 'Yes – from institutional investors', label: 'Yes – from institutional investors' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // OPTIMIZATION & SCALABILITY (1→10)
  // ──────────────────────────────────────────────────────────────
  {
    id: 4,
    backendId: '69b3c41e4ad479822f297e2d',   // unchanged (was Operations & Scalability)
    slug: 'optimization-scalability',
    packageNumber: 'Package 4',
    title: 'Optimization & Scalability',
    tagline: 'You’re growing but you’re breaking. Every new customer costs you more to serve.',
    tag: 'Operations',
    accentColor: '#ffffff',
    accentColorRgb: '255,255,255',
    targetedFor: 'Revenue Rs. 25L–2Cr, team 5–30. Business with product‑market fit, chaotic growth, founder bottleneck, margins shrinking as volume grows.',
    problemStatement: 'Revenue is there. The team exists. But nothing runs without you. Decisions queue up. Priorities conflict. Costs leak. This package fixes the structural conditions that create this.',
    excerpt: 'Standard process design, growth strategy for next stage, operational efficiency map, roles & responsibilities clarity, and organisational structure design.',
    price: 6240000,           // Rs. 62,400 (2× original)
    priceDisplay: 'Rs. 62400',
    duration: '2 weeks',
    deliveryFormat: '3–5 sessions + process mapping',

    coreServices: [
      'Standard Process Design',
      'Growth Strategy for Next Stage',
      'Operational Efficiency Map',
      'Roles & Responsibilities Clarity',
      'Organisational Structure Design',
    ],
    flexibleServices: null,
    maxFlexibleSelections: null,

    deliverables: [
      'Operations Diagnostic Report',
      'Org & Role Design Sheet',
      'Scalability Scorecard',
    ],
    outcome: 'Reduced founder dependency and operational clarity.',
    impactIndices: ['Founder Dependency Ratio', 'Operational Efficiency Score'],

    customerServiceRoadmap: [
      { step: 1, title: 'Operations Context & Pain Mapping', description: 'Understand current team structure, pain points, and founder time allocation.' },
      { step: 2, title: 'Process & Cost Diagnostic', description: 'Process mapping, cost audit, bottleneck identification.' },
      { step: 3, title: 'Structure & Bottleneck Analysis', description: 'Role clarity, decision ownership, scalability scoring.' },
      { step: 4, title: 'Operations Strategy Delivery', description: 'Walk through findings, prioritised interventions, and structural changes.' },
      { step: 5, title: 'Implementation Readiness Handover', description: 'Phased implementation plan with role assignments and success metrics.' },
    ],
    googleSheetsNote: 'Process maps, cost dashboards, scalability scoring models.',

    questions: [
      {
        id: 'founder_name',
        label: 'Your full name',
        type: 'text',
        placeholder: 'e.g. Siddharth Nair',
        required: true,
      },
      {
        id: 'team_size',
        label: 'How many people are currently in your team (including founders)?',
        type: 'radio',
        required: true,
        options: [
          { value: '1–5', label: '1–5' },
          { value: '6–15', label: '6–15' },
          { value: '16–40', label: '16–40' },
          { value: '40+', label: '40+' },
        ],
      },
      {
        id: 'biggest_ops_problem',
        label: 'What operational problem is hurting you most right now?',
        type: 'textarea',
        placeholder: 'e.g. Everything escalates to me. I cannot take more than 2 days off without something breaking.',
        required: true,
      },
      {
        id: 'revenue_range',
        label: 'Current annual revenue (ARR)',
        type: 'radio',
        required: true,
        options: [
          { value: 'Under Rs. 50L', label: 'Under Rs. 50L' },
          { value: 'Rs. 50L – Rs. 2Cr', label: 'Rs. 50L – Rs. 2Cr' },
          { value: 'Rs. 2Cr – Rs. 10Cr', label: 'Rs. 2Cr – Rs. 10Cr' },
          { value: 'Above Rs. 10Cr', label: 'Above Rs. 10Cr' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // TURNAROUND & STABILIZATION (Crisis)
  // ──────────────────────────────────────────────────────────────
  {
    id: 5,
    backendId: '69b3c43a4ad479822f297e31',   // unchanged (was Turnaround & Stabilisation)
    slug: 'turnaround-stabilisation',
    packageNumber: 'Package 5',
    title: 'Turnaround & Stabilization',
    tagline: 'The business is in freefall. Revenue dropping. Cash burning.',
    tag: 'Turnaround',
    accentColor: '#ffffff',
    accentColorRgb: '255,255,255',
    targetedFor: 'Business in decline – runway <6 months.',
    problemStatement: 'We have 4 months of runway left. Revenue has dropped 3 months in a row. Every week of indecision costs real money. Engagement completed in 21 days from first meeting to final document. Speed is part of the service.',
    excerpt: 'Failure analysis, pivot or persevere decision, new customer & product profile, revised business model, cash preservation strategy, and 60‑day survival roadmap.',
    price: 9360000,           // Rs. 93,600 (2× original)
    priceDisplay: 'Rs. 93600',
    duration: '21 days intensive',
    deliveryFormat: '3–5 rapid sessions',

    coreServices: [
      'Failure Analysis',
      'Pivot or Persevere Decision',
      'New Customer & Product Profile',
      'Revised Business Model',
      'Cash Preservation Strategy',
      '60‑Day Survival Roadmap',
    ],
    flexibleServices: null,
    maxFlexibleSelections: null,

    deliverables: [
      'Survival Decision Memo',
      '60‑Day Turnaround Plan',
    ],
    outcome: 'Immediate control over cash and priorities.',
    impactIndices: ['Runway Extension Metric', 'Focus Compression Score'],

    customerServiceRoadmap: [
      { step: 1, title: 'Emergency Intake & Context Call', description: 'Immediate – understand the situation, runway, and critical decisions pending.' },
      { step: 2, title: 'Survival Diagnostic', description: 'Rapid cash flow analysis, cost mapping, and viability assessment.' },
      { step: 3, title: 'Turnaround Strategy Design', description: 'Compression strategy, priority reset, scenario modelling.' },
      { step: 4, title: 'Survival Plan Delivery Session', description: 'Walk through the plan. Decisions made together in real time.' },
      { step: 5, title: '30‑Day Stability Review', description: 'Check‑in at 30 days – is the plan holding, what needs to change.' },
    ],
    googleSheetsNote: 'Cash flow stress models and survival scenarios.',

    questions: [
      {
        id: 'founder_name',
        label: 'Your full name',
        type: 'text',
        placeholder: 'e.g. Vikram Desai',
        required: true,
      },
      {
        id: 'runway_months',
        label: 'How many months of runway do you currently have?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Under 1 month', label: 'Under 1 month' },
          { value: '1–3 months', label: '1–3 months' },
          { value: '3–6 months', label: '3–6 months' },
          { value: 'More than 6 months', label: 'More than 6 months' },
        ],
      },
      {
        id: 'monthly_burn',
        label: 'What is your current monthly burn rate?',
        type: 'text',
        placeholder: 'e.g. Rs. 18 lakhs per month',
        required: true,
      },
      {
        id: 'primary_crisis',
        label: 'What is the primary reason the business is in distress?',
        type: 'textarea',
        placeholder: 'e.g. Revenue dropped 60% after losing our anchor customer. Team is at 12 people. Runway is 2.5 months.',
        required: true,
        helpText: 'Be direct. The more context you give, the faster we can help.',
      },
      {
        id: 'decisions_pending',
        label: 'What are the most urgent decisions you are facing right now?',
        type: 'textarea',
        placeholder: 'e.g. Whether to let go of 4 team members, whether to accept a down round bridge.',
        required: true,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // SCALE & EXPANSION (10→100)
  // ──────────────────────────────────────────────────────────────
  {
    id: 6,
    backendId: '69b3c4464ad479822f297e33',   // unchanged (was Scale & Expansion Strategy)
    slug: 'scale-expansion',
    packageNumber: 'Package 6',
    title: 'Scale & Expansion',
    tagline: 'You’ve won your first market. How do you grow without breaking what’s working?',
    tag: 'Scale',
    accentColor: '#ffffff',
    accentColorRgb: '255,255,255',
    targetedFor: 'MSME or growth‑stage startup with profitable core business, ready to expand (new cities, categories, segments).',
    problemStatement: 'The non‑negotiable Sarsen principle: we will tell you if you’re not ready to expand. A business expanding from weakness destroys both the expansion and the core.',
    excerpt: 'Core business health audit, new product & customer profiling, organisation & structure for scale, expansion option ranking, financial model for expansion, and fund allocation strategy.',
    price: 10400000,          // Rs. 1,04,000 (2× original)
    priceDisplay: 'Rs. 104000',
    duration: '2 weeks',
    deliveryFormat: '3–5 sessions + scenario work',

    coreServices: [
      'Core Business Health Audit',
      'New Product & Customer Profiling',
      'Organization & Structure for Scale',
      'Expansion Option Ranking',
      'Financial Model for Expansion',
      'Fund Allocation Strategy',
    ],
    flexibleServices: null,
    maxFlexibleSelections: null,

    deliverables: [
      'Scale Readiness Scorecard',
      'Expansion Decision Memo',
    ],
    outcome: 'The founder scales without breaking systems.',
    impactIndices: ['Scale Readiness Index', 'Expansion Risk Score'],

    customerServiceRoadmap: [
      { step: 1, title: 'Scale Objective & Constraint Session', description: 'Understand growth ambitions, current constraints, and capital context.' },
      { step: 2, title: 'Scale Diagnostic & Data Review', description: 'Capacity analysis, org readiness, expansion scenario mapping.' },
      { step: 3, title: 'Expansion Scenario Analysis', description: 'Scenario modelling, risk scoring, capital modelling.' },
      { step: 4, title: 'Scale Strategy Delivery Session', description: 'Walk through scorecard, expansion memo, and prioritised growth path.' },
      { step: 5, title: 'Readiness & Next‑Step Handover', description: 'Phased expansion roadmap with capital triggers and risk mitigation steps.' },
    ],
    googleSheetsNote: 'Expansion scenarios, capacity models, readiness scoring.',

    questions: [
      {
        id: 'founder_name',
        label: 'Your full name',
        type: 'text',
        placeholder: 'e.g. Meera Iyer',
        required: true,
      },
      {
        id: 'current_revenue',
        label: 'Current annual revenue (ARR)',
        type: 'text',
        placeholder: 'e.g. Rs. 8 Cr ARR',
        required: true,
      },
      {
        id: 'growth_target',
        label: 'What is your growth target for the next 12 months?',
        type: 'textarea',
        placeholder: 'e.g. 3× ARR to Rs. 24 Cr. Expand to 3 new cities. Launch second product line.',
        required: true,
      },
      {
        id: 'expansion_type',
        label: 'Which types of expansion are you considering? (Select all that apply)',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'New geographies within India', label: 'New geographies within India' },
          { value: 'International markets', label: 'International markets' },
          { value: 'New product lines', label: 'New product lines' },
          { value: 'New customer segments', label: 'New customer segments' },
          { value: 'New distribution channels', label: 'New distribution channels' },
          { value: 'Significant team scaling (2× headcount)', label: 'Significant team scaling (2× headcount)' },
        ],
      },
      {
        id: 'biggest_scale_risk',
        label: 'What do you believe is your biggest risk as you scale?',
        type: 'textarea',
        placeholder: 'e.g. Culture dilution as we hire fast. Operations not ready for 3× volume.',
        required: true,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // STRATEGY RETAINER (Ongoing)
  // ──────────────────────────────────────────────────────────────
  {
    id: 7,
    backendId: '69b3c5004ad479822f297e35',   // new MongoDB _id (placeholder)
    slug: 'strategy-retainer',
    packageNumber: 'Package 7',
    title: 'Strategy Retainer',
    tagline: 'Strategic counsel on tap – a thinking partner relationship.',
    tag: 'Foundation',
    accentColor: '#ffffff',
    accentColorRgb: '255,255,255',
    targetedFor: 'Founders who completed a Sarsen engagement, solo founders, businesses in transition.',
    problemStatement: 'You need ongoing strategic guidance without a full‑time executive or a traditional retainer that locks you into scope creep. Two structured meetings per month give you a thinking partner who knows your business.',
    excerpt: '2 Structured Meetings per Month, dedicated strategic counsel, guidance on execution of prior insights, no scope creep.',
    price: 1560000,           // Rs. 15,600 per month (2× original)
    priceDisplay: 'Rs. 15600 / Month',
    duration: '4 Weeks',
    deliveryFormat: 'Virtual or On-Site',

    coreServices: [
      'Two structured meetings per month (60–90 min each)',
      'Dedicated strategic counsel',
      'Guidance on execution of prior insights',
      'Async support between meetings',
      'No scope creep – pure advisory',
    ],
    flexibleServices: null,
    maxFlexibleSelections: null,

    deliverables: [
      'Monthly Priority Decision Memo',
      'Execution Progress Review',
    ],
    outcome: 'Continuous strategic clarity and accountability.',
    impactIndices: ['Strategic Alignment Score'],

    customerServiceRoadmap: [
      { step: 1, title: 'Kickoff & Context Alignment', description: 'First meeting to align on your current priorities and past insights.' },
      { step: 2, title: 'Meeting 1 (Month) – Priority Decision', description: '60–90 min – focus on the single most important decision.' },
      { step: 3, title: 'Async Support (15 days later)', description: 'Quick reviews, document feedback, or a 15‑min call.' },
      { step: 4, title: 'Meeting 2 (Month) – Review & Next Steps', description: '60–90 min – assess progress, adjust, set next priorities.' },
    ],
    googleSheetsNote: 'Retainer dashboard with decision log and progress tracker.',

    questions: [
      {
        id: 'founder_name',
        label: 'Your full name',
        type: 'text',
        placeholder: 'e.g. Neha Gupta',
        required: true,
      },
      {
        id: 'business_name',
        label: 'Business name',
        type: 'text',
        placeholder: 'e.g. Stellar AI',
        required: true,
      },
      {
        id: 'previous_engagement',
        label: 'Have you completed a Sarsen package before?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Yes – which one?', label: 'Yes – which one?' },
          { value: 'No – this is my first Sarsen engagement', label: 'No – this is my first Sarsen engagement' },
        ],
      },
      {
        id: 'current_priority',
        label: 'What is the most important decision or problem you need strategic help with right now?',
        type: 'textarea',
        placeholder: 'e.g. Whether to raise a bridge round, how to restructure the team, which market to enter next.',
        required: true,
      },
      {
        id: 'desired_outcome',
        label: 'What would make this retainer successful for you 3 months from now?',
        type: 'textarea',
        placeholder: 'e.g. Clear roadmap for Series A, better delegation so I can step back from daily ops.',
        required: true,
      },
    ],
  },
];

// ================================================================
// LOOKUP HELPERS
// ================================================================

/** Get a service by slug. Returns undefined if not found. */
export function getServiceBySlug(slug: string): ServiceData | undefined {
  return ALL_SERVICES_DATA.find((s) => s.slug === slug);
}

/** Get a service by numeric id. */
export function getServiceById(id: number): ServiceData | undefined {
  return ALL_SERVICES_DATA.find((s) => s.id === id);
}

/** Get a service by MongoDB backendId. */
export function getServiceByBackendId(backendId: string): ServiceData | undefined {
  return ALL_SERVICES_DATA.find((s) => s.backendId === backendId);
}

/** All slugs — used for static path generation in Next.js */
export const ALL_SERVICE_SLUGS: string[] = ALL_SERVICES_DATA.map((s) => s.slug);