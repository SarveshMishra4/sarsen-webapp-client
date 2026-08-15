'use client';

// resources/blogs/page.tsx
//
// Public blog listing page. UI structure (hero, featured card, grid, tag
// filter, load-more, reports/case-study ad strips) is carried over from the
// original static mock — only the data source changed.
//
// DECISION: the original mock wrapped every card click (blog posts AND the
// reports/case-studies ad strips) in a "Partner Access" login modal. That
// gating makes sense for the Reports/Case Studies strips (kept exactly as
// before, still static placeholders per the plan). It does NOT make sense
// for blog posts themselves — this is a public blog, so clicking a post now
// navigates straight to /resources/blogs/{slug} instead of prompting for a
// partner login. Flag me if blog posts were actually meant to be gated too.
//
// PAGINATION NOTE: rather than wiring true server-side infinite scroll
// against the API, this fetches up to 100 published posts per tag filter in
// one call and reuses the original batch-of-25 client-side reveal logic
// (same load-more UX, same feel). If you expect to regularly have 100+
// published posts, tell me and I'll switch this to real page-by-page
// fetching against the `page`/`limit` params the backend already supports.

import React, { useState, useEffect, useCallback, FC, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getPublishedBlogs } from '@/services/blog.service';

// =====================================================
// TYPES
// =====================================================

interface BlogListItem {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readTimeMinutes: number;
  publishedAt?: string;
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

interface ModalState {
  open: boolean;
  title: string;
}

// =====================================================
// STATIC AD-STRIP DATA — unchanged, out of scope per the plan
// =====================================================

const FEATURED_REPORTS: ReportTeaser[] = [
  { title: 'Indian Startup Ecosystem Report 2026', pages: '142 pages', date: 'Feb 2026', tag: 'Annual Report' },
  { title: 'State of B2B SaaS in India — 2025 Review', pages: '68 pages', date: 'Dec 2025', tag: 'Sector Report' },
  { title: 'The Fundability Framework — Investor Report', pages: '52 pages', date: 'Jun 2025', tag: 'Framework' },
];

const FEATURED_CASE_STUDIES: CaseStudyTeaser[] = [
  { title: 'From ₹80L to ₹5Cr: Restructuring a Fragile Revenue Base', sector: 'B2B SaaS', year: '2024', tag: 'Revenue' },
  { title: 'Fixing the Unit Economics Before the Series A', sector: 'D2C', year: '2024', tag: 'Fundraising' },
  { title: 'The Pivot That Saved a Fintech Startup', sector: 'Fintech', year: '2023', tag: 'Pivot' },
];

const BATCH_SIZE = 25;

const ALL_TAGS: string[] = [
  'All', 'Strategy', 'Revenue', 'Finance', 'Operations',
  'Fundraising', 'Metrics', 'PMF', 'Product', 'Thinking', 'Customers', 'Advisory',
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Strategy: { bg: '#DBEAFE', text: '#1E40AF' },
  Revenue: { bg: '#E0F2FE', text: '#0369A1' },
  Finance: { bg: '#E6F0FF', text: '#1E3A8A' },
  Metrics: { bg: '#DBEAFE', text: '#1E40AF' },
  PMF: { bg: '#E0E7FF', text: '#3730A3' },
  Operations: { bg: '#E6F0FF', text: '#1E3A8A' },
  Thinking: { bg: '#DBEAFE', text: '#1E40AF' },
  Fundraising: { bg: '#E0F2FE', text: '#0369A1' },
  Customers: { bg: '#E6F0FF', text: '#1E3A8A' },
  Advisory: { bg: '#E0E7FF', text: '#3730A3' },
  Product: { bg: '#DBEAFE', text: '#1E40AF' },
};

const getTagStyle = (tag: string) => TAG_COLORS[tag] ?? { bg: '#DBEAFE', text: '#1E40AF' };

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

// =====================================================
// Generic "gated resource" modal — kept for Reports/Case Studies only
// =====================================================

interface PartnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle: string;
}

const PartnerAuthModal: FC<PartnerAuthModalProps> = ({ isOpen, onClose, resourceTitle }) => {
  const [formData, setFormData] = useState({ partnerId: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData({ partnerId: '', password: '' });
      setError('');
      setSuccess(false);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md" style={{ animation: 'modalIn 0.3s cubic-bezier(0.22,1,0.36,1) both' }}>
        <div className="bg-white rounded-md shadow-2xl overflow-hidden">
          <div className="px-8 py-6 relative border-b border-gray-200">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close modal">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-semibold text-gray-800">Request Access</h2>
            <p className="text-sm text-gray-600 mt-1">
              Enter your partner credentials to read: <span className="font-medium text-gray-700">{resourceTitle}</span>
            </p>
          </div>
          <div className="px-8 py-8">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Partner ID</label>
                  <input
                    type="text"
                    value={formData.partnerId}
                    onChange={e => setFormData(p => ({ ...p, partnerId: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                    placeholder="e.g. SSP-2024-XXXX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
                      placeholder="Enter your password"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 text-sm ${loading ? 'opacity-75 cursor-not-allowed' : 'shadow-lg hover:shadow-xl'}`}
                >
                  {loading ? 'Authenticating…' : 'Read Resource'}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Access Granted</h3>
                <p className="text-gray-500 text-sm">
                  Opening <span className="font-medium text-gray-700">{resourceTitle}</span>…
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// HERO
// =====================================================

const HeroSection: FC = () => (
  <section className="relative overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0A1E3D', minHeight: '520px' }}>
    <div className="max-w-7xl mx-auto relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-7">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white">
              Thinking
              <span className="block text-blue-300">Out Loud.</span>
            </h1>
            <p className="text-base sm:text-lg max-w-md text-gray-400">
              In-depth perspectives on strategy, revenue architecture, capital decisions, and the structural realities of building startups in India.
            </p>
          </div>
        </div>
        <div className="relative hidden lg:flex items-center justify-end" style={{ height: '420px' }} aria-hidden="true">
          <img src="/assets/resources/Blog Head.svg" alt="" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  </section>
);

// =====================================================
// CARDS
// =====================================================

const FeaturedBlogCard: FC<{ post: BlogListItem; onRead: (slug: string) => void }> = ({ post, onRead }) => {
  const tagStyle = getTagStyle(post.tag);
  return (
    <article
      onClick={() => onRead(post.slug)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onRead(post.slug)}
      className="group cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#93C5FD]"
      style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.12)' }}
    >
      <div className="relative h-40 sm:h-48 px-8 flex items-end pb-6 overflow-hidden" style={{ backgroundColor: '#0A1E3D' }}>
        <div className="relative z-10 flex items-center gap-3">
          <span className="px-3 py-1 rounded-md text-xs font-semibold" style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}>
            {post.tag}
          </span>
          <span className="text-xs px-3 py-1 rounded-md" style={{ backgroundColor: 'rgba(147,197,253,0.08)', color: '#93C5FD', border: '1px solid rgba(147,197,253,0.15)' }}>
            Featured
          </span>
        </div>
      </div>
      <div className="px-8 py-6">
        <h2 className="mb-3 group-hover:text-[#93C5FD] transition-colors duration-200 text-white" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>
          {post.title}
        </h2>
        <p className="text-sm mb-5 text-gray-400">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">{formatDate(post.publishedAt)}</span>
            <span className="text-xs text-gray-500">{post.readTimeMinutes} min read</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium group-hover:gap-2.5 transition-all duration-200" style={{ color: '#93C5FD' }}>
            Read article →
          </div>
        </div>
      </div>
    </article>
  );
};

const BlogCard: FC<{ post: BlogListItem; onRead: (slug: string) => void; animIndex: number }> = ({ post, onRead, animIndex }) => {
  const tagStyle = getTagStyle(post.tag);
  return (
    <article
      onClick={() => onRead(post.slug)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onRead(post.slug)}
      className="group cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#93C5FD]"
      style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', animation: `cardIn 0.4s cubic-bezier(0.22,1,0.36,1) ${animIndex * 40}ms both` }}
    >
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${tagStyle.bg}, transparent)` }} />
      <div className="px-5 py-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold flex-shrink-0" style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}>
            {post.tag}
          </span>
        </div>
        <h3 className="font-medium mb-2 group-hover:text-[#1E40AF] transition-colors duration-200 line-clamp-2 text-gray-900" style={{ fontSize: '0.925rem' }}>
          {post.title}
        </h3>
        <p className="text-xs mb-4 line-clamp-2 text-gray-500">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-3">
          <span className="text-xs text-gray-500">{post.readTimeMinutes} min read</span>
          <span className="text-xs text-gray-500">{formatDate(post.publishedAt)}</span>
        </div>
      </div>
    </article>
  );
};

// =====================================================
// AD STRIPS — unchanged, still gated via modal
// =====================================================

const ReportsAdvertStrip: FC<{ onReportClick: (title: string) => void }> = ({ onReportClick }) => (
  <div className="my-12 rounded-md overflow-hidden" style={{ backgroundColor: '#132B47', border: '1px solid rgba(59,130,246,0.12)' }}>
    <div className="px-6 sm:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-medium text-blue-300">Research &amp; Reports</p>
          <p className="text-sm text-gray-400">Data-backed analysis for founders</p>
        </div>
        <a href="/resources/reports" className="text-xs font-medium text-blue-300 hover:opacity-80 transition-opacity">All Reports →</a>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {FEATURED_REPORTS.map(report => {
          const tagStyle = getTagStyle(report.tag);
          return (
            <div
              key={report.title}
              onClick={() => onReportClick(report.title)}
              role="button"
              tabIndex={0}
              className="group cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.08)' }}
            >
              <div className="relative h-28 px-5 flex items-end pb-4 overflow-hidden" style={{ background: 'linear-gradient(155deg, #132B47 0%, #0A1E3D 100%)' }}>
                <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold" style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}>
                  {report.tag}
                </span>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm font-medium mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 text-white">{report.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blue-400">{report.pages}</span>
                  <span className="text-xs text-gray-600">·</span>
                  <span className="text-xs text-gray-500">{report.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const CaseStudiesAdvertStrip: FC<{ onCaseStudyClick: (title: string) => void }> = ({ onCaseStudyClick }) => (
  <div className="my-12 rounded-md overflow-hidden" style={{ backgroundColor: '#132B47', border: '1px solid rgba(59,130,246,0.12)' }}>
    <div className="px-6 sm:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-medium text-blue-300">Case Studies</p>
          <p className="text-sm text-gray-400">Real decisions. Real outcomes.</p>
        </div>
        <a href="/resources/case-studies" className="text-xs font-medium text-blue-300 hover:opacity-80 transition-opacity">All Cases →</a>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {FEATURED_CASE_STUDIES.map(cs => {
          const tagStyle = getTagStyle(cs.tag);
          return (
            <div
              key={cs.title}
              onClick={() => onCaseStudyClick(cs.title)}
              role="button"
              tabIndex={0}
              className="group cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{ backgroundColor: '#0A1E3D', border: '1px solid rgba(59,130,246,0.08)' }}
            >
              <div className="relative h-28 px-5 flex items-end pb-4 overflow-hidden" style={{ background: 'linear-gradient(155deg, #132B47 0%, #0A1E3D 100%)' }}>
                <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold" style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}>
                  {cs.tag}
                </span>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm font-medium mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2 text-white">{cs.title}</p>
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
// LOAD MORE + TAG FILTER
// =====================================================

const LoadMoreSentinel: FC<{ onVisible: () => void; loading: boolean; hasMore: boolean; total: number }> = ({ onVisible, loading, hasMore, total }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hasMore) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting) onVisible(); }, { rootMargin: '200px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [onVisible, hasMore]);

  return (
    <div ref={ref} className="flex justify-center py-10">
      {loading && <span className="text-sm text-gray-500">Loading more articles…</span>}
      {!loading && !hasMore && total > 0 && (
        <p className="text-sm text-gray-500">You&apos;ve reached the end — {total} article{total !== 1 ? 's' : ''} total.</p>
      )}
    </div>
  );
};

const TagFilterBar: FC<{ activeTag: string; onTagChange: (tag: string) => void }> = ({ activeTag, onTagChange }) => (
  <div className="flex gap-2 overflow-x-auto py-2" style={{ scrollbarWidth: 'none' } as React.CSSProperties} role="toolbar" aria-label="Filter blogs by category">
    {ALL_TAGS.map(tag => {
      const isActive = tag === activeTag;
      const style = tag === 'All' ? { bg: '#0A1E3D', text: '#93C5FD' } : getTagStyle(tag);
      return (
        <button
          key={tag}
          type="button"
          onClick={() => onTagChange(tag)}
          className="flex-shrink-0 px-4 py-2 rounded-md text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#93C5FD]"
          style={isActive ? { backgroundColor: '#0A1E3D', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.40)' } : { backgroundColor: style.bg, color: style.text, border: '1px solid transparent', opacity: 0.7 }}
        >
          {tag}
        </button>
      );
    })}
  </div>
);

// =====================================================
// MAIN PAGE
// =====================================================

export default function BlogsHubPage() {
  const router = useRouter();
  const [activeTag, setActiveTag] = useState('All');
  const [allPosts, setAllPosts] = useState<BlogListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loadedCount, setLoadedCount] = useState(BATCH_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [modalState, setModalState] = useState<ModalState>({ open: false, title: '' });

  useEffect(() => {
    let cancelled = false;
    setFetching(true);
    getPublishedBlogs({ tag: activeTag, limit: 100 })
      .then(res => {
        if (cancelled) return;
        setAllPosts(res.blogs ?? []);
        setTotal(res.total ?? 0);
        setLoadedCount(BATCH_SIZE);
      })
      .catch(() => { if (!cancelled) setAllPosts([]); })
      .finally(() => { if (!cancelled) setFetching(false); });
    return () => { cancelled = true; };
  }, [activeTag]);

  const visiblePosts = allPosts.slice(0, loadedCount);
  const hasMore = loadedCount < allPosts.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setLoadedCount(prev => Math.min(prev + BATCH_SIZE, allPosts.length));
      setIsLoading(false);
    }, 400);
  }, [isLoading, hasMore, allPosts.length]);

  const goToPost = (slug: string) => router.push(`/resources/blogs/${slug}`);
  const openGatedModal = (title: string) => setModalState({ open: true, title });
  const closeModal = () => setModalState({ open: false, title: '' });

  const showReportStrip = visiblePosts.length >= 6;
  const showCaseStudyStrip = visiblePosts.length >= 12;

  const featured = visiblePosts[0];
  const rest = visiblePosts.slice(1);
  const firstHalf = rest.slice(0, Math.ceil(rest.length / 2));
  const secondHalf = rest.slice(Math.ceil(rest.length / 2));

  return (
    <>
      <style>{`
        @keyframes cardIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes modalIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <main className="min-h-screen" style={{ backgroundColor: '#E8EEF2' }}>
        <HeroSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <TagFilterBar activeTag={activeTag} onTagChange={setActiveTag} />
            <p className="text-sm flex-shrink-0 text-gray-500">
              {total} article{total !== 1 ? 's' : ''}
              {activeTag !== 'All' && <span className="text-blue-600"> in {activeTag}</span>}
            </p>
          </div>

          {fetching ? (
            <div className="text-center py-24 text-gray-400">Loading articles…</div>
          ) : visiblePosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-lg mb-1 text-gray-900">No articles in &ldquo;{activeTag}&rdquo; yet</p>
              <p className="text-sm text-gray-500">
                Try a different category or{' '}
                <button type="button" className="underline text-blue-800" onClick={() => setActiveTag('All')}>view all</button>.
              </p>
            </div>
          ) : (
            <>
              {featured && <div className="mb-8"><FeaturedBlogCard post={featured} onRead={goToPost} /></div>}

              {firstHalf.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
                  {firstHalf.map((post, i) => <BlogCard key={post._id} post={post} onRead={goToPost} animIndex={i} />)}
                </div>
              )}

              {showReportStrip && <ReportsAdvertStrip onReportClick={openGatedModal} />}

              {secondHalf.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
                  {secondHalf.map((post, i) => <BlogCard key={post._id} post={post} onRead={goToPost} animIndex={i} />)}
                </div>
              )}

              {showCaseStudyStrip && <CaseStudiesAdvertStrip onCaseStudyClick={openGatedModal} />}

              <LoadMoreSentinel onVisible={loadMore} loading={isLoading} hasMore={hasMore} total={total} />
            </>
          )}
        </div>
      </main>

      <PartnerAuthModal isOpen={modalState.open} onClose={closeModal} resourceTitle={modalState.title} />
    </>
  );
}
