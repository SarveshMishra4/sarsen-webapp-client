// app/resources/blog/page.tsx
// Server Component — no 'use client' here. This file's only job is to
// own the route's metadata and hand off rendering to BlogsClient.
import type { Metadata } from 'next';
import BlogsClient from './blogClient';

const BASE_URL = 'https://www.sarsenpartners.com';
const PAGE_URL = `${BASE_URL}/resources/blog`;
const OG_IMAGE = `${BASE_URL}/assets/og/about-og.jpg`; // 1200x630, absolute URL required

export const metadata: Metadata = {
  // ── Title ─────────────────────────────────────────────────────────────────
  // Your root layout.tsx has a title.template ('%s - Sarsen Strategy Partners'),
  // so this renders as: "Blogs - Sarsen Strategy Partners"
  title: 'Blogs',

  // ── Description (Google's snippet, and OG/Twitter fallback) ────────────────
  description:
    'In-depth perspectives from Sarsen Strategy Partners on strategy, revenue architecture, capital decisions, and the structural realities of building startups in India.',

  // ── Keywords — page-specific, not the homepage's generic list ─────────────
  keywords: [
    'startup strategy blog',
    'founder thinking',
    'revenue architecture insights',
    'fundraising advice India',
    'Sarsen blog',
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
    title: 'Blogs - Sarsen Strategy Partners',
    description:
      'In-depth perspectives from Sarsen Strategy Partners on strategy, revenue architecture, capital decisions, and the structural realities of building startups in India.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Sarsen Strategy Partners — Blogs',
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Blogs - Sarsen Strategy Partners',
    description:
      'In-depth perspectives from Sarsen Strategy Partners on strategy, revenue architecture, capital decisions, and the structural realities of building startups in India.',
    images: [OG_IMAGE],
    // Uncomment once you have a handle (matches the commented-out lines in layout.tsx):
    // site: '@sarsenpartners',
    // creator: '@sarsenpartners',
  },
};

export default function BlogsPage() {
  return <BlogsClient />;
}