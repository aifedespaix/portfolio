<script setup lang="ts">
import type { Project } from '~/types/project.type'

const props = defineProps<{
  data: Project
}>()

const { t } = useI18n()
const imagePath = (image: string) => `/assets/projects/${props.data.id}/${image}`
</script>

<template>
  <article class="mx-auto max-w-4xl px-4 py-8">
    <!-- En-tête du projet -->
    <header v-reveal class="mb-12">
      <TitleMain>
        {{ t(data.name) }}
      </TitleMain>
      <Image
        :path="imagePath(data.image)"
        :alt="t(data.name)"
        class="mb-6 h-64 w-full rounded-lg object-cover shadow-lg"
        :width="512"
        :height="288"
        :transparent="false"
      />
      <p class="text-justify text-lg">
        {{ t(data.description) }}
      </p>
    </header>

    <section v-if="data.links" v-reveal class="mb-12">
      <TitleH2>
        {{ t('components.project-details.link', { count: data.links.length }) }}
      </TitleH2>
      <div class="grid grid-cols-1 gap-4" xs="grid-cols-2" xl="grid-cols-4">
        <a
          v-for="link in data.links"
          :key="link.url"
          v-reveal
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="relative flex items-center gap-3 rounded-lg p-4 transition-colors duration-300"
          :class="{
            'bg-red-400 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-800': link.type === 'youtube',
            'bg-light-900 dark:bg-dark-500 hover:bg-dark-700 dark:hover:bg-dark-800': link.type === 'tiktok',
            'bg-purple-500 dark:bg-purple-800 hover:bg-purple-600 dark:hover:bg-purple-900': link.type === 'github',
            'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700': !['youtube', 'tiktok', 'github'].includes(link.type ?? ''),
          }"
        >
          <div class="text-2xl text-black dark:text-white">
            <div
              :class="link.icon"
            />
          </div>
          <div class="flex flex-col gap-1">
            <span
              class="font-medium"
              :class="{
                'text-black dark:text-white': ['youtube', 'tiktok'].includes(link.type ?? ''),
                'text-gray-900 dark:text-white': !['youtube', 'tiktok'].includes(link.type ?? ''),
              }"
            >
              {{ t(link.name) }}
            </span>
            <span v-if="link.more" class="text-xs" text="gray-500 dark:gray-400">{{ t(link.more) }}</span>
            <div class="i-mdi:external-link absolute right-2 top-2 text-xs" />
          </div>
        </a>
      </div>
    </section>

    <!-- Jalons / Explications -->
    <section class="mb-12">
      <TitleH2 v-reveal>
        {{ t('components.project-details.keyPoints') }}
      </TitleH2>

      <div class="grid gap-8 xl:grid-cols-2">
        <div
          v-for="explain in data.explains"
          :key="explain.title"
          v-reveal
          bg="white dark:dark-800"
          class="overflow-hidden rounded-lg shadow-md"
          border="1 solid light-200 dark:dark-800"
        >
          <Image
            :path="imagePath(explain.image)"
            :alt="t(explain.title)"
            class="h-48 w-full object-cover"
            :width="512"
            :height="288"
            :transparent="true"
          />
          <div class="p-4">
            <h3 class="mb-2 text-xl font-semibold">
              {{ t(explain.title) }}
            </h3>
            <p class="text-justify">
              {{ t(explain.description) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Difficultés -->
    <section class="mb-12">
      <TitleH2 v-reveal>
        {{ t('components.project-details.difficulties') }}
      </TitleH2>
      <ul class="space-y-4">
        <li
          v-for="(difficulty, index) in data.difficulties"
          :key="index"
          v-reveal
          bg="red-50 dark:red-800/20"
          class="flex items-start gap-3 rounded-lg p-4 text-justify"
        >
          <div>
            <div class="i-mdi:alert-circle-outline text-2xl text-red-500" />
          </div>
          <p>{{ t(difficulty) }}</p>
        </li>
      </ul>
    </section>

    <!-- Technologies utilisées -->
    <section>
      <TitleH2 v-reveal>
        {{ t('components.project-details.technologies') }}
      </TitleH2>
      <div class="flex flex-wrap gap-3">
        <a
          v-for="tech in data.technologies"
          :key="tech.name"
          v-reveal
          :href="tech.url"
          target="_blank"
          rel="noopener noreferrer"
          transition="colors duration-300 ease-in-out"
          class="rounded-full px-4 py-2"
          bg="gray-100 dark:gray-800"
          hover="bg-gray-200 dark:bg-gray-900"
        >
          {{ tech.name }}
        </a>
      </div>
    </section>
  </article>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
