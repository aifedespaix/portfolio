<script setup lang="ts">
const props = defineProps<{
  to?: string
}>()

const router = useRouter()

function navigate() {
  if (props.to) {
    router.push(props.to)
  }
}
</script>

<template>
  <button v-if="!to" class="button">
    <slot />
  </button>
  <button v-else class="button" @click="navigate">
    <slot />
  </button>
</template>

<style scoped>
.button {
  @apply rounded-lg bg-sup p-2;
}

.button:hover {
  @apply bg-accent;
}
</style>
