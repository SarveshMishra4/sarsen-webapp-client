// app/services/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

// =====================================================
// SERVICES HUB PAGE - IMPROVED VERSION
// All 8 consulting packages as attractive cards
// Includes case studies for social proof
// Consistent brand colors throughout
// Optimized for conversion
// =====================================================

// =====================================================
// HERO SECTION
// =====================================================
const ServicesHero = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[600px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 border-2 border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div>
            <div className="inline-block px-3 py-1 bg-blue-600/20 rounded-full text-blue-400 text-xs font-medium mb-6">
              PRODUCTIZED STRATEGY CONSULTING
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
              Strategic Clarity.<br/>
              <span className="text-blue-300">Actionable Direction.</span>
            </h1>
            <p className="text-xl text-blue-200 font-light leading-relaxed mb-8">
              Eight battle-tested consulting packages designed for founders navigating critical inflection points. From idea validation to scale-ready operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#packages"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg"
              >
                <span>Explore Packages</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center border-2 border-blue-500 text-blue-300 px-8 py-4 rounded-lg hover:bg-blue-500/10 transition-all duration-300 font-medium"
              >
                <span>Book Consultation</span>
              </a>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Strategic visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-pulse"></div>
                  <div className="absolute inset-8 border-2 border-blue-500/40 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="absolute inset-16 border-2 border-blue-600/50 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  
                  {/* Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg"></div>
                  </div>
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
// HOW IT WORKS SECTION
// Brief explanation of the process
// =====================================================
const HowItWorksSection = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4">
            How Our Packages Work
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Every package follows a systematic approach: diagnostic → strategy → execution roadmap
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">1. Diagnostic</h3>
            <p className="text-gray-600 text-sm">Deep-dive analysis to understand your current position and challenges</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">2. Strategy</h3>
            <p className="text-gray-600 text-sm">Clear strategic direction with prioritized action items</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">3. Execution</h3>
            <p className="text-gray-600 text-sm">90-day actionable roadmap with clear next steps</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// ALL PACKAGES SECTION
// 8 service packages as attractive cards
// =====================================================
const AllPackagesSection = () => {
  const packages = [
    {
      id: 0,
      name: "Business Diagnostic & Direction",
      tagline: "Compulsory Entry Point",
      description: "314-question diagnostic system to understand your business mechanics, identify control levers, and establish strategic direction for the next 12 months.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      targetedFor: "Founders overwhelmed or unclear about priorities",
      deliverables: ["Business Control Handbook", "Direction Document", "90-Day Action Plan"],
      duration: "2 weeks",
      color: "from-purple-600 to-purple-700",
      badge: "START HERE",
      link: "/services/business-diagnostic"
    },
    {
      id: 1,
      name: "Idea-to-Validation",
      tagline: "Pre-Revenue Clarity",
      description: "Systematic validation framework to test problem-solution fit, define ICP, and make the kill-or-commit decision on your startup idea.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      ),
      targetedFor: "Idea-stage or pre-revenue founders",
      deliverables: ["Validation Decision Matrix", "ICP Definition", "90-Day Validation Plan"],
      duration: "2 weeks",
      color: "from-blue-600 to-blue-700",
      badge: null,
      link: "/services/idea-validation"
    },
    {
      id: 2,
      name: "Product-Market Fit Clarity",
      tagline: "PMF or Pivot",
      description: "Rigorous PMF assessment using retention signals, usage patterns, and value delivery to determine if you have PMF or need to pivot.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
      targetedFor: "Founders with users but unclear PMF",
      deliverables: ["PMF Scorecard", "ICP Lock Document", "Pivot/Persist Memo"],
      duration: "2-3 weeks",
      color: "from-indigo-600 to-indigo-700",
      badge: null,
      link: "/services/pmf-clarity"
    },
    {
      id: 3,
      name: "Go-To-Market Strategy",
      tagline: "Repeatable Acquisition",
      description: "Channel prioritization, funnel optimization, and sales motion definition to build a scalable customer acquisition engine.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      ),
      targetedFor: "Startups with product but inconsistent sales",
      deliverables: ["GTM Strategy Doc", "Funnel Analysis", "90-Day GTM Plan"],
      duration: "3 weeks",
      color: "from-green-600 to-green-700",
      badge: null,
      link: "/services/gtm-strategy"
    },
    {
      id: 4,
      name: "Operations & Scalability",
      tagline: "Remove Founder Bottlenecks",
      description: "Process mapping, cost optimization, and organizational design to scale without breaking systems or burning out founders.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      ),
      targetedFor: "Revenue-stage startups facing chaos",
      deliverables: ["Operations Report", "Org Design", "Scalability Scorecard"],
      duration: "3 weeks",
      color: "from-orange-600 to-orange-700",
      badge: null,
      link: "/services/operations-scalability"
    },
    {
      id: 5,
      name: "Fundraising Readiness",
      tagline: "Investor-Ready Positioning",
      description: "Metric hygiene, narrative structuring, and readiness assessment to maximize your fundraising success and valuation.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      targetedFor: "Founders planning to raise in 3-6 months",
      deliverables: ["Readiness Report", "Investor Metrics Dashboard"],
      duration: "2-3 weeks",
      color: "from-yellow-600 to-yellow-700",
      badge: null,
      link: "/services/fundraising-readiness"
    },
    {
      id: 6,
      name: "Turnaround & Stabilization",
      tagline: "Emergency Control",
      description: "Rapid survival assessment, cash runway extension, and priority reset for startups facing existential risk.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      ),
      targetedFor: "Startups facing survival risk",
      deliverables: ["Survival Memo", "30-90 Day Turnaround Plan"],
      duration: "1-2 weeks",
      color: "from-red-600 to-red-700",
      badge: "URGENT",
      link: "/services/turnaround"
    },
    {
      id: 7,
      name: "Scale & Expansion Strategy",
      tagline: "Growth Without Breaking",
      description: "Scale readiness assessment, capacity planning, and expansion strategy for aggressive growth without system failure.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      ),
      targetedFor: "Founders preparing for aggressive growth",
      deliverables: ["Scale Readiness Scorecard", "Expansion Decision Memo"],
      duration: "3-4 weeks",
      color: "from-teal-600 to-teal-700",
      badge: null,
      link: "/services/scale-expansion"
    }
  ];

  return (
    <section id="packages" className="bg-[#d4dce5] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-4">
            Choose Your Strategic Package
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Eight specialized packages covering every critical stage of your startup journey. 
            All packages start with Package 0: Business Diagnostic & Direction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Link
              key={pkg.id}
              href={pkg.link}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300 flex flex-col"
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full ${
                    pkg.badge === 'START HERE' ? 'bg-purple-600' :
                    pkg.badge === 'URGENT' ? 'bg-red-600' :
                    'bg-blue-600'
                  }`}>
                    {pkg.badge}
                  </span>
                </div>
              )}

              {/* Icon Header */}
              <div className={`bg-gradient-to-r ${pkg.color} p-6`}>
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {pkg.icon}
                  </svg>
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">{pkg.name}</h3>
                <p className="text-white/90 text-sm font-medium">{pkg.tagline}</p>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Targeted For */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-600 mb-2">TARGETED FOR:</p>
                  <p className="text-sm text-gray-700">{pkg.targetedFor}</p>
                </div>

                {/* Deliverables */}
                <div className="mb-6">
                  <p className="text-xs font-medium text-gray-600 mb-2">DELIVERABLES:</p>
                  <ul className="space-y-1">
                    {pkg.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Duration */}
                <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {pkg.duration}
                  </span>
                  <span className="text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Learn More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

// CONTINUE TO PART 2 FOR CASE STUDIES AND REST OF PAGE...
// app/services/page.tsx - PART 2
// PASTE THIS IMMEDIATELY AFTER PART 1

// =====================================================
// CASE STUDIES SECTION
// Three success stories to build credibility
// =====================================================
const CaseStudiesSection = () => {
  const caseStudies = [
    {
      company: "TechFlow Analytics",
      industry: "B2B SaaS",
      package: "Diagnostic + PMF Clarity + GTM Strategy",
      challenge: "Pre-revenue startup with 14 months of development, $800K seed funding, but zero paying customers. Team was brilliant but directionless, changing product roadmap every 6 weeks.",
      solution: "Used our diagnostic to identify core problems, locked ICP to mid-market e-commerce, cut 60% of roadmap features, and established value-based pricing at $499/month.",
      results: [
        { metric: "$2M ARR", description: "Achieved in 18 months" },
        { metric: "120% NRR", description: "Net Revenue Retention" },
        { metric: "$8M Series A", description: "At $35M valuation" }
      ],
      timeline: "18 months",
      testimonial: "Sarsen gave us the strategic clarity we desperately needed. Their frameworks transformed chaos into a clear path forward.",
      author: "Sarah Kim, CEO",
      link: "/case-studies/techflow"
    },
    {
      company: "EcoLiving Products",
      industry: "D2C Consumer Goods",
      package: "Market Entry + Operations + Scale Strategy",
      challenge: "Entering saturated eco-products market with limited brand awareness and unclear differentiation strategy. Needed to compete against established players.",
      solution: "Developed focused market entry strategy targeting millennial parents in urban areas, optimized supply chain for 40% cost reduction, created partnership distribution model.",
      results: [
        { metric: "8% Market Share", description: "In year one" },
        { metric: "500+ Retail Locations", description: "Distribution achieved" },
        { metric: "Month 14 Profitability", description: "Ahead of plan" }
      ],
      timeline: "12 months",
      testimonial: "The market sizing and competitive positioning work saved us from making costly mistakes. We captured share faster than we thought possible.",
      author: "Michael Chen, Founder",
      link: "/case-studies/ecoliving"
    },
    {
      company: "PaymentBridge",
      industry: "Fintech",
      package: "Turnaround + PMF Clarity + Fundraising Readiness",
      challenge: "Initial product failing completely. Down to 4 months runway, team morale collapsing, investors losing confidence. Needed rapid turnaround or shutdown.",
      solution: "Emergency diagnostic revealed adjacent opportunity in B2B payments. Executed rapid pivot, rebuilt narrative for investors, restructured metrics dashboard.",
      results: [
        { metric: "10x User Growth", description: "Post-pivot traction" },
        { metric: "$50M Valuation", description: "Series A raised" },
        { metric: "$12M Funding", description: "From skeptical investors" }
      ],
      timeline: "12 months",
      testimonial: "Sarsen's turnaround framework saved our company. They helped us see the pivot opportunity when we were ready to shut down.",
      author: "Priya Sharma, Co-founder",
      link: "/case-studies/paymentbridge"
    }
  ];

  return (
    <section className="bg-[#0A1E3D] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-blue-600/20 rounded-full text-blue-400 text-xs font-medium mb-4">
            SUCCESS STORIES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
            Real Transformations,<br/>
            <span className="text-blue-300">Measurable Results</span>
          </h2>
          <p className="text-blue-200 text-lg max-w-3xl mx-auto">
            See how founders used our consulting packages to navigate critical challenges and achieve breakthrough results.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-[#132B47] to-[#1a3a5c] rounded-xl overflow-hidden border border-blue-800/30 hover:border-blue-700/50 transition-all duration-300 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-blue-800/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-1">{study.company}</h3>
                    <p className="text-blue-300 text-sm">{study.industry}</p>
                  </div>
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                    {study.timeline}
                  </span>
                </div>
                <div className="bg-blue-900/30 rounded-lg p-3">
                  <p className="text-xs text-blue-200 font-medium">PACKAGES USED:</p>
                  <p className="text-sm text-white mt-1">{study.package}</p>
                </div>
              </div>

              {/* Challenge & Solution */}
              <div className="p-6 flex-grow">
                <div className="mb-4">
                  <p className="text-xs text-gray-400 font-medium mb-2">THE CHALLENGE:</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{study.challenge}</p>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-gray-400 font-medium mb-2">OUR SOLUTION:</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{study.solution}</p>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                  {study.results.map((result, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-blue-400 text-lg font-bold mb-1">{result.metric}</p>
                      <p className="text-gray-400 text-xs">{result.description}</p>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="bg-blue-500/10 rounded-lg p-4 mb-4 border-l-4 border-blue-500">
                  <p className="text-sm text-gray-300 italic mb-2">"{study.testimonial}"</p>
                  <p className="text-xs text-blue-300">— {study.author}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-0">
                <Link
                  href={study.link}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Read Full Case Study
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
          >
            <span>View All Case Studies</span>
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
// WHY CHOOSE US SECTION
// Value proposition and differentiation
// =====================================================
const WhyChooseUsSection = () => {
  const reasons = [
    {
      title: "Productized Expertise",
      description: "Battle-tested frameworks refined through 100+ engagements. No generic consulting—every package is designed for specific inflection points.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      )
    },
    {
      title: "Strict Scope Control",
      description: "Fixed deliverables, clear timelines, predictable pricing. No scope creep, no surprise fees, no endless consulting cycles.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      )
    },
    {
      title: "Execution-First Mindset",
      description: "Every engagement ends with a 90-day action plan. We don't just advise—we build roadmaps you can actually execute.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      )
    },
    {
      title: "Founder-Centric Approach",
      description: "Built for founders, not corporates. We understand startup constraints, speed requirements, and the need for decisive action.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      )
    }
  ];

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-4">
            Why Founders Choose<br/>
            <span className="text-blue-700">Sarsen & Company</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Strategic consulting redesigned for the startup world—productized, predictable, and execution-focused.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {reason.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{reason.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{reason.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// =====================================================
// PRICING TRANSPARENCY SECTION
// =====================================================
const PricingTransparencySection = () => {
  return (
    <section className="bg-[#d4dce5] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        
        <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-6">
          Transparent, Predictable Pricing
        </h2>
        <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
          Every package has fixed pricing with no hidden fees. Package 0 (Business Diagnostic & Direction) is mandatory for all first-time clients.
        </p>

        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-light text-gray-800 mb-2">Fixed Scope</div>
              <p className="text-gray-600 text-sm">No scope creep or surprise additions</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-light text-gray-800 mb-2">Fixed Timeline</div>
              <p className="text-gray-600 text-sm">Clear duration for each package</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-light text-gray-800 mb-2">Fixed Price</div>
              <p className="text-gray-600 text-sm">Transparent cost from the start</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg">
            <p className="text-lg mb-2">Ready to get started?</p>
            <p className="text-blue-100 mb-4">Schedule a free consultation to discuss which package fits your needs.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              <span>Schedule Consultation</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

// =====================================================
// FINAL CTA SECTION
// =====================================================
const FinalCTASection = () => {
  return (
    <section className="bg-[#0A1E3D] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        
        <h2 className="text-4xl sm:text-5xl font-light text-white mb-6">
          Your Next Strategic Move<br/>
          <span className="text-blue-300">Starts Here</span>
        </h2>
        
        <p className="text-blue-200 text-xl mb-10 max-w-2xl mx-auto">
          Every successful startup has inflection points. The question is: will you navigate them with clarity or confusion?
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg text-lg"
          >
            <span>Book Free Consultation</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          <Link
            href="#packages"
            className="inline-flex items-center justify-center border-2 border-blue-500 text-blue-300 px-8 py-4 rounded-lg hover:bg-blue-500/10 transition-all duration-300 font-medium"
          >
            <span>Browse All Packages</span>
          </Link>
        </div>

        <p className="mt-6 text-blue-300/70 text-sm">
          Free 45-minute strategy session • No obligation • Confidential
        </p>

      </div>
    </section>
  );
};

// =====================================================
// MAIN SERVICES PAGE COMPONENT
// =====================================================
export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesHero />
      <HowItWorksSection />
      <AllPackagesSection />
      <CaseStudiesSection />
      <WhyChooseUsSection />
      <PricingTransparencySection />
      <FinalCTASection />
    </main>
  );
}