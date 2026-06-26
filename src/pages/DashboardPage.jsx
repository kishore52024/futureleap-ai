import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PLAN_LIMITS, PLAN_NAMES } from '../config/plans'
import { Lightbulb, FileText, MapPin, ArrowRight, Sparkles, TrendingUp, Clock } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import { useAuth } from '../hooks/useAuth'
import {
  getUserStats,
  getSavedProjects,
  getSubscription,
  getMonthlyUsage,
} from '../lib/supabase'

const tools = [
  {
    icon: Lightbulb,
    label: 'Project Generator',
    desc: 'Get AI-crafted project ideas tailored to your skills',
    href: '/dashboard/projects',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10 border-cyan-400/20',
    hoverGlow: 'hover:shadow-neon-cyan',
  },
  {
    icon: FileText,
    label: 'Resume Analyzer',
    desc: 'Score your resume and get recruiter-level feedback',
    href: '/dashboard/resume',
    color: 'text-green-400',
    bg: 'bg-green-400/10 border-green-400/20',
    hoverGlow: 'hover:shadow-neon-green',
  },
  {
    icon: MapPin,
    label: 'Career Path',
    desc: 'Map your journey from today to your dream role',
    href: '/dashboard/career',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10 border-purple-400/20',
    hoverGlow: 'hover:shadow-neon-purple',
  },
]

function StatCard({ label, value, icon: Icon, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card p-5 flex items-center gap-4"
    >
      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${color.replace('text-', 'bg-').replace('-400', '-400/10')} border-current/20`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <div className={`font-display font-700 text-2xl ${color}`}>{value}</div>
        <div className="text-xs text-slate-500">{label}</div>
      </div>
    </motion.div>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ projects: 0, careers: 0, resumes: 0 })
  const [recentProjects, setRecentProjects] = useState([])
  const [subscription, setSubscription] = useState(null)

const [usage, setUsage] = useState({
  project: 0,
  resume: 0,
  career: 0,
})

  useEffect(() => {
    if (!user) return
    const loadSubscription = async () => {
  const { data } = await getSubscription(user.id)

  if (!data) return

  setSubscription(data)

  const project = await getMonthlyUsage(user.id, 'project')
  const resume = await getMonthlyUsage(user.id, 'resume')
  const career = await getMonthlyUsage(user.id, 'career')

  setUsage({
    project: project.count,
    resume: resume.count,
    career: career.count,
  })
}

loadSubscription()
    getUserStats(user.id).then(setStats).catch(() => {})
    getSavedProjects(user.id).then(({ data }) => {
      if (data) setRecentProjects(data.slice(0, 3))
    }).catch(() => {})
  }, [user])

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'there'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-2 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              {greeting}, {firstName} 👋
            </div>
            <h1 className="font-display font-800 text-3xl text-white">Your Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Track your progress and launch your next big thing.</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <StatCard label="Projects Generated" value={stats.projects} icon={Lightbulb} color="text-cyan-400" delay={0.1} />
            <StatCard label="Resume Analyses" value={stats.resumes} icon={FileText} color="text-green-400" delay={0.15} />
            <StatCard label="Career Paths" value={stats.careers} icon={MapPin} color="text-purple-400" delay={0.2} />
          </div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <h2 className="font-display font-700 text-lg text-white mb-4">AI Tools</h2>
            {/* Subscription Usage */}
{subscription && (
  <div className="glass-card p-6 mb-10">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
      <div>
        <p className="text-xs text-slate-500 font-mono mb-1">CURRENT PLAN</p>
        <h2 className="font-display font-800 text-2xl text-white">
          {PLAN_NAMES[subscription.plan] || 'Free'} Plan
        </h2>
      </div>

      <Link to="/pricing" className="btn-primary text-sm justify-center">
        Upgrade Plan
      </Link>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        ['Project Ideas', 'project', 'text-cyan-400'],
        ['Resume Analyses', 'resume', 'text-green-400'],
        ['Career Paths', 'career', 'text-purple-400'],
      ].map(([label, key, color]) => {
        const limit = PLAN_LIMITS[subscription.plan]?.[key]
        const used = usage[key]
        const displayLimit = limit === Infinity ? 'Unlimited' : limit

        return (
          <div key={key} className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-4">
            <div className="text-xs text-slate-500 mb-1">{label}</div>
            <div className={`font-display font-800 text-xl ${color}`}>
              {used} / {displayLimit}
            </div>
          </div>
        )
      })}
    </div>
  </div>
)}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {tools.map((t) => (
                <Link key={t.href} to={t.href}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className={`glass-card p-5 h-full transition-all duration-300 ${t.hoverGlow} group cursor-pointer`}
                  >
                    <div className={`inline-flex p-2.5 rounded-xl border mb-4 ${t.bg} transition-all`}>
                      <t.icon className={`w-5 h-5 ${t.color}`} />
                    </div>
                    <h3 className="font-display font-700 text-sm text-white mb-1">{t.label}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{t.desc}</p>
                    <div className={`flex items-center gap-1 mt-3 text-xs ${t.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      Open tool <ArrowRight className="w-3 h-3" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent projects */}
          {recentProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-700 text-lg text-white">Recent Projects</h2>
                <Link to="/dashboard/projects" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {recentProjects.map((p) => (
                  <div key={p.id} className="glass-card p-4 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-600 text-sm text-white truncate">{p.title}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {new Date(p.created_at).toLocaleDateString()}
                        {p.content?.domain && (
  <span className="ml-2 px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-500">
    {p.content.domain}
  </span>
)}
                      </div>
                    </div>
                    <TrendingUp className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty state */}
          {recentProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="glass-card p-10 text-center"
            >
              <Sparkles className="w-10 h-10 text-slate-700 mx-auto mb-3" />
              <h3 className="font-display font-700 text-white mb-2">No projects yet</h3>
              <p className="text-slate-500 text-sm mb-4">Generate your first AI project idea to get started.</p>
              <Link to="/dashboard/projects" className="btn-primary text-sm inline-flex">
                Generate Project Idea
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
