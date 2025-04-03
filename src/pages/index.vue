<script setup lang="ts">
import { useHeadTag } from '~/composables/head-tag'
import { useNavStore } from '~/stores/nav'

defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()
useHeadTag({
  title: t('pages.index.meta.title'),
  description: t('pages.index.meta.description'),
  type: 'website',
})

const navStore = useNavStore()
const cards = computed(() => [navStore.projects].concat(navStore.main))

const colors = [
  'text-red-600 dark:text-red-400',
  'text-blue-600 dark:text-blue-400',
  'text-green-600 dark:text-green-400',
  'text-yellow-600 dark:text-yellow-400',
  'text-purple-600 dark:text-purple-400',
]
</script>

<template>
  <Pager>
    <TitleMain>{{ t('pages.index.meta.title') }}</TitleMain>

    <TitleH2 class="px-2">
      {{ t('pages.index.about') }}
    </TitleH2>

    <Card>
      <div class="flex-reverse flex flex-col items-center justify-between gap-4" sm="flex-row">
        <div class="text-nowrap font-bold">
          Joan Tassel
        </div>
        <div class="text-center">
          {{ t('pages.index.profile.role') }}
        </div>
        <Image
          class="aspect-square rounded-full"
          src="/assets/home/aife_profile.webp"
          :alt="t('pages.index.images.profile_alt')"
          :width="128" :height="128"
        />
      </div>
    </Card>

    <TitleH2 class="px-2">
      {{ t('pages.index.work') }}
    </TitleH2>

    <div class="grid grid-cols-1 gap-2" sm="grid-cols-2" md="grid-cols-2" lg="grid-cols-4">
      <Card
        v-for="(card, index) in cards" :key="card.name" :to="card.to"
        :class="colors[index % colors.length]"
        class="flex items-center justify-center"
        lg="aspect-square"
        hover="scale-102"
        transition="transition-transform duration-300"
      >
        <TitleH3 class="h-10">
          {{ card.name }}
        </TitleH3>
        <div class="min-h-30 flex items-center justify-center" md="min-h-15" xl="min-h-30">
          <div :class="card.icon" class="text-8xl" md="text-6xl" xl="text-8xl" />
        </div>
        <div class="h-16 text-center">
          {{ card.description }}
        </div>
      </Card>
    </div>

    <TitleH2>
      {{ t('pages.index.journey.title') }}
    </TitleH2>

    <Card class="gap-4" md="text-justify">
      <div class="card-grid">
        <Image
          src="/assets/home/work-begin.webp"
          :alt="t('pages.index.images.discovery_alt')"
          class="float-right"
          :width="160" :height="160"
        />
        <TitleH3>{{ t('pages.index.journey.discovery.title') }}</TitleH3>
        <p>
          {{ t('pages.index.journey.discovery.part1') }}<br>
          <i18n-t keypath="pages.index.journey.discovery.part2" tag="span">
            <template #link>
              <LinkExtern to="https://openclassrooms.com/fr/">
                OpenClassrooms
              </LinkExtern>
            </template>
          </i18n-t><br>
          {{ t('pages.index.journey.discovery.part3') }}<br>
          {{ t('pages.index.journey.discovery.part4') }}
        </p>
      </div>

      <div class="card-grid">
        <Image
          src="/assets/home/university.webp"
          :alt="t('pages.index.images.university_alt')"
          class="float-left"
          :width="160" :height="160"
        />
        <TitleH3>{{ t('pages.index.journey.professional.title') }}</TitleH3>
        <p class="align-middle">
          <i18n-t keypath="pages.index.journey.professional.content" tag="span">
            <template #link1>
              <LinkIntern to="/studies">
                {{ t('pages.index.journey.professional.university_link') }}
              </LinkIntern>
            </template>
            <template #link2>
              <LinkIntern to="/companies">
                {{ t('pages.index.journey.professional.company_link') }}
              </LinkIntern>
            </template>
          </i18n-t>
        </p>
      </div>

      <div class="card-grid">
        <TitleH3>{{ t('pages.index.journey.freelance.title') }}</TitleH3>
        <Image
          src="/assets/home/freelance.webp"
          :alt="t('pages.index.images.freelance_alt')"
          class="float-right"
          :width="160" :height="160"
        />
        <p>
          <i18n-t keypath="pages.index.journey.freelance.content" tag="span">
            <template #link1>
              <LinkIntern to="/projects" :title="t('pages.index.journey.freelance.projects_link')">
                {{ t('pages.index.journey.freelance.projects_link') }}
              </LinkIntern>
            </template>
          </i18n-t>
        </p>
      </div>
    </Card>
  </Pager>
</template>

<style scoped>
.card-grid img {
  @apply p-2 filter-saturate-50;
}
</style>
