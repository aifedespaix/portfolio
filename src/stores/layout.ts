import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const isNavExtended = ref(true)

  function toggleNav() {
    isNavExtended.value = !isNavExtended.value
  }

  return {
    isNavExtended,
    toggleNav,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore as any, import.meta.hot))
