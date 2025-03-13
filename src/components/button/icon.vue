<script setup lang="ts">
const props = defineProps<{
  icon: string
  title: string
  transparent?: boolean
}>()

const colorClass = computed(() => props.transparent ? 'bg-transparent' : 'bg-accent')
const hoverClass = computed(() => props.transparent ? 'bg-accent' : 'bg-sup')
const shadowClass = computed(() => props.transparent ? 'shadow-none' : 'shadow-lg')

const classes = computed(() => [
  colorClass.value,
  shadowClass.value,
])
</script>

<template>
  <button
    class="rounded-full p-2 shadow-lg"
    transition="colors duration-300"
    :class="classes"
    :title="title"
    :hover="hoverClass"
  >
    <div :class="icon" />
  </button>
</template>
