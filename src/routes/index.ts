import type { RouteRecordRaw } from 'vue-router'
import { mainRoutes } from './main-routes'
import { projectsRoutes } from './project-routes'
import { allRoutes } from './404-routes'


interface RouteMeta {
  key: string
  lang?: string
  noAlternate?: boolean
  otherPaths?: {
    fr?: string
    en?: string
  }
}

export type CustomRouteRecord = RouteRecordRaw & {
  meta?: RouteMeta
  children?: CustomRouteRecord[]
}

const routes: CustomRouteRecord[]
= Object.entries(mainRoutes)
  .concat(Object.entries(projectsRoutes))
  .concat([[allRoutes.name, allRoutes]])
  .flatMap(([key, route]) => {
    const pathFr = `/fr${route.path.fr}`
    const pathEn = `/en${route.path.en}`
    return [
      {
        ...route,
        path: pathEn,
        name: `${route.name} (en)`,
        meta: {
          key,
          lang: 'en',
          otherPaths: {
            fr: pathFr,
            en: pathEn,
          },
        },
        children: [],
      },
      {
        ...route,
        path: pathFr,
        name: `${route.name} (fr)`,
        meta: {
          key,
          lang: 'fr',
          otherPaths: {
            en: pathEn,
            fr: pathFr,
          },
        },
        children: [],
      },
    ]
  })

  routes.push({
    path: '/',
    redirect: () => {
      const langCode = navigator.language.split('-')[0];
      if(langCode === 'fr') {
        return '/fr'
      } else {
        return '/en'
      }
    },
    children: [],
  })

  routes.push({
    path: '/:all(.*)',
    redirect: (route) => {
      const path = route.fullPath
      const langCode = navigator.language.split('-')[0];
      if(langCode === 'fr') {
        return `/fr${path}`
      } else {
        return `/en${path}`
      }
    },
    children: [],
  })

export {routes}
