import type { Link, UseSeoMetaInput } from '@unhead/vue'
import type { CustomRouteRecord } from '~/routes'
import type { Lang } from '~/types/route.type'

interface UseHeadTagInput {
  title: ComputedRef<string> | string
  description: ComputedRef<string> | string
  type: 'website' | 'article'
  defaultImage?: boolean
}

const langsOg: Record<Lang, string> = {
  fr: 'fr_FR',
  en: 'en_US',
}

const siteTitle = 'Portfolio Aife'
const domain = 'https://portfolio.aife.io'
const author = 'Joan Tassel'

function getImagePath(enRoutePath: string, defaultImage: boolean) {
  if (defaultImage) {
    return `${domain}/aife-banniere-portfolio.webp`
  }
  const parts = enRoutePath.split('/')

  if (parts.length < 2) {
    throw new Error('Path must contain at least 2 parts')
  }

  const name = parts.at(-1)
  const folder = parts.slice(2).join('/')
  const size = 512

  return `${domain}/assets/${folder}/${name}/${name}-${size}.png`
}

export function useHeadTag(input: UseHeadTagInput) {
  const route = useRoute() as any as CustomRouteRecord
  const enPath = route.meta?.lang === 'en' ? route.path : route.meta?.otherPaths?.en as string
  const imagePath = getImagePath(enPath, input.defaultImage ?? true)

  const pageUrl = `${domain}${route.path}`
  const lang = route.meta?.lang as Lang
  const langCode = langsOg[lang]
  const langsAlternate = Object.keys(langsOg).filter(key => key !== lang)

  const seoInput: UseSeoMetaInput = {}
  seoInput.titleTemplate = `%s | ${siteTitle}`
  seoInput.author = author
  seoInput.title = input.title
  seoInput.description = input.description
  seoInput.ogTitle = input.title
  seoInput.ogSiteName = siteTitle
  seoInput.ogDescription = input.description
  seoInput.ogType = input.type
  seoInput.ogImage = imagePath
  seoInput.ogUrl = pageUrl
  seoInput.ogLocale = langCode
  seoInput.ogLocaleAlternate = langsAlternate.map(lang => langsOg[lang as Lang])
  seoInput.ogSiteName = siteTitle
  seoInput.twitterTitle = input.title
  seoInput.twitterDescription = input.description
  seoInput.twitterImage = seoInput.ogImage

  useSeoMeta(seoInput)

  addAlternateLinks(route as unknown as CustomRouteRecord, pageUrl)
}

function addAlternateLinks(route: CustomRouteRecord, pageUrl: string) {
  if (!route.meta?.otherPaths) {
    throw new Error('Route meta otherPaths is not defined')
  }

  const otherPaths = route.meta.otherPaths as { fr: string, en: string }
  const links: Link[] = [
    {
      rel: 'alternate',
      hreflang: 'fr',
      href: `${domain}${otherPaths.fr}`,
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: `${domain}${otherPaths.en}`,
    },
    {
      rel: 'canonical',
      href: pageUrl,
    },
  ]
  useHead({ link: links })
}
