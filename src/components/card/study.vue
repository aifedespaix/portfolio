<script setup lang="ts">
import type { Study } from '~/stores/study'

defineProps<{
  data: Study
}>()

const { t } = useI18n()
</script>

<template>
  <Card>
    <div class="flex items-center gap-2">
      <Image
        :path="data.logo.path"
        :alt="data.school"
        class="h-14 w-14 rounded-full"
        :class="data.logo.classes "
        :width="56"
        :height="56"
        :transparent="data.logo.transparent"
      />
      <div>
        <TitleH2 class="mb-0! pb-0!">
          {{ t(data.school) }}
        </TitleH2>
        <div class="flex items-center gap-2 text-gray-500">
          <div class="font-bold">
            {{ data.date.start }} - {{ data.date.end }}
          </div>
          <div>
            {{ t(data.location) }}
          </div>
        </div>
      </div>
    </div>

    <div class="text-justify">
      <p>{{ t(data.description) }}</p>
    </div>

    <div class="max-w-120 self-center rounded-md p-2">
      <TitleH3>
        {{ t('components.card.study.school.competencies.title') }}
      </TitleH3>
      <div class="flex flex-wrap justify-center gap-2">
        <div
          v-for="competency in data.competencies" :key="competency.id"
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

    <div class="mt-2 flex flex-wrap justify-between gap-2">
      <VisualInfoGold
        :info="{
          value: data.lvl ? {
            qte: data.lvl,
            prefix: 'Bac +',
          } : undefined,
          name: data.diploma,
        }"
      />
      <a
        :href="data.url"
        target="_blank"
        class="flex items-center gap-2 rounded-md p-1 text-blue-600 dark:text-blue-400"
        transition="bg duration-300 ease-in-out"
        hover="bg-black/20"
      >
        <div class="i-mdi:web" />
        <div>
          {{ t('components.card.study.school.link_title') }}
        </div>
      </a>
    </div>
  </Card>
</template>
