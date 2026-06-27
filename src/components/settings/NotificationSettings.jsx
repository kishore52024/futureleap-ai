import { useState } from 'react'

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    email: localStorage.getItem('notify_email') !== 'false',
    product: localStorage.getItem('notify_product') !== 'false',
    marketing: localStorage.getItem('notify_marketing') === 'true',
  })

  const toggle = (key) => {
    const updated = { ...settings, [key]: !settings[key] }
    setSettings(updated)

    localStorage.setItem('notify_email', updated.email)
    localStorage.setItem('notify_product', updated.product)
    localStorage.setItem('notify_marketing', updated.marketing)
  }

  const rows = [
    { key: 'email', title: 'Email Notifications', desc: 'Receive important account updates.' },
    { key: 'product', title: 'Product Updates', desc: 'Be notified about new FutureLeap AI features.' },
    { key: 'marketing', title: 'Marketing Emails', desc: 'Receive offers and announcements.' },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-800 text-xl text-white">Notifications</h2>
        <p className="text-slate-500 text-sm mt-1">
          Choose which notifications you want to receive.
        </p>
      </div>

      <div className="glass-card p-5 space-y-5">
        {rows.map((row) => (
          <div key={row.key} className="flex justify-between items-center gap-4">
            <div>
              <h3 className="text-white font-display">{row.title}</h3>
              <p className="text-slate-500 text-sm">{row.desc}</p>
            </div>

            <button
              onClick={() => toggle(row.key)}
              className={`w-12 h-6 rounded-full p-1 transition-all ${
                settings[row.key] ? 'bg-cyan-400' : 'bg-white/10'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  settings[row.key] ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}