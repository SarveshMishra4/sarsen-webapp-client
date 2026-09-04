// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/services/blog.service';
import BlogPage from './blog';

const SITE_NAME = 'Sarsen Strategy Partners';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) return {};

  // No fallback chains needed here — withSeoDefaults on the backend
  // guarantees these fields are always populated for a published post.
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: {
      // post.canonicalUrl may be relative ("/blog/my-post") — layout.tsx's
      // metadataBase resolves it to a full URL automatically, no manual
      // BASE_URL concatenation needed.
      canonical: post.canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title: post.seoTitle,
      description: post.seoDescription,
      url: post.canonicalUrl,
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

  return <BlogPage post={post} />;
}

// No generateStaticParams — see prior explanation: a post published through
// the dashboard should work immediately without a rebuild, which requires
// this route to render on-demand rather than being pre-built at deploy time.