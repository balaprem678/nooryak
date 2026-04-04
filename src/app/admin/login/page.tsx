'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Mail, Lock, Eye, EyeOff, ChartLine, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/admin/AuthContext';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      toast.success('Welcome back!');
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] text-white overflow-hidden">
      {/* Left Decoration Side */}
      <div className="hidden lg:flex w-[45%] bg-gradient-to-br from-[#0f0f0f] to-[#1a0a00] flex-col justify-center px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,122,24,.12)_0%,transparent_70%)]" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ff7a18] to-[#ff3d00] flex items-center justify-center text-white">
              <Zap size={20} />
            </div>
            <div className="text-[22px] font-extrabold">
              Nex<span className="text-[#ff7a18]">Admin</span>
            </div>
          </div>

          <h1 className="text-[38px] font-extrabold leading-tight mb-5">
            The modern
            <br />
            admin <span className="bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] bg-clip-text text-transparent">dashboard</span>
            <br />
            for your team
          </h1>

          <p className="text-[#888] text-sm leading-relaxed max-w-[340px] mb-12">
            Manage your site's content, users, and services with a fast, intuitive interface.
          </p>

          <div className="space-y-4">
            {[
              { icon: ChartLine, text: 'Real-time analytics & engagement insights' },
              { icon: Shield, text: 'Secure JWT-based authentication' },
              { icon: Zap, text: 'Lightning-fast management tools' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#222] border border-[#2a2a2a] flex items-center justify-center text-[#ff7a18] flex-shrink-0">
                  {/* @ts-ignore */}
                  <feature.icon size={14} />
                </div>
                <div className="text-[13px] text-[#ccc]">{feature.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Login Side */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,24,.05)_0%,transparent_100%)] pointer-events-none" />
        
        <div className="w-full max-w-[420px] bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 lg:p-10 shadow-2xl relative z-10">
          <div className="mb-8">
            <h2 className="text-[26px] font-extrabold mb-1.5">Sign In</h2>
            <p className="text-[13px] text-[#888]">
              Authenticate to access the administrative panel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[13px] font-semibold text-[#ccc] mb-2 block">Email address</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888] group-focus-within:text-[#ff7a18] transition-colors" size={14} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-3.5 px-4 pl-10 text-sm text-white placeholder:text-[#888] focus:outline-none focus:border-[#ff7a18] focus:ring-4 focus:ring-[rgba(255,122,24,.08)] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[13px] font-semibold text-[#ccc] block">Password</label>
                <button type="button" className="text-[12px] text-[#ff7a18] hover:underline">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888] group-focus-within:text-[#ff7a18] transition-colors" size={14} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-3.5 px-4 pl-10 pr-10 text-sm text-white placeholder:text-[#888] focus:outline-none focus:border-[#ff7a18] focus:ring-4 focus:ring-[rgba(255,122,24,.08)] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#888] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 py-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-[#2a2a2a] bg-[#1a1a1a] accent-[#ff7a18]" />
              <label htmlFor="remember" className="text-[13px] text-[#888] cursor-pointer hover:text-[#ccc] transition-colors">
                Remember this session
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all disabled:opacity-60 shadow-[0_0_20px_rgba(255,122,24,0.15)] text-sm mt-4 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#2a2a2a] text-center">
             <p className="text-[12px] text-[#555]">
               Protected by NexAdmin Security v2.0
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
