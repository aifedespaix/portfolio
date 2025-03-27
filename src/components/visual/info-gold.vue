<script setup lang="ts">
import type { GoldAward } from '~/types/info-gold'

const props = defineProps<{
  info: GoldAward
}>()
</script>

<template>
  <div class="flex gap-2" :class="{ 'award-container': props.info.value }">
    <div
      v-if="props.info.value"
      class="award-value aspect-square flex items-center justify-center gap-2 rounded-full p-2 text-sm"
      border="4 yellow-300 dark:yellow-500"
      text="yellow-900 dark:yellow-100"
    >
      {{ props.info.value.prefix }} {{ props.info.value.qte }} {{ props.info.value.suffix }}
    </div>
    <div
      class="award-name max-w-100 flex flex-1 items-center gap-2 rounded-md p-2 text-xl"
      bg="yellow-300 dark:yellow-500"
      text="yellow-900 dark:yellow-100"
    >
      <div class="i-mdi:diploma min-w-6" />
      <div md="whitespace-nowrap overflow-hidden text-ellipsis" :title="info.name">
        {{ info.name }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.award-container {
  transition: gap 0.3s ease-in-out;

  .award-value {
    transition:
      border-radius 0.3s ease-in-out,
      background-color 0.3s ease-in-out;
  }
  .award-name {
    transition: border-radius 0.3s ease-in-out;
  }

  &:hover {
    gap: 0;
    .award-value {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      @apply bg-yellow-300 dark:bg-yellow-500;
    }
    .award-name {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 4rem;
      border-bottom-right-radius: 4rem;
    }
  }
}
</style>
