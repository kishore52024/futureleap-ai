// Groq API Helper - OpenAI compatible

const IS_PROD = import.meta.env.PROD

async function callViaAPI(type, payload) {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, payload }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Server error')
  return data.result
}

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

const PROMPTS = {
  project: ({ skills, interests, difficulty, domain }) => `
You are a senior software engineer and startup mentor. Generate a detailed project idea for a student.

Student Profile:
- Skills: ${skills}
- Interests: ${interests}
- Difficulty Level: ${difficulty}
- Domain: ${domain}

Respond ONLY with a valid JSON object:
{
  "title": "Project title",
  "tagline": "One-line hook",
  "problem": "Problem statement",
  "features": ["Feature 1","Feature 2","Feature 3","Feature 4","Feature 5"],
  "techStack": {
    "frontend": "...",
    "backend": "...",
    "database": "...",
    "apis": "...",
    "deployment": "..."
  },
  "monetization": "Monetization strategy",
  "timeline": "Estimated build time",
  "difficulty": "${difficulty}",
  "domain": "${domain}"
}`.trim(),

  resume: ({ resumeText }) => `
You are a top recruiter. Analyze this resume.

Resume:
${(resumeText || '').slice(0, 4000)}

Respond ONLY with a valid JSON object:
{
  "score": 72,
  "grade": "B",
  "summary": "Overall assessment",
  "strengths": ["Strength 1","Strength 2","Strength 3"],
  "weaknesses": ["Weakness 1","Weakness 2","Weakness 3"],
  "suggestions": [
    {"area": "Area name","tip": "Specific advice"},
    {"area": "Area name","tip": "Specific advice"},
    {"area": "Area name","tip": "Specific advice"}
  ],
  "atsScore": 65,
  "keywordsFound": ["keyword1","keyword2"],
  "keywordsMissing": ["keyword1","keyword2"]
}`.trim(),

  career: ({ currentSkills, targetJob }) => `
You are a tech career counselor. Create a detailed roadmap.

Current Skills: ${currentSkills}
Target Job: ${targetJob}

Respond ONLY with a valid JSON object:
{
  "targetRole": "${targetJob}",
  "estimatedTime": "X months",
  "overview": "Short overview",
  "phases": [
    {
      "phase": 1,
      "title": "Foundation",
      "duration": "2 months",
      "skills": ["Skill 1","Skill 2"],
      "projects": ["Project 1","Project 2"],
      "resources": ["Resource 1","Resource 2"]
    }
  ],
  "salaryRange": "$XX,000 - $XX,000",
  "topCompanies": ["Company 1","Company 2","Company 3"],
  "certifications": ["Cert 1","Cert 2"]
}`.trim(),
}

async function callDirectly(type, payload) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY

  if (!apiKey || !apiKey.startsWith('gsk_')) {
    throw new Error('Groq API key not set. Add VITE_GROQ_API_KEY to your .env file.')
  }

  const prompt = PROMPTS[type](payload)

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1800,
      temperature: 0.8,
      response_format: { type: 'json_object' },
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error?.message || 'Groq API error')
  }

  const raw = data.choices[0].message.content
  const clean = raw.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}

async function call(type, payload) {
  if (IS_PROD) return callViaAPI(type, payload)
  return callDirectly(type, payload)
}

export const generateProjectIdea = (payload) => call('project', payload)
export const analyzeResume = (payload) => call('resume', payload)
export const generateCareerPath = (payload) => call('career', payload)