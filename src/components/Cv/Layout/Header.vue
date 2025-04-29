<script setup lang="ts">
import type { Header } from '~/types/cv'

defineProps<{
  header: Header
}>()
</script>

<template>
  <div class="bg-background-main text-text-title mt-4 flex items-center justify-between p-4">
    <div class="flex flex-col gap-2">
      <div class="text-4xl font-bold">
        {{ header.name }}
      </div>
      <div class="flex flex-col gap-2 text-3xl">
        <div>{{ header.job }}</div>
        <div class="h-1px w-66% bg-white" />
      </div>
      <div class="text-center text-lg leading-5">
        {{ header.description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
