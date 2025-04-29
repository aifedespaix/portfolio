<script setup lang="ts">
import type { Formation } from '~/types/cv'

defineProps<{
  formation: Formation
}>()
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col">
    <div class="font-bold">
      {{ t(formation.school) }}
    </div>
    <div>{{ t(formation.diploma) }}</div>
    <div>{{ formation.startYear }} - {{ formation.endYear }} | {{ t(formation.city) }}</div>
  </div>
</template>
