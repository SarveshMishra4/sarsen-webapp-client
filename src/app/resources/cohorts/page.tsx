// app/cohorts/page.tsx - PART 1 OF 2
// Copy this first, then immediately copy Part 2 below it
'use client';

import React, { useState } from 'react';

// =====================================================
// HERO SECTION COMPONENT
// =====================================================
const CohortsHero = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[500px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
            Strategic Cohorts for Business Leaders
          </h1>
          <p className="text-xl sm:text-2xl text-blue-300 font-light leading-relaxed mb-8">
            Intensive, hands-on learning experiences where your real business problems get solved—live.
          </p>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            No theoretical frameworks. No generic advice. Just practical solutions to your specific challenges, developed collaboratively with fellow entrepreneurs and business professionals building a better tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// WHAT MAKES US DIFFERENT SECTION
// =====================================================
const WhatMakesDifferentSection = () => {
  const features = [
    {
      title: "Your Problems, Solved Live",
      description: "Submit your real business challenges before the cohort. We tackle them live during sessions with actionable frameworks and immediate next steps.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Limited to 25 Members",
      description: "Small cohorts ensure everyone gets personalized attention, meaningful interactions, and the space to ask questions without getting lost in the crowd.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Bi-Weekly Focused Topics",
      description: "Every two weeks, a new cohort tackles one critical business challenge—Go-to-Market, Product-Market Fit, Revenue Strategy, or Fundraising.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Peer-to-Peer Learning",
      description: "Learn from fellow entrepreneurs and business leaders facing similar challenges. The collective wisdom in the room often surpasses any individual expert.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: "Actionable Frameworks",
      description: "Walk away with templates, models, and step-by-step processes you can implement immediately. Theory is worthless without execution.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Expert Facilitation",
      description: "Led by seasoned strategists who've worked with startups to enterprises. Real experience, not just consultants regurgitating frameworks.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-4 leading-tight">
            Like No Other Cohort Experience
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Designed for business professionals and entrepreneurs who need real solutions, not motivational speeches.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#0A1E3D] transition-colors mb-2 leading-tight">
                    {feature.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// =====================================================
// FEATURED COHORT SECTION (NEXT UPCOMING)
// =====================================================
const FeaturedCohortSection = () => {
  const featuredCohort = {
    title: "Go-to-Market Strategy Intensive",
    subtitle: "Build Your Customer Acquisition Engine",
    startDate: "January 15, 2026",
    duration: "4 weeks • 8 live sessions",
    format: "Online • Tuesdays & Thursdays, 7-9 PM IST",
    seatsTotal: 25,
    seatsBooked: 18,
    price: "₹24,999",
    description: "Master the art of bringing products to market with predictable, scalable customer acquisition. This cohort is designed for founders and business leaders launching new products or entering new markets.",
    whatYouLearn: [
      "Customer segmentation and ICP (Ideal Customer Profile) definition",
      "Channel selection and prioritization framework",
      "Messaging and positioning that resonates",
      "Launch sequencing and timeline planning",
      "Metrics that actually matter for GTM success",
      "Budget allocation across channels",
      "Building repeatable sales processes",
      "Creating customer acquisition playbooks"
    ],
    whoShouldJoin: [
      "Founders launching new products or features",
      "Business leaders entering new markets",
      "Product managers transitioning to growth roles",
      "Entrepreneurs with product-market fit seeking scale",
      "Marketing leaders building acquisition strategies"
    ]
  };

  const seatsRemaining = featuredCohort.seatsTotal - featuredCohort.seatsBooked;
  const percentageFilled = (featuredCohort.seatsBooked / featuredCohort.seatsTotal) * 100;

  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 bg-blue-600/20 rounded-full text-blue-400 text-xs font-medium mb-4">
            NEXT COHORT • STARTING SOON
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-2 leading-tight">
            {featuredCohort.title}
          </h2>
          <p className="text-xl text-blue-300 font-light">
            {featuredCohort.subtitle}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-2xl p-8 sm:p-10 lg:p-12 border border-blue-800/30 shadow-2xl">
            
            {/* Cohort Details Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 pb-8 border-b border-blue-700/30">
              <div>
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Start Date</div>
                <div className="text-white text-lg font-medium">{featuredCohort.startDate}</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Duration</div>
                <div className="text-white text-lg font-medium">{featuredCohort.duration}</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Format</div>
                <div className="text-white text-lg font-medium">{featuredCohort.format}</div>
              </div>
            </div>

            {/* Seats Availability */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <div className="text-gray-300 text-sm">Seats Available</div>
                <div className="text-white font-medium">
                  {seatsRemaining} of {featuredCohort.seatsTotal} remaining
                </div>
              </div>
              <div className="w-full bg-blue-900/30 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentageFilled}%` }}
                />
              </div>
              {seatsRemaining <= 5 && (
                <div className="mt-2 text-yellow-400 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  <span>Only {seatsRemaining} seats left!</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-300 text-base leading-relaxed">
                {featuredCohort.description}
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              
              {/* What You'll Learn */}
              <div>
                <h3 className="text-xl font-medium text-white mb-4 pb-3 border-b border-blue-700/30">
                  What You'll Learn
                </h3>
                <ul className="space-y-3">
                  {featuredCohort.whatYouLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                      <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who Should Join */}
              <div>
                <h3 className="text-xl font-medium text-white mb-4 pb-3 border-b border-blue-700/30">
                  Who Should Join
                </h3>
                <ul className="space-y-3">
                  {featuredCohort.whoShouldJoin.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                      <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-blue-700/30">
              <div>
                <div className="text-gray-400 text-sm mb-1">Investment</div>
                <div className="text-3xl font-light text-white">{featuredCohort.price}</div>
                <div className="text-gray-400 text-xs">One-time payment • Lifetime access to materials</div>
              </div>
              <button className="bg-white text-[#0A1E3D] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-lg text-lg whitespace-nowrap">
                Reserve Your Seat
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

// CONTINUE TO PART 2...
// app/cohorts/page.tsx - PART 2 OF 2
// This continues directly from Part 1 - paste this immediately after Part 1

// =====================================================
// UPCOMING COHORTS SECTION
// =====================================================
const UpcomingCohortsSection = () => {
  const upcomingCohorts = [
    {
      title: "Product-Market Fit Diagnostics",
      subtitle: "Validate Demand & Achieve Sustainable PMF",
      startDate: "January 29, 2026",
      duration: "3 weeks • 6 live sessions",
      seatsTotal: 25,
      seatsBooked: 12,
      price: "₹19,999",
      focusAreas: ["Demand signal validation", "Customer feedback systems", "PMF metrics", "Iteration frameworks"]
    },
    {
      title: "Revenue Growth Acceleration",
      subtitle: "Scale Revenue Without Proportional Cost Increase",
      startDate: "February 12, 2026",
      duration: "4 weeks • 8 live sessions",
      seatsTotal: 25,
      seatsBooked: 5,
      price: "₹24,999",
      focusAreas: ["Revenue diversification", "Pricing optimization", "Upsell/cross-sell strategies", "Retention mechanics"]
    },
    {
      title: "Fundraising Readiness",
      subtitle: "Prepare for Capital Raising Success",
      startDate: "February 26, 2026",
      duration: "3 weeks • 6 live sessions",
      seatsTotal: 20,
      seatsBooked: 8,
      price: "₹22,999",
      focusAreas: ["Pitch deck mastery", "Financial modeling", "Investor targeting", "Due diligence prep"]
    },
    {
      title: "Operations & Efficiency Optimization",
      subtitle: "Build Systems That Scale",
      startDate: "March 12, 2026",
      duration: "4 weeks • 8 live sessions",
      seatsTotal: 25,
      seatsBooked: 3,
      price: "₹24,999",
      focusAreas: ["Process mapping", "Bottleneck elimination", "Automation strategies", "Performance dashboards"]
    },
    {
      title: "Strategic Planning & Execution",
      subtitle: "Align Teams, Capital & Direction",
      startDate: "March 26, 2026",
      duration: "4 weeks • 8 live sessions",
      seatsTotal: 25,
      seatsBooked: 7,
      price: "₹26,999",
      focusAreas: ["Multi-year roadmaps", "OKR frameworks", "Resource allocation", "Accountability systems"]
    },
    {
      title: "Customer Acquisition Mastery",
      subtitle: "Build Predictable Growth Engines",
      startDate: "April 9, 2026",
      duration: "4 weeks • 8 live sessions",
      seatsTotal: 25,
      seatsBooked: 0,
      price: "₹24,999",
      focusAreas: ["Channel strategy", "CAC optimization", "Conversion funnels", "Retention loops"]
    }
  ];

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-4 leading-tight">
            Upcoming Cohorts
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            New cohorts every two weeks. Choose the challenge you're facing right now and join a focused learning experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingCohorts.map((cohort, index) => {
            const seatsRemaining = cohort.seatsTotal - cohort.seatsBooked;
            const percentageFilled = (cohort.seatsBooked / cohort.seatsTotal) * 100;
            const isAlmostFull = seatsRemaining <= 5;

            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-medium text-gray-900 group-hover:text-[#0A1E3D] transition-colors mb-2 leading-tight">
                      {cohort.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {cohort.subtitle}
                    </p>
                  </div>

                  <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Starts {cohort.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{cohort.duration}</span>
                    </div>
                  </div>

                  {/* Focus Areas */}
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-700 mb-2">Key Focus Areas:</div>
                    <div className="flex flex-wrap gap-2">
                      {cohort.focusAreas.map((area, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Seats Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-gray-600">Seats Available</div>
                      <div className="text-xs font-medium text-gray-900">
                        {seatsRemaining} of {cohort.seatsTotal}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentageFilled}%` }}
                      />
                    </div>
                    {isAlmostFull && (
                      <div className="mt-1 text-xs text-yellow-600 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                        <span>Almost full!</span>
                      </div>
                    )}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-2xl font-light text-gray-900">{cohort.price}</div>
                      <div className="text-xs text-gray-500">Per person</div>
                    </div>
                    <button className="bg-[#0A1E3D] text-white px-6 py-3 rounded-lg hover:bg-[#132B47] transition-colors font-medium text-sm">
                      Book Seat
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// =====================================================
// HOW IT WORKS SECTION
// =====================================================
const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Your Cohort",
      description: "Select the cohort that matches your current business challenge. Review the curriculum and ensure timing works for you."
    },
    {
      number: "02",
      title: "Reserve Your Seat",
      description: "Secure your spot with payment. Cohorts are limited to 5-25 members to ensure quality interactions and personalized attention."
    },
    {
      number: "03",
      title: "Submit Your Challenge",
      description: "Before the cohort starts, submit your specific business problem or challenge. This ensures we address real issues, not hypotheticals."
    },
    {
      number: "04",
      title: "Attend Live Sessions",
      description: "Join interactive sessions where we tackle submitted problems live. Ask questions, contribute insights, and learn from peers."
    },
    {
      number: "05",
      title: "Implement & Iterate",
      description: "Apply frameworks and strategies immediately. Get feedback during the cohort and refine your approach based on results."
    },
    {
      number: "06",
      title: "Continued Access",
      description: "Lifetime access to session recordings, templates, frameworks, and cohort community. The learning doesn't stop when sessions end."
    }
  ];

  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
            How Cohorts Work
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            A straightforward process designed to maximize learning and minimize friction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-lg p-6 border border-blue-800/30 hover:border-blue-700/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-full flex items-center justify-center text-white font-medium shadow-lg">
                {step.number}
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// =====================================================
// FAQ SECTION
// =====================================================
const CohortsFAQSection = () => {
  const faqs = [
    {
      question: "What if I can't attend all live sessions?",
      answer: "All sessions are recorded and available for lifetime access. However, we strongly encourage live attendance as the real-time problem-solving and peer interactions are where the magic happens."
    },
    {
      question: "Can I join multiple cohorts?",
      answer: "Absolutely! Many members join multiple cohorts to tackle different challenges. We offer bundle discounts for those enrolling in 2 or more cohorts."
    },
    {
      question: "What if the cohort doesn't meet minimum enrollment?",
      answer: "We require a minimum of 5 members to run a cohort. If we don't reach the minimum, we'll offer you a full refund or the option to transfer to another cohort."
    },
    {
      question: "How technical do I need to be?",
      answer: "Not at all. These cohorts are designed for business professionals and entrepreneurs, not engineers. We focus on strategy, frameworks, and execution—not technical implementation."
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes. If you attend the first session and feel it's not the right fit, we offer a full refund within 48 hours of the first session. No questions asked."
    },
    {
      question: "Will my problems be kept confidential?",
      answer: "Yes. All cohort members sign a confidentiality agreement. What's discussed in the cohort stays in the cohort. We take privacy seriously."
    }
  ];

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-4 leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
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
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
          Ready to Solve Your Business Challenge?
        </h2>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          Join a community of ambitious entrepreneurs and business leaders who are building a better tomorrow—one solved problem at a time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button className="bg-white text-[#0A1E3D] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-lg">
            Browse All Cohorts
          </button>
          
          <a  href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
          >
            <span>Have Questions?</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
        </div>

        <div className="pt-8 border-t border-blue-700/30">
          <p className="text-gray-400 text-sm">
            Need a custom cohort for your team?{' '}
            <a href="mailto:cohorts@sarsenandcompany.com" className="text-blue-400 hover:text-blue-300 underline">
              cohorts@sarsenandcompany.com
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};

// =====================================================
// MAIN COHORTS PAGE COMPONENT
// =====================================================
export default function CohortsPage() {
  return (
    <main className="min-h-screen">
      <CohortsHero />
      <WhatMakesDifferentSection />
      <FeaturedCohortSection />
      <UpcomingCohortsSection />
      <HowItWorksSection />
      <CohortsFAQSection />
      <FinalCTASection />
    </main>
  );
}