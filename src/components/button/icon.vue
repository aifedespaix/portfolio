<script setup lang="ts">
const props = defineProps<{
  icon: string
  title: string
  transparent?: boolean
  active?: boolean
}>()

const classes = computed(() => {
  const classes = [
    'rounded-full',
    'p-2',
    'transition-colors',
    'duration-300',
  ]
  if (props.active) {
    classes.push('bg-blue-200')
    classes.push('dark:bg-blue-800')
    classes.push('hover:bg-blue-300')
    classes.push('dark:hover:bg-blue-900')
  }
  else {
    if (!props.transparent) {
      classes.push('shadow-lg')
      classes.push('bg-light-300')
      classes.push('dark:bg-dark-800')
    }
    classes.push('hover:bg-light-600')
    classes.push('dark:hover:bg-dark-700')
  }

  return classes
})
</script>

<template>
  <button
    :class="classes"
    :title="title"
  >
    <div :class="icon" />
  </button>
</template>
