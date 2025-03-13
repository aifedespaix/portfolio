<script setup lang="ts">
import { useLayoutStore } from '~/stores/layout'

const { t } = useI18n()

const layoutStore = useLayoutStore()
const navButtonTitle = computed(() => layoutStore.isNavExtended ? t('layout.header.menu.reduce') : t('layout.header.menu.extend'))
</script>

<template>
    <header role="banner" class="h-full flex items-center justify-between p-x-4" >
      <ButtonIcon
        transparent
        class="hidden text-xl"
        md="block"
        icon="i-carbon-menu"
        :title="navButtonTitle"
        @click="layoutStore.toggleNav"
      />

      <div>{{ t('layout.header.title') }}</div>

      <div class="flex items-center gap-2">
        <ButtonToggleTheme />
        <router-link to="/profile">
          <ButtonIcon icon="i-carbon-user" :title="t('layout.header.profile')" />
        </router-link>
      </div>
    </header>
</template>
