'use client';

import { Search, Bell, Moon } from 'lucide-react';
import { useAuth } from '@/contexts/admin/AuthContext';

interface TopbarProps {
  title: string;
  breadcrumb: string;
}

export function Topbar({ title, breadcrumb }: TopbarProps) {
  const { user } = useAuth();

  const getInitials = () => {
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'AD';
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#111111] border-b border-[#2a2a2a] flex items-center justify-between px-6 text-white">
      <div>
        <h1 className="text-[16px] font-bold">{title}</h1>
        <div className="flex items-center gap-1.5 text-[11px] text-[#888] mt-0.5">
          <span>Home</span>
          <span>›</span>
          <span>{breadcrumb}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl border border-[#2a2a2a] text-[#888] hover:border-[#ff7a18] hover:text-[#ff7a18] flex items-center justify-center transition-all">
          <Search size={14} />
        </button>
        <button className="w-9 h-9 rounded-xl border border-[#2a2a2a] text-[#888] hover:border-[#ff7a18] hover:text-[#ff7a18] flex items-center justify-center transition-all relative">
          <Bell size={14} />
          <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#ff7a18] text-white text-[8px] font-bold flex items-center justify-center">
            3
          </span>
        </button>
        <button className="w-9 h-9 rounded-xl border border-[#2a2a2a] text-[#888] hover:border-[#ff7a18] hover:text-[#ff7a18] flex items-center justify-center transition-all">
          <Moon size={14} />
        </button>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff7a18] to-[#ff3d00] flex items-center justify-center text-white text-xs font-bold">
          {getInitials()}
        </div>
      </div>
    </header>
  );
}
