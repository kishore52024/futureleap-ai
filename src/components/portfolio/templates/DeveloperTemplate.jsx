export default function DeveloperTemplate({ portfolio }) {
  if (!portfolio) return null

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white rounded-2xl overflow-hidden">

      {/* Hero */}
      <section className="px-10 py-16 border-b border-white/10">

        <h1 className="text-5xl font-bold">
          {portfolio.hero.name}
        </h1>

        <h2 className="text-cyan-400 text-2xl mt-3">
          {portfolio.hero.role}
        </h2>

        <p className="text-slate-400 mt-6 max-w-2xl leading-7">
          {portfolio.hero.description}
        </p>

      </section>

      {/* About */}
      <section className="px-10 py-12">

        <h2 className="text-3xl font-bold mb-6">
          About Me
        </h2>

        <p className="text-slate-300 leading-8">
          {portfolio.about.content}
        </p>

      </section>

      {/* Skills */}
      <section className="px-10 py-12">

        <h2 className="text-3xl font-bold mb-6">
          Skills
        </h2>

        <div className="flex flex-wrap gap-3">

          {portfolio.skills.map((skill, index) => (

            <div
              key={index}
              className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30"
            >
              {skill}
            </div>

          ))}

        </div>

      </section>

      {/* Projects */}
      <section className="px-10 py-12">

        <h2 className="text-3xl font-bold mb-6">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {portfolio.projects.map((project, index) => (

            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >

              <h3 className="text-xl font-bold">
                {project.title}
              </h3>

              <p className="text-slate-400 mt-3">
                {project.description}
              </p>

              <p className="text-cyan-400 mt-4">
                {project.tech}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Education */}
      <section className="px-10 py-12">

        <h2 className="text-3xl font-bold mb-6">
          Education
        </h2>

        <p className="text-xl">
          {portfolio.education.degree}
        </p>

        <p className="text-slate-400 mt-2">
          {portfolio.education.college}
        </p>

      </section>

      {/* Contact */}
      <section className="px-10 py-12 border-t border-white/10">

        <h2 className="text-3xl font-bold mb-6">
          Contact
        </h2>

        <div className="space-y-3">

          <p>GitHub: {portfolio.contact.github}</p>

          <p>LinkedIn: {portfolio.contact.linkedin}</p>

          <p>Website: {portfolio.contact.website}</p>

        </div>

      </section>

    </div>
  )
}