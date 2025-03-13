<script setup lang="ts">
interface Link {
  name: ComputedRef<string> | string
  to: string
  icon: string
}

interface Category {
  name: ComputedRef<string>
  links: Link[]
  to?: string
  icon: string
}

interface Links {
  top: Link[]
  categories: Category[]
  bottom: Link[]
}

const { t } = useI18n()
const projectStore = useProjectsStore()
const layoutStore = useLayoutStore()

const links = ref<Links>({
  top: [
    { name: computed(() => t('layout.nav.top.home')), to: '/', icon: 'i-carbon-home' },
    { name: computed(() => t('layout.nav.top.studies')), to: '/studies', icon: 'i-mdi:school' },
    { name: computed(() => t('layout.nav.top.companies')), to: '/companies', icon: 'i-mdi:company' },
    { name: computed(() => t('layout.nav.top.technologies')), to: '/technologies', icon: 'i-mdi:tools' },
  ],

  categories: [
    {
      name: computed(() => t('layout.nav.category.projects')),
      to: '/projects',
      icon: 'i-icon-park-outline:code-computer',
      links: [
        ...projectStore.projectList.map(project => ({ name: project.name, to: project.to, icon: project.icon })),
      ],
    },

  ],
  bottom: [
    { name: computed(() => t('layout.nav.bottom.settings')), to: '/settings', icon: 'i-carbon-settings' },
  ],

})
</script>

<template>
  <nav class="tiny-scrollbar overflow-hidden p-2" hover="overflow-y-auto">
    <div class="flex flex-col justify-between">
      <NavLink v-for="link in links.top" :key="link.name" :link="link" />
    </div>

    <Spacer />

    <div v-for="category in links.categories" :key="category.name">
      <template v-if="category.to">
        <NavLink
          class="p-2 font-bold"
          :link="{ name: category.name, to: category.to, icon: layoutStore.isNavExtended ? undefined : category.icon }"
        />
      </template>

      <template v-else>
        <div class="p-2 font-bold">
          {{ category.name }}
        </div>
      </template>

      <NavLink v-for="link in category.links" v-show="layoutStore.isNavExtended" :key="link.name" :link="link" />
    </div>

    <Spacer />

    <div class="flex flex-col justify-between">
      <NavLink v-for="link in links.bottom" :key="link.name" :link="link" />
    </div>
  </nav>
</template>
