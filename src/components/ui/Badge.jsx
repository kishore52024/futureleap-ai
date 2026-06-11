export default function Badge({ children, color = 'cyan' }) {
  const colors = {
    cyan:   'bg-cyan-400/10 text-cyan-400 border-cyan-400/20',
    green:  'bg-green-400/10 text-green-400 border-green-400/20',
    purple: 'bg-purple-400/10 text-purple-400 border-purple-400/20',
    yellow: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    red:    'bg-red-400/10 text-red-400 border-red-400/20',
    slate:  'bg-slate-400/10 text-slate-400 border-slate-400/20',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono border ${colors[color]}`}>
      {children}
    </span>
  )
}
