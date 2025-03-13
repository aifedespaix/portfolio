<script setup lang="ts">
const { t } = useI18n()
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    class="relative h-8 w-14 inline-flex items-center rounded-full bg-sup shadow-md"
    role="switch"
    :aria-checked="isDark"
    :title="t('settings.theme.label')"
    @click="toggleDark()"
  >
    <span
      class="inline-block h-6 w-6 rounded-full bg-sup shadow-lg ease-in-out"
      :class="isDark ? 'translate-x-7' : 'translate-x-1'"
      transition="transform duration-900 ease-in-out"
    >
      <div
        class="h-full w-full flex items-center justify-center"
        text="yellow-500 dark:yellow-200"
      >
        <div i="carbon-sun dark:carbon-moon" />
      </div>
    </span>
  </button>
</template>
