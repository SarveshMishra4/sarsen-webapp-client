// app/work/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head'; // Added for viewport meta

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
    <section className="relative bg-[#0A1E3D] min-h-[520px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

      {/* LEFT: TEXT CONTENT */}
      <div className="max-w-xl">

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-6 leading-tight">
          How We Work With Founders
        </h1>

        {/* Subtitle */}
        <p className="text-md sm:text-xl text-blue-200 font-light leading-relaxed mb-12">
          We don't build dependency. We build clarity. Every engagement is designed to leave founders with executable insight—not vague advice.
        </p>

      </div>

      {/* RIGHT: GRAPHIC / SVG */}
      <div className="relative flex justify-center lg:justify-end">
        <div className="w-full h-80 sm:h-96 lg:h-[450px] max-w-md p-8">

          <img
            src="/assets/work/Work Head.svg"
            alt="How We Work Illustration"
            className="w-full h-full"
          />

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
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 ">
      <div className='max-w-7xl mx-auto'>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 leading-tight mb-6">
        Work on Engagement: Combined Use
      </h2>

      <div className=" text-gray-700 text-lg leading-relaxed">

        <p>
          Most consultants offer either advice or execution. We offer neither in isolation.
        </p>

        <p>
          Our engagements are structured to give you{" "}
          <strong>diagnostic precision</strong>,{" "}
          <strong>strategic direction</strong>, and{" "}
          <strong>execution-ready frameworks</strong>
          —all delivered in a defined timeline with zero scope creep.
        </p>

        <p>
          We combine deep analysis with practical tools. You don't get a hundred-slide deck.
          You get Google Sheets with scoring logic, decision frameworks, and roadmaps you can
          immediately implement.
        </p>

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
              className="bg-white rounded-md p-8 border-2 border-gray-200 hover:border-[#002855] hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-6">

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
            className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${activeTab === 'communication'
              ? 'bg-white text-[#0A1E3D]'
              : 'bg-blue-900/30 text-blue-200 hover:bg-blue-900/50'
              }`}
          >
            Communication & Guidance
          </button>
          <button
            onClick={() => setActiveTab('sector')}
            className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${activeTab === 'sector'
              ? 'bg-white text-[#0A1E3D]'
              : 'bg-blue-900/30 text-blue-200 hover:bg-blue-900/50'
              }`}
          >
            Work by Sector
          </button>
          <button
            onClick={() => setActiveTab('storytelling')}
            className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${activeTab === 'storytelling'
              ? 'bg-white text-[#0A1E3D]'
              : 'bg-blue-900/30 text-blue-200 hover:bg-blue-900/50'
              }`}
          >
            Storytelling & Presentations
          </button>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-md p-8 sm:p-10 lg:p-12 border border-blue-800/30">
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
                  className="bg-white/5 backdrop-blur-sm rounded-md p-6 border border-blue-700/30 hover:border-[#002855] hover:bg-white/10 transition-all duration-300"
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
                  className="bg-white/5 backdrop-blur-sm rounded-md p-6 border border-blue-700/30"
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
              className={`bg-gray-50 rounded-md p-8 border-2 cursor-pointer transition-all duration-300 ${selectedCase === index
                ? 'border-[#002855] shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-md text-md ">
                  {caseStudy.sector}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {caseStudy.title}
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold text-gray-500   mb-1">
                    Challenge
                  </div>
                  <p className="text-gray-700">
                    {caseStudy.challenge}
                  </p>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-500   mb-1">
                    Approach
                  </div>
                  <p className="text-gray-700">
                    {caseStudy.approach}
                  </p>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-500  mb-1">
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
            className="inline-block bg-[#0A1E3D] text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#132B47] transition-all duration-300 shadow-lg"
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

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            How Work Actually Flows
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            Every engagement follows the same five-stage structure. This isn't consulting theater—it's a system designed to deliver clarity in defined time.
          </p>
        </div>

        {/* Process Diagram */}
        <div className="bg-[#002855] rounded-md p-8 sm:p-10 lg:p-12 border-2 border-gray-300 overflow-x-auto">
          <img src="/assets/home/Methedology.svg" alt="" />
        </div>

        <div className="mt-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-md p-8 sm:p-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Why This Structure?
          </h3>
          <p className="text-gray-700 leading-relaxed ">
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
              className="bg-gray-50 rounded-md p-8 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >

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
        <div className="flex flex-col sm:flex-row gap-4 justify-center isolate">

          {/* Primary CTA */}
          <Link
            href="/packages/business-diagnostic"
            className="
      inline-flex
      items-center
      justify-center

      px-8
      py-4
      rounded-md
      font-semibold
      text-lg
      shadow-lg

      bg-white
      text-[#002855]

      transition-all
      duration-300

      hover:bg-black
      hover:text-[#002855]

      !bg-white
      !text-black
    "
          >
            Start With Diagnostic
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/contact#main"
            className="
      inline-flex
      items-center
      justify-center

      px-8
      py-4
      rounded-md
      font-semibold
      text-lg

      border-2
      border-white

      bg-transparent
      text-[#002855]

      transition-all
      duration-300

      hover:bg-white
      hover:text-[#002855]

      !text-white
    "
          >
            Talk to Our Team
          </Link>

        </div>
      </div>
    </section>
  );
};

// =====================================================
// MAIN PAGE COMPONENT (with responsive enhancements)
// =====================================================
export default function WorkPage() {
  return (
    <>
      <Head>
        {/* Viewport meta for proper scaling on mobile devices */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        {/* Optional: ensure touch interactions are optimized */}
        <meta name="format-detection" content="telephone=no" />
      </Head>

      {/* Global style tweaks for ultra-small screens (no changes to components) */}
      <style jsx global>{`
        @media (max-width: 480px) {
          /* Reduce excessive padding on cards and sections */
          .p-8 { padding: 1.5rem; }
          .p-10 { padding: 1.5rem; }
          .p-12 { padding: 1.5rem; }
          .px-8 { padding-left: 1rem; padding-right: 1rem; }
          .py-16 { padding-top: 3rem; padding-bottom: 3rem; }
          .gap-8 { gap: 1.5rem; }
          .text-5xl { font-size: 2.5rem; }
          .text-4xl { font-size: 2rem; }
          .text-3xl { font-size: 1.75rem; }
          .min-h-[520px] { min-height: auto; }
          /* Ensure images never overflow */
          img { max-width: 100%; height: auto; }
        }
        /* Additional touch-friendly adjustments */
        button, a { cursor: pointer; -webkit-tap-highlight-color: transparent; }
      `}</style>

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
    </>
  );
}