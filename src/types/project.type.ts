import type { I18nKey } from './i18n'
import type { ProjectRouteKey } from './route.type'
import type { Technology } from '~/stores/technologies'

export interface Project {
  id: ProjectRouteKey
  meta: {
    title: I18nKey
    description: I18nKey
  }
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
    type?: 'youtube' | 'tiktok' | 'github'
  }[]
}

interface Explain {
  image: string
  title: I18nKey
  description: I18nKey
}
