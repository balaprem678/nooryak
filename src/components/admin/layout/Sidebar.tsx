'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, Zap, LayoutGrid, Layers, Newspaper, Users, Settings } from 'lucide-react';
import { cn } from '@/lib/admin/utils';
import { useAuth } from '@/contexts/admin/AuthContext';
import { Images } from '@/utils/Images';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutGrid size={18} />, href: '/admin/dashboard' },
  {
    label: 'Services',
    icon: <Layers size={18} />,
    children: [
      { label: 'Add Service', href: '/admin/services/add' },
      { label: 'Services List', href: '/admin/services' },
    ],
  },
  {
    label: 'Blog',
    icon: <Newspaper size={18} />,
    children: [
      { label: 'Add Post', href: '/admin/blog/add' },
      { label: 'Blog List', href: '/admin/blog' },
    ],
  },
  { label: 'Users', icon: <Users size={18} />, href: '/admin/users' },
  { label: 'Settings', icon: <Settings size={18} />, href: '/admin/settings' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>(['Services']);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const getInitials = () => {
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'AD';
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-[#111111] border-r border-[#2a2a2a] transition-all duration-300 z-50',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      <div className="flex flex-col h-full text-white">
        <div className="flex items-center justify-between px-4 h-16 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3 overflow-hidden">
            {!collapsed && (
              <span className="font-bold text-[17px] whitespace-nowrap">
              <img src={Images.logo.src} width={150} alt="" />
              </span>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-7 h-7 rounded-lg border border-[#2a2a2a] text-[#888] hover:border-[#ff7a18] hover:text-[#ff7a18] flex items-center justify-center transition-all flex-shrink-0"
          >
            {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 admin-scrollbar">
          <div className={cn('text-[10px] font-bold text-[#888] uppercase tracking-wider px-2.5 py-3', collapsed && 'opacity-0')}>
            Main
          </div>
          {navItems.map((item) => (
            <div key={item.label}>
              {item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl transition-all min-h-[40px]',
                    pathname === item.href
                      ? 'bg-[rgba(255,122,24,.18)] text-[#ff7a18]'
                      : 'hover:bg-[#1a1a1a] text-[#ccc]'
                  )}
                >
                  <span className="w-5 flex items-center justify-center flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span className="text-[13px] font-medium">{item.label}</span>}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => !collapsed && toggleDropdown(item.label)}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl hover:bg-[#1a1a1a] text-[#ccc] transition-all min-h-[40px]"
                  >
                    <span className="w-5 flex items-center justify-center flex-shrink-0">{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="text-[13px] font-medium flex-1 text-left">{item.label}</span>
                        <ChevronRight
                          size={10}
                          className={cn(
                            'text-[#888] transition-transform',
                            openDropdowns.includes(item.label) && 'rotate-11s'
                          )}
                        />
                      </>
                    )}
                  </button>
                  {!collapsed && openDropdowns.includes(item.label) && item.children && (
                    <div className="mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'flex items-center gap-2.5 px-2.5 py-2 pl-10 rounded-lg text-[13px] transition-all',
                            pathname === child.href
                              ? 'text-[#ff7a18] bg-[rgba(255,122,24,.18)]'
                              : 'text-[#888] hover:bg-[#1a1a1a] hover:text-white'
                          )}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>

        <div className="p-2 border-t border-[#2a2a2a]">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-[#1a1a1a] transition-all overflow-hidden"
            title="Logout"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff7a18] to-[#ff3d00] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {getInitials()}
            </div>
            {!collapsed && (
              <div className="overflow-hidden text-left">
                <div className="text-[13px] font-semibold whitespace-nowrap">
                  {user?.email?.split('@')[0] || 'NK Admin'}
                </div>
                <div className="text-[11px] text-[#888] whitespace-nowrap">Administrator</div>
              </div>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
