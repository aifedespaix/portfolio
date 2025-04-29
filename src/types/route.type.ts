export type MainRouteKey = 'index' | 'companies' | 'studies' | 'settings' | 'profile' | 'legal' | 'privacy' | 'technologies' | 'projects' | 'curriculumVitae'
export type ProjectRouteKey = 'map-game' | 'map-education' | 'interface-administration' | 'video-learning' |
  'bot-chat' | 'mini-games' | 'game-666' | 'game-engine'

export type RouteKey = MainRouteKey | ProjectRouteKey

export type Lang = 'fr' | 'en'

export interface Route {
  path: {
    en: string
    fr: string
  }
  name: string
  component: () => Promise<typeof import('*.vue')>
  redirect?: (to: any) => string
  meta?: {
    layout?: string
  }
}
export type Routes<T extends MainRouteKey | ProjectRouteKey> = Record<T, Route>
