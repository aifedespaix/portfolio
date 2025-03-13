<script setup lang="ts">
defineComponent({
  name: 'DefaultLayout',
})

const { t } = useI18n()
const headerHeight = ref('60px')
const largeNavWidth = '240px'
const smallNavWidth = '56px'
// const navWidthLarge = ref('256px')
const appBarHeight = ref('3rem')

const layoutStore = useLayoutStore()

const navWidth = computed(() => layoutStore.isNavExtended ? largeNavWidth : smallNavWidth)

const content = ref<HTMLElement | null>(null)

function toggleFullscreen() {
  if (content.value) {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    else {
      content.value.requestFullscreen()
    }
  }
}

const route = useRoute()
const isGame = route.meta.isGame
const canFullscreen = route.meta.canFullscreen
</script>

<template>
  <LayoutHeader id="header" bg="primary" class="z-1" />
  <LayoutNav id="nav" bg="secondary" />

  <main id="main" bg="tertiary" class="relative">
    <div id="content" ref="content">
      <RouterView />
    </div>

    <LayoutFooter v-if="!isGame" />
    <ButtonIcon
      v-if="canFullscreen || isGame"
      id="fullscreen-button"
      class="fixed bottom-4 right-4 bg-black/25"
      icon="i-carbon-fit-to-screen"
      :title="t('layout.fullscreen')"
      @click="toggleFullscreen()"
    />
  </main>

  <LayoutAppBar id="app-bar" bg="primary" />
</template>

<style scoped>
/* Variables CSS pour les breakpoints */
/* todo valeurs copiées de unocss config (si y'a moyen de les récupérer dynamiquement, c'est mieux) */
#header {
  height: v-bind(headerHeight);
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  right: 0;
  display: none;
}

#nav {
  position: fixed;
  z-index: 10;
  left: 0;
  top: v-bind(headerHeight);
  bottom: 0;
  width: v-bind(navWidth);
  display: none;
}

#app-bar {
  height: v-bind(appBarHeight);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

#main {
  min-height: 100dvh;
  padding-bottom: v-bind(appBarHeight);
  height: calc(100dvh - var(--app-bar-height));
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#fullscreen-button {
  margin-bottom: v-bind(appBarHeight);
}

/* Media queries pour les breakpoints */

@media (min-width: 768px) {
  #header {
    display: flex;
  }

  #nav {
    display: block;
    width: v-bind(navWidth);
  }

  #app-bar {
    display: none;
  }

  #main {
    --header-height: v-bind(headerHeight);
    padding-left: v-bind(navWidth);
    padding-top: v-bind(headerHeight);
    min-height: 100dvh;
    padding-bottom: 0;
  }

  #fullscreen-button {
    margin-bottom: 0;
  }
}
</style>
