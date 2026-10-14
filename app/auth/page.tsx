'use client';

import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check current auth status
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-slate-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between min-h-[840px] border-4 border-zinc-800">
        
        {/* Header / Branding using the exact logo theme */}
        <div className="bg-gradient-to-br from-[#7A2048] via-[#63193A] to-[#4A102B] text-white p-6 rounded-b-3xl shadow-lg flex flex-col items-center text-center relative">
          
          {/* Logo Container */}
          <div className="w-16 h-16 rounded-2xl overflow-hidden mb-3 shadow-md border-2 border-white/20 flex items-center justify-center bg-[#7A2048]">
            <Image 
              src="/logo.png" 
              alt="Mingo Baptist Church Logo" 
              width={64} 
              height={64} 
              className="object-cover w-full h-full"
            />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">Mingo Baptist Church</h1>
          <p className="text-rose-200 text-xs mt-1 uppercase tracking-widest font-medium">Central Hub</p>
          
          {user && (
            <div className="mt-4 bg-white/10 px-3 py-1.5 rounded-full text-xs backdrop-blur-sm border border-white/10 text-rose-100">
              Welcome back, <span className="font-semibold text-white">{user.email}</span>
            </div>
          )}
        </div>

        {/* Body Content */}
        <div className="p-6 flex flex-col gap-4 overflow-y-auto flex-grow">
          
          {/* Featured Announcement Card with Logo Color Accent */}
          <div className="bg-gradient-to-r from-[#7A2048] to-[#912B58] text-white p-5 rounded-2xl shadow-md">
            <span className="bg-white/20 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">This Sunday</span>
            <h3 className="text-lg font-bold mt-2">Join Us for Worship & Fellowship</h3>
            <p className="text-rose-100 text-xs mt-1">Service starts at 10:30 AM. Nursery and children's church provided.</p>
          </div>

          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">Quick Actions</h2>

          {/* Grid Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white hover:bg-rose-50/50 p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center transition group">
              <div className="w-10 h-10 bg-rose-50 text-[#7A2048] rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition">📅</div>
              <span className="text-sm font-semibold text-slate-800">Events</span>
              <span className="text-[10px] text-slate-400">Upcoming calendar</span>
            </button>

            <button className="bg-white hover:bg-rose-50/50 p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center transition group">
              <div className="w-10 h-10 bg-rose-50 text-[#7A2048] rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition">🎥</div>
              <span className="text-sm font-semibold text-slate-800">Sermons</span>
              <span className="text-[10px] text-slate-400">Watch & listen</span>
            </button>

            <button className="bg-white hover:bg-rose-50/50 p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center transition group">
              <div className="w-10 h-10 bg-rose-50 text-[#7A2048] rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition">🙏</div>
              <span className="text-sm font-semibold text-slate-800">Prayer Wall</span>
              <span className="text-[10px] text-slate-400">Share & support</span>
            </button>

            <button className="bg-white hover:bg-rose-50/50 p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center transition group">
              <div className="w-10 h-10 bg-rose-50 text-[#7A2048] rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition">💛</div>
              <span className="text-sm font-semibold text-slate-800">Giving</span>
              <span className="text-[10px] text-slate-400">Tithes & offerings</span>
            </button>
          </div>

        </div>

        {/* Footer / Account Management */}
        <div className="p-5 bg-white border-t border-slate-200 text-center">
          {user ? (
            <button 
              onClick={handleSignOut}
              className="w-full bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-medium py-3 rounded-xl transition text-sm border border-slate-200"
            >
              Sign Out
            </button>
          ) : (
            <button 
              onClick={() => router.push('/auth')}
              className="w-full bg-[#7A2048] hover:bg-[#63193A] text-white font-medium py-3 rounded-xl shadow transition text-sm"
            >
              Sign In / Register
            </button>
          )}
        </div>

      </div>
    </main>
  );
}