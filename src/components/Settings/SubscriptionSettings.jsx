import { Crown, CreditCard } from 'lucide-react'

export default function SubscriptionSettings() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-800 text-xl text-white">
          Subscription
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Manage your FutureLeap AI plan.
        </p>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Crown className="w-8 h-8 text-yellow-400" />
          <div>
            <h3 className="text-white font-display text-lg">
              Free Plan
            </h3>
            <p className="text-slate-500 text-sm">
              You are currently using the Free plan.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-slate-300">✅ AI Project Generator</p>
          <p className="text-slate-300">✅ Resume Analyzer</p>
          <p className="text-slate-300">✅ Career Path Generator</p>
          <p className="text-slate-500">❌ Unlimited AI Usage</p>
          <p className="text-slate-500">❌ AI Project Blueprint Pro</p>
          <p className="text-slate-500">❌ Premium Templates</p>
        </div>

        <button className="btn-primary mt-6">
          <CreditCard className="w-4 h-4" />
          Upgrade to Pro
        </button>
      </div>
    </div>
  )
}