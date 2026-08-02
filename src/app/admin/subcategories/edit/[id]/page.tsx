'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AppShell } from '@/components/admin/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/admin/ui/card';
import { Input } from '@/components/admin/ui/input';
import { Label } from '@/components/admin/ui/label';
import { Textarea } from '@/components/admin/ui/textarea';
import { Button } from '@/components/admin/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/admin/ui/select';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Service {
  _id: string;
  name: string;
  slug: string;
}

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  content: string;
  service: string;
  icon: string;
  order: number;
}

export default function EditSubcategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    content: '',
    service: '',
    icon: 'flaticon-settings',
    order: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services
        const servicesRes = await fetch('/api/admin/services');
        const servicesData = await servicesRes.json();
        const servicesList = Array.isArray(servicesData)
          ? servicesData
          : Array.isArray(servicesData?.services)
          ? servicesData.services
          : [];
        setServices(servicesList);

        // Fetch subcategory
        const subcategoryRes = await fetch(`/api/admin/subcategories/${id}`);
        if (subcategoryRes.ok) {
          const subcategoryData = await subcategoryRes.json();
          const subcategory = subcategoryData.subcategory;
          setFormData({
            name: subcategory.name,
            slug: subcategory.slug,
            description: subcategory.description,
            content: subcategory.content,
            service: subcategory.service._id,
            icon: subcategory.icon,
            order: subcategory.order,
          });
        } else {
          toast.error('Failed to load subcategory');
          router.push('/admin/subcategories');
        }
      } catch {
        toast.error('Failed to load data');
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, router]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    setFormData({ ...formData, name, slug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/subcategories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Subcategory updated successfully!');
        router.push('/admin/subcategories');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to update subcategory');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <AppShell title="Edit Subcategory" breadcrumb="Subcategories / Edit">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-white">Loading...</div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Edit Subcategory" breadcrumb="Subcategories / Edit">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <Sparkles className="text-[#ff7a18]" size={20} />
              Edit Subcategory
            </h2>
            <p className="text-xs text-[#888] mt-1">Update your service subcategory details.</p>
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
                  <Label className="text-[#888]">Subcategory Name</Label>
                  <Input
                    placeholder="e.g. Frontend Development"
                    value={formData.name}
                    onChange={handleNameChange}
                    className="bg-[#1a1a1a] border-[#2a2a2a] text-white focus:border-[#ff7a18]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#888]">Parent Service</Label>
                  <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                    <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white focus:border-[#ff7a18]">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                      {services.map((service) => (
                        <SelectItem key={service._id} value={service._id} className="text-white hover:bg-[#2a2a2a]">
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[#888]">URL Slug</Label>
                  <Input
                    placeholder="frontend-development"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="bg-[#1a1a1a] border-[#2a2a2a] text-white focus:border-[#ff7a18]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#888]">Display Order</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                    className="bg-[#1a1a1a] border-[#2a2a2a] text-white focus:border-[#ff7a18]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#888]">Short Description</Label>
                <Textarea
                  placeholder="A brief summary for the list view..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white focus:border-[#ff7a18] min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#888]">Icon Class (Flaticon)</Label>
                <Input
                  placeholder="flaticon-settings"
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white focus:border-[#ff7a18]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#888]">Detailed Content</Label>
                <Textarea
                  placeholder="Write detailed subcategory content here…"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white focus:border-[#ff7a18] min-h-[300px]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  disabled={loading || !formData.service}
                  className="bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] hover:opacity-90 text-white min-w-[140px]"
                >
                  <Save size={16} className="mr-2" />
                  {loading ? 'Processing...' : 'Update Subcategory'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </AppShell>
  );
}