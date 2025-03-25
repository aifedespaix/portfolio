<script setup lang="ts">
type Size = 'small' | 'medium' | 'large'
const props = withDefaults(defineProps<{
  size?: Size
}>(), {
  size: 'medium',
})

const sizeClasses = computed(() => {
  return {
    small: 'max-w-200',
    medium: 'max-w-400',
    large: '',
  }[props.size]
})
</script>

<template>
  <div class="w-full flex flex-col gap-4 p-1" md="p-2" :class="sizeClasses">
    <slot />
  </div>
</template>
