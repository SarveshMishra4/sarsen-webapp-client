"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { apiRequest } from "@/services/api";
import { useToast } from "@/ui/primitives/Toast";

// ============================================================================
// SIMPLE DIVIDER COMPONENT
// ============================================================================
const SimpleDivider = () => (
  <div className="h-24 w-full border-b-2 border-gray-400 bg-gray-300" />
);

// ============================================================================
// BEYOND FOOTER
// Used on every page under /beyond-business-and-management. Same layout and newsletter behaviour as
// the main Footer — only the content has changed.
// ============================================================================
export default function BeyondFooter() {

  // ── Newsletter state ───────────────────────────────────────────────────────
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();

  const handleNewsletterSubmit = async () => {
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

  const practiceLinks = [
    { label: 'Governance & Political', href: '/beyond-business-and-management/political-consulting' },
    { label: 'Global Hiring', href: '/beyond-business-and-management/global-hiring' },
    { label: 'Career & Success', href: '/beyond-business-and-management/career-and-success-strategy' },
    { label: 'Main Site', href: '/' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer data-beyond-footer className="border-t border-gray-200 bg-gray-100 text-gray-900">

      <SimpleDivider />

      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">

        {/* =================================================================
            TOP GRID SECTION
        ================================================================= */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">

          {/* LEFT COLUMN – logo + practice links */}
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
              {practiceLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-md text-gray-700 transition-colors hover:text-[#002855]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* CENTRE SPACER COLUMN (desktop only) */}
          <div className="hidden md:hidden lg:block lg:col-span-4" />

          {/* RIGHT COLUMN – Subscribe form */}
          <div className="md:col-span-6 lg:col-span-4">
            <h3 className="mb-3 text-xl font-bold text-gray-900">Subscribe</h3>
            <p className="mb-5 text-md text-gray-600">
              Receive our periodic briefings on governance, global talent and career strategy
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
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

        </div>

        {/* =================================================================
            STATEMENT + COPYRIGHT
        ================================================================= */}
        <div className="mb-8 border-t border-gray-200 pt-8">
          <p className="w-full text-sm leading-relaxed text-gray-600">
            Beyond business strategy, Sarsen Strategy Partners brings the same rigour to governance, global talent and individual career and success strategy. Our governance work is independent and non-partisan: we observe, analyze and decipher, and we do not campaign or endorse. Across every practice, client identities, engagements and findings are held in strict confidence, and we treat discretion as a discipline we hold ourselves to at every stage of a relationship.<br/> © {new Date().getFullYear()} Sarsen Strategy Partners. All rights reserved.
          </p>
        </div>

        {/* =================================================================
            LEGAL LINKS ROW
        ================================================================= */}
        <div className="flex flex-col items-start justify-between gap-8 md:gap-0 lg:flex-row lg:items-center">
          <div className="flex w-full flex-wrap justify-start md:mt-4 lg:mt-0 gap-x-6 gap-y-3 text-sm text-gray-600 md:justify-start lg:w-auto">
            <Link href="/legal-and-regulatory/terms-and-conditions" className="hover:text-[#002855] transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
