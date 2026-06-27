import { useState } from 'react'
import { Languages, Check } from 'lucide-react'

export default function LanguageSettings() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'English')

  const languages = ['English', 'తెలుగు', 'हिन्दी', 'தமிழ்']

  const handleSelect = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-800 text-xl text-white">Language</h2>
        <p className="text-slate-500 text-sm mt-1">
          Choose your preferred language. App translation will be added later.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => handleSelect(lang)}
            className={`glass-card p-5 text-left flex items-center justify-between hover:border-cyan-400/30 transition-all ${
              language === lang ? 'border border-cyan-400/30 bg-cyan-400/5' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <Languages className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-display">{lang}</span>
            </div>

            {language === lang && <Check className="w-5 h-5 text-cyan-400" />}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-500">
        Selected language: <span className="text-cyan-400">{language}</span>
      </p>
    </div>
  )
}