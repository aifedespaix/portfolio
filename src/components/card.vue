<script setup lang="ts">
import type { RouteKey } from '~/types/route.type'

const props = defineProps<{
  isHoverable?: boolean
  active?: boolean
  to?: RouteKey
}>()

const { getUrlLocale } = useTranslationsStore()

const classes = computed(() => {
  const classes = [
    'flex flex-col gap-2 overflow-hidden rounded-lg p-4',
  ]

  classes.push('bg-light-100')
  classes.push('dark:bg-dark-700')

  if (props.isHoverable) {
    classes.push('hover:bg-light-700')
    classes.push('dark:hover:bg-dark-400')
  }

  if (props.active) {
    classes.push('border-2')
    classes.push('border-light-800')
    classes.push('dark:border-dark-400')
  }

  if (props.to) {
    classes.push('cursor-pointer')
    classes.push('hover:bg-light-700')
    classes.push('dark:hover:bg-dark-400')
  }

  return classes
})
</script>

<template>
  <component
    :is="to ? 'RouterLink' : 'div'"
    :to="to ? getUrlLocale(to) : undefined"
    :class="classes"
    transition="background-color duration-300"
  >
    <slot />

    <div
      v-if="$slots.footer"
      class="mt-2 rounded-b-lg text-center -m-4"
      bg="blue-300/50 dark:blue-800/50"
    >
      <slot name="footer" />
    </div>

    <div
      v-if="$slots.button"
      class="mt-2 rounded-b-lg p-2 text-center -m-4"
      bg="blue-300/50 dark:blue-800/50"
    >
      <slot name="button" />
    </div>
  </component>
</template>
