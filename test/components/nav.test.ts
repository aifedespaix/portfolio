import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import Nav from '../../src/components/layout/nav.vue'

async function createTestRouter() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div />' } }],
  })
  await router.push('/')
  await router.isReady()
  return router
}

describe('layout nav', () => {
  it('inclut le lien Projets et le lien CV dans les liens du haut', async () => {
    const router = await createTestRouter()
    const wrapper = mount(Nav, {
      global: { plugins: [router], stubs: { RouterLink: true } },
    })

    expect(wrapper.find('.i-icon-park-outline\\:code-computer').exists()).toBe(true)
    expect(wrapper.find('.i-carbon-document').exists()).toBe(true)
  })

  it('affiche 3 en-tetes de categorie repliables independamment', async () => {
    const router = await createTestRouter()
    const wrapper = mount(Nav, {
      global: { plugins: [router], stubs: { RouterLink: true } },
    })

    const headers = wrapper.findAll('button[aria-expanded]')
    expect(headers).toHaveLength(3)
    expect(headers.every(header => header.attributes('aria-expanded') === 'true')).toBe(true)
  })

  it('replie une categorie au clic sur son en-tete, sans affecter les autres', async () => {
    const router = await createTestRouter()
    const wrapper = mount(Nav, {
      global: { plugins: [router], stubs: { RouterLink: true } },
    })

    const headers = wrapper.findAll('button[aria-expanded]')
    await headers[0].trigger('click')

    expect(wrapper.findAll('button[aria-expanded]')[0].attributes('aria-expanded')).toBe('false')
    expect(wrapper.findAll('button[aria-expanded]')[1].attributes('aria-expanded')).toBe('true')
  })
})
