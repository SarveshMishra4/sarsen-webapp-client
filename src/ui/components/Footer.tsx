"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { apiRequest } from "@/services/api";
import { useToast } from "@/ui/primitives/Toast"; // 👈 added import

// ============================================================================
// SIMPLE DIVIDER COMPONENT
// ============================================================================
const SimpleDivider = () => (
  <div className="h-24 w-full border-b-2 border-gray-400 bg-gray-300" />
);

// ============================================================================
// FOOTER COMPONENT
// ============================================================================
export default function Footer() {

  // ── Newsletter state ───────────────────────────────────────────────────────
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast(); // 👈 get showToast function

  const handleNewsletterSubmit = async () => {
    // Basic email validation
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setIsLoading(true);

    try {
      await apiRequest('POST', '/newsletter/subscribe', {
        body: { email },
      });
      showToast('Thank You For Subscribing', 'success');
      setEmail('');
    } catch (err: any) {
      if (err.status === 409) {
        showToast('You are already subscribed. Thank you!', 'success');
        setEmail('');
      } else {
        showToast(err.message ?? 'Something Went Wrong.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="border-t border-gray-200 bg-gray-100 text-gray-900">

      <SimpleDivider />

      {/* MAIN CONTENT WRAPPER — untouched: mx-auto max-w-[1400px] px-4 py-16 md:px-8 */}
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">

        {/* =================================================================
            TOP GRID SECTION — untouched
        ================================================================= */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">

          {/* LEFT COLUMN – logo + nav links */}
          <div className="space-y-8 md:col-span-6 lg:col-span-4">

            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="relative h-12 w-12">
                <Image
                  src="/assets/brand/Sarsen-Blue.svg"
                  alt="Sarsen Strategy Partners"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <div className="text-2xl font-bold text-gray-900">
                  Sarsen
                </div>
                <div className="text-sm font-bold text-gray-900">
                  Strategy Partners
                </div>
              </div>
            </Link>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <li>
                <Link
                  href="/career"
                  className="text-md text-gray-700 transition-colors hover:text-[#002855]"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="text-md text-gray-700 transition-colors hover:text-[#002855]"
                >
                  Our Methedology
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-md text-gray-700 transition-colors hover:text-[#002855]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>

          </div>
          {/* END LEFT COLUMN */}

          {/* CENTRE SPACER COLUMN (desktop only) — untouched */}
          <div className="hidden md:hidden lg:block lg:col-span-4" />

          {/* RIGHT COLUMN – Subscribe form — untouched */}
          <div className="md:col-span-6 lg:col-span-4">
            <h3 className="mb-3 text-xl font-bold text-gray-900">Subscribe</h3>
            <p className="mb-5 text-md  text-gray-600">
              Select topics and stay current with our latest insights
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                placeholder="Email address"
                className="flex-1 rounded-md border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-[#002855] focus:outline-none"
                aria-label="Email address for newsletter"
                onKeyDown={e => { if (e.key === 'Enter') handleNewsletterSubmit(); }}
              />
              <button
                onClick={handleNewsletterSubmit}
                disabled={isLoading}
                className="whitespace-nowrap rounded-md bg-[#002855] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#0A1E3D] disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Subscribe to newsletter"
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
          {/* END RIGHT COLUMN */}

        </div>
        {/* END TOP GRID SECTION */}

        {/* =================================================================
            EMPLOYER STATEMENT + COPYRIGHT (UPDATED)
            - Wording softened: no claims of existing infrastructure/scale.
              "Continuous effort to build" framing instead — honest for a
              small, ambitious firm without sounding small.
            - Copyright line folded into the end of this same paragraph
              instead of living as its own separate centred block below.
              This removes the standalone "All Rights Reserved" line that
              was breaking the visual flow.
        ================================================================= */}
        <div className="mb-8 border-t border-gray-200 pt-8">
          <p className="w-full text-sm leading-relaxed text-gray-600">
            At Sarsen Strategy Partners, precision and discretion guide how we work with our clients and with the data we hold on their behalf. Every engagement is handled with the same care we bring to the recommendations we deliver and we treat data stewardship and ethical practice as a continuous effort, not a fixed standard. It is a discipline we hold ourselves to at every stage of a client relationship.<br/> © {new Date().getFullYear()} Sarsen Strategy Partners. All rights reserved.
          </p>
        </div>
        {/* END EMPLOYER STATEMENT + COPYRIGHT */}

        {/* =================================================================
            LEGAL LINKS ROW — untouched, now the last content block
            before the footer closes (no separate copyright div beneath it)
        ================================================================= */}
        <div className="flex flex-col items-start justify-between gap-8 md:gap-0 lg:flex-row lg:items-center">

          <div className="flex w-full flex-wrap justify-start md:mt-4 lg:mt-0 gap-x-6 gap-y-3 text-sm text-gray-600 md:justify-start lg:w-auto">

            <button className="flex items-center gap-2 transition-colors">
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.5 1.5v3h-3v-3h3zm-4 0v3h-3v-3h3zm8 0v3h-3v-3h3zm0 4v3h-3v-3h3zm0 4v3h-3v-3h3zm-4 0v3h-3v-3h3zm-4 0v3h-3v-3h3zm0-4v3h-3v-3h3zm4 0v3h-3v-3h3z" />
              </svg>
              Your Privacy Choices
            </button>

            <Link href="/legal-and-regulatory/cookie-preferences" className="hover:text-[#002855] transition-colors">
              Cookie Preferences
            </Link>

            <Link href="/legal-and-regulatory/terms-of-use" className="hover:text-[#002855] transition-colors">
              Terms & Conditions
            </Link>

            <Link href="/legal-and-regulatory/refund-and-cancellation" className="hover:text-[#002855] transition-colors">
              Refund & Cancellation Policy
            </Link>

            <Link href="/legal-and-regulatory/disclaimer" className="hover:text-[#002855] transition-colors">
              Disclaimer
            </Link>

            <Link href="/legal-and-regulatory/accessibility-statement" className="hover:text-[#002855] transition-colors">
              Accessibility statement
            </Link>

          </div>

        </div>
        {/* END LEGAL LINKS ROW */}

      </div>
    </footer>
  );
}