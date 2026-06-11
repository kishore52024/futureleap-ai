-- ============================================================
-- FutureLeap AI — Initial Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension (already enabled on Supabase by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: profiles
-- Extends Supabase auth.users with public profile info
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  avatar_url  TEXT,
  plan        TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free','pro','team')),
  usage_count INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- TABLE: saved_projects
-- AI-generated project ideas saved by users
-- ============================================================
CREATE TABLE IF NOT EXISTS public.saved_projects (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  tagline     TEXT,
  domain      TEXT,
  difficulty  TEXT,
  data        JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: resumes
-- Resume analysis results
-- ============================================================
CREATE TABLE IF NOT EXISTS public.resumes (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score       INTEGER CHECK (score >= 0 AND score <= 100),
  grade       TEXT,
  summary     TEXT,
  data        JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: career_paths
-- AI-generated career roadmaps
-- ============================================================
CREATE TABLE IF NOT EXISTS public.career_paths (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_role TEXT NOT NULL,
  timeline    TEXT,
  data        JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: payments
-- Stripe / payment records (for future billing integration)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.payments (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  amount_cents      INTEGER,
  currency          TEXT DEFAULT 'usd',
  plan              TEXT,
  status            TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','cancelled','refunded')),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW-LEVEL SECURITY (RLS)
-- Each user can only read/write their own data
-- ============================================================

ALTER TABLE public.profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_paths   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments       ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- saved_projects
CREATE POLICY "Users can view own projects"
  ON public.saved_projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects"
  ON public.saved_projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects"
  ON public.saved_projects FOR DELETE USING (auth.uid() = user_id);

-- resumes
CREATE POLICY "Users can view own resumes"
  ON public.resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own resumes"
  ON public.resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own resumes"
  ON public.resumes FOR DELETE USING (auth.uid() = user_id);

-- career_paths
CREATE POLICY "Users can view own career paths"
  ON public.career_paths FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own career paths"
  ON public.career_paths FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own career paths"
  ON public.career_paths FOR DELETE USING (auth.uid() = user_id);

-- payments
CREATE POLICY "Users can view own payments"
  ON public.payments FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_saved_projects_user_id ON public.saved_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_user_id        ON public.resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_career_paths_user_id   ON public.career_paths(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id       ON public.payments(user_id);
