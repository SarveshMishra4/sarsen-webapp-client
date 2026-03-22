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

interface Event {
  id: number;
  title: string;
  excerpt: string;
  tag: string;
  format: string;
  date: string;
  location: string;
  sector: string;
  seats: string;
  featured?: boolean;
}

interface CohortTeaser {
  title: string;
  tag: string;
  duration: string;
  format: string;
  outcome: string;
  startDate: string;
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
// EVENTS DATA — 8 upcoming events
// =====================================================

const ALL_EVENTS: Event[] = [
  {
    id: 1,
    title: 'India Startup Summit 2026 — The Capital Conversation',
    excerpt:
      'Our flagship annual gathering. Two days of structured conversations between founders navigating Series A and beyond, and the investors actively deploying at those stages. No panels for the sake of panels — every session is designed around a specific decision founders are facing right now. 400 attendees. Closed to press.',
    tag: 'Summit',
    format: 'In-Person · 2 Days',
    date: 'March 28–29, 2026',
    location: 'The Leela, Mumbai',
    sector: 'Cross-Sector',
    seats: '12 seats left',
    featured: true,
  },
  {
    id: 2,
    title: 'Founder Masterclass: Pricing Strategy for B2B SaaS',
    excerpt:
      'A half-day deep-dive into pricing architecture for Indian SaaS founders. Covers value-based pricing frameworks, how to run a pricing audit, segmenting by willingness to pay, and moving from founder-intuition pricing to a structured model. Led by our research team using data from 200+ Indian SaaS companies.',
    tag: 'Masterclass',
    format: 'In-Person · Half Day',
    date: 'April 5, 2026',
    location: 'Sarsen & Co. Office, Bengaluru',
    sector: 'B2B SaaS',
    seats: '18 seats left',
  },
  {
    id: 3,
    title: 'The Fundraising Clinic — Seed to Series A',
    excerpt:
      'A small-group working session for founders actively preparing to raise. Participants bring their live materials — pitch decks, financial models, and investor lists — and work through them in structured peer review and direct feedback from our advisory team. Limited to 12 founders per session to ensure depth.',
    tag: 'Workshop',
    format: 'In-Person · Full Day',
    date: 'April 12, 2026',
    location: 'Sarsen & Co. Office, Delhi NCR',
    sector: 'Fundraising',
    seats: '4 seats left',
  },
  {
    id: 4,
    title: 'Webinar: Reading the 2026 Funding Landscape',
    excerpt:
      'A live 90-minute analysis session with our research team on the current state of Indian startup funding — what is moving, what has stalled, which sectors are seeing genuine investor appetite, and how the macro environment is reshaping the Series A bar. Q&A in the final 30 minutes. Recording available to registered participants only.',
    tag: 'Webinar',
    format: 'Online · 90 Minutes',
    date: 'April 17, 2026',
    location: 'Zoom · Link on Registration',
    sector: 'Fundraising',
    seats: 'Open Registration',
  },
  {
    id: 5,
    title: 'Unit Economics Bootcamp — Consumer and D2C Founders',
    excerpt:
      'A full-day working session for founders building consumer or direct-to-consumer businesses. Covers contribution margin analysis, channel-level CAC decomposition, LTV modelling under Indian payment behaviour constraints, and how to build unit economics visibility into operational reporting. Bring your own numbers.',
    tag: 'Bootcamp',
    format: 'In-Person · Full Day',
    date: 'April 24, 2026',
    location: 'Sarsen & Co. Office, Bengaluru',
    sector: 'D2C',
    seats: '7 seats left',
  },
  {
    id: 6,
    title: 'Investor Roundtable: Healthtech and Climate — The Next Decade',
    excerpt:
      'A closed-door roundtable bringing together 15 early-stage investors and 15 founders building in healthtech and climate technology. Structured around three specific questions: where capital is going, where the gaps are, and what would change investor conviction. Chatham House rules. No recording.',
    tag: 'Roundtable',
    format: 'In-Person · Half Day',
    date: 'May 8, 2026',
    location: 'ITC Windsor, Bengaluru',
    sector: 'Healthtech / Climate',
    seats: '6 seats left',
  },
  {
    id: 7,
    title: 'Webinar: Operational Metrics Every Founder Must Track',
    excerpt:
      'A practical 60-minute session on building a metrics dashboard that actually drives decisions — not just a reporting exercise. Covers which leading indicators predict revenue outcomes 90 days in advance, how to structure weekly reviews, and the five metrics Indian founders most commonly misdefine. With live Q&A.',
    tag: 'Webinar',
    format: 'Online · 60 Minutes',
    date: 'May 15, 2026',
    location: 'Zoom · Link on Registration',
    sector: 'Operations',
    seats: 'Open Registration',
  },
  {
    id: 8,
    title: 'Annual Alumni Retreat — Sarsen & Company Network',
    excerpt:
      'An invite-only two-day retreat for founders who have previously engaged with Sarsen & Company programmes. Structured around peer learning, founder-led sessions on recent decisions, and informal relationship-building. No external speakers. No agenda beyond what participants bring. Held at a private location outside Coorg.',
    tag: 'Retreat',
    format: 'In-Person · 2 Days',
    date: 'May 23–24, 2026',
    location: 'Private Estate, Coorg',
    sector: 'Cross-Sector',
    seats: 'Invite Only',
  },
];

// =====================================================
// COHORT ADVERTISEMENT DATA
// =====================================================

const FEATURED_COHORT: CohortTeaser = {
  title: 'The Sarsen Growth Cohort — Series A Readiness Programme',
  tag: 'Cohort · Flagship',
  duration: '12 Weeks',
  format: 'Hybrid · Weekly Sessions',
  outcome: '87% of graduates close funding within 9 months',
  startDate: 'Cohort 7 starts May 5, 2026',
};

// =====================================================
// TAG COLOR MAP — blues from homepage palette
// =====================================================

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Summit:     { bg: '#DBEAFE', text: '#1E40AF' },
  Masterclass:{ bg: '#E0F2FE', text: '#0369A1' },
  Workshop:   { bg: '#E0E7FF', text: '#3730A3' },
  Webinar:    { bg: '#E6F0FF', text: '#1E3A8A' },
  Bootcamp:   { bg: '#DBEAFE', text: '#1E40AF' },
  Roundtable: { bg: '#E0F2FE', text: '#0369A1' },
  Retreat:    { bg: '#E0E7FF', text: '#3730A3' },
};

const getTagStyle = (tag: string): { bg: string; text: string } =>
  TAG_COLORS[tag] ?? { bg: '#DBEAFE', text: '#1E40AF' };

// =====================================================
// ALL FILTER TAGS
// =====================================================

const ALL_TAGS: string[] = [
  'All', 'Summit', 'Masterclass', 'Workshop', 'Webinar',
  'Bootcamp', 'Roundtable', 'Retreat',
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
              Enter your partner credentials to register: <span className="font-medium text-gray-700">{resourceTitle}</span>
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
                    'Register for Event'
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Registration Confirmed</h3>
                <p className="text-gray-500 text-sm">
                  You&apos;re registered for{' '}
                  <span className="font-medium text-gray-700">{resourceTitle}</span>.
                  A confirmation will be sent to your email.
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
// HERO SECTION — updated to homepage palette
// =====================================================

const HeroSection: FC = () => (
  <section
    className="relative overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8"
    style={{ backgroundColor: '#0A1E3D', minHeight: '520px' }}
  >
    {/* Background: fine dot grid */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" patternUnits="userSpaceOnUse" width="24" height="24">
            <circle cx="2" cy="2" r="1" fill="#93C5FD" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      {/* Blue radial glow */}
      <div
        className="absolute -top-32 right-0 w-[700px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(59,130,246,0.22) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(96,165,250,0.10) 0%, transparent 65%)',
        }}
      />
    </div>

    <div className="max-w-7xl mx-auto relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT — Headline */}
        <div className="space-y-8">
          <div
            className="inline-flex items-center gap-2 rounded-md px-4 py-2"
            style={{
              backgroundColor: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.16)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-blue-400" />
            <span className="text-xs font-medium tracking-widest uppercase text-blue-300">
              Sarsen &amp; Company · Events
            </span>
          </div>

          <div className="space-y-4">
            <h1
              className="font-light leading-none tracking-tight text-white"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              Rooms Worth
              <br />
              <span className="text-blue-300">Being In.</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed max-w-md font-light text-gray-400">
              Summits, masterclasses, workshops, and closed-door roundtables — designed for founders who move faster when surrounded by the right people.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-2">
            {[
              { value: '8',    label: 'Upcoming events'   },
              { value: '400+', label: 'Founders per year' },
              { value: '6',    label: 'Event formats'     },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-light text-white">{stat.value}</p>
                <p className="text-xs tracking-widest uppercase mt-0.5 text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Calendar/event visual motif (blue tones) */}
        <div
          className="relative hidden lg:flex items-center justify-end"
          style={{ height: '420px' }}
          aria-hidden="true"
        >
          <div className="relative w-full max-w-lg h-full flex items-center justify-center">
            <div className="relative">
              {/* Shadow stacks */}
              {[3, 2, 1].map((layer) => (
                <div
                  key={layer}
                  className="absolute rounded-md"
                  style={{
                    width: '260px',
                    height: '300px',
                    top: layer * 8,
                    left: layer * 8,
                    backgroundColor: `rgba(19,43,71,${0.05 * layer})`,
                    border: `1px solid rgba(59,130,246,${0.04 * layer})`,
                  }}
                />
              ))}
              {/* Front — calendar card */}
              <div
                className="relative rounded-md overflow-hidden"
                style={{
                  width: '260px',
                  height: '300px',
                  backgroundColor: '#132B47',
                  border: '1px solid rgba(59,130,246,0.18)',
                }}
              >
                {/* Calendar header */}
                <div
                  className="h-14 px-5 flex items-center justify-between"
                  style={{ backgroundColor: '#0A1E3D' }}
                >
                  <div className="w-20 h-2 rounded-full bg-blue-800/40" />
                  <div className="flex gap-1">
                    {[1, 2, 3].map((d) => (
                      <div
                        key={d}
                        className="w-5 h-5 rounded bg-blue-800/30"
                      />
                    ))}
                  </div>
                </div>
                {/* Calendar grid */}
                <div className="px-5 py-4 grid grid-cols-4 gap-2">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded"
                      style={{
                        height: '22px',
                        backgroundColor: i === 3 || i === 8 || i === 15
                          ? 'rgba(59,130,246,0.30)'
                          : `rgba(59,130,246,${0.03 + (i % 3) * 0.02})`,
                        border: i === 3 || i === 8 || i === 15
                          ? '1px solid rgba(59,130,246,0.40)'
                          : 'none',
                      }}
                    />
                  ))}
                </div>
                {/* Event pill rows */}
                <div className="px-5 space-y-2">
                  {[
                    { w: '85%', color: 'rgba(59,130,246,0.22)' },
                    { w: '65%', color: 'rgba(96,165,250,0.18)' },
                    { w: '75%', color: 'rgba(147,197,253,0.15)' },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="rounded-full"
                      style={{ height: '8px', width: row.w, backgroundColor: row.color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
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
    aria-label="Filter events by type"
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
// FEATURED EVENT CARD — full width, first event
// =====================================================

interface FeaturedEventCardProps {
  event: Event;
  onOpen: (title: string) => void;
}

const FeaturedEventCard: FC<FeaturedEventCardProps> = ({ event, onOpen }) => {
  const tagStyle = getTagStyle(event.tag);
  const seatsUrgent = event.seats.includes('left') && parseInt(event.seats) <= 10;

  return (
    <article
      onClick={() => onOpen(event.title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(event.title)}
      className="group cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.10)' }}
      aria-label={`Register for event: ${event.title}`}
    >
      {/* Header */}
      <div
        className="relative h-44 sm:h-52 px-8 sm:px-10 flex items-end pb-7 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #132B47 0%, #0A1E3D 65%)' }}
      >
        {/* Decorative calendar motif */}
        <div className="absolute inset-0 flex items-center justify-end pr-10" aria-hidden="true">
          {[3, 2, 1].map((l) => (
            <div
              key={l}
              className="absolute rounded-md"
              style={{
                width: `${80 + l * 20}px`,
                height: `${100 + l * 25}px`,
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
            {event.tag}
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
              backgroundColor: seatsUrgent ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.06)',
              color: seatsUrgent ? '#93C5FD' : '#93C5FD',
              border: `1px solid rgba(59,130,246,${seatsUrgent ? 0.30 : 0.12})`,
            }}
          >
            {event.seats}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 sm:px-10 py-6 sm:py-8">
        <h2
          className="font-light leading-snug mb-3 group-hover:text-blue-300 transition-colors duration-200 text-white"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)' }}
        >
          {event.title}
        </h2>
        <p className="text-sm leading-relaxed mb-6 max-w-3xl text-gray-400">
          {event.excerpt}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Date */}
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs text-blue-400">{event.date}</span>
            </div>
            {/* Location */}
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs text-gray-500">{event.location}</span>
            </div>
            {/* Format pill */}
            <span
              className="px-2.5 py-1 rounded-md text-xs"
              style={{ backgroundColor: '#132B47', color: '#93C5FD' }}
            >
              {event.format}
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 text-xs font-medium group-hover:gap-3 transition-all duration-200 text-blue-300"
          >
            Register now
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
};

// =====================================================
// STANDARD EVENT CARD — 3-column grid
// =====================================================

interface EventCardProps {
  event: Event;
  onOpen: (title: string) => void;
  animIndex: number;
}

const EventCard: FC<EventCardProps> = ({ event, onOpen, animIndex }) => {
  const tagStyle    = getTagStyle(event.tag);
  const seatsUrgent = event.seats.includes('left') && parseInt(event.seats) <= 6;
  const seatsOpen   = event.seats === 'Open Registration';
  const seatsInvite = event.seats === 'Invite Only';

  return (
    <article
      onClick={() => onOpen(event.title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(event.title)}
      className="group cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      style={{
        backgroundColor: '#0A1E3D',
        border: '1px solid rgba(59,130,246,0.08)',
        animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${animIndex * 45}ms both`,
      }}
      aria-label={`Register for event: ${event.title}`}
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
        {/* Corner calendar decoration */}
        <div className="absolute top-3 right-3 opacity-10" aria-hidden="true">
          <div className="w-10 h-12 rounded border border-blue-400" />
          <div className="w-10 h-12 rounded border border-blue-400 absolute top-1.5 left-1.5" />
        </div>

        <div className="relative z-10 flex items-center gap-2 flex-wrap">
          <span
            className="px-2.5 py-1 rounded-md text-xs font-semibold"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {event.tag}
          </span>
          {/* Seats pill */}
          <span
            className="px-2 py-0.5 rounded-md text-xs"
            style={{
              backgroundColor: seatsUrgent
                ? 'rgba(59,130,246,0.18)'
                : seatsInvite
                ? 'rgba(147,197,253,0.10)'
                : 'rgba(59,130,246,0.06)',
              color: seatsUrgent ? '#93C5FD' : seatsInvite ? '#93C5FD' : '#93C5FD',
              border: `1px solid rgba(59,130,246,${seatsUrgent ? 0.28 : 0.12})`,
            }}
          >
            {event.seats}
          </span>
        </div>

        {/* Register arrow icon */}
        <div
          className="absolute top-4 right-4 z-10 opacity-25 group-hover:opacity-70 transition-opacity"
          aria-hidden="true"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="#93C5FD" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <h3
          className="font-medium leading-snug mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 text-white"
          style={{ fontSize: '0.9rem' }}
        >
          {event.title}
        </h3>
        <p className="text-xs leading-relaxed mb-4 line-clamp-2 text-gray-400">
          {event.excerpt}
        </p>

        {/* Date + location */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 flex-shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-blue-400">{event.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs line-clamp-1 text-gray-500">{event.location}</span>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid rgba(59,130,246,0.07)' }}
        >
          <span
            className="text-xs px-2 py-0.5 rounded-md"
            style={{ backgroundColor: '#132B47', color: '#93C5FD' }}
          >
            {event.format}
          </span>
          <span className="text-xs text-gray-500">{event.sector}</span>
        </div>
      </div>
    </article>
  );
};

// =====================================================
// COHORT ADVERTISEMENT STRIP — updated to blues
// =====================================================

interface CohortStripProps {
  onCohortClick: (title: string) => void;
}

const CohortAdvertStrip: FC<CohortStripProps> = ({ onCohortClick }) => (
  <div
    className="my-12 rounded-md overflow-hidden"
    style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.12)' }}
  >
    <div className="px-6 sm:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center"
            style={{ backgroundColor: 'rgba(59,130,246,0.10)' }}
          >
            <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-blue-300">
              Cohort Programme
            </p>
            <p className="text-sm font-light text-gray-400">
              Learn alongside the best founders in India
            </p>
          </div>
        </div>
        <a
          href="/programmes/cohorts"
          className="text-xs font-medium flex items-center gap-1 text-blue-300 hover:opacity-80 transition-opacity"
        >
          All Cohorts
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Single cohort — full-width featured card */}
      <div
        onClick={() => onCohortClick(FEATURED_COHORT.title)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onCohortClick(FEATURED_COHORT.title)}
        className="group cursor-pointer rounded-md overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        style={{
          backgroundColor: '#132B47',
          border: '1px solid rgba(59,130,246,0.10)',
        }}
        aria-label={`View cohort: ${FEATURED_COHORT.title}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6">

          {/* Left — cohort info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span
                className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold"
                style={{ backgroundColor: 'rgba(59,130,246,0.12)', color: '#93C5FD' }}
              >
                {FEATURED_COHORT.tag}
              </span>
              <span
                className="inline-block px-2.5 py-0.5 rounded-md text-xs"
                style={{
                  backgroundColor: 'rgba(59,130,246,0.08)',
                  color: '#93C5FD',
                  border: '1px solid rgba(59,130,246,0.14)',
                }}
              >
                {FEATURED_COHORT.startDate}
              </span>
            </div>

            <p
              className="text-base font-medium leading-snug mb-2 group-hover:text-blue-300 transition-colors duration-200 text-white"
            >
              {FEATURED_COHORT.title}
            </p>

            <p className="text-sm font-medium mb-4 text-blue-300">
              ✦ {FEATURED_COHORT.outcome}
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-gray-500">{FEATURED_COHORT.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-500">{FEATURED_COHORT.format}</span>
              </div>
            </div>
          </div>

          {/* Right — CTA */}
          <div className="flex-shrink-0">
            <div
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium transition-all duration-200 group-hover:gap-3"
              style={{
                backgroundColor: 'rgba(59,130,246,0.10)',
                color: '#93C5FD',
                border: '1px solid rgba(59,130,246,0.20)',
              }}
            >
              Apply for Cohort 7
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
);

// =====================================================
// PAGE ROOT COMPONENT
// =====================================================

export default function EventsHubPage(): React.JSX.Element {
  const [activeTag, setActiveTag]   = useState<string>('All');
  const [modalState, setModalState] = useState<ModalState>({ open: false, title: '' });

  const filteredEvents: Event[] =
    activeTag === 'All'
      ? ALL_EVENTS
      : ALL_EVENTS.filter((e) => e.tag === activeTag);

  const featured: Event | undefined = filteredEvents[0];
  const restEvents: Event[]         = filteredEvents.slice(1);

  const openModal  = (title: string): void => setModalState({ open: true, title });
  const closeModal = (): void => setModalState({ open: false, title: '' });

  // Split rest into before/after cohort strip — strip appears between card 3 and card 4
  const beforeStrip: Event[] = restEvents.slice(0, 3);
  const afterStrip:  Event[] = restEvents.slice(3);

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
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
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
              {filteredEvents.length}{' '}
              {filteredEvents.length !== 1 ? 'events' : 'event'}
              {activeTag !== 'All' && (
                <span className="text-blue-600">
                  {' '}in{' '}
                  {activeTag}
                </span>
              )}
            </p>
          </div>

          {/* Featured event */}
          {featured && (
            <div className="mb-8">
              <FeaturedEventCard event={featured} onOpen={openModal} />
            </div>
          )}

          {/* First 3 grid cards */}
          {beforeStrip.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {beforeStrip.map((event, i) => (
                <EventCard key={event.id} event={event} onOpen={openModal} animIndex={i} />
              ))}
            </div>
          )}

          {/* Cohort advertisement strip */}
          {filteredEvents.length > 0 && (
            <CohortAdvertStrip onCohortClick={openModal} />
          )}

          {/* Remaining grid cards */}
          {afterStrip.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {afterStrip.map((event, i) => (
                <EventCard key={event.id} event={event} onOpen={openModal} animIndex={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-4xl mb-4">🗓</p>
              <p className="text-lg font-light mb-1 text-gray-900">
                No events in &ldquo;{activeTag}&rdquo; right now
              </p>
              <p className="text-sm text-gray-500">
                Try a different type or{' '}
                <button
                  type="button"
                  className="underline text-blue-600"
                  onClick={() => setActiveTag('All')}
                >
                  view all events
                </button>
                .
              </p>
            </div>
          )}

          {/* End message */}
          {filteredEvents.length > 0 && (
            <div className="flex justify-center py-12">
              <p className="text-sm text-gray-500">
                All {filteredEvents.length} upcoming events shown.
              </p>
            </div>
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