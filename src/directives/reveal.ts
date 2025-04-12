// src/directives/reveal.ts
import type { Directive } from 'vue'

export const vReveal: Directive = {
  mounted(el: HTMLElement) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 },
    )

    el.classList.add('reveal-hidden') // état initial
    observer.observe(el)
  },
}
