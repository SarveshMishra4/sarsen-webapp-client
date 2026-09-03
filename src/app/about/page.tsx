// app/about/page.tsx
// Server Component — no 'use client' here. This file's only job is to
// own the route's metadata and hand off rendering to AboutClient.
import type { Metadata } from 'next';
import AboutClient from './aboutClient';

const BASE_URL = 'https://www.sarsenpartners.com';

export const metadata: Metadata = {
  title: 'About Us | Sarsen Partners',
  description:
    'Sarsen Partners is a diagnostic-led strategy consulting firm for growth-stage founders and businesses — quantitative, fact-based, execution-focused strategy under real-world constraints.',
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: 'About Us | Sarsen Partners',
    description:
      'Strategic diagnostics and execution-ready thinking for founders operating under real constraints.',
    url: `${BASE_URL}/about`,
    siteName: 'Sarsen Partners',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}