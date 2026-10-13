'use client'

import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Registration successful! Check your email for confirmation or try signing in.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Login successful! Redirecting...')
        setTimeout(() => router.push('/'), 1000)
      }
    }
    setLoading(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between min-h-[800px] border-4 border-slate-800 p-6">
        
        {/* Header */}
        <div>
          <button 
            onClick={() => router.push('/')}
            className="text-sm text-blue-600 hover:underline mb-4 block"
          >
            ← Back to Home
          </button>
          <h1 className="text-2xl font-bold text-slate-900 text-center">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h1>
          <p className="text-slate-500 text-sm text-center mt-1">
            {isSignUp ? 'Join the Mingo Baptist Church hub' : 'Sign in to your member account'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="flex flex-col gap-4 my-auto">
          {message && (
            <div className="p-3 text-sm bg-blue-50 text-blue-800 rounded-xl border border-blue-200">
              {message}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-800"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-800"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl shadow transition mt-2"
          >
            {loading ? 'Processing...' : isSignUp ? 'Register' : 'Sign In'}
          </button>

          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-slate-600 hover:text-blue-600 text-center mt-2"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </form>

        {/* Footer info */}
        <div className="text-center text-xs text-slate-400">
          Mingo Baptist Church Central Hub
        </div>

      </div>
    </main>
  )
}