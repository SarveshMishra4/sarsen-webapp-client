// app/fundraising-readiness/page.tsx
// Server Component — no 'use client' here. This file's only job is to
// own the route's metadata and hand off rendering to FundraisingReadinessClient.
import type { Metadata } from 'next';
import FundraisingReadinessClient from './fundraisingReadinessClient';

const BASE_URL = 'https://www.sarsenpartners.com';
const PAGE_URL = `${BASE_URL}/fundraising-readiness`;
const OG_IMAGE = `${BASE_URL}/assets/brand/og-default.png`; // 1200x630, absolute URL required

export const metadata: Metadata = {
  title: 'Fundraising Readiness & Investor-Stage Fit',

  description:
    'A 28-question fundraising readiness assessment for founders. Find out which investor stage actually fits your traction, whether your ask is genuinely calculated, and whether your diligence materials and outreach strategy are investor-ready.',

  keywords: [
    'fundraising readiness assessment',
    'startup investor stage fit',
    'seed vs series a',
    'fundraising diligence checklist',
    'investor outreach strategy',
  ],

  authors: [{ name: 'Sarsen Strategy Partners', url: BASE_URL }],
  creator: 'Sarsen Strategy Partners',
  publisher: 'Sarsen Strategy Partners',

  alternates: {
    canonical: PAGE_URL,
  },

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

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: PAGE_URL,
    siteName: 'Sarsen Strategy Partners',
    title: 'Fundraising Readiness & Investor-Stage Fit - Sarsen Strategy Partners',
    description:
      'Find out which investor stage actually fits your traction, whether your ask is genuinely calculated, and whether your outreach strategy will work.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Sarsen Strategy Partners — Fundraising Readiness & Investor-Stage Fit',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Fundraising Readiness & Investor-Stage Fit - Sarsen Strategy Partners',
    description:
      'Find out which investor stage actually fits your traction, and whether your ask, diligence, and outreach strategy are investor-ready.',
    images: [OG_IMAGE],
  },
};

export default function FundraisingReadinessPage() {
  return <FundraisingReadinessClient />;
}
