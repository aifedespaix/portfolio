import { acceptHMRUpdate, defineStore } from 'pinia'

interface Game {
  name: ComputedRef<string>
  description: ComputedRef<string>
  image: string
  to: string
  icon: string
}

export const useGamesStore = defineStore('games', () => {
  const { t } = useI18n()

  const gameList = ref<Game[]>([
    {
      name: computed(() => t('games.puzzle.name')),
      description: computed(() => t('games.puzzle.description')),
      image: 'image1.jpg',
      to: '/game/puzzle',
      icon: 'i-mdi-puzzle',
    },
    {
      name: computed(() => t('games.crossword-grid.name')),
      description: computed(() => t('games.crossword-grid.description')),
      image: 'image2.jpg',
      to: '/game/crossword-grid',
      icon: 'i-mdi-format-letter-starts-with',
    },
  ])

  return {
    gameList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGamesStore as any, import.meta.hot))
