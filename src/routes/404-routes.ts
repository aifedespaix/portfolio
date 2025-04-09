import { Route } from '~/types/route.type';

export const allRoutes: Route = {
    path: {
        en: '/:all(.*)',
        fr: '/:all(.*)',
    },
    name: '[...all]',
    component: () => import('~/pages/[...all].vue'),
}
