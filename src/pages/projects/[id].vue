<script setup lang="ts">
import type { ProjectRouteKey } from '~/types/route.type'
import { useHeadTag } from '~/composables/head-tag'

const route = useRoute('/projects/[id]')
const router = useRouter()

const { t } = useTranslationsStore()

const projectsStore = useProjectsStore()

const data = computed(() => {
  const key = route.meta.key as ProjectRouteKey
  const project = projectsStore.projectList[key]
  if (project) {
    return project
  }
  return null
})

if (data.value) {
  useHeadTag({
    title: computed(() => t(data.value!.meta.title)),
    description: computed(() => t(data.value!.meta.description)),
    type: 'article',
    imagePath: data.value!.image ? `${data.value!.image}.webp` : undefined,
  })
}
</script>

<template>
  <Pager>
    <Card v-if="data">
      <ProjectDetails :data="data" />
    </Card>
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
