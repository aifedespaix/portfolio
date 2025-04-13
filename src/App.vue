<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Aife Portfolio',
  meta: [
    {
      name: 'description',
      content: 'Portfolio de Aife',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#083BA0' : '#083BA0',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: () => preferredDark.value ? '/favicon-dark.png' : '/favicon.png',
    },
    {
      rel: 'icon',
      href: () => preferredDark.value ? '/favicon-dark.ico' : '/favicon.ico',
    },
  ],
})

const route = useRoute()
</script>

<template>
  <RouterView :key="route.fullPath" />
</template>
