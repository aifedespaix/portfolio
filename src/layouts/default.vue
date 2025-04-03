<script setup lang="ts">
import { useMatomo } from '~/composables/matomo'

defineComponent({
  name: 'DefaultLayout',
})

const headerHeight = ref('60px')
const largeNavWidth = '240px'
const smallNavWidth = '56px'
const appBarHeight = ref('3rem')

useMatomo()
const layoutStore = useLayoutStore()

const navWidth = computed(() => layoutStore.isNavExtended ? largeNavWidth : smallNavWidth)

const content = ref<HTMLElement | null>(null)
</script>

<template>
  <LayoutHeader id="header" bg="light-100" dark="bg-dark-900" class="z-1" />
  <LayoutNav id="nav" bg="light-100" dark="bg-dark-900" />

  <main id="main" class="relative">
    <div id="content" ref="content">
      <RouterView />
    </div>
  </main>

  <LayoutAppBar id="app-bar" bg="light-100 dark:dark-900" />
</template>

<style>
/* Variables CSS pour les breakpoints */
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
  --distance-top: v-bind(0);
  --distance-bottom: v-bind(appBarHeight);
  min-height: 100dvh;
  padding-bottom: v-bind(appBarHeight);
  height: calc(100dvh - v-bind(appBarHeight));
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
    --distance-top: v-bind(headerHeight);
    --distance-bottom: v-bind(0);
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
