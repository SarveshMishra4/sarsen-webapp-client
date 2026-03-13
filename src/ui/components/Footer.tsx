"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { apiRequest } from "@/services/api";

// ============================================================================
// SIMPLE DIVIDER COMPONENT
// ============================================================================
// A purely decorative full-width horizontal bar rendered at the very top
// of the footer, just above the main content area.
//
// Styling breakdown:
//   h-24        → fixed height of 96px on all screen sizes
//   w-full      → stretches the full width of its parent container
//   border-b-2  → adds a 2px solid border along the bottom edge only
//   border-gray-400 → border colour: medium gray (#9ca3af)
//   bg-gray-300 → background fill colour: light gray (#d1d5db)
//
// This component is intentionally kept separate so it can be reused
// or swapped out independently without touching the main footer logic.
// ============================================================================
const SimpleDivider = () => (
  <div className="h-24 w-full border-b-2 border-gray-400 bg-gray-300" />
);

// ============================================================================
// FOOTER COMPONENT
// ============================================================================
// The main site-wide footer rendered at the bottom of every page.
//
// Visual structure (top → bottom):
//   1. SimpleDivider       – decorative gray bar
//   2. Top Grid            – logo + nav links (left) | spacer | subscribe (right)
//   3. Bottom Section      – "Powered by Google" badge + all legal links
//   4. Copyright notice    – centred copyright line
//
// Responsive behaviour across three breakpoints:
//   Mobile  (default / < 768px)  : single column, all items stacked,
//                                   legal links left-aligned
//   Tablet  (md  / ≥ 768px)      : 12-column grid, spacer hidden,
//                                   logo takes 6 cols, subscribe takes 6 cols,
//                                   legal links right-aligned
//   Desktop (lg  / ≥ 1024px)     : 12-column grid, spacer visible (4 cols),
//                                   logo 4 cols, subscribe 4 cols,
//                                   badge and legal links sit side-by-side
// ============================================================================
export default function Footer() {

  // ── Newsletter state ───────────────────────────────────────────────────────
  // Three possible states:
  //   idle       → default, show input + button
  //   loading    → request in flight, button disabled
  //   success    → show confirmation message
  //   error      → show inline error, allow retry
  const [email,           setEmail]           = useState('');
  const [newsletterState, setNewsletterState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterError, setNewsletterError] = useState('');

  const handleNewsletterSubmit = async () => {
    if (!email || !email.includes('@')) {
      setNewsletterError('Please enter a valid email address.');
      setNewsletterState('error');
      return;
    }

    setNewsletterState('loading');
    setNewsletterError('');

    try {
      await apiRequest('POST', '/newsletter/subscribe', {
        body: { email },
      });
      // Success — show confirmation
      setNewsletterState('success');
      setEmail('');
    } catch (err: any) {
      // 409 means already subscribed — treat it as success, not an error
      // Any other error shows the backend message
      if (err.status === 409) {
        setNewsletterState('success');
        setEmail('');
      } else {
        setNewsletterError(err.message ?? 'Something went wrong. Please try again.');
        setNewsletterState('error');
      }
    }
  };

  return (
    // -------------------------------------------------------------------------
    // <footer> root element
    //   border-t border-gray-200 → thin top border separating footer from page
    //   bg-gray-100              → light gray background for the entire footer
    //   text-gray-900            → default dark text colour inherited by children
    // -------------------------------------------------------------------------
    <footer className="border-t border-gray-200 bg-gray-100 text-gray-900">

      {/* ===================================================================
          DECORATIVE DIVIDER
          Rendered first so it appears as a thick bar at the very top of
          the footer, before any text or interactive content.
      =================================================================== */}
      <SimpleDivider />

      {/* ===================================================================
          MAIN CONTENT WRAPPER
          Constrains the footer content to a maximum width of 1400px so it
          doesn't stretch too wide on ultra-wide monitors, while remaining
          full-width on smaller screens.

          mx-auto          → centres the wrapper horizontally
          max-w-[1400px]   → hard cap on content width (custom value)
          px-4             → 16px horizontal padding on mobile
          py-16            → 64px vertical padding top and bottom
          md:px-8          → 32px horizontal padding on tablet and above
      =================================================================== */}
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">

        {/* =================================================================
            TOP GRID SECTION
            Holds two content areas: logo+links (left) and subscribe (right).
            A hidden spacer column creates the visual gap on desktop.

            Layout by breakpoint:
              Mobile  : grid-cols-1  → single column, items stack vertically
              Tablet  : grid-cols-12 → 12-column grid activated
              Desktop : grid-cols-12 → same grid, but spacer column becomes visible

            gap-8     → 32px gap between grid items on mobile
            mb-12     → 48px bottom margin, separating this from the bottom section
            lg:gap-12 → 48px gap on desktop for a more airy feel
        ================================================================= */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">

          {/* ---------------------------------------------------------------
              LEFT COLUMN – Company logo + quick navigation links

              md:col-span-6  → occupies 6 of 12 columns on tablet (50%)
              lg:col-span-4  → occupies 4 of 12 columns on desktop (~33%)
              space-y-8      → 32px vertical gap between the logo block
                               and the links list beneath it
          --------------------------------------------------------------- */}
          <div className="space-y-8 md:col-span-6 lg:col-span-4">

            {/* -------------------------------------------------------------
                LOGO LINK
                Wraps the logo image and company name in a single clickable
                anchor that navigates to the homepage ("/").

                inline-flex     → lays out image and text side-by-side
                items-center    → vertically centres image relative to text
                space-x-3       → 12px gap between image and text block
            ------------------------------------------------------------- */}
            <Link href="/" className="inline-flex items-center space-x-3">

              {/* Logo image container – fixed 48×48px box */}
              <div className="relative h-12 w-12">
                <Image
                  src="/assets/brand/Sarsen-Blue.svg"  // SVG brand mark
                  alt="Sarsen & Company"               // accessible alt text
                  width={48}
                  height={48}
                  className="h-full w-full object-contain" // scale to fit box
                />
              </div>

              {/* Company name – two lines stacked inside a div */}
              <div>
                {/* Line 1: "Sarsen" */}
                <div className="text-2xl font-bold leading-tight text-gray-900">
                  Sarsen
                </div>
                {/* Line 2: "& Company" */}
                <div className="text-2xl font-bold leading-tight text-gray-900">
                  & Company
                </div>
              </div>

            </Link>
            {/* END LOGO LINK */}

            {/* -------------------------------------------------------------
                QUICK NAVIGATION LINKS
                A vertical <ul> list of three footer nav links.
                space-y-3 → 12px gap between each <li>
            ------------------------------------------------------------- */}
            <ul className="space-y-3">

              {/* Careers link – scrolls to the #careers section on /contact */}
              <li>
                <Link
                  href="/contact#careers"
                  className="text-lg text-gray-700 transition-colors hover:text-[#002855]"
                >
                  Careers
                </Link>
              </li>

              {/* How We Work link – scrolls to #how-we-work on /about */}
              <li>
                <Link
                  href="/about#how-we-work"
                  className="text-lg text-gray-700 transition-colors hover:text-[#002855]"
                >
                  How We Work
                </Link>
              </li>

              {/* Our Approach link – scrolls to #approach on /contact */}
              <li>
                <Link
                  href="/contact#approach"
                  className="text-lg text-gray-700 transition-colors hover:text-[#002855]"
                >
                  Our Approach
                </Link>
              </li>

            </ul>
            {/* END QUICK NAVIGATION LINKS */}

          </div>
          {/* END LEFT COLUMN */}

          {/* ---------------------------------------------------------------
              CENTRE SPACER COLUMN (desktop only)
              An empty div that pushes the subscribe form to the right on
              desktop, creating a balanced three-column layout.

              hidden          → invisible on mobile (takes no space)
              md:hidden       → stays invisible on tablet
              lg:block        → becomes visible (block-level) on desktop
              lg:col-span-4   → occupies 4 of 12 columns on desktop (~33%)
          --------------------------------------------------------------- */}
          <div className="hidden md:hidden lg:block lg:col-span-4" />

          {/* ---------------------------------------------------------------
              RIGHT COLUMN – Email subscribe form

              md:col-span-6  → 6 of 12 columns on tablet (right half)
              lg:col-span-4  → 4 of 12 columns on desktop (right third)
          --------------------------------------------------------------- */}
          <div className="md:col-span-6 lg:col-span-4">

            {/* Section heading */}
            <h3 className="mb-3 text-xl font-bold text-gray-900">Subscribe</h3>

            {/* Supporting description text */}
            <p className="mb-5 text-md leading-snug text-gray-600">
              Select topics and stay current with our latest insights
            </p>

            {/* ── Success state – replace input with confirmation ── */}
            {newsletterState === 'success' ? (
              <p className="text-green-700 font-medium text-sm">
                ✓ You are subscribed. Thank you!
              </p>
            ) : (
              <>
                {/* -------------------------------------------------------------
                    INPUT + BUTTON ROW
                    Stacked vertically on mobile for full-width usability,
                    switches to a horizontal row on sm (≥ 640px) and above.

                    flex flex-col  → vertical stack on mobile
                    gap-3          → 12px gap between input and button
                    sm:flex-row    → horizontal row from 640px upward
                ------------------------------------------------------------- */}
                <div className="flex flex-col gap-3 sm:flex-row">

                  {/* Email input field */}
                  <input
                    type="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      // Clear error as soon as user starts typing again
                      if (newsletterState === 'error') setNewsletterState('idle');
                    }}
                    placeholder="Email address"
                    className="flex-1 rounded-md border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-[#002855] focus:outline-none"
                    // flex-1                → grows to fill available space in the row
                    // rounded-md            → slightly rounded corners
                    // border-2 border-gray-300 → visible 2px border, light gray
                    // bg-white              → white background distinguishes it from footer
                    // px-4 py-3             → comfortable internal padding
                    // focus:border-[#002855]→ brand navy border on focus
                    // focus:outline-none    → removes browser default blue outline
                    aria-label="Email address for newsletter"
                    onKeyDown={e => { if (e.key === 'Enter') handleNewsletterSubmit(); }}
                  />

                  {/* Submit button */}
                  <button
                    onClick={handleNewsletterSubmit}
                    disabled={newsletterState === 'loading'}
                    className="whitespace-nowrap rounded-md bg-[#002855] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#0A1E3D] disabled:opacity-60 disabled:cursor-not-allowed"
                    // whitespace-nowrap  → prevents "Submit" from wrapping to two lines
                    // bg-[#002855]       → brand navy background
                    // px-8               → generous horizontal padding
                    // hover:bg-[#0A1E3D] → slightly darker navy on hover
                    aria-label="Subscribe to newsletter"
                  >
                    {newsletterState === 'loading' ? 'Submitting...' : 'Submit'}
                  </button>

                </div>
                {/* END INPUT + BUTTON ROW */}

                {/* Inline error message — only shown when state is 'error' */}
                {newsletterState === 'error' && newsletterError && (
                  <p className="mt-2 text-sm text-red-600">{newsletterError}</p>
                )}
              </>
            )}

          </div>
          {/* END RIGHT COLUMN */}

        </div>
        {/* END TOP GRID SECTION */}

        {/* =================================================================
            BOTTOM SECTION
            Contains the "Powered by Google" badge on the left and all
            legal/policy links on the right.

            Layout by breakpoint:
              Mobile  : flex-col items-start → badge and links stack vertically,
                        both left-aligned
              Tablet  : still column layout but gap reduced (md:gap-0)
              Desktop : lg:flex-row lg:items-center → badge and links sit
                        side-by-side, vertically centred

            flex flex-col      → vertical stack on mobile
            items-start        → left-align children on mobile
            justify-between    → push badge to left, links to right on desktop
            gap-8              → 32px gap between badge and links on mobile
            md:gap-0           → remove gap on tablet (items still stacked
                                 but gap unnecessary as they are separated
                                 by natural block flow)
            lg:flex-row        → switch to horizontal row on desktop
            lg:items-center    → vertically centre badge and links on desktop
        ================================================================= */}
        <div className="flex flex-col items-start justify-between gap-8 md:gap-0 lg:flex-row lg:items-center">

          {/* ---------------------------------------------------------------
              "POWERED BY GOOGLE" BADGE
              A small card-style element displaying the Google logo and
              a two-line text label. Styled to look like a trusted badge.

              flex items-center  → logo and text side-by-side, vertically centred
              gap-4              → 16px gap between logo and text
              bg-gray-50         → slightly off-white card background
              px-4 py-3          → comfortable padding inside the badge
              rounded-lg         → rounded corners for a modern card look
              border border-gray-200 → subtle 1px border to define the card edge
          --------------------------------------------------------------- */}
          <div className="flex items-center gap-4 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">

            {/* Google SVG logo */}
            <img
              src="/assets/logos/Icons.svg"
              alt="Google"
              className="h-8 w-auto opacity-80"
              // h-8        → 32px tall, width scales automatically
              // opacity-80 → slightly translucent for a subtle, non-distracting look
            />

            {/* Badge text: two lines */}
            <div className="text-sm leading-tight text-gray-700">
              {/* Primary line – bold label */}
              <div className="font-semibold text-gray-900">
                Powered by Google
              </div>
              {/* Secondary line – descriptive subtitle */}
              <div className="text-gray-500">
                Search & Cloud Infrastructure
              </div>
            </div>

          </div>
          {/* END BADGE */}

          {/* ---------------------------------------------------------------
              LEGAL LINKS – all nine links in one unified flex-wrap container

              WHY ONE CONTAINER?
              Previously split into two separate <div> elements, which caused
              alignment inconsistencies across breakpoints. Merging them into
              a single flex-wrap container lets the browser naturally reflow
              all links at any viewport width while sharing one consistent
              alignment rule.

              flex             → activates flexbox
              w-full           → full width on mobile so links can left-align
              flex-wrap        → links wrap onto new lines when they don't fit
              justify-start    → left-aligned on mobile
              gap-x-6          → 24px horizontal gap between links
              gap-y-3          → 12px vertical gap when links wrap to a new line
              text-sm          → small text size (14px) appropriate for legal copy
              text-gray-600    → muted gray, lower visual hierarchy than body text
              md:justify-end   → right-aligned from tablet upward
              lg:w-auto        → shrinks to content width on desktop, allowing
                                 it to sit correctly beside the badge in the
                                 same flex row (justify-between does the spacing)
          --------------------------------------------------------------- */}
          <div className="flex w-full flex-wrap justify-start md:mt-4 lg:mt-0 gap-x-6 gap-y-3 text-sm text-gray-600 md:justify-start lg:w-auto">

            {/* ── Row 1 links (appear first in source order) ── */}

            {/* Contact page link */}
            <Link href="/contact#main" className="hover:text-[#002855] transition-colors">
              Contact
            </Link>

            {/* FAQ anchor link */}
            <Link href="#faq" className="hover:text-[#002855] transition-colors">
              FAQ
            </Link>

            {/* Privacy policy anchor */}
            <Link href="#privacy-policy" className="hover:text-[#002855] transition-colors">
              Privacy policy
            </Link>

            {/* "Your privacy choices" – rendered as a <button> because it
                typically triggers a cookie/consent management modal rather
                than navigating to a new URL */}
            <button className="flex items-center gap-2 hover:text-[#002855] transition-colors">
              {/* Small icon (a grid of squares – conventional privacy icon) */}
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.5 1.5v3h-3v-3h3zm-4 0v3h-3v-3h3zm8 0v3h-3v-3h3zm0 4v3h-3v-3h3zm0 4v3h-3v-3h3zm-4 0v3h-3v-3h3zm-4 0v3h-3v-3h3zm0-4v3h-3v-3h3zm4 0v3h-3v-3h3z" />
              </svg>
              Your privacy choices
            </button>

            {/* Cookie preferences anchor */}
            <Link href="#cookie-preferences" className="hover:text-[#002855] transition-colors">
              Cookie preferences
            </Link>

            {/* ── Row 2 links (continue in the same flex container, wrapping naturally) ── */}

            {/* Terms of use anchor */}
            <Link href="#terms-of-use" className="hover:text-[#002855] transition-colors">
              Terms of use
            </Link>

            {/* Refund & Cancellation Policy anchor */}
            <Link href="#refund-cancellation" className="hover:text-[#002855] transition-colors">
              Refund & Cancellation Policy
            </Link>

            {/* Disclaimer anchor */}
            <Link href="#disclaimer" className="hover:text-[#002855] transition-colors">
              Disclaimer
            </Link>

            {/* Accessibility statement anchor */}
            <Link href="#accessibility" className="hover:text-[#002855] transition-colors">
              Accessibility statement
            </Link>

          </div>
          {/* END LEGAL LINKS */}

        </div>
        {/* END BOTTOM SECTION */}

        {/* =================================================================
            COPYRIGHT NOTICE
            A single centred line of small print at the very bottom of
            the footer, below all other content.

            mt-8       → 32px top margin, separating it from the links above
            pt-6       → 24px top padding (adds visual breathing room above
                         the text, useful if a border-top is ever added)
            text-center → centres the text on all screen sizes
            text-md    → base text size (16px)
            text-gray-600 → muted gray, consistent with legal link text
        ================================================================= */}
        <div className="mt-4 pt-6 text-center text-md text-gray-600">
          <p>2019-2026 : All Rights Reserved Sarsen & Company.</p>
        </div>
        {/* END COPYRIGHT NOTICE */}

      </div>
      {/* END MAIN CONTENT WRAPPER */}

    </footer>
  );
}