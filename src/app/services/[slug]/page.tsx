// app/services/[slug]/page.tsx
// Server Component — owns dynamic metadata for each service and hands
// off rendering to the existing ServicePage client component.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug } from './data';
import ServicePage from './services';

const BASE_URL = 'https://www.sarsenpartners.com';
const OG_IMAGE = `${BASE_URL}/assets/og/about-og.jpg`; // 1200x630, absolute URL required

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC METADATA
// ─────────────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    // Next.js will render the notFound page; metadata can be a fallback.
    return {
      title: 'Service Not Found',
      robots: { index: false, follow: false },
    };
  }

  const PAGE_URL = `${BASE_URL}/services/${slug}`;

  // Build a concise description from the service excerpt or problemStatement.
  const description =
    service.excerpt?.length > 0
      ? service.excerpt
      : service.problemStatement || `Explore ${service.title} by Sarsen Strategy Partners.`;

  return {
    // ── Title ─────────────────────────────────────────────────────────────
    title: service.title,

    // ── Description ───────────────────────────────────────────────────────
    description,

    // ── Keywords — service-specific, built from tag, title, and package ──
    keywords: [
      service.title,
      service.tag,
      service.packageNumber,
      'Sarsen Strategy Partners',
      'business consulting',
      'startup strategy',
    ],

    // ── Authorship ────────────────────────────────────────────────────────
    authors: [{ name: 'Sarsen Strategy Partners', url: BASE_URL }],
    creator: 'Sarsen Strategy Partners',
    publisher: 'Sarsen Strategy Partners',

    // ── Canonical ─────────────────────────────────────────────────────────
    alternates: {
      canonical: PAGE_URL,
    },

    // ── Robots ────────────────────────────────────────────────────────────
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

    // ── Open Graph ────────────────────────────────────────────────────────
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: PAGE_URL,
      siteName: 'Sarsen Strategy Partners',
      title: `${service.title} - Sarsen Strategy Partners`,
      description,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },

    // ── Twitter / X ───────────────────────────────────────────────────────
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} - Sarsen Strategy Partners`,
      description,
      images: [OG_IMAGE],
      // Uncomment once you have a handle (matches the commented-out lines in layout.tsx):
      // site: '@sarsenpartners',
      // creator: '@sarsenpartners',
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default async function ServiceSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServicePage service={service} />;
}