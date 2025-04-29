import type { RouteRecordRaw } from 'vue-router'
import { routeAll } from './404-routes'
import { mainRoutes } from './main-routes'
import { projectsRoutes } from './project-routes'

export interface CustomRouteMeta {
  key: string
  lang: string
  otherPaths?: Record<string, string>
}

export type CustomRouteRecord = RouteRecordRaw & {
  meta?: CustomRouteMeta
  children?: CustomRouteRecord[]
}

// Configuration des locales supportées
const SUPPORTED_LOCALES = ['fr', 'en'] as const
type SupportedLocale = typeof SUPPORTED_LOCALES[number]

// Fonction utilitaire pour créer les routes localisées
function createLocalizedRoutes(routeKey: string, route: CustomRouteRecord, locales: readonly string[]): CustomRouteRecord[] {
  return locales.map((locale) => {
    const localizedPath = `/${locale}${route.path[locale as keyof typeof route.path]}`
    const otherPaths = locales.reduce((acc, otherLocale) => {
      acc[otherLocale] = `/${otherLocale}${route.path[otherLocale as keyof typeof route.path]}`
      return acc
    }, {} as Record<string, string>)

    const layout = route.meta?.layout || 'default'

    return {
      ...route,
      path: localizedPath,
      name: `${String(route.name)} (${locale})`,
      meta: {
        key: routeKey,
        lang: locale,
        otherPaths,
        layout,
      },
      children: [],
    }
  })
}

// Création des routes
const routes: CustomRouteRecord[] = Object.entries(mainRoutes)
  .concat(Object.entries(projectsRoutes))
  .concat([[routeAll.name, routeAll]])
  .flatMap(([key, route]) => createLocalizedRoutes(key, route as unknown as CustomRouteRecord, SUPPORTED_LOCALES))

// Route par défaut avec redirection basée sur la langue du navigateur
routes.push({
  path: '/',
  redirect: () => {
    const langCode = navigator.language.split('-')[0]
    return SUPPORTED_LOCALES.includes(langCode as SupportedLocale) ? `/${langCode}` : '/en'
  },
  children: [],
})

// Route catch-all avec redirection localisée
routes.push({
  path: '/:all(.*)',
  redirect: (route) => {
    const path = route.fullPath
    const langCode = navigator.language.split('-')[0]
    return SUPPORTED_LOCALES.includes(langCode as SupportedLocale)
      ? `/${langCode}${path}`
      : `/en${path}`
  },
  children: [],
})

export { routes }
