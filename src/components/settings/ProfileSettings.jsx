import { useState } from 'react'
import { User, Mail, Phone, Save } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'

export default function ProfileSettings() {
  const { user } = useAuth()

  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '')
  const [phone, setPhone] = useState(user?.user_metadata?.phone || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        phone: phone,
      },
    })

    setLoading(false)

    if (error) {
      setMessage(`❌ ${error.message}`)
    } else {
      setMessage('✅ Profile updated successfully!')
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-800 text-xl text-white">Profile Settings</h2>
        <p className="text-slate-500 text-sm mt-1">
          Manage your personal account details.
        </p>
      </div>

      <div className="glass-card p-5 space-y-4">
        <div>
          <label className="block text-xs text-slate-400 mb-2">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              className="input-field pl-10"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-2">Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              className="input-field pl-10 opacity-70 cursor-not-allowed"
              value={user?.email || ''}
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              className="input-field pl-10"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {message && (
          <p className="text-sm text-slate-300">
            {message}
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={loading}
          className="btn-primary disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}