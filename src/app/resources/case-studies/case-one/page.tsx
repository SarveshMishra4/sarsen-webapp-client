'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// =====================================================
// INDIVIDUAL CASE STUDY PAGE
// This page tells a compelling case study story while
// subconsciously positioning our Diagnostic Strategy 
// & Direction program as the solution founders need.
// 
// Strategy: Show real transformation, then connect it
// to our systematic approach that made it possible.
// =====================================================

// =====================================================
// HERO SECTION - CASE STUDY HEADER
// Immediately establish credibility with real results
// =====================================================
const CaseStudyHero = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[600px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
            <span>/</span>
            <Link href="/resources#case-studies" className="hover:text-white transition-colors">Case Studies</Link>
            <span>/</span>
            <span className="text-white">TechFlow Analytics</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Case Study Title & Overview */}
          <div className="space-y-6">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full mb-4">
                B2B SaaS • Series A Success
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
                From Pre-Revenue Uncertainty to $2M ARR in 18 Months
              </h1>
              
              <p className="text-xl text-blue-200 font-light leading-relaxed">
                How TechFlow Analytics transformed from a directionless startup to a category-defining SaaS company with clear strategy and systematic execution.
              </p>
            </div>

            {/* Key Stats - Immediate Visual Impact */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">$2M</div>
                <div className="text-sm text-gray-400">ARR Achieved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">120%</div>
                <div className="text-sm text-gray-400">NRR</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">$8M</div>
                <div className="text-sm text-gray-400">Series A</div>
              </div>
            </div>
          </div>

          {/* Right Column - Company Info Card */}
          <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-8 border border-blue-800/30">
            <h3 className="text-white text-lg font-medium mb-6">Company Overview</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Industry</div>
                  <div className="text-white">B2B SaaS - Marketing Analytics</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Location</div>
                  <div className="text-white">San Francisco, CA</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Team Size</div>
                  <div className="text-white">12 → 45 employees</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Timeline</div>
                  <div className="text-white">18 months (Jan 2023 - Jun 2024)</div>
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
// THE CHALLENGE SECTION
// Describe the painful starting point that founders 
// will relate to - this creates emotional connection
// =====================================================
const ChallengeSection = () => {
  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-4 leading-tight">
            The Challenge
          </h2>
          <p className="text-xl text-gray-600 font-light">
            When TechFlow's founders approached us, they were stuck in a dangerous pattern many startups face.
          </p>
        </div>

        {/* The Situation - Paint a vivid picture */}
        <div className="bg-white rounded-xl p-8 sm:p-10 mb-8 border-l-4 border-red-500">
          <h3 className="text-2xl font-medium text-gray-900 mb-6">The Situation in January 2023</h3>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              TechFlow had a promising product—a marketing analytics platform that early users loved. 
              But after 14 months of development and $800K in seed funding, they had <strong>zero paying customers</strong>.
            </p>
            
            <p>
              The founding team was brilliant: a former Google engineer, an ex-Facebook product manager, 
              and a marketing executive from Salesforce. But brilliance without direction creates chaos, not progress.
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-6">
              <h4 className="font-medium text-gray-900 mb-3">Critical Warning Signs:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">×</span>
                  <span>Product roadmap changed every 6 weeks based on individual customer feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">×</span>
                  <span>No clear ideal customer profile—selling to anyone who would listen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">×</span>
                  <span>Three different pricing models tested in 90 days, all arbitrary</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">×</span>
                  <span>Engineering team building features no one was asking for</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">×</span>
                  <span>Founders spending 60% of time in internal debates, 40% with customers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">×</span>
                  <span>Burn rate at $65K/month with only 9 months of runway left</span>
                </li>
              </ul>
            </div>

            <p className="text-lg font-medium text-gray-900">
              The real problem wasn't their product. It was the complete absence of strategic clarity.
            </p>
          </div>
        </div>

        {/* Founder Quote - Make it personal */}
        <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-8 border border-blue-800/30">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <div>
              <p className="text-white text-lg leading-relaxed mb-4 italic">
                "We had all the ingredients for success—great team, strong technology, enthusiastic early users. 
                But we were drowning in options. Every conversation led to a new idea, a new pivot, a new 'opportunity.' 
                We needed someone to cut through the noise and tell us what actually mattered."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  SK
                </div>
                <div>
                  <div className="text-white font-medium">Sarah Kim</div>
                  <div className="text-blue-300 text-sm">Co-founder & CEO, TechFlow Analytics</div>
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
// THE APPROACH SECTION
// This is where we subtly introduce our methodology
// without being salesy - show the process
// =====================================================
const ApproachSection = () => {
  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight">
            Our Approach
          </h2>
          <p className="text-xl text-blue-200 font-light">
            We deployed our proven Diagnostic Strategy & Direction framework—a systematic process 
            for identifying what matters and building conviction around strategic choices.
          </p>
        </div>

        {/* Phase-by-Phase Breakdown */}
        <div className="space-y-6">
          
          {/* Phase 1 - Discovery */}
          <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-8 border border-blue-800/30">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-medium text-white mb-3">Deep Diagnostic (Week 1-2)</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  We conducted an intensive diagnostic to understand the root causes of TechFlow's stagnation, 
                  not just the symptoms. This wasn't about gathering opinions—it was about uncovering hard truths.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-700/30">
                    <div className="text-blue-400 text-sm font-medium mb-2">Data Analysis</div>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• 50+ customer interviews analyzed</li>
                      <li>• Product usage data deep-dive</li>
                      <li>• Competitive positioning audit</li>
                      <li>• Financial model reconstruction</li>
                    </ul>
                  </div>
                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-700/30">
                    <div className="text-blue-400 text-sm font-medium mb-2">Team Alignment</div>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Individual founder sessions</li>
                      <li>• Team workshop facilitation</li>
                      <li>• Hidden conflict surfacing</li>
                      <li>• Decision-making audit</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 - Strategic Clarity */}
          <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-8 border border-blue-800/30">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-medium text-white mb-3">Strategic Direction Mapping (Week 3-4)</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Based on diagnostic insights, we facilitated hard strategic choices. Not consensus—clarity. 
                  We helped the founders see what their data was telling them, even when it contradicted their assumptions.
                </p>
                <div className="bg-blue-500/10 rounded-lg p-6 border border-blue-700/30">
                  <h4 className="text-white font-medium mb-4">Key Strategic Decisions Made:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      <div>
                        <div className="text-white font-medium">Narrow ICP to mid-market e-commerce companies ($10M-$100M revenue)</div>
                        <div className="text-gray-400 text-sm">Previous: "Any company doing digital marketing"</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      <div>
                        <div className="text-white font-medium">Cut 60% of product roadmap, focus on three core features</div>
                        <div className="text-gray-400 text-sm">Previous: 23 features in development simultaneously</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      <div>
                        <div className="text-white font-medium">Establish value-based pricing: $499/month starting tier</div>
                        <div className="text-gray-400 text-sm">Previous: $99-$299 range with unclear differentiation</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      <div>
                        <div className="text-white font-medium">Define 90-day execution sprint with weekly milestone tracking</div>
                        <div className="text-gray-400 text-sm">Previous: No formal planning beyond monthly "sync meetings"</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3 - Execution Framework */}
          <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-8 border border-blue-800/30">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-medium text-white mb-3">Execution & Accountability (Month 2-6)</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Strategy without execution is hallucination. We embedded systems for accountability, 
                  created decision-making frameworks, and coached the team through inevitable challenges.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-700/30">
                    <div className="text-blue-400 font-medium mb-2">Weekly Check-ins</div>
                    <div className="text-gray-300 text-sm">Progress tracking, blocker removal, strategic pivots when needed</div>
                  </div>
                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-700/30">
                    <div className="text-blue-400 font-medium mb-2">OKR Framework</div>
                    <div className="text-gray-300 text-sm">Quarterly objectives with measurable key results</div>
                  </div>
                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-700/30">
                    <div className="text-blue-400 font-medium mb-2">Decision Playbooks</div>
                    <div className="text-gray-300 text-sm">Templates for prioritization and trade-off decisions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Methodology Callout - Subtle promotion */}
        <div className="mt-12 bg-blue-900/30 border border-blue-700/50 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <div>
              <h4 className="text-white font-medium mb-2">About the Diagnostic Strategy & Direction Program</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                This case study showcases our signature 6-month engagement designed for pre-PMF and early-stage companies. 
                The program combines deep diagnostic work with hands-on strategic direction and execution support. 
                <Link href="/services/diagnostic-strategy" className="text-blue-400 hover:text-blue-300 ml-1">
                  Learn more about this service →
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// =====================================================
// THE RESULTS SECTION
// Show measurable outcomes - this builds credibility
// and desire for founders reading the case study
// =====================================================
const ResultsSection = () => {
  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-4 leading-tight">
            The Results
          </h2>
          <p className="text-xl text-gray-600 font-light">
            Within 18 months, TechFlow transformed from a directionless startup to a category leader.
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 border-l-4 border-green-500">
            <div className="text-4xl font-bold text-gray-900 mb-2">$2M</div>
            <div className="text-sm text-gray-600 mb-1">Annual Recurring Revenue</div>
            <div className="text-xs text-green-600 font-medium">From $0</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500">
            <div className="text-4xl font-bold text-gray-900 mb-2">120%</div>
            <div className="text-sm text-gray-600 mb-1">Net Revenue Retention</div>
            <div className="text-xs text-blue-600 font-medium">Industry benchmark: 90%</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500">
            <div className="text-4xl font-bold text-gray-900 mb-2">$8M</div>
            <div className="text-sm text-gray-600 mb-1">Series A Funding</div>
            <div className="text-xs text-purple-600 font-medium">At $35M valuation</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border-l-4 border-orange-500">
            <div className="text-4xl font-bold text-gray-900 mb-2">40%</div>
            <div className="text-sm text-gray-600 mb-1">Gross Margin</div>
            <div className="text-xs text-orange-600 font-medium">Target was 35%</div>
          </div>
        </div>

        {/* Detailed Timeline */}
        <div className="bg-white rounded-xl p-8 sm:p-10 mb-8">
          <h3 className="text-2xl font-medium text-gray-900 mb-8">18-Month Transformation Timeline</h3>
          
          <div className="space-y-8">
            
            {/* Month 1-3 */}
            <div className="relative pl-8 border-l-2 border-blue-500">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="mb-2">
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">Month 1-3</span>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Strategic Foundation</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Completed diagnostic and strategic direction work</li>
                <li>• Closed first 3 paying customers at $499/month tier</li>
                <li>• Rebuilt product roadmap around core value props</li>
                <li>• Established weekly execution rhythm</li>
              </ul>
            </div>

            {/* Month 4-6 */}
            <div className="relative pl-8 border-l-2 border-green-500">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full"></div>
              <div className="mb-2">
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Month 4-6</span>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Early Traction</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Reached $25K MRR (50 customers)</li>
                <li>• First customer case study published</li>
                <li>• Product-market fit indicators strengthening</li>
                <li>• Implemented usage-based pricing tier ($999/month)</li>
              </ul>
            </div>

            {/* Month 7-12 */}
            <div className="relative pl-8 border-l-2 border-purple-500">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full"></div>
              <div className="mb-2">
                <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">Month 7-12</span>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Scaling Phase</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Hit $100K MRR milestone</li>
                <li>• Hired first sales rep (closed 12 deals in 90 days)</li>
                <li>• NRR stabilized at 115%+</li>
                <li>• Started Series A fundraising conversations</li>
              </ul>
            </div>

            {/* Month 13-18 */}
            <div className="relative pl-8 border-l-2 border-orange-500">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-orange-500 rounded-full"></div>
              <div className="mb-2">
                <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">Month 13-18</span>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Series A Success</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Crossed $165K MRR ($2M ARR run rate)</li>
                <li>• Closed $8M Series A led by tier-1 VC</li>
                <li>• Expanded team from 12 to 45 employees</li>
                <li>• Launched enterprise tier ($2,999/month starting)</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Business Metrics Transformation */}
        <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-8 border border-blue-800/30">
          <h3 className="text-2xl font-medium text-white mb-6">Before & After Comparison</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-700/30">
                  <th className="text-left py-3 px-4 text-blue-300 font-medium text-sm">Metric</th>
                  <th className="text-center py-3 px-4 text-red-400 font-medium text-sm">Before (Jan 2023)</th>
                  <th className="text-center py-3 px-4 text-green-400 font-medium text-sm">After (Jun 2024)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-blue-800/20">
                  <td className="py-3 px-4 text-gray-300">MRR</td>
                  <td className="py-3 px-4 text-center text-red-300">$0</td>
                  <td className="py-3 px-4 text-center text-green-300 font-medium">$165K</td>
                </tr>
                <tr className="border-b border-blue-800/20">
                  <td className="py-3 px-4 text-gray-300">Paying Customers</td>
                  <td className="py-3 px-4 text-center text-red-300">0</td>
                  <td className="py-3 px-4 text-center text-green-300 font-medium">287</td>
                </tr>
                <tr className="border-b border-blue-800/20">
                  <td className="py-3 px-4 text-gray-300">Average Deal Size</td>
                  <td className="py-3 px-4 text-center text-red-300">N/A</td>
                  <td className="py-3 px-4 text-center text-green-300 font-medium">$575/month</td>
                </tr>
                <tr className="border-b border-blue-800/20">
                  <td className="py-3 px-4 text-gray-300">Customer Acquisition Cost</td>
                  <td className="py-3 px-4 text-center text-red-300">Unknown</td>
                  <td className="py-3 px-4 text-center text-green-300 font-medium">$2,100</td>
                </tr>
                <tr className="border-b border-blue-800/20">
                  <td className="py-3 px-4 text-gray-300">LTV:CAC Ratio</td>
                  <td className="py-3 px-4 text-center text-red-300">N/A</td>
                  <td className="py-3 px-4 text-center text-green-300 font-medium">4.8:1</td>
                </tr>
                <tr className="border-b border-blue-800/20">
                  <td className="py-3 px-4 text-gray-300">Net Revenue Retention</td>
                  <td className="py-3 px-4 text-center text-red-300">N/A</td>
                  <td className="py-3 px-4 text-center text-green-300 font-medium">120%</td>
                </tr>
                <tr className="border-b border-blue-800/20">
                  <td className="py-3 px-4 text-gray-300">Monthly Burn Rate</td>
                  <td className="py-3 px-4 text-center text-red-300">$65K</td>
                  <td className="py-3 px-4 text-center text-green-300 font-medium">$140K (with path to profitability)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Runway</td>
                  <td className="py-3 px-4 text-center text-red-300">9 months</td>
                  <td className="py-3 px-4 text-center text-green-300 font-medium">60+ months (post-Series A)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

// =====================================================
// KEY LESSONS SECTION
// Extract learnings that readers can apply
// This positions us as thought leaders
// =====================================================
const KeyLessonsSection = () => {
  const lessons = [
    {
      title: "Strategy is About Choices, Not Options",
      description: "TechFlow's transformation began when they stopped exploring every possibility and started making hard choices. Strategic clarity means saying 'no' to good opportunities in service of great ones.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      )
    },
    {
      title: "Data Beats Intuition, Every Time",
      description: "The founders' assumptions about their market were well-intentioned but wrong. Real customer data revealed that their intuition about pricing, features, and positioning was off by 60%. Trust the data.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      )
    },
    {
      title: "Narrow Focus Accelerates Growth",
      description: "Counterintuitively, narrowing their ICP from 'any digital marketer' to 'mid-market e-commerce' tripled their close rate. Specificity is strategy.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      )
    },
    {
      title: "Execution Frameworks Prevent Strategic Drift",
      description: "Strategy without systems is fragile. TechFlow's weekly OKR reviews and decision playbooks ensured they stayed on track even when market conditions changed.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      )
    }
  ];

  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight">
            Key Lessons
          </h2>
          <p className="text-xl text-blue-200 font-light">
            Four strategic principles that drove TechFlow's success—and can accelerate yours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {lessons.map((lesson, index) => (
            <div key={index} className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-8 border border-blue-800/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {lesson.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-white leading-tight pt-2">{lesson.title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {lesson.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// =====================================================
// CTA SECTION - CONVERT READERS TO LEADS
// This is where we ask for the engagement
// Positioned after they've seen the full value
// =====================================================
const CTASection = () => {
  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 border-2 border-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl text-white font-light mb-4 leading-tight">
              Is Your Startup Stuck Like TechFlow Was?
            </h2>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              If you're struggling with strategic clarity, spinning in endless debates, or unsure 
              whether you're building the right thing—you're not alone. And you don't have to figure it out by yourself.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Link 
                href="/services/diagnostic-strategy"
                className="inline-flex items-center gap-2 bg-white text-[#0A1E3D] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-lg group"
              >
                <span>Learn About Diagnostic Strategy & Direction</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-medium"
              >
                <span>Schedule a Diagnostic Call</span>
              </Link>
            </div>

            <p className="text-sm text-white/70">
              Free 45-minute diagnostic call • No sales pitch • Just clarity on whether we can help
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

// =====================================================
// RELATED CASE STUDIES SECTION
// Keep readers engaged with more content
// =====================================================
const RelatedCaseStudiesSection = () => {
  const relatedCases = [
    {
      title: "D2C Brand: Market Entry Strategy Success",
      company: "EcoLiving Products",
      industry: "Consumer Goods",
      result: "8% market share in year one",
      link: "/case-studies/ecoliving-products",
      image: "🌱"
    },
    {
      title: "Fintech Pivot: From Failure to $50M Valuation",
      company: "PaymentBridge",
      industry: "Financial Technology",
      result: "10x user growth, $12M Series A",
      link: "/case-studies/paymentbridge",
      image: "💳"
    }
  ];

  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4 leading-tight">
            More Success Stories
          </h2>
          <p className="text-blue-200">
            See how other founders overcame critical challenges with Sarsen & Company
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {relatedCases.map((study, index) => (
            <Link
              key={index}
              href={study.link}
              className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-8 border border-blue-800/30 hover:border-blue-700/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                <div className="text-5xl">{study.image}</div>
                <div className="flex-1">
                  <div className="text-xs text-blue-400 font-medium mb-2">{study.industry}</div>
                  <h3 className="text-xl font-medium text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">{study.company}</p>
                  <div className="text-green-400 font-medium text-sm">{study.result}</div>
                </div>
                <svg className="w-6 h-6 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

// =====================================================
// MAIN PAGE COMPONENT
// =====================================================
export default function CaseStudyPage() {
  return (
    <main className="min-h-screen">
      <CaseStudyHero />
      <ChallengeSection />
      <ApproachSection />
      <ResultsSection />
      <KeyLessonsSection />
      <CTASection />
      <RelatedCaseStudiesSection />
    </main>
  );
}