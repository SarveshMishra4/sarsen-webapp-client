'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// =====================================================
// INDIVIDUAL BLOG/NOTE PAGE
// This page shares strategic insights and thought leadership
// while maintaining the same design language as case studies
// =====================================================

// =====================================================
// HERO SECTION - BLOG HEADER
// Establishes the topic and key takeaway immediately
// =====================================================
const BlogHero = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[500px] pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-48 h-48 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
            <span>/</span>
            <Link href="/resources#notes" className="hover:text-white transition-colors">Notes</Link>
            <span>/</span>
            <span className="text-white">Product-Market Fit</span>
          </nav>
        </div>

        {/* Article Metadata */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-blue-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <span>12 min read</span>
          </div>
          <div className="text-sm text-gray-400">Published June 15, 2024</div>
          <div className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded">
            Strategy
          </div>
        </div>

        {/* Title and Excerpt */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight">
            The Real Product-Market Fit: It's Not What You Think
          </h1>
          
          <p className="text-xl text-blue-200 font-light leading-relaxed">
            Most founders chase a myth. Here's what actual product-market fit looks like, how to recognize it, and why you're probably closer than you think.
          </p>
        </div>

        {/* Author Info */}
        <div className="mt-12 pt-8 border-t border-blue-800/30">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-white text-xl font-medium">
              AK
            </div>
            <div>
              <div className="text-white font-medium">Alex Morgan</div>
              <div className="text-blue-300 text-sm">Strategy Partner, Sarsen & Company</div>
              <div className="text-gray-400 text-sm mt-1">15+ years scaling startups to exit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// ARTICLE CONTENT SECTION
// Main content with strategic insights
// =====================================================
const ArticleContent = () => {
  return (
    <section className="bg-[#d4dce5] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Content Container */}
        <div className="bg-white rounded-xl p-8 sm:p-10 mb-8">
          
          {/* Introduction */}
          <div className="mb-10">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              I've worked with 47 startups over the past decade. Every single founder asked me about product-market fit. 
              Most were looking for it in the wrong places, measuring it with the wrong metrics, and missing the signals 
              right in front of them.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              This note isn't about theory. It's about the patterns I've seen in companies that found product-market fit 
              versus those that didn't. And most importantly, the surprisingly simple framework that separates them.
            </p>
          </div>

          {/* Key Insight Box */}
          <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-6 mb-10 border border-blue-800/30">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <div>
                <h4 className="text-white font-medium mb-2">The Core Insight</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Product-market fit isn't a destination you reach. It's a system you build and maintain. 
                  The companies that succeed don't just "find" product-market fit—they architect it through 
                  deliberate choices and consistent execution.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1 */}
          <div className="mb-12">
            <h2 className="text-3xl font-light text-gray-800 mb-6 pb-4 border-b border-gray-200">
              1. The Three Signals Everyone Misses
            </h2>
            
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                You're probably tracking CAC, LTV, and NPS. Important metrics, but they're lagging indicators. 
                The real signals of product-market fit are behavioral and often counterintuitive.
              </p>

              {/* Signal Cards */}
              <div className="grid gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">The "Good Enough" Test</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    When customers start using your product despite its flaws, not because of its features. 
                    They're willing to work around bugs, missing features, and clunky UX because your core 
                    value prop is that compelling.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">Organic Word-of-Mouth</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Not just referrals you track with a referral program. Real, unprompted conversations. 
                    When you overhear potential customers describing your product to each other, 
                    and they're getting it mostly right.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">Competitive Immunity</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    When competitors release features that match yours, but your customers don't leave. 
                    They're not just buying features—they're buying into your solution, your brand, 
                    your way of solving their problem.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-3xl font-light text-gray-800 mb-6 pb-4 border-b border-gray-200">
              2. The PMF Scorecard: A Practical Framework
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Forget vanity metrics. Here's the scorecard we use with our portfolio companies. 
              Each category gets 0-3 points. Total of 15+ means you're in the product-market fit zone.
            </p>

            {/* Scorecard Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200 mb-8">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Category</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">0 Points</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">3 Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 text-sm text-gray-700 bg-blue-50">Customer Retention</td>
                    <td className="py-3 px-4 text-sm text-gray-600">Churn 15% + monthly</td>
                    <td className="py-3 px-4 text-sm text-gray-600">Net negative churn (expansion more tha churn)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm text-gray-700">Usage Frequency</td>
                    <td className="py-3 px-4 text-sm text-gray-600">Once every 30+ days</td>
                    <td className="py-3 px-4 text-sm text-gray-600">Daily or weekly active use</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm text-gray-700 bg-blue-50">Pricing Power</td>
                    <td className="py-3 px-4 text-sm text-gray-600">Constant discounting needed</td>
                    <td className="py-3 px-4 text-sm text-gray-600">Price increases accepted</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm text-gray-700">Organic Growth</td>
                    <td className="py-3 px-4 text-sm text-gray-600">100% paid acquisition</td>
                    <td className="py-3 px-4 text-sm text-gray-600">30%+ organic signups</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm text-gray-700 bg-blue-50">Team Confidence</td>
                    <td className="py-3 px-4 text-sm text-gray-600">Constant pivoting, low morale</td>
                    <td className="py-3 px-4 text-sm text-gray-600">Clear roadmap, high conviction</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-6 border border-blue-800/30">
              <div className="flex items-start gap-4">
                <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <div>
                  <h4 className="text-white font-medium mb-2">Why This Works</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Most PMF frameworks focus on quantitative metrics alone. This scorecard combines behavioral, 
                    financial, and team indicators. If you score well on this but traditional metrics say otherwise, 
                    you might be measuring the wrong things.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-3xl font-light text-gray-800 mb-6 pb-4 border-b border-gray-200">
              3. Common Traps & How to Avoid Them
            </h2>
            
            <div className="space-y-6">
              
              {/* Trap 1 */}
              <div className="border-l-4 border-red-500 pl-5 py-2">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Trap 1: Confusing Feature Requests for Validation</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Every customer wants something different. Listening to all feature requests equally 
                  leads to product bloat. The key question: Will this feature increase the core value 
                  for your best customers, or just make one mediocre customer happy?
                </p>
              </div>

              {/* Trap 2 */}
              <div className="border-l-4 border-orange-500 pl-5 py-2">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Trap 2: Premature Scaling</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Hiring a sales team before you have sales. Building an enterprise tier before you 
                  understand enterprise needs. Scaling amplifies what you have—if you haven't found 
                  product-market fit, you'll just amplify the wrong things faster.
                </p>
              </div>

              {/* Trap 3 */}
              <div className="border-l-4 border-yellow-500 pl-5 py-2">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Trap 3: The "If We Build It" Fallacy</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Believing that one more feature, one more integration, one more redesign will 
                  unlock product-market fit. Usually, the opposite is true. Simplification, focus, 
                  and saying no to good ideas is what creates space for great ones to emerge.
                </p>
              </div>

            </div>
          </div>

          {/* Practical Exercise */}
          <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-8 mb-10 border border-blue-800/30">
            <h3 className="text-2xl font-light text-white mb-4">Try This Exercise: The 90-Day PMF Audit</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">1</span>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Week 1-2: Customer Deep Dives</h4>
                  <p className="text-gray-300 text-sm">
                    Interview your 10 most engaged customers. Don't ask what they want. Ask: 
                    "What job were you trying to get done when you found us? What would you do 
                    if we disappeared tomorrow?"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">2</span>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Week 3-4: Usage Pattern Analysis</h4>
                  <p className="text-gray-300 text-sm">
                    Track feature usage, not just logins. What 20% of features deliver 80% of value? 
                    Which features exist but nobody uses? Kill or improve them.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">3</span>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Week 5-12: Experiment & Measure</h4>
                  <p className="text-gray-300 text-sm">
                    Run 3 small experiments based on insights. Could be pricing, messaging, onboarding. 
                    Measure impact on retention and referral rates, not just signups.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-900/30 rounded-lg">
              <p className="text-sm text-blue-300 italic">
                "This audit has uncovered fundamental insights for 12 of our portfolio companies. 
                In 8 cases, it revealed they already had product-market fit but were measuring it wrong. 
                In 4 cases, it showed exactly where to focus to achieve it."
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <div className="pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-light text-gray-800 mb-4">Final Thought</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Product-market fit isn't a binary state you achieve. It's a relationship you nurture 
              with your market. It requires constant attention, adaptation, and the courage to say 
              no to good opportunities so you can say yes to great ones.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The companies that maintain product-market fit over years aren't lucky. They're 
              disciplined. They listen intently to their best customers, ignore the noise from 
              everyone else, and have systems in place to catch when the fit starts to slip.
            </p>
          </div>

        </div>

        {/* Share & Tags */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Share this note:</h4>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Tags:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                Product Strategy
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                Startup Growth
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                Metrics
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                Founder Insights
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// =====================================================
// ABOUT THE AUTHOR SECTION
// Builds credibility and connection
// =====================================================
const AboutAuthorSection = () => {
  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-xl p-8 border border-blue-800/30">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Author Photo/Info */}
            <div className="lg:w-1/3">
              <div className="w-48 h-48 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto lg:mx-0">
                <div className="text-6xl text-blue-400">AK</div>
              </div>
              <div className="mt-6 text-center lg:text-left">
                <h3 className="text-2xl font-light text-white mb-2">Alex Morgan</h3>
                <div className="text-blue-300 mb-4">Strategy Partner</div>
                <div className="text-gray-400 text-sm">
                  Alex specializes in helping early-stage startups find and maintain product-market fit. 
                  Previously led product at two unicorns that exited for $1B+.
                </div>
              </div>
            </div>

            {/* Author Bio & Work */}
            <div className="lg:w-2/3">
              <h4 className="text-xl font-medium text-white mb-6">About Alex's Work</h4>
              
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-900/30 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white mb-1">47</div>
                    <div className="text-sm text-blue-300">Startups Supported</div>
                  </div>
                  <div className="bg-blue-900/30 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white mb-1">$1.2B</div>
                    <div className="text-sm text-blue-300">Total Exit Value</div>
                  </div>
                  <div className="bg-blue-900/30 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white mb-1">12</div>
                    <div className="text-sm text-blue-300">Years Experience</div>
                  </div>
                  <div className="bg-blue-900/30 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white mb-1">89%</div>
                    <div className="text-sm text-blue-300">PMF Success Rate</div>
                  </div>
                </div>

                <div className="border-t border-blue-800/30 pt-6">
                  <h5 className="text-lg font-medium text-white mb-4">Recent Notes by Alex</h5>
                  <div className="space-y-3">
                    <Link href="/notes/pricing-strategy" className="group block">
                      <div className="flex items-center justify-between p-3 hover:bg-blue-900/20 rounded-lg transition-colors">
                        <div>
                          <div className="text-white group-hover:text-blue-300 transition-colors">
                            The Psychology of Pricing: Beyond Features & Discounts
                          </div>
                          <div className="text-gray-400 text-sm">May 2024</div>
                        </div>
                        <svg className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                    
                    <Link href="/notes/hiring-early-team" className="group block">
                      <div className="flex items-center justify-between p-3 hover:bg-blue-900/20 rounded-lg transition-colors">
                        <div>
                          <div className="text-white group-hover:text-blue-300 transition-colors">
                            Building Your First 10: Hiring Before Product-Market Fit
                          </div>
                          <div className="text-gray-400 text-sm">April 2024</div>
                        </div>
                        <svg className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
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
// RELATED NOTES SECTION
// Keep readers engaged with more content
// =====================================================
const RelatedNotesSection = () => {
  const relatedNotes = [
    {
      title: "The Founder's Dilemma: Growth vs. Profitability",
      excerpt: "When to prioritize growth over profits, and how to know if you're making the right trade-offs.",
      category: "Strategy",
      readTime: "8 min",
      date: "May 2024",
      link: "/notes/growth-vs-profitability"
    },
    {
      title: "Building a Culture of Execution in Early Startups",
      excerpt: "How to move from endless debates to consistent execution without bureaucratic processes.",
      category: "Operations",
      readTime: "10 min",
      date: "April 2024",
      link: "/notes/culture-of-execution"
    },
    {
      title: "The Series A Trap: Why Most Startups Fail After Raising",
      excerpt: "The surprising reasons why startups with funding often fail, and how to avoid common pitfalls.",
      category: "Funding",
      readTime: "12 min",
      date: "March 2024",
      link: "/notes/series-a-trap"
    }
  ];

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4 leading-tight">
            Continue Reading
          </h2>
          <p className="text-gray-600">
            More strategic insights from our team
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {relatedNotes.map((note, index) => (
            <Link
              key={index}
              href={note.link}
              className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded mb-3">
                  {note.category}
                </span>
                <h3 className="text-lg font-medium text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {note.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {note.excerpt}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  {note.date} • {note.readTime} read
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/resources#notes"
            className="inline-flex items-center gap-2 bg-[#0A1E3D] text-white px-6 py-3 rounded-lg hover:bg-[#132B47] transition-colors font-medium"
          >
            <span>View All Notes</span>
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
// NEWSLETTER CTA SECTION
// Convert readers to subscribers
// =====================================================
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the subscription here
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-32 h-32 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-24 h-24 border-2 border-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl text-white font-light mb-4 leading-tight">
              Get Strategic Insights Like This
            </h2>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join 2,500+ founders and executives who receive our bi-weekly Notes—practical insights 
              on strategy, growth, and building enduring companies.
            </p>

            {subscribed ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                  <div className="text-green-400 font-medium">Successfully Subscribed!</div>
                </div>
                <p className="text-green-300 text-sm">
                  Thank you for subscribing! Check your email for confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your work email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-white text-[#0A1E3D] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-white/70 text-xs mt-4">
                  No spam, ever. Unsubscribe anytime. Read our{' '}
                  <Link href="/privacy" className="text-white underline">privacy policy</Link>.
                </p>
              </form>
            )}

            <div className="mt-10 pt-8 border-t border-white/20">
              <div className="flex flex-wrap justify-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">98%</div>
                  <div className="text-sm text-white/70">Open rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">2,500+</div>
                  <div className="text-sm text-white/70">Subscribers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">47%</div>
                  <div className="text-sm text-white/70">Reply rate</div>
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
// MAIN PAGE COMPONENT
// =====================================================
export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <BlogHero />
      <ArticleContent />
      <AboutAuthorSection />
      <RelatedNotesSection />
      <NewsletterSection />
    </main>
  );
}