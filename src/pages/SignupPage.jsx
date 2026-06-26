import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Eye, EyeOff, ArrowRight, Check } from 'lucide-react'
import { signUp, createFreeSubscription } from '../lib/supabase'

export default function SignupPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const selectedPlan = searchParams.get('plan') || 'free'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault()
  setError('')

  if (form.password.length < 8) {
    return setError('Password must be at least 8 characters.')
  }

  setLoading(true)

  const { data, error: err } = await signUp(
    form.email,
    form.password,
    form.name
  )

  if (err) {
    setLoading(false)
    return setError(err.message)
  }

  const userId = data?.user?.id

  if (userId) {
  await createFreeSubscription(userId, selectedPlan)
  }

  setLoading(false)
  setSuccess(true)
  setTimeout(() => navigate('/dashboard'), 2000)
}

  const perks = ['5 free AI generations', 'Resume analysis included', 'No credit card needed']

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="blob w-96 h-96 bg-green-500/8 top-0 right-0" />
      <div className="blob w-80 h-80 bg-cyan-500/8 bottom-0 left-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-green-400 flex items-center justify-center">
              <Zap className="w-4 h-4 text-dark-950 fill-current" />
            </div>
            <span className="font-display font-700 text-white">
              Future<span className="gradient-text-cyan">Leap</span> AI
            </span>
          </Link>
          <h1 className="font-display font-700 text-2xl text-white">Create your account</h1>
          <p className="text-slate-500 text-sm mt-1">Join 10,000+ ambitious students</p>
        </div>

        {/* Perks */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {perks.map(p => (
            <span key={p} className="inline-flex items-center gap-1.5 text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-1 rounded-full">
              <Check className="w-3 h-3" /> {p}
            </span>
          ))}
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
            ✅ Account created! Redirecting to dashboard…
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-display font-600 text-slate-400 mb-1.5">Full Name</label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="Alex Johnson"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>
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
            <label className="block text-xs font-display font-600 text-slate-400 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                required
                className="input-field pr-10"
                placeholder="Min. 8 characters"
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
            disabled={loading || success}
            className="btn-primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-dark-950 border-t-transparent animate-spin" />
                Creating account…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Create Free Account <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>

          <p className="text-xs text-slate-600 text-center">
            By signing up you agree to our{' '}
            <a href="#" className="text-slate-400 hover:text-white">Terms</a> and{' '}
            <a href="#" className="text-slate-400 hover:text-white">Privacy Policy</a>.
          </p>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-500 transition-colors">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
