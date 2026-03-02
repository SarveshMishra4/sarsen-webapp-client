// app/case-studies/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// =====================================================
// CASE STUDIES HUB PAGE
// Features:
// - Infinite scrolling to show many case studies
// - Click on any case study opens authentication modal
// - Requires Partner ID + Password to view
// - Shows we have many case studies without revealing content
// =====================================================

// =====================================================
// AUTHENTICATION MODAL
// =====================================================
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudyTitle: string;
  onAuthenticate: (partnerId: string, password: string) => void;
}

function AuthenticationModal({ isOpen, onClose, caseStudyTitle, onAuthenticate }: AuthModalProps) {
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
    // For demo: partnerId = "partner123", password = "case2024"
    if (partnerId === 'partner123' && password === 'case2024') {
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
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-light text-gray-800 text-center mb-2">
            Partner Access Required
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your credentials to view: <strong>{caseStudyTitle}</strong>
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-medium shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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
                  Access Case Study
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
              <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
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
// CASE STUDY CARD
// =====================================================
interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  challenge: string;
  results: string[];
  image?: string;
  year: string;
  packageUsed: string;
}

function CaseStudyCard({ study, onClick }: { study: CaseStudy; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 hover:border-blue-300"
    >
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <div className="relative z-10 text-center">
          <svg className="w-16 h-16 text-white/80 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <p className="text-white font-medium text-lg">{study.company}</p>
          <p className="text-blue-200 text-sm">{study.industry}</p>
        </div>
        
        {/* Lock Overlay on Hover */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-white font-medium">Click to Access</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
            {study.year}
          </span>
          <span className="text-xs text-gray-500">{study.packageUsed}</span>
        </div>

        <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
          {study.company}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {study.challenge}
        </p>

        {/* Results Preview */}
        <div className="space-y-2 mb-4">
          {study.results.slice(0, 2).map((result, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
              <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="line-clamp-1">{result}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-500">Partner Access Required</span>
          <svg className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// CONTINUE TO PART 2...
// app/case-studies/page.tsx - PART 2
// PASTE THIS IMMEDIATELY AFTER PART 1

// =====================================================
// MAIN CASE STUDIES HUB PAGE
// With Infinite Scrolling
// =====================================================
export default function CaseStudiesPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [displayedCaseStudies, setDisplayedCaseStudies] = useState<CaseStudy[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerTarget = useRef(null);

  // ALL CASE STUDIES DATA (50+ case studies for demonstration)
  const allCaseStudies: CaseStudy[] = [
    {
      id: 'cs-001',
      company: 'TechFlow Analytics',
      industry: 'B2B SaaS - Marketing Analytics',
      challenge: 'Pre-revenue startup with 14 months of development, $800K seed funding, but zero paying customers. Brilliant team but directionless.',
      results: ['$2M ARR in 18 months', '120% Net Revenue Retention', '$8M Series A at $35M valuation'],
      year: '2024',
      packageUsed: 'Diagnostic + PMF + GTM'
    },
    {
      id: 'cs-002',
      company: 'EcoLiving Products',
      industry: 'D2C Consumer Goods',
      challenge: 'Entering saturated eco-products market with limited brand awareness and unclear differentiation.',
      results: ['8% market share in year one', '500+ retail locations', 'Month 14 profitability'],
      year: '2024',
      packageUsed: 'Market Entry + Operations'
    },
    {
      id: 'cs-003',
      company: 'PaymentBridge',
      industry: 'Fintech',
      challenge: 'Initial product failing completely. Down to 4 months runway, team morale collapsing.',
      results: ['10x user growth post-pivot', '$50M valuation Series A', '$12M funding secured'],
      year: '2023',
      packageUsed: 'Turnaround + PMF + Fundraising'
    },
    {
      id: 'cs-004',
      company: 'HealthSync Platform',
      industry: 'HealthTech',
      challenge: 'Complex B2B2C model with slow sales cycles and high CAC affecting unit economics.',
      results: ['60% CAC reduction', '3x conversion rate', '$15M ARR achieved'],
      year: '2024',
      packageUsed: 'GTM Strategy + Operations'
    },
    {
      id: 'cs-005',
      company: 'EdTech Innovators',
      industry: 'Education Technology',
      challenge: 'Product-market fit unclear, high churn rate at 45%, struggling to retain customers.',
      results: ['Churn reduced to 12%', 'PMF validated with 85% score', '200% revenue growth'],
      year: '2023',
      packageUsed: 'PMF Clarity + Product Strategy'
    },
    {
      id: 'cs-006',
      company: 'LogiChain Solutions',
      industry: 'Supply Chain SaaS',
      challenge: 'Operations chaos with founder working 80+ hour weeks, no delegation structure.',
      results: ['Founder time reduced to 40hrs/week', '300% team productivity increase', 'Scaled to 50 employees'],
      year: '2024',
      packageUsed: 'Operations + Scalability'
    },
    {
      id: 'cs-007',
      company: 'RetailGenius AI',
      industry: 'Retail Analytics',
      challenge: 'Raised $3M but struggling to show traction, investors requesting clear metrics.',
      results: ['Series B readiness achieved', '$25M raised at 4x valuation', 'Investor confidence restored'],
      year: '2024',
      packageUsed: 'Fundraising Readiness'
    },
    {
      id: 'cs-008',
      company: 'CloudSecure Pro',
      industry: 'Cybersecurity',
      challenge: 'Aggressive expansion into 5 countries simultaneously leading to operational breakdown.',
      results: ['Focused on 2 core markets', '400% efficiency gains', '$50M ARR milestone reached'],
      year: '2023',
      packageUsed: 'Scale + Expansion Strategy'
    },
    {
      id: 'cs-009',
      company: 'FoodTech Ventures',
      industry: 'Food Technology',
      challenge: 'Idea stage with 3 competing concepts, unclear which to pursue, limited capital.',
      results: ['Validated winner idea in 8 weeks', 'Secured $1.5M pre-seed', 'First 1000 users in 6 months'],
      year: '2024',
      packageUsed: 'Idea-to-Validation'
    },
    {
      id: 'cs-010',
      company: 'MobilityNext',
      industry: 'Transportation Tech',
      challenge: 'Cash runway down to 60 days, emergency cost cutting needed without killing growth.',
      results: ['Runway extended to 12 months', 'Profitable in month 8', 'Team retained at 95%'],
      year: '2023',
      packageUsed: 'Turnaround + Stabilization'
    },
    {
      id: 'cs-011',
      company: 'PropTech Innovations',
      industry: 'Real Estate Technology',
      challenge: 'B2B sales motion unclear, 18-month sales cycles killing cash flow.',
      results: ['Sales cycle reduced to 4 months', 'Pipeline value 10x increase', '$8M in signed contracts'],
      year: '2024',
      packageUsed: 'GTM Strategy + Sales'
    },
    {
      id: 'cs-012',
      company: 'AgriTech Solutions',
      industry: 'Agriculture Technology',
      challenge: 'Complex product serving multiple customer segments, unclear focus and positioning.',
      results: ['Focused on single ICP', 'NPS increased from 35 to 78', '$5M Series A raised'],
      year: '2024',
      packageUsed: 'Diagnostic + PMF Clarity'
    },
    {
      id: 'cs-013',
      company: 'FinPlan Pro',
      industry: 'Financial Planning SaaS',
      challenge: 'Strong product but zero marketing capabilities, relying only on word-of-mouth.',
      results: ['Built 5-channel GTM engine', 'MQL volume up 25x', 'CAC payback in 6 months'],
      year: '2023',
      packageUsed: 'GTM Strategy'
    },
    {
      id: 'cs-014',
      company: 'TalentMatch AI',
      industry: 'HR Technology',
      challenge: 'Operational inefficiencies causing 40% gross margin despite strong revenue.',
      results: ['Margins improved to 78%', 'Unit economics optimized', 'Profitable in Q3'],
      year: '2024',
      packageUsed: 'Operations + Efficiency'
    },
    {
      id: 'cs-015',
      company: 'ContentCreator Hub',
      industry: 'Creator Economy',
      challenge: 'Freemium model not converting, 95% users staying on free tier indefinitely.',
      results: ['Conversion to paid 18%', 'ARPU increased 4x', '$3M ARR achieved'],
      year: '2024',
      packageUsed: 'Monetization + GTM'
    },
    {
      id: 'cs-016',
      company: 'LegalTech Partners',
      industry: 'Legal Technology',
      challenge: 'Enterprise sales requiring complete restructuring of sales approach and team.',
      results: ['First enterprise deal in 90 days', 'ACV increased from $15K to $250K', 'Sales team built'],
      year: '2023',
      packageUsed: 'GTM Strategy + Scaling'
    },
    {
      id: 'cs-017',
      company: 'ClimateData Analytics',
      industry: 'Climate Tech',
      challenge: 'Mission-driven but unclear business model, struggling between impact and revenue.',
      results: ['B2B SaaS model defined', 'First paying customers', '$2M seed raised'],
      year: '2024',
      packageUsed: 'Business Diagnostic + Strategy'
    },
    {
      id: 'cs-018',
      company: 'SocialCommerce Pro',
      industry: 'Social Commerce',
      challenge: 'Viral growth but no monetization strategy, burning cash rapidly.',
      results: ['Monetization model launched', 'Positive unit economics', '$10M GMV in year one'],
      year: '2024',
      packageUsed: 'Business Model + GTM'
    },
    {
      id: 'cs-019',
      company: 'DevTools Startup',
      industry: 'Developer Tools',
      challenge: 'Developer adoption strong but enterprise sales non-existent.',
      results: ['Bottom-up + top-down strategy', 'Enterprise pipeline $5M', 'Team expanded to 25'],
      year: '2023',
      packageUsed: 'GTM Strategy + Expansion'
    },
    {
      id: 'cs-020',
      company: 'InsurTech Disruptor',
      industry: 'Insurance Technology',
      challenge: 'Regulatory challenges blocking expansion, unclear path to profitability.',
      results: ['Regulatory approval secured', 'Expansion to 3 states', '$20M revenue run rate'],
      year: '2024',
      packageUsed: 'Scale + Expansion'
    },
    // Additional 30 case studies for infinite scroll
    {
      id: 'cs-021',
      company: 'SportsTech Analytics',
      industry: 'Sports Technology',
      challenge: 'Seasonal revenue patterns creating cash flow problems.',
      results: ['Diversified revenue streams', 'Cash flow stabilized', '$7M ARR'],
      year: '2024',
      packageUsed: 'Operations + Financial Planning'
    },
    {
      id: 'cs-022',
      company: 'AutoTech Solutions',
      industry: 'Automotive Technology',
      challenge: 'Hardware + software complexity leading to margin compression.',
      results: ['Margins improved 45%', 'Manufacturing optimized', '$15M raised'],
      year: '2023',
      packageUsed: 'Operations + Fundraising'
    },
    {
      id: 'cs-023',
      company: 'BeautyTech Platform',
      industry: 'Beauty & Cosmetics Tech',
      challenge: 'D2C model struggling against established brands.',
      results: ['B2B pivot successful', '200+ salon partnerships', '$5M ARR'],
      year: '2024',
      packageUsed: 'PMF Clarity + GTM'
    },
    {
      id: 'cs-024',
      company: 'PetCare Innovations',
      industry: 'Pet Technology',
      challenge: 'Product roadmap bloated, trying to be everything to everyone.',
      results: ['Focused product suite', 'Customer satisfaction 92%', '$8M Series A'],
      year: '2024',
      packageUsed: 'Product Strategy + PMF'
    },
    {
      id: 'cs-025',
      company: 'TravelTech Startup',
      industry: 'Travel Technology',
      challenge: 'Post-COVID recovery uncertain, pivot or persist decision needed.',
      results: ['Successful pivot to corporate travel', '$12M ARR', 'Profitability achieved'],
      year: '2023',
      packageUsed: 'Turnaround + Strategy'
    },
    {
      id: 'cs-026',
      company: 'FashionTech Hub',
      industry: 'Fashion Technology',
      challenge: 'Marketplace model with chicken-egg problem, supply vs demand.',
      results: ['Supply-side strategy executed', '500+ brands onboarded', '$3M GMV monthly'],
      year: '2024',
      packageUsed: 'GTM Strategy + Growth'
    },
    {
      id: 'cs-027',
      company: 'EnergyTech Solutions',
      industry: 'Energy Technology',
      challenge: 'Long implementation cycles creating capital intensity issues.',
      results: ['SaaS model introduced', 'Implementation time 70% reduction', '$10M ARR'],
      year: '2024',
      packageUsed: 'Business Model + Operations'
    },
    {
      id: 'cs-028',
      company: 'MusicTech Platform',
      industry: 'Music Technology',
      challenge: 'Artist acquisition cost too high, LTV:CAC ratio at 1.2:1.',
      results: ['LTV:CAC improved to 5:1', 'Viral growth mechanisms', '$6M ARR'],
      year: '2023',
      packageUsed: 'GTM Strategy + Growth'
    },
    {
      id: 'cs-029',
      company: 'GamingTech Studio',
      industry: 'Gaming Technology',
      challenge: 'Hit-driven model creating revenue unpredictability.',
      results: ['Portfolio approach implemented', 'Revenue stabilized', '$25M valuation'],
      year: '2024',
      packageUsed: 'Strategy + Fundraising'
    },
    {
      id: 'cs-030',
      company: 'MedTech Diagnostics',
      industry: 'Medical Technology',
      challenge: 'Clinical validation delaying commercialization by 18 months.',
      results: ['Accelerated validation path', 'FDA approval secured', '$20M Series B'],
      year: '2024',
      packageUsed: 'Strategy + Fundraising'
    },
    {
      id: 'cs-031',
      company: 'DataStack Analytics',
      industry: 'Data Analytics',
      challenge: 'Complex pricing model confusing customers, conversion rate 3%.',
      results: ['Simplified pricing structure', 'Conversion rate 22%', '$4M ARR'],
      year: '2023',
      packageUsed: 'GTM Strategy + Pricing'
    },
    {
      id: 'cs-032',
      company: 'VideoTech Streaming',
      industry: 'Video Technology',
      challenge: 'Infrastructure costs eating 80% of revenue.',
      results: ['Cost optimization achieved', 'Margins improved to 60%', 'Series A raised'],
      year: '2024',
      packageUsed: 'Operations + Efficiency'
    },
    {
      id: 'cs-033',
      company: 'VoiceTech AI',
      industry: 'Voice Technology',
      challenge: 'Technology ahead of market, unclear target customer.',
      results: ['ICP identified and validated', 'First 50 paying customers', '$2M ARR'],
      year: '2024',
      packageUsed: 'PMF Clarity + GTM'
    },
    {
      id: 'cs-034',
      company: 'BlockchainBridge',
      industry: 'Blockchain',
      challenge: 'Crypto winter creating existential threat to business.',
      results: ['Enterprise pivot successful', 'Web3 infrastructure revenue', '$8M ARR'],
      year: '2023',
      packageUsed: 'Turnaround + Strategy'
    },
    {
      id: 'cs-035',
      company: 'AIAssist Platform',
      industry: 'Artificial Intelligence',
      challenge: 'Horizontal AI tool competing with specialized solutions.',
      results: ['Vertical focus strategy', 'Market leadership in niche', '$15M Series A'],
      year: '2024',
      packageUsed: 'Strategy + GTM'
    },
    {
      id: 'cs-036',
      company: 'CyberShield Security',
      industry: 'Cybersecurity',
      challenge: 'Sales team unable to close enterprise deals despite strong pipeline.',
      results: ['Sales enablement program', 'Win rate 45% to 72%', '$30M ARR'],
      year: '2024',
      packageUsed: 'GTM Strategy + Sales'
    },
    {
      id: 'cs-037',
      company: 'CloudInfra Pro',
      industry: 'Cloud Infrastructure',
      challenge: 'Competing with AWS/Azure/GCP, unclear differentiation.',
      results: ['Niche positioning defined', 'Customer acquisition 10x', '$12M ARR'],
      year: '2023',
      packageUsed: 'Strategy + GTM'
    },
    {
      id: 'cs-038',
      company: 'MarketingAutomation Hub',
      industry: 'MarTech',
      challenge: 'Feature parity race with incumbents draining resources.',
      results: ['Focused product strategy', 'Unique value prop established', '$18M Series B'],
      year: '2024',
      packageUsed: 'Product Strategy + Fundraising'
    },
    {
      id: 'cs-039',
      company: 'HRTech Evolution',
      industry: 'HR Technology',
      challenge: 'Freemium users not upgrading, paid features unclear value.',
      results: ['Value ladder redesigned', 'Upgrade rate 25%', '$7M ARR'],
      year: '2024',
      packageUsed: 'Monetization + GTM'
    },
    {
      id: 'cs-040',
      company: 'SalesTech Accelerator',
      industry: 'Sales Technology',
      challenge: 'Product complexity creating onboarding friction.',
      results: ['Time-to-value reduced 80%', 'Activation rate 65%', '$10M ARR'],
      year: '2023',
      packageUsed: 'Product + Operations'
    },
    {
      id: 'cs-041',
      company: 'AnalyticsPro Suite',
      industry: 'Business Analytics',
      challenge: 'Founder dependency preventing scale beyond $5M ARR.',
      results: ['Management team built', 'Founder focus on strategy', '$25M ARR'],
      year: '2024',
      packageUsed: 'Operations + Scalability'
    },
    {
      id: 'cs-042',
      company: 'eCommerce Accelerator',
      industry: 'eCommerce Technology',
      challenge: 'Merchant churn at 50% annually destroying unit economics.',
      results: ['Churn reduced to 15%', 'LTV tripled', '$20M ARR'],
      year: '2024',
      packageUsed: 'PMF + Retention Strategy'
    },
    {
      id: 'cs-043',
      company: 'SupplyChain Optimizer',
      industry: 'Supply Chain',
      challenge: 'Implementation requiring 12-month enterprise sales cycles.',
      results: ['Quick-start offering launched', 'Sales cycle 4 months', '$15M ARR'],
      year: '2023',
      packageUsed: 'GTM + Product Strategy'
    },
    {
      id: 'cs-044',
      company: 'CustomerSuccess Platform',
      industry: 'Customer Success Tech',
      challenge: 'Competing against feature-rich incumbents as early-stage startup.',
      results: ['Wedge strategy executed', 'Market share captured', '$8M Series A'],
      year: '2024',
      packageUsed: 'Strategy + GTM'
    },
    {
      id: 'cs-045',
      company: 'DesignTech Studio',
      industry: 'Design Technology',
      challenge: 'Services + product model creating operational complexity.',
      results: ['Business model clarified', 'SaaS-first strategy', '$5M ARR'],
      year: '2024',
      packageUsed: 'Business Model + Operations'
    },
    {
      id: 'cs-046',
      company: 'CollaborationHub Pro',
      industry: 'Collaboration Software',
      challenge: 'Network effects not materializing despite user growth.',
      results: ['Engagement loops redesigned', 'MAU retention 85%', '$12M ARR'],
      year: '2023',
      packageUsed: 'Product Strategy + Growth'
    },
    {
      id: 'cs-047',
      company: 'ProjectManagement Suite',
      industry: 'Project Management',
      challenge: 'Mid-market positioning leading to lose-lose pricing wars.',
      results: ['Enterprise repositioning', 'ACV increased 5x', '$18M ARR'],
      year: '2024',
      packageUsed: 'Strategy + GTM'
    },
    {
      id: 'cs-048',
      company: 'DocumentWorkflow AI',
      industry: 'Document Management',
      challenge: 'Horizontal tool struggling for adoption across use cases.',
      results: ['Legal vertical focus', 'Category creation', '$10M Series A'],
      year: '2024',
      packageUsed: 'Strategy + PMF'
    },
    {
      id: 'cs-049',
      company: 'IntegrationPlatform Hub',
      industry: 'Integration Software',
      challenge: 'Developer-led growth hitting ceiling at $8M ARR.',
      results: ['Top-down sales motion added', 'Growth accelerated', '$25M ARR'],
      year: '2023',
      packageUsed: 'GTM + Sales Strategy'
    },
    {
      id: 'cs-050',
      company: 'ComplianceTech Solutions',
      industry: 'Compliance Software',
      challenge: 'Regulatory changes creating product roadmap chaos.',
      results: ['Agile compliance framework', 'Customer trust restored', '$15M Series B'],
      year: '2024',
      packageUsed: 'Product + Operations'
    }
  ];

  // Load initial case studies
  useEffect(() => {
    setDisplayedCaseStudies(allCaseStudies.slice(0, 9));
  }, []);

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreCaseStudies();
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
  }, [displayedCaseStudies, hasMore]);

  const loadMoreCaseStudies = () => {
    const currentLength = displayedCaseStudies.length;
    const nextCaseStudies = allCaseStudies.slice(currentLength, currentLength + 9);
    
    if (nextCaseStudies.length > 0) {
      setTimeout(() => {
        setDisplayedCaseStudies([...displayedCaseStudies, ...nextCaseStudies]);
        setPage(page + 1);
      }, 500);
    }

    if (currentLength + nextCaseStudies.length >= allCaseStudies.length) {
      setHasMore(false);
    }
  };

  const handleCaseStudyClick = (study: CaseStudy) => {
    setSelectedCaseStudy(study);
    setShowAuthModal(true);
  };

  const handleAuthenticate = (partnerId: string, password: string) => {
    // Store authentication in session
    sessionStorage.setItem('partnerAuth', 'true');
    sessionStorage.setItem('partnerId', partnerId);
    
    // Redirect to actual case study page (you'll need to create these)
    window.location.href = `/case-studies/${selectedCaseStudy?.id}`;
  };

  return (
    <main className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="bg-[#0A1E3D] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-blue-600/20 rounded-full text-blue-400 text-xs font-medium mb-6">
            CLIENT SUCCESS STORIES
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
            Proven Results Across<br/>
            <span className="text-blue-300">50+ Transformations</span>
          </h1>
          <p className="text-xl text-blue-200 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
            Real founders. Real challenges. Measurable outcomes. Browse our portfolio of strategic engagements that delivered breakthrough results.
          </p>
          <div className="flex items-center justify-center gap-6 text-blue-200">
            <div className="text-center">
              <div className="text-3xl font-light text-white mb-1">50+</div>
              <div className="text-sm">Case Studies</div>
            </div>
            <div className="w-px h-12 bg-blue-600"></div>
            <div className="text-center">
              <div className="text-3xl font-light text-white mb-1">$500M+</div>
              <div className="text-sm">Value Created</div>
            </div>
            <div className="w-px h-12 bg-blue-600"></div>
            <div className="text-center">
              <div className="text-3xl font-light text-white mb-1">15+</div>
              <div className="text-sm">Industries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      <section className="bg-blue-50 border-b border-blue-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-sm text-gray-700">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p>
              <strong>Partner Access Required:</strong> Detailed case studies are available to verified partners only. 
              <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium ml-2">
                Request Access
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid with Infinite Scroll */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCaseStudies.map((study) => (
              <CaseStudyCard
                key={study.id}
                study={study}
                onClick={() => handleCaseStudyClick(study)}
              />
            ))}
          </div>

          {/* Loading Indicator */}
          {hasMore && (
            <div ref={observerTarget} className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading more case studies...</p>
              </div>
            </div>
          )}

          {/* End Message */}
          {!hasMore && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You've viewed all {allCaseStudies.length} case studies</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
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

      {/* CTA Section */}
      <section className="bg-[#0A1E3D] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-light text-white mb-6">
            Ready to Write Your<br/>
            <span className="text-blue-300">Success Story?</span>
          </h2>
          <p className="text-blue-200 text-xl mb-10 max-w-2xl mx-auto">
            Join 50+ founders who transformed their businesses with our strategic consulting packages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium shadow-lg"
            >
              <span>Start Your Transformation</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center border-2 border-blue-500 text-blue-300 px-8 py-4 rounded-lg hover:bg-blue-500/10 transition-all duration-300 font-medium"
            >
              <span>View All Packages</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        caseStudyTitle={selectedCaseStudy?.company || ''}
        onAuthenticate={handleAuthenticate}
      />

    </main>
  );
}