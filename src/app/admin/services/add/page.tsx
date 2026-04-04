'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/admin/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/admin/ui/card';
import { Input } from '@/components/admin/ui/input';
import { Label } from '@/components/admin/ui/label';
import { Textarea } from '@/components/admin/ui/textarea';
import { Button } from '@/components/admin/ui/button';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import { toast } from 'sonner';


export default function AddServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    content: '',
    icon: 'flaticon-settings'
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    setFormData({ ...formData, name, slug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Service created successfully!');
        router.push('/admin/services');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to save service');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title="Add Service" breadcrumb="Services / Add">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="text-[#ff7a18]" size={20} />
              Create New Service
            </h2>
            <p className="text-xs text-[#888] mt-1">Configure your new service offering.</p>
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
                  placeholder="Write detailed service content here…"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white focus:border-[#ff7a18] min-h-[300px]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] hover:opacity-90 text-white min-w-[140px]"
                >
                  <Save size={16} className="mr-2" />
                  {loading ? 'Processing...' : 'Save Service'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
      

    </AppShell>
  );
}
