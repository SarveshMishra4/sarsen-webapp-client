// app/careers/careersClient.tsx
'use client';

import React, { useState } from 'react';

// =====================================================
// HERO SECTION — same structure, background, diagonal grid
// pattern, and responsive breakpoints as the homepage hero
// (ProductLifecycleHero). Only the right-side visual differs:
// ConnectedNetworkDiagram instead of the lifecycle chart.
// =====================================================

const roundCoord = (n: number) => Math.round(n);

const ConnectedNetworkDiagram = () => {
  const nodes = [
    { label: 'You', x: 200, y: 110, isCenter: true },
    { label: 'Market', x: 70, y: 40 },
    { label: 'Economics', x: 330, y: 45 },
    { label: 'Competition', x: 55, y: 175 },
    { label: 'Team', x: 345, y: 170 },
  ];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes drawLineNetworkConn { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .draw-line-network-conn { stroke-dasharray: 1; stroke-dashoffset: 1; animation: drawLineNetworkConn 1.4s ease-out forwards; }

        @keyframes networkNodePulse { 0%, 100% { r: 7; opacity: 0.9; } 50% { r: 9.5; opacity: 1; } }
        .network-node-pulse { animation: networkNodePulse 3s ease-in-out infinite; }

        @keyframes networkSatellitePop { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }
        .network-satellite-0 { animation: networkSatellitePop 0.4s ease-out 1.4s both; transform-origin: 70px 40px; }
        .network-satellite-1 { animation: networkSatellitePop 0.4s ease-out 1.6s both; transform-origin: 330px 45px; }
        .network-satellite-2 { animation: networkSatellitePop 0.4s ease-out 1.8s both; transform-origin: 55px 175px; }
        .network-satellite-3 { animation: networkSatellitePop 0.4s ease-out 2.0s both; transform-origin: 345px 170px; }
      `}</style>

      <svg viewBox="0 0 400 220" className="w-full h-auto">
        {nodes.filter((n) => !n.isCenter).map((n, i) => (
          <path
            key={n.label}
            d={`M 200 110 Q ${roundCoord((200 + n.x) / 2)} ${roundCoord((110 + n.y) / 2 - 18)}, ${n.x} ${n.y}`}
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={1.75}
            strokeLinecap="round"
            pathLength={1}
            className="draw-line-network-conn"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}

        {nodes.map((n, i) => (
          <g key={n.label} className={n.isCenter ? '' : `network-satellite-${i - 1}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.isCenter ? 7 : 5}
              fill={n.isCenter ? '#ffffff' : '#60a5fa'}
              className={n.isCenter ? 'network-node-pulse' : ''}
              style={{ filter: n.isCenter ? 'drop-shadow(0 0 10px rgba(96,165,250,0.85))' : 'drop-shadow(0 0 5px rgba(255,255,255,0.65))' }}
            />
            <text
              x={n.x}
              y={n.isCenter ? n.y + 26 : n.y - 16}
              fill={n.isCenter ? 'rgb(255,255,255)' : '#93C5FD'}
              fontSize="13"
              textAnchor="middle"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
       <p className="text-white/70 text-base text-center mt-6">
        Work across the Forces that Shape Progress.      </p>
    </div>
  );
};

const CareersHero = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[500px] sm:min-h-[600px] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid-careers-hero"
              patternUnits="userSpaceOnUse"
              width="5"
              height="5"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-careers-hero)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white">
              Architects of Progress.
            </h1>

            <p className="text-lg sm:text-xl text-gray-300">
              Work alongside Founders, Business Leaders and Experts Across Industries to Engineer Strategy, Solve Real Business Dynamics, and Build What Lies Beyond the Horizon.
            </p>

            <div className="pt-4"></div>
          </div>

          <div className="relative h-56 sm:h-72 lg:h-[420px] flex items-center justify-center lg:justify-end">
            <ConnectedNetworkDiagram />
            
          </div>
          
        </div>
      </div>
    </section>
  );
};


// =====================================================
// WHY JOIN US SECTION
// =====================================================
const WhyJoinUsSection = () => {
  const reasons = [
    {
      title: "Work That Actually Gets Used",
      description:
        "You will work on real client problems where your analysis directly shapes decisions founders act on. We don’t produce decks for approval chains — we deliver thinking that gets implemented under real constraints.",
    },
    {
      title: "Learn How Businesses Actually Operate",
      description:
        "You’ll see how founders make decisions with incomplete data, limited capital, and real downside risk. This is not textbook strategy — it’s exposure to how businesses really survive, grow, and sometimes fail.",
    },
    {
      title: "High Ownership, Low Supervision",
      description:
        "You are expected to own your work end-to-end — from problem framing to final output. We hire people who can think independently, ask better questions, and take responsibility for outcomes.",
    },
    {
      title: "Merit Over Politics",
      description:
        "Growth here is driven by clarity of thinking, quality of execution, and reliability — not tenure, optics, or internal politics. If your work creates value, it’s visible.",
    },
    {
      title: "Intensity Without Burnout Theater",
      description:
        "The work is demanding, but deliberate. We care about how time is used, not how long you stay online. Sustainable performance matters more than performative hustle.",
    },
    {
      title: "Shape the Firm, Not Just Your Role",
      description:
        "This is an early-stage firm by design. Your thinking, standards, and decisions will influence how we work, what we build, and what we refuse to become.",
    }
  ];

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4">
            Why Join Sarsen Strategy Partners ?
          </h2>
          <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto">
            This is not a place to hide, coast, or collect brand names.
            It’s a place to think clearly, take responsibility, and do work that matters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-md p-6 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#0A1E3D] transition-colors mb-2">
                    {reason.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


// =====================================================
// OPEN POSITIONS SECTION
// =====================================================
const OpenPositionsSection = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const applicationEmail = "careers@sarsenandcompany.com";
  const emailSubject = "Application – Do Not Edit Subject Line";
  const emailBody = encodeURIComponent(
    "IMPORTANT: Do not delete or modify this subject line or the first line of this email.\n\nPlease find my application details below:\n"
  );

  const positions = [
    {
      title: "Business Development Associate",
      department: "Growth",
      location: "Remote / Hybrid",
      type: "Full-time",
      experience: "0–3 years",
      description:
        "Work directly with leadership on deal sourcing, founder conversations, pipeline management, and commercial strategy. This role requires strong communication skills, judgment, and comfort operating in high-ambiguity environments."
    },
    {
      title: "Associate Consultant",
      department: "Consulting",
      location: "Remote / Hybrid",
      type: "Full-time",
      experience: "0–2 years",
      description:
        "Support client engagements across strategy, diagnostics, and execution planning. You will work on real business problems involving growth, operations, and decision-making under constraints."
    }
  ];

  const departments = ['All', 'Consulting', 'Growth'];

  const filteredPositions =
    selectedDepartment === 'All'
      ? positions
      : positions.filter((pos) => pos.department === selectedDepartment);

  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4 text-center">
            Current Openings
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto text-center mb-8">
            Explore opportunities to join our growing team. We work with people who value clarity, ownership, and execution.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-all duration-300 text-sm sm:text-base ${
                  selectedDepartment === dept
                    ? 'bg-white text-[#0A1E3D] shadow-lg'
                    : 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {filteredPositions.length > 0 ? (
          <div className="space-y-6">
            {filteredPositions.map((position, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-md p-6 border border-blue-800/30 hover:border-blue-700/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium text-white mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <span className="text-xs font-medium text-blue-400 bg-blue-600/20 px-2 sm:px-3 py-1 rounded-md">
                        {position.department}
                      </span>
                      <span className="text-xs font-medium text-gray-300 bg-gray-700/30 px-2 sm:px-3 py-1 rounded-md">
                        {position.location}
                      </span>
                      <span className="text-xs font-medium text-gray-300 bg-gray-700/30 px-2 sm:px-3 py-1 rounded-md">
                        {position.type}
                      </span>
                      <span className="text-xs font-medium text-gray-300 bg-gray-700/30 px-2 sm:px-3 py-1 rounded-md">
                        {position.experience}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`mailto:${applicationEmail}?subject=${encodeURIComponent(
                      emailSubject
                    )}&body=${emailBody}`}
                    className="bg-transparent border border-white text-black px-6 py-3 rounded-md hover:bg-gray-100 hover:!text-[#0A1E3D] transition-colors font-medium whitespace-nowrap self-start lg:self-center text-sm sm:text-base"
                  >
                    Send Application
                  </a>
                </div>

                <p className="text-gray-300 text-sm">
                  {position.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No positions available in this department currently.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// =====================================================
// LINKEDIN CTA SECTION
// =====================================================
const LinkedInCTASection = () => {
  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-[#0A1E3D] to-[#1a3a5c] rounded-md p-6 sm:p-8 lg:p-12 border border-blue-800/30 shadow-2xl">

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-[#0077B5] rounded-md mb-6 shadow-lg">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-4">
              Stay Updated on Career Opportunities
            </h2>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-8">
              Don't see the right role today? Follow us on LinkedIn where we post new career opportunities regularly, share insights about our work, and give you a behind-the-scenes look at life at Sarsen Strategy Partners.
            </p>

            <a
              href="https://www.linkedin.com/company/sarsen-strategy-partners/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#0077B5] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-[#006396] transition-all duration-300 font-medium shadow-lg group text-base sm:text-lg"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>Follow Us on LinkedIn</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

// =====================================================
// WHO WE'RE LOOKING FOR SECTION
// =====================================================
const WhoWereLookingForSection = () => {
  const qualities = [
    {
      title: "Strategic Thinkers",
      description: "You see patterns others miss, connect disparate ideas, and can articulate why something matters beyond surface-level analysis."
    },
    {
      title: "Exceptional Communicators",
      description: "You explain complex ideas simply, write with clarity and precision, and can influence without authority through logic and persuasion."
    },
    {
      title: "Relentlessly Curious",
      description: "You dig until you understand root causes, ask better questions than you answer, and constantly seek to expand your mental models."
    },
    {
      title: "Execution-Oriented",
      description: "You understand that perfect analysis without implementation is worthless. Your work is designed to be used, not admired."
    },
    {
      title: "Intellectually Honest",
      description: "You say 'I don't know' when you don't know, admit mistakes quickly, and update your views based on evidence rather than ego."
    },
    {
      title: "High Standards",
      description: "You're never satisfied with 'good enough,' yet you know when to ship. You balance excellence with pragmatism."
    }
  ];

  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
            Who We're Looking For
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
            Skills can be taught. We hire for characteristics that can't.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {qualities.map((quality, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-md p-6 border border-blue-800/30 hover:border-blue-700/50 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-lg sm:text-xl font-medium text-white mb-3">
                {quality.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {quality.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// =====================================================
// APPLICATION PROCESS SECTION
// =====================================================
const ApplicationProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Submit Application",
      description: "Send your resume and a brief cover letter explaining why you're interested in Sarsen Strategy Partners and what unique value you bring.",
      duration: "5 minutes"
    },
    {
      number: "02",
      title: "Initial Review",
      description: "We review all applications thoroughly. If there's potential fit, we'll reach out within 5-7 business days.",
      duration: "5-7 days"
    },
    {
      number: "03",
      title: "Screening Call",
      description: "30-minute conversation to discuss your background, understand your career goals, and explain our work in detail.",
      duration: "30 minutes"
    },
    {
      number: "04",
      title: "Case Study",
      description: "Real business problem similar to our client work. Demonstrates your analytical thinking and problem-solving approach.",
      duration: "3-4 hours"
    },
    {
      number: "05",
      title: "Final Interview",
      description: "In-depth discussion with senior team members covering case study, technical capabilities, and cultural fit.",
      duration: "90 minutes"
    },
    {
      number: "06",
      title: "Offer Decision",
      description: "If successful, we extend an offer within 48 hours of final interview. You have time to consider and ask questions.",
      duration: "2 days"
    }
  ];

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4">
            Our Application Process
          </h2>
          <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto">
            Transparent, respectful, and designed to identify mutual fit efficiently.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-md p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-full flex items-center justify-center text-white font-medium shadow-lg text-sm sm:text-base">
                {step.number}
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">
                    {step.title}
                  </h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md whitespace-nowrap ml-2">
                    {step.duration}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            Total timeline from application to offer typically takes 2-3 weeks. We move quickly for candidates we're excited about.
          </p>
        </div>

      </div>
    </section>
  );
};

// =====================================================
// MAIN CAREERS CLIENT COMPONENT
// =====================================================
export default function CareersClient() {
  return (
    <main className="min-h-screen">
      <CareersHero />
      <WhyJoinUsSection />
      <OpenPositionsSection />
      <LinkedInCTASection />
      <WhoWereLookingForSection />
    </main>
  );
}