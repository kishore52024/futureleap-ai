import ProfileSettings from '../components/settings/ProfileSettings'
import AppearanceSettings from '../components/settings/AppearanceSettings'
import LanguageSettings from '../components/settings/LanguageSettings'
import NotificationSettings from '../components/settings/NotificationSettings'
import PrivacySettings from '../components/settings/PrivacySettings'
import SubscriptionSettings from '../components/settings/SubscriptionSettings'
import HelpSettings from '../components/settings/HelpSettings'
import { useState } from 'react'
import Sidebar from '../components/layout/Sidebar'
import { useAuth } from '../hooks/useAuth'
import {
  User,
  Palette,
  Languages,
  Bell,
  Shield,
  CreditCard,
  HelpCircle
} from 'lucide-react'

export default function SettingsPage() {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState('Profile')

  const cards = [
    { icon: User, title: 'Profile', desc: user?.email || 'Manage your profile details' },
    { icon: Palette, title: 'Appearance', desc: 'Theme, dark mode and display preferences' },
    { icon: Languages, title: 'Language', desc: 'English, Telugu, Hindi, Tamil' },
    { icon: Bell, title: 'Notifications', desc: 'Email alerts and product updates' },
    { icon: Shield, title: 'Privacy & Security', desc: 'Password, data privacy and account safety' },
    { icon: CreditCard, title: 'Subscription', desc: 'Plan, billing and upgrade options' },
    { icon: HelpCircle, title: 'Help & Support', desc: 'FAQ, contact and product help' },
  ]

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="mb-8">
            <p className="text-xs text-slate-500 font-mono mb-2">Account</p>
            <h1 className="font-display font-800 text-3xl text-white">Settings</h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage your FutureLeap AI account preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {cards.map((card, i) => (
              <button
                key={i}
                onClick={() => setActiveSection(card.title)}
                className={`glass-card p-5 text-left hover:border-cyan-400/20 transition-all ${
                  activeSection === card.title
                    ? 'border border-cyan-400/30 bg-cyan-400/5'
                    : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                    <card.icon className="w-5 h-5 text-cyan-400" />
                  </div>

                  <div>
                    <h3 className="font-display font-700 text-white text-sm">
                      {card.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

 <div className="mt-8">
  {activeSection === 'Profile' && <ProfileSettings />}

  {activeSection === 'Appearance' && <AppearanceSettings />}

  {activeSection === 'Language' && <LanguageSettings />}

  {activeSection === 'Notifications' && <NotificationSettings />}

  {activeSection === 'Privacy & Security' && <PrivacySettings />}

  {activeSection === 'Subscription' && <SubscriptionSettings />}

  {activeSection === 'Help & Support' && <HelpSettings />}

  {activeSection !== 'Profile' &&
    activeSection !== 'Appearance' &&
    activeSection !== 'Language' &&
activeSection !== 'Notifications' &&
activeSection !== 'Privacy & Security' &&
activeSection !== 'Subscription' && 
activeSection !== 'Help & Support' &&(
      <div className="glass-card p-6">
        <h2 className="font-display font-800 text-xl text-white mb-2">
          {activeSection}
        </h2>
        <p className="text-slate-500 text-sm">
          {activeSection} settings will be added here.
        </p>
      </div>
    )}
</div>
        </div>
      </main>
    </div>
  )
}