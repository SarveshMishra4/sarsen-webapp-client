'use client';

import React, {
  useState,
  useEffect,
  FC,
  MouseEvent,
  FormEvent,
  ChangeEvent,
} from 'react';

// =====================================================
// TYPE DEFINITIONS
// =====================================================

interface Cohort {
  id: number;
  title: string;
  excerpt: string;
  tag: string;
  duration: string;
  format: string;
  startDate: string;
  sector: string;
  seats: string;
  cohortNumber: string;
  outcome: string;
  featured?: boolean;
}

interface EventTeaser {
  title: string;
  tag: string;
  format: string;
  date: string;
  location: string;
  seats: string;
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
// COHORTS DATA — 8 cohorts
// =====================================================

const ALL_COHORTS: Cohort[] = [
  {
    id: 1,
    title: 'The Sarsen Growth Cohort — Series A Readiness Programme',
    excerpt:
      'Our flagship cohort, now in its seventh edition. Twelve weeks of structured work for founders targeting their Series A — covering investor narrative construction, financial model architecture, unit economics clarity, and the operational signals investors evaluate before committing. Built around peer accountability and direct advisory input. 87% of graduates close funding within nine months of completing the programme.',
    tag: 'Flagship',
    duration: '12 Weeks',
    format: 'Hybrid · Weekly Sessions',
    startDate: 'Cohort 7 · May 5, 2026',
    sector: 'Cross-Sector',
    seats: '6 seats left',
    cohortNumber: 'Cohort 7',
    outcome: '87% close Series A within 9 months',
    featured: true,
  },
  {
    id: 2,
    title: 'B2B SaaS Fundamentals Cohort',
    excerpt:
      'An eight-week intensive for founders building B2B SaaS products in India — from first revenue through to repeatable sales motion. Covers pricing architecture, ICP definition, discovery process design, ACV benchmarking, and the metrics that define a fundable SaaS business at seed stage. Designed for founders who are selling but not yet scaling.',
    tag: 'Sector Cohort',
    duration: '8 Weeks',
    format: 'Online · Twice Weekly',
    startDate: 'Cohort 4 · May 19, 2026',
    sector: 'B2B SaaS',
    seats: '9 seats left',
    cohortNumber: 'Cohort 4',
    outcome: 'Avg. 2.4× ARR growth in 6 months',
  },
  {
    id: 3,
    title: 'Fundraising Foundations — Seed Stage Cohort',
    excerpt:
      'A six-week programme for pre-seed and seed-stage founders preparing for their first external raise. Covers investor landscape mapping, pitch narrative construction, data room preparation, term sheet literacy, and the mechanics of running a focused fundraising process. Includes live pitch feedback sessions with practising angel investors.',
    tag: 'Fundraising',
    duration: '6 Weeks',
    format: 'Online · Weekly',
    startDate: 'Cohort 6 · June 2, 2026',
    sector: 'Cross-Sector',
    seats: '14 seats left',
    cohortNumber: 'Cohort 6',
    outcome: '73% raise within 6 months',
  },
  {
    id: 4,
    title: 'D2C Brand Scaling Cohort',
    excerpt:
      'A ten-week cohort for direct-to-consumer brand founders navigating the transition from early traction to profitable scale. Covers contribution margin discipline, channel diversification, LTV modelling under Indian payment constraints, and the operational infrastructure required to support multi-channel growth without margin erosion.',
    tag: 'Sector Cohort',
    duration: '10 Weeks',
    format: 'Hybrid · Weekly',
    startDate: 'Cohort 3 · June 9, 2026',
    sector: 'D2C',
    seats: '11 seats left',
    cohortNumber: 'Cohort 3',
    outcome: 'Avg. contribution margin +18pp',
  },
  {
    id: 5,
    title: 'Operational Excellence Cohort — Scaling from 10 to 100',
    excerpt:
      'Designed for founders who have found product-market fit and are now building the operational infrastructure to scale without breaking. Eight weeks on systems design, hiring frameworks, OKR architecture, financial reporting for a growing company, and how to make the transition from founder-led execution to team-led delivery.',
    tag: 'Operations',
    duration: '8 Weeks',
    format: 'Online · Twice Weekly',
    startDate: 'Cohort 2 · June 23, 2026',
    sector: 'Cross-Sector',
    seats: '8 seats left',
    cohortNumber: 'Cohort 2',
    outcome: '91% report improved team accountability',
  },
  {
    id: 6,
    title: 'Healthtech Founder Cohort',
    excerpt:
      'A sector-specific cohort for founders building in Indian healthtech — diagnostics, digital health, hospital infrastructure, med-tech hardware, or health insurance innovation. Covers the regulatory landscape, reimbursement model design, hospital procurement cycles, and the business model structures that have proven viable in the Indian context.',
    tag: 'Sector Cohort',
    duration: '8 Weeks',
    format: 'Online · Weekly',
    startDate: 'Cohort 2 · July 7, 2026',
    sector: 'Healthtech',
    seats: '16 seats left',
    cohortNumber: 'Cohort 2',
    outcome: 'Specialist network of 40+ mentors',
  },
  {
    id: 7,
    title: 'Climate & DeepTech Cohort — Long-Cycle Ventures',
    excerpt:
      'Built for founders navigating the specific challenges of climate technology and deep technology ventures — longer development cycles, hardware dependency, regulatory complexity, and the mismatch between startup timelines and infrastructure timelines. Covers grant strategy, patient capital identification, milestone structuring, and how to build investor conviction in long-cycle businesses.',
    tag: 'Deep Tech',
    duration: '10 Weeks',
    format: 'Hybrid · Weekly',
    startDate: 'Cohort 1 · July 14, 2026',
    sector: 'Climate / Deep Tech',
    seats: '18 seats left',
    cohortNumber: 'Cohort 1',
    outcome: 'Access to 25+ specialist investors',
  },
  {
    id: 8,
    title: 'Revenue Architecture Cohort — From Founder Sales to Revenue Engine',
    excerpt:
      'A focused six-week cohort on building the revenue architecture required to take a company from founder-led sales to a repeatable, scalable revenue function. Covers sales process design, hiring the first sales hire, compensation structure, pipeline management, forecasting, and how to transition without losing the momentum that founder-led sales created.',
    tag: 'Revenue',
    duration: '6 Weeks',
    format: 'Online · Twice Weekly',
    startDate: 'Cohort 3 · July 28, 2026',
    sector: 'Cross-Sector',
    seats: '12 seats left',
    cohortNumber: 'Cohort 3',
    outcome: 'Avg. sales cycle -35% post cohort',
  },
];

// =====================================================
// FEATURED EVENT ADVERTISEMENT
// =====================================================

const FEATURED_EVENT: EventTeaser = {
  title: 'India Startup Summit 2026 — The Capital Conversation',
  tag: 'Summit',
  format: 'In-Person · 2 Days',
  date: 'March 28–29, 2026',
  location: 'The Leela, Mumbai',
  seats: '12 seats left',
};

// =====================================================
// TAG COLOR MAP — Amber/saffron palette for cohorts
// =====================================================

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  'Flagship':     { bg: 'rgba(251,191,36,0.14)',  text: '#FCD34D' },
  'Sector Cohort':{ bg: 'rgba(251,146,60,0.12)',  text: '#FDBA74' },
  'Fundraising':  { bg: 'rgba(167,139,250,0.11)', text: '#C4B5FD' },
  'Operations':   { bg: 'rgba(34,211,238,0.10)',  text: '#67E8F9' },
  'Deep Tech':    { bg: 'rgba(52,211,153,0.10)',  text: '#6EE7B7' },
  'Revenue':      { bg: 'rgba(244,114,182,0.10)', text: '#F9A8D4' },
};

const getTagStyle = (tag: string): { bg: string; text: string } =>
  TAG_COLORS[tag] ?? { bg: 'rgba(251,191,36,0.10)', text: '#FCD34D' };

// =====================================================
// ALL FILTER TAGS
// =====================================================

const ALL_TAGS: string[] = [
  'All', 'Flagship', 'Sector Cohort', 'Fundraising',
  'Operations', 'Deep Tech', 'Revenue',
];

// =====================================================
// PARTNER AUTH MODAL — copied exactly from Reports Hub
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
      style={{ backgroundColor: 'rgba(8, 5, 0, 0.82)' }}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
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
              Accessing:{' '}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partner ID
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
                    'Apply for Cohort'
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
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Application Received</h3>
                <p className="text-gray-500 text-sm">
                  Your application for{' '}
                  <span className="font-medium text-gray-700">{resourceTitle}</span>{' '}
                  has been submitted. We&apos;ll be in touch within 48 hours.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: 'rgba(200,160,40,0.25)' }}>
          Partner access is monitored and logged for security purposes.
        </p>
      </div>
    </div>
  );
};

// =====================================================
// HERO SECTION
// Deep ochre-black — distinct cohorts identity.
// Identical two-column layout to Reports & Events Hubs.
// =====================================================

const HeroSection: FC = () => (
  <section
    className="relative overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8"
    style={{ backgroundColor: '#0C0900', minHeight: '520px' }}
  >
    {/* Background dot grid */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" patternUnits="userSpaceOnUse" width="24" height="24">
            <circle cx="2" cy="2" r="1" fill="#F59E0B" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      {/* Amber radial glow — top right */}
      <div
        className="absolute -top-32 right-0 w-[700px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(120,80,0,0.24) 0%, transparent 60%)',
        }}
      />
      {/* Deep ochre glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(100,60,0,0.12) 0%, transparent 65%)',
        }}
      />
    </div>

    <div className="max-w-7xl mx-auto relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT — Headline */}
        <div className="space-y-8">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{
              backgroundColor: 'rgba(245,158,11,0.06)',
              border: '1px solid rgba(245,158,11,0.16)',
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: '#F59E0B' }}
            />
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: '#F59E0B' }}
            >
              Sarsen &amp; Company · Cohorts
            </span>
          </div>

          <div className="space-y-4">
            <h1
              className="font-light leading-none tracking-tight"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                color: '#FFFBEB',
                fontFamily: "'Georgia', 'Times New Roman', serif",
              }}
            >
              Build with a
              <br />
              <span style={{ color: '#F59E0B' }}>Cohort.</span>
            </h1>
            <p
              className="text-base sm:text-lg leading-relaxed max-w-md font-light"
              style={{ color: '#5C3D00' }}
            >
              Structured programmes for founders at specific inflection points — fundraising, scaling, sector-specific challenges. Peer accountability, expert input, and real work done in real time.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-2">
            {[
              { value: '8',    label: 'Active programmes'  },
              { value: '340+', label: 'Founders graduated' },
              { value: '87%',  label: 'Raise within 9 mo.' },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-2xl font-light"
                  style={{ color: '#FFFBEB', fontFamily: 'Georgia, serif' }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs tracking-widest uppercase mt-0.5"
                  style={{ color: '#7C4A00' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Cohort / peer-group visual motif */}
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
                  className="absolute rounded-xl"
                  style={{
                    width: '260px',
                    height: '300px',
                    top: layer * 8,
                    left: layer * 8,
                    backgroundColor: `rgba(120,80,0,${0.05 * layer})`,
                    border: `1px solid rgba(245,158,11,${0.04 * layer})`,
                  }}
                />
              ))}
              {/* Front — cohort card visual */}
              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  width: '260px',
                  height: '300px',
                  backgroundColor: '#1A1000',
                  border: '1px solid rgba(245,158,11,0.18)',
                }}
              >
                {/* Header band */}
                <div
                  className="h-14 px-5 flex items-center justify-between"
                  style={{ backgroundColor: 'rgba(120,80,0,0.55)' }}
                >
                  <div
                    className="w-20 h-2 rounded-full"
                    style={{ backgroundColor: 'rgba(245,158,11,0.40)' }}
                  />
                  <div
                    className="px-2.5 py-1 rounded-full text-xs"
                    style={{ backgroundColor: 'rgba(245,158,11,0.15)', color: '#FCD34D' }}
                  >
                    Cohort 7
                  </div>
                </div>
                {/* People / avatar rows — cohort metaphor */}
                <div className="px-5 pt-5 space-y-4">
                  {[
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 0],
                    [1, 1, 1, 0, 0],
                  ].map((row, ri) => (
                    <div key={ri} className="flex items-center gap-2">
                      {row.map((filled, ci) => (
                        <div
                          key={ci}
                          className="w-8 h-8 rounded-full"
                          style={{
                            backgroundColor: filled
                              ? `rgba(245,158,11,${0.12 + ri * 0.06 + ci * 0.02})`
                              : 'rgba(245,158,11,0.04)',
                            border: filled
                              ? '1px solid rgba(245,158,11,0.22)'
                              : '1px dashed rgba(245,158,11,0.10)',
                          }}
                        />
                      ))}
                      <div
                        className="flex-1 h-1.5 rounded-full ml-1"
                        style={{ backgroundColor: `rgba(245,158,11,${0.05 + ri * 0.03})` }}
                      />
                    </div>
                  ))}
                </div>
                {/* Progress bar rows */}
                <div className="px-5 pt-5 space-y-2.5">
                  {[
                    { w: '75%', label: 'Week 9 of 12' },
                    { w: '100%', label: 'Applications open' },
                  ].map((bar, i) => (
                    <div key={i}>
                      <div
                        className="text-xs mb-1"
                        style={{ color: 'rgba(245,158,11,0.35)', fontSize: '9px' }}
                      >
                        {bar.label}
                      </div>
                      <div
                        className="w-full rounded-full"
                        style={{ height: '4px', backgroundColor: 'rgba(245,158,11,0.08)' }}
                      >
                        <div
                          className="rounded-full"
                          style={{
                            height: '4px',
                            width: bar.w,
                            backgroundColor: `rgba(245,158,11,${0.30 + i * 0.12})`,
                          }}
                        />
                      </div>
                    </div>
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
// TAG FILTER BAR
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
    aria-label="Filter cohorts by type"
  >
    {ALL_TAGS.map((tag) => {
      const isActive = tag === activeTag;
      const style    = tag === 'All'
        ? { bg: 'rgba(245,158,11,0.10)', text: '#F59E0B' }
        : getTagStyle(tag);

      return (
        <button
          key={tag}
          type="button"
          onClick={() => onTagChange(tag)}
          className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
          style={
            isActive
              ? {
                  backgroundColor: '#7C4A00',
                  color: '#FCD34D',
                  border: '1px solid rgba(245,158,11,0.35)',
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
// FEATURED COHORT CARD — full width, first cohort
// =====================================================

interface FeaturedCohortCardProps {
  cohort: Cohort;
  onOpen: (title: string) => void;
}

const FeaturedCohortCard: FC<FeaturedCohortCardProps> = ({ cohort, onOpen }) => {
  const tagStyle    = getTagStyle(cohort.tag);
  const seatsUrgent = cohort.seats.includes('left') && parseInt(cohort.seats) <= 8;

  return (
    <article
      onClick={() => onOpen(cohort.title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(cohort.title)}
      className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
      style={{ backgroundColor: '#1A1000', border: '1px solid rgba(245,158,11,0.10)' }}
      aria-label={`Apply for cohort: ${cohort.title}`}
    >
      {/* Header */}
      <div
        className="relative h-44 sm:h-52 px-8 sm:px-10 flex items-end pb-7 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #7C4A00 0%, #1A1000 65%)' }}
      >
        {/* Decorative stacked layers */}
        <div className="absolute inset-0 flex items-center justify-end pr-10" aria-hidden="true">
          {[3, 2, 1].map((l) => (
            <div
              key={l}
              className="absolute rounded-xl"
              style={{
                width: `${80 + l * 20}px`,
                height: `${100 + l * 25}px`,
                right: `${20 + (3 - l) * 12}px`,
                top: '50%',
                transform: 'translateY(-50%)',
                border: `1px solid rgba(245,158,11,${0.05 * l})`,
                backgroundColor: `rgba(120,80,0,${0.04 * l})`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex items-center gap-3 flex-wrap">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {cohort.tag}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              color: '#F59E0B',
              border: '1px solid rgba(245,158,11,0.14)',
            }}
          >
            {cohort.cohortNumber}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: seatsUrgent ? 'rgba(245,158,11,0.16)' : 'rgba(245,158,11,0.06)',
              color: '#FCD34D',
              border: `1px solid rgba(245,158,11,${seatsUrgent ? 0.32 : 0.12})`,
            }}
          >
            {cohort.seats}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 sm:px-10 py-6 sm:py-8">
        <h2
          className="font-light leading-snug mb-3 group-hover:text-amber-300 transition-colors duration-200"
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
            color: '#FEF3C7',
            fontFamily: 'Georgia, serif',
          }}
        >
          {cohort.title}
        </h2>

        {/* Outcome callout */}
        <p
          className="text-sm font-medium mb-4"
          style={{ color: '#F59E0B' }}
        >
          ✦ {cohort.outcome}
        </p>

        <p
          className="text-sm leading-relaxed mb-6 max-w-3xl"
          style={{ color: '#5C3D00' }}
        >
          {cohort.excerpt}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Start date */}
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="#F59E0B" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs" style={{ color: '#F59E0B' }}>{cohort.startDate}</span>
            </div>
            {/* Duration */}
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="#7C4A00" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs" style={{ color: '#7C4A00' }}>{cohort.duration}</span>
            </div>
            {/* Format pill */}
            <span
              className="px-2.5 py-1 rounded-md text-xs"
              style={{ backgroundColor: 'rgba(120,80,0,0.4)', color: '#F59E0B' }}
            >
              {cohort.format}
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 text-xs font-medium group-hover:gap-3 transition-all duration-200"
            style={{ color: '#F59E0B' }}
          >
            Apply now
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
};

// =====================================================
// STANDARD COHORT CARD — 3-column grid
// =====================================================

interface CohortCardProps {
  cohort: Cohort;
  onOpen: (title: string) => void;
  animIndex: number;
}

const CohortCard: FC<CohortCardProps> = ({ cohort, onOpen, animIndex }) => {
  const tagStyle    = getTagStyle(cohort.tag);
  const seatsUrgent = cohort.seats.includes('left') && parseInt(cohort.seats) <= 6;

  return (
    <article
      onClick={() => onOpen(cohort.title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(cohort.title)}
      className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-amber-400"
      style={{
        backgroundColor: '#1A1000',
        border: '1px solid rgba(245,158,11,0.08)',
        animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${animIndex * 45}ms both`,
      }}
      aria-label={`Apply for cohort: ${cohort.title}`}
    >
      {/* Top accent line */}
      <div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, ${tagStyle.text}35, transparent)` }}
      />

      {/* Header band */}
      <div
        className="relative h-28 px-5 flex items-end pb-4 overflow-hidden"
        style={{ background: 'linear-gradient(155deg, #7C4A00 0%, #1A1000 100%)' }}
      >
        {/* Corner decoration */}
        <div className="absolute top-3 right-3 opacity-10" aria-hidden="true">
          <div className="w-10 h-12 rounded border border-amber-400" />
          <div className="w-10 h-12 rounded border border-amber-400 absolute top-1.5 left-1.5" />
        </div>

        <div className="relative z-10 flex items-center gap-2 flex-wrap">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {cohort.tag}
          </span>
          {/* Seats pill */}
          <span
            className="px-2 py-0.5 rounded-full text-xs"
            style={{
              backgroundColor: seatsUrgent ? 'rgba(245,158,11,0.18)' : 'rgba(245,158,11,0.06)',
              color: '#FCD34D',
              border: `1px solid rgba(245,158,11,${seatsUrgent ? 0.30 : 0.12})`,
            }}
          >
            {cohort.seats}
          </span>
        </div>

        {/* Apply arrow */}
        <div
          className="absolute top-4 right-4 z-10 opacity-25 group-hover:opacity-70 transition-opacity"
          aria-hidden="true"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="#F59E0B" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <h3
          className="font-medium leading-snug mb-1.5 group-hover:text-amber-300 transition-colors duration-200 line-clamp-2"
          style={{
            color: '#FEF3C7',
            fontSize: '0.9rem',
            fontFamily: 'Georgia, serif',
          }}
        >
          {cohort.title}
        </h3>

        {/* Outcome line */}
        <p
          className="text-xs font-medium mb-2"
          style={{ color: '#D97706' }}
        >
          ✦ {cohort.outcome}
        </p>

        <p
          className="text-xs leading-relaxed mb-4 line-clamp-2"
          style={{ color: '#7C4A00' }}
        >
          {cohort.excerpt}
        </p>

        {/* Date + duration */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="#F59E0B" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs" style={{ color: '#F59E0B' }}>{cohort.startDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="#7C4A00" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs" style={{ color: '#7C4A00' }}>{cohort.duration} · {cohort.format}</span>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid rgba(245,158,11,0.07)' }}
        >
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{ backgroundColor: 'rgba(120,80,0,0.4)', color: '#92580A' }}
          >
            {cohort.sector}
          </span>
          <span
            className="text-xs"
            style={{ color: '#5C3D00' }}
          >
            {cohort.cohortNumber}
          </span>
        </div>
      </div>
    </article>
  );
};

// =====================================================
// EVENT ADVERTISEMENT STRIP
// Single featured event — crimson identity to match
// the Events Hub, distinct from cohorts amber
// =====================================================

interface EventStripProps {
  onEventClick: (title: string) => void;
}

const EventAdvertStrip: FC<EventStripProps> = ({ onEventClick }) => {
  const seatsUrgent = FEATURED_EVENT.seats.includes('left') && parseInt(FEATURED_EVENT.seats) <= 15;

  return (
    <div
      className="my-12 rounded-2xl overflow-hidden"
      style={{ backgroundColor: '#130304', border: '1px solid rgba(239,68,68,0.10)' }}
    >
      <div className="px-6 sm:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(239,68,68,0.10)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="#FCA5A5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: '#FCA5A5' }}
              >
                Upcoming Event
              </p>
              <p className="text-sm font-light" style={{ color: '#5C1F1F' }}>
                A room worth being in
              </p>
            </div>
          </div>
          <a
            href="/events"
            className="text-xs font-medium flex items-center gap-1 hover:opacity-80 transition-opacity"
            style={{ color: '#FCA5A5' }}
          >
            All Events
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Single event — full-width card */}
        <div
          onClick={() => onEventClick(FEATURED_EVENT.title)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onEventClick(FEATURED_EVENT.title)}
          className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
          style={{
            backgroundColor: '#1F0505',
            border: '1px solid rgba(239,68,68,0.10)',
          }}
          aria-label={`View event: ${FEATURED_EVENT.title}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6">

            {/* Left — event info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span
                  className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: 'rgba(239,68,68,0.12)', color: '#FCA5A5' }}
                >
                  {FEATURED_EVENT.tag}
                </span>
                {seatsUrgent && (
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-xs"
                    style={{
                      backgroundColor: 'rgba(239,68,68,0.14)',
                      color: '#FCA5A5',
                      border: '1px solid rgba(239,68,68,0.25)',
                    }}
                  >
                    {FEATURED_EVENT.seats}
                  </span>
                )}
              </div>

              <p
                className="text-base font-medium leading-snug mb-3 group-hover:text-red-300 transition-colors duration-200"
                style={{ color: '#FEE2E2', fontFamily: 'Georgia, serif' }}
              >
                {FEATURED_EVENT.title}
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="#EF4444" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs" style={{ color: '#EF4444' }}>{FEATURED_EVENT.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="#5C1F1F" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs" style={{ color: '#5C1F1F' }}>{FEATURED_EVENT.location}</span>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded"
                  style={{ backgroundColor: 'rgba(127,29,29,0.35)', color: '#9B1D1D' }}
                >
                  {FEATURED_EVENT.format}
                </span>
              </div>
            </div>

            {/* Right — CTA */}
            <div className="flex-shrink-0">
              <div
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 group-hover:gap-3"
                style={{
                  backgroundColor: 'rgba(239,68,68,0.10)',
                  color: '#FCA5A5',
                  border: '1px solid rgba(239,68,68,0.20)',
                }}
              >
                Register Now
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
};

// =====================================================
// PAGE ROOT COMPONENT
// =====================================================

export default function CohortsHubPage(): React.JSX.Element {
  const [activeTag, setActiveTag]   = useState<string>('All');
  const [modalState, setModalState] = useState<ModalState>({ open: false, title: '' });

  const filteredCohorts: Cohort[] =
    activeTag === 'All'
      ? ALL_COHORTS
      : ALL_COHORTS.filter((c) => c.tag === activeTag);

  const featured: Cohort | undefined = filteredCohorts[0];
  const restCohorts: Cohort[]        = filteredCohorts.slice(1);

  // Split rest: first 3 before the event strip, remainder after
  const beforeStrip: Cohort[] = restCohorts.slice(0, 3);
  const afterStrip:  Cohort[] = restCohorts.slice(3);

  const openModal  = (title: string): void => setModalState({ open: true, title });
  const closeModal = (): void => setModalState({ open: false, title: '' });

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

      <main className="min-h-screen" style={{ backgroundColor: '#0C0900' }}>

        {/* ── Hero ─────────────────────────────────── */}
        <HeroSection />

        {/* ── Content Area ─────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

          {/* Filter bar + count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <TagFilterBar activeTag={activeTag} onTagChange={setActiveTag} />
            <p className="text-sm flex-shrink-0" style={{ color: '#5C3D00' }}>
              {filteredCohorts.length}{' '}
              {filteredCohorts.length !== 1 ? 'cohorts' : 'cohort'}
              {activeTag !== 'All' && (
                <>
                  {' '}in{' '}
                  <em style={{ color: '#F59E0B' }}>{activeTag}</em>
                </>
              )}
            </p>
          </div>

          {/* ── Featured cohort ───────────────────────── */}
          {featured && (
            <div className="mb-8">
              <FeaturedCohortCard cohort={featured} onOpen={openModal} />
            </div>
          )}

          {/* ── First 3 grid cards ───────────────────── */}
          {beforeStrip.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {beforeStrip.map((cohort, i) => (
                <CohortCard key={cohort.id} cohort={cohort} onOpen={openModal} animIndex={i} />
              ))}
            </div>
          )}

          {/* ── Event advertisement strip ─────────────── */}
          {filteredCohorts.length > 0 && (
            <EventAdvertStrip onEventClick={openModal} />
          )}

          {/* ── Remaining grid cards ─────────────────── */}
          {afterStrip.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
              {afterStrip.map((cohort, i) => (
                <CohortCard key={cohort.id} cohort={cohort} onOpen={openModal} animIndex={i} />
              ))}
            </div>
          )}

          {/* ── Empty state ──────────────────────────── */}
          {filteredCohorts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-4xl mb-4">🎓</p>
              <p className="text-lg font-light mb-1" style={{ color: '#FEF3C7' }}>
                No cohorts in &ldquo;{activeTag}&rdquo; right now
              </p>
              <p className="text-sm" style={{ color: '#5C3D00' }}>
                Try a different type or{' '}
                <button
                  type="button"
                  className="underline"
                  style={{ color: '#F59E0B' }}
                  onClick={() => setActiveTag('All')}
                >
                  view all cohorts
                </button>
                .
              </p>
            </div>
          )}

          {/* ── End message ──────────────────────────── */}
          {filteredCohorts.length > 0 && (
            <div className="flex justify-center py-12">
              <p className="text-sm" style={{ color: '#4A2E00' }}>
                All {filteredCohorts.length} cohort{filteredCohorts.length !== 1 ? 's' : ''} shown.
              </p>
            </div>
          )}

        </div>
      </main>

      {/* ── Partner Auth Modal ───────────────────────── */}
      <PartnerAuthModal
        isOpen={modalState.open}
        onClose={closeModal}
        resourceTitle={modalState.title}
      />
    </>
  );
}