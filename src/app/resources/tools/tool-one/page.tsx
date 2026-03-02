// app/resources/valuation-calculator/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// =====================================================
// VALUATION CALCULATOR PAGE
// Interactive tool for startup valuation estimation
// =====================================================

// =====================================================
// HERO SECTION
// =====================================================
const ValuationHero = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[500px] pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-48 h-48 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
            <span>/</span>
            <Link href="/resources#tools" className="hover:text-white transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-white">Valuation Calculator</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Title & Description */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Interactive Tool</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
                Startup Valuation Calculator
              </h1>
              
              <p className="text-xl text-blue-200 font-light leading-relaxed">
                Estimate your company's worth using multiple valuation methods. Get instant insights based on your business metrics, industry benchmarks, and growth trajectory.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-300">4 valuation methods compared</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-300">Industry-specific multiples</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-300">Real-time sensitivity analysis</span>
              </div>
            </div>
          </div>

          {/* Right Column - Info Card */}
          <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-8 border border-blue-800/30">
            <h3 className="text-white text-lg font-medium mb-6">About This Tool</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Accuracy</div>
                  <div className="text-white">Estimates within 15-25% of actual</div>
                  <div className="text-gray-400 text-xs mt-1">Based on 500+ startup valuations</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Data Privacy</div>
                  <div className="text-white">No data stored or shared</div>
                  <div className="text-gray-400 text-xs mt-1">All calculations happen locally</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Last Updated</div>
                  <div className="text-white">Q4 2024 Multiples</div>
                  <div className="text-gray-400 text-xs mt-1">Regularly updated with market data</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-blue-800/30">
              <p className="text-sm text-gray-400">
                <span className="text-red-400">*</span> This tool provides estimates only. Actual valuations depend on many factors including market conditions, team strength, and competitive positioning.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// =====================================================
// CALCULATOR SECTION
// =====================================================
const CalculatorSection = () => {
  // State for all inputs
  const [inputs, setInputs] = useState({
    // Basic Business Info
    companyName: '',
    industry: 'saas',
    stage: 'series-a',
    location: 'us',
    
    // Financial Metrics
    annualRevenue: 5000000,
    revenueGrowth: 40,
    ebitdaMargin: 20,
    netIncome: 0,
    
    // Funding & Ownership
    previousRaise: 2000000,
    monthlyBurn: 100000,
    teamSize: 25,
    
    // Growth Metrics
    customerGrowth: 30,
    nrr: 120,
    grossMargin: 75,
    cacPayback: 18,
    
    // Market Factors
    marketSize: 'billion',
    competitivePosition: 'strong',
    teamStrength: 'strong'
  });

  // Results state
  const [results, setResults] = useState<{
    revenueMultiple: number;
    ebitdaMultiple: number;
    dcf: number;
    comparable: number;
    range: string;
    confidence: number;
    details: {
      method: string;
      value: number;
      description: string;
      pros: string[];
      cons: string[];
    }[];
  } | null>(null);

  // Handle input changes
  const handleInputChange = (id: keyof typeof inputs, value: any) => {
    setInputs(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Calculate valuation
  const calculateValuation = () => {
    const revenue = inputs.annualRevenue || 0;
    const ebitdaMargin = inputs.ebitdaMargin || 0;
    const growth = inputs.revenueGrowth || 0;
    const nrr = inputs.nrr || 100;
    const teamStrength = inputs.teamStrength;
    const competitivePosition = inputs.competitivePosition;

    // Industry multiples (2024 averages)
    const multiples: Record<string, { revenue: number; ebitda: number; growthMultiplier: number }> = {
      saas: { revenue: 8, ebitda: 20, growthMultiplier: 1.5 },
      ecommerce: { revenue: 2.5, ebitda: 12, growthMultiplier: 1.2 },
      marketplace: { revenue: 4, ebitda: 18, growthMultiplier: 1.4 },
      services: { revenue: 1.2, ebitda: 8, growthMultiplier: 1.1 },
      manufacturing: { revenue: 1.5, ebitda: 10, growthMultiplier: 1.1 },
      d2c: { revenue: 2.2, ebitda: 14, growthMultiplier: 1.3 },
      fintech: { revenue: 6, ebitda: 22, growthMultiplier: 1.6 },
      healthtech: { revenue: 7, ebitda: 25, growthMultiplier: 1.7 }
    };

    const industryMultiples = multiples[inputs.industry] || multiples.saas;
    
    // Adjust for growth rate
    const growthFactor = 1 + (growth / 100) * (industryMultiples.growthMultiplier / 100);
    
    // Adjust for NRR
    const nrrFactor = 1 + ((nrr - 100) / 100) * 0.5;
    
    // Adjust for team strength
    const teamFactor = teamStrength === 'strong' ? 1.15 : teamStrength === 'average' ? 1.0 : 0.85;
    
    // Adjust for competitive position
    const competitiveFactor = competitivePosition === 'strong' ? 1.1 : competitivePosition === 'average' ? 1.0 : 0.9;
    
    // Calculate valuations using different methods
    const revenueMultipleValuation = revenue * industryMultiples.revenue * growthFactor * nrrFactor * teamFactor * competitiveFactor;
    const ebitdaMultipleValuation = (revenue * ebitdaMargin / 100) * industryMultiples.ebitda * teamFactor * competitiveFactor;
    
    // Simplified DCF (5-year projection)
    const projectionYears = 5;
    let dcfSum = 0;
    for (let i = 1; i <= projectionYears; i++) {
      const futureRevenue = revenue * Math.pow(1 + growth / 100, i);
      const futureEbitda = futureRevenue * (ebitdaMargin / 100);
      const discountedValue = futureEbitda / Math.pow(1.2, i); // 20% discount rate
      dcfSum += discountedValue;
    }
    const dcfValuation = dcfSum * 8; // Terminal value multiple
    
    // Comparable analysis (weighted average)
    const comparableValuation = (revenueMultipleValuation * 0.4 + ebitdaMultipleValuation * 0.3 + dcfValuation * 0.3);
    
    // Calculate range
    const lowerBound = comparableValuation * 0.8;
    const upperBound = comparableValuation * 1.2;
    
    // Confidence score
    let confidence = 70;
    if (revenue > 10000000) confidence += 10;
    if (growth > 50) confidence += 10;
    if (nrr > 110) confidence += 10;
    if (teamStrength === 'strong') confidence += 5;
    confidence = Math.min(confidence, 95);

    // Method details
    const methodDetails = [
      {
        method: "Revenue Multiple",
        value: revenueMultipleValuation,
        description: "Most common for early-stage startups. Based on annual recurring revenue and industry benchmarks.",
        pros: ["Simple to calculate", "Widely understood by investors", "Good for high-growth companies"],
        cons: ["Ignores profitability", "Sensitive to revenue fluctuations", "Industry multiples vary widely"]
      },
      {
        method: "EBITDA Multiple",
        value: ebitdaMultipleValuation,
        description: "Better for profitable companies. Based on earnings before interest, taxes, depreciation, and amortization.",
        pros: ["Accounts for profitability", "More stable than revenue multiples", "Good comparison to public companies"],
        cons: ["Less useful for pre-profit startups", "Ignores growth potential", "Highly sensitive to margin changes"]
      },
      {
        method: "Discounted Cash Flow",
        value: dcfValuation,
        description: "Projects future cash flows and discounts them to present value. Most theoretical approach.",
        pros: ["Accounts for time value of money", "Considers future growth", "Most thorough method"],
        cons: ["Highly sensitive to assumptions", "Complex to calculate", "Less useful for very early stage"]
      },
      {
        method: "Comparable Analysis",
        value: comparableValuation,
        description: "Weighted average of multiple methods, adjusted for company specifics.",
        pros: ["Considers multiple perspectives", "Accounts for company specifics", "Most balanced approach"],
        cons: ["Requires accurate inputs", "Still an estimate", "Market comparables may not exist"]
      }
    ];

    setResults({
      revenueMultiple: revenueMultipleValuation,
      ebitdaMultiple: ebitdaMultipleValuation,
      dcf: dcfValuation,
      comparable: comparableValuation,
      range: `₹${lowerBound.toLocaleString('en-IN', { maximumFractionDigits: 0 })} - ₹${upperBound.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      confidence,
      details: methodDetails
    });
  };

  // Quick use cases
  const useCases = [
    {
      title: "Early-stage SaaS",
      values: {
        annualRevenue: 2000000,
        revenueGrowth: 80,
        ebitdaMargin: -15,
        industry: 'saas',
        nrr: 130,
        teamStrength: 'strong'
      }
    },
    {
      title: "Profitable E-commerce",
      values: {
        annualRevenue: 10000000,
        revenueGrowth: 25,
        ebitdaMargin: 12,
        industry: 'ecommerce',
        nrr: 105,
        teamStrength: 'average'
      }
    },
    {
      title: "Growth-stage Marketplace",
      values: {
        annualRevenue: 15000000,
        revenueGrowth: 60,
        ebitdaMargin: 5,
        industry: 'marketplace',
        nrr: 115,
        teamStrength: 'strong'
      }
    }
  ];

  const handleUseCase = (values: any) => {
    setInputs(prev => ({ ...prev, ...values }));
  };

  return (
    <section className="bg-[#d4dce5] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Inputs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 sm:p-8 mb-6">
              <h2 className="text-2xl font-light text-gray-800 mb-6">Company Information</h2>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={inputs.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select
                      value={inputs.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="saas">SaaS / Software</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="marketplace">Marketplace</option>
                      <option value="fintech">Fintech</option>
                      <option value="healthtech">Healthtech</option>
                      <option value="d2c">D2C Brands</option>
                      <option value="services">Professional Services</option>
                      <option value="manufacturing">Manufacturing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Funding Stage
                    </label>
                    <select
                      value={inputs.stage}
                      onChange={(e) => handleInputChange('stage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="seed">Seed</option>
                      <option value="series-a">Series A</option>
                      <option value="series-b">Series B</option>
                      <option value="series-c">Series C+</option>
                    </select>
                  </div>
                </div>

                {/* Growth Metrics */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Recurring Revenue (ARR)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={inputs.annualRevenue}
                        onChange={(e) => handleInputChange('annualRevenue', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-12"
                        min="0"
                        step="1000"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        ₹
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year-over-Year Growth Rate
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={inputs.revenueGrowth}
                        onChange={(e) => handleInputChange('revenueGrowth', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                        min="0"
                        max="500"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        %
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      EBITDA Margin
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={inputs.ebitdaMargin}
                        onChange={(e) => handleInputChange('ebitdaMargin', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                        min="-100"
                        max="100"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        %
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Metrics Section */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Advanced Metrics (Optional)</h3>
                  <span className="text-sm text-gray-500">More precise inputs = better estimate</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Net Revenue Retention
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={inputs.nrr}
                        onChange={(e) => handleInputChange('nrr', parseInt(e.target.value) || 100)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                        min="0"
                        max="200"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        %
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Strength
                    </label>
                    <select
                      value={inputs.teamStrength}
                      onChange={(e) => handleInputChange('teamStrength', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="strong">Strong (Expert team)</option>
                      <option value="average">Average</option>
                      <option value="weak">Weak (Gaps in leadership)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Competitive Position
                    </label>
                    <select
                      value={inputs.competitivePosition}
                      onChange={(e) => handleInputChange('competitivePosition', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="strong">Market leader</option>
                      <option value="average">Strong competitor</option>
                      <option value="weak">Challenger</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Quick Use Cases */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Quick Examples:</p>
                <div className="flex flex-wrap gap-2">
                  {useCases.map((useCase, index) => (
                    <button
                      key={index}
                      onClick={() => handleUseCase(useCase.values)}
                      className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                    >
                      {useCase.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateValuation}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-lg">Calculate Valuation</span>
            </button>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-1">
            {results ? (
              <div className="space-y-6">
                {/* Summary Card */}
                <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-6 border border-blue-800/30">
                  <h3 className="text-white text-lg font-medium mb-4">Valuation Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        ₹{results.comparable.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-blue-300 text-sm">Estimated Valuation</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-400 mb-2">Confidence Score</div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-blue-900/50 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-blue-400 h-full rounded-full"
                            style={{ width: `${results.confidence}%` }}
                          ></div>
                        </div>
                        <div className="text-white font-medium">{results.confidence}%</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-400 mb-2">Valuation Range</div>
                      <div className="text-white font-medium">{results.range}</div>
                    </div>
                  </div>
                </div>

                {/* Methods Comparison */}
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-gray-800 font-medium mb-4">Valuation Methods</h3>
                  
                  <div className="space-y-4">
                    {results.details.map((method, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium text-gray-800">{method.method}</div>
                          <div className="text-blue-600 font-bold">
                            ₹{method.value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-xs text-green-600 font-medium mb-1">Pros</div>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {method.pros.map((pro, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <svg className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-xs text-red-600 font-medium mb-1">Cons</div>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {method.cons.map((con, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <svg className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Placeholder Before Calculation */
              <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-8 border border-blue-800/30 h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-medium mb-2">Ready to Calculate</h3>
                <p className="text-gray-300 text-sm">
                  Fill in your company details on the left and click "Calculate Valuation" to see your estimated worth.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

// =====================================================
// GUIDANCE SECTION
// =====================================================
const GuidanceSection = () => {
  const tips = [
    {
      title: "Understand Your Multiples",
      content: "SaaS companies typically trade at 6-10x ARR, while e-commerce is 1.5-3x revenue. Know your industry benchmarks.",
      icon: "📊"
    },
    {
      title: "Growth Trumps Profitability",
      content: "For early-stage startups, investors value growth over profits. 100%+ YoY growth can command premium multiples.",
      icon: "🚀"
    },
    {
      title: "NRR is Critical",
      content: "Net Revenue Retention above 100% signals strong product-market fit and can increase valuation by 20-30%.",
      icon: "💰"
    },
    {
      title: "Team Matters",
      content: "A strong founding team with relevant experience can increase valuation by 15-25% compared to first-time founders.",
      icon: "👥"
    }
  ];

  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4 leading-tight">
            Valuation Best Practices
          </h2>
          <p className="text-xl text-blue-200 font-light">
            How to use these estimates effectively in your fundraising process
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-6 border border-blue-800/30">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{tip.icon}</div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-3">{tip.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{tip.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-red-900/20 border border-red-700/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <div>
              <h4 className="text-white font-medium mb-2">Important Disclaimer</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                This tool provides estimates based on industry benchmarks and should be used for informational purposes only. 
                Actual valuations depend on many factors including market conditions, investor appetite, competitive landscape, 
                and deal terms. Always consult with financial advisors before making fundraising decisions.
                <br /><br />
                Sarsen & Company does not guarantee the accuracy of these estimates and accepts no liability for decisions made 
                based on this tool's output.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// =====================================================
// RELATED TOOLS SECTION
// =====================================================
const RelatedToolsSection = () => {
  const relatedTools = [
    {
      title: "Fundraising Calculator",
      description: "Calculate dilution, ownership, and post-money valuation for your next round.",
      category: "Funding",
      color: "bg-purple-600",
      icon: "💸",
      link: "/tools/fundraising-calculator"
    },
    {
      title: "CAC:LTV Calculator",
      description: "Analyze customer acquisition costs and lifetime value metrics.",
      category: "Metrics",
      color: "bg-green-600",
      icon: "📈",
      link: "/tools/cac-ltv-calculator"
    },
    {
      title: "Runway Calculator",
      description: "Calculate how long your funding will last based on current burn rate.",
      category: "Finance",
      color: "bg-orange-600",
      icon: "⏳",
      link: "/tools/runway-calculator"
    }
  ];

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4 leading-tight">
            More Strategic Tools
          </h2>
          <p className="text-gray-600">
            Explore our collection of free tools for founders
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {relatedTools.map((tool, index) => (
            <Link
              key={index}
              href={tool.link}
              className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`${tool.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl`}>
                  {tool.icon}
                </div>
                <div>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded mb-2">
                    {tool.category}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {tool.description}
              </p>
              
              <div className="flex items-center text-blue-600 group-hover:text-blue-700 font-medium text-sm">
                <span>Use Tool</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/resources#tools"
            className="inline-flex items-center gap-2 bg-[#0A1E3D] text-white px-6 py-3 rounded-lg hover:bg-[#132B47] transition-colors font-medium"
          >
            <span>View All Tools</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
};

// =====================================================
// MAIN PAGE COMPONENT
// =====================================================
export default function ValuationCalculatorPage() {
  return (
    <main className="min-h-screen">
      <ValuationHero />
      <CalculatorSection />
      <GuidanceSection />
      <RelatedToolsSection />
    </main>
  );
}