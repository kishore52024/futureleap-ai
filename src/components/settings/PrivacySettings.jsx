import { useState } from 'react'
import { Shield, Lock, Trash2, KeyRound, AlertTriangle } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function PrivacySettings() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [deleteText, setDeleteText] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setMessage('Password updated successfully.')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleDeleteAccount = async () => {
    setMessage('')
    setError('')

    if (deleteText !== 'DELETE') {
      setError('Type DELETE to confirm account deletion.')
      return
    }

    setError(
      'Account deletion needs a secure backend function. UI confirmation is ready.'
    )
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="font-display font-800 text-xl text-white">
              Privacy & Security
            </h2>
            <p className="text-slate-500 text-sm">
              Manage password, account safety and privacy options.
            </p>
          </div>
        </div>

        {message && (
          <div className="mb-4 rounded-xl border border-green-400/20 bg-green-400/10 px-4 py-3 text-green-300 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <h3 className="text-white font-700">Change Password</h3>
          </div>

          <div>
            <label className="text-slate-400 text-sm">New Password</label>
            <input
              type="password"
              className="w-full mt-2 rounded-xl bg-dark-900 border border-white/10 px-4 py-3 text-white outline-none focus:border-cyan-400/50"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="text-slate-400 text-sm">Confirm Password</label>
            <input
              type="password"
              className="w-full mt-2 rounded-xl bg-dark-900 border border-white/10 px-4 py-3 text-white outline-none focus:border-cyan-400/50"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-cyan-400 text-dark-950 font-800 hover:bg-cyan-300 transition disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-3">
          <KeyRound className="w-4 h-4 text-purple-400" />
          <h3 className="text-white font-700">Two-Factor Authentication</h3>
        </div>

        <p className="text-slate-500 text-sm mb-4">
          Add an extra layer of security to your FutureLeap AI account.
        </p>

        <button
          disabled
          className="px-5 py-3 rounded-xl border border-purple-400/20 bg-purple-400/10 text-purple-300 font-700 cursor-not-allowed"
        >
          Coming Soon
        </button>
      </div>

      <div className="glass-card p-6 border border-red-400/20">
        <div className="flex items-center gap-2 mb-3">
          <Trash2 className="w-4 h-4 text-red-400" />
          <h3 className="text-white font-700">Delete Account</h3>
        </div>

        <p className="text-slate-500 text-sm mb-4">
          Permanently delete your account and saved data. This action cannot be undone.
        </p>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-5 py-3 rounded-xl bg-red-500/10 border border-red-400/20 text-red-300 font-700 hover:bg-red-500/20 transition"
          >
            Delete Account
          </button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/10 p-4">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
              <p className="text-red-200 text-sm">
                Type <span className="font-800">DELETE</span> to confirm account deletion.
              </p>
            </div>

            <input
              type="text"
              className="w-full rounded-xl bg-dark-900 border border-white/10 px-4 py-3 text-white outline-none focus:border-red-400/50"
              placeholder="Type DELETE"
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                className="px-5 py-3 rounded-xl bg-red-500 text-white font-800 hover:bg-red-400 transition"
              >
                Confirm Delete
              </button>

              <button
                onClick={() => {
                  setShowDeleteConfirm(false)
                  setDeleteText('')
                }}
                className="px-5 py-3 rounded-xl border border-white/10 text-slate-300 font-700 hover:bg-white/5 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}