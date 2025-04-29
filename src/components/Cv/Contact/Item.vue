<script setup lang="ts">
defineProps<{
  icon: string
  value: string
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="bg-background-main flex items-center justify-center rounded-full p-1">
      <div :class="icon" class="text-white" />
    </div>
    <div>
      {{ value }}
    </div>
  </div>
</template>
