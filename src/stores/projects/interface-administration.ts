import type { Project } from '~/types/project.type'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useInterfaceAdministrationStore = defineStore('project-interface-administration', () => {
  const technologiesStore = useTechnologiesStore()

  const project: Project = {
    id: 'interface-administration',
    meta: {
      title: 'stores.projects.interface-administration.meta.title',
      description: 'stores.projects.interface-administration.meta.description',
    },
    name: 'stores.projects.interface-administration.name',
    shortDescription: 'stores.projects.interface-administration.short-description',
    description: 'stores.projects.interface-administration.description',
    image: 'interface-administration',
    icon: 'i-mdi:administrator',
    technologies: [
      technologiesStore.technologies.vue3,
      technologiesStore.technologies.twurple,
      technologiesStore.technologies.firebase,
      technologiesStore.technologies.elementui,
      technologiesStore.technologies.unocss,
    ],
    explains: [
      {
        image: 'interface-administration-stream',
        title: 'stores.projects.interface-administration.explains.1.title',
        description: 'stores.projects.interface-administration.explains.1.description',
      },
      {
        image: 'interface-administration-poll',
        title: 'stores.projects.interface-administration.explains.2.title',
        description: 'stores.projects.interface-administration.explains.2.description',
      },
      {
        image: 'interface-administration-command',
        title: 'stores.projects.interface-administration.explains.3.title',
        description: 'stores.projects.interface-administration.explains.3.description',
      },

    ],
    difficulties: [
      'stores.projects.interface-administration.difficulties.1',
      'stores.projects.interface-administration.difficulties.2',
    ],
  }

  return {
    project,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useInterfaceAdministrationStore as any, import.meta.hot))
