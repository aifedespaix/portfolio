import type { Project } from '~/types/project.type'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMapGameStore = defineStore('project-map-game', () => {
  const technologiesStore = useTechnologiesStore()

  const project: Project = {
    id: 'map-game',
    meta: {
      title: 'stores.projects.map-game.meta.title',
      description: 'stores.projects.map-game.meta.description',
    },
    name: 'stores.projects.map-game.name',
    shortDescription: 'stores.projects.map-game.short-description',
    description: 'stores.projects.map-game.description',
    image: 'map-game',
    icon: 'i-mdi:map',
    links: [
      {
        name: 'stores.projects.map-game.links.1',
        url: 'https://aife.io/map/totk',
        icon: 'i-mdi:map',
      },
    ],
    technologies: [
      technologiesStore.technologies.vue3,
      technologiesStore.technologies.elementui,
      technologiesStore.technologies.unocss,
      technologiesStore.technologies.leaflet,
      technologiesStore.technologies.firebase,
      technologiesStore.technologies.fusejs,
    ],
    explains: [
      {
        image: 'map-game-search',
        title: 'stores.projects.map-game.explains.1.title',
        description: 'stores.projects.map-game.explains.1.description',
      },
      {
        image: 'map-game-filter',
        title: 'stores.projects.map-game.explains.2.title',
        description: 'stores.projects.map-game.explains.2.description',
      },
    ],
    difficulties: [
      'stores.projects.map-game.difficulties.1',
      'stores.projects.map-game.difficulties.2',
      'stores.projects.map-game.difficulties.3',
    ],
  }

  return {
    project,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMapGameStore as any, import.meta.hot))
