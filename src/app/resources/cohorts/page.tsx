// app/cohorts/page.tsx
// Server Component — no 'use client' here. This file's only job is to
// own the route's metadata and hand off rendering to CohortsClient.
import type { Metadata } from 'next';
import CohortsClient from './cohortsClient';

const BASE_URL = 'https://www.sarsenpartners.com';
const PAGE_URL = `${BASE_URL}/cohorts`;
const OG_IMAGE = `${BASE_URL}/assets/og/about-og.jpg`; // 1200x630, absolute URL required

export const metadata: Metadata = {
  // ── Title ─────────────────────────────────────────────────────────────────
  // Your root layout.tsx has a title.template ('%s - Sarsen Strategy Partners'),
  // so this renders as: "Cohorts - Sarsen Strategy Partners"
  title: 'Cohorts',

  // ── Description (Google's snippet, and OG/Twitter fallback) ────────────────
  description:
    'Join Sarsen Strategy Partners\' structured cohort programs for founders — revenue architecture, capital readiness, operations, and strategic clarity. Peer accountability, expert input, and real work done in real time.',

  // ── Keywords — page-specific, not the homepage's generic list ─────────────
  keywords: [
    'founder cohorts',
    'startup cohort programs',
    'revenue architecture cohort',
    'capital readiness program',
    'strategic clarity cohort',
    'Sarsen cohorts',
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
    title: 'Cohorts - Sarsen Strategy Partners',
    description:
      'Join Sarsen Strategy Partners\' structured cohort programs for founders — revenue architecture, capital readiness, operations, and strategic clarity.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Sarsen Strategy Partners — Cohorts',
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Cohorts - Sarsen Strategy Partners',
    description:
      'Join Sarsen Strategy Partners\' structured cohort programs for founders — revenue architecture, capital readiness, operations, and strategic clarity.',
    images: [OG_IMAGE],
    // Uncomment once you have a handle (matches the commented-out lines in layout.tsx):
    // site: '@sarsenpartners',
    // creator: '@sarsenpartners',
  },
};

export default function CohortsPage() {
  return <CohortsClient />;
}