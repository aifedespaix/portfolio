<script setup lang="ts">
import { RouteKey } from '~/types/route.type'
import type { I18nKey } from '~/types/i18n'
defineComponent({
  name: 'AppBar',
})

const { getUrlLocale, t } = useTranslationsStore()

interface Link {
  label: I18nKey
  to: RouteKey
  icon: string
  big?: boolean
}

const links: Link[] = [
  {
    label: 'components.layout.app-bar.index',
    to: 'index',
    icon: 'i-carbon-home',
  },
  {
    label: 'components.layout.app-bar.projects',
    to: 'projects',
    icon: 'i-icon-park-outline:code-computer',
    big: true,
  },
  {
    label: 'components.layout.app-bar.profile',
    to: 'profile',
    icon: 'i-carbon-user',
  },
]

function sizeClass(link: Link) {
  return link.big ? 'text-2xl' : 'text-xl'
}
</script>

<template>
  <nav class="flex items-center justify-between">
    <router-link
      v-for="link in links"
      :key="link.to"
      :to="getUrlLocale(link.to)"
      transition="background-color duration-300"
      class="h-full flex flex-1 flex-col items-center justify-center p-2"
      hover="bg-secondary"
      active-class="bg-light-700 dark:bg-dark-700"
    >
      <div :class="[link.icon, sizeClass(link)]" />
      <div class="font-size-2">
        {{ t(link.label) }}
      </div>
    </router-link>
  </nav>
</template>
