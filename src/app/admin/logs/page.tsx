'use client';
import { AppShell } from '@/components/admin/layout/AppShell';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ScrollText, User, Calendar, Info, Search } from 'lucide-react';
import { format } from 'date-fns';

interface ActivityLog {
    _id: string;
    userName: string;
    userEmail: string;
    action: string;
    targetType: string;
    details: string;
    createdAt: string;
}

export default function LogsPage() {
    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/logs');
            if (res.ok) {
                const data = await res.json();
                setLogs(data.logs);
            }
        } catch (err) {
            toast.error('Failed to load logs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const filteredLogs = logs.filter(log => 
        log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AppShell title="Activity Logs" breadcrumb="Logs">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                            <ScrollText className="text-[#ff7a18]" size={20} />
                            System Activity Logs
                        </h2>
                        <p className="text-xs text-[#888] mt-1">Track all administrative actions performed by users.</p>
                    </div>

                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" size={14} />
                        <input 
                            type="text" 
                            placeholder="Filter logs..." 
                            className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg py-2 pl-9 pr-4 text-xs text-white focus:border-[#ff7a18] outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
                                <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Action</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Details</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2a2a2a]">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i}>
                                        <td className="px-6 py-4"><div className="h-4 bg-[#1f1f1f] rounded animate-pulse w-3/4" /></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-[#1f1f1f] rounded animate-pulse w-1/2" /></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-[#1f1f1f] rounded animate-pulse w-full" /></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-[#1f1f1f] rounded animate-pulse w-1/3" /></td>
                                    </tr>
                                ))
                            ) : filteredLogs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-[#555] text-sm italic">
                                        No activity logs found.
                                    </td>
                                </tr>
                            ) : (
                                filteredLogs.map((log) => (
                                    <tr key={log._id} className="hover:bg-[#161616] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff7a18] to-[#ff3d00] flex items-center justify-center text-white text-[10px] font-bold">
                                                    {log.userName.slice(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{log.userName}</p>
                                                    <p className="text-[10px] text-[#555]">{log.userEmail}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-full bg-[#ff7a1811] text-[#ff7a18] text-[10px] font-semibold border border-[#ff7a1822]">
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-[11px] text-[#ccc] max-w-xs">{log.details}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-[#888] text-[11px]">
                                                <Calendar size={12} />
                                                {format(new Date(log.createdAt), 'MMM d, yyyy HH:mm')}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppShell>
    );
}
