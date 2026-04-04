'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/admin/AuthContext';

export default function AdminRootPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/admin/dashboard');
      } else {
        router.push('/admin/auth/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#ff3d00] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white/60 font-medium animate-pulse">Initializing Admin...</p>
      </div>
    </div>
  );
}
