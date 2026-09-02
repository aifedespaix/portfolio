import { describe, expect, it } from 'vitest'
import { contrastRatio } from '../../src/utils/contrast'

describe('contrastRatio', () => {
  it('calcule un ratio de 21:1 entre noir et blanc', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0)
  })

  it('calcule un ratio de 1:1 pour deux couleurs identiques', () => {
    expect(contrastRatio('#2563eb', '#2563eb')).toBeCloseTo(1, 1)
  })
})

describe('audit AA des couleurs de texte reellement utilisees', () => {
  const lightCardBg = '#fcfcfc' // bg-light-100
  const darkCardBg = '#1b1b1b' // dark-700

  it.each([
    ['blue-600 sur fond clair (technologies, liens, cards CV)', '#2563eb', lightCardBg],
    ['blue-400 sur fond sombre (technologies, liens, cards CV)', '#60a5fa', darkCardBg],
    ['violet-600 sur fond clair (categorie game)', '#7c3aed', lightCardBg],
    ['violet-400 sur fond sombre (categorie game)', '#a78bfa', darkCardBg],
    ['teal-700 sur fond clair (categorie tool)', '#0f766e', lightCardBg],
    ['teal-400 sur fond sombre (categorie tool)', '#2dd4bf', darkCardBg],
    ['rose-700 sur fond clair (categorie education)', '#be123c', lightCardBg],
    ['rose-400 sur fond sombre (categorie education)', '#fb7185', darkCardBg],
  ])('%s passe l\'AA (>= 4.5:1)', (_label, fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(4.5)
  })

  it('confirme que teal-600 (non utilise) echouerait l\'AA, justifiant le choix de teal-700', () => {
    expect(contrastRatio('#0d9488', lightCardBg)).toBeLessThan(4.5)
  })
})
