import { acceptHMRUpdate, defineStore } from 'pinia'
import { loadLanguageAsync } from '~/modules/i18n'

export const useLayoutStore = defineStore('layout', () => {
  const isNavExtended = ref(true)
  const language = ref('fr')
  function toggleNav() {
    isNavExtended.value = !isNavExtended.value
  }

  async function toggleLanguage() {
    language.value = language.value === 'fr' ? 'en' : 'fr'
    await loadLanguageAsync(language.value)
  }

  return {
    isNavExtended,
    toggleNav,
    toggleLanguage,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore as any, import.meta.hot))
