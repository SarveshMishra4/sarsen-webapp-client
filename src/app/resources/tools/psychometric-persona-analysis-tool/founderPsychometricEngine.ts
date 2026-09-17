// =====================================================
// founderPsychometricEngine.ts
//
// SARSEN FOUNDER & FOUNDING-TEAM PSYCHOMETRIC ENGINE
//
// WHO THIS IS FOR
// -----------------------------------------------------
// This is not a general employee-screening or shop-floor aptitude test.
// It's built for people who make discretionary, judgment-based decisions
// in an early-stage business — founders, co-founders, and the first ring
// of functional leads (the person who will own product, sales, finance,
// or operations). The questions assume the respondent has real latitude
// over how they spend their time and what they decide, which is why every
// item is phrased around judgment, ownership, and trade-offs rather than
// task compliance.
//
// METHODOLOGY NOTES
// -----------------------------------------------------
// This borrows structural ideas from established, credible psychometric
// traditions rather than inventing a new one from scratch:
//   - Trait model: each construct is measured by more than one item so a
//     single misread question can't swing the result (standard practice
//     in Big-Five-style instruments and in Bridgewater/PrinciplesYou-style
//     self-assessments).
//   - Reverse-keyed items: roughly a third of items are worded so that
//     agreement means LOW on the trait, not high. This catches acquiescence
//     bias (people who just agree with everything) without the person
//     noticing which items are "the same question asked backwards" —
//     they're deliberately not mirror-image phrasings of each other.
//   - A contextual/behavioural restatement: a third item per construct
//     asks about actual past behaviour rather than self-perception, placed
//     well away from the other two in the running order. Large gaps
//     between how someone rates their tendency and what they report
//     actually doing are a known, credible signal of inflated self-report.
//   - A short social-desirability (impression-management) pair, modelled
//     on the logic of lie scales used in established personality
//     inventories: near-universal, absolute claims ("I have never...",
//     "I always...") that a genuinely honest respondent will rarely fully
//     endorse. High agreement flags the result set for cautious reading,
//     not disqualification.
// None of this claims clinical or academic validation. It is a
// structured, harder-to-game self-report instrument for a specific
// commercial purpose: matching a founding team's real decision-making
// tendencies to the responsibilities being handed to them.
// =====================================================

// =====================================================
// 1. CONSTRUCTS
// =====================================================

export type ConstructKey =
  | 'RT' // Risk Tolerance
  | 'AT' // Ambiguity Tolerance
  | 'LC' // Internal Locus of Control
  | 'AD' // Achievement Drive
  | 'GR' // Grit / Resilience
  | 'AU' // Autonomy Preference
  | 'CO' // Conscientiousness / Structure
  | 'IT' // Interpersonal Trust & Collaboration
  | 'ER' // Emotional Regulation Under Pressure
  | 'IN'; // Integrity / Rule Orientation

export const CONSTRUCTS: ConstructKey[] = ['RT', 'AT', 'LC', 'AD', 'GR', 'AU', 'CO', 'IT', 'ER', 'IN'];

type ConstructMeta = {
  label: string;
  highDescription: string; // what it means to score high
  lowDescription: string; // what it means to score low
};

export const CONSTRUCT_META: Record<ConstructKey, ConstructMeta> = {
  RT: {
    label: 'Risk Tolerance',
    highDescription: 'Comfortable committing real resources to a bet before every uncertainty is resolved.',
    lowDescription: 'Prefers to remove uncertainty before committing resources — a natural brake on impulsive bets.',
  },
  AT: {
    label: 'Ambiguity Tolerance',
    highDescription: 'Does clear-headed work even when the goal is defined but the path to it is not.',
    lowDescription: 'Performs best once a path or precedent exists — undefined problems slow this person down.',
  },
  LC: {
    label: 'Internal Locus of Control',
    highDescription: 'Attributes outcomes, good and bad, to decisions and actions rather than circumstance.',
    lowDescription: 'Tends to explain outcomes by external conditions — can under-own controllable failures.',
  },
  AD: {
    label: 'Achievement Drive',
    highDescription: 'Sets personal targets above what is actually asked, and tracks against them.',
    lowDescription: 'Content once stated expectations are met — reliable, but rarely self-driven to exceed them.',
  },
  GR: {
    label: 'Grit / Resilience',
    highDescription: 'Responds to a failed plan by fixing and continuing, sustaining effort over long horizons.',
    lowDescription: 'Needs a real reset — new direction or a break — after a serious setback before pushing again.',
  },
  AU: {
    label: 'Autonomy Preference',
    highDescription: 'Does best work with wide latitude and minimal oversight on how the work gets done.',
    lowDescription: 'Performs more effectively with regular check-ins and senior involvement in the how, not just the what.',
  },
  CO: {
    label: 'Conscientiousness / Structure',
    highDescription: 'Tracks commitments deliberately; plans steps before starting; little slips through the cracks.',
    lowDescription: 'Works more improvisationally — commitments and deadlines are more likely to be caught late.',
  },
  IT: {
    label: 'Interpersonal Trust & Collaboration',
    highDescription: 'Brings others into decisions early and is genuinely movable by a better argument.',
    lowDescription: 'Trusts personal judgment over group input — fast to decide, more prone to isolated blind spots.',
  },
  ER: {
    label: 'Emotional Regulation Under Pressure',
    highDescription: 'Gets calmer and more focused, not less, when several things go wrong at once.',
    lowDescription: 'Needs time to regain clarity after multiple simultaneous setbacks — pressure is genuinely costly.',
  },
  IN: {
    label: 'Integrity / Rule Orientation',
    highDescription: 'Holds to commitments and will walk away from an opportunity that does not sit right.',
    lowDescription: 'Treats rules and prior commitments as negotiable in service of a better outcome — pragmatic, but riskier to lean on for governance.',
  },
};

// =====================================================
// 2. THE 32-ITEM QUESTION BANK
// =====================================================
// Likert scale, 1 (Strongly Disagree) to 5 (Strongly Agree).
// keyed 'direct'  -> agreement means HIGH on the construct
// keyed 'reverse' -> agreement means LOW on the construct
// variant 'D' (self-perception), 'R' (reverse self-perception),
// 'C' (behavioural/contextual restatement, used for the consistency check)

export type Keyed = 'direct' | 'reverse';
export type Variant = 'D' | 'R' | 'C';

export type Question = {
  id: string;
  construct: ConstructKey | 'SD';
  keyed: Keyed;
  variant: Variant | 'SD';
  text: string;
};

const POOL: Record<string, Question> = {
  RT_D: { id: 'RT_D', construct: 'RT', keyed: 'direct', variant: 'D', text: "Given a choice, I lean toward the option with higher upside even if it carries a real risk of failure." },
  RT_R: { id: 'RT_R', construct: 'RT', keyed: 'reverse', variant: 'R', text: "I feel uneasy moving forward on something big until most of the uncertainty around it has been removed." },
  RT_C: { id: 'RT_C', construct: 'RT', keyed: 'direct', variant: 'C', text: "In the last year, I've made at least one major decision that most people around me privately thought was too risky." },

  AT_D: { id: 'AT_D', construct: 'AT', keyed: 'direct', variant: 'D', text: "I do my best work when the goal is clear but the path to get there is still undefined." },
  AT_R: { id: 'AT_R', construct: 'AT', keyed: 'reverse', variant: 'R', text: "I find it hard to make real progress until someone has laid out a clear, step-by-step plan." },
  AT_C: { id: 'AT_C', construct: 'AT', keyed: 'direct', variant: 'C', text: "When a project I'm running has no precedent to copy from, I get energised by it rather than anxious." },

  LC_D: { id: 'LC_D', construct: 'LC', keyed: 'direct', variant: 'D', text: "When something goes wrong on my watch, my first instinct is to ask what I could have done differently." },
  LC_R: { id: 'LC_R', construct: 'LC', keyed: 'reverse', variant: 'R', text: "More often than not, the outcome of my efforts depends on factors outside my control." },
  LC_C: { id: 'LC_C', construct: 'LC', keyed: 'direct', variant: 'C', text: "Looking back at my biggest setback, I can point to specific things I did that contributed to it." },

  AD_D: { id: 'AD_D', construct: 'AD', keyed: 'direct', variant: 'D', text: "I set targets for myself that are higher than what anyone else actually expects of me." },
  AD_R: { id: 'AD_R', construct: 'AD', keyed: 'reverse', variant: 'R', text: "I'm generally satisfied once I've met what was actually asked of me." },
  AD_C: { id: 'AD_C', construct: 'AD', keyed: 'direct', variant: 'C', text: "I regularly compare my current output against my own best previous work, not just against the deadline." },

  GR_D: { id: 'GR_D', construct: 'GR', keyed: 'direct', variant: 'D', text: "When a plan fails, my instinct is to fix it and keep going, not to look for a different plan." },
  GR_R: { id: 'GR_R', construct: 'GR', keyed: 'reverse', variant: 'R', text: "After a serious setback, I usually need a real reset — a new direction or a break — before I can push forward again." },
  GR_C: { id: 'GR_C', construct: 'GR', keyed: 'direct', variant: 'C', text: "I have stayed committed to a single goal for more than two years despite major obstacles along the way." },

  AU_D: { id: 'AU_D', construct: 'AU', keyed: 'direct', variant: 'D', text: "I do my best work when I'm largely left to decide how to get things done." },
  AU_R: { id: 'AU_R', construct: 'AU', keyed: 'reverse', variant: 'R', text: "I work more effectively when someone senior checks in on my progress regularly." },
  AU_C: { id: 'AU_C', construct: 'AU', keyed: 'direct', variant: 'C', text: "Given a choice between higher pay with close oversight and lower pay with full independence, I'd lean toward independence." },

  CO_D: { id: 'CO_D', construct: 'CO', keyed: 'direct', variant: 'D', text: "I keep track of my commitments carefully enough that very little slips through the cracks." },
  CO_R: { id: 'CO_R', construct: 'CO', keyed: 'reverse', variant: 'R', text: "I sometimes only realise I've missed a deadline after someone else points it out." },
  CO_C: { id: 'CO_C', construct: 'CO', keyed: 'direct', variant: 'C', text: "Before I start something significant, I typically write the steps down rather than work them out as I go." },

  IT_D: { id: 'IT_D', construct: 'IT', keyed: 'direct', variant: 'D', text: "I'd rather bring people into a decision early, even if it slows things down, than decide alone and inform them later." },
  IT_R: { id: 'IT_R', construct: 'IT', keyed: 'reverse', variant: 'R', text: "When something needs to get done well, I trust my own judgement on it more than I trust a group's." },
  IT_C: { id: 'IT_C', construct: 'IT', keyed: 'direct', variant: 'C', text: "In my last few disagreements at work, I changed my position at least once because someone made a better argument." },

  ER_D: { id: 'ER_D', construct: 'ER', keyed: 'direct', variant: 'D', text: "In a high-stakes, high-pressure moment, I tend to get calmer and more focused, not less." },
  ER_R: { id: 'ER_R', construct: 'ER', keyed: 'reverse', variant: 'R', text: "When multiple things go wrong at once, it takes me a while to think clearly again." },
  ER_C: { id: 'ER_C', construct: 'ER', keyed: 'direct', variant: 'C', text: "The last time I received sharply critical feedback in front of others, I was able to respond constructively in the moment." },

  IN_D: { id: 'IN_D', construct: 'IN', keyed: 'direct', variant: 'D', text: "I hold to a commitment I made even after it becomes inconvenient to keep it." },
  IN_R: { id: 'IN_R', construct: 'IN', keyed: 'reverse', variant: 'R', text: "If a rule is clearly getting in the way of a good outcome, I'll set it aside without much hesitation." },
  IN_C: { id: 'IN_C', construct: 'IN', keyed: 'direct', variant: 'C', text: "I have walked away from a deal or opportunity because something about it didn't sit right, even though it would have cost me." },

  SD_1: { id: 'SD_1', construct: 'SD', keyed: 'direct', variant: 'SD', text: "I have never made a decision, personal or professional, that I later regretted." },
  SD_2: { id: 'SD_2', construct: 'SD', keyed: 'direct', variant: 'SD', text: "I always give every task my full effort, no matter how boring or unimportant it seems." },
};

// Hand-ordered so that: (a) no two items from the same construct are ever
// adjacent, (b) a construct's D / R / C variants sit roughly ten questions
// apart from each other, and (c) the two validity items are seeded in the
// first and second half rather than announced at the start or the end.
const QUESTION_ORDER: string[] = [
  'RT_D', 'AT_D', 'LC_D', 'AD_D', 'GR_D', 'SD_1', 'AU_D', 'CO_D', 'IT_D', 'ER_D',
  'IN_D', 'RT_R', 'AT_R', 'LC_R', 'AD_R', 'GR_R', 'AU_R', 'CO_R', 'SD_2', 'IT_R',
  'ER_R', 'IN_R', 'RT_C', 'AT_C', 'LC_C', 'AD_C', 'GR_C', 'AU_C', 'CO_C', 'IT_C',
  'ER_C', 'IN_C',
];

export const QUESTIONS: Question[] = QUESTION_ORDER.map((id) => POOL[id]);

export const LIKERT_OPTIONS: { value: number; label: string }[] = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neither' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

// =====================================================
// 3. BASIC SCORING
// =====================================================

export function clamp(value: number, minimum = 0, maximum = 10): number {
  return Math.max(minimum, Math.min(maximum, value));
}

// Maps a raw 1-5 answer, honouring reverse-keying, onto a 0-10 scale.
function itemScore(question: Question, rawValue: number): number {
  const keyedValue = question.keyed === 'reverse' ? 6 - rawValue : rawValue;
  return clamp((keyedValue - 1) * 2.5);
}

export type ConstructScore = {
  construct: ConstructKey;
  score: number; // 0-10, average of the three items
  spread: number; // max-min across the three items, 0-10 scale
  inconsistent: boolean; // spread >= threshold
  itemScores: { variant: Variant; value: number; score: number }[];
};

const INCONSISTENCY_THRESHOLD = 5; // out of a possible 10-point spread

export function scoreConstructs(answers: Record<string, number>): Record<ConstructKey, ConstructScore> {
  const result = {} as Record<ConstructKey, ConstructScore>;

  for (const construct of CONSTRUCTS) {
    const items = QUESTIONS.filter((q) => q.construct === construct);
    const itemScores = items.map((q) => ({
      variant: q.variant as Variant,
      value: answers[q.id] ?? 3,
      score: itemScore(q, answers[q.id] ?? 3),
    }));
    const scores = itemScores.map((i) => i.score);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const spread = Math.max(...scores) - Math.min(...scores);

    result[construct] = {
      construct,
      score: Math.round(avg * 100) / 100,
      spread: Math.round(spread * 100) / 100,
      inconsistent: spread >= INCONSISTENCY_THRESHOLD,
      itemScores,
    };
  }

  return result;
}

export type ValidityCheck = {
  reliabilityIndex: number; // 0-10, 10 = very internally consistent
  inconsistentConstructs: ConstructKey[];
  socialDesirabilityScore: number; // 0-10
  elevatedImpressionManagement: boolean;
};

export function assessValidity(
  answers: Record<string, number>,
  constructScores: Record<ConstructKey, ConstructScore>
): ValidityCheck {
  const spreads = CONSTRUCTS.map((c) => constructScores[c].spread);
  const avgSpread = spreads.reduce((a, b) => a + b, 0) / spreads.length;
  const reliabilityIndex = Math.round(clamp(10 - avgSpread) * 100) / 100;

  const inconsistentConstructs = CONSTRUCTS.filter((c) => constructScores[c].inconsistent);

  const sd1 = itemScore(POOL.SD_1, answers.SD_1 ?? 3);
  const sd2 = itemScore(POOL.SD_2, answers.SD_2 ?? 3);
  const socialDesirabilityScore = Math.round(((sd1 + sd2) / 2) * 100) / 100;

  return {
    reliabilityIndex,
    inconsistentConstructs,
    socialDesirabilityScore,
    elevatedImpressionManagement: socialDesirabilityScore >= 7.5,
  };
}

export function hasCompleteAnswers(answers: Record<string, number>): boolean {
  return QUESTIONS.every((q) => answers[q.id] !== undefined);
}

// =====================================================
// 4. ROLE FIT
// =====================================================

export type RoleKey = 'visionary_strategist' | 'operator_builder' | 'growth_closer' | 'guardian_finance_risk' | 'people_culture';

type RoleWeight = { construct: ConstructKey; weight: number; invert?: boolean };

type RoleMeta = {
  label: string;
  oneLiner: string;
  idealResponsibilities: string[];
  watchOuts: string[];
  weights: RoleWeight[];
};

export const ROLE_META: Record<RoleKey, RoleMeta> = {
  visionary_strategist: {
    label: 'Visionary / Strategy Lead',
    oneLiner: 'Sets direction under real uncertainty and is comfortable being wrong on the way to being right.',
    idealResponsibilities: ['Product & company vision', 'Fundraising narrative', 'New-market or new-line decisions', 'Setting the next 6–18 month bet'],
    watchOuts: ['Needs an operator alongside them to keep the plan grounded in delivery.', 'Left unchecked, may under-invest in the process and controls that make growth durable.'],
    weights: [
      { construct: 'RT', weight: 2.5 },
      { construct: 'AT', weight: 3 },
      { construct: 'AD', weight: 2 },
      { construct: 'AU', weight: 1.5 },
    ],
  },
  operator_builder: {
    label: 'Operator / Execution Lead',
    oneLiner: 'Converts a plan into a running system and keeps it running when nobody is watching.',
    idealResponsibilities: ['Delivery & operations', 'Process and systems design', 'Hitting near-term milestones', 'Turning a strategy into a weekly plan'],
    watchOuts: ['May default to the known, structured path even when the market is signalling a pivot.', 'Can under-invest in the ambiguous, unglamorous work of finding the next bet.'],
    weights: [
      { construct: 'CO', weight: 3 },
      { construct: 'GR', weight: 2 },
      { construct: 'LC', weight: 2 },
      { construct: 'ER', weight: 1 },
    ],
  },
  growth_closer: {
    label: 'Growth & Sales Lead',
    oneLiner: 'Builds momentum with people outside the building and keeps composure when a deal wobbles.',
    idealResponsibilities: ['Sales & partnerships', 'Customer-facing negotiation', 'Go-to-market execution', 'Fundraising conversations with investors'],
    watchOuts: ['High achievement drive under pressure can tip into over-promising to close.', 'May need a second read on commitments before they become company policy.'],
    weights: [
      { construct: 'AD', weight: 2.5 },
      { construct: 'IT', weight: 2 },
      { construct: 'ER', weight: 2 },
      { construct: 'RT', weight: 1.5 },
    ],
  },
  guardian_finance_risk: {
    label: 'Guardian / Finance & Risk Lead',
    oneLiner: 'Is the person who slows a decision down long enough to ask what could go wrong.',
    idealResponsibilities: ['Financial controls & reporting', 'Legal, compliance, and contracts', 'Risk and cash-runway management', 'Sign-off on major commitments'],
    watchOuts: ['Can become a bottleneck on speed if given veto power over every decision, not just the risky ones.', 'Pair with a Visionary or Closer so caution and momentum stay in balance.'],
    weights: [
      { construct: 'IN', weight: 3 },
      { construct: 'CO', weight: 2 },
      { construct: 'LC', weight: 1.5 },
      { construct: 'RT', weight: 1, invert: true },
    ],
  },
  people_culture: {
    label: 'People & Culture Lead',
    oneLiner: 'Keeps the team decidable — surfaces disagreement early and holds the group together under strain.',
    idealResponsibilities: ['Hiring & team design', 'Internal communication and culture', 'Conflict resolution between co-founders or teams', 'Onboarding and retention'],
    watchOuts: ['Strong consensus-seeking can slow decisions that genuinely need one owner.', 'Needs enough independent authority to make calls, not just facilitate them.'],
    weights: [
      { construct: 'IT', weight: 3 },
      { construct: 'ER', weight: 2 },
      { construct: 'IN', weight: 1.5 },
      { construct: 'AU', weight: 1, invert: true },
    ],
  },
};

export type RoleFit = { role: RoleKey; score: number };

export function computeRoleFit(constructScores: Record<ConstructKey, ConstructScore>): RoleFit[] {
  const fits: RoleFit[] = (Object.keys(ROLE_META) as RoleKey[]).map((role) => {
    const { weights } = ROLE_META[role];
    let num = 0;
    let den = 0;
    for (const w of weights) {
      const raw = constructScores[w.construct].score;
      const v = w.invert ? 10 - raw : raw;
      num += v * w.weight;
      den += w.weight;
    }
    return { role, score: den === 0 ? 0 : Math.round((num / den) * 100) / 100 };
  });
  return fits.sort((a, b) => b.score - a.score);
}

// =====================================================
// 5. PATTERN INSIGHTS
// =====================================================
// Rules that fire on a COMBINATION of two constructs — this is where
// most of the practically useful signal lives, because a single trait
// score in isolation rarely tells a startup what to do with a person.

type PatternRule = {
  id: string;
  title: string;
  condition: (s: Record<ConstructKey, number>) => boolean;
  insight: string;
  action: string;
};

const PATTERN_RULES: PatternRule[] = [
  {
    id: 'fast_thin_followthrough',
    title: 'Fast-moving, thin follow-through',
    condition: (s) => s.RT >= 7 && s.CO <= 4,
    insight: "This person commits to bold moves readily but has not shown a strong pattern of tracking the details of a commitment through to the end.",
    action: 'Pair with a detail-oriented operator, or give them a lightweight tracking system rather than asking them to build one.',
  },
  {
    id: 'independent_lone_operator',
    title: 'Strong independent operator, decides alone by default',
    condition: (s) => s.AU >= 7 && s.IT <= 4,
    insight: 'Comfortable owning decisions without oversight, but may not naturally bring others in before deciding — even when the decision affects them.',
    action: 'Set an explicit norm for which decisions require input first, rather than relying on this person to ask.',
  },
  {
    id: 'driven_pressure_sensitive',
    title: 'Driven but pressure-sensitive',
    condition: (s) => s.AD >= 7 && s.ER <= 4,
    insight: 'Sets an ambitious bar for themselves, but multiple simultaneous setbacks appear to cost them real time to recover from.',
    action: 'Protect this person from being the single point of contact during a crisis moment; give them a partner for high-stress stretches.',
  },
  {
    id: 'natural_guardian',
    title: 'Natural governance instinct',
    condition: (s) => s.IN >= 7 && s.RT <= 4,
    insight: 'Holds firmly to commitments and rules, and is instinctively cautious about unresolved risk — a genuine counterweight to a founder who moves fast.',
    action: "Give this person real authority over financial controls or compliance sign-off, not just an advisory voice.",
  },
  {
    id: 'persistent_but_rigid',
    title: 'Persistent, but slow to change course',
    condition: (s) => s.GR >= 7 && s.AT <= 4,
    insight: 'Sticks with a goal through real obstacles, which is valuable — but may keep pushing the same plan even after the market has signalled it should change.',
    action: 'Build in a scheduled checkpoint where the plan itself, not just the effort behind it, is explicitly re-examined.',
  },
  {
    id: 'founder_resilience_profile',
    title: 'High-resilience founder profile',
    condition: (s) => s.LC >= 7 && s.AD >= 7 && s.GR >= 7,
    insight: 'Owns outcomes, sets a high personal bar, and sustains effort over long horizons — the combination most associated with staying the course through an early-stage business\'s hardest stretches.',
    action: 'This person can likely absorb the most ambiguous, highest-stakes problem in the business; make sure they are actually spending time there.',
  },
];

export type PatternInsight = { title: string; insight: string; action: string };

function matchPatterns(scores: Record<ConstructKey, number>): PatternInsight[] {
  return PATTERN_RULES.filter((r) => r.condition(scores)).map((r) => ({ title: r.title, insight: r.insight, action: r.action }));
}

// =====================================================
// 6. INDIVIDUAL REPORT
// =====================================================

export type IndividualReport = {
  name: string;
  constructScores: Record<ConstructKey, ConstructScore>;
  validity: ValidityCheck;
  roleFit: RoleFit[];
  topStrengths: ConstructKey[];
  blindSpots: ConstructKey[];
  patternInsights: PatternInsight[];
  overallSummary: string;
};

export function generateIndividualReport(name: string, answers: Record<string, number>): IndividualReport {
  const constructScores = scoreConstructs(answers);
  const validity = assessValidity(answers, constructScores);
  const roleFit = computeRoleFit(constructScores);

  const ranked = [...CONSTRUCTS].sort((a, b) => constructScores[b].score - constructScores[a].score);
  const topStrengths = ranked.slice(0, 3);
  const blindSpots = [...ranked].reverse().slice(0, 2);

  const scoresOnly = Object.fromEntries(CONSTRUCTS.map((c) => [c, constructScores[c].score])) as Record<ConstructKey, number>;
  const patternInsights = matchPatterns(scoresOnly);

  const topRole = ROLE_META[roleFit[0].role];
  let overallSummary = `${name || 'This person'}'s strongest natural fit is ${topRole.label} — ${topRole.oneLiner}`;
  if (validity.elevatedImpressionManagement) {
    overallSummary += ' Two of the validity items came back with unusually absolute agreement, so read the scores here as a starting conversation, not a final verdict — consider a follow-up conversation to sanity-check the results.';
  } else if (validity.reliabilityIndex < 6) {
    overallSummary += ' Answers to related statements varied more than expected in a few areas, which can mean genuinely mixed tendencies or a rushed pass through the test — worth a short follow-up conversation on the flagged traits before treating the results as final.';
  }

  return { name, constructScores, validity, roleFit, topStrengths, blindSpots, patternInsights, overallSummary };
}

// =====================================================
// 7. TEAM REPORT
// =====================================================

export type TeamMemberSnapshot = { name: string; topRole: RoleKey; topRoleScore: number; reliabilityIndex: number };

export type TeamReport = {
  members: TeamMemberSnapshot[];
  roleLeaders: { role: RoleKey; leader: string | null; score: number | null }[];
  coverageGaps: RoleKey[];
  overlaps: { role: RoleKey; names: string[] }[];
  lowReliabilityMembers: string[];
  narrative: string[];
};

const GAP_THRESHOLD = 6; // no one clears this on a role -> flag as a coverage gap
const OVERLAP_MIN = 3; // this many people ranking the same role #1 -> flag as overlap

export function generateTeamReport(participants: { name: string; answers: Record<string, number> }[]): TeamReport {
  const reports = participants.map((p) => ({ name: p.name, report: generateIndividualReport(p.name, p.answers) }));

  const members: TeamMemberSnapshot[] = reports.map(({ name, report }) => ({
    name,
    topRole: report.roleFit[0].role,
    topRoleScore: report.roleFit[0].score,
    reliabilityIndex: report.validity.reliabilityIndex,
  }));

  const roleKeys = Object.keys(ROLE_META) as RoleKey[];

  const roleLeaders = roleKeys.map((role) => {
    let best: { name: string; score: number } | null = null;
    for (const { name, report } of reports) {
      const fit = report.roleFit.find((f) => f.role === role)!;
      if (!best || fit.score > best.score) best = { name, score: fit.score };
    }
    return { role, leader: best?.name ?? null, score: best?.score ?? null };
  });

  const coverageGaps = roleKeys.filter((role) => {
    const leader = roleLeaders.find((r) => r.role === role);
    return !leader || leader.score === null || leader.score < GAP_THRESHOLD;
  });

  const overlaps = roleKeys
    .map((role) => ({ role, names: members.filter((m) => m.topRole === role).map((m) => m.name) }))
    .filter((o) => o.names.length >= OVERLAP_MIN);

  const lowReliabilityMembers = members.filter((m) => m.reliabilityIndex < 6).map((m) => m.name);

  const narrative: string[] = [];

  if (coverageGaps.length > 0) {
    narrative.push(
      `No one on this roster clears a strong score on: ${coverageGaps.map((g) => ROLE_META[g].label).join(', ')}. ` +
      `That doesn't mean the work won't get done — it means it's being done by someone without a natural pull toward it, which is where it tends to slip first.`
    );
  } else {
    narrative.push('Every core role has at least one person who scores strongly on it — a well-covered founding team on paper.');
  }

  if (overlaps.length > 0) {
    for (const o of overlaps) {
      narrative.push(
        `${o.names.length} people (${o.names.join(', ')}) all show ${ROLE_META[o.role].label} as their strongest natural fit. ` +
        `That's redundancy in one direction and a likely gap somewhere else — worth checking who is actually covering the other roles day-to-day.`
      );
    }
  }

  if (lowReliabilityMembers.length > 0) {
    narrative.push(
      `${lowReliabilityMembers.join(', ')} had lower-than-typical consistency across related statements. Worth a short, informal follow-up conversation before leaning heavily on their results for a hiring or role decision.`
    );
  }

  return { members, roleLeaders, coverageGaps, overlaps, lowReliabilityMembers, narrative };
}
