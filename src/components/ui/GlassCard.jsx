import { motion } from 'framer-motion'

/**
 * GlassCard — reusable glassmorphism card with optional hover lift.
 * Props:
 *   hover    — enable hover animation (default: false)
 *   glow     — tailwind shadow class string for neon glow on hover
 *   className — extra tailwind classes
 */
export default function GlassCard({ children, hover = false, glow = '', className = '', ...props }) {
  const base = `glass-card ${className}`

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className={`${base} transition-all duration-300 ${glow}`}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={base} {...props}>
      {children}
    </div>
  )
}
