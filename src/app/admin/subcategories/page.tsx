'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/admin/layout/AppShell';
import { Card } from '@/components/admin/ui/card';
import { Input } from '@/components/admin/ui/input';
import { Button } from '@/components/admin/ui/button';
import { Badge } from '@/components/admin/ui/badge';
import { Search, Plus, Edit, Trash2, Layers } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface AdminSubcategory {
  _id: string;
  name: string;
  description: string;
  slug: string;
  service: {
    _id: string;
    name: string;
    slug: string;
  };
}

export default function SubcategoriesListPage() {
  const router = useRouter();
  const [subcategories, setSubcategories] = useState<AdminSubcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSubcategories = async () => {
    try {
      const res = await fetch('/api/admin/subcategories');
      const data = await res.json();
      const items = Array.isArray(data)
        ? data
        : Array.isArray(data?.subcategories)
        ? data.subcategories
        : [];
      setSubcategories(items);
    } catch {
      toast.error('Failed to load subcategories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subcategory?')) return;

    try {
      const res = await fetch(`/api/admin/subcategories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Subcategory deleted');
        fetchSubcategories();
      } else {
        toast.error('Failed to delete');
      }
    } catch {
      toast.error('Network error');
    }
  };

  const filteredSubcategories = subcategories.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppShell title="Subcategories Management" breadcrumb="Subcategories / List">
      <div className="flex items-center justify-between mb-6 text-white">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <Layers className="text-[#fff]" size={20} />
            Service Subcategories
          </h2>
          <p className="text-xs text-[#888] mt-1">View and manage all service subcategories currently active on your site.</p>
        </div>
        <Button
          onClick={() => router.push('/admin/subcategories/add')}
          className="bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] hover:opacity-90 h-10 text-white"
        >
          <Plus size={16} className="mr-2" />
          Add New Subcategory
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-10">
        <div className="relative flex-1 max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" size={14} />
          <Input
            placeholder="Search subcategories by name or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#111111] border-[#2a2a2a] pl-9 px-5 h-10 text-[13px] text-white focus:border-[#ff7a18]"
          />
        </div>
      </div>

      <Card className="bg-[#111111] border-[#2a2a2a] overflow-hidden text-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
                <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Subcategory Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Slug</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-[#888]">Loading subcategories...</td>
                </tr>
              ) : filteredSubcategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-[#888]">No subcategories found.</td>
                </tr>
              ) : (
                filteredSubcategories.map((subcategory) => (
                  <tr key={subcategory._id} className="hover:bg-[#1a1a1a] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-[13px]">{subcategory.name}</div>
                      <div className="text-[11px] text-[#888] truncate max-w-[300px]">{subcategory.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-[rgba(34,197,94,.12)] text-[#22c55e] border-none">
                        {subcategory.service.name}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#888] font-mono">{subcategory.slug}</td>
                    <td className="px-6 py-4">
                      <Badge className="bg-[rgba(34,197,94,.12)] text-[#22c55e] border-none">Active</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/admin/subcategories/edit/${subcategory._id}`)}
                          className="w-8 h-8 rounded-lg border border-[#2a2a2a] text-[#888] hover:border-[#ff7a18] hover:text-[#ff7a18] flex items-center justify-center transition-all bg-[#111111]"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(subcategory._id)}
                          className="w-8 h-8 rounded-lg border border-[#2a2a2a] text-[#888] hover:border-[#ff3d00] hover:text-[#ff3d00] flex items-center justify-center transition-all bg-[#111111]"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}