// app/about/page.tsx
'use client';

import React, { useState } from 'react';

// =====================================================
// HERO SECTION COMPONENT
// =====================================================
const AboutHero = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[500px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight">
                About Us
              </h1>
              <p className="text-xl sm:text-2xl text-blue-300 font-light leading-relaxed">
                Strategic diagnostics and execution-ready thinking for founders operating under real constraints.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span className="text-sm sm:text-base">
                  Diagnostic-first strategy for founder-led and growth-stage businesses
                </span>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span className="text-sm sm:text-base">
                  Quantitative, constraint-aware analysis focused on decision-critical outcomes
                </span>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span className="text-sm sm:text-base">
                  No generic advisory — only structured thinking that translates into execution
                </span>
              </div>
            </div>
          </div>

          <div className="relative h-80 sm:h-96 lg:h-[450px] flex items-center justify-center lg:justify-end">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full max-w-lg h-full bg-gradient-to-br from-blue-900/20 to-transparent rounded-lg flex items-center justify-center border border-blue-800/30">
                <div className="text-center text-blue-400/50 p-8">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <p className="text-sm">
                    Strategic Diagnostics<br />Illustration Placeholder
                  </p>
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
// WHY WE EXIST SECTION
// =====================================================
const WhyWeExistSection = () => {
  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-6 leading-tight">
            Why We Exist
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Growth-stage businesses face decisions that are irreversible, capital-intensive, and time-bound. 
            Yet many founders are forced to rely on advice that is generic, surface-level, and detached from 
            the realities of operating under real constraints.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white rounded-lg shadow-lg p-8 sm:p-10 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-gray-800 mb-4">The Problem</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Most advisory firms rely on standardized frameworks and recycled playbooks. The output often 
              looks polished, but fails to account for context, constraints, and execution realities.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Founders do not need theoretical advice. They need decision-grade analysis that clarifies trade-offs, 
              highlights risks, and supports actions that can actually be executed.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 sm:p-10 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-[#2B7AB8] to-[#3A8BC8] rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-gray-800 mb-4">Our Solution</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We exist to address this gap through a diagnostic-first approach. Every engagement begins with 
              understanding how the business actually works—financially, operationally, and strategically.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We do not position ourselves as passive advisors. We work alongside founders to structure 
              decisions using data, analysis, and a clear understanding of second-order effects.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-2xl p-8 sm:p-10 lg:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-light mb-4">Our Core Belief</h3>
            <p className="text-lg sm:text-xl leading-relaxed opacity-95">
              Strategy is not storytelling. It is the disciplined process of making informed decisions under 
              uncertainty. Every recommendation we deliver is grounded in evidence, quantitative reasoning, 
              and a clear view of what can realistically be executed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


// =====================================================
// MISSION & VISION SECTION
// =====================================================
const MissionVisionSection = () => {
  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Mission */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 sm:p-10 lg:p-12 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-light text-white">Our Mission</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              To empower growth-stage businesses with strategic clarity through diagnostic rigor, quantitative 
              analysis, and fact-based insights that drive sustainable competitive advantage.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span className="text-gray-300 text-sm sm:text-base">Deliver actionable strategies grounded in market realities</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span className="text-gray-300 text-sm sm:text-base">Replace generic advice with data-driven recommendations</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span className="text-gray-300 text-sm sm:text-base">Partner with founders to navigate complex strategic decisions</span>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 sm:p-10 lg:p-12 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-light text-white">Our Vision</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              To become the most trusted strategic partner for India's growth-stage businesses, known for our 
              unwavering commitment to diagnostic excellence and measurable business impact.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span className="text-gray-300 text-sm sm:text-base">Set the standard for evidence-based strategic consulting</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span className="text-gray-300 text-sm sm:text-base">Build long-term partnerships with visionary founders</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span className="text-gray-300 text-sm sm:text-base">Redefine what strategic consulting means for modern businesses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// OUR THESIS / METHODOLOGY SECTION
// =====================================================
const ThesisSection = () => {
  const principles = [
    {
      title: 'Diagnostic',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      description:
        'Every engagement begins with diagnosis, not assumptions. We first establish how the business actually works—where value is created, where it leaks, and which constraints truly matter—before any strategy is proposed.',
      highlights: [
        'End-to-end business model and market diagnostics',
        'Competitive positioning and strategic disadvantage analysis',
        'Customer segmentation and value-driver mapping',
        'Operational bottleneck and capability assessments'
      ]
    },
    {
      title: 'Dividend-Driven',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      description:
        'We do not optimise for elegant strategy documents. We optimise for outcomes. Every recommendation is evaluated against its ability to produce measurable dividends—revenue growth, margin improvement, risk reduction, or execution speed.',
      highlights: [
        'Explicit ROI logic for every strategic initiative',
        'Scenario-based growth and downside modeling',
        'Clear success metrics and decision thresholds',
        'Execution roadmaps tied to milestones, not timelines'
      ]
    },
    {
      title: 'Quantitative',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      description:
        'Our work is anchored in numbers, not narratives. We use financial models, market data, and sensitivity analysis to stress-test decisions and expose second-order effects before they become expensive mistakes.',
      highlights: [
        'Market sizing and revenue build-up models',
        'Unit economics, contribution margins, and LTV analysis',
        'Scenario and sensitivity testing for key assumptions',
        'Data-backed prioritisation of strategic options'
      ]
    },
    {
      title: 'Fact-Based',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description:
        'We avoid generic frameworks and unverified assumptions. Every insight is supported by evidence drawn from primary research, market data, and observed operating realities.',
      highlights: [
        'Primary research including customer and operator interviews',
        'Competitive and industry benchmarking',
        'Regulatory, pricing, and market-structure analysis',
        'Evidence-backed best-practice validation'
      ]
    }
  ];

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-6 leading-tight">
            Our Strategic Thesis
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our work is guided by a clear thesis: strategy should reduce uncertainty, clarify trade-offs, 
            and enable decisive action under real-world constraints.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 sm:p-10 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                  {principle.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-gray-800 mb-2">
                    {principle.title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {principle.description}
              </p>

              <div className="space-y-2">
                {principle.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    <span className="text-sm text-gray-600 leading-tight">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-2xl p-8 sm:p-10 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-light text-white mb-6 text-center">
              What Sets Us Apart
            </h3>
            <div className="grid sm:grid-cols-2 gap-6 text-white">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <div>
                  <p className="font-medium mb-1">No Generic Frameworks</p>
                  <p className="text-sm text-white/90">
                    Every engagement is structured from first principles
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <div>
                  <p className="font-medium mb-1">Context-Aware Strategy</p>
                  <p className="text-sm text-white/90">
                    Decisions shaped by capital, timing, and execution realities
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <div>
                  <p className="font-medium mb-1">Founder-Aligned Execution</p>
                  <p className="text-sm text-white/90">
                    We work alongside decision-makers, not around them
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <div>
                  <p className="font-medium mb-1">Decision-Grade Output</p>
                  <p className="text-sm text-white/90">
                    Clear trade-offs, quantified risk, and actionable next steps
                  </p>
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
// TEAM SECTION
// =====================================================
const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Rajesh Kumar',
      role: 'Founding Partner',
      expertise: 'Market Strategy & Growth',
      bio: '15+ years in strategy consulting with focus on growth-stage technology companies. Previously led strategic initiatives at leading consulting firms.',
      image: null
    },
    {
      name: 'Priya Sharma',
      role: 'Partner, Analytics',
      expertise: 'Quantitative Analysis & Research',
      bio: 'Expert in market research and financial modeling. Former investment analyst with deep experience in startup valuation and market sizing.',
      image: null
    },
    {
      name: 'Arjun Mehta',
      role: 'Partner, Operations',
      expertise: 'Business Operations & Scaling',
      bio: 'Operational strategist with track record of helping 50+ startups scale efficiently. Background in process optimization and organizational design.',
      image: null
    },
    {
      name: 'Ananya Iyer',
      role: 'Senior Consultant',
      expertise: 'Sector Research & Competitive Intelligence',
      bio: 'Specialist in sector-specific analysis and competitive strategy. Published researcher on Indian startup ecosystem trends and dynamics.',
      image: null
    }
  ];

  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
            Our Team
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A team of strategic thinkers, analysts, and operators committed to delivering excellence 
            in every engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="aspect-square bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] flex items-center justify-center">
                <div className="text-center text-white/50">
                  <svg className="w-20 h-20 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <p className="text-xs">Team Member<br/>Photo</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-white mb-1">{member.name}</h3>
                <p className="text-blue-300 text-sm mb-2">{member.role}</p>
                <p className="text-blue-200 text-xs font-medium mb-3 pb-3 border-b border-white/10">
                  {member.expertise}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 sm:p-10 lg:p-12 border border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-light text-white mb-6">
              Join Our Team
            </h3>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
              We're always looking for exceptional strategists, analysts, and consultants who share 
              our commitment to diagnostic rigor and measurable impact. If you're passionate about 
              helping growth-stage businesses succeed, we'd love to hear from you.
            </p>
            <button className="bg-white text-[#0A1E3D] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-lg inline-flex items-center justify-center gap-2 group">
              <span>View Open Positions</span>
              
            </button>
          </div>
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
        <div className="bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            <div className="p-8 sm:p-10 lg:p-12">
              <h2 className="text-3xl sm:text-4xl text-white font-light mb-4 ">
                Start with a Strategic Diagnostic
              </h2>
              <p className="text-white/90 text-base sm:text-lg mb-8">
                We do not offer free calls or exploratory conversations. Every engagement begins with a paid
                strategic diagnostic designed to clarify your situation, surface real constraints, and define
                decision-ready next steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-[#0A1E3D] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-lg inline-flex items-center justify-center gap-2 group">
                  <span>Initiate Diagnostic Engagement</span>
                  
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-medium inline-flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Formal Inquiry</span>
                </button>
              </div>
            </div>

            <div className="relative h-64 sm:h-80 lg:h-96 p-8 flex items-center justify-center">
              <div className="w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-sm opacity-90">
                    Serious Decisions<br />Begin with Clarity
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Email</h3>
            <p className="text-sm text-gray-600">contact@yourfirm.com</p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2B7AB8] to-[#3A8BC8] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Phone</h3>
            <p className="text-sm text-gray-600">+91 98765 43210</p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="w-12 h-12 bg-gradient-to-br from-[#3A8BC8] to-[#4A9CD8] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Location</h3>
            <p className="text-sm text-gray-600">Mumbai, India</p>
          </div>
        </div>
      </div>
    </section>
  );
};


// =====================================================
// MAIN ABOUT PAGE COMPONENT
// =====================================================
export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <WhyWeExistSection />
      <ThesisSection />
      <TeamSection />
      <CTASection />
    </main>
  );
}