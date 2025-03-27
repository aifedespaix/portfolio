import { acceptHMRUpdate, defineStore } from 'pinia'

interface NavItem {
  name: ComputedRef<string> | string
  to: string
  icon: string
  description: ComputedRef<string> | string
}

export const useNavStore = defineStore('nav', () => {
  const { t } = useI18n()

  const main = ref<NavItem[]>([
    { name: computed(() => t('layout.nav.top.technologies.title')), to: '/technologies', icon: 'i-mdi:tools', description: computed(() => t('layout.nav.top.technologies.description')) },
    { name: computed(() => t('layout.nav.top.companies.title')), to: '/companies', icon: 'i-mdi:company', description: computed(() => t('layout.nav.top.companies.description')) },
    { name: computed(() => t('layout.nav.top.studies.title')), to: '/studies', icon: 'i-mdi:school', description: computed(() => t('layout.nav.top.studies.description')) },
  ])

  const projects = ref<NavItem>({
    name: computed(() => t('layout.nav.category.projects.title')),
    to: '/projects',
    icon: 'i-icon-park-outline:code-computer',
    description: computed(() => t('layout.nav.category.projects.description')),
  })

  return {
    main,
    projects,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNavStore as any, import.meta.hot))
