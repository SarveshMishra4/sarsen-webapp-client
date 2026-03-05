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
// Central source of truth for all data shapes
// =====================================================

/** A single resource item displayed on a card */
interface ResourceItem {
  title: string;
  description: string;
  tag: string;
  meta: string;
}

/** Visual identity configuration for each resource category's cards */
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
  /** Returns a CSS gradient string based on the card index */
  headerBg: (index: number) => string;
  /** Returns a decorative JSX element unique to the category */
  headerDecor: (index: number) => ReactNode;
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

/** Configuration for a full resource section (one per category) */
interface ResourceSectionConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  items: ResourceItem[];
  cardStyle: CardStyle;
  hubHref: string;
}

/** State for the partner auth modal */
interface ModalState {
  open: boolean;
  title: string;
  type: string;
}

/** Form data for the partner auth modal */
interface PartnerFormData {
  partnerId: string;
  password: string;
}

// =====================================================
// PARTNER AUTH MODAL
// Appears when any resource card is clicked.
// Modeled after admin login — same design language.
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

  // Reset form state whenever modal is closed
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

  const handlePartnerIdChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData((prev) => ({ ...prev, partnerId: e.target.value }));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md animate-fadeIn">
        {/* Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">

          {/* Modal Header */}
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
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-blue-200 text-sm font-medium tracking-wide uppercase">
                Partner Access
              </span>
            </div>

            <h2 className="text-2xl font-light text-white">Sign In to Continue</h2>
            <p className="text-blue-200 text-sm mt-1 truncate">
              Accessing: <span className="text-white font-medium">{resourceTitle}</span>
            </p>
          </div>

          {/* Modal Body */}
          <div className="px-8 py-8">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Error Banner */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                {/* Partner ID Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partner ID
                  </label>
                  <input
                    type="text"
                    value={formData.partnerId}
                    onChange={handlePartnerIdChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                    placeholder="e.g. SSP-2024-XXXX"
                    required
                    autoComplete="username"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handlePasswordChange}
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

                {/* Submit */}
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
                    'Access Resource'
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 pt-1">
                  Don&apos;t have a Partner ID?{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Request Access
                  </a>
                </p>
              </form>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Access Granted</h3>
                <p className="text-gray-500 text-sm">
                  Redirecting you to{' '}
                  <span className="font-medium text-gray-700">{resourceTitle}</span>…
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
// HERO SECTION
// Left: headline + category anchor links
// Right: SVG visual placeholder — replace with asset
// Fully responsive: mobile → tablet → desktop
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
    <section className="relative bg-[#0A1E3D] min-h-[480px] sm:min-h-[560px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Background grid mesh — purely decorative */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <svg viewBox="0 0 600 600" className="w-full h-full">
            {Array.from({ length: 12 }, (_, i) => (
              <line key={`v${i}`} x1={i * 55} y1="0" x2={i * 55} y2="600" stroke="white" strokeWidth="1" />
            ))}
            {Array.from({ length: 12 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 55} x2="600" y2={i * 55} stroke="white" strokeWidth="1" />
            ))}
          </svg>
        </div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Headline + Category Links */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-300 text-xs font-medium tracking-widest uppercase">
                Partner Resources
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight">
                The Resource
                <span className="block text-blue-300">Hub</span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-lg font-light">
                Curated knowledge for founders navigating complexity. Access blogs, case studies,
                events, reports, cohorts, and strategic tools — all in one place.
              </p>
            </div>

            {/* Category anchor nav pills */}
            <nav className="flex flex-wrap gap-3 pt-2" aria-label="Resource categories">
              {CATEGORY_LABELS.map((cat) => (
                <a
                  key={cat}
                  href={`#${cat.toLowerCase().replace(' ', '-')}`}
                  className="px-4 py-1.5 rounded-full border border-blue-700/40 text-blue-200 text-xs font-medium hover:border-blue-500 hover:text-white transition-all duration-200"
                >
                  {cat}
                </a>
              ))}
            </nav>
          </div>

          {/* RIGHT — Visual placeholder */}
          {/*
            INTEGRATION NOTE:
            Replace the decorative placeholder below with:
            <img src="/assets/resources/Hero Visual.svg" alt="" className="max-w-full h-auto" />
          */}
          <div
            className="relative h-56 sm:h-72 lg:h-[420px] flex items-center justify-center lg:justify-end"
            aria-hidden="true"
          >
            <div className="w-full max-w-md h-full flex items-center justify-center relative">
              {/* Decorative concentric rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-blue-700/20" />
                <div className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-blue-600/20" />
                <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-blue-500/20" />
              </div>
              {/* Icon grid */}
              <div className="relative z-10 grid grid-cols-3 gap-3">
                {(['📄', '📊', '🎯', '🔧', '📅', '🎓'] as const).map((icon, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-500/10 border border-blue-700/30 flex items-center justify-center text-xl sm:text-2xl backdrop-blur-sm"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// =====================================================
// RESOURCE CARD
// Renders a single gated resource card.
// Visual identity is entirely driven by cardStyle prop.
// =====================================================

interface ResourceCardProps {
  item: ResourceItem;
  cardStyle: CardStyle;
  idx: number;
  onCardClick: () => void;
}

const ResourceCard: FC<ResourceCardProps> = ({ item, cardStyle, idx, onCardClick }) => {
  return (
    <article
      onClick={onCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onCardClick()}
      aria-label={`Open ${item.title}`}
      className="flex-shrink-0 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{
        width: '280px',
        minWidth: '280px',
        borderRadius: cardStyle.borderRadius,
        overflow: 'hidden',
        background: cardStyle.cardBg,
        border: `1px solid ${cardStyle.cardBorder}`,
      }}
    >
      {/* Card Visual Header */}
      <div
        className="relative overflow-hidden flex items-end px-5 pt-5 pb-4"
        style={{ height: '130px', background: cardStyle.headerBg(idx) }}
      >
        {/* Category-specific decorative layer */}
        <div className="absolute inset-0">{cardStyle.headerDecor(idx)}</div>

        {/* Content tag */}
        <div className="relative z-10">
          <span
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
            style={{ backgroundColor: cardStyle.tagBg, color: cardStyle.tagText }}
          >
            {item.tag}
          </span>
        </div>

        {/* Lock icon — indicates gated access */}
        <div
          className="absolute top-4 right-4 z-10 opacity-60 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        >
          <svg className="w-4 h-4" fill="none" stroke={cardStyle.lockColor} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>

      {/* Card Body */}
      <div
        className="px-5 py-4 flex flex-col gap-2"
        style={{ background: cardStyle.bodyBg }}
      >
        <h3
          className="text-sm font-semibold leading-snug line-clamp-2"
          style={{ color: cardStyle.cardTitle }}
        >
          {item.title}
        </h3>
        <p
          className="text-xs leading-relaxed line-clamp-2"
          style={{ color: cardStyle.cardDesc }}
        >
          {item.description}
        </p>

        {/* Meta row */}
        <div
          className="flex items-center justify-between mt-2 pt-2"
          style={{ borderTop: `1px solid ${cardStyle.divider}` }}
        >
          <span className="text-xs" style={{ color: cardStyle.metaColor }}>
            {item.meta}
          </span>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
            style={{ backgroundColor: cardStyle.actionBg }}
            aria-hidden="true"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke={cardStyle.actionIcon} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
};

// =====================================================
// RESOURCE SECTION
// Reusable section component for each category.
// Manages its own horizontal scroll state.
// =====================================================

interface ResourceSectionProps extends ResourceSectionConfig {
  onCardClick: (title: string, type: string) => void;
}

const ResourceSection: FC<ResourceSectionProps> = ({
  id,
  title,
  subtitle,
  icon,
  items,
  cardStyle,
  hubHref,
  onCardClick,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState<number>(0);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  // Check if right-scroll is still available
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
    // optimistic update; corrected by onScroll
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

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: cardStyle.iconBg }}
              aria-hidden="true"
            >
              <span className="text-2xl">{icon}</span>
            </div>
            <div>
              <h2
                id={`${id}-heading`}
                className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight"
                style={{ color: cardStyle.titleColor }}
              >
                {title}
              </h2>
              <p
                className="text-sm sm:text-base mt-1 max-w-lg"
                style={{ color: cardStyle.subtitleColor }}
              >
                {subtitle}
              </p>
            </div>
          </div>

          {/* Hub Page CTA — navigates to individual category hub */}
          <a
            href={hubHref}
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg group"
            style={{
              backgroundColor: cardStyle.ctaBg,
              color: cardStyle.ctaText,
              border: `1px solid ${cardStyle.ctaBorder}`,
            }}
          >
            <span>Browse All {title}</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Scrollable Cards Strip */}
        <div className="relative">

          {/* Left Scroll Arrow */}
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={scrollPos <= 0}
            aria-label={`Scroll ${title} cards left`}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-2.5 shadow-lg transition-all duration-200 disabled:opacity-20"
            style={{ backgroundColor: cardStyle.arrowBg, color: cardStyle.arrowColor }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Scroll Arrow */}
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label={`Scroll ${title} cards right`}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-2.5 shadow-lg transition-all duration-200 disabled:opacity-20"
            style={{ backgroundColor: cardStyle.arrowBg, color: cardStyle.arrowColor }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Container */}
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

      </div>
    </section>
  );
};

// =====================================================
// DATA — ALL 6 CATEGORIES, 10 ITEMS EACH
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
  { title: 'Revenue Architecture Cohort — Batch 7', description: '12-week structured program redesigning how founders build predictable revenue.', tag: 'Revenue', meta: 'Starts Apr 2026 · 15 seats' },
  { title: 'Capital Readiness Program — Pre-Series A', description: 'Intensive preparation for founders 6–9 months before a fundraise.', tag: 'Fundraising', meta: 'Starts May 2026 · 12 seats' },
  { title: 'Operations & Systems Cohort — Batch 4', description: 'For founders building their first management layer and accountability infrastructure.', tag: 'Operations', meta: 'Starts May 2026 · 10 seats' },
  { title: 'Strategic Clarity Cohort — Early Stage', description: 'For founders at ₹0–50L revenue clarifying direction, positioning, and priorities.', tag: 'Strategy', meta: 'Starts Jun 2026 · 20 seats' },
  { title: 'Financial Foundations Program — Bootcamp', description: 'A 4-week intensive on startup finance, modeling, and cash management.', tag: 'Finance', meta: 'Starts Apr 2026 · 25 seats' },
  { title: 'Product-Market Fit Lab — Cohort 3', description: 'Diagnostic and design program for founders still searching for the right fit.', tag: 'PMF', meta: 'Starts Jun 2026 · 15 seats' },
  { title: 'Founder-CEO Transition Program', description: 'For founders growing into the CEO role as their company scales beyond 20 people.', tag: 'Leadership', meta: 'Starts Jul 2026 · 8 seats' },
  { title: 'D2C Growth Cohort — Profitable Scaling', description: 'Tailored for direct-to-consumer founders navigating CAC and margin pressures.', tag: 'D2C', meta: 'Starts May 2026 · 12 seats' },
  { title: 'B2B Sales Systems Cohort', description: 'Building enterprise pipeline, sales process, and team structure for B2B founders.', tag: 'B2B', meta: 'Starts Jun 2026 · 15 seats' },
  { title: 'Sarsen Fellows Program — Annual Cohort', description: 'Our most selective program for high-potential founders with exceptional upside.', tag: 'Fellowship', meta: 'Starts Aug 2026 · 6 seats' },
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
// CARD STYLES — UNIQUE VISUAL IDENTITY PER CATEGORY
// Each CardStyle object fully satisfies the CardStyle interface.
// =====================================================

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
  borderRadius: '4px',
  cardBg: '#FFFFFF',
  cardBorder: '#E5DDD0',
  headerBg: (i: number) =>
    ['#2C1810', '#1A2C10', '#101828', '#281020', '#102820', '#18102C'][i % 6],
  headerDecor: (_i: number) => (
    <div className="absolute inset-0 flex items-center justify-end pr-6 opacity-10" aria-hidden="true">
      <span style={{ fontSize: '80px', fontFamily: 'Georgia, serif', color: 'white', lineHeight: 1 }}>
        &ldquo;
      </span>
    </div>
  ),
  tagBg: 'rgba(255,255,255,0.15)',
  tagText: '#FFFFFF',
  lockColor: '#FFFFFF',
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
  borderRadius: '12px',
  cardBg: '#0F2744',
  cardBorder: '#1E4070',
  headerBg: (i: number) =>
    `linear-gradient(135deg, ${['#0D3B6E','#0D4E3B','#3B1D0D','#2D0D3B','#0D2A3B','#3B3B0D'][i % 6]} 0%, #0A1E3D 100%)`,
  headerDecor: (_i: number) => (
    <div className="absolute inset-0" aria-hidden="true">
      {[0, 1, 2].map((j) => (
        <div
          key={j}
          className="absolute rounded-full border border-white/5"
          style={{ width: `${60 + j * 30}px`, height: `${60 + j * 30}px`, top: `${10 - j * 10}px`, right: `${10 - j * 10}px` }}
        />
      ))}
    </div>
  ),
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
  borderRadius: '16px',
  cardBg: '#FFFFFF',
  cardBorder: '#FFD5B5',
  headerBg: (i: number) =>
    `linear-gradient(135deg, ${['#C84B00','#B84000','#A03800','#D05800','#BF4500','#903200'][i % 6]} 0%, ${['#E07030','#D06020','#B85010','#E07840','#CF6030','#A04018'][i % 6]} 100%)`,
  headerDecor: (_i: number) => (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute top-3 right-3 opacity-20">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
        </svg>
      </div>
    </div>
  ),
  tagBg: 'rgba(255,255,255,0.2)',
  tagText: '#FFFFFF',
  lockColor: '#FFFFFF',
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
  borderRadius: '8px',
  cardBg: '#162435',
  cardBorder: '#1E3A4A',
  headerBg: (i: number) =>
    `linear-gradient(160deg, ${['#064E3B','#065F46','#047857','#065030','#053D2E','#074530'][i % 6]} 0%, #0A2A20 100%)`,
  headerDecor: (_i: number) => (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {[0, 1, 2, 3].map((j) => (
        <div
          key={j}
          className="absolute border-l border-t border-white/5"
          style={{ width: `${40 + j * 15}px`, height: `${40 + j * 15}px`, bottom: `${j * 8}px`, right: `${j * 8}px`, transform: 'rotate(15deg)' }}
        />
      ))}
      <div className="absolute top-4 right-4 opacity-20">
        <svg className="w-8 h-8 text-emerald-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      </div>
    </div>
  ),
  tagBg: 'rgba(52,211,153,0.12)',
  tagText: '#6EE7B7',
  lockColor: '#34D399',
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
  borderRadius: '20px',
  cardBg: '#FFFFFF',
  cardBorder: '#DDD0F5',
  headerBg: (i: number) =>
    `linear-gradient(135deg, ${['#4C1D95','#5B21B6','#6D28D9','#4A1A88','#3B1070','#5C1FA0'][i % 6]} 0%, ${['#7C3AED','#8B5CF6','#6D28D9','#7030D0','#6020C0','#8040E0'][i % 6]} 100%)`,
  headerDecor: (_i: number) => (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-white/10" />
      <div className="absolute bottom-2 right-2 opacity-20">
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L13.09 8.26L19 6L15.45 11.25L22 12L15.45 12.75L19 18L13.09 15.74L12 22L10.91 15.74L5 18L8.55 12.75L2 12L8.55 11.25L5 6L10.91 8.26L12 2Z" />
        </svg>
      </div>
    </div>
  ),
  tagBg: 'rgba(255,255,255,0.18)',
  tagText: '#FFFFFF',
  lockColor: '#FFFFFF',
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
  borderRadius: '6px',
  cardBg: '#16161E',
  cardBorder: '#2A2A38',
  headerBg: (_i: number) => 'linear-gradient(135deg, #1A1A24 0%, #0F0F18 100%)',
  headerDecor: (_i: number) => (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 130">
        {Array.from({ length: 5 }, (_, j) => (
          <line key={`h${j}`} x1="0" y1={j * 30} x2="200" y2={j * 30} stroke="#FACC15" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 8 }, (_, j) => (
          <line key={`v${j}`} x1={j * 30} y1="0" x2={j * 30} y2="130" stroke="#FACC15" strokeWidth="0.5" />
        ))}
      </svg>
      <div className="absolute top-4 right-4 opacity-40">
        <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    </div>
  ),
  tagBg: 'rgba(250,204,21,0.1)',
  tagText: '#FACC15',
  lockColor: '#FACC15',
  bodyBg: '#16161E',
  cardTitle: '#F0F0FA',
  cardDesc: '#707080',
  divider: '#2A2A38',
  metaColor: '#505060',
  actionBg: '#1C1C28',
  actionIcon: '#FACC15',
};

// =====================================================
// SECTION CONFIGURATIONS
// Declared outside the component to avoid
// recreation on every render (stable reference).
// =====================================================

const SECTION_CONFIGS: ResourceSectionConfig[] = [
  {
    id: 'blogs',
    title: 'Blogs',
    subtitle: 'In-depth thinking on strategy, revenue, operations, and the realities of building startups.',
    icon: '📝',
    items: blogsData,
    cardStyle: blogCardStyle,
    hubHref: '/resources/blogs',
  },
  {
    id: 'case-studies',
    title: 'Case Studies',
    subtitle: 'Real engagements, real decisions, real outcomes — studied and documented for founders.',
    icon: '📊',
    items: caseStudiesData,
    cardStyle: caseStudyCardStyle,
    hubHref: '/resources/case-studies',
  },
  {
    id: 'events',
    title: 'Events',
    subtitle: 'Workshops, masterclasses, and retreats designed to move founders forward.',
    icon: '📅',
    items: eventsData,
    cardStyle: eventCardStyle,
    hubHref: '/resources/events',
  },
  {
    id: 'reports',
    title: 'Reports',
    subtitle: "Original research and data-backed analysis on India's startup ecosystem.",
    icon: '📋',
    items: reportsData,
    cardStyle: reportCardStyle,
    hubHref: '/resources/reports',
  },
  {
    id: 'cohorts',
    title: 'Cohorts',
    subtitle: 'Structured programs for founders at critical moments in their growth journey.',
    icon: '🎓',
    items: cohortsData,
    cardStyle: cohortCardStyle,
    hubHref: '/resources/cohorts',
  },
  {
    id: 'tools',
    title: 'Tools',
    subtitle: 'Calculators, templates, and frameworks for data-driven founder decisions.',
    icon: '🔧',
    items: toolsData,
    cardStyle: toolCardStyle,
    hubHref: '/resources/tools',
  },
];

// =====================================================
// PAGE ROOT COMPONENT
// Assembles hero + all 6 resource sections.
// Owns the modal state and passes callbacks down.
// =====================================================

export default function ResourcesHubPage(): React.JSX.Element {
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
      `}</style>

      <main className="min-h-screen">
        <HeroSection />

        {SECTION_CONFIGS.map((section) => (
          <ResourceSection
            key={section.id}
            {...section}
            onCardClick={openModal}
          />
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