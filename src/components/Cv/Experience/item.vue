<script setup lang="ts">
import type { Experience } from '~/types/cv'

const props = defineProps<{
  experience: Experience
}>()
const { t } = useI18n()
const dates = computed(() => {
  if (props.experience.endDate) {
    return `${props.experience.startDate} - ${props.experience.endDate}`
  }
  return `Depuis ${props.experience.startDate}`
})
</script>

<template>
  <div class="flex flex-col gap-1 py-2">
    <div class="flex items-center text-center text-xl">
      <span class="inline font-semibold">{{ t(experience.company) }}</span>,&nbsp;<span class="italic">{{ t(experience.city) }}</span>&nbsp;|&nbsp;{{ dates }}
    </div>
    <div class="flex flex-col gap-1">
      <div v-for="mission in experience.missions" :key="mission.name">
        <div class="font-bold">
          {{ t(mission.name) }}
        </div>
        <div class="flex flex-col list-disc">
          <ul v-for="action in mission.actions" :key="action" class="list-circle pl-5">
            <li>{{ t(action) }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
