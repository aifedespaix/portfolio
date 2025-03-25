export interface Project {
  id: string
  name: string
  description: string
  shortDescription: string
  image: string
  technologies: Technology[]
  explains: Explain[]
  difficulties: string[]
  icon: string
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
