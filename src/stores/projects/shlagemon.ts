import type { Project } from '~/types/project.type'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useShlagemonStore = defineStore('shlagemon', () => {
  const technologiesStore = useTechnologiesStore()

  const explains = 3
  const project: Project = {
    id: 'shlagemon',
    meta: {
      title: 'stores.projects.shlagemon.meta.title',
      description: 'stores.projects.shlagemon.meta.description',
    },
    name: 'stores.projects.shlagemon.name',
    shortDescription: 'stores.projects.shlagemon.short-description',
    description: 'stores.projects.shlagemon.description',
    image: 'shlagemon',
    icon: 'i-mdi:sword-cross',
    links: [
      {
        name: 'stores.projects.shlagemon.links.1',
        url: 'https://shlagemon.aifedespaix.com/fr',
        icon: 'i-mdi:sword-cross',
      },
      {
        name: 'stores.projects.shlagemon.links.2',
        url: 'https://github.com/aifedespaix/shlagemon',
        icon: 'i-mdi:github',
        type: 'github',
      },
    ],
    technologies: [
      technologiesStore.technologies.vue3,
      technologiesStore.technologies.vite,
      technologiesStore.technologies.pinia,
      technologiesStore.technologies.unocss,
      technologiesStore.technologies.leaflet,
      technologiesStore.technologies.howler,
    ],
    explains: Array.from({ length: explains }, (_, i) => ({
      image: `shlagemon-${i + 1}`,
      title: `stores.projects.shlagemon.explains.${i + 1}.title`,
      description: `stores.projects.shlagemon.explains.${i + 1}.description`,
    })),
    difficulties: [
      'stores.projects.shlagemon.difficulties.1',
      'stores.projects.shlagemon.difficulties.2',
    ],
  }

  return {
    project,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useShlagemonStore as any, import.meta.hot))
