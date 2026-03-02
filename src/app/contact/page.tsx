
// app/contact/page.tsx
'use client';

import React, { useState } from 'react';

// =====================================================
// CONTACT HERO SECTION
// Dark blue background with headline and illustration
// Matches home page hero aesthetic
// =====================================================
const ContactHeroSection = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[500px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* ==================== LEFT COLUMN ==================== */}
          {/* Headline and Subtext */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-3xl lg:text-4xl text-white font-light ">
              Bring Clarity to Your Business Decisions
            </h1>
            <p className="text-xl sm:text-xl text-gray-300 font-light leading-relaxed">
We work with founders who need clarity before making high-impact decisions — growth, capital, pricing, or restructuring.            </p>
            <div className="pt-4">
              <p className="text-gray-400 text-base">
                Share a few details below and we’ll review your situation before responding.
If there’s a clear way we can help, we’ll suggest next steps — if not, we’ll tell you that too.
              </p>
            </div>
          </div>

          {/* ==================== RIGHT COLUMN ==================== */}
          {/* Illustration - Connection/Communication Theme */}
          <div className="relative h-80 sm:h-96 lg:h-[450px] flex items-center justify-center lg:justify-end">
            <div className="w-full h-full flex items-center justify-center">
              
              {/* SVG Illustration - Network/Communication */}
              <svg viewBox="0 0 400 400" className="w-full max-w-md h-full">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A90E2" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#2B7AB8" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Central Hub (You/Business) */}
                <g>
                  <circle cx="200" cy="200" r="45" fill="rgba(74, 144, 226, 0.15)" stroke="#4A90E2" strokeWidth="2" />
                  <circle cx="200" cy="200" r="30" fill="rgba(74, 144, 226, 0.25)" stroke="#4A90E2" strokeWidth="2" />
                  <circle cx="200" cy="200" r="18" fill="#4A90E2" />
                  
                  {/* Center Icon - Communication */}
                  <path d="M 200 190 L 200 210 M 190 200 L 210 200" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* Connecting Lines to Outer Nodes */}
                <g opacity="0.6">
                  <line x1="200" y1="200" x2="120" y2="100" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4,4" />
                  <line x1="200" y1="200" x2="280" y2="100" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4,4" />
                  <line x1="200" y1="200" x2="320" y2="200" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4,4" />
                  <line x1="200" y1="200" x2="280" y2="300" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4,4" />
                  <line x1="200" y1="200" x2="120" y2="300" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4,4" />
                  <line x1="200" y1="200" x2="80" y2="200" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4,4" />
                </g>

                {/* Outer Nodes (Services/Solutions) */}
                <g>
                  {/* Top Left */}
                  <circle cx="120" cy="100" r="20" fill="rgba(30, 90, 142, 0.3)" stroke="#4A90E2" strokeWidth="2" />
                  <circle cx="120" cy="100" r="10" fill="#1E5A8E" />
                  
                  {/* Top Right */}
                  <circle cx="280" cy="100" r="20" fill="rgba(30, 90, 142, 0.3)" stroke="#4A90E2" strokeWidth="2" />
                  <circle cx="280" cy="100" r="10" fill="#1E5A8E" />
                  
                  {/* Right */}
                  <circle cx="320" cy="200" r="20" fill="rgba(30, 90, 142, 0.3)" stroke="#4A90E2" strokeWidth="2" />
                  <circle cx="320" cy="200" r="10" fill="#1E5A8E" />
                  
                  {/* Bottom Right */}
                  <circle cx="280" cy="300" r="20" fill="rgba(30, 90, 142, 0.3)" stroke="#4A90E2" strokeWidth="2" />
                  <circle cx="280" cy="300" r="10" fill="#1E5A8E" />
                  
                  {/* Bottom Left */}
                  <circle cx="120" cy="300" r="20" fill="rgba(30, 90, 142, 0.3)" stroke="#4A90E2" strokeWidth="2" />
                  <circle cx="120" cy="300" r="10" fill="#1E5A8E" />
                  
                  {/* Left */}
                  <circle cx="80" cy="200" r="20" fill="rgba(30, 90, 142, 0.3)" stroke="#4A90E2" strokeWidth="2" />
                  <circle cx="80" cy="200" r="10" fill="#1E5A8E" />
                </g>

                {/* Animated Pulse Circles */}
                <g className="animate-pulse" opacity="0.4">
                  <circle cx="200" cy="200" r="60" fill="none" stroke="#4A90E2" strokeWidth="1" />
                  <circle cx="200" cy="200" r="75" fill="none" stroke="#4A90E2" strokeWidth="1" opacity="0.5" />
                </g>
              </svg>

            </div>
          </div>

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
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
    }, 1500);
  };

  return (
    <section className="bg-[#d4dce5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">

          {/* ==================== LEFT COLUMN - CONTACT FORM ==================== */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 lg:p-12">
              
              {/* Form Header */}
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-3">
                  Tell Us What’s Stuck
                </h2>
                <p className="text-gray-600 text-base">
                  This isn’t a sales form. It’s the first step in understanding whether — and how — we can help.
The more context you share, the more useful our response will be.
                </p>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800"
                    placeholder="Alex Doe"
                  />
                </div>

                {/* Email and Phone - Side by Side */}
                <div className="grid sm:grid-cols-2 gap-6">
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800"
                      placeholder="alex@company.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800"
                    placeholder="Your Company Pvt Ltd"
                  />
                </div>

                {/* Revenue Stage and Service Interest - Side by Side */}
                <div className="grid sm:grid-cols-2 gap-6">
                  
                  {/* Revenue Stage */}
                  <div>
                    <label htmlFor="revenueStage" className="block text-sm font-medium text-gray-700 mb-2">
                      Current Business Stage
                    </label>
                    <select
                      id="revenueStage"
                      name="revenueStage"
                      value={formData.revenueStage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800 bg-white"
                    >
                      <option value="">Select stage</option>
                      <option value="pre-revenue">Pre-revenue</option>
                      <option value="0-10l">₹0-10L revenue</option>
                      <option value="10l-50l">₹10L-50L revenue</option>
                      <option value="50l-1cr">₹50L-1Cr revenue</option>
                      <option value="1cr-5cr">₹1-5Cr revenue</option>
                      <option value="5cr-10cr">₹5-10Cr revenue</option>
                      <option value="10cr+">₹10Cr+ revenue</option>
                    </select>
                  </div>

                  {/* Service Interest */}
                  <div>
                    <label htmlFor="serviceInterest" className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Area You Want To Improve
                    </label>
                    <select
                      id="serviceInterest"
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800 bg-white"
                    >
                      <option value="">Select service</option>
                      <option value="growth">Growth & Revenue Strategy</option>
                      <option value="financial">Financial Planning & Capital</option>
                      <option value="operations">Operations & Efficiency</option>
                      <option value="strategic">Strategic Planning</option>
                      <option value="product">Product & Innovation</option>
                      <option value="not-sure">Not sure / Multiple areas</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Briefly describe what feels unclear or risky right now <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none transition-all duration-300 text-gray-800"
                    placeholder="For example: stalled growth, fundraising confusion, pricing issues, team inefficiency, or strategic indecision.
You don’t need a polished explanation — clarity comes later."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white py-4 px-6 rounded-lg transition-all duration-300 font-medium text-base shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Request a Review</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Success Message */}
                {submitted && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-green-800 font-medium">Message Recieved !</p>
                      </div>
                    </div>
                  </div>
                )}

              </form>

            </div>
          </div>

          {/* ==================== RIGHT COLUMN - CONTACT INFO ==================== */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            
            {/* Contact Information Card */}
            <div className="bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-light mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium mb-1 text-sm uppercase tracking-wide">Email</p>
                    <a href="mailto:contact@sareen.com" className="text-white/90 hover:text-white transition-colors text-lg">
                      contact@sareen.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium mb-1 text-sm uppercase tracking-wide">Phone</p>
                    <a href="tel:+919876543210" className="text-white/90 hover:text-white transition-colors text-lg">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium mb-1 text-sm uppercase tracking-wide">Office</p>
                    <p className="text-white/90 text-base leading-relaxed">
                      123 Business District<br />
                      Bangalore, Karnataka 560001<br />
                      India
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium mb-1 text-sm uppercase tracking-wide">Hours</p>
                    <p className="text-white/90 text-base leading-relaxed">
                      Mon-Fri: 9:00 AM - 6:00 PM<br />
                      Sat: 10:00 AM - 2:00 PM<br />
                      Sun: Closed
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Links Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                Explore Before Reaching Out
              </h3>
              
              <div className="space-y-3">
                <a href="/services" className="flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors py-2 group">
                  <span>How We Help Founders Decide</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                
                <a href="/resources" className="flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors py-2 group">
                  <span>Access Our Resources</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                
                <a href="/about" className="flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors py-2 group">
                  <span>Read Our Thinking</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                
                <a href="/blog" className="flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors py-2 group">
                  <span>How We’ve Helped Before</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      question: "What types of businesses do you work with?",
      answer: "We work with businesses from pre-revenue startups to ₹10Cr revenue companies across all industries. Our expertise has been honed in resource-constrained startup environments, which means we bring exceptional value-per-rupee thinking to every client—whether you're bootstrapped or well-funded, B2B or B2C, tech or traditional."
    },
    {
      question: "Do you offer free consultations or calls?",
      answer: "No. We don’t believe in unpaid advisory conversations. Every interaction starts with a paid diagnostic session where we analyze your situation and provide structured guidance. This ensures focus, seriousness, and real value for both sides."
    },
    {
      question: "How long does a typical engagement last?",
      answer: "Most of our projects are designed for 2-week delivery cycles. We believe in fast turnaround without compromising quality. Some services like retainer advisory are ongoing (3-month minimum), while workshops are single-day intensives. Unlike traditional consulting that drags on for months, we deliver actionable outputs quickly so you can start implementing immediately."
    },
    {
      question: "What exactly will I receive at the end of the engagement?",
      answer: "You'll receive tangible, execution-ready deliverables—not vague PowerPoint advice. This includes Excel financial models (unlocked, with formulas), strategic roadmaps, process documents, frameworks, templates, and tools. Everything is designed for your team to implement without ongoing consulting dependency. You own all deliverables completely."
    },
    {
      question: "How is your pricing structured?",
      answer: "Our services range from ₹15,000 to ₹75,000 depending on scope and complexity. This is approximately 1/10th the cost of traditional Big 4 consulting. We offer fixed-price project-based engagements (no hourly billing surprises), monthly retainers for ongoing support, and group workshops at ₹7,000 per participant. Payment is typically 100% upfront for projects under ₹40,000, or 50% upfront + 50% at midpoint for larger engagements."
    },
    {
      question: "Do you offer services remotely or only in-person?",
      answer: "We work both remotely and in-person, depending on your preference and project needs. Most of our engagements are conducted via video calls, which allows us to serve clients across India efficiently. For certain workshops or intensive sessions, in-person meetings can be arranged in major metros. Our remote delivery model is battle-tested and highly effective—we've worked with 100+ clients successfully via video."
    },
    {
      question: "What makes you different from other consulting firms?",
      answer: "Three key differences: (1) Startup-honed discipline—we learned strategy where every rupee matters, so we eliminate fluff; (2) Execution-ready outputs—you get working models and frameworks, not just presentations; (3) Accessible pricing—we're 1/10th the cost of Big 4 because we don't have marble lobbies and bloated overhead. Plus, we've been entrepreneurs ourselves—we understand your challenges from lived experience, not just textbooks."
    },
    {
      question: "Can you help with implementation, or just strategy?",
      answer: "Our core offering is strategic consulting—we provide the plan, frameworks, and roadmap. However, we design everything to be immediately executable by your team. For ongoing implementation support, we offer retainer-based advisory where you can check in with us as you execute. We intentionally don't create consulting dependency—our goal is to empower you to run your business independently after our engagement."
    },
    {
      question: "What if I'm not sure which service I need?",
      answer: "That’s exactly what our Strategic Diagnostic & Direction engagement is designed for. Most founders don’t come to us with clearly defined problems — they come with symptoms. The diagnostic helps us identify what actually needs attention and what doesn’t. If you’re at an early stage, it brings clarity on direction, priorities, and what to focus on next. If you’re already generating revenue, it helps identify the constraints limiting growth. If you’re scaling, it surfaces operational, financial, or structural inefficiencies that need correction. The diagnostic is a paid, structured engagement and serves as the entry point to all our work. It ensures that any subsequent strategy or execution is based on facts, not assumptions."
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
            Common questions about our services, process, and pricing. 
            Don't see your question? Send us a message above.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#132B47] rounded-xl overflow-hidden transition-all duration-300 border border-blue-900/30 hover:border-blue-700/50"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left hover:bg-[#1a3a5c] transition-colors duration-300 group"
                aria-expanded={openIndex === index}
              >
                <span className="text-white font-medium pr-4 text-base sm:text-lg group-hover:text-blue-300 transition-colors duration-300">
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

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 sm:px-8 pb-5 sm:pb-6 text-gray-300 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-gray-400 text-xl">
            Still have Questions ?
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
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
          If the Decision Is Important, Treat It Seriously
        </h2>

        {/* Subtext */}
        <p className="text-gray-300 text-lg sm:text-xl mb-10 sm:mb-12 leading-relaxed max-w-3xl mx-auto">
          Our diagnostic sessions are designed for founders who value clarity over guesswork.
Start with a paid strategic diagnostic to determine the right path forward.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          
          {/* Primary CTA */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-lg transition-all duration-300 font-medium text-base sm:text-lg shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group"
          >
            <span>Book a Diagostic Session</span>
          </button>

          {/* Secondary CTA */}
          <a 
            href="/services"
            className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-[#0A1E3D] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-lg transition-all duration-300 font-medium text-base sm:text-lg flex items-center justify-center gap-3 group"
          >
            <span>Our Case Studies</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 sm:mt-16 pt-12 ">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            
            <div>
              <div className="text-blue-400 mb-2">
                <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-white font-medium text-lg mb-1">2-Week Delivery</p>
              <p className="text-gray-400 text-sm">Fast turnaround on most projects</p>
            </div>

            <div>
              <div className="text-blue-400 mb-2">
                <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-white font-medium text-lg mb-1">Tangible Outputs</p>
              <p className="text-gray-400 text-sm">Models, frameworks, not vague advice</p>
            </div>

            <div>
              <div className="text-blue-400 mb-2">
                <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white font-medium text-lg mb-1">1/10th the Cost</p>
              <p className="text-gray-400 text-sm">Compared to Big 4 consulting</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

// =====================================================
// SIMPLE DIVIDER SECTION
// Matches home page divider
// =====================================================
const SimpleDivider = () => {
  return (
    <div className="w-full h-24 bg-gray-300 border-b-2 border-gray-400"></div>
  );
};

// =====================================================
// MAIN CONTACT PAGE COMPONENT
// Exports all sections in order
// Fully responsive and matches home page design language
// =====================================================
export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHeroSection />
      <ContactFormSection />
      <FAQSection />
      <FinalCTASection />
      <SimpleDivider />
      
      {/* Footer would go here (shared across all pages) */}
    </main>
  );
}