<script setup lang="ts">
defineComponent({
  name: 'AppBar',
})

interface Link {
  label: string
  href: string
  icon: string
  big?: boolean
}

const links: Link[] = [
  {
    label: 'Accueil',
    href: '/',
    icon: 'i-carbon-home',
  },
  {
    label: 'Projets',
    href: '/projects',
    icon: 'i-icon-park-outline:code-computer',
    big: true,
  },
  {
    label: 'Profil',
    href: '/profile',
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
      :key="link.href"
      :to="link.href"
      transition="background-color duration-300"
      class="h-full flex flex-1 flex-col items-center justify-center p-2"
      hover="bg-secondary"
      active-class="bg-blue-500/20"
    >
      <div :class="[link.icon, sizeClass(link)]" />
      <div class="font-size-2">
        {{ link.label }}
      </div>
    </router-link>
  </nav>
</template>
