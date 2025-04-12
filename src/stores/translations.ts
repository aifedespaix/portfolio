import type { RouteKey } from '~/types/route.type'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { routes } from '~/routes'

export const useTranslationsStore = defineStore('translations', () => {
  const { t, locale } = useI18n()

  const getUrlLocale = (routeKey: RouteKey) => {
    const isValidLocale = (locale: string): locale is 'en' | 'fr' => locale === 'en' || locale === 'fr'
    if (!isValidLocale(locale.value)) {
      throw new Error(`Invalid locale: ${locale.value}`)
    }

    const route = routes.find(route => route.meta?.key === routeKey)
    const path = route?.meta?.otherPaths?.[locale.value]

    if (path) {
      return path
    }
    throw new Error(`Route ${routeKey} not found`)
  }

  return {
    t,
    locale,
    getUrlLocale,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTranslationsStore as any, import.meta.hot))
