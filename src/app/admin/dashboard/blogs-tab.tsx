'use client';

// blogs-tab.tsx
// Wired to the real backend. Follows the same props/API-call pattern as
// coupons-tab.tsx.
//
// UPDATED: adds an Author Bio field (2-3 sentence bio shown at the bottom
// of the public post) and a "Recommended Reading" search-and-pick widget
// (admin searches existing posts by title, selects up to 5 to recommend).

import React, { useState, useEffect, useRef } from 'react';
import type { ApiBlog } from './page';
import {
  createBlog, updateBlog, publishBlog, unpublishBlog, deleteBlog,
  searchBlogsForRelated, type BlogPayload,
} from '@/services/blog.service';
import { RichTextEditor } from '@/features/blog-admin/RichTextEditor';
import { ImageUploadField } from '@/features/blog-admin/ImageUploadField';

const BLOG_TAGS = [
  'Strategy', 'Revenue', 'Finance', 'Metrics', 'PMF', 'Operations',
  'Thinking', 'Fundraising', 'Customers', 'Advisory', 'Product',
] as const;

interface BlogsTabProps {
  blogs: ApiBlog[];
  setBlogs: React.Dispatch<React.SetStateAction<ApiBlog[]>>;
  token: string;
}

interface RelatedPostOption {
  _id: string;
  title: string;
  slug: string;
}

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tag: string;
  keywords: string; // comma-separated in the UI, split on save
  coverImageUrl: string;
  authorName: string;
  authorTitle: string;
  authorImageUrl: string;
  authorBio: string;
  images: { url: string; altText?: string; order: number }[];
  seoTitle: string;
  seoDescription: string;
  seoOgImage: string;
  canonicalUrl: string;
  hasReport: boolean;
  reportMockupImageUrl: string;
  reportName: string;
  reportDescription: string;
  reportAuthors: string; // comma-separated, 1-3 after split
  reportReleaseDate: string;
  relatedPosts: RelatedPostOption[]; // selected, up to 5
};

const EMPTY_FORM: FormState = {
  title: '', slug: '', excerpt: '', content: '', tag: BLOG_TAGS[0], keywords: '',
  coverImageUrl: '', authorName: '', authorTitle: '', authorImageUrl: '', authorBio: '', images: [],
  seoTitle: '', seoDescription: '', seoOgImage: '', canonicalUrl: '',
  hasReport: false, reportMockupImageUrl: '', reportName: '', reportDescription: '',
  reportAuthors: '', reportReleaseDate: '', relatedPosts: [],
};

function blogToForm(post: ApiBlog): FormState {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    tag: post.tag,
    keywords: (post.keywords || []).join(', '),
    coverImageUrl: post.coverImageUrl,
    authorName: post.authorName,
    authorTitle: post.authorTitle || '',
    authorImageUrl: post.authorImageUrl || '',
    authorBio: (post as any).authorBio || '',
    images: post.images || [],
    seoTitle: post.seoTitle || '',
    seoDescription: post.seoDescription || '',
    seoOgImage: post.seoOgImage || '',
    canonicalUrl: post.canonicalUrl || '',
    hasReport: !!post.report,
    reportMockupImageUrl: post.report?.mockupImageUrl || '',
    reportName: post.report?.name || '',
    reportDescription: post.report?.description || '',
    reportAuthors: (post.report?.authors || []).join(', '),
    reportReleaseDate: post.report?.releaseDate ? post.report.releaseDate.slice(0, 10) : '',
    // Existing related posts come back from the API already populated
    // with title/slug (see backend getAdminList / getAdminById), so this
    // works directly for editing a post that already has recommendations.
    relatedPosts: ((post as any).relatedPosts || []).map((rp: any) =>
      typeof rp === 'string' ? { _id: rp, title: rp, slug: '' } : { _id: rp._id, title: rp.title, slug: rp.slug }
    ),
  };
}

function formToPayload(form: FormState): BlogPayload {
  return {
    title: form.title,
    slug: form.slug || undefined,
    excerpt: form.excerpt,
    content: form.content,
    tag: form.tag,
    keywords: form.keywords.split(',').map(k => k.trim()).filter(Boolean),
    coverImageUrl: form.coverImageUrl,
    authorName: form.authorName,
    authorTitle: form.authorTitle || undefined,
    authorImageUrl: form.authorImageUrl || undefined,
    authorBio: form.authorBio || undefined,
    images: form.images,
    seoTitle: form.seoTitle || undefined,
    seoDescription: form.seoDescription || undefined,
    seoOgImage: form.seoOgImage || undefined,
    canonicalUrl: form.canonicalUrl || undefined,
    relatedPosts: form.relatedPosts.map(rp => rp._id),
    report: form.hasReport
      ? {
          mockupImageUrl: form.reportMockupImageUrl,
          name: form.reportName,
          description: form.reportDescription,
          authors: form.reportAuthors.split(',').map(a => a.trim()).filter(Boolean),
          releaseDate: form.reportReleaseDate,
        }
      : undefined,
  };
}

export function BlogsTab({ blogs, setBlogs, token }: BlogsTabProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<ApiBlog | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showSeo, setShowSeo] = useState(false);

  // ── Related posts search state ──────────────────────────────────────
  const [relatedQuery, setRelatedQuery] = useState('');
  const [relatedResults, setRelatedResults] = useState<RelatedPostOption[]>([]);
  const [relatedSearching, setRelatedSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!relatedQuery.trim()) {
      setRelatedResults([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setRelatedSearching(true);
      try {
        const result = await searchBlogsForRelated(relatedQuery, editingPost?._id, token);
        setRelatedResults(result.posts || []);
      } catch {
        setRelatedResults([]);
      } finally {
        setRelatedSearching(false);
      }
    }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [relatedQuery, editingPost, token]);

  const addRelatedPost = (post: RelatedPostOption) => {
    if (form.relatedPosts.length >= 5) return;
    if (form.relatedPosts.some(rp => rp._id === post._id)) return;
    setForm({ ...form, relatedPosts: [...form.relatedPosts, post] });
    setRelatedQuery('');
    setRelatedResults([]);
  };

  const removeRelatedPost = (id: string) => {
    setForm({ ...form, relatedPosts: form.relatedPosts.filter(rp => rp._id !== id) });
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingPost(null);
    setForm(EMPTY_FORM);
    setError('');
  };

  const handleEdit = (post: ApiBlog) => {
    setIsCreating(true);
    setEditingPost(post);
    setForm(blogToForm(post));
    setError('');
  };

  const validate = (): string | null => {
    if (!form.title.trim()) return 'Title is required.';
    if (!form.excerpt.trim()) return 'Excerpt is required.';
    if (!form.content.trim()) return 'Content is required.';
    if (!form.coverImageUrl) return 'Cover image is required.';
    if (!form.authorName.trim()) return 'Author name is required.';
    if (form.hasReport) {
      if (!form.reportMockupImageUrl) return 'Report mockup image is required.';
      if (!form.reportName.trim()) return 'Report name is required.';
      if (!form.reportDescription.trim()) return 'Report description is required.';
      const authorCount = form.reportAuthors.split(',').map(a => a.trim()).filter(Boolean).length;
      if (authorCount < 1 || authorCount > 3) return 'Report must have between 1 and 3 authors.';
      if (!form.reportReleaseDate) return 'Report release date is required.';
    }
    return null;
  };

  const handleSave = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError('');
    try {
      const payload = formToPayload(form);
      if (editingPost) {
        const result = await updateBlog(editingPost._id, payload, token);
        setBlogs(prev => prev.map(p => (p._id === editingPost._id ? result.blog : p)));
      } else {
        const result = await createBlog(payload, token);
        setBlogs(prev => [result.blog, ...prev]);
      }
      setIsCreating(false);
      setEditingPost(null);
    } catch (err: any) {
      setError(err.message || 'Failed to save blog post.');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async (id: string) => {
    try {
      const result = await publishBlog(id, token);
      setBlogs(prev => prev.map(p => (p._id === id ? result.blog : p)));
    } catch (err: any) {
      setError(err.message || 'Failed to publish.');
    }
  };

  const handleUnpublish = async (id: string) => {
    try {
      const result = await unpublishBlog(id, token);
      setBlogs(prev => prev.map(p => (p._id === id ? result.blog : p)));
    } catch (err: any) {
      setError(err.message || 'Failed to unpublish.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await deleteBlog(id, token);
      setBlogs(prev => prev.filter(p => p._id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete.');
    }
  };

  const filteredBlogs = blogs.filter(p => (filterStatus === 'all' ? true : p.status === filterStatus));

  if (isCreating) {
    return (
      <div className="bg-white rounded-md p-8 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-medium text-gray-800">
            {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h3>
          <button onClick={() => setIsCreating(false)} className="text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3 mb-6">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {editingPost?.status === 'published' && (
          <div className="bg-blue-50 border border-blue-200 rounded-md px-4 py-3 mb-6">
            <p className="text-sm text-blue-700">
              This post is published — the URL slug is locked and cannot be changed.
            </p>
          </div>
        )}

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter post title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })}
                disabled={editingPost?.status === 'published'}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="Leave blank to auto-generate from title"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
            <textarea
              value={form.excerpt}
              onChange={e => setForm({ ...form, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the post"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content * <span className="text-xs font-normal text-gray-400">(Bold, headings H2–H4, links, tables, and images can be inserted between paragraphs)</span>
            </label>
            <RichTextEditor value={form.content} onChange={html => setForm({ ...form, content: html })} token={token} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tag *</label>
              <select
                value={form.tag}
                onChange={e => setForm({ ...form, tag: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {BLOG_TAGS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Keywords (comma-separated)</label>
              <input
                type="text"
                value={form.keywords}
                onChange={e => setForm({ ...form, keywords: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. seed funding, valuation, term sheet"
              />
              <p className="text-xs text-gray-400 mt-1">Shown as visible chips on the published post.</p>
            </div>
          </div>

          <ImageUploadField
            mode="single"
            label="Cover Image *"
            folder="blog-covers"
            token={token}
            value={form.coverImageUrl}
            onChange={url => setForm({ ...form, coverImageUrl: url })}
          />

          <ImageUploadField
            mode="multi"
            label="Gallery Images"
            folder="blog-gallery"
            token={token}
            value={form.images}
            onChange={images => setForm({ ...form, images })}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author Name *</label>
              <input
                type="text"
                value={form.authorName}
                onChange={e => setForm({ ...form, authorName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Dr. Ananya Sharma"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author Title</label>
              <input
                type="text"
                value={form.authorTitle}
                onChange={e => setForm({ ...form, authorTitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Partner, Strategy Practice"
              />
            </div>
          </div>

          <ImageUploadField
            mode="single"
            label="Author Image"
            folder="blog-authors"
            token={token}
            value={form.authorImageUrl}
            onChange={url => setForm({ ...form, authorImageUrl: url })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author Bio <span className="text-xs font-normal text-gray-400">(2–3 sentences, shown at the bottom of the post)</span>
            </label>
            <textarea
              value={form.authorBio}
              onChange={e => setForm({ ...form, authorBio: e.target.value.slice(0, 300) })}
              rows={2}
              maxLength={300}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="A short bio shown under the post..."
            />
            <p className="text-xs text-gray-400 mt-1">{form.authorBio.length}/300</p>
          </div>

          {/* SEO section */}
          <div className="border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => setShowSeo(v => !v)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              {showSeo ? 'Hide' : 'Show'} Advanced SEO Overrides
              <svg
                className={`w-4 h-4 transition-transform ${showSeo ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showSeo && (
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
                  <input
                    type="text"
                    value={form.seoTitle}
                    onChange={e => setForm({ ...form, seoTitle: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={form.title || 'Defaults to Title'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label>
                  <input
                    type="text"
                    value={form.seoDescription}
                    onChange={e => setForm({ ...form, seoDescription: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={form.excerpt || 'Defaults to Excerpt'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
                  <input
                    type="text"
                    value={form.seoOgImage}
                    onChange={e => setForm({ ...form, seoOgImage: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Defaults to Cover Image"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
                  <input
                    type="text"
                    value={form.canonicalUrl}
                    onChange={e => setForm({ ...form, canonicalUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Defaults to /blog/${form.slug || '...'}`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Report section */}
          <div className="border-t border-gray-200 pt-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.hasReport}
                onChange={e => setForm({ ...form, hasReport: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm font-medium text-gray-700">This post has an associated report</span>
            </label>

            {form.hasReport && (
              <div className="mt-4 space-y-6 bg-gray-50 rounded-md p-6 border border-gray-200">
                <ImageUploadField
                  mode="single"
                  label="Report Mockup Image *"
                  folder="blog-reports"
                  token={token}
                  value={form.reportMockupImageUrl}
                  onChange={url => setForm({ ...form, reportMockupImageUrl: url })}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Name *</label>
                  <input
                    type="text"
                    value={form.reportName}
                    onChange={e => setForm({ ...form, reportName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Description *</label>
                  <textarea
                    value={form.reportDescription}
                    onChange={e => setForm({ ...form, reportDescription: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Authors (1–3, comma-separated) *
                    </label>
                    <input
                      type="text"
                      value={form.reportAuthors}
                      onChange={e => setForm({ ...form, reportAuthors: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Rahul Mehta, Priya Krishnan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Release Date *</label>
                    <input
                      type="date"
                      value={form.reportReleaseDate}
                      onChange={e => setForm({ ...form, reportReleaseDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recommended Reading section */}
          <div className="border-t border-gray-200 pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recommended Reading <span className="text-xs font-normal text-gray-400">(search and pick up to 5 already-published posts)</span>
            </label>

            {form.relatedPosts.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {form.relatedPosts.map(rp => (
                  <span
                    key={rp._id}
                    className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full"
                  >
                    {rp.title}
                    <button
                      type="button"
                      onClick={() => removeRelatedPost(rp._id)}
                      className="text-blue-400 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {form.relatedPosts.length < 5 ? (
              <div className="relative">
                <input
                  type="text"
                  value={relatedQuery}
                  onChange={e => setRelatedQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search posts by title..."
                />
                {relatedQuery.trim() && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto">
                    {relatedSearching ? (
                      <p className="px-4 py-3 text-sm text-gray-400">Searching…</p>
                    ) : relatedResults.length === 0 ? (
                      <p className="px-4 py-3 text-sm text-gray-400">No matching posts found.</p>
                    ) : (
                      relatedResults
                        .filter(r => !form.relatedPosts.some(rp => rp._id === r._id))
                        .map(r => (
                          <button
                            key={r._id}
                            type="button"
                            onClick={() => addRelatedPost(r)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50"
                          >
                            {r.title}
                          </button>
                        ))
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-gray-400">Maximum of 5 reached — remove one above to add another.</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving…' : editingPost ? 'Update Post' : 'Save Draft'}
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filterStatus === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All ({blogs.length})
          </button>
          <button
            onClick={() => setFilterStatus('published')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filterStatus === 'published' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Published ({blogs.filter(p => p.status === 'published').length})
          </button>
          <button
            onClick={() => setFilterStatus('draft')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filterStatus === 'draft' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Drafts ({blogs.filter(p => p.status === 'draft').length})
          </button>
        </div>
        <button
          onClick={handleCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center gap-2 self-start"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Post
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-md border border-gray-200 p-12 text-center">
          <p className="text-gray-400">No blog posts yet. Click &quot;Create New Post&quot; to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBlogs.map(post => (
            <div key={post._id} className="bg-white rounded-md p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-medium text-gray-800">{post.title}</h3>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {post.status}
                    </span>
                    {post.report && (
                      <span className="text-xs px-3 py-1 rounded-full font-medium bg-purple-100 text-purple-700">
                        Has Report
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span>By {post.authorName}</span>
                    <span>•</span>
                    <span>{post.tag}</span>
                    <span>•</span>
                    <span>{post.readTimeMinutes} min read</span>
                    {post.publishedAt && (
                      <>
                        <span>•</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 self-end sm:self-start">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  {post.status === 'published' ? (
                    <button
                      onClick={() => handleUnpublish(post._id)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors"
                      title="Move to draft"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePublish(post._id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                      title="Publish"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
