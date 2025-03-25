<script setup lang="ts">
import { mapGameData } from '~/composables/map-game.data'
</script>

<template>
  <Pager>
    <ProjectDetails :data="mapGameData" />
  </Pager>
</template>
