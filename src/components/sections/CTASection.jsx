import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className="py-28">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,229,255,0.08) 0%, rgba(191,90,242,0.06) 50%, rgba(0,255,135,0.06) 100%)',
            border: '1px solid rgba(0,229,255,0.15)',
            boxShadow: '0 0 80px rgba(0,229,255,0.06)',
          }}
        >
          {/* Background blobs */}
          <div className="blob w-72 h-72 bg-cyan-500/10 top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
          <div className="blob w-72 h-72 bg-purple-500/10 bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs text-slate-300 font-mono mb-6">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Join 10,000+ students already building
            </div>
            <h2 className="font-display font-800 text-4xl lg:text-5xl text-white mb-4 leading-tight">
              Your future starts with<br />
              <span className="gradient-text">one decision today</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-lg mx-auto mb-8">
              Stop scrolling job boards hoping something fits. Let AI map your exact path from where you are to where you want to be.
            </p>
            <Link to="/signup" className="btn-primary text-base px-10 py-4 inline-flex group">
              Start Building Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
