<script setup lang="ts">
import type { Project } from '~/types/project'

const props = defineProps<{
  data: Project
}>()

const imagePath = (image: string) => `/assets/projects/${props.data.id}/${image}.webp`
</script>

<template>
  <article class="mx-auto max-w-4xl px-4 py-8">
    <!-- En-tête du projet -->
    <header class="mb-12">
      <TitleMain>
        {{ data.name }}
      </TitleMain>
      <img
        :src="imagePath(data.image)"
        :alt="data.name"
        class="mb-6 h-64 w-full rounded-lg object-cover shadow-lg"
      >
      <p class="text-justify text-lg">
        {{ data.description }}
      </p>
    </header>

    <section v-if="data.links" class="mb-12">
      <TitleH2>Lien{{ data.links.length > 1 ? 's' : '' }} du projet</TitleH2>
      <div class="grid grid-cols-1 gap-4" xs="grid-cols-2" xl="grid-cols-4">
        <a
          v-for="link in data.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-3 p-4 rounded-lg transition-colors duration-300"
          :class="{
            'bg-red-500 hover:bg-red-600': link.type === 'youtube',
            'bg-dark-500 hover:bg-dark-600': link.type === 'tiktok',
            'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700': !['youtube', 'tiktok'].includes(link.type ?? '')
          }"
        >
          <div class="text-2xl">
            <div
              :class="link.icon"
            />
          </div>
          <div class="flex flex-col gap-1">
            <span class="font-medium" :class="{
            'text-white': ['youtube', 'tiktok'].includes(link.type ?? ''),
            'text-gray-900 dark:text-white': !['youtube', 'tiktok'].includes(link.type ?? '')
          }">
            {{ link.name }}
          </span>
          <span v-if="link.more" class="text-xs" text="gray-500 dark:gray-400">{{ link.more }}</span>
          </div>
        </a>
      </div>
    </section>

    <!-- Jalons / Explications -->
    <section class="mb-12">
      <TitleH2>
        Points clés du projet
      </TitleH2>
      <div class="grid gap-8 md:grid-cols-2">
        <div
          v-for="explain in data.explains"
          :key="explain.title"
          bg="white dark:dark-800"
          class="overflow-hidden rounded-lg shadow-md"
        >
          <img
            :src="imagePath(explain.image)"
            :alt="explain.title"
            class="h-48 w-full object-cover"
          >
          <div class="p-4">
            <h3 class="mb-2 text-xl font-semibold">
              {{ explain.title }}
            </h3>
            <p class="text-justify">
              {{ explain.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Difficultés -->
    <section class="mb-12">
      <TitleH2>
        Défis rencontrés
      </TitleH2>
      <ul class="space-y-4">
        <li
          v-for="(difficulty, index) in data.difficulties"
          :key="index"
          bg="red-50 dark:red-800/20"
          class="flex items-start gap-3 rounded-lg p-4 text-justify"
        >
          <div>
            <div class="i-mdi:alert-circle-outline text-2xl text-red-500" />
          </div>
          <p>{{ difficulty }}</p>
        </li>
      </ul>
    </section>

    <!-- Technologies utilisées -->
    <section>
      <TitleH2>
        Technologies Utilisées
      </TitleH2>
      <div class="flex flex-wrap gap-3">
        <a
          v-for="tech in data.technologies"
          :key="tech.name"
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
