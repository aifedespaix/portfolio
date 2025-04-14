import { useHead } from '@vueuse/head'

export function usePlausible() {
  return useHead({
    script: [
      {
        'id': 'plausible',
        'fetchpriority': 'low',
        'async': true,
        'defer': true,
        'src': 'https://plausible.aife.io/js/script.js',
        'data-domain': 'portfolio.aife.io',
      },
    ],
  })
}
