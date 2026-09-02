<script setup lang="ts">
import type { ProjectCategory } from '~/composables/project-categories'
import type { Project } from '~/types/project.type'

const { t, getUrlLocale } = useTranslationsStore()
const projectsStore = useProjectsStore()
const imagePath = (id: string, image: string) => `/assets/projects/${id}/${image}`
const projectUrl = (id: ProjectKey) => `${getUrlLocale(id)}`

useHeadTag({
  title: computed(() => t('pages.projects.meta.title')),
  description: computed(() => t('pages.projects.meta.description')),
  type: 'website',
})

const selectedCategories = ref<ProjectCategory[]>([])
const searchQuery = ref('')

function toggleCategory(id: ProjectCategory) {
  selectedCategories.value = selectedCategories.value.includes(id)
    ? selectedCategories.value.filter(category => category !== id)
    : [...selectedCategories.value, id]
}

function isProjectVisible(project: Project) {
  return matchesProjectFilter(project, t(project.name), t(project.shortDescription), selectedCategories.value, searchQuery.value)
}
</script>

<template>
  <Pager>
    <TitleMain v-reveal>
      {{ t('pages.projects.title') }}
    </TitleMain>

    <div class="flex flex-col gap-3 px-2" md="px-4">
      <div class="flex flex-wrap gap-2" role="group" :aria-label="t('pages.projects.filters.categoryLabel')">
        <button
          v-for="category in PROJECT_CATEGORIES"
          :key="category.id"
          type="button"
          class="rounded-full px-3 py-1 text-sm font-medium transition-colors duration-motion-fast ease-motion"
          :class="[category.chipClass, selectedCategories.includes(category.id) ? 'ring-2 ring-offset-1' : 'opacity-60 hover:opacity-100']"
          :aria-pressed="selectedCategories.includes(category.id)"
          @click="toggleCategory(category.id)"
        >
          {{ t(category.labelKey) }}
        </button>
      </div>

      <input
        v-model="searchQuery"
        type="search"
        class="rounded-lg p-2"
        bg="light-100 dark:dark-700"
        :aria-label="t('pages.projects.filters.searchLabel')"
        :placeholder="t('pages.projects.filters.searchPlaceholder')"
      >
    </div>

    <div
      class="grid grid-cols-1 gap-4 overflow-hidden"
      md="grid-cols-2 p-4 overflow-initial"
      lg="grid-cols-3"
      xl="grid-cols-4"
      xxl="grid-cols-5"
    >
      <router-link
        v-for="project in projectsStore.projectList"
        v-show="isProjectVisible(project)"
        :key="project.name"
        :to="projectUrl(project.id)"
        class="aspect-square"
        xs="aspect-a"
        md="aspect-square"
        hover="scale-102"
        transition="transition-transform duration-motion-base"
      >
        <Card is-hoverable :footer="t('pages.projects.discover')" class="h-full">
          <h2 v-reveal class="flex items-center gap-2 text-lg font-bold" :class="getProjectCategory(project.category).textClass">
            <div :class="project.icon" class="min-w-4" />
            {{ t(project.name) }}
          </h2>

          <p v-reveal class="sizing text-sub h-8 overflow-hidden text-ellipsis">
            {{ t(project.shortDescription) }}
          </p>

          <div v-reveal class="max-h-80 flex-1 overflow-hidden rounded-t-lg -m-x4 -m-b4">
            <Image
              :path="imagePath(project.id, project.image)"
              :alt="t(project.name)"
              class="h-full w-full object-cover object-center"
              :width="512"
              :height="288"
              :transparent="false"
            />
          </div>

          <template #button>
            <div>
              {{ t('pages.projects.discover') }}
            </div>
          </template>
        </Card>
      </router-link>
    </div>
  </Pager>
</template>

<style scoped>
.sizing {
  --line-height: 1.5rem;
  --lines: 2;
  line-height: var(--line-height);
  height: calc(var(--line-height) * var(--lines));
  min-height: calc(var(--line-height) * var(--lines));
  line-clamp: var(--lines);
  box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
