import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Upload, Sparkles, CheckCircle, XCircle, AlertCircle, Tag } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import { useAuth } from '../hooks/useAuth'
import { analyzeResume } from '../lib/openai'
import { saveResumeAnalysis } from '../lib/supabase'

function ScoreRing({ score }) {
  const color = score >= 80 ? '#00ff87' : score >= 60 ? '#00e5ff' : '#bf5af2'
  const radius = 54
  const circ = 2 * Math.PI * radius
  const offset = circ - (score / 100) * circ

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
        <motion.circle
          cx="70" cy="70" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          transform="rotate(-90 70 70)"
          style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
        />
      </svg>
      <div className="absolute text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-display font-800 text-3xl"
          style={{ color }}
        >
          {score}
        </motion.div>
        <div className="text-xs text-slate-500">/ 100</div>
      </div>
    </div>
  )
}

export default function ResumeAnalyzerPage() {
  const { user } = useAuth()
  const [resumeText, setResumeText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [fileName, setFileName] = useState('')

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (ev) => setResumeText(ev.target.result)
    reader.readAsText(file)
  }

  const handleAnalyze = async (e) => {
    e.preventDefault()
    if (!resumeText.trim()) return setError('Please paste your resume text or upload a .txt file.')
    setError('')
    setResult(null)
    setSaved(false)
    setLoading(true)
    try {
      const data = await analyzeResume(resumeText)
      setResult(data)
      if (user) {
        await saveResumeAnalysis(user.id, { score: data.score, grade: data.grade, summary: data.summary })
      }
      setSaved(true)
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
        <div className="max-w-4xl mx-auto px-6 py-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-2">
              <FileText className="w-3.5 h-3.5 text-green-400" /> AI Tool
            </div>
            <h1 className="font-display font-800 text-3xl text-white">Resume Analyzer</h1>
            <p className="text-slate-500 text-sm mt-1">Get a recruiter-level review of your resume in seconds.</p>
          </motion.div>

          {!result ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleAnalyze}
              className="glass-card p-8 space-y-6"
            >
              {/* File upload */}
              <div>
                <label className="block text-xs font-display font-600 text-slate-400 mb-2">
                  Upload Resume (.txt) — or paste text below
                </label>
                <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-white/[0.1] rounded-xl cursor-pointer hover:border-green-400/30 hover:bg-green-400/[0.03] transition-all duration-200 group">
                  <Upload className="w-6 h-6 text-slate-600 group-hover:text-green-400 transition-colors mb-2" />
                  <span className="text-sm text-slate-500 group-hover:text-slate-300 transition-colors">
                    {fileName ? `📄 ${fileName}` : 'Drop .txt file or click to browse'}
                  </span>
                  <input type="file" accept=".txt" className="hidden" onChange={handleFile} />
                </label>
              </div>

              <div>
                <label className="block text-xs font-display font-600 text-slate-400 mb-2">
                  Or Paste Resume Text
                </label>
                <textarea
                  rows={12}
                  className="input-field resize-none font-mono text-xs"
                  placeholder="Paste your entire resume here — work experience, education, skills, projects…"
                  value={resumeText}
                  onChange={e => setResumeText(e.target.value)}
                />
              </div>

              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-dark-950 border-t-transparent animate-spin" />
                    Analyzing your resume…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Analyze Resume
                  </span>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Score overview */}
              <div className="glass-card p-8 flex flex-col sm:flex-row items-center gap-8"
                style={{ borderColor: 'rgba(0,255,135,0.2)', boxShadow: '0 0 30px rgba(0,255,135,0.06)' }}
              >
                <ScoreRing score={result.score} />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center gap-3 justify-center sm:justify-start mb-2">
                    <span className="font-display font-800 text-4xl text-white">{result.grade}</span>
                    <span className="text-sm text-slate-400">Grade</span>
                    {result.atsScore && (
                      <span className="text-xs bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 px-2 py-0.5 rounded-full font-mono">
                        ATS: {result.atsScore}/100
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{result.summary}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Strengths */}
                <div className="glass-card p-5">
                  <h3 className="font-display font-700 text-sm text-white flex items-center gap-2 mb-4">
                    <CheckCircle className="w-4 h-4 text-green-400" /> Strengths
                  </h3>
                  <ul className="space-y-2">
                    {result.strengths?.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="glass-card p-5">
                  <h3 className="font-display font-700 text-sm text-white flex items-center gap-2 mb-4">
                    <XCircle className="w-4 h-4 text-red-400" /> Weaknesses
                  </h3>
                  <ul className="space-y-2">
                    {result.weaknesses?.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suggestions */}
              <div className="glass-card p-5">
                <h3 className="font-display font-700 text-sm text-white flex items-center gap-2 mb-4">
                  <AlertCircle className="w-4 h-4 text-yellow-400" /> Improvement Suggestions
                </h3>
                <div className="space-y-3">
                  {result.suggestions?.map((s, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="w-6 h-6 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-yellow-400 font-mono">{i + 1}</span>
                      </div>
                      <div>
                        <div className="text-xs font-display font-600 text-yellow-400 mb-0.5">{s.area}</div>
                        <div className="text-sm text-slate-300">{s.tip}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              {(result.keywordsFound?.length || result.keywordsMissing?.length) ? (
                <div className="glass-card p-5">
                  <h3 className="font-display font-700 text-sm text-white flex items-center gap-2 mb-4">
                    <Tag className="w-4 h-4 text-cyan-400" /> ATS Keywords
                  </h3>
                  <div className="space-y-3">
                    {result.keywordsFound?.length > 0 && (
                      <div>
                        <p className="text-xs text-slate-500 mb-2">✅ Found</p>
                        <div className="flex flex-wrap gap-2">
                          {result.keywordsFound.map(k => (
                            <span key={k} className="text-xs bg-green-400/10 text-green-400 border border-green-400/20 px-2 py-0.5 rounded-full">{k}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.keywordsMissing?.length > 0 && (
                      <div>
                        <p className="text-xs text-slate-500 mb-2">❌ Missing</p>
                        <div className="flex flex-wrap gap-2">
                          {result.keywordsMissing.map(k => (
                            <span key={k} className="text-xs bg-red-400/10 text-red-400 border border-red-400/20 px-2 py-0.5 rounded-full">{k}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}

              <button
                onClick={() => { setResult(null); setResumeText(''); setFileName(''); setSaved(false) }}
                className="btn-ghost w-full justify-center"
              >
                Analyze Another Resume
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
