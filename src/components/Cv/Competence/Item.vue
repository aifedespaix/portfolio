<script setup lang="ts">
import type { Competence } from '~/types/cv'

const props = defineProps<{
  competence: Competence
  onlyIcon?: boolean
}>()

const width = computed(() => `${props.competence.percentage}%`)
</script>

<template>
  <div class="flex items-center justify-around gap-2 pr-2 text-xs">
    <div class="flex flex-1 items-center gap-2" :class="[onlyIcon ? 'justify-center' : '']">
      <div class="flex items-center gap-2 rounded-full p-1" :class="[onlyIcon ? 'bg-white' : 'bg-background-main']">
        <div :class="[competence.icon, onlyIcon ? 'text-black' : 'rounded-full text-white']" class="p-1" />
        <div v-for="icon in competence.moreIcons" :key="icon" :class="[icon, onlyIcon ? '' : 'rounded-full']" class="p-1 text-white" />
      </div>

      <div v-if="!onlyIcon" class="flex-1">
        {{ competence.name }}
      </div>
    </div>
    <div
      class="bg-background-secondary h-3 flex rounded-full shadow-md"
      :class="[onlyIcon ? 'w-33 ' : 'w-22']"
    >
      <div :style="{ width }" class="bg-background-main h-full rounded-full" />
    </div>
  </div>
</template>
