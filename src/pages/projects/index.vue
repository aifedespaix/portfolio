<template>
  <Pager>
    <TitleMain>
      {{ t('portfolio.projects.title') }}
    </TitleMain>

    <div
      class="grid grid-cols-1 gap-4"
      xs="grid-cols-2"
      md="grid-cols-2 p-4"
      lg="grid-cols-3"
      xl="grid-cols-4"
      xxl="grid-cols-6"
    >
      <router-link
        v-for="project in projectsStore.projectList"
        :key="project.name"
        :to="project.to"
      >
        <Card is-hoverable :footer="t('projects.play')" class="h-full">
          <h2 class="flex items-center gap-2 text-lg font-bold">
            <div :class="project.icon" class="min-w-4" />
            {{ project.name }}
          </h2>

          <p class="flex-1 text-sub">
            {{ project.description }}
          </p>

          <template #footer>
                <div>{{ t('projects.play') }}</div>
          </template>
        </Card>
      </router-link>
    </div>
  </Pager>
</template>

<script setup lang="ts">
const { t } = useI18n()
const projectsStore = useProjectsStore()
</script>




