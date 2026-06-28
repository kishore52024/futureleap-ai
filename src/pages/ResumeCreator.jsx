import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FileText,
  Sparkles,
  User,
  GraduationCap,
  Briefcase,
  Rocket,
  Code2,
  Award,
  Download,
  Crown,
  Lock,
  CheckCircle
} from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import { useAuth } from '../hooks/useAuth'
import { getSubscription } from '../lib/supabase'

export default function ResumeCreator() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState(null)
  const [checkingPlan, setCheckingPlan] = useState(true)

  const [form, setForm] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    portfolio: '',
    education: '',
    experience: '',
    projects: '',
    skills: '',
    certifications: '',
    achievements: ''
  })

  const [generated, setGenerated] = useState(false)

  useEffect(() => {
    if (!user) {
      setCheckingPlan(false)
      return
    }

    getSubscription(user.id).then(({ data }) => {
      if (data) setSubscription(data)
      setCheckingPlan(false)
    })
  }, [user])

  const plan = subscription?.plan || 'free'
  const isPremium = plan !== 'free'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleGenerate = (e) => {
    e.preventDefault()
    setGenerated(true)
  }

  if (checkingPlan) {
    return (
      <div className="flex min-h-screen bg-dark-950">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-slate-500 text-sm">Checking your plan...</div>
        </main>
      </div>
    )
  }

  if (!isPremium) {
    return (
      <div className="flex min-h-screen bg-dark-950">
        <Sidebar />

        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-5">
                <Lock className="w-8 h-8 text-yellow-400" />
              </div>

              <p className="text-xs text-yellow-400 font-mono mb-2">
                PRO FEATURE
              </p>

              <h1 className="font-display font-800 text-3xl text-white mb-3">
                Resume Creator is for Pro Users
              </h1>

              <p className="text-slate-500 text-sm max-w-2xl mx-auto mb-6">
                Create professional ATS-friendly resumes with AI, generate clean previews,
                and unlock premium resume tools for internships and jobs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-7">
                {[
                  'AI-powered resume creation',
                  'ATS-friendly resume structure',
                  'Professional resume preview',
                  'Internship and job-ready format',
                  'PDF export support soon',
                  'Multiple templates coming soon'
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 text-dark-950 font-800 hover:bg-cyan-300 transition"
              >
                <Crown className="w-4 h-4" />
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-2">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              AI Tool
              <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                PRO
              </span>
            </div>
            <h1 className="font-display font-800 text-3xl text-white">
              Resume Creator
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Build a clean, ATS-friendly resume for internships and jobs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.form
              onSubmit={handleGenerate}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6 space-y-5"
            >
              <SectionTitle icon={User} title="Personal Information" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="name" label="Full Name" value={form.name} onChange={handleChange} />
                <Input name="title" label="Professional Title" value={form.title} onChange={handleChange} />
                <Input name="email" label="Email" value={form.email} onChange={handleChange} />
                <Input name="phone" label="Phone" value={form.phone} onChange={handleChange} />
                <Input name="linkedin" label="LinkedIn" value={form.linkedin} onChange={handleChange} />
                <Input name="github" label="GitHub" value={form.github} onChange={handleChange} />
              </div>

              <Input name="portfolio" label="Portfolio Website" value={form.portfolio} onChange={handleChange} />

              <SectionTitle icon={GraduationCap} title="Education" />
              <Textarea name="education" label="Education Details" placeholder="Example: B.Tech AI, Dr. M.G.R University, 2023–2027, CGPA..." value={form.education} onChange={handleChange} />

              <SectionTitle icon={Briefcase} title="Experience" />
              <Textarea name="experience" label="Experience / Internship" placeholder="Example: Data Analytics Intern at Cognifyz Technologies..." value={form.experience} onChange={handleChange} />

              <SectionTitle icon={Rocket} title="Projects" />
              <Textarea name="projects" label="Projects" placeholder="Example: FutureLeap AI - AI SaaS platform for students..." value={form.projects} onChange={handleChange} />

              <SectionTitle icon={Code2} title="Skills" />
              <Textarea name="skills" label="Skills" placeholder="Example: React, Tailwind CSS, Supabase, Python, SQL..." value={form.skills} onChange={handleChange} />

              <SectionTitle icon={Award} title="Certifications & Achievements" />
              <Textarea name="certifications" label="Certifications" placeholder="Example: Google Data Analytics, NPTEL, Coursera..." value={form.certifications} onChange={handleChange} />
              <Textarea name="achievements" label="Achievements" placeholder="Example: Hackathon finalist, built AI SaaS project..." value={form.achievements} onChange={handleChange} />

              <button type="submit" className="btn-primary w-full justify-center">
                <Sparkles className="w-4 h-4" />
                Generate Resume Preview
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-display font-800 text-xl text-white">
                    Resume Preview
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Live preview of your generated resume.
                  </p>
                </div>

                <button disabled className="px-4 py-2 rounded-xl border border-white/10 text-slate-500 text-sm cursor-not-allowed flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  PDF Soon
                </button>
              </div>

              {!generated ? (
                <div className="h-[600px] rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-center p-6">
                  <div>
                    <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">
                      Fill the form and click Generate Resume Preview.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white text-slate-900 rounded-2xl p-8 min-h-[600px]">
                  <div className="border-b border-slate-300 pb-4 mb-5">
                    <h1 className="text-3xl font-bold">{form.name || 'Your Name'}</h1>
                    <p className="text-slate-600 font-medium mt-1">{form.title || 'Professional Title'}</p>
                    <p className="text-xs text-slate-500 mt-3">
                      {form.email} {form.phone && ` | ${form.phone}`}
                    </p>
                    <p className="text-xs text-slate-500">
                      {form.linkedin} {form.github && ` | ${form.github}`}
                    </p>
                    {form.portfolio && <p className="text-xs text-slate-500">{form.portfolio}</p>}
                  </div>

                  <ResumeSection title="Education" content={form.education} />
                  <ResumeSection title="Experience" content={form.experience} />
                  <ResumeSection title="Projects" content={form.projects} />
                  <ResumeSection title="Skills" content={form.skills} />
                  <ResumeSection title="Certifications" content={form.certifications} />
                  <ResumeSection title="Achievements" content={form.achievements} />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <Icon className="w-4 h-4 text-cyan-400" />
      <h3 className="text-white font-display font-700 text-sm">{title}</h3>
    </div>
  )
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-display font-600 text-slate-400 mb-2">
        {label}
      </label>
      <input name={name} value={value} onChange={onChange} className="input-field" placeholder={label} />
    </div>
  )
}

function Textarea({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-display font-600 text-slate-400 mb-2">
        {label}
      </label>
      <textarea name={name} value={value} onChange={onChange} rows={4} className="input-field resize-none text-sm" placeholder={placeholder} />
    </div>
  )
}

function ResumeSection({ title, content }) {
  if (!content) return null

  return (
    <div className="mb-5">
      <h2 className="text-sm font-bold uppercase tracking-wide text-slate-800 border-b border-slate-200 pb-1 mb-2">
        {title}
      </h2>
      <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
        {content}
      </p>
    </div>
  )
}