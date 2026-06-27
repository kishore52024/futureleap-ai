import {
  HelpCircle,
  Mail,
  Bug,
  Lightbulb,
  FileText,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  X,
  Send
} from 'lucide-react'
import { useState } from 'react'

export default function HelpSettings() {
  const [openFAQ, setOpenFAQ] = useState(null)
  const [activeModal, setActiveModal] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  const faqs = [
    {
      question: 'How does AI Project Generator work?',
      answer:
        'It generates project ideas based on your skills, interests, and preferred difficulty using AI.'
    },
    {
      question: 'Can I save my generated projects?',
      answer:
        'Yes. Every generated project can be saved to your dashboard for future access.'
    },
    {
      question: 'Is my data secure?',
      answer:
        'Yes. FutureLeap AI uses secure authentication and encrypted communication to protect your account.'
    },
    {
      question: 'How can I contact support?',
      answer:
        'You can contact us through the Contact Support option or email support@futureleap.ai.'
    }
  ]

  const closeModal = () => {
    setActiveModal(null)
    setSuccessMessage('')
  }

const handleSubmit = (type) => {
  if (type === 'support') {
    setSuccessMessage('Support request submitted successfully. We will respond within 24–48 hours.')
    return
  }

  setSuccessMessage(
    type === 'bug'
      ? 'Bug report submitted successfully.'
      : 'Feature request submitted successfully.'
  )
}

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-800 text-xl text-white">
          Help & Support
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Find answers, contact support, and share feedback.
        </p>
      </div>

      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white font-display font-700">FAQ</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <button
              key={index}
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              className="w-full text-left p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-white text-sm font-700">
                  {faq.question}
                </span>

                {openFAQ === index ? (
                  <ChevronUp className="w-4 h-4 text-cyan-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </div>

              {openFAQ === index && (
                <p className="text-slate-500 text-sm mt-3">{faq.answer}</p>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       <button
  onClick={() => setActiveModal('support')}
  className="glass-card p-5 text-left hover:border-cyan-400/20 transition"
>
  <Mail className="w-5 h-5 text-cyan-400 mb-3" />
  <h3 className="text-white font-display font-700">Contact Support</h3>
  <p className="text-slate-500 text-sm mt-2">
    Email us for account, billing, or technical help.
  </p>
</button>

        <button
          onClick={() => setActiveModal('bug')}
          className="glass-card p-5 text-left hover:border-cyan-400/20 transition"
        >
          <Bug className="w-5 h-5 text-red-400 mb-3" />
          <h3 className="text-white font-display font-700">Report a Bug</h3>
          <p className="text-slate-500 text-sm mt-2">
            Tell us if something is broken or not working properly.
          </p>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveModal('feature')}
          className="glass-card p-5 text-left hover:border-cyan-400/20 transition"
        >
          <Lightbulb className="w-5 h-5 text-yellow-400 mb-3" />
          <h3 className="text-white font-display font-700">
            Request a Feature
          </h3>
          <p className="text-slate-500 text-sm mt-2">
            Suggest new features you'd love to see in FutureLeap AI.
          </p>
        </button>

        <button
          onClick={() => setActiveModal('privacy')}
          className="glass-card p-5 text-left hover:border-cyan-400/20 transition"
        >
          <ShieldCheck className="w-5 h-5 text-green-400 mb-3" />
          <h3 className="text-white font-display font-700">Privacy Policy</h3>
          <p className="text-slate-500 text-sm mt-2">
            Learn how we collect, store, and protect your data.
          </p>
        </button>

        <button
          onClick={() => setActiveModal('terms')}
          className="glass-card p-5 text-left hover:border-cyan-400/20 transition"
        >
          <FileText className="w-5 h-5 text-purple-400 mb-3" />
          <h3 className="text-white font-display font-700">
            Terms & Conditions
          </h3>
          <p className="text-slate-500 text-sm mt-2">
            Read the rules and terms for using FutureLeap AI.
          </p>
        </button>
      </div>

      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-dark-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-display font-800 text-lg">
            {activeModal === 'support' && 'Contact Support'}
{activeModal === 'bug' && 'Report a Bug'}
{activeModal === 'feature' && 'Request a Feature'}
{activeModal === 'privacy' && 'Privacy Policy'}
{activeModal === 'terms' && 'Terms & Conditions'}
              </h3>

              <button
                onClick={closeModal}
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
              >
                <X className="w-4 h-4 text-slate-300" />
              </button>
            </div>
{(activeModal === 'support' || activeModal === 'bug' || activeModal === 'feature') && (
              <div className="space-y-4">
                {successMessage && (
                  <div className="rounded-xl border border-green-400/20 bg-green-400/10 px-4 py-3 text-green-300 text-sm">
                    {successMessage}
                  </div>
                )}

                <input
                  type="text"
placeholder={
  activeModal === 'support'
    ? 'Support subject'
    : activeModal === 'bug'
    ? 'Bug title'
    : 'Feature request title'
}
                  className="w-full rounded-xl bg-dark-900 border border-white/10 px-4 py-3 text-white outline-none focus:border-cyan-400/50"
                />

                <textarea
                  rows="5"
             placeholder={
  activeModal === 'support'
    ? 'Describe your issue or question...'
    : activeModal === 'bug'
    ? 'Describe the issue...'
    : 'Describe the feature idea...'
}
                  className="w-full rounded-xl bg-dark-900 border border-white/10 px-4 py-3 text-white outline-none focus:border-cyan-400/50 resize-none"
                />

                <button
                  onClick={() => handleSubmit(activeModal)}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-400 text-dark-950 font-800 hover:bg-cyan-300 transition"
                >
                  <Send className="w-4 h-4" />
                  Submit
                </button>
              </div>
            )}

            {activeModal === 'privacy' && (
              <div className="space-y-5 text-slate-400 text-sm max-h-[65vh] overflow-y-auto pr-2 leading-relaxed">
                <p>
                  FutureLeap AI respects your privacy and is committed to
                  protecting your personal information. This Privacy Policy
                  explains how we collect, use, store, and protect your data
                  when you use our platform.
                </p>

                <div>
                  <h4 className="text-white font-700 mb-1">1. Introduction</h4>
                  <p>
                    FutureLeap AI is a student-focused AI platform that helps
                    users generate project ideas, analyze resumes, explore
                    career paths, and save their learning progress.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    2. Information We Collect
                  </h4>
                  <p>
                    We may collect your name, email address, profile picture
                    from Google Sign-In, saved projects, preferences, resume
                    inputs, AI prompts, usage statistics, and account settings.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    3. How We Use Your Information
                  </h4>
                  <p>
                    Your information is used to provide AI-generated project
                    ideas, resume analysis, career recommendations, saved
                    project access, personalization, product analytics, and
                    customer support.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    4. Authentication & Security
                  </h4>
                  <p>
                    We use secure authentication, encrypted communication,
                    protected sessions, and trusted cloud services to help keep
                    your account safe. Passwords are handled securely through
                    authentication providers.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">5. AI Services</h4>
                  <p>
                    FutureLeap AI may use external AI providers to generate
                    responses. AI outputs are generated from the information you
                    provide and should be reviewed before academic,
                    professional, or public use.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    6. Cookies & Local Storage
                  </h4>
                  <p>
                    We may use cookies or local storage to manage login
                    sessions, remember theme preferences, language choices, and
                    improve platform performance.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">7. Data Storage</h4>
                  <p>
                    User data may be stored using Supabase database services and
                    secure cloud infrastructure. Communication between the app
                    and backend services is protected using encrypted
                    connections.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    8. Third-Party Services
                  </h4>
                  <p>
                    FutureLeap AI may use services such as Supabase, Google
                    Authentication, OpenAI, Groq, Vercel, or similar providers
                    to deliver authentication, hosting, AI generation, and app
                    functionality.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    9. Data Sharing
                  </h4>
                  <p>
                    We do not sell your personal data. Data may only be shared
                    with trusted service providers when necessary to operate,
                    secure, and improve FutureLeap AI.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    10. User Rights
                  </h4>
                  <p>
                    You may update your profile, change your password, manage
                    preferences, delete your account, or request data removal
                    through account settings or support.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    11. Children&apos;s Privacy
                  </h4>
                  <p>
                    FutureLeap AI is intended for students and learners who meet
                    the applicable minimum age requirements in their region.
                    Users under the required age should use the platform only
                    with proper guidance or permission.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    12. Policy Updates
                  </h4>
                  <p>
                    We may update this Privacy Policy as FutureLeap AI evolves.
                    Continued use of the platform after updates means you accept
                    the revised policy.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">13. Contact</h4>
                  <p>
                    For privacy questions or data requests, contact us at
                    support@futureleap.ai.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'terms' && (
              <div className="space-y-5 text-slate-400 text-sm max-h-[65vh] overflow-y-auto pr-2 leading-relaxed">
                <p>
                  These Terms & Conditions explain the rules for using
                  FutureLeap AI. By using the platform, you agree to follow
                  these terms.
                </p>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    1. Acceptance of Terms
                  </h4>
                  <p>
                    By accessing or using FutureLeap AI, you agree to these
                    Terms & Conditions and our Privacy Policy.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">2. Eligibility</h4>
                  <p>
                    You must provide accurate account information and use the
                    platform responsibly. Users should meet the applicable
                    minimum age requirements in their region.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    3. Account Responsibility
                  </h4>
                  <p>
                    You are responsible for maintaining the security of your
                    account, password, login session, and activities performed
                    under your account.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    4. Acceptable Use
                  </h4>
                  <p>
                    You agree not to abuse AI features, spam the platform,
                    upload harmful content, attempt hacking, copy copyrighted
                    material illegally, reverse engineer services, or misuse the
                    platform in any way.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    5. AI Content Disclaimer
                  </h4>
                  <p>
                    AI-generated content may be incomplete, inaccurate, or
                    outdated. You should verify important outputs before using
                    them for academic work, professional submissions, legal
                    matters, medical decisions, or financial decisions.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    6. Educational Use
                  </h4>
                  <p>
                    FutureLeap AI is designed to support learning, project
                    planning, resume improvement, and career exploration. It
                    should not be used for plagiarism, cheating, or submitting
                    AI work without review.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    7. Intellectual Property
                  </h4>
                  <p>
                    FutureLeap AI owns its brand, user interface, design,
                    software, logo, and platform features. Users retain rights
                    to the original content they create or upload.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    8. User Content
                  </h4>
                  <p>
                    You are responsible for the content you submit, including
                    prompts, resumes, project details, and feedback. Do not
                    upload content that violates laws or another person&apos;s
                    rights.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    9. Service Availability
                  </h4>
                  <p>
                    FutureLeap AI may update features, perform maintenance,
                    improve AI models, change pricing, or modify platform
                    functionality as the product evolves.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    10. Limitation of Liability
                  </h4>
                  <p>
                    FutureLeap AI is not responsible for losses, damages, or
                    decisions made based on AI-generated content or platform
                    recommendations.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">11. Termination</h4>
                  <p>
                    We may suspend or terminate accounts that violate these
                    terms, misuse the platform, attempt unauthorized access, or
                    harm other users or services.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    12. Changes to Terms
                  </h4>
                  <p>
                    These Terms & Conditions may be updated over time. Continued
                    use of FutureLeap AI after changes means you accept the
                    updated terms.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">
                    13. Governing Law
                  </h4>
                  <p>
                    These terms are governed by applicable laws based on the
                    operating location or future registered jurisdiction of
                    FutureLeap AI.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-700 mb-1">14. Contact</h4>
                  <p>
                    For questions about these terms, contact us at
                    support@futureleap.ai.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}