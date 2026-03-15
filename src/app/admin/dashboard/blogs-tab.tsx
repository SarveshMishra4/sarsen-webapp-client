'use client';

// blogs-tab.tsx
// This tab is static — blog management is not wired to the backend.
// The original UI is preserved exactly. Local state only.

import React, { useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  publishedAt?: string;
  status: 'draft' | 'published' | 'scheduled';
  views: number;
}

export function BlogsTab() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isCreating,    setIsCreating]    = useState(false);
  const [editingPost,   setEditingPost]   = useState<BlogPost | null>(null);
  const [formData,      setFormData]      = useState<Partial<BlogPost>>({
    title: '', slug: '', content: '', excerpt: '',
    author: 'Admin', category: '', tags: [], status: 'draft',
  });

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingPost(null);
    setFormData({ title: '', slug: '', content: '', excerpt: '', author: 'Admin', category: '', tags: [], status: 'draft' });
  };

  const handleEdit = (post: BlogPost) => {
    setIsCreating(true);
    setEditingPost(post);
    setFormData(post);
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      alert('Please fill in required fields');
      return;
    }
    if (editingPost) {
      setBlogPosts(prev => prev.map(p => p.id === editingPost.id ? { ...p, ...formData } as BlogPost : p));
    } else {
      const newPost: BlogPost = {
        id:       Date.now().toString(),
        title:    formData.title!,
        slug:     formData.slug || formData.title!.toLowerCase().replace(/\s+/g, '-'),
        content:  formData.content!,
        excerpt:  formData.excerpt || formData.content!.substring(0, 150) + '...',
        author:   formData.author!,
        category: formData.category!,
        tags:     formData.tags!,
        status:   formData.status!,
        views:    0,
      };
      setBlogPosts(prev => [...prev, newPost]);
    }
    setIsCreating(false);
    setEditingPost(null);
  };

  const handlePublish = (id: string) => {
    setBlogPosts(prev => prev.map(p =>
      p.id === id ? { ...p, status: 'published' as const, publishedAt: new Date().toISOString() } : p
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setBlogPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  if (isCreating) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-medium text-gray-800">{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
          <button onClick={() => setIsCreating(false)} className="text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter post title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
              <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="url-friendly-slug" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
            <textarea value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the post" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
            <textarea value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })}
              rows={15} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="Write your blog post content here... (Markdown supported)" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input type="text" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Strategy" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
              <input type="text" value={formData.tags?.join(', ')}
                onChange={e => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="startup, growth, funding" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as BlogPost['status'] })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button onClick={handleSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              {editingPost ? 'Update Post' : 'Save Post'}
            </button>
            <button onClick={() => setIsCreating(false)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors">
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
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">All ({blogPosts.length})</button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">
            Published ({blogPosts.filter(p => p.status === 'published').length})
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">
            Drafts ({blogPosts.filter(p => p.status === 'draft').length})
          </button>
        </div>
        <button onClick={handleCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 self-start">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Post
        </button>
      </div>

      {blogPosts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400">No blog posts yet. Click "Create New Post" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-medium text-gray-800">{post.title}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      post.status === 'published' ? 'bg-green-100 text-green-700' :
                      post.status === 'draft'     ? 'bg-gray-100 text-gray-700' :
                                                    'bg-blue-100 text-blue-700'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.views} views</span>
                    {post.publishedAt && (
                      <><span>•</span><span>{new Date(post.publishedAt).toLocaleDateString()}</span></>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 self-end sm:self-start">
                  <button onClick={() => handleEdit(post)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  {post.status !== 'published' && (
                    <button onClick={() => handlePublish(post.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  )}
                  <button onClick={() => handleDelete(post.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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