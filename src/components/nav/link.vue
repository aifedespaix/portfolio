<script setup lang="ts">
import type { I18nKey } from '~/types/i18n'
import { RouteKey } from '~/types/route.type';

const props = defineProps<{
  link: {
    name: I18nKey
    to: RouteKey
    icon?: string
  }
  active?: boolean
}>()

const { t, getUrlLocale } = useTranslationsStore()

const layoutStore = useLayoutStore()

const classes = computed(() => {
  const classes = [
    'flex items-center gap-2 rounded-md p-2 transition-colors',
  ]

  classes.push('hover:bg-light-600')
  classes.push('dark:hover:bg-dark-700')

  if (props.active) {
    classes.push('font-bold')
    classes.push('bg-light-700')
    classes.push('dark:bg-dark-700')
  }

  return classes
})

const iconClasses = computed(() => {
  const classes = [
    'min-w-4',
  ]

  if (props.link.icon) {
    classes.push(props.link.icon)
  }

  return classes
})
</script>

<template>
  <RouterLink
    :to="getUrlLocale(link.to)"
    :class="classes"
    transition="colors duration-200 ease-in-out"
    :title="t(link.name)"
    active-class="bg-light-700 dark:bg-dark-700"
  >
    <div v-if="link.icon" :class="iconClasses" />

    <div v-if="layoutStore.isNavExtended">
      {{ t(link.name) }}
    </div>
  </RouterLink>
</template>

