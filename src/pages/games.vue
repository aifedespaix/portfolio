<script setup lang="ts">
const gamesStore = useGamesStore()
const games = gamesStore.gameList
const { t } = useI18n()
</script>

<template>
  <Pager>
    <TitleMain>
      {{ t('games.title') }}
    </TitleMain>
    <div
      class="grid grid-cols-1 gap-4"
      xs="grid-cols-2"
      md="grid-cols-2 p-4"
      lg="grid-cols-3"
      xl="grid-cols-4"
      xxl="grid-cols-6"
    >
      <router-link
        v-for="game in games"
        :key="game.name"
        :to="game.to"
      >
        <Card is-hoverable :footer="t('games.play')" class="h-full">
          <h2 class="flex items-center gap-2 text-lg font-bold">
            <div :class="game.icon" />
            {{ game.name }}
          </h2>

          <p class="flex-1 text-sub">
            {{ game.description }}
          </p>

          <template #footer>
            <div>{{ t('games.play') }}</div>
          </template>
        </Card>
      </router-link>
    </div>
  </Pager>
</template>

<route lang="yaml">
meta:
  title: Jeux
  description: Jeux en ligne
</route>
