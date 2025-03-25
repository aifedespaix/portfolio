<script setup lang="ts">
const props = defineProps<{
  link: {
    name: string
    to: string
    icon?: string
  }
  active?: boolean
}>()

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
    :to="link.to"
    :class="classes"
    :title="link.name"
  >
    <div v-if="link.icon" :class="iconClasses" />

    <div v-if="layoutStore.isNavExtended">
      {{ link.name }}
    </div>
  </RouterLink>
</template>
