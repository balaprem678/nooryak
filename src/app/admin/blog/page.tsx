'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/admin/layout/AppShell';
import { Card } from '@/components/admin/ui/card';
import { Input } from '@/components/admin/ui/input';
import { Button } from '@/components/admin/ui/button';
import { Badge } from '@/components/admin/ui/badge';
import { Search, Plus, Edit, Trash2, Newspaper, Tag, User, FileText } from 'lucide-react';
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
  date: string;
  createdAt: string;
}

export default function BlogListPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Newspaper className="text-[#ff7a18]" size={20} />
            Blog Posts
          </h2>
          <p className="text-xs text-[#888] mt-1">Manage your site's articles and news.</p>
        </div>
        <div className='flex gap-10'>
          {/* Search */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-1 max-w-[400px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" size={14} />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#111111] border-[#2a2a2a] pl-9 h-10 text-[13px] text-white focus:border-[#ff7a18]"
              />
            </div>
            {searchQuery && (
              <span className="text-xs text-[#888]">
                {filteredBlogs.length} result{filteredBlogs.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

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
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: FileText, label: 'Total Posts', value: blogs.length, color: '#ff7a18' },
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
                <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Tags</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Read Time</th>
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
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#222] border border-[#2a2a2a] overflow-hidden flex-shrink-0">
                          {blog.image
                            ? <img src={blog.image} alt="" className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center text-[#555]"><Newspaper size={18} /></div>
                          }
                        </div>
                        <div>
                          <div className="font-semibold text-[13px] text-white leading-tight max-w-[220px] truncate">{blog.title}</div>
                          <div className="text-[11px] text-[#555] mt-0.5 font-mono max-w-[220px] truncate">/{blog.slug}</div>
                          {blog.excerpt && (
                            <div className="text-[11px] text-[#666] mt-0.5 max-w-[220px] truncate">{blog.excerpt}</div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="border-[#2a2a2a] text-[#ccc] text-[11px]">
                        {blog.category || '—'}
                      </Badge>
                    </td>

                    {/* Tags */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[160px]">
                        {blog.tags?.length
                          ? blog.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#888]">
                              {tag}
                            </span>
                          ))
                          : <span className="text-[#555] text-[11px]">—</span>
                        }
                        {(blog.tags?.length || 0) > 3 && (
                          <span className="text-[10px] text-[#555]">+{blog.tags.length - 3}</span>
                        )}
                      </div>
                    </td>

                    {/* Read Time */}
                    <td className="px-6 py-4 text-[12px] text-[#888]">
                      {readTime(blog.content)}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-[12px] text-[#888] font-mono whitespace-nowrap">
                      {formatDate(blog.createdAt || blog.date)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
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
    </AppShell>
  );
}
