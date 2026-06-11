import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { UserPlus, Cpu, Download } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: UserPlus,
    color: 'from-cyan-400 to-blue-500',
    title: 'Create your account',
    desc: 'Sign up in seconds. No credit card required. Start with the free plan immediately.',
  },
  {
    num: '02',
    icon: Cpu,
    color: 'from-green-400 to-cyan-400',
    title: 'Choose your AI tool',
    desc: 'Pick from Project Generator, Resume Analyzer, or Career Path Guider. Fill in a short form.',
  },
  {
    num: '03',
    icon: Download,
    color: 'from-purple-400 to-pink-500',
    title: 'Get AI-powered output',
    desc: 'Receive detailed, structured results in seconds. Save everything to your dashboard.',
  },
]

export default function HowItWorksSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="how-it-works" className="py-28 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-400 font-mono mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Simple as 1, 2, 3
          </div>
          <h2 className="font-display font-800 text-4xl lg:text-5xl text-white mb-4">
            Get started in <span className="gradient-text">under 2 minutes</span>
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[22%] right-[22%] h-px bg-gradient-to-r from-cyan-500/30 via-green-500/30 to-purple-500/30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Icon circle */}
              <div className="relative inline-flex mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto shadow-glass`}>
                  <step.icon className="w-6 h-6 text-dark-950" />
                </div>
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-dark-950 border border-white/[0.1] text-xs font-mono text-slate-500 flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display font-700 text-lg text-white mb-3">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
