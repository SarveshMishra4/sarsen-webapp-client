// app/business-heatmap/page.tsx
// Server Component — no 'use client' here. This file's only job is to
// own the route's metadata and hand off rendering to BusinessHeatmapClient.
import type { Metadata } from 'next';
import BusinessHeatmapClient from './businessHeatmapClient';

const BASE_URL = 'https://www.sarsenpartners.com';
const PAGE_URL = `${BASE_URL}/business-heatmap`;
const OG_IMAGE = `${BASE_URL}/assets/brand/og-default.png`; // 1200x630, absolute URL required

export const metadata: Metadata = {
  // ── Title ─────────────────────────────────────────────────────────────────
  // Your root layout.tsx has a title.template ('%s - Sarsen Strategy Partners'),
  // so this renders as: "Business Diagnostic - Sarsen Strategy Partners"
  title: 'Business Diagnostic',

  // ── Description (Google's snippet, and OG/Twitter fallback) ────────────────
  description:
    'Take a 5-minute business diagnostic to see a heatmap of your company\'s structural health across customer, market, financial, and execution dimensions. Built on the same frameworks used by top-tier operators and investors.',

  // ── Keywords — page-specific, not the homepage's generic list ─────────────
  keywords: [
    'business diagnostic',
    'startup health check',
    'business heatmap',
    'founder assessment',
    'strategy diagnostic',
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
    title: 'Business Diagnostic - Sarsen Strategy Partners',
    description:
      'Take a 5-minute business diagnostic to see a heatmap of your company\'s structural health across customer, market, financial, and execution dimensions.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Sarsen Strategy Partners — Business Diagnostic',
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Business Diagnostic - Sarsen Strategy Partners',
    description:
      'Take a 5-minute business diagnostic to see a heatmap of your company\'s structural health across customer, market, financial, and execution dimensions.',
    images: [OG_IMAGE],
    // Uncomment once you have a handle (matches the commented-out lines in layout.tsx):
    // site: '@sarsenpartners',
    // creator: '@sarsenpartners',
  },
};

export default function BusinessHeatmapPage() {
  return <BusinessHeatmapClient />;
}