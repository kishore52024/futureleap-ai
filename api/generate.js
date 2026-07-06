// api/generate.js
// Vercel Serverless Function using Groq API

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
- Every field shown below MUST be included.
- Do not remove any key from the JSON structure.

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
    },
    {
      "day": "Day 2",
      "title": "UI/UX Design",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "deliverable": "What should be completed on this day"
    },
    {
      "day": "Day 3",
      "title": "Frontend Setup",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "deliverable": "What should be completed on this day"
    },
    {
      "day": "Day 4",
      "title": "Backend Setup",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "deliverable": "What should be completed on this day"
    },
    {
      "day": "Day 5",
      "title": "Database Integration",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "deliverable": "What should be completed on this day"
    },
    {
      "day": "Day 6",
      "title": "Core Feature Development",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "deliverable": "What should be completed on this day"
    },
    {
      "day": "Day 7",
      "title": "AI/API Integration",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "deliverable": "What should be completed on this day"
    },
    {
      "day": "Day 8",
      "title": "Testing and Debugging",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "deliverable": "What should be completed on this day"
    },
    {
      "day": "Day 9",
      "title": "Deployment",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "deliverable": "What should be completed on this day"
    },
    {
      "day": "Day 10",
      "title": "Documentation and Presentation",
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
}
`.trim(),
career: ({ currentSkills, targetJob }) => `
...
`.trim(),

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
    error: 'Invalid request. type must be: project | resume | career | validator',
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
        max_tokens: 3500,
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