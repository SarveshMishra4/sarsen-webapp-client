// resources/blogs/[slug]/page.tsx
//
// Server component. Fetches the real published post by slug, generates
// per-post SEO metadata, and revalidates periodically (ISR) so newly
// published or edited posts show up without a full redeploy.

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBlogBySlug } from '@/services/blog.service';
import BlogDetail from './blog';

// Re-check this post's data every 5 minutes. Tune as needed — lower for
// faster propagation of edits, higher to reduce backend load.
export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function fetchPost(slug: string) {
  try {
    const res = await getBlogBySlug(slug);
    return res.blog;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return {};

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: {
      canonical: post.canonicalUrl,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      images: post.seoOgImage ? [{ url: post.seoOgImage }] : undefined,
      type: 'article',
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.seoDescription,
      images: post.seoOgImage ? [post.seoOgImage] : undefined,
    },
  };
}

export default async function BlogSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogDetail post={post} />;
}
