import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, ArrowLeft, Mail } from 'lucide-react'
import { resetPassword } from '../lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await resetPassword(email)
    setLoading(false)
    if (err) return setError(err.message)
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="blob w-96 h-96 bg-purple-500/8 top-0 left-1/2" />

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

          {sent ? (
            <>
              <div className="w-12 h-12 rounded-2xl bg-green-400/10 border border-green-400/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-green-400" />
              </div>
              <h1 className="font-display font-700 text-2xl text-white">Check your email</h1>
              <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">
                We sent a reset link to <span className="text-white font-500">{email}</span>. It expires in 1 hour.
              </p>
            </>
          ) : (
            <>
              <h1 className="font-display font-700 text-2xl text-white">Reset password</h1>
              <p className="text-slate-500 text-sm mt-1">Enter your email to receive a reset link</p>
            </>
          )}
        </div>

        {!sent && (
          <>
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-display font-600 text-slate-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  className="input-field"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-dark-950 border-t-transparent animate-spin" />
                    Sending…
                  </span>
                ) : 'Send Reset Link'}
              </button>
            </form>
          </>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
