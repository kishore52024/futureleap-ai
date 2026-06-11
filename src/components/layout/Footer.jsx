import { Link } from 'react-router-dom'
import { Zap, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-dark-950 mt-20">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-green-400 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-dark-950 fill-current" />
              </div>
              <span className="font-display font-700 text-white">
                Future<span className="gradient-text-cyan">Leap</span> AI
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Empowering the next generation of builders, innovators, and creators with AI-powered career tools.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-200">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-600 text-sm text-white mb-4">Product</h4>
            <ul className="space-y-2.5">
              {['Project Generator', 'Resume Analyzer', 'Career Path', 'Dashboard'].map(l => (
                <li key={l}><a href="#" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-600 text-sm text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {['About', 'Blog', 'Privacy Policy', 'Terms of Service'].map(l => (
                <li key={l}><a href="#" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-600 text-xs">© 2025 FutureLeap AI. All rights reserved.</p>
          <p className="text-slate-600 text-xs">Built for ambitious students 🚀</p>
        </div>
      </div>
    </footer>
  )
}
