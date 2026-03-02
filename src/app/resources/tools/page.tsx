// app/tools/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// =====================================================
// TOOLS HUB PAGE
// Features:
// - Infinite scrolling to show many tools
// - Click on any tool opens authentication modal
// - Requires Partner ID + Password to access
// - Shows we have many tools without revealing content
// =====================================================

// =====================================================
// AUTHENTICATION MODAL
// =====================================================
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  onAuthenticate: (partnerId: string, password: string) => void;
}

function AuthenticationModal({ isOpen, onClose, toolName, onAuthenticate }: AuthModalProps) {
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
    // For demo: partnerId = "partner123", password = "tools2024"
    if (partnerId === 'partner123' && password === 'tools2024') {
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
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-light text-gray-800 text-center mb-2">
            Partner Access Required
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your credentials to access: <strong>{toolName}</strong>
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-lg font-medium shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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
                  Access Tool
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
              <Link href="/contact" className="text-purple-600 hover:text-purple-700 font-medium">
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
// TOOL CARD
// =====================================================
interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  usage: string;
  lastUpdated: string;
  complexity: 'Basic' | 'Intermediate' | 'Advanced';
}

function ToolCard({ tool, onClick }: { tool: Tool; onClick: () => void }) {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Basic': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 hover:border-purple-300"
    >
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-purple-900 to-purple-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <div className="relative z-10 text-center">
          <svg className="w-16 h-16 text-white/80 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-white font-medium text-lg">{tool.name}</p>
          <p className="text-purple-200 text-sm">{tool.category}</p>
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
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${getComplexityColor(tool.complexity)}`}>
            {tool.complexity}
          </span>
          <span className="text-xs text-gray-500">Updated: {tool.lastUpdated}</span>
        </div>

        <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
          {tool.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tool.description}
        </p>

        {/* Features Preview */}
        <div className="space-y-2 mb-4">
          {tool.features.slice(0, 2).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
              <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="line-clamp-1">{feature}</span>
            </div>
          ))}
        </div>

        {/* Usage */}
        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-500">{tool.usage}</span>
          <svg className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// MAIN TOOLS HUB PAGE
// With Infinite Scrolling
// =====================================================
export default function ToolsPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [displayedTools, setDisplayedTools] = useState<Tool[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerTarget = useRef(null);

  // ALL TOOLS DATA (50+ tools for demonstration)
  const allTools: Tool[] = [
    {
      id: 'tool-001',
      name: 'PMF Validation Framework',
      category: 'Product Strategy',
      description: 'Comprehensive framework to validate Product-Market Fit across multiple dimensions with quantitative scoring.',
      features: ['NPS Analysis', 'Retention Metrics', 'Growth Loops', 'Customer Interviews'],
      usage: 'Use for early-stage startups to validate market need',
      lastUpdated: 'Jan 2024',
      complexity: 'Advanced'
    },
    {
      id: 'tool-002',
      name: 'GTM Strategy Builder',
      category: 'Go-to-Market',
      description: 'Step-by-step framework to build, test, and scale your go-to-market strategy.',
      features: ['ICP Definition', 'Channel Strategy', 'Sales Motion', 'Pricing Model'],
      usage: 'Use when launching new products or entering new markets',
      lastUpdated: 'Feb 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-003',
      name: 'Unit Economics Calculator',
      category: 'Finance & Metrics',
      description: 'Dynamic calculator to model and optimize your business unit economics.',
      features: ['CAC Calculation', 'LTV Modeling', 'Payback Period', 'Cohort Analysis'],
      usage: 'Use for financial planning and investor readiness',
      lastUpdated: 'Mar 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-004',
      name: 'Scale-Up Playbook',
      category: 'Operations',
      description: 'Comprehensive playbook for scaling from $1M to $10M+ ARR.',
      features: ['Team Structure', 'Process Automation', 'Metrics Dashboard', 'Growth Levers'],
      usage: 'Use when transitioning from startup to scale-up',
      lastUpdated: 'Dec 2023',
      complexity: 'Advanced'
    },
    {
      id: 'tool-005',
      name: 'Fundraising Tracker',
      category: 'Fundraising',
      description: 'Complete tracker to manage your fundraising process from seed to Series B.',
      features: ['Investor Pipeline', 'Deck Versioning', 'Term Sheet Analysis', 'Timeline Tracking'],
      usage: 'Use during active fundraising rounds',
      lastUpdated: 'Jan 2024',
      complexity: 'Basic'
    },
    {
      id: 'tool-006',
      name: 'Pricing Strategy Toolkit',
      category: 'Monetization',
      description: 'Framework to develop and test pricing strategies for maximum revenue capture.',
      features: ['Value Metric Analysis', 'Competitive Benchmarking', 'Packaging Options', 'A/B Testing'],
      usage: 'Use when designing or optimizing pricing models',
      lastUpdated: 'Feb 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-007',
      name: 'Customer Journey Mapper',
      category: 'UX & Growth',
      description: 'Visual tool to map and optimize the entire customer journey.',
      features: ['Touchpoint Analysis', 'Friction Detection', 'Optimization Points', 'Retention Levers'],
      usage: 'Use to improve conversion rates and customer satisfaction',
      lastUpdated: 'Nov 2023',
      complexity: 'Basic'
    },
    {
      id: 'tool-008',
      name: 'Market Entry Analyzer',
      category: 'Strategy',
      description: 'Framework to analyze and plan market entry strategies for new geographies.',
      features: ['Market Sizing', 'Competition Analysis', 'Localization Strategy', 'Risk Assessment'],
      usage: 'Use when expanding to new markets or regions',
      lastUpdated: 'Jan 2024',
      complexity: 'Advanced'
    },
    {
      id: 'tool-009',
      name: 'Team Performance Dashboard',
      category: 'HR & Operations',
      description: 'Comprehensive dashboard to track and optimize team performance metrics.',
      features: ['OKR Tracking', 'Productivity Metrics', 'Engagement Scores', 'Retention Analytics'],
      usage: 'Use for team management and performance optimization',
      lastUpdated: 'Mar 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-010',
      name: 'Competitive Intelligence Hub',
      category: 'Market Research',
      description: 'Centralized platform to track and analyze competitive landscape.',
      features: ['Competitor Tracking', 'Feature Comparison', 'Market Positioning', 'SWOT Analysis'],
      usage: 'Use for ongoing competitive analysis',
      lastUpdated: 'Feb 2024',
      complexity: 'Basic'
    },
    {
      id: 'tool-011',
      name: 'Conversion Rate Optimizer',
      category: 'Growth',
      description: 'Data-driven framework to systematically improve conversion rates across funnel.',
      features: ['Funnel Analysis', 'A/B Testing Framework', 'CRO Experiments', 'Heatmap Analysis'],
      usage: 'Use to optimize website and app conversion rates',
      lastUpdated: 'Jan 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-012',
      name: 'Content Strategy Planner',
      category: 'Marketing',
      description: 'Complete content strategy framework from ideation to measurement.',
      features: ['Content Calendar', 'SEO Optimization', 'Distribution Strategy', 'ROI Tracking'],
      usage: 'Use for developing and executing content strategies',
      lastUpdated: 'Dec 2023',
      complexity: 'Basic'
    },
    {
      id: 'tool-013',
      name: 'Crisis Management Playbook',
      category: 'Operations',
      description: 'Step-by-step playbook for managing business crises and recovery.',
      features: ['Risk Assessment', 'Response Framework', 'Communication Templates', 'Recovery Planning'],
      usage: 'Use for business continuity planning',
      lastUpdated: 'Mar 2024',
      complexity: 'Advanced'
    },
    {
      id: 'tool-014',
      name: 'M&A Integration Framework',
      category: 'Corporate Development',
      description: 'Comprehensive framework for successful post-merger integration.',
      features: ['Integration Planning', 'Cultural Alignment', 'Synergy Realization', 'Risk Management'],
      usage: 'Use during acquisition integration',
      lastUpdated: 'Jan 2024',
      complexity: 'Advanced'
    },
    {
      id: 'tool-015',
      name: 'Product Roadmap Builder',
      category: 'Product Management',
      description: 'Strategic framework to build and communicate product roadmaps.',
      features: ['Stakeholder Alignment', 'Prioritization Matrix', 'Release Planning', 'Feedback Integration'],
      usage: 'Use for product planning and stakeholder management',
      lastUpdated: 'Feb 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-016',
      name: 'Sales Playbook Generator',
      category: 'Sales',
      description: 'Framework to create and optimize sales playbooks for different customer segments.',
      features: ['ICP Profiles', 'Sales Scripts', 'Objection Handling', 'Competitive Positioning'],
      usage: 'Use for sales team enablement',
      lastUpdated: 'Mar 2024',
      complexity: 'Basic'
    },
    {
      id: 'tool-017',
      name: 'Culture Code Builder',
      category: 'HR & Culture',
      description: 'Framework to define, build, and maintain company culture.',
      features: ['Values Definition', 'Culture Assessment', 'Hiring for Culture', 'Retention Strategies'],
      usage: 'Use for culture building and maintenance',
      lastUpdated: 'Jan 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-018',
      name: 'Board Meeting Planner',
      category: 'Governance',
      description: 'Complete framework for effective board meeting preparation and execution.',
      features: ['Agenda Builder', 'Metrics Dashboard', 'Action Item Tracker', 'Follow-up System'],
      usage: 'Use for board meeting preparation',
      lastUpdated: 'Feb 2024',
      complexity: 'Basic'
    },
    {
      id: 'tool-019',
      name: 'Digital Transformation Roadmap',
      category: 'Technology',
      description: 'Framework to plan and execute digital transformation initiatives.',
      features: ['Current State Analysis', 'Future State Design', 'Implementation Planning', 'Change Management'],
      usage: 'Use for digital transformation projects',
      lastUpdated: 'Mar 2024',
      complexity: 'Advanced'
    },
    {
      id: 'tool-020',
      name: 'Customer Success Framework',
      category: 'Customer Success',
      description: 'Comprehensive framework for building and scaling customer success operations.',
      features: ['Onboarding Optimization', 'Health Scoring', 'Renewal Forecasting', 'Expansion Strategy'],
      usage: 'Use for building customer success teams',
      lastUpdated: 'Jan 2024',
      complexity: 'Intermediate'
    },
    // Additional 30 tools for infinite scroll
    {
      id: 'tool-021',
      name: 'Brand Positioning Matrix',
      category: 'Brand Strategy',
      description: 'Framework to define and test brand positioning in competitive markets.',
      features: ['Positioning Statement', 'Competitive Mapping', 'Audience Testing', 'Messaging Framework'],
      usage: 'Use for brand strategy development',
      lastUpdated: 'Feb 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-022',
      name: 'Agile Transformation Toolkit',
      category: 'Project Management',
      description: 'Complete toolkit for implementing agile methodologies across organizations.',
      features: ['Agile Assessment', 'Transformation Roadmap', 'Team Coaching', 'Metrics Tracking'],
      usage: 'Use for agile transformations',
      lastUpdated: 'Jan 2024',
      complexity: 'Advanced'
    },
    {
      id: 'tool-023',
      name: 'Data Analytics Framework',
      category: 'Analytics',
      description: 'Framework to build data analytics capabilities from scratch.',
      features: ['Data Strategy', 'Metrics Definition', 'Dashboard Design', 'Insight Generation'],
      usage: 'Use for building analytics functions',
      lastUpdated: 'Mar 2024',
      complexity: 'Advanced'
    },
    {
      id: 'tool-024',
      name: 'Partner Ecosystem Builder',
      category: 'Business Development',
      description: 'Framework to build and manage strategic partner ecosystems.',
      features: ['Partner Identification', 'Relationship Management', 'Co-marketing Planning', 'Revenue Sharing'],
      usage: 'Use for partner strategy development',
      lastUpdated: 'Feb 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-025',
      name: 'Innovation Pipeline Manager',
      category: 'Innovation',
      description: 'System to manage innovation from ideation to implementation.',
      features: ['Idea Collection', 'Validation Framework', 'Portfolio Management', 'Commercialization Planning'],
      usage: 'Use for innovation management',
      lastUpdated: 'Jan 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-026',
      name: 'Risk Assessment Matrix',
      category: 'Risk Management',
      description: 'Framework to identify, assess, and mitigate business risks.',
      features: ['Risk Identification', 'Impact Assessment', 'Mitigation Planning', 'Monitoring System'],
      usage: 'Use for risk management planning',
      lastUpdated: 'Mar 2024',
      complexity: 'Basic'
    },
    {
      id: 'tool-027',
      name: 'Sustainability Strategy Builder',
      category: 'ESG',
      description: 'Framework to develop and implement sustainability strategies.',
      features: ['Materiality Assessment', 'Goal Setting', 'Implementation Planning', 'Reporting Framework'],
      usage: 'Use for sustainability strategy development',
      lastUpdated: 'Feb 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-028',
      name: 'Talent Acquisition Playbook',
      category: 'HR',
      description: 'Complete playbook for building high-performing talent acquisition functions.',
      features: ['Sourcing Strategy', 'Interview Process', 'Candidate Experience', 'Onboarding Optimization'],
      usage: 'Use for building recruiting functions',
      lastUpdated: 'Jan 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-029',
      name: 'Digital Marketing ROI Calculator',
      category: 'Marketing',
      description: 'Tool to calculate and optimize digital marketing ROI across channels.',
      features: ['Channel Attribution', 'ROI Calculation', 'Budget Optimization', 'Performance Forecasting'],
      usage: 'Use for marketing budget optimization',
      lastUpdated: 'Mar 2024',
      complexity: 'Basic'
    },
    {
      id: 'tool-030',
      name: 'Supply Chain Optimizer',
      category: 'Operations',
      description: 'Framework to optimize supply chain operations and reduce costs.',
      features: ['Process Mapping', 'Bottleneck Analysis', 'Cost Optimization', 'Risk Mitigation'],
      usage: 'Use for supply chain optimization',
      lastUpdated: 'Feb 2024',
      complexity: 'Advanced'
    },
    {
      id: 'tool-031',
      name: 'Legal Compliance Checker',
      category: 'Legal',
      description: 'Framework to ensure legal compliance across operations.',
      features: ['Compliance Assessment', 'Gap Analysis', 'Remediation Planning', 'Monitoring System'],
      usage: 'Use for legal compliance management',
      lastUpdated: 'Jan 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-032',
      name: 'Remote Work Toolkit',
      category: 'HR & Operations',
      description: 'Complete toolkit for building and managing remote-first organizations.',
      features: ['Remote Policy Builder', 'Collaboration Framework', 'Productivity Tracking', 'Culture Maintenance'],
      usage: 'Use for remote work implementation',
      lastUpdated: 'Mar 2024',
      complexity: 'Basic'
    },
    {
      id: 'tool-033',
      name: 'API Strategy Framework',
      category: 'Technology',
      description: 'Framework to develop and execute API strategies.',
      features: ['API Design', 'Developer Experience', 'Monetization Strategy', 'Ecosystem Building'],
      usage: 'Use for API strategy development',
      lastUpdated: 'Feb 2024',
      complexity: 'Advanced'
    },
    {
      id: 'tool-034',
      name: 'Mentorship Program Builder',
      category: 'HR & Development',
      description: 'Framework to build and scale effective mentorship programs.',
      features: ['Program Design', 'Matching Algorithm', 'Progress Tracking', 'Impact Measurement'],
      usage: 'Use for mentorship program development',
      lastUpdated: 'Jan 2024',
      complexity: 'Basic'
    },
    {
      id: 'tool-035',
      name: 'Exit Planning Framework',
      category: 'Strategy',
      description: 'Comprehensive framework for business exit planning and execution.',
      features: ['Exit Readiness Assessment', 'Valuation Optimization', 'Buyer Identification', 'Transaction Management'],
      usage: 'Use for exit planning',
      lastUpdated: 'Mar 2024',
      complexity: 'Advanced'
    },
    {
      id: 'tool-036',
      name: 'Community Building Playbook',
      category: 'Marketing',
      description: 'Playbook to build and engage online communities.',
      features: ['Community Strategy', 'Engagement Framework', 'Moderation Guidelines', 'Growth Tactics'],
      usage: 'Use for community building',
      lastUpdated: 'Feb 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-037',
      name: 'Influencer Marketing Toolkit',
      category: 'Marketing',
      description: 'Complete toolkit for planning and executing influencer marketing campaigns.',
      features: ['Influencer Identification', 'Campaign Planning', 'Performance Tracking', 'Relationship Management'],
      usage: 'Use for influencer marketing',
      lastUpdated: 'Jan 2024',
      complexity: 'Basic'
    },
    {
      id: 'tool-038',
      name: 'Data Privacy Framework',
      category: 'Legal & Compliance',
      description: 'Framework to ensure data privacy compliance (GDPR, CCPA, etc.).',
      features: ['Data Mapping', 'Compliance Assessment', 'Policy Development', 'Incident Response'],
      usage: 'Use for data privacy compliance',
      lastUpdated: 'Mar 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-039',
      name: 'Performance Marketing Optimizer',
      category: 'Marketing',
      description: 'Framework to optimize performance marketing across channels.',
      features: ['Channel Analysis', 'Bid Optimization', 'Creative Testing', 'ROI Maximization'],
      usage: 'Use for performance marketing optimization',
      lastUpdated: 'Feb 2024',
      complexity: 'Advanced'
    },
    {
      id: 'tool-040',
      name: 'Customer Feedback Analyzer',
      category: 'Product & UX',
      description: 'Tool to collect, analyze, and act on customer feedback.',
      features: ['Feedback Collection', 'Sentiment Analysis', 'Trend Identification', 'Action Planning'],
      usage: 'Use for customer feedback analysis',
      lastUpdated: 'Jan 2024',
      complexity: 'Basic'
    },
    {
      id: 'tool-041',
      name: 'B2B Sales Framework',
      category: 'Sales',
      description: 'Complete framework for B2B sales strategy and execution.',
      features: ['Account Planning', 'Sales Process Design', 'Pipeline Management', 'Forecasting'],
      usage: 'Use for B2B sales strategy',
      lastUpdated: 'Mar 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-042',
      name: 'Mobile App Growth Framework',
      category: 'Growth',
      description: 'Framework to drive growth for mobile applications.',
      features: ['ASO Optimization', 'User Acquisition', 'Retention Strategy', 'Monetization'],
      usage: 'Use for mobile app growth',
      lastUpdated: 'Feb 2024',
      complexity: 'Advanced'
    },
    {
      id: 'tool-043',
      name: 'Event Marketing Planner',
      category: 'Marketing',
      description: 'Complete framework for planning and executing successful events.',
      features: ['Event Strategy', 'Budget Planning', 'Promotion Strategy', 'ROI Measurement'],
      usage: 'Use for event planning',
      lastUpdated: 'Jan 2024',
      complexity: 'Basic'
    },
    {
      id: 'tool-044',
      name: 'Technical Debt Assessment',
      category: 'Technology',
      description: 'Framework to assess and prioritize technical debt reduction.',
      features: ['Debt Identification', 'Impact Analysis', 'Prioritization Matrix', 'Remediation Planning'],
      usage: 'Use for technical debt management',
      lastUpdated: 'Mar 2024',
      complexity: 'Advanced'
    },
    {
      id: 'tool-045',
      name: 'Diversity & Inclusion Framework',
      category: 'HR',
      description: 'Comprehensive framework to build diverse and inclusive organizations.',
      features: ['D&I Assessment', 'Strategy Development', 'Implementation Planning', 'Measurement'],
      usage: 'Use for D&I program development',
      lastUpdated: 'Feb 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-046',
      name: 'Email Marketing Optimizer',
      category: 'Marketing',
      description: 'Framework to optimize email marketing performance.',
      features: ['List Segmentation', 'Content Strategy', 'A/B Testing', 'Automation Flows'],
      usage: 'Use for email marketing optimization',
      lastUpdated: 'Jan 2024',
      complexity: 'Basic'
    },
    {
      id: 'tool-047',
      name: 'Strategic Planning Workbook',
      category: 'Strategy',
      description: 'Workbook for annual strategic planning and execution.',
      features: ['SWOT Analysis', 'Goal Setting', 'Initiative Planning', 'Progress Tracking'],
      usage: 'Use for strategic planning sessions',
      lastUpdated: 'Mar 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-048',
      name: 'User Research Toolkit',
      category: 'Product & UX',
      description: 'Complete toolkit for conducting user research.',
      features: ['Research Planning', 'Methodology Selection', 'Analysis Framework', 'Insight Synthesis'],
      usage: 'Use for user research projects',
      lastUpdated: 'Feb 2024',
      complexity: 'Intermediate'
    },
    {
      id: 'tool-049',
      name: 'KPI Dashboard Builder',
      category: 'Analytics',
      description: 'Framework to design and implement effective KPI dashboards.',
      features: ['KPI Selection', 'Dashboard Design', 'Data Integration', 'Alert System'],
      usage: 'Use for dashboard development',
      lastUpdated: 'Jan 2024',
      complexity: 'Basic'
    },
    {
      id: 'tool-050',
      name: 'Channel Partnership Framework',
      category: 'Business Development',
      description: 'Framework to build and manage successful channel partnerships.',
      features: ['Partner Identification', 'Program Design', 'Enablement Strategy', 'Performance Tracking'],
      usage: 'Use for channel partner program development',
      lastUpdated: 'Mar 2024',
      complexity: 'Advanced'
    }
  ];

  // Load initial tools
  useEffect(() => {
    setDisplayedTools(allTools.slice(0, 9));
  }, []);

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreTools();
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
  }, [displayedTools, hasMore]);

  const loadMoreTools = () => {
    const currentLength = displayedTools.length;
    const nextTools = allTools.slice(currentLength, currentLength + 9);
    
    if (nextTools.length > 0) {
      setTimeout(() => {
        setDisplayedTools([...displayedTools, ...nextTools]);
        setPage(page + 1);
      }, 500);
    }

    if (currentLength + nextTools.length >= allTools.length) {
      setHasMore(false);
    }
  };

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool);
    setShowAuthModal(true);
  };

  const handleAuthenticate = (partnerId: string, password: string) => {
    // Store authentication in session
    sessionStorage.setItem('partnerAuth', 'true');
    sessionStorage.setItem('partnerId', partnerId);
    
    // Redirect to actual tool page
    window.location.href = `/tools/${selectedTool?.id}`;
  };

  return (
    <main className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="bg-[#1A0B2E] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-purple-600/20 rounded-full text-purple-400 text-xs font-medium mb-6">
            EXECUTIVE TOOLKIT
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
            Strategic Frameworks &<br/>
            <span className="text-purple-300">Operational Tools</span>
          </h1>
          <p className="text-xl text-purple-200 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
            Access 50+ proprietary frameworks, calculators, and playbooks used by top-performing companies. Transform theory into execution.
          </p>
          <div className="flex items-center justify-center gap-6 text-purple-200">
            <div className="text-center">
              <div className="text-3xl font-light text-white mb-1">50+</div>
              <div className="text-sm">Tools & Frameworks</div>
            </div>
            <div className="w-px h-12 bg-purple-600"></div>
            <div className="text-center">
              <div className="text-3xl font-light text-white mb-1">15</div>
              <div className="text-sm">Categories</div>
            </div>
            <div className="w-px h-12 bg-purple-600"></div>
            <div className="text-center">
              <div className="text-3xl font-light text-white mb-1">1000+</div>
              <div className="text-sm">Hours Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      <section className="bg-purple-50 border-b border-purple-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-sm text-gray-700">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p>
              <strong>Partner Access Required:</strong> All tools require partner verification. 
              <Link href="/contact" className="text-purple-600 hover:text-purple-700 font-medium ml-2">
                Request Access
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid with Infinite Scroll */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onClick={() => handleToolClick(tool)}
              />
            ))}
          </div>

          {/* Loading Indicator */}
          {hasMore && (
            <div ref={observerTarget} className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading more tools...</p>
              </div>
            </div>
          )}

          {/* End Message */}
          {!hasMore && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You've viewed all {allTools.length} tools</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
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
      <section className="bg-[#1A0B2E] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-light text-white mb-6">
            Ready to Accelerate Your<br/>
            <span className="text-purple-300">Strategic Execution?</span>
          </h2>
          <p className="text-purple-200 text-xl mb-10 max-w-2xl mx-auto">
            Join partners who are using these tools to drive measurable business outcomes and achieve strategic goals faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-purple-900 px-8 py-4 rounded-lg hover:bg-purple-50 transition-all duration-300 font-medium shadow-lg"
            >
              <span>Get Partner Access</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center border-2 border-purple-500 text-purple-300 px-8 py-4 rounded-lg hover:bg-purple-500/10 transition-all duration-300 font-medium"
            >
              <span>View All Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        toolName={selectedTool?.name || ''}
        onAuthenticate={handleAuthenticate}
      />

    </main>
  );
}