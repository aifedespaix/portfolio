import { config } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { beforeEach } from 'vitest'
import { createI18n } from 'vue-i18n'
import en from '../locales/en.yml'
import fr from '../locales/fr.yml'

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'fr',
  messages: { fr, en },
})

beforeEach(() => {
  config.global.plugins = [createPinia(), i18n]
})
