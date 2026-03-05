// app/reports/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// =====================================================
// REPORTS & RESEARCH HUB PAGE
// Features:
// - Infinite scrolling to show 36 reports
// - Click on any report opens authentication modal
// - Requires Partner ID + Password to access
// - Shows we have extensive research without revealing content
// =====================================================

// =====================================================
// AUTHENTICATION MODAL
// =====================================================
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle: string;
  onAuthenticate: (partnerId: string, password: string) => void;
}

function AuthenticationModal({ isOpen, onClose, reportTitle, onAuthenticate }: AuthModalProps) {
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
    // For demo: partnerId = "partner123", password = "reports2024"
    if (partnerId === 'partner123' && password === 'reports2024') {
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
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-light text-gray-800 text-center mb-2">
            Partner Access Required
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your credentials to access: <strong>{reportTitle}</strong>
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-medium shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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
                  Access Report
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
              <Link href="/contact" className="text-green-600 hover:text-green-700 font-medium">
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
// REPORT CARD
// =====================================================
interface Report {
  id: string;
  title: string;
  category: string;
  description: string;
  keyFindings: string[];
  publicationDate: string;
  pages: number;
  researchType: 'Primary' | 'Secondary' | 'Mixed Methods';
}

function ReportCard({ report, onClick }: { report: Report; onClick: () => void }) {
  const getResearchTypeColor = (type: string) => {
    switch (type) {
      case 'Primary': return 'bg-blue-100 text-blue-700';
      case 'Secondary': return 'bg-orange-100 text-orange-700';
      case 'Mixed Methods': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 hover:border-green-300"
    >
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <div className="relative z-10 text-center">
          <svg className="w-16 h-16 text-white/80 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-white font-medium text-lg">{report.title}</p>
          <p className="text-green-200 text-sm">{report.category}</p>
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
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${getResearchTypeColor(report.researchType)}`}>
            {report.researchType}
          </span>
          <span className="text-xs text-gray-500">{report.pages} pages</span>
        </div>

        <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
          {report.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {report.description}
        </p>

        {/* Key Findings Preview */}
        <div className="space-y-2 mb-4">
          {report.keyFindings.slice(0, 2).map((finding, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
              <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="line-clamp-1">{finding}</span>
            </div>
          ))}
        </div>

        {/* Publication Info */}
        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-500">Published: {report.publicationDate}</span>
          <svg className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// MAIN REPORTS & RESEARCH HUB PAGE
// With Infinite Scrolling
// =====================================================
export default function ReportsPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [displayedReports, setDisplayedReports] = useState<Report[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerTarget = useRef(null);

  // ALL REPORTS DATA (36 precise reports)
  const allReports: Report[] = [
    {
      id: 'report-001',
      title: 'The State of SaaS 2024',
      category: 'Technology',
      description: 'Comprehensive analysis of SaaS industry trends, growth metrics, and investment patterns for 2024.',
      keyFindings: ['Average SaaS valuation multiples down 35%', 'Profitability prioritized over growth', 'AI integration becoming table stakes'],
      publicationDate: 'Jan 2024',
      pages: 85,
      researchType: 'Primary'
    },
    {
      id: 'report-002',
      title: 'AI in Enterprise: Adoption & ROI',
      category: 'Artificial Intelligence',
      description: 'Enterprise AI adoption rates, implementation challenges, and measurable ROI across industries.',
      keyFindings: ['67% of enterprises have AI pilots', 'Average ROI 3.2x within 12 months', 'Data quality is primary barrier'],
      publicationDate: 'Feb 2024',
      pages: 72,
      researchType: 'Mixed Methods'
    },
    {
      id: 'report-003',
      title: 'Consumer Spending Shift Report',
      category: 'Economics',
      description: 'Analysis of post-pandemic consumer behavior changes and spending pattern evolution.',
      keyFindings: ['Experience spending up 42%', 'Subscription fatigue setting in', 'Value-conscious luxury emerging'],
      publicationDate: 'Mar 2024',
      pages: 68,
      researchType: 'Secondary'
    },
    {
      id: 'report-004',
      title: 'Remote Work Productivity Study',
      category: 'Workplace',
      description: 'Longitudinal study on remote work productivity, collaboration patterns, and team dynamics.',
      keyFindings: ['Asynchronous work increases output 28%', 'Hybrid models outperform fully remote', 'Documentation quality critical'],
      publicationDate: 'Dec 2023',
      pages: 56,
      researchType: 'Primary'
    },
    {
      id: 'report-005',
      title: 'Climate Tech Investment Trends',
      category: 'Sustainability',
      description: 'Analysis of venture capital flowing into climate technology and emerging green sectors.',
      keyFindings: ['Climate tech funding up 240% since 2020', 'Carbon capture most funded sector', 'Policy driving 60% of investments'],
      publicationDate: 'Jan 2024',
      pages: 91,
      researchType: 'Mixed Methods'
    },
    {
      id: 'report-006',
      title: 'Healthcare Innovation Index',
      category: 'Healthcare',
      description: 'Comprehensive index tracking innovation adoption in healthcare across digital health, biotech, and services.',
      keyFindings: ['Telehealth adoption stabilized at 35%', 'AI diagnostics accuracy matches specialists', 'Regulatory barriers slowing adoption'],
      publicationDate: 'Feb 2024',
      pages: 77,
      researchType: 'Secondary'
    },
    {
      id: 'report-007',
      title: 'Fintech Regulatory Landscape',
      category: 'Finance',
      description: 'Global regulatory framework analysis for fintech including crypto, payments, and digital banking.',
      keyFindings: ['EU leading in digital asset regulation', 'US regulatory fragmentation increasing', 'Asia adopting sandbox approach'],
      publicationDate: 'Mar 2024',
      pages: 83,
      researchType: 'Primary'
    },
    {
      id: 'report-008',
      title: 'E-commerce Personalization ROI',
      category: 'Retail',
      description: 'Study on personalization implementation costs versus revenue impact in e-commerce.',
      keyFindings: ['Personalization increases AOV by 28%', 'AI-driven recommendations outperform rules-based', 'Privacy concerns reducing opt-in rates'],
      publicationDate: 'Jan 2024',
      pages: 62,
      researchType: 'Mixed Methods'
    },
    {
      id: 'report-009',
      title: 'Supply Chain Resilience Report',
      category: 'Operations',
      description: 'Post-pandemic supply chain adaptations and resilience strategies across manufacturing sectors.',
      keyFindings: ['Nearshoring increased 45%', 'Digital twin adoption up 300%', 'Inventory buffers normalized at 25% higher'],
      publicationDate: 'Nov 2023',
      pages: 74,
      researchType: 'Secondary'
    },
    {
      id: 'report-010',
      title: 'EdTech Market Evolution',
      category: 'Education',
      description: 'Analysis of education technology market shifts post-pandemic and emerging business models.',
      keyFindings: ['Corporate training market growing 18% CAGR', 'Micro-credentials gaining employer recognition', 'Gamification improves retention 40%'],
      publicationDate: 'Feb 2024',
      pages: 59,
      researchType: 'Primary'
    },
    {
      id: 'report-011',
      title: 'Digital Advertising Effectiveness',
      category: 'Marketing',
      description: 'ROI analysis across digital advertising channels including privacy impact measurement.',
      keyFindings: ['CTV advertising ROI highest at 4.2x', 'Privacy changes reduced targeting effectiveness 35%', 'Contextual targeting resurgence'],
      publicationDate: 'Mar 2024',
      pages: 66,
      researchType: 'Mixed Methods'
    },
    {
      id: 'report-012',
      title: 'Cybersecurity Spend Analysis',
      category: 'Security',
      description: 'Enterprise cybersecurity spending patterns and effectiveness metrics across threat categories.',
      keyFindings: ['AI security tools reduce breach detection time 80%', 'Zero trust adoption at 45% of enterprises', 'Ransomware payments down 60%'],
      publicationDate: 'Jan 2024',
      pages: 71,
      researchType: 'Secondary'
    },
    {
      id: 'report-013',
      title: 'Metaverse Business Applications',
      category: 'Emerging Tech',
      description: 'Practical business applications of metaverse technologies beyond consumer entertainment.',
      keyFindings: ['Industrial training most viable use case', 'AR outperforms VR in enterprise adoption', 'ROI timelines averaging 3-5 years'],
      publicationDate: 'Dec 2023',
      pages: 63,
      researchType: 'Primary'
    },
    {
      id: 'report-014',
      title: 'Electric Vehicle Infrastructure',
      category: 'Transportation',
      description: 'Analysis of EV charging infrastructure growth and business models across markets.',
      keyFindings: ['Charging as a service growing 65% CAGR', 'Fleet charging underserved market', 'Grid integration becoming critical'],
      publicationDate: 'Feb 2024',
      pages: 78,
      researchType: 'Mixed Methods'
    },
    {
      id: 'report-015',
      title: 'API Economy Impact Study',
      category: 'Technology',
      description: 'Economic impact analysis of API-first business models and integration market growth.',
      keyFindings: ['API-driven companies grow 3x faster', '$125 Billion  API economy by 2026', 'Security concerns main adoption barrier'],
      publicationDate: 'Jan 2024',
      pages: 69,
      researchType: 'Secondary'
    },
    {
      id: 'report-016',
      title: 'Consumer Privacy Preferences',
      category: 'Data',
      description: 'Global study on consumer privacy attitudes and willingness to share data for value.',
      keyFindings: ['72% willing to share data for personalized experiences', 'Privacy as premium emerging trend', 'Generational divide in privacy concerns'],
      publicationDate: 'Mar 2024',
      pages: 55,
      researchType: 'Primary'
    },
    {
      id: 'report-017',
      title: 'Renewable Energy Economics',
      category: 'Energy',
      description: 'Cost competitiveness analysis of renewable energy sources versus traditional fossil fuels.',
      keyFindings: ['Solar LCOE down 85% since 2010', 'Storage costs critical for grid integration', 'Policy subsidies still driving adoption'],
      publicationDate: 'Feb 2024',
      pages: 82,
      researchType: 'Mixed Methods'
    },
    {
      id: 'report-018',
      title: 'Digital Health Adoption Barriers',
      category: 'Healthcare',
      description: 'Study on barriers to digital health adoption among providers and patients.',
      keyFindings: ['Interoperability is primary barrier', 'Provider workflow integration critical', 'Reimbursement models lagging'],
      publicationDate: 'Jan 2024',
      pages: 61,
      researchType: 'Secondary'
    },
    {
      id: 'report-019',
      title: 'Future of Work Skills Gap',
      category: 'Workforce',
      description: 'Analysis of emerging skill requirements and current workforce capability gaps.',
      keyFindings: ['AI literacy gap affects 65% of workforce', 'Critical thinking skills in high demand', 'Reskilling ROI averages 150%'],
      publicationDate: 'Mar 2024',
      pages: 73,
      researchType: 'Primary'
    },
    {
      id: 'report-020',
      title: 'Blockchain Beyond Crypto',
      category: 'Technology',
      description: 'Analysis of blockchain technology applications outside cryptocurrency markets.',
      keyFindings: ['Supply chain transparency leading use case', 'Enterprise adoption slower than expected', 'Interoperability protocols gaining traction'],
      publicationDate: 'Feb 2024',
      pages: 67,
      researchType: 'Mixed Methods'
    },
    // 16 Additional Reports (Total 36)
    {
      id: 'report-021',
      title: 'Marketing Attribution Evolution',
      category: 'Marketing',
      description: 'How marketing attribution models are evolving in cookieless, privacy-first world.',
      keyFindings: ['Multi-touch attribution adoption at 35%', 'AI models improving accuracy 40%', 'ROI measurement gap increasing'],
      publicationDate: 'Jan 2024',
      pages: 58,
      researchType: 'Secondary'
    },
    {
      id: 'report-022',
      title: 'Quantum Computing Readiness',
      category: 'Emerging Tech',
      description: 'Enterprise readiness for quantum computing and practical near-term applications.',
      keyFindings: ['Financial services most prepared sector', 'Encryption migration beginning', '$ 25 Billion market by 2030'],
      publicationDate: 'Mar 2024',
      pages: 76,
      researchType: 'Primary'
    },
    {
      id: 'report-023',
      title: 'Sustainable Packaging Markets',
      category: 'Sustainability',
      description: 'Growth analysis of sustainable packaging solutions and circular economy models.',
      keyFindings: ['Compostable packaging growing 22% CAGR', 'Retailer pressure driving adoption', 'Cost premium narrowing to 15%'],
      publicationDate: 'Feb 2024',
      pages: 64,
      researchType: 'Mixed Methods'
    },
    {
      id: 'report-024',
      title: 'Voice Commerce Adoption',
      category: 'Retail',
      description: 'Consumer adoption of voice-enabled shopping and smart speaker purchasing behavior.',
      keyFindings: ['Voice commerce growing 25% annually', 'Low-value items dominate purchases', 'Privacy concerns limiting growth'],
      publicationDate: 'Jan 2024',
      pages: 53,
      researchType: 'Secondary'
    },
    {
      id: 'report-025',
      title: '5G Business Impact Study',
      category: 'Telecom',
      description: 'Measured business impact of 5G implementation across industry verticals.',
      keyFindings: ['Manufacturing seeing 30% efficiency gains', 'Network slicing enabling new models', 'Enterprise adoption slower than expected'],
      publicationDate: 'Mar 2024',
      pages: 79,
      researchType: 'Primary'
    },
    {
      id: 'report-026',
      title: 'Alternative Protein Markets',
      category: 'Food Tech',
      description: 'Market analysis of plant-based and cultivated meat alternatives growth trajectories.',
      keyFindings: ['Price parity with animal protein by 2027', 'Taste barriers still significant', '$ 140 Billion market by 2030'],
      publicationDate: 'Feb 2024',
      pages: 68,
      researchType: 'Mixed Methods'
    },
    {
      id: 'report-027',
      title: 'Digital Twin Adoption Rates',
      category: 'Industry 4.0',
      description: 'Adoption analysis of digital twin technology across manufacturing and infrastructure.',
      keyFindings: ['Predictive maintenance driving 60% of adoption', 'ROI averaging 3.5x', 'Implementation complexity high'],
      publicationDate: 'Jan 2024',
      pages: 62,
      researchType: 'Secondary'
    },
    {
      id: 'report-028',
      title: 'Creator Economy Metrics',
      category: 'Digital Media',
      description: 'Economic analysis of creator economy platforms, revenue models, and sustainability.',
      keyFindings: ['Top 1% earners capture 80% of revenue', 'Brand partnerships most lucrative', 'Platform dependency concerns growing'],
      publicationDate: 'Mar 2024',
      pages: 57,
      researchType: 'Primary'
    },
    {
      id: 'report-029',
      title: 'Smart City ROI Analysis',
      category: 'Urban Tech',
      description: 'Return on investment analysis of smart city technologies and implementation models.',
      keyFindings: ['Traffic optimization delivers fastest ROI', 'Public-private partnerships most successful', 'Data integration is major challenge'],
      publicationDate: 'Feb 2024',
      pages: 84,
      researchType: 'Mixed Methods'
    },
    {
      id: 'report-030',
      title: 'Low-Code Development Impact',
      category: 'Software',
      description: 'Impact analysis of low-code/no-code platforms on software development and digital transformation.',
      keyFindings: ['Development speed increased 5-10x', 'Shadow IT concerns emerging', 'Professional developers still needed'],
      publicationDate: 'Jan 2024',
      pages: 59,
      researchType: 'Secondary'
    },
    {
      id: 'report-031',
      title: 'Space Economy Opportunities',
      category: 'Aerospace',
      description: 'Commercial space economy analysis including satellite, launch, and space tourism markets.',
      keyFindings: ['Satellite internet leading commercial segment', 'Launch costs down 90% in decade', '$ 1Trillion market by 2040'],
      publicationDate: 'Mar 2024',
      pages: 88,
      researchType: 'Primary'
    },
    {
      id: 'report-032',
      title: 'Employee Monitoring Ethics',
      category: 'Workplace',
      description: 'Study on employee monitoring technologies and ethical implementation frameworks.',
      keyFindings: ['Productivity monitoring increasing 45%', 'Transparency reduces resistance 80%', 'Legal frameworks lagging'],
      publicationDate: 'Feb 2024',
      pages: 65,
      researchType: 'Mixed Methods'
    },
    {
      id: 'report-033',
      title: 'Biometric Payment Adoption',
      category: 'Fintech',
      description: 'Consumer adoption and security analysis of biometric payment technologies.',
      keyFindings: ['Facial recognition payments growing fastest', 'Security concerns slowing adoption', 'Asia leading adoption at 35%'],
      publicationDate: 'Jan 2024',
      pages: 56,
      researchType: 'Secondary'
    },
    {
      id: 'report-034',
      title: 'Carbon Accounting Standards',
      category: 'ESG',
      description: 'Analysis of emerging carbon accounting standards and measurement methodologies.',
      keyFindings: ['Scope 3 emissions hardest to measure', 'Software solutions growing 40% CAGR', 'Regulatory pressure driving adoption'],
      publicationDate: 'Mar 2024',
      pages: 72,
      researchType: 'Primary'
    },
    {
      id: 'report-035',
      title: 'Drone Delivery Economics',
      category: 'Logistics',
      description: 'Economic feasibility analysis of drone delivery systems across urban and rural markets.',
      keyFindings: ['Rural delivery most economically viable', 'Regulatory approval major bottleneck', 'Cost per delivery target $2'],
      publicationDate: 'Feb 2024',
      pages: 63,
      researchType: 'Mixed Methods'
    },
    {
      id: 'report-036',
      title: 'Neurotechnology Applications',
      category: 'Health Tech',
      description: 'Analysis of neurotechnology applications in healthcare, wellness, and human enhancement.',
      keyFindings: ['Mental health applications most advanced', 'Consumer wearables accuracy improving', 'Ethical concerns significant'],
      publicationDate: 'Jan 2024',
      pages: 74,
      researchType: 'Secondary'
    }
  ];

  // Load initial reports
  useEffect(() => {
    setDisplayedReports(allReports.slice(0, 9));
  }, []);

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreReports();
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
  }, [displayedReports, hasMore]);

  const loadMoreReports = () => {
    const currentLength = displayedReports.length;
    const nextReports = allReports.slice(currentLength, currentLength + 9);
    
    if (nextReports.length > 0) {
      setTimeout(() => {
        setDisplayedReports([...displayedReports, ...nextReports]);
        setPage(page + 1);
      }, 500);
    }

    if (currentLength + nextReports.length >= allReports.length) {
      setHasMore(false);
    }
  };

  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
    setShowAuthModal(true);
  };

  const handleAuthenticate = (partnerId: string, password: string) => {
    // Store authentication in session
    sessionStorage.setItem('partnerAuth', 'true');
    sessionStorage.setItem('partnerId', partnerId);
    
    // Redirect to actual report page
    window.location.href = `/reports/${selectedReport?.id}`;
  };

  return (
    <main className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="bg-[#0A2E1A] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-green-600/20 rounded-full text-green-400 text-xs font-medium mb-6">
            RESEARCH INSIGHTS
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
            Data-Driven Intelligence &<br/>
            <span className="text-green-300">Market Analysis</span>
          </h1>
          <p className="text-xl text-green-200 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
            Access 36 proprietary research reports with deep market insights, trend analysis, and strategic intelligence. Make informed decisions with validated data.
          </p>
          <div className="flex items-center justify-center gap-6 text-green-200">
            <div className="text-center">
              <div className="text-3xl font-light text-white mb-1">36</div>
              <div className="text-sm">Research Reports</div>
            </div>
            <div className="w-px h-12 bg-green-600"></div>
            <div className="text-center">
              <div className="text-3xl font-light text-white mb-1">12</div>
              <div className="text-sm">Industry Categories</div>
            </div>
            <div className="w-px h-12 bg-green-600"></div>
            <div className="text-center">
              <div className="text-3xl font-light text-white mb-1">2500+</div>
              <div className="text-sm">Data Points Analyzed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      <section className="bg-green-50 border-b border-green-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-sm text-gray-700">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p>
              <strong>Partner Access Required:</strong> All research reports require partner verification. 
              <Link href="/contact" className="text-green-600 hover:text-green-700 font-medium ml-2">
                Request Access
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Reports Grid with Infinite Scroll */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onClick={() => handleReportClick(report)}
              />
            ))}
          </div>

          {/* Loading Indicator */}
          {hasMore && (
            <div ref={observerTarget} className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading more reports...</p>
              </div>
            </div>
          )}

          {/* End Message */}
          {!hasMore && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You've viewed all {allReports.length} research reports</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
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

      {/* Research Categories Overview */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-gray-900 text-center mb-12">
            Comprehensive Research Coverage
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'Technology & SaaS',
              'Artificial Intelligence',
              'Healthcare Innovation',
              'Fintech & Digital Finance',
              'Sustainability & ESG',
              'Retail & E-commerce',
              'Workplace & HR Tech',
              'Emerging Technologies',
              'Marketing & Advertising',
              'Supply Chain & Logistics',
              'Energy & Cleantech',
              'Education Technology'
            ].map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* CTA Section */}
      <section className="bg-[#0A2E1A] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-light text-white mb-6">
            Make Decisions with<br/>
            <span className="text-green-300">Data-Driven Confidence</span>
          </h2>
          <p className="text-green-200 text-xl mb-10 max-w-2xl mx-auto">
            Join partners who leverage our research to identify opportunities, mitigate risks, and stay ahead of market trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-green-900 px-8 py-4 rounded-lg hover:bg-green-50 transition-all duration-300 font-medium shadow-lg"
            >
              <span>Get Partner Access</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center border-2 border-green-500 text-green-300 px-8 py-4 rounded-lg hover:bg-green-500/10 transition-all duration-300 font-medium"
            >
              <span>View Case Studies</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        reportTitle={selectedReport?.title || ''}
        onAuthenticate={handleAuthenticate}
      />

    </main>
  );
}