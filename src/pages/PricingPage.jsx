import { useState, useEffect } from 'react'
import {
  Check,
  X,
  Sparkles,
  Crown,
  Zap,
  Rocket,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    amount: 0,
    desc: 'Perfect for exploring FutureLeap AI',
    icon: Zap,
    button: 'Get Started',
    highlight: false,
    color: 'cyan',

    features: [
      ['AI Project Generator', '5 / month'],
      ['Resume Analyzer', '2 / month'],
      ['Career Path Generator', '2 / month'],
      ['Basic Placement Score', true],
      ['Save Projects', '10'],
      ['Community Access', true],
      ['Documentation Generator', false],
      ['Interview Simulator', false],
      ['Portfolio Generator', false],
      ['Project Validator', false],
      ['Export PDF', false],
    ],
  },

  {
    id: 'student',
    name: 'Student',
    price: '₹199',
    amount: 19900,
    desc: 'Ideal for semester projects',
    icon: Sparkles,
    button: 'Choose Student',
    highlight: false,
    color: 'green',

    features: [
      ['AI Project Generator', '50 / month'],
      ['Resume Analyzer', '20 / month'],
      ['Career Path Generator', '20 / month'],
      ['Project Validator', '10 / month'],
      ['Documentation Generator', '5 / month'],
      ['Portfolio Generator', '2 / month'],
      ['PPT Generator', '5 / month'],
      ['Export PDF', true],
      ['Interview Simulator', true],
      ['Priority Support', false],
    ],
  },

  {
    id: 'pro',
    name: 'Pro Student',
    price: '₹299',
    amount: 29900,
    desc: 'Best Value',
    icon: Crown,
    button: 'Upgrade to Pro',
    highlight: true,
    color: 'purple',

    features: [
      ['AI Project Generator', '100 / month'],
      ['Resume Analyzer', '50 / month'],
      ['Career Path Generator', '50 / month'],
      ['Project Validator', 'Unlimited'],
      ['Portfolio Generator', '20 / month'],
      ['Documentation Generator', '20 / month'],
      ['PPT Generator', '20 / month'],
      ['IEEE Paper Generator', '10 / month'],
      ['Interview Simulator', '10 / month'],
      ['Export PDF + DOCX', true],
    ],
  },

  {
    id: 'ultimate',
    name: 'Ultimate',
    price: '₹499',
    amount: 49900,
    desc: 'Everything Unlimited',
    icon: Rocket,
    button: 'Go Ultimate',
    highlight: false,
    color: 'orange',

    features: [
      ['AI Project Generator', 'Unlimited'],
      ['Resume Analyzer', 'Unlimited'],
      ['Career Path Generator', 'Unlimited'],
      ['Project Validator', 'Unlimited'],
      ['Portfolio Generator', 'Unlimited'],
      ['Documentation Generator', 'Unlimited'],
      ['PPT Generator', 'Unlimited'],
      ['IEEE Paper Generator', 'Unlimited'],
      ['Interview Simulator', 'Unlimited'],
      ['AI Mentor Chat', 'Unlimited'],
      ['Priority Support', true],
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

  return (
    <span className="text-xs text-slate-300">
      {value}
    </span>
  )
}

export default function PricingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [loadingPlan, setLoadingPlan] = useState(null)

  useEffect(() => {
    if (window.Razorpay) return

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true

    document.body.appendChild(script)
  }, [])

  async function handlePayment(plan) {
    if (plan.id === 'free') {
      navigate('/signup')
      return
    }

    if (!user) {
      alert('Please login first.')
      navigate('/login')
      return
    }

    try {
      setLoadingPlan(plan.id)

      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: plan.id,
        }),
      })

      const order = await response.json()

      if (!order.id) {
        throw new Error(order.error || 'Unable to create order.')
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: 'FutureLeap AI',

        description: `${plan.name} Subscription`,

        order_id: order.id,
          return (
    <div className="min-h-screen bg-dark-950 text-white px-4 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

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
            resumes, career planning, documentation and AI-powered placement preparation.
          </p>

        </div>

        {/* Pricing Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {plans.map((plan) => {

            const Icon = plan.icon

            return (

              <div
                key={plan.id}
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

                {/* Icon */}

                <div className="flex items-center gap-3 mb-4">

                  <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>

                  <div>
                    <h2 className="font-display font-700 text-xl">
                      {plan.name}
                    </h2>

                    <p className="text-xs text-slate-500">
                      {plan.desc}
                    </p>
                  </div>

                </div>

                {/* Price */}

                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {plan.price}
                  </span>

                  <span className="text-slate-500 text-sm">
                    {' '} / month
                  </span>
                </div>

                {/* Payment Button */}

                <button
                  onClick={() => handlePayment(plan)}
                  disabled={loadingPlan === plan.id}
                  className={`w-full py-3 rounded-xl font-semibold mb-6 transition ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-cyan-400 to-green-400 text-dark-950 hover:opacity-90'
                      : 'border border-white/10 hover:border-cyan-400/50 text-white'
                  } ${
                    loadingPlan === plan.id
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  }`}
                >

                  {loadingPlan === plan.id
                    ? 'Processing...'
                    : plan.button}

                </button>

                {/* Features */}

                <div className="space-y-3 flex-1">

                  {plan.features.map(([label, value]) => (

                    <div
                      key={label}
                      className="flex items-center justify-between gap-3 text-sm border-b border-white/[0.04] pb-2"
                    >

                      <span className="text-slate-400">
                        {label}
                      </span>

                      <FeatureValue value={value} />

                    </div>

                  ))}

                </div>

              </div>

            )

          })}

        </div>
                {/* Bottom Section */}

        <div className="glass-card p-8 mt-12 text-center">

          <h3 className="font-display font-700 text-2xl mb-3">
            🚀 Built for Students, Projects & Placements
          </h3>

          <p className="text-slate-400 max-w-3xl mx-auto leading-7">
            FutureLeap AI is your all-in-one AI career platform. Generate
            innovative project ideas, analyze resumes, build career roadmaps,
            validate projects, create portfolios, generate documentation,
            prepare presentations, practice interviews, and become
            placement-ready with powerful AI tools.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">

            <div>
              <h4 className="text-3xl font-bold text-cyan-400">10+</h4>
              <p className="text-slate-500 text-sm mt-1">
                AI Tools
              </p>
            </div>

            <div>
              <h4 className="text-3xl font-bold text-green-400">24×7</h4>
              <p className="text-slate-500 text-sm mt-1">
                AI Assistance
              </p>
            </div>

            <div>
              <h4 className="text-3xl font-bold text-purple-400">100%</h4>
              <p className="text-slate-500 text-sm mt-1">
                Student Focused
              </p>
            </div>

            <div>
              <h4 className="text-3xl font-bold text-yellow-400">∞</h4>
              <p className="text-slate-500 text-sm mt-1">
                Future Possibilities
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}