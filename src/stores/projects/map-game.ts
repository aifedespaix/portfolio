import type { Project } from '~/types/project'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { mapGameTranslationMessages } from '../../translations/map-game.translation'

export const useMapGameStore = defineStore('map-game', () => {
  const { messages, t } = useI18n()
  Object.entries(mapGameTranslationMessages).forEach(([lang, newMessages]) => {
    const existingMessages = messages.value[lang] || {}
    messages.value[lang] = { ...existingMessages, ...newMessages }
  })

  const project: Project = {
    id: 'map-game',
    name: computed(() => t('map-game.name')),
    shortDescription: computed(() => t('map-game.shortDescription')),
    description: computed(() => t('map-game.description')),
    image: 'map-game',
    icon: 'i-mdi:map',
    links: [
      {
        name: computed(() => t('map-game.links.1')),
        url: 'https://aife.io/map/totk',
        icon: 'i-mdi:map',
      },
    ],
    technologies: [
      {
        name: 'Vue3',
        url: 'https://vuejs.org/',
      },
      {
        name: 'ElementUI',
        url: 'https://element-plus.org/',
      },
      {
        name: 'UnoCSS',
        url: 'https://unocss.dev/',
      },
      {
        name: 'Leaflet',
        url: 'https://leafletjs.com/',
      },
      {
        name: 'Firebase',
        url: 'https://firebase.google.com/',
      },
      {
        name: 'Fuse.js',
        url: 'https://fusejs.io/',
      },
    ],
    explains: [
      {
        image: 'map-game-search',
        title: computed(() => t('map-game.explains.1.title')),
        description: computed(() => t('map-game.explains.1.description')),
      },
      {
        image: 'map-game-filter',
        title: computed(() => t('map-game.explains.2.title')),
        description: computed(() => t('map-game.explains.2.description')),
      },
    ],
    difficulties: computed(() => [
      t('map-game.difficulties.1'),
      t('map-game.difficulties.2'),
      t('map-game.difficulties.3'),
    ]),
  }

  return {
    project,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMapGameStore as any, import.meta.hot))
