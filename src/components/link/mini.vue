<script setup lang="ts">
import type { RouteKey } from '~/types/route.type'

defineProps<{
  to: RouteKey
}>()

const { getUrlLocale } = useTranslationsStore()
</script>

<template>
  <RouterLink
    :to="getUrlLocale(to)"
    class="rounded-full px-2 py-1 text-sm text-dark:white text-white"
    bg="blue-600 dark:blue-700"
    hover:bg="blue-700 dark:blue-800"
    transition="bg duration-300 ease-in-out"
  >
    <slot />
  </RouterLink>
</template>
