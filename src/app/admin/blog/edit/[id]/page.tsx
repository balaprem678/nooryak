'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AppShell } from '@/components/admin/layout/AppShell';
import { toast } from 'sonner';
import '../../blog.scss';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id ?? '';

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Technology',
    excerpt: '',
    content: '',
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ── Load existing blog ── */
  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/blogs/${id}`)
      .then((res) => res.json())
      .then(({ blog }) => {
        if (!blog) { toast.error('Blog not found'); router.push('/admin/blog'); return; }
        setFormData({
          title: blog.title || '',
          slug: blog.slug || '',
          category: blog.category || 'Technology',
          excerpt: blog.excerpt || '',
          content: blog.content || '',
        });
        setTags(blog.tags || []);
        setImagePreview(blog.image || null);
      })
      .catch(() => toast.error('Failed to load blog post'))
      .finally(() => setFetching(false));
  }, [id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, featuredImage: 'Please upload PNG, JPG, or WebP' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, featuredImage: 'Image must be less than 5MB' }));
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    setErrors(prev => ({ ...prev, featuredImage: '' }));
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const val = tagInput.trim();
    if (!val || tags.includes(val)) return;
    setTags([...tags, val]);
    setTagInput('');
  };

  const removeTag = (i: number) => setTags(tags.filter((_, idx) => idx !== i));

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Post title is required';
    if (!formData.slug.trim())  newErrors.slug  = 'Slug is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!imagePreview) newErrors.featuredImage = 'Image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          content: formData.content,
          excerpt: formData.excerpt,
          category: formData.category,
          tags,
          image: imagePreview || '',
          author: 'Admin',
        }),
      });

      if (res.ok) {
        toast.success('Blog post updated!');
        router.push('/admin/blog');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to update blog post');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Icon = ({ name, className = '' }: { name: string; className?: string }) => (
    <i className={`fa-solid fa-${name} ${className}`} />
  );

  /* ── Fetching skeleton ── */
  if (fetching) {
    return (
      <AppShell title="Edit Blog Post" breadcrumb="Blog / Edit">
        <div className="add-blog-form text-white">
          <div className="form-card bg-[#111] border border-[#2a2a2a] p-6 rounded-xl space-y-5 animate-pulse">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-[#1a1a1a] rounded-md" />
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Edit Blog Post" breadcrumb="Blog / Edit">
      <div className="add-blog-form text-white">
        <div className="page-header mb-6">
          <h2 className="text-xl font-bold">Edit Blog Post</h2>
          <p className="text-[#888] text-sm">Update and republish your content</p>
        </div>

        <div className="form-card bg-[#111] border border-[#2a2a2a] p-6 rounded-xl">

          {/* Title */}
          <div className="form-group mb-5">
            <label className="form-label block text-sm text-[#888] mb-2">Post Title *</label>
            <input
              type="text"
              name="title"
              className={`form-input-plain w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-4 py-2 text-white focus:border-[#ff7a18] outline-none ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Enter post title…"
              value={formData.title}
              onChange={handleInputChange}
            />
            {errors.title && <span className="form-error text-red-500 text-xs mt-1">{errors.title}</span>}
          </div>

          {/* Slug */}
          <div className="form-group mb-5">
            <label className="form-label block text-sm text-[#888] mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              className={`form-input-plain w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-4 py-2 text-white focus:border-[#ff7a18] outline-none ${errors.slug ? 'border-red-500' : ''}`}
              placeholder="post-url-slug"
              value={formData.slug}
              onChange={handleInputChange}
            />
            {errors.slug && <span className="form-error text-red-500 text-xs mt-1">{errors.slug}</span>}
          </div>

          {/* Category */}
          <div className="form-grid grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="form-group">
              <label className="form-label block text-sm text-[#888] mb-2">Category</label>
              <select
                name="category"
                className="form-input-plain w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-4 py-2 text-white focus:border-[#ff7a18] outline-none"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option>Technology</option>
                <option>Design</option>
                <option>Business</option>
                <option>Marketing</option>
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div className="form-group mb-5">
            <label className="form-label block text-sm text-[#888] mb-2">Excerpt</label>
            <textarea
              name="excerpt"
              className="form-input-plain w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-4 py-2 text-white focus:border-[#ff7a18] outline-none"
              rows={3}
              placeholder="Short summary of the post…"
              value={formData.excerpt}
              onChange={handleInputChange}
            />
          </div>

          {/* Content */}
          <div className="form-group mb-5">
            <label className="form-label block text-sm text-[#888] mb-2">Content *</label>
            <textarea
              name="content"
              className={`form-input-plain w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-4 py-2 text-white focus:border-[#ff7a18] outline-none ${errors.content ? 'border-red-500' : ''}`}
              rows={8}
              placeholder="Write your post content here…"
              value={formData.content}
              onChange={handleInputChange}
            />
            {errors.content && <span className="form-error text-red-500 text-xs mt-1">{errors.content}</span>}
          </div>

          {/* Featured Image */}
          <div className="form-group mb-5">
            <label className="form-label block text-sm text-[#888] mb-2">Featured Image *</label>
            <div
              className={`img-upload border-2 border-dashed border-[#2a2a2a] p-8 text-center rounded-lg cursor-pointer hover:border-[#ff7a18] transition-colors ${imagePreview ? 'p-2' : ''}`}
              onClick={() => document.getElementById('imageInput')?.click()}
            >
              {imagePreview ? (
                <div className="image-preview relative group rounded-md overflow-hidden bg-[#222]">
                  <img src={imagePreview} alt="Preview" className="max-h-[300px] mx-auto object-cover" />
                  <button
                    type="button"
                    className="remove-image absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => { e.stopPropagation(); setImagePreview(null); }}
                  >
                    <Icon name="trash" />
                  </button>
                </div>
              ) : (
                <div className="text-[#888]">
                  <div className="text-3xl mb-2"><Icon name="cloud-arrow-up" /></div>
                  <p className="mb-2">Drag & drop or click to upload</p>
                  <span className="text-xs">PNG, JPG, WebP up to 5MB</span>
                </div>
              )}
              <input
                id="imageInput"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </div>
            {errors.featuredImage && <span className="form-error text-red-500 text-xs mt-1">{errors.featuredImage}</span>}
          </div>

          {/* Tags */}
          <div className="form-group mb-8">
            <label className="form-label block text-sm text-[#888] mb-2">Tags</label>
            <div className="tag-wrap flex flex-wrap gap-2 p-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md">
              {tags.map((tag, index) => (
                <span key={index} className="tag flex items-center gap-1 bg-[#222] px-2 py-1 rounded text-sm">
                  {tag}
                  <button type="button" onClick={() => removeTag(index)} className="text-[#888] hover:text-white">
                    <Icon name="xmark" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                className="tag-input flex-1 bg-transparent border-none outline-none text-white min-w-[100px]"
                placeholder="Add tag…"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="btn-row flex justify-end gap-3 pt-4 border-t border-[#2a2a2a]">
            <button
              type="button"
              className="px-4 py-2 bg-transparent border border-[#2a2a2a] hover:bg-[#222] rounded-md transition-colors"
              onClick={() => router.push('/admin/blog')}
              disabled={loading}
            >
              <Icon name="arrow-left" className="mr-2" /> Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] hover:opacity-90 rounded-md transition-opacity"
              onClick={handleUpdate}
              disabled={loading}
            >
              <Icon name="floppy-disk" className="mr-2" />
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
