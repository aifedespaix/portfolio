<script setup lang="ts">
defineProps<{
  title: string
  reverseTitle?: boolean
}>()
</script>

<template>
  <div :class="[reverseTitle ? 'flex flex-col' : '']">
    <div :class="[reverseTitle ? 'title-reverse flex-grow-0 pr-6' : 'title']">
      {{ title }}
    </div>
    <div class="ml-2 flex flex-col gap-1 py-2">
      <slot />
    </div>
  </div>
</template>
