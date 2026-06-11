import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Sparkles, Clock, DollarSign, Award, Building2, BookOpen, Code2, ChevronRight } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import { useAuth } from '../hooks/useAuth'
import { generateCareerPath } from '../lib/openai'
import { saveCareerPath } from '../lib/supabase'

function PhaseCard({ phase, index }) {
  const colors = [
    { text: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20', dot: 'bg-cyan-400' },
    { text: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20', dot: 'bg-green-400' },
    { text: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', dot: 'bg-purple-400' },
  ]
  const c = colors[index % colors.length]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15 }}
      className="relative flex gap-5"
    >
      {/* Timeline line */}
      {index < 2 && (
        <div className="absolute left-5 top-12 bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent" />
      )}

      {/* Number */}
      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 mt-1 ${c.bg} ${c.border}`}>
        <span className={`font-display font-800 text-sm ${c.text}`}>{phase.phase}</span>
      </div>

      <div className="flex-1 pb-8">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`font-display font-700 text-base ${c.text}`}>{phase.title}</h3>
          <span className="text-xs text-slate-500 bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />{phase.duration}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
          {/* Skills */}
          <div className="glass-card p-4">
            <div className="text-xs font-display font-600 text-slate-400 flex items-center gap-1.5 mb-2">
              <Code2 className="w-3 h-3" /> Skills to Learn
            </div>
            <ul className="space-y-1">
              {phase.skills?.map((s, i) => (
                <li key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span className={`w-1 h-1 rounded-full flex-shrink-0 ${c.dot}`} />{s}
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="glass-card p-4">
            <div className="text-xs font-display font-600 text-slate-400 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3 h-3" /> Projects to Build
            </div>
            <ul className="space-y-1">
              {phase.projects?.map((p, i) => (
                <li key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <ChevronRight className="w-3 h-3 text-slate-600 flex-shrink-0" />{p}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="glass-card p-4">
            <div className="text-xs font-display font-600 text-slate-400 flex items-center gap-1.5 mb-2">
              <BookOpen className="w-3 h-3" /> Resources
            </div>
            <ul className="space-y-1">
              {phase.resources?.map((r, i) => (
                <li key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span className="w-1 h-1 rounded-full bg-slate-600 flex-shrink-0" />{r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CareerPathPage() {
  const { user } = useAuth()
  const [form, setForm] = useState({ currentSkills: '', targetJob: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  const handleGenerate = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    setSaved(false)
    setLoading(true)
    try {
      const data = await generateCareerPath(form)
      setResult(data)
      if (user) {
        await saveCareerPath(user.id, data)
        setSaved(true)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-2">
              <MapPin className="w-3.5 h-3.5 text-purple-400" /> AI Tool
            </div>
            <h1 className="font-display font-800 text-3xl text-white">Career Path Guider</h1>
            <p className="text-slate-500 text-sm mt-1">From where you are today to your dream job — step by step.</p>
          </motion.div>

          {!result ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleGenerate}
              className="glass-card p-8 max-w-xl space-y-6"
            >
              <div>
                <label className="block text-xs font-display font-600 text-slate-400 mb-2">Current Skills</label>
                <textarea
                  required
                  rows={3}
                  className="input-field resize-none"
                  placeholder="HTML, CSS, basic JavaScript, some Python, Figma basics…"
                  value={form.currentSkills}
                  onChange={e => setForm({ ...form, currentSkills: e.target.value })}
                />
                <p className="text-xs text-slate-600 mt-1.5">Be specific — include tools, languages, and experience level.</p>
              </div>
              <div>
                <label className="block text-xs font-display font-600 text-slate-400 mb-2">Target Job Role</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="Full-Stack Developer, ML Engineer, Product Manager…"
                  value={form.targetJob}
                  onChange={e => setForm({ ...form, targetJob: e.target.value })}
                />
              </div>

              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-dark-950 border-t-transparent animate-spin" />
                    Building your roadmap…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Generate Career Path
                  </span>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Overview */}
              <div className="glass-card p-6"
                style={{ borderColor: 'rgba(191,90,242,0.2)', boxShadow: '0 0 30px rgba(191,90,242,0.06)' }}
              >
                <div className="flex flex-wrap items-start gap-4">
                  <div className="flex-1">
                    <h2 className="font-display font-800 text-2xl text-white mb-1">{result.targetRole}</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">{result.overview}</p>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] min-w-[80px]">
                      <div className="flex items-center gap-1 justify-center text-purple-400 mb-1">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <div className="font-display font-700 text-sm text-white">{result.estimatedTime}</div>
                      <div className="text-xs text-slate-600">Timeline</div>
                    </div>
                    {result.salaryRange && (
                      <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] min-w-[80px]">
                        <div className="flex items-center gap-1 justify-center text-green-400 mb-1">
                          <DollarSign className="w-3.5 h-3.5" />
                        </div>
                        <div className="font-display font-700 text-xs text-white">{result.salaryRange}</div>
                        <div className="text-xs text-slate-600">Salary</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Phases */}
              <div className="glass-card p-6">
                <h3 className="font-display font-700 text-lg text-white mb-6">Your Roadmap</h3>
                <div>
                  {result.phases?.map((phase, i) => (
                    <PhaseCard key={i} phase={phase} index={i} />
                  ))}
                </div>
              </div>

              {/* Companies + Certs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {result.topCompanies?.length > 0 && (
                  <div className="glass-card p-5">
                    <h3 className="font-display font-700 text-sm text-white flex items-center gap-2 mb-3">
                      <Building2 className="w-4 h-4 text-cyan-400" /> Top Companies Hiring
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.topCompanies.map(c => (
                        <span key={c} className="text-xs bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 px-2.5 py-1 rounded-full">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
                {result.certifications?.length > 0 && (
                  <div className="glass-card p-5">
                    <h3 className="font-display font-700 text-sm text-white flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-yellow-400" /> Recommended Certifications
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.certifications.map(c => (
                        <span key={c} className="text-xs bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-2.5 py-1 rounded-full">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {saved && (
                <p className="text-center text-sm text-green-400">✅ Career path saved to dashboard!</p>
              )}

              <button
                onClick={() => { setResult(null); setSaved(false) }}
                className="btn-ghost w-full justify-center"
              >
                Generate Another Path
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
