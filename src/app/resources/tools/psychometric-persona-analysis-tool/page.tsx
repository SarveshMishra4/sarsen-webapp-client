// app/founder-fit/page.tsx
// Server Component — no 'use client' here. This file's only job is to
// own the route's metadata and hand off rendering to FounderPsychometricClient.
import type { Metadata } from 'next';
import FounderPsychometricClient from './founderPsychometricClient';

const BASE_URL = 'https://www.sarsenpartners.com';
const PAGE_URL = `${BASE_URL}/founder-fit`;
const OG_IMAGE = `${BASE_URL}/assets/brand/og-default.png`; // 1200x630, absolute URL required

export const metadata: Metadata = {
  title: 'Founder & Founding-Team Fit Assessment',

  description:
    'A psychometric fit assessment for founders and founding-team members. Match real decision-making tendencies — risk tolerance, resilience, structure, collaboration style — to the responsibilities each person should actually own.',

  keywords: [
    'founder psychometric test',
    'founding team assessment',
    'startup role fit',
    'founder personality test',
    'team composition risk',
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
    title: 'Founder & Founding-Team Fit Assessment - Sarsen Strategy Partners',
    description:
      'Match your founding team\'s real decision-making tendencies to the responsibilities they actually own — before the mismatch becomes expensive.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Sarsen Strategy Partners — Founder & Founding-Team Fit Assessment',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Founder & Founding-Team Fit Assessment - Sarsen Strategy Partners',
    description:
      'Match your founding team\'s real decision-making tendencies to the responsibilities they actually own.',
    images: [OG_IMAGE],
  },
};

export default function FounderFitPage() {
  return <FounderPsychometricClient />;
}
