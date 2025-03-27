import type { UseSeoMetaInput } from '@unhead/vue'

interface UseHeadTagInput {
  title: string
  description: string
  type: 'website' | 'article'
  imagePath?: string
}

const siteTitle = 'Portfolio Aife'
const domain = 'https://portfolio.aife.io'
const author = 'Joan Tassel'

export function useHeadTag(input: UseHeadTagInput) {
  const path = useRoute().path
  const pageUrl = `${domain}${path}`

  const seoInput: UseSeoMetaInput = {}
  seoInput.titleTemplate = `%s - ${siteTitle}`
  seoInput.author = author
  seoInput.title = input.title
  seoInput.description = input.description
  seoInput.ogTitle = input.title
  seoInput.ogDescription = input.description
  seoInput.ogType = input.type
  if (input.imagePath) {
    seoInput.ogImage = `${domain}/assets${path}/${input.imagePath}`
  }
  else {
    seoInput.ogImage = `${domain}/aife-banniere-portfolio.webp`
  }
  seoInput.ogUrl = pageUrl
  seoInput.ogLocale = 'fr_FR'
  seoInput.ogLocaleAlternate = ['en_US']
  seoInput.ogSiteName = siteTitle
  seoInput.twitterTitle = input.title
  seoInput.twitterDescription = input.description

  useSeoMeta(seoInput)
}
