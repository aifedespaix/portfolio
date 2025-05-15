<script setup lang="ts">
import { useHeadTag } from '~/composables/head-tag'
import { useNavStore } from '~/stores/nav'
import { useTranslationsStore } from '~/stores/translations'

defineOptions({
  name: 'IndexPage',
})

const { t, getUrlLocale } = useTranslationsStore()

useHeadTag({
  title: computed(() => t('pages.index.meta.title')),
  description: computed(() => t('pages.index.meta.description')),
  type: 'website',
})

const navStore = useNavStore()
const cards = computed(() => [navStore.projects].concat(navStore.main))

const colors = [
  'text-red-600 dark:text-red-400',
  'text-blue-600 dark:text-blue-400',
  'text-green-700 dark:text-green-400',
  'text-purple-800 dark:text-yellow-400',
  'text-purple-600 dark:text-purple-400',
]
</script>

<template>
  <Pager>
    <TitleMain v-reveal>
      {{ t('pages.index.title') }}
    </TitleMain>

    <Card>
      <div v-reveal class="flex-reverse flex flex-col items-center justify-between gap-4" sm="flex-row">
        <div class="text-nowrap font-bold">
          Joan Tassel
        </div>
        <h2 class="text-center">
          {{ t('pages.index.profile.role') }}
        </h2>
        <Image
          class="aspect-square h-32 w-32 overflow-hidden rounded-full"
          path="/assets/home/aife_profile"
          :alt="t('pages.index.images.profile_alt')"
          :width="128" :height="128"
        />
      </div>
    </Card>

    <TitleH2 v-reveal class="px-2">
      {{ t('pages.index.work') }}
    </TitleH2>

    <div
      class="grid grid-cols-1 gap-2 overflow-hidden"
      sm="grid-cols-2"
      md="grid-cols-2 overflow-initial"
      lg="grid-cols-4"
    >
      <Card
        v-for="(card, index) in cards" :key="card.name" v-reveal
        :to="card.to"
        :class="colors[index % colors.length]"
        class="flex items-center justify-center"
        lg="aspect-square"
        hover="scale-102" transition="transition-transform duration-300"
      >
        <TitleH3 class="h-10">
          {{ t(card.name) }}
        </TitleH3>
        <div class="min-h-30 flex items-center justify-center" md="min-h-15" xl="min-h-30">
          <div :class="card.icon" class="text-8xl" md="text-6xl" xl="text-8xl" />
        </div>
        <div class="h-16 text-center">
          {{ t(card.description) }}
        </div>
      </Card>
    </div>

    <TitleH2 v-reveal>
      {{ t('pages.index.journey.title') }}
    </TitleH2>

    <Card class="gap-4" md="text-justify">
      <div v-reveal class="card-grid">
        <TitleH3>{{ t('pages.index.journey.discovery.title') }}</TitleH3>
        <Image
          path="/assets/home/work-begin"
          :alt="t('pages.index.images.discovery_alt')"
          class="float-right m-2 max-w-40"
          :width="160" :height="160"
        />
        <p>
          {{ t('pages.index.journey.discovery.part1') }}<br>
          <i18n-t keypath="pages.index.journey.discovery.part2" tag="span" scope="global">
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

      <div v-reveal class="card-grid">
        <TitleH3>{{ t('pages.index.journey.professional.title') }}</TitleH3>
        <Image
          path="/assets/home/university"
          :alt="t('pages.index.images.university_alt')"
          class="float-left m-2 max-w-40"
          :width="160" :height="160"
        />
        <p class="align-middle">
          <i18n-t keypath="pages.index.journey.professional.content" tag="span" scope="global">
            <template #link1>
              <LinkIntern :to="getUrlLocale('studies')">
                {{ t('pages.index.journey.professional.university_link') }}
              </LinkIntern>
            </template>
            <template #link2>
              <LinkIntern :to="getUrlLocale('companies')">
                {{ t('pages.index.journey.professional.company_link') }}
              </LinkIntern>
            </template>
          </i18n-t>
        </p>
      </div>

      <div v-reveal class="card-grid">
        <TitleH3>{{ t('pages.index.journey.freelance.title') }}</TitleH3>
        <Image
          path="/assets/home/freelance"
          :alt="t('pages.index.images.freelance_alt')"
          class="float-right m-2 max-w-40"
          :width="160" :height="160"
        />
        <p>
          <i18n-t keypath="pages.index.journey.freelance.content" tag="span" scope="global">
            <template #link1>
              <LinkIntern :to="getUrlLocale('projects')" :title="t('pages.index.journey.freelance.projects_link')">
                {{ t('pages.index.journey.freelance.projects_link') }}
              </LinkIntern>
            </template>
          </i18n-t>
        </p>
      </div>

      <div v-reveal class="card-grid">
        <TitleH3>{{ t('pages.index.journey.today.title') }}</TitleH3>
        <p>
          {{ t('pages.index.journey.today.content') }}
        </p>
      </div>
    </Card>

    <Card v-reveal class="flex items-center justify-center gap-4 text-purple-600">
      <div class="flex flex-col items-center gap-2 text-center" transition="transform duration-300" hover="scale-102" dark="text-purple-400">
        <div class="i-mdi-github text-6xl md:text-7xl" />

        <LinkExtern
          to="https://github.com/aifedespaix"
          class="mt-2 rounded-full bg-purple-600 px-6 py-2 text-white decoration-none transition-all dark:bg-purple-400 dark:text-gray-900"
          hover="bg-purple-700 dark:bg-purple-300"
        >
          {{ t('pages.index.github.button') }}
        </LinkExtern>
        <p class="text-sm">
          {{ t('pages.index.github.description') }}
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
