export const PLAN_LIMITS = {
  free: {
    project: 5,
    resume: 2,
    career: 2,
  },

  student: {
    project: 50,
    resume: 20,
    career: 20,
  },

  pro_student: {
    project: 100,
    resume: 50,
    career: 50,
  },

  ultimate: {
    project: Infinity,
    resume: Infinity,
    career: Infinity,
  },
}

export const PLAN_NAMES = {
  free: 'Free',
  student: 'Student',
  pro_student: 'Pro Student',
  ultimate: 'Ultimate',
}