import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase env vars missing. See .env.example')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Auth helpers
export const signUp = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${import.meta.env.VITE_APP_URL}/reset-password`,
  })
  return { data, error }
}

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

// Project helpers
export const saveProject = async (userId, projectData) => {
  const { data, error } = await supabase
    .from('saved_projects')
    .insert([
      {
        user_id: userId,
        title: projectData.title,
        content: projectData,
      },
    ])
    .select()

  return { data, error }
}

export const getSavedProjects = async (userId) => {
  const { data, error } = await supabase
    .from('saved_projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

export const deleteProject = async (projectId) => {
  const { error } = await supabase
    .from('saved_projects')
    .delete()
    .eq('id', projectId)

  return { error }
}

// Career path helpers
export const saveCareerPath = async (userId, careerData) => {
  const { data, error } = await supabase
    .from('career_paths')
    .insert([
      {
        user_id: userId,
        roadmap: careerData,
      },
    ])
    .select()

  return { data, error }
}

export const getCareerPaths = async (userId) => {
  const { data, error } = await supabase
    .from('career_paths')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

// Resume helpers
export const saveResumeAnalysis = async (userId, analysisData) => {
  const { data, error } = await supabase
    .from('resume_reports')
    .insert([
      {
        user_id: userId,
        report: analysisData,
      },
    ])
    .select()

  return { data, error }
}

export const getResumeReports = async (userId) => {
  const { data, error } = await supabase
    .from('resume_reports')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

// Dashboard stats
export const getUserStats = async (userId) => {
  const [projects, careers, resumes] = await Promise.all([
    supabase
      .from('saved_projects')
      .select('id', { count: 'exact' })
      .eq('user_id', userId),

    supabase
      .from('career_paths')
      .select('id', { count: 'exact' })
      .eq('user_id', userId),

    supabase
      .from('resume_reports')
      .select('id', { count: 'exact' })
      .eq('user_id', userId),
  ])

  return {
    projects: projects.count || 0,
    careers: careers.count || 0,
    resumes: resumes.count || 0,
  }
}