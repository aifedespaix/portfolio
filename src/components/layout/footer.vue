<script setup lang="ts">
const { t, getUrlLocale } = useTranslationsStore()

interface Link {
  name: string
  url: string
  icon: string
  hover: string
}

const links: Link[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/aifedespaix',
    icon: 'i-mdi:github',
    hover: 'hover:text-dark-800 dark:hover:text-gray-600',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/joan-tassel-965230294/',
    icon: 'i-mdi:linkedin',
    hover: 'hover:text-blue-800 dark:hover:text-blue-400',
  },
  {
    name: 'Youtube',
    url: 'https://www.youtube.com/@Aife',
    icon: 'i-mdi:youtube',
    hover: 'hover:text-red-800 dark:hover:text-red-400',
  },
  {
    name: 'Twitch',
    url: 'https://www.twitch.tv/aife',
    icon: 'i-mdi:twitch',
    hover: 'hover:text-purple-800 dark:hover:text-purple-400',
  },
]
</script>

<template>
  <footer class="flex flex-col items-center justify-center p-4 pb-[var(--distance-bottom)] italic">
    <div>{{ t('components.layout.footer.copyright') }} </div>
    <div>&copy; Aife | 2020 - {{ new Date().getFullYear() }}</div>
    <div class="flex justify-center gap-2 p-2">
      <a
        v-for="link in links"
        :key="link.name"
        :href="link.url"
        target="_blank"
        class="text-xl" :class="[link.hover]"
        transition="text duration-300 ease-in-out"
        :title="link.name"
      >
        <div :class="link.icon" />
      </a>
    </div>
    <RouterLink :to="getUrlLocale('privacy')">
      {{ t('components.layout.footer.privacy') }}
    </RouterLink>
    <RouterLink :to="getUrlLocale('legal')">
      {{ t('components.layout.footer.legal') }}
    </RouterLink>
  </footer>
</template>
