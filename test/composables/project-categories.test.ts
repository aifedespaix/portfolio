import { describe, expect, it } from 'vitest'
import { getProjectCategory, PROJECT_CATEGORIES } from '../../src/composables/project-categories'

describe('project-categories', () => {
  it('expose exactement 3 categories avec un identifiant unique', () => {
    const ids = PROJECT_CATEGORIES.map(category => category.id)
    expect(ids).toEqual(['game', 'tool', 'education'])
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('retourne la categorie correspondante avec getProjectCategory', () => {
    expect(getProjectCategory('tool').labelKey).toBe('stores.projectCategories.tool')
    expect(getProjectCategory('tool').textClass).toContain('teal-700')
  })

  it('leve une erreur pour un identifiant inconnu', () => {
    expect(() => getProjectCategory('unknown' as any)).toThrow('Unknown project category: unknown')
  })
})
