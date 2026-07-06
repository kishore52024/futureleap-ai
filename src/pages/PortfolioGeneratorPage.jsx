import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getSubscription } from '../lib/supabase'



import { useState } from 'react'
import PortfolioForm from '../components/portfolio/PortfolioForm'
import Sidebar from '../components/layout/Sidebar'
import DeveloperTemplate from '../components/portfolio/templates/DeveloperTemplate'

export default function PortfolioGeneratorPage() {
  const [portfolio, setPortfolio] = useState(null)
  const { user } = useAuth()

const [subscription, setSubscription] = useState(null)

const isUltimate = subscription?.plan === 'ultimate'
const [loadingSubscription, setLoadingSubscription] = useState(true)
useEffect(() => {
  if (!user) {
    setLoadingSubscription(false)
    return
  }

  async function loadSubscription() {
    const { data } = await getSubscription(user.id)
    setSubscription(data)
    setLoadingSubscription(false)
  }

  loadSubscription()
}, [user])
if (loadingSubscription) {
  return (
    <div className="flex min-h-screen bg-dark-950 items-center justify-center">
      <p className="text-white text-lg">
        Loading...
      </p>
    </div>
  )
}
if (!isUltimate) {
  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />

      <main className="flex-1 flex items-center justify-center p-10">

        <div className="glass-card max-w-xl w-full text-center p-10">

          <h1 className="text-3xl font-bold text-white">
            🌐 Ultimate Feature
          </h1>

          <p className="text-slate-400 mt-4">
            The AI Portfolio Website Generator is available exclusively for
            Ultimate members.
          </p>

          <div className="mt-8 space-y-3 text-left text-slate-300">

            <p>✅ AI Portfolio Website Generation</p>
            <p>✅ Multiple Premium Templates</p>
            <p>✅ Live Website Preview</p>
            <p>✅ Download React Source Code</p>
            <p>✅ Premium Themes</p>
            <p>✅ One-click Deployment (Coming Soon)</p>

          </div>

          <button
            onClick={() => window.location.href = '/dashboard/pricing'}
            className="btn-primary mt-8 w-full justify-center"
          >
            Upgrade to Ultimate
          </button>

        </div>

      </main>
    </div>
  )
}

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="mb-10">
            <p className="text-cyan-400 text-sm font-medium">
              🌐 AI Portfolio Builder
            </p>

            <h1 className="text-4xl font-bold text-white mt-2">
              Portfolio Website Generator
            </h1>

            <p className="text-slate-400 mt-3 max-w-3xl">
              Generate a beautiful developer portfolio powered by AI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left Side */}
            <PortfolioForm onGenerate={setPortfolio} />

            {/* Right Side */}
            <div className="glass-card p-2 overflow-hidden min-h-[700px]">

              {!portfolio ? (
                <div className="h-full flex items-center justify-center text-slate-500">
                  Generate a portfolio to see the live website preview.
                </div>
              ) : (
                <DeveloperTemplate portfolio={portfolio} />
              )}

            </div>

          </div>

        </div>
      </main>
    </div>
  )
}