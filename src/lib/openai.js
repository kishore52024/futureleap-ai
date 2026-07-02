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
You are a senior software engineer, startup mentor, and academic project guide.

Generate a COMPLETE PROJECT BLUEPRINT for a student.

Student Profile:
- Skills: ${skills}
- Interests: ${interests}
- Difficulty Level: ${difficulty}
- Domain: ${domain}

Respond ONLY with a valid JSON object. No markdown. No extra text.
Important:
- The dayWisePlan array MUST contain exactly 10 detailed development days.
- Each day must include: day, title, 3 to 5 tasks, and deliverable.
- Do not generate more than 10 days.
- Make the plan practical for a student mini/major project.

{
  "title": "Project title",
  "tagline": "One-line hook",
  "problem": "Problem statement in 2-3 sentences",
  "targetUsers": ["User type 1", "User type 2", "User type 3"],
  "domain": "${domain}",
  "difficulty": "${difficulty}",
  "timeline": "Estimated build time",

  "objectives": {
    "primary": "Main objective of the project",
    "secondary": ["Objective 1", "Objective 2", "Objective 3"],
    "expectedOutcome": "Expected final outcome of the project"
  },

  "features": {
    "essential": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    "advanced": ["Advanced Feature 1", "Advanced Feature 2", "Advanced Feature 3"],
    "bonus": ["Bonus Feature 1", "Bonus Feature 2"]
  },

  "techStack": {
    "frontend": "...",
    "backend": "...",
    "database": "...",
    "aiModelOrApi": "...",
    "authentication": "...",
    "deployment": "...",
    "developmentTools": ["Tool 1", "Tool 2", "Tool 3"]
  },

  "dayWisePlan": [
  {
    "day": "Day 1",
    "title": "Planning and Requirement Analysis",
    "tasks": ["Task 1", "Task 2", "Task 3"],
    "deliverable": "What should be completed on this day"
  }
],

  "developmentPhases": [
    {
      "phase": "Phase 1",
      "title": "Planning",
      "description": "What happens in this phase"
    },
    {
      "phase": "Phase 2",
      "title": "Design",
      "description": "What happens in this phase"
    },
    {
      "phase": "Phase 3",
      "title": "Development",
      "description": "What happens in this phase"
    },
    {
      "phase": "Phase 4",
      "title": "Testing and Deployment",
      "description": "What happens in this phase"
    }
  ],

  "skillsLearned": {
    "technical": ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
    "softSkills": ["Skill 1", "Skill 2", "Skill 3"]
  },

  "resumeValue": {
    "rating": "Excellent / Good / Average",
    "description": "How this project improves a student's resume",
    "resumeBullet": "One strong resume bullet point for this project"
  },

  "industryRelevance": {
    "industries": ["Industry 1", "Industry 2", "Industry 3"],
    "description": "How this project is useful in real industries"
  },

  "estimatedCost": {
    "freeTools": ["Tool 1", "Tool 2"],
    "paidTools": ["Tool 1 if needed"],
    "approxCost": "₹0 - ₹2000"
  },

  "documentationChecklist": [
    "Abstract",
    "Introduction",
    "Problem Statement",
    "Existing System",
    "Proposed System",
    "Objectives",
    "Literature Survey",
    "System Architecture",
    "Modules",
    "Database Design",
    "Testing",
    "Results",
    "Conclusion",
    "References"
  ],

  "pptChecklist": [
    "Title Slide",
    "Problem Statement",
    "Existing System",
    "Proposed Solution",
    "Objectives",
    "Architecture Diagram",
    "Modules",
    "Technologies Used",
    "Screenshots",
    "Results",
    "Future Scope",
    "Thank You"
  ]
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
validator: ({ title, domain, tech, abstract, features }) => `
You are an expert software architect, IEEE reviewer, startup mentor, and hackathon judge.

Analyze the following student project.

Project Title:
${title}

Domain:
${domain}

Technology Stack:
${tech}

Abstract:
${abstract}

Features:
${features}

Respond ONLY with valid JSON.

{
  "score": 91,
  "innovation": 94,
  "feasibility": 89,
  "market": 90,
  "startup": 92,
  "hackathon": 95,
  "complexity": "Intermediate",
  "verdict": "Excellent project with strong innovation and startup potential.",
  "strengths": [
    "Strength 1",
    "Strength 2",
    "Strength 3"
  ],
  "weaknesses": [
    "Weakness 1",
    "Weakness 2"
  ],
  "suggestions": [
    "Suggestion 1",
    "Suggestion 2",
    "Suggestion 3",
    "Suggestion 4"
  ]
}
`.trim(),

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
     max_tokens: 3500,
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

console.log("========== AI RESPONSE ==========")
console.log(clean)

return JSON.parse(clean)
}

async function call(type, payload) {
  if (IS_PROD) return callViaAPI(type, payload)
  return callDirectly(type, payload)
}

export const generateProjectIdea = (payload) => call('project', payload)
export const analyzeResume = (payload) => call('resume', payload)
export const generateCareerPath = (payload) => call('career', payload)
export const validateProject = (payload) => call('validator', payload)