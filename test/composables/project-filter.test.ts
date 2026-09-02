import { describe, expect, it } from 'vitest'
import { matchesProjectFilter } from '../../src/composables/project-filter'

describe('matchesProjectFilter', () => {
  const project = { category: 'game' as const }

  it('affiche le projet sans filtre ni recherche actifs', () => {
    expect(matchesProjectFilter(project, 'Shlagemon', 'Un clicker RPG', [], '')).toBe(true)
  })

  it('masque le projet si sa categorie n\'est pas selectionnee', () => {
    expect(matchesProjectFilter(project, 'Shlagemon', 'Un clicker RPG', ['tool'], '')).toBe(false)
  })

  it('affiche le projet si sa categorie est selectionnee', () => {
    expect(matchesProjectFilter(project, 'Shlagemon', 'Un clicker RPG', ['game'], '')).toBe(true)
  })

  it('filtre par recherche insensible a la casse sur le nom et la description', () => {
    expect(matchesProjectFilter(project, 'Shlagemon', 'Un clicker RPG', [], 'SHLAG')).toBe(true)
    expect(matchesProjectFilter(project, 'Shlagemon', 'Un clicker RPG', [], 'inexistant')).toBe(false)
    expect(matchesProjectFilter(project, 'Shlagemon', 'Un clicker RPG', [], 'clicker')).toBe(true)
  })

  it('combine categorie et recherche avec un ET logique', () => {
    expect(matchesProjectFilter(project, 'Shlagemon', 'Un clicker RPG', ['tool'], 'shlag')).toBe(false)
    expect(matchesProjectFilter(project, 'Shlagemon', 'Un clicker RPG', ['game'], 'shlag')).toBe(true)
  })
})
