<template>
  <div class="flex flex-col gap-4 p-1 w-full" md="p-2" :class="{ 'max-w-400': !larger }">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  larger?: boolean
}>()
</script>
