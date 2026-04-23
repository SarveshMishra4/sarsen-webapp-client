// app/page.tsx
'use client';

import Link from 'next/dist/client/link';
import React, { useState, useEffect, useRef } from 'react';

// =====================================================
// TYPING EFFECT HOOK
// =====================================================
const useTypingEffect = (
  phrases: string[],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000
) => {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setDisplayText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setPhraseIndex((phraseIndex + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
};

// =====================================================
// HERO SECTION COMPONENT
// =====================================================
const HeroSection = () => {
  const problemPhrases = [
    'Unsure whether to scale or fix fundamentals ?',
    'Making decisions without knowing their second-order effects ?',
    'Growing activity, but unclear if the business is actually improving ?',
    'Confusing traction with progress ?',
    'Preparing to raise, but unsure if the business is structurally fundable ?',
    'Working harder, yet feeling less in control of the business ?',
  ];

  const typedProblem = useTypingEffect(problemPhrases, 80, 40, 2500);

  return (
    <section className="relative bg-[#0A1E3D] min-h-[500px] sm:min-h-[600px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl text-white">
                Running a startup means making irreversible decisions with incomplete information.
              </h2>
              <div className="min-h-[100px] sm:min-h-[120px]">
                <p className="text-xl sm:text-2xl md:text-2xl text-blue-300">
                  {typedProblem}
                  <span className="animate-pulse"></span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-64 sm:h-80 lg:h-[450px] flex items-center justify-center lg:justify-end">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full max-w-lg h-full flex items-center justify-center">
                <div className="text-center text-blue-400/50 p-8">
                  <img src="/assets/home/Home Head.svg" alt="" className="max-w-full h-auto" />
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
// PIONEERS WE ENDORSE — AUTO-SCROLLING MARQUEE
// Infinite ticker of globally recognised company logos/names
// Below the strip: data-privacy statement using "Sarsen"
// =====================================================
const PioneersStrip = () => {
  const pioneers: { name: string; description: string }[] = [
    { name: 'Ather Energy', description: 'Turned category scepticism into category leadership' },
    { name: 'Shrey Sports', description: 'Priced on trust before the market priced them at all' },
    { name: 'Gyan Dairy', description: 'Made backward integration a regional moat' },
    { name: 'Faasos', description: 'Rebuilt the unit economics before rebuilding the brand' },
    { name: 'Binghatti Properties', description: 'Used design as a land‑acquisition strategy' },
    { name: 'Mashreq', description: 'Ran digital transformation as a margin decision' },
    { name: 'Evian', description: 'Turned provenance into a global pricing lever' },
    { name: 'Bro Code', description: 'Built distribution loyalty before building distribution' },
  ];

  const doubled = [...pioneers, ...pioneers];

  return (
    <section className="bg-[#F0F4F8] py-10 sm:py-12 overflow-hidden">
      {/* Centered heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0A1E3D]">
          Pioneers We Endorse
        </h3>
      </div>

      {/* Marquee wrapper */}
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-24 z-10 bg-gradient-to-r from-[#F0F4F8] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-24 z-10 bg-gradient-to-l from-[#F0F4F8] to-transparent" />

        <div
          className="flex gap-4 sm:gap-6"
          style={{
            width: 'max-content',
            animation: 'marqueeScroll 40s linear infinite',
          }}
        >
          {doubled.map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 bg-white border border-gray-200 rounded-md px-5 py-3 sm:px-7 sm:py-4 shadow-sm flex flex-col items-center justify-center min-w-[200px] sm:min-w-[240px]"
            >
              <span className="text-[#0A1E3D] font-semibold text-sm sm:text-xl whitespace-nowrap">
                {p.name}
              </span>
              <span className="text-gray-500 text-[10px] sm:text-sm mt-1 text-center max-w-[180px] sm:max-w-[220px] leading-tight">
                {p.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Centered Privacy Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
        <div className="flex flex-row items-center justify-center gap-3 bg-transparent rounded-md px-5 py-4 sm:px-7 sm:py-5">
          <span className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-transparent flex items-center justify-center">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="#0A1E3D"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-center">
            <span className="font-semibold text-[#0A1E3D]">At Sarsen</span>, Every Engagement
            is Governed by Strict Professional Confidentiality.
          </p>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// ENDORSEMENT CARDS — WIDE RECTANGLE CARD CAROUSEL
// Sketch layout: two wide cards side-by-side visible,
// dot navigation below, click dot → that card appears
// Cards show H5 + paragraph content
// =====================================================

// interface EndorsementCard {
//   id: number;
//   heading: string;
//   body: string;
// }

// const EndorsementCardsSection = () => {
//   const cards: EndorsementCard[] = [
//     {
//       id: 1,
//       heading: 'Strategic Clarity Over Reactive Execution',
//       body:
//         'The most successful founders we have worked with share one trait — they pause before pivoting. Clarity on the problem precedes clarity on the solution. Before committing resources, they ask whether the constraint is structural or situational.',
//     },
//     {
//       id: 2,
//       heading: 'Capital Efficiency as a Competitive Moat',
//       body:
//         'Raising money is not progress. How you deploy each rupee defines your runway and your leverage in the next round. Founders who treat capital efficiency as strategy — not accounting — consistently outperform in downturns.',
//     },
//     {
//       id: 3,
//       heading: 'Distribution Is the Defensible Advantage',
//       body:
//         'Product parity is achievable. A customer relationship built on trust, insight, and repeated value delivery is not. The businesses that win are those that own their distribution channel and understand their buyer more deeply than anyone else.',
//     },
//     {
//       id: 4,
//       heading: 'Pricing Is a Positioning Statement',
//       body:
//         'Your price tells a prospect who you are. Discounting to close signals desperation; it also attracts the wrong customer profile. The founders who build durable businesses price confidently and design their offer to justify it.',
//     },
//     {
//       id: 5,
//       heading: 'The Founder Who Can Hire for Weakness Wins',
//       body:
//         'Self-awareness is a leadership skill. Founders who know exactly where their judgment is unreliable — and who deliberately hire or advise against those blind spots — build organisations that outlast their own involvement in every function.',
//     },
//     {
//       id: 6,
//       heading: 'Metrics Are Decisions in Waiting',
//       body:
//         'A dashboard that no one acts on is decoration. The right metrics are the ones that change what you decide next week. If a number does not alter a decision, it is not a business metric — it is noise dressed as data.',
//     },
//   ];

//   const [activeIndex, setActiveIndex] = useState(0);
//   const totalCards = cards.length;

//   // Auto-advance every 5 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % totalCards);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [totalCards]);

//   // On desktop show 2 cards side-by-side; on mobile show 1
//   // We derive the "left" and "right" card indices
//   const leftIndex = activeIndex;
//   const rightIndex = (activeIndex + 1) % totalCards;

//   return (
//     <section className="bg-[#F0F4F8] pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">

//         {/* Card grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//           {/* Left / primary card — always visible */}
//           <CardItem card={cards[leftIndex]} key={`left-${leftIndex}`} />

//           {/* Right card — hidden on mobile, visible md+ */}
//           <div className="hidden md:block">
//             <CardItem card={cards[rightIndex]} key={`right-${rightIndex}`} />
//           </div>
//         </div>

//         {/* Dot navigation */}
//         <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
//           {cards.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setActiveIndex(i)}
//               aria-label={`Go to card ${i + 1}`}
//               className={`rounded-full transition-all duration-300 ${
//                 i === activeIndex
//                   ? 'bg-[#0A1E3D] w-8 sm:w-10 h-3'
//                   : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       <style>{`
//         @keyframes cardFadeIn {
//           from { opacity: 0; transform: translateY(12px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .card-animate {
//           animation: cardFadeIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
//         }
//       `}</style>
//     </section>
//   );
// };

// // Individual card — wide rectangle with h5 + paragraph
// const CardItem = ({ card }: { card: EndorsementCard }) => (
//   <div className="card-animate bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 w-full">
//     <h5 className="text-[#0A1E3D] font-semibold text-base sm:text-lg lg:text-xl mb-3 leading-snug">
//       {card.heading}
//     </h5>
//     <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
//       {card.body}
//     </p>
//   </div>
// );

// =====================================================
// REPORT SECTION COMPONENT
// =====================================================
const ReportSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800">
                Indian Startup Ecosystem Report 2026
              </h2>

              <div className="space-y-4">
                <p className="text-gray-700 text-base sm:text-lg">
                  Comprehensive analysis of India's startup landscape covering funding trends,
                  sector-wise growth patterns, emerging opportunities across tier-1 and tier-2
                  cities, and strategic insights for founders and investors.
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  Based on data from 5,000+ startups, 200+ investor interviews, and ground-level
                  research across 15 major startup hubs. Essential reading for anyone navigating
                  the Indian entrepreneurial ecosystem.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                  </svg>
                  <span>142 pages</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2z" />
                  </svg>
                  <span>Last updated: Feb 2026</span>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="bg-white rounded-md shadow-2xl overflow-hidden max-w-md w-full transform transition-transform duration-300 hover:scale-105">
                <div className="bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] h-64 sm:h-72 md:h-80 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 overflow-hidden rounded-t-md rounded-b-none">
                    <img
                      src="/assets/home/Report 2026.webp"
                      alt="Report 2026"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                <div className="p-6 bg-white">
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3.5 px-6 rounded-md transition-all duration-300 font-medium text-base flex items-center justify-center gap-2"
                  >
                    Request Full Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 overflow-y-auto"
          onClick={() => setShowModal(false)}
        >
          <div className="flex items-end sm:items-center justify-center min-h-full px-4 sm:py-8">
            <div
              className="bg-white max-w-lg w-full rounded-md p-6 sm:p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>

              {!submitted ? (
                <>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    Request the full report
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    We&apos;ll email you the report and use responses to improve future research.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[#0A1E3D] mb-1">
                        Full Name
                      </label>
                      <input
                        required
                        placeholder="John Doe"
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0A1E3D]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0A1E3D] mb-1">
                        Work Email
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="john@company.com"
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0A1E3D]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0A1E3D] mb-1">
                        Phone Number
                      </label>
                      <input
                        required
                        placeholder="+91 9876543210"
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0A1E3D]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0A1E3D] mb-1">
                        Which best describes you?
                      </label>
                      <select
                        required
                        defaultValue=""
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-[#0A1E3D] focus:outline-none focus:ring-1 focus:ring-[#0A1E3D]"
                      >
                        <option value="" disabled>Select an option</option>
                        <option>Founder or Co-founder</option>
                        <option>CXO or Leadership</option>
                        <option>Early Employee</option>
                        <option>Investor or Advisor</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0A1E3D] mb-1">
                        Current business stage
                      </label>
                      <select
                        required
                        defaultValue=""
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-[#0A1E3D] focus:outline-none focus:ring-1 focus:ring-[#0A1E3D]"
                      >
                        <option value="" disabled>Select an option</option>
                        <option>Pre-idea / Exploring</option>
                        <option>Idea validated, No Revenue</option>
                        <option>Early revenue</option>
                        <option>Scaling</option>
                        <option>Preparing to Raise Capital</option>
                        <option>Post-Fundraise</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0A1E3D] mb-1">
                        Biggest Uncertainty Right Now
                      </label>
                      <select
                        required
                        defaultValue=""
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-[#0A1E3D] focus:outline-none focus:ring-1 focus:ring-[#0A1E3D]"
                      >
                        <option value="" disabled>Select an option</option>
                        <option>Product</option>
                        <option>Customer Profile</option>
                        <option>Pricing</option>
                        <option>Fundraising</option>
                        <option>Scalability</option>
                        <option>Unsure or Something Else</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 rounded-md transition-colors"
                    >
                      Email me the report
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    Check your email
                  </h3>
                  <p className="text-gray-600">
                    Your copy will be sent shortly. In case you need Help with your Business
                    Apply for our Strategic Diagnostic &amp; Direction Program.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// =====================================================
// COMPANY HELPS SECTION
// =====================================================
const CompanyHelpsSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const expertiseAreas = [
    {
      title: "When Sales Effort Isn't Turning Into Predictable Revenue",
      description:
        "Founders often assume growth problems are marketing problems. In reality, the issue is usually unclear positioning, fragile pricing, or a sales process that only works when the founder is involved. We redesign how revenue is generated — from who you sell to, how you price, and how deals actually close — so growth stops being dependent on hustle and starts becoming repeatable.",
    },
    {
      title: 'When Cash Feels Tight Despite Decent Revenue',
      description:
        "Many businesses don't fail because they aren't profitable on paper — they fail because cash timing, burn structure, and growth decisions are misaligned. We help founders understand where money is actually leaking, how long the business can realistically operate, and whether raising capital, slowing down, or restructuring is the right move — before the situation becomes urgent.",
    },
    {
      title: 'When the Business Runs on You Instead of Systems',
      description:
        "If decisions, approvals, and problem-solving keep flowing back to the founder, scale becomes impossible. We design operating systems — roles, processes, metrics, and accountability — so the business can function without constant intervention, reducing chaos, delays, and silent burnout inside teams.",
    },
    {
      title: 'When Direction Feels Unclear or Reactive',
      description:
        'Many teams stay busy without moving meaningfully forward. Initiatives change every quarter, priorities shift, and long-term direction remains vague. We help founders step out of reactive decision-making and build a clear strategic direction — deciding what not to pursue as deliberately as what to focus on.',
    },
    {
      title: "When You're Unsure If the Product Is the Real Problem",
      description:
        "Founders often sense something is wrong but can't tell whether it's the product, the customer, the market, or the messaging. We help isolate whether the issue is product-market fit, positioning, or execution — so teams stop rebuilding blindly and start fixing the right constraint.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const section = sectionRef.current;
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
        const scrollProgress =
          (windowHeight - sectionTop) / (windowHeight + sectionHeight);
        const cardIndex = Math.min(
          Math.floor(scrollProgress * expertiseAreas.length),
          expertiseAreas.length - 1
        );
        setActiveCard(cardIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [expertiseAreas.length]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0A1E3D] py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
            Sarsen Strategy Partners Specializes In
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            We work with founders at moments where progress slows, decisions feel heavier, and
            effort no longer translates into results. These are not execution problems. They are
            structural problems — in pricing, positioning, capital planning, internal systems,
            or the product itself. Our work begins by identifying what is actually broken, not
            what looks broken on the surface.
          </p>
        </div>

        <div className="mb-16 bg-[#132B47] rounded-md p-8 border border-blue-900/30">
          <div className="text-center text-blue-400/50 py-12">
            <img src="/assets/home/Speciality.svg" alt="" className="h-48 sm:h-64 mx-auto" />
          </div>
        </div>

        <div className="relative min-h-[450px] sm:min-h-[500px]">
          {expertiseAreas.map((area, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeCard ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="bg-gradient-to-br from-[#132B47] to-[#1a3a5c] rounded-md p-6 sm:p-8 lg:p-12 border border-blue-800/30 hover:border-blue-700/50 transition-all duration-300 h-full overflow-y-auto">
                <h3 className="text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium mb-4 sm:mb-6">
                  {area.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg">
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {expertiseAreas.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCard(index)}
              className={`transition-all duration-300 rounded-full ${
                index === activeCard
                  ? 'bg-blue-500 w-12 h-3'
                  : 'bg-blue-800/50 w-3 h-3 hover:bg-blue-700/50'
              }`}
              aria-label={`View service ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-16 sm:mt-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-gray-300 text-base sm:text-lg mb-2">
                Every engagement starts with clarity — not assumptions. Founders leave with a
                precise understanding of what is broken, why it is broken, and what sequence of
                decisions actually matters next.
              </p>
              <p className="text-gray-500 text-base">
                No motivational advice. No dependency. Just structured thinking you can execute.
              </p>
            </div>

            <div className="flex-shrink-0">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md transition-all duration-300 font-medium text-base shadow-lg hover:shadow-xl flex items-center gap-3 group">
                <Link href="/work" className="flex items-center gap-2">
                  <span>Read Our Case Studies</span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// TESTIMONIALS SECTION
// =====================================================
const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const entrepreneurs = [
    {
      id: 1,
      name: 'Naval Ravikant',
      title: 'Founder, AngelList',
      quote:
        'Play long-term games with long-term people. Specific knowledge is found by pursuing your genuine curiosity and passion rather than whatever is hot right now. Building anything great requires careful strategic thinking combined with relentless execution.',
      image: '/assets/home/naval.jpeg',
      handle: '@naval',
    },
    {
      id: 2,
      name: 'Paul Graham',
      title: 'Co-founder, Y Combinator',
      quote:
        "The way to get startup ideas is not to try to think of startup ideas. It's to look for problems, preferably problems you have yourself. The best ideas seem obvious in retrospect, but finding them requires deep strategic insight into market needs.",
      image: '/assets/home/Paul.webp',
      handle: '@paulg',
    },
    {
      id: 3,
      name: 'Peter Thiel',
      title: 'Co-founder, PayPal & Palantir',
      quote:
        "Competition is for losers. If you want to create lasting value, build a monopoly. But building something truly valuable requires intense focus on a specific problem and strategic positioning that others haven't thought of.",
      image: '/assets/home/Peter.webp',
      handle: '@peterthiel',
    },
    {
      id: 4,
      name: 'Reid Hoffman',
      title: 'Co-founder, LinkedIn',
      quote:
        "An entrepreneur is someone who jumps off a cliff and builds a plane on the way down. But the smartest entrepreneurs don't just build—they strategize, they plan, they seek counsel from those who've jumped before.",
      image: '/assets/home/Reid.png',
      handle: '@reidhoffman',
    },
    {
      id: 5,
      name: 'Marc Andreessen',
      title: 'Co-founder, Andreessen Horowitz',
      quote:
        'Software is eating the world, but strategy guides where it bites. The difference between success and failure often comes down to making the right strategic decisions at the right time with the right guidance.',
      image: '/assets/home/Marc.png',
      handle: '@pmarca',
    },
    {
      id: 6,
      name: 'Brian Chesky',
      title: 'Co-founder, Airbnb',
      quote:
        "Build something 100 people love, not something 1 million people kind of like. This requires deep customer understanding and strategic focus—something that benefits immensely from experienced guidance and external perspective.",
      image: '/assets/home/Brian.webp',
      handle: '@bchesky',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % entrepreneurs.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [entrepreneurs.length]);

  const person = entrepreneurs[activeIndex];

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-fadeUp {
          animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-6">
            Accomplished Entrepreneurs Understand This
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            Those who have built billion-dollar businesses emphasize the critical importance of
            strategic thinking, external guidance, and making informed decisions at every stage.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div key={`card-${activeIndex}`} className="animate-slideInLeft">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-md p-6 sm:p-8 lg:p-10 border border-gray-200">
                <div className="mb-5">
                  <img
                    src="/assets/home/Quoted.svg"
                    alt="Quote Icon"
                    width={52}
                    height={38}
                    className="rotate-180 scale-y-[-1]"
                  />
                </div>
                <blockquote className="text-gray-700 text-sm sm:text-base lg:text-lg mb-6">
                  {person.quote}
                </blockquote>
                <div className="pt-4">
                  <p className="text-gray-900 font-semibold text-base sm:text-lg mb-1">{person.name}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">{person.title}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end gap-8">
            <div key={`profile-${activeIndex}`} className="animate-fadeUp w-full max-w-xs">
              <div className="bg-white rounded-md border border-gray-200 shadow-sm px-5 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 border-2 border-gray-200">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.style.background =
                            'linear-gradient(135deg, #3B82F6, #1D4ED8)';
                          target.parentElement.innerHTML = `<span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:white;font-weight:700;font-size:1.1rem;">${person.name
                            .split(' ')
                            .map((n: string) => n[0])
                            .join('')}</span>`;
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold text-sm sm:text-base">{person.name}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-0.5">{person.title}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {entrepreneurs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex
                      ? 'bg-blue-500 w-8 h-3'
                      : 'bg-gray-300 w-3 h-3 hover:bg-gray-400'
                  }`}
                  aria-label={`View entrepreneur ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// FREE RESOURCES SECTION
// =====================================================
const FreeResourcesSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const resources = [
    {
      title: 'Startup Valuation Calculator',
      description:
        "Calculate your company's valuation using multiple methodologies - DCF, comparable analysis, and revenue multiples.",
      visualType: 'chart',
      bg: 'bg-gradient-to-br from-[#7B8FA5] to-[#8B9EB0]',
    },
    {
      title: 'Team Psychometric Assessment',
      description:
        'Evaluate team dynamics, leadership styles, and cultural fit. Identify strengths and gaps in your team.',
      visualType: 'graph',
      bg: 'bg-gradient-to-br from-[#6B7F95] to-[#7B8FA5]',
    },
    {
      title: 'Cash Flow Forecasting Tool',
      description:
        "Project your 13-week cash runway with scenario planning. See when you'll need funding or reach profitability.",
      visualType: 'bars',
      bg: 'bg-gradient-to-br from-[#8B9EB0] to-[#9BAEC0]',
    },
    {
      title: 'Market Sizing Framework',
      description:
        'Calculate TAM, SAM, and SOM for your business with templates to present to investors.',
      visualType: 'star',
      bg: 'bg-gradient-to-br from-[#7B8FA5] to-[#8B9EB0]',
    },
    {
      title: 'Financial Model Template',
      description:
        'Pre-built Excel model with P&L, balance sheet, and cash flow projections for startups.',
      visualType: 'chart',
      bg: 'bg-gradient-to-br from-[#6B7F95] to-[#7B8FA5]',
    },
    {
      title: 'Pitch Deck Framework',
      description:
        'Comprehensive slide-by-slide guide for creating investor-ready pitch decks that convert.',
      visualType: 'star',
      bg: 'bg-gradient-to-br from-[#8B9EB0] to-[#9BAEC0]',
    },
  ];

  const renderVisualIcon = (type: string) => {
    switch (type) {
      case 'chart':
        return (
          <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        );
      case 'graph':
        return (
          <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'bars':
        return (
          <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'star':
        return (
          <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      const newPosition =
        direction === 'left' ? scrollPosition - scrollAmount : scrollPosition + scrollAmount;
      scrollContainerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollContainerRef.current
    ? scrollPosition <
      scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10
    : true;

  return (
    <section className="bg-[#E8EEF2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4">Free Resources</h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl">
            Practical tools and calculators to help you make data-driven decisions. No signup
            required—start using them right away.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 ${
              canScrollLeft
                ? 'hover:bg-gray-100 cursor-pointer opacity-100'
                : 'opacity-30 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 ${
              canScrollRight
                ? 'hover:bg-gray-100 cursor-pointer opacity-100'
                : 'opacity-30 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6 md:px-12 py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={(e) => setScrollPosition((e.target as HTMLDivElement).scrollLeft)}
          >
            {resources.map((resource, index) => (
              <div
                key={index}
                className={`${resource.bg} rounded-md p-6 sm:p-8 min-w-[280px] sm:min-w-[320px] md:min-w-[340px] h-[240px] sm:h-[260px] flex flex-col justify-between hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden flex-shrink-0`}
              >
                <div className="relative z-10">
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl font-medium mb-2 sm:mb-3 group-hover:translate-x-1 transition-transform duration-300">
                    {resource.title}
                  </h3>
                  <p className="text-white/90 text-xs sm:text-sm line-clamp-4 sm:line-clamp-none">
                    {resource.description}
                  </p>
                </div>
                <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 text-white/20 group-hover:text-white/30 transition-colors duration-300">
                  {renderVisualIcon(resource.visualType)}
                </div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button className="bg-white text-gray-800 px-5 sm:px-8 py-2.5 sm:py-4 rounded-md hover:shadow-xl transition-all duration-300 font-medium border border-gray-300 hover:border-gray-400 flex items-center gap-2 group text-sm sm:text-base">
            <span>More Resources</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// STORY & PROCESS SECTION
// =====================================================
const StoryProcessSection = () => {
  return (
    <section className="bg-[#0A1E3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
            Our Story &amp; Process
          </h2>
          <div className="max-w-4xl">
            <p className="text-gray-300 text-base sm:text-lg mb-4">
              Most founders don&apos;t lack effort or intelligence — they lack clear signal. Too many
              variables change at once: growth stalls, cash tightens, teams slow down, and every
              decision feels risky.
            </p>
            <p className="text-gray-400 text-sm sm:text-base">
              Our process exists to remove noise before prescribing action. We don&apos;t start with
              solutions. We start by isolating what actually matters, so every subsequent decision
              becomes easier, faster, and defensible.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl sm:text-3xl text-white mb-8">How We Work</h3>
        </div>

        <div className="bg-[#132B47] rounded-md p-4 sm:p-6 lg:p-12 overflow-x-auto border border-blue-900/30">
          <img
            src="/assets/home/Methedology.svg"
            alt=""
            className="h-48 sm:h-64 mx-auto max-w-full"
          />
        </div>

        <div className="pt-4">
          <div className="text-center">
            <h4 className="text-white text-base sm:text-lg lg:text-xl font-medium mb-2">
              Designed for Founder-Led Execution
            </h4>
            <p className="text-gray-400 text-xs sm:text-sm">
              We step in to clarify decisions, not to run your business. The goal is independence,
              not ongoing consulting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// MAIN HOMEPAGE COMPONENT
// =====================================================
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      {/* ── NEW: Pioneers strip + endorsement cards ── */}
      <PioneersStrip />
      {/* <EndorsementCardsSection /> */}
      {/* ────────────────────────────────────────────── */}
      <ReportSection />
      <CompanyHelpsSection />
      <TestimonialsSection />
      <FreeResourcesSection />
      <StoryProcessSection />
    </main>
  );
}