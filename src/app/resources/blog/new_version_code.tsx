// app/articles/page.tsx
'use client';

import React, { useState } from 'react';

// =====================================================
// HERO SECTION COMPONENT
// Professional hero section introducing the articles/insights
// Uses same design pattern as other pages with search functionality
// =====================================================
const ArticlesHero = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[500px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight">
                Insights & Articles
              </h1>
              <p className="text-xl sm:text-2xl text-blue-300 font-light leading-relaxed">
                Strategic perspectives grounded in diagnostic analysis, market research, and quantitative rigor.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-full lg:max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles by topic, industry, theme..."
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 rounded-lg bg-[#1a3352] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base sm:text-lg transition-all duration-300 border border-transparent hover:border-blue-500"
                  aria-label="Search articles"
                />
                <svg
                  className="absolute right-4 sm:right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Feature Points */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span className="text-sm sm:text-base">Deep-dive analysis on market trends and strategic themes</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span className="text-sm sm:text-base">Data-backed perspectives from industry practitioners</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Placeholder */}
          <div className="relative h-80 sm:h-96 lg:h-[450px] flex items-center justify-center lg:justify-end">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full max-w-lg h-full bg-gradient-to-br from-blue-900/20 to-transparent rounded-lg flex items-center justify-center border border-blue-800/30">
                <div className="text-center text-blue-400/50 p-8">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                  <p className="text-sm">Thought Leadership<br/>Placeholder</p>
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
// FILTER TABS COMPONENT
// Sticky navigation bar for filtering articles by category
// Uses same styling pattern as other pages
// =====================================================
const FilterTabs = ({ activeFilter, setActiveFilter }: { activeFilter: string; setActiveFilter: (filter: string) => void }) => {
  const filters = [
    'All Articles',
    'Market Analysis',
    'Strategic Planning',
    'Growth & Scaling',
    'Industry Insights',
    'Thought Leadership'
  ];

  return (
    <div className="bg-[#d4dce5] py-6 px-4 sm:px-6 lg:px-8 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto">
        {/* Horizontal scrollable filter tabs */}
        <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-[#0A1E3D] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// =====================================================
// FEATURED ARTICLE SECTION
// Highlighted article in gradient card format
// Matches featured report/case study design from other pages
// =====================================================
const FeaturedArticleSection = () => {
  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Content */}
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium mb-4">
                FEATURED ARTICLE
              </div>
              <h2 className="text-3xl sm:text-4xl text-white font-light mb-4 leading-tight">
                The State of Indian Startup Funding: A Quantitative Analysis
              </h2>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-6">
                An in-depth examination of funding patterns across 5,000+ Indian startups over 24 months, 
                revealing sector-specific trends, valuation dynamics, and emerging investment themes through 
                rigorous data analysis and market intelligence.
              </p>
              
              {/* Article Metadata */}
              <div className="flex flex-wrap gap-4 text-sm text-white/80 mb-8">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                  <span>12 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                  </svg>
                  <span>Published Jan 15, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <span>By Rajesh Kumar</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-wrap gap-4">
                <button className="inline-flex items-center gap-2 bg-white text-[#0A1E3D] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-lg group">
                  <span>Read Full Article</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Placeholder */}
            <div className="relative h-64 sm:h-80 lg:h-96 p-8 flex items-center justify-center">
              <div className="w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                    </svg>
                  </div>
                  <p className="text-sm opacity-90">Article<br/>Illustration</p>
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
// ARTICLES GRID SECTION
// Main grid displaying all articles with filtering capability
// Each article card follows consistent design pattern
// =====================================================
const ArticlesGridSection = ({ activeFilter }: { activeFilter: string }) => {
  // Complete article dataset with metadata
  const allArticles = [
    {
      category: 'Market Analysis',
      title: 'The State of Indian Startup Funding: A Quantitative Analysis',
      excerpt: 'An in-depth examination of funding patterns across 5,000+ Indian startups, revealing sector-specific trends and valuation dynamics.',
      author: 'Rajesh Kumar',
      date: 'Jan 15, 2025',
      readTime: '12 min',
      featured: true
    },
    {
      category: 'Strategic Planning',
      title: 'Building Defensible Moats: A Framework for Competitive Advantage',
      excerpt: 'Strategic analysis of sustainable competitive advantages in growth-stage businesses, backed by empirical research across sectors.',
      author: 'Priya Sharma',
      date: 'Jan 10, 2025',
      readTime: '10 min',
      featured: false
    },
    {
      category: 'Growth & Scaling',
      title: 'Unit Economics in SaaS: Beyond CAC and LTV',
      excerpt: 'Comprehensive guide to understanding and optimizing unit economics in B2B SaaS businesses through diagnostic financial modeling.',
      author: 'Arjun Mehta',
      date: 'Jan 5, 2025',
      readTime: '15 min',
      featured: false
    },
    {
      category: 'Industry Insights',
      title: 'Fintech in Tier 2 Cities: Market Dynamics and Opportunities',
      excerpt: 'Data-driven analysis of fintech adoption patterns in tier 2 Indian cities, including customer behavior and regulatory landscape.',
      author: 'Ananya Iyer',
      date: 'Dec 28, 2024',
      readTime: '11 min',
      featured: false
    },
    {
      category: 'Thought Leadership',
      title: 'Why Most Strategic Plans Fail: A Diagnostic Perspective',
      excerpt: 'Examining the gap between strategy formulation and execution through analysis of 100+ strategic planning engagements.',
      author: 'Rajesh Kumar',
      date: 'Dec 22, 2024',
      readTime: '9 min',
      featured: false
    },
    {
      category: 'Market Analysis',
      title: 'D2C E-commerce Landscape 2025: Trends and Projections',
      excerpt: 'Quantitative analysis of direct-to-consumer e-commerce trends based on transaction data and consumer behavior patterns.',
      author: 'Priya Sharma',
      date: 'Dec 18, 2024',
      readTime: '13 min',
      featured: false
    },
    {
      category: 'Strategic Planning',
      title: 'Market Entry Strategy: A Data-Driven Framework',
      excerpt: 'Systematic approach to evaluating and executing market entry decisions, illustrated with real-world case examples.',
      author: 'Arjun Mehta',
      date: 'Dec 12, 2024',
      readTime: '14 min',
      featured: false
    },
    {
      category: 'Growth & Scaling',
      title: 'Scaling Operations Without Breaking: Lessons from 50+ Startups',
      excerpt: 'Operational excellence patterns observed across successful scaling journeys, with actionable frameworks and metrics.',
      author: 'Ananya Iyer',
      date: 'Dec 8, 2024',
      readTime: '10 min',
      featured: false
    },
    {
      category: 'Industry Insights',
      title: 'Healthcare Tech in India: Regulatory and Market Analysis',
      excerpt: 'Comprehensive overview of healthcare technology landscape including regulatory compliance and market opportunity sizing.',
      author: 'Rajesh Kumar',
      date: 'Dec 1, 2024',
      readTime: '16 min',
      featured: false
    },
    {
      category: 'Thought Leadership',
      title: 'The ROI of Strategic Consulting: Measuring Impact',
      excerpt: 'Framework for evaluating consulting engagement outcomes through quantifiable business metrics and long-term value creation.',
      author: 'Priya Sharma',
      date: 'Nov 25, 2024',
      readTime: '8 min',
      featured: false
    },
    {
      category: 'Market Analysis',
      title: 'Edtech Post-Pandemic: Market Reset and New Opportunities',
      excerpt: 'Analysis of education technology sector evolution post-pandemic, including user behavior shifts and business model innovations.',
      author: 'Arjun Mehta',
      date: 'Nov 20, 2024',
      readTime: '12 min',
      featured: false
    },
    {
      category: 'Strategic Planning',
      title: 'Pricing Strategy for Growth-Stage Startups',
      excerpt: 'Evidence-based approaches to pricing decisions including value-based pricing, competitive positioning, and psychological factors.',
      author: 'Ananya Iyer',
      date: 'Nov 15, 2024',
      readTime: '11 min',
      featured: false
    }
  ];

  // Filter articles based on selected category
  const filteredArticles = activeFilter === 'All Articles' 
    ? allArticles 
    : allArticles.filter(article => article.category === activeFilter);

  // Gradient color variations for article cards
  const bgColors = [
    'from-[#1E5A8E] to-[#2B7AB8]',
    'from-[#2B7AB8] to-[#3A8BC8]',
    'from-[#7B8FA5] to-[#8B9EB0]',
    'from-[#3A8BC8] to-[#4A9CD8]',
  ];

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-800">
            {activeFilter === 'All Articles' ? 'Latest Articles' : activeFilter}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} available
          </p>
        </div>

        {/* Articles Grid - 3 columns on large screens */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
              
              {/* Article Header with Gradient */}
              <div className={`bg-gradient-to-br ${bgColors[index % bgColors.length]} h-48 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-5 left-5 w-20 h-20 border-2 border-white rounded-full"></div>
                  <div className="absolute bottom-5 right-5 w-16 h-16 border-2 border-white rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-16 h-16 mx-auto mb-2 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                    <p className="text-xs opacity-90">Article</p>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Category and Read Time */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">{article.readTime} read</span>
                </div>

                {/* Article Title */}
                <h3 className="text-lg font-medium text-gray-900 mb-2 leading-tight">
                  {article.title}
                </h3>
                
                {/* Article Excerpt */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Author and Date - Footer */}
                <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <span>{article.author}</span>
                  </div>
                  <span>{article.date}</span>
                </div>

                {/* Read Article Button */}
                <button className="mt-4 w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 px-4 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2 group">
                  <span>Read Article</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State - shown when no articles match filter */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No articles found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

// =====================================================
// NEWSLETTER SUBSCRIPTION SECTION
// Email capture for article updates and insights
// Follows brand color scheme and design patterns
// =====================================================
const NewsletterSection = () => {
  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-2xl p-8 sm:p-10 lg:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl text-white font-light mb-4 leading-tight">
              Subscribe to Strategic Insights
            </h2>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8">
              Receive our latest articles, market analysis, and strategic perspectives delivered directly 
              to your inbox. Join 5,000+ business leaders staying ahead of market trends.
            </p>

            {/* Email Subscription Form */}
            <div className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-4 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-base border border-white/20"
                  aria-label="Email address"
                />
                <button className="bg-white text-[#0A1E3D] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-lg whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-white/70 text-xs mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>

            {/* Subscription Benefits */}
            <div className="grid sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-white">
                <div className="text-2xl font-light mb-1">Weekly</div>
                <div className="text-white/80 text-sm">Market Analysis</div>
              </div>
              <div className="text-white">
                <div className="text-2xl font-light mb-1">Monthly</div>
                <div className="text-white/80 text-sm">Deep-Dive Reports</div>
              </div>
              <div className="text-white">
                <div className="text-2xl font-light mb-1">Exclusive</div>
                <div className="text-white/80 text-sm">Strategic Frameworks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// TOPICS & CATEGORIES SECTION
// Browse articles by strategic themes and topics
// Grid layout showcasing different content categories
// =====================================================
const TopicsSection = () => {
  const topics = [
    {
      name: 'Go-to-Market Strategy',
      count: 24,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      name: 'Financial Modeling',
      count: 18,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: 'Competitive Analysis',
      count: 21,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      name: 'Unit Economics',
      count: 16,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: 'Market Sizing',
      count: 19,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: 'Operational Excellence',
      count: 14,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4 leading-tight">
            Browse by Topic
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Explore our library of strategic insights organized by key business themes and methodologies.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  {topic.icon}
                </div>
                <span className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                  {topic.count} articles
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {topic.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =====================================================
// CTA SECTION
// Call-to-action for consultation and engagement
// Consistent with other pages' CTA design
// =====================================================
const CTASection = () => {
  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
            Need Strategic Guidance?
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
            Our articles provide frameworks and perspectives, but every business faces unique challenges. 
            Let's discuss how our diagnostic, data-driven approach can address your specific strategic questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#0A1E3D] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-lg inline-flex items-center justify-center gap-2 group">
              <span>Schedule Consultation</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-medium inline-flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Research Reports</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// MAIN ARTICLES PAGE COMPONENT
// Assembles all components into complete page
// Manages filter state for article filtering
// =====================================================
export default function ArticlesPage() {
  // State for active filter selection
  const [activeFilter, setActiveFilter] = useState('All Articles');

  return (
    <main className="min-h-screen">
      {/* Hero Section - Top of page */}
      <ArticlesHero />
      
      {/* Filter Tabs - Sticky navigation */}
      <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      
      {/* Featured Article - Highlighted content */}
      <FeaturedArticleSection />
      
      {/* Articles Grid - Main content with filtering */}
      <ArticlesGridSection activeFilter={activeFilter} />
      
      {/* Newsletter Subscription - Email capture */}
      <NewsletterSection />
      
      {/* Browse Topics - Category exploration */}
      <TopicsSection />
      
      {/* Call-to-Action - Engagement prompt */}
      <CTASection />
    </main>
  );
}