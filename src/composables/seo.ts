// Type personnalisé pour une chaîne avec longueur min/max
type StringWithLength = string & {
  length: number
}

// Types avec contraintes de longueur
type Title = StringWithLength & { minLength: 10, maxLength: 70 }
type Description = StringWithLength & { minLength: 50, maxLength: 160 }
type ImageUrl = StringWithLength & { minLength: 10, maxLength: 2048 }

interface SeoProps {
  pageTitle: string
  description: string
  image: string
}

// Fonction utilitaire pour valider la longueur
function validateStringLength<T extends string>(
  value: string,
  min: number,
  max: number,
): T {
  if (value.length < min || value.length > max) {
    console.warn(`La chaîne doit avoir entre ${min} et ${max} caractères : ${value}`)
  }
  return value as T
}

export function useSeo(props: SeoProps) {
  const siteName = 'Portfolio de Joan Tassel : Developpeur Freelance'

  // Validation des propriétés
  const pageTitle = validateStringLength<Title>(props.pageTitle, 10 - siteName.length, 70 - siteName.length)
  const description = validateStringLength<Description>(props.description, 50, 160)
  const image = validateStringLength<ImageUrl>(props.image, 10, 2048)

  const title = `${pageTitle} - ${siteName}`
  useSeoMeta({
    title,
    description,
    ogImage: image,
    ogTitle: title,
    ogDescription: description,
    ogUrl: window.location.href,
    ogType: 'website',
    ogLocale: 'fr',
    ogSiteName: siteName,
    ogLocaleAlternate: ['en', 'fr'],
    applicationName: siteName,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
  })
}
