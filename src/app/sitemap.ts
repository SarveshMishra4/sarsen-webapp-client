// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getPublishedBlogs } from '@/services/blog.service';

// Regenerate the sitemap at most every 10 minutes, so newly published
// posts show up without a redeploy.
export const revalidate = 600;

const BASE_URL = 'https://www.sarsenpartners.com';

// ── Blog entries (dynamic) ────────────────────────────────────────────────
async function getBlogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    // limit: 1000 — generous ceiling for "all published posts". Bump if
    // you ever exceed this many published posts.
    const res = await getPublishedBlogs({ limit: 1000 });

    return (res.blogs ?? []).map((post: any) => {
      const rawDate = post.updatedAt ?? post.publishedAt;
      const parsed = rawDate ? new Date(rawDate) : undefined;

      return {
        url: `${BASE_URL}/resources/blog/${post.slug}`,
        // Real last-modified date only. Omitted if the date is missing/invalid
        // rather than faking "now", so Google keeps trusting lastmod.
        lastModified: parsed && !isNaN(parsed.getTime()) ? parsed : undefined,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });
  } catch (err) {
    // If the backend is unreachable at sitemap-generation time, fail soft
    // (empty blog entries) rather than breaking the entire sitemap.
    console.error('[sitemap] Failed to load published blogs:', err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogEntries = await getBlogSitemapEntries();

  // The blog listing page really changes whenever a post changes, so give
  // it the newest post date (or omit it if there are no posts yet).
  const newestBlogDate = blogEntries
    .map(e => e.lastModified)
    .filter((d): d is Date => d instanceof Date)
    .sort((a, b) => b.getTime() - a.getTime())[0];

  // NOTE: static pages deliberately have no `lastModified`. Setting it to
  // "now" on every request tells Google everything changed every time,
  // and Google then learns to ignore lastmod across the whole site.
  return [
    // ── Core pages ────────────────────────────────────────────────────────
    { url: `${BASE_URL}`, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/work`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/career`, changeFrequency: 'monthly', priority: 0.5 },

    // ── Services ──────────────────────────────────────────────────────────
    { url: `${BASE_URL}/services`, changeFrequency: 'monthly', priority: 0.9 },

    // ── Resources hub ─────────────────────────────────────────────────────
    { url: `${BASE_URL}/resources`, changeFrequency: 'weekly', priority: 0.8 },
    {
      url: `${BASE_URL}/resources/blog`,
      lastModified: newestBlogDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    { url: `${BASE_URL}/resources/case-studies`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/resources/cohorts`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/resources/events`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/resources/reports`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/resources/tools`, changeFrequency: 'monthly', priority: 0.5 },

    // ── Blog posts (dynamic) ──────────────────────────────────────────────
    ...blogEntries,

    // ── Excluded (do not add these) ───────────────────────────────────────
    // /admin
    // /user/dashboard
    // /payment
    // /legal-and-regulatory
  ];
}