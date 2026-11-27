// src/app/beyond-business-and-management/global-hiring/page.tsx
// Server Component — no 'use client' here. This file's only job is to
// own the route's metadata and hand off rendering to HiringClient.
import type { Metadata } from 'next';
import HiringClient from './hiringClient';

const BASE_URL = 'https://www.sarsenpartners.com';
const PAGE_URL = `${BASE_URL}/beyond-business-and-management/global-hiring`;
const OG_IMAGE = `${BASE_URL}/assets/brand/og-default.png`; // 1200x630, absolute URL required

const PAGE_TITLE = 'Global Hiring & Project Workforce Consulting - Sarsen Strategy Partners';
const PAGE_DESCRIPTION =
  'From a single CEO to a 2,000-strong project workforce. Sarsen Strategy Partners delivers executive search, specialist hiring and project-specific workforce mobilisation for global corporations.';
const SHARE_DESCRIPTION =
  'Executive search, specialist hiring and project workforce mobilisation for global corporations. From the boardroom to the build site.';

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's title.template so the suffix is not doubled.
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,

  keywords: [
    'global hiring consulting',
    'executive search',
    'CEO search firm',
    'project workforce hiring',
    'Middle East workforce recruitment',
    'manpower mobilisation',
    'project-specific hiring',
    'Sarsen Strategy Partners hiring',
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
        alt: 'Sarsen Strategy Partners — Global Hiring & Project Workforce Consulting',
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

export default function GlobalHiringPage() {
  return <HiringClient />;
}
