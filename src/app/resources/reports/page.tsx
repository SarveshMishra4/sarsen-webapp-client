// app/reports/page.tsx
// Server Component — no 'use client' here. This file's only job is to
// own the route's metadata and hand off rendering to ReportsClient.
import type { Metadata } from 'next';
import ReportsClient from './reportsClient';

const BASE_URL = 'https://www.sarsenpartners.com';
const PAGE_URL = `${BASE_URL}/reports`;
const OG_IMAGE = `${BASE_URL}/assets/brand/og-default.png`; // 1200x630, absolute URL required

export const metadata: Metadata = {
  // ── Title ─────────────────────────────────────────────────────────────────
  // Your root layout.tsx has a title.template ('%s - Sarsen Strategy Partners'),
  // so this renders as: "Reports - Sarsen Strategy Partners"
  title: 'Reports',

  // ── Description (Google's snippet, and OG/Twitter fallback) ────────────────
  description:
    'Download original research and data-backed analysis from Sarsen Strategy Partners — annual reports, sector deep-dives, benchmarks, and frameworks built for founders who make decisions with evidence.',

  // ── Keywords — page-specific, not the homepage's generic list ─────────────
  keywords: [
    'startup research reports',
    'Indian startup ecosystem report',
    'sector analysis India',
    'founder benchmarks',
    'strategic frameworks PDF',
  ],

  // ── Authorship — explicit so this page's metadata is fully self-contained ─
  authors: [{ name: 'Sarsen Strategy Partners', url: BASE_URL }],
  creator: 'Sarsen Strategy Partners',
  publisher: 'Sarsen Strategy Partners',

  // ── Canonical ──────────────────────────────────────────────────────────────
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
    title: 'Reports - Sarsen Strategy Partners',
    description:
      'Download original research and data-backed analysis from Sarsen Strategy Partners — annual reports, sector deep-dives, benchmarks, and frameworks.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Sarsen Strategy Partners — Reports',
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Reports - Sarsen Strategy Partners',
    description:
      'Download original research and data-backed analysis from Sarsen Strategy Partners — annual reports, sector deep-dives, benchmarks, and frameworks.',
    images: [OG_IMAGE],
    // Uncomment once you have a handle (matches the commented-out lines in layout.tsx):
    // site: '@sarsenpartners',
    // creator: '@sarsenpartners',
  },
};

export default function ReportsPage() {
  return <ReportsClient />;
}