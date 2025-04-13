import type { Route } from '~/types/route.type'

export const routeAll: Route = {
  path: {
    en: '/:all(.*)',
    fr: '/:all(.*)',
  },
  name: '[...all]',
  component: () => import('~/pages/[...all].vue'),
}
