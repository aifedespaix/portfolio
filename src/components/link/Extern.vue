<script setup lang="ts">
defineProps<{
  to: string
  title?: string
}>()
</script>

<template>
  <a
    :href="to"
    target="_blank"
    hover="blue-600 dark:blue-500"
    transition="colors"
    class="cursor-pointer text-blue-500 underline dark:text-blue-400"
    :title="title"
  >
    <slot /><div class="i-mdi:external-link ml-1 inline-block text-xs" />
  </a>
</template>
