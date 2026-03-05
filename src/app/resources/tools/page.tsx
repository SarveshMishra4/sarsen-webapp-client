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

/** A single tool item */
interface Tool {
  id: number;
  title: string;
  excerpt: string;
  tag: string;
  format: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  useCase: string;
  featured?: boolean;
}

/** Report teaser shown in advertisement strip */
interface ReportTeaser {
  title: string;
  pages: string;
  date: string;
  tag: string;
}

/** Case study teaser shown in advertisement strip */
interface CaseStudyTeaser {
  title: string;
  tag: string;
  sector: string;
  outcome: string;
  year: string;
}

/** Partner auth modal state */
interface ModalState {
  open: boolean;
  title: string;
}

/** Partner auth form fields */
interface PartnerFormData {
  partnerId: string;
  password: string;
}

// =====================================================
// TOOLS DATA — 75 tools, loaded 25 at a time
// =====================================================

const ALL_TOOLS: Tool[] = [
  // (data unchanged – same as original)
  // Batch 1 (1–25)
  {
    id: 1,
    title: 'Startup Valuation Calculator',
    excerpt: 'Calculate your company\'s valuation using three methodologies simultaneously — DCF, revenue multiples, and comparable transactions. Automatically reconciles outputs and surfaces the assumptions driving the gap between methods.',
    tag: 'Valuation', format: 'Excel + Web App', complexity: 'Advanced', useCase: 'Pre-fundraise valuation benchmarking', featured: true,
  },
  {
    id: 2,
    title: '13-Week Cash Flow Forecaster',
    excerpt: 'Project your weekly cash position across a 13-week rolling window. Includes AR/AP timing assumptions, scenario toggles for delayed collections, and a runway countdown that updates in real time as inputs change.',
    tag: 'Finance', format: 'Excel Template', complexity: 'Intermediate', useCase: 'Short-term liquidity management',
  },
  {
    id: 3,
    title: 'Unit Economics Dashboard',
    excerpt: 'CAC, LTV, payback period, and contribution margin in a single pre-built model. Enter your actuals and the dashboard benchmarks them against sector norms, flags structural problems, and shows the levers that move each metric.',
    tag: 'Metrics', format: 'Excel + Notion', complexity: 'Intermediate', useCase: 'Investor-grade unit economics reporting',
  },
  {
    id: 4,
    title: 'Market Sizing Framework (TAM / SAM / SOM)',
    excerpt: 'A structured template for building bottom-up and top-down market size calculations. Includes an investor-facing output slide, assumption documentation cells, and a sensitivity table showing how estimates change with key variables.',
    tag: 'Strategy', format: 'Slides + Guide', complexity: 'Beginner', useCase: 'Pitch deck market sizing slide',
  },
  {
    id: 5,
    title: 'Pricing Audit Worksheet',
    excerpt: 'A structured worksheet for testing whether your current pricing is economically sound. Runs six diagnostic checks — value capture rate, competitive anchoring, segment alignment, expansion potential, churn correlation, and gross margin contribution.',
    tag: 'Revenue', format: 'Excel Worksheet', complexity: 'Intermediate', useCase: 'Revenue architecture review',
  },
  {
    id: 6,
    title: 'Investor Readiness Scorecard',
    excerpt: 'Self-assessment tool covering all dimensions institutional investors evaluate at seed and Series A — business model clarity, unit economics, team, market, traction, and capital efficiency. Outputs a scored readiness profile with specific gaps identified.',
    tag: 'Fundraising', format: 'Online Assessment', complexity: 'Beginner', useCase: 'Pre-fundraise gap identification',
  },
  {
    id: 7,
    title: 'Team Psychometric Assessment',
    excerpt: 'A structured framework for evaluating team dynamics, leadership style distribution, decision-making tendencies, and cultural fit across a founding team or senior leadership group. Outputs a team profile with gap analysis.',
    tag: 'People', format: 'Online Tool', complexity: 'Intermediate', useCase: 'Leadership team composition audit',
  },
  {
    id: 8,
    title: 'Financial Model Template — Early Stage Startup',
    excerpt: 'A complete driver-based financial model with P&L, balance sheet, and cash flow statement. Built for pre-Series A startups. Includes revenue build, headcount planning, capex assumptions, and a three-scenario toggle.',
    tag: 'Finance', format: 'Excel Template', complexity: 'Advanced', useCase: '3-statement fundraising model',
  },
  {
    id: 9,
    title: 'OKR & Accountability Framework',
    excerpt: 'Quarterly goal-setting and structured review process designed specifically for founder-led teams of 10–50 people. Includes company-level, team-level, and individual OKR templates with a weekly check-in cadence protocol.',
    tag: 'Operations', format: 'Notion Template', complexity: 'Beginner', useCase: 'Quarterly planning and execution',
  },
  {
    id: 10,
    title: 'Pitch Deck Builder — Slide Framework',
    excerpt: 'Investor-tested slide structure with detailed guidance notes for every section. Covers all 12 standard slides, common mistakes on each, what data to include, and how each slide connects to the investor\'s evaluation framework.',
    tag: 'Fundraising', format: 'Slides Template', complexity: 'Beginner', useCase: 'Series seed/A pitch deck construction',
  },
  {
    id: 11,
    title: 'Burn Rate Analyser',
    excerpt: 'Input your actuals and projections to get a granular view of what is driving burn. Segments burn by function, identifies the highest-leverage cost lines, and models what specific cuts or hires do to your runway and breakeven timeline.',
    tag: 'Finance', format: 'Excel Template', complexity: 'Intermediate', useCase: 'Burn structure diagnosis and planning',
  },
  {
    id: 12,
    title: 'Sales Pipeline Tracker & Forecasting Model',
    excerpt: 'Stage-weighted pipeline model that converts deal-by-deal data into probabilistic revenue forecasts. Includes conversion rate benchmarks, average cycle time inputs, and a quarterly forecast output with confidence intervals.',
    tag: 'Revenue', format: 'Excel + Sheets', complexity: 'Intermediate', useCase: 'Predictable revenue forecasting',
  },
  {
    id: 13,
    title: 'Cap Table Modelling Tool',
    excerpt: 'Model your cap table through multiple funding rounds. Shows pre- and post-money ownership for all stakeholders, dilution waterfall, and liquidation preference stack. Includes ESOP pool modelling and convertible note conversion scenarios.',
    tag: 'Fundraising', format: 'Excel Template', complexity: 'Advanced', useCase: 'Dilution and exit scenario planning',
  },
  {
    id: 14,
    title: 'Customer Cohort Analysis Template',
    excerpt: 'Pre-built cohort analysis in Excel. Enter monthly revenue by acquisition cohort and the template generates retention curves, LTV by cohort, and payback period visualisations. Includes a benchmarking overlay for sector norms.',
    tag: 'Metrics', format: 'Excel Template', complexity: 'Intermediate', useCase: 'Retention and LTV visualisation for investors',
  },
  {
    id: 15,
    title: 'Hiring Decision Framework',
    excerpt: 'A structured tool for making senior hiring decisions. Covers role scoping, scorecard construction, structured interview design, reference check protocol, and a final decision matrix that forces explicit trade-off evaluation.',
    tag: 'People', format: 'Notion Template', complexity: 'Beginner', useCase: 'Reducing senior hire failure rate',
  },
  {
    id: 16,
    title: 'SaaS Metrics Dashboard',
    excerpt: 'Pre-built SaaS metrics calculator covering MRR, ARR, MoM growth, NRR, gross churn, logo churn, CAC, LTV/CAC, and payback period. Inputs are raw billing data; outputs are investor-grade metric cards with trend lines.',
    tag: 'Metrics', format: 'Excel + Google Sheets', complexity: 'Intermediate', useCase: 'Monthly SaaS health reporting',
  },
  {
    id: 17,
    title: 'Customer Discovery Interview Guide',
    excerpt: 'A structured interview protocol for conducting high-quality customer discovery conversations. Includes question bank by interview stage, synthesis template, insight clustering framework, and a decision tree for translating findings into product or positioning changes.',
    tag: 'Strategy', format: 'PDF Guide + Template', complexity: 'Beginner', useCase: 'Product and positioning validation',
  },
  {
    id: 18,
    title: 'Fundraising CRM & Process Tracker',
    excerpt: 'A Notion-based CRM purpose-built for fundraising. Tracks investor pipeline by stage, manages follow-up cadence, stores all communication history, and provides a visual status dashboard showing where your round stands at any point.',
    tag: 'Fundraising', format: 'Notion Template', complexity: 'Beginner', useCase: 'Fundraising process management',
  },
  {
    id: 19,
    title: 'Pricing Model Simulator',
    excerpt: 'Simulate the revenue impact of different pricing structures — subscription vs. usage-based vs. seat-based vs. outcome-based. Models annual recurring revenue, cash flow timing differences, and churn sensitivity for each pricing architecture.',
    tag: 'Revenue', format: 'Excel Template', complexity: 'Advanced', useCase: 'Pricing model selection and stress-testing',
  },
  {
    id: 20,
    title: 'Org Design Diagnostic',
    excerpt: 'Evaluates your current org structure against growth stage requirements. Identifies role overlaps, accountability gaps, span-of-control problems, and reporting line inefficiencies. Outputs a prioritised list of structural changes with estimated impact.',
    tag: 'Operations', format: 'Online Assessment', complexity: 'Intermediate', useCase: 'Operational restructure planning',
  },
  {
    id: 21,
    title: 'D2C Unit Economics Calculator',
    excerpt: 'Purpose-built unit economics model for direct-to-consumer brands. Covers blended CAC by channel, contribution margin by SKU, repurchase rate modelling, LTV with discounting, and a break-even analysis at different AOV and margin assumptions.',
    tag: 'Metrics', format: 'Excel Template', complexity: 'Intermediate', useCase: 'D2C profitability analysis',
  },
  {
    id: 22,
    title: 'Board Meeting Preparation Kit',
    excerpt: 'A complete template pack for preparing, running, and following up from board meetings. Includes board pack format, pre-read structure, meeting agenda template, decision log, and a 15-question prompt list for the CEO pre-read review.',
    tag: 'Operations', format: 'Template Pack', complexity: 'Beginner', useCase: 'Improving board meeting quality',
  },
  {
    id: 23,
    title: 'Breakeven & Contribution Margin Calculator',
    excerpt: 'Calculates unit-level and company-level breakeven across different revenue assumptions. Models fixed vs. variable cost splits, contribution margin by product line, and the revenue volume required for EBITDA breakeven under different headcount scenarios.',
    tag: 'Finance', format: 'Excel Template', complexity: 'Beginner', useCase: 'Financial viability assessment',
  },
  {
    id: 24,
    title: 'Competitive Landscape Mapping Tool',
    excerpt: 'A structured framework for mapping your competitive landscape across two strategic dimensions. Identifies whitespace, crowded segments, and positioning opportunities. Includes a slide-ready output and a feature comparison matrix template.',
    tag: 'Strategy', format: 'Template + Guide', complexity: 'Beginner', useCase: 'Investor and strategy pitch preparation',
  },
  {
    id: 25,
    title: 'Revenue Leakage Audit',
    excerpt: 'Systematic framework for identifying where revenue is being lost across six dimensions: pricing gaps, contract structure problems, upsell capture rate, churn root causes, billing errors, and discount discipline. Average finding: 15–30% of theoretical revenue leaking.',
    tag: 'Revenue', format: 'Excel Worksheet', complexity: 'Advanced', useCase: 'Pre-fundraise or growth plateau diagnosis',
  },

  // Batch 2 (26–50)
  {
    id: 26,
    title: 'ESOP Pool Planning Tool',
    excerpt: 'Model the size, structure, and dilutive impact of your ESOP pool across multiple funding rounds. Includes strike price scenarios, vesting schedule analysis, and a tax impact estimator for employees at different income levels.',
    tag: 'Fundraising', format: 'Excel Template', complexity: 'Advanced', useCase: 'Equity compensation planning',
  },
  {
    id: 27,
    title: 'Weekly Operating Rhythm Template',
    excerpt: 'A complete cadence design for founder-led companies — weekly, monthly, and quarterly meeting structures, agenda templates, decision log format, and a 15-minute daily standup protocol that keeps small teams aligned without meeting overhead.',
    tag: 'Operations', format: 'Notion Template', complexity: 'Beginner', useCase: 'Operational cadence design',
  },
  {
    id: 28,
    title: 'Customer Lifetime Value Modelling Tool',
    excerpt: 'Build multi-year LTV projections incorporating cohort retention curves, expansion revenue, gross margin evolution, and discount rate assumptions. Outputs LTV by acquisition channel, segment, and vintage with confidence ranges.',
    tag: 'Metrics', format: 'Excel Template', complexity: 'Advanced', useCase: 'LTV-driven CAC budget allocation',
  },
  {
    id: 29,
    title: 'Go-to-Market Strategy Canvas',
    excerpt: 'A one-page canvas for mapping the core elements of your GTM strategy — ICP definition, value proposition, channel selection, sales motion, pricing model, and competitive positioning. Includes a validation checklist and common failure pattern guide.',
    tag: 'Strategy', format: 'PDF Canvas + Guide', complexity: 'Beginner', useCase: 'New product or market GTM planning',
  },
  {
    id: 30,
    title: 'Investor Outreach Email Templates',
    excerpt: 'Twelve email templates for every stage of the investor relationship — cold outreach, warm introduction request, follow-up after meeting, post-term-sheet communication, and investor update formats. Each template includes guidance notes and common mistakes to avoid.',
    tag: 'Fundraising', format: 'Template Pack', complexity: 'Beginner', useCase: 'Fundraising communication',
  },
  {
    id: 31,
    title: 'Churn Root Cause Diagnostic',
    excerpt: 'A structured six-step diagnostic for identifying the primary cause of customer churn. Works through product, onboarding, customer success, pricing, competitive, and relationship failure modes. Outputs a ranked hypothesis list with data collection requirements for each.',
    tag: 'Revenue', format: 'Online Tool', complexity: 'Intermediate', useCase: 'Churn reduction prioritisation',
  },
  {
    id: 32,
    title: 'Scenario Planning Model',
    excerpt: 'Three-scenario financial model (base, upside, downside) with a single input sheet driving all outputs. Includes revenue, headcount, burn, and runway outputs for each scenario, plus a decision matrix linking scenario triggers to prescribed management responses.',
    tag: 'Finance', format: 'Excel Template', complexity: 'Intermediate', useCase: 'Board-level scenario planning',
  },
  {
    id: 33,
    title: 'Sales Compensation Design Tool',
    excerpt: 'Design a sales compensation structure that aligns incentives with business goals. Models total OTE, base/variable split, quota-setting methodology, accelerator tiers, and the margin impact of different attainment scenarios.',
    tag: 'Revenue', format: 'Excel Template', complexity: 'Intermediate', useCase: 'Sales incentive structure design',
  },
  {
    id: 34,
    title: 'Product Roadmap Prioritisation Framework',
    excerpt: 'A scoring model for prioritising your product backlog against business outcomes rather than feature requests. Uses a weighted matrix across customer value, strategic alignment, technical complexity, and revenue impact with a forced-rank output.',
    tag: 'Strategy', format: 'Notion + Excel', complexity: 'Intermediate', useCase: 'Product strategy and backlog management',
  },
  {
    id: 35,
    title: 'Fundraising Data Room Checklist',
    excerpt: 'Exhaustive checklist of everything investors expect in a data room at seed through Series B — financial documents, legal documents, operational metrics, customer data, and team information. Includes priority sequencing for different investor types.',
    tag: 'Fundraising', format: 'PDF Checklist', complexity: 'Beginner', useCase: 'Due diligence preparation',
  },
  {
    id: 36,
    title: 'NPS and Customer Satisfaction Analyser',
    excerpt: 'Template for collecting, segmenting, and analysing NPS data. Includes the survey design, segment breakdown by cohort, correlation analysis with retention, and an action planning framework that converts NPS responses into specific product or CS improvements.',
    tag: 'Metrics', format: 'Excel + Survey Template', complexity: 'Beginner', useCase: 'Customer satisfaction measurement',
  },
  {
    id: 37,
    title: 'Content Strategy Framework',
    excerpt: 'Structured approach to building a content strategy aligned with your GTM motion. Covers audience mapping, content pillar definition, channel prioritisation, production workflow, and a measurement framework connecting content activity to pipeline metrics.',
    tag: 'Strategy', format: 'Template Pack', complexity: 'Intermediate', useCase: 'Inbound and thought leadership strategy',
  },
  {
    id: 38,
    title: 'Term Sheet Annotator',
    excerpt: 'An annotated guide to every clause in a standard Indian seed/Series A term sheet. Explains the investor rationale behind each term, founder-friendly vs. investor-friendly variants, red flags to negotiate, and the deal-level impact of each provision.',
    tag: 'Fundraising', format: 'PDF Guide', complexity: 'Intermediate', useCase: 'Term sheet review and negotiation',
  },
  {
    id: 39,
    title: 'Headcount Planning Model',
    excerpt: 'Forward-looking headcount model by function and seniority. Links hiring plan to revenue assumptions, models the lag between hire and productivity, estimates total cost of employment, and projects headcount-driven burn across a 24-month planning horizon.',
    tag: 'Operations', format: 'Excel Template', complexity: 'Intermediate', useCase: 'Hiring plan and burn forecasting',
  },
  {
    id: 40,
    title: 'Founder 360 Self-Assessment',
    excerpt: 'A structured 360-degree self-assessment covering the six competency domains founders need to develop across different company stages. Produces a personalised gap analysis and a prioritised development roadmap based on your current stage and next milestone.',
    tag: 'People', format: 'Online Assessment', complexity: 'Beginner', useCase: 'Founder development planning',
  },
  {
    id: 41,
    title: 'Financial Health Scorecard',
    excerpt: 'A 12-metric scorecard for assessing the financial health of an early-stage startup. Covers burn multiple, rule of 40, gross margin, net revenue retention, CAC payback, working capital ratio, and runway — with benchmarks and traffic-light scoring.',
    tag: 'Finance', format: 'Excel Template', complexity: 'Intermediate', useCase: 'Monthly financial health review',
  },
  {
    id: 42,
    title: 'Partnership Agreement Evaluation Framework',
    excerpt: 'Structured framework for evaluating whether a proposed commercial partnership is worth pursuing. Assesses strategic alignment, incentive structure, exit provisions, operational burden, opportunity cost, and the conditions that make the partnership reversible.',
    tag: 'Strategy', format: 'PDF Framework', complexity: 'Intermediate', useCase: 'Strategic partnership evaluation',
  },
  {
    id: 43,
    title: 'Customer Onboarding Audit Tool',
    excerpt: 'Diagnoses your current onboarding experience across five dimensions: time-to-value, activation checkpoint design, user communication cadence, failure detection, and human touchpoint appropriateness. Produces a scored assessment with improvement priorities.',
    tag: 'Revenue', format: 'Online Tool', complexity: 'Intermediate', useCase: 'Activation rate improvement',
  },
  {
    id: 44,
    title: 'Exit Scenario Planner',
    excerpt: 'Models founder and shareholder returns across different exit scenarios — acquisition at various multiples, IPO, secondary sale, and wind-down. Incorporates liquidation preference stacks, ESOP treatment, and carry calculations for each stakeholder.',
    tag: 'Fundraising', format: 'Excel Template', complexity: 'Advanced', useCase: 'Exit planning and stakeholder alignment',
  },
  {
    id: 45,
    title: 'Competitive Pricing Intelligence Template',
    excerpt: 'A structured template for tracking competitor pricing, packaging, and positioning changes over time. Includes a data collection protocol, analysis framework, and a quarterly review process that translates competitive pricing moves into actionable responses.',
    tag: 'Revenue', format: 'Notion Template', complexity: 'Beginner', useCase: 'Ongoing competitive pricing monitoring',
  },
  {
    id: 46,
    title: 'Annual Operating Plan Template',
    excerpt: 'A complete AOP framework for founder-led companies — top-down strategy translation, function-level goal setting, budget allocation, initiative prioritisation, and the quarterly review cadence that keeps the plan alive rather than forgotten by February.',
    tag: 'Operations', format: 'Excel + Notion', complexity: 'Advanced', useCase: 'Annual planning process',
  },
  {
    id: 47,
    title: 'Customer Segmentation Model',
    excerpt: 'Segment your customer base by revenue, engagement, growth potential, and strategic fit. Produces a four-quadrant portfolio view, identifies which segments to invest in, defend, harvest, or exit, and models the revenue impact of each choice.',
    tag: 'Strategy', format: 'Excel Template', complexity: 'Intermediate', useCase: 'Customer portfolio strategy',
  },
  {
    id: 48,
    title: 'Investor Update Template — Monthly & Quarterly',
    excerpt: 'Two templates — one for monthly updates, one for quarterly board updates — structured to maintain investor confidence, share bad news constructively, demonstrate learning velocity, and reduce the time founders spend on reporting.',
    tag: 'Fundraising', format: 'Template Pack', complexity: 'Beginner', useCase: 'Investor relations management',
  },
  {
    id: 49,
    title: 'Working Capital Optimisation Tool',
    excerpt: 'Analyses your working capital cycle — AR days, AP days, inventory turns — and models the cash flow impact of improving each dimension. Identifies the single highest-leverage intervention for your specific working capital profile.',
    tag: 'Finance', format: 'Excel Template', complexity: 'Intermediate', useCase: 'Cash flow optimisation without fundraising',
  },
  {
    id: 50,
    title: 'Marketing Attribution Model',
    excerpt: 'Multi-touch attribution model for B2B and B2C marketing channels. Compares first-touch, last-touch, linear, time-decay, and data-driven attribution outputs. Helps reallocate budget based on true channel contribution to pipeline and revenue.',
    tag: 'Metrics', format: 'Excel + Sheets', complexity: 'Advanced', useCase: 'Marketing budget allocation',
  },

  // Batch 3 (51–75)
  {
    id: 51,
    title: 'Strategy on a Page Template',
    excerpt: 'A structured one-page format for articulating your company\'s strategy clearly enough that every employee can explain it. Covers mission, 3-year ambition, strategic priorities, key bets, and success metrics — with a facilitation guide for the leadership workshop.',
    tag: 'Strategy', format: 'Template + Guide', complexity: 'Beginner', useCase: 'Strategic clarity and team alignment',
  },
  {
    id: 52,
    title: 'Gross Margin Improvement Calculator',
    excerpt: 'Models the gross margin impact of changes to COGS, pricing, product mix, channel mix, and customer segment mix. Surfaces the two or three changes that produce the most margin improvement with the least operational disruption.',
    tag: 'Finance', format: 'Excel Template', complexity: 'Intermediate', useCase: 'Margin improvement prioritisation',
  },
  {
    id: 53,
    title: 'Post-Mortem Analysis Template',
    excerpt: 'Structured framework for conducting post-mortems on failed initiatives, missed targets, and significant mistakes. Separates causal analysis from blame, produces actionable system-level recommendations, and tracks whether changes were actually implemented.',
    tag: 'Operations', format: 'Notion Template', complexity: 'Beginner', useCase: 'Learning from failure systematically',
  },
  {
    id: 54,
    title: 'Channel Strategy Evaluation Tool',
    excerpt: 'Evaluates potential go-to-market channels across eight dimensions: CAC, scalability, control, speed to validate, capital requirement, competitive intensity, feedback quality, and strategic fit. Forces explicit trade-off comparison between up to six channels.',
    tag: 'Strategy', format: 'Excel Template', complexity: 'Intermediate', useCase: 'GTM channel selection and prioritisation',
  },
  {
    id: 55,
    title: 'Revenue Recognition & Deferred Revenue Tracker',
    excerpt: 'For SaaS and services companies with annual or multi-year contracts. Tracks deferred revenue balances, models recognition timing, produces GAAP-compliant revenue schedules, and generates the reconciliation between billings, bookings, and recognised revenue.',
    tag: 'Finance', format: 'Excel Template', complexity: 'Advanced', useCase: 'GAAP revenue recognition for investor reporting',
  },
  {
    id: 56,
    title: 'Churn Cohort Visualisation Tool',
    excerpt: 'Transforms your subscription revenue data into cohort-level churn visualisations. Shows monthly and annual retention by cohort, identifies inflection points in the retention curve, and benchmarks performance against sector medians.',
    tag: 'Metrics', format: 'Excel Template', complexity: 'Intermediate', useCase: 'Churn trend analysis and investor reporting',
  },
  {
    id: 57,
    title: 'Negotiation Preparation Framework',
    excerpt: 'Structured preparation tool for high-stakes negotiations — fundraising, partnerships, hiring, and commercial contracts. Covers BATNA mapping, reservation price setting, value-creation moves, and scenario planning for the most likely counterparty responses.',
    tag: 'Strategy', format: 'PDF Framework', complexity: 'Intermediate', useCase: 'Pre-negotiation strategic preparation',
  },
  {
    id: 58,
    title: 'Performance Management Toolkit',
    excerpt: 'A complete performance management system for 10–50 person companies. Covers goal-setting, 1:1 cadence, performance review format, feedback delivery protocol, improvement plan template, and the documentation required for a fair exit process.',
    tag: 'People', format: 'Notion Template Pack', complexity: 'Intermediate', useCase: 'Building a performance culture',
  },
  {
    id: 59,
    title: 'Expansion Revenue Modelling Tool',
    excerpt: 'Models NRR improvement scenarios through upsell, cross-sell, and seat expansion motions. Shows how different expansion rates compound over 24 months and what expansion is worth in terms of CAC payback reduction and ARR growth acceleration.',
    tag: 'Revenue', format: 'Excel Template', complexity: 'Intermediate', useCase: 'Customer expansion strategy',
  },
  {
    id: 60,
    title: 'Risk Register & Mitigation Tracker',
    excerpt: 'A structured risk identification and monitoring tool for early-stage companies. Covers strategic, operational, financial, regulatory, and people risks. Includes a probability/impact matrix, mitigation action tracker, and a quarterly review protocol.',
    tag: 'Operations', format: 'Notion Template', complexity: 'Beginner', useCase: 'Board-level risk governance',
  },
  {
    id: 61,
    title: 'Burn Multiple Calculator',
    excerpt: 'Calculates your burn multiple — net burn divided by net new ARR — and benchmarks it against stage-appropriate norms. Models the operational changes required to reach efficient growth thresholds and shows the fundraising impact of different efficiency trajectories.',
    tag: 'Finance', format: 'Excel Template', complexity: 'Beginner', useCase: 'Capital efficiency benchmarking',
  },
  {
    id: 62,
    title: 'Sales Process Design Toolkit',
    excerpt: 'Framework for designing or auditing a B2B sales process. Covers stage definitions, exit criteria, buyer activity alignment, qualification methodology, CRM field design, and the management cadence required to make the process repeatable.',
    tag: 'Revenue', format: 'Template + Guide', complexity: 'Intermediate', useCase: 'Sales process design and documentation',
  },
  {
    id: 63,
    title: 'Product-Market Fit Diagnostic',
    excerpt: 'Sean Ellis-inspired PMF survey with updated analysis framework. Produces a PMF score, segment breakdown of responses, and a structured interpretation guide that tells you whether you have PMF, who you have it with, and what the weakest holding points are.',
    tag: 'Strategy', format: 'Survey + Analysis Template', complexity: 'Beginner', useCase: 'PMF measurement and interpretation',
  },
  {
    id: 64,
    title: 'Gross Revenue Retention Calculator',
    excerpt: 'Calculates GRR from your billing data, decomposes churn into logo churn, contraction, and pricing churn, and benchmarks against sector norms. Includes a sensitivity model showing how GRR improvement translates to company valuation at different ARR multiples.',
    tag: 'Metrics', format: 'Excel Template', complexity: 'Intermediate', useCase: 'SaaS health and investor reporting',
  },
  {
    id: 65,
    title: 'Founder Compensation Benchmarking Tool',
    excerpt: 'Benchmark founder salary and equity against stage-appropriate norms across Indian startups. Covers cash compensation, equity refreshes, and the structural trade-offs between paying founders below-market versus preserving runway.',
    tag: 'People', format: 'Online Tool', complexity: 'Beginner', useCase: 'Founder compensation decisions',
  },
  {
    id: 66,
    title: 'Customer Success Playbook Template',
    excerpt: 'A complete CS playbook framework — onboarding tracks, health score definitions, EBR cadence, renewal process, expansion trigger mapping, and escalation protocols. Designed for CS teams of 2–10 people at companies with 50–500 customers.',
    tag: 'Revenue', format: 'Notion Template Pack', complexity: 'Intermediate', useCase: 'Customer success systemisation',
  },
  {
    id: 67,
    title: 'Operations Health Diagnostic',
    excerpt: 'A 40-question diagnostic covering meeting effectiveness, decision-making clarity, information flow, cross-functional coordination, and execution discipline. Produces an operational maturity score with specific, prioritised improvement recommendations.',
    tag: 'Operations', format: 'Online Assessment', complexity: 'Intermediate', useCase: 'Operational baseline assessment',
  },
  {
    id: 68,
    title: 'Demand Forecasting Model',
    excerpt: 'Statistical demand forecasting model for consumer and B2B companies. Incorporates seasonality, trend, and external variables. Produces monthly forecasts with confidence intervals and a scenario overlay for promotional or macroeconomic shocks.',
    tag: 'Metrics', format: 'Excel Template', complexity: 'Advanced', useCase: 'Supply chain and capacity planning',
  },
  {
    id: 69,
    title: 'Delegation Decision Tool',
    excerpt: 'A structured framework for deciding which decisions to delegate, to whom, and with what level of authority. Produces a decision rights matrix for your team and identifies where authority is currently misaligned with capability.',
    tag: 'Operations', format: 'Template + Guide', complexity: 'Beginner', useCase: 'Founder delegation and time recovery',
  },
  {
    id: 70,
    title: 'Convertible Note / SAFE Modelling Tool',
    excerpt: 'Models the conversion economics of SAFEs and convertible notes at a qualified financing. Shows post-money ownership for all stakeholders, the effective price paid by note-holders, and sensitivity to different valuation caps and discount rates.',
    tag: 'Fundraising', format: 'Excel Template', complexity: 'Advanced', useCase: 'Pre-seed and bridge round planning',
  },
  {
    id: 71,
    title: 'Investor Sentiment Tracker',
    excerpt: 'Tracks every investor interaction across your active fundraise — meetings, responses, stated objections, and follow-up commitments. Surfaces patterns in what is resonating and what is generating friction, enabling real-time narrative adjustment.',
    tag: 'Fundraising', format: 'Notion Template', complexity: 'Beginner', useCase: 'Active fundraise management',
  },
  {
    id: 72,
    title: 'COGS Decomposition Tool',
    excerpt: 'Decomposes your cost of goods sold into its structural components and models the gross margin impact of changes to each. Identifies which COGS drivers are fixed, semi-variable, and variable — and what scale does to each category.',
    tag: 'Finance', format: 'Excel Template', complexity: 'Intermediate', useCase: 'Gross margin improvement analysis',
  },
  {
    id: 73,
    title: 'B2B ICP Definition Framework',
    excerpt: 'Structured framework for defining your Ideal Customer Profile with precision. Covers firmographic, technographic, behavioural, and situational ICP dimensions, plus a validation protocol for testing ICP assumptions against your actual best customers.',
    tag: 'Strategy', format: 'Template + Guide', complexity: 'Beginner', useCase: 'Sales and marketing ICP alignment',
  },
  {
    id: 74,
    title: 'Fundraising Valuation Negotiation Guide',
    excerpt: 'A practical guide to negotiating your valuation in a seed or Series A round. Covers anchor-setting, comparable selection, the investor\'s valuation framework, negotiation sequencing, and the points at which walking away creates leverage.',
    tag: 'Fundraising', format: 'PDF Guide', complexity: 'Intermediate', useCase: 'Valuation negotiation preparation',
  },
  {
    id: 75,
    title: 'Strategic Decision Journal',
    excerpt: 'A structured template for logging major strategic decisions as they are made. Records the context, options considered, decision made, the assumptions it depends on, and a 90-day review date. Creates an institutional memory of how the company thinks and learns.',
    tag: 'Strategy', format: 'Notion Template', complexity: 'Beginner', useCase: 'Strategic learning and decision quality',
  },
];

const BATCH_SIZE = 25;

// =====================================================
// ADVERTISEMENT DATA
// =====================================================

const FEATURED_REPORTS: ReportTeaser[] = [
  { title: 'Indian Startup Ecosystem Report 2026', pages: '142 pages', date: 'Feb 2026', tag: 'Annual Report' },
  { title: 'Unit Economics Benchmarks by Sector 2025', pages: '48 pages', date: 'Oct 2025', tag: 'Benchmarks' },
  { title: 'The Fundability Framework — Investor Expectation Report', pages: '52 pages', date: 'Jun 2025', tag: 'Framework' },
];

const FEATURED_CASE_STUDIES: CaseStudyTeaser[] = [
  { title: 'A Pricing Audit That Added 40% to Revenue', tag: 'Revenue', sector: 'B2B SaaS', outcome: '+40% revenue', year: '2024' },
  { title: 'Cash Runway Extension Without Cutting Product', tag: 'Finance', sector: 'Edtech', outcome: '+8 months runway', year: '2023' },
  { title: 'When the Market Wasn\'t Wrong, the Segment Was', tag: 'PMF', sector: 'Healthtech', outcome: 'PMF achieved', year: '2024' },
];

// =====================================================
// TAG & COMPLEXITY COLOR MAPS — blues from homepage palette
// =====================================================

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Valuation:   { bg: '#DBEAFE', text: '#1E40AF' },
  Finance:     { bg: '#E0F2FE', text: '#0369A1' },
  Metrics:     { bg: '#E6F0FF', text: '#1E3A8A' },
  Strategy:    { bg: '#DBEAFE', text: '#1E40AF' },
  Revenue:     { bg: '#E0F2FE', text: '#0369A1' },
  Fundraising: { bg: '#E6F0FF', text: '#1E3A8A' },
  People:      { bg: '#E0E7FF', text: '#3730A3' },
  Operations:  { bg: '#DBEAFE', text: '#1E40AF' },
};

const COMPLEXITY_COLORS: Record<Tool['complexity'], { bg: string; text: string; dot: string }> = {
  Beginner:     { bg: '#DBEAFE', text: '#1E40AF', dot: '#3B82F6' },
  Intermediate: { bg: '#E0F2FE', text: '#0369A1', dot: '#2563EB' },
  Advanced:     { bg: '#E6F0FF', text: '#1E3A8A', dot: '#1E3A8A' },
};

const getTagStyle = (tag: string): { bg: string; text: string } =>
  TAG_COLORS[tag] ?? { bg: '#DBEAFE', text: '#1E40AF' };

const getComplexityStyle = (c: Tool['complexity']) => COMPLEXITY_COLORS[c];

// =====================================================
// ALL FILTER TAGS
// =====================================================

const ALL_TAGS: string[] = [
  'All', 'Finance', 'Revenue', 'Fundraising', 'Strategy',
  'Metrics', 'Operations', 'People', 'Valuation',
];

// =====================================================
// PARTNER AUTH MODAL — matches homepage modal
// =====================================================

interface PartnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle: string;
}

const PartnerAuthModal: FC<PartnerAuthModalProps> = ({ isOpen, onClose, resourceTitle }) => {
  const [formData, setFormData]         = useState<PartnerFormData>({ partnerId: '', password: '' });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading]           = useState<boolean>(false);
  const [error, setError]               = useState<string>('');
  const [success, setSuccess]           = useState<boolean>(false);

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
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">

          {/* Modal Header — plain white with border */}
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
              Enter your partner credentials to access: <span className="font-medium text-gray-700">{resourceTitle}</span>
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
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
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
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
                  className={`w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm ${
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
                  ) : 'Access Tool'}
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
                  Opening <span className="font-medium text-gray-700">{resourceTitle}</span>…
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
// HERO SECTION — dark blue with placeholder SVG
// =====================================================

const HeroSection: FC = () => (
  <section
    className="relative overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8"
    style={{ backgroundColor: '#0A1E3D', minHeight: '520px' }}
  >
    {/* Background crosshatch texture using blue-300 */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cross" patternUnits="userSpaceOnUse" width="20" height="20">
            <line x1="10" y1="0" x2="10" y2="20" stroke="#93C5FD" strokeWidth="0.6" />
            <line x1="0" y1="10" x2="20" y2="10" stroke="#93C5FD" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cross)" />
      </svg>
      {/* Blue glow — top right */}
      <div
        className="absolute -top-20 right-0 w-[650px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(59,130,246,0.15) 0%, transparent 60%)' }}
      />
      {/* Blue glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[450px] h-[350px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(96,165,250,0.08) 0%, transparent 65%)' }}
      />
    </div>

    <div className="max-w-7xl mx-auto relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT — Headline */}
        <div className="space-y-8">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{
              backgroundColor: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.16)',
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: '#93C5FD' }}
            />
            <span className="text-xs font-medium tracking-widest uppercase text-blue-300">
              Sarsen &amp; Company · Tools
            </span>
          </div>

          <div className="space-y-4">
            <h1
              className="font-light leading-none tracking-tight text-white"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              Built to
              <br />
              <span className="text-blue-300">Decide.</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed max-w-md font-light text-gray-400">
              Calculators, templates, and frameworks for founders who make decisions with evidence. Every tool is built around a real decision, not a generic concept.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-2">
            {[
              { value: '75+', label: 'Tools available'   },
              { value: '8',   label: 'Categories'        },
              { value: '3',   label: 'Complexity levels' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-light text-white">{stat.value}</p>
                <p className="text-xs tracking-widest uppercase mt-0.5 text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Complexity legend */}
          <div className="flex flex-wrap gap-4 pt-1">
            {(['Beginner', 'Intermediate', 'Advanced'] as Tool['complexity'][]).map((level) => {
              const cs = getComplexityStyle(level);
              return (
                <div key={level} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cs.dot }} />
                  <span className="text-xs" style={{ color: cs.text }}>{level}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — SVG placeholder (decorative) */}
        <div
          className="relative hidden lg:flex items-center justify-end"
          style={{ height: '420px' }}
          aria-hidden="true"
        >
          <div className="relative w-full max-w-lg h-full flex items-center justify-center">
            <span
              className="absolute select-none"
              style={{
                fontSize: '22rem',
                color: 'rgba(59,130,246,0.05)',
                lineHeight: 1,
                top: '-2rem',
                right: '-1rem',
              }}
            >
              &ldquo;
            </span>
            <div className="relative z-10 space-y-3 w-72">
              {[90, 75, 60, 85, 50, 70, 40].map((w, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    height: '3px',
                    width: `${w}%`,
                    background: `rgba(59,130,246,${0.06 + i * 0.04})`,
                  }}
                />
              ))}
              <div
                className="mt-6 rounded-full"
                style={{ height: '2px', width: '30%', background: 'rgba(59,130,246,0.35)' }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

// =====================================================
// TAG FILTER BAR — blue palette
// =====================================================

interface TagFilterBarProps {
  activeTag: string;
  onTagChange: (tag: string) => void;
}

const TagFilterBar: FC<TagFilterBarProps> = ({ activeTag, onTagChange }) => (
  <div
    className="flex gap-2 overflow-x-auto pb-1"
    style={{ scrollbarWidth: 'none' } as React.CSSProperties}
    role="toolbar"
    aria-label="Filter tools by category"
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
          className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={
            isActive
              ? { backgroundColor: '#132B47', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.40)' }
              : { backgroundColor: style.bg, color: style.text, border: '1px solid transparent', opacity: 0.65 }
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
// FEATURED TOOL CARD — full-width, first item only
// =====================================================

interface FeaturedToolCardProps {
  tool: Tool;
  onOpen: (title: string) => void;
}

const FeaturedToolCard: FC<FeaturedToolCardProps> = ({ tool, onOpen }) => {
  const tagStyle        = getTagStyle(tool.tag);
  const complexityStyle = getComplexityStyle(tool.complexity);

  return (
    <article
      onClick={() => onOpen(tool.title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(tool.title)}
      className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.10)' }}
      aria-label={`Access tool: ${tool.title}`}
    >
      {/* Header */}
      <div
        className="relative h-44 sm:h-52 px-8 sm:px-10 flex items-end pb-7 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #132B47 0%, #0A1E3D 65%)' }}
      >
        {/* Grid decoration */}
        <div className="absolute inset-0 overflow-hidden opacity-10" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 600 220">
            {Array.from({ length: 16 }, (_, i) => (
              <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="220" stroke="#93C5FD" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 6 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 40} x2="600" y2={i * 40} stroke="#93C5FD" strokeWidth="0.5" />
            ))}
          </svg>
        </div>

        <div className="relative z-10 flex items-center gap-3 flex-wrap">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {tool.tag}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: 'rgba(59,130,246,0.08)', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.14)' }}
          >
            Featured
          </span>
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: complexityStyle.bg, color: complexityStyle.text }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: complexityStyle.dot }} />
            {tool.complexity}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 sm:px-10 py-6 sm:py-8">
        <h2
          className="font-light leading-snug mb-2 group-hover:text-blue-300 transition-colors duration-200 text-white"
          style={{ fontSize: 'clamp(1.1rem,2.5vw,1.6rem)' }}
        >
          {tool.title}
        </h2>
        <p className="text-xs mb-1 font-medium text-blue-300">
          {tool.useCase}
        </p>
        <p className="text-sm leading-relaxed mb-6 max-w-3xl text-gray-400">
          {tool.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="px-2.5 py-1 rounded-md text-xs"
              style={{ backgroundColor: '#132B47', color: '#93C5FD' }}
            >
              {tool.format}
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 text-xs font-medium group-hover:gap-3 transition-all duration-200 text-blue-300"
          >
            Access tool
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
};

// =====================================================
// STANDARD TOOL CARD — 3-column grid
// =====================================================

interface ToolCardProps {
  tool: Tool;
  onOpen: (title: string) => void;
  animIndex: number;
}

const ToolCard: FC<ToolCardProps> = ({ tool, onOpen, animIndex }) => {
  const tagStyle        = getTagStyle(tool.tag);
  const complexityStyle = getComplexityStyle(tool.complexity);

  return (
    <article
      onClick={() => onOpen(tool.title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(tool.title)}
      className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      style={{
        backgroundColor: '#0A1E3D',
        border: '1px solid rgba(59,130,246,0.08)',
        animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${animIndex * 45}ms both`,
      }}
      aria-label={`Access tool: ${tool.title}`}
    >
      {/* Top accent line */}
      <div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, ${tagStyle.text}30, transparent)` }}
      />

      {/* Header band */}
      <div
        className="relative h-28 px-5 flex items-end pb-4 overflow-hidden"
        style={{ background: 'linear-gradient(155deg, #132B47 0%, #0A1E3D 100%)' }}
      >
        {/* Subtle grid bg */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.04]" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 200 112">
            {Array.from({ length: 6 }, (_, i) => (
              <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="112" stroke="#93C5FD" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 3 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 40} x2="200" y2={i * 40} stroke="#93C5FD" strokeWidth="0.5" />
            ))}
          </svg>
        </div>

        <div className="relative z-10 flex items-center gap-2 flex-wrap">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {tool.tag}
          </span>
          <span
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
            style={{ backgroundColor: complexityStyle.bg, color: complexityStyle.text }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: complexityStyle.dot }} />
            {tool.complexity}
          </span>
        </div>

        {/* Lock icon */}
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
        <p className="text-xs mb-1 font-medium text-blue-300">
          {tool.useCase}
        </p>
        <h3
          className="font-medium leading-snug mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 text-white"
          style={{ fontSize: '0.9rem' }}
        >
          {tool.title}
        </h3>
        <p className="text-xs leading-relaxed mb-4 line-clamp-2 text-gray-400">
          {tool.excerpt}
        </p>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid rgba(59,130,246,0.07)' }}
        >
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{ backgroundColor: '#132B47', color: '#93C5FD' }}
          >
            {tool.format}
          </span>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
            style={{ backgroundColor: 'rgba(59,130,246,0.06)' }}
            aria-hidden="true"
          >
            <svg className="w-3 h-3" fill="none" stroke="#93C5FD" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
};

// =====================================================
// REPORTS ADVERTISEMENT STRIP — after batch 1 (blues)
// =====================================================

interface ReportsStripProps {
  onReportClick: (title: string) => void;
}

const ReportsAdvertStrip: FC<ReportsStripProps> = ({ onReportClick }) => (
  <div
    className="my-12 rounded-2xl overflow-hidden"
    style={{ backgroundColor: '#132B47', border: '1px solid rgba(59,130,246,0.12)' }}
  >
    <div className="px-6 sm:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}
          >
            <svg className="w-4 h-4 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-blue-300">
              Research &amp; Reports
            </p>
            <p className="text-sm font-light text-gray-400">
              Data behind the decisions
            </p>
          </div>
        </div>
        <a
          href="/resources/reports"
          className="text-xs font-medium flex items-center gap-1 text-blue-300 hover:opacity-80 transition-opacity"
        >
          All Reports
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {FEATURED_REPORTS.map((r) => (
          <div
            key={r.title}
            onClick={() => onReportClick(r.title)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onReportClick(r.title)}
            className="group cursor-pointer rounded-xl p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.08)' }}
            aria-label={`Access report: ${r.title}`}
          >
            <span
              className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2"
              style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#93C5FD' }}
            >
              {r.tag}
            </span>
            <p
              className="text-sm font-medium leading-snug mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 text-white"
            >
              {r.title}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-400">{r.pages}</span>
              <span className="text-xs text-gray-600">·</span>
              <span className="text-xs text-gray-500">{r.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// =====================================================
// CASE STUDIES ADVERTISEMENT STRIP — after batch 2 (blues)
// =====================================================

interface CaseStudiesStripProps {
  onCaseStudyClick: (title: string) => void;
}

const CaseStudiesAdvertStrip: FC<CaseStudiesStripProps> = ({ onCaseStudyClick }) => (
  <div
    className="my-12 rounded-2xl overflow-hidden"
    style={{ backgroundColor: '#132B47', border: '1px solid rgba(59,130,246,0.12)' }}
  >
    <div className="px-6 sm:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}
          >
            <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-blue-300">
              Case Studies
            </p>
            <p className="text-sm font-light text-gray-400">
              See the tools in action
            </p>
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

      <div className="grid sm:grid-cols-3 gap-4">
        {FEATURED_CASE_STUDIES.map((cs) => (
          <div
            key={cs.title}
            onClick={() => onCaseStudyClick(cs.title)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onCaseStudyClick(cs.title)}
            className="group cursor-pointer rounded-xl p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.08)' }}
            aria-label={`View case study: ${cs.title}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#93C5FD' }}
              >
                {cs.tag}
              </span>
              <span
                className="inline-block px-2 py-0.5 rounded-full text-xs"
                style={{ backgroundColor: 'rgba(59,130,246,0.08)', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.12)' }}
              >
                {cs.outcome}
              </span>
            </div>
            <p
              className="text-sm font-medium leading-snug mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 text-white"
            >
              {cs.title}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{cs.sector}</span>
              <span className="text-xs text-gray-600">·</span>
              <span className="text-xs text-gray-500">{cs.year}</span>
            </div>
          </div>
        ))}
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
  onVisible, loading, hasMore, totalCount,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) onVisible(); },
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
          <span className="text-sm tracking-wide">Loading more tools…</span>
        </div>
      )}
      {!loading && !hasMore && (
        <p className="text-sm text-gray-500">
          All {totalCount} tools loaded.
        </p>
      )}
    </div>
  );
};

// =====================================================
// PAGE ROOT COMPONENT
// =====================================================

export default function ToolsHubPage(): React.JSX.Element {
  const [activeTag, setActiveTag]     = useState<string>('All');
  const [loadedCount, setLoadedCount] = useState<number>(BATCH_SIZE);
  const [isLoading, setIsLoading]     = useState<boolean>(false);
  const [modalState, setModalState]   = useState<ModalState>({ open: false, title: '' });

  const filteredTools: Tool[] =
    activeTag === 'All' ? ALL_TOOLS : ALL_TOOLS.filter((t) => t.tag === activeTag);

  const visibleTools: Tool[] = filteredTools.slice(0, loadedCount);
  const hasMore: boolean     = loadedCount < filteredTools.length;

  useEffect(() => { setLoadedCount(BATCH_SIZE); }, [activeTag]);

  const loadMore = useCallback((): void => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setLoadedCount((prev) => Math.min(prev + BATCH_SIZE, filteredTools.length));
      setIsLoading(false);
    }, 600);
  }, [isLoading, hasMore, filteredTools.length]);

  const openModal  = (title: string): void => setModalState({ open: true, title });
  const closeModal = (): void => setModalState({ open: false, title: '' });

  const batch1: Tool[]             = visibleTools.slice(0, 25);
  const batch2: Tool[]             = visibleTools.slice(25, 50);
  const batch3: Tool[]             = visibleTools.slice(50);
  const featured: Tool | undefined = batch1[0];
  const restBatch1: Tool[]         = batch1.slice(1);

  const showReportsStrip     = visibleTools.length >= 25;
  const showCaseStudiesStrip = visibleTools.length >= 50;

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

        <HeroSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

          {/* Filter bar + count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <TagFilterBar activeTag={activeTag} onTagChange={setActiveTag} />
            <p className="text-sm flex-shrink-0 text-gray-500">
              {filteredTools.length}{' '}
              {filteredTools.length !== 1 ? 'tools' : 'tool'}
              {activeTag !== 'All' && (
                <> in <em className="text-blue-600">{activeTag}</em></>
              )}
            </p>
          </div>

          {/* Batch 1 */}
          {featured && (
            <div className="mb-8">
              <FeaturedToolCard tool={featured} onOpen={openModal} />
            </div>
          )}
          {restBatch1.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {restBatch1.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} onOpen={openModal} animIndex={i} />
              ))}
            </div>
          )}

          {/* Reports ad strip */}
          {showReportsStrip && <ReportsAdvertStrip onReportClick={openModal} />}

          {/* Batch 2 */}
          {batch2.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {batch2.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} onOpen={openModal} animIndex={i} />
              ))}
            </div>
          )}

          {/* Case studies ad strip */}
          {showCaseStudiesStrip && <CaseStudiesAdvertStrip onCaseStudyClick={openModal} />}

          {/* Batch 3 */}
          {batch3.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {batch3.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} onOpen={openModal} animIndex={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredTools.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-4xl mb-4">🔩</p>
              <p className="text-lg font-light mb-1 text-gray-900">
                No tools in &ldquo;{activeTag}&rdquo; yet
              </p>
              <p className="text-sm text-gray-500">
                Try a different category or{' '}
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
          {filteredTools.length > 0 && (
            <LoadMoreSentinel
              onVisible={loadMore}
              loading={isLoading}
              hasMore={hasMore}
              totalCount={filteredTools.length}
            />
          )}

        </div>
      </main>

      <PartnerAuthModal
        isOpen={modalState.open}
        onClose={closeModal}
        resourceTitle={modalState.title}
      />
    </>
  );
}
