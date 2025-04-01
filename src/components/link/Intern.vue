<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to: string
  title?: string
}>()
</script>

<template>
  <RouterLink
    :to="to"
    hover="blue-600 dark:blue-500"
    transition="colors"
    class="cursor-pointer text-blue-500 underline dark:text-blue-400"
    :title="title"
  >
    <slot />
  </RouterLink>
</template>
