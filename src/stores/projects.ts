import type { Project } from '~/types/project.type'
import type { ProjectRouteKey } from '~/types/route.type'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useChatBotStore } from './projects/chat-bot'
import { useGame666Store } from './projects/game-666'
import { useGameEngineStore } from './projects/game-engine'
import { useInterfaceAdministrationStore } from './projects/interface-administration'
import { useMapEducationStore } from './projects/map-education'
import { useMapGameStore } from './projects/map-game'
import { useMiniGamesStore } from './projects/mini-games'
import { useVideoLearningStore } from './projects/video-learning'

export const useProjectsStore = defineStore('projects', () => {
  const mapGameStore = useMapGameStore()
  const videoLearningStore = useVideoLearningStore()
  const chatBotStore = useChatBotStore()
  const miniGamesStore = useMiniGamesStore()
  const interfaceAdministrationStore = useInterfaceAdministrationStore()
  const mapEducationStore = useMapEducationStore()
  const game666Store = useGame666Store()
  const gameEngineStore = useGameEngineStore()

  const projectList = ref<Record<ProjectRouteKey, Project>>({
    'game-engine': gameEngineStore.project,
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
