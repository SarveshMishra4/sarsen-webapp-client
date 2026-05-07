// app/about/page.tsx
'use client';

import Link from 'next/dist/client/link';
import React, { useState, useRef, useEffect } from 'react';


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
            Why We Exist
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 ">
            Growth-stage businesses face decisions that are irreversible, capital-intensive, and time-bound. 
            Yet many founders are forced to rely on advice that is generic, surface-level, and detached from 
            the realities of operating under real constraints.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white rounded-md shadow-lg p-6 sm:p-8 lg:p-10 hover:shadow-xl transition-all duration-300">
            
            <h3 className="text-2xl font-medium text-gray-800 mb-4">The Problem</h3>
            <p className="text-gray-600  mb-4">
              Most advisory firms rely on standardized frameworks and recycled playbooks. The output often 
              looks polished, but fails to account for context, constraints, and execution realities.
            </p>
            <p className="text-gray-600 ">
              Founders do not need theoretical advice. They need decision-grade analysis that clarifies trade-offs, 
              highlights risks, and supports actions that can actually be executed.
            </p>
          </div>

          <div className="bg-white rounded-md shadow-lg p-6 sm:p-8 lg:p-10 hover:shadow-xl transition-all duration-300">
            
            <h3 className="text-2xl font-medium text-gray-800 mb-4">Our Solution</h3>
            <p className="text-gray-600  mb-4">
              We exist to address this gap through a diagnostic-first approach. Every engagement begins with 
              understanding how the business actually works—financially, operationally, and strategically.
            </p>
            <p className="text-gray-600 ">
              We do not position ourselves as passive advisors. We work alongside founders to structure 
              decisions using data, analysis, and a clear understanding of second-order effects.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-md p-6 sm:p-8 lg:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl  mb-4">Our Core Belief</h3>
            <p className="text-base sm:text-lg lg:text-xl  opacity-95">
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
  tier: 'Leadership' | 'Associate' | 'Analyst';
  bio: string;
  image: string;
}

const TeamSection = () => {
const BASE_MEMBERS: TeamMember[] = [
  {
    name: 'Sameer Dhaiya',
    role: 'Head of Supply Chain',
    tier: 'Leadership',
    bio: 'Over a decade of experience managing end-to-end supply chain operations across manufacturing and consumer businesses. Has led procurement restructuring, vendor consolidation, and logistics optimisation for businesses at various stages of scale.',
    image: '/assets/about/people/Sameer.png'
  },
  {
    name: 'Sarvesh Mishra',
    role: 'Head of Strategy',
    tier: 'Leadership',
    bio: 'A former entrepreneur who built and scaled a services business before moving into strategy advisory. Has worked extensively in private equity deal evaluation and portfolio strategy, bringing a founder\'s pragmatism to every engagement.',
    image: '/assets/about/people/Sarvesh.png'
  },
  {
    name: 'Vishal Gupta',
    role: 'Head of Business & Operations',
    tier: 'Leadership',
    bio: 'Brings deep operational experience across distribution, team structuring, and business growth. Has worked directly with founders to build systems that sustain performance under real growth conditions — not just on paper.',
    image: '/assets/about/people/Vishal.png'
  },
  {
    name: 'Aakansha Rao',
    role: 'Head of Customer Relations',
    tier: 'Leadership',
    bio: 'Leads client relationships with a focus on long-term engagement quality. Background in consulting and account management across professional services, with a track record of translating client needs into structured, actionable briefs.',
    image: '/assets/about/people/Aakansha.png'
  },
  {
    name: 'Rishabh Panda',
    role: 'Strategy & Growth Associate',
    tier: 'Associate',
    bio: 'Previously at Ernst & Young\'s transaction advisory practice, supporting financial due diligence and market analysis across mid-market engagements. Brings structured thinking and a strong grasp of numbers to growth strategy work.',
    image: '/assets/about/people/Panda.png'
  },
  {
    name: 'Eitan Shapiro',
    role: 'Senior Associate',
    tier: 'Associate',
    bio: 'Formerly with Bank Leumi\'s private equity and structured finance division, where he worked on investment screening and portfolio analysis across technology and industrial sectors. Rigorous, numbers-first, and comfortable with ambiguity.',
    image: '/assets/about/people/Eitan.png'
  },
  {
    name: 'Karan Malhotra',
    role: 'Associate',
    tier: 'Associate',
    bio: 'Has worked with businesses across manufacturing, distribution, and emerging consumer segments. Understands how companies operate under resource constraints and brings practical grounding to go-to-market and operational strategy work.',
    image: '/assets/about/people/Karan.png'
  },
  {
    name: 'Meghna Borah',
    role: 'Analyst',
    tier: 'Analyst',
    bio: 'Experienced in primary research, stakeholder mapping, and sector analysis. Previously worked with a policy research organisation focused on economic development, where she developed strong instincts for structuring qualitative findings into clear outputs.',
    image: '/assets/about/people/Meghna.png'
  },
  {
    name: 'Arun Nair',
    role: 'Analyst',
    tier: 'Analyst',
    bio: 'Background in financial analysis and transaction support from a stint at a Big Four advisory practice. Methodical and detail-oriented, with hands-on experience in due diligence, financial modelling, and competitive research.',
    image: '/assets/about/people/Arun.png'
  }
];

  const CARD_WIDTH = 280;
  const CARD_GAP = 20;
  const STEP = CARD_WIDTH + CARD_GAP;
  const CLONE_COUNT = 3; // clones on each side for seamless loop

  // Build infinite list: [...tail clones, ...real, ...head clones]
  const total = BASE_MEMBERS.length;
  const members: TeamMember[] = [
    ...BASE_MEMBERS.slice(total - CLONE_COUNT),
    ...BASE_MEMBERS,
    ...BASE_MEMBERS.slice(0, CLONE_COUNT),
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0); // index into BASE_MEMBERS
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isJumping = useRef(false);

  // Real position in the extended array
  const extIndex = (baseIdx: number) => baseIdx + CLONE_COUNT;

  // Scroll without animation (for seamless jump)
  const jumpTo = (extIdx: number) => {
    const track = trackRef.current;
    if (!track) return;
    isJumping.current = true;
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = extIdx * STEP;
    requestAnimationFrame(() => {
      track.style.scrollBehavior = 'smooth';
      isJumping.current = false;
    });
  };

  // Smooth scroll to an extended index
  const smoothTo = (extIdx: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: extIdx * STEP, behavior: 'smooth' });
  };

  // Navigate by base index (wraps correctly)
  const goTo = (baseIdx: number) => {
    const wrapped = ((baseIdx % total) + total) % total;
    setActiveIndex(wrapped);
    smoothTo(extIndex(wrapped));
  };

  const next = () => goTo(activeIndex + 1);
  const prev = () => goTo(activeIndex - 1);

  // Initialise scroll position to first real card
  useEffect(() => {
    jumpTo(extIndex(0));
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => {
        const nextIdx = (prev + 1) % total;
        smoothTo(extIndex(nextIdx));
        return nextIdx;
      });
    }, 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, total]);

  // Handle scroll end — detect when we've entered a clone region and jump back
  const handleScroll = () => {
    if (isJumping.current) return;
    const track = trackRef.current;
    if (!track) return;

    const scrollIdx = Math.round(track.scrollLeft / STEP);
    const newBaseIdx = ((scrollIdx - CLONE_COUNT) % total + total) % total;
    setActiveIndex(newBaseIdx);

    // If scrolled into leading clones
    if (scrollIdx < CLONE_COUNT) {
      jumpTo(extIndex(scrollIdx + total));
    }
    // If scrolled into trailing clones
    if (scrollIdx >= CLONE_COUNT + total) {
      jumpTo(extIndex(scrollIdx - total));
    }
  };

  const tierColor: Record<string, string> = {
    'Leadership': 'text-blue-300',
    'Associate': 'text-blue-300',
    'Analyst': 'text-blue-300',
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

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* Prev */}
          {/* <button
            onClick={prev}
            aria-label="Previous member"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-2 sm:translate-x-0
                       w-9 h-9 rounded-full bg-white/10 border border-white/20
                       flex items-center justify-center text-white hover:bg-white/20
                       transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button> */}

          {/* Track */}
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto px-10 sm:px-12"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              gap: `${CARD_GAP}px`,
              scrollSnapType: 'x mandatory',
            }}
          >
            {members.map((member, i) => {
              const baseIdx = ((i - CLONE_COUNT) % total + total) % total;
              const isActive = baseIdx === activeIndex && i === extIndex(activeIndex);
              return (
                <div
                  key={i}
                  onClick={() => { if (!isActive) goTo(baseIdx); }}
                  style={{
                    minWidth: `${CARD_WIDTH}px`,
                    maxWidth: `${CARD_WIDTH}px`,
                    scrollSnapAlign: 'start',
                    transition: 'transform 0.4s ease, opacity 0.4s ease',
                    transform: isActive ? 'scale(1)' : 'scale(0.95)',
                    opacity: isActive ? 1 : 0.5,
                    cursor: isActive ? 'default' : 'pointer',
                    flexShrink: 0,
                  }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
                >
                  <div className="w-full aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    
                    <h3 className="text-lg font-medium text-white mb-0.5">{member.name}</h3>
                    <p className={`text-sm mb-3 ${tierColor[member.tier]}`}>{member.role}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next */}
          {/* <button
            onClick={next}
            aria-label="Next member"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-2 sm:translate-x-0
                       w-9 h-9 rounded-full bg-white/10 border border-white/20
                       flex items-center justify-center text-white hover:bg-white/20
                       transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button> */}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {BASE_MEMBERS.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to ${BASE_MEMBERS[index].name}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-white w-6'
                  : 'bg-white/25 w-1.5 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        {/* <p className="text-center text-white/40 text-sm mt-3 tracking-wide">
          {activeIndex + 1} / {total}&nbsp;·&nbsp;{BASE_MEMBERS[activeIndex].name}
        </p> */}

        {/* Join Our Team */}
        <div className="mt-14 bg-white/5 backdrop-blur-sm rounded-xl p-6 sm:p-8 lg:p-12 border border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl text-white mb-6">Join Our Team</h3>
            <p className="text-gray-300 text-base sm:text-lg mb-8">
              We're always looking for exceptional strategists, analysts, and consultants who share
              our commitment to diagnostic rigor and measurable impact. If you're passionate about
              helping growth-stage businesses succeed, we'd love to hear from you.
            </p>
            <button className="bg-white text-[#0A1E3D] px-8 py-4 rounded-md hover:bg-gray-100 transition-colors font-medium shadow-lg inline-flex items-center justify-center gap-2">
              <Link href="/career" className="inline-flex items-center gap-2">
                <span>View Open Positions</span>
              </Link>
            </button>
          </div>
        </div>

      </div>

      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
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