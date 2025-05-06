import type { Project } from '~/types/project.type'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useGrooveBoxStore = defineStore('grooveBox', () => {
  const technologiesStore = useTechnologiesStore()

  const difficulties = 2
  const explains = 3
  const project: Project = {
    id: 'groove-box',
    meta: {
      title: 'stores.projects.groove-box.meta.title',
      description: 'stores.projects.groove-box.meta.description',
    },
    name: 'stores.projects.groove-box.name',
    shortDescription: 'stores.projects.groove-box.short-description',
    description: 'stores.projects.groove-box.description',
    image: 'groove-box',
    icon: 'i-mdi:music-note',
    links: [
      {
        name: 'stores.projects.groove-box.links.1',
        url: 'https://groove.aife.io/',
        icon: 'i-mdi:music-note',
      },
      {
        name: 'stores.projects.groove-box.links.2',
        url: 'https://github.com/aifedespaix/groove-box',
        icon: 'i-mdi:github',
        type: 'github',
      },
    ],
    technologies: [
      technologiesStore.technologies.vue3,
      technologiesStore.technologies.unocss,
      technologiesStore.technologies.nuxt,
    ],
    explains: Array.from({ length: explains }, (_, i) => ({
      image: `groove-box-${i + 1}`,
      title: `stores.projects.groove-box.explains.${i + 1}.title`,
      description: `stores.projects.groove-box.explains.${i + 1}.description`,
    })),
    difficulties: Array.from({ length: difficulties }, (_, i) => `stores.projects.groove-box.difficulties.${i + 1}`),
  }

  return {
    project,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGrooveBoxStore as any, import.meta.hot))
