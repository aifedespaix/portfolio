import type { Project } from '~/types/project'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { mapEducationData } from '~/composables/map-education'

const baseUrl = '/projects'

export type ProjectKey = 'map-game' | 'map-education' | 'interface-administration' | 'video-learning' |
  'video-overlay' | 'bot-chat' | 'game-enigma' | 'game-picross' | 'simulation-game' | 'game-saolei'

export const useProjectsStore = defineStore('projects', () => {
  const { t } = useI18n()

  const projectList = ref<Record<ProjectKey, Project>>({
    'map-game': mapGameData,
    'map-education': mapEducationData,

    'interface-administration': {
      name: computed(() => t('projects.interface_administration.name')),
      description: computed(() => t('projects.interface_administration.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/interface-administration`,
      icon: 'i-mdi:administrator',
    },
    'video-learning': {
      name: computed(() => t('projects.video_learning.name')),
      description: computed(() => t('projects.video_learning.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/video-learning`,
      icon: 'i-mdi:video',
    },
    'video-overlay': {
      name: computed(() => t('projects.video_overlay.name')),
      description: computed(() => t('projects.video_overlay.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/video-overlay`,
      icon: 'i-mdi:text',
    },
    'bot-chat': {
      name: computed(() => t('projects.bot_chat.name')),
      description: computed(() => t('projects.bot_chat.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/bot-chat`,
      icon: 'i-mdi:robot',
    },
    'game-enigma': {
      name: computed(() => t('projects.game_enigma.name')),
      description: computed(() => t('projects.game_enigma.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/game-enigma`,
      icon: 'i-mdi:puzzle',
    },
    'game-picross': {
      name: computed(() => t('projects.game_picross.name')),
      description: computed(() => t('projects.game_picross.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/game-picross`,
      icon: 'i-mdi:color',
    },
    'simulation-game': {
      name: computed(() => t('projects.simulation_game.name')),
      description: computed(() => t('projects.simulation_game.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/simulation-game`,
      icon: 'i-mdi:gamepad',
    },
    'game-saolei': {
      name: computed(() => t('projects.game_saolei.name')),
      description: computed(() => t('projects.game_saolei.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/game-saolei`,
      icon: 'i-mdi:mine',
    },
  })

  return {
    projectList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProjectsStore as any, import.meta.hot))
