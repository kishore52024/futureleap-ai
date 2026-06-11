import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Lightbulb, FileText, MapPin, BookOpen, Zap, Shield } from 'lucide-react'

const features = [
  {
    icon: Lightbulb,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10 border-cyan-400/20',
    glow: 'group-hover:shadow-neon-cyan',
    title: 'AI Project Generator',
    desc: 'Tell us your skills and interests. Get a complete project brief with tech stack, features, and monetization ideas instantly.',
  },
  {
    icon: FileText,
    color: 'text-green-400',
    bg: 'bg-green-400/10 border-green-400/20',
    glow: 'group-hover:shadow-neon-green',
    title: 'Resume Analyzer',
    desc: 'Upload your resume and get an ATS score, detailed strengths/weaknesses, and actionable improvement tips from AI.',
  },
  {
    icon: MapPin,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10 border-purple-400/20',
    glow: 'group-hover:shadow-neon-purple',
    title: 'Career Path Guider',
    desc: 'Input your current skills and dream job. Receive a personalized month-by-month roadmap with projects and resources.',
  },
  {
    icon: BookOpen,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10 border-yellow-400/20',
    glow: 'group-hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]',
    title: 'Saved Library',
    desc: 'Every idea, analysis, and roadmap is saved to your personal dashboard so you can revisit and track progress anytime.',
  },
  {
    icon: Zap,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10 border-orange-400/20',
    glow: 'group-hover:shadow-[0_0_20px_rgba(251,146,60,0.3)]',
    title: 'Instant AI Results',
    desc: 'GPT-4o powered responses in seconds. No waiting, no fluff — just structured, actionable output every time.',
  },
  {
    icon: Shield,
    color: 'text-teal-400',
    bg: 'bg-teal-400/10 border-teal-400/20',
    glow: 'group-hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]',
    title: 'Private & Secure',
    desc: 'Your data is stored securely in Supabase with row-level security. Your resume and ideas stay yours alone.',
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`glass-card-hover p-6 group cursor-default ${feature.glow} transition-all duration-300`}
    >
      <div className={`inline-flex p-2.5 rounded-xl border ${feature.bg} mb-5 transition-all duration-300`}>
        <feature.icon className={`w-5 h-5 ${feature.color}`} />
      </div>
      <h3 className="font-display font-700 text-base text-white mb-2">{feature.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="features" className="py-28 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-400 font-mono mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Everything you need to launch
          </div>
          <h2 className="font-display font-800 text-4xl lg:text-5xl text-white mb-4">
            Tools that give you an <span className="gradient-text">unfair advantage</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Stop guessing. Start building with purpose using AI that actually understands your goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
