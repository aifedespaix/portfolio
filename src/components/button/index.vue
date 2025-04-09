<script setup lang="ts">
import { RouteKey } from '~/types/route.type';

const props = defineProps<{
  to?: RouteKey
}>()
const router = useRouter()

const { getUrlLocale } = useTranslationsStore()

function navigate() {
  if (props.to) {
    router.push(getUrlLocale(props.to))
  }
}
</script>

<template>
  <button class="rounded-lg p-2" bg="light-700 dark:dark-900" hover:bg="light-800 dark:dark-950" @click="navigate">
    <slot />
  </button>
</template>
