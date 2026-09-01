import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/styles/motion.css', 'utf-8')

describe('motion.css', () => {
  it('définit les trois durées et l\'easing communs', () => {
    expect(css).toContain('--motion-fast: 150ms;')
    expect(css).toContain('--motion-base: 300ms;')
    expect(css).toContain('--motion-slow: 500ms;')
    expect(css).toContain('--motion-ease: cubic-bezier(0.22, 1, 0.36, 1);')
  })

  it('réduit les durées à quasi zéro sous prefers-reduced-motion', () => {
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)/)
    const reducedBlock = css.split('@media (prefers-reduced-motion: reduce)')[1]
    expect(reducedBlock).toContain('--motion-fast: 0.01ms;')
    expect(reducedBlock).toContain('--motion-base: 0.01ms;')
    expect(reducedBlock).toContain('--motion-slow: 0.01ms;')
  })
})
