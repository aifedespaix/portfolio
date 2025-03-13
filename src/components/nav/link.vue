<script setup lang="ts">
defineProps<{
  link: {
    name: string
    to: string
    icon?: string
  }
}>()

const layoutStore = useLayoutStore()
</script>

<template>
  <RouterLink
    :to="link.to"
    class="flex items-center gap-2 rounded-md p-2 transition-colors"
    hover="bg-sup"
    :title="link.name"
  >
    <div v-if="link.icon" :class="link.icon" class="min-w-4" />

    <div v-if="layoutStore.isNavExtended">
      {{ link.name }}
    </div>
  </RouterLink>
</template>
