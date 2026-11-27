// app/resources/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/services/blog.service';
import BlogPage from './blog';

const SITE_NAME = 'Sarsen Strategy Partners';
const SITE_URL = 'https://www.sarsenpartners.com';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Single source of truth for where a post lives.
// Must match the real route and the URL in sitemap.xml.
const postPath = (slug: string) => `/resources/blog/${slug}`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) return {};

  const path = postPath(post.slug);

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: {
      canonical: path, // metadataBase turns this into the full URL
    },
    openGraph: {
      type: 'article',
      title: post.seoTitle,
      description: post.seoDescription,
      url: path,
      siteName: SITE_NAME,
      publishedTime: post.publishedAt,
      authors: [post.authorName],
      images: [{ url: post.seoOgImage, width: 1200, height: 630, alt: post.seoTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.seoDescription,
      images: [post.seoOgImage],
    },
  };
}

export default async function BlogSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription,
    image: post.seoOgImage,
    datePublished: post.publishedAt,
    mainEntityOfPage: `${SITE_URL}${postPath(post.slug)}`,
    author: { '@type': 'Person', name: post.authorName },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPage post={post} />
    </>
  );
}