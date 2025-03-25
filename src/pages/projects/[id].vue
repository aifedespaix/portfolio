<script setup lang="ts">
import type { ProjectKey } from '~/stores/projects'

const route = useRoute('/projects/[id]')

const projectsStore = useProjectsStore()
const data = computed(() => {
  const key = route.params.id as ProjectKey
  const project = projectsStore.projectList[key]
  if (project) {
    return project
  }
  return null
})
</script>

<template>
  <Pager>
    <ProjectDetails v-if="data" :data="data" />
  </Pager>
</template>
