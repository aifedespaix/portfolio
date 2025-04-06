<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<template>
  <RouterLink
    :to="to"
    class="rounded-full px-2 py-1 text-sm text-white text-dark:white"
    bg="blue-600 dark:blue-700"
    hover:bg="blue-700 dark:blue-800"
    transition="bg duration-300 ease-in-out"
  >
    <slot />
  </RouterLink>
</template>
