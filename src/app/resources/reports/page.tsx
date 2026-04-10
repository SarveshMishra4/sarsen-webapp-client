'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  FC,
  MouseEvent,
  FormEvent,
  ChangeEvent,
} from 'react';

// =====================================================
// TYPE DEFINITIONS
// =====================================================

interface Report {
  id: number;
  title: string;
  excerpt: string;
  tag: string;
  pages: string;
  date: string;
  year: number;
  sector: string;
  featured?: boolean;
}

interface CaseStudyTeaser {
  title: string;
  tag: string;
  sector: string;
  outcome: string;
  year: string;
}

interface BlogTeaser {
  title: string;
  tag: string;
  readTime: string;
  date: string;
}

interface ModalState {
  open: boolean;
  title: string;
}

interface PartnerFormData {
  partnerId: string;
  password: string;
}

// =====================================================
// REPORTS DATA — 75 reports, loaded 25 at a time
// =====================================================

const ALL_REPORTS: Report[] = [
  // ... (data unchanged – same as original)
  // Batch 1 (1–25)
  {
    id: 1,
    title: 'Indian Startup Ecosystem Report 2026',
    excerpt: 'Our most comprehensive annual publication. Covers funding trends across all stages, sector-wise growth patterns, tier-2 city emergence, founder demographics, and the structural shifts defining India\'s entrepreneurial decade.',
    tag: 'Annual Report', pages: '142 pages', date: 'Year 2026', year: 2026, sector: 'Cross-Sector', featured: true,
  },
  {
    id: 2,
    title: 'State of B2B SaaS in India — 2025 Review',
    excerpt: 'Benchmarks across ARR growth, net revenue retention, CAC payback, and team efficiency ratios for Indian B2B SaaS companies at seed through Series B. Includes 200+ company dataset with cohort comparisons.',
    tag: 'Sector Report', pages: '68 pages', date: 'Year 2025', year: 2025, sector: 'B2B SaaS',
  },
  {
    id: 3,
    title: 'Founder Mental Models: A Survey of 200 Indian Founders',
    excerpt: 'How founders make decisions under uncertainty, which frameworks they rely on, where they get systematically stuck, and what distinguishes the decision quality of founders who navigated difficult transitions successfully.',
    tag: 'Research', pages: '54 pages', date: 'Year 2025', year: 2025, sector: 'Cross-Sector',
  },
  {
    id: 4,
    title: 'Seed Funding Landscape: H2 2025 Digest',
    excerpt: 'Deal flow analysis for seed rounds in India during H2 2025. Sector distribution, cheque size evolution, investor activity patterns, and the structural differences between rounds that closed and those that stalled.',
    tag: 'Digest', pages: '32 pages', date: 'Year 2026', year: 2026, sector: 'Fundraising',
  },
  {
    id: 5,
    title: 'Unit Economics Benchmarks by Sector 2025',
    excerpt: 'CAC, LTV, payback period, and gross margin norms across 12 startup categories in India. Includes distribution curves, not just averages — so founders can understand where they actually stand relative to peers.',
    tag: 'Benchmarks', pages: '48 pages', date: 'Year 2025', year: 2025, sector: 'Cross-Sector',
  },
  {
    id: 6,
    title: 'The Operational Maturity Index — Indian Startups 2025',
    excerpt: 'A scored framework assessing how founders build systems, delegate, and create accountability as they scale from 10 to 100 people. Identifies the five most common operational failure modes and what distinguishes high-maturity teams.',
    tag: 'Index', pages: '60 pages', date: 'Year 2025', year: 2025, sector: 'Operations',
  },
  {
    id: 7,
    title: 'D2C Brand Profitability Report 2025',
    excerpt: 'Margin structures, blended CAC trends, LTV curves, and post-funding realities for direct-to-consumer brands in India. Analyses which D2C models are structurally profitable and which are growth-at-all-costs plays in disguise.',
    tag: 'Sector Report', pages: '44 pages', date: 'Year 2025', year: 2025, sector: 'D2C',
  },
  {
    id: 8,
    title: 'Capital Efficiency in Indian Startups — 5 Year Longitudinal Study',
    excerpt: 'How efficiently Indian startups convert external capital into durable, defensible value over a five-year window. Tracks 300 companies from seed through Series B, measuring capital efficiency ratios across sectors and vintages.',
    tag: 'Longitudinal', pages: '88 pages', date: 'Year 2025', year: 2025, sector: 'Cross-Sector',
  },
  {
    id: 9,
    title: 'The Fundability Framework — Investor Expectation Report',
    excerpt: 'What seed and Series A investors in India are actually evaluating — in their own words. Based on 200+ structured investor interviews. Covers business model requirements, team assessment, and the metrics that create fundable narratives.',
    tag: 'Framework', pages: '52 pages', date: 'Year 2025', year: 2025, sector: 'Fundraising',
  },
  {
    id: 10,
    title: 'Tier-2 Startup Hubs: Emerging Opportunity Report',
    excerpt: 'Deep dives into five emerging startup cities — Jaipur, Indore, Kochi, Ahmedabad, and Chandigarh. Covers talent availability, infrastructure maturity, investor access, cost structures, and sector-specific opportunity assessment.',
    tag: 'Emerging Markets', pages: '76 pages', date: 'Year 2025', year: 2025, sector: 'Cross-Sector',
  },
  {
    id: 11,
    title: 'Pricing Architecture in Indian SaaS — A Deep Dive',
    excerpt: 'How Indian SaaS companies price across segments, channels, and geographies. Identifies pricing pattern clusters, analyses which models correlate with higher NRR, and documents the most common pricing mistakes at each growth stage.',
    tag: 'Deep Dive', pages: '56 pages', date: 'Year 2025', year: 2025, sector: 'B2B SaaS',
  },
  {
    id: 12,
    title: 'Healthtech in India: Where Value Is Actually Being Created',
    excerpt: 'A sector map of India\'s healthtech landscape — which subsectors are attracting capital, where exits have occurred, what the regulatory environment means for different business models, and which whitespaces remain genuinely open.',
    tag: 'Sector Report', pages: '62 pages', date: 'Year 2025', year: 2025, sector: 'Healthtech',
  },
  {
    id: 13,
    title: 'Founder Burnout and Performance: What the Data Shows',
    excerpt: 'A sensitive but necessary analysis. Survey data from 400 founders on stress indicators, performance degradation patterns, the decisions that suffer first, and what structural interventions actually improve outcomes.',
    tag: 'Research', pages: '38 pages', date: 'Year 2025', year: 2025, sector: 'Cross-Sector',
  },
  {
    id: 14,
    title: 'The Indian Series A: What It Actually Takes in 2025',
    excerpt: 'Structural analysis of 80 Indian Series A rounds closed in 2024. Covers median metrics at the time of closing, how metrics requirements have shifted since 2021, and the investor narrative patterns that appear across successful rounds.',
    tag: 'Fundraising', pages: '46 pages', date: 'Year 2025', year: 2025, sector: 'Fundraising',
  },
  {
    id: 15,
    title: 'Edtech After the Correction: 2024 State of the Sector',
    excerpt: 'Following the 2022–23 correction, this report analyses which edtech models survived, which are structurally viable at scale, where the remaining whitespace lies, and what the unit economics of durable edtech businesses look like.',
    tag: 'Sector Report', pages: '50 pages', date: 'Year 2024', year: 2024, sector: 'Edtech',
  },
  {
    id: 16,
    title: 'Fintech Regulation and Its Impact on Business Models',
    excerpt: 'How RBI, SEBI, and IRDAI regulatory changes over 2022–2024 reshaped the Indian fintech landscape. Documents which regulations created moats for incumbents, which opened new whitespace, and what compliance now costs early-stage companies.',
    tag: 'Regulatory', pages: '58 pages', date: 'Year 2024', year: 2024, sector: 'Fintech',
  },
  {
    id: 17,
    title: 'HR Tech in India — A Maturity and Opportunity Map',
    excerpt: 'India\'s HR technology landscape mapped by maturity, adoption depth, and whitespace. Identifies the 12 subsectors with the most credible growth trajectories and the unit economics that distinguish scalable models from feature companies.',
    tag: 'Sector Map', pages: '54 pages', date: 'Year 2024', year: 2024, sector: 'HRTech',
  },
  {
    id: 18,
    title: 'Revenue Architecture Patterns Across 150 Indian Startups',
    excerpt: 'A taxonomy of how Indian startups structure revenue — pricing models, contract types, expansion motions, and retention levers. Identifies seven distinct revenue architecture patterns and correlates them with growth and margin outcomes.',
    tag: 'Research', pages: '72 pages', date: 'Year 2024', year: 2024, sector: 'Cross-Sector',
  },
  {
    id: 19,
    title: 'The State of Bootstrapped Businesses in India 2024',
    excerpt: 'First-of-its-kind analysis of Indian companies that have scaled to ₹5Cr+ ARR without external capital. Covers their unit economics, growth patterns, challenges at scale, and whether they face structural ceilings that bootstrapping cannot solve.',
    tag: 'Research', pages: '42 pages', date: 'Year 2024', year: 2024, sector: 'Cross-Sector',
  },
  {
    id: 20,
    title: 'Climate Tech Funding in India — The Emerging Landscape',
    excerpt: 'A current-state analysis of climate technology investment in India. Maps funded companies, investor thesis patterns, regulatory tailwinds, and the segments attracting serious capital versus those with whitespace but no clear monetisation path.',
    tag: 'Sector Report', pages: '48 pages', date: 'Year 2024', year: 2024, sector: 'Climate Tech',
  },
  {
    id: 21,
    title: 'Indias Angel Investing Ecosystem — Depth and Distribution',
    excerpt: 'Mapping the angel investing landscape across 12 Indian cities. Analyses cheque size patterns, sector preferences, syndication behaviour, follow-on rates, and the structural differences between angel networks that create value and those that don\'t.',
    tag: 'Ecosystem', pages: '36 pages', date: 'Year 2024', year: 2024, sector: 'Fundraising',
  },
  {
    id: 22,
    title: 'Female Founders in India: Access, Capital, and Outcomes',
    excerpt: 'A data-driven analysis of female-founded startup outcomes in India — funding access gaps, sector distribution, performance benchmarks, and the structural conditions that correlate with better outcomes for women-led ventures.',
    tag: 'Research', pages: '52 pages', date: 'Year 2024', year: 2024, sector: 'Cross-Sector',
  },
  {
    id: 23,
    title: 'Logistics and Supply Chain Tech: A Sector Analysis',
    excerpt: 'India\'s logistics technology sector mapped in full. Covers B2B freight, last-mile delivery, warehousing tech, cold chain, and cross-border commerce — with unit economics benchmarks and investor activity analysis for each subsegment.',
    tag: 'Sector Report', pages: '64 pages', date: 'Year 2024', year: 2024, sector: 'Logistics',
  },
  {
    id: 24,
    title: 'Post-Series A Failure Modes: A Retrospective Analysis',
    excerpt: 'Analyses 40 Indian startups that raised Series A between 2018–2021 and subsequently failed or significantly underperformed. Identifies the six most common structural failure modes — with frequency data and preventability assessments.',
    tag: 'Research', pages: '58 pages', date: 'Year 2024', year: 2024, sector: 'Cross-Sector',
  },
  {
    id: 25,
    title: 'The Indian Consumer: Spending Behaviour Post-Pandemic',
    excerpt: 'Consumer spending pattern shifts across income segments, geographies, and categories — and how they have evolved through 2022–2024. Essential reading for any founder building a consumer-facing business in India.',
    tag: 'Consumer Research', pages: '66 pages', date: 'Year 2024', year: 2024, sector: 'Consumer',
  },

  // Batch 2 (26–50)
  {
    id: 26,
    title: 'Proptech in India: The Second Wave',
    excerpt: 'After the first proptech wave stalled on liquidity issues, a second generation of companies is addressing different parts of the stack. This report maps where they are, what\'s working, and where the structural opportunity remains.',
    tag: 'Sector Report', pages: '56 pages', date: 'Year 2024', year: 2024, sector: 'Proptech',
  },
  {
    id: 27,
    title: 'Indian Startup Ecosystem Report 2025',
    excerpt: 'The 2025 edition of our annual flagship report. Funding trends across all stages, sector-wise growth patterns, tier-2 city emergence, founder demographics, and the structural shifts that defined the year.',
    tag: 'Annual Report', pages: '138 pages', date: 'Year 2025', year: 2025, sector: 'Cross-Sector',
  },
  {
    id: 28,
    title: 'SaaS Churn in India — The Definitive Analysis',
    excerpt: 'Logo churn, revenue churn, and gross revenue retention benchmarks for Indian SaaS companies. Analyses churn by segment, ACV, product category, and company age — with a diagnostic framework for identifying churn root causes.',
    tag: 'Deep Dive', pages: '44 pages', date: 'Year 2023', year: 2023, sector: 'B2B SaaS',
  },
  {
    id: 29,
    title: 'The Funding Winter Was Real: What the Data Shows',
    excerpt: 'A rigorous look at what actually happened to Indian startup funding in 2022–2023. Which sectors were hit hardest, which continued to attract capital, what valuations reset looked like across stages, and what structural changes persist.',
    tag: 'Research', pages: '48 pages', date: 'Year 2023', year: 2023, sector: 'Fundraising',
  },
  {
    id: 30,
    title: 'Agritech in India — Persistent Challenges, Structural Opportunity',
    excerpt: 'An honest assessment of why agritech has been harder than anticipated — and where genuine structural opportunity exists for ventures willing to operate in complexity. Includes unit economics analysis of the most viable business models.',
    tag: 'Sector Report', pages: '60 pages', date: 'Year 2023', year: 2023, sector: 'Agritech',
  },
  {
    id: 31,
    title: 'Talent Economics in Indian Startups',
    excerpt: 'How Indian startups hire, compensate, retain, and lose talent across different stages. Covers salary benchmarks by role and stage, equity distribution norms, attrition rates by function, and the conditions that predict retention.',
    tag: 'Benchmarks', pages: '54 pages', date: 'Year 2023', year: 2023, sector: 'Cross-Sector',
  },
  {
    id: 32,
    title: 'Revenue-Based Financing: A New Capital Option for Indian Founders',
    excerpt: 'An analysis of revenue-based financing as an alternative to equity dilution — how it works, who it suits, what the real cost of capital looks like, and how Indian founders are currently using it relative to traditional options.',
    tag: 'Framework', pages: '36 pages', date: 'Year 2023', year: 2023, sector: 'Fundraising',
  },
  {
    id: 33,
    title: 'The Co-Founder Relationship: Data From 150 Indian Founding Teams',
    excerpt: 'Survey data from 150 multi-founder teams on equity splits, role boundaries, conflict patterns, and relationship breakdowns. Identifies the structural predictors of co-founder conflict and the arrangements correlated with long-term cohesion.',
    tag: 'Research', pages: '40 pages', date: 'Year 2023', year: 2023, sector: 'Cross-Sector',
  },
  {
    id: 34,
    title: 'Gaming and Interactive Entertainment in India',
    excerpt: 'India\'s gaming sector mapped across mobile, PC, cloud, and interactive entertainment. Covers monetisation model performance, player economics, regulatory risk from real-money gaming restrictions, and the structural whitespace remaining.',
    tag: 'Sector Report', pages: '50 pages', date: 'Year 2023', year: 2023, sector: 'Gaming',
  },
  {
    id: 35,
    title: 'B2B Marketplace Economics in India',
    excerpt: 'The unit economics and structural viability of B2B marketplace models across sectors. Analyses take rate benchmarks, supplier fragmentation requirements, demand aggregation dynamics, and the conditions under which B2B marketplaces create defensible value.',
    tag: 'Deep Dive', pages: '56 pages', date: 'Year 2023', year: 2023, sector: 'Marketplace',
  },
  {
    id: 36,
    title: 'Insurtech in India: Between Regulation and Opportunity',
    excerpt: 'A clear-eyed view of India\'s insurtech sector — where capital has gone, what the regulatory constraints actually mean, which models are viable under current rules, and where the structural opportunity lies for a decade-long view.',
    tag: 'Sector Report', pages: '46 pages', date: 'Year 2023', year: 2023, sector: 'Insurtech',
  },
  {
    id: 37,
    title: 'Enterprise Sales in India — A Founders Guide',
    excerpt: 'How enterprise sales works differently in India — procurement cycles, decision-making structures, champions vs. blockers, relationship versus capability selling, and the tactical differences between Indian corporate and government enterprise sales.',
    tag: 'Framework', pages: '42 pages', date: 'Year 2023', year: 2023, sector: 'B2B SaaS',
  },  
  {
    id: 38,
    title: 'Indian Startup Ecosystem Report 2024',
    excerpt: 'The 2024 edition of our annual flagship report. A year of recalibration — funding data, sector performance, the return of discipline to valuations, and early signals of the next growth cycle.',
    tag: 'Annual Report', pages: '130 pages', date: 'Year 2024', year: 2024, sector: 'Cross-Sector',
  },
  {
    id: 39,
    title: 'Mental Health and the Founder Economy',
    excerpt: 'A follow-on to our founder burnout research. Analyses the systemic factors in the startup ecosystem that contribute to founder mental health challenges — and the structural changes at company and ecosystem level that would meaningfully help.',
    tag: 'Research', pages: '34 pages', date: 'Year 2023', year: 2023, sector: 'Cross-Sector',
  },
  {
    id: 40,
    title: 'The ₹10Cr ARR Question: What Changes and What Doesn\'t',
    excerpt: 'A research report on the structural shifts required as SaaS companies cross the ₹10Cr ARR threshold. Analyses team composition changes, process requirements, go-to-market evolution, and where founders consistently make the transition harder than it needs to be.',
    tag: 'Research', pages: '46 pages', date: 'Year 2022', year: 2022, sector: 'B2B SaaS',
  },
  {
    id: 41,
    title: 'Spacetech and DeepTech: India\'s Long-Cycle Opportunity',
    excerpt: 'Analysis of India\'s emerging spacetech and deep technology ecosystem — post-ISRO commercialisation, early private sector activity, international capital interest, and the realistic timelines for commercial returns in each subsegment.',
    tag: 'Sector Report', pages: '58 pages', date: 'Year 2022', year: 2022, sector: 'Deep Tech',
  },
  {
    id: 42,
    title: 'The Acqui-Hire Market in India',
    excerpt: 'A little-discussed but real exit path — acqui-hires in the Indian startup ecosystem. Data on frequency, deal structures, valuations paid per employee, sectors where it is most active, and what founders need to know when considering it.',
    tag: 'Research', pages: '32 pages', date: 'Year 2022', year: 2022, sector: 'Fundraising',
  },
  {
    id: 43,
    title: 'Customer Acquisition Cost Benchmarks — India 2022',
    excerpt: 'Channel-level and blended CAC benchmarks across 15 product categories in India. Includes performance marketing, content, events, and outbound. Analyses which channels are most capital-efficient by stage, sector, and deal size.',
    tag: 'Benchmarks', pages: '40 pages', date: 'Year 2022', year: 2022, sector: 'Cross-Sector',
  },
  {
    id: 44,
    title: 'The ESOP Landscape in Indian Startups',
    excerpt: 'ESOP pool sizes, strike price practices, vesting structures, and liquidity event outcomes across 200 Indian startups. Identifies common structural problems with ESOP design that create long-term retention and trust issues.',
    tag: 'Framework', pages: '38 pages', date: 'Year 2022', year: 2022, sector: 'Cross-Sector',
  },
  {
    id: 45,
    title: 'Mobility and EV: The Infrastructure Bet',
    excerpt: 'India\'s electric vehicle and mobility technology ecosystem analysed through the lens of infrastructure dependency. Maps which business models require infrastructure that does not yet exist versus those viable today — with capital flow data.',
    tag: 'Sector Report', pages: '54 pages', date: 'Year 2022', year: 2022, sector: 'Mobility',
  },
  {
    id: 46,
    title: 'Startup Governance: Why It Matters Earlier Than You Think',
    excerpt: 'A research report on governance practices in Indian startups from seed through Series B. Covers board composition evolution, information rights, consent matters, and the structural problems that emerge when governance is deferred.',
    tag: 'Framework', pages: '44 pages', date: 'Year 2022', year: 2022, sector: 'Cross-Sector',
  },
  {
    id: 47,
    title: 'Consumer Subscription Models in India — Viability Analysis',
    excerpt: 'Which consumer subscription models are structurally viable in India, at what price points, in which categories. Analyses retention curves, payment failure rates, downgrade patterns, and the behavioural differences between Indian and Western subscription consumers.',
    tag: 'Deep Dive', pages: '48 pages', date: 'Year 2022', year: 2022, sector: 'Consumer',
  },
  {
    id: 48,
    title: 'Impact Investing in India — Returns and Reality',
    excerpt: 'An evidence-based assessment of impact investing outcomes in India — where returns have materialised, which theses underperformed, what the real trade-offs between impact and return are, and where the next generation of impact capital is flowing.',
    tag: 'Research', pages: '52 pages', date: 'Year 2022', year: 2022, sector: 'Impact',
  },
  {
    id: 49,
    title: 'The Vernacular Internet and Bharat-First Products',
    excerpt: 'India\'s next 500 million internet users are not English-first. This report maps the vernacular content and product opportunity — user behaviour differences, monetisation challenges, infrastructure constraints, and where significant bets are being placed.',
    tag: 'Sector Report', pages: '50 pages', date: 'Year 2022', year: 2022, sector: 'Consumer',
  },
  {
    id: 50,
    title: 'SaaS for SMBs in India — The Viability Question',
    excerpt: 'Selling software to Indian SMBs has historically been difficult. This report analyses why, what has changed, which models are beginning to work, and what the structural requirements for viable SMB SaaS look like in the current environment.',
    tag: 'Deep Dive', pages: '46 pages', date: 'Year 2022', year: 2022, sector: 'B2B SaaS',
  },

  // Batch 3 (51–75)
  {
    id: 51,
    title: 'Indian Startup Ecosystem Report 2023',
    excerpt: 'The 2023 edition — a year of correction, recalibration, and resilience. Full funding data, sectoral analysis, founder sentiment survey, and the structural forces that will shape the recovery.',
    tag: 'Annual Report', pages: '126 pages', date: 'Year 2023', year: 2023, sector: 'Cross-Sector',
  },
  {
    id: 52,
    title: 'Biotech and Pharma Innovation in India',
    excerpt: 'India\'s biopharmaceutical and biotech innovation landscape — from generic export dominance to novel drug discovery. Maps emerging capabilities, capital flows, regulatory environment, and the infrastructure gaps that constrain more ambitious bets.',
    tag: 'Sector Report', pages: '62 pages', date: 'Year 2022', year: 2022, sector: 'Biotech',
  },
  {
    id: 53,
    title: 'Cohort Retention Analysis: What the Best SaaS Companies Do Differently',
    excerpt: 'Deep analysis of cohort retention curves across 80 Indian SaaS companies. Identifies the structural practices — onboarding, customer success touchpoints, expansion motions — that separate companies with flat retention curves from those with improving ones.',
    tag: 'Research', pages: '44 pages', date: 'Year 2021', year: 2021, sector: 'B2B SaaS',
  },
  {
    id: 54,
    title: 'Wealthtech in India — A Decade of Evolution',
    excerpt: 'Ten years of wealthtech in India — from early robo-advisors through discount brokers to the current generation of full-stack platforms. Analyses which models created durable value, which competed on margin to exhaustion, and what the next wave looks like.',
    tag: 'Deep Dive', pages: '56 pages', date: 'Year 2021', year: 2021, sector: 'Fintech',
  },
  {
    id: 55,
    title: 'The Role of Advisors in Indian Startup Success',
    excerpt: 'Survey data from 300 Indian startups on advisor relationships — how they are structured, what value is actually delivered versus claimed, which engagement models produce measurable outcomes, and how founders can get more from advisory relationships.',
    tag: 'Research', pages: '36 pages', date: 'Year 2021', year: 2021, sector: 'Cross-Sector',
  },
  {
    id: 56,
    title: 'Food and Beverage Brands in the Digital Age',
    excerpt: 'How Indian F&B brands are building in a DTC-first world — channel mix, unit economics by category, cold chain dependency, shelf life constraints on margin, and the structural differences between packaged food, beverages, and fresh categories.',
    tag: 'Sector Report', pages: '48 pages', date: 'Year 2021', year: 2021, sector: 'Consumer',
  },
  {
    id: 57,
    title: 'Competitive Moats in Indian SaaS — What Actually Works',
    excerpt: 'A research report on the durability of competitive advantages claimed by Indian SaaS companies. Tests which moats — network effects, switching costs, data advantages, workflow lock-in — have actually held up under competitive pressure.',
    tag: 'Research', pages: '50 pages', date: 'Year 2021', year: 2021, sector: 'B2B SaaS',
  },
  {
    id: 58,
    title: 'Indian Startup Ecosystem Report 2022',
    excerpt: 'The 2022 edition — the peak and the turn. A record year for funding followed by the correction. Full data, sectoral analysis, and an early look at what the recalibration would demand from founders.',
    tag: 'Annual Report', pages: '118 pages', date: 'Year 2022', year: 2022, sector: 'Cross-Sector',
  },
  {
    id: 59,
    title: 'Marketplace Liquidity — The Hardest Problem in Platform Building',
    excerpt: 'An analysis of how Indian marketplace companies have tackled the chicken-and-egg problem — which strategies worked at what scale, what the data shows about minimum viable liquidity thresholds, and the structural interventions that accelerate it.',
    tag: 'Deep Dive', pages: '42 pages', date: 'Year 2021', year: 2021, sector: 'Marketplace',
  },
  {
    id: 60,
    title: 'Cross-Border SaaS from India — The Playbook',
    excerpt: 'How Indian SaaS companies successfully sell internationally — target geography selection, localisation requirements, pricing for global markets, channel strategies, and the operational infrastructure that international expansion demands at each stage.',
    tag: 'Framework', pages: '52 pages', date: 'Year 2021', year: 2021, sector: 'B2B SaaS',
  },
  {
    id: 61,
    title: 'The ONDC Opportunity — Open Commerce in India',
    excerpt: 'A structural analysis of the Open Network for Digital Commerce — what it means for existing commerce platforms, where new value can be created, which business models it disrupts, and the realistic timeline for material impact on consumer behaviour.',
    tag: 'Regulatory', pages: '38 pages', date: 'Year 2021', year: 2021, sector: 'Commerce',
  },
  {
    id: 62,
    title: 'How Investors Read Financial Models — A Founder\'s Guide',
    excerpt: 'The order in which investors review financial models, which assumptions they stress-test first, the specific numbers they triangulate, and the model architectures that signal sophistication versus those that signal inexperience.',
    tag: 'Framework', pages: '34 pages', date: 'Year 2021', year: 2021, sector: 'Fundraising',
  },
  {
    id: 63,
    title: 'Developer Tools Market in India — A Quiet Giant',
    excerpt: 'India\'s developer tools market analysed from both a domestic and global-from-India perspective. Maps the 40M+ developer base, adoption patterns, willingness to pay, competitive dynamics, and the channels that work for developer acquisition.',
    tag: 'Sector Report', pages: '46 pages', date: 'Year 2021', year: 2021, sector: 'Dev Tools',
  },
  {
    id: 64,
    title: 'Customer Success as a Growth Function — Evidence from Indian SaaS',
    excerpt: 'Survey data on how Indian SaaS companies structure, staff, and measure customer success. Identifies the practices correlated with above-average NRR, the CS-to-ARR staffing ratios that hold at different scales, and the expansion playbooks that work.',
    tag: 'Research', pages: '40 pages', date: 'Year 2021', year: 2021, sector: 'B2B SaaS',
  },
  {
    id: 65,
    title: 'Smart Cities and Urban Infrastructure Tech',
    excerpt: 'India\'s smart city initiative and the technology opportunity it creates — from traffic management through water systems to civic engagement platforms. Maps which subsectors are genuinely active, which are stuck in procurement, and where private capital is needed.',
    tag: 'Sector Report', pages: '54 pages', date: 'Year 2021', year: 2021, sector: 'Infrastructure',
  },
  {
    id: 66,
    title: 'The Seed Stage in India — What Has Changed',
    excerpt: 'A longitudinal analysis of how India\'s seed investing landscape has evolved from 2016 to 2024. Covers cheque sizes, investor expectations, the rise of pre-seed, syndication dynamics, and the structural differences between seed rounds that go on to raise Series A and those that don\'t.',
    tag: 'Research', pages: '44 pages', date: 'Year 2020', year: 2020, sector: 'Fundraising',
  },
  {
    id: 67,
    title: 'Indian Startup Ecosystem Report 2021',
    excerpt: 'The 2021 edition — the year of recovery and acceleration. Funding surged, new sectors emerged, and valuations expanded rapidly. Full data, sectoral analysis, and the early signals of the correction that followed.',
    tag: 'Annual Report', pages: '112 pages', date: 'Year 2021', year: 2021, sector: 'Cross-Sector',
  },
  {
    id: 68,
    title: 'Retention Marketing in Indian Consumer Apps',
    excerpt: 'How Indian consumer apps retain users — push notifications, in-app messaging, email, loyalty mechanics, and re-engagement playbooks. Benchmarks open rates, re-activation rates, and churn patterns by category and user cohort.',
    tag: 'Deep Dive', pages: '38 pages', date: 'Year 2020', year: 2020, sector: 'Consumer',
  },
  {
    id: 69,
    title: 'The Hiring Market for Senior Talent in Indian Startups',
    excerpt: 'How Indian startups compete for VP and C-suite talent — compensation structures, equity norms, search processes, onboarding failures, and what distinguishes hiring processes that attract exceptional senior candidates from those that consistently fall short.',
    tag: 'Benchmarks', pages: '42 pages', date: 'Year 2020', year: 2020, sector: 'Cross-Sector',
  },
  {
    id: 70,
    title: 'India Stack and the Infrastructure Advantage',
    excerpt: 'An analytical primer on India\'s digital public infrastructure — UPI, Aadhaar, DigiLocker, ONDC, and the emerging data stack — and the structural advantage it creates for Indian fintech and commerce startups relative to global peers building without equivalent infrastructure.',
    tag: 'Framework', pages: '48 pages', date: 'Year 2020', year: 2020, sector: 'Fintech',
  },
  {
    id: 71,
    title: 'Building for Rural India — Constraints and Opportunities',
    excerpt: 'A research report on products and services designed primarily for rural Indian users. Maps the connectivity infrastructure, income distribution, digital literacy, and payment behaviour that define the design constraints — and the scale of the opportunity within them.',
    tag: 'Research', pages: '50 pages', date: 'Year 2020', year: 2020, sector: 'Consumer',
  },
  {
    id: 72,
    title: 'Mental Models for Market Sizing',
    excerpt: 'A practical framework report on market sizing — TAM/SAM/SOM methodology, the common mistakes investors identify in market size claims, how to build bottom-up models that survive scrutiny, and what different market size signals mean for fundability.',
    tag: 'Framework', pages: '30 pages', date: 'Year 2020', year: 2020, sector: 'Fundraising',
  },
  {
    id: 73,
    title: 'Indian Startup Ecosystem Report 2020',
    excerpt: 'The 2020 edition — a year unlike any other. COVID-19\'s impact on Indian startups, which sectors contracted and which accelerated, the shift to digital across categories, and the structural reshaping of founder and investor behaviour.',
    tag: 'Annual Report', pages: '108 pages', date: 'Year 2020', year: 2020, sector: 'Cross-Sector',
  },
  {
    id: 74,
    title: 'The Board-Founder Dynamic — Survey and Analysis',
    excerpt: 'Survey data from 120 founder-board relationships on expectations, communication quality, strategic value delivered, and conflict patterns. Identifies what distinguishes board relationships that make founders better from those that create drag.',
    tag: 'Research', pages: '40 pages', date: 'Year 2020', year: 2020, sector: 'Cross-Sector',
  },
  {
    id: 75,
    title: 'Decade in Review: Indian Startup Ecosystem 2010–2020',
    excerpt: 'A ten-year retrospective on India\'s startup decade — capital flows, exit patterns, the companies that defined each era, the structural changes to the ecosystem, and what the next decade is likely to demand from founders and investors alike.',
    tag: 'Annual Report', pages: '160 pages', date: 'Year 2020', year: 2020, sector: 'Cross-Sector',
  },
];


const BATCH_SIZE = 25;

// =====================================================
// ADVERTISEMENT DATA
// =====================================================

const FEATURED_CASE_STUDIES: CaseStudyTeaser[] = [
  {
    title: 'From ₹80L to ₹5Cr: Restructuring a Fragile Revenue Base',
    tag: 'Revenue', sector: 'B2B SaaS', outcome: 'Revenue ×6.25', year: '2024',
  },
  {
    title: 'Fixing the Unit Economics Before the Series A',
    tag: 'Fundraising', sector: 'D2C', outcome: 'Round closed', year: '2024',
  },
  {
    title: 'A Pricing Audit That Added 40% to Revenue',
    tag: 'Revenue', sector: 'B2B SaaS', outcome: '+40% revenue', year: '2024',
  },
];

const FEATURED_BLOGS: BlogTeaser[] = [
  {
    title: "Pricing Is a Strategy, Not a Number",
    tag: 'Revenue', readTime: '6 min', date: 'Feb 14, 2026',
  },
  {
    title: "The Real Meaning of Capital Efficiency",
    tag: 'Finance', readTime: '6 min', date: 'Dec 22, 2025',
  },
  {
    title: "Why Your Pitch Deck Isn't the Problem",
    tag: 'Fundraising', readTime: '6 min', date: 'Oct 29, 2025',
  },
];

// =====================================================
// TAG COLOR MAP — blues from homepage palette
// =====================================================

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  'Annual Report':    { bg: '#DBEAFE', text: '#1E40AF' },
  'Sector Report':    { bg: '#E0F2FE', text: '#0369A1' },
  'Research':         { bg: '#E6F0FF', text: '#1E3A8A' },
  'Digest':           { bg: '#DBEAFE', text: '#1E40AF' },
  'Benchmarks':       { bg: '#E0F2FE', text: '#0369A1' },
  'Index':            { bg: '#E0E7FF', text: '#3730A3' },
  'Longitudinal':     { bg: '#E6F0FF', text: '#1E3A8A' },
  'Framework':        { bg: '#DBEAFE', text: '#1E40AF' },
  'Deep Dive':        { bg: '#E0F2FE', text: '#0369A1' },
  'Emerging Markets': { bg: '#E6F0FF', text: '#1E3A8A' },
  'Regulatory':       { bg: '#E0E7FF', text: '#3730A3' },
  'Sector Map':       { bg: '#DBEAFE', text: '#1E40AF' },
  'Ecosystem':        { bg: '#E0F2FE', text: '#0369A1' },
  'Fundraising':      { bg: '#E6F0FF', text: '#1E3A8A' },
  'Consumer Research':{ bg: '#DBEAFE', text: '#1E40AF' },
};

const getTagStyle = (tag: string): { bg: string; text: string } =>
  TAG_COLORS[tag] ?? { bg: '#DBEAFE', text: '#1E40AF' };

// =====================================================
// ALL FILTER TAGS
// =====================================================

const ALL_TAGS: string[] = [
  'All', 'Annual Report', 'Sector Report', 'Research',
  'Benchmarks', 'Framework', 'Deep Dive', 'Digest',
  'Longitudinal', 'Index', 'Regulatory',
];

// =====================================================
// PARTNER AUTH MODAL — matches homepage modal
// =====================================================

interface PartnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle: string;
}

const PartnerAuthModal: FC<PartnerAuthModalProps> = ({
  isOpen,
  onClose,
  resourceTitle,
}) => {
  const [formData, setFormData] = useState<PartnerFormData>({ partnerId: '', password: '' });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData({ partnerId: '', password: '' });
      setError('');
      setSuccess(false);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (formData.partnerId && formData.password) {
        setSuccess(true);
        setLoading(false);
      } else {
        setError('Invalid Partner ID or password. Please try again.');
        setLoading(false);
      }
    }, 1000);
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-md"
        style={{ animation: 'modalIn 0.3s cubic-bezier(0.22,1,0.36,1) both' }}
      >
        <div className="bg-white rounded-md shadow-2xl overflow-hidden">

          {/* Modal Header — plain, no gradient */}
          <div className="px-8 py-6 relative border-b border-gray-200">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-semibold text-gray-800">Request Access</h2>
            <p className="text-sm text-gray-600 mt-1">
              Enter your partner credentials to download: <span className="font-medium text-gray-700">{resourceTitle}</span>
            </p>
          </div>

          {/* Modal Body */}
          <div className="px-8 py-8">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-3">
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Partner ID</label>
                  <input
                    type="text"
                    value={formData.partnerId}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData((p) => ({ ...p, partnerId: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                    placeholder="e.g. SSP-2024-XXXX"
                    required
                    autoComplete="username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData((p) => ({ ...p, password: e.target.value }))
                      }
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 text-sm ${
                    loading ? 'opacity-75 cursor-not-allowed' : 'shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Authenticating…
                    </>
                  ) : (
                    'Download Report'
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 pt-1">
                  Don&apos;t have a Partner ID?{' '}
                  <a href="#" className="text-blue-600 hover:underline">Request Access</a>
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Access Granted</h3>
                <p className="text-gray-500 text-sm">
                  Preparing <span className="font-medium text-gray-700">{resourceTitle}</span> for download…
                </p>
              </div>
            )}
          </div>
        </div>
        <p className="text-center text-sm mt-4 text-gray-400">
          Partner access is monitored and logged for security purposes.
        </p>
      </div>
    </div>
  );
};

// =====================================================
// HERO SECTION — colors updated to homepage palette
// =====================================================

const HeroSection: FC = () => (
  <section
    className="relative overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8"
    style={{ backgroundColor: '#0A1E3D', minHeight: '520px' }}
  >
    <div className="max-w-7xl mx-auto relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT */}
        <div className="space-y-7">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white">
              Original
              <span className="block text-blue-300">Research.</span>
            </h1>
            <p className="text-base sm:text-lg max-w-md text-gray-400">
              Data-backed analysis on India&apos;s startup ecosystem — annual reports, sector deep-dives, benchmarks, and frameworks built for founders who make decisions with evidence.
            </p>
          </div>
        </div>

        {/* RIGHT — visual */}
        <div
          className="relative hidden lg:flex items-center justify-end"
          style={{ height: '420px' }}
          aria-hidden="true"
        >
          <img src="/assets/resources/Reports Head.svg" alt="" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  </section>
);

// =====================================================
// TAG FILTER BAR — fixed clipping, updated to rounded-md
// =====================================================

interface TagFilterBarProps {
  activeTag: string;
  onTagChange: (tag: string) => void;
}

const TagFilterBar: FC<TagFilterBarProps> = ({ activeTag, onTagChange }) => (
  <div
    className="flex gap-2 overflow-x-auto overflow-visible py-2"
    style={{ scrollbarWidth: 'none' } as React.CSSProperties}
    role="toolbar"
    aria-label="Filter reports by type"
  >
    {ALL_TAGS.map((tag) => {
      const isActive = tag === activeTag;
      const style    = tag === 'All'
        ? { bg: '#DBEAFE', text: '#1E40AF' }
        : getTagStyle(tag);

      return (
        <button
          key={tag}
          type="button"
          onClick={() => onTagChange(tag)}
          className="flex-shrink-0 px-4 py-2 rounded-md text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={
            isActive
              ? {
                  backgroundColor: '#132B47',
                  color: '#93C5FD',
                  border: '1px solid rgba(59,130,246,0.40)',
                }
              : {
                  backgroundColor: style.bg,
                  color: style.text,
                  border: '1px solid transparent',
                  opacity: 0.65,
                }
          }
          aria-pressed={isActive}
        >
          {tag}
        </button>
      );
    })}
  </div>
);

// =====================================================
// FEATURED REPORT CARD
// =====================================================

interface FeaturedReportCardProps {
  report: Report;
  onOpen: (title: string) => void;
}

const FeaturedReportCard: FC<FeaturedReportCardProps> = ({ report, onOpen }) => {
  const tagStyle = getTagStyle(report.tag);

  return (
    <article
      onClick={() => onOpen(report.title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(report.title)}
      className="group cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.10)' }}
      aria-label={`Download report: ${report.title}`}
    >
      {/* Header */}
      <div
        className="relative h-44 sm:h-52 px-8 sm:px-10 flex items-end pb-7 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #132B47 0%, #0A1E3D 65%)' }}
      >
        {/* Stacked rectangle motif */}
        <div className="absolute inset-0 flex items-center justify-end pr-10" aria-hidden="true">
          {[3, 2, 1].map((l) => (
            <div
              key={l}
              className="absolute rounded-md"
              style={{
                width: `${80 + l * 20}px`,
                height: `${110 + l * 25}px`,
                right: `${20 + (3 - l) * 12}px`,
                top: '50%',
                transform: 'translateY(-50%)',
                border: `1px solid rgba(59,130,246,${0.05 * l})`,
                backgroundColor: `rgba(19,43,71,${0.04 * l})`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex items-center gap-3 flex-wrap">
          <span
            className="px-3 py-1 rounded-md text-xs font-semibold"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {report.tag}
          </span>
          <span
            className="px-3 py-1 rounded-md text-xs font-medium"
            style={{
              backgroundColor: 'rgba(59,130,246,0.08)',
              color: '#93C5FD',
              border: '1px solid rgba(59,130,246,0.14)',
            }}
          >
            Featured
          </span>
          <span
            className="px-3 py-1 rounded-md text-xs font-medium"
            style={{
              backgroundColor: 'rgba(59,130,246,0.06)',
              color: '#93C5FD',
              border: '1px solid rgba(59,130,246,0.12)',
            }}
          >
            {report.pages}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 sm:px-10 py-6 sm:py-8">
        <h2
          className="mb-3 group-hover:text-blue-300 transition-colors duration-200 text-white"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)' }}
        >
          {report.title}
        </h2>
        <p className="text-sm mb-6 max-w-3xl text-gray-400">
          {report.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-wrap">
            <span
              className="px-2.5 py-1 rounded-md text-xs"
              style={{ backgroundColor: '#132B47', color: '#93C5FD' }}
            >
              {report.sector}
            </span>
            <span className="text-xs text-gray-500">{report.date}</span>
          </div>
          <div
            className="flex items-center gap-1.5 text-xs font-medium group-hover:gap-3 transition-all duration-200 text-blue-300"
          >
            Download report
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
};

// =====================================================
// STANDARD REPORT CARD
// =====================================================

interface ReportCardProps {
  report: Report;
  onOpen: (title: string) => void;
  animIndex: number;
}

const ReportCard: FC<ReportCardProps> = ({ report, onOpen, animIndex }) => {
  const tagStyle = getTagStyle(report.tag);

  return (
    <article
      onClick={() => onOpen(report.title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(report.title)}
      className="group cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      style={{
        backgroundColor: '#0A1E3D',
        border: '1px solid rgba(59,130,246,0.08)',
        animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${animIndex * 45}ms both`,
      }}
      aria-label={`Download report: ${report.title}`}
    >
      {/* Top accent line */}
      <div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, ${tagStyle.text}35, transparent)` }}
      />

      {/* Header band */}
      <div
        className="relative h-28 px-5 flex items-end pb-4 overflow-hidden"
        style={{ background: 'linear-gradient(155deg, #132B47 0%, #0A1E3D 100%)' }}
      >
        <div className="absolute top-3 right-3 opacity-10" aria-hidden="true">
          <div className="w-10 h-12 rounded-md border border-blue-400" />
          <div className="w-10 h-12 rounded-md border border-blue-400 absolute top-1.5 left-1.5" />
        </div>

        <div className="relative z-10 flex items-center gap-2 flex-wrap">
          <span
            className="px-2.5 py-1 rounded-md text-xs font-semibold"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {report.tag}
          </span>
          <span
            className="px-2 py-0.5 rounded-md text-xs"
            style={{
              backgroundColor: 'rgba(59,130,246,0.06)',
              color: '#93C5FD',
              border: '1px solid rgba(59,130,246,0.12)',
            }}
          >
            {report.pages}
          </span>
        </div>

        <div
          className="absolute top-4 right-4 z-10 opacity-25 group-hover:opacity-70 transition-opacity"
          aria-hidden="true"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="#93C5FD" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <h3
          className="font-medium mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 text-white"
          style={{ fontSize: '0.9rem' }}
        >
          {report.title}
        </h3>
        <p className="text-xs mb-4 line-clamp-2 text-gray-400">
          {report.excerpt}
        </p>

        <div
          className="flex items-center justify-between pt-3"
          style={{ }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-xs px-2 py-0.5 rounded-md"
              style={{ backgroundColor: '#132B47', color: '#93C5FD' }}
            >
              {report.sector}
            </span>
          </div>
          <span className="text-xs text-gray-500">{report.date}</span>
        </div>
      </div>
    </article>
  );
};

// =====================================================
// CASE STUDIES ADVERTISEMENT STRIP — with thumbnails (h-28)
// =====================================================

interface CaseStudiesStripProps {
  onCaseStudyClick: (title: string) => void;
}

const CaseStudiesAdvertStrip: FC<CaseStudiesStripProps> = ({ onCaseStudyClick }) => (
  <div
    className="my-12 rounded-md overflow-hidden"
    style={{ backgroundColor: '#132B47', border: '1px solid rgba(59,130,246,0.12)' }}
  >
    <div className="px-6 sm:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center"
            style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}
          >
            <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-blue-300">Case Studies</p>
            <p className="text-sm text-gray-400">Real decisions. Real outcomes.</p>
          </div>
        </div>
        <a
          href="/resources/case-studies"
          className="text-xs font-medium flex items-center gap-1 text-blue-300 hover:opacity-80 transition-opacity"
        >
          All Cases
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Grid of case study cards with thumbnails */}
      <div className="grid sm:grid-cols-3 gap-4">
        {FEATURED_CASE_STUDIES.map((cs) => {
          const tagStyle = getTagStyle(cs.tag);
          return (
            <div
              key={cs.title}
              onClick={() => onCaseStudyClick(cs.title)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onCaseStudyClick(cs.title)}
              className="group cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.08)' }}
              aria-label={`View case study: ${cs.title}`}
            >
              {/* Top accent line */}
              <div
                className="h-0.5 w-full"
                style={{ background: `linear-gradient(90deg, ${tagStyle.text}40, transparent)` }}
              />

              {/* Thumbnail header */}
              <div
                className="relative h-28 px-5 flex items-end pb-4 overflow-hidden"
                style={{ background: 'linear-gradient(155deg, #132B47 0%, #0A1E3D 100%)' }}
              >
                <div className="absolute top-2 right-3 opacity-10" aria-hidden="true">
                  <div className="w-14 h-14 rounded-full border border-blue-400" />
                </div>
                <div className="relative z-10">
                  <span
                    className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold"
                    style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
                  >
                    {cs.tag}
                  </span>
                </div>
                <div
                  className="absolute top-4 right-4 z-10 opacity-25 group-hover:opacity-70 transition-opacity"
                  aria-hidden="true"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="#9CA3AF" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

              {/* Body */}
              <div className="px-5 py-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className="inline-block px-2 py-0.5 rounded-md text-xs font-semibold"
                    style={{ backgroundColor: 'rgba(96,165,250,0.15)', color: '#93C5FD' }}
                  >
                    {cs.outcome}
                  </span>
                </div>
                <p className="text-sm font-medium mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 text-white">
                  {cs.title}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{cs.sector}</span>
                  <span className="text-xs text-gray-600">·</span>
                  <span className="text-xs text-gray-500">{cs.year}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

// =====================================================
// BLOGS ADVERTISEMENT STRIP — with thumbnails (h-28)
// =====================================================

interface BlogsStripProps {
  onBlogClick: (title: string) => void;
}

const BlogsAdvertStrip: FC<BlogsStripProps> = ({ onBlogClick }) => (
  <div
    className="my-12 rounded-md overflow-hidden"
    style={{ backgroundColor: '#132B47', border: '1px solid rgba(59,130,246,0.12)' }}
  >
    <div className="px-6 sm:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center"
            style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}
          >
            <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-blue-300">From the Blog</p>
            <p className="text-sm text-gray-400">Thinking behind the numbers</p>
          </div>
        </div>
        <a
          href="/resources/blogs"
          className="text-xs font-medium flex items-center gap-1 text-blue-300 hover:opacity-80 transition-opacity"
        >
          All Articles
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Grid of blog cards with thumbnails */}
      <div className="grid sm:grid-cols-3 gap-4">
        {FEATURED_BLOGS.map((blog) => {
          const tagStyle = getTagStyle(blog.tag);
          return (
            <div
              key={blog.title}
              onClick={() => onBlogClick(blog.title)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onBlogClick(blog.title)}
              className="group cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.08)' }}
              aria-label={`Read blog: ${blog.title}`}
            >
              {/* Top accent line */}
              <div
                className="h-0.5 w-full"
                style={{ background: `linear-gradient(90deg, ${tagStyle.text}40, transparent)` }}
              />

              {/* Thumbnail header */}
              <div
                className="relative h-28 px-5 flex items-end pb-4 overflow-hidden"
                style={{ background: 'linear-gradient(155deg, #132B47 0%, #0A1E3D 100%)' }}
              >
                <div className="absolute top-2 right-3 opacity-10" aria-hidden="true">
                  <div className="w-14 h-14 rounded-full border border-blue-400" />
                </div>
                <div className="relative z-10">
                  <span
                    className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold"
                    style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
                  >
                    {blog.tag}
                  </span>
                </div>
                <div
                  className="absolute top-4 right-4 z-10 opacity-25 group-hover:opacity-70 transition-opacity"
                  aria-hidden="true"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="#9CA3AF" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

              {/* Body */}
              <div className="px-5 py-4">
                <p className="text-sm font-medium mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 text-white">
                  {blog.title}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blue-400">{blog.readTime} read</span>
                  <span className="text-xs text-gray-600">·</span>
                  <span className="text-xs text-gray-500">{blog.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

// =====================================================
// LOAD MORE SENTINEL
// =====================================================

interface LoadMoreSentinelProps {
  onVisible: () => void;
  loading: boolean;
  hasMore: boolean;
  totalCount: number;
}

const LoadMoreSentinel: FC<LoadMoreSentinelProps> = ({
  onVisible,
  loading,
  hasMore,
  totalCount,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onVisible();
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onVisible, hasMore]);

  return (
    <div ref={ref} className="flex justify-center py-12">
      {loading && (
        <div className="flex items-center gap-3 text-gray-500">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm">Loading more reports…</span>
        </div>
      )}
      {!loading && !hasMore && (
        <p className="text-sm text-gray-500">
          All {totalCount} reports loaded.
        </p>
      )}
    </div>
  );
};

// =====================================================
// PAGE ROOT COMPONENT
// =====================================================

export default function ReportsHubPage(): React.JSX.Element {
  const [activeTag, setActiveTag]     = useState<string>('All');
  const [loadedCount, setLoadedCount] = useState<number>(BATCH_SIZE);
  const [isLoading, setIsLoading]     = useState<boolean>(false);
  const [modalState, setModalState]   = useState<ModalState>({ open: false, title: '' });

  const filteredReports: Report[] =
    activeTag === 'All'
      ? ALL_REPORTS
      : ALL_REPORTS.filter((r) => r.tag === activeTag);

  const visibleReports: Report[] = filteredReports.slice(0, loadedCount);
  const hasMore: boolean         = loadedCount < filteredReports.length;

  useEffect(() => {
    setLoadedCount(BATCH_SIZE);
  }, [activeTag]);

  const loadMore = useCallback((): void => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setLoadedCount((prev) => Math.min(prev + BATCH_SIZE, filteredReports.length));
      setIsLoading(false);
    }, 600);
  }, [isLoading, hasMore, filteredReports.length]);

  const openModal  = (title: string): void => setModalState({ open: true, title });
  const closeModal = (): void => setModalState({ open: false, title: '' });

  const batch1: Report[]              = visibleReports.slice(0, 25);
  const batch2: Report[]              = visibleReports.slice(25, 50);
  const batch3: Report[]              = visibleReports.slice(50);
  const featured: Report | undefined  = batch1[0];
  const restBatch1: Report[]          = batch1.slice(1);

  const showCaseStudiesStrip = visibleReports.length >= 25;
  const showBlogsStrip       = visibleReports.length >= 50;

  return (
    <>
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        *::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
        html { scroll-behavior: smooth; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <main className="min-h-screen bg-white">

        {/* Hero */}
        <HeroSection />

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

          {/* Filter bar + count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <TagFilterBar activeTag={activeTag} onTagChange={setActiveTag} />
            <p className="text-sm flex-shrink-0 text-gray-500">
              {filteredReports.length}{' '}
              {filteredReports.length !== 1 ? 'reports' : 'report'}
              {activeTag !== 'All' && (
                <span className="text-blue-600">
                  {' '}in{' '}
                  {activeTag}
                </span>
              )}
            </p>
          </div>

          {/* Batch 1 */}
          {featured && (
            <div className="mb-8">
              <FeaturedReportCard report={featured} onOpen={openModal} />
            </div>
          )}

          {restBatch1.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {restBatch1.map((report, i) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onOpen={openModal}
                  animIndex={i}
                />
              ))}
            </div>
          )}

          {/* Case studies ad strip */}
          {showCaseStudiesStrip && (
            <CaseStudiesAdvertStrip onCaseStudyClick={openModal} />
          )}

          {/* Batch 2 */}
          {batch2.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {batch2.map((report, i) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onOpen={openModal}
                  animIndex={i}
                />
              ))}
            </div>
          )}

          {/* Blogs ad strip */}
          {showBlogsStrip && (
            <BlogsAdvertStrip onBlogClick={openModal} />
          )}

          {/* Batch 3 */}
          {batch3.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {batch3.map((report, i) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onOpen={openModal}
                  animIndex={i}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredReports.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-4xl mb-4">📭</p>
              <p className="text-lg mb-1 text-gray-900">
                No reports in &ldquo;{activeTag}&rdquo; yet
              </p>
              <p className="text-sm text-gray-500">
                Try a different type or{' '}
                <button
                  type="button"
                  className="underline text-blue-600"
                  onClick={() => setActiveTag('All')}
                >
                  view all
                </button>
                .
              </p>
            </div>
          )}

          {/* Load more sentinel */}
          {filteredReports.length > 0 && (
            <LoadMoreSentinel
              onVisible={loadMore}
              loading={isLoading}
              hasMore={hasMore}
              totalCount={filteredReports.length}
            />
          )}

        </div>
      </main>

      {/* Partner Auth Modal */}
      <PartnerAuthModal
        isOpen={modalState.open}
        onClose={closeModal}
        resourceTitle={modalState.title}
      />
    </>
  );
}