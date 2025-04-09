import { acceptHMRUpdate, defineStore } from 'pinia'
import { routes } from '~/routes'

export const useLayoutStore = defineStore('layout', () => {
  const isNavExtended = ref(true)
  const { locale } = useI18n()
  const router = useRouter()
  const route = useRoute()

  function toggleNav() {
    isNavExtended.value = !isNavExtended.value
  }

  async function toggleLanguage() {
    const path = route.path
    const targetLocale = locale.value === 'fr' ? 'en' : 'fr'
    const findRoute = routes.find(route => route.path === path)

    if (findRoute && findRoute.meta?.otherPaths?.[targetLocale]) {
      router.push(findRoute.meta.otherPaths[targetLocale])
    } else {
      router.push(`/${targetLocale}`)
    }
  }

  return {
    isNavExtended,
    toggleNav,
    toggleLanguage,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore as any, import.meta.hot))
