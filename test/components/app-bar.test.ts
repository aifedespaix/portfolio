import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppBar from '../../src/components/layout/app-bar.vue'

describe('layout app-bar', () => {
  it('affiche un lien vers le CV en plus de accueil/projets/profil', () => {
    const wrapper = mount(AppBar, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    })

    expect(wrapper.find('.i-carbon-document').exists()).toBe(true)
  })
})
