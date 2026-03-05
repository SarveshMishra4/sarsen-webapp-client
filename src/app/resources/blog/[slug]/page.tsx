// app/blog/[slug]/page.tsx

import { getBlogPostBySlug } from "./data";
import BlogPage from "./blog";
import { notFound } from "next/navigation";

/* ---------------------------------------------
   TYPES
---------------------------------------------- */

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* ---------------------------------------------
   PAGE
---------------------------------------------- */

export default async function BlogSlugPage({
  params,
}: PageProps) {
  // Unwrap params (required in modern Next.js)
  const { slug } = await params;

  // Fetch post (sync or async safe)
  const post = await getBlogPostBySlug(slug);

  // Validate existence (same behaviour as before)
  if (!post) {
    notFound();
  }

  return <BlogPage post={post} />;
}

/* ---------------------------------------------
   STATIC GENERATION
---------------------------------------------- */

export async function generateStaticParams() {
  // Preserve existing SSG behaviour
  const { getAllBlogPosts } = await import("./data");

  const posts = getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}