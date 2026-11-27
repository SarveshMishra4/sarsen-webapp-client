// app/beyond-business-and-management/political-consulting/page.tsx
// Server Component — no 'use client' here. This file's only job is to
// own the route's metadata and hand off rendering to PoliticalClient.
import type { Metadata } from 'next';
import PoliticalClient from './politicalClient';

const BASE_URL = 'https://www.sarsenpartners.com';
const PAGE_URL = `${BASE_URL}/beyond-business-and-management/political-consulting`;
const OG_IMAGE = `${BASE_URL}/assets/brand/og-default.png`; // 1200x630, absolute URL required

const PAGE_TITLE = 'Governance & Political Consulting - Sarsen Strategy Partners';
const PAGE_DESCRIPTION =
  'Sarsen Strategy Partners observes, analyzes and deciphers governance and political systems across India, Brazil and the United States, turning political complexity into clear strategic decisions.';

export const metadata: Metadata = {
  // ── Title ─────────────────────────────────────────────────────────────────
  // `absolute` bypasses the root layout's title.template, so the suffix is
  // never doubled ("... - Sarsen Strategy Partners - Sarsen Strategy Partners").
  title: { absolute: PAGE_TITLE },

  // ── Description ──────────────────────────────────────────────────────────
  description: PAGE_DESCRIPTION,

  // ── Keywords — page-specific ─────────────────────────────────────────────
  keywords: [
    'governance consulting',
    'political consulting',
    'political analysis India',
    'political analysis Brazil',
    'political analysis United States',
    'political risk advisory',
    'policy analysis consulting',
    'Sarsen Strategy Partners governance',
  ],

  // ── Authorship ───────────────────────────────────────────────────────────
  authors: [{ name: 'Sarsen Strategy Partners', url: BASE_URL }],
  creator: 'Sarsen Strategy Partners',
  publisher: 'Sarsen Strategy Partners',

  // ── Canonical ────────────────────────────────────────────────────────────
  alternates: {
    canonical: PAGE_URL,
  },

  // ── Robots ───────────────────────────────────────────────────────────────
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

  // ── Open Graph ───────────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: PAGE_URL,
    siteName: 'Sarsen Strategy Partners',
    title: PAGE_TITLE,
    description:
      'We observe, analyze and decipher governance and politics across India, Brazil and the United States.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Sarsen Strategy Partners — Governance & Political Consulting',
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description:
      'We observe, analyze and decipher governance and politics across India, Brazil and the United States.',
    images: [OG_IMAGE],
    // site: '@sarsenpartners',
    // creator: '@sarsenpartners',
  },
};

export default function GovernancePoliticalPage() {
  return <PoliticalClient />;
}
