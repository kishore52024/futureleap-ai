import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Menu, X } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { signOut } from '../../lib/supabase'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/[0.06]' : ''
      }`}
    >
      <div className="section-container py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-green-400 flex items-center justify-center shadow-neon-cyan group-hover:shadow-neon-green transition-all duration-300">
            <Zap className="w-4 h-4 text-dark-950 fill-current" />
          </div>
          <span className="font-display font-700 text-lg text-white">
            Future<span className="gradient-text-cyan">Leap</span>
            <span className="text-slate-400 font-400"> AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200 font-body"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="btn-ghost text-sm py-2">Dashboard</Link>
              <button onClick={handleSignOut} className="btn-ghost text-sm py-2">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost text-sm py-2">Log In</Link>
              <Link to="/signup" className="btn-primary text-sm py-2">Get Started Free</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-900/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="section-container py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-300 text-sm py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.06]">
                {user ? (
                  <>
                    <Link to="/dashboard" className="btn-ghost text-sm justify-center" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                    <button onClick={handleSignOut} className="btn-primary text-sm justify-center">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn-ghost text-sm justify-center" onClick={() => setMenuOpen(false)}>Log In</Link>
                    <Link to="/signup" className="btn-primary text-sm justify-center" onClick={() => setMenuOpen(false)}>Get Started Free</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
