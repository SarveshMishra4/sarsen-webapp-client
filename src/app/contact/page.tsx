// app/contact/page.tsx
// Server Component — no 'use client' here. This file's only job is to
// own the route's metadata and hand off rendering to ContactClient.
import type { Metadata } from 'next';
import ContactClient from './contactClient';

const BASE_URL = 'https://www.sarsenpartners.com';
const PAGE_URL = `${BASE_URL}/contact`;
const OG_IMAGE = `${BASE_URL}/assets/og/about-og.jpg`; // 1200x630, absolute URL required

export const metadata: Metadata = {
  // ── Title ─────────────────────────────────────────────────────────────────
  // Your root layout.tsx has a title.template ('%s - Sarsen Strategy Partners'),
  // so this renders as: "Contact Us - Sarsen Strategy Partners"
  title: 'Contact Us',

  // ── Description (Google's snippet, and OG/Twitter fallback) ────────────────
  description:
    'Contact Sarsen Partners for strategic clarity. Share your situation and we will review it before responding. Paid diagnostic sessions available for founders and businesses.',

  // ── Keywords — page-specific, not the homepage's generic list ─────────────
  keywords: [
    'contact Sarsen Partners',
    'strategy consulting contact',
    'business diagnostic session',
    'founder advisory inquiry',
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
    title: 'Contact Us - Sarsen Strategy Partners',
    description:
      'Contact Sarsen Partners for strategic clarity. Share your situation and we will review it before responding.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Sarsen Strategy Partners — Contact Us',
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Sarsen Strategy Partners',
    description:
      'Contact Sarsen Partners for strategic clarity. Share your situation and we will review it before responding.',
    images: [OG_IMAGE],
    // Uncomment once you have a handle (matches the commented-out lines in layout.tsx):
    // site: '@sarsenpartners',
    // creator: '@sarsenpartners',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}