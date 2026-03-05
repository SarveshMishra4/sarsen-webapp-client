'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  FC,
  ReactNode,
  MouseEvent,
  FormEvent,
  ChangeEvent,
} from 'react';

// =====================================================
// TYPE DEFINITIONS
// =====================================================

/** A single case study item */
interface CaseStudy {
  id: number;
  title: string;
  excerpt: string;
  tag: string;
  sector: string;
  year: string;
  outcome: string;       // e.g. "Revenue +40%"
  duration: string;      // e.g. "6 months"
  featured?: boolean;
}

/** Blog teaser shown in advertisement strip */
interface BlogTeaser {
  title: string;
  tag: string;
  readTime: string;
  date: string;
}

/** Report teaser shown in advertisement strip */
interface ReportTeaser {
  title: string;
  pages: string;
  date: string;
  tag: string;
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
// CASE STUDY DATA — 75 studies, loaded 25 at a time
// =====================================================

const ALL_CASE_STUDIES: CaseStudy[] = [
  // ── Batch 1 (1–25) ─────────────────────────────────────────────────────────
  { id: 1,  title: 'From ₹80L to ₹5Cr: Restructuring a Fragile Revenue Base',        excerpt: 'A B2B SaaS founder had built impressive ARR but on a fragile base — three clients driving 70% of revenue. We rebuilt pricing architecture and retention systems from scratch to create durable, distributed growth.',                                        tag: 'Revenue',     sector: 'B2B SaaS',         year: '2024', outcome: 'Revenue ×6.25',    duration: '8 months',  featured: true },
  { id: 2,  title: 'Fixing the Unit Economics Before the Series A',                    excerpt: 'A D2C brand with strong brand equity couldn\'t close a Series A because the unit economics didn\'t hold under investor scrutiny. We restructured CAC, LTV, and payback assumptions — and closed the round four months later.',                               tag: 'Fundraising', sector: 'D2C',              year: '2024', outcome: 'Round closed',     duration: '4 months'  },
  { id: 3,  title: 'The Pivot That Saved a Fintech Startup',                           excerpt: 'Burning through runway while chasing a B2C model that showed retention problems at every cohort. We helped them identify the enterprise signal buried in their data and repositioned to B2B — changing the entire revenue trajectory.',                      tag: 'Pivot',       sector: 'Fintech',          year: '2023', outcome: 'Runway extended',  duration: '3 months'  },
  { id: 4,  title: 'Building a Sales Process That Works Without the Founder',          excerpt: 'Every deal required the founder\'s direct involvement. Revenue was capped at whatever one person could close. We designed a repeatable sales motion — qualification, process, and handoffs — that the team could own.',                                       tag: 'Operations',  sector: 'B2B Services',     year: '2024', outcome: 'Deals ×3',         duration: '5 months'  },
  { id: 5,  title: 'Cash Runway Extension Without Cutting Product',                    excerpt: 'An edtech company had 11 weeks of runway and a Series A that wasn\'t coming fast enough. Without touching headcount or product, we restructured burn and collections to buy 8 more months — enough to close the round.',                                     tag: 'Finance',     sector: 'Edtech',           year: '2023', outcome: '+8 months runway', duration: '6 weeks'   },
  { id: 6,  title: 'When the Market Wasn\'t Wrong, the Segment Was',                   excerpt: 'A health-tech startup had been iterating on its product for two years. The underlying problem wasn\'t the product — it was that they were selling to the wrong customer. We helped isolate the B2B enterprise buyer hidden in their data.',                  tag: 'PMF',         sector: 'Healthtech',       year: '2024', outcome: 'PMF achieved',     duration: '4 months'  },
  { id: 7,  title: 'Scaling Operations Without Scaling Chaos',                         excerpt: 'A logistics startup grew from 8 to 22 people in 14 months and lost control of its operations. Decisions stalled, accountability diffused, and quality dropped. We built the first management layer from first principles.',                                 tag: 'Scaling',     sector: 'Logistics',        year: '2024', outcome: 'NPS +34 pts',      duration: '6 months'  },
  { id: 8,  title: 'The Right Deck at the Wrong Time — and What Changed',              excerpt: 'A climate tech founder had an exceptional deck and a business that wasn\'t ready for institutional capital. We identified the four structural gaps that investors were quietly flagging and built a 90-day roadmap to address them.',                         tag: 'Fundraising', sector: 'Climate Tech',     year: '2023', outcome: 'Round secured',    duration: '90 days'   },
  { id: 9,  title: 'A Pricing Audit That Added 40% to Revenue',                        excerpt: 'A profitable SaaS business had never pressure-tested its pricing. In a structured audit we found three systematic underpricing patterns. The correction was implemented over 60 days with zero customer churn.',                                            tag: 'Revenue',     sector: 'B2B SaaS',         year: '2024', outcome: '+40% revenue',     duration: '60 days'   },
  { id: 10, title: 'Recovering Trust After a Team Breakdown',                          excerpt: 'A two-year conflict between a co-founder and a key hire had fractured the leadership team. Half the company knew. Performance was declining. We facilitated structured resolution and built a new accountability framework.',                               tag: 'Leadership',  sector: 'Consumer App',     year: '2023', outcome: '0 exits',          duration: '3 months'  },
  { id: 11, title: 'Rebuilding a D2C Brand After a CAC Crisis',                        excerpt: 'After a strong first year, a D2C skincare brand watched its blended CAC triple as performance channels saturated. We restructured the acquisition mix and rebuilt the LTV model — returning the brand to profitable growth.',                             tag: 'Revenue',     sector: 'D2C',              year: '2024', outcome: 'CAC −38%',         duration: '5 months'  },
  { id: 12, title: 'How a 3-Person Founding Team Unlocked ₹2Cr in Hidden Revenue',    excerpt: 'The business had been leaving money on the table across three separate dimensions — pricing, contract structure, and upsell motion. None of it required new customers. All of it required structural clarity.',                                           tag: 'Revenue',     sector: 'Consulting',       year: '2024', outcome: '+₹2Cr revenue',    duration: '4 months'  },
  { id: 13, title: 'Positioning a Deep-Tech Company for Non-Technical Buyers',         excerpt: 'Brilliant product, impenetrable messaging. The founder could explain it to engineers. Nobody else could understand what it did or why they should care. We rebuilt the positioning and sales narrative from the buyer\'s perspective.',                     tag: 'Strategy',    sector: 'Deep Tech',        year: '2023', outcome: 'Sales cycle −50%', duration: '6 weeks'   },
  { id: 14, title: 'Preparing a Family Business for External Investment',              excerpt: 'A second-generation family business with strong fundamentals had never been structured for institutional investors. We formalized governance, cleaned the cap table narrative, and built the financial model required for a PE conversation.',               tag: 'Fundraising', sector: 'Manufacturing',    year: '2024', outcome: 'PE term received',  duration: '5 months'  },
  { id: 15, title: 'Stopping a Leadership Exodus Before It Became Public',             excerpt: 'Three senior leaders were 30 days from resigning in a coordinated departure. The founder didn\'t know. We identified the pattern, facilitated direct conversation, and restructured the equity and role framework that had created the problem.',           tag: 'Leadership',  sector: 'Fintech',          year: '2024', outcome: '0 departures',     duration: '6 weeks'   },
  { id: 16, title: 'From Services to Product: Managing the Revenue Gap',               excerpt: 'A profitable services business wanted to build a product arm. The transition threatened to hollow out the existing revenue base. We built a migration path that let both models coexist without destabilizing cash flow.',                                  tag: 'Strategy',    sector: 'B2B Services',     year: '2023', outcome: 'Both models live',  duration: '8 months'  },
  { id: 17, title: 'Retail Expansion Decision: The Framework That Saved ₹1.8Cr',       excerpt: 'A consumer brand was preparing to expand into 40 new retail locations. Our analysis identified that 28 of them would be structurally unprofitable at current margin. The remaining 12 delivered the growth they expected — at a fraction of the cost.',    tag: 'Strategy',    sector: 'Consumer Brand',   year: '2024', outcome: '₹1.8Cr saved',     duration: '3 months'  },
  { id: 18, title: 'Designing the First OKR System for a 35-Person Startup',           excerpt: 'Growth had happened faster than the systems to manage it. Priorities were verbal, accountability was informal, and the founder was the only integration point. We designed and implemented the first OKR framework — built for a team, not a corporation.', tag: 'Operations',  sector: 'SaaS',             year: '2024', outcome: 'Exec time −40%',   duration: '3 months'  },
  { id: 19, title: 'A Series A That Almost Didn\'t Happen — and Why It Did',           excerpt: 'The fundraise had stalled for seven months. Investor meetings were happening but no one was committing. The problem wasn\'t the business — it was the narrative, the financial model, and the sequencing of the investor outreach.',                       tag: 'Fundraising', sector: 'Healthtech',       year: '2023', outcome: '₹12Cr raised',     duration: '60 days'   },
  { id: 20, title: 'How a ₹6Cr Revenue Business Achieved EBITDA Breakeven',            excerpt: 'Revenue was growing but margin was not. Every rupee of top-line growth seemed to require more headcount, more tools, and more overhead. We designed the operational restructure that brought the business to its first EBITDA-positive quarter.',           tag: 'Finance',     sector: 'Edtech',           year: '2024', outcome: 'EBITDA positive',  duration: '6 months'  },
  { id: 21, title: 'Negotiating a Strategic Partnership Without Losing Leverage',       excerpt: 'A startup was negotiating with a corporate partner 100x its size. The asymmetry in information and urgency was extreme. We helped structure the negotiation so the startup retained pricing control, data rights, and exit optionality.',                  tag: 'Strategy',    sector: 'Proptech',         year: '2024', outcome: 'Deal signed',       duration: '2 months'  },
  { id: 22, title: 'When Hypergrowth Creates More Problems Than It Solves',            excerpt: 'Triple-digit growth looked like the only story anyone wanted to read. Behind the headline was rising churn, declining NPS, and a product team that couldn\'t keep pace. We helped the founder consciously slow growth to fix what mattered.',              tag: 'Scaling',     sector: 'B2B SaaS',         year: '2023', outcome: 'Churn −28%',       duration: '5 months'  },
  { id: 23, title: 'Rebuilding a Go-to-Market Motion After a Failed Launch',           excerpt: 'An 18-month product build launched to near silence. Not because the product was wrong — because the GTM assumptions were untested. We ran a structured diagnostic and rebuilt the channel, message, and sequencing from evidence.',                         tag: 'Strategy',    sector: 'HRTech',           year: '2024', outcome: 'MoM growth 22%',   duration: '4 months'  },
  { id: 24, title: 'The Cost of Deferred Conversations in a Co-Founder Relationship',  excerpt: 'Two founders had worked together for three years without explicitly aligning on equity intent, role boundaries, or exit preferences. The assumptions they\'d each made diverged significantly. We surfaced and resolved the gap before it became fatal.',    tag: 'Leadership',  sector: 'Consumer App',     year: '2023', outcome: 'Partnership intact', duration: '6 weeks'  },
  { id: 25, title: 'How to Inherit a Financial Mess and Build From It',                excerpt: 'A new CEO joining a VC-backed company discovered the financials were more complex and less healthy than disclosed. We helped design the 100-day plan — triage, communication, and restructure — that preserved investor confidence through the transition.',  tag: 'Finance',     sector: 'Logistics',        year: '2024', outcome: 'CEO onboarded',     duration: '100 days'  },

  // ── Batch 2 (26–50) ────────────────────────────────────────────────────────
  { id: 26, title: 'Building an Enterprise Sales Motion from Zero',                    excerpt: 'A B2B startup had been closing SMB deals reactively. To grow, they needed enterprise — a completely different sales architecture, qualification process, and team structure. We built it before they hired a sales leader.',                                tag: 'Revenue',     sector: 'B2B SaaS',         year: '2024', outcome: '3 enterprise deals', duration: '5 months' },
  { id: 27, title: 'Stabilising a Business After Its Anchor Client Departed',          excerpt: 'One client represented 55% of revenue and gave 30 days\' notice. We helped the founding team execute an emergency stabilisation plan — a revenue bridge, cost restructure, and a 6-month pipeline acceleration that prevented collapse.',                   tag: 'Finance',     sector: 'Design Agency',    year: '2023', outcome: 'Business survived', duration: '3 months' },
  { id: 28, title: 'Post-Acquisition Integration: Culture, Systems, and Trust',        excerpt: 'A startup was acquired by a mid-size conglomerate. Six months in, the team was losing people, the integration was stalled, and the acquiring company was losing patience. We designed a structured 90-day integration roadmap.',                          tag: 'Operations',  sector: 'EdTech',           year: '2024', outcome: 'Integration done',  duration: '90 days'  },
  { id: 29, title: 'Pricing a Complex SaaS Product Across Multiple Segments',          excerpt: 'Three distinct customer segments with very different willingness to pay were buying the same product at the same price. The result was revenue leakage at the top and friction at the bottom. We redesigned pricing for all three tiers.',                  tag: 'Revenue',     sector: 'B2B SaaS',         year: '2024', outcome: '+52% ARPU',         duration: '3 months' },
  { id: 30, title: 'From Founder-Led Sales to Team-Led Revenue',                       excerpt: 'A founder generating ₹3Cr annually through personal relationships needed to make revenue work without them. We built the playbook, trained the team, and embedded the systems that let the founder step back within five months.',                         tag: 'Operations',  sector: 'Consulting',       year: '2024', outcome: 'Founder exits sales', duration: '5 months' },
  { id: 31, title: 'Managing Investor Relations Through a Difficult Quarter',          excerpt: 'Revenue missed forecast by 40%. The board meeting was in three weeks. We helped the founder prepare — not to spin the numbers, but to present clearly, retain credibility, and propose a structured path forward.',                                         tag: 'Fundraising', sector: 'B2B SaaS',         year: '2023', outcome: 'Board retained trust', duration: '3 weeks' },
  { id: 32, title: 'A Product Roadmap That Actually Reflected Business Priorities',    excerpt: 'The product team was building the most-requested features. The sales team was losing deals on a different set of gaps entirely. We mediated the gap and rebuilt the roadmap around business outcomes rather than request volume.',                          tag: 'PMF',         sector: 'SaaS',             year: '2024', outcome: 'Win rate +18%',     duration: '2 months' },
  { id: 33, title: 'Closing the Gap Between Sales and Delivery in a Services Firm',   excerpt: 'Sales was promising timelines the delivery team couldn\'t meet. The resulting project delays were eroding client trust faster than new sales could compensate. We designed the capacity and scoping process that aligned both functions.',                  tag: 'Operations',  sector: 'IT Services',      year: '2023', outcome: 'CSAT +28 pts',      duration: '4 months' },
  { id: 34, title: 'The Equity Restructure That Unlocked a Stalled Round',             excerpt: 'A potential lead investor was interested but concerned about the cap table structure. Three previous employees held meaningful equity with unclear vesting. We helped design and communicate the restructure that cleared the path to close.',               tag: 'Fundraising', sector: 'Consumer Tech',    year: '2024', outcome: 'Round closed',      duration: '45 days'  },
  { id: 35, title: 'Diagnosing Why a Strong Team Wasn\'t Delivering',                  excerpt: 'Every hire was individually excellent. The team collectively underperformed. The problem wasn\'t talent — it was role ambiguity, absent decision rights, and a meeting structure that ate execution time. We redesigned the operating model.',              tag: 'Operations',  sector: 'Media',            year: '2024', outcome: 'Velocity +2×',      duration: '3 months' },
  { id: 36, title: 'Turning a Loss-Making Vertical Into a Profitable One',             excerpt: 'One of three business verticals was consistently loss-making but the founder believed it had strategic value. We built the first clean P&L for the vertical and gave the founder clarity on what it would actually take to make it viable.',               tag: 'Finance',     sector: 'Consumer Brand',   year: '2023', outcome: 'Vertical profitable', duration: '6 months' },
  { id: 37, title: 'How a Bootstrapped Founder Prepared for a First Institutional Ask',excerpt: 'A founder who had never worked with institutional investors needed to understand the language, expectations, and process before entering their first meeting. We built the preparation — and they closed at a ₹28Cr valuation.',                         tag: 'Fundraising', sector: 'B2B SaaS',         year: '2024', outcome: '₹28Cr valuation',  duration: '60 days'  },
  { id: 38, title: 'Rebuilding Trust With a Major Client After a Delivery Failure',    excerpt: 'A missed deliverable had put the company\'s largest contract at risk. The client had escalated to their CFO. We helped design the recovery conversation — structured, honest, and with a plan the client could actually believe.',                        tag: 'Operations',  sector: 'B2B Services',     year: '2023', outcome: 'Contract retained', duration: '3 weeks'  },
  { id: 39, title: 'The First External Hire That Changed Everything',                  excerpt: 'A 6-person startup needed its first senior operational hire. The wrong hire at this stage would have been catastrophic. We built the hiring framework, ran structured interviews, and helped them select — and onboard — correctly.',                      tag: 'Operations',  sector: 'Healthtech',       year: '2024', outcome: 'Hire succeeded',    duration: '8 weeks'  },
  { id: 40, title: 'When the Founding Team Didn\'t Agree on Where to Take the Company',excerpt: 'Three founders, three visions, and no structured way to make a binding directional decision. We facilitated the framework that produced a decision all three could execute on — and documented what it would take to revisit it later.',                  tag: 'Leadership',  sector: 'Consumer App',     year: '2024', outcome: 'Direction agreed',  duration: '4 weeks'  },
  { id: 41, title: 'Correcting a Broken Sales Compensation Structure',                  excerpt: 'The sales team was hitting quota but the company was losing margin. The compensation plan incentivised volume over quality — and the best salespeople were churning accounts to hit targets. We restructured the entire incentive system.',               tag: 'Revenue',     sector: 'SaaS',             year: '2024', outcome: 'Margin +14 pts',    duration: '2 months' },
  { id: 42, title: 'How to Build a Finance Function When You Can\'t Afford a CFO',    excerpt: 'A ₹2Cr ARR startup needed CFO-level decisions but not a full-time CFO. We designed a fractional finance architecture — systems, processes, and reporting — that gave the founder real-time visibility at a fraction of the cost.',                      tag: 'Finance',     sector: 'B2B SaaS',         year: '2023', outcome: 'Visibility achieved', duration: '6 weeks' },
  { id: 43, title: 'Rebuilding After a Regulatory Setback',                            excerpt: 'New regulations forced the shutdown of a core product feature three months before a fundraise. We helped the founder triage, communicate with investors, and rebuild the product narrative around the remaining — and now stronger — core.',               tag: 'Strategy',    sector: 'Fintech',          year: '2024', outcome: 'Round completed',   duration: '4 months' },
  { id: 44, title: 'A Retention Strategy That Cut Churn in Half',                      excerpt: 'Monthly churn of 8% was masking strong top-line growth. The business was filling a leaking bucket. We ran a structured churn analysis, identified the three primary failure modes, and built the retention interventions that addressed them.',           tag: 'Revenue',     sector: 'Consumer App',     year: '2023', outcome: 'Churn −52%',        duration: '4 months' },
  { id: 45, title: 'Designing a Scalable Delivery Model for a Consulting Business',    excerpt: 'The firm could only grow as fast as the founders could personally deliver. We redesigned the delivery model — documented the IP, built junior capacity, and created the quality framework — that let the founders step into purely commercial roles.',       tag: 'Scaling',     sector: 'Consulting',       year: '2024', outcome: 'Revenue/head ×2',   duration: '7 months' },
  { id: 46, title: 'From Monthly Chaos to Quarterly Clarity',                          excerpt: 'Every month-end was a fire drill. Reporting was ad hoc, decisions were reactive, and the leadership team had no shared view of the business. We designed the management reporting cadence that changed how the company made decisions.',                   tag: 'Operations',  sector: 'D2C',              year: '2024', outcome: 'Decisions faster',  duration: '6 weeks'  },
  { id: 47, title: 'A Customer Interview Programme That Changed Product Direction',    excerpt: 'Six months of building had produced features that customers were polite about but didn\'t use. We designed and ran a structured customer discovery programme that uncovered what was actually holding buyers back — and rebuilt the roadmap accordingly.',   tag: 'PMF',         sector: 'B2B SaaS',         year: '2023', outcome: 'Roadmap reset',     duration: '6 weeks'  },
  { id: 48, title: 'The Board Transition That Could Have Derailed a Series B',         excerpt: 'A founding investor was rotating off the board at the worst possible time — mid-fundraise. We helped structure the transition, manage the narrative with incoming investors, and ensure continuity of institutional knowledge.',                           tag: 'Fundraising', sector: 'Fintech',          year: '2024', outcome: 'Series B closed',   duration: '3 months' },
  { id: 49, title: 'Unlocking Growth in a Tier-2 Market',                              excerpt: 'A consumer startup had saturated Tier-1 cities. The Tier-2 expansion looked simple on paper but had failed twice before. We diagnosed why previous attempts had failed and designed the city-by-city expansion model that worked.',                       tag: 'Strategy',    sector: 'Consumer Brand',   year: '2024', outcome: '4 new cities',      duration: '5 months' },
  { id: 50, title: 'The Leadership Assessment That Prevented a Critical Hire Mistake', excerpt: 'A founder was two weeks from hiring a COO who would have been wrong for the business — the right resume, the wrong operating model match. Our structured assessment process surfaced the misalignment before the offer was made.',                       tag: 'Leadership',  sector: 'Logistics',        year: '2023', outcome: 'Hire avoided',      duration: '2 weeks'  },

  // ── Batch 3 (51–75) ────────────────────────────────────────────────────────
  { id: 51, title: 'How a SaaS Startup Survived Losing Its Biggest Customer',          excerpt: 'The company\'s largest client — 45% of ARR — churned with 60 days\' notice. We helped design the immediate cost response, the pipeline acceleration strategy, and the investor communication that kept confidence intact.',                             tag: 'Finance',     sector: 'B2B SaaS',         year: '2024', outcome: 'Business intact',   duration: '60 days'  },
  { id: 52, title: 'Restructuring Equity Before an Acquisition Conversation',          excerpt: 'A strategic buyer had approached the company but the cap table had complexity that would have collapsed the conversation. We designed the pre-acquisition restructure that cleared every obstacle in the due diligence process.',                          tag: 'Fundraising', sector: 'Proptech',         year: '2024', outcome: 'Acquisition live',  duration: '3 months' },
  { id: 53, title: 'Building the Metrics That Investors Actually Want to See',         excerpt: 'The company had data but not the right metrics — and certainly not presented in the way investors read them. We built the investor-grade metrics dashboard and the narrative layer that turned data into a fundable story.',                              tag: 'Fundraising', sector: 'HRTech',           year: '2023', outcome: 'Metrics deck built', duration: '4 weeks' },
  { id: 54, title: 'Reducing a 6-Month Sales Cycle to 8 Weeks',                        excerpt: 'Complex B2B deals were stalling at procurement for 4–6 months, straining cash flow and pipeline reliability. We redesigned the sales process — qualification, champion building, and procurement navigation — that cut cycle time by 65%.',              tag: 'Revenue',     sector: 'Enterprise SaaS',  year: '2024', outcome: 'Cycle −65%',        duration: '4 months' },
  { id: 55, title: 'When the Product Was Right But the Customer Was Wrong',            excerpt: 'A deep-tech startup had a genuinely novel product — but was selling to an early adopter segment that couldn\'t pay, couldn\'t scale, and couldn\'t reference well. We helped them find and validate the early majority segment.',                        tag: 'PMF',         sector: 'Deep Tech',        year: '2024', outcome: 'Segment pivoted',   duration: '3 months' },
  { id: 56, title: 'The Financial Model That Changed the Fundraising Outcome',         excerpt: 'Three investors had passed citing "unclear unit economics." The business was fundamentally sound — the financial model just didn\'t tell the story. We rebuilt the model architecture and the narrative. The next four meetings converted.',               tag: 'Fundraising', sector: 'Consumer Tech',    year: '2023', outcome: '4/4 converted',    duration: '3 weeks'  },
  { id: 57, title: 'Making a Profitable Exit From an Underperforming Vertical',        excerpt: 'A three-vertical business had one arm that consumed disproportionate management time with below-average returns. We designed the wind-down strategy that preserved revenue from the vertical\'s best clients and freed the team for the winning bets.',   tag: 'Strategy',    sector: 'Media',            year: '2024', outcome: 'Exit executed',     duration: '4 months' },
  { id: 58, title: 'Turning a Services Firm\'s IP Into a Productised Offering',        excerpt: 'The firm was doing the same work repeatedly for different clients at the same cost. The IP was valuable but packaged as custom engagements. We helped design the productised tier that could scale without proportional headcount.',                       tag: 'Strategy',    sector: 'Consulting',       year: '2024', outcome: 'Product launched',  duration: '5 months' },
  { id: 59, title: 'A Merger That Almost Fell Apart on People Issues',                 excerpt: 'Two startups were merging through an all-stock deal. The financials were agreed but the people dynamics were unresolved — competing cultures, duplicate roles, and unclear reporting lines. We designed the people integration framework.',                tag: 'Operations',  sector: 'Fintech',          year: '2024', outcome: 'Merger completed',  duration: '3 months' },
  { id: 60, title: 'Why a ₹4Cr D2C Brand Needed to Slow Down',                         excerpt: 'Explosive growth had masked deteriorating unit economics. The brand was growing itself into an unprofitable position. We helped the founder understand what the growth was costing and design a deliberate slowdown that reset the foundation.',           tag: 'Finance',     sector: 'D2C',              year: '2023', outcome: 'Margins restored',  duration: '5 months' },
  { id: 61, title: 'From Reactive Hiring to a Talent Operating System',               excerpt: 'The company was hiring in response to crises rather than ahead of them. The result was consistently mismatched hires made under pressure. We built the first structured talent pipeline and hiring process.',                                             tag: 'Operations',  sector: 'B2B SaaS',         year: '2024', outcome: 'Hire quality ×2',   duration: '4 months' },
  { id: 62, title: 'Redesigning the Customer Onboarding That Was Killing Retention',   excerpt: 'Churn in months 2–3 was dramatically higher than industry benchmarks. The product was sticky for users who activated. The problem was that activation rates were terrible. We rebuilt the onboarding journey from first principles.',                    tag: 'Revenue',     sector: 'SaaS',             year: '2024', outcome: 'Activation +44%',   duration: '3 months' },
  { id: 63, title: 'How a Founder Navigated Personal Financial Risk to Scale',         excerpt: 'A bootstrapped founder had taken on significant personal debt to fund growth. The decision to raise external capital involved real personal financial risk calculus. We helped structure the scenario analysis that made the decision clear.',             tag: 'Finance',     sector: 'Consumer Brand',   year: '2023', outcome: 'Raise decision made', duration: '4 weeks' },
  { id: 64, title: 'Rebuilding Operational Trust With a Burned-Out Team',              excerpt: 'Two years of high growth and poor boundaries had exhausted the core team. Key people were disengaged, productivity was down, and turnover risk was extreme. We helped the founder design the structural changes — not just the cultural ones.',             tag: 'Leadership',  sector: 'Logistics',        year: '2024', outcome: 'No exits',          duration: '3 months' },
  { id: 65, title: 'When Customers Loved the Product but Wouldn\'t Pay for It',        excerpt: 'Engagement metrics were exceptional. Revenue was not. Users valued the product but didn\'t assign monetary value to it. We helped reframe the value exchange and redesign the monetisation model around willingness to pay evidence.',                   tag: 'Revenue',     sector: 'Consumer App',     year: '2024', outcome: 'ARPU ×3',           duration: '4 months' },
  { id: 66, title: 'The Operational Audit That Found ₹90L of Annual Waste',            excerpt: 'A growing startup had never audited its operational spend. In a structured 3-week review, we identified ₹90L in annual costs that were either redundant, mis-scoped, or deliverable through cheaper means without affecting quality.',                  tag: 'Finance',     sector: 'Edtech',           year: '2023', outcome: '₹90L cost savings', duration: '3 weeks'  },
  { id: 67, title: 'Rebuilding a Channel Partnership That Had Stopped Performing',     excerpt: 'A distribution partnership that had been central to growth three years ago had quietly become a drag — still consuming management time, producing below-threshold returns. We designed and executed the restructure that reset it.',                    tag: 'Strategy',    sector: 'Consumer Brand',   year: '2024', outcome: 'Channel relaunched', duration: '3 months' },
  { id: 68, title: 'How to Price an API Product for Developer and Enterprise Buyers',  excerpt: 'The company was selling the same API to both independent developers and enterprise engineering teams at the same price. The value was wildly different. We designed a three-tier pricing architecture that captured it.',                              tag: 'Revenue',     sector: 'Dev Tools',        year: '2024', outcome: 'Revenue +68%',      duration: '2 months' },
  { id: 69, title: 'A Founder\'s First 90 Days After a Series A',                      excerpt: 'Closing a Series A is the beginning of a different kind of pressure. We helped a first-time founder design a 90-day plan — priorities, team, reporting, and investor rhythm — that set the right foundation for the scaling phase.',                   tag: 'Scaling',     sector: 'B2B SaaS',         year: '2024', outcome: 'Q1 on target',      duration: '90 days'  },
  { id: 70, title: 'The Annual Planning Process That Finally Made Sense',              excerpt: 'The company\'s annual planning cycle was producing plans nobody believed in and targets nobody owned. We redesigned the process — top-down strategy, bottom-up operational plans, and the interface between them — that created genuine alignment.',      tag: 'Operations',  sector: 'Consumer Tech',    year: '2023', outcome: 'Plan owned',        duration: '6 weeks'  },
  { id: 71, title: 'Navigating a Difficult Conversation With an Underperforming Hire', excerpt: 'A senior hire wasn\'t performing but was deeply connected to the founding team. The founder had been avoiding the conversation for six months. We helped design the accountability framework and the conversation structure that resolved it cleanly.',    tag: 'Leadership',  sector: 'B2B Services',     year: '2024', outcome: 'Resolved cleanly',  duration: '3 weeks'  },
  { id: 72, title: 'Building a Market Entry Strategy for Southeast Asia',              excerpt: 'A proven Indian B2B SaaS product was considering Singapore as a beachhead into Southeast Asia. We built the entry framework — customer profile, channel assumptions, and regulatory considerations — that made the decision evidence-based.',             tag: 'Strategy',    sector: 'B2B SaaS',         year: '2024', outcome: 'Entry launched',    duration: '4 months' },
  { id: 73, title: 'From Reactive Support to a Proactive CS Function',                excerpt: 'Customer success was firefighting. Every interaction was reactive — responding to problems rather than preventing them. We designed the proactive CS motion that reduced support volume by 40% while increasing expansion revenue.',                       tag: 'Revenue',     sector: 'SaaS',             year: '2023', outcome: 'Support −40%',      duration: '4 months' },
  { id: 74, title: 'Closing the Strategic Gap Between Founders and Their Board',       excerpt: 'The board was asking questions the founders didn\'t have systems to answer. Every meeting created anxiety rather than value. We helped design the reporting cadence, the format, and the pre-meeting discipline that changed the dynamic.',              tag: 'Operations',  sector: 'Fintech',          year: '2024', outcome: 'Board dynamic fixed', duration: '2 months' },
  { id: 75, title: 'The Long Turnaround: Rebuilding a Business That Had Lost Its Way', excerpt: 'After three years of strong growth, a startup had drifted — multiple failed pivots, declining revenue, and a team that had lost confidence. We helped the new leadership team diagnose, stabilise, and rebuild around what had actually worked.',         tag: 'Strategy',    sector: 'Consumer App',     year: '2023', outcome: 'Growth restored',   duration: '11 months' },
];

const BATCH_SIZE = 25;

// =====================================================
// ADVERTISEMENT DATA
// =====================================================

const FEATURED_BLOGS: BlogTeaser[] = [
  { title: "Why Most Startups Scale Before They're Ready",  tag: 'Strategy',    readTime: '8 min',  date: 'Feb 18, 2026' },
  { title: "Pricing Is a Strategy, Not a Number",           tag: 'Revenue',     readTime: '6 min',  date: 'Feb 14, 2026' },
  { title: "The Founder's Trap: Why You're the Bottleneck", tag: 'Operations',  readTime: '6 min',  date: 'Jan 25, 2026' },
];

const FEATURED_REPORTS: ReportTeaser[] = [
  { title: 'Indian Startup Ecosystem Report 2026',        pages: '142 pages', date: 'Feb 2026', tag: 'Annual Report'  },
  { title: 'State of B2B SaaS in India — 2025 Review',   pages: '68 pages',  date: 'Dec 2025', tag: 'Sector Report'  },
  { title: 'The Fundability Framework — Investor Report', pages: '52 pages',  date: 'Jun 2025', tag: 'Framework'      },
];

// =====================================================
// TAG / SECTOR COLOR MAP
// Deep navy identity with distinct accent per tag
// =====================================================

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Revenue:     { bg: 'rgba(96,165,250,0.10)',  text: '#93C5FD' },
  Fundraising: { bg: 'rgba(52,211,153,0.10)',  text: '#6EE7B7' },
  Pivot:       { bg: 'rgba(251,146,60,0.10)',  text: '#FDBA74' },
  Operations:  { bg: 'rgba(167,139,250,0.10)', text: '#C4B5FD' },
  Finance:     { bg: 'rgba(251,191,36,0.10)',  text: '#FCD34D' },
  PMF:         { bg: 'rgba(34,211,238,0.10)',  text: '#67E8F9' },
  Scaling:     { bg: 'rgba(74,222,128,0.10)',  text: '#86EFAC' },
  Leadership:  { bg: 'rgba(248,113,113,0.10)', text: '#FCA5A5' },
  Strategy:    { bg: 'rgba(129,140,248,0.10)', text: '#A5B4FC' },
};

const getTagStyle = (tag: string): { bg: string; text: string } =>
  TAG_COLORS[tag] ?? { bg: 'rgba(96,165,250,0.08)', text: '#93C5FD' };

// =====================================================
// ALL FILTER TAGS
// =====================================================

const ALL_TAGS: string[] = [
  'All', 'Revenue', 'Fundraising', 'Finance', 'Operations',
  'Strategy', 'PMF', 'Scaling', 'Leadership', 'Pivot',
];

// =====================================================
// PARTNER AUTH MODAL
// Identical design language to blogs hub and
// resources hub modals.
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
      style={{ backgroundColor: 'rgba(0,5,20,0.80)' }}
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-md"
        style={{ animation: 'modalIn 0.3s cubic-bezier(0.22,1,0.36,1) both' }}
      >
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-[#002855] px-8 py-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-blue-200 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-blue-200 text-xs font-medium tracking-widest uppercase">
                Partner Access
              </span>
            </div>
            <h2 className="text-2xl font-light text-white">Sign In to Continue</h2>
            <p className="text-blue-200 text-sm mt-1 truncate">
              Viewing:{' '}
              <span className="text-white font-medium">{resourceTitle}</span>
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

                {/* Partner ID */}
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

                {/* Password */}
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
                  ) : (
                    'Access Case Study'
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 pt-1">
                  Don&apos;t have a Partner ID?{' '}
                  <a href="#" className="text-blue-600 hover:underline">Request Access</a>
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Access Granted</h3>
                <p className="text-gray-500 text-sm">
                  Opening{' '}
                  <span className="font-medium text-gray-700">{resourceTitle}</span>…
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: 'rgba(180,200,255,0.3)' }}>
          Partner access is monitored and logged for security purposes.
        </p>
      </div>
    </div>
  );
};

// =====================================================
// HERO SECTION
// Deep navy — data / analytical identity.
// Right side: SVG visual placeholder.
// =====================================================

const HeroSection: FC = () => (
  <section
    className="relative overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8"
    style={{ backgroundColor: '#040E1C', minHeight: '520px' }}
  >
    {/* Background: subtle circuit-grid texture */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" patternUnits="userSpaceOnUse" width="40" height="40">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4B8BFF" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Blue radial glow — top right */}
      <div
        className="absolute -top-20 right-0 w-[600px] h-[500px]"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(30,80,160,0.18) 0%, transparent 65%)' }}
      />
      {/* Cyan accent bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[300px]"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(6,182,212,0.06) 0%, transparent 70%)' }}
      />
    </div>

    <div className="max-w-7xl mx-auto relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT — Headline */}
        <div className="space-y-8">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.18)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-300 text-xs font-medium tracking-widest uppercase">
              Sarsen &amp; Company · Case Studies
            </span>
          </div>

          <div className="space-y-4">
            <h1
              className="font-light leading-none tracking-tight"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                color: '#EFF6FF',
              }}
            >
              Real Work.
              <br />
              <span style={{ color: '#60A5FA' }}>Real Outcomes.</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed max-w-md font-light" style={{ color: '#64748B' }}>
              Documented engagements with Indian founders — the decisions we helped make, the problems we diagnosed, and the results that followed.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-2">
            {[
              { value: '75+', label: 'Engagements'  },
              { value: '18',  label: 'Sectors'       },
              { value: '₹80Cr+', label: 'Capital influenced' },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-2xl font-light"
                  style={{ color: '#EFF6FF' }}
                >
                  {stat.value}
                </p>
                <p className="text-xs tracking-widest uppercase mt-0.5" style={{ color: '#334155' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — SVG visual placeholder */}
        {/*
          INTEGRATION NOTE:
          Replace contents with:
          <img src="/assets/case-studies/Hero Visual.svg" alt="" className="max-w-full h-auto" />
        */}
        <div
          className="relative hidden lg:flex items-center justify-end"
          style={{ height: '420px' }}
          aria-hidden="true"
        >
          <div className="relative w-full max-w-lg h-full flex items-center justify-center">
            {/* Abstract data-flow motif */}
            <div className="relative w-80 h-80">
              {/* Outer ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{ border: '1px solid rgba(96,165,250,0.12)' }}
              />
              {/* Mid ring */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: '30px',
                  border: '1px solid rgba(96,165,250,0.08)',
                }}
              />
              {/* Core */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: '80px',
                  background: 'radial-gradient(circle, rgba(30,80,160,0.2) 0%, transparent 70%)',
                  border: '1px solid rgba(96,165,250,0.15)',
                }}
              />
              {/* Metric chips orbiting */}
              {[
                { label: 'Revenue ×6', angle: 0   },
                { label: 'Churn −52%', angle: 72  },
                { label: '₹12Cr raised', angle: 144 },
                { label: 'PMF achieved', angle: 216 },
                { label: 'EBITDA+',    angle: 288 },
              ].map(({ label, angle }) => {
                const rad = (angle * Math.PI) / 180;
                const r   = 130;
                const x   = 50 + (r / 160) * 50 * Math.cos(rad);
                const y   = 50 + (r / 160) * 50 * Math.sin(rad);
                return (
                  <div
                    key={label}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      backgroundColor: 'rgba(15,39,68,0.9)',
                      border: '1px solid rgba(96,165,250,0.2)',
                      color: '#93C5FD',
                    }}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

// =====================================================
// TAG FILTER BAR
// Horizontally scrollable — dark navy identity.
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
    aria-label="Filter case studies by category"
  >
    {ALL_TAGS.map((tag) => {
      const isActive  = tag === activeTag;
      const tagStyle  = tag === 'All'
        ? { bg: 'rgba(96,165,250,0.10)', text: '#93C5FD' }
        : getTagStyle(tag);

      return (
        <button
          key={tag}
          type="button"
          onClick={() => onTagChange(tag)}
          className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={
            isActive
              ? {
                  backgroundColor: '#1E4A7A',
                  color: '#93C5FD',
                  border: '1px solid rgba(96,165,250,0.40)',
                }
              : {
                  backgroundColor: tagStyle.bg,
                  color: tagStyle.text,
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
// FEATURED CASE STUDY CARD
// Full-width — used for the very first item.
// Shows outcome pill, sector badge, duration.
// =====================================================

interface FeaturedCardProps {
  study: CaseStudy;
  onOpen: (title: string) => void;
}

const FeaturedCaseStudyCard: FC<FeaturedCardProps> = ({ study, onOpen }) => {
  const tagStyle = getTagStyle(study.tag);
  return (
    <article
      onClick={() => onOpen(study.title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(study.title)}
      className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{ backgroundColor: '#081428', border: '1px solid rgba(96,165,250,0.10)' }}
      aria-label={`Open case study: ${study.title}`}
    >
      {/* Decorative header */}
      <div
        className="relative h-44 sm:h-52 px-8 sm:px-10 flex items-end pb-7 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0D3B6E 0%, #081428 65%)' }}
      >
        {/* Concentric ring decoration */}
        <div className="absolute inset-0 flex items-center justify-end pr-8" aria-hidden="true">
          {[180, 130, 80].map((size, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                border: `1px solid rgba(96,165,250,${0.04 + i * 0.03})`,
                right: -size / 4,
              }}
            />
          ))}
        </div>

        {/* Featured badge */}
        <div className="relative z-10 flex items-center gap-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {study.tag}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              color: '#60A5FA',
              border: '1px solid rgba(96,165,250,0.15)',
            }}
          >
            Featured
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: 'rgba(52,211,153,0.08)',
              color: '#34D399',
              border: '1px solid rgba(52,211,153,0.15)',
            }}
          >
            {study.outcome}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 sm:px-10 py-6">
        <h2
          className="font-light leading-snug mb-3 group-hover:text-blue-300 transition-colors duration-200"
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
            color: '#E2EFFF',
          }}
        >
          {study.title}
        </h2>
        <p className="text-sm leading-relaxed mb-6 max-w-3xl" style={{ color: '#475569' }}>
          {study.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span
              className="px-2.5 py-1 rounded-md text-xs"
              style={{ backgroundColor: 'rgba(30,74,122,0.4)', color: '#7AA8D0' }}
            >
              {study.sector}
            </span>
            <span className="text-xs" style={{ color: '#334155' }}>{study.year}</span>
            <span className="text-xs" style={{ color: '#334155' }}>{study.duration}</span>
          </div>
          <div
            className="flex items-center gap-1.5 text-xs font-medium group-hover:gap-3 transition-all duration-200"
            style={{ color: '#60A5FA' }}
          >
            Read case study
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
// STANDARD CASE STUDY CARD
// Used in 3-column grid.
// Shows outcome pill prominently.
// =====================================================

interface CaseStudyCardProps {
  study: CaseStudy;
  onOpen: (title: string) => void;
  animIndex: number;
}

const CaseStudyCard: FC<CaseStudyCardProps> = ({ study, onOpen, animIndex }) => {
  const tagStyle = getTagStyle(study.tag);
  return (
    <article
      onClick={() => onOpen(study.title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(study.title)}
      className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      style={{
        backgroundColor: '#0A1E3D',
        border: '1px solid rgba(96,165,250,0.08)',
        animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${animIndex * 45}ms both`,
      }}
      aria-label={`Open case study: ${study.title}`}
    >
      {/* Top accent line using tag colour */}
      <div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, ${tagStyle.text}40, transparent)` }}
      />

      {/* Header gradient band */}
      <div
        className="relative h-28 px-5 flex items-end pb-4 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0D2744 0%, #0A1E3D 100%)' }}
      >
        {/* Subtle ring decor */}
        <div className="absolute top-2 right-3 opacity-10" aria-hidden="true">
          <div className="w-14 h-14 rounded-full border border-blue-400" />
        </div>
        <div className="relative z-10 flex items-center gap-2 flex-wrap">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {study.tag}
          </span>
          {/* Outcome pill */}
          <span
            className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: 'rgba(52,211,153,0.08)',
              color: '#34D399',
              border: '1px solid rgba(52,211,153,0.15)',
            }}
          >
            {study.outcome}
          </span>
        </div>
        {/* Lock */}
        <div className="absolute top-4 right-4 z-10 opacity-25 group-hover:opacity-70 transition-opacity" aria-hidden="true">
          <svg className="w-3.5 h-3.5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <h3
          className="font-medium leading-snug mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2"
          style={{ color: '#C8DEFF', fontSize: '0.9rem' }}
        >
          {study.title}
        </h3>
        <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: '#3D5A7A' }}>
          {study.excerpt}
        </p>

        {/* Footer row */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid rgba(96,165,250,0.07)' }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{ backgroundColor: 'rgba(30,74,122,0.35)', color: '#4B78A0' }}
            >
              {study.sector}
            </span>
            <span className="text-xs" style={{ color: '#253A52' }}>{study.year}</span>
          </div>
          <span className="text-xs" style={{ color: '#253A52' }}>{study.duration}</span>
        </div>
      </div>
    </article>
  );
};

// =====================================================
// BLOGS ADVERTISEMENT STRIP
// Inserted after batch 1 (25 studies loaded).
// Warm parchment tones contrast the navy grid.
// =====================================================

interface BlogsStripProps {
  onBlogClick: (title: string) => void;
}

const BlogsAdvertStrip: FC<BlogsStripProps> = ({ onBlogClick }) => (
  <div
    className="my-12 rounded-2xl overflow-hidden"
    style={{ backgroundColor: '#1C1408', border: '1px solid rgba(200,184,138,0.10)' }}
  >
    <div className="px-6 sm:px-8 py-6 sm:py-8">
      {/* Strip header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'rgba(200,184,138,0.10)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="#C8B88A" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium tracking-widest uppercase" style={{ color: '#C8B88A' }}>
              From the Blog
            </p>
            <p className="text-sm font-light" style={{ color: '#7A6A50' }}>
              Thinking behind the work
            </p>
          </div>
        </div>
        <a
          href="/resources/blogs"
          className="text-xs font-medium flex items-center gap-1 hover:opacity-80 transition-opacity"
          style={{ color: '#C8B88A' }}
        >
          All Articles
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Blog teasers */}
      <div className="grid sm:grid-cols-3 gap-4">
        {FEATURED_BLOGS.map((blog) => (
          <div
            key={blog.title}
            onClick={() => onBlogClick(blog.title)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onBlogClick(blog.title)}
            className="group cursor-pointer rounded-xl p-4 transition-all duration-200 focus:outline-none focus:ring-2"
            style={{ backgroundColor: '#2A1E0C', border: '1px solid rgba(200,184,138,0.08)' }}
            aria-label={`Read blog: ${blog.title}`}
          >
            <span
              className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2"
              style={{ backgroundColor: 'rgba(200,184,138,0.10)', color: '#C8B88A' }}
            >
              {blog.tag}
            </span>
            <p
              className="text-sm font-medium leading-snug mb-2 group-hover:text-amber-200 transition-colors duration-200 line-clamp-2"
              style={{ color: '#E8D8B0' }}
            >
              {blog.title}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: '#C8B88A' }}>{blog.readTime} read</span>
              <span className="text-xs" style={{ color: '#3A2808' }}>·</span>
              <span className="text-xs" style={{ color: '#6A5030' }}>{blog.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// =====================================================
// REPORTS ADVERTISEMENT STRIP
// Inserted after batch 2 (50 studies loaded).
// Dark teal / emerald identity.
// =====================================================

interface ReportsStripProps {
  onReportClick: (title: string) => void;
}

const ReportsAdvertStrip: FC<ReportsStripProps> = ({ onReportClick }) => (
  <div
    className="my-12 rounded-2xl overflow-hidden"
    style={{ backgroundColor: '#061814', border: '1px solid rgba(52,211,153,0.10)' }}
  >
    <div className="px-6 sm:px-8 py-6 sm:py-8">
      {/* Strip header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'rgba(52,211,153,0.10)' }}
          >
            <svg className="w-4 h-4" fill="currentColor" style={{ color: '#34D399' }} viewBox="0 0 24 24">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium tracking-widest uppercase" style={{ color: '#34D399' }}>
              Research &amp; Reports
            </p>
            <p className="text-sm font-light" style={{ color: '#1A4A30' }}>
              Data-backed analysis for founders
            </p>
          </div>
        </div>
        <a
          href="/resources/reports"
          className="text-xs font-medium flex items-center gap-1 hover:opacity-80 transition-opacity"
          style={{ color: '#34D399' }}
        >
          All Reports
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Report teasers */}
      <div className="grid sm:grid-cols-3 gap-4">
        {FEATURED_REPORTS.map((report) => (
          <div
            key={report.title}
            onClick={() => onReportClick(report.title)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onReportClick(report.title)}
            className="group cursor-pointer rounded-xl p-4 transition-all duration-200 focus:outline-none focus:ring-2"
            style={{ backgroundColor: '#0A2418', border: '1px solid rgba(52,211,153,0.08)' }}
            aria-label={`Access report: ${report.title}`}
          >
            <span
              className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2"
              style={{ backgroundColor: 'rgba(52,211,153,0.10)', color: '#6EE7B7' }}
            >
              {report.tag}
            </span>
            <p
              className="text-sm font-medium leading-snug mb-2 group-hover:text-emerald-300 transition-colors duration-200 line-clamp-2"
              style={{ color: '#B8F0D8' }}
            >
              {report.title}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: '#34D399' }}>{report.pages}</span>
              <span className="text-xs" style={{ color: '#0A3020' }}>·</span>
              <span className="text-xs" style={{ color: '#1A5030' }}>{report.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// =====================================================
// LOAD MORE SENTINEL
// IntersectionObserver-based. Fires 200px before
// reaching the bottom of the current list.
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
        <div className="flex items-center gap-3" style={{ color: '#2D4A6A' }}>
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm tracking-wide">Loading more case studies…</span>
        </div>
      )}
      {!loading && !hasMore && (
        <p className="text-sm" style={{ color: '#1E3A52' }}>
          All {totalCount} case studies loaded.
        </p>
      )}
    </div>
  );
};

// =====================================================
// PAGE ROOT COMPONENT
// Orchestrates: filter → batched render → ad strips →
// infinite scroll sentinel → partner auth modal.
// =====================================================

export default function CaseStudiesHubPage(): React.JSX.Element {
  const [activeTag, setActiveTag]     = useState<string>('All');
  const [loadedCount, setLoadedCount] = useState<number>(BATCH_SIZE);
  const [isLoading, setIsLoading]     = useState<boolean>(false);
  const [modalState, setModalState]   = useState<ModalState>({ open: false, title: '' });

  // Filtered set derived from active tag
  const filteredStudies: CaseStudy[] = activeTag === 'All'
    ? ALL_CASE_STUDIES
    : ALL_CASE_STUDIES.filter((s) => s.tag === activeTag);

  const visibleStudies: CaseStudy[] = filteredStudies.slice(0, loadedCount);
  const hasMore: boolean             = loadedCount < filteredStudies.length;

  // Reset batch on filter change
  useEffect(() => {
    setLoadedCount(BATCH_SIZE);
  }, [activeTag]);

  // IntersectionObserver callback — load next 25 after 600ms simulated delay
  const loadMore = useCallback((): void => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setLoadedCount((prev) => Math.min(prev + BATCH_SIZE, filteredStudies.length));
      setIsLoading(false);
    }, 600);
  }, [isLoading, hasMore, filteredStudies.length]);

  const openModal  = (title: string): void => setModalState({ open: true, title });
  const closeModal = (): void => setModalState({ open: false, title: '' });

  // Batch slices with ad strip insertion points
  const batch1: CaseStudy[]     = visibleStudies.slice(0, 25);
  const batch2: CaseStudy[]     = visibleStudies.slice(25, 50);
  const batch3: CaseStudy[]     = visibleStudies.slice(50);

  const featured: CaseStudy | undefined = batch1[0];
  const restBatch1: CaseStudy[]         = batch1.slice(1);

  const showBlogsStrip   = visibleStudies.length >= 25;
  const showReportsStrip = visibleStudies.length >= 50;

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

      <main className="min-h-screen" style={{ backgroundColor: '#060F1C' }}>

        {/* ── Hero ─────────────────────────────────────── */}
        <HeroSection />

        {/* ── Content Area ─────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

          {/* Filter bar + count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <TagFilterBar activeTag={activeTag} onTagChange={setActiveTag} />
            <p className="text-sm flex-shrink-0" style={{ color: '#2D4A6A' }}>
              {filteredStudies.length} case{' '}
              {filteredStudies.length !== 1 ? 'studies' : 'study'}
              {activeTag !== 'All' && (
                <> in <em style={{ color: '#4B78A0' }}>{activeTag}</em></>
              )}
            </p>
          </div>

          {/* ── BATCH 1 ───────────────────────────────── */}
          {featured && (
            <div className="mb-8">
              <FeaturedCaseStudyCard study={featured} onOpen={openModal} />
            </div>
          )}

          {restBatch1.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {restBatch1.map((study, i) => (
                <CaseStudyCard
                  key={study.id}
                  study={study}
                  onOpen={openModal}
                  animIndex={i}
                />
              ))}
            </div>
          )}

          {/* ── BLOGS AD STRIP — after batch 1 ────────── */}
          {showBlogsStrip && (
            <BlogsAdvertStrip onBlogClick={openModal} />
          )}

          {/* ── BATCH 2 ───────────────────────────────── */}
          {batch2.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {batch2.map((study, i) => (
                <CaseStudyCard
                  key={study.id}
                  study={study}
                  onOpen={openModal}
                  animIndex={i}
                />
              ))}
            </div>
          )}

          {/* ── REPORTS AD STRIP — after batch 2 ─────── */}
          {showReportsStrip && (
            <ReportsAdvertStrip onReportClick={openModal} />
          )}

          {/* ── BATCH 3 ───────────────────────────────── */}
          {batch3.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {batch3.map((study, i) => (
                <CaseStudyCard
                  key={study.id}
                  study={study}
                  onOpen={openModal}
                  animIndex={i}
                />
              ))}
            </div>
          )}

          {/* ── Empty state ───────────────────────────── */}
          {filteredStudies.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg font-light mb-1" style={{ color: '#C8DEFF' }}>
                No case studies in &ldquo;{activeTag}&rdquo; yet
              </p>
              <p className="text-sm" style={{ color: '#2D4A6A' }}>
                Try a different category or{' '}
                <button
                  type="button"
                  className="underline"
                  style={{ color: '#60A5FA' }}
                  onClick={() => setActiveTag('All')}
                >
                  view all
                </button>
                .
              </p>
            </div>
          )}

          {/* ── Load more sentinel ────────────────────── */}
          {filteredStudies.length > 0 && (
            <LoadMoreSentinel
              onVisible={loadMore}
              loading={isLoading}
              hasMore={hasMore}
              totalCount={filteredStudies.length}
            />
          )}

        </div>
      </main>

      {/* ── Partner Auth Modal ────────────────────────── */}
      <PartnerAuthModal
        isOpen={modalState.open}
        onClose={closeModal}
        resourceTitle={modalState.title}
      />
    </>
  );
}