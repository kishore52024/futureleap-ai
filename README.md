# ⚡ FutureLeap AI

**The AI-powered career launchpad for ambitious students.**

Generate standout project ideas, get your resume scored by AI, and map your path to your dream job — all in one beautifully designed platform.

---

## 📸 Features

| Tool | Description |
|---|---|
| 🧠 **Project Idea Generator** | Enter your skills & interests → get a full project brief (title, features, tech stack, monetization) |
| 📄 **Resume Analyzer** | Paste or upload your resume → ATS score, strengths, weaknesses, improvement tips |
| 🗺️ **Career Path Guider** | Enter current skills + target job → month-by-month roadmap with projects & resources |
| 💾 **Dashboard** | All outputs auto-saved to your personal Supabase-backed dashboard |

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS (glassmorphism, dark theme, neon accents)
- **Animations**: Framer Motion
- **Auth + DB**: Supabase (PostgreSQL + Row Level Security)
- **AI**: OpenAI GPT-4o mini
- **Routing**: React Router v6
- **Deployment**: Vercel

---

## 📁 Folder Structure

```
futureleap-ai/
├── api/
│   └── generate.js          # Vercel serverless function (keeps OpenAI key server-side)
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Footer.jsx
│   │   ├── sections/         # Landing page sections
│   │   │   ├── HeroSection.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   ├── HowItWorksSection.jsx
│   │   │   ├── PricingSection.jsx
│   │   │   ├── FAQSection.jsx
│   │   │   └── CTASection.jsx
│   │   └── ui/               # Reusable UI primitives
│   │       ├── GlassCard.jsx
│   │       ├── Badge.jsx
│   │       ├── ErrorMessage.jsx
│   │       ├── LoadingSpinner.jsx
│   │       └── PageTransition.jsx
│   ├── hooks/
│   │   └── useAuth.jsx       # Auth context + hook
│   ├── lib/
│   │   ├── supabase.js       # Supabase client + DB helpers
│   │   └── openai.js         # OpenAI helpers (server route in prod, direct in dev)
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── ForgotPasswordPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── ProjectGeneratorPage.jsx
│   │   ├── ResumeAnalyzerPage.jsx
│   │   └── CareerPathPage.jsx
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql  # Run this in Supabase SQL Editor
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── vercel.json
```

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourname/futureleap-ai.git
cd futureleap-ai

npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

Open `.env` and fill in:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_OPENAI_API_KEY=sk-your-key-here   # local dev only
```

### 3. Run the Dev Server

```bash
npm run dev
```

Visit: **http://localhost:5173**

---

## 🗄️ Supabase Setup

### Step 1 — Create a Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click **New Project** → give it a name → choose a region → set a DB password
3. Wait ~1 minute for it to provision

### Step 2 — Get Your API Keys

1. In your project: **Settings → API**
2. Copy **Project URL** → paste as `VITE_SUPABASE_URL` in `.env`
3. Copy **anon / public key** → paste as `VITE_SUPABASE_ANON_KEY` in `.env`

### Step 3 — Run the Database Schema

1. In Supabase: **SQL Editor → New Query**
2. Open `supabase/migrations/001_initial_schema.sql`
3. Paste the entire contents → click **Run**

This creates the tables:

| Table | Purpose |
|---|---|
| `profiles` | Auto-created on signup; stores name, plan, usage |
| `saved_projects` | AI-generated project ideas |
| `resumes` | Resume analysis results |
| `career_paths` | Career roadmaps |
| `payments` | Billing records (for Stripe integration) |

All tables have **Row Level Security** — users can only access their own data.

### Step 4 — Enable Email Auth

1. **Authentication → Providers → Email** — make sure it's enabled
2. Optionally disable "Confirm email" for easier local testing:
   **Authentication → Settings → uncheck "Enable email confirmations"**

---

## 🔑 OpenAI Setup

### Get an API Key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. **Create new secret key**
3. Add it to `.env` as `VITE_OPENAI_API_KEY` (for local dev)

### Security: How Keys Are Handled

| Environment | How it works |
|---|---|
| **Local dev** (`npm run dev`) | `VITE_OPENAI_API_KEY` used directly from `.env` |
| **Production** (Vercel) | Calls route through `/api/generate.js` (serverless function). Only `OPENAI_API_KEY` (no VITE prefix) is needed — it **never reaches the browser** |

---

## ☁️ Deploy to Vercel

### Option A — Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Go to [https://vercel.com/new](https://vercel.com/new) → Import your repo
3. Framework: **Vite** (auto-detected)
4. Add Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY` ← **no VITE_ prefix** (server-side only)
   - `VITE_APP_URL` = `https://your-app.vercel.app`
5. Click **Deploy** 🚀

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

Follow the prompts. Add env vars when asked, or run:

```bash
vercel env add OPENAI_API_KEY production
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
```

### Update Supabase Auth Redirect URL

After deploying, go to:
**Supabase → Authentication → URL Configuration**

Add your Vercel URL:
```
https://your-app.vercel.app
https://your-app.vercel.app/**
```

---

## 🎨 Design System

### Colors

| Token | Hex | Usage |
|---|---|---|
| `neon-cyan` | `#00e5ff` | Primary accents, CTAs |
| `neon-green` | `#00ff87` | Success states, gradients |
| `neon-purple` | `#bf5af2` | Secondary accents |
| `dark-950` | `#03050a` | Page background |
| `dark-900` | `#060b14` | Card backgrounds |

### Key CSS Classes (globals.css)

```css
.glass-card          /* Glassmorphism base card */
.glass-card-hover    /* + hover lift & glow */
.gradient-text       /* Cyan → green → purple gradient text */
.gradient-text-cyan  /* Cyan → green gradient text */
.btn-primary         /* Neon gradient CTA button */
.btn-ghost           /* Bordered ghost button */
.input-field         /* Consistent dark form inputs */
.blob                /* Floating background glow blobs */
.section-container   /* max-w-7xl centered container */
```

### Fonts

- **Display / Headings**: [Syne](https://fonts.google.com/specimen/Syne) — bold, geometric
- **Body**: [DM Sans](https://fonts.google.com/specimen/DM+Sans) — clean, readable
- **Monospace**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — badges, code

---

## 📦 Available Scripts

```bash
npm run dev      # Start dev server at localhost:5173
npm run build    # Build for production (outputs to /dist)
npm run preview  # Preview production build locally
```

---

## 🔧 Customisation Tips

### Change the AI model
In `api/generate.js` and `src/lib/openai.js`, change:
```js
model: 'gpt-4o-mini'  →  model: 'gpt-4o'  // more powerful, costs more
```

### Add a new AI tool
1. Add a prompt to `PROMPTS` in both `api/generate.js` and `src/lib/openai.js`
2. Create a new page in `src/pages/`
3. Add it to the sidebar in `src/components/layout/Sidebar.jsx`
4. Add a route in `src/App.jsx`

### Connect Stripe (Payments)
The `payments` table is already created in Supabase. Add a Stripe webhook handler as a new Vercel API route (`api/webhook.js`) to write to it.

---

## 🛡️ Security Checklist

- ✅ OpenAI key never in browser bundle (uses `/api/generate.js` in prod)
- ✅ Supabase Row Level Security enabled on all tables
- ✅ Users can only read/write their own data
- ✅ `.env` in `.gitignore` — never committed
- ✅ Auth handled by Supabase (JWT, sessions, password hashing)

---

## 📄 License

MIT — free to use, modify, and deploy.

---

Built with ❤️ for ambitious students 🚀
