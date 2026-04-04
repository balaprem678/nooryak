import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/admin/utils';

interface StatCardProps {
  label: string;
  value: string;
  badge: string;
  up: boolean;
  color: 'blue' | 'green' | 'yellow' | 'purple';
  icon: LucideIcon;
}

const colorClasses = {
  blue: 'bg-[rgba(59,130,246,.15)] text-[#3b82f6]',
  green: 'bg-[rgba(34,197,94,.15)] text-[#22c55e]',
  yellow: 'bg-[rgba(245,158,11,.15)] text-[#f59e0b]',
  purple: 'bg-[rgba(168,85,247,.15)] text-[#a855f7]',
};

export function StatCard({ label, value, badge, up, color, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-5 hover:border-[#ff7a18] hover:-translate-y-0.5 transition-all shadow-lg text-white">
      <div className="flex items-center justify-between mb-3.5">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', colorClasses[color])}>
          {/* @ts-ignore */}
          <Icon size={16} />
        </div>
        <span
          className={cn(
            'text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1',
            up ? 'bg-[rgba(34,197,94,.12)] text-[#22c55e]' : 'bg-[rgba(255,61,0,.12)] text-[#ff3d00]'
          )}
        >
          <span className="text-[9px]">{up ? '↑' : '↓'}</span>
          {badge}
        </span>
      </div>
      <div className="text-[26px] font-extrabold mb-1 font-mono">{value}</div>
      <div className="text-xs text-[#888]">{label}</div>
    </div>
  );
}
