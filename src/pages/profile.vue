<script setup lang="ts">
import { useHeadTag } from '~/composables/head-tag'

const { t } = useI18n()

useHeadTag({
  title: computed(() => t('pages.profile.meta.title')),
  description: computed(() => t('pages.profile.meta.description')),
  type: 'website',
})
</script>

<template>
  <Pager size="small">
    <TitleMain>{{ t('pages.profile.profile.myProfile') }}</TitleMain>

    <Card>
      <div class="grid grid-cols-1" md="grid-cols-2">
        <Button to="settings">
          {{ t('pages.profile.profile.settings') }}
        </Button>
      </div>
    </Card>
  </Pager>
</template>
