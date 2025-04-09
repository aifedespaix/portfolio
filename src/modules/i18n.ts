import type { Locale } from 'vue-i18n'
import type { UserModule } from '~/types'
import { createI18n } from 'vue-i18n'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  messages: {},
})

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.yml'))
    .map(([path, loadLocale]) => [path.match(/([\w-]*)\.yml$/)?.[1], loadLocale]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

export const availableLocales = Object.keys(localesMap)

const loadedLanguages: string[] = []

function setI18nLanguage(lang: Locale) {
  i18n.global.locale.value = lang as any
  if (typeof document !== 'undefined')
    document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync(lang: string): Promise<Locale> {
  // If the same language
  if (i18n.global.locale.value === lang)
    return setI18nLanguage(lang)

  // If the language was already loaded
  if (loadedLanguages.includes(lang))
    return setI18nLanguage(lang)

  // If the language hasn't been loaded yet
  const messages = await localesMap[lang]()
  i18n.global.setLocaleMessage(lang, messages.default)
  loadedLanguages.push(lang)
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', lang)
  }
  return setI18nLanguage(lang)
}

// Fonction pour précharger toutes les langues
async function preloadAllLanguages() {
  const languages = Object.keys(localesMap)
  await Promise.all(languages.map(lang => loadLanguageAsync(lang)))
}

export const install: UserModule = async ({ app }) => {
  app.use(i18n)

  // Précharger toutes les langues au moment du build SSG
  if (import.meta.env.SSR) {
    await preloadAllLanguages()
  }
  else {
    let storedLang
    if (typeof window !== 'undefined') {
      storedLang = localStorage.getItem('lang')
    }
    else {
      storedLang = 'fr'
    }

    // Initialiser les messages pour la langue par défaut
    const initLang = storedLang || 'fr'
    await localesMap[initLang]().then((messages) => {
      i18n.global.setLocaleMessage(initLang, messages.default)
    })

    if (storedLang) {
      await loadLanguageAsync(storedLang)
    }
    else {
      const userLang = navigator.language.split('-')[0]
      await loadLanguageAsync(userLang)
    }
  }
}
