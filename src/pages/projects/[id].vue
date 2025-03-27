<script setup lang="ts">
import type { ProjectKey } from '~/stores/projects'
import { useHeadTag } from '~/composables/head-tag'

const { t } = useI18n()
const route = useRoute('/projects/[id]')
const router = useRouter()

const projectsStore = useProjectsStore()

const data = computed(() => {
  const key = route.params.id as ProjectKey
  const project = projectsStore.projectList[key]
  if (project) {
    return project
  }
  return null
})

useHeadTag({
  title: data.value?.name ?? '',
  description: data.value?.shortDescription ?? '',
  type: 'website',
  imagePath: data.value?.image ? `${data.value.image}.webp` : undefined,
})
</script>

<template>
  <Pager>
    <ProjectDetails v-if="data" :data="data" />
    <div v-else>
      <h1>Ce Projet n'est pas détaillé pour le moment</h1>
      <Button @click="router.back()">
        {{ t('button.back') }}
      </Button>
    </div>
  </Pager>
</template>
