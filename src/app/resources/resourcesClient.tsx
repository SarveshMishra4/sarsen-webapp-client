// app/resources/resourcesClient.tsx
'use client';

import React, {
  useState,
  useRef,
  useEffect,
  FC,
  ReactNode,
  MouseEvent,
  FormEvent,
  ChangeEvent,
  UIEvent,
} from 'react';

// =====================================================
// TYPE DEFINITIONS
// =====================================================

interface ResourceItem {
  title: string;
  description: string;
  tag: string;
  meta: string;
}

interface CardStyle {
  sectionBg: string;
  iconBg: string;
  titleColor: string;
  subtitleColor: string;
  ctaBg: string;
  ctaText: string;
  ctaBorder: string;
  arrowBg: string;
  arrowColor: string;
  borderRadius: string;
  cardBg: string;
  cardBorder: string;
  headerBg: (index: number) => string;
  tagBg: string;
  tagText: string;
  lockColor: string;
  bodyBg: string;
  cardTitle: string;
  cardDesc: string;
  divider: string;
  metaColor: string;
  actionBg: string;
  actionIcon: string;
}

interface ResourceSectionConfig {
  id: string;
  title: string;
  subtitle: string;
  items: ResourceItem[];
  cardStyle: CardStyle;
  hubHref: string;
}

interface ModalState {
  open: boolean;
  title: string;
  type: string;
}

interface PartnerFormData {
  partnerId: string;
  password: string;
}

// =====================================================
// PARTNER AUTH MODAL (unchanged)
// =====================================================

interface PartnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle: string;
  resourceType: string;
}

const PartnerAuthModal: FC<PartnerAuthModalProps> = ({
  isOpen,
  onClose,
  resourceTitle,
}) => {
  const [formData, setFormData] = useState<PartnerFormData>({
    partnerId: '',
    password: '',
  });
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
      style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md animate-fadeIn">
        <div className="bg-white rounded-md shadow-2xl overflow-hidden">
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
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-md bg-blue-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-blue-200 text-sm font-medium uppercase">Partner Access</span>
            </div>
            <h2 className="text-2xl text-white">Sign In to Continue</h2>
            <p className="text-blue-200 text-sm mt-1 truncate">
              Accessing: <span className="text-white font-medium">{resourceTitle}</span>
            </p>
          </div>
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
                    onChange={(e) => setFormData((p) => ({ ...p, partnerId: e.target.value }))}
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
                      onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
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
                    'Access Resource'
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 pt-1">
                  Don&apos;t have a Partner ID?{' '}
                  <a href="#" className="text-blue-600 hover:underline">Request Access</a>
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-green-100 rounded-md flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Access Granted</h3>
                <p className="text-gray-500 text-sm">
                  Redirecting you to <span className="font-medium text-gray-700">{resourceTitle}</span>…
                </p>
              </div>
            )}
          </div>
        </div>
        <p className="text-center text-blue-200/60 text-xs mt-4">
          Partner access is monitored and logged for security purposes.
        </p>
      </div>
    </div>
  );
};

// =====================================================
// HERO SECTION (unchanged)
// =====================================================

const CATEGORY_LABELS: string[] = [
  'Blogs',
  'Case Studies',
  'Events',
  'Reports',
  'Cohorts',
  'Tools',
];

const HeroSection: FC = () => {
  return (
    <section
      className="relative bg-[#0A1E3D] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ minHeight: '520px' }}
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-7">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white">
                The Resource
                <span className="block text-blue-300">Hub</span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg max-w-lg">
                Curated knowledge for founders navigating complexity. Access blogs, case studies,
                events, reports, cohorts, and strategic tools — all in one place.
              </p>
            </div>
          </div>
          <div>
            <img src="/assets/resources/Resources Head.svg" alt="" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// RESOURCE CARD — fixed height (300px), bottom row aligned
// =====================================================

interface ResourceCardProps {
  item: ResourceItem;
  cardStyle: CardStyle;
  idx: number;
  onCardClick: () => void;
}

const ResourceCard: FC<ResourceCardProps> = ({ item, cardStyle, idx, onCardClick }) => {
  const accentColor = cardStyle.tagText;

  return (
    <article
      onClick={onCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onCardClick()}
      className="group cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 flex flex-col"
      style={{
        width: '280px',
        minWidth: '280px',
        height: '300px', // fixed height for all cards
        backgroundColor: cardStyle.cardBg,
        border: `1px solid ${cardStyle.cardBorder}`,
      }}
      aria-label={`Open ${item.title}`}
    >
      {/* Top accent line */}
      <div
        className="h-0.5 w-full flex-shrink-0"
        style={{ background: `linear-gradient(90deg, ${accentColor}40, transparent)` }}
      />

      {/* Thumbnail header - fixed height */}
      <div
        className="relative h-28 px-5 flex items-end pb-4 overflow-hidden flex-shrink-0"
        style={{ background: 'linear-gradient(160deg, #132B47 0%, #0A1E3D 100%)' }}
      >
        <div className="absolute top-2 right-3 opacity-10" aria-hidden="true">
          <div className="w-14 h-14 rounded-full border border-blue-400" />
        </div>
        <div className="relative z-10 flex items-center gap-2 flex-wrap">
          <span
            className="px-2.5 py-1 rounded-md text-xs font-semibold"
            style={{ backgroundColor: cardStyle.tagBg, color: cardStyle.tagText }}
          >
            {item.tag}
          </span>
        </div>
        <div
          className="absolute top-4 right-4 z-10 opacity-25 group-hover:opacity-70 transition-opacity"
          aria-hidden="true"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke={cardStyle.lockColor} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>

      {/* Card body - takes remaining space, bottom row pushed to bottom */}
      <div className="px-5 py-4 flex flex-col flex-1" style={{ background: cardStyle.bodyBg }}>
        <div>
          <h3
            className="font-medium mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2"
            style={{ fontSize: '0.9rem', color: cardStyle.cardTitle }}
          >
            {item.title}
          </h3>
          <p className="text-xs mb-4 line-clamp-2" style={{ color: cardStyle.cardDesc }}>
            {item.description}
          </p>
        </div>
        {/* Bottom row - pushed to bottom by mt-auto */}
        <div className="flex items-center justify-between pt-3 mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-md" style={{ color: '#0A1E3D' }}>
              {item.meta}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium group-hover:gap-3 transition-all duration-200" style={{ color: '#60A5FA' }}>
            Access Resource
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
// RESOURCE SECTION — MOVED SCROLL BUTTONS TO HEADER
// =====================================================

interface ResourceSectionProps extends ResourceSectionConfig {
  onCardClick: (title: string, type: string) => void;
}

const ResourceSection: FC<ResourceSectionProps> = ({
  id,
  title,
  subtitle,
  items,
  cardStyle,
  hubHref,
  onCardClick,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState<number>(0);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const updateScrollState = (pos: number): void => {
    setScrollPos(pos);
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollRight(pos < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (dir: 'left' | 'right'): void => {
    if (!scrollRef.current) return;
    const amount = 340;
    const newPos = dir === 'left' ? scrollPos - amount : scrollPos + amount;
    scrollRef.current.scrollTo({ left: newPos, behavior: 'smooth' });
    updateScrollState(newPos);
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>): void => {
    updateScrollState((e.currentTarget as HTMLDivElement).scrollLeft);
  };

  return (
    <section
      id={id}
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: cardStyle.sectionBg }}
      aria-labelledby={`${id}-heading`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header row with title, subtitle, browse button, and scroll buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div className="flex items-start gap-4">
            <div>
              <h2 id={`${id}-heading`} className="text-3xl sm:text-4xl lg:text-5xl" style={{ color: cardStyle.titleColor }}>
                {title}
              </h2>
              <p className="text-sm sm:text-base mt-1 max-w-lg" style={{ color: cardStyle.subtitleColor }}>
                {subtitle}
              </p>
            </div>
          </div>
          
          {/* Right side: Browse All button + scroll buttons */}
          <div className="flex items-center gap-3">
            <a
              href={hubHref}
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm transition-all duration-300 hover:shadow-lg group"
              style={{
                backgroundColor: cardStyle.ctaBg,
                color: cardStyle.ctaText,
                border: `1px solid ${cardStyle.ctaBorder}`,
              }}
            >
              <span>Browse All {title}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            
            {/* Scroll buttons moved here */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={scrollPos <= 0}
                aria-label={`Scroll ${title} cards left`}
                className="rounded-md p-2.5 shadow-lg transition-all duration-200 disabled:opacity-20"
                style={{ backgroundColor: cardStyle.arrowBg, color: cardStyle.arrowColor }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label={`Scroll ${title} cards right`}
                className="rounded-md p-2.5 shadow-lg transition-all duration-200 disabled:opacity-20"
                style={{ backgroundColor: cardStyle.arrowBg, color: cardStyle.arrowColor }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Cards container — no floating buttons anymore */}
        <div
          ref={scrollRef}
          role="list"
          className="flex gap-4 sm:gap-5 overflow-x-auto px-6 sm:px-10 py-3"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
          onScroll={handleScroll}
        >
          {items.map((item, idx) => (
            <ResourceCard
              key={`${id}-${idx}`}
              item={item}
              cardStyle={cardStyle}
              idx={idx}
              onCardClick={() => onCardClick(item.title, title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// =====================================================
// DATA (unchanged)
// =====================================================

const blogsData: ResourceItem[] = [
  { title: 'Why Most Startups Scale Before They\'re Ready', description: 'The hidden cost of premature scaling and how to identify the right inflection point.', tag: 'Strategy', meta: '8 min read' },
  { title: 'Pricing Is a Strategy, Not a Number', description: 'How founders consistently undervalue their product and what to do about it.', tag: 'Revenue', meta: '6 min read' },
  { title: 'The Difference Between Traction and Progress', description: 'Vanity metrics vs. signal — why your dashboard might be lying to you.', tag: 'Metrics', meta: '5 min read' },
  { title: 'Cash Flow vs Profit: What Early Founders Get Wrong', description: 'A practical breakdown of why profitable businesses still run out of money.', tag: 'Finance', meta: '7 min read' },
  { title: 'How to Know When You\'ve Found Product-Market Fit', description: 'The indicators that actually matter, beyond user count and downloads.', tag: 'PMF', meta: '9 min read' },
  { title: 'The Founder\'s Trap: Why You\'re the Bottleneck', description: 'Structural reasons founders become the ceiling of their own companies.', tag: 'Operations', meta: '6 min read' },
  { title: 'Second-Order Thinking in Business Decisions', description: 'How to anticipate downstream consequences before committing to major pivots.', tag: 'Thinking', meta: '10 min read' },
  { title: 'When to Raise, When to Bootstrap, When to Do Neither', description: 'A framework for capital decisions based on your actual business model.', tag: 'Fundraising', meta: '8 min read' },
  { title: 'Why Customer Discovery Never Ends', description: 'The ongoing discipline of staying close to customers as you scale.', tag: 'Customers', meta: '5 min read' },
  { title: 'The Anatomy of a Good Advisory Relationship', description: 'What to expect from advisors and how to make those relationships productive.', tag: 'Advisory', meta: '6 min read' },
];

const caseStudiesData: ResourceItem[] = [
  { title: 'From ₹80L to ₹5Cr: Restructuring a Fragile Revenue Base', description: 'How a SaaS founder rebuilt pricing and retention after a near-fatal churn event.', tag: 'Revenue', meta: 'B2B SaaS · 2024' },
  { title: 'Fixing the Unit Economics Before the Series A', description: 'A D2C brand that recalibrated CAC and LTV to become fundable in 6 months.', tag: 'Fundraising', meta: 'D2C · 2024' },
  { title: 'The Pivot That Saved a Fintech Startup', description: 'Repositioning from SMB to enterprise and what had to change structurally.', tag: 'Pivot', meta: 'Fintech · 2023' },
  { title: 'Building a Sales Process That Works Without the Founder', description: 'Creating repeatable revenue motion in a consulting-heavy professional services firm.', tag: 'Operations', meta: 'B2B Services · 2024' },
  { title: 'Cash Runway Extension Without Cutting Product', description: 'How an edtech company bought 8 months of runway through burn restructuring.', tag: 'Finance', meta: 'Edtech · 2023' },
  { title: 'When the Market Wasn\'t Wrong, the Segment Was', description: 'A health-tech startup\'s journey from B2C failure to B2B product-market fit.', tag: 'PMF', meta: 'Healthtech · 2024' },
  { title: 'Scaling Operations Without Scaling Chaos', description: 'Building the first management layer in a 22-person startup.', tag: 'Scaling', meta: 'Logistics · 2024' },
  { title: 'The Right Deck at the Wrong Time — and What Changed', description: 'Understanding investor readiness vs. deck quality through one founder\'s fundraise.', tag: 'Fundraising', meta: 'Climate Tech · 2023' },
  { title: 'A Pricing Audit That Added 40% to Revenue', description: 'How a founder discovered their pricing strategy was leaving money on the table.', tag: 'Revenue', meta: 'B2B SaaS · 2024' },
  { title: 'Recovering Trust After a Team Breakdown', description: 'Navigating leadership friction and cultural debt at a 30-person company.', tag: 'Leadership', meta: 'Consumer App · 2023' },
];

const eventsData: ResourceItem[] = [
  { title: 'Clarity Summit 2026 — Annual Founders Retreat', description: 'A two-day intensive for founders dealing with scale, strategy, and capital decisions.', tag: 'Retreat', meta: 'Mar 28–29, Mumbai' },
  { title: 'Fundraising Masterclass — Structuring Your Raise', description: 'Live session with Sarsen advisors on investor readiness and term sheet navigation.', tag: 'Masterclass', meta: 'Apr 5, Online' },
  { title: 'Revenue Architecture Workshop', description: 'Hands-on workshop redesigning how founders think about pricing and sales motion.', tag: 'Workshop', meta: 'Apr 12, Bangalore' },
  { title: 'CFO Office Hours — Early-Stage Finance Q&A', description: 'Monthly open session for founders with cash flow and burn-rate questions.', tag: 'Office Hours', meta: 'Apr 18, Online' },
  { title: 'Investor Panel: What We\'re Looking For in 2026', description: 'Four active seed and pre-Series A investors in conversation with Sarsen.', tag: 'Panel', meta: 'May 2, Delhi' },
  { title: 'Operations Unlocked: Building Systems That Scale', description: 'A half-day intensive on org design, accountability, and delegation frameworks.', tag: 'Workshop', meta: 'May 9, Online' },
  { title: 'Product-Market Fit Diagnostic Workshop', description: 'Structured methodology to identify whether you have PMF and what\'s blocking it.', tag: 'Diagnostic', meta: 'May 16, Pune' },
  { title: 'Sarsen Annual Dinner — Cohort Alumni Network', description: 'Private gathering for Sarsen alumni founders and select invited guests.', tag: 'Networking', meta: 'May 23, Mumbai' },
  { title: 'Capital Readiness Audit — Cohort Preview', description: 'A live walkthrough of how Sarsen assesses fundability before an engagement.', tag: 'Preview', meta: 'Jun 3, Online' },
  { title: 'The India Startup Landscape 2026 — Research Debrief', description: 'Presentation and discussion of findings from the annual Indian Startup Report.', tag: 'Research', meta: 'Jun 10, Online' },
];

const reportsData: ResourceItem[] = [
  { title: 'Indian Startup Ecosystem Report 2026', description: 'Comprehensive analysis of funding trends, sector growth, and strategic insights.', tag: 'Annual Report', meta: '142 pages · Feb 2026' },
  { title: 'State of B2B SaaS in India — 2025 Review', description: 'Benchmarks, retention norms, and emerging competitive dynamics.', tag: 'Sector Report', meta: '68 pages · Dec 2025' },
  { title: 'Founder Mental Models: A Survey of 200 Indian Founders', description: 'How founders make decisions, where they get stuck, and what changes outcomes.', tag: 'Research', meta: '54 pages · Nov 2025' },
  { title: 'Seed Funding Landscape: H2 2025 Digest', description: 'Deal flow analysis, sector distribution, and investor activity patterns.', tag: 'Digest', meta: '32 pages · Jan 2026' },
  { title: 'Unit Economics Benchmarks by Sector 2025', description: 'CAC, LTV, payback period norms across 12 startup categories in India.', tag: 'Benchmarks', meta: '48 pages · Oct 2025' },
  { title: 'The Operational Maturity Index — Indian Startups', description: 'How founders build systems, delegate, and create accountability as they scale.', tag: 'Index', meta: '60 pages · Sep 2025' },
  { title: 'D2C Brand Profitability Report 2025', description: 'Margin structures, marketing efficiency, and post-funding realities.', tag: 'Sector Report', meta: '44 pages · Aug 2025' },
  { title: 'Capital Efficiency in Indian Startups — 5 Year Study', description: 'Longitudinal analysis of how efficiently capital converts to durable growth.', tag: 'Longitudinal', meta: '88 pages · Jul 2025' },
  { title: 'The Fundability Framework — Investor Expectation Report', description: 'What seed and Series A investors in India look for, in their own words.', tag: 'Framework', meta: '52 pages · Jun 2025' },
  { title: 'Tier-2 Startup Hubs: Emerging Opportunity Report', description: 'Deep dives into Jaipur, Indore, Kochi, Ahmedabad, and Chandigarh ecosystems.', tag: 'Emerging Markets', meta: '76 pages · May 2025' },
];

const cohortsData: ResourceItem[] = [
  { title: 'Revenue Architecture Cohort — Batch 7', description: '12-week structured program redesigning how founders build predictable revenue.', tag: 'Revenue', meta: 'Apr 2026 · Bangalore' },
  { title: 'Capital Readiness Program — Pre-Series A', description: 'Intensive preparation for founders 6–9 months before a fundraise.', tag: 'Fundraising', meta: 'May 2026 · Bangalore' },
  { title: 'Operations & Systems Cohort — Batch 4', description: 'For founders building their first management layer and accountability infrastructure.', tag: 'Operations', meta: 'May 2026 · Bangalore' },
  { title: 'Strategic Clarity Cohort — Early Stage', description: 'For founders at ₹0–50L revenue clarifying direction, positioning, and priorities.', tag: 'Strategy', meta: 'Jun 2026 · Bangalore' },
  { title: 'Financial Foundations Program — Bootcamp', description: 'A 4-week intensive on startup finance, modeling, and cash management.', tag: 'Finance', meta: 'Apr 2026 · Goa' },
  { title: 'Product-Market Fit Lab — Cohort 3', description: 'Diagnostic and design program for founders still searching for the right fit.', tag: 'PMF', meta: 'Jun 2026 · Bangalore' },
  { title: 'Founder-CEO Transition Program', description: 'For founders growing into the CEO role as their company scales beyond 20 people.', tag: 'Leadership', meta: 'Jul 2026 · Goa' },
  { title: 'D2C Growth Cohort — Profitable Scaling', description: 'Tailored for direct-to-consumer founders navigating CAC and margin pressures.', tag: 'D2C', meta: 'May 2026 · Bangalore' },
  { title: 'B2B Sales Systems Cohort', description: 'Building enterprise pipeline, sales process, and team structure for B2B founders.', tag: 'B2B', meta: 'Jun 2026 · Bangalore' },
  { title: 'Sarsen Fellows Program — Annual Cohort', description: 'Our most selective program for high-potential founders with exceptional upside.', tag: 'Fellowship', meta: 'Aug 2026 · Bangalore' },
];

const toolsData: ResourceItem[] = [
  { title: 'Startup Valuation Calculator', description: 'DCF, revenue multiple, and comparable analysis methodologies in one tool.', tag: 'Valuation', meta: 'Excel + Web' },
  { title: '13-Week Cash Flow Forecaster', description: 'Project runway, identify tight spots, and model funding scenarios.', tag: 'Finance', meta: 'Excel Template' },
  { title: 'Unit Economics Dashboard', description: 'CAC, LTV, payback period, and contribution margin — pre-built and plug-in-ready.', tag: 'Metrics', meta: 'Excel + Notion' },
  { title: 'Market Sizing Framework (TAM/SAM/SOM)', description: 'Structured methodology to calculate and present your addressable market.', tag: 'Strategy', meta: 'Slides + Guide' },
  { title: 'Pricing Audit Worksheet', description: 'Identify whether your current pricing is structurally sound or leaving revenue behind.', tag: 'Revenue', meta: 'Worksheet' },
  { title: 'Investor Readiness Scorecard', description: 'Self-assessment covering all dimensions investors evaluate at seed and Series A.', tag: 'Fundraising', meta: 'Assessment' },
  { title: 'Team Psychometric Assessment', description: 'Evaluate team dynamics, leadership fit, and cultural alignment across roles.', tag: 'People', meta: 'Online Tool' },
  { title: 'Financial Model Template — Startup', description: 'P&L, balance sheet, and cash flow projections with driver-based architecture.', tag: 'Finance', meta: 'Excel Template' },
  { title: 'OKR & Accountability Framework', description: 'Quarterly goal-setting and review process designed for founder-led teams.', tag: 'Operations', meta: 'Notion Template' },
  { title: 'Pitch Deck Builder — Slide Framework', description: 'Investor-tested slide structure with guidance notes for every section.', tag: 'Fundraising', meta: 'Slides Template' },
];

// =====================================================
// CARD STYLES (unchanged)
// =====================================================

const fixedBlueGradient = () => 'linear-gradient(160deg, #132B47 0%, #0A1E3D 100%)';

const blogCardStyle: CardStyle = {
  sectionBg: '#F7F4EF',
  iconBg: '#E8E0D0',
  titleColor: '#1A1008',
  subtitleColor: '#6B5E4A',
  ctaBg: '#1A1008',
  ctaText: '#F7F4EF',
  ctaBorder: '#1A1008',
  arrowBg: '#1A1008',
  arrowColor: '#F7F4EF',
  borderRadius: '0.375rem',
  cardBg: '#FFFFFF',
  cardBorder: '#E5DDD0',
  headerBg: fixedBlueGradient,
  tagBg: 'rgba(96,165,250,0.15)',
  tagText: '#93C5FD',
  lockColor: '#60A5FA',
  bodyBg: '#FFFFFF',
  cardTitle: '#1A1008',
  cardDesc: '#6B5E4A',
  divider: '#F0E8DC',
  metaColor: '#9B8A72',
  actionBg: '#F0E8DC',
  actionIcon: '#6B5E4A',
};

const caseStudyCardStyle: CardStyle = {
  sectionBg: '#0A1E3D',
  iconBg: 'rgba(59,130,246,0.15)',
  titleColor: '#FFFFFF',
  subtitleColor: '#93B4D4',
  ctaBg: 'transparent',
  ctaText: '#60A5FA',
  ctaBorder: '#1E4A7A',
  arrowBg: '#132B47',
  arrowColor: '#60A5FA',
  borderRadius: '0.375rem',
  cardBg: '#0F2744',
  cardBorder: '#1E4070',
  headerBg: fixedBlueGradient,
  tagBg: 'rgba(96,165,250,0.15)',
  tagText: '#93C5FD',
  lockColor: '#60A5FA',
  bodyBg: '#0F2744',
  cardTitle: '#E2EFFF',
  cardDesc: '#7AA8D0',
  divider: '#1E3D62',
  metaColor: '#4B78A0',
  actionBg: '#132B47',
  actionIcon: '#60A5FA',
};

const eventCardStyle: CardStyle = {
  sectionBg: '#FAFAFA',
  iconBg: '#FFF0E6',
  titleColor: '#1A0A00',
  subtitleColor: '#7A5A3A',
  ctaBg: '#C84B00',
  ctaText: '#FFFFFF',
  ctaBorder: '#C84B00',
  arrowBg: '#FFF0E6',
  arrowColor: '#C84B00',
  borderRadius: '0.375rem',
  cardBg: '#FFFFFF',
  cardBorder: '#FFD5B5',
  headerBg: fixedBlueGradient,
  tagBg: 'rgba(96,165,250,0.15)',
  tagText: '#93C5FD',
  lockColor: '#60A5FA',
  bodyBg: '#FFFFFF',
  cardTitle: '#1A0A00',
  cardDesc: '#7A5A3A',
  divider: '#FFE8D0',
  metaColor: '#C84B00',
  actionBg: '#FFF0E6',
  actionIcon: '#C84B00',
};

const reportCardStyle: CardStyle = {
  sectionBg: '#1C2B3A',
  iconBg: 'rgba(16,185,129,0.12)',
  titleColor: '#ECFDF5',
  subtitleColor: '#6EE7B7',
  ctaBg: 'transparent',
  ctaText: '#34D399',
  ctaBorder: '#065F46',
  arrowBg: '#0D1F2D',
  arrowColor: '#34D399',
  borderRadius: '0.375rem',
  cardBg: '#162435',
  cardBorder: '#1E3A4A',
  headerBg: fixedBlueGradient,
  tagBg: 'rgba(96,165,250,0.15)',
  tagText: '#93C5FD',
  lockColor: '#60A5FA',
  bodyBg: '#162435',
  cardTitle: '#D1FAE5',
  cardDesc: '#6EE7B7',
  divider: '#1E3A2A',
  metaColor: '#34D399',
  actionBg: '#0D1F2D',
  actionIcon: '#34D399',
};

const cohortCardStyle: CardStyle = {
  sectionBg: '#FAF5FF',
  iconBg: '#EDE0FF',
  titleColor: '#1A0030',
  subtitleColor: '#7B4FB0',
  ctaBg: '#6B21A8',
  ctaText: '#FFFFFF',
  ctaBorder: '#6B21A8',
  arrowBg: '#EDE0FF',
  arrowColor: '#7C3AED',
  borderRadius: '0.375rem',
  cardBg: '#FFFFFF',
  cardBorder: '#DDD0F5',
  headerBg: fixedBlueGradient,
  tagBg: 'rgba(96,165,250,0.15)',
  tagText: '#93C5FD',
  lockColor: '#60A5FA',
  bodyBg: '#FFFFFF',
  cardTitle: '#1A0030',
  cardDesc: '#7B4FB0',
  divider: '#F0E5FF',
  metaColor: '#8B5CF6',
  actionBg: '#EDE0FF',
  actionIcon: '#7C3AED',
};

const toolCardStyle: CardStyle = {
  sectionBg: '#0F1117',
  iconBg: 'rgba(250,204,21,0.1)',
  titleColor: '#FAFAFA',
  subtitleColor: '#A0A0A8',
  ctaBg: 'transparent',
  ctaText: '#FACC15',
  ctaBorder: '#3A3A20',
  arrowBg: '#1C1C24',
  arrowColor: '#FACC15',
  borderRadius: '0.375rem',
  cardBg: '#16161E',
  cardBorder: '#2A2A38',
  headerBg: fixedBlueGradient,
  tagBg: 'rgba(96,165,250,0.15)',
  tagText: '#93C5FD',
  lockColor: '#60A5FA',
  bodyBg: '#16161E',
  cardTitle: '#F0F0FA',
  cardDesc: '#707080',
  divider: '#2A2A38',
  metaColor: '#505060',
  actionBg: '#1C1C28',
  actionIcon: '#FACC15',
};

// =====================================================
// SECTION CONFIGURATIONS (unchanged)
// =====================================================

const SECTION_CONFIGS: ResourceSectionConfig[] = [
  {
    id: 'blogs',
    title: 'Blogs',
    subtitle: 'In-depth thinking on strategy, revenue, operations, and the realities of building startups.',
    items: blogsData,
    cardStyle: blogCardStyle,
    hubHref: '/resources/blog',
  },
  {
    id: 'case-studies',
    title: 'Case Studies',
    subtitle: 'Real engagements, real decisions, real outcomes — studied and documented for founders.',
    items: caseStudiesData,
    cardStyle: caseStudyCardStyle,
    hubHref: '/resources/case-studies',
  },
  {
    id: 'events',
    title: 'Events',
    subtitle: 'Workshops, masterclasses, and retreats designed to move founders forward.',
    items: eventsData,
    cardStyle: eventCardStyle,
    hubHref: '/resources/events',
  },
  {
    id: 'reports',
    title: 'Reports',
    subtitle: "Original research and data-backed analysis on India's startup ecosystem.",
    items: reportsData,
    cardStyle: reportCardStyle,
    hubHref: '/resources/reports',
  },
  {
    id: 'cohorts',
    title: 'Cohorts',
    subtitle: 'Structured programs for founders at critical moments in their growth journey.',
    items: cohortsData,
    cardStyle: cohortCardStyle,
    hubHref: '/resources/cohorts',
  },
  {
    id: 'tools',
    title: 'Tools',
    subtitle: 'Calculators, templates, and frameworks for data-driven founder decisions.',
    items: toolsData,
    cardStyle: toolCardStyle,
    hubHref: '/resources/tools',
  },
];

// =====================================================
// PAGE ROOT (unchanged)
// =====================================================

export default function ResourcesClient(): React.JSX.Element {
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    title: '',
    type: '',
  });

  const openModal = (title: string, type: string): void => {
    setModalState({ open: true, title, type });
  };

  const closeModal = (): void => {
    setModalState({ open: false, title: '', type: '' });
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.35s cubic-bezier(0.22,1,0.36,1) both; }
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

      <main className="min-h-screen">
        <HeroSection />
        {SECTION_CONFIGS.map((section) => (
          <ResourceSection key={section.id} {...section} onCardClick={openModal} />
        ))}
      </main>

      <PartnerAuthModal
        isOpen={modalState.open}
        onClose={closeModal}
        resourceTitle={modalState.title}
        resourceType={modalState.type}
      />
    </>
  );
}