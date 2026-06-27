import { useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'

export default function AppearanceSettings() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

  const handleThemeSelect = (value) => {
    setTheme(value)
    localStorage.setItem('theme', value)
  }

  const options = [
    { id: 'light', label: 'Light', icon: Sun, desc: 'Save light preference' },
    { id: 'dark', label: 'Dark', icon: Moon, desc: 'Save dark preference' },
    { id: 'system', label: 'System', icon: Monitor, desc: 'Save system preference' },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-800 text-xl text-white">Appearance</h2>
        <p className="text-slate-500 text-sm mt-1">
          Choose your display preference. UI theme will stay same for now.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleThemeSelect(option.id)}
            className={`glass-card p-5 text-left hover:border-cyan-400/30 transition-all ${
              theme === option.id ? 'border border-cyan-400/30 bg-cyan-400/5' : ''
            }`}
          >
            <option.icon className="w-8 h-8 text-cyan-400 mb-3" />
            <h3 className="text-white font-display">{option.label}</h3>
            <p className="text-slate-500 text-xs mt-2">{option.desc}</p>
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-500">
        Selected preference: <span className="text-cyan-400">{theme}</span>
      </p>
    </div>
  )
}