// app/field-notes/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// =====================================================
// FIELD NOTES HUB PAGE
// Features:
// - Infinite scrolling to show 42 articles
// - Click on any article opens authentication modal
// - Requires Partner ID + Password to access
// - Shows we have extensive insights without revealing content
// =====================================================

// =====================================================
// AUTHENTICATION MODAL
// =====================================================
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleTitle: string;
  onAuthenticate: (partnerId: string, password: string) => void;
}

function AuthenticationModal({ isOpen, onClose, articleTitle, onAuthenticate }: AuthModalProps) {
  const [partnerId, setPartnerId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple authentication (replace with real API call in production)
    // For demo: partnerId = "partner123", password = "fieldnotes2024"
    if (partnerId === 'partner123' && password === 'fieldnotes2024') {
      onAuthenticate(partnerId, password);
      onClose();
    } else {
      setError('Invalid Partner ID or Password');
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPartnerId('');
    setPassword('');
    setError('');
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-light text-gray-800 text-center mb-2">
            Partner Access Required
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your credentials to access: <strong>{articleTitle}</strong>
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Partner ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Partner ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={partnerId}
                  onChange={(e) => setPartnerId(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your Partner ID"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 rounded-lg font-medium shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                <>
                  Read Article
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have access?{' '}
              <Link href="/contact" className="text-amber-600 hover:text-amber-700 font-medium">
                Contact us
              </Link>{' '}
              to become a partner
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

// =====================================================
// FIELD NOTE CARD
// =====================================================
interface FieldNote {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  keyInsights: string[];
  publishedDate: string;
  readTime: string;
  author: string;
  articleType: 'Strategy' | 'Tactical' | 'Case Analysis' | 'Industry Insight';
}

function FieldNoteCard({ note, onClick }: { note: FieldNote; onClick: () => void }) {
  const getArticleTypeColor = (type: string) => {
    switch (type) {
      case 'Strategy': return 'bg-blue-100 text-blue-700';
      case 'Tactical': return 'bg-green-100 text-green-700';
      case 'Case Analysis': return 'bg-purple-100 text-purple-700';
      case 'Industry Insight': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 hover:border-amber-300"
    >
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-amber-900 to-amber-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <div className="relative z-10 text-center">
          <svg className="w-16 h-16 text-white/80 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <p className="text-white font-medium text-lg">{note.title}</p>
          <p className="text-amber-200 text-sm">{note.category}</p>
        </div>
        
        {/* Lock Overlay on Hover */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-white font-medium">Click to Read</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${getArticleTypeColor(note.articleType)}`}>
            {note.articleType}
          </span>
          <span className="text-xs text-gray-500">{note.readTime}</span>
        </div>

        <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">
          {note.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {note.excerpt}
        </p>

        {/* Key Insights Preview */}
        <div className="space-y-2 mb-4">
          {note.keyInsights.slice(0, 2).map((insight, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
              <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="line-clamp-1">{insight}</span>
            </div>
          ))}
        </div>

        {/* Author & Date */}
        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-medium">{note.author}</span>
            <span className="mx-1">•</span>
            <span>{note.publishedDate}</span>
          </div>
          <svg className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// MAIN FIELD NOTES HUB PAGE
// With Infinite Scrolling
// =====================================================
export default function FieldNotesPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedFieldNote, setSelectedFieldNote] = useState<FieldNote | null>(null);
  const [displayedFieldNotes, setDisplayedFieldNotes] = useState<FieldNote[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerTarget = useRef(null);

  // ALL FIELD NOTES DATA (42 articles)
  const allFieldNotes: FieldNote[] = [
    {
      id: 'fn-001',
      title: 'The Founder-Market Fit Paradox',
      category: 'Startup Strategy',
      excerpt: 'Why finding perfect founder-market fit can actually limit your startup\'s potential and how to navigate this paradox.',
      keyInsights: ['Over-specialization leads to blind spots', 'Adaptability beats perfect initial fit', 'Pivot points require detachment'],
      publishedDate: 'Mar 15, 2024',
      readTime: '8 min read',
      author: 'Alex Morgan',
      articleType: 'Strategy'
    },
    {
      id: 'fn-002',
      title: 'GTM Lessons from 50 Failed Launches',
      category: 'Go-to-Market',
      excerpt: 'Analysis of common patterns across 50 product launches that failed to gain traction and actionable corrections.',
      keyInsights: ['Timing accounts for 40% of success', 'Early adopter identification critical', 'Distribution > Product at launch'],
      publishedDate: 'Mar 12, 2024',
      readTime: '12 min read',
      author: 'Sarah Chen',
      articleType: 'Case Analysis'
    },
    {
      id: 'fn-003',
      title: 'The Silent Killer of SaaS Margins',
      category: 'SaaS Economics',
      excerpt: 'How customer success costs silently erode SaaS margins and the frameworks to manage them effectively.',
      keyInsights: ['CS costs grow faster than revenue', 'Automation thresholds by segment', 'Retention vs. growth trade-offs'],
      publishedDate: 'Mar 10, 2024',
      readTime: '10 min read',
      author: 'Michael Rodriguez',
      articleType: 'Tactical'
    },
    {
      id: 'fn-004',
      title: 'AI Implementation: The Middle Management Gap',
      category: 'Artificial Intelligence',
      excerpt: 'Why middle management resistance is the biggest barrier to AI adoption and how to overcome it.',
      keyInsights: ['Middle managers feel threatened', 'Upskilling programs must start here', 'Success metrics need redefinition'],
      publishedDate: 'Mar 8, 2024',
      readTime: '9 min read',
      author: 'James Wilson',
      articleType: 'Industry Insight'
    },
    {
      id: 'fn-005',
      title: 'The 4-Day Workweek: One Year Later',
      category: 'Workplace Innovation',
      excerpt: 'Case study analysis of companies that adopted 4-day workweeks and the unexpected operational impacts.',
      keyInsights: ['Productivity increased 22% on average', 'Meeting culture transformed', 'Client expectations management critical'],
      publishedDate: 'Mar 5, 2024',
      readTime: '11 min read',
      author: 'Emma Thompson',
      articleType: 'Case Analysis'
    },
    {
      id: 'fn-006',
      title: 'Pricing Psychology in Enterprise Sales',
      category: 'Sales Strategy',
      excerpt: 'Advanced psychological triggers that work in enterprise software pricing negotiations.',
      keyInsights: ['Anchoring with reference customers', 'Bundle design affects perceived value', 'Payment terms as negotiation lever'],
      publishedDate: 'Mar 3, 2024',
      readTime: '7 min read',
      author: 'David Park',
      articleType: 'Tactical'
    },
    {
      id: 'fn-007',
      title: 'The Rise of Micro-Acquisitions',
      category: 'M&A Strategy',
      excerpt: 'How startups are using micro-acquisitions ($1-5M) to accelerate growth versus traditional approaches.',
      keyInsights: ['Talent acquisition driving 60% of deals', 'Integration timelines compressed', 'Cultural fit more critical at small scale'],
      publishedDate: 'Feb 28, 2024',
      readTime: '14 min read',
      author: 'Lisa Anderson',
      articleType: 'Strategy'
    },
    {
      id: 'fn-008',
      title: 'Content Marketing in AI-First Era',
      category: 'Marketing',
      excerpt: 'How AI is fundamentally changing content marketing strategies and what still requires human touch.',
      keyInsights: ['AI content needs human refinement', 'Personalization at scale now possible', 'Authenticity becoming premium'],
      publishedDate: 'Feb 25, 2024',
      readTime: '9 min read',
      author: 'Robert Kim',
      articleType: 'Industry Insight'
    },
    {
      id: 'fn-009',
      title: 'Bootstrapping to $10M ARR: Patterns',
      category: 'Startup Growth',
      excerpt: 'Analysis of bootstrapped companies that reached $10M ARR and their common operational patterns.',
      keyInsights: ['Profitability enforced discipline', 'Customer concentration managed carefully', 'Team growth delayed intentionally'],
      publishedDate: 'Feb 22, 2024',
      readTime: '13 min read',
      author: 'Sophia Williams',
      articleType: 'Case Analysis'
    },
    {
      id: 'fn-010',
      title: 'Remote Engineering Team Scaling',
      category: 'Team Building',
      excerpt: 'Practical frameworks for scaling engineering teams in fully remote environments beyond initial startup phase.',
      keyInsights: ['Documentation velocity matters most', 'Time zone overlap optimization', 'Async communication protocols'],
      publishedDate: 'Feb 20, 2024',
      readTime: '11 min read',
      author: 'Thomas Lee',
      articleType: 'Tactical'
    },
    {
      id: 'fn-011',
      title: 'The Second Product Trap',
      category: 'Product Strategy',
      excerpt: 'Why second products fail at 3x the rate of first products and how successful companies navigate this.',
      keyInsights: ['Resource allocation conflicts', 'Customer expectation management', 'Brand positioning challenges'],
      publishedDate: 'Feb 18, 2024',
      readTime: '10 min read',
      author: 'Natalie Brown',
      articleType: 'Strategy'
    },
    {
      id: 'fn-012',
      title: 'Climate Tech Investment Reality Check',
      category: 'Sustainability',
      excerpt: 'Ground truth on climate tech investments versus hype and realistic timelines for impact.',
      keyInsights: ['Hardware solutions underfunded', 'Regulatory tailwinds materializing', 'Exit pathways still unclear'],
      publishedDate: 'Feb 15, 2024',
      readTime: '12 min read',
      author: 'Carlos Martinez',
      articleType: 'Industry Insight'
    },
    {
      id: 'fn-013',
      title: 'Board Dynamics in Crisis Situations',
      category: 'Leadership',
      excerpt: 'How effective boards operate during crises versus normal operations and the critical differences.',
      keyInsights: ['Communication frequency changes', 'Decision velocity increases', 'Founder support mechanisms'],
      publishedDate: 'Feb 12, 2024',
      readTime: '8 min read',
      author: 'Jennifer Adams',
      articleType: 'Strategy'
    },
    {
      id: 'fn-014',
      title: 'The Freemium to Enterprise Bridge',
      category: 'SaaS Strategy',
      excerpt: 'Proven pathways to convert freemium users into enterprise customers without alienating either segment.',
      keyInsights: ['Usage thresholds for outreach', 'Sales-assisted upgrade paths', 'Product-led growth integration'],
      publishedDate: 'Feb 10, 2024',
      readTime: '9 min read',
      author: 'Kevin Johnson',
      articleType: 'Tactical'
    },
    {
      id: 'fn-015',
      title: 'Healthcare Tech: Regulatory Navigation',
      category: 'Health Tech',
      excerpt: 'Practical guide to navigating healthcare regulations while maintaining startup agility and speed.',
      keyInsights: ['Regulatory consultants vs. in-house', 'Pilot program design', 'Compliance as feature'],
      publishedDate: 'Feb 8, 2024',
      readTime: '14 min read',
      author: 'Maria Garcia',
      articleType: 'Case Analysis'
    },
    {
      id: 'fn-016',
      title: 'The Data Mesh Implementation Guide',
      category: 'Data Strategy',
      excerpt: 'Lessons from implementing data mesh architecture in mid-sized companies with limited resources.',
      keyInsights: ['Start with domain boundaries', 'Governance before technology', 'Change management critical'],
      publishedDate: 'Feb 5, 2024',
      readTime: '15 min read',
      author: 'Daniel White',
      articleType: 'Tactical'
    },
    {
      id: 'fn-017',
      title: 'Creator Economy: Beyond Influencers',
      category: 'Digital Business',
      excerpt: 'How businesses are leveraging creator economy models beyond social media influencers.',
      keyInsights: ['Micro-community building', 'Product co-creation models', 'Revenue sharing innovations'],
      publishedDate: 'Feb 2, 2024',
      readTime: '11 min read',
      author: 'Amanda Scott',
      articleType: 'Industry Insight'
    },
    {
      id: 'fn-018',
      title: 'The $5M- $20M ARR Transition',
      category: 'Scale-up',
      excerpt: 'Critical operational changes required when moving from $5M to $20M ARR in B2B SaaS.',
      keyInsights: ['Sales specialization required', 'Process formalization timing', 'Management layer insertion'],
      publishedDate: 'Jan 30, 2024',
      readTime: '12 min read',
      author: 'Ryan Clark',
      articleType: 'Strategy'
    },
    {
      id: 'fn-019',
      title: 'API-First Company Building',
      category: 'Developer Tools',
      excerpt: 'Strategic advantages and challenges of building API-first companies from day one.',
      keyInsights: ['Developer experience as moat', 'Pricing model complexities', 'Ecosystem building early'],
      publishedDate: 'Jan 28, 2024',
      readTime: '10 min read',
      author: 'Olivia Taylor',
      articleType: 'Case Analysis'
    },
    {
      id: 'fn-020',
      title: 'The Silent Exit: Founder Transitions',
      category: 'Founder Journey',
      excerpt: 'How successful founders transition out of day-to-day operations without disrupting the business.',
      keyInsights: ['Timeline planning 18+ months', 'Successor identification criteria', 'Communication cadence'],
      publishedDate: 'Jan 25, 2024',
      readTime: '9 min read',
      author: 'Brian Miller',
      articleType: 'Strategy'
    },
    // 22 Additional Field Notes (Total 42)
    {
      id: 'fn-021',
      title: 'Product-Led Sales: When to Add Sales Team',
      category: 'GTM Strategy',
      excerpt: 'Clear indicators that your PLG company needs to add sales team and how to integrate them.',
      keyInsights: ['Enterprise leads appearing', 'Implementation complexity increasing', 'Deal size crossing threshold'],
      publishedDate: 'Jan 22, 2024',
      readTime: '8 min read',
      author: 'Chloe Harris',
      articleType: 'Tactical'
    },
    {
      id: 'fn-022',
      title: 'The Micro-SaaS Advantage',
      category: 'SaaS Business',
      excerpt: 'Why micro-SaaS businesses are thriving in niche markets despite competition from giants.',
      keyInsights: ['Customer intimacy advantage', 'Rapid iteration capability', 'Community-driven development'],
      publishedDate: 'Jan 20, 2024',
      readTime: '7 min read',
      author: 'Ethan Walker',
      articleType: 'Industry Insight'
    },
    {
      id: 'fn-023',
      title: 'Crisis Communications Framework',
      category: 'PR & Communications',
      excerpt: 'Step-by-step framework for handling PR crises in the age of social media and instant news.',
      keyInsights: ['Response timing hierarchy', 'Internal communication first', 'Stakeholder mapping critical'],
      publishedDate: 'Jan 18, 2024',
      readTime: '11 min read',
      author: 'Grace King',
      articleType: 'Tactical'
    },
    {
      id: 'fn-024',
      title: 'The Vertical SaaS Playbook',
      category: 'SaaS Strategy',
      excerpt: 'How to identify, enter, and dominate vertical SaaS markets with limited resources.',
      keyInsights: ['Industry pain point mapping', 'Early adopter identification', 'Network effects in verticals'],
      publishedDate: 'Jan 15, 2024',
      readTime: '13 min read',
      author: 'Henry Wright',
      articleType: 'Strategy'
    },
    {
      id: 'fn-025',
      title: 'AI Ethics in Product Development',
      category: 'AI Strategy',
      excerpt: 'Practical approaches to integrating ethical considerations into AI product development cycles.',
      keyInsights: ['Bias testing frameworks', 'Transparency requirements', 'User consent mechanisms'],
      publishedDate: 'Jan 12, 2024',
      readTime: '10 min read',
      author: 'Isabella Lopez',
      articleType: 'Case Analysis'
    },
    {
      id: 'fn-026',
      title: 'The Remote Sales Team Blueprint',
      category: 'Sales Management',
      excerpt: 'Managing and motivating sales teams in fully remote or hybrid environments effectively.',
      keyInsights: ['Activity metrics vs. outcomes', 'Collaboration tool stack', 'Culture building remotely'],
      publishedDate: 'Jan 10, 2024',
      readTime: '9 min read',
      author: 'Jack Hill',
      articleType: 'Tactical'
    },
    {
      id: 'fn-027',
      title: 'Fintech Regulatory Arbitrage',
      category: 'Fintech',
      excerpt: 'How fintech startups are using regulatory differences across regions to their advantage.',
      keyInsights: ['Market entry sequencing', 'Regulatory sandbox utilization', 'Compliance as competitive edge'],
      publishedDate: 'Jan 8, 2024',
      readTime: '12 min read',
      author: 'Katherine Young',
      articleType: 'Industry Insight'
    },
    {
      id: 'fn-028',
      title: 'The Minimum Viable Board',
      category: 'Governance',
      excerpt: 'What early-stage startups actually need from their boards versus traditional expectations.',
      keyInsights: ['Frequency vs. depth', 'Advisor vs. director roles', 'Founder coaching focus'],
      publishedDate: 'Jan 5, 2024',
      readTime: '8 min read',
      author: 'Liam Allen',
      articleType: 'Strategy'
    },
    {
      id: 'fn-029',
      title: 'Customer Success Metrics That Matter',
      category: 'Customer Success',
      excerpt: 'Beyond NPS: actionable metrics for customer success teams that actually predict retention.',
      keyInsights: ['Product adoption depth', 'Support interaction quality', 'Expansion signal tracking'],
      publishedDate: 'Jan 3, 2024',
      readTime: '10 min read',
      author: 'Maya Hernandez',
      articleType: 'Tactical'
    },
    {
      id: 'fn-030',
      title: 'The Infrastructure as Service Shift',
      category: 'Cloud Computing',
      excerpt: 'How infrastructure companies are shifting to service models and the financial implications.',
      keyInsights: ['Recurring revenue transformation', 'Customer lock-in strategies', 'Margin structure changes'],
      publishedDate: 'Dec 28, 2023',
      readTime: '11 min read',
      author: 'Noah Nelson',
      articleType: 'Industry Insight'
    },
    {
      id: 'fn-031',
      title: 'The 100-Day CEO Plan',
      category: 'Leadership',
      excerpt: 'Actionable 100-day plan for new CEOs taking over existing companies versus founding CEOs.',
      keyInsights: ['Listening tour structure', 'Quick win identification', 'Cultural assessment methods'],
      publishedDate: 'Dec 25, 2023',
      readTime: '9 min read',
      author: 'Sophie Carter',
      articleType: 'Strategy'
    },
    {
      id: 'fn-032',
      title: 'B2B Community Building Tactics',
      category: 'Marketing',
      excerpt: 'Proven tactics for building engaged B2B communities that actually drive business outcomes.',
      keyInsights: ['Expert-led vs. peer-led', 'Content cadence optimization', 'Value measurement frameworks'],
      publishedDate: 'Dec 22, 2023',
      readTime: '12 min read',
      author: 'William Perez',
      articleType: 'Tactical'
    },
    {
      id: 'fn-033',
      title: 'The Future of Work: 2024 Trends',
      category: 'Workplace',
      excerpt: 'Data-driven analysis of workplace trends that will shape 2024 based on current adoption rates.',
      keyInsights: ['AI co-pilot integration', 'Four-day week expansion', 'Skills-based hiring acceleration'],
      publishedDate: 'Dec 20, 2023',
      readTime: '14 min read',
      author: 'Ava Roberts',
      articleType: 'Industry Insight'
    },
    {
      id: 'fn-034',
      title: 'Product Analytics Implementation',
      category: 'Product Management',
      excerpt: 'Step-by-step guide to implementing product analytics that actually inform decision making.',
      keyInsights: ['Metric hierarchy definition', 'Tool selection criteria', 'Team adoption strategies'],
      publishedDate: 'Dec 18, 2023',
      readTime: '11 min read',
      author: 'Benjamin Turner',
      articleType: 'Tactical'
    },
    {
      id: 'fn-035',
      title: 'The International Expansion Checklist',
      category: 'Growth Strategy',
      excerpt: 'Comprehensive checklist for B2B SaaS companies expanding internationally beyond English-speaking markets.',
      keyInsights: ['Market prioritization framework', 'Localization depth required', 'Legal entity considerations'],
      publishedDate: 'Dec 15, 2023',
      readTime: '15 min read',
      author: 'Charlotte Phillips',
      articleType: 'Strategy'
    },
    {
      id: 'fn-036',
      title: 'The Data Privacy Advantage',
      category: 'Compliance',
      excerpt: 'How leading companies are turning data privacy compliance into competitive advantages.',
      keyInsights: ['Trust as differentiator', 'Simplified consent models', 'Transparency as feature'],
      publishedDate: 'Dec 12, 2023',
      readTime: '10 min read',
      author: 'David Campbell',
      articleType: 'Case Analysis'
    },
    {
      id: 'fn-037',
      title: 'The Angel Investor Playbook',
      category: 'Fundraising',
      excerpt: 'How to effectively raise from angel investors in current market conditions with practical templates.',
      keyInsights: ['Angel network targeting', 'Deck customization approach', 'Follow-on strategy planning'],
      publishedDate: 'Dec 10, 2023',
      readTime: '9 min read',
      author: 'Emily Parker',
      articleType: 'Tactical'
    },
    {
      id: 'fn-038',
      title: 'The Platform Risk Assessment',
      category: 'Risk Management',
      excerpt: 'How to assess and mitigate risks when building on third-party platforms like AWS, Shopify, etc.',
      keyInsights: ['Concentration risk metrics', 'Exit strategy planning', 'Platform dependency reduction'],
      publishedDate: 'Dec 8, 2023',
      readTime: '11 min read',
      author: 'Frank Evans',
      articleType: 'Strategy'
    },
    {
      id: 'fn-039',
      title: 'The Content-Product Flywheel',
      category: 'Content Strategy',
      excerpt: 'How to create a self-reinforcing cycle between content marketing and product development.',
      keyInsights: ['Content informs product roadmap', 'Product features generate content', 'Customer feedback integration'],
      publishedDate: 'Dec 5, 2023',
      readTime: '8 min read',
      author: 'Grace Rivera',
      articleType: 'Tactical'
    },
    {
      id: 'fn-040',
      title: 'The Hardware Startup Pivot',
      category: 'Hardware Tech',
      excerpt: 'Case studies of hardware startups that successfully pivoted to survive market changes.',
      keyInsights: ['SaaS layer addition', 'Business model innovation', 'Supply chain diversification'],
      publishedDate: 'Dec 2, 2023',
      readTime: '13 min read',
      author: 'Henry Cox',
      articleType: 'Case Analysis'
    },
    {
      id: 'fn-041',
      title: 'The Remote Culture Scorecard',
      category: 'Company Culture',
      excerpt: 'How to measure and improve remote company culture with quantitative and qualitative metrics.',
      keyInsights: ['Connection frequency metrics', 'Inclusion measurement tools', 'Async communication quality'],
      publishedDate: 'Nov 29, 2023',
      readTime: '10 min read',
      author: 'Ivy James',
      articleType: 'Tactical'
    },
    {
      id: 'fn-042',
      title: 'The Exit Readiness Assessment',
      category: 'M&A',
      excerpt: 'Comprehensive framework to assess your company\'s readiness for acquisition and maximize valuation.',
      keyInsights: ['Financial documentation readiness', 'Legal compliance audit', 'Team retention planning'],
      publishedDate: 'Nov 26, 2023',
      readTime: '14 min read',
      author: 'Jacob Reed',
      articleType: 'Strategy'
    }
  ];

  // Load initial field notes
  useEffect(() => {
    setDisplayedFieldNotes(allFieldNotes.slice(0, 9));
  }, []);

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreFieldNotes();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [displayedFieldNotes, hasMore]);

  const loadMoreFieldNotes = () => {
    const currentLength = displayedFieldNotes.length;
    const nextFieldNotes = allFieldNotes.slice(currentLength, currentLength + 9);
    
    if (nextFieldNotes.length > 0) {
      setTimeout(() => {
        setDisplayedFieldNotes([...displayedFieldNotes, ...nextFieldNotes]);
        setPage(page + 1);
      }, 500);
    }

    if (currentLength + nextFieldNotes.length >= allFieldNotes.length) {
      setHasMore(false);
    }
  };

  const handleFieldNoteClick = (note: FieldNote) => {
    setSelectedFieldNote(note);
    setShowAuthModal(true);
  };

  const handleAuthenticate = (partnerId: string, password: string) => {
    // Store authentication in session
    sessionStorage.setItem('partnerAuth', 'true');
    sessionStorage.setItem('partnerId', partnerId);
    
    // Redirect to actual article page
    window.location.href = `/field-notes/${selectedFieldNote?.id}`;
  };

  return (
    <main className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="bg-[#2E1F0A] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-amber-600/20 rounded-full text-amber-400 text-xs font-medium mb-6">
            FIELD NOTES FROM THE FRONT LINES
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
            Practical Insights &<br/>
            <span className="text-amber-300">Battle-Tested Strategies</span>
          </h1>
          <p className="text-xl text-amber-200 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
            Access 42 exclusive articles with real-world lessons, tactical frameworks, and strategic insights from industry practitioners.
          </p>
          <div className="flex items-center justify-center gap-6 text-amber-200">
            <div className="text-center">
              <div className="text-3xl font-light text-white mb-1">42</div>
              <div className="text-sm">Field Notes</div>
            </div>
            <div className="w-px h-12 bg-amber-600"></div>
            <div className="text-center">
              <div className="text-3xl font-light text-white mb-1">15+</div>
              <div className="text-sm">Industry Experts</div>
            </div>
            <div className="w-px h-12 bg-amber-600"></div>
            <div className="text-center">
              <div className="text-3xl font-light text-white mb-1">500+</div>
              <div className="text-sm">Actionable Insights</div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      <section className="bg-amber-50 border-b border-amber-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-sm text-gray-700">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p>
              <strong>Partner Access Required:</strong> All field notes require partner verification. 
              <Link href="/contact" className="text-amber-600 hover:text-amber-700 font-medium ml-2">
                Request Access
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Field Notes Grid with Infinite Scroll */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedFieldNotes.map((note) => (
              <FieldNoteCard
                key={note.id}
                note={note}
                onClick={() => handleFieldNoteClick(note)}
              />
            ))}
          </div>

          {/* Loading Indicator */}
          {hasMore && (
            <div ref={observerTarget} className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading more field notes...</p>
              </div>
            </div>
          )}

          {/* End Message */}
          {!hasMore && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You've viewed all {allFieldNotes.length} field notes</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <span>Become a Partner for Full Access</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}

        </div>
      </section>

      {/* Article Categories Overview */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-gray-900 text-center mb-12">
            Comprehensive Coverage Across Key Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'Startup Strategy',
              'Go-to-Market',
              'SaaS Economics',
              'Leadership',
              'Product Management',
              'Sales Strategy',
              'Marketing',
              'Team Building',
              'Fundraising',
              'M&A Strategy',
              'AI Implementation',
              'Remote Work'
            ].map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Authors */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-gray-900 text-center mb-12">
            Insights from Industry Practitioners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Alex Morgan', role: 'Ex-Google PM', articles: 8 },
              { name: 'Sarah Chen', role: 'VC Partner', articles: 6 },
              { name: 'Michael R.', role: 'SaaS Founder', articles: 5 },
              { name: 'Emma T.', role: 'HR Innovator', articles: 4 },
              { name: 'David Park', role: 'Sales Leader', articles: 7 },
              { name: 'Lisa A.', role: 'M&A Expert', articles: 5 }
            ].map((author, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-medium">
                  {author.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 className="font-medium text-gray-900">{author.name}</h4>
                <p className="text-sm text-gray-600">{author.role}</p>
                <p className="text-xs text-amber-600 mt-1">{author.articles} articles</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2E1F0A] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-light text-white mb-6">
            Learn from Real-World<br/>
            <span className="text-amber-300">Experience & Execution</span>
          </h2>
          <p className="text-amber-200 text-xl mb-10 max-w-2xl mx-auto">
            Join partners who apply these insights to avoid common pitfalls, accelerate growth, and make better strategic decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-amber-900 px-8 py-4 rounded-lg hover:bg-amber-50 transition-all duration-300 font-medium shadow-lg"
            >
              <span>Get Partner Access</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center border-2 border-amber-500 text-amber-300 px-8 py-4 rounded-lg hover:bg-amber-500/10 transition-all duration-300 font-medium"
            >
              <span>Explore Tools</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        articleTitle={selectedFieldNote?.title || ''}
        onAuthenticate={handleAuthenticate}
      />

    </main>
  );
}