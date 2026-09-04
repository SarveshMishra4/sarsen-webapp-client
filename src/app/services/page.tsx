// app/services/page.tsx
// Server Component — no 'use client' here. This file's only job is to
// own the route's metadata and hand off rendering to ServicesClient.
import type { Metadata } from 'next';
import ServicesClient from './servicesClient';

const BASE_URL = 'https://www.sarsenpartners.com';
const PAGE_URL = `${BASE_URL}/services`;
const OG_IMAGE = `${BASE_URL}/assets/brand/og-default.png`; // 1200x630, absolute URL required

export const metadata: Metadata = {
  // ── Title ─────────────────────────────────────────────────────────────────
  // Your root layout.tsx has a title.template ('%s - Sarsen Strategy Partners'),
  // so this renders as: "Services - Sarsen Strategy Partners"
  title: 'Services',

  // ── Description (Google's snippet, and OG/Twitter fallback) ────────────────
  description:
    'Explore Sarsen Strategy Partners\' structured consulting packages — from business diagnostics and product-market fit to go-to-market, operations, fundraising, turnaround, and scaling. Every engagement is diagnostic-led, execution-focused, and designed for founders under real constraints.',

  // ── Keywords — page-specific, not the homepage's generic list ─────────────
  keywords: [
    'strategy consulting services',
    'business diagnostic package',
    'product-market fit consulting',
    'go-to-market strategy India',
    'fundraising readiness service',
    'turnaround and stabilisation',
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
    title: 'Services - Sarsen Strategy Partners',
    description:
      'Explore Sarsen Strategy Partners\' structured consulting packages — from business diagnostics and product-market fit to go-to-market, operations, fundraising, turnaround, and scaling.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Sarsen Strategy Partners — Services',
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Services - Sarsen Strategy Partners',
    description:
      'Explore Sarsen Strategy Partners\' structured consulting packages — from business diagnostics and product-market fit to go-to-market, operations, fundraising, turnaround, and scaling.',
    images: [OG_IMAGE],
    // Uncomment once you have a handle (matches the commented-out lines in layout.tsx):
    // site: '@sarsenpartners',
    // creator: '@sarsenpartners',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}