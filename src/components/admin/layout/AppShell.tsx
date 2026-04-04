'use client';

import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface AppShellProps {
  children: React.ReactNode;
  title: string;
  breadcrumb: string;
}

export function AppShell({ children, title, breadcrumb }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar />
      <div className="ml-[260px] flex-1 min-h-screen flex flex-col">
        <Topbar title={title} breadcrumb={breadcrumb} />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}
