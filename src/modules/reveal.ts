import type { UserModule } from '~/types'
import { vReveal } from '~/directives/reveal'

export const install: UserModule = ({ app }) => {
  app.directive('reveal', vReveal)
}
