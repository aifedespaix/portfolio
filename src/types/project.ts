import { ProjectKey } from "~/stores/projects"

export interface Project {
  id: ProjectKey
  name: string
  description: string
  shortDescription: string
  image: string
  technologies: Technology[]
  explains: Explain[]
  difficulties: string[]
  icon: string
  links?: {
    name: string
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
  title: string
  description: string
}
