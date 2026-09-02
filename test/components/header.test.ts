import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Header from '../../src/components/layout/header.vue'

describe('layout header', () => {
  it('affiche un lien vers le CV à côté du profil', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    })

    expect(wrapper.find('.i-carbon-document').exists()).toBe(true)
    expect(wrapper.find('.i-carbon-user').exists()).toBe(true)
  })
})
