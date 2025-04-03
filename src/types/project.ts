import type { I18nKey } from './i18n'
import type { ProjectKey } from '~/stores/projects'

export interface Project {
  id: ProjectKey
  name: I18nKey
  description: I18nKey
  shortDescription: I18nKey
  image: string
  technologies: Technology[]
  explains: Explain[]
  difficulties: I18nKey[]
  icon: string
  links?: {
    name: I18nKey
    more?: I18nKey
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
  title: I18nKey
  description: I18nKey
}
