<script setup lang="ts">
import type { I18nKey } from '~/types/i18n'
import { useNavStore } from '~/stores/nav'
import { RouteKey } from '~/types/route.type'

interface Link {
  name: I18nKey
  to: RouteKey
  icon: string
}

interface Category {
  name: I18nKey
  links: Link[]
  to?: RouteKey
  icon: string
}

interface Links {
  top: Link[]
  categories: Category[]
  bottom: Link[]
}

const projectStore = useProjectsStore()
const layoutStore = useLayoutStore()
const navStore = useNavStore()

const { t } = useTranslationsStore()

const links = ref<Links>({
  top: [
    { name: navStore.home, to: 'index', icon: 'i-carbon-home' },
    ...navStore.main,
  ],

  categories: [
    {
      ...navStore.projects,
      links: [
        ...Object.values(projectStore.projectList).map(project => ({
          name: project.name,
          to: project.id,
          icon: project.icon,
        })),
      ],
    },

  ],
  bottom: [
    { name: navStore.settings, to: 'settings', icon: 'i-carbon-settings' },
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
      <NavLink
        v-for="link in links.top"
        :key="link.name"
        :link="link"
        :active="isActive(link.to)"
      />
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
          {{ t(category.name) }}
        </div>
      </template>

      <NavLink
        v-for="link in category.links"
        v-show="layoutStore.isNavExtended"
        :key="link.name"
        :link="link"
        :active="isActive(link.to)"
      />
    </div>

    <Spacer />

    <div class="flex flex-col justify-between gap-1px">
      <NavLink
        v-for="link in links.bottom"
        :key="link.name"
        :link="link"
        :active="isActive(link.to)"
      />
    </div>
  </nav>
</template>
