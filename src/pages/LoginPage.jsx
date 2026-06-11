import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { signIn } from '../lib/supabase'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await signIn(form.email, form.password)
    setLoading(false)
    if (err) return setError(err.message)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Blobs */}
      <div className="blob w-96 h-96 bg-cyan-500/8 top-0 left-0" />
      <div className="blob w-80 h-80 bg-purple-500/8 bottom-0 right-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-green-400 flex items-center justify-center">
              <Zap className="w-4 h-4 text-dark-950 fill-current" />
            </div>
            <span className="font-display font-700 text-white">
              Future<span className="gradient-text-cyan">Leap</span> AI
            </span>
          </Link>
          <h1 className="font-display font-700 text-2xl text-white">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-1">Log in to your account</p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-display font-600 text-slate-400 mb-1.5">Email</label>
            <input
              type="email"
              required
              className="input-field"
              placeholder="you@university.edu"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-display font-600 text-slate-400">Password</label>
              <Link to="/forgot-password" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                required
                className="input-field pr-10"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-dark-950 border-t-transparent animate-spin" />
                Signing in…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign In <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-500 transition-colors">
            Sign up free
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
