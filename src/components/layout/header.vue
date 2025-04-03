<script setup lang="ts">
import { useLayoutStore } from '~/stores/layout'

const { t } = useI18n()

const layoutStore = useLayoutStore()
const navButtonTitle = computed(() =>
  layoutStore.isNavExtended
    ? t('components.layout.header.menu.reduce')
    : t('components.layout.header.menu.extend'))
</script>

<template>
  <header role="banner" class="h-full flex items-center justify-between p-x-4" shadow="md dark:dark-800">
    <ButtonIcon
      transparent
      class="hidden text-xl"
      md="block"
      icon="i-carbon-menu"
      :title="navButtonTitle"
      @click="layoutStore.toggleNav"
    />

    <div>{{ t('components.layout.header.title') }}</div>

    <div class="flex items-center gap-2">
      <ButtonToggleTheme />
      <ButtonIcon
        icon="i-carbon-language"
        :title="t('components.layout.header.language')"
        @click="layoutStore.toggleLanguage"
      />
      <router-link to="/profile">
        <ButtonIcon icon="i-carbon-user" :title="t('components.layout.header.profile')" />
      </router-link>
    </div>
  </header>
</template>
