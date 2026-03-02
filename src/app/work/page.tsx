// app/work/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// =====================================================
// TYPESCRIPT INTERFACES
// =====================================================
interface CommunicationContent {
  title: string;
  description: string;
  points: Array<{ heading: string; text: string }>;
}

interface SectorContent {
  title: string;
  description: string;
  sectors: Array<{ name: string; description: string }>;
}

interface StorytellingContent {
  title: string;
  description: string;
  points: Array<{ heading: string; text: string }>;
}

type WorkTypeContent = {
  communication: CommunicationContent;
  sector: SectorContent;
  storytelling: StorytellingContent;
};

// =====================================================
// WORK PAGE HERO SECTION
// =====================================================
const WorkHero = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[500px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 border-2 border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            How We Work With Founders
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-blue-200 font-light leading-relaxed mb-12 max-w-3xl">
            We don't build dependency. We build clarity. Every engagement is designed to leave founders with executable insight—not vague advice.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-blue-800/30">
            <div>
              <div className="text-4xl sm:text-5xl font-light text-white mb-2">7</div>
              <div className="text-blue-300 text-sm sm:text-base">Productized Packages</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-light text-white mb-2">12+</div>
              <div className="text-blue-300 text-sm sm:text-base">Industry Sectors</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-light text-white mb-2">100%</div>
              <div className="text-blue-300 text-sm sm:text-base">Clarity-Focused</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// ENGAGEMENT PHILOSOPHY SECTION
// =====================================================
const EngagementPhilosophy = () => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">
              Our Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
              Work on Engagement: Combined Use
            </h2>
            
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Most consultants offer either advice or execution. We offer neither in isolation.
              </p>
              <p>
                Our engagements are structured to give you <strong>diagnostic precision</strong>, <strong>strategic direction</strong>, and <strong>execution-ready frameworks</strong>—all delivered in a defined timeline with zero scope creep.
              </p>
              <p>
                We combine deep analysis with practical tools. You don't get a hundred-slide deck. You get Google Sheets with scoring logic, decision frameworks, and roadmaps you can immediately implement.
              </p>
            </div>
          </div>

          {/* Right: Visual Element */}
          <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center border border-gray-300">
            <div className="text-center text-gray-400 p-8">
              <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <p className="text-sm">Engagement Model<br/>Illustration Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// HOW WE ENGAGE SECTION
// =====================================================
const HowWeEngage = () => {
  const engagementSteps = [
    {
      number: "01",
      title: "Clarity First, Execution Second",
      description: "We never start with solutions. We start by isolating what's actually broken. Most founders confuse symptoms with root causes—we untangle that confusion before prescribing action."
    },
    {
      number: "02",
      title: "Fixed Scope, Fixed Timeline",
      description: "Every package has defined deliverables, timelines, and success metrics. No open-ended consulting. No surprise invoices. You know exactly what you're getting and when."
    },
    {
      number: "03",
      title: "Google Sheets, Not Slide Decks",
      description: "Our deliverables are working documents—spreadsheets with formulas, scoring systems, scenario models. You can edit them, test assumptions, and use them long after we're gone."
    },
    {
      number: "04",
      title: "Transfer of Capability, Not Dependency",
      description: "By the end of every engagement, you understand not just what to do, but why. We teach the logic behind decisions so you can apply the same thinking to future problems."
    }
  ];

  return (
    <section className="bg-[#E8EEF2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <div className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Our Approach
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            How We Engage With Clients
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            Four non-negotiable principles guide every engagement. These aren't marketing claims—they're operational constraints we build into our delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {engagementSteps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
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
// WORK TYPES SECTION (Communication & Guidance, By Sector, Storytelling)
// =====================================================
const WorkTypes = () => {
  const [activeTab, setActiveTab] = useState<'communication' | 'sector' | 'storytelling'>('communication');

  const workTypeContent: WorkTypeContent = {
    communication: {
      title: "Communication & Guidance",
      description: "Clear, honest conversations that cut through founder anxiety and investor pressure.",
      points: [
        {
          heading: "Investor Communication Strategy",
          text: "How to update investors without over-promising. How to frame delays without losing credibility. How to ask for help without appearing incompetent."
        },
        {
          heading: "Internal Team Alignment",
          text: "Getting leadership teams on the same page about priorities, trade-offs, and next steps. Resolving silent disagreements before they become public conflicts."
        },
        {
          heading: "Board Meeting Preparation",
          text: "Structuring board decks that present reality without panic. Anticipating hard questions and preparing honest, defensible answers."
        },
        {
          heading: "Difficult Conversations",
          text: "Letting go of co-founders, pivoting away from early ideas, admitting when something isn't working—these conversations require precision, not motivation."
        }
      ]
    },
    sector: {
      title: "Work by Sector",
      description: "We work across industries, but we don't pretend to know your business better than you. Sector experience helps us ask better questions faster.",
      sectors: [
        { name: "SaaS & B2B Software", description: "Revenue models, churn mechanics, expansion logic" },
        { name: "Fintech & Payments", description: "Unit economics, regulatory constraints, trust signals" },
        { name: "D2C & E-commerce", description: "CAC payback, repeat purchase behavior, inventory risk" },
        { name: "Marketplaces", description: "Liquidity bootstrapping, supply-demand balance, take-rate sustainability" },
        { name: "EdTech & Learning", description: "Outcome measurement, retention drivers, pricing psychology" },
        { name: "HealthTech", description: "Compliance complexity, provider incentives, patient behavior" },
        { name: "DeepTech & Hardware", description: "Capital intensity, technical risk, go-to-market timing" },
        { name: "Consumer Apps", description: "Engagement loops, monetization timing, virality mechanics" },
        { name: "Enterprise Solutions", description: "Sales cycles, procurement hurdles, switching costs" },
        { name: "Logistics & Supply Chain", description: "Network effects, density economics, operational leverage" },
        { name: "AgriTech", description: "Farmer behavior, subsidy dependence, seasonal cash flow" },
        { name: "Climate & Sustainability", description: "Impact measurement, carbon credit economics, regulatory arbitrage" }
      ]
    },
    storytelling: {
      title: "Storytelling & Presentations",
      description: "Founders often confuse storytelling with lying. Good storytelling is precision editing of truth.",
      points: [
        {
          heading: "Pitch Deck Strategy",
          text: "Not about making slides pretty. It's about sequencing information so investors reach the right conclusion before you ask for money."
        },
        {
          heading: "Narrative Structure for Fundraising",
          text: "How to frame the problem, position the solution, and explain traction in a way that minimizes doubt and maximizes urgency."
        },
        {
          heading: "Demo & Product Presentation",
          text: "What to show, what to skip, what to let customers discover themselves. Over-explaining kills deals."
        },
        {
          heading: "Founder Story Positioning",
          text: "Your background isn't random—it should be deliberate proof of why you're uniquely positioned to solve this problem."
        }
      ]
    }
  };

  const currentContent = workTypeContent[activeTab];

  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="text-blue-300 text-sm font-semibold uppercase tracking-wider mb-3">
            Types of Work
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
            What We Do For Clients
          </h2>
          <p className="text-xl text-blue-200 font-light leading-relaxed max-w-3xl">
            Three core areas where founders need structured thinking, not generic advice.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => setActiveTab('communication')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'communication'
                ? 'bg-white text-[#0A1E3D]'
                : 'bg-blue-900/30 text-blue-200 hover:bg-blue-900/50'
            }`}
          >
            Communication & Guidance
          </button>
          <button
            onClick={() => setActiveTab('sector')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'sector'
                ? 'bg-white text-[#0A1E3D]'
                : 'bg-blue-900/30 text-blue-200 hover:bg-blue-900/50'
            }`}
          >
            Work by Sector
          </button>
          <button
            onClick={() => setActiveTab('storytelling')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'storytelling'
                ? 'bg-white text-[#0A1E3D]'
                : 'bg-blue-900/30 text-blue-200 hover:bg-blue-900/50'
            }`}
          >
            Storytelling & Presentations
          </button>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-2xl p-8 sm:p-10 lg:p-12 border border-blue-800/30">
          <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">
            {currentContent.title}
          </h3>
          <p className="text-blue-200 text-lg mb-8 leading-relaxed">
            {currentContent.description}
          </p>

          {/* Conditional rendering based on tab */}
          {activeTab === 'sector' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(currentContent as SectorContent).sectors.map((sector, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-700/30 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300"
                >
                  <h4 className="text-white font-semibold text-lg mb-2">
                    {sector.name}
                  </h4>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    {sector.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {(currentContent as CommunicationContent | StorytellingContent).points.map((point, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-700/30"
                >
                  <h4 className="text-white font-semibold text-xl mb-3">
                    {point.heading}
                  </h4>
                  <p className="text-blue-200 leading-relaxed">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
// =====================================================
// CASE STUDY APPROACH SECTION
// =====================================================
const CaseStudyApproach = () => {
  const [selectedCase, setSelectedCase] = useState(0);

  const caseStudies = [
    {
      title: "SaaS Startup Facing Churn Crisis",
      challenge: "30% monthly churn, unclear why customers were leaving",
      approach: "Ran retention cohort analysis, interviewed churned users, mapped usage patterns against successful accounts",
      outcome: "Identified onboarding gap and feature confusion. Churn dropped to 8% in 90 days.",
      sector: "B2B SaaS"
    },
    {
      title: "D2C Brand Struggling with CAC",
      challenge: "Customer acquisition cost exceeded customer lifetime value",
      approach: "Rebuilt pricing strategy, tested retention mechanics, restructured repeat purchase incentives",
      outcome: "LTV:CAC ratio improved from 1.2 to 3.8 within 6 months",
      sector: "E-commerce"
    },
    {
      title: "Marketplace with Supply-Side Problem",
      challenge: "Growing demand, but supply couldn't scale",
      approach: "Redesigned supply onboarding, tested incentive structures, built better matching logic",
      outcome: "Supply grew 4x in 3 months without diluting quality",
      sector: "Marketplace"
    },
    {
      title: "Fintech Preparing for Series A",
      challenge: "Strong product, weak narrative for investors",
      approach: "Restructured pitch deck, clarified unit economics story, prepared for hard questions",
      outcome: "Closed Series A at higher valuation than expected",
      sector: "Fintech"
    }
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Real Work
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            How We Actually Help
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            These aren't polished success stories. They're simplified versions of real engagements where the work was messy, uncertain, and required discipline.
          </p>
        </div>

        {/* Case Study Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <div 
              key={index}
              onClick={() => setSelectedCase(index)}
              className={`bg-gray-50 rounded-xl p-8 border-2 cursor-pointer transition-all duration-300 ${
                selectedCase === index 
                  ? 'border-blue-500 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                  {caseStudy.sector}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {caseStudy.title}
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Challenge
                  </div>
                  <p className="text-gray-700">
                    {caseStudy.challenge}
                  </p>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Approach
                  </div>
                  <p className="text-gray-700">
                    {caseStudy.approach}
                  </p>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Outcome
                  </div>
                  <p className="text-gray-900 font-medium">
                    {caseStudy.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Every client situation is different. These examples show the structure, not a template.
          </p>
          <Link 
            href="/contact#main"
            className="inline-block bg-[#0A1E3D] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#132B47] transition-all duration-300 shadow-lg"
          >
            Discuss Your Situation
          </Link>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// OUR PROCESS SECTION
// =====================================================
const OurProcess = () => {
  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12 sm:mb-16">
          <div className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Our Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            How Work Actually Flows
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            Every engagement follows the same five-stage structure. This isn't consulting theater—it's a system designed to deliver clarity in defined time.
          </p>
        </div>

        {/* Process Diagram */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 lg:p-12 border-2 border-gray-300 overflow-x-auto">
          <svg 
            viewBox="0 0 1200 400" 
            className="w-full h-auto min-w-[800px]"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Horizontal Line */}
            <line x1="100" y1="200" x2="1100" y2="200" stroke="#0A1E3D" strokeWidth="3" strokeLinecap="round" />

            {/* Step 1: Discovery */}
            <g>
              <line x1="150" y1="180" x2="150" y2="220" stroke="#0A1E3D" strokeWidth="2" />
              <circle cx="150" cy="200" r="40" fill="rgba(10, 30, 61, 0.1)" stroke="#0A1E3D" strokeWidth="3" />
              <circle cx="150" cy="200" r="25" fill="rgba(10, 30, 61, 0.3)" />
              <text x="150" y="210" textAnchor="middle" fill="#0A1E3D" fontSize="24" fontWeight="bold">1</text>
              <text x="150" y="130" textAnchor="middle" fill="#374151" fontSize="16" fontWeight="600">DISCOVERY</text>
              <text x="150" y="280" textAnchor="middle" fill="#6B7280" fontSize="13">Understand the</text>
              <text x="150" y="300" textAnchor="middle" fill="#6B7280" fontSize="13">actual problem</text>
            </g>

            {/* Step 2: Diagnosis */}
            <g>
              <line x1="325" y1="180" x2="325" y2="220" stroke="#0A1E3D" strokeWidth="2" />
              <circle cx="325" cy="200" r="45" fill="rgba(10, 30, 61, 0.15)" stroke="#0A1E3D" strokeWidth="3" />
              <circle cx="325" cy="200" r="28" fill="rgba(10, 30, 61, 0.35)" />
              <text x="325" y="210" textAnchor="middle" fill="#0A1E3D" fontSize="24" fontWeight="bold">2</text>
              <text x="325" y="130" textAnchor="middle" fill="#374151" fontSize="16" fontWeight="600">DIAGNOSIS</text>
              <text x="325" y="280" textAnchor="middle" fill="#6B7280" fontSize="13">Isolate root</text>
              <text x="325" y="300" textAnchor="middle" fill="#6B7280" fontSize="13">causes</text>
            </g>

            {/* Step 3: Strategy (Larger) */}
            <g>
              <line x1="550" y1="170" x2="550" y2="230" stroke="#0A1E3D" strokeWidth="2" />
              <circle cx="550" cy="200" r="55" fill="rgba(10, 30, 61, 0.2)" stroke="#0A1E3D" strokeWidth="4" />
              <circle cx="550" cy="200" r="35" fill="rgba(10, 30, 61, 0.4)" />
              <text x="550" y="212" textAnchor="middle" fill="#0A1E3D" fontSize="28" fontWeight="bold">3</text>
              <text x="550" y="120" textAnchor="middle" fill="#0A1E3D" fontSize="18" fontWeight="700">STRATEGY</text>
              <text x="550" y="290" textAnchor="middle" fill="#6B7280" fontSize="13">Design execution-</text>
              <text x="550" y="310" textAnchor="middle" fill="#6B7280" fontSize="13">ready roadmap</text>
            </g>

            {/* Step 4: Delivery */}
            <g>
              <line x1="775" y1="180" x2="775" y2="220" stroke="#0A1E3D" strokeWidth="2" />
              <circle cx="775" cy="200" r="45" fill="rgba(10, 30, 61, 0.15)" stroke="#0A1E3D" strokeWidth="3" />
              <circle cx="775" cy="200" r="28" fill="rgba(10, 30, 61, 0.35)" />
              <text x="775" y="210" textAnchor="middle" fill="#0A1E3D" fontSize="24" fontWeight="bold">4</text>
              <text x="775" y="130" textAnchor="middle" fill="#374151" fontSize="16" fontWeight="600">DELIVERY</text>
              <text x="775" y="280" textAnchor="middle" fill="#6B7280" fontSize="13">Hand over</text>
              <text x="775" y="300" textAnchor="middle" fill="#6B7280" fontSize="13">documents & tools</text>
            </g>

            {/* Step 5: Support */}
            <g>
              <line x1="1000" y1="180" x2="1000" y2="220" stroke="#0A1E3D" strokeWidth="2" />
              <circle cx="1000" cy="200" r="40" fill="rgba(10, 30, 61, 0.1)" stroke="#0A1E3D" strokeWidth="3" />
              <circle cx="1000" cy="200" r="25" fill="rgba(10, 30, 61, 0.3)" />
              <text x="1000" y="210" textAnchor="middle" fill="#0A1E3D" fontSize="24" fontWeight="bold">5</text>
              <text x="1000" y="130" textAnchor="middle" fill="#374151" fontSize="16" fontWeight="600">SUPPORT</text>
              <text x="1000" y="280" textAnchor="middle" fill="#6B7280" fontSize="13">Follow-up for</text>
              <text x="1000" y="300" textAnchor="middle" fill="#6B7280" fontSize="13">implementation</text>
            </g>

            {/* Arrow at end */}
            <path d="M 1090 200 L 1110 190 L 1110 210 Z" fill="#0A1E3D" />
          </svg>
        </div>

        <div className="mt-12 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-xl p-8 sm:p-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Why This Structure?
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most consulting engagements fail because scope expands, timelines drift, and deliverables become vague. Our process is rigid by design.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You always know where you are, what's next, and when things will be delivered. No surprise extensions. No "just one more thing." Clarity requires constraints.
          </p>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// WHAT YOU GET SECTION
// =====================================================
const WhatYouGet = () => {
  const deliverables = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Working Documents, Not Presentations",
      description: "Google Sheets with formulas. Excel models you can edit. Frameworks you can reuse. No PDF tombstones."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Executable Action Plans",
      description: "Not recommendations. Actual next steps with owners, timelines, and decision criteria."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: "Decision Frameworks You Can Reuse",
      description: "Logic you can apply to future problems. Not just answers to today's questions."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Honest Assessment, Not False Hope",
      description: "If something won't work, we say so. If a path is risky, we quantify it. No motivational fluff."
    }
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12 sm:mb-16">
          <div className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Deliverables
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            What You Actually Get
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            Not vague advice. Not motivational speeches. Not dependency. You get tools, clarity, and confidence to execute independently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {deliverables.map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =====================================================
// FOOTER CTA
// =====================================================
const WorkFooterCTA = () => {
  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
          Ready to Start?
        </h2>
        <p className="text-xl text-blue-200 font-light mb-10 leading-relaxed">
          Every engagement begins with the Business Diagnostic & Direction Package. It's compulsory because clarity must come before execution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/packages/business-diagnostic"
            className="inline-block bg-white text-[#0A1E3D] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
          >
            Start With Diagnostic
          </Link>
          <Link
            href="/contact#main"
            className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#0A1E3D] transition-all duration-300"
          >
            Talk to Our Team
          </Link>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// MAIN PAGE COMPONENT
// =====================================================
export default function WorkPage() {
  return (
    <main className="min-h-screen">
      <WorkHero />
      <EngagementPhilosophy />
      <HowWeEngage />
      <WorkTypes />
      <CaseStudyApproach />
      <OurProcess />
      <WhatYouGet />
      <WorkFooterCTA />
    </main>
  );
}