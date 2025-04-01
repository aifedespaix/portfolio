<script setup lang="ts">
import type { ProjectKey } from '~/stores/projects'
import { useHeadTag } from '~/composables/head-tag'

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
  type: 'article',
  imagePath: data.value?.image ? `${data.value.image}.webp` : undefined,
})
</script>

<template>
  <Pager>
    <ProjectDetails v-if="data" :data="data" />
    <div v-else>
      <TitleMain>
        {{ t('error.title') }}
      </TitleMain>
      <div class="flex justify-center">
        <Button @click="router.back()">
          {{ t('error.back') }}
        </Button>
      </div>
    </div>
  </Pager>
</template>

<i18n lang="yaml">
fr:
  error:
    title: Ce Projet n'est pas détaillé pour le moment
    back: Retour
en:
  error:
    title: This project is not detailed for the moment
    back: Back
</i18n>
