import type { Project } from '~/types/project'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useChatBotStore } from './projects/chat-bot'
import { useMapGameStore } from './projects/map-game'
import { useMiniGamesStore } from './projects/mini-games'
import { useVideoLearningStore } from './projects/video-learning'
import { useInterfaceAdministrationStore } from './projects/interface-administration'
import { useMapEducationStore } from './projects/map-education'
import { useGame666Store } from './projects/game-666'

export type ProjectKey = 'map-game' | 'map-education' | 'interface-administration' | 'video-learning' |
  'bot-chat' | 'mini-games' | 'game-666'

export const useProjectsStore = defineStore('projects', () => {
  const mapGameStore = useMapGameStore()
  const videoLearningStore = useVideoLearningStore()
  const chatBotStore = useChatBotStore()
  const miniGamesStore = useMiniGamesStore()
  const interfaceAdministrationStore = useInterfaceAdministrationStore()
  const mapEducationStore = useMapEducationStore()
  const game666Store = useGame666Store()

  const projectList = ref<Record<ProjectKey, Project>>({
    'map-game': mapGameStore.project,
    'video-learning': videoLearningStore.project,
    'bot-chat': chatBotStore.project,
    'mini-games': miniGamesStore.project,
    'interface-administration': interfaceAdministrationStore.project,
    'map-education': mapEducationStore.project,
    'game-666': game666Store.project,
  })

  return {
    projectList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProjectsStore as any, import.meta.hot))
