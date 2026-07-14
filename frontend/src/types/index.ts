export interface Project {
  id: number
  title: string
  description: string
  long_description?: string
  tech_stack: string[]
  github_url?: string
  demo_url?: string
  image_url?: string
  featured: number
  created_at?: string
}

export interface Skill {
  id: number
  name: string
  category: 'ML_AI' | 'Backend' | 'Frontend' | 'Tools'
  level: number
}

export interface Experience {
  id: number
  title: string
  organization: string
  type: 'hackathon' | 'research' | 'workshop'
  start_date: string
  end_date?: string
  description: string
  location?: string
}

export interface ContactRequest {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactResponse {
  message: string
  id: number
}

export interface ApiError {
  detail: string | { msg: string; loc: string[] }[]
}
