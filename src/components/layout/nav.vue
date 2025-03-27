<script setup lang="ts">
import { useNavStore } from '~/stores/nav'

interface Link {
  name: ComputedRef<string> | string
  to: string
  icon: string
}

interface Category {
  name: ComputedRef<string> | string
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
const navStore = useNavStore()

const links = ref<Links>({
  top: [
    { name: computed(() => t('layout.nav.top.home')), to: '/', icon: 'i-carbon-home' },
    ...navStore.main,
  ],

  categories: [
    {
      ...navStore.projects,
      links: [
        ...Object.values(projectStore.projectList).map(project => ({
          name: project.name,
          to: `/projects/${project.id}`,
          icon: project.icon,
        })),
      ],
    },

  ],
  bottom: [
    { name: computed(() => t('layout.nav.bottom.settings')), to: '/settings', icon: 'i-carbon-settings' },
  ],

})

const route = useRoute()
function isActive(to: string) {
  return route.path === to
}
</script>

<template>
  <nav class="tiny-scrollbar overflow-hidden p-2" hover="overflow-y-auto">
    <div class="flex flex-col justify-between gap-1px">
      <NavLink v-for="link in links.top" :key="link.name" :link="link" :active="isActive(link.to)" />
    </div>

    <Spacer />

    <div v-for="category in links.categories" :key="category.name" class="flex flex-col gap-1px">
      <template v-if="category.to">
        <NavLink
          class="p-2 font-bold"
          :link="{ name: category.name, to: category.to, icon: layoutStore.isNavExtended ? undefined : category.icon }"
          :active="isActive(category.to)"
        />
      </template>

      <template v-else>
        <div class="p-2 font-bold">
          {{ category.name }}
        </div>
      </template>

      <NavLink v-for="link in category.links" v-show="layoutStore.isNavExtended" :key="link.name" :link="link" :active="isActive(link.to)" />
    </div>

    <Spacer />

    <div class="flex flex-col justify-between gap-1px">
      <NavLink v-for="link in links.bottom" :key="link.name" :link="link" :active="isActive(link.to)" />
    </div>
  </nav>
</template>
