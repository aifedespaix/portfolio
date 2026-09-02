import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import ProjectsIndex from '../../src/pages/projects/index.vue'

// Mock useHeadTag to avoid route meta requirements
vi.mock('~/composables/head-tag', () => ({
  useHeadTag: vi.fn(),
}))

describe('page projets — couleur de categorie', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('colore le titre de chaque projet selon sa categorie', () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/projects',
          name: 'projects',
          component: ProjectsIndex,
          meta: {
            lang: 'fr',
            otherPaths: { en: '/en/projects', fr: '/projects' },
          },
        },
      ],
    })

    const wrapper = mount(ProjectsIndex, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: true,
          Image: true,
          Pager: { template: '<div><slot /></div>' },
          TitleMain: { template: '<div><slot /></div>' },
        },
      },
    })

    const gameEngineTitle = wrapper.findAll('h2').find(h2 => h2.text().includes('Moteur de Jeu Web'))
    expect(gameEngineTitle?.classes()).toContain('text-violet-600')
  })
})
