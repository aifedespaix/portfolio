import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { PROJECT_CATEGORIES } from '../../src/composables/project-categories'
import { useProjectsStore } from '../../src/stores/projects'

describe('projects store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('assigne une categorie valide a chacun des 11 projets', () => {
    const projectsStore = useProjectsStore()
    const validIds = PROJECT_CATEGORIES.map(category => category.id)
    const projects = Object.values(projectsStore.projectList)

    expect(projects).toHaveLength(11)
    for (const project of projects) {
      expect(validIds).toContain(project.category)
    }
  })
})
