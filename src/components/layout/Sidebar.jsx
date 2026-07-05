import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Zap,
  LayoutDashboard,
  Lightbulb,
  FileText,
  FilePlus2,
  MapPin,
  ShieldCheck,
  Globe,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { signOut } from '../../lib/supabase'

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },

  { icon: Lightbulb, label: 'Project Ideas', path: '/dashboard/projects' },

  { icon: FileText, label: 'Resume Analyzer', path: '/dashboard/resume' },

  { icon: MapPin, label: 'Career Path', path: '/dashboard/career' },

  { icon: FilePlus2, label: 'Resume Creator', path: '/dashboard/resume-creator' },

  {
    icon: ShieldCheck,
    label: 'Project Validator',
    path: '/dashboard/project-validator'
  },

  {
    icon: Globe,
    label: 'Portfolio Generator',
    path: '/dashboard/portfolio-generator'
  },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : user?.email?.[0]?.toUpperCase() || 'U'

  return (
    <aside className="w-60 min-h-screen bg-dark-900/60 backdrop-blur-xl border-r border-white/[0.06] flex flex-col sticky top-0 h-screen">

      {/* Logo */}
      <div className="p-5 border-b border-white/[0.06]">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-green-400 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-dark-950 fill-current" />
          </div>

          <span className="font-display font-700 text-sm text-white">
            Future<span className="gradient-text-cyan">Leap</span> AI
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path

          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 2 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
                  isActive
                    ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <item.icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive
                      ? 'text-cyan-400'
                      : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                />

                <span className="font-body font-500">
                  {item.label}
                </span>

                {isActive && (
                  <ChevronRight className="w-3 h-3 ml-auto text-cyan-400/60" />
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-white/[0.06] space-y-1">

        <Link to="/dashboard/settings">
          <div className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all duration-200 text-sm">
            <Settings className="w-4 h-4 flex-shrink-0" />
            <span className="font-body">Settings</span>
          </div>
        </Link>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/[0.06] transition-all duration-200 text-sm"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className="font-body">Sign Out</span>
        </button>

        <div className="flex items-center gap-3 px-3 py-2.5 mt-2 bg-white/[0.03] rounded-xl border border-white/[0.05]">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-display font-700 text-white">
              {initials}
            </span>
          </div>

          <div className="min-w-0">
            <p className="text-xs font-display font-600 text-white truncate">
              {user?.user_metadata?.full_name || 'Student'}
            </p>

            <p className="text-xs text-slate-500 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}