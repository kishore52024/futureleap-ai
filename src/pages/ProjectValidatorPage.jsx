import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ShieldCheck } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import { validateProject } from '../lib/openai'
import { getMonthlyUsage, trackUsage } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

export default function ProjectValidatorPage() {
    const [project, setProject] = useState({
  title: '',
  domain: '',
  tech: '',
  abstract: '',
  features: ''
})
const [result, setResult] = useState(null)
const { user } = useAuth()

const [usage, setUsage] = useState(0)

useEffect(() => {
  if (!user) return

  async function loadUsage() {
   const { count } = await getMonthlyUsage(user.id, 'project_validator')
setUsage(count || 0)
  }

  loadUsage()
}, [user])

const handleChange = (e) => {
  setProject({
    ...project,
    [e.target.name]: e.target.value
  })
}


const handleValidate = async () => {
    if (usage >= 1) {
  alert('Free plan allows only 1 Project Validation per month.')
  return
}

  if (
    !project.title ||
    !project.domain ||
    !project.tech ||
    !project.abstract ||
    !project.features
  ) {
    alert('Please fill in all the fields.')
    return
  }

  try {
    const data = await validateProject(project)
    setResult(data)
    await trackUsage(user.id, 'project_validator')

setUsage(usage + 1)
  } catch (err) {
    alert(err.message)
  }
}
  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-10">

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              AI Validation Tool
            </div>

            <h1 className="font-display font-800 text-3xl text-white">
              Project Validator
            </h1>

            <p className="text-slate-500 text-sm mt-2">
              Validate your project idea using AI and receive detailed feedback,
              innovation scores, and improvement suggestions.
            </p>
          </motion.div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  {/* Left Side */}
<div className="glass-card p-6 space-y-5">

  <h2 className="text-white text-xl font-bold">
    Project Details
  </h2>

  <div>
    <label className="text-slate-400 text-sm">
      Project Title
    </label>

 <input
  type="text"
  name="title"
  value={project.title}
  onChange={handleChange}
  placeholder="Enter your project title"
  className="input-field mt-2"
/>
  </div>

  <div>
    <label className="text-slate-400 text-sm">
      Domain
    </label>
<select
  name="domain"
  value={project.domain}
  onChange={handleChange}
  className="input-field mt-2"
>
  <option value="">Select Domain</option>
  <option value="Artificial Intelligence">Artificial Intelligence</option>
  <option value="Machine Learning">Machine Learning</option>
  <option value="Web Development">Web Development</option>
  <option value="Cyber Security">Cyber Security</option>
  <option value="Cloud Computing">Cloud Computing</option>
  <option value="IoT">IoT</option>
  <option value="Data Science">Data Science</option>
  <option value="Blockchain">Blockchain</option>
</select>
  </div>

  <div>
    <label className="text-slate-400 text-sm">
      Technology Stack
    </label>

 <input
  type="text"
  name="tech"
  value={project.tech}
  onChange={handleChange}
  placeholder="React, Node.js, Python..."
  className="input-field mt-2"
/>
  </div>

  <div>
    <label className="text-slate-400 text-sm">
      Project Abstract
    </label>

    <textarea
  name="abstract"
  value={project.abstract}
  onChange={handleChange}
  rows="5"
  placeholder="Describe your project..."
  className="input-field resize-none mt-2"
/>
  </div>

  <div>
    <label className="text-slate-400 text-sm">
      Key Features
    </label>

   <textarea
  name="features"
  value={project.features}
  onChange={handleChange}
  rows="4"
  placeholder="Enter important features..."
  className="input-field resize-none mt-2"
/>
  </div>
<button
  onClick={handleValidate}
  disabled={usage >= 1}
  className={`btn-primary w-full justify-center ${
    usage >= 1 ? 'opacity-60 cursor-not-allowed' : ''
  }`}
>
  {usage >= 1
    ? 'Monthly Limit Reached'
    : 'Validate Project'}
</button>

</div>

  {/* Right Side */}
  <div className="glass-card p-6 space-y-5">

  <h2 className="text-white text-xl font-bold">
    AI Validation Report
  </h2>
<div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-4 my-4">
  <h3 className="text-cyan-400 font-semibold">
    Free Plan
  </h3>

  <p className="text-slate-300 text-sm mt-2">
    {usage}/1 Project Validation used this month.
  </p>
</div>

  {/* Overall Score */}
  <div className="flex justify-center">
    <div className="w-36 h-36 rounded-full border-4 border-cyan-400 flex flex-col items-center justify-center">
     <h1 className="text-4xl font-bold text-white">
  {result ? result.score : '--'}
</h1>
      <p className="text-cyan-400 text-sm">
        /100
      </p>
    </div>
  </div>

  {/* Score Cards */}

  <div className="grid grid-cols-2 gap-4">

    <div className="bg-white/5 rounded-xl p-4">
      <p className="text-slate-400 text-sm">
        Innovation
      </p>
      <h3 className="text-white text-xl font-bold">
  {result ? `${result.innovation}%` : '--'}
</h3>
    </div>

    <div className="bg-white/5 rounded-xl p-4">
      <p className="text-slate-400 text-sm">
        Feasibility
      </p>
      <h3 className="text-white text-xl font-bold">
  {result ? `${result.feasibility}%` : '--'}
</h3>
    </div>

    <div className="bg-white/5 rounded-xl p-4">
      <p className="text-slate-400 text-sm">
        Market Demand
      </p>
   <h3 className="text-white text-xl font-bold">
  {result ? `${result.market}%` : '--'}
</h3>
    </div>

    <div className="bg-white/5 rounded-xl p-4">
      <p className="text-slate-400 text-sm">
        Startup Potential
      </p>
  <h3 className="text-white text-xl font-bold">
  {result ? `${result.startup}%` : '--'}
</h3>
    </div>

  </div>

  {/* AI Suggestions */}

  <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-xl p-4">

    <h3 className="text-cyan-400 font-semibold mb-2">
      AI Suggestions
    </h3>

  <ul className="list-disc ml-5 text-slate-300 text-sm space-y-2">
  {result ? (
   (result?.suggestions || []).map((item, index) => (
      <li key={index}>{item}</li>
    ))
  ) : (
    <li>Click "Validate Project" to get AI suggestions.</li>
  )}
</ul>

  </div>

  {/* Final Verdict */}

  <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">

    <h3 className="text-green-400 font-semibold">
      Final Verdict
    </h3>

<p className="text-slate-300 text-sm mt-2">
  {result
    ? result.verdict
    : 'Validate your project to receive an AI-generated verdict.'}
</p>

  </div>

</div>

</div>


        </div>
      </main>
    </div>
  )
}