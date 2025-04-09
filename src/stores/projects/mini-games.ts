import type { Project } from '~/types/project.type'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMiniGamesStore = defineStore('project-mini-games', () => {
  const technologiesStore = useTechnologiesStore()

  const project: Project = {
    id: 'mini-games',
    meta: {
      title: 'stores.projects.mini-games.meta.title',
      description: 'stores.projects.mini-games.meta.description',
    },
    name: 'stores.projects.mini-games.name',
    shortDescription: 'stores.projects.mini-games.short-description',
    description: 'stores.projects.mini-games.description',
    image: 'mini-games',
    icon: 'i-mdi:gamepad',
    links: [
      {
        name: 'stores.projects.mini-games.links.1',
        url: 'https://noel.aife.io/',
        icon: 'i-mdi:calendar',
      },
    ],
    technologies: [
      technologiesStore.technologies.vue3,
      technologiesStore.technologies.unocss,
      technologiesStore.technologies.threejs,
      technologiesStore.technologies.vueuse,
    ],
    explains: [
      {
        image: 'mini-games-word',
        title: 'stores.projects.mini-games.explains.1.title',
        description: 'stores.projects.mini-games.explains.1.description',
      },
      {
        image: 'mini-games-double',
        title: 'stores.projects.mini-games.explains.2.title',
        description: 'stores.projects.mini-games.explains.2.description',
      },
      {
        image: 'mini-games-enigma',
        title: 'stores.projects.mini-games.explains.3.title',
        description: 'stores.projects.mini-games.explains.3.description',
      },
      {
        image: 'mini-games-taquin',
        title: 'stores.projects.mini-games.explains.4.title',
        description: 'stores.projects.mini-games.explains.4.description',
      },
    ],
    difficulties: [
      'stores.projects.mini-games.difficulties.1',
      'stores.projects.mini-games.difficulties.2',
    ],
  }

  return {
    project,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMiniGamesStore as any, import.meta.hot))
