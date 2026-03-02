// app/reports/saas-market-trends-2024/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

// =====================================================
// REPORT DATA
// =====================================================
const report = {
  slug: 'saas-market-trends-2024',
  title: '2024 SaaS Market Trends Report',
  heroDescription: 'An in-depth analysis of the global SaaS market: funding patterns, valuation multiples, growth strategies, and emerging opportunities for founders and investors.',
  category: 'Market Research',
  tags: ['SaaS', 'Market Trends', 'Funding', 'Valuations', 'Growth'],
  pages: 78,
  publishedDate: 'January 15, 2024',
  lastUpdated: 'March 1, 2024',
  downloads: '1,247',
  isFree: false,
  price: '$2,499',
  authors: [
    {
      name: 'Dr. Ananya Sharma',
      role: 'Lead Research Analyst',
      bio: 'Former McKinsey technology practice, 12+ years in SaaS market analysis'
    },
    {
      name: 'Rahul Mehta',
      role: 'Data Science Director',
      bio: 'PhD in Computational Economics, specializes in predictive market modeling'
    }
  ],
  keyFindings: [
    {
      metric: '18%',
      label: 'Market Growth',
      description: 'Global SaaS market expansion in 2024, down from 23% in 2023'
    },
    {
      metric: '5.8x',
      label: 'Average ARR Multiple',
      description: 'Down from 8.2x in 2021, but stabilizing in Q4 2023'
    },
    {
      metric: '42%',
      label: 'AI Adoption',
      description: 'Of SaaS companies now have AI features in production'
    },
    {
      metric: '$89B',
      label: 'Total Funding',
      description: 'Global SaaS funding in 2023, a 35% decline from 2022'
    }
  ],
  executiveSummary: 'The 2024 SaaS market represents a critical inflection point. After two years of valuation corrections and funding pullbacks, we\'re seeing the emergence of a new normal—one that rewards fundamentals over hype, efficiency over growth-at-all-costs, and sustainable unit economics over speculative scaling. This 78-page report analyzes 1,200+ SaaS companies across Series A to public markets, identifying the strategies that are working in today\'s market and predicting where the next wave of innovation will emerge.',
  tableOfContents: [
    {
      id: 'executive-summary',
      title: 'Executive Summary',
      page: 1,
      subsections: ['Key Findings', 'Methodology Overview', 'Report Structure']
    },
    {
      id: 'market-overview',
      title: 'Global SaaS Market Overview',
      page: 5,
      subsections: ['Market Size & Growth', 'Regional Analysis', 'Sector Breakdown']
    },
    {
      id: 'funding-analysis',
      title: 'Funding Environment Analysis',
      page: 18,
      subsections: ['VC Investment Trends', 'Round Sizes & Valuations', 'Investor Sentiment']
    },
    {
      id: 'valuation-multiples',
      title: 'Valuation Multiples & Benchmarks',
      page: 32,
      subsections: ['Public Company Analysis', 'Private Market Multiples', 'Forward-looking Indicators']
    },
    {
      id: 'growth-strategies',
      title: 'Growth Strategies That Work',
      page: 45,
      subsections: ['Efficient Scaling', 'Pricing Innovation', 'International Expansion']
    },
    {
      id: 'ai-transformation',
      title: 'AI Transformation in SaaS',
      page: 58,
      subsections: ['Adoption Rates', 'Feature Analysis', 'ROI Measurement']
    },
    {
      id: 'predictions',
      title: '2024-2025 Predictions',
      page: 70,
      subsections: ['Market Outlook', 'Opportunity Areas', 'Risk Factors']
    }
  ],
  methodology: [
    {
      step: '1',
      title: 'Data Collection',
      description: 'Aggregated data from 1,200+ SaaS companies, 300+ VC funds, and public market sources'
    },
    {
      step: '2',
      title: 'Financial Analysis',
      description: 'Deep financial modeling of ARR growth, margins, CAC payback, and unit economics'
    },
    {
      step: '3',
      title: 'CEO Interviews',
      description: '45 in-depth interviews with SaaS founders and executives across stages'
    },
    {
      step: '4',
      title: 'Predictive Modeling',
      description: 'Machine learning models trained on 10 years of SaaS market data'
    }
  ],
  conclusion: 'The 2024 SaaS market is fundamentally different from the growth-at-all-costs environment of 2021. Success now requires a balanced approach: maintaining growth momentum while demonstrating clear path to profitability, leveraging AI not as a buzzword but as a tangible efficiency driver, and building resilient business models that can withstand market volatility. Companies that master this balance will not only survive 2024 but emerge as the category leaders of 2025 and beyond.'
};

// =====================================================
// HERO SECTION
// =====================================================
const ReportHero = () => {
  return (
    <section className="relative bg-[#0A1E3D] pt-24 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/reports" className="hover:text-blue-300 transition-colors">Reports</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-500 truncate max-w-xs">{report.title}</span>
          </div>
        </nav>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Left + Center: Main content (spans 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category pill */}
            <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-blue-300 text-xs font-medium">
              {report.category}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight">
              {report.title}
            </h1>

            {/* Hero description */}
            <p className="text-xl sm:text-2xl text-blue-300 font-light leading-relaxed max-w-3xl">
              {report.heroDescription}
            </p>

            {/* Authors */}
            <div className="flex flex-wrap gap-4 pt-2">
              {report.authors.map((author, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{author.name}</p>
                    <p className="text-gray-400 text-xs">{author.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {report.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-gray-300 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Purchase / Download card */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 sticky top-24">
              {/* Cover placeholder */}
              <div className="bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-xl h-48 flex items-center justify-center mb-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-white rounded-full"></div>
                </div>
                <div className="text-center">
                  <svg className="w-16 h-16 text-white/80 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                  </svg>
                  <div className="text-white text-sm">78-Page Research Report</div>
                </div>
              </div>

              {/* Meta list */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Pages</span>
                  <span className="text-white font-medium">{report.pages}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Published</span>
                  <span className="text-white font-medium">{report.publishedDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Last Updated</span>
                  <span className="text-white font-medium">{report.lastUpdated}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Downloads</span>
                  <span className="text-white font-medium">{report.downloads}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/20 my-4"></div>

              {/* Price + CTA */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-2xl font-light ${report.isFree ? 'text-green-400' : 'text-white'}`}>
                  {report.price}
                </span>
                {report.isFree && (
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">FREE</span>
                )}
              </div>

              <button className="w-full bg-white text-[#0A1E3D] py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-lg flex items-center justify-center gap-2 group">
                <span>Purchase Report</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Sample download link */}
              {!report.isFree && (
                <button className="w-full mt-3 text-blue-300 hover:text-blue-200 text-sm transition-colors flex items-center justify-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Free Sample (10 pages)
                </button>
              )}

              {/* Guarantee */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-start gap-2 text-xs text-gray-400">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>30-day money-back guarantee. Email support included.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// =====================================================
// KEY FINDINGS SECTION
// =====================================================
const KeyFindingsSection = () => {
  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-10 leading-tight">
          Key Findings
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {report.keyFindings.map((finding, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              {/* Big metric */}
              <div className="text-3xl sm:text-4xl font-light text-[#0A1E3D] mb-2">{finding.metric}</div>
              {/* Label */}
              <div className="text-gray-900 text-sm font-medium mb-1">{finding.label}</div>
              {/* Description */}
              <div className="text-gray-500 text-xs leading-relaxed">{finding.description}</div>
            </div>
          ))}
        </div>

        {/* Insight Box */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-white border-l-4 border-blue-500 p-6 rounded-r-lg">
          <div className="flex items-start gap-4">
            <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-gray-800 font-medium mb-2">Core Insight</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                The SaaS market is undergoing a fundamental shift from growth-at-all-costs to sustainable scaling. 
                Companies that balanced growth with profitability in 2023 raised 2.3x more funding than those that didn't.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// EXECUTIVE SUMMARY SECTION
// =====================================================
const ExecutiveSummarySection = () => {
  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-2xl p-8 sm:p-10 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium mb-6">
              EXECUTIVE SUMMARY
            </div>
            <p className="text-white/95 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
              {report.executiveSummary}
            </p>
            
            {/* Key Takeaways */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-white font-medium mb-2">For Founders</div>
                <p className="text-white/80 text-sm">
                  Focus on efficient growth, demonstrate clear path to profitability, and leverage AI for tangible efficiency gains.
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-white font-medium mb-2">For Investors</div>
                <p className="text-white/80 text-sm">
                  Look for companies with strong unit economics, sustainable growth rates, and defensible technology differentiation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// TABLE OF CONTENTS SECTION
// =====================================================
const TableOfContentsSection = () => {
  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Left: Section header */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-800 leading-tight sticky top-24">
              Table of<br className="hidden lg:block" />Contents
            </h2>
            <p className="text-gray-600 text-base mt-4">
              {report.pages}-page deep-dive structured for both sequential reading and targeted reference.
            </p>
            
            {/* Downloadable TOC */}
            <div className="mt-6">
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Full TOC (PDF)</span>
              </button>
            </div>
          </div>

          {/* Right: TOC list */}
          <div className="lg:col-span-2 space-y-4">
            {report.tableOfContents.map((section, idx) => (
              <div
                key={idx}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-5 sm:p-6 group"
              >
                {/* Section row: number + title + page */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Section number circle */}
                    <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{idx + 1}</span>
                    </div>
                    {/* Title + subsections */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                        {section.title}
                      </h3>
                      {section.subsections && (
                        <div className="mt-2 space-y-1">
                          {section.subsections.map((sub, subIdx) => (
                            <p key={subIdx} className="text-sm text-gray-500 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                              {sub}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Page number */}
                  <span className="flex-shrink-0 text-sm text-gray-400 font-medium mt-0.5">
                    p. {section.page}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

// =====================================================
// METHODOLOGY SECTION
// =====================================================
const MethodologySection = () => {
  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-white leading-tight">
            Research Methodology
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mt-4">
            Every finding in this report is grounded in a rigorous, reproducible analytical process.
          </p>
        </div>

        {/* Step cards — 2x2 on desktop, single stack on mobile */}
        <div className="grid sm:grid-cols-2 gap-6">
          {report.methodology.map((step, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                {/* Step number */}
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-lg flex items-center justify-center">
                  <span className="text-white font-medium">{step.step}</span>
                </div>
                {/* Content */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Data Sources */}
        <div className="mt-12 bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-6 border border-blue-800/30">
          <h3 className="text-white text-lg font-medium mb-4">Primary Data Sources</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-blue-900/20 rounded-lg p-4">
              <div className="text-blue-300 text-sm font-medium mb-1">Financial Databases</div>
              <div className="text-gray-400 text-xs">PitchBook, Crunchbase, Capital IQ</div>
            </div>
            <div className="bg-blue-900/20 rounded-lg p-4">
              <div className="text-blue-300 text-sm font-medium mb-1">Public Companies</div>
              <div className="text-gray-400 text-xs">SEC filings, earnings calls, investor presentations</div>
            </div>
            <div className="bg-blue-900/20 rounded-lg p-4">
              <div className="text-blue-300 text-sm font-medium mb-1">Primary Research</div>
              <div className="text-gray-400 text-xs">CEO interviews, customer surveys, expert panels</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// SAMPLE INSIGHTS SECTION
// =====================================================
const SampleInsightsSection = () => {
  const insights = [
    {
      title: "Valuation Correction Patterns",
      content: "Late-stage SaaS companies have seen the steepest multiple compression (60-70% from peak), while early-stage valuations remain more resilient due to longer investment horizons.",
      data: "Based on analysis of 450 funding rounds"
    },
    {
      title: "AI Adoption Curve",
      content: "SaaS companies that launched AI features in 2023 saw 40% higher user engagement but only 15% realized meaningful revenue impact within the first year.",
      data: "Analysis of 200+ product launches"
    },
    {
      title: "International Expansion ROI",
      content: "SaaS companies that expanded to 2-3 international markets before $10M ARR achieved 2.8x higher valuations than those that remained domestic.",
      data: "Comparison of 120 expansion cases"
    }
  ];

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-800 leading-tight">
            Sample Insights from the Report
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mt-4">
            A preview of the data-driven insights you'll get with the full report
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((insight, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-sm font-medium">{idx + 1}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">{insight.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{insight.content}</p>
              <div className="text-xs text-gray-500 border-t border-gray-100 pt-3">{insight.data}</div>
            </div>
          ))}
        </div>

        {/* Warning Box */}
        <div className="mt-12 bg-gradient-to-r from-yellow-50 to-white border-l-4 border-yellow-500 p-6 rounded-r-lg">
          <div className="flex items-start gap-4">
            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <div>
              <h4 className="text-gray-800 font-medium mb-2">Limited Preview</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                These are just 3 of the 47 major insights in the full report. The complete analysis includes 
                detailed financial models, competitive analysis frameworks, and forward-looking predictions 
                for 2024-2025.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// CONCLUSION SECTION
// =====================================================
const ConclusionSection = () => {
  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-[#0A1E3D]/10 rounded-full text-[#0A1E3D] text-xs font-medium mb-6">
            CONCLUSION
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-6 leading-tight">
            What This Means for You
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
            {report.conclusion}
          </p>
          
          {/* Action Items */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-white rounded-lg p-5 text-left">
              <div className="text-blue-600 font-medium mb-2">For SaaS Founders</div>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Focus on efficient growth, not just growth</li>
                <li>• Build AI features that solve real problems</li>
                <li>• Extend runway while maintaining momentum</li>
                <li>• Consider international expansion early</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-5 text-left">
              <div className="text-blue-600 font-medium mb-2">For Investors</div>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Look for sustainable unit economics</li>
                <li>• Value defensible technology over hype</li>
                <li>• Focus on teams that can execute in tough markets</li>
                <li>• Consider secondary opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// RELATED REPORTS SECTION
// =====================================================
const RelatedReportsSection = () => {
  const relatedReports = [
    {
      title: 'AI in Enterprise SaaS',
      category: 'Technology',
      pages: 65,
      price: '$1,999',
      isFree: false,
      color: 'from-[#1E5A8E] to-[#2B7AB8]'
    },
    {
      title: 'SaaS Pricing Strategies',
      category: 'Strategy',
      pages: 52,
      price: 'FREE',
      isFree: true,
      color: 'from-[#2B7AB8] to-[#3A8BC8]'
    },
    {
      title: 'Southeast Asia Tech Report',
      category: 'Market Research',
      pages: 84,
      price: '$2,199',
      isFree: false,
      color: 'from-[#7B8FA5] to-[#8B9EB0]'
    }
  ];

  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-light text-white leading-tight">
              Related Reports
            </h2>
            <p className="text-gray-400 text-base mt-2">
              Continue your research with these related analyses.
            </p>
          </div>
          <Link
            href="/reports"
            className="self-start sm:self-end text-blue-300 hover:text-blue-200 text-sm transition-colors flex items-center gap-1.5 group"
          >
            <span>View all reports</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {relatedReports.map((related, idx) => (
            <Link
              key={idx}
              href="/reports"
              className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 flex flex-col group"
            >
              {/* Mini gradient header */}
              <div className={`bg-gradient-to-br ${related.color} h-28 flex items-center justify-center`}>
                <svg className="w-10 h-10 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                </svg>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs font-medium text-blue-400 bg-white/10 px-2 py-1 rounded self-start mb-3">
                  {related.category}
                </span>
                <h3 className="text-base font-medium text-white group-hover:text-blue-300 transition-colors leading-tight flex-grow">
                  {related.title}
                </h3>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10 text-xs text-gray-500">
                  <span>{related.pages} pages</span>
                  <span className={related.isFree ? 'text-green-400 font-medium' : 'text-gray-400'}>{related.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// =====================================================
// CTA SECTION
// =====================================================
const CTASection = () => {
  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-6 leading-tight">
            Need a Custom Deep Dive?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
            Every organisation faces unique strategic questions that standardised reports can only partially answer. 
            Our bespoke research engagements are built around your specific market, competitive set, and decision timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#0A1E3D] text-white px-8 py-4 rounded-lg hover:bg-[#132B47] transition-colors font-medium shadow-lg inline-flex items-center justify-center gap-2 group">
              <span>Request Custom Research</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="bg-transparent border-2 border-[#0A1E3D] text-[#0A1E3D] px-8 py-4 rounded-lg hover:bg-[#0A1E3D]/5 transition-colors font-medium inline-flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Schedule Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// MAIN PAGE COMPONENT
// =====================================================
export default function SaaSMarketTrendsReportPage() {
  return (
    <main className="min-h-screen">
      <ReportHero />
      <KeyFindingsSection />
      <ExecutiveSummarySection />
      <TableOfContentsSection />
      <MethodologySection />
      <SampleInsightsSection />
      <ConclusionSection />
      <RelatedReportsSection />
      <CTASection />
    </main>
  );
}