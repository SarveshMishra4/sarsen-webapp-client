// =====================================================
// fundraisingReadinessEngine.ts
//
// SARSEN FUNDRAISING READINESS & INVESTOR-STAGE FIT ENGINE
//
// WHAT THIS TOOL ANSWERS
// -----------------------------------------------------
//   1. Which stage of investor should this company actually be talking to
//      (Pre-Seed / Seed / Series A / Series B or Beyond) — derived from
//      traction signals, not from what the founder thinks they should ask.
//   2. Is the ask itself well-calculated — not "do you know the number"
//      (founders always say yes), but derived indirectly from whether the
//      spend plan, buffer, and milestone confidence actually hold together.
//   3. Is the company operationally ready for diligence — data room,
//      financial model, cap table, legal basics, a tested deck.
//   4. Does the company have the experience, guidance, timeline, and
//      investor-outreach strategy that correlates with a raise actually
//      closing — not just being started.
//
// METHODOLOGY NOTE
// -----------------------------------------------------
// Like the Business Diagnostic engine this is modelled on, every question
// uses the same 5-option answer scale (0 / 1 / 4 / 7 / 10, where 0 is a
// real "haven't done this" answer, not a missing one), and every derived
// output is a transparent weighted average — nothing here is a black box.
// The one addition specific to this tool is the STAGE VOTE system (§2):
// five traction questions each independently "vote" for a stage, and
// disagreement between those votes is itself a measured, reported signal
// (a positioning mismatch), the same way the founder-fit tool measures
// disagreement between three phrasings of the same trait.
// =====================================================

// =====================================================
// 1. QUESTION BANK
// =====================================================

export type AnswerValue = 0 | 1 | 4 | 7 | 10;

export type Category = 'traction' | 'ask' | 'diligence' | 'experience' | 'process' | 'outreach';

export type AnswerOption = { value: AnswerValue; title: string; description: string };

export type Question = {
  id: string;
  category: Category;
  text: string;
  helpText: string;
  options: AnswerOption[];
};

export const CATEGORY_META: Record<Category, { label: string; description: string }> = {
  traction: {
    label: 'Traction & Stage Signal',
    description: 'What the business has actually proven so far — this is what determines which stage of investor fits, regardless of which stage you plan to pitch.',
  },
  ask: {
    label: 'Ask Clarity',
    description: 'Whether the amount you plan to raise is a genuinely calculated number or a round guess, and whether it survives a shortfall.',
  },
  diligence: {
    label: 'Diligence Readiness',
    description: 'Whether the documentation an investor will ask for in the first two meetings actually exists.',
  },
  experience: {
    label: 'Experience & Guidance',
    description: 'Whether you have done this before, or have someone who has, guiding you through it.',
  },
  process: {
    label: 'Process & Timeline',
    description: 'Whether the raise is being run as a deliberate, time-boxed process rather than an open-ended search.',
  },
  outreach: {
    label: 'Investor List & Outreach Strategy',
    description: 'How the target investor list was built, and whether the outreach channel matches what actually works at your stage.',
  },
};

// Maps a traction-question answer value onto a stage index:
// 0 = Pre-Seed, 1 = Seed, 2 = Series A, 3 = Series B or Beyond
export const VALUE_TO_STAGE_INDEX: Record<AnswerValue, number> = { 0: 0, 1: 0, 4: 1, 7: 2, 10: 3 };

export const QUESTIONS: Question[] = [
  // ---------------- TRACTION & STAGE SIGNAL ----------------
  {
    id: 'T1',
    category: 'traction',
    text: 'Which best describes your current product and revenue stage?',
    helpText: 'This is the single strongest signal of which investor stage actually fits you.',
    options: [
      { value: 0, title: 'Idea / Pre-Launch', description: "Still building — no live product with real users yet." },
      { value: 1, title: 'Live, No Revenue', description: 'Product is live with early users or pilots, but no revenue yet.' },
      { value: 4, title: 'Early Revenue', description: 'Generating revenue, but inconsistent — under roughly $5K MRR or equivalent.' },
      { value: 7, title: 'Repeatable Revenue', description: 'Consistent, repeatable revenue growth — roughly $5K–$50K MRR.' },
      { value: 10, title: 'Scaling Revenue', description: 'Proven unit economics at scale — above roughly $50K MRR.' },
    ],
  },
  {
    id: 'T2',
    category: 'traction',
    text: 'How would you describe your customer base?',
    helpText: 'Not how many people have tried it — who is actually paying and staying.',
    options: [
      { value: 0, title: 'No Customers', description: "Haven't onboarded real customers yet." },
      { value: 1, title: 'Pilot / Friends & Family', description: 'A handful of pilot users, friends, or family testing it.' },
      { value: 4, title: 'Paying, Some Repeat', description: 'Paying customers exist, with some repeat business.' },
      { value: 7, title: 'Diversified & Retained', description: 'A diversified paying base with measurable retention.' },
      { value: 10, title: 'Multiple Segments at Scale', description: 'Several customer segments, each meaningful at scale.' },
    ],
  },
  {
    id: 'T3',
    category: 'traction',
    text: 'What is your current team size (full-time equivalents, including founders)?',
    helpText: "Team size is a proxy for how much has already been organizationally built.",
    options: [
      { value: 0, title: 'Just Founder(s)', description: 'No full-time hires beyond the founding team yet.' },
      { value: 1, title: '2–4 People', description: 'A small founding team with one or two early hires.' },
      { value: 4, title: '5–15 People', description: 'A functioning small team across a few core functions.' },
      { value: 7, title: '16–50 People', description: 'Multiple functional teams with some management layer.' },
      { value: 10, title: '50+ People', description: 'A full organization with established departments.' },
    ],
  },
  {
    id: 'T4',
    category: 'traction',
    text: 'Have you raised institutional or structured funding before, at this company?',
    helpText: 'What you have already closed is the clearest evidence of what stage comes next.',
    options: [
      { value: 0, title: 'Never Raised', description: 'No external funding raised yet, at any stage.' },
      { value: 1, title: 'Friends & Family / Angels Only', description: 'Raised an informal round from friends, family, or individual angels.' },
      { value: 4, title: 'Formal Seed Round', description: 'Closed a formal, institutionally-led Seed round.' },
      { value: 7, title: 'Series A', description: 'Closed a Series A round.' },
      { value: 10, title: 'Series B or Later', description: 'Closed a Series B round or beyond.' },
    ],
  },
  {
    id: 'T5',
    category: 'traction',
    text: "How would you describe your month-on-month growth over the last 6 months?",
    helpText: 'Growth rate, not absolute size, is what most investors weigh most heavily at this stage.',
    options: [
      { value: 0, title: 'Too Early to Measure', description: "Not enough operating history yet to have a growth trend." },
      { value: 1, title: 'No Clear Trend', description: 'Growth exists but is inconsistent month to month.' },
      { value: 4, title: 'Steady (10–20%/mo)', description: 'Reasonably steady growth in the 10–20% monthly range.' },
      { value: 7, title: 'Strong (20%+/mo)', description: 'Strong, largely repeatable growth above 20% monthly.' },
      { value: 10, title: 'Proven Scalable Engine', description: 'A predictable growth engine with proven repeatability.' },
    ],
  },

  // ---------------- ASK CLARITY ----------------
  {
    id: 'A1',
    category: 'ask',
    text: "Have you calculated the exact amount you plan to raise from your actual runway and milestones — or is it a round number?",
    helpText: "Don't count what sounds right in a pitch — count what was actually calculated on paper.",
    options: [
      { value: 0, title: 'Round Number', description: "Picked a number that sounded right, not one that was calculated." },
      { value: 1, title: 'Comparable-Based Estimate', description: 'Estimated based on what similar companies raised.' },
      { value: 4, title: 'Burn × Runway', description: 'Estimated from monthly burn multiplied by target runway.' },
      { value: 7, title: 'Bottoms-Up Budget', description: 'Built from a detailed, line-by-line bottoms-up budget.' },
      { value: 10, title: 'Modeled with Scenarios', description: 'A full financial model validates the number across scenarios.' },
    ],
  },
  {
    id: 'A2',
    category: 'ask',
    text: 'Have you mapped out, practically, how you will spend the funds — line by line?',
    helpText: 'Knowing the total is different from knowing where each rupee or dollar of it goes.',
    options: [
      { value: 0, title: 'No Plan Yet', description: 'No specific spend plan exists yet.' },
      { value: 1, title: 'General Buckets', description: "Broad buckets only, like 'hiring' or 'marketing.'" },
      { value: 4, title: 'Departmental Budget', description: 'Broken down by department or function.' },
      { value: 7, title: 'Month-by-Month, Milestone-Tied', description: 'A month-by-month plan tied directly to milestones.' },
      { value: 10, title: 'Reviewed & Stress-Tested', description: 'Full plan reviewed and stress-tested with an advisor or board.' },
    ],
  },
  {
    id: 'A3',
    category: 'ask',
    text: 'Does your budget include a deliberate buffer for miscellaneous or unplanned costs?',
    helpText: "This is the single most common gap founders discover only after the money is spent.",
    options: [
      { value: 0, title: 'No Buffer', description: "No contingency buffer included at all." },
      { value: 1, title: 'Small, Uncalculated', description: 'Some cushion exists but was never specifically calculated.' },
      { value: 4, title: 'Standard ~10%', description: 'A standard roughly 10% buffer is built in.' },
      { value: 7, title: 'Deliberate 15–20%', description: 'A deliberate 15–20% contingency buffer is built in.' },
      { value: 10, title: 'Buffer + Contingency Plan', description: 'A buffer plus a separate plan for what happens if costs run over.' },
    ],
  },
  {
    id: 'A4',
    category: 'ask',
    text: 'If you ended up raising 20% less than your target, would you still hit the milestones you plan to promise investors?',
    helpText: 'This is the real test of whether the ask amount is calculated or just hoped for.',
    options: [
      { value: 0, title: 'Plan Falls Apart', description: 'The plan collapses below the full target amount.' },
      { value: 1, title: 'Major Milestones Slip', description: 'Key milestones would slip significantly.' },
      { value: 4, title: 'Some Milestones Delayed', description: 'Some milestones would need to be delayed or cut.' },
      { value: 7, title: 'Core Plan Intact', description: 'Core milestones survive with only minor adjustments.' },
      { value: 10, title: 'Fully Resilient', description: 'The plan is fully resilient even at 20% less.' },
    ],
  },
  {
    id: 'A5',
    category: 'ask',
    text: 'How confident are you that you will actually hit the milestones you plan to promise investors, on the timeline you plan to present?',
    helpText: "Investors fund the next round based on hitting this one's promised milestones — this number matters more than the pitch deck slide.",
    options: [
      { value: 0, title: 'Placeholder Targets', description: 'These are placeholder numbers, not real commitments yet.' },
      { value: 1, title: 'Aspirational', description: 'Somewhat confident, but the numbers are aspirational.' },
      { value: 4, title: 'Reasonably Confident', description: 'Reasonably confident, based on current trajectory.' },
      { value: 7, title: 'Grounded in Run-Rate', description: 'Confident — grounded in current run-rate and pipeline.' },
      { value: 10, title: 'Validated & Cross-Checked', description: 'Very confident — validated and cross-checked with the team.' },
    ],
  },

  // ---------------- DILIGENCE READINESS ----------------
  {
    id: 'D1',
    category: 'diligence',
    text: 'Do you have a data room (or equivalent shared folder) set up with your key documents ready to share?',
    helpText: 'The speed of your first diligence request response is itself a signal to investors.',
    options: [
      { value: 0, title: 'No Data Room', description: 'No data room exists yet.' },
      { value: 1, title: 'Scattered Documents', description: 'A few scattered documents, not organized in one place.' },
      { value: 4, title: 'Basic Data Room', description: 'A basic room with pitch deck and financials.' },
      { value: 7, title: 'Organized Across Categories', description: 'Organized across financials, legal, cap table, and metrics.' },
      { value: 10, title: 'Investor-Tested', description: 'A full data room already used in real investor conversations.' },
    ],
  },
  {
    id: 'D2',
    category: 'diligence',
    text: 'Do you have an up-to-date financial model — not just a pitch deck slide?',
    helpText: "A slide with a number on it is not a model; a model shows how that number was derived.",
    options: [
      { value: 0, title: 'No Model', description: 'No financial model exists.' },
      { value: 1, title: 'Rough Spreadsheet', description: 'A rough spreadsheet estimate, not a full model.' },
      { value: 4, title: 'Basic 12-Month Projection', description: 'A basic 12-month projection exists.' },
      { value: 7, title: '3–5 Year Model', description: 'A 3–5 year model with clearly stated assumptions.' },
      { value: 10, title: 'Reviewed Scenario Model', description: 'A detailed model with scenarios, reviewed by an advisor or CFO.' },
    ],
  },
  {
    id: 'D3',
    category: 'diligence',
    text: 'Is your cap table clean and clearly documented?',
    helpText: 'A messy cap table is one of the fastest ways to stall a term sheet.',
    options: [
      { value: 0, title: 'No Formal Cap Table', description: 'No formal cap table exists.' },
      { value: 1, title: 'Informal Notes', description: 'Tracked informally, e.g. in a notes document.' },
      { value: 4, title: 'Basic Spreadsheet', description: 'A basic spreadsheet cap table exists.' },
      { value: 7, title: 'Fully Documented', description: 'Clean, with all instruments (SAFEs, notes, options) documented.' },
      { value: 10, title: 'Managed on Dedicated Software', description: 'Managed on dedicated cap-table software and audit-ready.' },
    ],
  },
  {
    id: 'D4',
    category: 'diligence',
    text: 'Are your legal and company-formation basics in order — incorporation, IP assignment, founder agreements?',
    helpText: 'These are usually the first documents requested, and the slowest to fix under time pressure.',
    options: [
      { value: 0, title: 'Not Addressed', description: "Not addressed yet in any structured way." },
      { value: 1, title: 'Incorporated Only', description: 'Incorporated, but nothing further formalized.' },
      { value: 4, title: '+ Founder Agreements', description: 'Incorporation plus basic founder agreements are in place.' },
      { value: 7, title: '+ IP Assignment', description: 'Adds signed IP assignment agreements from all contributors.' },
      { value: 10, title: 'Fully Reviewed', description: 'A full legal review has been completed with no open issues.' },
    ],
  },
  {
    id: 'D5',
    category: 'diligence',
    text: 'Do you have a pitch deck that has actually been tested — through practice pitches or real investor feedback?',
    helpText: "The first real investor meeting is the wrong place to discover which slide doesn't land.",
    options: [
      { value: 0, title: 'No Deck Yet', description: 'No pitch deck exists yet.' },
      { value: 1, title: 'Untested Draft', description: 'A first draft exists, but it has never been tested.' },
      { value: 4, title: 'Practiced Internally', description: 'Practiced internally with the team.' },
      { value: 7, title: 'Tested with Friendly Investors', description: 'Tested with a few friendly investors or advisors, and refined.' },
      { value: 10, title: 'Refined Through Real Meetings', description: 'Refined across multiple real investor meetings.' },
    ],
  },

  // ---------------- EXPERIENCE & GUIDANCE ----------------
  {
    id: 'E1',
    category: 'experience',
    text: 'Have you personally led a fundraise before — at this company or a previous one?',
    helpText: 'This is the strongest predictor of how smoothly the process itself will go, separate from the business.',
    options: [
      { value: 0, title: 'Never', description: "Never personally led a fundraising process." },
      { value: 1, title: 'Observed One', description: 'Observed a raise closely, but did not lead it.' },
      { value: 4, title: 'Led a Small Raise', description: 'Led a small friends & family or angel raise.' },
      { value: 7, title: 'Led a Formal Round', description: 'Led a formal institutional round before.' },
      { value: 10, title: 'Led Multiple Rounds', description: 'Led multiple successful institutional rounds.' },
    ],
  },
  {
    id: 'E2',
    category: 'experience',
    text: 'Do you have someone — an advisor, mentor, or board member — actively guiding you through this fundraising process?',
    helpText: 'A single well-placed advisor materially changes both preparation quality and investor access.',
    options: [
      { value: 0, title: 'No One', description: 'No one is actively guiding this process.' },
      { value: 1, title: 'Occasional Peer Advice', description: 'Informal, occasional advice from peers.' },
      { value: 4, title: 'One Advisor, On Request', description: 'One advisor is available if specifically asked.' },
      { value: 7, title: 'Regularly Engaged Advisor', description: 'An engaged advisor regularly reviews materials and strategy.' },
      { value: 10, title: 'Structured Support System', description: 'A structured system — advisor, board, possibly a consultant.' },
    ],
  },
  {
    id: 'E3',
    category: 'experience',
    text: "If this raise doesn't go as planned, do you have a fallback (a bridge, extended runway, or alternative capital source)?",
    helpText: "Having a real fallback changes how a raise is run — it removes desperation from the negotiation.",
    options: [
      { value: 0, title: 'No Fallback', description: 'No fallback plan exists.' },
      { value: 1, title: 'Vague Idea', description: 'A vague idea exists, but it is not worked out.' },
      { value: 4, title: 'General Direction Identified', description: 'A general fallback direction has been identified.' },
      { value: 7, title: 'Discussed & Concrete', description: 'A concrete option identified and discussed with someone specific.' },
      { value: 10, title: 'Fully Worked Out', description: 'A fully worked-out contingency plan, ready to execute.' },
    ],
  },
  {
    id: 'E4',
    category: 'experience',
    text: 'How well do you understand what investors at your target stage typically expect — metrics, ownership %, and terms?',
    helpText: 'What counts as a strong metric changes completely by stage; the wrong benchmark reads as naivety.',
    options: [
      { value: 0, title: 'Not Familiar', description: 'Not familiar with typical stage expectations.' },
      { value: 1, title: 'Vague Awareness', description: 'A vague, general awareness exists.' },
      { value: 4, title: 'Understand the Basics', description: 'Understand the basics of typical terms and metrics.' },
      { value: 7, title: 'Well-Versed', description: 'Well-versed in typical terms, valuations, and expectations.' },
      { value: 10, title: 'Validated with Investors', description: 'Deep understanding, validated directly through conversations with investors.' },
    ],
  },

  // ---------------- PROCESS & TIMELINE ----------------
  {
    id: 'P1',
    category: 'process',
    text: 'Do you have a clearly defined timeline for this fundraise — from first outreach to close?',
    helpText: 'An open-ended raise tends to stay open-ended; investors read urgency (or its absence) quickly.',
    options: [
      { value: 0, title: 'No Timeline', description: "No timeline has been set." },
      { value: 1, title: 'Vague Urgency', description: 'A vague sense of urgency, with no specific dates.' },
      { value: 4, title: 'Rough Timeline', description: "A rough timeline exists, e.g. 'next few months.'" },
      { value: 7, title: 'Milestone-Based Timeline', description: 'Defined milestones — first meetings, term sheet target, close date.' },
      { value: 10, title: 'Tracked with the Team', description: 'A detailed timeline shared and actively tracked with the team or board.' },
    ],
  },
  {
    id: 'P2',
    category: 'process',
    text: 'How much runway do you currently have left if this raise takes longer than expected?',
    helpText: 'Runway is what determines whether you are negotiating from strength or from urgency.',
    options: [
      { value: 0, title: 'Under 2 Months', description: 'Less than 2 months of runway remain.' },
      { value: 1, title: '2–4 Months', description: '2 to 4 months of runway remain.' },
      { value: 4, title: '4–6 Months', description: '4 to 6 months of runway remain.' },
      { value: 7, title: '6–9 Months', description: '6 to 9 months of runway remain.' },
      { value: 10, title: '9+ Months', description: 'More than 9 months of runway remain.' },
    ],
  },
  {
    id: 'P3',
    category: 'process',
    text: 'Have you set specific weekly or monthly targets for fundraising activity, such as the number of investor meetings?',
    helpText: 'Fundraising is largely a numbers game in its early stages — untracked activity quietly slows down.',
    options: [
      { value: 0, title: 'No Targets', description: 'No activity targets have been set.' },
      { value: 1, title: 'Informal Pace', description: 'An informal sense of pace, without specific numbers.' },
      { value: 4, title: 'Rough Monthly Targets', description: 'Rough monthly targets exist.' },
      { value: 7, title: 'Tracked Weekly Targets', description: 'Clear weekly targets, tracked in a CRM or spreadsheet.' },
      { value: 10, title: 'Reviewed with Accountability', description: 'Targets are tracked and reviewed regularly with someone checking in.' },
    ],
  },
  {
    id: 'P4',
    category: 'process',
    text: 'Do you have a process for tracking investor conversations and follow-ups?',
    helpText: 'A missed follow-up is one of the most common, most avoidable reasons a warm conversation goes cold.',
    options: [
      { value: 0, title: 'No Tracking', description: 'No tracking system exists.' },
      { value: 1, title: 'Mental Tracking Only', description: 'Tracked only in memory, informally.' },
      { value: 4, title: 'Basic Spreadsheet', description: 'A basic spreadsheet is used.' },
      { value: 7, title: 'Structured Tracker', description: 'A structured tracker with stage and status per investor.' },
      { value: 10, title: 'Dedicated CRM', description: 'A dedicated CRM tool is actively maintained.' },
    ],
  },

  // ---------------- INVESTOR LIST & OUTREACH STRATEGY ----------------
  {
    id: 'O1',
    category: 'outreach',
    text: 'Have you built a specific, researched list of target investors — not just a generic list of names?',
    helpText: 'A long unresearched list wastes outreach; a short researched list converts.',
    options: [
      { value: 0, title: 'No List Yet', description: 'No target investor list exists yet.' },
      { value: 1, title: 'A Handful of Names', description: 'A handful of names, without real research behind them.' },
      { value: 4, title: '10–20, Basic Research', description: 'A list of 10–20 investors with basic research done.' },
      { value: 7, title: '30+, Stage/Sector Matched', description: 'A researched list of 30+ investors matched to stage and sector.' },
      { value: 10, title: 'Tiered List of 50+', description: 'A prioritized, tiered list of 50+ with detailed notes on each.' },
    ],
  },
  {
    id: 'O2',
    category: 'outreach',
    text: 'How are you primarily planning to reach these investors?',
    helpText: 'This single answer correlates more strongly with a raise closing than almost anything else in this section.',
    options: [
      { value: 0, title: 'Cold Email Only', description: 'Relying on cold email outreach alone.' },
      { value: 1, title: 'Cold LinkedIn Only', description: 'Relying on cold LinkedIn outreach alone.' },
      { value: 4, title: 'Mostly Cold, Some Warm', description: 'A mix, but mostly cold outreach with occasional warm intros.' },
      { value: 7, title: 'Primarily Warm Intros', description: 'Primarily warm introductions through your existing network.' },
      { value: 10, title: 'Warm Intros + Referral Loop', description: 'Warm intros plus asking every investor met for further introductions.' },
    ],
  },
  {
    id: 'O3',
    category: 'outreach',
    text: 'Are the investors on your list matched to your specific stage and sector?',
    helpText: 'The single most common wasted-outreach mistake is pitching the wrong stage or sector to the right person.',
    options: [
      { value: 0, title: 'Generic List', description: 'Not really — mostly a generic, unmatched list.' },
      { value: 1, title: 'Loosely Matched', description: 'Loosely matched, without much specific filtering.' },
      { value: 4, title: 'Matched by Stage', description: 'Reasonably matched by investment stage.' },
      { value: 7, title: 'Matched by Stage & Sector', description: 'Matched by both stage and sector focus.' },
      { value: 10, title: 'Matched by Stage, Sector & Check Size', description: 'Matched by stage, sector, geography, and typical check size.' },
    ],
  },
  {
    id: 'O4',
    category: 'outreach',
    text: 'Do you have a deliberate plan for how location/geography factors into your investor targeting?',
    helpText: 'Local-only targeting is sometimes right and sometimes an unexamined default — the difference matters.',
    options: [
      { value: 0, title: "Haven't Considered It", description: "Geography hasn't been factored in at all." },
      { value: 1, title: 'Vague Awareness', description: 'A vague awareness of geography, without a real plan.' },
      { value: 4, title: 'Local by Default', description: 'Targeting mostly local investors, by default rather than by design.' },
      { value: 7, title: 'Deliberate Local + Remote Mix', description: 'Deliberately mixing local and remote-friendly, sector-focused investors.' },
      { value: 10, title: 'Data-Informed Targeting', description: 'Targeting informed by where genuinely comparable companies raised from.' },
    ],
  },
  {
    id: 'O5',
    category: 'outreach',
    text: 'How do you plan to keep momentum in the fundraising process?',
    helpText: 'A raise that trickles out over months tends to lose urgency; a tight, parallel process tends to create it.',
    options: [
      { value: 0, title: 'No Specific Plan', description: 'Reaching out as it comes to mind, without a structured plan.' },
      { value: 1, title: 'Loosely Paced', description: 'Outreach is loosely paced, without much structure.' },
      { value: 4, title: 'Batched Over Weeks', description: 'Outreach is batched into rounds over a few weeks.' },
      { value: 7, title: 'Structured, Time-Boxed', description: 'A structured, time-boxed process designed to create urgency.' },
      { value: 10, title: 'Parallel Tracks to a Close Date', description: 'Structured parallel tracks driving toward a specific target close date.' },
    ],
  },
];

// =====================================================
// 2. STAGE DETERMINATION
// =====================================================

export type StageIndex = 0 | 1 | 2 | 3;

export const STAGE_LABELS: Record<StageIndex, string> = {
  0: 'Pre-Seed',
  1: 'Seed',
  2: 'Series A',
  3: 'Series B or Beyond',
};

export const STAGE_INVESTOR_TYPES: Record<StageIndex, string[]> = {
  0: ['Angel investors', 'Pre-seed-focused micro-VC funds', 'Accelerators & incubators', 'Friends & family'],
  1: ['Seed-stage VC funds', 'Super angels & angel syndicates', 'Sector-focused seed funds'],
  2: ['Traditional Series A VC funds', 'Later-stage angels co-investing alongside a lead', 'Relevant strategic/corporate VCs'],
  3: ['Growth-stage VC funds', 'Private equity growth investors', 'Strategic/corporate investors', 'Late-stage crossover funds'],
};

export const STAGE_OUTREACH_NOTE: Record<StageIndex, string> = {
  0: 'At this stage, warm introductions still help, but cold outreach through founder communities, accelerator networks, and LinkedIn can genuinely work — the bar for a first conversation is lower.',
  1: 'Warm introductions start to matter more here. A well-targeted, researched list with a mix of warm intros and thoughtful cold outreach is realistic.',
  2: 'Warm introductions are close to essential at this stage. Cold outreach conversion drops sharply; prioritize your network, existing investors, and advisors for intros.',
  3: 'At this stage, outreach is almost entirely relationship- and banker-driven. A structured process run through existing investor relationships or an advisor is the realistic path.',
};

const TRACTION_QUESTIONS = QUESTIONS.filter((q) => q.category === 'traction');

export type StageAssessment = {
  votes: { questionId: string; stageIndex: number }[];
  averageStageIndex: number;
  recommendedStage: StageIndex;
  spread: number; // max - min stage vote
  positioningMismatch: boolean; // spread >= 2
};

export function assessStage(answers: Record<string, AnswerValue>): StageAssessment {
  const votes = TRACTION_QUESTIONS.map((q) => ({
    questionId: q.id,
    stageIndex: VALUE_TO_STAGE_INDEX[answers[q.id] ?? 0],
  }));
  const values = votes.map((v) => v.stageIndex);
  const averageStageIndex = values.reduce((a, b) => a + b, 0) / values.length;
  const recommendedStage = Math.min(3, Math.max(0, Math.round(averageStageIndex))) as StageIndex;
  const spread = Math.max(...values) - Math.min(...values);

  return { votes, averageStageIndex: Math.round(averageStageIndex * 100) / 100, recommendedStage, spread, positioningMismatch: spread >= 2 };
}

// =====================================================
// 3. CATEGORY & OVERALL SCORING
// =====================================================

export function clamp(value: number, minimum = 0, maximum = 10): number {
  return Math.max(minimum, Math.min(maximum, value));
}

export function scoreCategory(answers: Record<string, AnswerValue>, category: Category): number {
  const qs = QUESTIONS.filter((q) => q.category === category);
  const total = qs.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
  return Math.round(clamp(total / qs.length) * 100) / 100;
}

export function scoreAllCategories(answers: Record<string, AnswerValue>): Record<Category, number> {
  const categories: Category[] = ['traction', 'ask', 'diligence', 'experience', 'process', 'outreach'];
  const result = {} as Record<Category, number>;
  for (const c of categories) result[c] = scoreCategory(answers, c);
  return result;
}

// Overall readiness weights. Traction counts, but lightly — it mainly
// determines WHICH stage you should approach, not how ready you are for
// that stage; Diligence and Ask Clarity are weighted highest because
// they are what investors actually test for in the first two meetings.
export const CATEGORY_WEIGHTS: Record<Category, number> = {
  traction: 0.7,
  ask: 1.2,
  diligence: 1.3,
  experience: 1.0,
  process: 1.0,
  outreach: 1.1,
};

export function calculateOverallReadiness(categoryScores: Record<Category, number>): number {
  let numerator = 0;
  let denominator = 0;
  for (const category of Object.keys(categoryScores) as Category[]) {
    const weight = CATEGORY_WEIGHTS[category];
    numerator += categoryScores[category] * weight;
    denominator += weight;
  }
  return Math.round((numerator / denominator) * 100) / 100;
}

export function readinessBand(score: number): string {
  if (score < 3) return 'Not Ready';
  if (score < 5) return 'Early Preparation';
  if (score < 7) return 'Developing';
  if (score < 8.5) return 'Investor-Ready';
  return 'Highly Prepared';
}

// =====================================================
// 4. LIKELIHOOD OF A SUCCESSFUL RAISE
// =====================================================
// A separate number from Overall Readiness: readiness measures whether
// the homework is done, likelihood additionally penalizes a specific,
// well-documented risk factor (jumping more than one stage ahead of your
// own fundraising experience) and rewards the single strongest external
// predictor available here — a warm-introduction-heavy outreach strategy.

export type LikelihoodAssessment = { score: number; band: string; stageJumpPenaltyApplied: boolean; warmOutreachBonusApplied: boolean };

export function calculateLikelihood(
  overallReadiness: number,
  stage: StageAssessment,
  answers: Record<string, AnswerValue>
): LikelihoodAssessment {
  const priorRaiseStageIndex = VALUE_TO_STAGE_INDEX[answers['T4'] ?? 0];
  const stageJump = stage.recommendedStage - priorRaiseStageIndex;
  const stageJumpPenaltyApplied = stageJump > 1;

  const outreachValue = answers['O2'] ?? 0;
  const warmOutreachBonusApplied = outreachValue >= 7;

  let score = overallReadiness;
  if (stageJumpPenaltyApplied) score -= 1.5;
  if (warmOutreachBonusApplied) score += 0.5;
  score = clamp(score);

  let band: string;
  if (score < 4) band = 'Low';
  else if (score < 6) band = 'Moderate';
  else if (score < 8) band = 'Good';
  else band = 'Strong';

  return { score: Math.round(score * 100) / 100, band, stageJumpPenaltyApplied, warmOutreachBonusApplied };
}

// =====================================================
// 5. GREEN / RED FLAG PATTERN RULES
// =====================================================

export type Flag = { type: 'red' | 'green'; title: string; statement: string };

type FlagRule = {
  id: string;
  type: 'red' | 'green';
  title: string;
  condition: (ctx: FlagContext) => boolean;
  statement: string;
};

type FlagContext = {
  answers: Record<string, AnswerValue>;
  categories: Record<Category, number>;
  stage: StageAssessment;
};

const FLAG_RULES: FlagRule[] = [
  {
    id: 'confident_ask_no_diligence',
    type: 'red',
    title: 'Confident ask, no documentation behind it',
    condition: (c) => (c.answers['A5'] ?? 0) >= 7 && c.categories.diligence <= 4,
    statement: "There's real confidence in the milestones being promised, but the documentation an investor will ask for to believe them — financial model, data room — isn't ready yet. This gap usually surfaces in the very first meeting.",
  },
  {
    id: 'no_buffer',
    type: 'red',
    title: 'No real contingency buffer',
    condition: (c) => (c.answers['A3'] ?? 0) <= 1,
    statement: "The budget has no meaningfully calculated buffer for unplanned costs — a common, avoidable reason founders end up needing a bridge round earlier than planned.",
  },
  {
    id: 'fragile_at_shortfall',
    type: 'red',
    title: 'Plan breaks on a partial raise',
    condition: (c) => (c.answers['A4'] ?? 0) <= 1,
    statement: 'If the raise came in at 20% below target, the current plan would largely fall apart. A plan with no flexibility for a partial close reads as higher outcome-risk to investors, not just to you.',
  },
  {
    id: 'first_time_high_stakes',
    type: 'red',
    title: 'First-time raise at a high-scrutiny stage, with no guidance',
    condition: (c) => c.stage.recommendedStage >= 2 && (c.answers['E1'] ?? 0) === 0 && (c.answers['E2'] ?? 0) <= 1,
    statement: 'This would be a first-time fundraise at a stage where investor scrutiny is highest, with no one currently guiding the process. This is the single highest-risk combination this assessment measures.',
  },
  {
    id: 'cold_outreach_late_stage',
    type: 'red',
    title: 'Cold-outreach-only at a stage that needs warm intros',
    condition: (c) => c.stage.recommendedStage >= 2 && (c.answers['O2'] ?? 0) <= 1,
    statement: 'At this stage, later-stage investors overwhelmingly fund through warm introductions. A cold-outreach-only strategy here will likely produce a very low response rate relative to the effort spent.',
  },
  {
    id: 'positioning_mismatch',
    type: 'red',
    title: 'Inconsistent stage signals',
    condition: (c) => c.stage.positioningMismatch,
    statement: 'The signals about your stage disagree with each other — for example, team size or prior funding points to a different stage than revenue does. Worth clarifying your own positioning before an investor does it for you in a meeting.',
  },
  {
    id: 'well_prepared',
    type: 'green',
    title: 'Materials and process are genuinely investor-ready',
    condition: (c) => c.categories.diligence >= 7 && c.categories.ask >= 7 && (c.answers['P1'] ?? 0) >= 7,
    statement: 'Diligence materials, the ask itself, and the process timeline are all in strong shape. The remaining priority is getting the researched list in front of the right people, not more internal preparation.',
  },
  {
    id: 'strong_targeting',
    type: 'green',
    title: 'Outreach approach mirrors what statistically works',
    condition: (c) => (c.answers['O2'] ?? 0) >= 7 && (c.answers['O1'] ?? 0) >= 7 && (c.answers['O3'] ?? 0) >= 7,
    statement: 'A warm-introduction-heavy strategy aimed at a well-researched, stage-and-sector-matched list is the combination most associated with a raise actually closing.',
  },
  {
    id: 'real_cushion',
    type: 'green',
    title: 'Runway and a fallback plan remove urgency from the negotiation',
    condition: (c) => (c.answers['E3'] ?? 0) >= 7 && (c.answers['P2'] ?? 0) >= 7,
    statement: "There's real room here — sufficient runway plus a worked-out fallback plan mean this raise doesn't have to be rushed, which typically leads to better terms.",
  },
];

export function evaluateFlags(ctx: FlagContext): Flag[] {
  return FLAG_RULES.filter((r) => r.condition(ctx)).map((r) => ({ type: r.type, title: r.title, statement: r.statement }));
}

// =====================================================
// 6. COMPLETE REPORT
// =====================================================

export type FundraisingReport = {
  categoryScores: Record<Category, number>;
  overallReadiness: number;
  readinessBand: string;
  stage: StageAssessment;
  likelihood: LikelihoodAssessment;
  flags: Flag[];
  investorTypes: string[];
  outreachNote: string;
};

export function generateReport(answers: Record<string, AnswerValue>): FundraisingReport {
  const categoryScores = scoreAllCategories(answers);
  const overallReadiness = calculateOverallReadiness(categoryScores);
  const stage = assessStage(answers);
  const likelihood = calculateLikelihood(overallReadiness, stage, answers);
  const flags = evaluateFlags({ answers, categories: categoryScores, stage });

  return {
    categoryScores,
    overallReadiness,
    readinessBand: readinessBand(overallReadiness),
    stage,
    likelihood,
    flags,
    investorTypes: STAGE_INVESTOR_TYPES[stage.recommendedStage],
    outreachNote: STAGE_OUTREACH_NOTE[stage.recommendedStage],
  };
}

export function hasCompleteAnswers(answers: Record<string, number>): boolean {
  return QUESTIONS.every((q) => answers[q.id] !== undefined);
}
