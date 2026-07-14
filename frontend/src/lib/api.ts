import axios from 'axios'
import type { Project, Skill, Experience, ContactRequest, ContactResponse } from '@/types'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

export const fetchProjects = (): Promise<Project[]> =>
  api.get<Project[]>('/projects/').then((r) => r.data)

export const fetchSkills = (): Promise<Skill[]> =>
  api.get<Skill[]>('/skills/').then((r) => r.data)

export const fetchExperience = (): Promise<Experience[]> =>
  api.get<Experience[]>('/experience/').then((r) => r.data)

export const submitContact = (data: ContactRequest): Promise<ContactResponse> =>
  api.post<ContactResponse>('/contact/', data).then((r) => r.data)

export default api
