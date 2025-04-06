import type { Project } from '~/types/project'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useInterfaceAdministrationStore = defineStore('project-interface-administration', () => {
  const project: Project = {
    id: 'interface-administration',
    name: 'stores.projects.interface-administration.name',
    shortDescription: 'stores.projects.interface-administration.short-description',
    description: 'stores.projects.interface-administration.description',
    image: 'interface-administration',
    icon: 'i-mdi:administrator',
    technologies: [
      {
        name: 'Vue3',
        url: 'https://vuejs.org/',
      },
      {
        name: 'Twurple',
        url: 'https://twurple.js.org/',
      },
      {
        name: 'Firebase',
        url: 'https://firebase.google.com/',
      },
      {
        name: 'ElementUI',
        url: 'https://element-plus.org/',
      },
      {
        name: 'UnoCSS',
        url: 'https://unocss.dev/',
      },
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
