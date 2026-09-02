<script setup lang="ts">
import type { GoldAward } from '~/types/info-gold.type'

const props = defineProps<{
  info: GoldAward
}>()

const { t } = useI18n()
</script>

<template>
  <div class="flex gap-2" :class="{ 'award-container': props.info.value }">
    <div
      v-if="props.info.value"
      class="award-value aspect-square w-17 flex items-center justify-center overflow-hidden rounded-full p-1.5 text-center text-xs font-bold leading-tight"
      border="4 amber-400 dark:amber-500"
      text="amber-900 dark:amber-300"
      shadow="sm"
    >
      <span>{{ props.info.value.prefix ? props.info.value.prefix : '' }} {{ props.info.value.qte }} {{ props.info.value.suffix ? t(props.info.value.suffix) : '' }}</span>
    </div>
    <div
      class="award-name max-w-100 flex flex-1 items-center gap-2 rounded-md p-2 text-lg font-semibold sm:text-xl"
      bg="amber-400 dark:amber-500"
      text="amber-950"
      shadow="sm"
    >
      <div class="i-mdi:diploma min-w-6" />
      <div md="whitespace-nowrap overflow-hidden text-ellipsis" :title="info.name">
        {{ t(props.info.name) }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.award-container {
  --award-duration: 0.35s;
  --award-ease: cubic-bezier(0.22, 1, 0.36, 1);

  transition: gap var(--award-duration) var(--award-ease);

  .award-value {
    position: relative;
    transition:
      border-radius var(--award-duration) var(--award-ease),
      background-color var(--award-duration) var(--award-ease),
      color var(--award-duration) var(--award-ease),
      box-shadow var(--award-duration) var(--award-ease);
  }

  .award-name {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    transition:
      border-radius var(--award-duration) var(--award-ease),
      box-shadow var(--award-duration) var(--award-ease);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        115deg,
        transparent 30%,
        rgb(255 255 255 / 55%) 48%,
        rgb(255 255 255 / 55%) 52%,
        transparent 70%
      );
      transform: translateX(-120%);
      transition: transform calc(var(--award-duration) * 1.4) var(--award-ease);
      pointer-events: none;
    }
  }

  &:hover {
    gap: 0;

    .award-value {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      box-shadow: none;
      @apply bg-amber-400 text-amber-950 dark:bg-amber-500 dark:text-amber-950;
    }

    .award-name {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 4rem;
      border-bottom-right-radius: 4rem;
      box-shadow: 0 6px 16px -6px rgb(217 119 6 / 45%);

      &::after {
        transform: translateX(120%);
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .award-container {
    --award-duration: 0.01s;

    .award-name::after {
      display: none;
    }
  }
}
</style>
