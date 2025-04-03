import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Card from '../../src/components/card.vue'

describe('card', () => {
  it('devrait rendre correctement le composant de base', () => {
    const wrapper = mount(Card)
    expect(wrapper.classes()).toContain('flex')
    expect(wrapper.classes()).toContain('flex-col')
    expect(wrapper.classes()).toContain('rounded-lg')
  })

  it('devrait appliquer les classes de fond correctes', () => {
    const wrapper = mount(Card)
    expect(wrapper.classes()).toContain('bg-light-100')
    expect(wrapper.classes()).toContain('dark:bg-dark-700')
  })

  it('devrait être hoverable quand isHoverable est true', () => {
    const wrapper = mount(Card, {
      props: {
        isHoverable: true,
      },
    })
    expect(wrapper.classes()).toContain('hover:bg-light-700')
    expect(wrapper.classes()).toContain('dark:hover:bg-dark-400')
  })

  it('devrait avoir une bordure active quand active est true', () => {
    const wrapper = mount(Card, {
      props: {
        active: true,
      },
    })
    expect(wrapper.classes()).toContain('border-2')
    expect(wrapper.classes()).toContain('border-light-800')
    expect(wrapper.classes()).toContain('dark:border-dark-400')
  })

  it('devrait être un RouterLink quand to est fourni', () => {
    const wrapper = mount(Card, {
      props: {
        to: '/test',
      },
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    })
    expect(wrapper.find('router-link-stub').exists()).toBe(true)
    expect(wrapper.classes()).toContain('cursor-pointer')
  })

  it('devrait afficher le slot footer quand il est fourni', () => {
    const wrapper = mount(Card, {
      slots: {
        footer: '<div>Footer Content</div>',
      },
    })
    expect(wrapper.find('.mt-2').text()).toBe('Footer Content')
  })

  it('devrait afficher le slot button quand il est fourni', () => {
    const wrapper = mount(Card, {
      slots: {
        button: '<button>Click me</button>',
      },
    })
    expect(wrapper.find('button').text()).toBe('Click me')
  })
})
