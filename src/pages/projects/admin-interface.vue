<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <Pager>
    <TitleMain>
      {{ t('portfolio.projects.a.title') }}
    </TitleMain>
  </Pager>
</template>
