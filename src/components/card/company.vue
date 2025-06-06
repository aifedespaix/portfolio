<script setup lang="ts">
import type { Company } from '~/stores/company'

defineProps<{
  company: Company
}>()

const { t } = useI18n()
</script>

<template>
  <Card>
    <div v-reveal class="flex items-center gap-2">
      <Image
        :path="company.logo.path"
        :alt="t(company.name)"
        class="h-14 w-14 rounded-full"
        :class="company.logo.classes ?? ''"
        :width="56"
        :height="56"
        :transparent="company.logo.transparent"
      />
      <div>
        <TitleH2 class="mb-0! pb-0!">
          {{ t(company.name) }}
        </TitleH2>
        <div class="flex items-center gap-2 text-gray-500">
          <div class="font-bold">
            {{ company.date.start }} <template v-if="company.date.end">
              - {{ company.date.end }}
            </template>
          </div>
          <div>
            {{ t(company.location) }}
          </div>
        </div>
      </div>
    </div>

    <div v-reveal class="text-justify italic">
      <p>{{ t(company.description) }}</p>
    </div>

    <div v-reveal class="my-2 text-justify">
      <p>{{ t(company.workDescription) }}</p>
    </div>

    <div v-reveal class="max-w-120 self-center rounded-md p-2">
      <TitleH3>
        {{ t('components.card.company.competencies.title') }}
      </TitleH3>
      <div class="flex flex-wrap justify-center gap-2">
        <div
          v-for="competency in company.competencies" :key="competency.icon"
          class="grid grid-rows-2 aspect-square max-w-40 min-w-30 flex-1 rounded-md px-2 py-1 text-sm font-bold"
          hover="shadow-md animate-rubber-band"
          transition="shadow duration-300 ease-in-out"
        >
          <div :class="competency.icon" class="self-center justify-self-center text-3rem" text="blue-600 dark:blue-400" />
          <div class="self-center text-center">
            {{ t(competency.name) }}
          </div>
        </div>
      </div>
    </div>

    <div v-reveal class="mt-2 flex flex-wrap justify-between gap-x-2 gap-y-4">
      <VisualInfoGold v-if="company.infoGold" class="flex-1" :info="company.infoGold" />
      <div class="flex flex-wrap justify-center gap-2">
        <a
          v-for="url in company.urls"
          :key="url.url"
          :href="url.url"
          target="_blank"
          class="flex items-center gap-2 rounded-md p-1 text-blue-600 dark:text-blue-400"
          transition="bg duration-300 ease-in-out"
          hover="bg-blue-600/20 dark:bg-blue-400/20"
        >
          <div :class="url.icon ? url.icon : 'i-mdi:web'" class="self-center justify-self-center text-1rem" />
          <div>
            {{ t(url.name) }}
          </div>
        </a>
      </div>
    </div>
  </Card>
</template>
