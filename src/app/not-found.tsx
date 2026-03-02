// app/not-found.tsx
'use client';

import React from 'react';
import Link from 'next/link';

// =====================================================
// 404 NOT FOUND PAGE
// Maintains design language consistency with rest of site
// Dark blue theme with professional, helpful messaging
// =====================================================
export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A1E3D] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-2 h-2 bg-blue-300 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-32 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-40 left-20 w-2 h-2 bg-blue-300 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-40"></div>
      <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-50"></div>

      <div className="max-w-4xl w-full">
        <div className="text-center">
          
          {/* Large 404 Visual */}
          <div className="mb-12 relative">
            <svg viewBox="0 0 600 200" className="w-full h-auto max-w-2xl mx-auto">
              {/* Background circle elements */}
              <circle cx="100" cy="100" r="80" fill="rgba(74, 144, 226, 0.1)" />
              <circle cx="500" cy="100" r="80" fill="rgba(74, 144, 226, 0.1)" />
              
              {/* 404 Text */}
              <text 
                x="300" 
                y="140" 
                textAnchor="middle" 
                fill="#4A90E2" 
                fontSize="120" 
                fontWeight="300"
                opacity="0.8"
              >
                404
              </text>
              
              {/* Decorative lines */}
              <line x1="50" y1="100" x2="180" y2="100" stroke="#4A90E2" strokeWidth="2" opacity="0.3" />
              <line x1="420" y1="100" x2="550" y2="100" stroke="#4A90E2" strokeWidth="2" opacity="0.3" />
              
              {/* Small accent circles */}
              <circle cx="50" cy="100" r="4" fill="#4A90E2" opacity="0.6" />
              <circle cx="550" cy="100" r="4" fill="#4A90E2" opacity="0.6" />
            </svg>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Page Not Found
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-4 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <p className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Don't worry—strategic pivots are part of the process. Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-all duration-300 font-medium text-base shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Go to Homepage</span>
            </Link>
            
            <Link 
              href="/about"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0A1E3D] px-8 py-4 rounded-lg transition-all duration-300 font-medium text-base flex items-center justify-center gap-3"
            >
              <span>Learn About Us</span>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="bg-[#132B47] rounded-2xl p-8 md:p-10 border border-blue-900/30 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">
              Looking for something specific?
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <Link 
                href="/services"
                className="group flex items-start gap-3 p-4 rounded-lg hover:bg-[#1a3a5c] transition-all duration-300"
              >
                <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="text-white font-medium mb-1 group-hover:text-blue-300 transition-colors">Our Services</h3>
                  <p className="text-gray-400 text-sm">Explore our consulting offerings</p>
                </div>
              </Link>

              <Link 
                href="/reports"
                className="group flex items-start gap-3 p-4 rounded-lg hover:bg-[#1a3a5c] transition-all duration-300"
              >
                <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <h3 className="text-white font-medium mb-1 group-hover:text-blue-300 transition-colors">Reports & Research</h3>
                  <p className="text-gray-400 text-sm">Download our industry reports</p>
                </div>
              </Link>

              <Link 
                href="/resources"
                className="group flex items-start gap-3 p-4 rounded-lg hover:bg-[#1a3a5c] transition-all duration-300"
              >
                <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <div>
                  <h3 className="text-white font-medium mb-1 group-hover:text-blue-300 transition-colors">Free Resources</h3>
                  <p className="text-gray-400 text-sm">Tools and calculators for founders</p>
                </div>
              </Link>

              <Link 
                href="/contact"
                className="group flex items-start gap-3 p-4 rounded-lg hover:bg-[#1a3a5c] transition-all duration-300"
              >
                <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="text-white font-medium mb-1 group-hover:text-blue-300 transition-colors">Contact Us</h3>
                  <p className="text-gray-400 text-sm">Get in touch with our team</p>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}