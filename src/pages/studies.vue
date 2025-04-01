<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components'
import { useStudyStore } from '~/stores/study'
import { studyTranslationMessages } from '~/translations/study.translation'

const { t } = useI18n({
  messages: studyTranslationMessages,
})

useHeadTag({
  title: t('title'),
  description: t('description'),
  type: 'website',
})

const studyStore = useStudyStore()
const activeTargetId = ref<string | null>(null)

const router = useRouter()
function scrollTo(studyId: string) {
  router.push(`#${studyId}`)
}

function onIntersectionObserver([entry, entry2]: IntersectionObserverEntry[]) {
  if (entry.isIntersecting) {
    activeTargetId.value = entry.target.id
    return
  }
  if (!entry.isIntersecting && entry2?.isIntersecting) {
    activeTargetId.value = entry2.target.id
  }
}
</script>

<template>
  <Pager>
    <TitleMain>{{ t('title') }}</TitleMain>

    <div class="fixed bottom-[var(--distance-bottom)] right-0 top-[var(--distance-top)] flex flex-col items-center justify-center gap-2 px-1 pr-2">
      <ButtonIcon
        v-for="study in studyStore.list"
        :key="study.school"
        :title="`${study.school} : ${study.date.start} - ${study.date.end}`"
        class="rounded-full"
        :icon="study.icon"
        :active="activeTargetId === study.id"
        transition="bg duration-600 ease-in-out"
        @click="scrollTo(study.id)"
      />
    </div>
    <div class="mr-12 flex flex-col gap-2">
      <CardStudy
        v-for="study in studyStore.list"
        :id="study.id"
        :key="study.school"
        v-intersection-observer="[onIntersectionObserver, { threshold: 0.8 }]"
        :data="study"
        class="scroll-mt-[var(--distance-top)]"
        :active="activeTargetId === study.id"
      />
    </div>
  </Pager>
</template>

<i18n lang="yaml">
  en:
    title: Studies
    description: My studies and diplomas.
  fr:
    title: Mes Études
    description: Mon parcours, diplômes et formations.
</i18n>
