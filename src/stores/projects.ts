import type { Project } from '~/types/project'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { mapEducationData } from '~/composables/projects/map-education.data'
import { interfaceAdministrationData } from '~/composables/projects/interface-administration.data'
import { videoLearningData } from '~/composables/projects/video-learning'
import { chatBotData } from '~/composables/projects/chat-bot.data'
import { miniGamesData } from '~/composables/projects/mini-games.data'
import { game666Data } from '~/composables/projects/game-666.data'
import { mapGameData } from '~/composables/projects/map-game.data'

export type ProjectKey = 'map-game' | 'map-education' | 'interface-administration' | 'video-learning' |
  'bot-chat'  | 'mini-games' | 'game-666'

export const useProjectsStore = defineStore('projects', () => {  
  const projectList = ref<Record<ProjectKey, Project>>({
    'map-game': mapGameData,
    'video-learning': videoLearningData,
    'bot-chat': chatBotData,
    'mini-games': miniGamesData,
    'interface-administration': interfaceAdministrationData,
    'map-education': mapEducationData,
    'game-666': game666Data,
  })

  return {
    projectList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProjectsStore as any, import.meta.hot))
