'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AppShell } from '@/components/admin/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/admin/ui/card';
import { Input } from '@/components/admin/ui/input';
import { Label } from '@/components/admin/ui/label';
import { Textarea } from '@/components/admin/ui/textarea';
import { Button } from '@/components/admin/ui/button';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface ServiceData {
  _id: string;
  name: string;
  slug: string;
  description: string;
  content: string;
  icon: string;
}

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    content: '',
    icon: 'flaticon-settings'
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/admin/services/${serviceId}`);
        if (res.ok) {
          const data = await res.json();
          const service = data.service;
          setFormData({
            name: service.name || '',
            slug: service.slug || '',
            description: service.description || '',
            content: service.content || '',
            icon: service.icon || 'flaticon-settings'
          });
        } else {
          toast.error('Failed to load service');
          router.push('/admin/services');
        }
      } catch {
        toast.error('Network error');
        router.push('/admin/services');
      } finally {
        setFetchLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId, router]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    setFormData({ ...formData, name, slug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/services/${serviceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Service updated successfully!');
        router.push('/admin/services');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to update service');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <AppShell title="Edit Service" breadcrumb="Services / Edit">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-[#888]">Loading service...</div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Edit Service" breadcrumb="Services / Edit">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <Sparkles className="text-[#ff7a18]" size={20} />
              Edit Service
            </h2>
            <p className="text-xs text-[#888] mt-1">Update your service offering details.</p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-[#2a2a2a] hover:bg-[#1a1a1a]"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="bg-[#111111] border-[#2a2a2a]">
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[#888]">Service Name</Label>
                  <Input
                    placeholder="e.g. Web Development"
                    value={formData.name}
                    onChange={handleNameChange}
                    className="bg-[#1a1a1a] border-[#2a2a2a] text-white focus:border-[#ff7a18]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#888]">URL Slug</Label>
                  <Input
                    placeholder="web-development"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="bg-[#1a1a1a] border-[#2a2a2a] text-white focus:border-[#ff7a18]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#888]">Short Description</Label>
                <Textarea
                  placeholder="Brief description of the service..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white focus:border-[#ff7a18] min-h-[80px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#888]">Detailed Content</Label>
                <Textarea
                  placeholder="Full service description with HTML content..."
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white focus:border-[#ff7a18] min-h-[200px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#888]">Icon Class (Optional)</Label>
                <Input
                  placeholder="flaticon-settings"
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white focus:border-[#ff7a18]"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-[#2a2a2a] hover:bg-[#1a1a1a]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] hover:opacity-90 text-white"
            >
              <Save size={16} className="mr-2" />
              {loading ? 'Updating...' : 'Update Service'}
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}