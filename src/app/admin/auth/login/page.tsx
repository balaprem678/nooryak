// // 'use client';

// // import { useState } from 'react';
// // import { useAuth } from '@/contexts/admin/AuthContext';
// // import { Zap, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
// // import Link from 'next/link';

// // export default function LoginPage() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const { signIn } = useAuth();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError('');
// //     setLoading(true);

// //     try {
// //       await signIn(email, password);
// //     } catch (err: any) {
// //       setError(err.message || 'Login failed. Please check your credentials.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
// //       <div className="w-full max-w-md space-y-8">
// //         <div className="text-center space-y-2">
// //           <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff7a18] to-[#ff3d00] items-center justify-center text-white mb-4 shadow-xl shadow-[#ff7a18]/20">
// //             <Zap size={32} fill="currentColor" />
// //           </div>
// //           <h1 className="text-3xl font-bold text-white tracking-tight">Nex<span className="text-[#ff7a18]">Admin</span></h1>
// //           <p className="text-[#888] text-sm">Welcome back! Please enter your details.</p>
// //         </div>

// //         <div className="bg-[#111111] border border-[#2a2a2a] rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
// //           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] opacity-50" />
          
// //           <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
// //             <div className="space-y-4">
// //               <div className="space-y-2">
// //                 <label className="text-xs font-bold text-[#888] uppercase tracking-wider pl-1">Email Address</label>
// //                 <div className="relative group/input">
// //                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444] group-focus-within/input:text-[#ff7a18] transition-colors" size={18} />
// //                   <input 
// //                     type="email" 
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     placeholder="admin@nooryak.com" 
// //                     className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl py-4 pl-12 pr-4 text-white focus:border-[#ff7a18] focus:ring-1 focus:ring-[#ff7a18] outline-none transition-all"
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               <div className="space-y-2">
// //                 <label className="text-xs font-bold text-[#888] uppercase tracking-wider pl-1">Password</label>
// //                 <div className="relative group/input">
// //                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444] group-focus-within/input:text-[#ff7a18] transition-colors" size={18} />
// //                   <input 
// //                     type="password" 
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     placeholder="••••••••" 
// //                     className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl py-4 pl-12 pr-4 text-white focus:border-[#ff7a18] focus:ring-1 focus:ring-[#ff7a18] outline-none transition-all"
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {error && (
// //               <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-500 text-xs font-medium text-center animate-shake">
// //                 {error}
// //               </div>
// //             )}

// //             <button 
// //               type="submit" 
// //               disabled={loading}
// //               className="w-full bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] text-white rounded-2xl py-4 text-sm font-bold shadow-lg shadow-[#ff7a18]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group-hover:shadow-[#ff7a18]/40 disabled:opacity-50"
// //             >
// //               {loading ? <Loader2 className="animate-spin" size={18} /> : (
// //                 <>
// //                   Sign In to Dashboard
// //                   <ArrowRight size={18} />
// //                 </>
// //               )}
// //             </button>
// //           </form>

// //           {/* Decorative background circles */}
// //           <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#ff7a18] rounded-full blur-[80px] opacity-10" />
// //           <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#ff3d00] rounded-full blur-[80px] opacity-5" />
// //         </div>

// //         <div className="text-center">
// //           <Link href="/" className="text-[#666] text-sm hover:text-white transition-colors flex items-center justify-center gap-2">
// //             Back to Website
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// 'use client';

// import { useState } from 'react';
// import { useAuth } from '@/contexts/admin/AuthContext';
// import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
// import { Images } from '@/utils/Images';
// import "./login.scss"

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { signIn } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       await signIn(email, password);
//     } catch (err: any) {
//       setError(err.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black flex flex-col lg:flex-row login_page">

//       {/* LEFT SIDE */}
//       <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-black via-[#1a0a00] to-[#2a0f00] text-white p-16 flex-col justify-center">
        
//         <div className="flex items-center gap-3">
//           <img src={Images.logo.src} alt="" width={200}/>
//         </div>

//         <h2 className="text-4xl font-bold leading-tight mb-6">
//           The modern <br />
//           admin <span className="text-[#ff7a18]">dashboard</span> <br />
//           for your team
//         </h2>

//         <p className="text-gray-400 mb-10">
//           Manage content, users, and services with a fast,
//           intuitive interface built for productivity.
//         </p>

//         <div className="space-y-4 text-sm text-gray-300 para">
//           <p>⚡ Real-time analytics & revenue insights</p>
//           <p>🛡️ Role-based access control</p>
//           <p>🚀 Lightning-fast navigation</p>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        
//         <div className="w-full max-w-md bg-[#111] border border-[#2a2a2a] rounded-3xl p-8 shadow-2xl">

//           <h2 className="text-white text-2xl font-bold mb-2">
//             Login
//           </h2>
//           <p className="text-gray-500 text-sm mb-6">
//             Access your admin dashboard
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">

//             {/* EMAIL */}
//             <div className="relative">
//               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-3 pl-12 text-white focus:border-[#ff7a18] outline-none"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             {/* PASSWORD */}
//             <div className="relative">
//               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-3 pl-12 text-white focus:border-[#ff7a18] outline-none"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             {/* ERROR */}
//             {error && (
//               <div className="text-red-500 text-sm text-center">
//                 {error}
//               </div>
//             )}

//             {/* BUTTON */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition"
//             >
//               {loading ? (
//                 <Loader2 className="animate-spin" />
//               ) : (
//                 <>
//                   Login <ArrowRight size={18} />
//                 </>
//               )}
//             </button>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/admin/AuthContext';
import { Mail, Lock, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Images } from '@/utils/Images';
import "./login.scss"

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👈 NEW
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row login_page">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-black via-[#1a0a00] to-[#2a0f00] text-white p-16 flex-col justify-center">
        
        <div className="flex items-center gap-3">
          <img src={Images.logo.src} alt="" width={200}/>
        </div>

        <h2 className="text-4xl font-bold leading-tight mb-6">
          The modern <br />
          admin <span className="text-[#ff7a18]">dashboard</span> <br />
          for your team
        </h2>

        <p className="text-gray-400 mb-10">
          Manage content, users, and services with a fast,
          intuitive interface built for productivity.
        </p>

        <div className="space-y-4 text-sm text-gray-300 para">
          <p>⚡ Real-time analytics & revenue insights</p>
          <p>🛡️ Role-based access control</p>
          <p>🚀 Lightning-fast navigation</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
     <div className="flex w-full lg:w-1/2 items-center justify-center p-6 relative">

  {/* BACKGROUND GLOW */}
  <div className="absolute w-[400px] h-[400px] bg-[#ff7a18] opacity-20 blur-[120px] rounded-full"></div>

  <div className="relative w-full max-w-md">

    {/* GLASS CARD */}
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

      {/* HEADER */}
      <div className="mb-6 text-center">
        <h2 className="text-white text-3xl font-bold mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-gray-400 text-sm">
          Login to continue to your dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* EMAIL */}
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#ff7a18] transition" size={18} />
          
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#ff7a18] focus:ring-1 focus:ring-[#ff7a18] outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#ff7a18] transition" size={18} />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder-gray-500 focus:border-[#ff7a18] focus:ring-1 focus:ring-[#ff7a18] outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* EYE */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
            {error}
          </div>
        )}

        {/* EXTRA ROW */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-[#ff7a18]" />
            Remember me
          </label>

          <span className="hover:text-[#ff7a18] cursor-pointer transition">
            Forgot password?
          </span>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 shadow-lg shadow-orange-500/20"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              Login <ArrowRight size={18} />
            </>
          )}
        </button>

      </form>
    </div>

    {/* BOTTOM TEXT */}
    <p className="text-center text-gray-500 text-xs mt-6">
      Secure admin access • Nooryak
    </p>

  </div>
</div>
    </div>
  );
}