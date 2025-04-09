import type { Project } from '~/types/project.type'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useChatBotStore } from './projects/chat-bot'
import { useGame666Store } from './projects/game-666'
import { useInterfaceAdministrationStore } from './projects/interface-administration'
import { useMapEducationStore } from './projects/map-education'
import { useMapGameStore } from './projects/map-game'
import { useMiniGamesStore } from './projects/mini-games'
import { useVideoLearningStore } from './projects/video-learning'
import { ProjectRouteKey } from '~/types/route.type'

export const useProjectsStore = defineStore('projects', () => {
  const mapGameStore = useMapGameStore()
  const videoLearningStore = useVideoLearningStore()
  const chatBotStore = useChatBotStore()
  const miniGamesStore = useMiniGamesStore()
  const interfaceAdministrationStore = useInterfaceAdministrationStore()
  const mapEducationStore = useMapEducationStore()
  const game666Store = useGame666Store()

  const projectList = ref<Record<ProjectRouteKey, Project>>({
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
