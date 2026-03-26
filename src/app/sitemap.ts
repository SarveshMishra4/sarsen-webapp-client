import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.sarsenpartners.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [

    // ── Core pages ────────────────────────────────────────────────────────
    {
      url: `${BASE_URL}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/career`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },

    // ── Services ──────────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    // ── Resources hub ─────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/resources`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/resources/case-studies`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/resources/cohorts`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/resources/events`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/resources/reports`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/resources/tools`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },

    // ── Excluded (do not add these) ───────────────────────────────────────
    // /admin
    // /user/dashboard
    // /payment
    // /legal-and-regulatory
  ];
}
