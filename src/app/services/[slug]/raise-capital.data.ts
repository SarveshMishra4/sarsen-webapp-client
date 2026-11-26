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

export interface RaiseCapitalData {
  id: number;
  backendId: string;
  slug: string;
  packageNumber: string;
  title: string;
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
}

export const RAISE_CAPITAL_DATA: RaiseCapitalData =
{
  id: 8,
  backendId: 'REPLACE_WITH_MONGODB_ID',   // TODO: paste _id of the new Service document created in the backend
  slug: 'raise-capital',
  packageNumber: 'Package 3.007',
  title: 'Raise Capital',
  tagline: 'Your investor list is not a fundraising strategy. A calculated plan is.',
  tag: 'Fundraising',
  accentColor: '#ffffff',
  accentColorRgb: '255,255,255',
  targetedFor: 'Founders actively raising funds – equity, grants, or alternative funding – who want a clear path from sizing the capital need to a pipeline that moves.',
  problemStatement: 'Building a list of investors, emailing them, and waiting for a cheque almost always ends the same way: the wrong investors, silent inboxes, “you are too early” replies, and funds that never arrive. Your vision means little to investors without clear, calculated numbers. We rebuild it from zero – this time calculated – and take you from sizing the capital need to finding the right investors, aligning story and numbers, and building a pipeline that moves.',
  excerpt: 'Fund sizing against milestones, line-by-line allocation, valuation and dilution scenarios, access to 25 relevant investors and 5 grants, an investor-ready narrative and deck, a due-diligence evidence file, and term sheet negotiation guidance – completed within 21 days.',
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
    'Access to 25 Most Relevant Investors (by Domain, Stage & Cheque Size)',
    'Access to 5 Most Relevant Government or Private Grants',
  ],
  flexibleServices: null,
  maxFlexibleSelections: null,

  deliverables: [
    'Calculated Business Model & Fund Allocation Plan',
    'Investor-Ready Deck, Narrative & Tailored Investor Q&A Responses',
    'Due-Diligence Evidence File & Data Room',
    'Term Sheet, Dilution & Investor Rights Negotiation Guide',
  ],
  outcome: 'A funding-ready founder with a calculated plan, the right investors, and a pipeline that moves – within 21 days.',
  impactIndices: ['Capital Readiness Score', 'Investor Pipeline Strength', 'Narrative Clarity Index'],

  customerServiceRoadmap: [
    { step: 1, title: 'Capital Need & Vision Session', description: 'Understand your milestones, current numbers, and how much capital you truly need.' },
    { step: 2, title: 'Business Model Rebuild', description: 'Your vision translated into a financially calculated model – fund size, allocation, valuation and dilution scenarios.' },
    { step: 3, title: 'Investor & Grant Mapping', description: 'Shortlist of 25 relevant investors and 5 grants matched to your domain, stage, and cheque size.' },
    { step: 4, title: 'Narrative, Deck & Evidence Build', description: 'Investor-ready deck, tailored Q&A responses, and verifiable evidence for every claim you make.' },
    { step: 5, title: 'Term Sheet & Negotiation Briefing', description: 'Learn to negotiate term sheets, dilution, and investor rights – and spot terms that could cost you ownership.' },
    { step: 6, title: 'Pipeline Handover', description: 'Final walkthrough of your outreach pipeline and next steps to move investors toward a yes.' },
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
};
