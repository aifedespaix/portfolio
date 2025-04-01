<script setup lang="ts">
import { useLayoutStore } from '~/stores/layout'

const { t } = useI18n()

const layoutStore = useLayoutStore()
const navButtonTitle = computed(() => layoutStore.isNavExtended ? t('menu.reduce') : t('menu.extend'))
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

    <div>{{ t('title') }}</div>

    <div class="flex items-center gap-2">
      <ButtonToggleTheme />
      <ButtonIcon icon="i-carbon-language" :title="t('header.language')" @click="layoutStore.toggleLanguage" />
      <router-link to="/profile">
        <ButtonIcon icon="i-carbon-user" :title="t('profile')" />
      </router-link>
    </div>
  </header>
</template>

<i18n lang="yaml">
  fr:
    profile: "Profil"
    menu:
      reduce: "Réduire le menu"
      extend: "Étendre le menu"
    title: "Portfolio de Joan Tassel - Développeur Web"
    header:
      language: "Passer le site en anglais"
  en:
    profile: "Profile"
    menu:
      reduce: "Collapse menu"
      extend: "Expand menu"
    title: "Joan Tassel's Portfolio - Web Developer"
    header:
      language: "Translate the site to French"
</i18n>
