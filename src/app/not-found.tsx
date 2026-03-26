// app/not-found.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// =====================================================
// 404 NOT FOUND PAGE
// Design language: rational, authoritative, consultative
// Top card: 404 text left, logo right (desktop/tablet)
//           logo top, 404 below (mobile — centred)
// Bottom card: known endpoints navigation
// Fully responsive: mobile, tablet, laptop, desktop
// =====================================================

export default function NotFound() {

  // ============================================================
  // STATE
  // ============================================================
  // Controls the fade-in entrance of both cards after mount
  const [loaded, setLoaded] = useState<boolean>(false);

  // ============================================================
  // EFFECTS
  // ============================================================
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <main className="min-h-screen bg-[#0A1E3D] flex items-center justify-center px-4 py-16 relative overflow-hidden">

      {/* ============================================================ */}
      {/* BACKGROUND — Faint grid for structure, radial focus vignette */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#4A90E2 1px, transparent 1px), linear-gradient(90deg, #4A90E2 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #0A1E3D 100%)',
          }}
        />
      </div>

      {/* ============================================================ */}
      {/* MAIN CONTENT COLUMN                                          */}
      {/* ============================================================ */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col gap-5">

        {/* ---------------------------------------------------------- */}
        {/* TOP CARD                                                    */}
        {/*                                                             */}
        {/* Desktop / tablet (sm+):                                     */}
        {/*   LEFT  — 404 hollow, left-aligned, text, Sarsen label     */}
        {/*   RIGHT — Logo, larger, centred in its panel               */}
        {/*                                                             */}
        {/* Mobile (below sm):                                          */}
        {/*   TOP    — Logo, centred                                    */}
        {/*   BOTTOM — 404 + message, centred                          */}
        {/* ---------------------------------------------------------- */}
        <div
          className={`
            relative border border-blue-900/60 rounded-lg overflow-hidden
            bg-[#071628] shadow-2xl shadow-black/40
            transition-all duration-700 ease-out
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >

          {/* ---------------------------------------------------- */}
          {/* MOBILE LAYOUT — stacked, centred (visible below sm)   */}
          {/* ---------------------------------------------------- */}
          <div className="flex flex-col items-center text-center sm:hidden">

            {/* Logo — top on mobile, centred */}
            <div className="w-full flex items-center justify-center px-8 pt-10 pb-8 border-b border-blue-900/40 bg-[#060f1e]">
              <img
                src="/assets/brand/Sarsen-White.svg"
                alt="Sarsen & Company"
                className="h-16 w-auto"
              />
            </div>

            {/* 404 + message — below logo on mobile */}
            <div className="flex flex-col items-center px-7 pt-8 pb-10">

              {/* 404 — hollow white stroke, no fill, no lines, no dots */}
              <svg
                viewBox="0 0 320 130"
                className="w-full max-w-[240px] h-auto mb-6"
                aria-label="404"
              >
                <text
                  x="70"
                  y=
                    "115"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  fontSize="120"
                  fontWeight="300"
                  opacity="0.85"
                >
                  404
                </text>
              </svg>

               {/* Consultant message */}
                <h1 className="text-white text-2xl lg:text-3xl   mb-3 ">
                  Resource Does Not Exist.
                </h1>
                <p className="text-gray-400 text-sm lg:text-base   max-w-xs">
                  The Resource You Requested Has Not Been Found.
                </p>
              

              {/* Sarsen System Report label — bottom centre on mobile */}
              

            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* DESKTOP / TABLET LAYOUT — side by side (sm and above) */}
          {/* ---------------------------------------------------- */}
          <div className="hidden sm:flex flex-row min-h-[280px]">

            {/* LEFT HALF — 404 hollow, left-aligned, message, label */}
            <div className="flex-1 flex flex-col justify-between p-8 md:p-10 border-r border-blue-900/40">

              <div>
                {/* 404 — hollow white stroke, no fill, no lines, no dots, left-aligned */}
                <svg
                  viewBox="0 0 320 130"
                  className="w-full max-w-[280px] h-auto mb-6"
                  aria-label="404"
                >
                  <text
                    x="5"
                    y="115"
                    textAnchor="start"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    fontSize="120"
                    fontWeight="300"
                    opacity="0.85"
                  >
                    404
                  </text>
                </svg>

                {/* Consultant message */}
                <h1 className="text-white text-2xl lg:text-3xl   mb-3 ">
                  Resource Does Not Exist.
                </h1>
                <p className="text-gray-400 text-sm lg:text-base   max-w-xs">
                  The Resource You Requested Has Not Been Found.
                </p>
              </div>

              {/* Empty div intentionally left as placeholder */}
              <div></div>

            </div>

            {/* RIGHT HALF — Logo, larger, centred in its panel */}
            <div className="flex items-center justify-center bg-[#060f1e] sm:w-[260px] md:w-[300px] lg:w-[320px] flex-shrink-0 p-8 md:p-10">
              <img
                src="/assets/brand/Sarsen-White.svg"
                alt="Sarsen & Company"
                className="w-full max-w-[180px] md:max-w-[210px] h-auto"
              />
            </div>

          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* ACTION BUTTONS                                              */}
        {/* ---------------------------------------------------------- */}
        <div
          className={`
            flex flex-col items-center sm:flex-row sm:justify-center gap-3
            transition-all duration-700 delay-200 ease-out
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-600 text-white px-7 py-3.5 rounded-md transition-colors duration-300 font-medium text-sm  shadow-lg"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>

          <Link
            href="/about"
            className="flex items-center justify-center gap-3 bg-transparent border border-blue-700/60 hover:border-blue-500 text-blue-300 hover:text-white px-7 py-3.5 rounded-md transition-colors duration-300 font-medium text-sm "
          >
            Learn About Sarsen
          </Link>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* BOTTOM CARD — Navigation grid                               */}
        {/* ---------------------------------------------------------- */}
        <div
          className={`
            border border-blue-900/40 rounded-lg overflow-hidden
            transition-all duration-700 delay-400 ease-out
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          {/* Section header */}
          

          {/* Link grid */}
          <div className="bg-[#071628] grid sm:grid-cols-2 divide-y divide-blue-900/20 sm:divide-y-0">

            {/* Services */}
            <Link
              href="/services"
              className="group flex items-start gap-4 px-5 sm:px-7 py-5 hover:bg-blue-900/20 transition-colors duration-300 border-b border-blue-900/20"
            >
              <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5 group-hover:text-blue-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <h3 className="text-white text-sm font-medium mb-0.5 group-hover:text-blue-300 transition-colors duration-300">
                  Our Services
                </h3>
                <p className="text-gray-500 text-sm ">Consulting engagements and service offerings</p>
              </div>
            </Link>

            {/* Reports */}
            <Link
              href="/resources/reports"
              className="group flex items-start gap-4 px-5 sm:px-7 py-5 hover:bg-blue-900/20 transition-colors duration-300 border-b border-blue-900/20 sm:border-l sm:border-blue-900/20"
            >
              <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5 group-hover:text-blue-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h3 className="text-white text-sm font-medium mb-0.5 group-hover:text-blue-300 transition-colors duration-300">
                  Reports & Research
                </h3>
                <p className="text-gray-500 text-sm ">Industry analysis and proprietary research</p>
              </div>
            </Link>

            {/* Resources */}
            <Link
              href="/resources"
              className="group flex items-start gap-4 px-5 sm:px-7 py-5 hover:bg-blue-900/20 transition-colors duration-300"
            >
              <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5 group-hover:text-blue-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <div>
                <h3 className="text-white text-sm font-medium mb-0.5 group-hover:text-blue-300 transition-colors duration-300">
                  Free Resources
                </h3>
                <p className="text-gray-500 text-sm ">Frameworks and tools for founders</p>
              </div>
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className="group flex items-start gap-4 px-5 sm:px-7 py-5 hover:bg-blue-900/20 transition-colors duration-300 sm:border-l sm:border-blue-900/20"
            >
              <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5 group-hover:text-blue-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <h3 className="text-white text-sm font-medium mb-0.5 group-hover:text-blue-300 transition-colors duration-300">
                  Contact Us
                </h3>
                <p className="text-gray-500 text-sm ">Reach the Sarsen team directly</p>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </main>
  );
}