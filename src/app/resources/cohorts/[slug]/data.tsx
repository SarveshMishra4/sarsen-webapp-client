// =============================================================
// src/app/cohorts/[slug]/data.ts
//
// Single source of truth for ALL cohort data.
// Imported by:
//   - app/cohorts/page.tsx            (hub listing)
//   - app/cohorts/[slug]/page.tsx     (individual cohort page)
//   - app/cohorts/[slug]/CohortApplicationModal.tsx  (modal)
// =============================================================

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export type FieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'radio'
  | 'number'
  | 'url';

export interface SelectOption {
  label: string;
  value: string;
}

export interface ApplicationField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: SelectOption[];
  required: boolean;
  helpText?: string;
}

export interface ApplicationStep {
  stepTitle: string;
  stepSubtitle?: string;
  fields: ApplicationField[];
}

export interface Cohort {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  duration: string;
  format: string;
  startDate: string;
  sector: string;
  seats: string;
  cohortNumber: string;
  outcome: string;
  featured?: boolean;
  price: number;        // in INR paise (for Razorpay)
  priceDisplay: string; // e.g. "₹1,85,000"
  currency: string;     // 'INR'
  applicationSteps: ApplicationStep[];
}

export interface EventTeaser {
  title: string;
  tag: string;
  format: string;
  date: string;
  location: string;
  seats: string;
}

// ─────────────────────────────────────────────────────────────
// SHARED REUSABLE FIELD SETS
// ─────────────────────────────────────────────────────────────

const founderProfileFields: ApplicationField[] = [
  {
    id: 'full_name', label: 'Full Name', type: 'text',
    placeholder: 'Your full name', required: true,
  },
  {
    id: 'email', label: 'Email Address', type: 'text',
    placeholder: 'you@company.com', required: true,
  },
  {
    id: 'linkedin', label: 'LinkedIn Profile', type: 'url',
    placeholder: 'https://linkedin.com/in/yourprofile', required: true,
  },
  {
    id: 'company_name', label: 'Company Name', type: 'text',
    placeholder: 'Your startup name', required: true,
  },
  {
    id: 'company_url', label: 'Company Website', type: 'url',
    placeholder: 'https://yourcompany.com', required: false,
  },
  {
    id: 'role', label: 'Your Role', type: 'select', required: true,
    options: [
      { label: 'Founder / Co-Founder', value: 'founder' },
      { label: 'CEO', value: 'ceo' },
      { label: 'CTO', value: 'cto' },
      { label: 'COO', value: 'coo' },
      { label: 'Other Executive', value: 'other' },
    ],
  },
];

const stageField: ApplicationField = {
  id: 'stage', label: 'Current Stage', type: 'radio', required: true,
  options: [
    { label: 'Pre-Revenue', value: 'pre_revenue' },
    { label: 'Early Revenue (< ₹50L ARR)', value: 'early' },
    { label: '₹50L – ₹2Cr ARR', value: 'seed' },
    { label: '₹2Cr – ₹10Cr ARR', value: 'series_a_ready' },
    { label: '₹10Cr+ ARR', value: 'scaling' },
  ],
};

const motivationField = (cohortName: string): ApplicationField => ({
  id: 'motivation',
  label: `Why do you want to join the ${cohortName}?`,
  type: 'textarea',
  placeholder: 'What specific challenge are you hoping to solve through this programme? Be specific.',
  required: true,
  helpText: 'This is the most important part of your application. Write 3–5 sentences.',
});

const biggestChallengeField: ApplicationField = {
  id: 'biggest_challenge',
  label: 'What is the single biggest challenge your business faces right now?',
  type: 'textarea',
  placeholder: 'Describe the problem clearly. What have you already tried?',
  required: true,
};

const commitmentField: ApplicationField = {
  id: 'commitment',
  label: 'Can you commit to attending all live sessions and completing between-session work?',
  type: 'radio', required: true,
  options: [
    { label: 'Yes — I can fully commit', value: 'yes' },
    { label: 'Mostly — with 1–2 exceptions', value: 'mostly' },
    { label: 'Not sure yet', value: 'unsure' },
  ],
};

// ─────────────────────────────────────────────────────────────
// ALL COHORTS
// ─────────────────────────────────────────────────────────────

export const ALL_COHORTS: Cohort[] = [

  // ── 1. Series A Readiness (Flagship) ─────────────────────────────────────
  {
    id: 1, slug: 'series-a-readiness',
    title: 'The Sarsen Growth Cohort — Series A Readiness Programme',
    excerpt: 'Our flagship cohort, now in its seventh edition. Twelve weeks of structured work for founders targeting their Series A — covering investor narrative construction, financial model architecture, unit economics clarity, and the operational signals investors evaluate before committing. Built around peer accountability and direct advisory input. 87% of graduates close funding within nine months of completing the programme.',
    tag: 'Flagship', duration: '12 Weeks', format: 'Hybrid · Weekly Sessions',
    startDate: 'Cohort 7 · May 5, 2026', sector: 'Cross-Sector',
    seats: '6 seats left', cohortNumber: 'Cohort 7',
    outcome: '87% close Series A within 9 months', featured: true,
    price: 18500000, priceDisplay: '₹1,85,000', currency: 'INR',
    applicationSteps: [
      {
        stepTitle: 'About You',
        stepSubtitle: 'Tell us about you and your company.',
        fields: [
          ...founderProfileFields,
          stageField,
          {
            id: 'team_size', label: 'Current team size (full-time)',
            type: 'number', placeholder: '12', required: true,
          },
        ],
      },
      {
        stepTitle: 'Your Business',
        stepSubtitle: 'Help us understand where you are and where you are going.',
        fields: [
          {
            id: 'current_arr', label: 'Current ARR / Annual Revenue',
            type: 'select', required: true,
            options: [
              { label: '< ₹50L', value: 'lt_50l' },
              { label: '₹50L – ₹1Cr', value: '50l_1cr' },
              { label: '₹1Cr – ₹3Cr', value: '1cr_3cr' },
              { label: '₹3Cr – ₹10Cr', value: '3cr_10cr' },
              { label: '₹10Cr+', value: 'gt_10cr' },
            ],
          },
          {
            id: 'fundraise_timeline',
            label: 'When are you planning to start your Series A process?',
            type: 'radio', required: true,
            options: [
              { label: 'Within 3 months', value: '3mo' },
              { label: '3–6 months', value: '6mo' },
              { label: '6–12 months', value: '12mo' },
              { label: 'More than 12 months away', value: 'gt_12mo' },
            ],
          },
          {
            id: 'prior_raises', label: 'Previous external capital raised',
            type: 'select', required: true,
            options: [
              { label: 'None — bootstrapped', value: 'none' },
              { label: 'Pre-seed / angels (< ₹1Cr)', value: 'angel' },
              { label: 'Seed round (₹1Cr – ₹5Cr)', value: 'seed' },
              { label: 'Seed+ / Bridge (₹5Cr – ₹15Cr)', value: 'seed_plus' },
              { label: '₹15Cr+', value: 'gt_15cr' },
            ],
          },
          {
            id: 'investor_meetings',
            label: 'Have you had investor conversations for your Series A yet?',
            type: 'radio', required: true,
            options: [
              { label: 'No — not started', value: 'no' },
              { label: 'A few informal conversations', value: 'informal' },
              { label: 'Active meetings, no term sheet', value: 'active' },
              { label: 'Have had a term sheet before', value: 'term_sheet' },
            ],
          },
          biggestChallengeField,
        ],
      },
      {
        stepTitle: 'Your Fit for this Cohort',
        stepSubtitle: 'We admit selectively. Help us understand why this cohort is right for you now.',
        fields: [
          motivationField('Series A Readiness Programme'),
          {
            id: 'what_you_bring',
            label: 'What will you contribute to the cohort as a peer?',
            type: 'textarea',
            placeholder: 'What experience, challenge, or perspective do you bring that will help other founders in the cohort?',
            required: true,
          },
          {
            id: 'specific_gap',
            label: 'Which specific gap are you most hoping this programme will close for you?',
            type: 'multiselect', required: true,
            options: [
              { label: 'Investor narrative / pitch', value: 'narrative' },
              { label: 'Financial model and unit economics', value: 'financial_model' },
              { label: 'Understanding what investors evaluate', value: 'investor_lens' },
              { label: 'Investor outreach and process', value: 'outreach' },
              { label: 'Term sheet / deal terms', value: 'term_sheet' },
              { label: 'Post-close investor relations', value: 'ir' },
            ],
          },
          commitmentField,
        ],
      },
    ],
  },

  // ── 2. B2B SaaS Fundamentals ─────────────────────────────────────────────
  {
    id: 2, slug: 'b2b-saas-fundamentals',
    title: 'B2B SaaS Fundamentals Cohort',
    excerpt: 'An eight-week intensive for founders building B2B SaaS products in India — from first revenue through to repeatable sales motion. Covers pricing architecture, ICP definition, discovery process design, ACV benchmarking, and the metrics that define a fundable SaaS business at seed stage. Designed for founders who are selling but not yet scaling.',
    tag: 'Sector Cohort', duration: '8 Weeks', format: 'Online · Twice Weekly',
    startDate: 'Cohort 4 · May 19, 2026', sector: 'B2B SaaS',
    seats: '9 seats left', cohortNumber: 'Cohort 4',
    outcome: 'Avg. 2.4× ARR growth in 6 months',
    price: 9500000, priceDisplay: '₹95,000', currency: 'INR',
    applicationSteps: [
      {
        stepTitle: 'About You & Your SaaS Business',
        fields: [
          ...founderProfileFields,
          {
            id: 'product_type', label: 'Which best describes your product?',
            type: 'radio', required: true,
            options: [
              { label: 'Horizontal SaaS (sells to any company)', value: 'horizontal' },
              { label: 'Vertical SaaS (industry-specific)', value: 'vertical' },
              { label: 'Infrastructure / DevTools', value: 'infra' },
              { label: 'Not sure yet', value: 'unsure' },
            ],
          },
        ],
      },
      {
        stepTitle: 'Your SaaS Metrics',
        stepSubtitle: 'Help us understand your current numbers.',
        fields: [
          {
            id: 'mrr', label: 'Current MRR (Monthly Recurring Revenue)',
            type: 'select', required: true,
            options: [
              { label: '₹0 — pre-revenue', value: '0' },
              { label: '< ₹1L MRR', value: 'lt_1l' },
              { label: '₹1L – ₹5L MRR', value: '1l_5l' },
              { label: '₹5L – ₹20L MRR', value: '5l_20l' },
              { label: '₹20L+ MRR', value: 'gt_20l' },
            ],
          },
          {
            id: 'paying_customers', label: 'Number of paying customers today',
            type: 'number', placeholder: '14', required: true,
          },
          {
            id: 'churn_rate', label: 'Approximate monthly logo churn rate',
            type: 'radio', required: true,
            options: [
              { label: '< 2% / month', value: 'lt_2' },
              { label: '2–5% / month', value: '2_5' },
              { label: '5–10% / month', value: '5_10' },
              { label: '> 10% / month', value: 'gt_10' },
              { label: 'Not sure / not tracking', value: 'unknown' },
            ],
          },
          {
            id: 'sales_led_by', label: 'Who currently leads sales?',
            type: 'radio', required: true,
            options: [
              { label: 'Me (the founder) only', value: 'founder_only' },
              { label: 'Me + one other person', value: 'founder_plus_one' },
              { label: 'We have a dedicated sales hire', value: 'sales_hire' },
              { label: 'Product-led / self-serve', value: 'plg' },
            ],
          },
          biggestChallengeField,
        ],
      },
      {
        stepTitle: 'Your Fit',
        fields: [
          motivationField('B2B SaaS Fundamentals Cohort'),
          {
            id: 'saas_problem_area',
            label: 'Which area do you most need help with right now?',
            type: 'multiselect', required: true,
            options: [
              { label: 'Pricing architecture', value: 'pricing' },
              { label: 'ICP definition and targeting', value: 'icp' },
              { label: 'Sales discovery process', value: 'discovery' },
              { label: 'Metrics and reporting', value: 'metrics' },
              { label: 'Reducing churn', value: 'churn' },
              { label: 'Hiring first sales rep', value: 'hiring' },
            ],
          },
          commitmentField,
        ],
      },
    ],
  },

  // ── 3. Fundraising Foundations — Seed Stage ──────────────────────────────
  {
    id: 3, slug: 'fundraising-foundations-seed',
    title: 'Fundraising Foundations — Seed Stage Cohort',
    excerpt: 'A six-week programme for pre-seed and seed-stage founders preparing for their first external raise. Covers investor landscape mapping, pitch narrative construction, data room preparation, term sheet literacy, and the mechanics of running a focused fundraising process. Includes live pitch feedback sessions with practising angel investors.',
    tag: 'Fundraising', duration: '6 Weeks', format: 'Online · Weekly',
    startDate: 'Cohort 6 · June 2, 2026', sector: 'Cross-Sector',
    seats: '14 seats left', cohortNumber: 'Cohort 6',
    outcome: '73% raise within 6 months',
    price: 7500000, priceDisplay: '₹75,000', currency: 'INR',
    applicationSteps: [
      {
        stepTitle: 'About You & Your Business',
        fields: [
          ...founderProfileFields,
          stageField,
          {
            id: 'industry', label: 'Industry / Sector',
            type: 'select', required: true,
            options: [
              { label: 'B2B SaaS', value: 'b2b_saas' },
              { label: 'Consumer / D2C', value: 'd2c' },
              { label: 'Fintech', value: 'fintech' },
              { label: 'Healthtech', value: 'healthtech' },
              { label: 'Edtech', value: 'edtech' },
              { label: 'Logistics / Supply Chain', value: 'logistics' },
              { label: 'Climate / Sustainability', value: 'climate' },
              { label: 'Other', value: 'other' },
            ],
          },
        ],
      },
      {
        stepTitle: 'Your Fundraising Situation',
        stepSubtitle: 'Help us understand where you are in the fundraising journey.',
        fields: [
          {
            id: 'target_raise', label: 'How much are you planning to raise?',
            type: 'select', required: true,
            options: [
              { label: '< ₹1Cr', value: 'lt_1cr' },
              { label: '₹1Cr – ₹3Cr', value: '1cr_3cr' },
              { label: '₹3Cr – ₹8Cr', value: '3cr_8cr' },
              { label: '₹8Cr – ₹20Cr', value: '8cr_20cr' },
              { label: '> ₹20Cr', value: 'gt_20cr' },
            ],
          },
          {
            id: 'previous_experience', label: 'Have you raised external capital before?',
            type: 'radio', required: true,
            options: [
              { label: 'No — this is my first raise', value: 'first' },
              { label: 'Friends and family only', value: 'faf' },
              { label: 'Yes — angels / small rounds', value: 'angels' },
              { label: 'Yes — institutional seed', value: 'institutional' },
            ],
          },
          {
            id: 'deck_status', label: 'Where is your pitch deck right now?',
            type: 'radio', required: true,
            options: [
              { label: 'Does not exist yet', value: 'none' },
              { label: 'Draft / rough notes', value: 'draft' },
              { label: 'Complete but needs work', value: 'needs_work' },
              { label: 'Polished and ready', value: 'ready' },
            ],
          },
          {
            id: 'investor_relationships',
            label: 'Do you have warm relationships with any relevant investors?',
            type: 'radio', required: true,
            options: [
              { label: 'No warm connections at all', value: 'none' },
              { label: '1–3 loose connections', value: 'few' },
              { label: 'Several meaningful relationships', value: 'some' },
              { label: 'Strong network of investors', value: 'strong' },
            ],
          },
          biggestChallengeField,
        ],
      },
      {
        stepTitle: 'Your Fit',
        fields: [
          motivationField('Fundraising Foundations Cohort'),
          {
            id: 'fundraise_blocker',
            label: 'What do you believe is the main thing holding back your fundraise right now?',
            type: 'multiselect', required: true,
            options: [
              { label: 'Unclear / weak investor narrative', value: 'narrative' },
              { label: 'Insufficient traction / metrics', value: 'traction' },
              { label: 'No investor network', value: 'network' },
              { label: "Don't know which investors to target", value: 'targeting' },
              { label: 'Poor pitch delivery', value: 'pitch' },
              { label: 'Term sheet / deal terms anxiety', value: 'terms' },
            ],
          },
          commitmentField,
        ],
      },
    ],
  },

  // ── 4. D2C Brand Scaling ─────────────────────────────────────────────────
  {
    id: 4, slug: 'd2c-brand-scaling',
    title: 'D2C Brand Scaling Cohort',
    excerpt: 'A ten-week cohort for direct-to-consumer brand founders navigating the transition from early traction to profitable scale. Covers contribution margin discipline, channel diversification, LTV modelling under Indian payment constraints, and the operational infrastructure required to support multi-channel growth without margin erosion.',
    tag: 'Sector Cohort', duration: '10 Weeks', format: 'Hybrid · Weekly',
    startDate: 'Cohort 3 · June 9, 2026', sector: 'D2C',
    seats: '11 seats left', cohortNumber: 'Cohort 3',
    outcome: 'Avg. contribution margin +18pp',
    price: 11500000, priceDisplay: '₹1,15,000', currency: 'INR',
    applicationSteps: [
      {
        stepTitle: 'About You & Your Brand',
        fields: [
          ...founderProfileFields,
          {
            id: 'category', label: 'Product Category',
            type: 'select', required: true,
            options: [
              { label: 'Beauty & Personal Care', value: 'beauty' },
              { label: 'Food & Beverage', value: 'food' },
              { label: 'Apparel & Fashion', value: 'apparel' },
              { label: 'Home & Lifestyle', value: 'home' },
              { label: 'Health & Wellness', value: 'health' },
              { label: 'Baby & Kids', value: 'kids' },
              { label: 'Fitness & Sports', value: 'fitness' },
              { label: 'Other', value: 'other' },
            ],
          },
        ],
      },
      {
        stepTitle: 'Your Brand Economics',
        stepSubtitle: 'We need to understand your current financial position.',
        fields: [
          {
            id: 'monthly_gmv', label: 'Average Monthly GMV (last 3 months)',
            type: 'select', required: true,
            options: [
              { label: '< ₹10L', value: 'lt_10l' },
              { label: '₹10L – ₹50L', value: '10l_50l' },
              { label: '₹50L – ₹2Cr', value: '50l_2cr' },
              { label: '₹2Cr – ₹10Cr', value: '2cr_10cr' },
              { label: '> ₹10Cr', value: 'gt_10cr' },
            ],
          },
          {
            id: 'contribution_margin',
            label: 'Approximate contribution margin (after COGS + fulfillment + performance marketing)',
            type: 'radio', required: true,
            options: [
              { label: 'Negative', value: 'negative' },
              { label: '0–10%', value: '0_10' },
              { label: '10–25%', value: '10_25' },
              { label: '25–40%', value: '25_40' },
              { label: '> 40%', value: 'gt_40' },
              { label: 'Not sure', value: 'unknown' },
            ],
          },
          {
            id: 'primary_channel',
            label: 'Primary sales channel (highest % of revenue)',
            type: 'radio', required: true,
            options: [
              { label: 'Own website / D2C', value: 'own_site' },
              { label: 'Amazon / Flipkart', value: 'marketplace' },
              { label: 'Quick commerce (Blinkit, Swiggy Instamart)', value: 'quick' },
              { label: 'Modern trade / offline retail', value: 'offline' },
              { label: 'Roughly equal across channels', value: 'equal' },
            ],
          },
          biggestChallengeField,
        ],
      },
      {
        stepTitle: 'Your Fit',
        fields: [
          motivationField('D2C Brand Scaling Cohort'),
          {
            id: 'd2c_focus_area',
            label: 'Where do you most need help in the next 6 months?',
            type: 'multiselect', required: true,
            options: [
              { label: 'Contribution margin improvement', value: 'margin' },
              { label: 'Channel diversification', value: 'channels' },
              { label: 'LTV and repurchase improvement', value: 'ltv' },
              { label: 'Inventory and cash flow management', value: 'inventory' },
              { label: 'Brand positioning and messaging', value: 'brand' },
              { label: 'Fundraising for a D2C brand', value: 'fundraising' },
            ],
          },
          commitmentField,
        ],
      },
    ],
  },

  // ── 5. Operational Excellence ────────────────────────────────────────────
  {
    id: 5, slug: 'operational-excellence',
    title: 'Operational Excellence Cohort — Scaling from 10 to 100',
    excerpt: 'Designed for founders who have found product-market fit and are now building the operational infrastructure to scale without breaking. Eight weeks on systems design, hiring frameworks, OKR architecture, financial reporting for a growing company, and how to make the transition from founder-led execution to team-led delivery.',
    tag: 'Operations', duration: '8 Weeks', format: 'Online · Twice Weekly',
    startDate: 'Cohort 2 · June 23, 2026', sector: 'Cross-Sector',
    seats: '8 seats left', cohortNumber: 'Cohort 2',
    outcome: '91% report improved team accountability',
    price: 9500000, priceDisplay: '₹95,000', currency: 'INR',
    applicationSteps: [
      {
        stepTitle: 'About You',
        fields: [
          ...founderProfileFields,
          stageField,
          {
            id: 'headcount', label: 'Current full-time headcount',
            type: 'select', required: true,
            options: [
              { label: '1–5', value: '1_5' },
              { label: '6–15', value: '6_15' },
              { label: '16–30', value: '16_30' },
              { label: '31–60', value: '31_60' },
              { label: '60+', value: 'gt_60' },
            ],
          },
        ],
      },
      {
        stepTitle: 'Your Operational Reality',
        stepSubtitle: 'Be honest — this helps us tailor the cohort content to where you actually are.',
        fields: [
          {
            id: 'management_layer',
            label: 'Do you have a management layer between you and individual contributors?',
            type: 'radio', required: true,
            options: [
              { label: 'No — everything reports to me', value: 'none' },
              { label: 'Partial — some managers, not all functions', value: 'partial' },
              { label: 'Yes — full management layer in place', value: 'full' },
            ],
          },
          {
            id: 'okr_state',
            label: 'How would you describe your current goal-setting process?',
            type: 'radio', required: true,
            options: [
              { label: 'No formal process — goals are informal', value: 'none' },
              { label: 'We set goals but accountability is weak', value: 'weak' },
              { label: 'OKRs / structured goals but inconsistently applied', value: 'inconsistent' },
              { label: 'Strong OKR / goal process already in place', value: 'strong' },
            ],
          },
          {
            id: 'hiring_pain', label: 'How painful is your current hiring process?',
            type: 'radio', required: true,
            options: [
              { label: 'Very painful — we make too many bad hires', value: 'very_painful' },
              { label: 'Somewhat painful — inconsistent results', value: 'somewhat' },
              { label: 'Manageable — works but takes too long', value: 'ok' },
              { label: 'We have it figured out', value: 'sorted' },
            ],
          },
          biggestChallengeField,
        ],
      },
      {
        stepTitle: 'Your Fit',
        fields: [
          motivationField('Operational Excellence Cohort'),
          {
            id: 'ops_priority',
            label: 'Which operational challenge is most urgent for you?',
            type: 'multiselect', required: true,
            options: [
              { label: 'Delegation and letting go of control', value: 'delegation' },
              { label: 'Building a first management layer', value: 'management' },
              { label: 'OKRs and execution discipline', value: 'okrs' },
              { label: 'Hiring and team composition', value: 'hiring' },
              { label: 'Financial reporting and visibility', value: 'reporting' },
              { label: 'Cross-functional coordination', value: 'coordination' },
            ],
          },
          commitmentField,
        ],
      },
    ],
  },

  // ── 6. Healthtech Founder Cohort ─────────────────────────────────────────
  {
    id: 6, slug: 'healthtech-founder',
    title: 'Healthtech Founder Cohort',
    excerpt: 'A sector-specific cohort for founders building in Indian healthtech — diagnostics, digital health, hospital infrastructure, med-tech hardware, or health insurance innovation. Covers the regulatory landscape, reimbursement model design, hospital procurement cycles, and the business model structures that have proven viable in the Indian context.',
    tag: 'Sector Cohort', duration: '8 Weeks', format: 'Online · Weekly',
    startDate: 'Cohort 2 · July 7, 2026', sector: 'Healthtech',
    seats: '16 seats left', cohortNumber: 'Cohort 2',
    outcome: 'Specialist network of 40+ mentors',
    price: 8500000, priceDisplay: '₹85,000', currency: 'INR',
    applicationSteps: [
      {
        stepTitle: 'About You & Your Company',
        fields: [
          ...founderProfileFields,
          {
            id: 'healthtech_subsector', label: 'Which healthtech subsector are you in?',
            type: 'select', required: true,
            options: [
              { label: 'Digital health / telemedicine', value: 'digital_health' },
              { label: 'Diagnostics / pathology', value: 'diagnostics' },
              { label: 'Hospital / clinic management software', value: 'hms' },
              { label: 'Med-tech / medical devices / hardware', value: 'medtech' },
              { label: 'Health insurance / insurtech', value: 'insurance' },
              { label: 'Mental health', value: 'mental_health' },
              { label: 'Preventive / wellness', value: 'wellness' },
              { label: 'Other', value: 'other' },
            ],
          },
          stageField,
        ],
      },
      {
        stepTitle: 'Your Business Context',
        stepSubtitle: 'Healthtech has unique constraints. Help us understand yours.',
        fields: [
          {
            id: 'regulatory_status', label: 'What is your current regulatory status?',
            type: 'radio', required: true,
            options: [
              { label: 'Pre-regulatory (not yet needed)', value: 'pre' },
              { label: 'Working on regulatory approvals', value: 'in_progress' },
              { label: 'CDSCO / necessary approvals in place', value: 'approved' },
              { label: 'Not sure what applies to us', value: 'unsure' },
            ],
          },
          {
            id: 'customer_type', label: 'Who is your primary customer?',
            type: 'radio', required: true,
            options: [
              { label: 'Individual patients / consumers (B2C)', value: 'b2c' },
              { label: 'Hospitals and large clinics', value: 'hospital' },
              { label: 'Small clinics and independent practitioners', value: 'clinics' },
              { label: 'Insurance companies / TPAs', value: 'insurance' },
              { label: 'Corporates (employee health)', value: 'corporate' },
              { label: 'Government / public health', value: 'govt' },
            ],
          },
          biggestChallengeField,
        ],
      },
      {
        stepTitle: 'Your Fit',
        fields: [
          motivationField('Healthtech Founder Cohort'),
          {
            id: 'healthtech_need',
            label: 'What do you most need from this cohort?',
            type: 'multiselect', required: true,
            options: [
              { label: 'Regulatory and compliance navigation', value: 'regulatory' },
              { label: 'Hospital procurement / enterprise sales', value: 'sales' },
              { label: 'Reimbursement model design', value: 'reimbursement' },
              { label: 'Healthtech-specific fundraising', value: 'fundraising' },
              { label: 'Clinical validation strategy', value: 'validation' },
              { label: 'Specialist mentor network', value: 'network' },
            ],
          },
          commitmentField,
        ],
      },
    ],
  },

  // ── 7. Climate & DeepTech ────────────────────────────────────────────────
  {
    id: 7, slug: 'climate-deeptech',
    title: 'Climate & DeepTech Cohort — Long-Cycle Ventures',
    excerpt: 'Built for founders navigating the specific challenges of climate technology and deep technology ventures — longer development cycles, hardware dependency, regulatory complexity, and the mismatch between startup timelines and infrastructure timelines. Covers grant strategy, patient capital identification, milestone structuring, and how to build investor conviction in long-cycle businesses.',
    tag: 'Deep Tech', duration: '10 Weeks', format: 'Hybrid · Weekly',
    startDate: 'Cohort 1 · July 14, 2026', sector: 'Climate / Deep Tech',
    seats: '18 seats left', cohortNumber: 'Cohort 1',
    outcome: 'Access to 25+ specialist investors',
    price: 12500000, priceDisplay: '₹1,25,000', currency: 'INR',
    applicationSteps: [
      {
        stepTitle: 'About You & Your Venture',
        fields: [
          ...founderProfileFields,
          {
            id: 'tech_type', label: 'Which category best describes your venture?',
            type: 'radio', required: true,
            options: [
              { label: 'Solar / renewable energy', value: 'solar' },
              { label: 'EV / mobility', value: 'ev' },
              { label: 'Waste / circular economy', value: 'waste' },
              { label: 'Agritech / food systems', value: 'agri' },
              { label: 'Carbon / climate measurement', value: 'carbon' },
              { label: 'Deep tech / AI / biotech', value: 'deeptech' },
              { label: 'Space technology', value: 'space' },
              { label: 'Other', value: 'other' },
            ],
          },
          stageField,
        ],
      },
      {
        stepTitle: 'Technology & Capital Position',
        fields: [
          {
            id: 'trl', label: 'Technology Readiness Level (TRL)',
            type: 'radio', required: true,
            helpText: 'TRL 1–3 = research, TRL 4–6 = prototype, TRL 7–9 = deployment ready.',
            options: [
              { label: 'TRL 1–3 (Research / proof of concept)', value: 'trl_1_3' },
              { label: 'TRL 4–5 (Lab / prototype validated)', value: 'trl_4_5' },
              { label: 'TRL 6–7 (Pilot / demo in real environment)', value: 'trl_6_7' },
              { label: 'TRL 8–9 (System proven / commercial ready)', value: 'trl_8_9' },
            ],
          },
          {
            id: 'grant_status',
            label: 'Have you accessed government grants or non-dilutive funding?',
            type: 'radio', required: true,
            options: [
              { label: 'No', value: 'no' },
              { label: 'Applied but not yet received', value: 'applied' },
              { label: 'Yes — DST / BIRAC / other government grant', value: 'govt_grant' },
              { label: 'Yes — international grant or philanthropic', value: 'intl_grant' },
            ],
          },
          {
            id: 'hardware_dependency',
            label: 'Does your venture require physical hardware or infrastructure?',
            type: 'radio', required: true,
            options: [
              { label: 'Yes — fully hardware / physical', value: 'full' },
              { label: 'Hybrid — software + hardware', value: 'hybrid' },
              { label: 'Primarily software / data', value: 'software' },
            ],
          },
          biggestChallengeField,
        ],
      },
      {
        stepTitle: 'Your Fit',
        fields: [
          motivationField('Climate & DeepTech Cohort'),
          {
            id: 'deeptech_need', label: 'What do you most need from this cohort?',
            type: 'multiselect', required: true,
            options: [
              { label: 'Grant strategy and non-dilutive capital', value: 'grants' },
              { label: 'Patient capital identification', value: 'patient_capital' },
              { label: 'Milestone structuring for long-cycle ventures', value: 'milestones' },
              { label: 'Building investor conviction', value: 'conviction' },
              { label: 'Commercial pilot design', value: 'pilots' },
              { label: 'Government / public sector navigation', value: 'govt' },
            ],
          },
          commitmentField,
        ],
      },
    ],
  },

  // ── 8. Revenue Architecture ──────────────────────────────────────────────
  {
    id: 8, slug: 'revenue-architecture',
    title: 'Revenue Architecture Cohort — From Founder Sales to Revenue Engine',
    excerpt: 'A focused six-week cohort on building the revenue architecture required to take a company from founder-led sales to a repeatable, scalable revenue function. Covers sales process design, hiring the first sales hire, compensation structure, pipeline management, forecasting, and how to transition without losing the momentum that founder-led sales created.',
    tag: 'Revenue', duration: '6 Weeks', format: 'Online · Twice Weekly',
    startDate: 'Cohort 3 · July 28, 2026', sector: 'Cross-Sector',
    seats: '12 seats left', cohortNumber: 'Cohort 3',
    outcome: 'Avg. sales cycle -35% post cohort',
    price: 8500000, priceDisplay: '₹85,000', currency: 'INR',
    applicationSteps: [
      {
        stepTitle: 'About You',
        fields: [
          ...founderProfileFields,
          stageField,
          {
            id: 'business_model', label: 'Sales model',
            type: 'radio', required: true,
            options: [
              { label: 'B2B — enterprise / mid-market', value: 'b2b_enterprise' },
              { label: 'B2B — SMB', value: 'b2b_smb' },
              { label: 'B2B2C', value: 'b2b2c' },
              { label: 'B2C with inside sales', value: 'b2c_sales' },
            ],
          },
        ],
      },
      {
        stepTitle: 'Your Revenue Situation',
        stepSubtitle: 'Be specific — the more honest you are, the more useful the cohort.',
        fields: [
          {
            id: 'current_revenue', label: 'Current Monthly Revenue / MRR',
            type: 'select', required: true,
            options: [
              { label: '< ₹5L / month', value: 'lt_5l' },
              { label: '₹5L – ₹25L / month', value: '5l_25l' },
              { label: '₹25L – ₹1Cr / month', value: '25l_1cr' },
              { label: '₹1Cr+ / month', value: 'gt_1cr' },
            ],
          },
          {
            id: 'pct_founder_sales',
            label: 'What % of current revenue depends on you personally closing deals?',
            type: 'radio', required: true,
            options: [
              { label: 'Nearly 100%', value: '100' },
              { label: '70–90%', value: '70_90' },
              { label: '40–70%', value: '40_70' },
              { label: '< 40%', value: 'lt_40' },
            ],
          },
          {
            id: 'sales_hire_status',
            label: 'Have you made your first dedicated sales hire?',
            type: 'radio', required: true,
            options: [
              { label: 'No — not yet', value: 'no' },
              { label: 'Yes — 1 person, not yet performing', value: '1_not_performing' },
              { label: 'Yes — 1 person, going well', value: '1_working' },
              { label: 'Yes — 2+ sales people', value: 'team' },
            ],
          },
          {
            id: 'documented_process',
            label: 'Is your sales process documented anywhere?',
            type: 'radio', required: true,
            options: [
              { label: 'No — it lives in my head', value: 'none' },
              { label: 'Partially — some notes / stages in CRM', value: 'partial' },
              { label: 'Yes — written playbook exists', value: 'full' },
            ],
          },
          biggestChallengeField,
        ],
      },
      {
        stepTitle: 'Your Fit',
        fields: [
          motivationField('Revenue Architecture Cohort'),
          {
            id: 'revenue_need',
            label: 'Which specific problem do you most need to solve?',
            type: 'multiselect', required: true,
            options: [
              { label: 'Documenting and transferring my sales process', value: 'process' },
              { label: 'Hiring the first sales rep correctly', value: 'hiring' },
              { label: 'Sales compensation design', value: 'comp' },
              { label: 'Pipeline management and forecasting', value: 'pipeline' },
              { label: 'Moving from relationship to consultative selling', value: 'consultative' },
              { label: 'Sales team management once hired', value: 'management' },
            ],
          },
          commitmentField,
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// FEATURED EVENT (for advertisement strip on cohorts hub)
// ─────────────────────────────────────────────────────────────

export const FEATURED_EVENT: EventTeaser = {
  title: 'India Startup Summit 2026 — The Capital Conversation',
  tag: 'Summit',
  format: 'In-Person · 2 Days',
  date: 'March 28–29, 2026',
  location: 'The Leela, Mumbai',
  seats: '12 seats left',
};

// ─────────────────────────────────────────────────────────────
// TAG COLOURS — exported so hub + slug pages stay consistent
// ─────────────────────────────────────────────────────────────

export const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  'Flagship':      { bg: 'rgba(251,191,36,0.14)',  text: '#FCD34D' },
  'Sector Cohort': { bg: 'rgba(251,146,60,0.12)',  text: '#FDBA74' },
  'Fundraising':   { bg: 'rgba(167,139,250,0.11)', text: '#C4B5FD' },
  'Operations':    { bg: 'rgba(34,211,238,0.10)',  text: '#67E8F9' },
  'Deep Tech':     { bg: 'rgba(52,211,153,0.10)',  text: '#6EE7B7' },
  'Revenue':       { bg: 'rgba(244,114,182,0.10)', text: '#F9A8D4' },
};

export const ALL_TAGS: string[] = [
  'All', 'Flagship', 'Sector Cohort', 'Fundraising',
  'Operations', 'Deep Tech', 'Revenue',
];

export function getTagStyle(tag: string): { bg: string; text: string } {
  return TAG_COLORS[tag] ?? { bg: 'rgba(251,191,36,0.10)', text: '#FCD34D' };
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

export function getCohortBySlug(slug: string): Cohort | undefined {
  return ALL_COHORTS.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return ALL_COHORTS.map((c) => c.slug);
}