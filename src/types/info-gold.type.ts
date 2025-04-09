import type { I18nKey } from './i18n'

export interface GoldAward {
  value?: {
    qte: number
    prefix?: I18nKey
    suffix?: I18nKey
  }
  name: I18nKey
}
