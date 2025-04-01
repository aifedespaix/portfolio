import { acceptHMRUpdate, defineStore } from 'pinia'

interface NavItem {
  name: ComputedRef<string> | string
  to: string
  icon: string
  description: ComputedRef<string> | string
}

export const useNavStore = defineStore('nav', () => {
  const { t } = useI18n({
    messages: {
      fr: {
        home: 'Accueil',
        settings: 'Paramètres',
        top: {
          technologies: {
            title: 'Technologies',
            description: 'Les Technologies que j\'utilise',
          },
          companies: {
            title: 'Entreprises',
            description: 'Les entreprises qui m\'ont fait confiance.',
          },
          studies: {
            title: 'Études',
            description: 'Mon parcours universitaire.',
          },
          projects: {
            title: 'Projets',
            description: 'Mes projets personnels.',
          },
        },
        category: {
          projects: {
            title: 'Projets',
            description: 'Mes projets personnels.',
          },
        },
      },
      en: {
        home: 'Home',
        settings: 'Settings',
        top: {
          technologies: {
            title: 'Technologies',
            description: 'Technologies I use',
          },
          companies: {
            title: 'Companies',
            description: 'Companies that trusted me.',
          },
          studies: {
            title: 'Studies',
            description: 'My academic background.',
          },
          projects: {
            title: 'Projects',
            description: 'My personal projects.',
          },
        },
        category: {
          projects: {
            title: 'Projects',
            description: 'My personal projects.',
          },
        },
      },
    },
  })

  const home = computed(() => t('home'))
  const settings = computed(() => t('settings'))

  const main = ref<NavItem[]>([
    { name: computed(() => t('top.technologies.title')), to: '/technologies', icon: 'i-mdi:tools', description: computed(() => t('top.technologies.description')) },
    { name: computed(() => t('top.companies.title')), to: '/companies', icon: 'i-mdi:company', description: computed(() => t('top.companies.description')) },
    { name: computed(() => t('top.studies.title')), to: '/studies', icon: 'i-mdi:school', description: computed(() => t('top.studies.description')) },
  ])

  const projects = ref<NavItem>({
    name: computed(() => t('top.projects.title')),
    to: '/projects',
    icon: 'i-icon-park-outline:code-computer',
    description: computed(() => t('top.projects.description')),
  })

  return {
    main,
    projects,
    home,
    settings,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNavStore as any, import.meta.hot))
