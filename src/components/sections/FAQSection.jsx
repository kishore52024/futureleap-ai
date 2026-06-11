import { useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Do I need a credit card to start?',
    a: 'No. The free plan gives you 5 AI generations, 1 resume analysis, and 1 career path — completely free, no card needed.',
  },
  {
    q: 'How does the AI generate project ideas?',
    a: 'We use GPT-4o with a carefully engineered prompt that takes your skills, interests, difficulty level, and domain to generate a full project brief including tech stack, features, and monetization strategy.',
  },
  {
    q: 'Is my resume data kept private?',
    a: 'Yes. Your resume content is only used to generate the analysis and is never stored as a raw file. We use Supabase with row-level security so only you can access your data.',
  },
  {
    q: 'Can I cancel my Pro plan anytime?',
    a: 'Absolutely. You can cancel at any time from your dashboard. You will retain Pro access until the end of the billing period.',
  },
  {
    q: 'What AI model powers FutureLeap AI?',
    a: 'We use OpenAI\'s GPT-4o mini for all AI features. It\'s fast, accurate, and provides structured, actionable output perfect for career and project planning.',
  },
  {
    q: 'Is FutureLeap AI suitable for non-tech students?',
    a: 'Yes! You can specify your domain (business, design, healthcare, etc.) and the AI will tailor all suggestions to your specific field. It\'s not just for programmers.',
  },
]

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="border border-white/[0.08] rounded-xl overflow-hidden bg-white/[0.02]"
    >
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-display font-600 text-sm text-white group-hover:text-cyan-400 transition-colors pr-4">
          {item.q}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-cyan-400' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-slate-400 leading-relaxed border-t border-white/[0.05] pt-3">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="faq" className="py-28">
      <div className="section-container max-w-3xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-800 text-4xl lg:text-5xl text-white mb-4">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
          <p className="text-slate-400">Still have questions? Email us at hello@futureleap.ai</p>
        </motion.div>

        {inView && (
          <div className="space-y-3">
            {faqs.map((f, i) => <FAQItem key={i} item={f} index={i} />)}
          </div>
        )}
      </div>
    </section>
  )
}
