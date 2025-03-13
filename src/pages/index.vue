<script setup lang="ts">
import { useSeo } from '~/composables/seo'

defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()
useSeo({
  pageTitle: t('home.title'),
  description: t('home.description'),
  image: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000',
})
</script>

<template>
  <Pager>
    <TitleMain>{{ t('home.title') }}</TitleMain>
    <Card>{{ t('home.description') }}</Card>
  </Pager>
</template>
