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
    icon: Zap,
    desc: 'Perfect for exploring FutureLeap AI',
    button: 'Get Started',
    highlight: false,
    features: [
      ['AI Project Generator', '5 / month'],
      ['Resume Analyzer', '2 / month'],
      ['Career Path Generator', '2 / month'],
      ['Basic Placement Score', true],
      ['Save Projects', '10'],
      ['Community Access', true],
      ['Documentation Generator', false],
      ['Portfolio Generator', false],
      ['Project Validator', false],
      ['Interview Simulator', false],
      ['Export PDF', false],
    ],
  },

  {
    id: 'student',
    name: 'Student',
    price: '₹199',
    amount: 19900,
    icon: Sparkles,
    desc: 'Ideal for semester projects',
    button: 'Choose Student',
    highlight: false,
    features: [
      ['AI Project Generator', '50 / month'],
      ['Resume Analyzer', '20 / month'],
      ['Career Path Generator', '20 / month'],
      ['Project Validator', '10 / month'],
      ['Documentation Generator', '5 / month'],
      ['Portfolio Generator', '2 / month'],
      ['PPT Generator', '5 / month'],
      ['Interview Simulator', true],
      ['Export PDF', true],
      ['Priority Support', false],
    ],
  },

  {
    id: 'pro',
    name: 'Pro Student',
    price: '₹299',
    amount: 29900,
    icon: Crown,
    desc: 'Best Value',
    button: 'Upgrade to Pro',
    highlight: true,
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
    icon: Rocket,
    desc: 'Everything Unlimited',
    button: 'Go Ultimate',
    highlight: false,
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
  if (value === true)
    return <Check className="w-4 h-4 text-green-400" />

  if (value === false)
    return <X className="w-4 h-4 text-red-400" />

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

      // Create Razorpay Order
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
        throw new Error(order.error || 'Unable to create Razorpay order.')
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        order_id: order.id,

        name: 'FutureLeap AI',

        description: `${plan.name} Subscription`,

        image: '/logo.png',

        handler: async function (response) {
          try {
            const verify = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...response,
                userId: user.id,
                plan: plan.id,
              }),
            })

            const result = await verify.json()

            if (result.success) {
              alert(
                `🎉 Congratulations!

Your ${plan.name} Subscription has been activated successfully.`
              )

              window.location.href = '/dashboard'
            } else {
              alert(result.error || 'Payment verification failed.')
            }
          } catch (err) {
            console.error(err)
            alert('Verification failed.')
          }
        },

        prefill: {
          name:
            user.user_metadata?.full_name ||
            user.email?.split('@')[0] ||
            '',

          email: user.email,

          contact: '',
        },

        notes: {
          plan: plan.id,
          platform: 'FutureLeap AI',
        },

        theme: {
          color: '#06b6d4',
        },

        modal: {
          ondismiss: function () {
            console.log('Payment cancelled.')
          },
        },
      }

      const razorpay = new window.Razorpay(options)

      razorpay.on('payment.failed', function (response) {
        console.error(response.error)

        alert(
          `Payment Failed

Reason:
${response.error.description}`
        )
      })

      razorpay.open()
    } catch (err) {
      console.error(err)

      alert(err.message)
    } finally {
      setLoadingPlan(null)
    }
  }
    return (
    <div className="min-h-screen bg-dark-950 text-white px-4 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            FutureLeap AI Pricing
          </div>

          <h1 className="font-display font-800 text-5xl mb-4">
            Choose Your Plan
          </h1>

          <p className="text-slate-400 max-w-3xl mx-auto">
            Unlock powerful AI tools for project generation,
            resume analysis, portfolio creation,
            documentation, interview preparation,
            career guidance and much more.
          </p>

        </div>

        {/* Pricing Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {plans.map((plan) => {

            const Icon = plan.icon

            return (

              <div
                key={plan.id}
                className={`relative glass-card p-6 flex flex-col transition duration-300 hover:scale-[1.02]

                ${
                  plan.highlight
                    ? 'border-purple-400 shadow-neon-purple'
                    : ''
                }
              `}
              >

                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 px-4 py-1 text-xs font-bold">
                    ⭐ MOST POPULAR
                  </div>
                )}

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-12 h-12 rounded-xl border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">

                    <Icon className="w-6 h-6 text-cyan-400" />

                  </div>

                  <div>

                    <h2 className="text-xl font-bold">

                      {plan.name}

                    </h2>

                    <p className="text-xs text-slate-500">

                      {plan.desc}

                    </p>

                  </div>

                </div>

                <div className="mb-6">

                  <span className="text-5xl font-bold">

                    {plan.price}

                  </span>

                  <span className="text-slate-500">

                    {' '}
                    /month
                  </span>

                </div>

                <button
                  onClick={() => handlePayment(plan)}
                  disabled={loadingPlan === plan.id}
                  className={`w-full rounded-xl py-3 font-semibold mb-6 transition

                  ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-cyan-400 to-green-400 text-black'
                      : 'border border-white/10 hover:border-cyan-400'
                  }

                  ${
                    loadingPlan === plan.id
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }
                `}
                >

                  {loadingPlan === plan.id
                    ? 'Processing...'
                    : plan.button}

                </button>

                <div className="space-y-3 flex-1">

                  {plan.features.map(([label, value]) => (

                    <div
                      key={label}
                      className="flex justify-between items-center border-b border-white/5 pb-2"
                    >

                      <span className="text-slate-400 text-sm">

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

          <h2 className="text-3xl font-bold mb-3">
            Why Choose FutureLeap AI?
          </h2>

          <p className="text-slate-400 max-w-3xl mx-auto leading-7">
            FutureLeap AI is an all-in-one AI platform built specifically for
            engineering students. From generating innovative projects and
            validating ideas to creating documentation, portfolios, resumes,
            interview preparation, and career roadmaps — everything is powered
            by AI to help you become industry-ready.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">

            <div>
              <h3 className="text-4xl font-bold text-cyan-400">
                10+
              </h3>
              <p className="text-slate-400 mt-2">
                AI Tools
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-green-400">
                24×7
              </h3>
              <p className="text-slate-400 mt-2">
                AI Assistance
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-purple-400">
                Unlimited
              </h3>
              <p className="text-slate-400 mt-2">
                Project Ideas
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-yellow-400">
                Premium
              </h3>
              <p className="text-slate-400 mt-2">
                Student Experience
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}