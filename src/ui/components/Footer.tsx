"use client";

import Link from "next/link";
import Image from "next/image";

// ============================================================================
// SIMPLE DIVIDER (optional decorative element)
// ============================================================================
// A full‑width horizontal bar with a bottom border and background colour.
// Height is fixed on desktop, but can be adjusted on smaller screens
// while preserving the laptop look (h‑24 for large screens).
const SimpleDivider = () => (
  <div className="h-24 w-full border-b-2 border-gray-400 bg-gray-300" />
);

// ============================================================================
// FOOTER COMPONENT
// ============================================================================
/**
 * Footer – displays company logo, navigation links, subscribe form,
 * social media icons, and legal information.
 *
 * Responsive behaviour:
 * - Mobile (default): stacked layout, full‑width elements, legal links left‑aligned.
 * - Tablet (md breakpoint): two‑column grid for logo/links and subscribe,
 *   hiding the empty spacer to optimise space, legal links right‑aligned.
 * - Desktop (lg breakpoint): three‑column grid with a central spacer,
 *   social icons and legal links side by side (legal links right‑aligned).
 */
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-100 text-gray-900">
      {/* Decorative divider – visible on all screens, height preserved on desktop */}
      <SimpleDivider />

      {/* Main footer container: max width, horizontal padding, vertical spacing */}
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">
        {/* ================================================================== */}
        {/* TOP GRID – Logo + Links | (Spacer) | Subscribe Form              */}
        {/* ================================================================== */}
        {/* 
          Grid layout:
          - Mobile: 1 column (all items stack).
          - Tablet (md): 12‑column grid; left side (logo+links) takes 6 cols,
            spacer is hidden, subscribe form takes 6 cols.
          - Desktop (lg): left side 4 cols, spacer 4 cols (visible), subscribe 4 cols.
        */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
          {/* Left side – Logo and quick links */}
          {/* On tablet: spans 6 columns; on desktop: spans 4 columns */}
          <div className="space-y-8 md:col-span-6 lg:col-span-4">
            {/* Company logo + name – inline link to homepage */}
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="relative h-12 w-12">
                <Image
                  src="/assets/brand/Sarsen-Blue.svg"
                  alt="Sarsen & Company"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <div className="text-2xl font-bold leading-tight text-gray-900">
                  Sarsen
                </div>
                <div className="text-2xl font-bold leading-tight text-gray-900">
                  & Company
                </div>
              </div>
            </Link>

            {/* Quick links (vertical list) */}
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact#careers"
                  className="text-lg text-gray-700 transition-colors hover:text-[#002855]"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/about#how-we-work"
                  className="text-lg text-gray-700 transition-colors hover:text-[#002855]"
                >
                  How We Work
                </Link>
              </li>
              <li>
                <Link
                  href="/contact#approach"
                  className="text-lg text-gray-700 transition-colors hover:text-[#002855]"
                >
                  Our Approach
                </Link>
              </li>
            </ul>
          </div>

          {/* Spacer (empty) – used only on desktop to create balanced layout */}
          {/* Hidden on mobile and tablet, visible on large screens */}
          <div className="hidden md:hidden lg:block lg:col-span-4" />

          {/* Right side – Subscribe form */}
          {/* On tablet: spans 6 columns; on desktop: spans 4 columns */}
          <div className="md:col-span-6 lg:col-span-4">
            <h3 className="mb-3 text-xl font-bold text-gray-900">Subscribe</h3>
            <p className="mb-5 text-sm leading-snug text-gray-600">
              Select topics and stay current with our latest insights
            </p>
            {/* Input + button: stacked on mobile, side‑by‑side on small screens and up */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 rounded-md border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-[#002855] focus:outline-none"
                aria-label="Email address for newsletter"
              />
              <button
                className="whitespace-nowrap rounded-md bg-[#002855] px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-900"
                aria-label="Subscribe to newsletter"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BOTTOM SECTION – Social icons + Legal links (first row)          */}
        {/* ================================================================== */}
        {/* 
          On mobile: stacked (column), items aligned to the start.
          On desktop (lg): row, centered vertically.
          Legal links inside this row are left‑aligned on mobile,
          right‑aligned on tablet and desktop.
        */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          {/* Social media icons – touch‑friendly size, wrapped on very small screens */}
          <div className="flex flex-wrap gap-3">
            {/* LinkedIn */}
            <a
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-black transition-colors hover:bg-gray-800"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-black transition-colors hover:bg-gray-800"
              aria-label="X"
            >
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-black transition-colors hover:bg-gray-800"
              aria-label="Facebook"
            >
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-black transition-colors hover:bg-gray-800"
              aria-label="YouTube"
            >
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>

            {/* RSS */}
            <a
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-black transition-colors hover:bg-gray-800"
              aria-label="RSS"
            >
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20 5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
              </svg>
            </a>
          </div>

          {/* Legal links – first row */}
          {/* 
            On mobile: left‑aligned (justify-start)
            On tablet and desktop: right‑aligned (md:justify-end)
          */}
          <div className="flex w-full flex-wrap justify-start gap-x-6 gap-y-3 text-sm text-gray-600 md:justify-end lg:w-auto">
            <Link href="/contact#main" className="hover:text-[#002855] transition-colors">
              Contact
            </Link>
            <Link href="#faq" className="hover:text-[#002855] transition-colors">
              FAQ
            </Link>
            <Link href="#privacy-policy" className="hover:text-[#002855] transition-colors">
              Privacy policy
            </Link>
            <button className="flex items-center gap-2 hover:text-[#002855] transition-colors">
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.5 1.5v3h-3v-3h3zm-4 0v3h-3v-3h3zm8 0v3h-3v-3h3zm0 4v3h-3v-3h3zm0 4v3h-3v-3h3zm-4 0v3h-3v-3h3zm-4 0v3h-3v-3h3zm0-4v3h-3v-3h3zm4 0v3h-3v-3h3z" />
              </svg>
              Your privacy choices
            </button>
            <Link href="#cookie-preferences" className="hover:text-[#002855] transition-colors">
              Cookie preferences
            </Link>
          </div>
        </div>

        {/* Second row of legal links */}
        {/* 
          Outer div uses justify-start on mobile, justify-end on tablet/desktop.
          Inner flex container stays left‑aligned on mobile, right‑aligned on larger screens.
        */}
        <div className="mt-4 flex justify-start md:justify-end">
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
            <Link href="#terms-of-use" className="hover:text-[#002855] transition-colors">
              Terms of use
            </Link>
            <Link href="#refund-cancellation" className="hover:text-[#002855] transition-colors">
              Refund & Cancellation Policy
            </Link>
            <Link href="#disclaimer" className="hover:text-[#002855] transition-colors">
              Disclaimer
            </Link>
            <Link href="#accessibility" className="hover:text-[#002855] transition-colors">
              Accessibility statement
            </Link>
          </div>
        </div>

        {/* ================================================================== */}
        {/* COPYRIGHT NOTICE – added at the very bottom, centered on all screens */}
        {/* ================================================================== */}
        <div className="mt-8 pt-6 text-center text-sm text-gray-600">
          <p>Copyright © 2019-2026 Sarsen & Company.</p>
        </div>
      </div>
    </footer>
  );
}