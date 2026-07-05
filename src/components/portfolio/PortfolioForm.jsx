import { generatePortfolio } from '../../lib/openai'
import { useState } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Code2,
  Github,
  Linkedin,
  Globe,
  Palette,
  Sparkles,
} from "lucide-react";

export default function PortfolioForm({ onGenerate }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    about: "",
    skills: "",
    projects: "",
    education: "",
    github: "",
    linkedin: "",
    website: "",
    theme: "Dark",
  });
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
const handleGenerate = async () => {
  if (
    !form.name ||
    !form.role ||
    !form.about ||
    !form.skills
  ) {
    alert('Please fill all required fields.')
    return
  }

  try {
    setLoading(true)

    const data = await generatePortfolio(form)

     onGenerate(data)

    console.log("Portfolio Generated")
    console.log(data)

    alert("Portfolio Generated Successfully!")

  } catch (err) {
    alert(err.message)
  } finally {
    setLoading(false)
  }
}
  return (
    <div className="glass-card p-8 space-y-6">

      <div>
        <h2 className="text-2xl font-bold text-white">
          Portfolio Details
        </h2>

        <p className="text-slate-400 mt-1">
          Fill your details and let AI generate a professional portfolio.
        </p>
      </div>

      {/* Name */}

      <div>
        <label className="text-slate-300 flex items-center gap-2 mb-2">
          <User size={16} />
          Full Name
        </label>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="input-field"
          placeholder="Minni"
        />
      </div>

      {/* Role */}

      <div>
        <label className="text-slate-300 flex items-center gap-2 mb-2">
          <Briefcase size={16} />
          Professional Title
        </label>

        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          className="input-field"
          placeholder="AI Engineer"
        />
      </div>

      {/* About */}

      <div>
        <label className="text-slate-300 mb-2 flex items-center gap-2">
          <Sparkles size={16} />
          About Me
        </label>

        <textarea
          rows={5}
          name="about"
          value={form.about}
          onChange={handleChange}
          className="input-field"
          placeholder="Tell AI about yourself..."
        />
      </div>

      {/* Skills */}

      <div>
        <label className="text-slate-300 mb-2 flex items-center gap-2">
          <Code2 size={16} />
          Skills
        </label>

        <input
          name="skills"
          value={form.skills}
          onChange={handleChange}
          className="input-field"
          placeholder="React, Node.js, AI, Python..."
        />
      </div>

      {/* Projects */}

      <div>
        <label className="text-slate-300 mb-2 flex items-center gap-2">
          <Briefcase size={16} />
          Projects
        </label>

        <textarea
          rows={3}
          name="projects"
          value={form.projects}
          onChange={handleChange}
          className="input-field"
          placeholder="FutureLeap AI, Smart Attendance..."
        />
      </div>

      {/* Education */}

      <div>
        <label className="text-slate-300 mb-2 flex items-center gap-2">
          <GraduationCap size={16} />
          Education
        </label>

        <textarea
          rows={2}
          name="education"
          value={form.education}
          onChange={handleChange}
          className="input-field"
          placeholder="B.Tech Computer Science..."
        />
      </div>

      {/* GitHub */}

      <div>
        <label className="text-slate-300 mb-2 flex items-center gap-2">
          <Github size={16} />
          GitHub
        </label>

        <input
          name="github"
          value={form.github}
          onChange={handleChange}
          className="input-field"
          placeholder="https://github.com/username"
        />
      </div>

      {/* LinkedIn */}

      <div>
        <label className="text-slate-300 mb-2 flex items-center gap-2">
          <Linkedin size={16} />
          LinkedIn
        </label>

        <input
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          className="input-field"
          placeholder="https://linkedin.com/in/username"
        />
      </div>

      {/* Website */}

      <div>
        <label className="text-slate-300 mb-2 flex items-center gap-2">
          <Globe size={16} />
          Website
        </label>

        <input
          name="website"
          value={form.website}
          onChange={handleChange}
          className="input-field"
          placeholder="https://yourwebsite.com"
        />
      </div>

      {/* Theme */}

      <div>
        <label className="text-slate-300 mb-2 flex items-center gap-2">
          <Palette size={16} />
          Portfolio Theme
        </label>

        <select
          name="theme"
          value={form.theme}
          onChange={handleChange}
          className="input-field"
        >
          <option>Dark</option>
          <option>Glass</option>
          <option>Developer</option>
          <option>Minimal</option>
          <option>Startup</option>
        </select>
      </div>

      <button
  onClick={handleGenerate}
  disabled={loading}
  className="btn-primary w-full justify-center"
>
  {loading ? 'Generating...' : '✨ Generate Portfolio'}
</button>

    </div>
  );
}