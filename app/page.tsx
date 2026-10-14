'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/supabaseClient';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check current auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) checkAdmin(currentUser.id);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) checkAdmin(currentUser.id);
      else setIsAdmin(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdmin = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single();
    
    if (data?.is_admin) {
      setIsAdmin(true);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between min-h-[800px] border-4 border-slate-800">
        
        {/* Header */}
        <div className="bg-[#7A2048] text-white p-6 text-center rounded-b-3xl shadow-md">
          <h1 className="text-2xl font-bold tracking-wide">Mingo Baptist Church</h1>
          <p className="text-pink-100 text-sm mt-1">
            {user ? `Welcome back, ${user.email}` : 'Welcome to Our Central Hub'}
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 flex flex-col gap-4 my-auto">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800">Stay Connected</h2>
            <p className="text-slate-500 text-sm mt-1">Join our community, view events, and access resources.</p>
          </div>

          <button className="w-full bg-[#7A2048] hover:bg-[#601938] text-white font-medium py-3 rounded-xl shadow transition">
            Upcoming Events & Services
          </button>

          <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-3 rounded-xl shadow-sm transition">
            Sermons & Media
          </button>

          <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-3 rounded-xl shadow-sm transition">
            Give / Tithes
          </button>

          {/* Admin Restricted Tool */}
          {user && isAdmin && (
            <button 
              onClick={() => window.location.href = '/support-tools'}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 rounded-xl shadow transition"
            >
              Digital Posterboard Update Tools
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
          {user ? (
            <button 
              onClick={handleSignOut}
              className="w-full border border-red-600 text-red-600 hover:bg-red-50 font-medium py-2.5 rounded-xl transition"
            >
              Sign Out
            </button>
          ) : (
            <button 
              onClick={() => window.location.href = '/auth'}
              className="w-full border border-[#7A2048] text-[#7A2048] hover:bg-pink-50 font-medium py-2.5 rounded-xl transition"
            >
              Sign In / Register
            </button>
          )}
        </div>

      </div>
    </main>
  );
}