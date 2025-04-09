import type { Project } from '~/types/project.type'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMapEducationStore = defineStore('project-map-education', () => {
  const technologiesStore = useTechnologiesStore()

  const project: Project = {
    id: 'map-education',
    meta: {
      title: 'stores.projects.map-education.meta.title',
      description: 'stores.projects.map-education.meta.description',
    },
    name: 'stores.projects.map-education.name',
    shortDescription: 'stores.projects.map-education.short-description',
    description: 'stores.projects.map-education.description',
    image: 'map-education',
    icon: 'i-mdi:map-marker-multiple',
    technologies: [
      technologiesStore.technologies.vue3,
      technologiesStore.technologies.leaflet,
      technologiesStore.technologies.wordpress,
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
