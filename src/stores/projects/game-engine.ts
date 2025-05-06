import type { Project } from '~/types/project.type'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useGameEngineStore = defineStore('gameEngine', () => {
  const technologiesStore = useTechnologiesStore()

  const difficulties = 3
  const explains = 4
  const project: Project = {
    id: 'game-engine',
    meta: {
      title: 'stores.projects.game-engine.meta.title',
      description: 'stores.projects.game-engine.meta.description',
    },
    name: 'stores.projects.game-engine.name',
    shortDescription: 'stores.projects.game-engine.short-description',
    description: 'stores.projects.game-engine.description',
    image: 'game-engine',
    icon: 'i-mdi:gamepad',
    links: [
      {
        name: 'stores.projects.game-engine.links.1',
        url: 'https://github.com/aifedespaix/game-engine',
        icon: 'i-mdi:github',
        type: 'github',
      },
    ],
    technologies: [
      technologiesStore.technologies.vue3,
      technologiesStore.technologies.threejs,
      technologiesStore.technologies.rapier,
      technologiesStore.technologies.unocss,
      technologiesStore.technologies.nuxt,
    ],
    explains: Array.from({ length: explains }, (_, i) => ({
      image: `game-engine-${i + 1}`,
      title: `stores.projects.game-engine.explains.${i + 1}.title`,
      description: `stores.projects.game-engine.explains.${i + 1}.description`,
    })),
    difficulties: Array.from({ length: difficulties }, (_, i) => `stores.projects.game-engine.difficulties.${i + 1}`),
  }

  return {
    project,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGameEngineStore as any, import.meta.hot))
