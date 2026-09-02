import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ToggleTheme from '../../src/components/button/toggle-theme.vue'
import Card from '../../src/components/card.vue'
import Footer from '../../src/components/layout/footer.vue'
import NavLink from '../../src/components/nav/link.vue'
import ProjectDetails from '../../src/components/ProjectDetails.vue'

describe('rollout des tokens de motion', () => {
  it('card.vue utilise duration-motion-base', () => {
    const wrapper = mount(Card)
    expect(wrapper.attributes('transition')).toBe('background-color duration-motion-base')
  })

  it('button/toggle-theme.vue passe de 900ms à duration-motion-base', () => {
    const wrapper = mount(ToggleTheme)
    const knob = wrapper.find('span')
    expect(knob.attributes('transition')).toBe('transform duration-motion-base ease-motion')
  })

  it('nav/link.vue utilise duration-motion-fast', () => {
    const wrapper = mount(NavLink, {
      props: {
        link: {
          name: 'test.link',
          to: 'index',
          icon: 'i-mdi:home',
        },
      },
    })
    expect(wrapper.attributes('transition')).toBe('colors duration-motion-fast ease-motion')
  })

  it('layout/footer.vue utilise duration-motion-base', () => {
    const wrapper = mount(Footer)
    const link = wrapper.find('a')
    expect(link.attributes('transition')).toBe('text duration-motion-base ease-motion')
  })

  it('projectDetails.vue ligne 44 utilise duration-motion-base', () => {
    const mockProject = {
      id: 'test' as const,
      name: 'test.project',
      description: 'test.description',
      shortDescription: 'test.short',
      image: 'test.jpg',
      icon: 'i-mdi:test',
      links: [
        {
          name: 'test.link',
          url: 'https://test.com',
          type: 'github',
          icon: 'i-mdi:github',
        },
      ],
      explains: [],
      difficulties: [],
      technologies: [],
    }
    const wrapper = mount(ProjectDetails, {
      props: {
        data: mockProject,
      },
    })
    const linkElement = wrapper.find('a[href="https://test.com"]')
    expect(linkElement.classes()).toContain('duration-motion-base')
  })

  it('projectDetails.vue ligne 143 utilise duration-motion-base', () => {
    const mockProject = {
      id: 'test' as const,
      name: 'test.project',
      description: 'test.description',
      shortDescription: 'test.short',
      image: 'test.jpg',
      icon: 'i-mdi:test',
      links: [],
      explains: [],
      difficulties: [],
      technologies: [
        {
          name: 'Test Tech',
          url: 'https://test-tech.com',
        },
      ],
    }
    const wrapper = mount(ProjectDetails, {
      props: {
        data: mockProject,
      },
    })
    const techLink = wrapper.find('a[href="https://test-tech.com"]')
    expect(techLink.attributes('transition')).toBe('colors duration-motion-base ease-motion')
  })

  it('projectDetails.vue style block utilise motion CSS vars', () => {
    const filePath = resolve(__dirname, '../../src/components/ProjectDetails.vue')
    const content = readFileSync(filePath, 'utf-8')
    expect(content).toContain('transition: opacity var(--motion-base) var(--motion-ease)')
  })

  it('pages/index.vue ligne 69 utilise duration-motion-base', () => {
    const filePath = resolve(__dirname, '../../src/pages/index.vue')
    const content = readFileSync(filePath, 'utf-8')
    expect(content).toContain('transition="transition-transform duration-motion-base"')
  })

  it('pages/projects/index.vue ligne 35 utilise duration-motion-base', () => {
    const filePath = resolve(__dirname, '../../src/pages/projects/index.vue')
    const content = readFileSync(filePath, 'utf-8')
    expect(content).toContain('transition="transition-transform duration-motion-base"')
  })
})
