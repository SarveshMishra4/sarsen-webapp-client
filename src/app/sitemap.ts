import type { MetadataRoute } from 'next';
import { getPublishedBlogs } from '@/services/blog.service';

const BASE_URL = 'https://www.sarsenpartners.com';

// ── Blog entries (dynamic) ────────────────────────────────────────────────
async function getBlogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    // limit: 1000 — generous ceiling for "all published posts". Bump if
    // you ever exceed this many published posts.
    const res = await getPublishedBlogs({ limit: 1000 });
    return (res.blogs ?? []).map((post: any) => ({
      url: `${BASE_URL}/resources/blogs/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // If the backend is unreachable at sitemap-generation time, fail soft
    // (empty blog entries) rather than breaking the entire sitemap.
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const blogEntries = await getBlogSitemapEntries();

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

    // ── Blog posts (dynamic) ────────────────────────────────────────────────
    ...blogEntries,

    // ── Excluded (do not add these) ───────────────────────────────────────
    // /admin
    // /user/dashboard
    // /payment
    // /legal-and-regulatory
  ];
}