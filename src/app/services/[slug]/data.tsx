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
  priceDisplay: string;     // human-readable e.g. "₹49,000"
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
// ALL SERVICES
// ================================================================

export const ALL_SERVICES_DATA: ServiceData[] = [

  // ──────────────────────────────────────────────────────────────
  // PACKAGE 0 — Business Diagnostic & Direction
  // ──────────────────────────────────────────────────────────────
  {
    id: 0,
    backendId: '69b3c3d64ad479822f297e25',
    slug: 'business-diagnostic-direction',
    packageNumber: 'Package 0',
    title: 'Business Diagnostic & Direction',
    tagline: 'Compulsory Entry Package',
    tag: 'Foundation',
    accentColor: '#ffffff',
    accentColorRgb: '255,255,255',
    targetedFor: 'Founders who are overwhelmed, unclear about how their business actually works, or lack a structured understanding of priorities and control levers.',
    problemStatement: 'Most founders are running their business on instinct and incomplete information. They know something is wrong but cannot name it precisely. They have priorities but cannot rank them. They have goals but no clear path. This package ends that ambiguity.',
    excerpt: 'The mandatory starting point. A 314-question diagnostic system that maps your business model, value chain, control levers, and bottlenecks — then translates that into a strategic direction for the next 12 months and a 3–5 year trajectory.',
    price: 4900000,
    priceDisplay: '₹49,000',
    duration: '2 weeks',
    deliveryFormat: '2 sessions + async diagnostic',

    coreServices: [
      'Full Business Diagnostic (314-question system)',
      'Business Model & Value Chain Mapping',
      'Control Lever Identification',
      'Bottleneck & Constraint Ranking',
      'Founder–Business Fit Assessment',
      'Metric Hygiene & KPI Baseline Setup',
      'Strategic Direction Selection (next 12 months)',
      'Long-Term Trajectory Framing (3–5 years)',
      'Departmentalisation Logic',
      'High-Level Org Structure Design',
    ],
    flexibleServices: null,
    maxFlexibleSelections: null,

    deliverables: [
      'Business Nature & Control Handbook',
      'Direction & Growth Stages Document',
      '90-Day Action One-Pager',
    ],
    outcome: 'The founder achieves clarity, control, and confidence.',
    impactIndices: ['Founder Clarity Index'],

    customerServiceRoadmap: [
      { step: 1, title: 'Introduction & Context Call', description: '30-minute call to understand your context before diagnostic begins.' },
      { step: 2, title: 'Diagnostic Data Collection', description: 'Week 1 — structured 314-question system sent and completed.' },
      { step: 3, title: 'Diagnostic Analysis & Scoring', description: 'Internal analysis of responses, bottleneck ranking, and direction scoring.' },
      { step: 4, title: 'Direction & Control Session', description: '90-minute session in Week 2 to walk through findings and decisions.' },
      { step: 5, title: 'Delivery of All Documents', description: 'All three deliverables sent and explained.' },
      { step: 6, title: '90-Day Post-Delivery Review', description: 'Progress vs plan review at the 90-day mark.' },
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
          { value: 'Pre-revenue / idea stage', label: 'Pre-revenue / idea stage' },
          { value: 'Early revenue (< ₹25L ARR)', label: 'Early revenue (< ₹25L ARR)' },
          { value: 'Growing (₹25L – ₹1Cr ARR)', label: 'Growing (₹25L – ₹1Cr ARR)' },
          { value: 'Scaling (₹1Cr+ ARR)', label: 'Scaling (₹1Cr+ ARR)' },
        ],
      },
      {
        id: 'primary_problem',
        label: 'In one or two sentences, what feels most unclear or broken in your business right now?',
        type: 'textarea',
        placeholder: 'Be as direct as possible — this shapes how we approach your diagnostic.',
        required: true,
        helpText: 'There is no wrong answer. Honest context makes the diagnostic more precise.',
      },
      {
        id: 'founder_role',
        label: 'How many co-founders does the business have?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Solo founder', label: 'Solo founder' },
          { value: '2 co-founders', label: '2 co-founders' },
          { value: '3 or more co-founders', label: '3 or more co-founders' },
        ],
      },
      {
        id: 'urgency',
        label: 'What is driving the timing of this engagement now?',
        type: 'textarea',
        placeholder: 'e.g. Approaching a fundraise, team is growing fast, revenue has plateaued…',
        required: false,
        helpText: 'Optional — helps us calibrate session pace and priority.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // PACKAGE 1 — Idea-to-Validation
  // ──────────────────────────────────────────────────────────────
  {
    id: 1,
    backendId: '69b3c3e94ad479822f297e27',
    slug: 'idea-to-validation',
    packageNumber: 'Package 1',
    title: 'Idea-to-Validation',
    tagline: 'Kill weak ideas early. Commit to the right one.',
    tag: 'Validation',
    accentColor: '#ffffff',
    accentColorRgb: '255,255,255',
    targetedFor: 'Idea-stage or pre-revenue founders.',
    problemStatement: 'Most founders chase ideas they are excited about, not ideas that are actually worth building. The result is months of work spent validating the founder\'s conviction rather than the market\'s need. This package separates the two.',
    excerpt: 'Structured validation logic for founders at the idea stage. Maps the problem universe, scores criticality and frequency, reality-checks market size, and runs a kill-or-commit decision framework.',
    price: 2900000,
    priceDisplay: '₹29,000',
    duration: '1 week',
    deliveryFormat: '2 sessions + async work',

    coreServices: [
      'Founder–Market Fit Assessment',
      'Problem Universe Mapping',
      'Problem Criticality & Frequency Scoring',
      'Market Size Reality Check',
      'Idea Kill-or-Commit Decision Logic',
      'Ideal Customer Profile (ICP) Definition',
      'Early Value Proposition Framing',
    ],
    flexibleServices: [
      { id: 'Competitive Landscape Simplification', label: 'Competitive Landscape Simplification', description: 'Map the 3–5 real competitors and what actually differentiates you.' },
      { id: 'Substitute & Workaround Analysis', label: 'Substitute & Workaround Analysis', description: 'Identify what customers currently do instead of using your product.' },
      { id: 'Early Pricing Hypothesis', label: 'Early Pricing Hypothesis', description: 'Build a first-principles pricing hypothesis to test in discovery.' },
      { id: 'Customer Interview Question Design', label: 'Customer Interview Question Design', description: 'A structured interview guide for your first 10–15 customer conversations.' },
      { id: 'Validation Experiment Roadmap', label: 'Validation Experiment Roadmap', description: 'Design 3 lightweight experiments to confirm or kill the idea in 30 days.' },
    ],
    maxFlexibleSelections: 2,

    deliverables: [
      'Idea Validation Decision Matrix',
      'ICP & Problem Definition Sheet',
      '90-Day Validation Plan',
    ],
    outcome: 'The founder commits to one validated idea or exits weak ideas early.',
    impactIndices: ['Idea Confidence Score', 'Problem Clarity Index'],

    customerServiceRoadmap: [
      { step: 1, title: 'Kickoff & Founder Context Session', description: 'Understand the idea, the founder\'s background, and their assumptions.' },
      { step: 2, title: 'Idea & Market Diagnostic', description: 'Week 1 — problem scoring, market sizing, and ICP definition work.' },
      { step: 3, title: 'Validation Logic & Scoring', description: 'Internal analysis applying kill-or-commit framework.' },
      { step: 4, title: 'Decision & Direction Session', description: 'Walk through the matrix. Commit or exit. No hedging.' },
      { step: 5, title: 'Delivery of Validation Documents', description: 'All three deliverables sent with implementation notes.' },
    ],
    googleSheetsNote: 'Idea scoring, market sizing, and decision thresholds executed in Sheets.',

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
        helpText: 'Be specific. Vague descriptions produce vague diagnostics.',
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
        placeholder: 'e.g. 5 customer interviews, a landing page with 80 sign-ups, a manual pilot…',
        required: false,
        helpText: 'None is fine — that\'s what this package is for.',
      },
      {
        id: 'flexible_services',
        label: 'Which additional services would you like to include? (Choose up to 2)',
        type: 'multiselect',
        required: false,
        options: [
          { value: 'Competitive Landscape Simplification', label: 'Competitive Landscape Simplification' },
          { value: 'Substitute & Workaround Analysis', label: 'Substitute & Workaround Analysis' },
          { value: 'Early Pricing Hypothesis', label: 'Early Pricing Hypothesis' },
          { value: 'Customer Interview Question Design', label: 'Customer Interview Question Design' },
          { value: 'Validation Experiment Roadmap', label: 'Validation Experiment Roadmap' },
        ],
        helpText: 'Select up to 2 flexible services to include in your package.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // PACKAGE 2 — Product–Market Fit Clarity
  // ──────────────────────────────────────────────────────────────
  {
    id: 2,
    backendId: '69b3c3fa4ad479822f297e29',
    slug: 'product-market-fit-clarity',
    packageNumber: 'Package 2',
    title: 'Product–Market Fit Clarity',
    tagline: 'Certainty on product direction.',
    tag: 'Product Market Fit',
    accentColor: '#ffffff',
    accentColorRgb: '255,255,255',
    targetedFor: 'Founders with users or early revenue but unclear PMF.',
    problemStatement: 'You have users. Some stay, some leave. Some features get used, others don\'t. Revenue is there but inconsistent. You cannot tell if you are close to PMF or far from it — and you are making product decisions without that clarity. This package resolves that.',
    excerpt: 'For founders with users or early revenue who cannot determine whether they have PMF. Locks the ICP, eliminates non-ICP noise, and produces a PMF scorecard and a pivot-or-persist decision.',
    price: 3900000,
    priceDisplay: '₹39,000',
    duration: '10 days',
    deliveryFormat: '2 sessions + data analysis',

    coreServices: [
      'ICP Lock & Non-ICP Elimination',
      'Problem–Solution Fit Assessment',
      'Retention Signal Analysis',
      'Usage Pattern Interpretation',
      'Value Proposition–Outcome Mapping',
      'PMF Signal Scoring Framework',
      'Pivot vs Persist Decision',
    ],
    flexibleServices: [
      { id: 'Willingness-to-Pay Analysis', label: 'Willingness-to-Pay Analysis', description: 'Structured analysis of what your ICP customers are actually willing to pay.' },
      { id: 'Feature Value Mapping', label: 'Feature Value Mapping', description: 'Map which features drive retention vs which add noise.' },
      { id: 'Churn Reason Analysis', label: 'Churn Reason Analysis', description: 'Structured investigation of why users churn and what predicts it.' },
      { id: 'Early Adopter Pattern Study', label: 'Early Adopter Pattern Study', description: 'Identify the characteristics of your best early customers.' },
      { id: 'PMF Narrative for Investors', label: 'PMF Narrative for Investors', description: 'Turn your PMF signals into a credible investor-facing narrative.' },
    ],
    maxFlexibleSelections: 3,

    deliverables: [
      'PMF Scorecard',
      'ICP Lock Document',
      'Pivot/Persist Decision Memo',
    ],
    outcome: 'The founder gains certainty on product direction.',
    impactIndices: ['PMF Readiness Score', 'Retention Signal Strength'],

    customerServiceRoadmap: [
      { step: 1, title: 'PMF Context & Data Readiness Call', description: 'Assess what data you have and what we need before starting.' },
      { step: 2, title: 'PMF Diagnostic & Data Review', description: 'Week 1 — retention data, usage patterns, ICP analysis.' },
      { step: 3, title: 'Signal Analysis & Scoring', description: 'Internal scoring against PMF framework.' },
      { step: 4, title: 'Decision & Direction Session', description: 'Pivot or persist — with clear rationale and next steps.' },
      { step: 5, title: 'Delivery of PMF Documents', description: 'Scorecard, ICP lock, and decision memo delivered.' },
    ],
    googleSheetsNote: 'Cohort-style retention logic and PMF scoring models.',

    questions: [
      {
        id: 'founder_name',
        label: 'Your full name',
        type: 'text',
        placeholder: 'e.g. Kavya Reddy',
        required: true,
      },
      {
        id: 'product_description',
        label: 'Describe your product and who uses it',
        type: 'textarea',
        placeholder: 'What does it do, who are your current users, and how long have they been using it?',
        required: true,
      },
      {
        id: 'revenue_status',
        label: 'Current revenue status',
        type: 'radio',
        required: true,
        options: [
          { value: 'Free users only — no revenue yet', label: 'Free users only — no revenue yet' },
          { value: 'Early revenue (< ₹10L ARR)', label: 'Early revenue (< ₹10L ARR)' },
          { value: 'Some revenue (₹10L – ₹50L ARR)', label: 'Some revenue (₹10L – ₹50L ARR)' },
          { value: 'Meaningful revenue (₹50L+ ARR)', label: 'Meaningful revenue (₹50L+ ARR)' },
        ],
      },
      {
        id: 'retention_concern',
        label: 'What does your retention data tell you right now?',
        type: 'textarea',
        placeholder: 'e.g. Month 1 retention is 60% but drops to 20% by month 3. No idea why.',
        required: true,
        helpText: 'Share whatever data you have — even rough numbers help.',
      },
      {
        id: 'pivot_concern',
        label: 'Are you currently considering a pivot?',
        type: 'radio',
        required: true,
        options: [
          { value: 'No — I want to confirm I\'m on the right path', label: 'No — I want to confirm I\'m on the right path' },
          { value: 'Maybe — something feels off but I can\'t name it', label: 'Maybe — something feels off but I can\'t name it' },
          { value: 'Yes — I\'m actively weighing a direction change', label: 'Yes — I\'m actively weighing a direction change' },
        ],
      },
      {
        id: 'flexible_services',
        label: 'Which additional services would you like to include? (Choose up to 3)',
        type: 'multiselect',
        required: false,
        options: [
          { value: 'Willingness-to-Pay Analysis', label: 'Willingness-to-Pay Analysis' },
          { value: 'Feature Value Mapping', label: 'Feature Value Mapping' },
          { value: 'Churn Reason Analysis', label: 'Churn Reason Analysis' },
          { value: 'Early Adopter Pattern Study', label: 'Early Adopter Pattern Study' },
          { value: 'PMF Narrative for Investors', label: 'PMF Narrative for Investors' },
        ],
        helpText: 'Select up to 3 flexible services.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // PACKAGE 3 — Go-To-Market Strategy
  // ──────────────────────────────────────────────────────────────
  {
    id: 3,
    backendId: '69b3c4074ad479822f297e2b',
    slug: 'go-to-market-strategy',
    packageNumber: 'Package 3',
    title: 'Go-To-Market Strategy',
    tagline: 'Repeatable customer acquisition, not random sales.',
    tag: 'Go to Market',
    accentColor: '#ffffff',
    accentColorRgb: '255,255,255',
    targetedFor: 'Startups with a product but inconsistent sales.',
    problemStatement: 'You close some deals but cannot predict the next one. Your channels are not clear. Your messaging changes depending on who you\'re talking to. Your funnel leaks and you don\'t know where. This package builds the system that replaces luck with repeatability.',
    excerpt: 'For startups with a product but inconsistent sales. Maps every viable GTM channel, prioritises ruthlessly, defines the right sales motion, and produces a 90-day execution plan.',
    price: 4500000,
    priceDisplay: '₹45,000',
    duration: '2 weeks',
    deliveryFormat: '2 sessions + async strategy work',

    coreServices: [
      'GTM Channel Universe Mapping',
      'Channel Prioritisation & Focus Logic',
      'Sales Motion Definition (Founder-led vs Team-led)',
      'Funnel Structure & Leakage Diagnosis',
      'Core Messaging & Positioning Logic',
      'Pricing & Packaging Sanity Check',
      '90-Day GTM Execution Planning',
    ],
    flexibleServices: [
      { id: 'CAC Logic & Payback Analysis', label: 'CAC Logic & Payback Analysis', description: 'Build a proper CAC model by channel with payback period estimates.' },
      { id: 'Pilot Channel Experiment Design', label: 'Pilot Channel Experiment Design', description: 'Design a structured 30-day test for your primary channel hypothesis.' },
      { id: 'Partner GTM Feasibility Assessment', label: 'Partner GTM Feasibility Assessment', description: 'Assess whether a channel-partner GTM motion is viable for your product.' },
      { id: 'Geo-Market Entry Logic', label: 'Geo-Market Entry Logic', description: 'Evaluate and sequence market entry across Indian cities or international markets.' },
      { id: 'Sales Process & CRM Logic Review', label: 'Sales Process & CRM Logic Review', description: 'Define your sales stages, CRM fields, and pipeline hygiene requirements.' },
    ],
    maxFlexibleSelections: 3,

    deliverables: [
      'GTM Strategy Document',
      'Funnel & Channel Sheets',
      '90-Day GTM Plan',
    ],
    outcome: 'Repeatable and focused customer acquisition system.',
    impactIndices: ['CAC Clarity Index', 'Funnel Efficiency Score'],

    customerServiceRoadmap: [
      { step: 1, title: 'GTM Context & Objective Session', description: 'Understand current sales motion, win/loss patterns, and growth goals.' },
      { step: 2, title: 'Funnel & Channel Diagnostic', description: 'Week 1 — map current channels, funnel stages, and leakage points.' },
      { step: 3, title: 'Strategy Design & Prioritisation', description: 'Internal — channel scoring, messaging framework, motion definition.' },
      { step: 4, title: 'GTM Strategy Delivery Session', description: 'Walk through the full strategy with rationale for every prioritisation decision.' },
      { step: 5, title: 'Execution Plan Handover', description: '90-day plan with owners, milestones, and success metrics.' },
    ],
    googleSheetsNote: 'Channel scoring matrices, funnel analysis, execution trackers.',

    questions: [
      {
        id: 'founder_name',
        label: 'Your full name',
        type: 'text',
        placeholder: 'e.g. Rohit Batra',
        required: true,
      },
      {
        id: 'product_and_customer',
        label: 'What do you sell and who is your target customer?',
        type: 'textarea',
        placeholder: 'e.g. A procurement SaaS for mid-market manufacturing companies, 100–500 employees.',
        required: true,
      },
      {
        id: 'current_channels',
        label: 'Which channels are you currently using to acquire customers?',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'Outbound email / cold outreach', label: 'Outbound email / cold outreach' },
          { value: 'LinkedIn', label: 'LinkedIn' },
          { value: 'Referrals / word of mouth', label: 'Referrals / word of mouth' },
          { value: 'Content / SEO', label: 'Content / SEO' },
          { value: 'Paid ads (Google / Meta)', label: 'Paid ads (Google / Meta)' },
          { value: 'Events / conferences', label: 'Events / conferences' },
          { value: 'Channel partners / resellers', label: 'Channel partners / resellers' },
          { value: 'Inbound (organic, no specific channel)', label: 'Inbound (organic, no specific channel)' },
        ],
        helpText: 'Select all that apply.',
      },
      {
        id: 'biggest_sales_problem',
        label: 'What is the single biggest problem in your sales motion right now?',
        type: 'textarea',
        placeholder: 'e.g. Leads come in but close rate is under 5%. We don\'t know why deals stall.',
        required: true,
      },
      {
        id: 'avg_deal_size',
        label: 'What is your average deal size / ACV?',
        type: 'text',
        placeholder: 'e.g. ₹1.2L per year / ₹40,000 one-time',
        required: true,
      },
      {
        id: 'sales_team_size',
        label: 'Is sales currently founder-led or do you have a sales team?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Founder-led — I close all deals myself', label: 'Founder-led — I close all deals myself' },
          { value: 'Founder + 1 sales person', label: 'Founder + 1 sales person' },
          { value: 'Small sales team (2–5 people)', label: 'Small sales team (2–5 people)' },
          { value: 'Structured sales team (5+ people)', label: 'Structured sales team (5+ people)' },
        ],
      },
      {
        id: 'flexible_services',
        label: 'Which additional services would you like to include? (Choose up to 3)',
        type: 'multiselect',
        required: false,
        options: [
          { value: 'CAC Logic & Payback Analysis', label: 'CAC Logic & Payback Analysis' },
          { value: 'Pilot Channel Experiment Design', label: 'Pilot Channel Experiment Design' },
          { value: 'Partner GTM Feasibility Assessment', label: 'Partner GTM Feasibility Assessment' },
          { value: 'Geo-Market Entry Logic', label: 'Geo-Market Entry Logic' },
          { value: 'Sales Process & CRM Logic Review', label: 'Sales Process & CRM Logic Review' },
        ],
        helpText: 'Select up to 3 flexible services.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // PACKAGE 4 — Operations & Scalability
  // ──────────────────────────────────────────────────────────────
  {
    id: 4,
    backendId: '69b3c41e4ad479822f297e2d',
    slug: 'operations-scalability',
    packageNumber: 'Package 4',
    title: 'Operations & Scalability',
    tagline: 'Stop being the bottleneck in your own business.',
    tag: 'Operations',
    accentColor: '#ffffff',
    accentColorRgb: '255,255,255',
    targetedFor: 'Revenue-stage startups facing operational chaos.',
    problemStatement: 'Revenue is there. The team exists. But nothing runs without you. Decisions queue up. Priorities conflict. Costs leak in places you cannot see. The business is growing but the founder is breaking. This package fixes the structural conditions that create this.',
    excerpt: 'End-to-end process mapping, cost leak identification, founder bottleneck analysis, and a scalability readiness assessment for revenue-stage startups facing operational chaos.',
    price: 5500000,
    priceDisplay: '₹55,000',
    duration: '2 weeks',
    deliveryFormat: '2 sessions + process mapping work',

    coreServices: [
      'End-to-End Process Mapping',
      'Cost Leak & Waste Identification',
      'Founder Bottleneck Mapping',
      'Role & Responsibility Clarity',
      'Decision Ownership Framework',
      'Scalability Readiness Assessment',
    ],
    flexibleServices: [
      { id: 'Hiring Plan Logic Review', label: 'Hiring Plan Logic Review', description: 'Evaluate your next 3–6 hires against operational gaps and budget.' },
      { id: 'Vendor Rationalisation Analysis', label: 'Vendor Rationalisation Analysis', description: 'Identify vendor overlap, cost waste, and renegotiation opportunities.' },
      { id: 'OKR & Internal Metrics Design', label: 'OKR & Internal Metrics Design', description: 'Design a practical OKR system that teams actually use.' },
      { id: 'Internal Reporting Structure Design', label: 'Internal Reporting Structure Design', description: 'Define what gets reported, by whom, and at what cadence.' },
      { id: 'Founder Time Allocation Audit', label: 'Founder Time Allocation Audit', description: 'Analyse where founder time goes and redesign it against strategic priorities.' },
    ],
    maxFlexibleSelections: 3,

    deliverables: [
      'Operations Diagnostic Report',
      'Org & Role Design Sheet',
      'Scalability Scorecard',
    ],
    outcome: 'Reduced founder dependency and operational clarity.',
    impactIndices: ['Founder Dependency Ratio', 'Operational Efficiency Score'],

    customerServiceRoadmap: [
      { step: 1, title: 'Operations Context & Pain Mapping Session', description: 'Understand current team structure, pain points, and founder time allocation.' },
      { step: 2, title: 'Process & Cost Diagnostic', description: 'Week 1 — process mapping, cost audit, bottleneck identification.' },
      { step: 3, title: 'Structure & Bottleneck Analysis', description: 'Internal — role clarity, decision ownership, scalability scoring.' },
      { step: 4, title: 'Operations Strategy Delivery Session', description: 'Walk through findings, prioritised interventions, and structural changes.' },
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
        id: 'processes_documented',
        label: 'What percentage of your core processes are documented?',
        type: 'radio',
        required: true,
        options: [
          { value: 'None — everything is in people\'s heads', label: 'None — everything is in people\'s heads' },
          { value: 'Some (<30%) — mostly informal', label: 'Some (<30%) — mostly informal' },
          { value: 'About half (30–60%)', label: 'About half (30–60%)' },
          { value: 'Most (60%+) — reasonably structured', label: 'Most (60%+) — reasonably structured' },
        ],
      },
      {
        id: 'revenue_range',
        label: 'Current annual revenue (ARR)',
        type: 'radio',
        required: true,
        options: [
          { value: 'Under ₹50L', label: 'Under ₹50L' },
          { value: '₹50L – ₹2Cr', label: '₹50L – ₹2Cr' },
          { value: '₹2Cr – ₹10Cr', label: '₹2Cr – ₹10Cr' },
          { value: 'Above ₹10Cr', label: 'Above ₹10Cr' },
        ],
      },
      {
        id: 'flexible_services',
        label: 'Which additional services would you like to include? (Choose up to 3)',
        type: 'multiselect',
        required: false,
        options: [
          { value: 'Hiring Plan Logic Review', label: 'Hiring Plan Logic Review' },
          { value: 'Vendor Rationalisation Analysis', label: 'Vendor Rationalisation Analysis' },
          { value: 'OKR & Internal Metrics Design', label: 'OKR & Internal Metrics Design' },
          { value: 'Internal Reporting Structure Design', label: 'Internal Reporting Structure Design' },
          { value: 'Founder Time Allocation Audit', label: 'Founder Time Allocation Audit' },
        ],
        helpText: 'Select up to 3 flexible services.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // PACKAGE 5 — Fundraising Readiness
  // ──────────────────────────────────────────────────────────────
  {
    id: 5,
    backendId: '69b3c42a4ad479822f297e2f',
    slug: 'fundraising-readiness',
    packageNumber: 'Package 5',
    title: 'Fundraising Readiness',
    tagline: 'Raise from a position of preparation, not hope.',
    tag: 'Fundraising',
    accentColor: '#ffffff',
    accentColorRgb: '255,255,255',
    targetedFor: 'Founders planning to raise capital in 3–6 months.',
    problemStatement: 'Most founders enter fundraising underprepared. Their metrics are not investor-ready. Their narrative is unclear. Their valuation expectations are unrealistic. Investors sense all of this in the first ten minutes. This package closes those gaps before you start the process.',
    excerpt: 'For founders planning to raise capital in the next 3–6 months. Fundraising readiness diagnostic, investor metrics cleanup, equity story structuring, and valuation reality check.',
    price: 5900000,
    priceDisplay: '₹59,000',
    duration: '10 days',
    deliveryFormat: '2 sessions + metrics work',

    coreServices: [
      'Fundraising Readiness Diagnostic',
      'Investor Metric Hygiene Check',
      'Equity Story & Narrative Structuring',
      'Fundraise Timing & Stage Fit Logic',
      'Valuation Reality Check',
    ],
    flexibleServices: [
      { id: 'Pitch Deck Logic Review', label: 'Pitch Deck Logic Review', description: 'Structural and narrative review of your pitch deck — not design.' },
      { id: 'Data Room Structure Design', label: 'Data Room Structure Design', description: 'Define exactly what goes in your data room and how to organise it.' },
      { id: 'Term Sheet Risk Education', label: 'Term Sheet Risk Education', description: 'Understand the 8 terms that founders most commonly get wrong.' },
      { id: 'Investor Q&A Preparation', label: 'Investor Q&A Preparation', description: 'Prepare answers to the 20 most common and dangerous investor questions.' },
      { id: 'Dilution Scenario Modelling', label: 'Dilution Scenario Modelling', description: 'Model your cap table across 3 fundraising scenarios.' },
    ],
    maxFlexibleSelections: 3,

    deliverables: [
      'Fundraising Readiness Report',
      'Investor Metrics Dashboard',
    ],
    outcome: 'Prepared, confident, and realistic fundraising posture.',
    impactIndices: ['Investor Readiness Score', 'Narrative Clarity Index'],

    customerServiceRoadmap: [
      { step: 1, title: 'Fundraising Goal & Timing Session', description: 'Understand raise target, stage, timeline, and investor target list.' },
      { step: 2, title: 'Metrics & Narrative Diagnostic', description: 'Week 1 — audit current metrics, narrative, and investor positioning.' },
      { step: 3, title: 'Readiness & Valuation Analysis', description: 'Internal — readiness scoring, valuation benchmarking, narrative structuring.' },
      { step: 4, title: 'Fundraising Readiness Delivery Session', description: 'Walk through report, gaps, and the narrative that will work for your stage.' },
      { step: 5, title: 'Final Q&A & Handover', description: 'Final session — open questions, investor outreach plan, and next steps.' },
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
        placeholder: 'e.g. ₹3 Cr at ₹20 Cr post-money valuation',
        required: true,
      },
      {
        id: 'raise_stage',
        label: 'What stage is this raise?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Pre-Seed', label: 'Pre-Seed' },
          { value: 'Seed', label: 'Seed' },
          { value: 'Series A', label: 'Series A' },
          { value: 'Series B or later', label: 'Series B or later' },
          { value: 'Bridge / extension round', label: 'Bridge / extension round' },
        ],
      },
      {
        id: 'timeline',
        label: 'When do you want to close the round?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Within 1–2 months', label: 'Within 1–2 months' },
          { value: '3–4 months from now', label: '3–4 months from now' },
          { value: '5–6 months from now', label: '5–6 months from now' },
          { value: 'Flexible — whenever ready', label: 'Flexible — whenever ready' },
        ],
      },
      {
        id: 'current_metrics',
        label: 'What are your current key metrics? (ARR, MoM growth, retention, burn)',
        type: 'textarea',
        placeholder: 'e.g. ARR ₹1.2Cr, 8% MoM growth, D30 retention 55%, burn ₹18L/month',
        required: true,
        helpText: 'Rough numbers are fine. Honesty here saves time later.',
      },
      {
        id: 'previous_raise',
        label: 'Have you raised external capital before?',
        type: 'radio',
        required: true,
        options: [
          { value: 'No — this is our first raise', label: 'No — this is our first raise' },
          { value: 'Yes — from angels / friends & family', label: 'Yes — from angels / friends & family' },
          { value: 'Yes — from institutional investors', label: 'Yes — from institutional investors' },
        ],
      },
      {
        id: 'flexible_services',
        label: 'Which additional services would you like to include? (Choose up to 3)',
        type: 'multiselect',
        required: false,
        options: [
          { value: 'Pitch Deck Logic Review', label: 'Pitch Deck Logic Review' },
          { value: 'Data Room Structure Design', label: 'Data Room Structure Design' },
          { value: 'Term Sheet Risk Education', label: 'Term Sheet Risk Education' },
          { value: 'Investor Q&A Preparation', label: 'Investor Q&A Preparation' },
          { value: 'Dilution Scenario Modelling', label: 'Dilution Scenario Modelling' },
        ],
        helpText: 'Select up to 3 flexible services.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // PACKAGE 6 — Turnaround & Stabilisation
  // ──────────────────────────────────────────────────────────────
  {
    id: 6,
    backendId: '69b3c43a4ad479822f297e31',
    slug: 'turnaround-stabilisation',
    packageNumber: 'Package 6',
    title: 'Turnaround & Stabilisation',
    tagline: 'Immediate control when the runway is short.',
    tag: 'Turnaround',
    accentColor: '#ffffff',
    accentColorRgb: '255,255,255',
    targetedFor: 'Startups facing survival risk.',
    problemStatement: 'Runway is short. Revenue is not where it needs to be. Costs are wrong. The team knows something is wrong but nobody has said it out loud. This is not the time for strategy frameworks — it is the time for triage, compression, and a 90-day survival plan.',
    excerpt: 'The emergency package. Survival viability assessment, cash runway stress testing, cost compression strategy, and a 30–90 day turnaround plan. Fixed scope. No flex services. Built for speed.',
    price: 6900000,
    priceDisplay: '₹69,000',
    duration: '1 week intensive',
    deliveryFormat: '3 sessions in rapid succession',

    coreServices: [
      'Survival Viability Assessment',
      'Cash Runway Stress Testing',
      'Cost Compression Strategy',
      'Focus & Activity Pruning',
      'Emergency Priority Reset',
    ],
    flexibleServices: null,
    maxFlexibleSelections: null,

    deliverables: [
      'Survival Decision Memo',
      '30–90 Day Turnaround Plan',
    ],
    outcome: 'Immediate control over cash and priorities.',
    impactIndices: ['Runway Extension Metric', 'Focus Compression Score'],

    customerServiceRoadmap: [
      { step: 1, title: 'Emergency Intake & Context Call', description: 'Immediate — understand the situation, runway, and critical decisions pending.' },
      { step: 2, title: 'Survival Diagnostic', description: 'Rapid cash flow analysis, cost mapping, and viability assessment.' },
      { step: 3, title: 'Turnaround Strategy Design', description: 'Internal — compression strategy, priority reset, scenario modelling.' },
      { step: 4, title: 'Survival Plan Delivery Session', description: 'Walk through the plan. Decisions made together in real time.' },
      { step: 5, title: '30-Day Stability Review', description: 'Check-in at 30 days — is the plan holding, what needs to change.' },
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
        placeholder: 'e.g. ₹18 lakhs per month',
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
      {
        id: 'revenue_current',
        label: 'Current monthly revenue',
        type: 'text',
        placeholder: 'e.g. ₹6 lakhs per month',
        required: true,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // PACKAGE 7 — Scale & Expansion Strategy
  // ──────────────────────────────────────────────────────────────
  {
    id: 7,
    backendId: '69b3c4464ad479822f297e33',
    slug: 'scale-expansion-strategy',
    packageNumber: 'Package 7',
    title: 'Scale & Expansion Strategy',
    tagline: 'Scale without breaking what you built.',
    tag: 'Scale',
    accentColor: '#ffffff',
    accentColorRgb: '255,255,255',
    targetedFor: 'Founders preparing for aggressive growth.',
    problemStatement: 'You have proven the model. Now you need to grow it aggressively — new markets, new products, new geographies, more capital. But aggressive growth without structural readiness breaks things. This package ensures you scale with your systems intact.',
    excerpt: 'For founders preparing for aggressive growth. Scale readiness diagnostic, capacity constraint mapping, expansion risk identification, org planning, and capital requirement logic.',
    price: 6500000,
    priceDisplay: '₹65,000',
    duration: '2 weeks',
    deliveryFormat: '2 sessions + expansion scenario work',

    coreServices: [
      'Scale Readiness Diagnostic',
      'Capacity & Constraint Mapping',
      'Expansion Risk Identification',
      'Org & Capability Planning',
      'Capital Requirement Logic',
    ],
    flexibleServices: [
      { id: 'New Market Entry Evaluation', label: 'New Market Entry Evaluation', description: 'Evaluate and rank 2–3 new market opportunities against a structured framework.' },
      { id: 'Product Line Expansion Logic', label: 'Product Line Expansion Logic', description: 'Assess whether and when to expand the product line — sequencing and risk.' },
      { id: 'Pricing for Scale Analysis', label: 'Pricing for Scale Analysis', description: 'Evaluate whether current pricing supports the unit economics of aggressive scale.' },
      { id: 'International Expansion Readiness', label: 'International Expansion Readiness', description: 'Assess readiness for international markets — operationally and commercially.' },
      { id: 'Post-Scale Governance Design', label: 'Post-Scale Governance Design', description: 'Design the governance structure required to manage a scaled organisation.' },
    ],
    maxFlexibleSelections: 3,

    deliverables: [
      'Scale Readiness Scorecard',
      'Expansion Decision Memo',
    ],
    outcome: 'The founder scales without breaking systems.',
    impactIndices: ['Scale Readiness Index', 'Expansion Risk Score'],

    customerServiceRoadmap: [
      { step: 1, title: 'Scale Objective & Constraint Session', description: 'Understand growth ambitions, current constraints, and capital context.' },
      { step: 2, title: 'Scale Diagnostic & Data Review', description: 'Week 1 — capacity analysis, org readiness, expansion scenario mapping.' },
      { step: 3, title: 'Expansion Scenario Analysis', description: 'Internal — scenario modelling, risk scoring, capital modelling.' },
      { step: 4, title: 'Scale Strategy Delivery Session', description: 'Walk through scorecard, expansion memo, and prioritised growth path.' },
      { step: 5, title: 'Readiness & Next-Step Handover', description: 'Phased expansion roadmap with capital triggers and risk mitigation steps.' },
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
        placeholder: 'e.g. ₹8 Cr ARR',
        required: true,
      },
      {
        id: 'growth_target',
        label: 'What is your growth target for the next 12 months?',
        type: 'textarea',
        placeholder: 'e.g. 3× ARR to ₹24 Cr. Expand to 3 new cities. Launch second product line.',
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
          { value: 'New distribution / sales channels', label: 'New distribution / sales channels' },
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
      {
        id: 'capital_status',
        label: 'What is your capital situation for this scale?',
        type: 'radio',
        required: true,
        options: [
          { value: 'Bootstrapped — scaling from operating cash flow', label: 'Bootstrapped — scaling from operating cash flow' },
          { value: 'Recently raised — capital available', label: 'Recently raised — capital available' },
          { value: 'Planning to raise to fund expansion', label: 'Planning to raise to fund expansion' },
          { value: 'Undecided — part of what I want to figure out', label: 'Undecided — part of what I want to figure out' },
        ],
      },
      {
        id: 'flexible_services',
        label: 'Which additional services would you like to include? (Choose up to 3)',
        type: 'multiselect',
        required: false,
        options: [
          { value: 'New Market Entry Evaluation', label: 'New Market Entry Evaluation' },
          { value: 'Product Line Expansion Logic', label: 'Product Line Expansion Logic' },
          { value: 'Pricing for Scale Analysis', label: 'Pricing for Scale Analysis' },
          { value: 'International Expansion Readiness', label: 'International Expansion Readiness' },
          { value: 'Post-Scale Governance Design', label: 'Post-Scale Governance Design' },
        ],
        helpText: 'Select up to 3 flexible services.',
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