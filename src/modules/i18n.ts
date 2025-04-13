import type { UserModule } from '~/types'
import { createI18n } from 'vue-i18n'

type Locale = string

const localeLoaders = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.yml')).map(([path, loader]) => [
    path.match(/([\w-]*)\.yml$/)?.[1],
    loader,
  ]),
) as Record<Locale, () => Promise<{ default: Record<string, any> }>>

export const install: UserModule = async ({ app, router, isClient, routePath }) => {
  let detectedLocale = 'fr'

  if (isClient) {
    const path = window.location.pathname
    detectedLocale = path.split('/')[1] || 'fr'
  }
  else if (routePath) {
    detectedLocale = routePath.split('/')[1] || 'fr'
  }

  const availableLocales = Object.keys(localeLoaders)
  const currentLocale = availableLocales.includes(detectedLocale) ? detectedLocale : 'fr'

  const messages: Record<string, any> = {}

  if (isClient) {
    messages[currentLocale] = (await localeLoaders[currentLocale]()).default
  }
  else {
    await Promise.all(
      Object.entries(localeLoaders).map(async ([locale, loader]) => {
        messages[locale] = (await loader()).default
      }),
    )
  }

  const i18n = createI18n({
    legacy: false,
    locale: currentLocale,
    fallbackLocale: 'fr',
    messages,
    availableLocales,
  })

  app.use(i18n)

  if (isClient && router) {
    i18n.global.locale.value = currentLocale

    router.beforeEach(async (to, _from, next) => {
      const lang = to.path.split('/')[1]

      if (availableLocales.includes(lang) && !i18n.global.availableLocales.includes(lang)) {
        i18n.global.setLocaleMessage(lang, (await localeLoaders[lang]()).default)
      }

      if (availableLocales.includes(lang) && i18n.global.locale.value !== lang) {
        i18n.global.locale.value = lang
      }

      next()
    })
  }
}
