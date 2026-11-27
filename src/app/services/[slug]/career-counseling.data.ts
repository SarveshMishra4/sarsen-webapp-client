// ================================================================
// career-counseling.data.ts
// INDEPENDENT content + types for the Career Counseling & Strategy page.
//
// Edit this file (and CareerCounselingPage.tsx) freely — nothing here is
// shared with the other services' content or layout.
//
// It is registered in data.tsx (ALL_SERVICES_DATA) so the hub page,
// getServiceBySlug(), and SEO metadata keep working.
//
// ⚠ DRAFT CONTENT: the words, price, and intake questions below are a
// first draft written to match the standard service structure. Review
// every line before launch.
//
// PAYMENT NOTE: the purchase modal only reads these fields:
//   backendId, packageNumber, title, tag, accentColor, accentColorRgb,
//   price, priceDisplay, duration, deliveryFormat, coreServices,
//   deliverables, flexibleServices, maxFlexibleSelections, questions
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

export interface CareerCounselingData {
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

export const CAREER_COUNSELING_DATA: CareerCounselingData = {
  id: 9,
  backendId: '6b0931557cdfb9068852bf45',   // TODO: paste _id of the new Service document from MongoDB
  slug: 'career-counseling-strategy',
  packageNumber: 'Package 3.008',          // TODO: confirm package number
  title: 'Career Counseling & Strategy',
  tagline: 'A career is a strategy. Plan it like one.',
  tag: 'Career',
  accentColor: '#ffffff',
  accentColorRgb: '255,255,255',
  targetedFor: 'Professionals and founders at a career crossroads – changing roles, moving into leadership, going independent, or deciding what to do next.',
  problemStatement: 'Most career decisions are made on instinct, pressure, or the next available offer. Without a clear view of your strengths, your options, and where you want the next few years to lead, it is easy to stay busy and still drift off course. This package replaces guesswork with a structured career strategy.',
  excerpt: 'A structured career counseling and strategy engagement: clarity on your strengths and options, a defined direction, and a practical 12-month plan.',
  price: 500000,            // TODO: PLACEHOLDER Rs. 5,000 (stored in paise) — set the real price, and match it in MongoDB
  priceDisplay: 'Rs. 5000',
  duration: '2 Weeks',
  deliveryFormat: '2-3 Sessions',

  coreServices: [
    'Career Situation & Goal Mapping',
    'Strengths, Skills & Values Assessment',
    'Options & Pathway Evaluation',
    'Gap Analysis Against Your Target Role or Venture',
    'Positioning & Personal Brand Review',
    'Decision Framework for Your Next Move',
    '12-Month Career Action Plan',
  ],
  flexibleServices: null,
  maxFlexibleSelections: null,

  deliverables: [
    'Career Clarity Report',
    'Pathway & Decision Document',
    '12-Month Career Action One-Pager',
  ],
  outcome: 'You leave with a clear direction, a decision you can defend, and a plan you can start on immediately.',
  impactIndices: ['Career Clarity Index'],

  customerServiceRoadmap: [
    { step: 1, title: 'Introduction & Context Session', description: 'A short session to understand your situation before the assessment begins.' },
    { step: 2, title: 'Career Assessment', description: 'A structured questionnaire covering your skills, interests, values, and constraints.' },
    { step: 3, title: 'Analysis & Pathway Scoring', description: 'Internal analysis of your responses, gap mapping, and ranking of the pathways open to you.' },
    { step: 4, title: 'Strategy Session', description: 'A 90-minute session to walk through findings, compare pathways, and make the decision.' },
    { step: 5, title: 'Delivery of All Documents', description: 'All three deliverables sent and explained.' },
    { step: 6, title: '90-Day Post-Delivery Review', description: 'Progress against your plan reviewed at the 90-day mark.' },
  ],
  googleSheetsNote: 'Structured career assessment workbook with scoring across skills, interests, values, and pathway fit.',

  questions: [
    {
      id: 'full_name',
      label: 'Your full name',
      type: 'text',
      placeholder: 'e.g. Priya Mehta',
      required: true,
    },
    {
      id: 'current_role',
      label: 'Your current role and organisation',
      type: 'text',
      placeholder: 'e.g. Product Manager at a fintech company',
      required: true,
    },
    {
      id: 'experience',
      label: 'How many years of work experience do you have?',
      type: 'radio',
      required: true,
      options: [
        { value: 'Less than 3 years', label: 'Less than 3 years' },
        { value: '3 to 7 years', label: '3 to 7 years' },
        { value: '8 to 15 years', label: '8 to 15 years' },
        { value: 'More than 15 years', label: 'More than 15 years' },
      ],
    },
    {
      id: 'main_situation',
      label: 'Which best describes your situation right now?',
      type: 'radio',
      required: true,
      options: [
        { value: 'Unsure of my direction', label: 'Unsure of my direction' },
        { value: 'Want to change role or industry', label: 'Want to change role or industry' },
        { value: 'Preparing for a leadership role', label: 'Preparing for a leadership role' },
        { value: 'Considering going independent or starting up', label: 'Considering going independent or starting up' },
        { value: 'Going through a transition (exit, relocation, break)', label: 'Going through a transition (exit, relocation, break)' },
      ],
    },
    {
      id: 'career_goal',
      label: 'In one or two sentences, where do you want your career to be in the next 3 to 5 years?',
      type: 'textarea',
      placeholder: 'Be as specific as you can – it is fine if it is still rough.',
      required: true,
      helpText: 'There is no wrong answer. Honest context makes the strategy more precise.',
    },
    {
      id: 'decision_timeline',
      label: 'When do you need to make your next move?',
      type: 'radio',
      required: true,
      options: [
        { value: 'Within 3 months', label: 'Within 3 months' },
        { value: '3 to 6 months', label: '3 to 6 months' },
        { value: '6 to 12 months', label: '6 to 12 months' },
        { value: 'Just exploring', label: 'Just exploring' },
      ],
    },
    {
      id: 'additional_context',
      label: 'Anything else we should know before we begin?',
      type: 'textarea',
      placeholder: 'e.g. an offer you are weighing, a constraint, a decision you are stuck on…',
      required: false,
      helpText: 'Optional – helps us prepare for your first session.',
    },
  ],
};
