import type { MainRouteKey, Routes } from '~/types/route.type'

export const mainRoutes: Routes<MainRouteKey> = {
  index: {
    path: {
      en: '/',
      fr: '/',
    },
    name: 'Home',
    component: () => import('~/pages/index.vue'),
  },
  companies: {
    path: {
      en: '/companies',
      fr: '/entreprises',
    },
    name: 'Companies',
    component: () => import('~/pages/companies.vue'),
  },
  studies: {
    path: {
      en: '/studies',
      fr: '/etudes',
    },
    name: 'Studies',
    component: () => import('~/pages/studies.vue'),
  },
  settings: {
    path: {
      en: '/settings',
      fr: '/parametres',
    },
    name: 'Settings',
    component: () => import('~/pages/settings.vue'),
  },
  profile: {
    path: {
      en: '/profile',
      fr: '/profil',
    },
    name: 'Profile',
    component: () => import('~/pages/profile.vue'),
  },
  legal: {
    path: {
      en: '/legal',
      fr: '/mentions-legales',
    },
    name: 'Legal',
    component: () => import('~/pages/legal.md'),
  },
  privacy: {
    path: {
      en: '/privacy-policy',
      fr: '/politique-de-confidentialite',
    },
    name: 'Privacy',
    component: () => import('~/pages/privacy-policy.md'),
  },
  technologies: {
    path: {
      en: '/technologies',
      fr: '/technologies',
    },
    name: 'Technologies',
    component: () => import('~/pages/technologies.vue'),
  },
  projects: {
    path: {
      en: '/projects',
      fr: '/projets',
    },
    name: 'Projects',
    component: () => import('~/pages/projects/index.vue'),
  },
  curriculumVitae: {
    path: {
      en: '/curriculum-vitae',
      fr: '/curriculum-vitae',
    },
    name: 'Curriculum Vitae',
    component: () => import('~/pages/curriculum-vitae.vue'),
    meta: {
      layout: 'print',
    },
  },
}
