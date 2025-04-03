import type { Project } from '~/types/project'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMapEducationStore = defineStore('project-map-education', () => {
  const project: Project = {
    id: 'map-education',
    name: 'stores.projects.map-education.name',
    shortDescription: 'stores.projects.map-education.short-description',
    description: 'stores.projects.map-education.description',
    image: 'map-education',
    icon: 'i-mdi:map-marker-multiple',
    technologies: [
      {
        name: 'Vue3',
        url: 'https://vuejs.org/',
      },
      {
        name: 'Leaflet',
        url: 'https://leafletjs.com/',
      },
      {
        name: 'Wordpress',
        url: 'https://wordpress.org/',
      },
    ],
    explains: [
      {
        image: 'map-education',
        title: 'stores.projects.map-education.explains.1.title',
        description: 'stores.projects.map-education.explains.1.description',
      },
      {
        image: 'map-education-detail',
        title: 'stores.projects.map-education.explains.2.title',
        description: 'stores.projects.map-education.explains.2.description',
      },
    ],
    difficulties: [
      'stores.projects.map-education.difficulties.1',
      'stores.projects.map-education.difficulties.2',
      'stores.projects.map-education.difficulties.3',
    ],
  }

  return {
    project,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMapEducationStore as any, import.meta.hot))
