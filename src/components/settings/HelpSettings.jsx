import { HelpCircle, Mail, Info, MessageCircle } from 'lucide-react'

export default function HelpSettings() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-800 text-xl text-white">
          Help & Support
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Get help with FutureLeap AI.
        </p>
      </div>

      <div className="glass-card p-5 space-y-4">
        <div className="p-4 rounded-xl bg-white/[0.03]">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h3 className="text-white font-display">FAQ</h3>
          </div>
          <p className="text-slate-500 text-sm">
            Common questions about project generation, resume analysis, and career roadmap.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03]">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            <h3 className="text-white font-display">Contact Support</h3>
          </div>
          <p className="text-slate-500 text-sm">
            Email: support@futureleap.ai
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03]">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="w-5 h-5 text-cyan-400" />
            <h3 className="text-white font-display">Feedback</h3>
          </div>
          <p className="text-slate-500 text-sm">
            Share suggestions to improve FutureLeap AI.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03]">
          <div className="flex items-center gap-3 mb-2">
            <Info className="w-5 h-5 text-cyan-400" />
            <h3 className="text-white font-display">About</h3>
          </div>
          <p className="text-slate-500 text-sm">
            FutureLeap AI helps students generate projects, analyze resumes, and plan careers using AI.
          </p>
        </div>
      </div>
    </div>
  )
}