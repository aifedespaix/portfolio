<script setup lang="ts">
interface Props {
  src: string
  alt: string
  width: number
  height: number
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'sync' | 'auto'
  fetchPriority?: 'high' | 'low' | 'auto'
}

withDefaults(defineProps<Props>(), {
  loading: 'lazy',
  decoding: 'async',
  fetchPriority: 'auto',
})

const emit = defineEmits<{
  error: [error: Event]
}>()

function handleError(e: Event) {
  emit('error', e)
}
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    :decoding="decoding"
    :fetchpriority="fetchPriority"
    class="img"
    @error="handleError"
  >
</template>

<style scoped>
.img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
