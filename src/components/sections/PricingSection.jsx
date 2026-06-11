import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    desc: 'Perfect to get started',
    features: [
      '5 AI generations/month',
      '1 Resume analysis',
      '1 Career path',
      'Basic project ideas',
      'Community support',
    ],
    cta: 'Get Started Free',
    href: '/signup',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    desc: 'For serious students',
    features: [
      'Unlimited AI generations',
      'Unlimited resume analyses',
      'Unlimited career paths',
      'Advanced project ideas',
      'Priority support',
      'Export to PDF',
      'Saved history (unlimited)',
    ],
    cta: 'Start Pro',
    href: '/signup?plan=pro',
    featured: true,
  },
  {
    name: 'Team',
    price: '$29',
    period: '/month',
    desc: 'For study groups & clubs',
    features: [
      'Everything in Pro',
      'Up to 5 members',
      'Shared dashboard',
      'Team project collaboration',
      'Admin controls',
      'Priority email support',
    ],
    cta: 'Start Team',
    href: '/signup?plan=team',
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
            Simple, transparent pricing
          </div>
          <h2 className="font-display font-800 text-4xl lg:text-5xl text-white mb-4">
            Invest in your <span className="gradient-text">future</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-md mx-auto">Start free, upgrade when you're ready.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
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
              style={plan.featured ? { boxShadow: '0 0 40px rgba(0,229,255,0.12), 0 20px 60px rgba(0,0,0,0.5)' } : {}}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-green-400 text-xs font-display font-700 text-dark-950">
                  <Zap className="w-3 h-3 fill-current" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display font-700 text-lg text-white mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{plan.desc}</p>
                <div className="flex items-end gap-1">
                  <span className="font-display font-800 text-4xl text-white">{plan.price}</span>
                  <span className="text-slate-500 text-sm mb-1.5">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={plan.href}
                className={plan.featured ? 'btn-primary justify-center' : 'btn-ghost justify-center'}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
