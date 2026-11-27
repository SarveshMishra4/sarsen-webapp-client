// src/app/beyond-business-and-management/career-and-success-strategy/page.tsx
// Server Component — no 'use client' here. This file's only job is to
// own the route's metadata and hand off rendering to CareerClient.
import type { Metadata } from 'next';
import CareerClient from './careerClient';

const BASE_URL = 'https://www.sarsenpartners.com';
const PAGE_URL = `${BASE_URL}/beyond-business-and-management/career-and-success-strategy`;
const OG_IMAGE = `${BASE_URL}/assets/brand/og-default.png`; // 1200x630, absolute URL required

const PAGE_TITLE = 'Career & Success Strategy - Sarsen Strategy Partners';
const PAGE_DESCRIPTION =
  'Personal career and success strategy for high-ambition individuals: executives aiming for the C-suite, athletes, actors, artists and public figures. Wherever you start, the right strategy changes where you finish.';
const SHARE_DESCRIPTION =
  'Strategy for high-ambition individuals. Wherever you start, the right strategy changes where you finish.';

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's title.template so the suffix is not doubled.
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,

  keywords: [
    'career strategy consulting',
    'success strategy',
    'executive career strategy',
    'path to CEO',
    'athlete career strategy',
    'personal brand strategy for actors',
    'public figure reputation strategy',
    'Sarsen Strategy Partners career',
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
    title: PAGE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Sarsen Strategy Partners — Career & Success Strategy',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [OG_IMAGE],
    // site: '@sarsenpartners',
    // creator: '@sarsenpartners',
  },
};

export default function CareerSuccessPage() {
  return <CareerClient />;
}
