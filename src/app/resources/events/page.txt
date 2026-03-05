// app/events/page.tsx
'use client';

import React, { useState } from 'react';

// =====================================================
// HERO SECTION COMPONENT
// Professional hero section introducing seminars & events
// Uses same design pattern as other pages with search functionality
// =====================================================
const EventsHero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative bg-[#0A1E3D] min-h-[500px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column: Text Content */}
          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight">
                Seminars & Events
              </h1>
              <p className="text-xl sm:text-2xl text-blue-300 font-light leading-relaxed">
                Curated forums for strategic dialogue, executive learning, and data-driven decision making.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-full lg:max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by topic, date, or event type..."
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 rounded-lg bg-[#1a3352] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base sm:text-lg transition-all duration-300 border border-transparent hover:border-blue-500"
                  aria-label="Search events"
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
                <span className="text-sm sm:text-base">Executive-led seminars on strategic frameworks and market dynamics</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span className="text-sm sm:text-base">Live webinars and workshops backed by quantitative research</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span className="text-sm sm:text-base">Networking sessions with industry practitioners and leaders</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Placeholder */}
          <div className="relative h-80 sm:h-96 lg:h-[450px] flex items-center justify-center lg:justify-end">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full max-w-lg h-full bg-gradient-to-br from-blue-900/20 to-transparent rounded-lg flex items-center justify-center border border-blue-800/30">
                <div className="text-center text-blue-400/50 p-8">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
                  </svg>
                  <p className="text-sm">Upcoming Events<br/>Placeholder</p>
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
// Sticky navigation bar for filtering events by type
// Uses same styling pattern as other pages
// =====================================================
const FilterTabs = ({ activeFilter, setActiveFilter }: { activeFilter: string; setActiveFilter: (filter: string) => void }) => {
  const filters = [
    'All Events',
    'Seminars',
    'Webinars',
    'Workshops',
    'Conferences',
    'Networking'
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
// FEATURED EVENT SECTION
// Highlighted flagship event in gradient card format
// Matches featured report/case study design from other pages
// =====================================================
const FeaturedEventSection = () => {
  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left Column: Content */}
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium mb-4">
                FLAGSHIP EVENT
              </div>
              <h2 className="text-3xl sm:text-4xl text-white font-light mb-4 leading-tight">
                Strategic Leadership Summit 2025
              </h2>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-6">
                A two-day immersive summit bringing together C-suite executives, founders, and strategy leaders 
                for deep-dive sessions on market intelligence, competitive positioning, and operational 
                excellence — anchored by proprietary research and live diagnostic frameworks.
              </p>

              {/* Event Metadata */}
              <div className="flex flex-wrap gap-4 text-sm text-white/80 mb-8">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                  </svg>
                  <span>March 14–15, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>The Oberoi, Mumbai</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                  <span>120 Seats Available</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-wrap gap-4">
                <button className="inline-flex items-center gap-2 bg-white text-[#0A1E3D] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-lg group">
                  <span>Register Now</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="inline-flex items-center gap-2 border border-white/50 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">
                  <span>View Agenda</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Placeholder */}
            <div className="relative h-64 sm:h-80 lg:h-96 p-8 flex items-center justify-center">
              <div className="w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
                    </svg>
                  </div>
                  <p className="text-sm opacity-90">Summit<br/>Illustration</p>
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
// EVENTS GRID SECTION
// Main grid displaying all upcoming events with filtering
// Each event card follows the consistent card design pattern
// =====================================================
const EventsGridSection = ({ activeFilter }: { activeFilter: string }) => {
  // Complete events dataset with metadata
  const allEvents = [
    {
      type: 'Seminars',
      title: 'Strategic Leadership Summit 2025',
      description: 'Two-day immersive summit on market intelligence, competitive positioning, and operational excellence with proprietary research-backed sessions.',
      date: 'March 14–15, 2025',
      location: 'The Oberoi, Mumbai',
      seats: 120,
      seatsLeft: 34,
      duration: '2 Days',
      featured: true
    },
    {
      type: 'Webinars',
      title: 'Decoding Unit Economics for Growth-Stage Founders',
      description: 'A live diagnostic session on building sustainable unit economics in B2B and D2C businesses, led by senior analysts with real-time modeling.',
      date: 'February 18, 2025',
      location: 'Online — Zoom',
      seats: 500,
      seatsLeft: 210,
      duration: '90 Min',
      featured: false
    },
    {
      type: 'Workshops',
      title: 'Go-to-Market Strategy Workshop: From Framework to Execution',
      description: 'Hands-on workshop where teams work through structured GTM frameworks, competitive analysis, and channel prioritization using live case data.',
      date: 'February 22, 2025',
      location: 'Taj Palace, Delhi',
      seats: 40,
      seatsLeft: 12,
      duration: 'Full Day',
      featured: false
    },
    {
      type: 'Conferences',
      title: 'India Fintech & Payments Conference 2025',
      description: 'Strategic deep-dive into fintech sector dynamics, regulatory shifts, and emerging business models across tier 1 and tier 2 markets.',
      date: 'March 5, 2025',
      location: 'Westin, Bangalore',
      seats: 200,
      seatsLeft: 87,
      duration: '1 Day',
      featured: false
    },
    {
      type: 'Networking',
      title: 'Founders & Strategists Evening — Q1 Edition',
      description: 'An exclusive networking forum pairing early-stage founders with strategy professionals for structured mentorship conversations and peer exchange.',
      date: 'February 28, 2025',
      location: 'The Leela, Mumbai',
      seats: 60,
      seatsLeft: 18,
      duration: '3 Hours',
      featured: false
    },
    {
      type: 'Webinars',
      title: 'Market Sizing Masterclass: A Quantitative Approach',
      description: 'Learn bottom-up and hybrid market sizing methodologies with hands-on exercises drawn from real diagnostic engagements across Indian sectors.',
      date: 'March 3, 2025',
      location: 'Online — Zoom',
      seats: 400,
      seatsLeft: 156,
      duration: '2 Hours',
      featured: false
    },
    {
      type: 'Seminars',
      title: 'Competitive Intelligence & Positioning Seminar',
      description: 'Structured seminar on building and maintaining competitive advantages, with frameworks validated across 50+ strategic engagements.',
      date: 'March 10, 2025',
      location: 'Park Plaza, Hyderabad',
      seats: 80,
      seatsLeft: 41,
      duration: 'Half Day',
      featured: false
    },
    {
      type: 'Workshops',
      title: 'Financial Modeling for Strategic Decision-Makers',
      description: 'Practical workshop on building investor-grade financial models, scenario planning, and valuation frameworks for non-finance executives.',
      date: 'March 18, 2025',
      location: 'ITC Gardenia, Bangalore',
      seats: 35,
      seatsLeft: 9,
      duration: 'Full Day',
      featured: false
    },
    {
      type: 'Conferences',
      title: 'D2C & E-commerce Growth Summit',
      description: 'Industry-first conference examining direct-to-consumer scaling strategies, customer acquisition economics, and brand-building frameworks.',
      date: 'March 22, 2025',
      location: 'Shangri-La, Delhi',
      seats: 180,
      seatsLeft: 92,
      duration: '1 Day',
      featured: false
    },
    {
      type: 'Webinars',
      title: 'Pricing Strategy for SaaS Businesses — Live Q&A',
      description: 'An interactive webinar dissecting value-based pricing, competitive positioning, and psychological pricing across successful SaaS models.',
      date: 'March 7, 2025',
      location: 'Online — Zoom',
      seats: 600,
      seatsLeft: 340,
      duration: '75 Min',
      featured: false
    },
    {
      type: 'Networking',
      title: 'CXO Roundtable: Operational Excellence in Scale-Ups',
      description: 'A curated roundtable bringing together chief executives to discuss operational frameworks, talent scaling, and process optimization.',
      date: 'March 20, 2025',
      location: 'Raffles, Mumbai',
      seats: 25,
      seatsLeft: 7,
      duration: '2.5 Hours',
      featured: false
    },
    {
      type: 'Seminars',
      title: 'Healthcare Tech & Regulatory Landscape Seminar',
      description: 'Deep-dive seminar on navigating India\'s evolving healthtech regulations, market opportunities, and strategic entry considerations.',
      date: 'April 2, 2025',
      location: 'Hyatt Regency, Chennai',
      seats: 90,
      seatsLeft: 55,
      duration: 'Half Day',
      featured: false
    }
  ];

  // Filter events based on selected category
  const filteredEvents = activeFilter === 'All Events'
    ? allEvents
    : allEvents.filter(event => event.type === activeFilter);

  // Gradient color variations for event cards — same palette as articles
  const bgColors = [
    'from-[#1E5A8E] to-[#2B7AB8]',
    'from-[#2B7AB8] to-[#3A8BC8]',
    'from-[#7B8FA5] to-[#8B9EB0]',
    'from-[#3A8BC8] to-[#4A9CD8]',
  ];

  // Derive urgency label from remaining seats
  const getUrgencyLabel = (seatsLeft: number, totalSeats: number) => {
    const pct = (seatsLeft / totalSeats) * 100;
    if (pct <= 20) return { label: 'Almost Full', color: 'text-red-600 bg-red-50' };
    if (pct <= 50) return { label: 'Filling Fast', color: 'text-amber-600 bg-amber-50' };
    return { label: 'Open', color: 'text-green-600 bg-green-50' };
  };

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-800">
            {activeFilter === 'All Events' ? 'Upcoming Events' : activeFilter}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} available
          </p>
        </div>

        {/* Events Grid — 3 columns on large screens */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => {
            const urgency = getUrgencyLabel(event.seatsLeft, event.seats);
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">

                {/* Event Header with Gradient */}
                <div className={`bg-gradient-to-br ${bgColors[index % bgColors.length]} h-48 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-5 left-5 w-20 h-20 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-5 right-5 w-16 h-16 border-2 border-white rounded-full"></div>
                  </div>
                  {/* Date badge overlaid on gradient */}
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                    <p className="text-white text-xs font-medium opacity-90">{event.date}</p>
                  </div>
                  {/* Duration badge — bottom right */}
                  <div className="absolute bottom-4 right-4 bg-[#0A1E3D]/60 backdrop-blur-sm rounded-full px-3 py-1">
                    <p className="text-white text-xs font-medium">{event.duration}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <svg className="w-14 h-14 mx-auto mb-1 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Type Tag and Urgency Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {event.type}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${urgency.color}`}>
                      {urgency.label}
                    </span>
                  </div>

                  {/* Event Title */}
                  <h3 className="text-lg font-medium text-gray-900 mb-2 leading-tight">
                    {event.title}
                  </h3>

                  {/* Event Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Location & Seats — Footer */}
                  <div className="mt-auto pt-4 border-t border-gray-200 space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                        </svg>
                        <span>{event.seatsLeft} seats left</span>
                      </div>
                    </div>

                    {/* Seat availability progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          (event.seatsLeft / event.seats) * 100 <= 20
                            ? 'bg-red-500'
                            : (event.seatsLeft / event.seats) * 100 <= 50
                            ? 'bg-amber-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${((event.seats - event.seatsLeft) / event.seats) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Register Button */}
                  <button className="mt-4 w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 px-4 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2 group">
                    <span>Register</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State — shown when no events match filter */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No events found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

// =====================================================
// PAST EVENTS HIGHLIGHT SECTION
// Showcases credibility through completed engagements
// Mirrors the newsletter gradient card layout for visual rhythm
// =====================================================
const PastEventsSection = () => {
  const stats = [
    { value: '48', label: 'Events Conducted', sublabel: 'Across 12 cities' },
    { value: '3,200+', label: 'Professionals Trained', sublabel: 'C-suite to analysts' },
    { value: '94%', label: 'Satisfaction Rate', sublabel: 'Post-event survey avg.' },
    { value: '160+', label: 'Corporate Partners', sublabel: 'Across 18 sectors' },
  ];

  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-2xl p-8 sm:p-10 lg:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl text-white font-light mb-4 leading-tight">
              A Track Record of Strategic Impact
            </h2>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-10">
              Our seminars and workshops are built on the same diagnostic rigour that drives our consulting engagements — 
              delivering frameworks, not just theory. Here is the scale of impact we have delivered.
            </p>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-4xl font-light text-white mb-1">{stat.value}</div>
                  <div className="text-white/90 text-sm font-medium">{stat.label}</div>
                  <div className="text-white/60 text-xs mt-1">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// UPCOMING WEBINARS SECTION
// Dedicated lighter section for quick-registration webinars
// Follows the light-bg section design with card rows
// =====================================================
const UpcomingWebinarsSection = () => {
  const webinars = [
    {
      title: 'Scaling Operations Without Breaking: Lessons Distilled',
      host: 'Rajesh Kumar — Senior Strategy Partner',
      date: 'February 20, 2025',
      time: '3:00 PM IST',
      registrants: 312,
    },
    {
      title: 'Market Entry Decisions: A Diagnostic Checklist',
      host: 'Priya Sharma — Head of Market Intelligence',
      date: 'February 25, 2025',
      time: '11:00 AM IST',
      registrants: 198,
    },
    {
      title: 'The ROI of Strategy: Measuring What Matters',
      host: 'Arjun Mehta — Director, Analytics & Insights',
      date: 'March 4, 2025',
      time: '2:00 PM IST',
      registrants: 147,
    },
  ];

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-800 leading-tight">
              Quick-Join Webinars
            </h2>
            <p className="text-gray-600 text-base mt-2">
              Free, registration-based sessions you can join from anywhere.
            </p>
          </div>
          <button className="self-start sm:self-end bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 px-6 rounded-lg transition-colors font-medium text-sm inline-flex items-center gap-2 group">
            <span>View All Webinars</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Webinar List */}
        <div className="space-y-4">
          {webinars.map((webinar, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6">

                {/* Date Column */}
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-lg flex flex-col items-center justify-center">
                  <span className="text-white text-xs font-medium opacity-80">
                    {webinar.date.split(' ')[0]}
                  </span>
                  <span className="text-white text-2xl font-light">
                    {webinar.date.split(' ')[1].replace(',', '')}
                  </span>
                </div>

                {/* Content — grows */}
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    Webinar
                  </span>
                  <h3 className="text-lg font-medium text-gray-900 mt-2 leading-tight">
                    {webinar.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      <span>{webinar.host}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                      <span>{webinar.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3z"/>
                      </svg>
                      <span>{webinar.registrants} registered</span>
                    </div>
                  </div>
                </div>

                {/* Register Button — right-aligned on desktop */}
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 px-6 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2 group">
                    <span>Join Webinar</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
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
// EVENT CATEGORIES SECTION
// Browse events by strategic themes and formats
// Grid layout — same pattern as Topics on articles page
// =====================================================
const EventCategoriesSection = () => {
  const categories = [
    {
      name: 'Executive Seminars',
      count: 14,
      description: 'Senior-led half-day and full-day strategy sessions',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-8 6h16" />
        </svg>
      )
    },
    {
      name: 'Live Webinars',
      count: 22,
      description: 'Online sessions with live Q&A and interactive polls',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 8h8a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" />
        </svg>
      )
    },
    {
      name: 'Hands-On Workshops',
      count: 9,
      description: 'Team-based applied workshops with real case data',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6M9 16h4" />
        </svg>
      )
    },
    {
      name: 'Industry Conferences',
      count: 6,
      description: 'Multi-speaker conferences on sector-specific themes',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m5-1a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1h-4a1 1 0 00-1 1v4zM10 5H8a1 1 0 00-1 1v1h6V6a1 1 0 00-1-1h-2zm4 6H6m8 4H6" />
        </svg>
      )
    },
    {
      name: 'Networking Forums',
      count: 8,
      description: 'Structured peer-exchange and mentorship evenings',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      name: 'CXO Roundtables',
      count: 5,
      description: 'Intimate, invitation-style executive roundtables',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4 leading-tight">
            Browse by Format
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            From executive seminars to hands-on workshops — choose the format that fits your learning and engagement goals.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <span className="bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full">
                  {category.count} events
                </span>
              </div>
              <h3 className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =====================================================
// REGISTRATION CTA SECTION
// Call-to-action for corporate / bulk event registration
// Consistent with other pages' CTA design
// =====================================================
const CTASection = () => {
  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-6 leading-tight">
            Bring Your Team Along
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
            We offer tailored corporate registrations, dedicated team workshops, and private strategy sessions 
            designed around your organisation's diagnostic priorities. Let's build a learning journey that moves the needle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#0A1E3D] text-white px-8 py-4 rounded-lg hover:bg-[#132B47] transition-colors font-medium shadow-lg inline-flex items-center justify-center gap-2 group">
              <span>Corporate Registration</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="bg-transparent border-2 border-[#0A1E3D] text-[#0A1E3D] px-8 py-4 rounded-lg hover:bg-[#0A1E3D]/5 transition-colors font-medium inline-flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Request Event Calendar</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// MAIN EVENTS PAGE COMPONENT
// Assembles all components into complete page
// Manages filter state for event-type filtering
// =====================================================
export default function EventsPage() {
  // State for active filter selection
  const [activeFilter, setActiveFilter] = useState('All Events');

  return (
    <main className="min-h-screen">
      {/* Hero Section — Top of page */}
      <EventsHero />

      {/* Filter Tabs — Sticky navigation */}
      <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      {/* Featured Event — Flagship highlight */}
      <FeaturedEventSection />

      {/* Events Grid — Main content with filtering */}
      <EventsGridSection activeFilter={activeFilter} />

      {/* Past Events Impact — Credibility stats */}
      <PastEventsSection />

      {/* Quick-Join Webinars — Lighter row-based list */}
      <UpcomingWebinarsSection />

      {/* Browse by Format — Category exploration */}
      <EventCategoriesSection />

      {/* Corporate CTA — Engagement prompt */}
      <CTASection />
    </main>
  );
}