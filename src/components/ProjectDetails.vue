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
      <h1 class="mb-4 text-4xl font-bold">
        {{ data.name }}
      </h1>
      <img
        :src="imagePath(data.image)"
        :alt="data.name"
        class="mb-6 h-64 w-full rounded-lg object-cover shadow-lg"
      >
      <p class="text-justify text-lg">
        {{ data.description }}
      </p>
    </header>

    <!-- Jalons / Explications -->
    <section class="mb-12">
      <TitleH2 class="mb-6 text-2xl font-semibold">
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
            <p>{{ explain.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Difficultés -->
    <section class="mb-12">
      <TitleH2 class="mb-4 text-2xl font-semibold">
        Défis rencontrés
      </TitleH2>
      <ul class="space-y-4">
        <li
          v-for="(difficulty, index) in data.difficulties"
          :key="index"
          bg="red-50 dark:red-800/20"
          class="flex items-start gap-3 rounded-lg p-4"
        >
          <span class="mt-1 text-red-500">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </span>
          <p>{{ difficulty }}</p>
        </li>
      </ul>
    </section>

    <!-- Technologies utilisées -->
    <section>
      <TitleH2 class="mb-4 text-2xl font-semibold">
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
