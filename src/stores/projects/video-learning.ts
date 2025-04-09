import type { Project } from '~/types/project.type'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useVideoLearningStore = defineStore('project-video-learning', () => {
  const technologiesStore = useTechnologiesStore()

  const project: Project = {
    id: 'video-learning',
    meta: {
      title: 'stores.projects.video-learning.meta.title',
      description: 'stores.projects.video-learning.meta.description',
    },
    name: 'stores.projects.video-learning.name',
    shortDescription: 'stores.projects.video-learning.short-description',
    description: 'stores.projects.video-learning.description',
    image: 'video-learning',
    icon: 'i-mdi:video',
    links: [
      {
        name: 'stores.projects.video-learning.links.en',
        url: 'https://www.tiktok.com/@apprends_anglais_facile',
        icon: 'i-icon-park-outline:tiktok',
        type: 'tiktok',
      },
      {
        name: 'stores.projects.video-learning.links.en',
        url: 'https://www.youtube.com/@Apprends_Anglais_facile',
        icon: 'i-mdi:youtube',
        type: 'youtube',
      },
      {
        name: 'stores.projects.video-learning.links.fr',
        url: 'https://www.tiktok.com/@french_learning_easy',
        icon: 'i-icon-park-outline:tiktok',
        type: 'tiktok',
      },
      {
        name: 'stores.projects.video-learning.links.fr',
        url: 'https://www.youtube.com/@Learn_French_Easy',
        icon: 'i-mdi:youtube',
        type: 'youtube',
      },
    ],
    technologies: [
      technologiesStore.technologies.chatgpt,
      technologiesStore.technologies.nestjs,
      technologiesStore.technologies.coquiTTS,
      technologiesStore.technologies.react,
      technologiesStore.technologies.threejs,
      technologiesStore.technologies.remotion,
      technologiesStore.technologies.puppeteer,
    ],
    explains: [
      {
        image: 'video-learning-gpt',
        title: 'stores.projects.video-learning.explains.1.title',
        description: 'stores.projects.video-learning.explains.1.description',
      },
      {
        image: 'video-learning-nest',
        title: 'stores.projects.video-learning.explains.2.title',
        description: 'stores.projects.video-learning.explains.2.description',
      },
      {
        image: 'video-learning-coqui',
        title: 'stores.projects.video-learning.explains.3.title',
        description: 'stores.projects.video-learning.explains.3.description',
      },
      {
        image: 'video-learning-remotion',
        title: 'stores.projects.video-learning.explains.4.title',
        description: 'stores.projects.video-learning.explains.4.description',
      },
      {
        image: 'video-learning-puppeteer',
        title: 'stores.projects.video-learning.explains.5.title',
        description: 'stores.projects.video-learning.explains.5.description',
      },
    ],
    difficulties: [
      'stores.projects.video-learning.difficulties.1',
      'stores.projects.video-learning.difficulties.2',
      'stores.projects.video-learning.difficulties.3',
    ],
  }

  return {
    project,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useVideoLearningStore as any, import.meta.hot))
