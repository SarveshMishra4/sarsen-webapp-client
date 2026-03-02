// app/careers/page.tsx - PART 1 OF 2
// Copy this first, then immediately copy Part 2 below it
'use client';

import React, { useState } from 'react';

// =====================================================
// HERO SECTION COMPONENT
// =====================================================
const CareersHero = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[520px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: TEXT CONTENT */}
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-3xl lg:text-4xl text-white  mb-6">
              Work on real business problems.
            </h1>

            <p className="text-xl sm:text-2xl text-blue-300 font-light leading-relaxed mb-6">
              Strategy that gets executed — not admired.
            </p>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              We work with founders in high-constraint environments — limited capital, incomplete information,
              and decisions with real consequences.
              
            </p>
          </div>

          {/* RIGHT: GRAPHIC / SVG PLACEHOLDER */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-[#132B47] rounded-2xl border border-blue-900/30 p-8">
              
              {/* SVG PLACEHOLDER */}
              <div className="text-center text-blue-400/60 py-12">
                <svg
                  className="w-20 h-20 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 12h6l3 6 4-12 3 6h2"
                  />
                </svg>

                <p className="text-sm leading-relaxed">
                  Strategic thinking framework<br />
                  (Diagram placeholder)
                </p>
              </div>

            </div>
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
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Learn How Businesses Actually Operate",
      description:
        "You’ll see how founders make decisions with incomplete data, limited capital, and real downside risk. This is not textbook strategy — it’s exposure to how businesses really survive, grow, and sometimes fail.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "High Ownership, Low Supervision",
      description:
        "You are expected to own your work end-to-end — from problem framing to final output. We hire people who can think independently, ask better questions, and take responsibility for outcomes.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      title: "Merit Over Politics",
      description:
        "Growth here is driven by clarity of thinking, quality of execution, and reliability — not tenure, optics, or internal politics. If your work creates value, it’s visible.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: "Intensity Without Burnout Theater",
      description:
        "The work is demanding, but deliberate. We care about how time is used, not how long you stay online. Sustainable performance matters more than performative hustle.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Shape the Firm, Not Just Your Role",
      description:
        "This is an early-stage firm by design. Your thinking, standards, and decisions will influence how we work, what we build, and what we refuse to become.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-4 leading-tight">
            Why Join Sarsen & Company ?
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            This is not a place to hide, coast, or collect brand names.  
            It’s a place to think clearly, take responsibility, and do work that matters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  {reason.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#0A1E3D] transition-colors mb-2 leading-tight">
                    {reason.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
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
      : positions.filter(pos => pos.department === selectedDepartment);

  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight text-center">
            Current Openings
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto text-center mb-8">
            Explore opportunities to join our growing team. We work with people who value clarity, ownership, and execution.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
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
                className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-lg p-6 border border-blue-800/30 hover:border-blue-700/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-medium text-white mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="text-xs font-medium text-blue-400 bg-blue-600/20 px-3 py-1 rounded">
                        {position.department}
                      </span>
                      <span className="text-xs font-medium text-gray-300 bg-gray-700/30 px-3 py-1 rounded">
                        {position.location}
                      </span>
                      <span className="text-xs font-medium text-gray-300 bg-gray-700/30 px-3 py-1 rounded">
                        {position.type}
                      </span>
                      <span className="text-xs font-medium text-gray-300 bg-gray-700/30 px-3 py-1 rounded">
                        {position.experience}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`mailto:${applicationEmail}?subject=${encodeURIComponent(
                      emailSubject
                    )}&body=${emailBody}`}
                    className="bg-white text-[#0A1E3D] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium whitespace-nowrap self-start lg:self-center"
                  >
                    Apply Now
                  </a>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
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
        <div className="bg-gradient-to-br from-[#0A1E3D] to-[#1a3a5c] rounded-2xl p-8 sm:p-12 lg:p-16 border border-blue-800/30 shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0077B5] rounded-lg mb-6 shadow-lg">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight">
              Stay Updated on Career Opportunities
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Don't see the right role today? Follow us on LinkedIn where we post new career opportunities regularly, share insights about our work, and give you a behind-the-scenes look at life at Sarsen & Company.
            </p>

            <a
              href="https://www.linkedin.com/company/sarsen-and-company"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#0077B5] text-white px-8 py-4 rounded-lg hover:bg-[#006396] transition-all duration-300 font-medium shadow-lg group text-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>Follow Us on LinkedIn</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

// CONTINUE TO PART 2...
// app/careers/page.tsx - PART 2 OF 2
// This continues directly from Part 1 - paste this immediately after Part 1

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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
            Who We're Looking For
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Skills can be taught. We hire for characteristics that can't.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qualities.map((quality, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-lg p-6 border border-blue-800/30 hover:border-blue-700/50 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-medium text-white mb-3">
                {quality.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
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
      description: "Send your resume and a brief cover letter explaining why you're interested in Sarsen & Company and what unique value you bring.",
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-4 leading-tight">
            Our Application Process
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Transparent, respectful, and designed to identify mutual fit efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-full flex items-center justify-center text-white font-medium shadow-lg">
                {step.number}
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    {step.title}
                  </h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {step.duration}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 text-base leading-relaxed max-w-2xl mx-auto mb-6">
            Total timeline from application to offer typically takes 2-3 weeks. We move quickly for candidates we're excited about.
          </p>
        </div>

      </div>
    </section>
  );
};




// =====================================================
// MAIN CAREERS PAGE COMPONENT
// =====================================================
export default function CareersPage() {
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