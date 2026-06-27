import { Lock, Shield, Trash2 } from 'lucide-react'

export default function PrivacySettings() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-800 text-xl text-white">Privacy & Security</h2>
        <p className="text-slate-500 text-sm mt-1">
          Manage your account security settings.
        </p>
      </div>

      <div className="glass-card p-5 space-y-4">
        <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] text-left">
          <Lock className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-white font-display">Change Password</h3>
            <p className="text-slate-500 text-sm">Update your login password.</p>
          </div>
        </button>

        <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] text-left">
          <Shield className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-white font-display">Two-Factor Authentication</h3>
            <p className="text-slate-500 text-sm">Coming soon.</p>
          </div>
        </button>

        <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-left">
          <Trash2 className="w-5 h-5 text-red-400" />
          <div>
            <h3 className="text-red-400 font-display">Delete Account</h3>
            <p className="text-slate-500 text-sm">Permanently delete your account.</p>
          </div>
        </button>
      </div>
    </div>
  )
}