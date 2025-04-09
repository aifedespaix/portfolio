import type { Project } from '~/types/project.type'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useGame666Store = defineStore('project-game-666', () => {
  const technologiesStore = useTechnologiesStore()
    
  const project: Project = {
    id: 'game-666',
    meta: {
      title: 'stores.projects.game-666.meta.title',
      description: 'stores.projects.game-666.meta.description',
    },
    name: 'stores.projects.game-666.name',
    shortDescription: 'stores.projects.game-666.short-description',
    description: 'stores.projects.game-666.description',
    image: 'game-666',
    icon: 'i-mdi:halloween',
    links: [
      {
        name: 'stores.projects.game-666.links.1',
        url: 'https://666.aife.io/',
        icon: 'i-mdi:halloween',
      },
    ],
    technologies: [
      technologiesStore.technologies.vue3,
      technologiesStore.technologies.cryptojs,
      technologiesStore.technologies.twurple,
    ],
    explains: [
      {
        image: 'game-666-cryptojs',
        title: 'stores.projects.game-666.explains.1.title',
        description: 'stores.projects.game-666.explains.1.description',
      },
    ],
    difficulties: [
      'stores.projects.game-666.difficulties.1',
    ],
  }

  return {
    project,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGame666Store as any, import.meta.hot))
