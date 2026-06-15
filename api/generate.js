// api/generate.js
// Vercel Serverless Function using Groq API

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
    },
    {
      "phase": 2,
      "title": "Core Development",
      "duration": "3 months",
      "skills": ["Skill 1","Skill 2"],
      "projects": ["Project 1","Project 2"],
      "resources": ["Resource 1","Resource 2"]
    },
    {
      "phase": 3,
      "title": "Job Ready",
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  res.setHeader('Access-Control-Allow-Origin', process.env.VITE_APP_URL || '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  const { type, payload } = req.body

  if (!type || !payload || !PROMPTS[type]) {
    return res.status(400).json({
      error: 'Invalid request. type must be: project | resume | career',
    })
  }

  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    return res.status(500).json({
      error: 'GROQ_API_KEY not configured on server.',
    })
  }

  try {
    const prompt = PROMPTS[type](payload)

    const response = await fetch(GROQ_URL, {
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

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || 'Groq API error',
      })
    }

    const raw = data.choices[0].message.content
    const clean = raw.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    return res.status(200).json({ result: parsed })
  } catch (err) {
    console.error('API route error:', err)
    return res.status(500).json({
      error: err.message || 'Internal server error',
    })
  }
}
