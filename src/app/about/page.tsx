// // app/about/page.tsx
// // Server Component — no 'use client' here. This file's only job is to
// // own the route's metadata and hand off rendering to AboutClient.
// import type { Metadata } from 'next';
// import AboutClient from './aboutClient';

// const BASE_URL = 'https://www.sarsenpartners.com';

// export const metadata: Metadata = {
//   title: 'About Us | Sarsen Partners',
//   description:
//     'Sarsen Partners is a diagnostic-led strategy consulting firm for growth-stage founders and businesses — quantitative, fact-based, execution-focused strategy under real-world constraints.',
//   alternates: {
//     canonical: `${BASE_URL}/about`,
//   },
//   openGraph: {
//     title: 'About Us | Sarsen Partners',
//     description:
//       'Strategic diagnostics and execution-ready thinking for founders operating under real constraints.',
//     url: `${BASE_URL}/about`,
//     siteName: 'Sarsen Partners',
//     type: 'website',
//   },
// };

// export default function AboutPage() {
//   return <AboutClient />;
// }


// app/about/page.tsx
import type { Metadata } from 'next';
import AboutClient from './aboutClient';

const BASE_URL = 'https://www.sarsenpartners.com';

export const metadata: Metadata = {
  // 1. Browser tab + Google's blue search result link
  title: 'About Us | Sarsen Partners',

  // 2. The grey snippet text under the link in Google search results
  description:
    'Sarsen Partners is a diagnostic-led strategy consulting firm for growth-stage founders — quantitative, fact-based, execution-focused strategy.',

  // 3. Tells Google "this is the one true URL for this content" (dedupe signal)
  alternates: {
    canonical: `${BASE_URL}/about`,
  },

  // 4. What shows when someone shares this URL on LinkedIn, WhatsApp, Slack, etc.
  openGraph: {
    title: 'About Us | Sarsen Partners',
    description: 'Strategic diagnostics and execution-ready thinking for founders.',
    url: `${BASE_URL}/about`,
    siteName: 'Sarsen Partners',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/assets/og/about-og.jpg`, // must be an ABSOLUTE url
        width: 1200,
        height: 630,
        alt: 'Sarsen Partners — About Us',
      },
    ],
  },

  // 5. Twitter/X has its own separate card spec — falls back to openGraph
  //    if you skip this, but worth setting explicitly for control
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Sarsen Partners',
    description: 'Strategic diagnostics and execution-ready thinking for founders.',
    images: [`${BASE_URL}/assets/og/about-og.jpg`],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}