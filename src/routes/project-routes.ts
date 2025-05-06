import type { ProjectRouteKey, Routes } from '~/types/route.type'

export const projectsRoutes: Routes<ProjectRouteKey> = {
  'map-game': {
    path: {
      en: '/projects/map-game',
      fr: '/projets/carte-jeu',
    },
    name: 'Map Game',
    component: () => import('~/pages/projects/[id].vue'),
  },
  'map-education': {
    path: {
      en: '/projects/map-education',
      fr: '/projets/carte-education',
    },
    name: 'Map Education',
    component: () => import('~/pages/projects/[id].vue'),
  },
  'interface-administration': {
    path: {
      en: '/projects/interface-administration',
      fr: '/projets/interface-administration',
    },
    name: 'Interface Administration',
    component: () => import('~/pages/projects/[id].vue'),
  },
  'video-learning': {
    path: {
      en: '/projects/video-learning',
      fr: '/projets/video-learning',
    },
    name: 'Video Learning',
    component: () => import('~/pages/projects/[id].vue'),
  },
  'bot-chat': {
    path: {
      en: '/projects/bot-chat',
      fr: '/projets/bot-chat',
    },
    name: 'Bot Chat',
    component: () => import('~/pages/projects/[id].vue'),
  },
  'mini-games': {
    path: {
      en: '/projects/mini-games',
      fr: '/projets/mini-jeux',
    },
    name: 'Mini Games',
    component: () => import('~/pages/projects/[id].vue'),
  },
  'game-666': {
    path: {
      en: '/projects/game-666',
      fr: '/projets/jeu-666',
    },
    name: 'Game 666',
    component: () => import('~/pages/projects/[id].vue'),
  },
  'game-engine': {
    path: {
      en: '/projects/game-engine',
      fr: '/projets/moteur-de-jeu',
    },
    name: 'Game Engine',
    component: () => import('~/pages/projects/[id].vue'),
  },
  'groove-box': {
    path: {
      en: '/projects/groove-box',
      fr: '/projets/groove-box',
    },
    name: 'Groove Box',
    component: () => import('~/pages/projects/[id].vue'),
  },
}
