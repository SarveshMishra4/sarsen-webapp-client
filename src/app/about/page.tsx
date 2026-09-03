// app/about/page.tsx
// Server Component — no 'use client' here. This file's only job is to
// own the route's metadata and hand off rendering to AboutClient.
import type { Metadata } from 'next';
import AboutClient from './aboutClient';

const BASE_URL = 'https://www.sarsenpartners.com';
const PAGE_URL = `${BASE_URL}/about`;
const OG_IMAGE = `${BASE_URL}/assets/og/about-og.jpg`; // 1200x630, absolute URL required

export const metadata: Metadata = {
  // ── Title ─────────────────────────────────────────────────────────────────
  // Your root layout.tsx has a title.template ('%s - Sarsen Strategy Partners'),
  // so this renders as: "About Us - Sarsen Strategy Partners"
  title: 'About Us',

  // ── Description (Google's snippet, and OG/Twitter fallback) ────────────────
  description:
    'Sarsen Partners is a diagnostic-led strategy consulting firm for growth-stage founders and businesses — quantitative, fact-based, execution-focused strategy under real-world constraints.',

  // ── Keywords — page-specific, not the homepage's generic list ─────────────
  keywords: [
    'about Sarsen Partners',
    'strategy consulting team India',
    'business diagnostic firm',
    'founder-aligned consulting',
  ],

  // ── Authorship — usually fine to inherit from layout.tsx, but explicit
  //    here so this page's metadata is fully self-contained ─────────────────
  authors: [{ name: 'Sarsen Strategy Partners', url: BASE_URL }],
  creator: 'Sarsen Strategy Partners',
  publisher: 'Sarsen Strategy Partners',

  // ── Canonical — the actual bug fix from the audit ──────────────────────────
  alternates: {
    canonical: PAGE_URL,
  },

  // ── Robots — explicit per-page, matches layout.tsx defaults ────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Open Graph — Facebook, LinkedIn, WhatsApp, Slack all read this ─────────
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: PAGE_URL,
    siteName: 'Sarsen Strategy Partners',
    title: 'About Us - Sarsen Strategy Partners',
    description:
      'Strategic diagnostics and execution-ready thinking for founders operating under real constraints.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Sarsen Strategy Partners — About Us',
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Sarsen Strategy Partners',
    description:
      'Strategic diagnostics and execution-ready thinking for founders operating under real constraints.',
    images: [OG_IMAGE],
    // Uncomment once you have a handle (matches the commented-out lines in layout.tsx):
    // site: '@sarsenpartners',
    // creator: '@sarsenpartners',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}