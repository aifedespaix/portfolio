import type { ProjectKey } from '~/stores/projects'

export interface Project {
  id: ProjectKey
  name: ComputedRef<string> | string
  description: ComputedRef<string> | string
  shortDescription: ComputedRef<string> | string
  image: string
  technologies: Technology[]
  explains: Explain[]
  difficulties: ComputedRef<string[]> | string[]
  icon: string
  links?: {
    name: ComputedRef<string> | string
    more?: string
    url: string
    icon: string
    type?: 'youtube' | 'tiktok'
  }[]
}

interface Technology {
  name: string
  url: string
}

interface Explain {
  image: string
  title: ComputedRef<string> | string
  description: ComputedRef<string> | string
}
