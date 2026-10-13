'use client';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      {/* Mobile Frame Container (Looks like an app on PC, full screen on phones) */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between min-h-[800px] border-4 border-slate-800">
        
        {/* Header / Branding */}
        <div className="bg-blue-900 text-white p-6 text-center rounded-b-3xl shadow-md">
          <h1 className="text-2xl font-bold tracking-wide">Mingo Baptist Church</h1>
          <p className="text-blue-200 text-sm mt-1">Welcome to Our Central Hub</p>
        </div>

        {/* Body Content */}
        <div className="p-6 flex flex-col gap-4 my-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Stay Connected</h2>
            <p className="text-slate-500 text-sm mt-1">Join our community, view events, and access resources.</p>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl shadow transition">
            Upcoming Events & Services
          </button>

          <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-3 rounded-xl shadow-sm transition">
            Sermons & Media
          </button>

          <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-3 rounded-xl shadow-sm transition">
            Give / Tithes
          </button>
        </div>

        {/* Footer / Login Navigation */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 mb-3">Already have an account?</p>
          <button 
            onClick={() => window.location.href = '/auth'}
            className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2.5 rounded-xl transition"
          >
            Sign In / Register
          </button>
        </div>

      </div>
    </main>
  );
}