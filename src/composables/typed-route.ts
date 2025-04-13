import type { CustomRouteMeta } from '~/routes'

export function useTypedRouteMeta() {
  const route = useRoute()
  return route.meta as unknown as CustomRouteMeta
}
