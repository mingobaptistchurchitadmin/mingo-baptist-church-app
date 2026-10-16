'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/supabaseClient';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="animate-pulse text-sm font-medium tracking-wide">Loading Mingo Baptist Hub...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-2 sm:p-4 md:p-6">
      {/* Mobile Frame Container (App view on PC, full screen on phones) */}
      <div className="w-full max-w-md bg-slate-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between min-h-[840px] border-4 border-slate-800">
        
        {/* Header / Branding */}
        <div className="bg-gradient-to-br from-[#7A2048] via-[#63193A] to-[#4A102B] text-white p-6 rounded-b-3xl shadow-lg flex flex-col items-center text-center relative">
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
          <p className="text-rose-200 text-xs mt-1 uppercase tracking-widest font-medium">Faith. Family. Community.</p>
          
          {user && (
            <div className="mt-3 bg-white/10 px-3 py-1 rounded-full text-xs backdrop-blur-sm border border-white/10 text-rose-100 max-w-full truncate">
              Welcome, <span className="font-semibold text-white">{user.email}</span>
            </div>
          )}
        </div>

        {/* Body Content from Figma Layout */}
        <div className="p-6 flex flex-col gap-5 overflow-y-auto flex-grow">
          
          {/* Welcome Card */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E8E3DF] flex flex-col gap-3">
            <span className="text-[#557F8C] text-[10px] font-bold tracking-wider uppercase">Join Us This Sunday · Oct 18</span>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#F3E8ED] rounded-xl flex items-center justify-center text-[#8A3353] font-bold">⛪</div>
              <div>
                <h3 className="text-slate-900 font-semibold text-base">Morning Worship</h3>
                <p className="text-[#8A3353] font-medium text-sm">11:00 AM</p>
              </div>
            </div>
            <p className="text-slate-500 text-xs">Come early for Sunday School at 10:00 AM.</p>
            <button 
              onClick={() => alert('Plan your visit details!')}
              className="w-full bg-[#8A3353] hover:bg-[#6e2842] text-white font-semibold py-3 rounded-xl transition text-sm shadow"
            >
              Plan your visit →
            </button>
          </div>

          {/* Quick Actions / Media */}
          <div className="bg-[#EAF0F2] p-5 rounded-2xl flex flex-col gap-3">
            <span className="text-[#557F8C] text-[10px] font-bold tracking-wider uppercase">Our Live Channel</span>
            <h3 className="text-slate-900 text-xl font-bold">Worship wherever you are.</h3>
            <p className="text-slate-600 text-xs leading-relaxed">Visit our YouTube channel for live services. Morning Worship is Sunday at 11:00 AM.</p>
            <button 
              onClick={() => window.open('https://youtube.com', '_blank')}
              className="text-[#8A3353] text-sm font-semibold hover:underline flex items-center gap-1"
            >
              Open live channel →
            </button>
          </div>

        </div>

        {/* Footer / Account Management */}
        <div className="p-5 bg-white border-t border-slate-100 text-center">
          {user ? (
            <button 
              onClick={handleSignOut}
              className="w-full border border-red-600 text-red-600 hover:bg-red-50 font-medium py-3 rounded-xl transition text-sm"
            >
              Sign Out
            </button>
          ) : (
            <Link 
              href="/auth"
              className="block w-full border border-[#8A3353] text-[#8A3353] hover:bg-rose-50 font-medium py-3 rounded-xl transition text-sm text-center"
            >
              Sign In / Register
            </Link>
          )}
        </div>

      </div>
    </main>
  );
}