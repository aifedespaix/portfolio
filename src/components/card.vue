<script setup lang="ts">
defineProps<{
  isHoverable?: boolean
}>()
</script>

<template>
  <div
    class="flex flex-col gap-2 rounded-lg bg-secondary p-4 overflow-hidden"
    :hover="isHoverable ? 'bg-accent' : ''"
    transition="background-color duration-300"
  >
    <slot />

    <div
      v-if="$slots.footer"
      class="mt-2 rounded-b-lg text-center text-sub -m-4"
      bg="black/10 dark:white/10"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
