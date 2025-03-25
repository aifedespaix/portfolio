<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to: string
  external?: boolean
  title?: string
}>()
</script>

<template>
  <component
    :is="external ? 'a' : RouterLink"
    :to="external ? undefined : to"
    :href="external ? to : undefined"
    :target="external ? '_blank' : undefined"
    hover="blue-600 dark:blue-500"
    transition="colors"
    class="cursor-pointer text-blue-500 underline dark:text-blue-400"
    :title="title"
  >
    <slot /><div v-if="external" class="i-mdi:external-link ml-1 inline-block text-xs" />
  </component>
</template>
