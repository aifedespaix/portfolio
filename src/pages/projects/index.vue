<script setup lang="ts">
const { t } = useI18n()
const projectsStore = useProjectsStore()
const imagePath = (id: string, image: string) => `/assets/projects/${id}/${image}.webp`
const projectUrl = (id: string) => `/projects/${id}`

useHeadTag({
  title: computed(() => t('pages.projects.meta.title')),
  description: computed(() => t('pages.projects.meta.description')),
  type: 'website',
})
</script>

<template>
  <Pager>
    <TitleMain>
      {{ t('pages.projects.meta.title') }}
    </TitleMain>

    <div
      class="grid grid-cols-1 gap-4 overflow-hidden"
      md="grid-cols-2 p-4 overflow-initial"
      lg="grid-cols-3"
      xl="grid-cols-4"
      xxl="grid-cols-5"
    >
      <router-link
        v-for="project in projectsStore.projectList"
        :key="project.name"
        :to="projectUrl(project.id)"
        class="aspect-square"
        xs="aspect-a"
        md="aspect-square"
        hover="scale-102"
        transition="transition-transform duration-300"
      >
        <Card is-hoverable :footer="t('pages.projects.discover')" class="h-full">
          <h2 class="flex items-center gap-2 text-lg font-bold">
            <div :class="project.icon" class="min-w-4" />
            {{ t(project.name) }}
          </h2>

          <p class="sizing text-sub h-8 overflow-hidden text-ellipsis">
            {{ t(project.shortDescription) }}
          </p>

          <div class="max-h-80 flex-1 overflow-hidden rounded-t-lg -m-x4 -m-b4">
            <img
              :src="imagePath(project.id, project.image)"
              :alt="t(project.name)"
              class="h-full w-full object-cover"
            >
          </div>

          <template #button>
            <div>{{ t('pages.projects.discover') }}</div>
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
