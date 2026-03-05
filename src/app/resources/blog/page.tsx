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

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  date: string;
  featured?: boolean;
}

interface ReportTeaser {
  title: string;
  pages: string;
  date: string;
  tag: string;
}

interface CaseStudyTeaser {
  title: string;
  sector: string;
  year: string;
  tag: string;
}

interface PartnerFormData {
  partnerId: string;
  password: string;
}

interface ModalState {
  open: boolean;
  title: string;
}

// =====================================================
// BLOG DATA — 75 posts total, loaded in batches of 25
// =====================================================

const ALL_BLOGS: BlogPost[] = [
  // Batch 1 — 1–25
  { id: 1,  title: "Why Most Startups Scale Before They're Ready",         excerpt: "The hidden cost of premature scaling and how to identify the real inflection point before committing resources.",                             tag: "Strategy",    readTime: "8 min",  date: "Feb 18, 2026", featured: true  },
  { id: 2,  title: "Pricing Is a Strategy, Not a Number",                   excerpt: "How founders consistently undervalue their product — and the structural reasons pricing decisions go wrong.",                                   tag: "Revenue",     readTime: "6 min",  date: "Feb 14, 2026" },
  { id: 3,  title: "The Difference Between Traction and Progress",          excerpt: "Vanity metrics vs. signal. Why your dashboard can look healthy while the business quietly deteriorates.",                                       tag: "Metrics",     readTime: "5 min",  date: "Feb 10, 2026" },
  { id: 4,  title: "Cash Flow vs Profit: What Early Founders Get Wrong",    excerpt: "A practical breakdown of why profitable businesses still run out of money — and how to read your own cash position clearly.",                  tag: "Finance",     readTime: "7 min",  date: "Feb 6, 2026"  },
  { id: 5,  title: "How to Know When You've Found Product-Market Fit",      excerpt: "The indicators that actually matter, beyond user counts, NPS scores, and download numbers that investors love to cite.",                       tag: "PMF",         readTime: "9 min",  date: "Jan 30, 2026" },
  { id: 6,  title: "The Founder's Trap: Why You're the Bottleneck",         excerpt: "Structural reasons founders become the ceiling of their own companies — and what building beyond yourself actually requires.",                 tag: "Operations",  readTime: "6 min",  date: "Jan 25, 2026" },
  { id: 7,  title: "Second-Order Thinking in Business Decisions",           excerpt: "How to anticipate downstream consequences before committing to major pivots, hiring decisions, and pricing moves.",                            tag: "Thinking",    readTime: "10 min", date: "Jan 20, 2026" },
  { id: 8,  title: "When to Raise, When to Bootstrap, When to Do Neither", excerpt: "A framework for capital decisions based on your actual business model — not your stage, sector, or what peers are doing.",                     tag: "Fundraising", readTime: "8 min",  date: "Jan 15, 2026" },
  { id: 9,  title: "Why Customer Discovery Never Ends",                     excerpt: "The ongoing discipline of staying close to customers as you scale — and what founders lose when they stop doing it themselves.",              tag: "Customers",   readTime: "5 min",  date: "Jan 10, 2026" },
  { id: 10, title: "The Anatomy of a Good Advisory Relationship",           excerpt: "What to expect from advisors, how to structure the relationship, and the signs that one has stopped being productive.",                        tag: "Advisory",    readTime: "6 min",  date: "Jan 5, 2026"  },
  { id: 11, title: "How to Build a Revenue Model That Survives Stress",     excerpt: "Most revenue models look good in calm conditions. This is about designing for the conditions that actually kill companies.",                  tag: "Revenue",     readTime: "7 min",  date: "Dec 28, 2025" },
  { id: 12, title: "The Real Meaning of Capital Efficiency",                excerpt: "Capital efficiency isn't about spending less. It's about the rate at which capital converts into durable, defensible value.",                  tag: "Finance",     readTime: "6 min",  date: "Dec 22, 2025" },
  { id: 13, title: "Why Positioning Fails When Everything Is True",         excerpt: "When every claim in your positioning is accurate — but still doesn't land. The structural problem behind unclear messaging.",                 tag: "Strategy",    readTime: "8 min",  date: "Dec 16, 2025" },
  { id: 14, title: "Delegation Is a Skill, Not a Personality Trait",        excerpt: "Why founders who struggle to delegate aren't 'control freaks' — they're operating without the right infrastructure to trust.",              tag: "Operations",  readTime: "5 min",  date: "Dec 10, 2025" },
  { id: 15, title: "What Burn Rate Actually Tells You",                     excerpt: "Beyond the surface number: how to read burn rate as a signal about your operational assumptions, not just your spending.",                    tag: "Finance",     readTime: "6 min",  date: "Dec 4, 2025"  },
  { id: 16, title: "The Problem With 'Minimum Viable Product'",             excerpt: "How MVP thinking, taken too literally, produces products that validate the wrong things and delay real learning.",                            tag: "Product",     readTime: "9 min",  date: "Nov 28, 2025" },
  { id: 17, title: "Churn Is a Symptom, Not the Disease",                   excerpt: "High churn tells you something is wrong. Diagnosing what — without the usual surface-level explanations — is the actual work.",             tag: "Revenue",     readTime: "7 min",  date: "Nov 22, 2025" },
  { id: 18, title: "How Founders Misread Their Own Sales Process",          excerpt: "The gap between what founders believe about their sales funnel and what the data shows is often wide — and expensive.",                       tag: "Revenue",     readTime: "8 min",  date: "Nov 16, 2025" },
  { id: 19, title: "Building in Public: Signal or Noise?",                  excerpt: "When transparency builds community and when it distracts from the actual work of building. A framework for the right kind of openness.",     tag: "Strategy",    readTime: "5 min",  date: "Nov 10, 2025" },
  { id: 20, title: "The Hidden Costs of Fast Hiring",                       excerpt: "Speed-hiring feels like scaling. Often it's debt accumulation — cultural, operational, and financial — that compounds quietly.",             tag: "Operations",  readTime: "7 min",  date: "Nov 4, 2025"  },
  { id: 21, title: "Why Your Pitch Deck Isn't the Problem",                 excerpt: "Founders spend weeks refining slides when the underlying business model hasn't earned the right to be funded yet.",                          tag: "Fundraising", readTime: "6 min",  date: "Oct 29, 2025" },
  { id: 22, title: "What 'Product-Led Growth' Actually Requires",           excerpt: "PLG isn't a marketing strategy. It's an architectural decision that demands specific product characteristics most teams don't have.",         tag: "Product",     readTime: "9 min",  date: "Oct 23, 2025" },
  { id: 23, title: "How to Think About Category Creation",                  excerpt: "Creating a category sounds like the ambitious move. It usually isn't. When it makes sense — and the cost of being wrong.",                   tag: "Strategy",    readTime: "8 min",  date: "Oct 17, 2025" },
  { id: 24, title: "The Trouble With Market Size Calculations",             excerpt: "TAM slides look convincing in pitch decks. The assumptions underneath them rarely survive contact with actual market behavior.",              tag: "Metrics",     readTime: "6 min",  date: "Oct 11, 2025" },
  { id: 25, title: "Why Founders Confuse Momentum With Direction",          excerpt: "Activity, meetings, launches, and growth can all be happening while the fundamental direction of the business becomes less clear.",          tag: "Strategy",    readTime: "7 min",  date: "Oct 5, 2025"  },
  // Batch 2 — 26–50
  { id: 26, title: "The Org Chart Is a Hypothesis",                         excerpt: "Your org structure encodes assumptions about how work flows, where decisions get made, and what the company believes about accountability.",   tag: "Operations",  readTime: "7 min",  date: "Sep 29, 2025" },
  { id: 27, title: "How to Price a B2B Product",                            excerpt: "Value-based, cost-plus, competitor-anchored — each model has a logic. Understanding which one fits your situation changes everything.",       tag: "Revenue",     readTime: "8 min",  date: "Sep 23, 2025" },
  { id: 28, title: "What Investor Due Diligence Actually Looks Like",       excerpt: "Beyond the financial audit: how serious investors assess founder psychology, market assumptions, and the structural risks they won't fund.",  tag: "Fundraising", readTime: "9 min",  date: "Sep 17, 2025" },
  { id: 29, title: "The Right Time to Hire a CFO",                          excerpt: "Most early-stage founders hire financial leadership too late — and for the wrong reasons. A practical framework for the decision.",          tag: "Finance",     readTime: "6 min",  date: "Sep 11, 2025" },
  { id: 30, title: "Network Effects Don't Work the Way You Think",          excerpt: "The term is widely used and rarely understood. Most startups claiming network effects don't have them — and that matters.",                   tag: "Strategy",    readTime: "8 min",  date: "Sep 5, 2025"  },
  { id: 31, title: "How to Run a Board Meeting That Actually Helps",        excerpt: "Most board meetings are reporting sessions. Founders who run them well turn them into something that genuinely improves decisions.",          tag: "Operations",  readTime: "5 min",  date: "Aug 30, 2025" },
  { id: 32, title: "Why Go-to-Market Fails Quietly",                        excerpt: "The GTM strategy looked right on paper. The failure happens in the translation — where assumptions stop being assumptions and become costs.", tag: "Revenue",     readTime: "7 min",  date: "Aug 24, 2025" },
  { id: 33, title: "Understanding Investor Signaling Risk",                 excerpt: "Who invested in your last round, what they paid, and what they said about it — these send signals to your next investor before you speak.",  tag: "Fundraising", readTime: "6 min",  date: "Aug 18, 2025" },
  { id: 34, title: "When a Pivot Is Avoidance in Disguise",                 excerpt: "Not every pivot is strategic repositioning. Sometimes it's a response to discomfort that leaves the real problem unsolved.",               tag: "Strategy",    readTime: "8 min",  date: "Aug 12, 2025" },
  { id: 35, title: "The Economics of Customer Success",                     excerpt: "CS isn't a cost center. When built correctly, it's a revenue protection and expansion engine — with measurable return on investment.",      tag: "Revenue",     readTime: "7 min",  date: "Aug 6, 2025"  },
  { id: 36, title: "Founder-Market Fit Is Underrated",                      excerpt: "We talk about product-market fit but not about whether the founder is the right person to build this specific product in this market.",       tag: "Thinking",    readTime: "6 min",  date: "Jul 31, 2025" },
  { id: 37, title: "What 'We Need More Leads' Usually Means",               excerpt: "Founders diagnose revenue problems as top-of-funnel problems. Often they're conversion, retention, or positioning problems instead.",        tag: "Revenue",     readTime: "5 min",  date: "Jul 25, 2025" },
  { id: 38, title: "How to Evaluate a Term Sheet",                          excerpt: "Valuation gets the attention. The terms that actually change your outcome — liquidation preference, anti-dilution, pro-rata — often don't.", tag: "Fundraising", readTime: "10 min", date: "Jul 19, 2025" },
  { id: 39, title: "The Problem With Consensus Culture",                    excerpt: "Teams that make decisions by consensus often make them slowly, make them safely, and avoid the ones that actually matter.",                  tag: "Operations",  readTime: "6 min",  date: "Jul 13, 2025" },
  { id: 40, title: "Why Your Dashboard Might Be Lying",                     excerpt: "Data tells you what happened. It doesn't tell you why, and it doesn't tell you what to do. The gap between data and insight is real.",      tag: "Metrics",     readTime: "7 min",  date: "Jul 7, 2025"  },
  { id: 41, title: "Structured Thinking for Unstructured Problems",         excerpt: "Most founder decisions happen in conditions where the problem is unclear. Frameworks for navigating ambiguity without paralysis.",           tag: "Thinking",    readTime: "9 min",  date: "Jul 1, 2025"  },
  { id: 42, title: "The Two Types of Startup Debt",                         excerpt: "Technical debt gets discussed. Cultural debt — accumulated norms, workarounds, and deferred conversations — is often more expensive.",       tag: "Operations",  readTime: "6 min",  date: "Jun 25, 2025" },
  { id: 43, title: "How to Retain Your Best Employees",                     excerpt: "Compensation is rarely the first reason people leave. The conditions that actually drive attrition — and how to address them structurally.",  tag: "Operations",  readTime: "7 min",  date: "Jun 19, 2025" },
  { id: 44, title: "The Compounding Cost of Unclear Roles",                 excerpt: "When ownership is ambiguous, teams move slowly, conflict increases, and the best people quietly disengage before they formally quit.",        tag: "Operations",  readTime: "5 min",  date: "Jun 13, 2025" },
  { id: 45, title: "Why Strategic Planning Fails in Startups",              excerpt: "Annual planning processes built for stable businesses create the illusion of control in environments where conditions change quarterly.",      tag: "Strategy",    readTime: "8 min",  date: "Jun 7, 2025"  },
  { id: 46, title: "The Case for Fewer Metrics",                            excerpt: "More dashboards don't create more clarity. The discipline of choosing three metrics that actually matter — and watching only those.",        tag: "Metrics",     readTime: "5 min",  date: "Jun 1, 2025"  },
  { id: 47, title: "What 'Default Alive' Actually Demands",                 excerpt: "Paul Graham's concept is widely quoted and rarely operationalized. What it concretely requires from your unit economics and burn rate.",      tag: "Finance",     readTime: "7 min",  date: "May 26, 2025" },
  { id: 48, title: "Why Founders Underestimate Operational Complexity",     excerpt: "Building the product is the understandable part. The operational infrastructure required to deliver it reliably — that's where growth stalls.", tag: "Operations",  readTime: "6 min",  date: "May 20, 2025" },
  { id: 49, title: "The Right Way to Think About Competitive Moats",        excerpt: "Moats aren't features. They're structural advantages that compound over time and make it progressively harder for competitors to close the gap.", tag: "Strategy",  readTime: "9 min",  date: "May 14, 2025" },
  { id: 50, title: "How to Give Feedback That Changes Behavior",            excerpt: "Most feedback conversations happen too late, are too vague, and don't create the accountability structure needed for actual change.",         tag: "Operations",  readTime: "6 min",  date: "May 8, 2025"  },
  // Batch 3 — 51–75
  { id: 51, title: "The Quiet Signals of Culture Drift",                    excerpt: "Cultures don't collapse suddenly. They drift — through small decisions, missed conversations, and what gets tolerated without comment.",      tag: "Operations",  readTime: "7 min",  date: "May 2, 2025"  },
  { id: 52, title: "Revenue Concentration Risk: When One Client Is Too Big",excerpt: "When one customer represents more than 30% of revenue, the business's risk profile changes fundamentally — and most founders underweight it.", tag: "Finance",   readTime: "6 min",  date: "Apr 26, 2025" },
  { id: 53, title: "Why Customer Interviews Are Usually Wrong",             excerpt: "What customers say they want and what they'll pay for are different things. The discipline of asking better questions.",                       tag: "Customers",   readTime: "8 min",  date: "Apr 20, 2025" },
  { id: 54, title: "The Discipline of Strategic Refusal",                   excerpt: "Saying no is a strategy. The opportunities founders decline define the company as much as the ones they pursue.",                             tag: "Strategy",    readTime: "5 min",  date: "Apr 14, 2025" },
  { id: 55, title: "How to Build Trust With Investors Before You Raise",    excerpt: "The relationship that closes a round rarely starts when the deck is sent. Building investor trust is a slow, deliberate process.",           tag: "Fundraising", readTime: "7 min",  date: "Apr 8, 2025"  },
  { id: 56, title: "The Unit Economics of Services Businesses",             excerpt: "SaaS metrics don't map cleanly onto services. The distinct economics of time-sold businesses — and how to evaluate their health.",            tag: "Finance",     readTime: "8 min",  date: "Apr 2, 2025"  },
  { id: 57, title: "What 'Moving Fast' Actually Breaks",                    excerpt: "Speed has real value. It also has real costs — most of which don't appear immediately and aren't measured by velocity metrics.",             tag: "Operations",  readTime: "6 min",  date: "Mar 27, 2025" },
  { id: 58, title: "How to Diagnose a Stalled Sales Funnel",                excerpt: "When deals stop converting, there are six likely failure points. Identifying which one is causing the stall changes the response entirely.",   tag: "Revenue",     readTime: "9 min",  date: "Mar 21, 2025" },
  { id: 59, title: "The Myth of the Visionary Founder",                     excerpt: "Vision is necessary. It's not sufficient, and over-indexing on it produces a specific kind of organizational blindness that kills companies.", tag: "Thinking",    readTime: "7 min",  date: "Mar 15, 2025" },
  { id: 60, title: "Why Some Fundraises Take Three Months and Others Take Nine", excerpt: "The variables that determine fundraise duration aren't always obvious — and many of them are controllable before the process starts.",  tag: "Fundraising", readTime: "8 min",  date: "Mar 9, 2025"  },
  { id: 61, title: "The Case Against Premature Internationalization",       excerpt: "Going global feels like growth. Often it's a way of adding complexity to a model that hasn't been fully validated domestically.",           tag: "Strategy",    readTime: "6 min",  date: "Mar 3, 2025"  },
  { id: 62, title: "How to Rebuild a Sales Process After a Bad Quarter",    excerpt: "One bad quarter exposes structural issues. The right response is diagnostic, not motivational — and it starts with the data.",             tag: "Revenue",     readTime: "7 min",  date: "Feb 25, 2025" },
  { id: 63, title: "What Makes a Co-Founder Relationship Work",             excerpt: "Equity splits get discussed. The harder questions — decision authority, conflict resolution, and exit alignment — rarely do.",              tag: "Operations",  readTime: "8 min",  date: "Feb 19, 2025" },
  { id: 64, title: "The Economics of a Freemium Model",                     excerpt: "Freemium can be a brilliant acquisition channel or an expensive hobby. The math that determines which one you actually have.",              tag: "Revenue",     readTime: "7 min",  date: "Feb 13, 2025" },
  { id: 65, title: "Why D2C Brands Plateau After Early Growth",             excerpt: "The CAC-LTV dynamics that make early D2C growth look sustainable — and why the curve bends when you exhaust the easy audience.",           tag: "Revenue",     readTime: "9 min",  date: "Feb 7, 2025"  },
  { id: 66, title: "How Investors Read Management Accounts",                excerpt: "The numbers investors look at, in the order they look at them, and what each one signals about the quality of the business underneath.",     tag: "Finance",     readTime: "8 min",  date: "Feb 1, 2025"  },
  { id: 67, title: "The Problem With Feature Roadmaps",                     excerpt: "Roadmaps communicate priorities. They also create false certainty about a future that responds to learning, not planning.",                  tag: "Product",     readTime: "6 min",  date: "Jan 26, 2025" },
  { id: 68, title: "Building for Enterprise: What Actually Changes",        excerpt: "Moving upmarket isn't just about bigger contracts. The sales cycle, security requirements, and organizational dynamics are genuinely different.", tag: "Revenue",   readTime: "9 min",  date: "Jan 20, 2025" },
  { id: 69, title: "Why Some Teams Execute and Others Don't",               excerpt: "Execution quality is often attributed to talent. The structural conditions that produce consistent execution are less visible and more important.", tag: "Operations", readTime: "7 min", date: "Jan 14, 2025" },
  { id: 70, title: "The Fundraising Market Has Changed: What It Means",     excerpt: "The conditions that made 2021 easy are gone. What the current environment demands from founders before, during, and after a raise.",       tag: "Fundraising", readTime: "8 min",  date: "Jan 8, 2025"  },
  { id: 71, title: "How to Structure a Strategic Partnership",              excerpt: "Most partnerships underdeliver because the incentive structures are misaligned. A framework for deals that actually produce outcomes.",       tag: "Strategy",    readTime: "6 min",  date: "Jan 2, 2025"  },
  { id: 72, title: "The Conversation You're Avoiding With Your Team",       excerpt: "Unspoken misalignments in founding teams accumulate silently. The structural reasons founders defer important conversations — and the cost.", tag: "Operations",  readTime: "5 min",  date: "Dec 27, 2024" },
  { id: 73, title: "Why Retention Is a Better Growth Lever Than Acquisition",excerpt: "The math of retention vs. acquisition is widely known. Why founders still over-index on acquisition — and how to shift the balance.",      tag: "Revenue",     readTime: "7 min",  date: "Dec 21, 2024" },
  { id: 74, title: "How to Think About Your First Institutional Round",     excerpt: "The seed-to-Series A transition changes the game. What to prepare, what to expect, and what the process will demand from you personally.",   tag: "Fundraising", readTime: "9 min",  date: "Dec 15, 2024" },
  { id: 75, title: "The Long Game: Building a Business That Compounds",     excerpt: "Most founders optimize for the next milestone. The decisions that compound over 10 years are different — and they start on day one.",       tag: "Strategy",    readTime: "10 min", date: "Dec 9, 2024"  },
];

// =====================================================
// ADVERTISED REPORTS — teaser strip between batches
// =====================================================

const FEATURED_REPORTS: ReportTeaser[] = [
  { title: "Indian Startup Ecosystem Report 2026",          pages: "142 pages", date: "Feb 2026",  tag: "Annual Report"  },
  { title: "State of B2B SaaS in India — 2025 Review",     pages: "68 pages",  date: "Dec 2025",  tag: "Sector Report"  },
  { title: "The Fundability Framework — Investor Report",   pages: "52 pages",  date: "Jun 2025",  tag: "Framework"      },
];

// =====================================================
// ADVERTISED CASE STUDIES — teaser strip between batches
// =====================================================

const FEATURED_CASE_STUDIES: CaseStudyTeaser[] = [
  { title: "From ₹80L to ₹5Cr: Restructuring a Fragile Revenue Base", sector: "B2B SaaS",    year: "2024", tag: "Revenue"     },
  { title: "Fixing the Unit Economics Before the Series A",            sector: "D2C",          year: "2024", tag: "Fundraising" },
  { title: "The Pivot That Saved a Fintech Startup",                   sector: "Fintech",      year: "2023", tag: "Pivot"       },
];

const BATCH_SIZE = 25;

// =====================================================
// TAG COLOR MAP — updated to use blues from homepage palette
// =====================================================

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Strategy:    { bg: '#DBEAFE', text: '#1E40AF' },   // blue-100, blue-800
  Revenue:     { bg: '#E0F2FE', text: '#0369A1' },   // blue-100 variant, blue-700
  Finance:     { bg: '#E6F0FF', text: '#1E3A8A' },   // custom light blue, blue-900
  Metrics:     { bg: '#DBEAFE', text: '#1E40AF' },
  PMF:         { bg: '#E0E7FF', text: '#3730A3' },   // indigo-100, indigo-800 (close to blue)
  Operations:  { bg: '#E6F0FF', text: '#1E3A8A' },
  Thinking:    { bg: '#DBEAFE', text: '#1E40AF' },
  Fundraising: { bg: '#E0F2FE', text: '#0369A1' },
  Customers:   { bg: '#E6F0FF', text: '#1E3A8A' },
  Advisory:    { bg: '#E0E7FF', text: '#3730A3' },
  Product:     { bg: '#DBEAFE', text: '#1E40AF' },
};

const getTagStyle = (tag: string): { bg: string; text: string } =>
  TAG_COLORS[tag] ?? { bg: '#DBEAFE', text: '#1E40AF' };

// =====================================================
// PARTNER AUTH MODAL — redesigned to match homepage modal
// =====================================================

interface PartnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle: string;
}

const PartnerAuthModal: FC<PartnerAuthModalProps> = ({ isOpen, onClose, resourceTitle }) => {
  const [formData, setFormData]     = useState<PartnerFormData>({ partnerId: '', password: '' });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading]       = useState<boolean>(false);
  const [error, setError]           = useState<string>('');
  const [success, setSuccess]       = useState<boolean>(false);

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
      <div className="relative w-full max-w-md" style={{ animation: 'modalIn 0.3s cubic-bezier(0.22,1,0.36,1) both' }}>
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
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
              Enter your partner credentials to read: <span className="font-medium text-gray-700">{resourceTitle}</span>
            </p>
          </div>

          {/* Modal Body */}
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
                  ) : 'Read Article'}
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
// HERO SECTION — colors updated to homepage palette
// =====================================================

const HeroSection: FC = () => (
  <section
    className="relative overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8"
    style={{ backgroundColor: '#0A1E3D', minHeight: '520px' }}
  >
    {/* Background — fine diagonal hatching using blue-300 */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hatch" patternUnits="userSpaceOnUse" width="12" height="12" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="12" stroke="#93C5FD" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hatch)" />
      </svg>
      {/* Warm glow bottom-left — using blue-300 with opacity */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[300px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(147,197,253,0.08) 0%, transparent 70%)' }}
      />
    </div>

    <div className="max-w-7xl mx-auto relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT */}
        <div className="space-y-7">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ backgroundColor: 'rgba(147,197,253,0.08)', border: '1px solid rgba(147,197,253,0.18)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#93C5FD' }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#93C5FD' }}>
              Sarsen &amp; Company · Blogs
            </span>
          </div>

          <div className="space-y-4">
            <h1
              className="font-light leading-none tracking-tight text-white"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              }}
            >
              Thinking
              <br />
              <span style={{ color: '#ffffff' }}>Out Loud.</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed max-w-md font-light text-gray-400">
              In-depth perspectives on strategy, revenue architecture, capital decisions, and the structural realities of building startups in India.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 pt-2">
            {[
              { value: '75+',  label: 'Articles'   },
              { value: '11',   label: 'Categories'  },
              { value: '5 min', label: 'Avg. read'  },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-light text-white">{stat.value}</p>
                <p className="text-xs tracking-widest uppercase text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — SVG visual placeholder (unchanged layout, only colors adjusted) */}
        <div
          className="relative hidden lg:flex items-center justify-end"
          style={{ height: '420px' }}
          aria-hidden="true"
        >
          <div className="relative w-full max-w-lg h-full flex items-center justify-center">
            {/* Large decorative quotation mark — now using blue-300 with low opacity */}
            <span
              className="absolute select-none"
              style={{
                fontSize: '22rem',
                color: 'rgba(147,197,253,0.05)',
                lineHeight: 1,
                top: '-2rem',
                right: '-1rem',
              }}
            >
              &ldquo;
            </span>
            {/* Stacked lines — using blue-300 with varying opacity */}
            <div className="relative z-10 space-y-3 w-72">
              {[90, 75, 60, 85, 50, 70, 40].map((w, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    height: '3px',
                    width: `${w}%`,
                    background: `rgba(147,197,253,${0.06 + i * 0.04})`,
                  }}
                />
              ))}
              <div
                className="mt-6 rounded-full"
                style={{ height: '2px', width: '30%', background: 'rgba(147,197,253,0.35)' }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

// =====================================================
// FEATURED BLOG CARD — colors updated
// =====================================================

interface FeaturedCardProps {
  post: BlogPost;
  onRead: (title: string) => void;
}

const FeaturedBlogCard: FC<FeaturedCardProps> = ({ post, onRead }) => {
  const tagStyle = getTagStyle(post.tag);
  return (
    <article
      onClick={() => onRead(post.title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onRead(post.title)}
      className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#93C5FD]"
      style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.12)' }}
      aria-label={`Read: ${post.title}`}
    >
      {/* Decorative header band */}
      <div
        className="relative h-40 sm:h-48 px-8 flex items-end pb-6 overflow-hidden"
        style={{ backgroundColor: '#0A1E3D' }}
      >
        <div className="absolute inset-0 flex items-center justify-end pr-8 opacity-[0.06]">
          <span style={{ fontSize: '140px', color: '#93C5FD', lineHeight: 1 }}>
            &ldquo;
          </span>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {post.tag}
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(147,197,253,0.08)', color: '#93C5FD', border: '1px solid rgba(147,197,253,0.15)' }}
          >
            Featured
          </span>
        </div>
      </div>

      <div className="px-8 py-6">
        <h2
          className="font-light leading-snug mb-3 group-hover:text-[#93C5FD] transition-colors duration-200 text-white"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
        >
          {post.title}
        </h2>
        <p className="text-sm leading-relaxed mb-5 text-gray-400">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">{post.date}</span>
            <span className="text-xs text-gray-500">{post.readTime} read</span>
          </div>
          <div
            className="flex items-center gap-1.5 text-xs font-medium group-hover:gap-2.5 transition-all duration-200"
            style={{ color: '#93C5FD' }}
          >
            Read article
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
// STANDARD BLOG CARD — colors updated
// =====================================================

interface BlogCardProps {
  post: BlogPost;
  onRead: (title: string) => void;
  animIndex: number;
}

const BlogCard: FC<BlogCardProps> = ({ post, onRead, animIndex }) => {
  const tagStyle = getTagStyle(post.tag);
  return (
    <article
      onClick={() => onRead(post.title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onRead(post.title)}
      className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#93C5FD]"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${animIndex * 40}ms both`,
      }}
      aria-label={`Read: ${post.title}`}
    >
      {/* Colour band top — using tag color */}
      <div
        className="h-1.5 w-full"
        style={{ background: `linear-gradient(90deg, ${tagStyle.bg}, transparent)` }}
      />

      <div className="px-5 py-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <span
            className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {post.tag}
          </span>
          {/* Lock indicator — using gray-600 */}
          <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 opacity-30 group-hover:opacity-70 transition-opacity" fill="none" stroke="#4B5563" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h3
          className="font-medium leading-snug mb-2 group-hover:text-[#1E40AF] transition-colors duration-200 line-clamp-2 text-gray-900"
          style={{ fontSize: '0.925rem' }}
        >
          {post.title}
        </h3>
        <p className="text-xs leading-relaxed mb-4 line-clamp-2 text-gray-500">
          {post.excerpt}
        </p>

        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid #E5E7EB' }}
        >
          <span className="text-xs text-gray-500">{post.readTime} read</span>
          <span className="text-xs text-gray-500">{post.date}</span>
        </div>
      </div>
    </article>
  );
};

// =====================================================
// REPORTS ADVERTISEMENT STRIP — colors updated
// =====================================================

interface ReportStripProps {
  onReportClick: (title: string) => void;
}

const ReportsAdvertStrip: FC<ReportStripProps> = ({ onReportClick }) => (
  <div
    className="my-12 rounded-2xl overflow-hidden"
    style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.12)' }}
  >
    <div className="px-6 sm:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-white">
              Research &amp; Reports
            </p>
            <p className="text-sm font-light text-gray-400">
              Data-backed analysis for founders
            </p>
          </div>
        </div>
        <a
          href="/resources/reports"
          className="text-xs font-medium flex items-center gap-1 text-white hover:opacity-80 transition-colors"
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
            className="group cursor-pointer rounded-xl p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            style={{
              backgroundColor: '#132B47',
              border: '1px solid rgba(59,130,246,0.1)',
            }}
            aria-label={`Access report: ${report.title}`}
          >
            <span
              className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2"
              style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#ffffff' }}
            >
              {report.tag}
            </span>
            <p
              className="text-sm font-medium leading-snug mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 text-white"
            >
              {report.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-blue-400">{report.pages}</span>
              <span className="text-xs text-gray-600">·</span>
              <span className="text-xs text-gray-400">{report.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// =====================================================
// CASE STUDIES ADVERTISEMENT STRIP — colors updated
// =====================================================

interface CaseStudyStripProps {
  onCaseStudyClick: (title: string) => void;
}

const CaseStudiesAdvertStrip: FC<CaseStudyStripProps> = ({ onCaseStudyClick }) => (
  <div
    className="my-12 rounded-2xl overflow-hidden"
    style={{ backgroundColor: '#0A1E3D' }}
  >
    <div className="px-6 sm:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#132B47' }}
          >
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-white">
              Case Studies
            </p>
            <p className="text-sm font-light text-gray-400">
              Real decisions. Real outcomes.
            </p>
          </div>
        </div>
        <a
          href="/resources/case-studies"
          className="text-xs font-medium flex items-center gap-1 text-blue-400 hover:opacity-80 transition-colors"
        >
          All Cases
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Case study teasers */}
      <div className="grid sm:grid-cols-3 gap-4">
        {FEATURED_CASE_STUDIES.map((cs) => (
          <div
            key={cs.title}
            onClick={() => onCaseStudyClick(cs.title)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onCaseStudyClick(cs.title)}
            className="group cursor-pointer rounded-xl p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            style={{
              backgroundColor: '#132B47',
              border: '1px solid rgba(59,130,246,0.1)',
            }}
            aria-label={`Access case study: ${cs.title}`}
          >
            <span
              className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2"
              style={{ backgroundColor: 'rgba(59,130,246,0.15)', color: '#ffffff' }}
            >
              {cs.tag}
            </span>
            <p
              className="text-sm font-medium leading-snug mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 text-white"
            >
              {cs.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-300">{cs.sector}</span>
              <span className="text-xs text-gray-600">·</span>
              <span className="text-xs text-gray-400">{cs.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// =====================================================
// LOAD MORE SENTINEL — colors updated
// =====================================================

interface LoadMoreSentinelProps {
  onVisible: () => void;
  loading: boolean;
  hasMore: boolean;
}

const LoadMoreSentinel: FC<LoadMoreSentinelProps> = ({ onVisible, loading, hasMore }) => {
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
    <div ref={ref} className="flex justify-center py-10">
      {loading && (
        <div className="flex items-center gap-3 text-gray-500">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm tracking-wide">Loading more articles…</span>
        </div>
      )}
      {!loading && !hasMore && (
        <p className="text-sm text-gray-500">
          You&apos;ve reached the end — {ALL_BLOGS.length} articles total.
        </p>
      )}
    </div>
  );
};

// =====================================================
// TAG FILTER BAR — updated colors
// =====================================================

const ALL_TAGS: string[] = [
  'All', 'Strategy', 'Revenue', 'Finance', 'Operations',
  'Fundraising', 'Metrics', 'PMF', 'Product', 'Thinking', 'Customers', 'Advisory',
];

interface TagFilterBarProps {
  activeTag: string;
  onTagChange: (tag: string) => void;
}

const TagFilterBar: FC<TagFilterBarProps> = ({ activeTag, onTagChange }) => (
  <div
    className="flex gap-2 overflow-x-auto pb-2"
    style={{ scrollbarWidth: 'none' } as React.CSSProperties}
    role="toolbar"
    aria-label="Filter blogs by category"
  >
    {ALL_TAGS.map((tag) => {
      const isActive = tag === activeTag;
      const style = tag === 'All' ? { bg: '#0A1E3D', text: '#93C5FD' } : getTagStyle(tag);
      return (
        <button
          key={tag}
          type="button"
          onClick={() => onTagChange(tag)}
          className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#93C5FD]"
          style={
            isActive
              ? { backgroundColor: '#0A1E3D', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.40)' }
              : { backgroundColor: style.bg, color: style.text, border: '1px solid transparent', opacity: 0.7 }
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
// MAIN PAGE COMPONENT
// =====================================================

export default function BlogsHubPage() {
  const [activeTag, setActiveTag]     = useState<string>('All');
  const [loadedCount, setLoadedCount] = useState<number>(BATCH_SIZE);
  const [isLoading, setIsLoading]     = useState<boolean>(false);
  const [modalState, setModalState]   = useState<ModalState>({ open: false, title: '' });

  const filteredBlogs: BlogPost[] = activeTag === 'All'
    ? ALL_BLOGS
    : ALL_BLOGS.filter((b) => b.tag === activeTag);

  const visibleBlogs: BlogPost[]  = filteredBlogs.slice(0, loadedCount);
  const hasMore: boolean          = loadedCount < filteredBlogs.length;

  useEffect(() => {
    setLoadedCount(BATCH_SIZE);
  }, [activeTag]);

  const loadMore = useCallback((): void => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setLoadedCount((prev) => Math.min(prev + BATCH_SIZE, filteredBlogs.length));
      setIsLoading(false);
    }, 600);
  }, [isLoading, hasMore, filteredBlogs.length]);

  const openModal  = (title: string): void => setModalState({ open: true, title });
  const closeModal = (): void => setModalState({ open: false, title: '' });

  const showReportStrip     = visibleBlogs.length >= 25;
  const showCaseStudyStrip  = visibleBlogs.length >= 50;

  const batch1: BlogPost[] = visibleBlogs.slice(0, 25);
  const batch2: BlogPost[] = visibleBlogs.slice(25, 50);
  const batch3: BlogPost[] = visibleBlogs.slice(50);

  const featured: BlogPost | undefined   = batch1[0];
  const restBatch1: BlogPost[]           = batch1.slice(1);

  return (
    <>
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px); }
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

      <main className="min-h-screen" style={{ backgroundColor: '#E8EEF2' }}>

        {/* Hero */}
        <HeroSection />

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

          {/* Filter bar + count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <TagFilterBar activeTag={activeTag} onTagChange={setActiveTag} />
            <p className="text-sm flex-shrink-0 text-gray-500">
              {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''}
              {activeTag !== 'All' && <> in <em>{activeTag}</em></>}
            </p>
          </div>

          {/* Batch 1 */}
          {featured && (
            <div className="mb-8">
              <FeaturedBlogCard post={featured} onRead={openModal} />
            </div>
          )}

          {restBatch1.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {restBatch1.map((post, i) => (
                <BlogCard key={post.id} post={post} onRead={openModal} animIndex={i} />
              ))}
            </div>
          )}

          {/* Reports ad strip */}
          {showReportStrip && (
            <ReportsAdvertStrip onReportClick={openModal} />
          )}

          {/* Batch 2 */}
          {batch2.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {batch2.map((post, i) => (
                <BlogCard key={post.id} post={post} onRead={openModal} animIndex={i} />
              ))}
            </div>
          )}

          {/* Case studies ad strip */}
          {showCaseStudyStrip && (
            <CaseStudiesAdvertStrip onCaseStudyClick={openModal} />
          )}

          {/* Batch 3 */}
          {batch3.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {batch3.map((post, i) => (
                <BlogCard key={post.id} post={post} onRead={openModal} animIndex={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredBlogs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-4xl mb-4">📖</p>
              <p className="text-lg font-light mb-1 text-gray-900">
                No articles in &ldquo;{activeTag}&rdquo; yet
              </p>
              <p className="text-sm text-gray-500">
                Try a different category or{' '}
                <button
                  type="button"
                  className="underline text-blue-800"
                  onClick={() => setActiveTag('All')}
                >
                  view all
                </button>
                .
              </p>
            </div>
          )}

          {/* Load more sentinel */}
          {filteredBlogs.length > 0 && (
            <LoadMoreSentinel
              onVisible={loadMore}
              loading={isLoading}
              hasMore={hasMore}
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