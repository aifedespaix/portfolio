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
  <button class="rounded-lg p-2" bg="light-700 dark:dark-900" hover:bg="light-800 dark:dark-950" @click="navigate">
    <slot />
  </button>
</template>
