import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import ProjectsIndex from '../../src/pages/projects/index.vue'

// Mock useHeadTag to avoid route meta requirements (see test/pages/projects-colors.test.ts)
vi.mock('~/composables/head-tag', () => ({
  useHeadTag: vi.fn(),
}))

describe('page projets — filtre et recherche', () => {
  it('affiche les 11 projets dans le DOM sans filtre pre-applique', () => {
    const wrapper = mount(ProjectsIndex, {
      global: { stubs: { RouterLink: true, Image: true } },
    })

    expect(wrapper.findAll('router-link-stub')).toHaveLength(11)
  })

  it('affiche un champ de recherche et une puce par categorie', () => {
    const wrapper = mount(ProjectsIndex, {
      global: { stubs: { RouterLink: true, Image: true } },
    })

    expect(wrapper.find('input[type="search"]').exists()).toBe(true)
    expect(wrapper.findAll('button[aria-pressed]')).toHaveLength(3)
  })
})
