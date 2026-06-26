import { Check, X, Sparkles, Crown, Zap, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Free',
    price: '₹0',
    desc: 'For trying FutureLeap AI',
    icon: Zap,
    button: 'Get Started',
    highlight: false,
    features: [
      ['AI Project Generator', '5/month'],
      ['Resume Analyzer', '2/month'],
      ['Career Path Generator', '2/month'],
      ['Basic Placement Score', true],
      ['Save Projects', '10'],
      ['Community Access', true],
      ['Documentation Generator', false],
      ['AI Interview Simulator', false],
      ['Export PDF', false],
    ],
  },
  {
    name: 'Student',
    price: '₹199',
    desc: 'For regular student use',
    icon: Sparkles,
    button: 'Choose Student',
    highlight: false,
    features: [
      ['AI Project Generator', '50/month'],
      ['Resume Analyzer', '20/month'],
      ['Career Path Generator', '20/month'],
      ['Skill Gap Analyzer', true],
      ['AI Study Planner', true],
      ['Documentation Generator', '5/month'],
      ['PPT Generator', '5/month'],
      ['Portfolio Generator', '2/month'],
      ['Export PDF', true],
    ],
  },
  {
    name: 'Pro Student',
    price: '₹299',
    desc: 'Best value for serious students',
    icon: Crown,
    button: 'Upgrade to Pro',
    highlight: true,
    features: [
      ['AI Project Generator', '100/month'],
      ['Resume Analyzer', '50/month'],
      ['Career Path Generator', '50/month'],
      ['AI Project Validation', true],
      ['Documentation Generator', '20/month'],
      ['IEEE Paper Generator', '10/month'],
      ['PPT Generator', '20/month'],
      ['AI Interview Simulator', '10/month'],
      ['PDF + DOCX Export', true],
    ],
  },
  {
    name: 'Ultimate',
    price: '₹499',
    desc: 'Unlimited AI career toolkit',
    icon: Rocket,
    button: 'Go Ultimate',
    highlight: false,
    features: [
      ['AI Project Generator', 'Unlimited'],
      ['Resume Analyzer', 'Unlimited'],
      ['Career Path Generator', 'Unlimited'],
      ['Documentation Generator', 'Unlimited'],
      ['IEEE Paper Generator', 'Unlimited'],
      ['PPT Generator', 'Unlimited'],
      ['AI Interview Simulator', 'Unlimited'],
      ['AI Mentor Chatbot', 'Unlimited'],
      ['24×7 Priority Support', true],
    ],
  },
]

function FeatureValue({ value }) {
  if (value === true) {
    return <Check className="w-4 h-4 text-green-400" />
  }

  if (value === false) {
    return <X className="w-4 h-4 text-red-400" />
  }

  return <span className="text-xs text-slate-300">{value}</span>
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-dark-950 text-white px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            FutureLeap AI Pricing
          </div>

          <h1 className="font-display font-800 text-4xl md:text-5xl mb-4">
            Choose the Plan That Fits Your Journey
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto">
            Start free and upgrade when you need more AI tools for projects,
            resumes, career planning, documentation, and placement preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon

            return (
              <div
                key={plan.name}
                className={`relative glass-card p-6 flex flex-col ${
                  plan.highlight
                    ? 'border-purple-400/60 shadow-neon-purple scale-[1.02]'
                    : ''
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-cyan-400 text-white text-xs font-bold px-4 py-1 rounded-full">
                    ⭐ MOST POPULAR
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="font-display font-700 text-xl">
                      {plan.name}
                    </h2>
                    <p className="text-xs text-slate-500">{plan.desc}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-500 text-sm"> /month</span>
                </div>

                <Link
                  to="/signup"
                  className={`w-full text-center py-3 rounded-xl font-semibold mb-6 transition ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-cyan-400 to-green-400 text-dark-950 hover:opacity-90'
                      : 'border border-white/10 hover:border-cyan-400/50 text-white'
                  }`}
                >
                  {plan.button}
                </Link>

                <div className="space-y-3 flex-1">
                  {plan.features.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-3 text-sm border-b border-white/[0.04] pb-2"
                    >
                      <span className="text-slate-400">{label}</span>
                      <FeatureValue value={value} />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="glass-card p-6 mt-10 text-center">
          <h3 className="font-display font-700 text-xl mb-2">
            Built for Students, Projects, and Placements
          </h3>
          <p className="text-slate-400 max-w-3xl mx-auto text-sm">
            FutureLeap AI helps students generate project ideas, improve resumes,
            create career roadmaps, prepare documentation, and become placement-ready
            using AI-powered guidance.
          </p>
        </div>
      </div>
    </div>
  )
}