'use client';

import { useEffect, useState, useMemo } from 'react';
import { AppShell } from '@/components/admin/layout/AppShell';
import { StatCard } from '@/components/admin/dashboard/StatCard';
import { FolderKanban, Users, Newspaper, Layers } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/admin/ui/card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface AdminCounts {
  blogs: number;
  services: number;
  users: number;
  leads: number;
}

type TimePeriod = '1M' | '3M' | '6M' | '1Y';

interface ChartData {
  date: string;
  value: number;
  label: string;
}

export default function DashboardPage() {
  const [counts, setCounts] = useState<AdminCounts>({
    blogs: 0,
    services: 0,
    users: 0,
    leads: 0,
  });

  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('1Y');
  const [loading, setLoading] = useState(true);

  const [realChartData, setRealChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch('/api/admin/stats', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Unable to fetch dashboard stats');
        }

        const data = await res.json();

        setCounts({
          blogs: Number(data?.stats?.blogs ?? 0),
          services: Number(data?.stats?.services ?? 0),
          users: Number(data?.stats?.users ?? 0),
          leads: 0,
        });

        // Process real chart data from backend
        if (data.chartData && data.chartData.length > 0) {
          const processedData = data.chartData.map((item: any) => {
            const date = new Date(item.year, item.month - 1, 1);
            return {
              date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
              value: item.value,
              label: date.toLocaleDateString('en-US', { month: 'short' })
            };
          });
          setRealChartData(processedData);
        } else {
          // If no real data yet, provide a single zero point for today's month
          const now = new Date();
          setRealChartData([{
            date: now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            value: 0,
            label: now.toLocaleDateString('en-US', { month: 'short' })
          }]);
        }

        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch admin stats', err);
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  // Use real data in the chart
  const displayedChartData = useMemo(() => {
    if (realChartData.length === 0) return [];
    
    // Filter based on selectedPeriod
    let limit = 12;
    if (selectedPeriod === '1M') limit = 1;
    if (selectedPeriod === '3M') limit = 3;
    if (selectedPeriod === '6M') limit = 6;
    
    return realChartData.slice(-limit);
  }, [realChartData, selectedPeriod]);

  const handlePeriodChange = (period: TimePeriod) => {
    setSelectedPeriod(period);
  };

  const stats = [
    { label: 'Total Blogs', value: counts.blogs.toString(), badge: '+12%', up: true, color: 'blue' as const, icon: Newspaper },
    { label: 'Services', value: counts.services.toString(), badge: '+4%', up: true, color: 'green' as const, icon: Layers },
    { label: 'Project Leads', value: counts.leads.toString(), badge: '-3%', up: false, color: 'yellow' as const, icon: FolderKanban },
    { label: 'Total Users', value: counts.users.toString(), badge: '+100%', up: true, color: 'purple' as const, icon: Users },
  ];

  return (
    <AppShell title="Dashboard" breadcrumb="Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5  mt-4">
        <Card className="lg:col-span-2 bg-[#111111] border-[#2a2a2a]">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-white">Site Activity</CardTitle>
                <CardDescription>Dynamic engagement metrics</CardDescription>
              </div>
              <div className="flex gap-1.5">
                {(['1M', '3M', '6M', '1Y'] as TimePeriod[]).map((period) => (
                  <button
                    key={period}
                    onClick={() => handlePeriodChange(period)}
                    disabled={loading}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all duration-200 ${
                      selectedPeriod === period
                        ? 'bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] text-white shadow-lg'
                        : 'border border-[#2a2a2a] text-[#888] hover:border-[#ff7a18] hover:text-[#ff7a18] hover:bg-[#1a1a1a]'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-[240px]">
                <div className="text-[#888]">Loading chart data...</div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={displayedChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff7a18" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ff3d00" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="activityLineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ff7a18" />
                      <stop offset="100%" stopColor="#ff3d00" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,.04)"
                    strokeOpacity={0.3}
                  />
                  <XAxis
                    dataKey="label"
                    stroke="#666"
                    style={{ fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#666"
                    style={{ fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #2a2a2a',
                      borderRadius: '8px',
                      color: '#ccc',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    }}
                    itemStyle={{ color: '#ff7a18' }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Activity']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="url(#activityLineGradient)"
                    strokeWidth={3}
                    fill="url(#activityGradient)"
                    dot={{ fill: '#ff3d00', strokeWidth: 2, r: 4, stroke: '#fff' }}
                    activeDot={{ r: 6, stroke: '#ff7a18', strokeWidth: 2, fill: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Content Overview</CardTitle>
            <CardDescription>Real-time statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  name: 'Services',
                  value: counts.services,
                  pct: Math.min(100, Math.max(10, (counts.services / Math.max(1, counts.services + counts.blogs + counts.users)) * 100)),
                  color: '#ff7a18'
                },
                {
                  name: 'Blogs',
                  value: counts.blogs,
                  pct: Math.min(100, Math.max(10, (counts.blogs / Math.max(1, counts.services + counts.blogs + counts.users)) * 100)),
                  color: '#a855f7'
                },
                {
                  name: 'Inquiries',
                  value: counts.leads,
                  pct: Math.min(100, Math.max(5, (counts.leads / Math.max(1, counts.services + counts.blogs + counts.users + 10)) * 100)),
                  color: '#22c55e'
                },
                {
                  name: 'Users',
                  value: counts.users,
                  pct: Math.min(100, Math.max(5, (counts.users / Math.max(1, counts.services + counts.blogs + counts.users + 10)) * 100)),
                  color: '#f59e0b'
                },
              ].map((cat) => (
                <div key={cat.name} className="group">
                  <div className="flex justify-between mb-2">
                    <span className="text-[13px] font-medium text-white group-hover:text-[#ff7a18] transition-colors">
                      {cat.name}
                    </span>
                    <span className="text-[13px] text-[#888] font-mono">{cat.value}</span>
                  </div>
                  <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg"
                      style={{
                        width: `${cat.pct}%`,
                        backgroundColor: cat.color,
                        boxShadow: `0 0 10px ${cat.color}20`
                      }}
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
