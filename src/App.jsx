import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DashboardPage from './pages/DashboardPage'
import PricingPage from "./pages/PricingPage";
import ProjectGeneratorPage from './pages/ProjectGeneratorPage'
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage'
import CareerPathPage from './pages/CareerPathPage'
import SettingsPage from './pages/SettingsPage'
import ResumeCreatorPage from './pages/ResumeCreator'
import ProjectValidatorPage from './pages/ProjectValidatorPage'
import PortfolioGeneratorPage from './pages/PortfolioGeneratorPage'
import './styles/globals.css'


// Protected route wrapper
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
    </div>
  )
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/dashboard/projects" element={<ProtectedRoute><ProjectGeneratorPage /></ProtectedRoute>} />
      <Route
  path="/dashboard/portfolio-generator"
  element={<PortfolioGeneratorPage />}
/>
      <Route path="/dashboard/resume" element={<ProtectedRoute><ResumeAnalyzerPage /></ProtectedRoute>} />
      <Route path="/dashboard/career" element={<ProtectedRoute><CareerPathPage /></ProtectedRoute>} />
      <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route
  path="/dashboard/project-validator"
  element={
    <ProtectedRoute>
      <ProjectValidatorPage />
    </ProtectedRoute>
  }
/>

      <Route
  path="/dashboard/resume-creator"
  element={
    <ProtectedRoute>
      <ResumeCreatorPage />
    </ProtectedRoute>
  }
/>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
