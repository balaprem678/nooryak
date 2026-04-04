'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/admin/layout/AppShell';
import { StatCard } from '@/components/admin/dashboard/StatCard';
import { DollarSign, ShoppingBag, FolderKanban, Users, Newspaper, Layers } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/admin/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 32000 },
  { month: 'Feb', revenue: 41000 },
  { month: 'Mar', revenue: 28000 },
  { month: 'Apr', revenue: 52000 },
  { month: 'May', revenue: 47000 },
  { month: 'Jun', revenue: 61000 },
  { month: 'Jul', revenue: 55000 },
  { month: 'Aug', revenue: 72000 },
  { month: 'Sep', revenue: 68000 },
  { month: 'Oct', revenue: 80000 },
  { month: 'Nov', revenue: 74000 },
  { month: 'Dec', revenue: 84250 },
];

export default function DashboardPage() {
  const [counts, setCounts] = useState({ blogs: 0, services: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [blogsRes, servicesRes] = await Promise.all([
          fetch('/api/admin/blogs'),
          fetch('/api/admin/services')
        ]);
        
        const blogs = await blogsRes.json();
        const services = await servicesRes.json();
        
        setCounts({
          blogs: Array.isArray(blogs) ? blogs.length : 0,
          services: Array.isArray(services) ? services.length : 0
        });
      } catch (err) {
        console.error('Failed to fetch counts', err);
      }
    };
    fetchCounts();
  }, []);

  const stats = [
    { label: 'Total Blogs', value: counts.blogs.toString(), badge: '+12%', up: true, color: 'blue' as const, icon: Newspaper },
    { label: 'Services', value: counts.services.toString(), badge: '+2', up: true, color: 'green' as const, icon: Layers },
    { label: 'Project Leads', value: '47', badge: '-3%', up: false, color: 'yellow' as const, icon: FolderKanban },
    { label: 'Total Users', value: '1', badge: '+100%', up: true, color: 'purple' as const, icon: Users },
  ];

  return (
    <AppShell title="Dashboard" breadcrumb="Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <Card className="lg:col-span-2 bg-[#111111] border-[#2a2a2a]">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-white">Site Activity</CardTitle>
                <CardDescription>Monthly engagement for 2024</CardDescription>
              </div>
              <div className="flex gap-1.5">
                {['1M', '3M', '6M', '1Y'].map((period, i) => (
                  <button
                    key={period}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
                      i === 3
                        ? 'bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] text-white'
                        : 'border border-[#2a2a2a] text-[#888] hover:border-[#ff7a18] hover:text-[#ff7a18]'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff7a18" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#ff3d00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.04)" />
                <XAxis dataKey="month" stroke="#666" style={{ fontSize: 11 }} />
                <YAxis
                  stroke="#666"
                  style={{ fontSize: 11 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#ccc',
                  }}
                  itemStyle={{ color: '#ff7a18' }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ff7a18"
                  strokeWidth={2.5}
                  dot={{ fill: '#ff3d00', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Content Overview</CardTitle>
            <CardDescription>By category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: 'Services', value: counts.services, pct: 72, color: '#ff7a18' },
                { name: 'Blogs', value: counts.blogs, pct: 48, color: '#a855f7' },
                { name: 'Inquiries', value: 12, pct: 36, color: '#22c55e' },
                { name: 'Users', value: 1, pct: 15, color: '#f59e0b' },
              ].map((cat) => (
                <div key={cat.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-[13px] font-medium">{cat.name}</span>
                    <span className="text-[13px] text-[#888] font-mono">{cat.value}</span>
                  </div>
                  <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${cat.pct}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
