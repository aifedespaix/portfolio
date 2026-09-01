import type { ProjectKey } from './projects'
import type { RouteKey } from '~/routes'
import type { I18nKey } from '~/types/i18n'
import { acceptHMRUpdate, defineStore } from 'pinia'

interface NavItem {
  name: I18nKey
  to: RouteKey | ProjectKey
  icon: string
  description: I18nKey
}

export const useNavStore = defineStore('nav', () => {
  const home = 'stores.nav.home'
  const settings = 'stores.nav.settings'

  const main = ref<NavItem[]>([
    { name: 'stores.nav.top.technologies.title', to: 'technologies', icon: 'i-mdi:tools', description: 'stores.nav.top.technologies.description' },
    { name: 'stores.nav.top.companies.title', to: 'companies', icon: 'i-mdi:company', description: 'stores.nav.top.companies.description' },
    { name: 'stores.nav.top.studies.title', to: 'studies', icon: 'i-mdi:school', description: 'stores.nav.top.studies.description' },
  ])

  const projects = ref<NavItem>({
    name: 'stores.nav.top.projects.title',
    to: 'projects',
    icon: 'i-icon-park-outline:code-computer',
    description: 'stores.nav.top.projects.description',
  })

  const curriculumVitae = ref<NavItem>({
    name: 'stores.nav.top.curriculumVitae.title',
    to: 'curriculumVitae',
    icon: 'i-carbon-document',
    description: 'stores.nav.top.curriculumVitae.description',
  })

  return {
    main,
    projects,
    curriculumVitae,
    home,
    settings,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNavStore as any, import.meta.hot))
