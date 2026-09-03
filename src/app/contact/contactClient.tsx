// app/contact/contactClient.tsx
'use client';

import React, { useState } from 'react';
import { apiRequest } from '@/services/api';

// =====================================================
// CONTACT HERO SECTION
// Dark blue background with headline and illustration
// Matches home page hero aesthetic
// =====================================================
const ContactHeroSection = () => {
  return (
    <section className="relative bg-[#0A1E3D] min-h-[400px] sm:min-h-[500px] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* ==================== LEFT COLUMN ==================== */}
          {/* Headline and Subtext */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white  ">
              Bring Clarity to Your Business Decisions
            </h1>
            <p className="text-lg sm:text-xl text-gray-300  ">
We work with founders who need clarity before making high-impact decisions — growth, capital, pricing, or restructuring.            </p>
            <div className="pt-4">
              <p className="text-gray-400 text-sm sm:text-base">
                Share a few details below and we'll review your situation before responding.
If there's a clear way we can help, we'll suggest next steps — if not, we'll tell you that too.
              </p>
            </div>
          </div>

          {/* ==================== RIGHT COLUMN ==================== */}
          {/* Illustration - Connection/Communication Theme */}
          <img src="/assets/contact/Contact Head.svg" alt="" className="max-w-full h-auto" />

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

  const [submitted,    setSubmitted]    = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error,        setError]        = useState('');

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
      formData.phone        ? `Phone: ${formData.phone}`                     : '',
      formData.company      ? `Company: ${formData.company}`                 : '',
      formData.revenueStage ? `Business Stage: ${formData.revenueStage}`     : '',
      formData.serviceInterest ? `Area of Interest: ${formData.serviceInterest}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await apiRequest('POST', '/contact', {
        body: {
          name:    formData.name,
          email:   formData.email,
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
                  Tell Us What's Stuck
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  This isn't a sales form. It's the first step in understanding whether — and how — we can help.
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800 bg-white"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800 bg-white"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none transition-all duration-300 text-gray-800"
                    placeholder="For example: stalled growth, fundraising confusion, pricing issues, team inefficiency, or strategic indecision.
You don't need a polished explanation — clarity comes later."
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
                      <span>Sending...</span>
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
                        <p className="text-green-800 font-medium">Message Recieved !</p>
                      </div>
                    </div>
                  </div>
                )}

              </form>

            </div>
          </div>

          {/* ==================== RIGHT COLUMN - CONTACT INFO ==================== */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-6 lg:gap-8">
            
            {/* Contact Information Card */}
            <div className="bg-gradient-to-br from-[#1E5A8E] to-[#2B7AB8] rounded-md p-6 sm:p-8 text-white shadow-xl">
              <h3 className="text-xl sm:text-2xl  mb-6">
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
                    <a href="mailto:contact@sarsenpartners.com" className="text-white/90 hover:text-white transition-colors text-base sm:text-lg">
                      contact@sarsenpartners.com
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
                    <p className="text-white/90 text-base sm:text-lg ">
                      Abu Dhabi<br />
                      United Arab Emirates
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
                    <p className="text-white/90 text-base sm:text-lg ">
                      Monday - Friday<br />
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
      question: "What types of businesses do you work with ?",
      answer: "We work across the full spectrum of emerging businesses and established corporations, with a specialisation in startups. Regardless of where you are on that journey, our approach is grounded in strategic rigour. Clients turn to us as strategy experts because we cut through complexity and deliver clarity—without the fluff or unnecessary overhead."
    },
    {
      question: "Do you offer free consultations or calls ?",
      answer: "No. We don't believe in unpaid advisory conversations. Every interaction starts with a paid diagnostic session where we analyze your situation and provide structured guidance. This ensures focus, seriousness, and real value for both sides."
    },
    {
      question: "How long does a typical engagement last ?",
      answer: "Most of our projects are designed for 2-week delivery cycles. We believe in fast turnaround without compromising quality. Some services like retainer advisory are ongoing (3-month minimum), while workshops are single-day intensives. Unlike traditional consulting that drags on for months, we deliver actionable outputs quickly so you can start implementing immediately."
    },
    {
      question: "What exactly will I receive at the end of the engagement ?",
      answer: "You'll receive tangible, execution-ready deliverables—not vague PowerPoint advice. This includes Excel financial models (unlocked, with formulas), strategic roadmaps, process documents, frameworks, templates, and tools. Everything is designed for your team to implement without ongoing consulting dependency. You own all deliverables completely."
    },
    {
      question: "How is your pricing structured ?",
      answer: "Our services range from ₹15,000 to ₹1,75,000 depending on scope and complexity. This is approximately One-Tenth the cost of traditional Big 4 consulting. We offer fixed-price project-based engagements, monthly retainers for ongoing support. Payment is typically upfront for projects unless it is a customised engagement."
    },
    {
      question: "Do you offer services remotely or only in-person ?",
      answer: "We work both remotely and in-person, depending on your preference and engagement needs. Most of our engagements are conducted via video calls, which allows us to serve clients across Globe efficiently. For certain workshops or intensive sessions, in-person meetings can be arranged in major cities across the globe. Our remote delivery model is battle-tested and highly effective."
    },
    {
      question: "What makes you different from other consulting firms ?",
      answer: "Three key differences: Startup-honed discipline—we learned strategy where every rupee matters, so we eliminate fluff. Secondly, Execution-ready outputs—you get working models and frameworks, not just presentations. Thirdly, Accessible pricing—we're One-Tenth the cost of Big 4. Plus, we've been entrepreneurs ourselves—we understand your challenges from lived experience."
    },
    {
      question: "Can you help with implementation, or just strategy ?",
      answer: "Our core offering is strategic consulting—we provide the plan, frameworks, and roadmap. However, we design everything to be immediately executable by your team. For ongoing implementation support, we offer retainer-based advisory where you can check in with us as you execute. We intentionally don't create consulting dependency—our goal is to empower you to run your business independently after our engagement."
    },
    {
      question: "What if I'm not sure which service I need ?",
      answer: "That's exactly what our Strategic Diagnostic & Direction engagement is designed for. Most founders don't come to us with clearly defined problems — they come with symptoms. The diagnostic helps us identify what actually needs attention and what doesn't. If you're at an early stage, it brings clarity on direction, priorities, and what to focus on next. If you're already generating revenue, it helps identify the constraints limiting growth. If you're scaling, it surfaces operational, financial, or structural inefficiencies that need correction. The diagnostic is a paid, structured engagement and serves as the entry point to all our work. It ensures that any subsequent strategy or execution is based on facts, not assumptions."
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
            Frequently Asked Questions
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
            Common questions about our Services, Process, and Pricing. 
            Don't see your question ? Send us a message above.
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
        <h2 className="text-3xl sm:text-4xl lg:text-5xl  text-white mb-6 ">
          Your Business Decisions are Important, Treat them Seriously
        </h2>

        {/* Subtext */}
        <p className="text-gray-300 text-base sm:text-lg lg:text-xl mb-10 sm:mb-12  max-w-3xl mx-auto">
          Our diagnostic sessions are designed for founders who value clarity over guesswork.
Start with a paid strategic diagnostic to determine the right path forward.
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
            className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-gray hover:text-[#0A1E3D] text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-md transition-all duration-300 font-medium text-base sm:text-lg flex items-center justify-center gap-3 group"
          >
            <span>Our Case Studies</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
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
      <FAQSection />
      <FinalCTASection />
      <SimpleDivider />
      
      {/* Footer would go here (shared across all pages) */}
    </main>
  );
}