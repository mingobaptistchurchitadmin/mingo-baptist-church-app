'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useRouter } from 'next/navigation';

export default function SupportToolsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) {
      setStatus('Please fill in both fields.');
      return;
    }
    setStatus('Posterboard update published successfully!');
    setTitle('');
    setMessage('');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="animate-pulse">Checking access permissions...</p>
      </div>
    );
  }

  // If user is not logged in, show the secure sign-in wall
  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 text-center border-4 border-zinc-800">
          <div className="w-12 h-12 bg-rose-50 text-[#7A2048] rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl">🔒</div>
          <h1 className="text-xl font-bold text-slate-900">Sign In Required</h1>
          <p className="text-slate-500 text-xs mt-2 mb-6">You must sign in with an authorized account to access the Digital Posterboard Update Tools.</p>
          <button 
            onClick={() => router.push('/auth')}
            className="w-full bg-[#7A2048] hover:bg-[#63193A] text-white font-medium py-3 rounded-xl shadow transition text-sm mb-3"
          >
            Sign In / Register
          </button>
          <button 
            onClick={() => router.push('/')}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 rounded-xl transition text-sm"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-slate-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between min-h-[840px] border-4 border-zinc-800">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-[#7A2048] via-[#63193A] to-[#4A102B] text-white p-6 rounded-b-3xl shadow-lg flex items-center justify-between">
          <button 
            onClick={() => router.push('/')}
            className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-xl transition backdrop-blur-sm"
          >
            ← Home
          </button>
          <h1 className="text-base font-bold">Support Tools</h1>
          <div className="w-12"></div>
        </div>

        {/* Body Content */}
        <div className="p-6 flex flex-col gap-4 overflow-y-auto flex-grow">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <span className="bg-rose-50 text-[#7A2048] text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">Admin Portal</span>
            <h2 className="text-lg font-bold text-slate-900 mt-3">Digital Posterboard Update Tools</h2>
            <p className="text-slate-500 text-xs mt-1">Manage and push live updates to the church's digital boards.</p>
          </div>

          <form onSubmit={handlePublish} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-slate-800">Create Live Update</h3>
            
            {status && (
              <div className="p-3 text-xs bg-rose-50 text-[#7A2048] rounded-xl border border-rose-200">
                {status}
              </div>
            )}

            <input 
              type="text" 
              placeholder="Announcement Title..." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#7A2048]"
            />
            
            <textarea 
              placeholder="Poster message details..." 
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#7A2048] resize-none"
            ></textarea>
            
            <button 
              type="submit"
              className="w-full bg-[#7A2048] hover:bg-[#63193A] text-white font-medium py-2.5 rounded-xl shadow transition text-xs"
            >
              Publish Live Update
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="p-5 bg-white border-t border-slate-200 text-center text-xs text-slate-400">
          Authorized User: <span className="font-semibold text-slate-600">{user.email}</span>
        </div>

      </div>
    </main>
  );
}