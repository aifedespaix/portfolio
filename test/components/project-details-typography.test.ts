import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import ProjectDetails from '../../src/components/ProjectDetails.vue'
import { useProjectsStore } from '../../src/stores/projects'

describe('projectDetails — longueur de ligne', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('contraint la description principale a 65ch maximum', () => {
    const projectsStore = useProjectsStore()
    const project = Object.values(projectsStore.projectList)[0]

    const wrapper = mount(ProjectDetails, {
      props: { data: project },
      global: { stubs: { Image: true } },
    })

    const description = wrapper.find('header p')
    expect(description.classes()).toContain('max-w-[65ch]')
  })
})
