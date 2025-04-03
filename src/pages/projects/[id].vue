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
onMounted(() => {
  if (data.value) {
    useHeadTag({
      title: t('pages.projects.title', { name: t(data.value.name) }),
      description: t(data.value.shortDescription),
      type: 'article',
      imagePath: data.value?.image ? `${data.value.image}.webp` : undefined,
    })
  }
})
</script>

<template>
  <Pager>
    <ProjectDetails v-if="data" :data="data" />
    <div v-else>
      <TitleMain>
        {{ t('pages.projects.error.title') }}
      </TitleMain>
      <div class="flex justify-center">
        <Button @click="router.back()">
          {{ t('pages.projects.error.back') }}
        </Button>
      </div>
    </div>
  </Pager>
</template>
