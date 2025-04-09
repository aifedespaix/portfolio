import type { Link, UseSeoMetaInput } from '@unhead/vue'
import { CustomRouteRecord } from '~/routes'
import { Lang, Route } from '~/types/route.type'

interface UseHeadTagInput {
  title: ComputedRef<string> | string
  description: ComputedRef<string> | string
  type: 'website' | 'article'
  imagePath?: string
}

const langsOg: Record<Lang, string> = {
  fr: 'fr_FR',
  en: 'en_US',
}

const siteTitle = 'Portfolio Aife'
const domain = 'https://portfolio.aife.io'
const author = 'Joan Tassel'

export function useHeadTag(input: UseHeadTagInput) {
  const route = useRoute()
  const pageUrl = `${domain}${route.path}`
  const lang = route.meta.lang as Lang
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
  if (input.imagePath) {
    seoInput.ogImage = `${domain}/assets${route.path}/${input.imagePath}`
  }
  else {
    seoInput.ogImage = `${domain}/aife-banniere-portfolio.webp`
  }
  seoInput.ogUrl = pageUrl
  seoInput.ogLocale = langCode
  seoInput.ogLocaleAlternate = langsAlternate.map(lang => langsOg[lang as Lang])
  seoInput.ogSiteName = siteTitle
  seoInput.twitterTitle = input.title
  seoInput.twitterDescription = input.description

  useSeoMeta(seoInput)

  if(!route.meta.noAlternate) {
    addAlternateLinks(route as unknown as CustomRouteRecord, pageUrl)
  }
}

const addAlternateLinks = (route: CustomRouteRecord, pageUrl: string) => {
  if(!route.meta?.otherPaths) {
    throw new Error('Route meta otherPaths is not defined') 
  }

  const otherPaths = route.meta.otherPaths as { fr: string; en: string }
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
  useHead({link: links})
}
