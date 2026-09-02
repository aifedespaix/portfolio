import type { Project } from '~/types/project.type'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMigracountStore = defineStore('migracount', () => {
  const technologiesStore = useTechnologiesStore()

  const explains = 3
  const project: Project = {
    id: 'migracount',
    category: 'tool',
    meta: {
      title: 'stores.projects.migracount.meta.title',
      description: 'stores.projects.migracount.meta.description',
    },
    name: 'stores.projects.migracount.name',
    shortDescription: 'stores.projects.migracount.short-description',
    description: 'stores.projects.migracount.description',
    image: 'migracount',
    icon: 'i-mdi:heart-pulse',
    links: [
      {
        name: 'stores.projects.migracount.links.1',
        url: 'https://migracount.aifedespaix.com/',
        icon: 'i-mdi:heart-pulse',
      },
      {
        name: 'stores.projects.migracount.links.2',
        url: 'https://github.com/aifedespaix/migranicount',
        icon: 'i-mdi:github',
        type: 'github',
      },
    ],
    technologies: [
      technologiesStore.technologies.vue3,
      technologiesStore.technologies.vite,
      technologiesStore.technologies.pinia,
      technologiesStore.technologies.chartjs,
      technologiesStore.technologies.pocketbase,
      technologiesStore.technologies.vueuse,
    ],
    explains: Array.from({ length: explains }, (_, i) => ({
      image: `migracount-${i + 1}`,
      title: `stores.projects.migracount.explains.${i + 1}.title`,
      description: `stores.projects.migracount.explains.${i + 1}.description`,
    })),
    difficulties: [
      'stores.projects.migracount.difficulties.1',
      'stores.projects.migracount.difficulties.2',
    ],
  }

  return {
    project,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMigracountStore as any, import.meta.hot))
