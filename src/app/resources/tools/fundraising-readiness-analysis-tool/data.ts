// data.ts — curated dataset. ALL entries are UNVERIFIED samples: verify cheque sizes, eligibility, links before real use.
// Money in ₹ Lakhs. stage: 0 Idea,1 Pre-seed,2 Seed,3 Pre-A
export type Source = { name: string; cat: string; dil: boolean; smin: number; smax: number; cmin: number; cmax: number; sec: string[] | 'any'; geo: 'all' | string[]; dpiit?: boolean; women?: boolean; minMrr?: number; effort: number; p: number; how: string };
export const OVERLOOK_STAT = ''; // fill after research, e.g. '70%'. Rendered only if set.
const S = (name: string, cat: string, dil: boolean, smin: number, smax: number, cmin: number, cmax: number, effort: number, p: number, how: string, x: Partial<Source> = {}): Source => ({ name, cat, dil, smin, smax, cmin, cmax, sec: 'any', geo: 'all', effort, p, how, ...x });
export const SOURCES: Source[] = [
  S('Startup India Seed Fund Scheme (via incubators)', 'Central govt scheme', false, 0, 2, 5, 50, 3, 0.25, 'Apply through an SISFS-approved incubator; needs DPIIT recognition.', { dpiit: true }),
  S('Fund of Funds for Startups (via SEBI AIFs)', 'Central govt scheme', true, 2, 3, 100, 1000, 4, 0.1, 'Indirect: pitch AIFs that draw on FFS. Ask funds if they are FFS-backed.'),
  S('DPIIT recognition benefits (tax, IPR rebates)', 'Central govt scheme', false, 0, 3, 1, 5, 1, 0.8, 'Register on startupindia.gov.in.'),
  S('CGTMSE collateral-free loan guarantee', 'Bank & credit', false, 1, 3, 10, 200, 3, 0.3, 'Approach banks/NBFCs that lend under CGTMSE.', { minMrr: 0.5 }),
  S('MUDRA / Stand-Up India loans', 'Bank & credit', false, 0, 2, 2, 50, 3, 0.3, 'Apply via a public sector bank branch.'),
  S('BIRAC BIG grant', 'Sector govt programme', false, 0, 2, 30, 100, 5, 0.1, 'Watch BIRAC calls.', { sec: ['Healthtech/Biotech', 'Agritech'] }),
  S('MeitY TIDE 2.0 / DST NIDHI', 'Sector govt programme', false, 0, 2, 10, 50, 4, 0.15, 'Via a recognised TBI / incubator.', { sec: ['SaaS/Software', 'Deeptech', 'Healthtech/Biotech', 'Fintech'] }),
  S('iDEX (defence innovation)', 'Sector govt programme', false, 1, 3, 50, 150, 5, 0.1, 'Respond to iDEX challenges.', { sec: ['Deeptech', 'Hardware'] }),
  S('State startup seed programmes', 'State programme', false, 0, 2, 5, 30, 3, 0.25, 'Check your state startup mission portal.', { geo: ['Karnataka', 'Kerala', 'Gujarat', 'Telangana', 'Tamil Nadu', 'Maharashtra', 'Uttar Pradesh', 'Rajasthan'] }),
  S('Women Entrepreneurship Platform schemes', 'Central govt scheme', false, 0, 2, 2, 25, 2, 0.3, 'NITI Aayog WEP portal.', { women: true }),
  S('University / IIT / IIM incubators', 'Incubator', true, 0, 2, 5, 50, 3, 0.35, 'Apply to nearest institutional incubator.'),
  S('Y Combinator', 'Accelerator', true, 1, 2, 400, 40000, 5, 0.02, 'Apply online; strong traction helps.'),
  S('Antler India / 100X.VC style programmes', 'Accelerator', true, 0, 1, 20, 250, 4, 0.1, 'Apply to cohort programmes.'),
  S('Global cloud credits programmes (AWS/GCP/Azure)', 'Credits', false, 0, 3, 5, 100, 1, 0.7, 'Apply for startup credits.'),
  S('Startup competitions & fellowships', 'Grants & competitions', false, 0, 2, 1, 25, 2, 0.2, 'Track national/state pitch competitions.'),
  S('CSR-linked innovation funds', 'Grants & competitions', false, 0, 2, 5, 50, 4, 0.1, 'Sector: impact, education, health, climate.', { sec: ['Edtech', 'Healthtech/Biotech', 'Climate/Energy', 'Agritech'] }),
  S('Angel networks (city / national)', 'Angel network', true, 1, 2, 25, 150, 3, 0.15, 'Apply to network pitch cycles; ask for warm intro.'),
  S('Operator angels / founder-angels', 'Individual angels', true, 1, 2, 5, 50, 3, 0.15, 'Warm intros via founders in your space.'),
  S('Pre-seed / seed micro-VCs', 'Seed VC', true, 1, 2, 100, 500, 4, 0.08, 'Match thesis; warm intro strongly preferred.'),
  S('Sector-thesis funds', 'Sector fund', true, 1, 3, 100, 800, 4, 0.08, 'Research funds investing in your sector.', { sec: ['SaaS/Software', 'Fintech', 'Consumer', 'Healthtech/Biotech', 'Climate/Energy', 'Deeptech', 'Agritech'] }),
  S('Pre-Series A VCs', 'Pre-A VC', true, 2, 3, 500, 2500, 4, 0.07, 'Needs metrics; warm intro from portfolio founder.', { minMrr: 5 }),
  S('Family offices / HNI networks', 'Family office', true, 1, 3, 50, 500, 4, 0.1, 'Via CAs, bankers, HNI syndicates.'),
  S('Corporate venture / pilot programmes', 'Corporate', true, 1, 3, 25, 500, 4, 0.08, 'Pitch a pilot with a corporate first.'),
  S('Revenue-based financing / venture debt', 'RBF & debt', false, 2, 3, 25, 500, 3, 0.35, 'Needs steady revenue.', { minMrr: 3 }),
];
export const AREAS = ['Problem & Market', 'Customer Proof', 'Unit Economics', 'Competition & Moat', 'Team & Execution', 'Go-to-Market', 'Financials & Use of Funds', 'Valuation & Terms', 'Legal & Cap Table'];
export const W = [[5,4,3,3],[1,3,5,5],[1,2,4,5],[3,3,3,4],[5,5,4,4],[2,3,4,5],[1,2,3,4],[1,2,3,3],[2,3,4,5]];
export const OBJ_Q: string[] = [
  'I can explain why this problem is urgent now', 'I have a bottoms-up market size (not top-down %)',
  'I can show customers who pay or committed in writing', 'I know why customers choose us and stay',
  'I know CAC, payback and contribution margin', 'Gross margin holds as we scale',
  'I can name 3 competitors and why we win', 'We have a defensible edge beyond speed',
  'Team has done this or something adjacent before', 'Key roles are covered or hires are planned',
  'I have a repeatable channel with measured results', 'I know how sales scale beyond founders',
  'Use of funds is line-by-line and milestone-tied', 'Financial model reconciles to actuals',
  'I can justify the valuation with comparables', 'I understand terms: SAFE/CCPS, pool, liquidation pref.',
  'Cap table, incorporation and contracts are clean', 'IP, compliance and licences are in order',
];
export const LIB: { q: string; test: string; skel: string; proof: string }[] = [
  { q: 'Why is this a big problem, and why now?', test: 'Timing and market pull', skel: 'Shift that changed → who is hurt → how much it costs them', proof: 'Data point / customer quote' },
  { q: 'Who is paying you and why do they stay?', test: 'Quality of traction', skel: 'Customer type → what they pay → retention/repeat proof', proof: 'Invoices, cohort table' },
  { q: 'Walk me through unit economics.', test: 'Whether growth is profitable', skel: 'Price → cost to serve → CAC → payback months', proof: 'One-page unit economics' },
  { q: 'What stops a bigger player copying you?', test: 'Moat', skel: 'Advantage → why it compounds → evidence', proof: 'Data/IP/contracts' },
  { q: 'Why are you the team to win this?', test: 'Founder-market fit', skel: 'Relevant experience → unfair insight → gaps and hiring plan', proof: 'Track record, references' },
  { q: 'How does growth scale beyond you?', test: 'Repeatable GTM', skel: 'Channel → conversion numbers → how it scales', proof: 'Funnel metrics' },
  { q: 'How did you arrive at this raise amount?', test: 'Planning discipline', skel: 'Hires+spend → runway → milestone → buffer', proof: 'Use-of-funds sheet' },
  { q: 'Why this valuation?', test: 'Expectation realism', skel: 'Dilution target → comparables → what it implies', proof: 'Comparable list' },
  { q: 'Is your cap table and legal house clean?', test: 'Diligence risk', skel: 'Who owns what → docs in place → pending items', proof: 'Cap table, founder agreements' },
];
export const DILIGENCE = ['Cap table', 'Financial model', 'Legal docs', 'Metrics dashboard', 'Pitch deck', 'Customer references', 'IP / contracts', 'Data-room folder'];
export const DW = [15, 15, 15, 15, 10, 10, 10, 10];
export const SECTORS = ['SaaS/Software', 'Fintech', 'Consumer', 'Healthtech/Biotech', 'Edtech', 'Agritech', 'Climate/Energy', 'Deeptech', 'Hardware', 'Marketplace', 'Other'];
export const STATES = ['Karnataka', 'Maharashtra', 'Delhi NCR', 'Tamil Nadu', 'Telangana', 'Gujarat', 'Kerala', 'Uttar Pradesh', 'Rajasthan', 'Other'];
