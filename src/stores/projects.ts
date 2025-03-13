import { acceptHMRUpdate, defineStore } from 'pinia'

interface Project {
  name: ComputedRef<string>
  description: ComputedRef<string>
  image: string
  to: string
  icon: string
}

const baseUrl = '/projects'

export const useProjectsStore = defineStore('projects', () => {
  const { t } = useI18n()

  const projectList = ref<Project[]>([
    {
      name: computed(() => t('projects.map_game.name')),
      description: computed(() => t('projects.map_game.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/map-game`,
      icon: 'i-mdi:map',
    },
    {
      name: computed(() => t('projects.map_interactive.name')),
      description: computed(() => t('projects.map_interactive.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/map-interactive`,
      icon: 'i-mdi:map-marker-multiple',
    },
    {
      name: computed(() => t('projects.interface_administration.name')),
      description: computed(() => t('projects.interface_administration.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/interface-administration`,
      icon: 'i-mdi:administrator',
    },
    {
      name: computed(() => t('projects.video_learning.name')),
      description: computed(() => t('projects.video_learning.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/video-learning`,
      icon: 'i-mdi:video',
    },
    {
      name: computed(() => t('projects.video_overlay.name')),
      description: computed(() => t('projects.video_overlay.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/video-overlay`,
      icon: 'i-mdi:text',
    },
    {
      name: computed(() => t('projects.bot_chat.name')),
      description: computed(() => t('projects.bot_chat.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/bot-chat`,
      icon: 'i-mdi:robot',
    },
    {
      name: computed(() => t('projects.game_enigma.name')),
      description: computed(() => t('projects.game_enigma.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/game-enigma`,
      icon: 'i-mdi:puzzle',
    },
    {
      name: computed(() => t('projects.game_picross.name')),
      description: computed(() => t('projects.game_picross.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/game-picross`,
      icon: 'i-mdi:color',
    },
    {
      name: computed(() => t('projects.simulation_game.name')),
      description: computed(() => t('projects.simulation_game.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/simulation-game`,
      icon: 'i-mdi:gamepad',
    },
    {
      name: computed(() => t('projects.game_saolei.name')),
      description: computed(() => t('projects.game_saolei.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/game-saolei`,
      icon: 'i-mdi:mine',
    },
    {
      name: computed(() => t('projects.interface_overlay.name')),
      description: computed(() => t('projects.interface_overlay.description')),
      image: 'image1.jpg',
      to: `${baseUrl}/interface-overlay`,
      icon: 'i-mdi:fit-to-screen',
    },

  ])

  return {
    projectList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProjectsStore as any, import.meta.hot))
