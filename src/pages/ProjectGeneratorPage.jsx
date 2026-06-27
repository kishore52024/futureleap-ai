import SearchableMultiSelect from '../components/common/SearchableMultiSelect'
import { SKILL_OPTIONS, INTEREST_OPTIONS } from '../config/projectSuggestions'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lightbulb, Sparkles, Save, Trash2, ChevronDown,
  Code2, Layers, Clock, BookOpen
} from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import { useAuth } from '../hooks/useAuth'
import { PLAN_LIMITS } from '../config/plans'
import { generateProjectIdea } from '../lib/openai'
import {
  saveProject,
  getSavedProjects,
  deleteProject,
  getSubscription,
  getMonthlyUsage,
  trackUsage
} from '../lib/supabase'

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced']
const DOMAINS = ['Web App', 'Mobile App', 'AI/ML', 'Data Science', 'Blockchain', 'Game Dev', 'IoT', 'Cybersecurity', 'Open Source', 'SaaS Product']

function ResultCard({ data, onSave, onNew, saving }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">

      <div className="glass-card p-6" style={{ borderColor: 'rgba(0,229,255,0.2)', boxShadow: '0 0 30px rgba(0,229,255,0.06)' }}>
        <div className="flex gap-2 mb-2 flex-wrap">
          <span className="text-xs bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 px-2 py-0.5 rounded-full font-mono">{data.domain}</span>
          <span className="text-xs bg-purple-400/10 text-purple-400 border border-purple-400/20 px-2 py-0.5 rounded-full font-mono">{data.difficulty}</span>
          <span className="text-xs bg-green-400/10 text-green-400 border border-green-400/20 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
            <Clock className="w-3 h-3" /> {data.timeline}
          </span>
        </div>

        <h2 className="font-display font-800 text-2xl text-white">{data.title}</h2>
        <p className="text-slate-400 text-sm mt-1 italic">"{data.tagline}"</p>
        <p className="text-slate-300 text-sm mt-4 leading-relaxed border-t border-white/[0.06] pt-4">{data.problem}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-card p-5">
          <h3 className="font-display font-700 text-sm text-white mb-4">🎯 Objectives</h3>
          <p className="text-slate-300 text-sm mb-3">{data.objectives?.primary}</p>
          <ul className="space-y-2">
            {data.objectives?.secondary?.map((obj, i) => (
              <li key={i} className="text-sm text-slate-400">• {obj}</li>
            ))}
          </ul>
          <p className="text-xs text-green-400 mt-3">
            Outcome: {data.objectives?.expectedOutcome}
          </p>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-display font-700 text-sm text-white mb-4">👥 Target Users</h3>
          <ul className="space-y-2">
            {data.targetUsers?.map((user, i) => (
              <li key={i} className="text-sm text-slate-300">• {user}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="font-display font-700 text-sm text-white mb-3">🏢 Industry Relevance</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {data.industryRelevance?.industries?.map((industry, i) => (
            <span key={i} className="text-xs bg-purple-400/10 text-purple-400 border border-purple-400/20 px-2 py-1 rounded-full">
              {industry}
            </span>
          ))}
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{data.industryRelevance?.description}</p>
      </div>

      <div className="glass-card p-5">
        <h3 className="font-display font-700 text-sm text-white mb-4">📅 Day-wise Development Plan</h3>
        <div className="space-y-4">
          {data.dayWisePlan?.map((day, i) => (
            <div key={i} className="border-l-2 border-cyan-400/30 pl-4">
              <div className="text-cyan-400 font-display font-700 text-sm">
                {day.day} — {day.title}
              </div>
              <ul className="mt-2 space-y-1">
                {day.tasks?.map((task, index) => (
                  <li key={index} className="text-sm text-slate-300">• {task}</li>
                ))}
              </ul>
              <p className="text-xs text-green-400 mt-2">
                Deliverable: {day.deliverable}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="font-display font-700 text-sm text-white mb-4">🚀 Development Phases</h3>
        <div className="space-y-4">
          {data.developmentPhases?.map((phase, i) => (
            <div key={i} className="border-l-2 border-purple-400/30 pl-4">
              <div className="text-purple-400 font-display font-700 text-sm">
                {phase.phase} — {phase.title}
              </div>
              <p className="text-sm text-slate-300 mt-1">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="font-display font-700 text-sm text-white mb-4">🧠 Skills You'll Learn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h4 className="text-cyan-400 font-display font-700 text-sm mb-3">Technical Skills</h4>
            <ul className="space-y-2">
              {data.skillsLearned?.technical?.map((skill, i) => (
                <li key={i} className="text-sm text-slate-300">✅ {skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-green-400 font-display font-700 text-sm mb-3">Soft Skills</h4>
            <ul className="space-y-2">
              {data.skillsLearned?.softSkills?.map((skill, i) => (
                <li key={i} className="text-sm text-slate-300">✅ {skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="font-display font-700 text-sm text-white mb-4">💼 Resume Value</h3>
        <span className="text-xs bg-green-400/10 text-green-400 border border-green-400/20 px-2 py-1 rounded-full">
          {data.resumeValue?.rating}
        </span>
        <p className="text-sm text-slate-300 leading-relaxed my-4">{data.resumeValue?.description}</p>

        <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
          <p className="text-xs text-slate-500 mb-2">Resume Bullet</p>
          <p className="text-sm text-slate-300">{data.resumeValue?.resumeBullet}</p>
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="font-display font-700 text-sm text-white mb-4">💰 Estimated Cost</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-green-400 mb-2">Free Tools</p>
            <ul className="space-y-1">
              {data.estimatedCost?.freeTools?.map((tool, i) => (
                <li key={i} className="text-sm text-slate-300">• {tool}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs text-yellow-400 mb-2">Paid Tools</p>
            <ul className="space-y-1">
              {data.estimatedCost?.paidTools?.map((tool, i) => (
                <li key={i} className="text-sm text-slate-300">• {tool}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs text-cyan-400 mb-2">Approx Cost</p>
            <p className="text-xl font-display font-800 text-white">{data.estimatedCost?.approxCost}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-card p-5">
          <h3 className="font-display font-700 text-sm text-white mb-4">📚 Documentation Checklist</h3>
          <ul className="space-y-2">
            {data.documentationChecklist?.map((item, i) => (
              <li key={i} className="text-sm text-slate-300">✅ {item}</li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-display font-700 text-sm text-white mb-4">🎤 PPT Checklist</h3>
          <ul className="space-y-2">
            {data.pptChecklist?.map((item, i) => (
              <li key={i} className="text-sm text-slate-300">✅ {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-card p-5">
          <h3 className="font-display font-700 text-sm text-white flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-cyan-400" /> Core Features
          </h3>
          <ul className="space-y-2">
            {[
              ...(data.features?.essential || []),
              ...(data.features?.advanced || []),
              ...(data.features?.bonus || [])
            ].map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="w-5 h-5 rounded-md bg-cyan-400/10 text-cyan-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">{i + 1}</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-display font-700 text-sm text-white flex items-center gap-2 mb-4">
            <Code2 className="w-4 h-4 text-green-400" /> Tech Stack
          </h3>
          <div className="space-y-2">
            {Object.entries(data.techStack || {}).map(([key, val]) => (
              <div key={key} className="flex justify-between items-center gap-3 text-sm">
                <span className="text-slate-500 capitalize">{key}</span>
                <span className="text-slate-300 font-mono text-xs bg-white/[0.04] px-2 py-0.5 rounded text-right">
                  {Array.isArray(val) ? val.join(', ') : val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onSave} disabled={saving} className="btn-primary flex-1 justify-center disabled:opacity-60">
          {saving ? <span className="w-4 h-4 rounded-full border-2 border-dark-950 border-t-transparent animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving…' : 'Save Blueprint'}
        </button>

        <button onClick={onNew} className="btn-ghost px-4">
          Generate Another
        </button>
      </div>
    </motion.div>
  )
}

export default function ProjectGeneratorPage() {
  const { user } = useAuth()

  const [form, setForm] = useState({
    skills: [],
    interests: [],
    difficulty: 'Intermediate',
    domain: 'Web App'
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [savedProjects, setSavedProjects] = useState([])
  const [showSaved, setShowSaved] = useState(false)
  const [subscription, setSubscription] = useState(null)

  useEffect(() => {
    if (!user) return

    getSubscription(user.id).then(({ data }) => {
      if (data) setSubscription(data)
    })

    getSavedProjects(user.id).then(({ data }) => {
      if (data) setSavedProjects(data)
    })
  }, [user])

  const handleGenerate = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    setSaved(false)

    if (!user) {
      setError('Please login to generate project blueprints.')
      return
    }

    if (form.skills.length === 0) {
      setError('Please select at least one skill.')
      return
    }

    if (form.interests.length === 0) {
      setError('Please select at least one interest.')
      return
    }

    const plan = subscription?.plan || 'free'
    const limit = PLAN_LIMITS[plan]?.project ?? PLAN_LIMITS.free.project

    const { count, error: usageError } = await getMonthlyUsage(user.id, 'project')

    if (usageError) {
      setError(usageError.message)
      return
    }

    if (limit !== Infinity && count >= limit) {
      setError('🚀 You reached your monthly Project Generator limit. Upgrade your plan to continue.')
      return
    }

    setLoading(true)

    try {
      const data = await generateProjectIdea({
        ...form,
        skills: form.skills.join(', '),
        interests: form.interests.join(', ')
      })

      setResult(data)
      await trackUsage(user.id, 'project')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!result || !user) return

    setSaving(true)

    const { error: err } = await saveProject(user.id, {
      title: result.title,
      tagline: result.tagline,
      domain: result.domain,
      difficulty: result.difficulty,
      data: result,
    })

    setSaving(false)

    if (!err) {
      setSaved(true)
      getSavedProjects(user.id).then(({ data }) => {
        if (data) setSavedProjects(data)
      })
    }
  }

  const handleDelete = async (id) => {
    await deleteProject(id)
    setSavedProjects(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-2">
              <Lightbulb className="w-3.5 h-3.5 text-cyan-400" /> AI Tool
            </div>
            <h1 className="font-display font-800 text-3xl text-white">AI Project Blueprint Generator</h1>
            <p className="text-slate-500 text-sm mt-1">
              Tell us about yourself and get a complete project blueprint in seconds.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleGenerate}
                className="glass-card p-6 space-y-5 sticky top-6"
              >
                <div>
                  <label className="block text-xs font-display font-600 text-slate-400 mb-2">Your Skills</label>
                  <SearchableMultiSelect
                    options={SKILL_OPTIONS}
                    value={form.skills}
                    onChange={(selected) => setForm({ ...form, skills: selected })}
                    placeholder="Search and select your skills..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-display font-600 text-slate-400 mb-2">Interests</label>
                  <SearchableMultiSelect
                    options={INTEREST_OPTIONS}
                    value={form.interests}
                    onChange={(selected) => setForm({ ...form, interests: selected })}
                    placeholder="Search and select your interests..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-display font-600 text-slate-400 mb-2">Difficulty</label>
                  <div className="flex gap-2">
                    {DIFFICULTIES.map(d => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => setForm({ ...form, difficulty: d })}
                        className={`flex-1 py-2 rounded-lg text-xs font-display font-600 border transition-all ${
                          form.difficulty === d
                            ? 'bg-cyan-400/10 border-cyan-400/30 text-cyan-400'
                            : 'bg-white/[0.03] border-white/[0.08] text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-display font-600 text-slate-400 mb-2">Domain</label>
                  <div className="relative">
                    <select
                      className="input-field appearance-none pr-8"
                      value={form.domain}
                      onChange={e => setForm({ ...form, domain: e.target.value })}
                    >
                      {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-dark-950 border-t-transparent animate-spin" />
                      Generating…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Generate Blueprint
                    </span>
                  )}
                </button>
              </motion.form>
            </div>

            <div className="lg:col-span-3">
              {error && (
                <div className="glass-card p-4 border-red-500/20 bg-red-500/5 text-red-400 text-sm mb-4">
                  {error}
                </div>
              )}

              {loading && !result && (
                <div className="glass-card p-10 text-center">
                  <div className="w-10 h-10 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mx-auto mb-4" />
                  <p className="text-slate-400 text-sm">AI is crafting your complete project blueprint…</p>
                  <p className="text-slate-600 text-xs mt-1">This takes about 5–10 seconds</p>
                </div>
              )}

              {result && !loading && (
                <ResultCard
                  data={result}
                  onSave={handleSave}
                  onNew={() => { setResult(null); setSaved(false) }}
                  saving={saving}
                />
              )}

              {saved && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-center text-sm text-green-400">
                  ✅ Project blueprint saved to your dashboard!
                </motion.div>
              )}

              {!result && !loading && !error && (
                <div className="glass-card p-10 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="font-display font-700 text-white mb-2">Ready to generate</h3>
                  <p className="text-slate-500 text-sm">Fill in your details and click Generate Blueprint.</p>
                </div>
              )}
            </div>
          </div>

          {savedProjects.length > 0 && (
            <div className="mt-10">
              <button
                onClick={() => setShowSaved(!showSaved)}
                className="flex items-center gap-2 text-sm font-display font-700 text-white mb-4"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Saved Projects ({savedProjects.length})
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${showSaved ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showSaved && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-3">
                    {savedProjects.map(p => (
                      <div key={p.id} className="glass-card p-4 flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-600 text-sm text-white truncate">{p.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {p.domain} · {p.difficulty} · {new Date(p.created_at).toLocaleDateString()}
                          </div>
                        </div>

                        <button
                          onClick={() => handleDelete(p.id)}
                          className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}