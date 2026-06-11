import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Star } from 'lucide-react'

const floatVariants = {
  animate: {
    y: [0, -18, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="blob w-[600px] h-[600px] bg-cyan-500/10 top-[-10%] left-[-15%]"
        />
        <motion.div
          variants={floatVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="blob w-[500px] h-[500px] bg-purple-500/10 top-[10%] right-[-10%]"
        />
        <motion.div
          variants={floatVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
          className="blob w-[400px] h-[400px] bg-green-500/8 bottom-[-5%] left-[30%]"
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="section-container relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs text-slate-400 font-mono mb-8"
        >
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Powered by GPT-4o · Built for Students</span>
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-800 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-white">Your AI-Powered</span>
          <br />
          <span className="gradient-text">Career Launchpad</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-body"
        >
          Generate standout project ideas, get your resume scored, and map your path to your dream job — all in one place, powered by AI.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/signup" className="btn-primary text-base px-8 py-4 group">
            Start for Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="#features" className="btn-ghost text-base px-8 py-4">
            See How It Works
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['bg-cyan-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500'].map((c, i) => (
                <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-dark-950 flex items-center justify-center text-xs font-bold text-dark-950`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span>10,000+ students onboard</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
            ))}
            <span>4.9/5 average rating</span>
          </div>
        </motion.div>

        {/* Hero mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 relative max-w-4xl mx-auto"
        >
          <div className="glass-card p-1 rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 0 80px rgba(0,229,255,0.1), 0 40px 80px rgba(0,0,0,0.6)' }}
          >
            {/* Fake browser chrome */}
            <div className="bg-dark-800/80 rounded-t-xl px-4 py-3 flex items-center gap-2 border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                {['bg-red-500/60', 'bg-yellow-500/60', 'bg-green-500/60'].map((c, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                ))}
              </div>
              <div className="flex-1 mx-4 bg-dark-700/60 rounded-md px-3 py-1 text-xs text-slate-500 font-mono text-center">
                futureleap.ai/dashboard
              </div>
            </div>
            {/* Dashboard preview */}
            <div className="bg-dark-900/60 rounded-b-xl p-6 grid grid-cols-3 gap-4 min-h-[200px]">
              {[
                { label: 'Projects Generated', value: '12', color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/20' },
                { label: 'Resume Score', value: '87%', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' },
                { label: 'Career Paths', value: '3', color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
              ].map((stat) => (
                <div key={stat.label} className={`rounded-xl border p-4 ${stat.bg}`}>
                  <div className={`text-2xl font-display font-700 ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
              <div className="col-span-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-green-400 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-dark-950" />
                </div>
                <div>
                  <div className="text-xs font-display font-600 text-white">AI Project Idea Ready</div>
                  <div className="text-xs text-slate-500 mt-0.5">Smart Budget Tracker with ML Insights — Full-stack, 6 weeks</div>
                </div>
                <div className="ml-auto text-xs text-cyan-400 font-mono bg-cyan-400/10 px-2 py-1 rounded-md">View →</div>
              </div>
            </div>
          </div>
          {/* Glow under mockup */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-cyan-500/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  )
}
