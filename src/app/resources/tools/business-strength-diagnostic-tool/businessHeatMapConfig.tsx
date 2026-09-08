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
    text: 'Where Do You Stand Currently in Terms of Real-World Testing ?',
    helpText: "Whether You're Pre-Seed or approaching Series A, this is about what You've already Done to Test the Vision against Reality.",
    options: [
      {
        value: 0,
        title: "Still an Idea",
        description: "Choose this if you're still at the Idea stage and haven't started building or testing it with real customers."
      },
      {
        value: 1,
        title: "Started Working On It",
        description: "Choose this if you've started building or developing the idea, but haven't interacted with any potential customers yet."
      },
      {
        value: 4,
        title: "Informally Tested",
        description: "Choose this if you've discussed the idea with a few potential customers, friends, or family members, but haven't conducted Structured Customer Research yet."
      },
      {
        value: 7,
        title: "Customer Research Done",
        description: "Choose this if you've conducted Structured Customer Research with 100+ people who are Strangers to you and have established a clear pattern around the Problem you're solving, or have received Letters of Intent from potential customers."
      },
      {
        value: 10,
        title: "Payments Received",
        description: "Choose this if you've received Partial or Complete Payment from a Group of Customers, preferably Strangers, for your Product or Service."
      }
    ]
  },
{
  id: 'q2',
  module: 'Validation',
  canvasArea: 'customer_relationships',
  text: 'What Best Describes How Customers actually behave when It come to Using Your Product ?',
  helpText: "Focus on What Customers actually do after using Your Product — Not What they Say. Repeat Usage, Retention, and Referrals are stronger signals of Customer Validation.",
  options: [

    {
      value: 0,
      title: 'Never Tracked This',
      description: "Choose this if You are Not Sure or You've never tracked Customer Retention, Repeat Usage, or Referrals."
    },

    {
      value: 1,
      title: 'No Customers Yet',
      description: "Choose this if You don't have Any Customers Yet, or it's Too Early to Observe their Behavior."
    },

    {
      value: 4,
      title: 'One-time Buyers',
      description: "Choose this if a few Customers have Purchased Once, but You haven't Established whether they Return or Continue using the Product."
    },

    {
      value: 7,
      title: 'Some Organic Return',
      description: "Choose this if some Customers Return or Purchase the Product Repeatedly without being Prompted, and You have Evidence of this Behavior."
    },

    {
      value: 10,
      title: 'Retained and Referring',
      description: "Choose this if a Group of Customers Repeatedly Use or Purchase Your Product without Prompting, and some also Refer New Customers through their own Initiative."
    },

  ],
},
{
  id: 'q3',
  module: 'Validation',
  canvasArea: 'customer_segments',
  text: 'How many Customer Segments have you clearly Identified and Prioritized ?',
  helpText: "A Customer Segment is only meaningful if You can Clearly Describe Who Belongs in It, Why they Need Your Product, and Why You would Prioritize them over Other Segments.",
  options: [

    {
      value: 0,
      title: 'Never Structured This',
      description: "Choose this if You've Haven't Worked Much on Customer Segmentation."
    },

    {
      value: 1,
      title: 'Targeting Everyone',
      description: "Choose this if You're Targeting 'Everyone' or Haven't Identified a Specific Customer Segment Yet."
    },

    {
      value: 4,
      title: 'One Broad Segment',
      description: "Choose this if You have One Customer Segment in Mind, but it is still Broadly Defined and Not Clearly Prioritized."
    },

    {
      value: 7,
      title: '3-5 Defined Segments',
      description: "Choose this if You've identified 3-5 specific Customer Segments and can clearly describe their Characteristics, Needs, and Use Case."
    },

    {
      value: 10,
      title: 'Data-Prioritized Segments',
      description: "Choose this if You've Identified and Prioritized Your Customer Segments using Real Data such as Problem Severity, Willingness to Pay, Segment Size, Accessibility, or Customer Research."
    },

  ],
},
{
  id: 'q4',
  module: 'Go To Market',
  canvasArea: 'key_resources',
  text: 'How Well have You Studied Your Direct and Indirect Competitors ?',
  helpText: "A meaningful Competitive Analysis requires more than knowing Competitor Names. You should understand their Target Customers, Positioning, Pricing, Strengths, Weaknesses, and How Your Offering Compares.",
  options: [

    {
      value: 0,
      title: 'Never Scanned The Market',
      description: "Choose this if You haven't Rresearched or Compared Your Competitors."
    },

    {
      value: 1,
      title: "Can't Name One",
      description: "Choose this if You can't Identify a Single Direct or Indirect Competitor."
    },

    {
      value: 4,
      title: 'Know 1–2 Loosely',
      description: "Choose this if You Identified 1–2 Competitors, but have Limited Knowledge of their Customers, Pricing, Positioning, or Strengths."
    },

    {
      value: 7,
      title: 'Studied 3–5 Well',
      description: "Choose this if You can Identify Several Direct or Indirect Competitors and understand their Pricing, Positioning, Target Customers, and key Strengths and Weaknesses."
    },

    {
      value: 10,
      title: 'Competitive Landscape Mapped',
      description: "Choose this if You've Systematically Mapped Your Direct and Indirect Competitors and can Clearly Explain their Target Customers, Positioning, Pricing, Strengths, Weaknesses, and Your Competitive Advantage Against Them."
    },

  ],
},
{
  id: 'q5',
  module: 'Foundation',
  canvasArea: 'key_resources',
  text: 'If a Well-Funded Competitor tries Copying You Tomorrow, What would actually Stop Them ?',
  helpText: "Assess only the Competitive Advantages that Exist Today. Do not count Advantages You Plan to Build Later.",
  options: [

    {
      value: 0,
      title: 'Never Stress-Tested This',
      description: "Choose this if You've never Examined What would Prevent a well-funded Competitor from Copying Your Business."
    },

    {
      value: 1,
      title: 'Nothing Stops Them',
      description: "Choose this if a Well-Funded Competitor could Largely Copy Your Product, Acquire similar Customers, and Compete with You using Greater Resources."
    },

    {
      value: 4,
      title: 'Survivable, Not Durable',
      description: "Choose this if You have some Advantages that may Help you Compete Today, but Nothing that would Provide Meaningful Protection over the Long Term like First Mover Advantage."
    },

    {
      value: 7,
      title: 'One Real Advantage',
      description: "Choose this if You have at least One Structural Advantage such as Proprietary Data, Strong Relationships, Brand, Technology, Network Effects, or Distribution that would Take Significant Time or Resources for a Competitor to Replicate."
    },

    {
      value: 10,
      title: 'Compounding Advantages',
      description: "Choose this if You have One or More Strong Competitive Advantages that Reinforce each other Over Time, making Your Position Increasingly Difficult for Competitors to Replicate."
    },

  ],
},
{
  id: 'q6',
  module: 'Go To Market',
  canvasArea: 'value_proposition',
  text: 'Are Your USPs Clearly Defined, and Have You Tested it with Real Customers ?',
  helpText: "A Unique Selling Proposition only counts as Validated when there is Evidence that it Influences Customer Choice & Not Simply because it Sounds Compelling in a Pitch.",
  options: [

    {
      value: 0,
      title: 'Yet To Articulate One',
      description: "Choose this if You've Never Clearly Defined Your USPs."
    },

    {
      value: 1,
      title: 'No Clear USP',
      description: "Choose this if You cannot clearly explain in One Sentence why a Customer should choose you over the Alternatives."
    },

    {
      value: 4,
      title: 'Stated, Not Tested',
      description: "Choose this if You have a few clearly defined USPs, but haven't tested whether Real Customers actually Value or Respond to it."
    },

    {
      value: 7,
      title: 'Tested With Customers',
      description: "Choose this if You've tested your USPs with Real Customers and Received meaningful Evidence that they Understand and Value the Differentiation, even if the Results are not Yet Consistent."
    },

    {
      value: 10,
      title: 'Proven To Drive Choice',
      description: "Choose this if You have Evidence such as Conversion Data, Customer Interviews, Purchase Patterns, or Customer Feedback showing that your USPs are a meaningful reason Customers choose You over Alternatives."
    },

  ],
},
{
  id: 'q7',
  module: 'Go To Market',
  canvasArea: 'channels',
  text: 'How Many Customer Acquisition Channels have You Actually Figured & Validated ?',
  helpText: "A Channel is Validated only when You have Real Customer Acquisition Data Not simply a Channel You Intend to Use.",
  options: [

    {
      value: 0,
      title: 'Never Mapped Channels',
      description: "Choose this if you haven't Systematically Identified or Evaluated Potential Customer Acquisition Channels."
    },

    {
      value: 1,
      title: 'No Defined Channel',
      description: "Choose this if Customers arrive randomly or inconsistently, with no clearly defined Acquisition Channel driving them."
    },

    {
      value: 4,
      title: 'Few Channels But Untested',
      description: "Choose this if you've Identified a Primary Acquisition Channel, but haven't generated enough Real Customer Data to Evaluate its Effectiveness."
    },

    {
      value: 7,
      title: '1–2 Channels With Data',
      description: "Choose this if You've Tested 1–2 Acquisition Channels with Real Customers and have Measurable Data on Acquisition Cost, Conversion, or Customer Volume."
    },

    {
      value: 10,
      title: 'Established & Repeatable Channels',
      description: "Choose this if You've Validated 2-5 Acquisition Channels that Consistently generate Customers with Predictable Acquisition Cost and Conversion."
    },

  ],
},
{
  id: 'q8',
  module: 'Foundation',
  canvasArea: 'revenue_streams',
  text: 'How Many Monetizing Revenue Streams does Your Business Currently Have ?',
  helpText: "Only count Revenue Streams that are cpable of Generating Actual Revenue Today. Do not Count Theoretical, Planned, or Untested Revenue Streams.",
  options: [

    {
      value: 0,
      title: 'Never Mapped This',
      description: "Choose this if You haven't Identified or Evaluated the Potential Revenue Streams for Your Business."
    },

    {
      value: 1,
      title: 'Not Monetizing Yet',
      description: "Choose this if You have a Defined Revenue Model, but none of your Revenue Streams is currently generating revenue."
    },

    {
      value: 4,
      title: 'One Active Stream',
      description: "Choose this if You have One Revenue Stream Currently Generating Actual Revenue."
    },

    {
      value: 7,
      title: '2+ Active Streams',
      description: "Choose this if You Have 2 or More Revenue Streams GGenerating Actual Revenue, with One Still Clearly Dominant."
    },

    {
      value: 10,
      title: 'Diversified Revenue',
      description: "Choose this if You have Multiple Meaningful Revenue Streams Generating Actual Revenue, with No Excessive Dependence on a Single Stream."
    },

  ],
},
{
  id: 'q9',
  module: 'Fundraising Readiness',
  canvasArea: 'cost_structure',
  text: 'Do You have an Actual Financial Model Not merely a Running Expense Tracker ?',
  helpText: "A Financial Model Connects Revenue, Costs, Cash Flow, and Key Business Assumptions to show how the Business could Perform in the Future. Answer Based on What You Actually Have Built.",
  options: [

    {
      value: 0,
      title: 'Never Built One',
      description: "Choose this if You've never Built a Financial Model of Any Kind."
    },

    {
      value: 1,
      title: 'No Model At All',
      description: "Choose this if You have Neither a Financial Model nor a Structured System for Forecasting the Business."
    },

    {
      value: 4,
      title: 'Tracking, Not Modeling',
      description: "Choose this if You Track Actual Revenue or Expenses in a Spreadsheet, But don't have a Forward-looking Financial Model."
    },

    {
      value: 7,
      title: '12-Month Model Built',
      description: "Choose this if You have a 12-month Financial Model with Revenue, Costs, Cash Flow, and clearly stated Business Assumptions."
    },

    {
      value: 10,
      title: 'Multi-Year Scenario Model',
      description: "Choose this if You have a Regularly Updated Multi-Year Financial Model that Connects key Business Assumptions to Revenue, Costs, Cash Flow, and Best-Case, Base-Case, and Worst-Case scenarios."
    },

  ],
},
{
  id: 'q10',
  module: 'Fundraising Readiness',
  canvasArea: 'cost_structure',
  text: 'Where are You in the Actual Fundraising Process Right Now ?',
  helpText: "Answer based on actual Investor Activity Today Not Your Fundraising Plans, Intentions, or Hopes.",
  options: [

    {
      value: 0,
      title: 'No Timeline Yet',
      description: "Choose this if You haven't Defined When, Why, or How You Intend to Raise Capital."
    },

    {
      value: 1,
      title: "Haven't Started",
      description: "Choose this if You haven't Approached or Spoken with Any Investors about Raising Capital."
    },

    {
      value: 4,
      title: 'Few Conversations Only',
      description: "Choose this if You've had Initial Conversations with Investors, but Haven't Entered a Structured Fundraising Process Yet."
    },

    {
      value: 7,
      title: 'Pitched With Feedback',
      description: "Choose this if You've pitched Multiple Investors using a structured Pitch Deck and Received Specific, Actionable Feedback or Follow-Up."
    },

    {
      value: 10,
      title: 'Actively In Process',
      description: "Choose this if Multiple Investors are Actively Evaluating the Opportunity through Serious Follow-up Conversations, Due Diligence, or Term Sheet discussions."
    },

  ],
},
{
  id: 'q11',
  module: 'Operations & Scalability',
  canvasArea: 'key_partners',
  text: "Do You Have Advisors on the Team That Actually Contribute or Founders with Proven Team-Building Experience ?",
  helpText: "Focus on Real Substantial Help You Recieved Not Advisor Titles, Names on a Website, or Generic Guidance.",
  options: [

    {
      value: 0,
      title: 'Never Thought About It',
      description: "Choose this if You haven't Seriously Considered what Advisory Support or Team-Building capability Your Business Needs."
    },

    {
      value: 1,
      title: 'No Support System',
      description: "Choose this if You have No Serious Advisors or Mentors, and No Founder has Meaningful Experience Building or Leading a team."
    },

    {
      value: 4,
      title: 'Some Team Experience',
      description: "Choose this if You don't have active Advisors or Mentors, but at least one Founder has prior experience Hiring, Managing, or Leading a team."
    },

    {
      value: 7,
      title: 'Informal Advisors Involved',
      description: "Choose this if You have 1–2 active Advisors or Mentors who provide ongoing Guidance, along with some Founder Experience in Building and Leading teams."
    },

    {
      value: 10,
      title: 'Structured Support & Proven Leaders',
      description: "Choose this if You have an Actively Engaging Advisors in Team or structured External Support to help the Founders with Building, Selling, and Scaling."
    },

  ],
},
{
  id: 'q12',
  module: 'Foundation',
  canvasArea: 'key_activities',
  text: "Do You have a Defined Plan for When and How You'd Pivot?",
  helpText: "A Pivot Framework defines the Evidence, Metrics, and Decision Points that Determine when You should Persist, Change Direction, or Stop. Answer based on What is Actually Defined Today.",
  options: [

    {
      value: 0,
      title: 'Never Considered This',
      description: "Choose this if You haven't Substantially Considered What Would cause You to Pivot, Persist, or Stop."
    },

    {
      value: 1,
      title: 'No Pivot Thinking',
      description: "Choose this if You haven't Considered What would Trigger a Pivot if the Current Approach Fails, and Have No Defined Decision Points."
    },

    {
      value: 4,
      title: 'Vague Intention Only',
      description: "Choose this if You generally believe You'll Pivot if things don't Work, but haven't Defined Specific Metrics, Timelines, or Decision Points."
    },

    {
      value: 7,
      title: 'Specific Triggers Defined',
      description: "Choose this if You've Defined Specific Metrics, Customer Feedback, or Timelines that would trigger a formal decision to Pivot, Persist, or Stop."
    },

    {
      value: 10,
      title: 'Documented Framework in Place',
      description: "Choose this if You have a Documented Pivot/Persist Framework with Measurable Triggers and Decision Points, and regularly review it with the Team against actual results."
    },

  ],
},
{
  id: 'q13',
  module: 'Scale & Expansion',
  canvasArea: 'key_activities',
  text: 'How Clearly have You Defined and are Tracking the Metrics that Actually Drive Growth ?',
  helpText: "Focus on the Metrics that genuinely Explain Business Performance and Growth Not the Number of Metrics in Your Dashboard.",
  options: [

    {
      value: 0,
      title: "Haven't Defined What Matters",
      description: "Choose this if You haven't Identified which Metrics are Most Important for understanding Your Business Performance or Growth."
    },

    {
      value: 1,
      title: 'No Real Metrics',
      description: "Choose this if You don't Consistently Track Specific Metrics beyond Basic Financial Results or General Business Activity."
    },

    {
      value: 4,
      title: 'Basic Tracking But No Dashboard',
      description: "Choose this if You Track Basic Metrics such as Revenue, Customers, or Users, But haven't Constructed a Dashboard with Specific Metrics that Best explain Your Growth."
    },

    {
      value: 7,
      title: 'Key Metrics Defined',
      description: "Choose this if You've Identified a Primary Growth Metric along with 2–3 Supporting KPIs, and Track them Consistently Over Time."
    },

    {
      value: 10,
      title: 'Metrics Drive Decisions',
      description: "Choose this if You have a Regularly reviewed Metrics Dashboard that Tracks the Key Drivers of Growth and Directly Informs Product, Marketing, Sales, Hiring, or Resource Allocation decisions."
    },

  ],
},
{
  id: 'q14',
  module: 'Foundation',
  canvasArea: 'key_activities',
  text: 'How Specific and Measurable is Your Target for the Next 6 Months ?',
  helpText: "A Target is meaningful Only if You can Discretely Determine whether You Achieved it and Can Track Progress Toward It Over Time.",
  options: [

    {
      value: 0,
      title: "Haven't Set One",
      description: "Choose this if You haven't defined any Specific Target for the Next 6 Months."
    },

    {
      value: 1,
      title: 'No Target Set',
      description: "Choose this if You have No Defined Outcome or Measurable Goal for Where the Business should be 6 Months From Now."
    },

    {
      value: 4,
      title: 'Direction Decided But No Numbers',
      description: "Choose this if You have a general Goal, such as 'Grow Revenue' or 'Acquire More Users', but haven't defined a Specific Measurable Target."
    },

    {
      value: 7,
      title: 'Specific Numeric Target',
      description: "Choose this if You have a Specific, Measurable Target for the Next 6 Months, such as Revenue, Customers, Users, Profitability, or Another Relevant Business Metric."
    },

    {
      value: 10,
      title: 'Broken Into Milestones',
      description: "Choose this if Your 6-month Target is Broken into Measurable Milestones, Tracked Regularly, with clear Ownership and Accountability."
    },

  ],
},
{
  id: 'q15',
  module: 'Turnaround & Stabilisation',
  canvasArea: 'cost_structure',
  text: 'How Well do You Understand the Regulatory Requirements that Apply to Your Business ?',
  helpText: "Answer Based on What You've Confidently Researched and Mapped Not Assumptions. Consider Licences, Registrations, Approvals, Reporting, and other Compliance Requirements Relevant to Your Business.",
  options: [

    {
      value: 0,
      title: 'Not Sure It Applies',
      description: "Choose this if You're Not Sure Whether Any Regulatory Requirements Apply to Your Business."
    },

    {
      value: 1,
      title: "Haven't Looked Into It",
      description: "Choose this if You haven't Internally Researched the Regulatory Requirements that May Apply to Your Business."
    },

    {
      value: 4,
      title: 'Aware But Dependent on External Auditors or Chartered Accountant',
      description: "Choose this if You're aware that Regulatory Requirements Exist, but are Dependent on External Auditors or Chartered Accountants for Compliance."
    },

    {
      value: 7,
      title: 'Aware & In Charge of of All Regulatory Requirements',
      description: "Choose this if You've identified and documented the Key Regulatory Requirements that apply to Your Business and understand what is required for Compliance."
    },

    {
      value: 10,
      title: 'Founding Team has a Finance or Law Expert',
      description: "Choose this if the Key Regulatory Requirements have been Adequately Addresed and You have Appropriate Expert like a Chief Financial Officer or Lawyer on the Founding Team to Manage Regulatory Compliance."
    },

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
  OUTPUT_WEIGHTS,
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

  // Weighted gap, not raw score: a dimension's priority = how far below 10
  // it sits, scaled by how much that dimension actually counts toward the
  // Mega Score (OUTPUT_WEIGHTS). This surfaces the gaps that matter most
  // to the business, not just whichever number happens to be lowest —
  // e.g. a mid-low score on a heavily-weighted dimension like Financial
  // Understanding now outranks a lower raw score on a lightly-weighted one.
  const priorityGap = (key: OutputKey) => (10 - result.combined[key]) * (OUTPUT_WEIGHTS[key] ?? 1.0);

  const priorities = (Object.keys(result.combined) as OutputKey[])
    .sort((a, b) => priorityGap(b) - priorityGap(a))
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
            Don’t Stop at The Scores. Read the Complete Report Thoroughly to Understand the Complete Picture.
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
        All Scores in the Report are Out of 10
      </p>

      {/* CURRENT BUSINESS CONDITION — 9 outputs */}
      <div>
        <p className="text-lg font-semibold text-[#0A1E3D] mb-1">Current Business Condition</p>
        <p className="text-sm text-[#0A1E3D] leading-relaxed mb-3">
          Where the Business Stands Today, Across the Dimensions that Determine Structural Health.
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
          How Capable the Business is to Convert Today&apos;s Foundation into Long Term Success.
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
            The Areas that Require the Most immediate Attention Based on the Gaps Identified in Your Diagnosis.
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
            What the Pattern Across Your Answers Means, and the Overall Read on Where Things Stand.
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