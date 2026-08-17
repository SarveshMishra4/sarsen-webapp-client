// app/about/page.tsx
'use client';

import Link from 'next/dist/client/link';
import React, { useState, useEffect, useRef } from 'react';


// =====================================================
// HERO SECTION COMPONENT
// =====================================================
const AboutHero = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[400px] sm:min-h-[500px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white  ">
                About Us
              </h1>
              <p className="text-xl sm:text-2xl text-blue-300  ">
                Strategic diagnostics and execution-ready thinking for founders operating under real constraints.
              </p>
            </div>


          </div>

          <div className="relative h-64 sm:h-80 lg:h-[450px] flex items-center justify-center lg:justify-end">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full max-w-lg h-full  flex items-center justify-center ">
                <img src="/assets/about/About Head.svg" alt="" className="max-w-full h-auto" />
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl  text-gray-800 mb-6 ">
            Our Purpose
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 ">
            For a long time, strategy has been treated as a planning exercise. It isn't. Strategy is about
            obtaining compounding results in a specific direction — for startups building from zero and
            corporations scaling what already works.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white rounded-md shadow-lg p-6 sm:p-8 lg:p-10 hover:shadow-xl transition-all duration-300">

            <h3 className="text-2xl font-medium text-gray-800 mb-4">Execution Is the Surface</h3>
            <p className="text-gray-600  mb-4">
              Execution directly affects the outcome, and the quality of execution matters. The connection
              between the two is visible at the surface itself — you can see effort, activity, and output.
            </p>
            <p className="text-gray-600 ">
              But execution in its raw form does not give compounding results. Effort alone doesn't build
              on itself unless it's placed in the right order, for the right reasons, at the right time.
            </p>
          </div>

          <div className="bg-white rounded-md shadow-lg p-6 sm:p-8 lg:p-10 hover:shadow-xl transition-all duration-300">

            <h3 className="text-2xl font-medium text-gray-800 mb-4">Strategy Is the Direction</h3>
            <p className="text-gray-600  mb-4">
              Strategy is what gives execution a direction. It tells it what to build, when to build it, and
              how — so that the same effort produces a faster, better, stronger, more stable result.
            </p>
            <p className="text-gray-600 ">
              To achieve compounding results, execution has to be placed in the right sequence — so each
              step builds on the last, and the outcome compounds instead of resetting.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-md p-6 sm:p-8 lg:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl  mb-4">Our Core Belief</h3>
            <p className="text-base sm:text-lg lg:text-xl  opacity-95">
              Strategy, in its essence, is the plan for generating compounding effects out of the same
              execution. We don't exist to protect what you have — we exist to help you grow it,
              deliberately and in the right sequence.
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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Mission */}
          <div className="bg-white/5 backdrop-blur-sm rounded-md p-6 sm:p-8 lg:p-12 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl  text-white">Our Mission</h2>
            </div>
            <p className="text-gray-300 text-base sm:text-lg  mb-6">
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
          <div className="bg-white/5 backdrop-blur-sm rounded-md p-6 sm:p-8 lg:p-12 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl  text-white">Our Vision</h2>
            </div>
            <p className="text-gray-300 text-base sm:text-lg  mb-6">
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl  text-gray-800 mb-6 ">
            Our Strategic Thesis
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto ">
            Our work is guided by a clear thesis: strategy should reduce uncertainty, clarify trade-offs,
            and enable decisive action under real-world constraints.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="bg-white rounded-md shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">

                <div>
                  <h3 className="text-2xl font-medium text-gray-800 mb-2">
                    {principle.title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-600  mb-6 text-sm sm:text-base">
                {principle.description}
              </p>


            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-md p-6 sm:p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl  text-white mb-6 text-center">
              What Sets Us Apart
            </h3>
            <div className="grid sm:grid-cols-2 gap-6 text-white">
              <div className="flex items-start gap-3">
                                <img src="/assets/about/Tick.svg" alt="" className='h-6 w-6 flex-shrink-0'/>

                <div>
                  <p className="font-medium mb-1">No Generic Frameworks</p>
                  <p className="text-sm text-white/90">
                    Every engagement is structured from first principles
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <img src="/assets/about/Tick.svg" alt="" className='h-6 w-6 flex-shrink-0'/>
                <div>
                  <p className="font-medium mb-1">Context-Aware Strategy</p>
                  <p className="text-sm text-white/90">
                    Decisions shaped by capital, timing, and execution realities
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                                <img src="/assets/about/Tick.svg" alt="" className='h-6 w-6 flex-shrink-0'/>

                <div>
                  <p className="font-medium mb-1">Founder-Aligned Execution</p>
                  <p className="text-sm text-white/90">
                    We work alongside decision-makers, not around them
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                                <img src="/assets/about/Tick.svg" alt="" className='h-6 w-6 flex-shrink-0'/>

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

interface TeamMember {
  name: string;
  role: string;
  location: string;
  tier: 'Leadership' | 'Associate' | 'Analyst';
  bio: string;
  image: string;
}

const TeamSection = () => {
  const MEMBERS: TeamMember[] = [
    {
      name: 'Sameer Dhaiya',
      role: 'Senior Partner',
      location: 'Hyderabad - India',
      tier: 'Leadership',
      bio: 'Spent over a decade managing end-to-end supply chain operations across manufacturing and consumer businesses. Led a procurement restructuring programme for a multi-plant manufacturer, ran vendor consolidation initiatives that cut supplier redundancy, and re-engineered logistics networks for businesses moving from regional to national distribution. Expertise: procurement strategy, vendor negotiation, and logistics network design.',
      image: '/assets/about/people/Sameer.png'
    },
    {
      name: 'Sarvesh Mishra',
      role: 'Senior Partner',
      location: 'Goa - India',
      tier: 'Leadership',
      bio: 'Built and scaled a services business from the ground up before moving into strategy advisory. Worked extensively in private equity, evaluating investment opportunities and structuring portfolio-level strategy for growth-stage companies. Expertise: strategic diagnostics, PE deal evaluation, and founder-aligned execution planning.',
      image: '/assets/about/people/Sarvesh.png'
    },
    {
      name: 'Vishal Gupta',
      role: 'Senior Partner',
      location: 'New Delhi - India',
      tier: 'Leadership',
      bio: 'Built and restructured distribution networks and organisational systems for businesses scaling from single-city to multi-region operations. Worked directly with founders to design team structures and operating systems built to hold up under real growth pressure. Expertise: distribution strategy, organisational design, and operational scaling.',
      image: '/assets/about/people/Vishal.png'
    },
    {
      name: 'Aakansha Rao ',
      role: 'Associate',
      location: 'Bengaluru - India',
      tier: 'Leadership',
      bio: 'Managed key client relationships across professional services and consulting firms, with a track record of turning client needs into structured, actionable engagement briefs. Background in account management, where she was responsible for long-term retention and engagement quality on high-value accounts. Expertise: client relationship management, stakeholder communication, and account strategy.',
      image: '/assets/about/people/Aakansha.png'
    },
    {
      name: 'Rishabh Panda',
      role: 'Associate',
      location: 'Bengaluru - India',
      tier: 'Associate',
      bio: 'Worked at Ernst & Young\'s transaction advisory practice, where he supported financial due diligence and market analysis on mid-market transactions. Handled deal-support workstreams involving market sizing, competitive benchmarking, and financial modelling. Expertise: financial due diligence, market analysis, and growth strategy.',
      image: '/assets/about/people/Panda.png'
    },
    {
      name: 'Eitan Shapiro',
      role: 'Partner',
      location: 'Boston - United States',
      tier: 'Associate',
      bio: 'Worked with Bank Leumi\'s private equity and structured finance division, where he screened investment opportunities and conducted portfolio analysis across technology and industrial sectors. Handled deal evaluation and risk assessment for structured finance transactions. Expertise: investment screening, structured finance, and portfolio analysis.',
      image: '/assets/about/people/Eitan.png'
    },
    {
      name: 'Karan Malhotra',
      role: 'Associate',
      location: 'Pune - India',
      tier: 'Associate',
      bio: 'Worked with businesses across manufacturing, distribution, and emerging consumer segments, handling go-to-market and operational strategy engagements for companies operating under tight resource constraints. Expertise: go-to-market strategy, resource-constrained operations, and execution planning.',
      image: '/assets/about/people/Karan.png'
    },
    {
      name: 'Meghna Borah',
      role: 'Business Analyst',
      location: 'New Delhi - India',
      tier: 'Analyst',
      bio: 'Worked with a policy research organisation focused on economic development, where she conducted primary research, stakeholder mapping, and sector analysis. Handled the structuring of qualitative findings from field research into clear, decision-ready outputs. Expertise: primary research, stakeholder mapping, and sector analysis.',
      image: '/assets/about/people/Meghna.png'
    },
    {
      name: 'Arun Nair',
      role: 'Business Analyst',
      location: 'Bengaluru - India',
      tier: 'Analyst',
      bio: 'Worked at a Big Four advisory practice on financial analysis and transaction support, handling due diligence workstreams and financial modelling for client transactions. Expertise: financial modelling, due diligence, and competitive research.',
      image: '/assets/about/people/Arun.png'
    }
  ];

  const [selected, setSelected] = useState<TeamMember | null>(null);

  // Lock background scroll while modal is open
  useEffect(() => {
    if (selected) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [selected]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // =====================================================
  // Auto-scrolling infinite carousel (replaces the static grid)
  // Card markup/sizing is unchanged — only the layout wrapper differs.
  // =====================================================
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const unitRef = useRef(0);        // width of one card + gap, in px (measured live)
  const posRef = useRef(0);         // current scroll offset, in px
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);

  const SPEED = 40; // px per second

  // Two back-to-back copies of the members create the seamless infinite loop.
  const loopMembers = [...MEMBERS, ...MEMBERS];

  // Measure real card width + gap (works across every breakpoint automatically)
  useEffect(() => {
    const measure = () => {
      const a = cardRefs.current[0];
      const b = cardRefs.current[1];
      if (a && b) {
        unitRef.current = b.getBoundingClientRect().left - a.getBoundingClientRect().left;
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Continuous auto-scroll loop, pauses on hover and while the modal is open
  useEffect(() => {
    let raf: number;
    let last = performance.now();

    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const isPaused = hoverPaused || !!selected;
      const unit = unitRef.current;

      if (!isPaused && unit > 0) {
        posRef.current += SPEED * dt;
        const setWidth = unit * MEMBERS.length;
        if (posRef.current >= setWidth) posRef.current -= setWidth;

        const idx = Math.round(posRef.current / unit) % MEMBERS.length;
        if (idx !== activeIndexRef.current) {
          activeIndexRef.current = idx;
          setActiveIndex(idx);
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [hoverPaused, selected, MEMBERS.length]);

  // Clicking a dot jumps the strip to that member; the loop then continues from there
  const goToIndex = (index: number) => {
    const unit = unitRef.current;
    if (unit > 0) {
      posRef.current = unit * index;
    }
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">Our Team</h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            A growing team of strategic thinkers, analysts, and operators committed to delivering
            excellence in every engagement.
          </p>
        </div>

        {/*
          Auto-scrolling horizontal strip — infinite loop (two copies of MEMBERS placed
          back to back; once the first copy fully scrolls past, the offset wraps by exactly
          one set-width so it never visibly resets). Card size/markup is identical to before.
        */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
        >
          <div ref={trackRef} className="flex gap-3 sm:gap-4 will-change-transform">
            {loopMembers.map((member, i) => (
              <button
                key={`${member.name}-${i}`}
                ref={(el) => { cardRefs.current[i] = el; }}
                onClick={() => setSelected(member)}
                className="flex-shrink-0 w-36 sm:w-44 md:w-52 lg:w-56 text-left bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="relative w-full aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/*
                    Location badge — pinned to the top-right corner on every screen size.
                    - text scales down (9px/11px/xs) instead of a fixed text-sm that overflowed tiny cards
                    - inner text span truncates instead of wrapping onto multiple lines
                    - badge width is capped so it never spills past the right edge of the card
                    - icon has flex-shrink-0 so it never gets squeezed by long location names
                  */}
                  <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 flex items-center gap-0.5 sm:gap-1 bg-[#0A1E3D] backdrop-blur-sm text-white text-[9px] sm:text-[10px] md:text-xs px-1 py-0.5 sm:px-1.5 rounded-md font-medium max-w-[70%] sm:max-w-[75%]">
                    <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{member.location}</span>
                  </span>
                </div>
                <div className="p-2 sm:p-2.5 md:p-3">
                  <h3 className="text-sm sm:text-sm md:text-base lg:text-xl font-medium text-white truncate">{member.name}</h3>
                  <p className="text-xs sm:text-xs md:text-sm lg:text-md text-blue-300 truncate">{member.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dots — one per unique member; clicking jumps the strip back to that person */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {MEMBERS.map((member, i) => (
            <button
              key={member.name}
              onClick={() => goToIndex(i)}
              aria-label={`Go to ${member.name}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'w-6 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Details Modal */}
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0A1E3D] border border-white/10 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid sm:grid-cols-[220px_1fr] md:grid-cols-[300px_1fr]">
                <div className="w-full aspect-square sm:aspect-auto sm:h-full">
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 sm:p-8 md:p-10">
                  <h3 className="text-xl sm:text-2xl md:text-3xl text-white mb-1">{selected.name}</h3>
                  <p className="text-blue-300 text-sm sm:text-base mb-4 sm:mb-6">{selected.role}</p>
                  <p className="text-gray-300 text-sm sm:text-base text-justify leading-relaxed">{selected.bio}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Join Our Team */}
        <div className="mt-14 bg-white/5 backdrop-blur-sm rounded-xl p-6 sm:p-8 lg:p-12 border border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl text-white mb-6">Join Our Team</h3>
            <p className="text-gray-300 text-base sm:text-lg mb-8">
              We're always looking for exceptional strategists, analysts, and consultants who share
              our commitment to diagnostic rigor and measurable impact. If you're passionate about
              helping growth-stage businesses succeed, we'd love to hear from you.
            </p>
            <Link
              href="/career"
              className="bg-white !text-[#0A1E3D] hover:!text-[#0A1E3D] px-8 py-4 rounded-md hover:bg-gray-100 transition-colors font-medium shadow-lg inline-flex items-center justify-center gap-2"
              style={{ color: '#0A1E3D' }}
            >
              <span>View Open Positions</span>
            </Link>
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
        <div className="bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-md overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            <div className="p-6 sm:p-8 lg:p-12">
              <h2 className="text-3xl sm:text-4xl text-white  mb-4 ">
                Start with a Strategic Diagnostic
              </h2>
              <p className="text-white/90 text-base sm:text-lg mb-8">
                We do not offer free calls or exploratory conversations. Every engagement begins with a paid
                strategic diagnostic designed to clarify your situation, surface real constraints, and define
                decision-ready next steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services/business-diagnostic-direction" >
                <button className="bg-white text-[#0A1E3D] px-8 py-4 rounded-md hover:bg-gray-100 transition-colors font-medium shadow-lg inline-flex items-center justify-center gap-2 group">
                  <span>Initiate Diagnostic Engagement</span>

                </button>
                </Link>
                <Link href="/contact" >
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md hover:bg-white/10 transition-colors font-medium inline-flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Formal Inquiry</span>
                </button>
                </Link>
              </div>
            </div>

            <div className="relative h-64 sm:h-80 lg:h-96 p-8 flex items-center justify-center">
              <div className="w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-md p-8 border border-white/20">
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