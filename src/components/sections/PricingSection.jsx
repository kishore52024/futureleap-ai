import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Zap, Crown, Sparkles, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: '/month',
    desc: 'For trying FutureLeap AI',
    icon: Zap,
    features: [
      '5 AI Project Generations/month',
      '2 Resume Analyses/month',
      '2 Career Paths/month',
      'Basic Placement Score',
      'Save 10 Projects',
      'Community Access',
    ],
    cta: 'Get Started Free',
    href: '/signup?plan=free',
    featured: false,
  },
  {
    name: 'Student',
    price: '₹199',
    period: '/month',
    desc: 'For regular student use',
    icon: Sparkles,
    features: [
      '50 AI Project Generations/month',
      '20 Resume Analyses/month',
      '20 Career Paths/month',
      'Skill Gap Analyzer',
      'AI Study Planner',
      '5 Documentation Generations/month',
      '5 PPT Outlines/month',
      '2 Portfolio Generations/month',
      'PDF Downloads',
      'Email Support',
    ],
    cta: 'Choose Student',
    href: '/signup?plan=student',
    featured: false,
  },
  {
    name: 'Pro Student',
    price: '₹299',
    period: '/month',
    desc: 'Best value for serious students',
    icon: Crown,
    features: [
      '100 AI Project Generations/month',
      '50 Resume Analyses/month',
      '50 Career Paths/month',
      'AI Project Validation',
      'Documentation Generator: 20/month',
      'IEEE Paper Generator: 10/month',
      'PPT Generator: 20/month',
      'AI Interview Simulator: 10/month',
      'GitHub Profile Analyzer',
      'PDF + DOCX Downloads',
      'Priority Support',
    ],
    cta: 'Upgrade to Pro',
    href: '/signup?plan=pro_student',
    featured: true,
  },
  {
    name: 'Ultimate',
    price: '₹499',
    period: '/month',
    desc: 'Unlimited AI career toolkit',
    icon: Rocket,
    features: [
      'Unlimited AI Project Generations',
      'Unlimited Resume Analyses',
      'Unlimited Career Paths',
      'Unlimited Documentation Generator',
      'Unlimited IEEE Paper Generator',
      'Unlimited PPT Generator',
      'Unlimited Portfolio Generator',
      'Unlimited AI Interview Simulator',
      'Unlimited AI Mentor Chatbot',
      'Advanced Placement Readiness Score',
      '24×7 Priority Support',
    ],
    cta: 'Go Ultimate',
    href: '/signup?plan=ultimate',
    featured: false,
  },
]

export default function PricingSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="pricing" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-400 font-mono mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Simple student-friendly pricing
          </div>

          <h2 className="font-display font-800 text-4xl lg:text-5xl text-white mb-4">
            Invest in your <span className="gradient-text">future</span>
          </h2>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Start free and upgrade when you need more AI tools for projects,
            resumes, documentation, and placement preparation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, i) => {
            const Icon = plan.icon

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl p-6 ${
                  plan.featured
                    ? 'bg-gradient-to-b from-cyan-500/10 to-purple-500/5 border border-cyan-400/30'
                    : 'glass-card'
                }`}
                style={
                  plan.featured
                    ? {
                        boxShadow:
                          '0 0 40px rgba(0,229,255,0.12), 0 20px 60px rgba(0,0,0,0.5)',
                      }
                    : {}
                }
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-green-400 text-xs font-display font-700 text-dark-950">
                    <Crown className="w-3 h-3 fill-current" />
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>

                  <h3 className="font-display font-700 text-lg text-white mb-1">
                    {plan.name}
                  </h3>

                  <p className="text-slate-500 text-sm mb-4">{plan.desc}</p>

                  <div className="flex items-end gap-1">
                    <span className="font-display font-800 text-4xl text-white">
                      {plan.price}
                    </span>
                    <span className="text-slate-500 text-sm mb-1.5">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-slate-300"
                    >
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.href}
                  className={
                    plan.featured
                      ? 'btn-primary justify-center'
                      : 'btn-ghost justify-center'
                  }
                >
                  {plan.cta}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}