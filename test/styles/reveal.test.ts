import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/styles/reveal.css', 'utf-8')

describe('reveal.css', () => {
  it('utilise les tokens de motion partagés plutôt que des durées codées en dur', () => {
    expect(css).toContain('var(--motion-slow')
    expect(css).toContain('var(--motion-ease')
    expect(css).not.toMatch(/0\.6s/)
  })

  it('n\'anime que opacity et transform (neutre CLS)', () => {
    expect(css).toMatch(/transition:/)
    expect(css).not.toMatch(/(top|margin|height|width)\s*:/)
  })
})
