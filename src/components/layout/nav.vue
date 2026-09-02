<script setup lang="ts">
import type { ProjectCategory } from '~/composables/project-categories'
import type { I18nKey } from '~/types/i18n'
import type { RouteKey } from '~/types/route.type'
import { useNavStore } from '~/stores/nav'

interface Link {
  name: I18nKey
  to: RouteKey
  icon: string
}

interface Category {
  name: I18nKey
  links: Link[]
  id: ProjectCategory
  textClass: string
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
    { ...navStore.projects },
    { ...navStore.curriculumVitae },
    ...navStore.main,
  ],
  categories: PROJECT_CATEGORIES.map(category => ({
    name: category.labelKey,
    id: category.id,
    icon: category.icon,
    textClass: category.textClass,
    links: Object.values(projectStore.projectList)
      .filter(project => project.category === category.id)
      .map(project => ({ name: project.name, to: project.id, icon: project.icon })),
  })),
  bottom: [
    { name: navStore.settings, to: 'settings', icon: 'i-carbon-settings' },
  ],
})

const expandedCategories = reactive(new Set<ProjectCategory>(PROJECT_CATEGORIES.map(category => category.id)))

function isExpanded(id: ProjectCategory) {
  return expandedCategories.has(id)
}

function toggleCategory(id: ProjectCategory) {
  if (expandedCategories.has(id)) {
    expandedCategories.delete(id)
  }
  else {
    expandedCategories.add(id)
  }
}

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

    <div v-for="category in links.categories" v-show="layoutStore.isNavExtended" :key="category.name" class="flex flex-col gap-1px">
      <button
        type="button"
        class="flex items-center justify-between gap-2 rounded-md p-2 text-left font-bold transition-colors duration-motion-fast ease-motion"
        :class="category.textClass"
        hover="bg-light-600 dark:bg-dark-700"
        :aria-expanded="isExpanded(category.id)"
        @click="toggleCategory(category.id)"
      >
        <span class="flex items-center gap-2">
          <div :class="category.icon" class="min-w-4" />
          {{ t(category.name) }}
        </span>
        <div
          class="i-carbon-chevron-down transition-transform duration-motion-fast"
          :class="{ 'rotate-180': isExpanded(category.id) }"
        />
      </button>

      <NavLink
        v-for="link in category.links"
        v-show="isExpanded(category.id)"
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
