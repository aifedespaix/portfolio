import { useHead } from '@vueuse/head'

export function usePlausible() {
  return useHead({
    script: [
      {
        'id': 'plausible',
        'fetchpriority': 'low',
        'async': true,
        'defer': true,
        'src': 'https://plausible.aifedespaix.com/js/script.js',
        'data-domain': 'portfolio.aifedespaix.com',
      },
    ],
  })
}
