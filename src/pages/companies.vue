<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components'
import { useHeadTag } from '~/composables/head-tag'
import { useCompanyStore } from '~/stores/company'

const { t } = useI18n()

useHeadTag({
  title: 'Entreprises',
  description: `Les entreprises qui m'ont fait confiance.`,
  type: 'website',
})

const companyStore = useCompanyStore()

const router = useRouter()
function scrollTo(companyId: string) {
  router.push(`#${companyId}`)
}

const activeTargetId = ref<string | null>(null)

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
    <TitleMain>
      {{ t('companies.title') }}
    </TitleMain>

    <div class="fixed bottom-[var(--distance-bottom)] right-0 top-[var(--distance-top)] flex flex-col items-center justify-center gap-2 px-1 pr-2">
      <ButtonIcon
        v-for="company in companyStore.list"
        :key="company.id"
        :title="`${company.work} - ${company.name}`"
        class="rounded-full"
        :icon="company.icon"
        :active="activeTargetId === company.id"
        transition="bg duration-600 ease-in-out"
        @click="scrollTo(company.id)"
      />
    </div>

    <div class="mr-12 flex flex-col gap-2">
      <CardCompany
        v-for="company in companyStore.list"
        :id="company.id"
        :key="company.id"
        v-intersection-observer="[onIntersectionObserver, { threshold: 0.8 }]"
        :active="activeTargetId === company.id"
        :company="company"
        class="scroll-mt-[var(--distance-top)]"
      />
    </div>
  </Pager>
</template>
