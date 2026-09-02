import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '../../src/pages/index.vue'

// Mock useHeadTag to avoid route meta requirements
vi.mock('~/composables/head-tag', () => ({
  useHeadTag: vi.fn(),
}))

describe('home — nettoyage des couleurs arbitraires', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('utilise l\'accent bleu du site plutot qu\'un arc-en-ciel par index', () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          name: 'index',
          component: IndexPage,
          meta: {
            lang: 'fr',
            otherPaths: { en: '/en/', fr: '/' },
          },
        },
      ],
    })

    const wrapper = mount(IndexPage, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: true,
          Image: true,
          Pager: { template: '<div><slot /></div>' },
          TitleMain: { template: '<div><slot /></div>' },
          TitleH2: { template: '<div><slot /></div>' },
          TitleH3: { template: '<div><slot /></div>' },
          LinkExtern: { template: '<a><slot /></a>' },
          LinkIntern: { template: '<a><slot /></a>' },
        },
      },
    })

    const workCards = wrapper.findAll('.text-blue-600')
    expect(workCards.length).toBeGreaterThan(0)
    expect(wrapper.html()).not.toContain('text-red-600')
    expect(wrapper.html()).not.toContain('text-green-700')
  })
})
