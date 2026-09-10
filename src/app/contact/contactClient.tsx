// app/contact/contactClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@/services/api';

// =====================================================
// SHARED ICON — Location Pin
// Reused by the "Our Presence" cards below.
// =====================================================
const LocationPinIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// =====================================================
// Small helper — rounds coordinates for crisp SVG output
// =====================================================
const roundCoord = (n: number) => Math.round(n * 100) / 100;

// =====================================================
// Ring styling — kept in one place so the ring line stays
// an exact match for the home-page hero chart stroke
// (white, 2.5 weight, fully opaque — see ProductLifecycleChartOnce).
// =====================================================
const RING_STROKE = '#ffffff';
const RING_STROKE_WIDTH = 1.75;

// =====================================================
// MINIMAL ORBIT RING — locations on the ring, no dial
// A single revolving marker orbits fixed points that mark
// where the team sits around the globe.
// =====================================================
const ContactOrbitRing = () => {
  const [mounted, setMounted] = useState(false);
  const cx = 120, cy = 120, r = 78;
  const orbitDuration = 24;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const polarToCartesian = (angleDeg: number, radius = r) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: roundCoord(cx + radius * Math.cos(rad)),
      y: roundCoord(cy + radius * Math.sin(rad)),
    };
  };

  const offices = [
    { name: 'Abu Dhabi', angle: 0 },
    { name: 'Goa', angle: 22.5 },
    { name: 'Singapore', angle: 60 },
    { name: 'Boston', angle: 225 },
  ];

  return (
    <div className="w-[19.2rem] h-[19.2rem] sm:w-96 sm:h-96">
      <style>{`
        @keyframes orbitSpinMinimal {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .orbit-spin-minimal {
          transform-origin: 120px 120px;
          animation: orbitSpinMinimal ${orbitDuration}s linear infinite;
        }

        @keyframes officePulseOnRing {
          0%, 88%, 100% {
            r: 3.5;
            opacity: 0.7;
            filter: drop-shadow(0 0 0 rgba(96,165,250,0));
          }
          6% {
            r: 6.5;
            opacity: 1;
            filter: drop-shadow(0 0 8px rgba(96,165,250,0.9));
          }
          14% {
            r: 3.5;
            opacity: 0.7;
            filter: drop-shadow(0 0 0 rgba(96,165,250,0));
          }
        }
      `}</style>

      {mounted && (
        <svg viewBox="0 0 240 240" className="w-full h-full">
          {/* Orbit ring — matches home-page hero chart line:
              white stroke, 2.5 weight, fully opaque */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={RING_STROKE}
            strokeWidth={RING_STROKE_WIDTH}
            strokeLinecap="round"
          />

          {offices.map((o) => {
            const pos = polarToCartesian(o.angle);
            const labelPos = polarToCartesian(o.angle, r + 20);
            const delay = (o.angle / 360) * orbitDuration;
            return (
              <g key={o.name}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={3.5}
                  fill="#60a5fa"
                  style={{
                    animation: `officePulseOnRing ${orbitDuration}s ease-in-out ${delay}s infinite`,
                  }}
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  fill="#93C5FD"
                  fontSize="8.5"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {o.name}
                </text>
              </g>
            );
          })}

          <g className="orbit-spin-minimal">
            <circle
              cx={cx}
              cy={cy - r}
              r={4}
              fill="#ffffff"
              style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.85))' }}
            />
          </g>
        </svg>
      )}

      <p className="text-white/70 text-base text-center mt-4">
        Wherever We Are Needed
      </p>
    </div>
  );
};

// =====================================================
// CONTACT HERO SECTION
// Dark blue background with headline and the orbit-ring
// visual on the right. Matches home page hero aesthetic.
// =====================================================
const ContactHeroSection = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[400px] sm:min-h-[500px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background pattern (exact same as blog page) */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="blog-grid"
              patternUnits="userSpaceOnUse"
              width="5"
              height="5"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blog-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ==================== LEFT COLUMN ==================== */}
          {/* Headline and Subtext */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white  ">
              Start With the Situation
            </h1>
            {/* <p className="text-lg sm:text-xl text-gray-300  ">
Every Business Situation can be Unique. A Business Equation can Appear Simple at the Surface Yet become Extraordinarily Complex to Deal With for the Entrepreneurs and Decision-Makers Carrying the Business Forward.</p> */}
            <p className="text-lg sm:text-xl text-gray-300  ">
Whether You are At a Crossroads. Facing Pressure to Grow Without Room for Error. Looking for Strategic Direction. Or Need to Raise a Concern About an Ongoing Engagement.</p>
            <div className="pt-4">

            </div>
          </div>

          {/* ==================== RIGHT COLUMN ==================== */}
          {/* Orbit Ring — a single revolving marker against fixed points */}
          <div className="relative h-64 sm:h-80 lg:h-[450px] flex items-center justify-center lg:justify-end">
            <ContactOrbitRing />
          </div>

        </div>
      </div>
    </section>
  );
};

// =====================================================
// OUR PRESENCE SECTION
// Four cards, one per location, each using the same
// location-pin icon previously shown in the contact card.
//
// Layout:
//   mobile  → 1 column (full width, stacked top → bottom)
//   sm      → 2 columns
//   lg      → 4 columns
// =====================================================
const OurPresenceSection = () => {
  const locations = [
    { city: 'Goa', country: 'India' },
    { city: 'Abu Dhabi', country: 'United Arab Emirates' },
    { city: 'Singapore', country: 'Singapore' },
    { city: 'Boston', country: 'United States' },
  ];

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4">
            Our Presence
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            We are Spread Across Time Zones. Working with Enterprenures & Leaders Wherever They Need Us.
          </p>
        </div>

        {/* Mobile: 1 per row, full width. Tablet: 2. Desktop: 4. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {locations.map((loc) => (
            <div
              key={loc.city}
              className="w-full bg-white rounded-md shadow-lg p-6 sm:p-8 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#0A1E3D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <LocationPinIcon className="w-6 h-6 text-[#0A1E3D]" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-800">
                {loc.city}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mt-1">
                {loc.country}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =====================================================
// CONTACT FORM & INFO SECTION
// Light background - matches report section aesthetic
// LEFT: Contact form | RIGHT: Contact info + quick links
// =====================================================
const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    revenueStage: '',
    serviceInterest: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // ─────────────────────────────────────────────────────────────────────
    // The backend expects: { name, email, message }
    // The extra fields (company, phone, revenueStage, serviceInterest) are
    // appended to the message body so no context is lost on the admin side.
    // ─────────────────────────────────────────────────────────────────────
    const enrichedMessage = [
      formData.message,
      formData.phone ? `Phone: ${formData.phone}` : '',
      formData.company ? `Company: ${formData.company}` : '',
      formData.revenueStage ? `Business Stage: ${formData.revenueStage}` : '',
      formData.serviceInterest ? `Area of Interest: ${formData.serviceInterest}` : '',
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

      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          revenueStage: '',
          serviceInterest: '',
          message: ''
        });
      }, 5000);

    } catch (err: any) {
      // err.message comes directly from the backend — always human readable
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">

          {/* ==================== LEFT COLUMN - CONTACT FORM ==================== */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-md shadow-2xl p-6 sm:p-8 lg:p-10">

              {/* Form Header */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl  text-gray-800 mb-3">
                  Tell Us About the Situation
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  The More Context You Share the Better We can Understand. Tell Us What You Are Trying to Achieve or What is Making the Situation Difficult.
                </p>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-md font-medium text-[#0A1E3D] mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800"
                    placeholder="Alex Doe"
                  />
                </div>

                {/* Email and Phone - Side by Side */}
                <div className="grid sm:grid-cols-2 gap-6">

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-md font-medium text-[#0A1E3D] mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800"
                      placeholder="alex@company.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-md font-medium text-[#0A1E3D] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="company" className="block text-md font-medium text-[#0A1E3D] mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800"
                    placeholder="Your Company Pvt Ltd"
                  />
                </div>

                {/* Revenue Stage and Service Interest - Side by Side */}
                <div className="grid sm:grid-cols-2 gap-6">

                  {/* Revenue Stage */}
                  <div>
                    <label htmlFor="revenueStage" className="block text-md font-medium text-[#0A1E3D] mb-2">
                      Current Business Stage
                    </label>
                    <select
                      id="revenueStage"
                      name="revenueStage"
                      value={formData.revenueStage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800 bg-white"
                    >
                      <option value="" disabled selected>Annual Revenue Range</option>
    <option value="pre-revenue">Pre-Revenue</option>
    <option value="10K-50K">$10K - $50K </option>
    <option value="50K-100K">$50K - $100K </option>
    <option value="100K-500K">$100K - $500K </option>
    <option value="500K-1M">$500K - $1 M </option>
    <option value="1M+"> Over $1 Million</option>
                    </select>
                  </div>

                  {/* Service Interest */}
                  <div>
                    <label htmlFor="serviceInterest" className="block text-md font-medium text-[#0A1E3D] mb-2">
                      Primary Area You Want To Improve
                    </label>
                    <select
                      id="serviceInterest"
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800 bg-white"
                    >
                      <option value="" disabled selected>Select Purpose</option>
                      <option value="growth">Growth & Revenue Strategy</option>
                      <option value="financial">Financial Planning & Capital</option>
                      <option value="operations">Operations & Efficiency</option>
                      <option value="strategic">Strategic Planning</option>
                      <option value="product">Product & Innovation</option>
                      <option value="complaint">Client Complaints</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-md font-medium text-[#0A1E3D] mb-2">
                    Tell Us More. We are Listening. <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none transition-all duration-300 text-gray-800"
                    placeholder="For Example : We are Preparing to Raise Capital but are Uncertain about the Amount Required the Use of Funds and Our Readiness for Investors."
                  ></textarea>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-4 px-6 rounded-md transition-all duration-300 font-medium text-base shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending</span>
                    </>
                  ) : (
                    <span>Request a Review</span>
                  )}
                </button>

                {/* Success Message */}
                {submitted && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-green-800 font-medium">Message Recieved</p>
                      </div>
                    </div>
                  </div>
                )}

              </form>

            </div>
          </div>

          {/* ==================== RIGHT COLUMN - CONTACT INFO ==================== */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-6 lg:gap-8">

            {/* Contact Information Card — same background as the header (dark navy + diagonal-line pattern) */}
            <div className="relative bg-[#0A1E3D] rounded-md p-6 sm:p-8 text-white shadow-xl overflow-hidden">
              {/* Background pattern (exact same as header) */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      id="contact-card-grid"
                      patternUnits="userSpaceOnUse"
                      width="5"
                      height="5"
                      patternTransform="rotate(45)"
                    >
                      <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" strokeWidth="0.75" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#contact-card-grid)" />
                </svg>
              </div>

              <div className="relative">
                <h3 className="text-xl sm:text-2xl  mb-6">
                  Contact Information
                </h3>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <a href="mailto:contact@sarsenpartners.com" className="text-white/90 hover:text-white transition-colors text-base sm:text-lg block">
                      contact@sarsenpartners.com
                    </a>
                    <p className="text-white/60 text-sm mt-2">
                      We Operate Across Time Zones. Reach Out Whenever You Need To ... We'll Respond.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="bg-white text-slate-900 rounded-md p-6 sm:p-8 shadow-lg border border-gray-200">

              {/* Heading */}
              <h3 className="text-lg sm:text-xl font-medium mb-4">
                For You May Explore
              </h3>

              {/* Links Section */}
              <div className="space-y-3">

                {/* Link 1 */}
                <a
                  href="/work"
                  className="flex items-center justify-between py-2 transition-colors group hover:text-blue-600 text-sm sm:text-base"
                >
                  <span>How We Help Founders</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Link 2 */}
                <a
                  href="/resources"
                  className="flex items-center justify-between py-2 transition-colors group hover:text-blue-600 text-sm sm:text-base"
                >
                  <span>Access Our Resources</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Link 3 */}
                <a
                  href="/resources/blog"
                  className="flex items-center justify-between py-2 transition-colors group hover:text-blue-600 text-sm sm:text-base"
                >
                  <span>Read Our Thinking</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Link 4 */}
                <a
                  href="/resources/case-studies"
                  className="flex items-center justify-between py-2 transition-colors group hover:text-blue-600 text-sm sm:text-base"
                >
                  <span>Our Case Studies</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

// =====================================================
// FAQ SECTION
// Dark blue background with accordion
// Matches home page dark sections
// =====================================================
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

const faqs = [
  {
    question: "The Types Of Businesses We Work With",
    answer:
      "We work with Founders, Business Leaders, and Leadership Teams across Startups, Growing Businesses, and Established Companies. Our work is particularly relevant when a Business is  Either Looking to Unlock Exponential Growth or is Standing at an Important Crossroads around Growth, Positioning, Market Opportunity, Business Model, Competitive Advantage, or Execution. Sarsen is Not Limited to a Specific Industry or Geography as We Serve Clients across Geographies, Stages, Scales and Sectors."
  },

  {
    question: "Our Approach To Consultations And Initial Conversations",
    answer:
      "Our work begins with a Structured Engagement because meaningful Strategy requires Understanding the Business, its Context, the Market, and the Problem before Recommendations can be Responsibly Made. This also ensures that the conversation is Focused on the Business rather than a Generic Introductory Discussion."
  },

  {
    question: "The Beginning Of A Sarsen Partners Engagement",
    answer:
      "It usually begins by Understanding the Business, the Situation Business is Facing, and what needs to be Determined. We then Structure the Work around the Specific Context or Problem rather than Forcing the Business into a Predefined Solution. Depending on the Engagement, this can Involve Research, Analysis, Business Assessment, Strategic Development, and Structured Discussions with the Leadership Team."
  },

  {
    question: "The Typical Duration Of An Engagement",
    answer:
      "From a Few Weeks to Months. The time required depends on the Nature Of The Problem, the Scope of the Engagement, the Depth of Analysis required, the Amount of Research Involved, and the People and Resources that need to be Allocated. Some Focused Engagements can be Completed Relatively Quickly, while More Involved Strategic Work requires a Longer Period. We define the Scope and Expected Timeline around the Actual Work Required."
  },

  {
    question: "The Outputs Of An Engagement",
    answer:
      "The Output Depends on the Nature of Work. It may include Strategic Recommendations, Market and Competitive Analysis, Business Model Analysis, Financial or Unit-Economic Analysis, Strategic Priorities, Roadmaps, Frameworks, Operating Structures, Decision Tools or Other Working Documents. We Focus on Producing Material that can be Used by the Business, rather than Producing Presentations for their Own Sake."
  },

  {
    question: "Our Pricing And Commercial Structure",
    answer:
      "Pricing Depends on Nature Of The Work, the Scope of the Engagement, the Time required, and the People and Resources allocated to it. We therefore do not use a Single Standard Price for Every Client. We structure the engagement around the work required and provide the appropriate Commercial Structure once the scope is defined. However, Sarsen has Defined Packages specifically for Startups and Emerging Businesses, covering some of the Most Common Strategic Needs at These Stages. "

  },

  {
    question: "Remote And In-Person Delivery",
    answer:
      "Our Team can Work Remotely or In Person Depending on the Requirements of the Engagement. A Significant Part of Strategic Work can be Conducted Remotely through Structured Discussions, Research, Analysis, and Collaboration. Where the Nature of the Work Benefits from In-Person Interaction, that can be Considered as Part of the Engagement."
  },

  {
    question: "The Sarsen Partners Difference",
    answer:
      "Our Approach is built around Understanding the Business Before Prescribing the Execution. We Combine External Research with an Assessment of the Company Itself, use Quantitative and Analytical Methods where Appropriate, and Translate the Resulting Insight into Practical Strategic Choices. We are Not Trying to Create Dependency on consultants; the Goal is to Strengthen the Business's Capabilities to Understand, Execute, and Build on the Strategy."
  },

  {
    question: "Our Role In Strategy And Implementation",
    answer:
      "Strategy and Its Execution cannot be Treated as Completely Separate. We develop the Strategic Direction and can Provide Structured Implementation Help and Execution Support where the Engagement Requires it. The Role is Not to Replace Your Team or Take Over Day-To-Day Operations. It is to Ensure that Strategic Decisions are Translated into the Right Sequence of Actions, Systems, and Priorities so Execution Creates Progress rather than Motion."
  },

  {
    question: "The Right Starting Point For An Undefined Business Problem",
    answer:
      "Businesses often approach us with Symptoms, Uncertainties, or Questions Without a Clearly Defined Strategic Issue. We examine the Business, Market, and Situation to Identify What Actually Requires Attention and Establish the Right Direction.For Founders, Entrepreneurs, and Business Leaders facing such Uncertainty, We Recommend Beginning with our Strategic Business Diagnostic & Direction."

  }
];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#0A1E3D] py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl  text-white mb-4">
            Inside Sarsen
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
            Answers to Common Questions about Working with Sarsen, Our Approach, Engagements, and What to Expect.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#132B47] rounded-md overflow-hidden transition-all duration-300 border border-blue-900/30 hover:border-blue-700/50"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-6 md:px-8 py-5 sm:py-6 flex items-center justify-between text-left hover:bg-[#1a3a5c] transition-colors duration-300 group"
                aria-expanded={openIndex === index}
              >
                <span className="text-white font-medium pr-4 text-sm sm:text-base lg:text-lg group-hover:text-blue-300 transition-colors duration-300">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-400 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
              >
                <div className="px-4 sm:px-6 md:px-8 pb-5 sm:pb-6 text-gray-300 text-sm sm:text-base ">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-gray-400 text-lg sm:text-xl">
            Still have Questions.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 flex items-center gap-1 mx-auto group"
          >
            <span>Send us a message</span>
          </button>
        </div>

      </div>
    </section>
  );
};

// =====================================================
// FINAL CTA SECTION
// Dark blue background - strong call to action
// Matches home page dark sections
// =====================================================
const FinalCTASection = () => {
  return (
    <section className="bg-[#0A1E3D] py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <circle cx="200" cy="200" r="300" fill="#4A90E2" />
          <circle cx="800" cy="800" r="400" fill="#2B7AB8" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl  text-white mb-6 ">
          When Growth Matters
        </h2>

        {/* Subtext */}
        <p className="text-gray-300 text-base sm:text-md lg:text-lg mb-10 sm:mb-12  max-w-3xl mx-auto">
          Entrepreneurs and Business Leaders Work with Us Not merely to Improve their Businesses Opeartions, But to Unlock Exponential Progress Through Fundamental Strategy and Its Implementation. Get on a Call with Us to Unlock the Next Stage of Growth.

        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">

          {/* Primary CTA */}
          <a
            href="/services/business-diagnostic-direction"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-md transition-all duration-300 font-medium text-base sm:text-lg shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group"
          >
            <span>Book a Diagnostic Session</span>
          </a>

          {/* Secondary CTA */}
<a
  href="/resources/case-studies"
  className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:!text-[#0A1E3D] text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-md transition-all duration-300 font-medium text-base sm:text-lg flex items-center justify-center gap-3 group"
>
  <span>Our Case Studies</span>
</a>
        </div>

      </div>
    </section>
  );
};


// =====================================================
// MAIN CONTACT CLIENT COMPONENT
// (renamed from ContactPage -> ContactClient: this file no longer
// owns the route, so its default export name is just a name now,
// not a Next.js page convention)
// =====================================================
export default function ContactClient() {
  return (
    <main className="min-h-screen">
      <ContactHeroSection />
      <ContactFormSection />
      <OurPresenceSection />
      <FAQSection />
      <FinalCTASection />
      {/* Footer would go here (shared across all pages) */}
    </main>
  );
}