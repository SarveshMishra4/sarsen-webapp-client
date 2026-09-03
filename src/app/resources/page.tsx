// app/resources/page.tsx
// Server Component — no 'use client' here. This file's only job is to
// own the route's metadata and hand off rendering to ResourcesClient.
import type { Metadata } from 'next';
import ResourcesClient from './resourcesClient';

const BASE_URL = 'https://www.sarsenpartners.com';
const PAGE_URL = `${BASE_URL}/resources`;
const OG_IMAGE = `${BASE_URL}/assets/og/about-og.jpg`; // 1200x630, absolute URL required

export const metadata: Metadata = {
  // ── Title ─────────────────────────────────────────────────────────────────
  // Your root layout.tsx has a title.template ('%s - Sarsen Strategy Partners'),
  // so this renders as: "Resources - Sarsen Strategy Partners"
  title: 'Resources',

  // ── Description (Google's snippet, and OG/Twitter fallback) ────────────────
  description:
    'Access Sarsen Strategy Partners\' resource hub — blogs, case studies, events, reports, cohorts, and strategic tools for founders navigating complexity and high-stakes decisions.',

  // ── Keywords — page-specific, not the homepage's generic list ─────────────
  keywords: [
    'startup resources',
    'strategy consulting blogs',
    'founder tools and templates',
    'business case studies India',
    'startup cohort programs',
    'market research reports',
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
    title: 'Resources - Sarsen Strategy Partners',
    description:
      'Access Sarsen Strategy Partners\' resource hub — blogs, case studies, events, reports, cohorts, and strategic tools for founders.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Sarsen Strategy Partners — Resources',
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Resources - Sarsen Strategy Partners',
    description:
      'Access Sarsen Strategy Partners\' resource hub — blogs, case studies, events, reports, cohorts, and strategic tools for founders.',
    images: [OG_IMAGE],
    // Uncomment once you have a handle (matches the commented-out lines in layout.tsx):
    // site: '@sarsenpartners',
    // creator: '@sarsenpartners',
  },
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}