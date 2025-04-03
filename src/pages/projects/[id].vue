<script setup lang="ts">
import type { ProjectKey } from '~/stores/projects'
import { useHeadTag } from '~/composables/head-tag'

const route = useRoute('/projects/[id]')
const router = useRouter()

const { t } = useI18n()

const projectsStore = useProjectsStore()

const data = computed(() => {
  const key = route.params.id as ProjectKey
  const project = projectsStore.projectList[key]
  if (project) {
    return project
  }
  return null
})

if (data.value) {
  useHeadTag({
    title: computed(() => t('pages.projects.id.meta.title', { name: t(data.value!.name) })),
    description: computed(() => t(data.value!.shortDescription)),
    type: 'article',
    imagePath: data.value!.image ? `${data.value!.image}.webp` : undefined,
  })
}
</script>

<template>
  <Pager>
    <ProjectDetails v-if="data" :data="data" />
    <div v-else>
      <TitleMain>
        {{ t('pages.projects.id.error.title') }}
      </TitleMain>
      <div class="flex justify-center">
        <Button @click="router.back()">
          {{ t('pages.projects.id.error.back') }}
        </Button>
      </div>
    </div>
  </Pager>
</template>
