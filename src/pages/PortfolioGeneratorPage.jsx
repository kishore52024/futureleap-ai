import { useState } from 'react'
import PortfolioForm from '../components/portfolio/PortfolioForm'
import Sidebar from '../components/layout/Sidebar'
import DeveloperTemplate from '../components/portfolio/templates/DeveloperTemplate'

export default function PortfolioGeneratorPage() {
  const [portfolio, setPortfolio] = useState(null)

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