// src/app/beyond-business-and-management/global-hiring/hiringClient.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { apiRequest } from '@/services/api';

// =====================================================
// HOOK — fires once when an element scrolls into view.
// =====================================================
const useInViewOnce = <T extends HTMLElement>(threshold = 0.25) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return { ref, inView };
};

// =====================================================
// SHARED — Diagonal line pattern overlay (site-wide motif).
// Each instance needs a unique id.
// =====================================================
const DiagonalPattern = ({ id, opacity = 'opacity-20' }: { id: string; opacity?: string }) => (
  <div className={`absolute inset-0 ${opacity} pointer-events-none`}>
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id={id}
          patternUnits="userSpaceOnUse"
          width="5"
          height="5"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" strokeWidth="0.75" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  </div>
);

const ChevronIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// =====================================================
// HERO VISUAL — TALENT PYRAMID
// Tiers build top-down on mount: one leader at the apex,
// widening to the full project workforce at the base.
// =====================================================
const TalentPyramid = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const tiers = [
    { label: 'Board & C-Suite', scale: '1', width: '36%' },
    { label: 'Senior Leadership', scale: '10s', width: '52%' },
    { label: 'Specialists & Professionals', scale: '100s', width: '68%' },
    { label: 'Skilled Trades', scale: '1,000s', width: '84%' },
    { label: 'Project Workforce', scale: '2,000+', width: '100%' },
  ];

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes tierGlow {
          0%, 100% { box-shadow: 0 0 0 rgba(96,165,250,0); }
          50%      { box-shadow: 0 0 18px rgba(96,165,250,0.45); }
        }
        .tier-apex { animation: tierGlow 3.2s ease-in-out infinite; }
      `}</style>

      <div className="flex flex-col items-center gap-2">
        {tiers.map((t, i) => (
          <div
            key={t.label}
            className={`flex items-center justify-between rounded-md border-2 border-white px-3 sm:px-4 py-2 sm:py-2.5 transition-all duration-700 ease-out ${
              i === 0 ? 'bg-white text-[#0A1E3D] tier-apex' : 'bg-[#0A1E3D] text-white'
            }`}
            style={{
              width: mounted ? t.width : '20%',
              opacity: mounted ? 1 : 0,
              transitionDelay: `${i * 160}ms`,
            }}
          >
            <span className="text-xs sm:text-sm truncate pr-2">{t.label}</span>
            <span className={`text-xs sm:text-sm flex-shrink-0 ${i === 0 ? 'text-[#0A1E3D]' : 'text-blue-300'}`}>
              {t.scale}
            </span>
          </div>
        ))}
      </div>

      <p className="text-white/70 text-base text-center mt-6">
        One Partner. Every Level.
      </p>
    </div>
  );
};

// =====================================================
// HERO SECTION
// =====================================================
const HiringHeroSection = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[400px] sm:min-h-[500px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <DiagonalPattern id="hire-hero-grid" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN */}
          <div className="space-y-6">
            <p className="text-blue-300 text-sm sm:text-base tracking-widest uppercase">
              Sarsen Beyond · Global Hiring
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white">
              Global Hiring & Project Workforce Consulting
            </h1>

            <p className="text-lg sm:text-xl text-gray-300">
              A CEO to Lead Your Company. 2,000 Skilled Workers for a Project in the Middle East. Whatever the Role, Wherever the Site, We Find, Vet and Deliver the People Your Business Needs.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a
                href="#enquiry"
                className="w-full sm:w-auto bg-white !text-[#0A1E3D] hover:bg-blue-50 px-6 sm:px-8 py-4 rounded-md transition-all duration-300 font-medium text-base shadow-lg hover:shadow-xl text-center"
              >
                Share Your Hiring Need
              </a>
              <a
                href="#spectrum"
                className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:!text-[#0A1E3D] text-white px-6 sm:px-8 py-4 rounded-md transition-all duration-300 font-medium text-base text-center"
              >
                What We Hire For
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <TalentPyramid />
          </div>

        </div>
      </div>
    </section>
  );
};

// =====================================================
// SPECTRUM — FROM THE BOARDROOM TO THE BUILD SITE
// =====================================================
const SpectrumSection = () => {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.15);

  const levels = [
    {
      title: 'Board & C-Suite',
      body: 'CEOs, CFOs, COOs, Managing Directors and Board Members, Searched Discreetly and Assessed Rigorously.',
      roles: ['Chief Executive Officer', 'Chief Financial Officer', 'Country Head', 'Independent Director'],
    },
    {
      title: 'Senior Leadership',
      body: 'Leaders Who Run Functions, Regions and Business Units, and Who Fit the Culture They are Joining.',
      roles: ['Vice Presidents', 'Regional Directors', 'Heads of Function', 'Project Directors'],
    },
    {
      title: 'Specialists & Professionals',
      body: 'Engineers, Technologists, Finance, Legal and Domain Experts for Permanent or Project Roles.',
      roles: ['Engineers & Architects', 'Project Managers', 'Technology Specialists', 'Finance & Legal'],
    },
    {
      title: 'Skilled Trades',
      body: 'Certified, Trade-Tested Technicians and Supervisors Ready to Work to International Standards.',
      roles: ['Electricians & Welders', 'Pipe Fitters', 'Equipment Operators', 'Site Supervisors'],
    },
    {
      title: 'Project Workforce',
      body: 'Large-Scale Mobilisation of Workers for Construction, Infrastructure, Energy and Industrial Projects.',
      roles: ['General Labour', 'Masons & Carpenters', 'Helpers & Riggers', 'Facility Staff'],
    },
  ];

  return (
    <section id="spectrum" className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4">
            From the Boardroom to the Build Site
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            Most Firms Hire at One Level. We Hire at Every Level, so a Single Partner can Staff Your Leadership and Your Project Site Alike.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {levels.map((l, i) => (
            <div
              key={l.title}
              className="bg-white rounded-md shadow-lg p-6 hover:shadow-xl transition-all duration-500 flex flex-col"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <span className="text-3xl text-[#0A1E3D]/20 mb-4">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">{l.title}</h3>
              <p className="text-gray-600 text-sm mb-5 flex-1">{l.body}</p>

              <ul className="space-y-2 border-t border-gray-200 pt-4">
                {l.roles.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-[#0A1E3D]">
                    <ChevronIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// =====================================================
// ENGAGEMENT MODELS — EXECUTIVE SEARCH vs PROJECT HIRING
// =====================================================
const EngagementModelsSection = () => {
  return (
    <section id="models" className="bg-[#d4dce5] pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-8">

        {/* Executive & Permanent Search */}
        <div className="bg-white rounded-md shadow-2xl p-6 sm:p-8 lg:p-10">
          <p className="text-[#0A1E3D]/50 text-xs tracking-widest uppercase mb-3">Model One</p>
          <h3 className="text-2xl sm:text-3xl text-gray-800 mb-3">Executive & Permanent Search</h3>
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            For the Roles that Shape Your Company. We Define the Role Against Your Strategy, Map the Market, Approach Candidates Discreetly and Assess Them in Depth Before You Meet Them.
          </p>
          <ul className="space-y-3">
            {[
              'Role Definition Linked to Business Strategy',
              'Confidential Market Mapping and Outreach',
              'Structured Assessment and Referencing',
              'Offer, Negotiation and Onboarding Support',
            ].map((p) => (
              <li key={p} className="flex items-start gap-3 text-[#0A1E3D] text-sm sm:text-base">
                <ChevronIcon className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Project-Specific Hiring */}
        <div className="relative bg-[#0A1E3D] rounded-md shadow-2xl p-6 sm:p-8 lg:p-10 text-white overflow-hidden">
          <DiagonalPattern id="hire-model-grid" />
          <div className="relative">
            <p className="text-white/50 text-xs tracking-widest uppercase mb-3">Model Two</p>
            <h3 className="text-2xl sm:text-3xl mb-3">Project-Specific Hiring</h3>
            <p className="text-white/70 text-sm sm:text-base mb-6">
              For Projects with a Start Date, a Site and a Headcount. We Build the Team Around the Project Plan, from Project Directors to the Full Workforce, and Mobilise Them on Schedule.
            </p>
            <ul className="space-y-3">
              {[
                'Headcount Planning Against Project Phases',
                'Bulk Sourcing, Screening and Trade Testing',
                'Documentation, Visas and Travel Coordination',
                'Phased Mobilisation and Demobilisation',
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-white/90 text-sm sm:text-base">
                  <ChevronIcon className="w-4 h-4 mt-1 flex-shrink-0 text-blue-400" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

// =====================================================
// PROJECT WORKFORCE — MOBILISATION TIMELINE
// Stages light up one after another on scroll.
// =====================================================
const MobilisationTimeline = () => {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.25);

  const stages = [
    { label: 'Requirement', note: 'Trades, headcount, timeline and site conditions' },
    { label: 'Sourcing', note: 'Candidate pools across source countries' },
    { label: 'Screening', note: 'Interviews, trade tests and medicals' },
    { label: 'Documentation', note: 'Contracts, visas and compliance' },
    { label: 'Mobilisation', note: 'Travel, arrival and site induction' },
    { label: 'On-Site Support', note: 'Welfare, replacements and reporting' },
  ];

  return (
    <div ref={ref} className="relative">
      {/* Connector — desktop */}
      <div className="hidden lg:block absolute top-8 left-[8%] right-[8%] h-[2px] bg-white/15">
        <div
          className="h-full bg-blue-400 transition-all ease-out"
          style={{ width: inView ? '100%' : '0%', transitionDuration: '1600ms' }}
        />
      </div>

      {/* Connector — mobile/tablet (vertical) */}
      <div className="lg:hidden absolute left-8 top-8 bottom-8 w-[2px] bg-white/15">
        <div
          className="w-full bg-blue-400 transition-all ease-out"
          style={{ height: inView ? '100%' : '0%', transitionDuration: '1600ms' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-4">
        {stages.map((s, i) => (
          <div
            key={s.label}
            className="relative flex lg:flex-col items-center lg:text-center gap-4 lg:gap-0 transition-all duration-500"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: `${i * 220}ms`,
            }}
          >
            <div
              className={`relative z-10 w-16 h-16 flex-shrink-0 rounded-full border-2 flex items-center justify-center text-lg ${
                i === stages.length - 1
                  ? 'bg-white border-white text-[#0A1E3D]'
                  : 'bg-[#132B47] border-white text-white'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="lg:mt-4">
              <h4 className="text-lg text-white">{s.label}</h4>
              <p className="text-gray-400 text-sm mt-1">{s.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectWorkforceSection = () => {
  const sectors = [
    'Construction & Infrastructure',
    'Oil, Gas & Energy',
    'Manufacturing & Industrial',
    'Hospitality & Facilities',
    'Healthcare',
    'Logistics & Transport',
  ];

  return (
    <section id="project-workforce" className="bg-[#0A1E3D] py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Workforce Mobilisation at Scale
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
            Building in the Middle East or Anywhere Else? We Plan, Source and Mobilise Hundreds or Thousands of Workers in Phases that Match Your Project Schedule.
          </p>
        </div>

        <MobilisationTimeline />

        <div className="mt-16 sm:mt-20">
          <p className="text-white/50 text-xs tracking-widest uppercase text-center mb-6">Sectors We Staff</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {sectors.map((s) => (
              <div
                key={s}
                className="bg-[#132B47] rounded-md border border-blue-900/30 hover:border-blue-700/50 transition-all duration-300 px-4 py-5 text-center text-white text-sm sm:text-base"
              >
                {s}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

// =====================================================
// GLOBAL REACH — WHERE WE HIRE AND DEPLOY
// =====================================================
const GlobalReachSection = () => {
  const regions = [
    { region: 'Middle East', body: 'Large-scale project deployment across the GCC and wider region.' },
    { region: 'South Asia', body: 'Deep pools of skilled trades, engineers and professionals.' },
    { region: 'Southeast Asia', body: 'Technical, hospitality and specialist talent.' },
    { region: 'Africa', body: 'Emerging talent markets and project deployment.' },
    { region: 'Europe', body: 'Senior leadership and specialist expertise.' },
    { region: 'The Americas', body: 'Executive search and specialist hiring.' },
  ];

  return (
    <section id="regions" className="bg-[#F0F4F8] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4">
            Hire Anywhere. Deploy Anywhere.
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            We Source Talent Where it is Strongest and Place it Where Your Business Needs it, Across Borders and Time Zones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {regions.map((r) => (
            <div
              key={r.region}
              className="bg-white rounded-md shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-[#0A1E3D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#0A1E3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-800">{r.region}</h3>
                <p className="text-sm sm:text-base text-gray-500 mt-1">{r.body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// =====================================================
// STANDARDS — HOW WE HIRE
// =====================================================
const StandardsSection = () => {
  const standards = [
    {
      title: 'Ethical Recruitment',
      body: 'Workers are Recruited Fairly and Transparently, with Clear Contracts They Understand Before They Travel.',
    },
    {
      title: 'Compliance First',
      body: 'Labour Law, Immigration and Documentation Requirements in Both Source and Destination Countries are Met.',
    },
    {
      title: 'Vetted Before Presented',
      body: 'Every Candidate is Screened, Tested or Assessed for the Role Before They Reach You.',
    },
    {
      title: 'Accountable After Placement',
      body: 'We Stay Involved After Arrival, with Support, Reporting and Replacements Where Agreed.',
    },
  ];

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">

        <div className="lg:col-span-2 relative bg-[#0A1E3D] rounded-md p-6 sm:p-8 lg:p-10 text-white shadow-xl overflow-hidden">
          <DiagonalPattern id="hire-standards-grid" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4">How We Hire</h2>
            <p className="text-white/70 text-sm sm:text-base">
              Speed Matters, but Not at the Cost of the People We Place or the Companies We Serve. These Standards Apply at Every Level, from the Boardroom to the Build Site.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4 sm:gap-6">
          {standards.map((s) => (
            <div key={s.title} className="bg-white rounded-md shadow-lg p-6 border-l-4 border-[#0A1E3D]">
              <h3 className="text-lg font-medium text-gray-800 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{s.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// =====================================================
// ENQUIRY FORM SECTION
// Same backend contract as the Contact page:
// POST /contact with { name, email, message }.
// =====================================================
const HiringEnquirySection = () => {
  const emptyForm = {
    name: '',
    email: '',
    company: '',
    phone: '',
    hiringType: '',
    headcount: '',
    location: '',
    message: '',
  };

  const [formData, setFormData] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const enrichedMessage = [
      '[Global Hiring Enquiry]',
      formData.message,
      formData.hiringType ? `Hiring Need: ${formData.hiringType}` : '',
      formData.headcount ? `Headcount: ${formData.headcount}` : '',
      formData.location ? `Work Location: ${formData.location}` : '',
      formData.company ? `Company: ${formData.company}` : '',
      formData.phone ? `Phone: ${formData.phone}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await apiRequest('POST', '/contact', {
        body: {
          name: formData.name,
          email: formData.email,
          message: enrichedMessage,
        },
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData(emptyForm);
      }, 5000);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800';
  const labelClass = 'block text-md font-medium text-[#0A1E3D] mb-2';

  return (
    <section id="enquiry" className="bg-[#F0F4F8] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-md shadow-2xl p-6 sm:p-8 lg:p-10">

          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 mb-3">
              Tell Us Who You Need
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              One Leader or an Entire Workforce. Share the Role, the Headcount and the Location, and We Will Come Back with a Plan.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="hire-name" className={labelClass}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input id="hire-name" name="name" type="text" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="Alex Doe" />
              </div>
              <div>
                <label htmlFor="hire-email" className={labelClass}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input id="hire-email" name="email" type="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="alex@company.com" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="hire-company" className={labelClass}>Company Name</label>
                <input id="hire-company" name="company" type="text" value={formData.company} onChange={handleChange} className={inputClass} placeholder="Your Company Ltd" />
              </div>
              <div>
                <label htmlFor="hire-phone" className={labelClass}>Phone Number</label>
                <input id="hire-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+971 50 123 4567" />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <label htmlFor="hire-type" className={labelClass}>Hiring Need</label>
                <select id="hire-type" name="hiringType" value={formData.hiringType} onChange={handleChange} className={`${inputClass} bg-white`}>
                  <option value="">Select</option>
                  <option value="Board & C-Suite">Board & C-Suite</option>
                  <option value="Senior Leadership">Senior Leadership</option>
                  <option value="Specialists & Professionals">Specialists & Professionals</option>
                  <option value="Skilled Trades">Skilled Trades</option>
                  <option value="Project Workforce">Project Workforce</option>
                  <option value="Multiple Levels">Multiple Levels</option>
                </select>
              </div>
              <div>
                <label htmlFor="hire-headcount" className={labelClass}>Headcount</label>
                <input id="hire-headcount" name="headcount" type="text" value={formData.headcount} onChange={handleChange} className={inputClass} placeholder="e.g. 1 or 2,000" />
              </div>
              <div>
                <label htmlFor="hire-location" className={labelClass}>Work Location</label>
                <input id="hire-location" name="location" type="text" value={formData.location} onChange={handleChange} className={inputClass} placeholder="e.g. Riyadh, KSA" />
              </div>
            </div>

            <div>
              <label htmlFor="hire-message" className={labelClass}>
                Tell Us About the Role or Project <span className="text-red-500">*</span>
              </label>
              <textarea
                id="hire-message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                placeholder="For Example : We are Starting a Construction Project in the UAE in Six Months and Need a Project Director, 40 Supervisors and Around 1,500 Skilled and General Workers, Mobilised in Phases."
              />
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-4 px-6 rounded-md transition-all duration-300 font-medium text-base shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Sending</span>
                </>
              ) : (
                <span>Share Your Hiring Need</span>
              )}
            </button>

            {submitted && (
              <div className="relative bg-[#0A1E3D] border-2 p-4 rounded-md overflow-hidden">
                <DiagonalPattern id="hire-success-grid" />
                <div className="relative flex items-center justify-center text-center">
                  <p className="text-white font-medium">Message Received</p>
                </div>
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  );
};

// =====================================================
// FAQ SECTION
// =====================================================
const HiringFAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'The Levels We Hire For',
      answer:
        'Every Level. From Board Members and CEOs to Senior Leaders, Specialists, Skilled Trades and Large Project Workforces. One Partner can Staff Your Leadership Team and Your Project Site.',
    },
    {
      question: 'The Scale We Can Handle',
      answer:
        'From a Single Confidential Executive Search to Mobilising Thousands of Workers for a Major Project. Large Requirements are Planned and Delivered in Phases that Match Your Project Schedule.',
    },
    {
      question: 'Where We Hire and Deploy',
      answer:
        'Globally. We Source Talent from the Markets Where it is Strongest, including South Asia, Southeast Asia and Africa, and Deploy it Wherever You Need it, with a Particular Depth in Middle East Projects.',
    },
    {
      question: 'How Long Hiring Takes',
      answer:
        'It Depends on the Role and the Volume. Executive Searches Typically Run Over Several Weeks. Workforce Mobilisation Timelines Depend on Headcount, Trades, Source Countries and Visa Processes. We Give You a Realistic Plan Once We Understand the Requirement.',
    },
    {
      question: 'Visas, Documentation and Compliance',
      answer:
        'We Coordinate Contracts, Documentation, Medicals, Visas and Travel, and Work to Meet Labour and Immigration Requirements in Both Source and Destination Countries.',
    },
    {
      question: 'Our Commitment to Ethical Recruitment',
      answer:
        'Workers are Recruited Fairly and Transparently, with Clear Contracts They Understand Before They Travel. Ethical Practice Protects the People We Place and the Reputation of the Companies We Serve.',
    },
    {
      question: 'Support After Placement',
      answer:
        'We Stay Involved After Arrival or Joining, with Onboarding Support, Reporting and Replacements Where Agreed in the Engagement.',
    },
  ];

  return (
    <section className="bg-[#0A1E3D] py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Inside the Practice
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
            Answers to Common Questions About Global Hiring and Project Workforce Engagements.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="bg-[#132B47] rounded-md overflow-hidden transition-all duration-300 border border-blue-900/30 hover:border-blue-700/50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 sm:px-6 md:px-8 py-5 sm:py-6 flex items-center justify-between text-left hover:bg-[#1a3a5c] transition-colors duration-300 group"
                aria-expanded={openIndex === index}
              >
                <span className="text-white font-medium pr-4 text-sm sm:text-base lg:text-lg group-hover:text-blue-300 transition-colors duration-300">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-400 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-4 sm:px-6 md:px-8 pb-5 sm:pb-6 text-gray-300 text-sm sm:text-base">
                  {faq.answer}
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
// FINAL CTA SECTION
// =====================================================
const HiringFinalCTASection = () => {
  return (
    <section className="bg-[#0A1E3D] border-t border-blue-900/40 py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <circle cx="200" cy="200" r="300" fill="#4A90E2" />
          <circle cx="800" cy="800" r="400" fill="#2B7AB8" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
          The Right People, Wherever the Work Is
        </h2>

        <p className="text-gray-300 text-base sm:text-md lg:text-lg mb-10 sm:mb-12 max-w-3xl mx-auto">
          Whether You Need One Leader to Change the Direction of Your Company or Thousands of Hands to Build Your Next Project, Start with a Conversation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <a
            href="#enquiry"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-md transition-all duration-300 font-medium text-base sm:text-lg shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
          >
            <span>Share Your Hiring Need</span>
          </a>
          <a
            href="/contact"
            className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:!text-[#0A1E3D] text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-md transition-all duration-300 font-medium text-base sm:text-lg flex items-center justify-center gap-3"
          >
            <span>Contact Us</span>
          </a>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// MAIN HIRING CLIENT COMPONENT
// =====================================================
export default function HiringClient() {
  return (
    <main className="min-h-screen">
      <HiringHeroSection />
      <SpectrumSection />
      <EngagementModelsSection />
      <ProjectWorkforceSection />
      <GlobalReachSection />
      <StandardsSection />
      <HiringEnquirySection />
      <HiringFAQSection />
      <HiringFinalCTASection />
    </main>
  );
}
