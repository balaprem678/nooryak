'use client';

import { useEffect, useState, FormEvent } from 'react';
import { AppShell } from '@/components/admin/layout/AppShell';
import { Card } from '@/components/admin/ui/card';
import { Input } from '@/components/admin/ui/input';
import { Button } from '@/components/admin/ui/button';
import { Badge } from '@/components/admin/ui/badge';
import { Search, Plus, Edit, Trash2, Newspaper, Tag, User, FileText, Star, X } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import "./blog.scss";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  tags: string[];
  status?: string;
  isFeatured?: boolean;
  date: string;
  createdAt: string;
}

export default function BlogListPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    excerpt: '',
    status: 'Draft',
    isFeatured: false,
    image: ''
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blogs');
      const data = await res.json();
      // API returns { blogs: [...] }
      setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
    } catch {
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')      // Remove all non-word chars (except spaces and hyphens)
      .replace(/[\s_-]+/g, '-')       // Replace spaces and underscores with a single hyphen
      .replace(/^-+|-+$/g, '');      // Remove leading/trailing hyphens
  };

  const handleTitleChange = (val: string) => {
    const slug = generateSlug(val);
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: slug
    }));
  };

  const handleEdit = (blog: Blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      category: blog.category || '',
      excerpt: blog.excerpt || '',
      status: blog.status || 'Draft',
      isFeatured: blog.isFeatured || false,
      image: blog.image || ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/admin/blogs/${editingId}` : '/api/admin/blogs';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success(editingId ? 'Post updated' : 'Post created');
        setShowModal(false);
        fetchBlogs();
      }
    } catch { toast.error('Something went wrong'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Post deleted');
        setBlogs(prev => prev.filter(b => b._id !== id));
      } else {
        toast.error('Failed to delete');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredBlogs = blogs.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const readTime = (content: string) => {
    const words = content?.trim().split(/\s+/).length || 0;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  return (
    <AppShell title="Blog Management" breadcrumb="Blog / List">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 text-white">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <Newspaper className="text-[#ff7a18]" size={20} />
            Blog Posts
          </h2>
          <p className="text-xs text-[#888] mt-1">Manage your site articles and news.</p>
        </div>
        <div className='flex items-center gap-4'>
          {/* Search */}
          <div className="flex items-center gap-3">
            {searchQuery && (
              <span className="text-xs text-[#888]">
                {filteredBlogs.length} result{filteredBlogs.length !== 1 ? 's' : ''}
              </span>
            )}
            <div className="relative flex-1 max-w-[400px]">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888]" size={14} />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#111111] border-[#2a2a2a] pl-9 pr-9 h-10 text-[13px] text-white"

              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-[#888] hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* <Button
            variant="outline"
            onClick={() => router.push('/blog')}
            className="border-[#2a2a2a] text-white hover:bg-[#1a1a1a] h-10"
          >
            <Newspaper size={16} className="mr-2" />
            View Blog
          </Button> */}

          <Button
            onClick={() => router.push('/admin/blog/add')}
            className="bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] hover:opacity-90 h-10 text-white"
          >
            <Plus size={16} className="mr-2" />
            Create New Post
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: FileText, label: 'Total Posts', value: blogs.length, color: '#ff7a18' },
          { icon: Star, label: 'Featured', value: blogs.filter(b => b.isFeatured).length, color: '#f59e0b' },
          { icon: Tag, label: 'Categories', value: new Set(blogs.map(b => b.category)).size, color: '#3b82f6' },
          { icon: User, label: 'Authors', value: new Set(blogs.map(b => b.author)).size, color: '#10b981' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-[#111] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: color + '22' }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{value}</p>
              <p className="text-[11px] text-[#888]">{label}</p>
            </div>
          </div>
        ))}
      </div>


      {/* Table */}
      <Card className="bg-[#111111] border-[#2a2a2a] overflow-hidden text-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
                <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Post</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Status</th>
                {/* <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Read Time</th> */}
                <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {loading ? (
                /* Skeleton rows */
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-[#1f1f1f] rounded animate-pulse w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-[#555]">
                      <Newspaper size={40} strokeWidth={1} />
                      <p className="text-sm">
                        {searchQuery ? 'No posts match your search.' : 'No blog posts yet.'}
                      </p>
                      {!searchQuery && (
                        <Button
                          onClick={() => router.push('/admin/blog/add')}
                          className="mt-2 bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] text-white text-xs h-8 px-4"
                        >
                          <Plus size={13} className="mr-1" /> Create your first post
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-[#161616] transition-colors group">

                    {/* Post Details */}
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#222] border border-[#2a2a2a] overflow-hidden flex-shrink-0">
                          {blog.image
                            ? <img src={blog.image} alt="" className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center text-[#555]"><Newspaper size={18} /></div>
                          }
                        </div>
                        <div>
                          <div className="font-semibold text-[13px] text-white leading-tight max-w-[150px] truncate">
                            {blog.isFeatured && (
                              <Badge className="bg-[#ff7a1822] text-[#ff7a18] border-[#ff7a1844] text-[9px] h-4 px-1.5 uppercase font-bold">
                                Featured
                              </Badge>
                            )}
                            <h6 className='text-white mt-2'>  {blog.title}</h6>

                          </div>
                          {/* <div className="text-[11px] text-[#555] mt-0.5 font-mono max-w-[220px] truncate">/{blog.slug}</div> */}
                          {blog.excerpt && (
                            <div className="text-[11px] text-[#666] mt-0.5 max-w-[150px] truncate">{blog.excerpt}</div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-2">
                      <Badge variant="outline" className="border-[#2a2a2a] text-[#ccc] text-[11px]">
                        {blog.category || '—'}
                      </Badge>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-2">
                      {blog.status === 'Published' ? (
                        <Badge className="bg-[#10b98122] text-[#10b981] border-[#10b98144] hover:bg-[#10b98133] text-[10px] font-medium transition-all">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] mr-1.5 animate-pulse"></span>
                          Published
                        </Badge>
                      ) : (
                        <Badge className="bg-[#f59e0b22] text-[#f59e0b] border-[#f59e0b44] hover:bg-[#f59e0b33] text-[10px] font-medium transition-all">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mr-1.5"></span>
                          {blog.status || 'Not Published'}
                        </Badge>
                      )}
                    </td>

                    {/* Read Time */}
                    {/* <td className="px-6 py-4 text-[12px] text-[#888]">
                      {readTime(blog.content)}
                    </td> */}

                    {/* Date */}
                    <td className="px-4 py-2 text-[12px] text-[#888] font-mono whitespace-nowrap">
                      {formatDate(blog.createdAt || blog.date)}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/admin/blog/edit/${blog._id}`)}
                          title="Edit post"
                          className="flex items-center gap-1.5 px-3 h-8 rounded-lg border border-[#ff7a18] text-[#ff7a18] hover:bg-[#ff7a18] hover:text-black text-xs font-medium transition-all bg-[#111111]"
                        >
                          <Edit size={13} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          disabled={deletingId === blog._id}
                          title="Delete post"
                          className="flex items-center gap-1.5 px-3 h-8 rounded-lg border border-[#ff3d00] text-[#ff3d00] hover:bg-[#ff3d00] hover:text-white text-xs font-medium transition-all bg-[#111111] disabled:opacity-40"
                        >
                          <Trash2 size={13} /> {deletingId === blog._id ? '…' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        {!loading && filteredBlogs.length > 0 && (
          <div className="px-6 py-3 border-t border-[#2a2a2a] text-[11px] text-[#555]">
            Showing {filteredBlogs.length} of {blogs.length} post{blogs.length !== 1 ? 's' : ''}
          </div>
        )}
      </Card>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content add-blog-form">
            <div className="modal-header">
              <h3>{editingId ? 'Edit Post' : 'Create New Post'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <Input
                  placeholder="Post title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  className="form-input-plain"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Slug (Auto-generated)</label>
                <Input
                  placeholder="slug-will-appear-here"
                  value={formData.slug}
                  readOnly
                  tabIndex={-1}
                  className="form-input-plain bg-[#0a0a0a] text-[#888] cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <Input
                    placeholder="e.g. Technology"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-input-plain"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="form-input-plain"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>

              <div className="form-group flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="accent-[#ff7a18]"
                />
                <label htmlFor="featured" className="text-sm text-[#ccc] cursor-pointer">Mark as Featured</label>
              </div>

              <div className="modal-actions mt-6">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="cancel border-[#2a2a2a] text-white hover:bg-[#1a1a1a]">
                  Cancel
                </Button>
                <Button type="submit" className="submit bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] text-white">
                  {editingId ? 'Save Changes' : 'Create Post'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AppShell>
  );
}
