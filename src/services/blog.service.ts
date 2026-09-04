import { apiRequest, ApiError } from './api';

// ─── Payload shapes (what we SEND to the backend) ──────────────────────────

export interface BlogImagePayload {
  url: string;
  altText?: string;
  order: number;
}

export interface BlogReportPayload {
  mockupImageUrl: string;
  name: string;
  description: string;
  authors: string[];
  releaseDate: string;
}

export interface BlogPayload {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  tag: string;
  keywords?: string[];
  coverImageUrl: string;
  authorName: string;
  authorTitle?: string;
  authorImageUrl?: string;
  readTimeMinutes?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoOgImage?: string;
  canonicalUrl?: string;
  images?: BlogImagePayload[];
  report?: BlogReportPayload;
  authorBio?: string;
  relatedPosts?: string[]; // up to 5 Blog _id values, admin-curated
}

// ─── Response shapes (what we RECEIVE from the backend, public reads) ──────

export interface PublicBlogRelatedPost {
  title: string;
  slug: string;
  coverImageUrl: string;
  tag: string;
  readTimeMinutes: number;
}

// Matches IBlog on the backend, as returned by getPublishedBySlug —
// SEO fields are typed as required (not optional) because withSeoDefaults
// on the backend guarantees they're always filled in for a published post.
export interface PublicBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tag: string;
  keywords: string[];
  coverImageUrl: string;
  authorName: string;
  authorTitle?: string;
  authorImageUrl?: string;
  authorBio?: string;
  status: 'draft' | 'published';
  publishedAt: string;
  readTimeMinutes: number;
  seoTitle: string;
  seoDescription: string;
  seoOgImage: string;
  canonicalUrl: string; // may be relative (e.g. "/blog/my-post") — layout.tsx's
                         // metadataBase resolves this to a full URL automatically
  relatedPosts: PublicBlogRelatedPost[];
}

// ─── Admin ──────────────────────────────────────────────────────────────

export const getAllBlogsAdmin = (token: string) =>
  apiRequest<{ blogs: any[]; total: number }>('GET', '/blogs/admin', { token });

export const createBlog = (data: BlogPayload, token: string) =>
  apiRequest<{ blog: any }>('POST', '/blogs/admin', { body: data, token });

export const updateBlog = (id: string, data: Partial<BlogPayload>, token: string) =>
  apiRequest<{ blog: any }>('PATCH', `/blogs/admin/${id}`, { body: data, token });

export const publishBlog = (id: string, token: string) =>
  apiRequest<{ blog: any }>('POST', `/blogs/admin/${id}/publish`, { token });

export const unpublishBlog = (id: string, token: string) =>
  apiRequest<{ blog: any }>('POST', `/blogs/admin/${id}/unpublish`, { token });

export const deleteBlog = (id: string, token: string) =>
  apiRequest<{}>('DELETE', `/blogs/admin/${id}`, { token });

/**
 * Powers the "Recommended Reading" search-and-pick widget in blogs-tab.tsx.
 * excludeId keeps a post from being able to recommend itself while editing.
 */
export const searchBlogsForRelated = (query: string, excludeId: string | undefined, token: string) => {
  const qs = new URLSearchParams({ q: query, ...(excludeId ? { excludeId } : {}) });
  return apiRequest<{ posts: any[] }>('GET', `/blogs/admin/search?${qs.toString()}`, { token });
};

/**
 * Image upload is multipart/form-data, which doesn't fit apiRequest's
 * JSON-body assumption used everywhere else in this file — so it goes
 * through fetch() directly.
 *
 * ⚠️ VERIFY BEFORE USE: this assumes an env var NEXT_PUBLIC_API_URL holds
 * your API base URL, and that the backend accepts the admin JWT as a
 * Bearer token in the Authorization header. Check services/api.ts (the
 * apiRequest implementation) and adjust both of those if it does it
 * differently — e.g. a different env var name, or a custom header.
 */
export const uploadBlogImage = async (
  file: File,
  folder: 'blog-covers' | 'blog-gallery' | 'blog-authors' | 'blog-reports',
  token: string
): Promise<{ url: string; publicId: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploads/image`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Image upload failed');
  }

  const json = await res.json();
  return json.data;
};

// ─── Public ─────────────────────────────────────────────────────────────

export const getPublishedBlogs = (params?: { tag?: string; page?: number; limit?: number }) => {
  const query = new URLSearchParams();
  if (params?.tag && params.tag !== 'All') query.set('tag', params.tag);
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  const qs = query.toString();

  return apiRequest<{ blogs: any[]; total: number; page: number; limit: number }>(
    'GET',
    `/blogs${qs ? `?${qs}` : ''}`,
    {}
  );
};

/**
 * Fetches a single PUBLISHED post by slug for the public-facing site.
 * Mirrors the backend exactly: getPublishedBySlug throws a 404 when the
 * post doesn't exist or isn't published, which apiRequest surfaces as an
 * ApiError with .status === 404 — caught here and turned into `null` so
 * page.tsx can call notFound() cleanly instead of letting the error throw.
 *
 * NOTE: this replaces the earlier version of this function, which returned
 * the raw { blog: any } wrapper and let a 404 throw uncaught. Nothing else
 * in the codebase calls getBlogBySlug yet, so this change is safe.
 */
export const getBlogBySlug = async (slug: string): Promise<PublicBlogPost | null> => {
  try {
    const { blog } = await apiRequest<{ blog: PublicBlogPost }>('GET', `/blogs/${slug}`, {});
    return blog;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return null;
    }
    throw err; // anything else (500, network failure) should surface as a real error
  }
};